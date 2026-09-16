import Link from "next/link";
import { getStripe } from "@/lib/stripe";

export const metadata = {
  title: "Order confirmed | PENREC Music Group",
};

type SuccessPageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

function money(amount: number | null, currency: string | null) {
  if (amount === null || !currency) return null;

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export default async function StoreSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  if (!sessionId) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-semibold">Order confirmation</h1>
        <p className="mt-4">
          We could not identify a PENREC checkout session.
        </p>
        <Link href="/store" className="mt-8 inline-block underline">
          Return to the store
        </Link>
      </main>
    );
  }

  let session;

  try {
    session = await getStripe().checkout.sessions.retrieve(sessionId);
  } catch {
    return (
      <main className="mx-auto max-w-3xl px-6 py-20">
        <h1 className="text-3xl font-semibold">Order confirmation</h1>
        <p className="mt-4">
          We could not verify this checkout with PENREC.
        </p>
        <Link href="/store" className="mt-8 inline-block underline">
          Return to the store
        </Link>
      </main>
    );
  }

  const paid = session.payment_status === "paid";
  const total = money(session.amount_total, session.currency);
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    null;

  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <p className="text-sm uppercase tracking-[0.2em]">
        PENREC Music Group
      </p>

      <h1 className="mt-4 text-4xl font-semibold">
        {paid ? "Thank you for your order" : "Your payment is processing"}
      </h1>

      <p className="mt-6 text-lg">
        {paid
          ? "Your payment has been confirmed and your PENREC order is now being prepared."
          : "Stripe is still processing your payment. Your order will be confirmed when payment completes."}
      </p>

      {total && (
        <p className="mt-6">
          <strong>Total:</strong> {total}
        </p>
      )}

      {email && (
        <p className="mt-2">
          Confirmation will be sent to <strong>{email}</strong>.
        </p>
      )}

      <div className="mt-10 flex gap-6">
        <Link href="/store" className="underline">
          Continue shopping
        </Link>

        <Link href="/account/orders" className="underline">
          My orders
        </Link>
      </div>
    </main>
  );
}
