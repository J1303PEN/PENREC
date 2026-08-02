"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { mutateAccount } from "@/lib/account";

const message = (value: string) => encodeURIComponent(value);

export async function updateProfile(formData: FormData) {
  const { user } = await requireUser();
  const displayName = String(formData.get("display_name") || "").trim();
  if (displayName.length < 2) redirect(`/account/profile?error=${message("Display name must be at least 2 characters.")}`);
  try {
    await mutateAccount(`profiles?id=eq.${encodeURIComponent(user.id)}`, { method: "PATCH", body: JSON.stringify({ display_name: displayName }) });
  } catch (error) {
    redirect(`/account/profile?error=${message(error instanceof Error ? error.message : "Unable to update profile.")}`);
  }
  revalidatePath("/account"); revalidatePath("/account/profile");
  redirect(`/account/profile?message=${message("Profile updated.")}`);
}

export async function addWishlist(formData: FormData) {
  const { user } = await requireUser();
  const releaseSlug = String(formData.get("release_slug") || "");
  try {
    await mutateAccount("wishlist_items?on_conflict=user_id,release_slug", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify({ user_id: user.id, release_slug: releaseSlug }) });
  } catch (error) {
    redirect(`/account/wishlist?error=${message(error instanceof Error ? error.message : "Unable to save release.")}`);
  }
  revalidatePath("/account/wishlist");
  redirect(`/account/wishlist?message=${message("Release saved to your wishlist.")}`);
}

export async function removeWishlist(formData: FormData) {
  const id = String(formData.get("id") || "");
  try { await mutateAccount(`wishlist_items?id=eq.${encodeURIComponent(id)}`, { method: "DELETE" }); }
  catch (error) { redirect(`/account/wishlist?error=${message(error instanceof Error ? error.message : "Unable to remove release.")}`); }
  revalidatePath("/account/wishlist");
  redirect(`/account/wishlist?message=${message("Release removed.")}`);
}

export async function updatePreferences(formData: FormData) {
  const { user } = await requireUser();
  const data = { user_id: user.id, release_alerts: formData.get("release_alerts") === "on", order_updates: formData.get("order_updates") === "on", newsletter: formData.get("newsletter") === "on" };
  try {
    await mutateAccount("account_preferences?on_conflict=user_id", { method: "POST", headers: { Prefer: "resolution=merge-duplicates,return=representation" }, body: JSON.stringify(data) });
  } catch (error) { redirect(`/account/settings?error=${message(error instanceof Error ? error.message : "Unable to save preferences.")}`); }
  revalidatePath("/account/settings");
  redirect(`/account/settings?message=${message("Preferences saved.")}`);
}
