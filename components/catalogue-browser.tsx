"use client";

import { useMemo, useState } from "react";
import { ReleaseCard } from "@/components/release-card";
import { artists } from "@/data/catalog";
import { saturdayBest } from "@/data/saturday-best";

const filters = ["All", "United Kingdom", "Italy", "Germany", "Canada", "International"] as const;
const catalogueArtists = [
  ...artists.map(artist => artist.slug === "nikos-andros" ? {...artist, catalogue:"PNR021"} : artist),
  saturdayBest,
];

export function CatalogueBrowser() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [sort, setSort] = useState<"catalogue" | "artist" | "title">("catalogue");
  const releases = useMemo(() => {
    const selected = filter === "All" ? catalogueArtists : catalogueArtists.filter((artist) => artist.location === filter);
    return [...selected].sort((a, b) => {
      if (sort === "artist") return a.name.localeCompare(b.name);
      if (sort === "title") return a.album.localeCompare(b.album);
      return a.catalogue.localeCompare(b.catalogue);
    });
  }, [filter, sort]);
  return <><div className="catalogue-toolbar"><div className="catalogue-filters" aria-label="Filter catalogue by territory">{filters.map((item) => <button className={filter === item ? "is-active" : undefined} type="button" key={item} onClick={() => setFilter(item)}>{item}</button>)}</div><label>Sort <select value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}><option value="catalogue">Catalogue number</option><option value="artist">Artist</option><option value="title">Release title</option></select></label></div><p className="catalogue-count">Showing {releases.length} of {catalogueArtists.length} PENREC releases</p><div className="release-grid release-grid--catalogue">{releases.map((release) => <ReleaseCard key={release.slug} release={release} />)}</div></>;
}
