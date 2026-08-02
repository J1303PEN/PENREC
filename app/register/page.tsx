import Link from "next/link";
import { headers } from "next/headers";
import { AuthCard } from "@/components/auth-card";
import { signup } from "@/app/auth/actions";

export const metadata = { title: "Create account | PENREC" };

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const headerList = await headers();
  const origin = headerList.get("origin") || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <AuthCard
      eyebrow="Join PENREC"
      title="Create your account"
      intro="Build your collection, manage orders and keep every PENREC purchase in one place."
      footer={<p>Already registered? <Link href="/login">Sign in</Link></p>}
    >
      {params.error && <p className="form-alert form-alert--error">{params.error}</p>}
      <form className="auth-form" action={signup}>
        <input type="hidden" name="origin" value={origin} />
        <label>Display name<input name="display_name" type="text" autoComplete="name" required /></label>
        <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
        <label>Password<input name="password" type="password" autoComplete="new-password" minLength={8} required /></label>
        <p className="form-help">Use at least 8 characters.</p>
        <button className="button button--gold" type="submit">Create account</button>
      </form>
    </AuthCard>
  );
}
