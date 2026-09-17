export type ProviderCatalogueItem = {
  provider: "printful" | "gelato";
  id: string;
  title: string;
  category: string;
  image?: string | null;
  detail?: string | null;
};

export type ProviderCatalogueResult = {
  provider: "printful" | "gelato";
  configured: boolean;
  items: ProviderCatalogueItem[];
  note: string;
};

export type ProviderVariant = {
  id: string;
  label: string;
  size?: string | null;
  color?: string | null;
  price?: string | null;
  currency?: string | null;
  available?: boolean | null;
};

export type ProviderProductDetail = {
  provider: "printful" | "gelato";
  id: string;
  title: string;
  category: string;
  image?: string | null;
  note: string;
  attributes: Array<{ label: string; value: string }>;
  variants: ProviderVariant[];
  supportedCountries?: string[];
};

const wanted = /(t-?shirt|tee|hoodie|sweatshirt|crewneck|poster|art print|tote|cap|beanie|apparel|clothing)/i;

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
}

function bool(value: unknown) {
  return typeof value === "boolean" ? value : null;
}

export async function getPrintfulCatalogue(): Promise<ProviderCatalogueResult> {
  const token = process.env.PRINTFUL_API_TOKEN?.trim();
  if (!token) return { provider: "printful", configured: false, items: [], note: "PRINTFUL_API_TOKEN is not available in this deployment." };

  try {
    const response = await fetch("https://api.printful.com/products", {
      headers: { Authorization: `Bearer ${token}`, "X-PF-Language": "en_GB" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Printful returned ${response.status}`);
    const payload = object(await response.json());
    const rows = Array.isArray(payload.result) ? payload.result : [];
    const items = rows
      .map((row) => object(row))
      .filter((row) => wanted.test(`${text(row.type_name)} ${text(row.title)} ${text(row.type)}`))
      .slice(0, 24)
      .map((row) => ({
        provider: "printful" as const,
        id: String(row.id ?? ""),
        title: text(row.title) || text(row.type_name) || "Printful product",
        category: text(row.type_name) || text(row.type) || "Merchandise",
        image: text(row.image) || null,
        detail: [text(row.brand), text(row.model)].filter(Boolean).join(" · ") || null,
      }));

    return { provider: "printful", configured: true, items, note: `${items.length} relevant products loaded from the live Printful catalogue.` };
  } catch (error) {
    return { provider: "printful", configured: true, items: [], note: error instanceof Error ? error.message : "Printful catalogue could not be loaded." };
  }
}

export async function getGelatoCatalogue(): Promise<ProviderCatalogueResult> {
  const apiKey = process.env.GELATO_API_KEY?.trim();
  if (!apiKey) return { provider: "gelato", configured: false, items: [], note: "GELATO_API_KEY is not available in this deployment." };

  try {
    const catalogResponse = await fetch("https://product.gelatoapis.com/v3/catalogs", {
      headers: { "X-API-KEY": apiKey },
      cache: "no-store",
    });
    if (!catalogResponse.ok) throw new Error(`Gelato returned ${catalogResponse.status}`);
    const catalogPayload = await catalogResponse.json();
    const catalogs = Array.isArray(catalogPayload) ? catalogPayload.map((row) => object(row)) : [];
    const relevant = catalogs.filter((catalog) => wanted.test(`${text(catalog.catalogUid)} ${text(catalog.title)}`));

    const items: ProviderCatalogueItem[] = [];
    for (const catalog of relevant.slice(0, 8)) {
      const catalogUid = text(catalog.catalogUid);
      if (!catalogUid) continue;
      const response = await fetch(`https://product.gelatoapis.com/v3/catalogs/${encodeURIComponent(catalogUid)}/products:search`, {
        method: "POST",
        headers: { "X-API-KEY": apiKey, "Content-Type": "application/json" },
        body: JSON.stringify({ limit: 8, offset: 0 }),
        cache: "no-store",
      });
      if (!response.ok) continue;
      const payload = object(await response.json());
      const products = Array.isArray(payload.products) ? payload.products : [];
      for (const productValue of products) {
        const product = object(productValue);
        const attributes = object(product.attributes);
        const summary = Object.entries(attributes).slice(0, 4).map(([key, value]) => `${key}: ${String(value)}`).join(" · ");
        items.push({
          provider: "gelato",
          id: text(product.productUid),
          title: text(catalog.title) || catalogUid,
          category: text(catalog.title) || "Merchandise",
          detail: summary || null,
          image: null,
        });
        if (items.length >= 24) break;
      }
      if (items.length >= 24) break;
    }

    const note = items.length
      ? `${items.length} live Gelato product variants loaded from relevant catalogues.`
      : `${relevant.length} relevant Gelato catalogues found; no product variants were returned yet.`;
    return { provider: "gelato", configured: true, items, note };
  } catch (error) {
    return { provider: "gelato", configured: true, items: [], note: error instanceof Error ? error.message : "Gelato catalogue could not be loaded." };
  }
}

export async function getProviderProductDetail(provider: "printful" | "gelato", id: string): Promise<ProviderProductDetail> {
  if (provider === "printful") {
    const token = process.env.PRINTFUL_API_TOKEN?.trim();
    if (!token) throw new Error("Printful is not configured in this deployment.");
    const response = await fetch(`https://api.printful.com/products/${encodeURIComponent(id)}`, {
      headers: { Authorization: `Bearer ${token}`, "X-PF-Language": "en_GB" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error(`Printful returned ${response.status}`);
    const payload = object(await response.json());
    const result = object(payload.result);
    const product = object(result.product);
    const rows = Array.isArray(result.variants) ? result.variants : [];
    const variants = rows.map((value) => {
      const variant = object(value);
      return {
        id: String(variant.id ?? ""),
        label: text(variant.name) || [text(variant.color), text(variant.size)].filter(Boolean).join(" / ") || `Variant ${String(variant.id ?? "")}`,
        size: text(variant.size) || null,
        color: text(variant.color) || null,
        price: text(variant.price) || null,
        currency: text(variant.currency) || text(product.currency) || null,
        available: bool(variant.in_stock),
      } satisfies ProviderVariant;
    }).filter((variant) => variant.id);

    return {
      provider,
      id,
      title: text(product.title) || "Printful product",
      category: text(product.type_name) || text(product.type) || "Merchandise",
      image: text(product.image) || null,
      note: `${variants.length} exact Printful catalogue variants returned. Use a Variant ID for fulfilment, not the parent Product ID.`,
      attributes: [
        { label: "Brand", value: text(product.brand) },
        { label: "Model", value: text(product.model) },
        { label: "Product ID", value: id },
      ].filter((item) => item.value),
      variants,
    };
  }

  const apiKey = process.env.GELATO_API_KEY?.trim();
  if (!apiKey) throw new Error("Gelato is not configured in this deployment.");
  const response = await fetch(`https://product.gelatoapis.com/v3/products/${encodeURIComponent(id)}`, {
    headers: { "X-API-KEY": apiKey },
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Gelato returned ${response.status}`);
  const product = object(await response.json());
  const attrs = object(product.attributes);
  const supportedCountries = Array.isArray(product.supportedCountries) ? product.supportedCountries.map(String) : [];
  const attributes = Object.entries(attrs).map(([label, value]) => ({ label, value: String(value) }));
  const weight = object(product.weight);
  if (weight.value != null) attributes.push({ label: "Weight", value: `${String(weight.value)} ${text(weight.measureUnit)}`.trim() });
  attributes.push({ label: "Product UID", value: id });

  return {
    provider,
    id,
    title: text(attrs.ProductName) || text(attrs.Name) || "Gelato product",
    category: text(attrs.ProductType) || "Gelato merchandise",
    note: supportedCountries.includes("GB") ? "This Gelato product reports support for GB fulfilment." : "Check GB fulfilment before publishing this Gelato product.",
    attributes,
    variants: [{ id, label: id }],
    supportedCountries,
  };
}
