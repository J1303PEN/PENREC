"use client";

import { useEffect, useState } from "react";
import { updatePassword } from "@/app/auth/actions";

export function TokenPasswordForm() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = new URLSearchParams(window.location.hash.slice(1));
    setToken(hash.get("access_token") || "");
  }, []);

  return (
    <form className="auth-form" action={updatePassword}>
      <input type="hidden" name="access_token" value={token} />
      {!token && <p className="form-alert form-alert--error">Open this page using the reset link sent to your email.</p>}
      <label>New password<input name="password" type="password" autoComplete="new-password" minLength={8} required /></label>
      <label>Confirm password<input name="confirm_password" type="password" autoComplete="new-password" minLength={8} required /></label>
      <button className="button button--gold" type="submit" disabled={!token}>Update password</button>
    </form>
  );
}
