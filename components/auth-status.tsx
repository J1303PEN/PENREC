"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function AuthStatus() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);
  useEffect(() => {
    fetch("/api/auth/session", { cache: "no-store" })
      .then((response) => response.json())
      .then((data) => setSignedIn(Boolean(data.authenticated)))
      .catch(() => setSignedIn(false));
  }, []);
  if (signedIn === null) return <span className="nav-account nav-account--loading">Account</span>;
  return <Link className="nav-account" href={signedIn ? "/account" : "/login"}>{signedIn ? "My Account" : "Sign in"}</Link>;
}
