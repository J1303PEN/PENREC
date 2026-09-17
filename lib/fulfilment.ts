import "server-only";

import type { FulfilmentProvider } from "@/lib/commerce";

type FulfilmentProduct = {
  provider_product_id: string | null;
  provider_variant_id: string | null;
  artwork_file: string | null;
  image?: string | null;
};

export type Address = {
  name?: string | null;
  address1?: string | null;
  address2?: string | null;
  line1?: string | null;
  line2?: string | null;
  city?: string | null;
  state?: string | null;
  postcode?: string | null;
  postal_code?: string | null;
  country?: string | null;
  phone?: string | null;
  email?: string | null;
};

export type FulfilmentItem = {
  id: string;
  quantity: number;
  product: FulfilmentProduct;
};

export type FulfilmentResult = {
  provider: FulfilmentProvider;
  providerOrderId: string;
  status: string;
};

function required(name: string) {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`${name} is not configured.`);
  return value;
}

function splitName(name: string | null | undefined) {
  const parts = (name || "PENREC Customer").trim().split(/\s+/);
  return { firstName: parts.shift() || "PENREC", lastName: parts.join(" ") || "Customer" };
}

function normaliseAddress(address: Address): Address {
  return {
    ...address,
    address1: address.address1 || address.line1 || null,
    address2: address.address2 || address.line2 || null,
    postcode: address.postcode || address.postal_code || null,
  };
}

async function providerResponse(response: Response, provider: string) {
  const text = await response.text();
  let body: unknown = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!response.ok) {
    throw new Error(`${provider} API returned ${response.status}: ${typeof body === "string" ? body : JSON.stringify(body)}`);
  }
  return body as Record<string, any>;
}

export async function createPrintfulOrder(orderId: string, rawAddress: Address, items: FulfilmentItem[]): Promise<FulfilmentResult> {
  const address = normaliseAddress(rawAddress);
  const token = required("PRINTFUL_API_TOKEN");
  const { firstName, lastName } = splitName(address.name);

  for (const item of items) {
    if (!item.product.provider_variant_id) throw new Error("Printful item is missing an exact Variant ID.");
    if (!item.product.artwork_file) throw new Error("Printful item is missing print artwork.");
  }

  const response = await fetch("https://api.printful.com/orders?confirm=1&update_existing=1", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      external_id: orderId,
      recipient: {
        name: address.name || `${firstName} ${lastName}`,
        first_name: firstName,
        last_name: lastName,
        address1: address.address1,
        address2: address.address2 || undefined,
        city: address.city,
        state_name: address.state || undefined,
        country_code: address.country || "GB",
        zip: address.postcode,
        phone: address.phone || undefined,
        email: address.email || undefined,
      },
      items: items.map((item) => ({
        variant_id: Number(item.product.provider_variant_id),
        quantity: item.quantity,
        files: [{ type: "default", url: item.product.artwork_file }],
      })),
    }),
  });

  const body = await providerResponse(response, "Printful");
  const result = body.result || body.data || body;
  const providerOrderId = String(result.id || result.order?.id || "");
  if (!providerOrderId) throw new Error("Printful did not return an order ID.");

  return {
    provider: "printful",
    providerOrderId,
    status: String(result.status || result.order?.status || "submitted"),
  };
}

export async function createGelatoOrder(orderId: string, rawAddress: Address, items: FulfilmentItem[]): Promise<FulfilmentResult> {
  const address = normaliseAddress(rawAddress);
  const apiKey = required("GELATO_API_KEY");
  const { firstName, lastName } = splitName(address.name);

  for (const item of items) {
    if (!item.product.provider_product_id) throw new Error("Gelato item is missing a Product UID.");
    if (!item.product.artwork_file) throw new Error("Gelato item is missing print artwork.");
  }

  const response = await fetch("https://order.gelatoapis.com/v4/orders", {
    method: "POST",
    headers: {
      "X-API-KEY": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderType: "order",
      orderReferenceId: orderId,
      customerReferenceId: orderId,
      currency: "GBP",
      items: items.map((item) => ({
        itemReferenceId: item.id,
        productUid: item.product.provider_product_id,
        files: [{ type: "default", url: item.product.artwork_file }],
        quantity: item.quantity,
      })),
      shippingAddress: {
        firstName,
        lastName,
        addressLine1: address.address1,
        addressLine2: address.address2 || undefined,
        city: address.city,
        state: address.state || undefined,
        postCode: address.postcode,
        country: address.country || "GB",
        email: address.email,
        phone: address.phone || undefined,
      },
    }),
  });

  const body = await providerResponse(response, "Gelato");
  const providerOrderId = String(body.id || body.orderId || body.order?.id || "");
  if (!providerOrderId) throw new Error("Gelato did not return an order ID.");

  return {
    provider: "gelato",
    providerOrderId,
    status: String(body.fulfillmentStatus || body.status || body.order?.fulfillmentStatus || "created"),
  };
}

export async function createProviderOrder(
  provider: FulfilmentProvider,
  orderId: string,
  address: Address,
  items: FulfilmentItem[]
): Promise<FulfilmentResult | null> {
  if (!items.length) return null;
  if (provider === "printful") return createPrintfulOrder(orderId, address, items);
  if (provider === "gelato") return createGelatoOrder(orderId, address, items);
  if (provider === "penrec" || provider === "other") return null;
  throw new Error(`Fulfilment provider ${provider} is not yet connected.`);
}
