import Image from "next/image";
import Link from "next/link";
import { publishingBooks } from "@/data/books";
import { tobiasTangleAndFriends } from "@/data/tobias-tangle-and-friends";
import { doorAtMidnight } from "@/data/door-at-midnight";
import { saturdayBest } from "@/data/saturday-best";
import styles from "./books.module.css";

export const metadata = {
  title: "Books | PENREC Music & Publishing",
  description: "Discover illustrated Tobias Tangle Adventures by Darren Penman, with page-turning readers and PDF downloads.",
};

export default function BooksPage() {
  return (
    <main id="content" className="penrec-about books-page">
      <header className="penrec-about__hero">
        <div className="shell">
          <p>PENREC Publishing</p>
          <h1>Books.</h1>
          <p className="penrec-about__lead">Stories to discover. Worlds to explore.</p>
        </div>
      </header>
      {publishingBooks.map(book => (
        <section key={book.slug} className="penrec-about__story" aria-labelledby={`${book.slug}-title`}>
          <div className="shell penrec-about__grid">
            <div>
              <Image className={styles.cover} src={book.cover}
                alt={`Cover of Tobias Tangle Adventures: ${book.title} by Darren Penman`}
                width={book.number === 1 ? 1443 : 1240} height={book.number === 1 ? 2048 : 1759}
                sizes="(max-width: 700px) 90vw, 40vw" />
            </div>
            <div>
              <p className="penrec-kicker">Tobias Tangle Adventures · Book {book.number}</p>
              <h2 id={`${book.slug}-title`}>Tobias Tangle Adventures: {book.title}</h2>
              <p>By Darren Penman</p>
              <p>{book.description}</p>
              <p>Premium A5 illustrated edition · {book.pages} pages</p>
              <div className={styles.actions}>
                <Link href={`/books/${book.slug}`}>Read the book →</Link>
                <a href={book.pdf} download={book.downloadName}>Download the PDF</a>
              </div>
            </div>
          </div>
        </section>
      ))}
      <section className="penrec-about__story" aria-labelledby="tobias-music-title">
        <div className="shell penrec-about__grid">
          <div>
            <Image className={styles.cover} src={tobiasTangleAndFriends.cover}
              alt={`${tobiasTangleAndFriends.album} album cover`} width={1400} height={1400}
              sizes="(max-width: 700px) 90vw, 40vw" />
          </div>
          <div>
            <p className="penrec-kicker">Music &amp; imagination · Tobias Tangle Adventures</p>
            <h2 id="tobias-music-title">Tobias Tangle &amp; Friends.</h2>
            <p>The musical companion to Darren Penman’s Tobias Tangle books brings their characters, friendships and impossible adventures into fourteen original songs.</p>
            <p>{tobiasTangleAndFriends.album} · {tobiasTangleAndFriends.catalogue}</p>
            <Link href={`/releases/${tobiasTangleAndFriends.slug}`}>Explore the music →</Link>
          </div>
        </div>
      </section>
      {/* Each publishing project precedes its own companion music. Add its book or script here when available. */}
      <section className="penrec-about__story" aria-labelledby="door-title">
        <div className="shell">
          <p className="penrec-kicker">A novel by Darren Penman</p>
          <h2 id="door-title">The Door at Midnight.</h2>
          <p>A fantasy story of strange doorways, shifting worlds and the journey home.</p>
          <div className="penrec-about__grid">
            <div>
              <Image className={styles.cover} src={doorAtMidnight.cover}
                alt="The Door at Midnight original soundtrack cover" width={1400} height={1400}
                sizes="(max-width: 700px) 90vw, 40vw" />
            </div>
            <div>
              <p className="penrec-kicker">Music &amp; imagination · The Door at Midnight</p>
              <h3>The original soundtrack.</h3>
              <p>Seventeen original songs explore the novel’s characters, places and themes.</p>
              <Link href={`/releases/${doorAtMidnight.slug}`}>Explore the soundtrack →</Link>
            </div>
          </div>
        </div>
      </section>
      <section className="penrec-about__story" aria-labelledby="saturday-title">
        <div className="shell">
          <p className="penrec-kicker">A stage musical by Darren Penman</p>
          <h2 id="saturday-title">Saturday Best.</h2>
          <p>One Saturday night in a British dance hall in 1958, with music, lyrics and script by Darren Penman.</p>
          <div className="penrec-about__grid">
            <div>
              <Image className={styles.cover} src={saturdayBest.cover}
                alt="Saturday Best original cast recording cover" width={1400} height={1400}
                sizes="(max-width: 700px) 90vw, 40vw" />
            </div>
            <div>
              <p className="penrec-kicker">Music &amp; imagination · Saturday Best</p>
              <h3>The original cast recording.</h3>
              <p>Sixteen musical numbers follow the evening from Meet Me at the Palais to This Is Saturday Best.</p>
              <Link href={`/releases/${saturdayBest.slug}`}>Explore the cast recording →</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
