import { getAccessToken, restRequest, restSelect } from "@/lib/penrec-auth";
import type { PenrecRole } from "@/lib/auth";

export type AdminProfile = {
  id: string;
  display_name: string | null;
  role: PenrecRole;
  created_at: string;
};

export type AdminOrder = {
  id: string;
  order_number: string;
  status: string;
  total_pence: number;
  currency: string;
  created_at: string;
  user_id: string;
};

async function token() {
  const value = await getAccessToken();
  if (!value) throw new Error("Your session has expired.");
  return value;
}

export async function getAdminProfiles() {
  return restSelect<AdminProfile[]>(
    "profiles",
    "select=id,display_name,role,created_at&order=created_at.desc&limit=250",
    await token(),
  );
}

export async function getAdminOrders() {
  return restSelect<AdminOrder[]>(
    "orders",
    "select=id,order_number,status,total_pence,currency,created_at,user_id&order=created_at.desc&limit=250",
    await token(),
  );
}

export async function updateProfileRole(id: string, role: PenrecRole) {
  return restRequest<AdminProfile[]>(
    `profiles?id=eq.${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify({ role }) },
    await token(),
  );
}

export async function updateOrderStatus(id: string, status: string) {
  return restRequest<AdminOrder[]>(
    `orders?id=eq.${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify({ status }) },
    await token(),
  );
}
