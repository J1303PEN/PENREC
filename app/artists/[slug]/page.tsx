import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { artists } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";
import { getResolvedArtist } from "@/lib/catalogue-live";
import { AudioPlayer } from "@/components/audio-player";
import { ArtistGallery } from "@/components/artist-gallery";
import { ReleaseCard } from "@/components/release-card";
import { asReleaseArtist, getArtistReleases, getReleaseHref } from "@/data/releases";

export function generateStaticParams(){return [...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker].map(({slug})=>({slug}))}

export default async function ArtistPage({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 const a=await getResolvedArtist(slug);
 if(!a)notFound();
 const releases=getArtistReleases(a);
 const latestRelease=releases[releases.length-1];
 const latest=asReleaseArtist(a,latestRelease);
 return <main id="content" className="artist-page">
  <section className="artist-page__hero">
   <Image src={a.hero} alt={`${a.name} portrait`} fill priority sizes="100vw" style={{objectPosition:a.heroPosition ?? "50% 50%"}}/>
   <div className="artist-page__identity">
    <p className="artist-page__kicker">PENREC artist{a.location?` · ${a.location}`:""}</p>
    <h1>{a.name}</h1>
    <p className="artist-page__descriptor">{a.descriptor}</p>
    <span className="artist-page__accent"/>
   </div>
  </section>

  <section className="artist-page__story">
   <div><p className="artist-page__eyebrow">The artist</p><h2>{a.name}.</h2></div>
   <div className="artist-page__story-copy">{a.bio.map(p=><p key={p}>{p}</p>)}{a.quote&&<blockquote className="artist-page__quote">“{a.quote}”</blockquote>}</div>
  </section>

  <section className="artist-page__release">
   <div className="artist-page__release-grid">
    <div className="artist-page__cover"><Image src={latest.cover} alt={`${latest.album} cover`} fill sizes="(max-width:800px) 90vw, 42vw"/></div>
    <div className="artist-page__release-copy">
     <p className="artist-page__eyebrow">{releases.length>1?"Latest release":"Featured release"} · {latest.year}</p>
     <h2>{latest.album}</h2>
     <p className="artist-page__release-meta">{latest.releaseCredit ?? a.name} · {latest.tracks.length} songs · {latest.catalogue}</p>
     <AudioPlayer artist={latest}/>
     <Link className="artist-page__release-link" href={getReleaseHref(a,latestRelease)}>View full release →</Link>
    </div>
   </div>
  </section>

  {releases.length>1&&<section className="artist-page__discography">
   <header className="artist-page__section-head"><div><p className="artist-page__eyebrow">Discography</p><h2>Releases.</h2></div><p>Every PENREC release from {a.name}, with its artwork, catalogue number, track listing and player.</p></header>
   <div className="release-grid release-grid--catalogue">{releases.map(release=>{const releaseArtist=asReleaseArtist(a,release);return <ReleaseCard key={release.catalogue} release={{...releaseArtist,releaseHref:getReleaseHref(a,release)}}/>})}</div>
  </section>}

  {a.gallery?.length>0&&<section className="artist-page__gallery">
   <header className="artist-page__section-head"><div><p className="artist-page__eyebrow">Visual world</p><h2>Gallery.</h2></div><p>Images from {a.name}. Select an image to see the complete photograph.</p></header>
   <ArtistGallery images={a.gallery} artistName={a.name}/>
  </section>}
 </main>
}