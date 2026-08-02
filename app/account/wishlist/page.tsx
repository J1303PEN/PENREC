import Image from "next/image";
import Link from "next/link";
import { AccountSection, Alert } from "@/components/account-section";
import { addWishlist, removeWishlist } from "@/app/account/actions";
import { requireUser } from "@/lib/auth";
import { getWishlist } from "@/lib/account";
import { artists, getArtist } from "@/data/catalog";
export const metadata = { title: "Wishlist | PENREC" };
export default async function Page({searchParams}:{searchParams:Promise<{error?:string;message?:string}>}){await requireUser();const [items,p]=await Promise.all([getWishlist(),searchParams]);const saved=new Set(items.map(i=>i.release_slug));return <AccountSection eyebrow="Saved releases" title="Wishlist" intro="Keep a personal shortlist of PENREC releases."><Alert {...p}/><form action={addWishlist} className="wishlist-add"><label>Choose a release<select name="release_slug" required defaultValue=""><option value="" disabled>Select a release</option>{artists.filter(a=>!saved.has(a.slug)).map(a=><option value={a.slug} key={a.slug}>{a.name} — {a.album}</option>)}</select></label><button className="button" type="submit">Add to wishlist</button></form>{items.length===0?<div className="account-empty"><h2>Nothing saved yet</h2><p>Choose a release above to start your wishlist.</p></div>:<div className="wishlist-grid">{items.map(item=>{const a=getArtist(item.release_slug);return <article key={item.id}>{a&&<Image src={a.cover} alt={`${a.album} cover`} width={340} height={340}/>}<div><p>{a?.name}</p><h2>{a?.album||item.release_slug}</h2><div><Link href={`/releases/${item.release_slug}`}>View release</Link><form action={removeWishlist}><input type="hidden" name="id" value={item.id}/><button type="submit">Remove</button></form></div></div></article>})}</div>}</AccountSection>}
