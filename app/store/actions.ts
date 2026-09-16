"use server";

import { redirect } from "next/navigation";
import { getPublishedProduct } from "@/lib/commerce";
import { getUser } from "@/lib/penrec-auth";
import { getStripe } from "@/lib/stripe";
import { createPendingOrder } from "@/lib/stripe-commerce";

function storeError(message: string) {
  return `/store?error=${encodeURIComponent(message)}`;
}

function isDigitalProduct(productType: string, format: string | null) {
  const value = `${productType} ${format || ""}`.toLowerCase();
  return value.includes("digital") || value.includes("download");
}

export async function startCheckout(formData: FormData) {
  const productId = String(formData.get("product_id") || "").trim();

  if (!productId) {
    redirect(storeError("Product not found."));
  }

  const product = await getPublishedProduct(productId);

  if (!product) {
    redirect(storeError("This product is no longer available."));
  }

  const now = Date.now();

  if (product.stock_quantity === 0) {
    redirect(storeError("This product is sold out."));
  }

  if (product.preorder_at && new Date(product.preorder_at).getTime() > now) {
    redirect(storeError("Pre-orders for this product have not opened yet."));
  }

  const user = await getUser();
  const digital = isDigitalProduct(product.product_type, product.format);

  if (digital && !user) {
    redirect(`/login?next=${encodeURIComponent("/store")}`);
  }

  const stripe = getStripe();

  const order = await createPendingOrder(
    product,
    user?.id || null,
    user?.email || null
  );

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "https://www.penrec.co.uk/store/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://www.penrec.co.uk/store",
    customer_email: user?.email || undefined,
    client_reference_id: user?.id || undefined,
    metadata: {
      order_id: order.id,
      product_id: product.id,
      product_type: product.product_type,
      provider: product.provider,
      user_id: user?.id || "",
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: product.currency.toLowerCase(),
          unit_amount: product.price_pence,
          product_data: {
            name: product.title,
            description: product.description || undefined,
            images: product.image ? [product.image] : undefined,
            metadata: {
              penrec_product_id: product.id,
              sku: product.sku || "",
            },
          },
        },
      },
    ],
    shipping_address_collection: digital
      ? undefined
      : {
          allowed_countries: ["GB"],
        },
  });

  if (!session.url) {
    redirect(storeError("Checkout could not be started."));
  }

  redirect(session.url);
}
