"use client";

import { useState } from "react";

type MigrationResult = {
  total: number;
  offset: number;
  migrated: number;
  nextOffset: number;
  files: Array<{ name: string; size: number; publicUrl: string }>;
};

export default function R2MigrationPage() {
  const [secret, setSecret] = useState("");
  const [status, setStatus] = useState("One-track test verified. Ready for bulk migration.");
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(1);

  async function requestBatch(limit: number, offset: number): Promise<MigrationResult> {
    const response = await fetch(`/api/admin/migrate-audio?limit=${limit}&offset=${offset}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}` },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
    return data;
  }

  async function migrate(limit: number, offset = 0) {
    if (!secret) return setStatus("Enter the MIGRATION_SECRET first.");
    setBusy(true);
    try {
      const data = await requestBatch(limit, offset);
      setProgress(data.nextOffset);
      setStatus(JSON.stringify(data, null, 2));
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Migration failed");
    } finally {
      setBusy(false);
    }
  }

  async function migrateAll() {
    if (!secret) return setStatus("Enter the MIGRATION_SECRET first.");
    if (!window.confirm("Copy all remaining GitHub audio to Cloudflare R2? GitHub files will NOT be deleted.")) return;
    setBusy(true);
    let offset = 1;
    try {
      while (true) {
        setStatus(`Bulk migration running… ${offset} files accounted for.`);
        const data = await requestBatch(10, offset);
        offset = data.nextOffset;
        setProgress(offset);
        setStatus(`Bulk migration running… ${Math.min(offset, data.total)} of ${data.total} files copied/accounted for.`);
        if (data.migrated === 0 || offset >= data.total) {
          setStatus(`COMPLETE: ${data.total} audio files are now accounted for in the R2 migration. Final offset ${offset}. Existing GitHub audio has NOT been deleted.`);
          break;
        }
      }
    } catch (error) {
      setStatus(`STOPPED safely at offset ${offset}. ${error instanceof Error ? error.message : "Migration failed"}. You can retry; uploads use the same object names.`);
    } finally {
      setBusy(false);
    }
  }

  return (
    <main style={{ maxWidth: 900, margin: "40px auto", padding: 24, fontFamily: "system-ui" }}>
      <h1>PENREC R2 Migration Control</h1>
      <p>This temporary preview-only tool copies audio from GitHub to Cloudflare R2. It never deletes GitHub files.</p>
      <p><strong>Progress:</strong> {progress} / 316</p>
      <label style={{ display: "block", marginTop: 24 }}>
        MIGRATION_SECRET
        <input type="password" autoComplete="off" value={secret} onChange={(event) => setSecret(event.target.value)} style={{ display: "block", width: "100%", padding: 12, marginTop: 8 }} />
      </label>
      <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
        <button disabled={busy} onClick={() => migrate(1, 0)} style={{ padding: "12px 18px" }}>Retest 1 Track</button>
        <button disabled={busy} onClick={migrateAll} style={{ padding: "12px 18px", fontWeight: 700 }}>Migrate Remaining 315 Tracks</button>
      </div>
      <h2 style={{ marginTop: 28 }}>Result</h2>
      <pre style={{ whiteSpace: "pre-wrap", overflowWrap: "anywhere", padding: 16, background: "#f3f3f3" }}>{status}</pre>
    </main>
  );
}
