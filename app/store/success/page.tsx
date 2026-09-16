import Link from "next/link";
import { getStripe } from "@/lib/stripe";
import { ClearBasketOnSuccess } from "@/components/clear-basket-on-success";

export const metadata = { title: "Order confirmed | PENREC Music Group" };

type SuccessPageProps = { searchParams: Promise<{ session_id?: string }> };

function money(amount: number | null, currency: string | null) {
  if (amount === null || !currency) return null;
  return new Intl.NumberFormat("en-GB", { style: "currency", currency: currency.toUpperCase() }).format(amount / 100);
}

export default async function StoreSuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) return <main className="store-page shell inside"><h1>Order confirmation</h1><p>We could not identify a PENREC checkout session.</p><Link className="button button--outline" href="/store">Return to the store</Link></main>;

  let session;
  try { session = await getStripe().checkout.sessions.retrieve(sessionId); }
  catch { return <main className="store-page shell inside"><h1>Order confirmation</h1><p>We could not verify this checkout with PENREC.</p><Link className="button button--outline" href="/store">Return to the store</Link></main>; }

  const paid = session.payment_status === "paid";
  const total = money(session.amount_total, session.currency);
  const email = session.customer_details?.email || session.customer_email || null;

  return <main className="store-page shell inside">
    <ClearBasketOnSuccess paid={paid} />
    <header className="store-hero"><p className="eyebrow">PENREC Music Group</p><h1>{paid ? "Thank you for your order." : "Your payment is processing."}</h1><p>{paid ? "Your payment has been confirmed and your PENREC order is now being prepared." : "Stripe is still processing your payment. Your order will be confirmed when payment completes."}</p></header>
    <section className="account-empty">
      {total && <p><strong>Total:</strong> {total}</p>}
      {email && <p>Confirmation will be sent to <strong>{email}</strong>.</p>}
      <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "24px" }}><Link className="button button--gold" href="/store">Continue shopping</Link><Link className="button button--outline" href="/account/orders">My orders</Link></div>
    </section>
  </main>;
}
