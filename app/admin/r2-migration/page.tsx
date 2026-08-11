"use client";

import { useState } from "react";

export default function R2MigrationPage() {
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState("Ready for a one-track test.");
  const [busy, setBusy] = useState(false);

  async function migrate(limit: number, offset = 0) {
    if (!secret) {
      setStatus("Enter the MIGRATION_SECRET first.");
      return;
    }
    setBusy(true);
    setStatus(`Migrating ${limit} track${limit === 1 ? "" : "s"} from offset ${offset}…`);
    try {
      const response = await fetch(`/api/admin/migrate-audio?limit=${limit}&offset=${offset}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${secret}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
      setStatus(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Migration failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>PENREC R2 Migration Control</h1>
      <p>This temporary preview-only tool copies audio from GitHub to Cloudflare R2. It does not delete GitHub files.</p>
      <label style={{ display: "block", marginTop: 24 }}>
        MIGRATION_SECRET
        <input
          type="password"
          autoComplete="off"
          value={secret}
          onChange={(event) => setSecret(event.target.value)}
          style={{ display: "block", width: "100%", padding: 12, marginTop: 8 }}
        />
      </label>
      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        <button disabled={busy} onClick={() => migrate(1, 0)} style={{ padding: "12px 18px" }}>
          Test 1 Track
        </button>
        <button disabled={busy} onClick={() => migrate(5, 0)} style={{ padding: "12px 18px" }}>
          Test 5 Tracks
        </button>
      </div>
      <h2 style={{ marginTop: 28 }}>Result</h2>
      <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", padding: 16, background: "#f3f3f3" }}>{status}</pre>
    </main>
  );
}
