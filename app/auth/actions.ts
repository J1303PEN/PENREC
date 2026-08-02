"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { clearSession, sendRecovery, signIn, signUp, updatePasswordWithToken } from "@/lib/penrec-auth";

const encoded = (message: string) => encodeURIComponent(message);

export async function login(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/account");
  try { await signIn(email, password); }
  catch (error) { redirect(`/login?error=${encoded(error instanceof Error ? error.message : "Unable to sign in.")}&next=${encoded(next)}`); }
  revalidatePath("/", "layout");
  redirect(next.startsWith("/") ? next : "/account");
}

export async function signup(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const displayName = String(formData.get("display_name") || "").trim();
  const origin = String(formData.get("origin") || "");
  try { await signUp(email, password, displayName, `${origin}/auth/confirm`); }
  catch (error) { redirect(`/register?error=${encoded(error instanceof Error ? error.message : "Unable to create account.")}`); }
  redirect("/login?message=Check your email to verify your PENREC account.");
}

export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") || "").trim();
  const origin = String(formData.get("origin") || "");
  try { await sendRecovery(email, `${origin}/reset-password`); }
  catch (error) { redirect(`/forgot-password?error=${encoded(error instanceof Error ? error.message : "Unable to send reset email.")}`); }
  redirect("/forgot-password?message=Password reset instructions have been sent.");
}

export async function updatePassword(formData: FormData) {
  const accessToken = String(formData.get("access_token") || "");
  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm_password") || "");
  if (!accessToken) redirect("/reset-password?error=The reset link is missing or has expired.");
  if (password.length < 8) redirect("/reset-password?error=Password must be at least 8 characters.");
  if (password !== confirm) redirect("/reset-password?error=Passwords do not match.");
  try { await updatePasswordWithToken(accessToken, password); }
  catch (error) { redirect(`/reset-password?error=${encoded(error instanceof Error ? error.message : "Unable to update password.")}`); }
  redirect("/login?message=Password updated successfully. You can now sign in.");
}

export async function logout() {
  await clearSession();
  revalidatePath("/", "layout");
  redirect("/");
}
