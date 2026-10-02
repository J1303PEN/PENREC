import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title:"About | PENREC Music & Publishing", description:"About PENREC Music & Publishing." };

export default function AboutPage(){
 return <main id="content" className="penrec-about">
  <section className="penrec-about__hero"><div className="shell"><p>About PENREC</p><h1>Music is the heart of it.</h1><p className="penrec-about__lead">PENREC is a creative outlet bringing music, publishing and new creative projects together in one place.</p></div></section>
  <section className="penrec-about__story"><div className="shell penrec-about__grid"><div><p className="penrec-kicker">What PENREC is</p><h2>A home for the work.</h2></div><div><p>Music currently makes up the largest part of PENREC: artists, complete releases, songs, artwork and the stories around them. Publishing and other creative work can sit alongside it as PENREC develops.</p><p>The aim is simple: give each project its own identity and present it properly, without forcing everything into one genre or one type of creative work.</p></div></div></section>
  <section className="penrec-about__founder"><div className="shell penrec-about__grid"><div><p className="penrec-kicker">Created by</p><h2>Darren Penman</h2></div><div><p>PENREC brings together songwriting, music production, visual identity, publishing and creative development under one evolving outlet.</p><Link href="/contact">Contact PENREC →</Link></div></div></section>
 </main>;
}