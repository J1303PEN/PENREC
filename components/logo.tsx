export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand brand--compact penrec-wordmark" : "brand penrec-wordmark"} aria-label="PENREC Music & Publishing">
      <strong>PENREC</strong>
      {!compact && <small>MUSIC &amp; PUBLISHING</small>}
    </span>
  );
}
