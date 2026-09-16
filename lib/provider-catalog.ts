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

const wanted = /(t-?shirt|tee|hoodie|sweatshirt|crewneck|poster|art print|tote|cap|beanie|apparel|clothing)/i;

function text(value: unknown) {
  return typeof value === "string" ? value : "";
}

function object(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
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
