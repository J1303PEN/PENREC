import type { ReactNode } from "react";
import Link from "next/link";

export function AuthCard({
  eyebrow,
  title,
  intro,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <main id="content" className="auth-page">
      <section className="auth-card" aria-labelledby="auth-title">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="auth-title">{title}</h1>
        <p className="auth-card__intro">{intro}</p>
        {children}
        {footer && <div className="auth-card__footer">{footer}</div>}
        <Link className="auth-card__home" href="/">← Return to PENREC</Link>
      </section>
    </main>
  );
}
