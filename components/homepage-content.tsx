"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
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
  const releaseRail = useRef<HTMLDivElement>(null);
  const artistRail = useRef<HTMLDivElement>(null);
  const newest = useMemo(() => [...releases].sort((a, b) => catalogueNumber(b.catalogue) - catalogueNumber(a.catalogue)), []);
  const heroArtists = allArtists.filter(a => a.hero || a.profile).slice(0, 5);

  const move = (ref: React.RefObject<HTMLDivElement | null>, direction: number) => {
    const node = ref.current;
    if (!node) return;
    node.scrollBy({ left: direction * Math.max(280, node.clientWidth * .72), behavior: "smooth" });
  };

  useEffect(() => {
    const node = artistRail.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const nearEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 40;
      node.scrollTo({ left: nearEnd ? 0 : node.scrollLeft + Math.max(240, node.clientWidth * .38), behavior: "smooth" });
    }, 4000);
    return () => window.clearInterval(timer);
  }, []);

  return <main id="content" className={styles.page}>
    <span className={styles.devMark}>NEW PENREC</span>

    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <h1 className={styles.neon}>PENREC</h1>
        <p className={styles.brandLine}>MUSIC &amp; PUBLISHING</p>
        <div className={styles.actions}>
          <Link className={styles.action} href="#new-music">New music</Link>
          <Link className={`${styles.action} ${styles.actionAlt}`} href="#artists">Artists</Link>
        </div>
      </div>
      <div className={styles.collage} aria-label="PENREC artists">
        {heroArtists.map((artist, index) => <Link href={`/artists/${artist.slug}`} className={`${styles.collageCard} ${styles[`collage${index + 1}`]}`} key={artist.slug} aria-label={`View ${artist.name}`}>
          <Image src={artist.hero || artist.profile} alt={artist.name} fill priority={index < 2} sizes="(max-width:700px) 42vw, 22vw" style={{objectPosition: artist.heroPosition || artist.profilePosition || "center"}} />
          <span>{artist.name}</span>
        </Link>)}
      </div>
    </section>

    <div className={styles.marquee} aria-hidden="true"><span>PENREC · MUSIC · ARTISTS · RELEASES · PUBLISHING · PENREC · MUSIC · ARTISTS · RELEASES · PUBLISHING ·</span></div>

    <section className={`${styles.section} ${styles.releases}`} id="new-music">
      <header className={styles.sectionHead}><h2>New music.</h2><div className={styles.headTools}><Link href="/releases">All releases →</Link><button onClick={() => move(releaseRail, -1)} aria-label="Previous releases">←</button><button onClick={() => move(releaseRail, 1)} aria-label="Next releases">→</button></div></header>
      <div className={styles.releaseRail} ref={releaseRail}>{newest.map(release => <Link className={styles.release} href={`/artists/${release.slug}`} key={`${release.slug}-${release.catalogue}`}>
        <div className={styles.cover}><Image src={release.cover} alt={`${release.name} — ${release.album}`} fill sizes="(max-width:600px) 52vw, 16vw" /></div>
        <div className={styles.releaseMeta}><h3>{release.album}</h3><p>{release.name}</p><small>{release.catalogue} · {release.year}</small></div>
      </Link>)}</div>
    </section>

    <section className={`${styles.section} ${styles.artists}`} id="artists">
      <header className={styles.sectionHead}><h2>Artists.</h2><div className={styles.headTools}><Link href="/artists">All artists →</Link><button onClick={() => move(artistRail, -1)} aria-label="Previous artists">←</button><button onClick={() => move(artistRail, 1)} aria-label="Next artists">→</button></div></header>
      <div className={styles.artistRail} ref={artistRail}>{allArtists.map(artist => <Link className={styles.artist} href={`/artists/${artist.slug}`} key={artist.slug}>
        <Image src={artist.profile || artist.hero} alt={artist.name} fill sizes="(max-width:600px) 70vw, 23vw" style={{objectPosition: artist.profilePosition || "center"}} />
        <span className={styles.artistName}>{artist.name}</span>
      </Link>)}</div>
    </section>

    <section className={`${styles.section} ${styles.listen}`} id="listen">
      <header className={styles.sectionHead}><h2>Listen.</h2><Link href="/releases">All music →</Link></header>
      <div className={styles.listenGrid}>{allArtists.slice(0, 4).map(artist => <AudioPlayer key={artist.slug} artist={artist} compact />)}</div>
    </section>

    <section className={`${styles.section} ${styles.books}`} id="books">
      <div className={styles.booksBox}><div><p className={styles.eyebrow}>PENREC PUBLISHING</p><h2>Books.</h2><p>In development.</p></div><Link href="/books">See what’s being created →</Link></div>
    </section>
  </main>;
}
