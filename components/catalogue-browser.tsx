"use client";

import { useMemo, useState } from "react";
import { ReleaseCard } from "@/components/release-card";
import type { CatalogueRelease } from "@/data/releases";

const filters = ["All", "United Kingdom", "Italy", "Germany", "Canada", "International"] as const;

export function CatalogueBrowser({catalogueArtists}:{catalogueArtists:ReadonlyArray<CatalogueRelease>}) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [sort, setSort] = useState<"catalogue" | "artist" | "title">("catalogue");
  const releases = useMemo(() => {
    const selected = filter === "All" ? catalogueArtists : catalogueArtists.filter((artist) => artist.location === filter);
    return [...selected].sort((a, b) => {
      if (sort === "artist") return (a.releaseCredit ?? a.name).localeCompare(b.releaseCredit ?? b.name);
      if (sort === "title") return a.album.localeCompare(b.album);
      return a.catalogue.localeCompare(b.catalogue);
    });
  }, [filter, sort, catalogueArtists]);
  return <><div className="catalogue-toolbar"><div className="catalogue-filters" aria-label="Filter catalogue by territory">{filters.map((item) => <button className={filter === item ? "is-active" : undefined} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><label>Sort <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="catalogue">Catalogue number</option><option value="artist">Artist</option><option value="title">Release title</option></select></label></div><p className="catalogue-count">Showing {releases.length} of {catalogueArtists.length} PENREC releases</p><div className="release-grid release-grid--catalogue">{releases.map((release) => <ReleaseCard key={`${release.slug}-${release.catalogue}`} release={release} />)}</div></>;
}
