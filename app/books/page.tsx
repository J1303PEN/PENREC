import Image from "next/image";
import Link from "next/link";
import styles from "./books.module.css";

export const metadata = {
  title: "Books | PENREC Music & Publishing",
  description: "Discover Tobias Tangle Adventures: The Clock That Lost Tuesday by Darren Penman, and stories in development at PENREC Publishing.",
};

const bookPdf = "/books/tobias-tangle/the-clock-that-lost-tuesday.pdf";

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
      <section className="penrec-about__story" aria-labelledby="tobias-title">
        <div className="shell penrec-about__grid">
          <div>
            <Image
              className={styles.cover}
              src="/books/tobias-tangle/cover.png"
              alt="Cover of Tobias Tangle Adventures: The Clock That Lost Tuesday by Darren Penman"
              width={1443}
              height={2048}
              sizes="(max-width: 700px) 90vw, 40vw"
            />
          </div>
          <div>
            <p className="penrec-kicker">Tobias Tangle Adventures · Book 1</p>
            <h2 id="tobias-title">Tobias Tangle Adventures: The Clock That Lost Tuesday</h2>
            <p>By Darren Penman</p>
            <p>When every clock in Hushcombe begins repeating Monday, Tobias Tangle follows a mysterious brass compass to the town’s abandoned railway station. Beneath Platform Two, a missing day is trapped inside an enormous clock — and Tobias and his friends have only six seconds to put it back.</p>
            <p>Premium A5 illustrated edition · 48 pages</p>
            <div className={styles.actions}>
              <a href={bookPdf} target="_blank" rel="noopener noreferrer">Read the book (PDF) ↗</a>
              <a href={bookPdf} download="01_Tobias_Tangle_and_the_Clock_That_Lost_Tuesday_Premium_A5_Print.pdf">Download the PDF</a>
            </div>
          </div>
        </div>
      </section>
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
