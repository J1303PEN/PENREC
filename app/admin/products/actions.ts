"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/auth";
import { createProduct, deleteProduct, updateProduct, type FulfilmentProvider, type ProductStatus } from "@/lib/commerce";

const text = (data: FormData, name: string) => String(data.get(name) || "").trim();
const validStatuses: ProductStatus[] = ["draft", "published", "archived"];
const validProviders: FulfilmentProvider[] = ["penrec", "kunaki", "printful", "printify", "gelato", "elasticstage", "other"];

function optionalInteger(data: FormData, name: string) {
  const raw = text(data, name);
  if (!raw) return null;
  const value = Number.parseInt(raw, 10);
  if (!Number.isInteger(value) || value < 0) throw new Error(`${name.replaceAll("_", " ")} must be zero or greater.`);
  return value;
}

function optionalDate(data: FormData, name: string) {
  const raw = text(data, name);
  if (!raw) return null;
  const value = new Date(raw);
  if (Number.isNaN(value.getTime())) throw new Error(`Enter a valid ${name.replaceAll("_", " ")}.`);
  return value.toISOString();
}

function payload(data: FormData) {
  const price = Number.parseFloat(text(data, "price"));
  const status = text(data, "status") as ProductStatus;
  const provider = text(data, "provider") as FulfilmentProvider;
  const title = text(data, "title");
  const slug = (text(data, "slug") || title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  if (!title || !slug) throw new Error("Product title is required.");
  if (!Number.isFinite(price) || price < 0) throw new Error("Enter a valid price.");
  if (!validStatuses.includes(status)) throw new Error("Choose a valid product status.");
  if (!validProviders.includes(provider)) throw new Error("Choose a valid fulfilment provider.");

  return {
    slug,
    title,
    artist_slug: text(data, "artist_slug") || null,
    release_id: text(data, "release_id") || null,
    product_type: text(data, "product_type") || "music",
    format: text(data, "format") || null,
    description: text(data, "description") || null,
    image: text(data, "image") || null,
    price_pence: Math.round(price * 100),
    currency: (text(data, "currency") || "GBP").toUpperCase(),
    provider,
    provider_product_id: text(data, "provider_product_id") || null,
    sku: text(data, "sku") || null,
    barcode: text(data, "barcode") || null,
    stock_quantity: optionalInteger(data, "stock_quantity"),
    weight_grams: optionalInteger(data, "weight_grams"),
    digital_file: text(data, "digital_file") || null,
    preorder_at: optionalDate(data, "preorder_at"),
    available_at: optionalDate(data, "available_at"),
    shipping_note: text(data, "shipping_note") || null,
    status,
  };
}

export async function createCommerceProduct(data: FormData) {
  await requireAdmin();
  try {
    await createProduct(payload(data));
  } catch (error) {
    redirect(`/admin/products/new?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to create product.")}`);
  }
  revalidatePath("/store");
  revalidatePath("/admin/products");
  redirect("/admin/products?created=1");
}

export async function updateCommerceProduct(data: FormData) {
  await requireAdmin();
  const id = text(data, "id");
  if (!id) redirect("/admin/products?error=Missing+product+ID");
  try {
    await updateProduct(id, payload(data));
  } catch (error) {
    redirect(`/admin/products/${id}?error=${encodeURIComponent(error instanceof Error ? error.message : "Unable to update product.")}`);
  }
  revalidatePath("/store");
  revalidatePath("/admin/products");
  revalidatePath(`/admin/products/${id}`);
  redirect(`/admin/products/${id}?saved=1`);
}

export async function removeCommerceProduct(data: FormData) {
  await requireAdmin();
  const id = text(data, "id");
  if (id) await deleteProduct(id);
  revalidatePath("/store");
  revalidatePath("/admin/products");
  redirect("/admin/products?deleted=1");
}
