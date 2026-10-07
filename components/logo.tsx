export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "penrec-logo penrec-logo--compact" : "penrec-logo"}>
      <img src="/brand/penrec-music-publishing-logo.webp" alt="PENREC Music & Publishing" width={1942} height={809} />
    </span>
  );
}
