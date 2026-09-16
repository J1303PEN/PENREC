"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createProduct, getAdminProducts, updateProduct, type FulfilmentProvider } from "@/lib/commerce";

const text = (data: FormData, name: string) => String(data.get(name) || "").trim();

function classify(category: string) {
  const value = category.toLowerCase();
  if (/hoodie|sweatshirt|crewneck/.test(value)) return { product_type: "clothing", format: "Hoodie" };
  if (/t-?shirt|tee/.test(value)) return { product_type: "clothing", format: "T-shirt" };
  if (/poster|art print/.test(value)) return { product_type: "collectable", format: "Poster" };
  if (/tote|cap|beanie|hat/.test(value)) return { product_type: "accessory", format: "Accessory" };
  return { product_type: "collectable", format: "Other" };
}

export async function selectSupplierProduct(data: FormData) {
  await requireAdmin();

  const provider = text(data, "provider") as FulfilmentProvider;
  const providerProductId = text(data, "provider_product_id");
  const title = text(data, "title");
  const category = text(data, "category") || "Merchandise";
  const image = text(data, "image") || null;
  const detail = text(data, "detail") || null;

  if (!(["printful", "gelato"] as FulfilmentProvider[]).includes(provider) || !providerProductId || !title) {
    redirect("/admin/merchandise?error=Invalid+supplier+product");
  }

  const existing = (await getAdminProducts()).find(
    (product) => product.provider === provider && product.provider_product_id === providerProductId,
  );
  if (existing) redirect(`/admin/products/${existing.id}?supplier=existing`);

  const classification = classify(category);
  const slugBase = `${provider}-${providerProductId}-${title}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 120);

  const created = await createProduct({
    slug: slugBase,
    title,
    artist_slug: null,
    release_id: null,
    product_type: classification.product_type,
    format: classification.format,
    description: detail,
    image,
    price_pence: 0,
    currency: "GBP",
    provider,
    provider_product_id: providerProductId,
    provider_variant_id: null,
    artwork_file: null,
    supplier_cost_pence: null,
    provider_metadata: {},
    sku: null,
    barcode: null,
    stock_quantity: null,
    weight_grams: null,
    digital_file: null,
    preorder_at: null,
    available_at: null,
    shipping_note: `Supplier selection from ${provider}. Complete artwork, exact variant, supplier cost and retail price before publishing.`,
    status: "draft",
  });

  const product = created?.[0];
  revalidatePath("/admin/products");
  revalidatePath("/admin/merchandise");
  if (product?.id) redirect(`/admin/products/${product.id}?supplier=selected`);
  redirect("/admin/products?created=1");
}

export async function selectSupplierVariant(data: FormData) {
  await requireAdmin();

  const provider = text(data, "provider") as FulfilmentProvider;
  const providerProductId = text(data, "provider_product_id");
  const providerVariantId = text(data, "provider_variant_id");
  const title = text(data, "title");
  const category = text(data, "category") || "Merchandise";
  const image = text(data, "image") || null;
  const size = text(data, "size") || null;
  const color = text(data, "color") || null;
  const supplierPrice = Number.parseFloat(text(data, "supplier_price"));
  const supplierCurrency = (text(data, "supplier_currency") || "").toUpperCase();

  if (!(["printful", "gelato"] as FulfilmentProvider[]).includes(provider) || !providerProductId || !providerVariantId || !title) {
    redirect("/admin/merchandise?error=Invalid+supplier+variant");
  }

  const products = await getAdminProducts();
  const existing = products.find((product) => product.provider === provider && product.provider_product_id === providerProductId);
  const supplierCostPence = Number.isFinite(supplierPrice) && supplierPrice >= 0 && supplierCurrency === "GBP"
    ? Math.round(supplierPrice * 100)
    : null;
  const metadata = {
    supplier_size: size,
    supplier_color: color,
    supplier_currency: supplierCurrency || null,
    supplier_list_price: Number.isFinite(supplierPrice) ? supplierPrice : null,
  };

  if (existing) {
    await updateProduct(existing.id, {
      provider_variant_id: provider === "printful" ? providerVariantId : existing.provider_variant_id,
      provider_product_id: provider === "gelato" ? providerVariantId : providerProductId,
      supplier_cost_pence: supplierCostPence ?? existing.supplier_cost_pence,
      provider_metadata: metadata,
      image: existing.image || image,
      shipping_note: `Exact ${provider} supplier configuration selected. Add PENREC artwork and retail price before publishing.`,
      status: "draft",
    });
    revalidatePath(`/admin/products/${existing.id}`);
    revalidatePath("/admin/products");
    redirect(`/admin/products/${existing.id}?supplier=variant-selected`);
  }

  const classification = classify(category);
  const slugBase = `${provider}-${providerVariantId}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120);
  const created = await createProduct({
    slug: slugBase,
    title,
    artist_slug: null,
    release_id: null,
    product_type: classification.product_type,
    format: classification.format,
    description: [size, color].filter(Boolean).join(" · ") || null,
    image,
    price_pence: 0,
    currency: "GBP",
    provider,
    provider_product_id: provider === "gelato" ? providerVariantId : providerProductId,
    provider_variant_id: provider === "printful" ? providerVariantId : null,
    artwork_file: null,
    supplier_cost_pence: supplierCostPence,
    provider_metadata: metadata,
    sku: null,
    barcode: null,
    stock_quantity: null,
    weight_grams: null,
    digital_file: null,
    preorder_at: null,
    available_at: null,
    shipping_note: `Exact ${provider} supplier configuration selected. Add PENREC artwork and retail price before publishing.`,
    status: "draft",
  });

  const product = created?.[0];
  revalidatePath("/admin/products");
  revalidatePath("/admin/merchandise");
  if (product?.id) redirect(`/admin/products/${product.id}?supplier=variant-selected`);
  redirect("/admin/products?created=1");
}
