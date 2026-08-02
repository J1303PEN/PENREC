import { getAccessToken, restRequest, restSelect } from "@/lib/penrec-auth";

export type ProductStatus = "draft" | "published" | "archived";
export type FulfilmentProvider = "penrec" | "kunaki" | "printful" | "printify" | "gelato" | "elasticstage" | "other";

export type CommerceProduct = {
  id: string;
  slug: string;
  title: string;
  artist_slug: string | null;
  release_id: string | null;
  product_type: string;
  format: string | null;
  description: string | null;
  image: string | null;
  price_pence: number;
  currency: string;
  provider: FulfilmentProvider;
  provider_product_id: string | null;
  sku: string | null;
  barcode: string | null;
  stock_quantity: number | null;
  weight_grams: number | null;
  digital_file: string | null;
  preorder_at: string | null;
  available_at: string | null;
  shipping_note: string | null;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
};

function publicConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (!url || !key || url.includes("YOUR-PROJECT") || key.includes("YOUR_SUPABASE")) return null;
  return { url: url.replace(/\/$/, ""), key };
}

async function token() {
  const value = await getAccessToken();
  if (!value) throw new Error("Your session has expired.");
  return value;
}

export async function getPublishedProducts(): Promise<CommerceProduct[]> {
  const config = publicConfig();
  if (!config) return [];
  const response = await fetch(`${config.url}/rest/v1/commerce_products?select=*&status=eq.published&order=updated_at.desc`, {
    headers: { apikey: config.key, Authorization: `Bearer ${config.key}` },
    cache: "no-store",
  });
  if (!response.ok) return [];
  return (await response.json()) as CommerceProduct[];
}

export async function getAdminProducts() {
  return restSelect<CommerceProduct[]>("commerce_products", "select=*&order=updated_at.desc&limit=500", await token());
}

export async function getAdminProduct(id: string) {
  const rows = await restSelect<CommerceProduct[]>("commerce_products", `select=*&id=eq.${encodeURIComponent(id)}&limit=1`, await token());
  return rows[0] || null;
}

export async function createProduct(payload: Omit<CommerceProduct, "id" | "created_at" | "updated_at">) {
  return restRequest<CommerceProduct[]>("commerce_products", {
    method: "POST",
    body: JSON.stringify({ ...payload, created_at: new Date().toISOString(), updated_at: new Date().toISOString() }),
  }, await token());
}

export async function updateProduct(id: string, payload: Partial<Omit<CommerceProduct, "id" | "created_at">>) {
  return restRequest<CommerceProduct[]>(`commerce_products?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ ...payload, updated_at: new Date().toISOString() }),
  }, await token());
}

export async function deleteProduct(id: string) {
  return restRequest<CommerceProduct[]>(`commerce_products?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
  }, await token());
}
