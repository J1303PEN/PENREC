import { redirect } from "next/navigation";
import { getAccessToken, getUser, restSelect } from "@/lib/penrec-auth";

export type PenrecRole = "customer" | "staff" | "admin" | "super_admin";
export type Profile = { id: string; display_name: string | null; role: PenrecRole; created_at: string };

export async function requireUser() {
  const user = await getUser();
  if (!user) redirect("/login?next=/account");
  return { user };
}

export async function getOwnProfile(userId: string) {
  const token = await getAccessToken();
  if (!token) return null;
  const rows = await restSelect<Profile[]>("profiles", `id=eq.${encodeURIComponent(userId)}&select=id,display_name,role,created_at`, token);
  return rows[0] || null;
}

export async function requireAdmin() {
  const { user } = await requireUser();
  const profile = await getOwnProfile(user.id);
  const role = profile?.role;
  if (!role || !["staff", "admin", "super_admin"].includes(role)) redirect("/unauthorised");
  return { user, profile, role, accessToken: await getAccessToken() };
}
