import Link from "next/link";
import { notFound } from "next/navigation";
import { publishingBooks } from "@/data/books";
import { BookReader } from "@/components/books/book-reader";
import styles from "@/components/books/book-reader.module.css";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return publishingBooks.map(book => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const book = publishingBooks.find(book => book.slug === slug);
  if (!book) notFound();
  return {
    title: `Read ${book.title} | PENREC`,
    description: `Read Tobias Tangle Adventures: ${book.title} by Darren Penman, with illustrated pages you can turn.`,
  };
}

export default async function BookReadingPage({ params }: Props) {
  const { slug } = await params;
  const book = publishingBooks.find(book => book.slug === slug);
  if (!book) notFound();
  return (
    <main id="content" className={styles.page}>
      <header className={styles.header}>
        <Link href="/books">← All books</Link>
        <p>PENREC Publishing · Tobias Tangle Adventures · Book {book.number}</p>
        <h1>{book.title}</h1>
        <p>By Darren Penman</p>
      </header>
      <BookReader key={book.slug} title={book.title} totalPages={book.pages}
        assets={book.assets ?? `/books/${book.slug}`} pdf={book.pdf} downloadName={book.downloadName} />
    </main>
  );
}
