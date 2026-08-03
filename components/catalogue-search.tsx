"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { artists } from "@/data/catalog";

export function CatalogueSearch() {
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLocaleLowerCase();

  const results = useMemo(() => {
    if (!normalized) return [];
    return artists.flatMap((artist) => {
      const artistMatch = [artist.name, artist.album, artist.descriptor, artist.location, artist.catalogue]
        .some((value) => value.toLocaleLowerCase().includes(normalized));
      const trackMatches = artist.tracks
        .map((track, index) => ({ track, index }))
        .filter(({ track }) => track.title.toLocaleLowerCase().includes(normalized));
      return artistMatch || trackMatches.length ? [{ artist, trackMatches }] : [];
    });
  }, [normalized]);

  return (
    <div className="catalogue-search">
      <label htmlFor="catalogue-search-input">Search artists, albums, tracks or catalogue numbers</label>
      <div className="catalogue-search__field">
        <span aria-hidden="true">⌕</span>
        <input
          id="catalogue-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Try Soreya, The Night Is Ours or PNR004"
          autoComplete="off"
        />
        {query && <button type="button" onClick={() => setQuery("")}>Clear</button>}
      </div>

      {!normalized ? (
        <p className="catalogue-search__hint">The catalogue currently contains {artists.length} artists, {artists.length} albums and {artists.reduce((sum, artist) => sum + artist.tracks.length, 0)} tracks.</p>
      ) : results.length === 0 ? (
        <div className="catalogue-search__empty"><h2>No catalogue matches</h2><p>Try an artist, release title, track name or PENREC catalogue number.</p></div>
      ) : (
        <div className="catalogue-search__results" aria-live="polite">
          <p>{results.length} {results.length === 1 ? "release" : "releases"} matched</p>
          {results.map(({ artist, trackMatches }) => (
            <article className="search-result" key={artist.slug}>
              <Link className="search-result__cover" href={`/releases/${artist.slug}`}>
                <Image src={artist.cover} alt="" fill sizes="140px" />
              </Link>
              <div className="search-result__body">
                <p className="eyebrow">{artist.catalogue} · {artist.year}</p>
                <h2><Link href={`/releases/${artist.slug}`}>{artist.album}</Link></h2>
                <p className="search-result__artist"><Link href={`/artists/${artist.slug}`}>{artist.name} ↗</Link></p>
                {trackMatches.length > 0 && (
                  <ol>
                    {trackMatches.slice(0, 6).map(({ track, index }) => (
                      <li key={track.title}><span>{String(index + 1).padStart(2, "0")}</span><Link href={`/releases/${artist.slug}`}>{track.title}</Link><time>{track.duration}</time></li>
                    ))}
                  </ol>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
