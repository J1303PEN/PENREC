import Image from "next/image";
import Link from "next/link";
import { AccountSection } from "@/components/account-section";
import { requireUser } from "@/lib/auth";
import { getLibrary } from "@/lib/account";
import { getArtist } from "@/data/catalog";
export const metadata = { title: "My Music | PENREC" };
export default async function Page(){ await requireUser(); const items=await getLibrary(); return <AccountSection eyebrow="Your collection" title="My Music" intro="Digital releases connected to your PENREC account will appear here.">{items.length===0?<div className="account-empty"><h2>Your library is ready</h2><p>You have no digital purchases yet. Browse the current catalogue and discover your next release.</p><Link className="button" href="/releases">Browse releases</Link></div>:<div className="account-list">{items.map(item=>{const a=getArtist(item.release_slug);return <article key={item.id}>{a&&<Image src={a.cover} alt="" width={110} height={110}/>}<div><span>{item.format}</span><h2>{a?.album||item.release_slug}</h2><p>{a?.name}</p></div></article>})}</div>}</AccountSection>}
