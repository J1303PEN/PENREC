import Link from "next/link";

export default function UnauthorisedPage() {
  return (
    <main id="content" className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Access restricted</p>
        <h1>That area is for the PENREC team.</h1>
        <p className="auth-card__intro">Your account is working, but it does not have permission to open PENREC Studio.</p>
        <Link className="button button--gold" href="/account">Return to my account</Link>
      </section>
    </main>
  );
}
