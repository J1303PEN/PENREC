import Link from "next/link";
import { colouringBooks } from "@/data/colouring-books";
import { ScrollBookReader } from "@/components/books/scroll-book-reader";
const book = colouringBooks.find(book => book.slug === "iconic-trainers-volume-two")!;
export const metadata = { title: `${book.title} | PENREC`, description: book.description };
export default function ColouringBookPage() {
  return <main id="content" style={{ padding: "40px 20px 100px" }}>
    <header style={{ maxWidth: 1000, margin: "0 auto 32px" }}>
      <Link href="/books">← All books</Link>
      <p>PENREC Publishing · Colouring collection</p>
      <h1>{book.title}</h1><p>By Darren Penman</p><p>{book.description}</p>
      <p>{book.format} · {book.pages} pages</p>
    </header>
    <ScrollBookReader {...book} />
  </main>;
}
