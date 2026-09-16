"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { CommerceProduct } from "@/lib/commerce";
import { startBasketCheckout } from "@/app/store/actions";
import styles from "./basket.module.css";

const STORAGE_KEY = "penrec_basket_v1";
type BasketLine = { id: string; quantity: number };

function readBasket(): BasketLine[] {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((line) => ({ id: String(line?.id || ""), quantity: Math.max(1, Math.min(10, Number(line?.quantity) || 1)) })).filter((line) => line.id);
  } catch { return []; }
}

function writeBasket(lines: BasketLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("penrec:basket"));
}

export function BasketClient({ products, error }: { products: CommerceProduct[]; error?: string }) {
  const [lines, setLines] = useState<BasketLine[]>([]);

  useEffect(() => { setLines(readBasket()); }, []);

  const selected = useMemo(() => lines.map((line) => ({ line, product: products.find((product) => product.id === line.id) })).filter((entry): entry is { line: BasketLine; product: CommerceProduct } => Boolean(entry.product)), [lines, products]);
  const subtotal = selected.reduce((sum, entry) => sum + entry.product.price_pence * entry.line.quantity, 0);
  const currency = selected[0]?.product.currency || "GBP";

  function setQuantity(id: string, quantity: number) {
    const next = lines.map((line) => line.id === id ? { ...line, quantity: Math.max(1, Math.min(10, quantity)) } : line);
    setLines(next); writeBasket(next);
  }

  function remove(id: string) {
    const next = lines.filter((line) => line.id !== id);
    setLines(next); writeBasket(next);
  }

  if (!selected.length) return <div className={styles.empty}><h2>Your basket is empty.</h2><p>Add merchandise or music from the PENREC Store and it will stay here while you browse.</p><Link className="button button--gold" href="/store">Return to store</Link></div>;

  return <>
    {error ? <div className={styles.error}>{error}</div> : null}
    <div className={styles.basketGrid}>
      <section className={styles.lines}>
        {selected.map(({ line, product }) => <article className={styles.line} key={product.id}>
          <div className={styles.image}>{product.image ? <Image src={product.image} alt="" fill sizes="110px" /> : <span>PENREC</span>}</div>
          <div>
            <small>{product.format || product.product_type}</small>
            <h2>{product.title}</h2>
            {product.description ? <p>{product.description}</p> : null}
            <div className={styles.controls}>
              <button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(product.id, line.quantity - 1)}>−</button>
              <span>{line.quantity}</span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQuantity(product.id, line.quantity + 1)}>+</button>
              <button className={styles.remove} type="button" onClick={() => remove(product.id)}>Remove</button>
            </div>
          </div>
          <strong className={styles.price}>{((product.price_pence * line.quantity) / 100).toLocaleString("en-GB", { style: "currency", currency: product.currency })}</strong>
        </article>)}
      </section>
      <aside className={styles.summary}>
        <p className="eyebrow">Order summary</p>
        <h2>Your basket</h2>
        <div className={styles.summaryRow}><span>Items</span><strong>{selected.reduce((sum, entry) => sum + entry.line.quantity, 0)}</strong></div>
        <div className={styles.summaryRow}><span>Delivery</span><strong>Calculated at checkout</strong></div>
        <div className={styles.summaryTotal}><span>Total</span><strong>{(subtotal / 100).toLocaleString("en-GB", { style: "currency", currency })}</strong></div>
        <form action={startBasketCheckout}>
          <input type="hidden" name="basket_json" value={JSON.stringify(selected.map(({ line }) => line))} />
          <button className="button button--gold" type="submit">Secure checkout</button>
        </form>
        <small>Prices are confirmed again on the server before Stripe checkout starts. Digital items require a PENREC account.</small>
      </aside>
    </div>
  </>;
}
