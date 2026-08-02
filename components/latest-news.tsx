"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BULLETINS_KEY, Bulletin, isBulletinLive, readStored, starterBulletins } from "@/data/studio";

export function LatestNews() {
  const [items, setItems] = useState<Bulletin[]>(starterBulletins);

  useEffect(() => {
    const load = () => {
      const stored = readStored<Bulletin[]>(BULLETINS_KEY, starterBulletins);
      setItems(stored.filter((item) => isBulletinLive(item)).sort((a, b) => b.publishDate.localeCompare(a.publishDate)).slice(0, 3));
    };
    load();
    window.addEventListener("storage", load);
    window.addEventListener("penrec-studio-update", load as EventListener);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("penrec-studio-update", load as EventListener);
    };
  }, []);

  if (!items.length) return null;

  return (
    <section className="section shell studio-latest" aria-labelledby="latest-news-heading">
      <header className="section-title section-title--releases">
        <div><p className="eyebrow">From the label</p><h2 id="latest-news-heading">Latest news</h2></div>
        <Link className="text-link" href="/news">View all bulletins ↗</Link>
      </header>
      <div className="news-grid">
        {items.map((item) => (
          <article className="news-card" key={item.id}>
            <div className="news-card__image">
              <Image src={item.image || "/brand/penrec-brand-guide.jpg"} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" unoptimized={item.image.startsWith("data:")} />
            </div>
            <p className="eyebrow">{item.category} · {new Date(`${item.publishDate}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            <h3>{item.headline}</h3>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
