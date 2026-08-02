"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { BULLETINS_KEY, Bulletin, isBulletinLive, readStored, starterBulletins } from "@/data/studio";

export function NewsFeed() {
  const [items, setItems] = useState<Bulletin[]>(starterBulletins);

  useEffect(() => {
    const load = () => setItems(readStored<Bulletin[]>(BULLETINS_KEY, starterBulletins).filter((item) => isBulletinLive(item)).sort((a, b) => b.publishDate.localeCompare(a.publishDate)));
    load();
    window.addEventListener("storage", load);
    window.addEventListener("penrec-studio-update", load as EventListener);
    return () => {
      window.removeEventListener("storage", load);
      window.removeEventListener("penrec-studio-update", load as EventListener);
    };
  }, []);

  return (
    <div className="journal-feed">
      {items.length ? items.map((item) => (
        <article className="journal-story" key={item.id}>
          <div className="journal-story__image">
            <Image src={item.image || "/brand/penrec-brand-guide.jpg"} alt="" fill sizes="(max-width: 760px) 100vw, 45vw" unoptimized={item.image.startsWith("data:")} />
          </div>
          <div className="journal-story__copy">
            <p className="eyebrow">{item.category} · {new Date(`${item.publishDate}T12:00:00`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
            <h2>{item.headline}</h2>
            <p className="journal-story__summary">{item.summary}</p>
            <div className="journal-story__body">{item.body.split("\n").map((paragraph, index) => paragraph && <p key={index}>{paragraph}</p>)}</div>
          </div>
        </article>
      )) : <p className="studio-empty">No published bulletins yet. Create one in PENREC Studio.</p>}
    </div>
  );
}
