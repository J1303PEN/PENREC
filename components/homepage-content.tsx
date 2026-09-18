"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { AudioPlayer } from "@/components/audio-player";
import { artists } from "@/data/catalog";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";
import { saturdayBest } from "@/data/saturday-best";
import { completeCatalogueReleases } from "@/data/releases";
import { BULLETINS_KEY, Bulletin, isBulletinLive, readStored, starterBulletins } from "@/data/studio";
import styles from "./new-homepage.module.css";

const allArtists=[...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker,saturdayBest];
const releases=completeCatalogueReleases;
const catalogueNumber=(catalogue:string)=>Number(catalogue.replace(/\D/g,""))||0;
const playableArtists=allArtists.filter(artist=>artist.tracks?.some(track=>track.audio));
const showcaseArtists=allArtists.filter(artist=>artist.hero||artist.profile);
function randomPicks<T extends {slug:string}>(items:T[],count:number,previous:string[]=[]){const fresh=items.filter(item=>!previous.includes(item.slug));const pool=fresh.length>=count?fresh:items;return [...pool].sort(()=>Math.random()-.5).slice(0,Math.min(count,pool.length));}

export function HomepageContent(){
 const releaseRail=useRef<HTMLDivElement>(null),artistRail=useRef<HTMLDivElement>(null),listenRail=useRef<HTMLDivElement>(null);
 const newest=useMemo(()=>[...releases].sort((a,b)=>catalogueNumber(b.catalogue)-catalogueNumber(a.catalogue)),[]);
 const [heroArtists,setHeroArtists]=useState(()=>showcaseArtists.slice(0,5));
 const [listenPicks,setListenPicks]=useState(()=>playableArtists.slice(0,16));
 const [latestStory,setLatestStory]=useState<Bulletin|null>(null);
 const shuffleListen=()=>setListenPicks(current=>randomPicks(playableArtists,16,current.map(artist=>artist.slug)));
 const move=(ref:React.RefObject<HTMLDivElement|null>,direction:number)=>{const node=ref.current;if(node)node.scrollBy({left:direction*Math.max(280,node.clientWidth*.72),behavior:"smooth"});};
 useEffect(()=>{setHeroArtists(randomPicks(showcaseArtists,5));setListenPicks(randomPicks(playableArtists,16));const loadStory=()=>{const live=readStored<Bulletin[]>(BULLETINS_KEY,starterBulletins).filter(item=>isBulletinLive(item)).sort((a,b)=>`${b.publishDate}${b.publishTime||""}`.localeCompare(`${a.publishDate}${a.publishTime||""}`));setLatestStory(live[0]||null);};loadStory();window.addEventListener("storage",loadStory);window.addEventListener("penrec-studio-update",loadStory as EventListener);return()=>{window.removeEventListener("storage",loadStory);window.removeEventListener("penrec-studio-update",loadStory as EventListener);};},[]);
 useEffect(()=>{const node=artistRail.current;if(!node||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;const timer=window.setInterval(()=>{const nearEnd=node.scrollLeft+node.clientWidth>=node.scrollWidth-40;node.scrollTo({left:nearEnd?0:node.scrollLeft+Math.max(240,node.clientWidth*.38),behavior:"smooth"});},4000);return()=>window.clearInterval(timer);},[]);
 return <main id="content" className={styles.page}>
  <section className={styles.hero} aria-label="PENREC artist showcase"><div className={styles.collage}>{heroArtists.map((artist,index)=><Link href={`/artists/${artist.slug}`} className={`${styles.collageCard} ${styles[`collage${index+1}`]}`} key={artist.slug} aria-label={`View ${artist.name}`}><Image src={artist.hero||artist.profile} alt={artist.name} fill priority={index<2} sizes="(max-width:700px) 48vw, 24vw" style={{objectPosition:artist.heroPosition||artist.profilePosition||"center"}}/></Link>)}</div></section>
  {latestStory&&<Link href="/news" className={styles.latestStory} aria-label={`Read: ${latestStory.headline}`}><div className={styles.latestStoryLabel}><span>Latest from PENREC</span><small>{latestStory.category} · {new Date(`${latestStory.publishDate}T12:00:00`).toLocaleDateString("en-GB",{day:"numeric",month:"short"})}</small></div><div className={styles.latestStoryCopy}><h2>{latestStory.headline}</h2><p>{latestStory.summary}</p></div><strong>Read the story →</strong></Link>}
  <section className={`${styles.section} ${styles.releases}`} id="new-music"><header className={styles.sectionHead}><h2>New music.<span className={styles.sectionRule}/></h2><div className={styles.headTools}><button onClick={()=>move(releaseRail,-1)} aria-label="Previous releases">←</button><button onClick={()=>move(releaseRail,1)} aria-label="Next releases">→</button></div></header><div className={styles.releaseRail} ref={releaseRail}>{newest.map(release=><Link className={styles.release} href={release.releaseHref} key={`${release.slug}-${release.catalogue}`}><div className={styles.cover}><Image src={release.cover} alt={`${release.name} — ${release.album}`} fill sizes="(max-width:600px) 52vw, 16vw"/></div><div className={styles.releaseMeta}><h3>{release.album}</h3><p>{release.name}</p><small>{release.catalogue} · {release.year}</small><span className={styles.cardRule}/></div></Link>)}</div></section>
  <section className={`${styles.section} ${styles.artists}`} id="artists"><header className={styles.sectionHead}><h2>Artists.<span className={styles.sectionRule}/></h2><div className={styles.headTools}><button onClick={()=>move(artistRail,-1)} aria-label="Previous artists">←</button><button onClick={()=>move(artistRail,1)} aria-label="Next artists">→</button></div></header><div className={styles.artistRail} ref={artistRail}>{allArtists.map(artist=><Link className={styles.artist} href={`/artists/${artist.slug}`} key={artist.slug}><Image src={artist.profile||artist.hero} alt={artist.name} fill sizes="(max-width:600px) 70vw, 16vw" style={{objectPosition:artist.profilePosition||"center"}}/><span className={styles.artistName}>{artist.name}</span></Link>)}</div></section>
  <section className={`${styles.section} ${styles.listen}`} id="listen"><header className={styles.sectionHead}><h2>Listen.<span className={styles.sectionRule}/></h2><div className={styles.headTools}><button onClick={shuffleListen} aria-label="Shuffle listening picks">↻</button><button onClick={()=>move(listenRail,-1)} aria-label="Previous listening picks">←</button><button onClick={()=>move(listenRail,1)} aria-label="Next listening picks">→</button></div></header><div className={styles.listenRail} ref={listenRail}>{listenPicks.map(artist=><div className={styles.listenCard} key={artist.slug}><AudioPlayer artist={artist} compact/></div>)}</div></section>
  <section className={`${styles.section} ${styles.books}`} id="books"><div className={styles.booksBox}><div><p className={styles.eyebrow}>PENREC PUBLISHING</p><h2>Books.<span className={styles.sectionRule}/></h2><p>In development.</p></div></div></section>
 </main>;
}