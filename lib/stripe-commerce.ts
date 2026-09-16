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

function orderNumber(sessionId: string) {
  return `PEN-${sessionId.slice(-12).toUpperCase()}`;
}

async function product(id: string) {
  const rows = await adminRest<CommerceProduct[]>(
    "commerce_products",
    `select=*&id=eq.${encodeURIComponent(id)}&limit=1`
  );
  return rows[0] || null;
}

async function existingOrder(sessionId: string) {
  const rows = await adminRest<PenrecOrder[]>(
    "orders",
    `select=*&stripe_checkout_session_id=eq.${encodeURIComponent(sessionId)}&limit=1`
  );
  return rows[0] || null;
}

export async function fulfilCheckoutSession(session: Stripe.Checkout.Session) {
  if (session.payment_status !== "paid") return;

  const orderId = session.metadata?.order_id;
  if (!orderId) {
    throw new Error("Stripe session is missing PENREC order metadata.");
  }

  const orders = await adminRest<PenrecOrder[]>(
    "orders",
    `select=*&id=eq.${encodeURIComponent(orderId)}&limit=1`
  );

  const order = orders[0];
  if (!order) throw new Error("Pending PENREC order could not be found.");

  if (order.payment_status === "paid") return;

  const shipping = session.collected_information?.shipping_details || null;
  const email =
    session.customer_details?.email ||
    session.customer_email ||
    order.customer_email ||
    null;

  const paymentIntent =
    typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id || null;

  await adminRest(
    "orders",
    `id=eq.${encodeURIComponent(order.id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: "paid",
        payment_status: "paid",
        customer_email: email,
        stripe_checkout_session_id: session.id,
        stripe_payment_intent_id: paymentIntent,
        stripe_customer_id:
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id || null,
        shipping_name: shipping?.name || null,
        shipping_address: shipping?.address || null,
        updated_at: new Date().toISOString(),
      }),
    }
  );

  const orderItems = await adminRest<
    {
      id: string;
      release_id: string | null;
      digital_file: string | null;
    }[]
  >(
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
  if (!orderId) {
    throw new Error("Failed Stripe session is missing PENREC order metadata.");
  }

  await adminRest(
    "orders",
    `id=eq.${encodeURIComponent(orderId)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: "cancelled",
        payment_status: "failed",
        updated_at: new Date().toISOString(),
      }),
    }
  );
}

export async function processChargeRefund(charge: Stripe.Charge) {
  const paymentIntentId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id || null;

  if (!paymentIntentId) {
    throw new Error("Refunded Stripe charge has no PaymentIntent.");
  }

  const orders = await adminRest<PenrecOrder[]>(
    "orders",
    `select=*&stripe_payment_intent_id=eq.${encodeURIComponent(paymentIntentId)}&limit=1`
  );

  const order = orders[0];

  if (!order) {
    throw new Error("PENREC order for refunded payment could not be found.");
  }

  await adminRest(
    "orders",
    `id=eq.${encodeURIComponent(order.id)}`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: "refunded",
        payment_status: "refunded",
        fulfilment_status: "cancelled",
        updated_at: new Date().toISOString(),
      }),
    }
  );

  await adminRest(
    "digital_entitlements",
    `order_id=eq.${encodeURIComponent(order.id)}&status=eq.active`,
    {
      method: "PATCH",
      body: JSON.stringify({
        status: "revoked",
        revoked_at: new Date().toISOString(),
      }),
    }
  );
}

export async function createPendingOrder(
  item: CommerceProduct,
  userId: string | null,
  customerEmail: string | null
) {
  const id = crypto.randomUUID();
  const number = `PEN-${Date.now().toString(36).toUpperCase()}-${id
    .slice(0, 8)
    .toUpperCase()}`;

  const orders = await adminRest<PenrecOrder[]>("orders", "", {
    method: "POST",
    body: JSON.stringify({
      id,
      user_id: userId,
      order_number: number,
      status: "pending",
      total_pence: item.price_pence,
      currency: item.currency.toUpperCase(),
      customer_email: customerEmail,
      payment_status: "unpaid",
      fulfilment_status: "unfulfilled",
      updated_at: new Date().toISOString(),
    }),
  });

  const order = orders[0];
  if (!order) throw new Error("Pending PENREC order could not be created.");

  await adminRest("order_items", "", {
    method: "POST",
    body: JSON.stringify({
      order_id: order.id,
      product_id: item.id,
      release_id: item.release_id,
      digital_file: item.digital_file,
      title: item.title,
      artist_slug: item.artist_slug,
      product_type: item.product_type,
      format: item.format,
      provider: item.provider,
      provider_product_id: item.provider_product_id,
      sku: item.sku,
      quantity: 1,
      unit_price_pence: item.price_pence,
      total_pence: item.price_pence,
    }),
  });

  return order;
}

export async function stripeEventProcessed(eventId: string) {
  const rows = await adminRest<{ id: string }[]>(
    "stripe_events",
    `select=id&id=eq.${encodeURIComponent(eventId)}&limit=1`
  );

  return rows.length > 0;
}

export async function recordStripeEvent(
  eventId: string,
  eventType: string
) {
  await adminRest("stripe_events", "", {
    method: "POST",
    body: JSON.stringify({
      id: eventId,
      event_type: eventType,
    }),
  });
}
