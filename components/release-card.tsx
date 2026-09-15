import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/data/catalog";

export function ReleaseCard({ release }: { release: Artist & { releaseHref?: string; releaseCredit?: string } }) {
  const href = release.releaseHref ?? `/releases/${release.slug}`;
  const credit = release.releaseCredit ?? release.name;
  return (
    <article className="release-card">
      <Link href={href}>
        <div className="release-card__cover">
          <Image src={release.cover} alt={`${release.album} by ${credit}`} fill sizes="(max-width: 760px) 100vw, 20vw" />
          <div className="release-card__hover"><span>View release</span><b>↗</b></div>
        </div>
        <div className="release-card__meta">
          <div><h3>{release.album}</h3><p>{credit}</p></div>
          <span>{release.year}</span>
        </div>
      </Link>
    </article>
  );
}
