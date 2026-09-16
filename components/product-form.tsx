import { artists } from "@/data/catalog";
import type { ManagedRelease } from "@/lib/catalogue-manager";
import type { CommerceProduct } from "@/lib/commerce";

type Props = {
  product?: CommerceProduct | null;
  releases?: ManagedRelease[];
  action: (data: FormData) => void | Promise<void>;
};

const formats = ["CD", "Cassette", "Vinyl", "Digital download", "T-shirt", "Hoodie", "Poster", "Accessory", "Bundle", "Other"];

function localDateTime(value?: string | null) {
  return value ? value.slice(0, 16) : "";
}

function money(value?: number | null) {
  return value === null || value === undefined ? "" : (value / 100).toFixed(2);
}

export function ProductForm({ product, releases = [], action }: Props) {
  const margin = product?.supplier_cost_pence != null ? product.price_pence - product.supplier_cost_pence : null;
  return <form action={action} className="catalogue-editor__form commerce-product-form">
    {product && <input type="hidden" name="id" value={product.id}/>} 

    <section>
      <p className="eyebrow">Step 01</p>
      <h2>Product identity</h2>
      <div className="catalogue-editor__grid">
        <label>Product title<input name="title" required defaultValue={product?.title || ""}/></label>
        <label>URL slug<input name="slug" defaultValue={product?.slug || ""} placeholder="Created automatically from title"/></label>
        <label>Artist<select name="artist_slug" defaultValue={product?.artist_slug || ""}><option value="">PENREC / label product</option>{artists.map(artist => <option key={artist.slug} value={artist.slug}>{artist.name}</option>)}</select></label>
        <label>Linked Studio release<select name="release_id" defaultValue={product?.release_id || ""}><option value="">No linked release</option>{releases.map(release => <option key={release.id} value={release.id}>{release.artist?.name || "PENREC"} — {release.title}</option>)}</select></label>
        <label>Product type<select name="product_type" defaultValue={product?.product_type || "music"}><option value="music">Music</option><option value="clothing">Clothing</option><option value="accessory">Accessory</option><option value="collectable">Collectable</option><option value="bundle">Bundle</option><option value="digital">Digital</option></select></label>
        <label>Format<select name="format" defaultValue={product?.format || ""}><option value="">Choose format</option>{formats.map(format => <option key={format} value={format}>{format}</option>)}</select></label>
        <label>Status<select name="status" defaultValue={product?.status || "draft"}><option value="draft">Draft</option><option value="published">Published</option><option value="archived">Archived</option></select></label>
        <label>SKU<input name="sku" defaultValue={product?.sku || ""} placeholder="Optional internal stock code"/></label>
        <label>Barcode / EAN<input name="barcode" defaultValue={product?.barcode || ""} placeholder="Optional"/></label>
        <label className="span-2">Description<textarea name="description" rows={6} defaultValue={product?.description || ""}/></label>
      </div>
    </section>

    <section>
      <p className="eyebrow">Step 02</p>
      <h2>Media and delivery</h2>
      <div className="catalogue-editor__grid">
        <label className="span-2">Store image / mockup<input name="image" defaultValue={product?.image || ""} placeholder="Customer-facing product mockup URL or path"/></label>
        <label className="span-2">Physical print artwork<input name="artwork_file" defaultValue={product?.artwork_file || ""} placeholder="Print-ready artwork URL used by Printful / Gelato"/><small>Physical merchandise only. This stays separate from customer digital downloads.</small></label>
        <label className="span-2">Digital customer download<input name="digital_file" defaultValue={product?.digital_file || ""} placeholder="Private digital package reference only"/></label>
        <label>Available from<input name="available_at" type="datetime-local" defaultValue={localDateTime(product?.available_at)}/></label>
        <label>Pre-order opens<input name="preorder_at" type="datetime-local" defaultValue={localDateTime(product?.preorder_at)}/></label>
      </div>
    </section>

    <section>
      <p className="eyebrow">Step 03</p>
      <h2>Price and fulfilment</h2>
      <div className="catalogue-editor__grid">
        <label>Retail price<input name="price" type="number" min="0" step="0.01" required defaultValue={product ? (product.price_pence / 100).toFixed(2) : "0.00"}/></label>
        <label>Supplier base cost<input name="supplier_cost" type="number" min="0" step="0.01" defaultValue={money(product?.supplier_cost_pence)} placeholder="Optional until supplier quote is known"/></label>
        <label>Currency<input name="currency" maxLength={3} defaultValue={product?.currency || "GBP"}/></label>
        <label>Stock quantity<input name="stock_quantity" type="number" min="0" step="1" defaultValue={product?.stock_quantity ?? ""} placeholder="Leave blank for on-demand"/></label>
        <label>Weight (grams)<input name="weight_grams" type="number" min="0" step="1" defaultValue={product?.weight_grams ?? ""} placeholder="Optional"/></label>
        <label>Provider<select name="provider" defaultValue={product?.provider || "penrec"}><option value="penrec">PENREC / digital</option><option value="kunaki">Kunaki</option><option value="elasticstage">ElasticStage</option><option value="printful">Printful</option><option value="printify">Printify</option><option value="gelato">Gelato</option><option value="other">Other</option></select></label>
        <label>Provider parent product ID<input name="provider_product_id" defaultValue={product?.provider_product_id || ""} placeholder="Printful Product ID / Gelato Product UID"/></label>
        <label>Exact provider variant ID<input name="provider_variant_id" defaultValue={product?.provider_variant_id || ""} placeholder="Exact Printful size/colour Variant ID; Gelato variant UID if applicable"/><small>Required before a Printful physical product can be fulfilment-ready.</small></label>
        <label className="span-2">Shipping / delivery note<textarea name="shipping_note" rows={3} defaultValue={product?.shipping_note || ""} placeholder="Manufactured on demand and shipped separately."/></label>
      </div>
      {product && <div className="account-summary" style={{ marginTop: "24px" }}><article><strong>{(product.price_pence / 100).toLocaleString("en-GB", { style: "currency", currency: product.currency })}</strong><span>Retail</span></article><article><strong>{product.supplier_cost_pence == null ? "—" : (product.supplier_cost_pence / 100).toLocaleString("en-GB", { style: "currency", currency: product.currency })}</strong><span>Supplier base cost</span></article><article><strong>{margin == null ? "—" : (margin / 100).toLocaleString("en-GB", { style: "currency", currency: product.currency })}</strong><span>Gross headroom before fees / shipping / tax</span></article></div>}
    </section>

    <div className="catalogue-editor__actions">
      <button className="button button--gold" type="submit">{product ? "Save product" : "Create product"}</button>
      <p className="form-help">Physical products should stay Draft until exact supplier variant, print artwork, cost and retail price are complete.</p>
    </div>
  </form>;
}
