import Link from "next/link";
export function AccountSection({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: React.ReactNode }) {
  return <main id="content" className="account-page account-section shell inside"><Link className="account-back" href="/account">← Account overview</Link><header><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{intro}</p></header>{children}</main>;
}
export function Alert({ error, message }: { error?: string; message?: string }) { return <>{error && <p className="form-alert form-alert--error">{error}</p>}{message && <p className="form-alert form-alert--success">{message}</p>}</>; }
