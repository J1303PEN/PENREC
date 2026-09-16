import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getGelatoCatalogue, getPrintfulCatalogue, type ProviderCatalogueResult } from "@/lib/provider-catalog";

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
            </article>
          ))}
        </div>
      ) : null}
    </section>
  );
}

export default async function MerchandisePage() {
  await requireAdmin();
  const [printful, gelato] = await Promise.all([getPrintfulCatalogue(), getGelatoCatalogue()]);

  return (
    <main id="content" className="admin-page shell inside">
      <header className="account-hero">
        <div>
          <p className="eyebrow">PENREC Studio</p>
          <h1>Merchandise suppliers</h1>
          <p>Real supplier products from Printful and Gelato. This is the selection layer before anything is published to the public Store.</p>
        </div>
        <Link className="button button--outline" href="/admin">Back to Studio</Link>
      </header>

      <section className="admin-metrics admin-metrics--four">
        <article><strong>{printful.items.length}</strong><span>Printful matches</span></article>
        <article><strong>{gelato.items.length}</strong><span>Gelato variants</span></article>
        <article><strong>{printful.configured ? "Yes" : "No"}</strong><span>Printful connected</span></article>
        <article><strong>{gelato.configured ? "Yes" : "No"}</strong><span>Gelato connected</span></article>
      </section>

      <ProviderSection result={printful} />
      <ProviderSection result={gelato} />

      <section className="account-empty" style={{ marginTop: "2rem" }}>
        <p className="eyebrow">Next build step</p>
        <h2>Select, map, then publish</h2>
        <p>The next pass adds PENREC product records, artwork/print-file mapping, sizes, costs and retail pricing. No supplier order is placed from this screen.</p>
      </section>
    </main>
  );
}
