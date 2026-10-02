import Link from "next/link";
export const metadata = { title: "Books | PENREC Music & Publishing", description: "Books and stories in development at PENREC Publishing." };
export default function BooksPage() {
  return <main id="content" className="penrec-about books-page"><header className="penrec-about__hero"><div className="shell"><p>PENREC Publishing</p><h1>Books.</h1><p className="penrec-about__lead">Stories in development.</p></div></header><section className="penrec-about__story"><div className="shell penrec-about__grid"><div><p className="penrec-kicker">Music &amp; imagination</p><h2>The Door at Midnight.</h2></div><div><p>Darren Penman’s fantasy novel has a musical companion: seventeen original songs that explore its characters, places and themes.</p><p>Discover the original soundtrack while the publishing collection takes shape.</p><Link href="/releases/the-door-at-midnight">Explore the soundtrack →</Link></div></div></section></main>;
}
