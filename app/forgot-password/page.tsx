import { headers } from "next/headers";
import { AuthCard } from "@/components/auth-card";
import { requestPasswordReset } from "@/app/auth/actions";

export const metadata = { title: "Reset password | PENREC" };

export default async function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;
  const headerList = await headers();
  const origin = headerList.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <AuthCard eyebrow="Account recovery" title="Reset your password" intro="Enter your email and we'll send you a secure reset link.">
      {params.error && <p className="form-alert form-alert--error">{params.error}</p>}
      {params.message && <p className="form-alert form-alert--success">{params.message}</p>}
      <form className="auth-form" action={requestPasswordReset}>
        <input type="hidden" name="origin" value={origin} />
        <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
        <button className="button button--gold" type="submit">Send reset link</button>
      </form>
    </AuthCard>
  );
}
