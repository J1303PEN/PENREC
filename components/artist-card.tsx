import Image from "next/image";
import Link from "next/link";
import type { Artist } from "@/data/catalog";

export function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  return (
    <article className="artist-card">
      <Link href={`/artists/${artist.slug}`}>
        <div className="artist-card__visual">
          <Image src={artist.profile} alt={`${artist.name} — ${artist.album}`} fill sizes="(max-width: 760px) 100vw, 33vw" />
          <span className="artist-card__index">{String(index + 1).padStart(2, "0")}</span>
          <div className="artist-card__overlay" />
          <span className="artist-card__action">Discover artist ↗</span>
        </div>
        <div className="artist-card__copy">
          <div><h3>{artist.name}</h3><p>{artist.descriptor}</p></div>
          <span>{artist.album}</span>
        </div>
      </Link>
    </article>
  );
}
