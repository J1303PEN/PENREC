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

const catalogueNumber=(catalogue:string)=>Number(catalogue.replace(/\D/g,""))||0;

export default async function ReleasesPage(){
 const catalogueArtists=[...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker];
 const catalogueReleases=[...getCatalogueReleaseArtists(catalogueArtists),{...saturdayBest,releaseHref:`/releases/${saturdayBest.slug}`}];
 const latestReleases=[...catalogueReleases].sort((a,b)=>catalogueNumber(b.catalogue)-catalogueNumber(a.catalogue)).slice(0,8);
 return <main id="content" className="music-page">
  <section className="music-page__masthead"><p className="music-page__eyebrow">PENREC catalogue</p><h1>Music.</h1><p>Albums and releases from across PENREC, with the artwork, sequence and music kept together.</p></section>
  <section className="music-page__latest"><header className="music-page__heading"><div><p className="music-page__eyebrow">Latest from PENREC</p><h2>New releases.</h2></div><p>The newest additions to the PENREC catalogue.</p></header><div className="release-grid">{latestReleases.map(release=><ReleaseCard key={`${release.slug}-${release.catalogue}`} release={release}/>)}</div></section>
  <section className="music-page__catalogue"><header className="music-page__heading"><div><p className="music-page__eyebrow">Browse</p><h2>The catalogue.</h2></div><Link className="text-link" href="/search">Search for a song →</Link></header><CatalogueBrowser/></section>
 </main>;
}