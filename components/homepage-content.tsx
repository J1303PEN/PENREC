"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
import styles from "./new-homepage.module.css";

const allArtists = [...artists, theVerelles, theParkers, maison45, localArrangement, directMotion, christieWalker, saturdayBest];
const releases = getCatalogueReleaseArtists([...artists, theVerelles, theParkers, maison45, localArrangement, directMotion, christieWalker]);
const catalogueNumber = (catalogue: string) => Number(catalogue.replace(/\D/g, "")) || 0;

export function HomepageContent() {
  const [featuredSlug, setFeaturedSlug] = useState("");
  useEffect(() => {
    const choice = allArtists[Math.floor(Math.random() * allArtists.length)];
    setFeaturedSlug(choice?.slug || allArtists[0]?.slug || "");
  }, []);

  const featured = useMemo(() => allArtists.find(a => a.slug === featuredSlug) || allArtists[0], [featuredSlug]);
  const newest = useMemo(() => [...releases].sort((a, b) => catalogueNumber(b.catalogue) - catalogueNumber(a.catalogue)).slice(0, 6), []);
  const visibleArtists = allArtists.slice(0, 10);

  return <main id="content" className={styles.page}>
    <span className={styles.devMark}>NEW PENREC · MAIN FOUNDATION</span>

    <section className={styles.hero}>
      <div>
        <h1 className={styles.neon}>PENREC</h1>
        <div className={styles.actions}>
          <Link className={styles.action} href="#new-music">New music</Link>
          <Link className={`${styles.action} ${styles.actionAlt}`} href="#artists">Artists</Link>
        </div>
      </div>
      <div className={styles.heroArt}>
        <Link href={`/artists/${featured.slug}`} className={styles.heroPhoto} aria-label={`View ${featured.name}`}>
          <Image src={featured.hero || featured.profile} alt={featured.name} fill priority sizes="(max-width: 900px) 90vw, 45vw" style={{objectPosition: featured.heroPosition || "center"}} />
        </Link>
        <div className={styles.sticker}>{featured.name}<br />{featured.album}</div>
      </div>
    </section>

    <div className={styles.marquee} aria-hidden="true"><span>PENREC · MUSIC · ARTISTS · RELEASES · BOOKS · PENREC · MUSIC · ARTISTS · RELEASES · BOOKS ·</span></div>

    <section className={`${styles.section} ${styles.releases}`} id="new-music">
      <header className={styles.sectionHead}><h2>New music.</h2><Link href="/releases">All releases →</Link></header>
      <div className={styles.releaseGrid}>{newest.map(release => <Link className={styles.release} href={`/artists/${release.slug}`} key={`${release.slug}-${release.catalogue}`}>
        <div className={styles.cover}><Image src={release.cover} alt={`${release.name} — ${release.album}`} fill sizes="(max-width:600px) 90vw, 30vw" /></div>
        <div className={styles.releaseMeta}><h3>{release.album}</h3><p>{release.name}</p><small>{release.catalogue} · {release.year}</small></div>
      </Link>)}</div>
    </section>

    <section className={`${styles.section} ${styles.artists}`} id="artists">
      <header className={styles.sectionHead}><h2>Artists.</h2><Link href="/artists">Meet everyone →</Link></header>
      <div className={styles.artistGrid}>{visibleArtists.map(artist => <Link className={styles.artist} href={`/artists/${artist.slug}`} key={artist.slug}>
        <Image src={artist.profile || artist.hero} alt={artist.name} fill sizes="(max-width:600px) 90vw, 40vw" style={{objectPosition: artist.profilePosition || "center"}} />
        <span className={styles.artistName}>{artist.name}</span>
      </Link>)}</div>
    </section>

    <section className={`${styles.section} ${styles.listen}`} id="listen">
      <header className={styles.sectionHead}><h2>Listen.</h2><Link href="/releases">All music →</Link></header>
      <div className={styles.listenGrid}>{allArtists.slice(0, 6).map(artist => <AudioPlayer key={artist.slug} artist={artist} compact />)}</div>
    </section>

    <section className={`${styles.section} ${styles.books}`} id="books"><div className={styles.booksBox}><h2>Books.</h2><Link href="/books">Explore books →</Link></div></section>
  </main>;
}
