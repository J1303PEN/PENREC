import Link from "next/link";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { ReleaseCard } from "@/components/release-card";
import { artists } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";
import { saturdayBest } from "@/data/saturday-best";
import { getCatalogueReleaseArtists } from "@/data/releases";

const catalogueNumber = (catalogue: string) => Number(catalogue.replace(/\D/g, "")) || 0;

export default async function ReleasesPage() {
  const catalogueArtists = [...artists, theVerelles, theParkers, maison45, localArrangement, directMotion, christieWalker];
  const catalogueReleases = [
    ...getCatalogueReleaseArtists(catalogueArtists),
    { ...saturdayBest, releaseHref: `/releases/${saturdayBest.slug}` },
  ];
  const latestReleases = [...catalogueReleases]
    .sort((a, b) => catalogueNumber(b.catalogue) - catalogueNumber(a.catalogue))
    .slice(0, 6);
  const trackCount = catalogueReleases.reduce((sum, release) => sum + release.tracks.length, 0);

  return <main id="content" className="inside listing-page catalogue-page"><div className="shell"><p className="eyebrow">PENREC catalogue</p><h1>Music</h1><div className="catalogue-intro"><p className="listing-page__intro">The PENREC collection and every new release published through PENREC Studio.</p><dl><div><dt>PENREC artists</dt><dd>{catalogueArtists.length}</dd></div><div><dt>New releases</dt><dd>{latestReleases.length}</dd></div><div><dt>Catalogue tracks</dt><dd>{trackCount}</dd></div></dl></div><section className="catalogue17-public"><div className="catalogue17-heading"><div><p className="eyebrow">Latest from PENREC</p><h2>New catalogue</h2></div></div><div className="release-grid">{latestReleases.map((release) => <ReleaseCard key={`${release.slug}-${release.catalogue}`} release={release} />)}</div></section><CatalogueBrowser /><div className="catalogue-search-link"><span>Looking for a particular song?</span><Link className="text-link" href="/search">Search the catalogue ↗</Link></div></div></main>;
}
