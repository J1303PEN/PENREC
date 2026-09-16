import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe, getStripeWebhookSecret } from "@/lib/stripe";
import { fulfilCheckoutSession, failCheckoutSession, processChargeRefund, stripeEventProcessed, recordStripeEvent } from "@/lib/stripe-commerce";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing Stripe signature." },
      { status: 400 }
    );
  }

  const body = await request.text();
  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      getStripeWebhookSecret()
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid Stripe webhook signature." },
      { status: 400 }
    );
  }

  try {
    if (await stripeEventProcessed(event.id)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    switch (event.type) {
      case "checkout.session.completed":
      case "checkout.session.async_payment_succeeded":
        await fulfilCheckoutSession(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "checkout.session.async_payment_failed":
        await failCheckoutSession(
          event.data.object as Stripe.Checkout.Session
        );
        break;

      case "charge.refunded":
        await processChargeRefund(event.data.object as Stripe.Charge);
        break;

      default:
        break;
    }

    await recordStripeEvent(event.id, event.type);
  } catch (error) {
    console.error(
      "PENREC Stripe webhook processing failed:",
      error instanceof Error ? error.message : "Unknown error"
    );

    return NextResponse.json(
      { error: "Webhook processing failed." },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
