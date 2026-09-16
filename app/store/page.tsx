import Image from "next/image";
import { getPublishedProducts, type CommerceProduct } from "@/lib/commerce";
import { artists } from "@/data/catalog";
import { startCheckout } from "@/app/store/actions";
import { AddToBasketButton, BasketLink } from "@/components/add-to-basket-button";
import styles from "./store.module.css";

export const metadata = { title: "Shop | PENREC Music Group", description: "Shop PENREC music, physical formats, merchandise and limited editions." };

const premiumCapsule = [
  { brand: "PENREC Music Group", title: "Signature Heavyweight Tee", type: "Premium heavyweight tee", image: "/brand/penrec-primary-logo.jpg", copy: "Minimal black-and-gold label merchandise designed as a proper wardrobe piece, not a souvenir tee.", detail: "Printful / Gelato match" },
  { brand: "Fifth & Main", title: "Here We Are Oversized Tee", type: "Artist edition", image: "/images/artists/fifth-and-main/fifth-and-main-hero.png", copy: "A restrained oversized artist tee built around the Fifth & Main identity and Here We Are era.", detail: "Garment selection underway" },
  { brand: "The Verelles", title: "No Halfway Love Crewneck", type: "Premium crewneck", image: "https://audio.penrec.co.uk/verelles/hero.jpg", copy: "Elegant vocal-soul merchandise with a cleaner fashion-led treatment rather than a square album print.", detail: "Supplier matching underway" },
  { brand: "Shelley Dante", title: "Night Dancing Art Tee", type: "Limited artist edition", image: "/images/artists/shelley-dante/shelley-dante-hero.jpg", copy: "A sharper after-dark graphic direction using the Night Dancing visual world as the starting point.", detail: "Artwork refinement underway" },
  { brand: "PENREC Music Group", title: "Monogram Heavy Tote", type: "Label essentials", image: "/brand/penrec-monogram.jpg", copy: "Heavyweight everyday tote with a small PENREC monogram treatment and premium label-first presentation.", detail: "Gelato / Printful match" },
] as const;

function availability(product: CommerceProduct) {
  const now = Date.now();
  if (product.preorder_at && new Date(product.preorder_at).getTime() <= now && product.available_at && new Date(product.available_at).getTime() > now) return "Pre-order";
  if (product.stock_quantity === 0) return "Sold out";
  if (product.stock_quantity === null) return "Made on demand";
  return `${product.stock_quantity} available`;
}

export default async function StorePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const products = await getPublishedProducts();

  return <main id="content" className="store-page shell inside">
    <header className="store-hero">
      <p className="eyebrow">PENREC Shop</p>
      <h1>Music made tangible.</h1>
      <p>Physical editions, digital releases and artist merchandise—fulfilled on demand under the PENREC name.</p>
      <div style={{ marginTop: "24px" }}><BasketLink /></div>
    </header>

    <section className={styles.capsule} aria-labelledby="premium-capsule-title">
      <div className={styles.capsuleHeader}>
        <div><p className="eyebrow">First capsule · preview</p><h2 id="premium-capsule-title">Premium merchandise is coming to PENREC.</h2></div>
        <p>We are matching these first pieces against Printful and Gelato now. The aim is premium blanks, restrained artwork and products people would choose to wear—not generic album-cover merchandise.</p>
      </div>
      <div className={styles.capsuleGrid}>
        {premiumCapsule.map((item) => <article className={styles.card} key={item.title}>
          <div className={styles.visual}>
            <Image src={item.image} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 760px) 50vw, 20vw" />
            <span className={styles.veil} /><span className={styles.badge}>Capsule preview</span>
            <div className={styles.mark}><small>{item.brand}</small><strong>{item.title}</strong></div>
          </div>
          <div className={styles.copy}><p>{item.type}</p><h3>{item.title}</h3><span>{item.copy}</span><footer><b>Launching soon</b><small>{item.detail}</small></footer></div>
        </article>)}
      </div>
    </section>

    {error && <section className="store-checkout-error" role="alert"><strong>Checkout couldn't be started.</strong><p>{error}</p></section>}

    <div className={styles.shopHeading}><h2>Available now</h2><p>Published products appear here automatically once their supplier, variant and fulfilment details are ready.</p></div>

    {products.length === 0 ? <section className="store-empty"><p className="eyebrow">Store launch build</p><h2>First products are being matched.</h2><p>The premium capsule above is now visible while final supplier products, sizes, print files and launch pricing are connected.</p></section> : <section className="store-grid">{products.map((product: CommerceProduct) => {
      const artist = artists.find(item => item.slug === product.artist_slug);
      const state = availability(product);
      return <article key={product.id} className="store-product">
        <div className="store-product__image">{product.image ? <Image src={product.image} alt={product.title} fill sizes="(max-width: 760px) 100vw, 33vw"/> : <span>PENREC</span>}</div>
        <div className="store-product__body">
          <p>{artist?.name || "PENREC"} · {product.format || product.product_type}</p>
          <h2>{product.title}</h2>
          {product.description && <span>{product.description}</span>}
          <small className="store-product__availability">{state}</small>
          <footer>
            <strong>{(product.price_pence/100).toLocaleString("en-GB", {style:"currency",currency:product.currency})}</strong>
            {state === "Sold out" ? <button type="button" disabled>Unavailable</button> : <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}><AddToBasketButton productId={product.id} /><form action={startCheckout}><input type="hidden" name="product_id" value={product.id} /><button type="submit">Buy now</button></form></div>}
          </footer>
          {product.shipping_note && <small>{product.shipping_note}</small>}
        </div>
      </article>;
    })}</section>}
  </main>;
}
