import { getAccessToken, restRequest, restSelect } from "@/lib/penrec-auth";

export type WishlistItem = { id: string; release_slug: string; created_at: string };
export type LibraryItem = { id: string; release_slug: string; format: string; acquired_at: string };
export type Order = { id: string; order_number: string; status: string; total_pence: number; currency: string; created_at: string };
export type Preferences = { user_id: string; release_alerts: boolean; order_updates: boolean; newsletter: boolean };

export async function getWishlist() {
  const token = await getAccessToken();
  if (!token) return [];
  return restSelect<WishlistItem[]>("wishlist_items", "select=id,release_slug,created_at&order=created_at.desc", token);
}
export async function getLibrary() {
  const token = await getAccessToken();
  if (!token) return [];
  return restSelect<LibraryItem[]>("library_items", "select=id,release_slug,format,acquired_at&order=acquired_at.desc", token);
}
export async function getOrders() {
  const token = await getAccessToken();
  if (!token) return [];
  return restSelect<Order[]>("orders", "select=id,order_number,status,total_pence,currency,created_at&order=created_at.desc", token);
}
export async function getPreferences(userId: string) {
  const token = await getAccessToken();
  if (!token) return null;
  const rows = await restSelect<Preferences[]>("account_preferences", `user_id=eq.${encodeURIComponent(userId)}&select=user_id,release_alerts,order_updates,newsletter`, token);
  return rows[0] || null;
}
export async function mutateAccount<T>(table: string, init: RequestInit) {
  const token = await getAccessToken();
  if (!token) throw new Error("Your session has expired. Please sign in again.");
  return restRequest<T>(table, init, token);
}
