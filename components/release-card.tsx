import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/data/catalog";

export function ReleaseCard({ release }: { release: Artist }) {
  return (
    <article className="release-card">
      <Link href={`/releases/${release.slug}`}>
        <div className="release-card__cover">
          <Image src={release.cover} alt={`${release.album} by ${release.name}`} fill sizes="(max-width: 760px) 100vw, 20vw" />
          <div className="release-card__hover"><span>View release</span><b>↗</b></div>
        </div>
        <div className="release-card__meta">
          <div><h3>{release.album}</h3><p>{release.name}</p></div>
          <span>2026</span>
        </div>
      </Link>
    </article>
  );
}
