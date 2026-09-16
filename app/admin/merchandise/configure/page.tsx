import Image from "next/image";
import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { getProviderProductDetail } from "@/lib/provider-catalog";

export const metadata = { title: "Configure merchandise | PENREC Studio" };

type Search = { provider?: string; id?: string };

export default async function ConfigureMerchandisePage({ searchParams }: { searchParams: Promise<Search> }) {
  await requireAdmin();
  const { provider, id } = await searchParams;
  if ((provider !== "printful" && provider !== "gelato") || !id) {
    return <main id="content" className="admin-page shell inside"><p className="form-alert form-alert--error">Choose a supplier product first.</p><p><Link href="/admin/merchandise">Back to merchandise suppliers</Link></p></main>;
  }

  let detail;
  try {
    detail = await getProviderProductDetail(provider, id);
  } catch (error) {
    return <main id="content" className="admin-page shell inside"><header className="account-hero"><div><p className="eyebrow">PENREC Studio</p><h1>Supplier product</h1></div><Link className="button button--outline" href="/admin/merchandise">Back</Link></header><p className="form-alert form-alert--error">{error instanceof Error ? error.message : "Supplier product could not be loaded."}</p></main>;
  }

  const label = detail.provider === "printful" ? "Printful" : "Gelato";
  return (
    <main id="content" className="admin-page shell inside">
      <header className="account-hero">
        <div><p className="eyebrow">{label} · live product data</p><h1>{detail.title}</h1><p>{detail.note}</p></div>
        <Link className="button button--outline" href="/admin/merchandise">Back to suppliers</Link>
      </header>

      <section className="admin-grid" style={{ alignItems: "start" }}>
        <article>
          {detail.image ? <div style={{ position: "relative", aspectRatio: "4 / 3", marginBottom: "1rem", overflow: "hidden", borderRadius: "12px", background: "#f2f0eb" }}><Image src={detail.image} alt="" fill sizes="480px" style={{ objectFit: "contain" }} unoptimized /></div> : null}
          <span>{detail.category}</span>
          <h2>{label} product</h2>
          <p><small>Provider ID: {detail.id}</small></p>
        </article>

        <article>
          <span>Supplier attributes</span>
          <h2>Product specification</h2>
          {detail.attributes.length ? <dl>{detail.attributes.map((item) => <div key={`${item.label}-${item.value}`} style={{ marginBottom: ".65rem" }}><dt><strong>{item.label}</strong></dt><dd style={{ margin: 0 }}>{item.value}</dd></div>)}</dl> : <p>No additional attributes returned.</p>}
          {detail.supportedCountries?.length ? <p><small>Supported countries include: {detail.supportedCountries.slice(0, 18).join(", ")}{detail.supportedCountries.length > 18 ? "…" : ""}</small></p> : null}
        </article>
      </section>

      <section className="account-empty" style={{ marginTop: "2rem" }}>
        <p className="eyebrow">Exact fulfilment mapping</p>
        <h2>{detail.provider === "printful" ? "Choose the exact Printful Variant ID" : "Gelato Product UID"}</h2>
        <p>{detail.provider === "printful" ? "Printful orders must use the exact catalogue Variant ID for the chosen size and colour. The parent Product ID is only for browsing." : "Gelato identifies the exact printable product configuration by Product UID. GB support is shown above where returned by Gelato."}</p>
        <div className="admin-grid" style={{ marginTop: "1.25rem" }}>
          {detail.variants.slice(0, 60).map((variant) => <article key={variant.id}>
            <span>{variant.available === false ? "Supplier reports unavailable" : "Supplier variant"}</span>
            <h3>{variant.label}</h3>
            <p>{[variant.color, variant.size].filter(Boolean).join(" · ") || "Exact supplier configuration"}</p>
            {variant.price ? <p><strong>{variant.price} {variant.currency || ""}</strong></p> : null}
            <p><small>Variant / Product UID: {variant.id}</small></p>
          </article>)}
        </div>
      </section>

      <section className="account-empty" style={{ marginTop: "2rem" }}>
        <p className="eyebrow">Next</p>
        <h2>Artwork comes before publication</h2>
        <p>This view deliberately does not place an order. The next merchandising pass connects a PENREC print file and customer-facing mockup to the exact supplier configuration before retail pricing or Store publication is enabled.</p>
      </section>
    </main>
  );
}
