import Image from "next/image";
import Link from "next/link";
import { artists } from "@/data/catalog";
import { saturdayBest } from "@/data/saturday-best";
import { theVerelles } from "@/data/verelles";
import { theParkers } from "@/data/parkers";
import { maison45 } from "@/data/maison-45";
import { localArrangement } from "@/data/local-arrangement";
import { directMotion } from "@/data/direct-motion";
import { christieWalker } from "@/data/christie-walker";

export default function ArtistsPage(){
  const roster=[...artists,theVerelles,theParkers,maison45,localArrangement,directMotion,christieWalker,saturdayBest];
  return <main id="content" className="artists-index">
    <header className="artists-index__hero">
      <div className="shell">
        <p>Meet the artists</p>
        <h1>Artists.</h1>
      </div>
    </header>
    <section className="artists-index__roster">
      <div className="shell">
        <div className="artists-index__grid">
          {roster.map((a,i)=><Link href={`/artists/${a.slug}`} className="artists-index__card" key={a.slug}>
            <div className="artists-index__image"><Image src={a.profile} fill sizes="(max-width: 700px) 50vw, 25vw" alt={a.name} style={{objectPosition:a.profilePosition ?? "50% 50%"}}/></div>
            <div className="artists-index__copy">
              <span>{String(i+1).padStart(2,"0")}</span>
              <h2>{a.name}</h2>
              <p>{a.descriptor}</p>
            </div>
          </Link>)}
        </div>
      </div>
    </section>
  </main>;
}