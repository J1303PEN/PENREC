import "server-only";

import Stripe from "stripe";
import { adminRest } from "@/lib/supabase-admin";
import type { CommerceProduct } from "@/lib/commerce";

type PenrecOrder = {
  id: string;
  order_number: string;
  user_id: string | null;
  customer_email: string | null;
  status: string;
  payment_status: string;
};

type OrderSelection = { product: CommerceProduct; quantity: number };

export async function fulfilCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  const orderId = session.metadata?.order_id;
  if (!orderId) throw new Error("Stripe session is missing PENREC order metadata.");

  const orders = await adminRest<PenrecOrder[]>("orders", `select=*&id=eq.${encodeURIComponent(orderId)}&limit=1`);
  const order = orders[0];
  if (!order) throw new Error("Pending PENREC order could not be found.");
  if (order.payment_status === "paid") return;

  const shipping = session.collected_information?.shipping_details || null;
  const email = session.customer_details?.email || session.customer_email || order.customer_email || null;
  const paymentIntent = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id || null;

  await adminRest("orders", `id=eq.${encodeURIComponent(order.id)}`, {
    method: "PATCH",
    body: JSON.stringify({
      status: "paid",
      payment_status: "paid",
      customer_email: email,
      stripe_checkout_session_id: session.id,
      stripe_payment_intent_id: paymentIntent,
      stripe_customer_id: typeof session.customer === "string" ? session.customer : session.customer?.id || null,
      shipping_name: shipping?.name || null,
      shipping_address: shipping?.address || null,
      updated_at: new Date().toISOString(),
    }),
  });

  const orderItems = await adminRest<{ id: string; release_id: string | null; digital_file: string | null }[]>(
    "order_items",
    `select=id,release_id,digital_file&order_id=eq.${encodeURIComponent(order.id)}`
  );

  for (const item of orderItems) {
    if (!item.digital_file) continue;
    await adminRest("digital_entitlements", "", {
      method: "POST",
      body: JSON.stringify({
        order_id: order.id,
        order_item_id: item.id,
        user_id: order.user_id,
        customer_email: email,
        release_id: item.release_id,
        digital_file: item.digital_file,
        status: "active",
      }),
    });
  }
}

export async function failCheckoutSession(session: Stripe.Checkout.Session) {
  const orderId = session.metadata?.order_id;
  if (!orderId) throw new Error("Failed Stripe session is missing PENREC order metadata.");
  await adminRest("orders", `id=eq.${encodeURIComponent(orderId)}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "cancelled", payment_status: "failed", updated_at: new Date().toISOString() }),
  });
}

export async function processChargeRefund(charge: Stripe.Charge) {
  const paymentIntentId = typeof charge.payment_intent === "string" ? charge.payment_intent : charge.payment_intent?.id || null;
  if (!paymentIntentId) throw new Error("Refunded Stripe charge has no PaymentIntent.");

  const orders = await adminRest<PenrecOrder[]>("orders", `select=*&stripe_payment_intent_id=eq.${encodeURIComponent(paymentIntentId)}&limit=1`);
  const order = orders[0];
  if (!order) throw new Error("PENREC order for refunded payment could not be found.");

  await adminRest("orders", `id=eq.${encodeURIComponent(order.id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status: "refunded", payment_status: "refunded", fulfilment_status: "cancelled", updated_at: new Date().toISOString() }),
  });

  await adminRest("digital_entitlements", `order_id=eq.${encodeURIComponent(order.id)}&status=eq.active`, {
    method: "PATCH",
    body: JSON.stringify({ status: "revoked", revoked_at: new Date().toISOString() }),
  });
}

export async function createPendingOrderForItems(
  selections: OrderSelection[],
  userId: string | null,
  customerEmail: string | null
) {
  if (!selections.length) throw new Error("An order needs at least one item.");
  const currencies = new Set(selections.map(({ product }) => product.currency.toUpperCase()));
  if (currencies.size !== 1) throw new Error("All basket items must use the same currency.");

  const id = crypto.randomUUID();
  const number = `PEN-${Date.now().toString(36).toUpperCase()}-${id.slice(0, 8).toUpperCase()}`;
  const total = selections.reduce((sum, { product, quantity }) => sum + product.price_pence * quantity, 0);
  const currency = selections[0].product.currency.toUpperCase();

  const orders = await adminRest<PenrecOrder[]>("orders", "", {
    method: "POST",
    body: JSON.stringify({
      id,
      user_id: userId,
      order_number: number,
      status: "pending",
      total_pence: total,
      currency,
      customer_email: customerEmail,
      payment_status: "unpaid",
      fulfilment_status: "unfulfilled",
      updated_at: new Date().toISOString(),
    }),
  });

  const order = orders[0];
  if (!order) throw new Error("Pending PENREC order could not be created.");

  for (const { product, quantity } of selections) {
    await adminRest("order_items", "", {
      method: "POST",
      body: JSON.stringify({
        order_id: order.id,
        product_id: product.id,
        release_id: product.release_id,
        digital_file: product.digital_file,
        title: product.title,
        artist_slug: product.artist_slug,
        product_type: product.product_type,
        format: product.format,
        provider: product.provider,
        provider_product_id: product.provider_product_id,
        sku: product.sku,
        quantity,
        unit_price_pence: product.price_pence,
        total_pence: product.price_pence * quantity,
      }),
    });
  }

  return order;
}

export async function createPendingOrder(item: CommerceProduct, userId: string | null, customerEmail: string | null) {
  return createPendingOrderForItems([{ product: item, quantity: 1 }], userId, customerEmail);
}

export async function stripeEventProcessed(eventId: string) {
  const rows = await adminRest<{ id: string }[]>("stripe_events", `select=id&id=eq.${encodeURIComponent(eventId)}&limit=1`);
  return rows.length > 0;
}

export async function recordStripeEvent(eventId: string, eventType: string) {
  await adminRest("stripe_events", "", { method: "POST", body: JSON.stringify({ id: eventId, event_type: eventType }) });
}
