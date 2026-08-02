import Image from "next/image";
import { getPublishedProducts, type CommerceProduct } from "@/lib/commerce";
import { artists } from "@/data/catalog";

export const metadata = { title: "Shop | PENREC Music Group", description: "Shop PENREC music, physical formats, merchandise and limited editions." };

function availability(product: CommerceProduct) {
  const now = Date.now();
  if (product.preorder_at && new Date(product.preorder_at).getTime() <= now && product.available_at && new Date(product.available_at).getTime() > now) return "Pre-order";
  if (product.stock_quantity === 0) return "Sold out";
  if (product.stock_quantity === null) return "Made on demand";
  return `${product.stock_quantity} available`;
}

export default async function StorePage() {
  const products = await getPublishedProducts();
  return <main id="content" className="store-page shell inside">
    <header className="store-hero"><p className="eyebrow">PENREC Shop</p><h1>Music made tangible.</h1><p>Physical editions, digital releases and artist merchandise—fulfilled on demand under the PENREC name.</p></header>
    {products.length === 0 ? <section className="store-empty"><p className="eyebrow">Commerce foundation ready</p><h2>The shop is being curated.</h2><p>Products published from PENREC Studio will appear here automatically.</p></section> : <section className="store-grid">{products.map((product: CommerceProduct) => {
      const artist = artists.find(item => item.slug === product.artist_slug);
      const state = availability(product);
      return <article key={product.id} className="store-product">
        <div className="store-product__image">{product.image ? <Image src={product.image} alt={product.title} fill sizes="(max-width: 760px) 100vw, 33vw"/> : <span>PENREC</span>}</div>
        <div className="store-product__body"><p>{artist?.name || "PENREC"} · {product.format || product.product_type}</p><h2>{product.title}</h2>{product.description && <span>{product.description}</span>}<small className="store-product__availability">{state}</small><footer><strong>{(product.price_pence/100).toLocaleString("en-GB", {style:"currency",currency:product.currency})}</strong><button type="button" disabled>{state === "Sold out" ? "Unavailable" : "Checkout coming next"}</button></footer>{product.shipping_note && <small>{product.shipping_note}</small>}</div>
      </article>;
    })}</section>}
  </main>;
}
