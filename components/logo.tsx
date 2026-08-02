import Image from "next/image";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? "brand brand--compact" : "brand"}>
      <Image
        src={compact ? "/brand/penrec-monogram.jpg" : "/brand/penrec-primary-logo.jpg"}
        alt="PENREC Music Group"
        width={compact ? 90 : 250}
        height={compact ? 90 : 124}
        priority
      />
    </span>
  );
}
