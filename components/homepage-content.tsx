"use client";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { ArtistCard } from "@/components/artist-card";
import { ReleaseCard } from "@/components/release-card";
import { AudioPlayer } from "@/components/audio-player";
import { artists } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";
import { saturdayBest } from "@/data/saturday-best";
import { getCatalogueReleaseArtists } from "@/data/releases";

const allArtists=[...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker,saturdayBest];
const releases=getCatalogueReleaseArtists([...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker]);
const catalogueNumber=(catalogue:string)=>Number(catalogue.replace(/\D/g,""))||0;

export function HomepageContent(){
 const latest=useMemo(()=>[...releases].sort((a,b)=>catalogueNumber(b.catalogue)-catalogueNumber(a.catalogue)).slice(0,8),[]);
 const hero=latest[0]||allArtists[0];
 const featuredArtists=allArtists.slice(0,6);
 return <main id="content" className="new-penrec-home">
   <section className="np-hero">
     <div className="np-hero__colour np-hero__colour--pink"/><div className="np-hero__colour np-hero__colour--yellow"/>
     <div className="shell np-hero__grid">
       <div className="np-hero__copy">
         <div className="np-neon" aria-label="PENREC">PENREC</div>
         <h1>Music, books<br/>and everything<br/><em>we make.</em></h1>
         <div className="np-hero__actions"><Link className="np-button np-button--dark" href="#music">Listen</Link><Link className="np-button np-button--pink" href="#discover">Explore PENREC</Link></div>
       </div>
       <Link href={`/releases/${hero.slug}`} className="np-hero__art">
         <Image src={hero.cover} alt={`${hero.name} — ${hero.album}`} fill priority sizes="(max-width: 800px) 90vw, 48vw"/>
         <div className="np-hero__label"><span>{hero.catalogue}</span><b>{hero.album}</b><small>{hero.name}</small></div>
       </Link>
     </div>
   </section>

   <section className="np-marquee" aria-label="PENREC creative areas"><div>NEW MUSIC · ARTISTS · BOOKS · DISCOVER · LISTEN · READ · NEW MUSIC · ARTISTS · BOOKS · DISCOVER ·</div></section>

   <section className="shell np-section" id="music">
     <header className="np-heading"><div><span>Music</span><h2>Latest from<br/>PENREC.</h2></div><Link href="/releases">All music →</Link></header>
     <div className="release-grid np-release-grid">{latest.map(release=><ReleaseCard key={`${release.slug}-${release.catalogue}`} release={release}/>)}</div>
   </section>

   <section className="np-colour-block np-colour-block--yellow" id="discover">
     <div className="shell"><header className="np-heading"><div><span>Discover</span><h2>Find someone<br/>new.</h2></div><Link href="/artists">All artists →</Link></header>
       <div className="artist-grid np-artist-grid">{featuredArtists.map((artist,index)=><ArtistCard key={artist.slug} artist={artist} index={index}/>)}</div>
     </div>
   </section>

   <section className="np-books">
     <div className="shell np-books__grid"><div><span className="np-kicker">Books</span><h2>More than<br/>music.</h2><p>Books and stories from PENREC are coming into the same creative home.</p><Link className="np-button np-button--dark" href="/books">Explore books</Link></div><div className="np-books__type" aria-hidden="true">READ</div></div>
   </section>

   <section className="np-listen">
     <div className="shell"><header className="np-heading np-heading--light"><div><span>Listen</span><h2>Press play.</h2></div><p>Choose an artist and keep listening while you explore PENREC.</p></header>
       <div className="launch-listening-grid np-listening-grid">{featuredArtists.slice(0,4).map(artist=><AudioPlayer key={artist.slug} artist={artist} compact/>)}</div>
     </div>
   </section>
 </main>;
}
