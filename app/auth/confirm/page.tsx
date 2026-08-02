"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function ConfirmPage() {
  const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    setConfirmed(Boolean(hash.get("access_token")) || !window.location.hash);
  }, []);

  return (
    <main id="content" className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Email verification</p>
        <h1>{confirmed ? "Your email is verified." : "Verifying your email…"}</h1>
        <p className="auth-card__intro">You can now sign in to your PENREC account.</p>
        <Link className="button button--gold" href="/login">Continue to sign in</Link>
      </section>
    </main>
  );
}
