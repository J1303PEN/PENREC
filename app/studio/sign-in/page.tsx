import Link from "next/link";
import { AuthCard } from "@/components/auth-card";
import { login } from "@/app/auth/actions";

export const metadata = { title: "Studio sign in | PENREC" };

export default async function StudioSignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const params = await searchParams;

  return (
    <AuthCard
      eyebrow="PENREC Studio"
      title="Label access"
      intro="Sign in to access PENREC label operations, catalogue, products, orders and fulfilment."
      footer={<p>Customer? <Link href="/login">Go to PENREC Account sign in</Link></p>}
    >
      {params.error && <p className="form-alert form-alert--error">{params.error}</p>}
      {params.message && <p className="form-alert form-alert--success">{params.message}</p>}
      <form className="auth-form" action={login}>
        <input type="hidden" name="next" value="/studio" />
        <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
        <label>Password<input name="password" type="password" autoComplete="current-password" required /></label>
        <div className="auth-form__row"><Link href="/forgot-password">Forgot password?</Link></div>
        <button className="button button--gold" type="submit">Enter Studio</button>
      </form>
    </AuthCard>
  );
}
