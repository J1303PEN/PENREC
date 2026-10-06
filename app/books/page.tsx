import Image from "next/image";
import Link from "next/link";
import { publishingBooks } from "@/data/books";
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
      <section className="penrec-about__story" aria-labelledby="door-title">
        <div className="shell penrec-about__grid">
          <div><p className="penrec-kicker">Music &amp; imagination</p><h2 id="door-title">The Door at Midnight.</h2></div>
          <div>
            <p>Darren Penman’s fantasy novel has a musical companion: seventeen original songs that explore its characters, places and themes.</p>
            <p>Discover the original soundtrack while the publishing collection takes shape.</p>
            <Link href="/releases/the-door-at-midnight">Explore the soundtrack →</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
