"use server";

import { redirect } from "next/navigation";
import { getPublishedProduct, getPublishedProducts, type CommerceProduct } from "@/lib/commerce";
import { getUser } from "@/lib/penrec-auth";
import { getStripe } from "@/lib/stripe";
import { createPendingOrder, createPendingOrderForItems } from "@/lib/stripe-commerce";

function storeError(message: string, basket = false) {
  return `${basket ? "/store/basket" : "/store"}?error=${encodeURIComponent(message)}`;
}

function isDigitalProduct(productType: string, format: string | null) {
  const value = `${productType} ${format || ""}`.toLowerCase();
  return value.includes("digital") || value.includes("download");
}

function validateProduct(product: CommerceProduct) {
  const now = Date.now();
  if (product.stock_quantity === 0) throw new Error(`${product.title} is sold out.`);
  if (product.preorder_at && new Date(product.preorder_at).getTime() > now) throw new Error(`Pre-orders for ${product.title} have not opened yet.`);
}

export async function startCheckout(formData: FormData) {
  const productId = String(formData.get("product_id") || "").trim();
  if (!productId) redirect(storeError("Product not found."));

  const product = await getPublishedProduct(productId);
  if (!product) redirect(storeError("This product is no longer available."));

  try { validateProduct(product); } catch (error) { redirect(storeError(error instanceof Error ? error.message : "This product is unavailable.")); }

  const user = await getUser();
  const digital = isDigitalProduct(product.product_type, product.format);
  if (digital && !user) redirect(`/login?next=${encodeURIComponent("/store")}`);

  const stripe = getStripe();
  const order = await createPendingOrder(product, user?.id || null, user?.email || null);
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "https://www.penrec.co.uk/store/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://www.penrec.co.uk/store",
    customer_email: user?.email || undefined,
    client_reference_id: user?.id || undefined,
    metadata: { order_id: order.id, product_id: product.id, product_type: product.product_type, provider: product.provider, user_id: user?.id || "" },
    line_items: [{
      quantity: 1,
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: product.price_pence,
        product_data: { name: product.title, description: product.description || undefined, images: product.image ? [product.image] : undefined, metadata: { penrec_product_id: product.id, sku: product.sku || "" } },
      },
    }],
    shipping_address_collection: digital ? undefined : { allowed_countries: ["GB"] },
  });

  if (!session.url) redirect(storeError("Checkout could not be started."));
  redirect(session.url);
}

export async function startBasketCheckout(formData: FormData) {
  const raw = String(formData.get("basket_json") || "").trim();
  let requested: { id: string; quantity: number }[] = [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) throw new Error();
    requested = parsed.slice(0, 20).map((line) => ({ id: String(line?.id || ""), quantity: Math.max(1, Math.min(10, Number(line?.quantity) || 1)) })).filter((line) => line.id);
  } catch {
    redirect(storeError("Your basket could not be read. Please try again.", true));
  }
  if (!requested.length) redirect(storeError("Your basket is empty.", true));

  const published = await getPublishedProducts();
  const selections = requested.map((line) => ({ line, product: published.find((product) => product.id === line.id) }));
  if (selections.some((entry) => !entry.product)) redirect(storeError("One or more basket items are no longer available.", true));

  const safe = selections as { line: { id: string; quantity: number }; product: CommerceProduct }[];
  try { safe.forEach(({ product }) => validateProduct(product)); } catch (error) { redirect(storeError(error instanceof Error ? error.message : "A basket item is unavailable.", true)); }

  const currencies = new Set(safe.map(({ product }) => product.currency.toUpperCase()));
  if (currencies.size !== 1) redirect(storeError("Basket items must use the same currency.", true));

  const user = await getUser();
  const hasDigital = safe.some(({ product }) => isDigitalProduct(product.product_type, product.format));
  const hasPhysical = safe.some(({ product }) => !isDigitalProduct(product.product_type, product.format));
  if (hasDigital && !user) redirect(`/login?next=${encodeURIComponent("/store/basket")}`);

  const order = await createPendingOrderForItems(safe.map(({ line, product }) => ({ product, quantity: line.quantity })), user?.id || null, user?.email || null);
  const stripe = getStripe();
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: "https://www.penrec.co.uk/store/success?session_id={CHECKOUT_SESSION_ID}",
    cancel_url: "https://www.penrec.co.uk/store/basket",
    customer_email: user?.email || undefined,
    client_reference_id: user?.id || undefined,
    metadata: { order_id: order.id, basket_items: String(safe.length), user_id: user?.id || "" },
    line_items: safe.map(({ line, product }) => ({
      quantity: line.quantity,
      price_data: {
        currency: product.currency.toLowerCase(),
        unit_amount: product.price_pence,
        product_data: { name: product.title, description: product.description || undefined, images: product.image ? [product.image] : undefined, metadata: { penrec_product_id: product.id, sku: product.sku || "" } },
      },
    })),
    shipping_address_collection: hasPhysical ? { allowed_countries: ["GB"] } : undefined,
  });

  if (!session.url) redirect(storeError("Checkout could not be started.", true));
  redirect(session.url);
}
