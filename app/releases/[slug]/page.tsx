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
import { doorAtMidnight } from "@/data/door-at-midnight";
import { getResolvedArtist } from "@/lib/catalogue-live";
import { AudioPlayer } from "@/components/audio-player";
import { TrackList } from "@/components/track-list";
import { ReleaseCard } from "@/components/release-card";
import { asReleaseArtist, getArtistReleases, getReleaseArtist, getReleaseHref } from "@/data/releases";

export function generateStaticParams(){return [...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker,doorAtMidnight].map(({slug})=>({slug}))}

export default async function ReleasePage({params,searchParams}:{params:Promise<{slug:string}>,searchParams:Promise<{release?:string}>}){
 const {slug}=await params;
 const {release}=await searchParams;
 const a=await getResolvedArtist(slug);
 if(!a)notFound();
 const selected=getReleaseArtist(a,release);
 const releases=getArtistReleases(a);
 const playable=selected.tracks.filter(track=>track.audio).length;
 return <main id="content" className="release-new">
  <section className="release-new__hero">
   <div className="release-new__grid">
    <div className="release-new__art"><Image src={selected.cover} alt={`${selected.album} cover`} fill priority sizes="(max-width:800px) 90vw, 44vw"/></div>
    <div className="release-new__info">
     <p className="music-page__eyebrow">PENREC release · {selected.catalogue}</p>
     <h1>{selected.album}</h1>
     <Link href={`/artists/${a.slug}`} className="release-new__artist">{selected.releaseCredit ?? a.name}</Link>
     <p className="release-new__meta">Album · {selected.year} · {selected.tracks.length} tracks</p>
     <AudioPlayer artist={selected} compact/>
     <div className="release-new__status"><span>Available in the PENREC player</span><strong>{playable} complete {playable===1?"track":"tracks"} ready to play</strong></div>
    </div>
   </div>
  </section>

  <section className="release-new__tracks">
   <p className="music-page__eyebrow">Album sequence</p><h2>Track listing.</h2>
   <TrackList artist={selected}/>
   <div className="release-new__about"><span>About this release</span><p>{a.bio[1] ?? a.bio[0]}</p></div>
  </section>

  {releases.length>1&&<section className="release-new__other">
   <p className="music-page__eyebrow">{a.name}</p><h2>More releases.</h2>
   <div className="release-grid release-grid--catalogue">{releases.filter(item=>item.catalogue!==selected.catalogue).map(item=>{const releaseArtist=asReleaseArtist(a,item);return <ReleaseCard key={item.catalogue} release={{...releaseArtist,releaseHref:getReleaseHref(a,item)}}/>})}</div>
  </section>}
 </main>
}