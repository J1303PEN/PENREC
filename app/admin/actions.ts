"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin, type PenrecRole } from "@/lib/auth";
import { updateOrderStatus, updateProfileRole } from "@/lib/admin";

const roles: PenrecRole[] = ["customer", "staff", "admin", "super_admin"];
const statuses = ["pending", "paid", "processing", "shipped", "completed", "cancelled", "refunded"];

export async function changeRole(formData: FormData) {
  const { role: actorRole } = await requireAdmin();
  if (!["admin", "super_admin"].includes(actorRole)) redirect("/unauthorised");
  const id = String(formData.get("id") || "");
  const role = String(formData.get("role") || "") as PenrecRole;
  if (!id || !roles.includes(role)) return;
  if (role === "super_admin" && actorRole !== "super_admin") redirect("/unauthorised");
  await updateProfileRole(id, role);
  revalidatePath("/admin");
  revalidatePath("/admin/users");
}

export async function changeOrderStatus(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");
  if (!id || !statuses.includes(status)) return;
  await updateOrderStatus(id, status);
  revalidatePath("/admin");
  revalidatePath("/admin/orders");
}
