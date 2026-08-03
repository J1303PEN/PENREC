import Image from "next/image";
import Link from "next/link";
import { CatalogueBrowser } from "@/components/catalogue-browser";
import { artists } from "@/data/catalog";
import { getPublicManagedReleases, type ManagedRelease } from "@/lib/catalogue-manager";

export default async function ReleasesPage() {
  const trackCount = artists.reduce((sum, artist) => sum + artist.tracks.length, 0);
  const managed = await getPublicManagedReleases();
  return <main id="content" className="inside listing-page catalogue-page"><div className="shell"><p className="eyebrow">PENREC catalogue</p><h1>Music</h1><div className="catalogue-intro"><p className="listing-page__intro">The PENREC collection and every new release published through PENREC Studio.</p><dl><div><dt>PENREC artists</dt><dd>{artists.length}</dd></div><div><dt>New releases</dt><dd>{managed.length}</dd></div><div><dt>Catalogue tracks</dt><dd>{trackCount}</dd></div></dl></div>{managed.length>0&&<section className="catalogue17-public"><div className="catalogue17-heading"><div><p className="eyebrow">Published from Studio</p><h2>New catalogue</h2></div></div><div className="release-grid">{managed.map((release: ManagedRelease) =><article className="release-card" key={release.id}><div className="release-card__cover">{release.artwork?<Image src={release.artwork} alt={`${release.title} cover`} fill sizes="(max-width:700px) 100vw,20vw"/>:<div className="catalogue17-placeholder">PENREC</div>}</div><div className="release-card__meta"><div><h3>{release.title}</h3><p>{release.artist?.name||"PENREC"} · {release.release_type}</p></div><span>{release.release_date?.slice(0,4)||"Soon"}</span></div></article>)}</div></section>}<CatalogueBrowser /><div className="catalogue-search-link"><span>Looking for a particular song?</span><Link className="text-link" href="/search">Search the catalogue ↗</Link></div></div></main>;
}
