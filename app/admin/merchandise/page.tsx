import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getGelatoCatalogue, getPrintfulCatalogue, type ProviderCatalogueResult } from "@/lib/provider-catalog";
import { buildFifthMainFlexfitCap, selectSupplierProduct } from "@/app/admin/merchandise/actions";

export const metadata = { title: "Merchandise | PENREC Studio" };

function ProviderSection({ result }: { result: ProviderCatalogueResult }) {
  const label = result.provider === "printful" ? "Printful" : "Gelato";
  return (
    <section className="account-empty" style={{ marginTop: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", alignItems: "baseline", flexWrap: "wrap" }}>
        <div>
          <p className="eyebrow">Live supplier catalogue</p>
          <h2>{label}</h2>
        </div>
        <strong>{result.configured ? "Connected" : "Not configured"}</strong>
      </div>
      <p>{result.note}</p>

      {result.items.length > 0 ? (
        <div className="admin-grid" style={{ marginTop: "1.25rem" }}>
          {result.items.map((item) => (
            <article key={`${item.provider}-${item.id}`}>
              {item.image ? (
                <div style={{ position: "relative", aspectRatio: "4 / 3", marginBottom: "1rem", overflow: "hidden", borderRadius: "12px", background: "#f2f0eb" }}>
                  <Image src={item.image} alt="" fill sizes="(max-width: 760px) 100vw, 33vw" style={{ objectFit: "contain" }} unoptimized />
                </div>
              ) : null}
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <p>{item.detail || "Supplier product available for PENREC mapping."}</p>
              <p><small>Provider ID: {item.id}</small></p>
              <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1rem" }}>
                <Link className="button button--outline" href={`/admin/merchandise/configure?provider=${encodeURIComponent(item.provider)}&id=${encodeURIComponent(item.id)}`}>Inspect exact variants</Link>
                <form action={selectSupplierProduct}>
                  <input type="hidden" name="provider" value={item.provider} />
                  <input type="hidden" name="provider_product_id" value={item.id} />
                  <input type="hidden" name="title" value={item.title} />
                  <input type="hidden" name="category" value={item.category} />
                  <input type="hidden" name="image" value={item.image || ""} />
                  <input type="hidden" name="detail" value={item.detail || ""} />
                  <button className="button button--gold" type="submit">Select for PENREC</button>
                </form>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default async function MerchandisePage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireAdmin();
  const [printful, gelato, state] = await Promise.all([getPrintfulCatalogue(), getGelatoCatalogue(), searchParams]);

  return (
    <main id="content" className="admin-page shell inside">
      <header className="account-hero">
        <div>
          <p className="eyebrow">PENREC Studio</p>
          <h1>Merchandise suppliers</h1>
          <p>Real supplier products from Printful and Gelato. Inspect exact variants before selecting a product into PENREC.</p>
        </div>
        <Link className="button button--outline" href="/admin">Back to Studio</Link>
      </header>

      {state.error ? <p className="form-alert form-alert--error">{state.error}</p> : null}

      <section className="account-empty" style={{ marginTop: "2rem", borderColor: "rgba(201,169,106,.45)" }}>
        <p className="eyebrow">Priority build · Fifth & Main</p>
        <h2>Closed-Back Structured Cap · Flexfit 6277</h2>
        <p>This uses Printful product 140 directly, selects the live black S/M and L/XL variants returned by Printful, records their exact Variant IDs and supplier pricing, and creates Fifth & Main draft products in Studio. No generated product is used.</p>
        <p><small>Front embroidery · black cap · artwork source: Fifth & Main “Here We Are” brand mark. The products remain Draft until the logo is prepared as embroidery-safe artwork and retail pricing is approved.</small></p>
        <form action={buildFifthMainFlexfitCap} style={{ marginTop: "1rem" }}>
          <button className="button button--gold" type="submit" disabled={!printful.configured}>Build real Fifth & Main cap drafts</button>
        </form>
      </section>

      <section className="admin-metrics admin-metrics--four">
        <article><strong>{printful.items.length}</strong><span>Printful matches</span></article>
        <article><strong>{gelato.items.length}</strong><span>Gelato variants</span></article>
        <article><strong>{printful.configured ? "Yes" : "No"}</strong><span>Printful connected</span></article>
        <article><strong>{gelato.configured ? "Yes" : "No"}</strong><span>Gelato connected</span></article>
      </section>

      <ProviderSection result={printful} />
      <ProviderSection result={gelato} />

      <section className="account-empty" style={{ marginTop: "2rem" }}>
        <p className="eyebrow">Selection workflow</p>
        <h2>Supplier product → exact variant → PENREC draft → artwork → price → publish</h2>
        <p>Printful Product IDs are kept separate from exact Variant IDs, and Gelato Product UIDs can be inspected for attributes and GB support before anything is chosen for the Store.</p>
      </section>
    </main>
  );
}
