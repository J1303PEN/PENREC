import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getAdminProducts, type CommerceProduct } from "@/lib/commerce";
import { removeCommerceProduct } from "@/app/admin/products/actions";

export const metadata = { title: "Products | PENREC Studio" };

function readiness(product: CommerceProduct) {
  const physical = !`${product.product_type} ${product.format || ""}`.toLowerCase().match(/digital|download/);
  if (!physical || !["printful", "gelato"].includes(product.provider)) return product.status === "published" ? "Live" : "Draft";
  if (!product.provider_product_id) return "Needs supplier product";
  if (product.provider === "printful" && !product.provider_variant_id) return "Needs exact variant";
  if (!product.artwork_file) return "Needs print artwork";
  if (product.supplier_cost_pence == null) return "Needs supplier cost";
  if (product.price_pence <= product.supplier_cost_pence) return "Needs viable retail price";
  return product.status === "published" ? "Live" : "Ready for review";
}

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{created?:string;deleted?:string;error?:string}> }) {
  await requireAdmin();
  const [products, state] = await Promise.all([getAdminProducts(), searchParams]);
  const published = products.filter(p => p.status === "published").length;
  const providers = new Set(products.map(p => p.provider)).size;
  const ready = products.filter(p => readiness(p) === "Ready for review" || readiness(p) === "Live").length;

  return <main id="content" className="admin-page shell inside">
    <header className="account-hero"><div><p className="eyebrow">PENREC16 / Commerce</p><h1>Products</h1><p>Manage music formats, merchandise, pricing and fulfilment partners from one catalogue.</p></div><Link className="button button--gold" href="/admin/products/new">Create product</Link></header>
    {(state.created || state.deleted) && <p className="form-alert form-alert--success">Product catalogue updated.</p>}
    {state.error && <p className="form-alert form-alert--error">{state.error}</p>}
    <section className="admin-metrics admin-metrics--four"><article><strong>{products.length}</strong><span>Products</span></article><article><strong>{published}</strong><span>Published</span></article><article><strong>{ready}</strong><span>Launch-ready / live</span></article><article><strong>{providers}</strong><span>Providers</span></article></section>
    <section className="commerce-admin-list">
      {products.length === 0 ? <div className="empty-state"><h2>No products yet</h2><p>Create a CD, cassette, download or merchandise item to begin building the PENREC shop.</p></div> : products.map(product => {
        const stateLabel = readiness(product);
        const margin = product.supplier_cost_pence == null ? null : product.price_pence - product.supplier_cost_pence;
        return <article key={product.id}>
          <div className="commerce-admin-list__image">{product.image ? <Image src={product.image} alt="" fill sizes="140px" unoptimized/> : <span>No image</span>}</div>
          <div>
            <p>{product.product_type} · {product.format || "standard"}</p>
            <h2>{product.title}</h2>
            <span>{product.provider} · {(product.price_pence/100).toLocaleString("en-GB", {style:"currency",currency:product.currency})} · {product.status}</span>
            <p style={{ marginTop: "8px" }}><strong>{stateLabel}</strong>{margin != null ? ` · ${(margin/100).toLocaleString("en-GB", {style:"currency",currency:product.currency})} gross headroom` : ""}</p>
          </div>
          <nav><Link href={`/admin/products/${product.id}`}>Edit</Link>{product.status === "published" ? <Link href="/store">View store</Link> : <span>Draft only</span>}<form action={removeCommerceProduct}><input type="hidden" name="id" value={product.id}/><button type="submit">Delete</button></form></nav>
        </article>;
      })}
    </section>
    <p className="form-help"><Link href="/admin">← Back to control room</Link></p>
  </main>;
}
