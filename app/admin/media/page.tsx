import Link from "next/link";
import { artists } from "@/data/catalog";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Media | PENREC Studio" };

export default async function MediaPage() {
  await requireAdmin();
  const galleryImages = artists.reduce((n, artist) => n + artist.gallery.length, 0);
  const audioFiles = artists.reduce((n, artist) => n + artist.tracks.filter(track => track.audio).length, 0);
  const assets = [
    ["Cover artwork", artists.length, "Square album artwork used across releases and the player."],
    ["Hero photography", artists.length, "Wide-format artist imagery used on artist profile headers."],
    ["Profile photography", artists.length, "Portrait assets used in the artist directory."],
    ["Gallery photography", galleryImages, "Editorial and campaign images across artist galleries."],
    ["Audio previews", audioFiles, "Currently connected playable catalogue previews."],
  ] as const;
  return <main id="content" className="admin-page shell inside">
    <header className="account-hero"><div><p className="eyebrow">PENREC Studio / Media</p><h1>Media overview</h1><p>A live inventory of the catalogue assets already connected to the public experience.</p></div><Link className="button button--gold" href="/studio">Open Media Centre</Link></header>
    <section className="media-ops-grid">{assets.map(([name,count,copy], index)=><article key={name}><span>0{index+1}</span><strong>{count}</strong><h2>{name}</h2><p>{copy}</p></article>)}</section>
    <section className="account-empty"><h2>Operational note</h2><p>PENREC14 keeps the existing browser-based Media Centre intact while adding this protected inventory view. Server-backed uploads will follow when object storage is introduced.</p><Link className="button button--outline" href="/studio">Manage current assets</Link></section>
    <p className="form-help"><Link href="/admin">← Back to control room</Link></p>
  </main>;
}
