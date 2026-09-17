import Link from "next/link";
import { getPublishedProducts } from "@/lib/commerce";
import { BasketClient } from "./basket-client";
import styles from "./basket.module.css";

export const metadata = { title: "Basket | PENREC Music Group" };

export default async function BasketPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const [{ error }, products] = await Promise.all([searchParams, getPublishedProducts()]);
  return <main id="content" className={`${styles.basketPage} store-page shell inside`}>
    <header className={styles.basketHeader}>
      <div><p className="eyebrow">PENREC Store</p><h1>Your basket.</h1><p>Review your selected releases and merchandise before secure Stripe checkout.</p></div>
      <Link className="button button--outline" href="/store">Continue shopping</Link>
    </header>
    <BasketClient products={products} error={error} />
  </main>;
}
