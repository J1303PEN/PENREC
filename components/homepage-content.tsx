"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArtistCard } from "@/components/artist-card";
import { ReleaseCard } from "@/components/release-card";
import { LatestNews } from "@/components/latest-news";
import { artists } from "@/data/catalog";
import { ANNOUNCEMENT_KEY, Announcement, defaultAnnouncement, defaultHomepage, HOMEPAGE_KEY, HomepageConfig, readStored } from "@/data/studio";

export function HomepageContent() {
  const [config, setConfig] = useState<HomepageConfig>(defaultHomepage);
  const [announcement, setAnnouncement] = useState<Announcement>(defaultAnnouncement);
  useEffect(() => {
    const load = () => { setConfig(readStored(HOMEPAGE_KEY, defaultHomepage)); setAnnouncement(readStored(ANNOUNCEMENT_KEY, defaultAnnouncement)); };
    load(); window.addEventListener("storage", load); window.addEventListener("penrec-studio-update", load as EventListener);
    return () => { window.removeEventListener("storage", load); window.removeEventListener("penrec-studio-update", load as EventListener); };
  }, []);

  const featured = useMemo(() => artists.find((a) => a.slug === config.featuredRelease) || artists[0], [config.featuredRelease]);
  const heroImage = config.heroMode === "release" ? featured.cover : config.heroImage;
  const heroTitle = config.heroMode === "release" ? featured.album : config.heroHeadline;
  const heroArtist = config.heroMode === "release" ? featured.name : config.heroEyebrow;
  const visible = (id: HomepageConfig["sections"][number]) => !config.hiddenSections.includes(id);

  const sections: Record<string, React.ReactNode> = {
    artists: <section className="section shell" id="artists"><header className="section-title"><div><p className="eyebrow">Launch roster</p><h2>Five artists.<br /><em>One creative home.</em></h2></div><p>Our launch collection introduces five distinctive voices, each with a world of their own.</p></header><div className="artist-grid">{artists.map((artist, index) => <ArtistCard key={artist.slug} artist={artist} index={index} />)}</div></section>,
    statement: <section className="statement-panel"><div className="shell statement-panel__inner"><p className="eyebrow">Independent. Artist first.</p><blockquote>Extraordinary music deserves space, care and a lasting presence.</blockquote></div></section>,
    releases: <section className="section shell" id="releases"><header className="section-title section-title--releases"><div><p className="eyebrow">The first five albums</p><h2>Featured releases</h2></div><Link className="text-link" href="/releases">Explore all music ↗</Link></header><div className="release-grid">{artists.map((release) => <ReleaseCard key={release.slug} release={release} />)}</div></section>,
    news: <LatestNews />,
    player: <section className="player-preview"><div className="shell player-preview__grid"><Image src={featured.cover} alt={`${featured.album} cover`} width={420} height={420} /><div className="player-preview__content"><p className="eyebrow">Featured listening</p><h2>{featured.name}</h2><p className="player-preview__track">{featured.album}</p><div className="progress"><span /></div><div className="controls"><button aria-label="Previous">◀</button><button className="play" aria-label="Play">▶</button><button aria-label="Next">▶</button></div></div></div></section>,
  };

  return <main id="content">
    {announcement.enabled && announcement.message && <Link className="penrec-announcement" href={announcement.href || "#"}><span>{announcement.label}</span>{announcement.message}</Link>}
    <section className="hero"><Image className="hero__image" src={heroImage || featured.cover} alt="" fill priority sizes="100vw" unoptimized={(heroImage || "").startsWith("data:")} /><div className="hero__veil" /><div className="shell hero__content"><p className="eyebrow">{heroArtist}</p><h1>{heroTitle}<br /><em>{config.heroMode === "release" ? featured.descriptor : config.heroEmphasis}</em></h1><p className="hero__strapline">{config.heroStrapline}</p><div className="hero__actions"><Link className="button button--gold" href={config.heroButtonHref || "#releases"}>{config.heroButtonText}</Link><Link className="button button--outline" href="#artists">Explore artists</Link></div></div><div className="hero__release"><span>Featured release</span><b>{featured.album}</b><small>{featured.name}</small></div></section>
    {config.sections.filter(visible).map((id) => <div key={id}>{sections[id]}</div>)}
  </main>;
}
