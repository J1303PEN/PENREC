"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createProduct, getAdminProducts, updateProduct, type FulfilmentProvider } from "@/lib/commerce";

const text = (data: FormData, name: string) => String(data.get(name) || "").trim();
const FIFTH_MAIN_CAP_ARTWORK = "/images/merch/fifth-and-main/fifth-main-embroidery-front.svg";
const FIFTH_MAIN_CAP_CONFIGURED_COST_PENCE = 1254;
const FIFTH_MAIN_CAP_UK_SHIPPING_PENCE = 339;

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
  if (!(["printful", "gelato"] as FulfilmentProvider[]).includes(provider) || !providerProductId || !title) redirect("/admin/merchandise?error=Invalid+supplier+product");
  const existing = (await getAdminProducts()).find((product) => product.provider === provider && product.provider_product_id === providerProductId);
  if (existing) redirect(`/admin/products/${existing.id}?supplier=existing`);
  const classification = classify(category);
  const slugBase = `${provider}-${providerProductId}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120);
  const created = await createProduct({ slug: slugBase, title, artist_slug: null, release_id: null, product_type: classification.product_type, format: classification.format, description: detail, image, price_pence: 0, currency: "GBP", provider, provider_product_id: providerProductId, provider_variant_id: null, artwork_file: null, supplier_cost_pence: null, provider_metadata: {}, sku: null, barcode: null, stock_quantity: null, weight_grams: null, digital_file: null, preorder_at: null, available_at: null, shipping_note: `Supplier selection from ${provider}. Complete artwork, exact variant, supplier cost and retail price before publishing.`, status: "draft" });
  const product = created?.[0];
  revalidatePath("/admin/products"); revalidatePath("/admin/merchandise");
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
  if (!(["printful", "gelato"] as FulfilmentProvider[]).includes(provider) || !providerProductId || !providerVariantId || !title) redirect("/admin/merchandise?error=Invalid+supplier+variant");
  const products = await getAdminProducts();
  const existing = products.find((product) => product.provider === provider && product.provider_product_id === providerProductId);
  const supplierCostPence = Number.isFinite(supplierPrice) && supplierPrice >= 0 && supplierCurrency === "GBP" ? Math.round(supplierPrice * 100) : null;
  const metadata = { supplier_size: size, supplier_color: color, supplier_currency: supplierCurrency || null, supplier_list_price: Number.isFinite(supplierPrice) ? supplierPrice : null };
  if (existing) {
    await updateProduct(existing.id, { provider_variant_id: provider === "printful" ? providerVariantId : existing.provider_variant_id, provider_product_id: provider === "gelato" ? providerVariantId : providerProductId, supplier_cost_pence: supplierCostPence ?? existing.supplier_cost_pence, provider_metadata: metadata, image: existing.image || image, shipping_note: `Exact ${provider} supplier configuration selected. Add PENREC artwork and retail price before publishing.`, status: "draft" });
    revalidatePath(`/admin/products/${existing.id}`); revalidatePath("/admin/products"); redirect(`/admin/products/${existing.id}?supplier=variant-selected`);
  }
  const classification = classify(category);
  const slugBase = `${provider}-${providerVariantId}-${title}`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 120);
  const created = await createProduct({ slug: slugBase, title, artist_slug: null, release_id: null, product_type: classification.product_type, format: classification.format, description: [size, color].filter(Boolean).join(" · ") || null, image, price_pence: 0, currency: "GBP", provider, provider_product_id: provider === "gelato" ? providerVariantId : providerProductId, provider_variant_id: provider === "printful" ? providerVariantId : null, artwork_file: null, supplier_cost_pence: supplierCostPence, provider_metadata: metadata, sku: null, barcode: null, stock_quantity: null, weight_grams: null, digital_file: null, preorder_at: null, available_at: null, shipping_note: `Exact ${provider} supplier configuration selected. Add PENREC artwork and retail price before publishing.`, status: "draft" });
  const product = created?.[0]; revalidatePath("/admin/products"); revalidatePath("/admin/merchandise");
  if (product?.id) redirect(`/admin/products/${product.id}?supplier=variant-selected`);
  redirect("/admin/products?created=1");
}

export async function buildFifthMainFlexfitCap() {
  await requireAdmin();
  const token = process.env.PRINTFUL_API_TOKEN?.trim();
  if (!token) redirect("/admin/merchandise?error=Printful+is+not+configured+in+this+deployment");
  const response = await fetch("https://api.printful.com/products/140", { headers: { Authorization: `Bearer ${token}`, "X-PF-Language": "en_GB" }, cache: "no-store" });
  if (!response.ok) redirect(`/admin/merchandise?error=${encodeURIComponent(`Printful returned ${response.status} for Flexfit 6277`)}`);
  const payload = await response.json() as { result?: { product?: { id?: number; title?: string; image?: string; type_name?: string }; variants?: Array<{ id?: number; name?: string; size?: string; color?: string; price?: string; currency?: string; in_stock?: boolean }> } };
  const parent = payload.result?.product;
  const variants = (payload.result?.variants || []).filter((variant) => String(variant.color || "").toLowerCase() === "black" && ["S/M", "L/XL"].includes(String(variant.size || "")) && variant.in_stock !== false);
  if (!parent?.id || variants.length === 0) redirect("/admin/merchandise?error=Printful+did+not+return+the+black+Flexfit+6277+variants");
  const existing = await getAdminProducts(); let createdCount = 0; let updatedCount = 0;
  for (const variant of variants) {
    const variantId = String(variant.id || ""); if (!variantId) continue;
    const supplierPrice = Number.parseFloat(String(variant.price || ""));
    const supplierCurrency = String(variant.currency || "").toUpperCase();
    const size = String(variant.size || "");
    const matched = existing.find((product) => product.provider === "printful" && product.provider_variant_id === variantId);
    const configuredMetadata = {
      supplier_name: parent.title || "Closed-Back Structured Cap | Flexfit 6277", supplier_color: "Black", supplier_size: size,
      supplier_currency: "GBP", supplier_list_price: Number.isFinite(supplierPrice) ? supplierPrice : null,
      configured_base_price_pence: FIFTH_MAIN_CAP_CONFIGURED_COST_PENCE, configured_base_price_excludes_tax: true,
      observed_vat_inclusive_base_price_pence: 1505, uk_shipping_pence: FIFTH_MAIN_CAP_UK_SHIPPING_PENCE,
      pricing_verified: "Printful designer pricing step", embroidery_placement: "front", artwork_source: FIFTH_MAIN_CAP_ARTWORK,
      artwork_basis: "/images/covers/fifth-and-main-here-we-are.png", embroidery_threads: ["ivory", "champagne-gold"]
    };
    if (matched) {
      await updateProduct(matched.id, { artist_slug: "fifth-and-main", artwork_file: FIFTH_MAIN_CAP_ARTWORK, supplier_cost_pence: FIFTH_MAIN_CAP_CONFIGURED_COST_PENCE, provider_metadata: { ...(matched.provider_metadata || {}), ...configuredMetadata }, shipping_note: "Printful made-to-order embroidered cap. Verified configured base supplier cost £12.54 before tax; UK shipping observed separately at £3.39. Retail pricing remains to be approved before publication.", status: "draft" });
      updatedCount += 1; continue;
    }
    await createProduct({ slug: `fifth-and-main-flexfit-6277-black-${size.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`, title: `Fifth & Main Signature Cap — ${size}`, artist_slug: "fifth-and-main", release_id: null, product_type: "accessory", format: "Accessory", description: "Closed-back structured Flexfit 6277 cap in black, mapped to the live Printful catalogue for front embroidery.", image: parent.image || null, price_pence: 0, currency: "GBP", provider: "printful", provider_product_id: String(parent.id), provider_variant_id: variantId, artwork_file: FIFTH_MAIN_CAP_ARTWORK, supplier_cost_pence: FIFTH_MAIN_CAP_CONFIGURED_COST_PENCE, provider_metadata: configuredMetadata, sku: `FAM-6277-BLK-${size.replace("/", "")}`, barcode: null, stock_quantity: null, weight_grams: null, digital_file: null, preorder_at: null, available_at: null, shipping_note: "Printful made-to-order embroidered cap. Verified configured base supplier cost £12.54 before tax; UK shipping observed separately at £3.39. Retail pricing remains to be approved before publication.", status: "draft" });
    createdCount += 1;
  }
  revalidatePath("/admin/products"); revalidatePath("/admin/merchandise"); redirect(`/admin/products?created=${createdCount}&updated=${updatedCount}`);
}
