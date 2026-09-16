import "server-only";

import { adminRest } from "@/lib/supabase-admin";
import { createProviderOrder, type Address, type FulfilmentItem } from "@/lib/fulfilment";
import type { FulfilmentProvider } from "@/lib/commerce";

type Order = {
  id: string;
  customer_email: string | null;
  shipping_name: string | null;
  shipping_address: Address | null;
  payment_status: string;
  fulfilment_status: string;
};

type OrderItem = {
  id: string;
  quantity: number;
  provider: FulfilmentProvider;
  provider_product_id: string | null;
  digital_file: string | null;
  product_type: string;
};

type FulfilmentRecord = {
  id: string;
  status: string;
  provider_order_id: string | null;
};

function isPhysical(item: OrderItem) {
  const value = item.product_type.toLowerCase();
  return !value.includes("digital") && !value.includes("download");
}

export async function fulfilPhysicalOrder(orderId: string) {
  const orders = await adminRest<Order[]>(
    "orders",
    `select=id,customer_email,shipping_name,shipping_address,payment_status,fulfilment_status&id=eq.${encodeURIComponent(orderId)}&limit=1`
  );
  const order = orders[0];
  if (!order || order.payment_status !== "paid") return;
  if (!order.shipping_address) throw new Error("Paid physical order has no shipping address.");

  const rows = await adminRest<OrderItem[]>(
    "order_items",
    `select=id,quantity,provider,provider_product_id,digital_file,product_type&order_id=eq.${encodeURIComponent(orderId)}`
  );

  const physical = rows.filter((item) => isPhysical(item));
  if (!physical.length) {
    await adminRest("orders", `id=eq.${encodeURIComponent(orderId)}`, {
      method: "PATCH",
      body: JSON.stringify({ fulfilment_status: "not_required", updated_at: new Date().toISOString() }),
    });
    return;
  }

  const groups = new Map<FulfilmentProvider, OrderItem[]>();
  for (const item of physical) {
    const current = groups.get(item.provider) || [];
    current.push(item);
    groups.set(item.provider, current);
  }

  let completed = 0;
  let failed = false;

  await adminRest("orders", `id=eq.${encodeURIComponent(orderId)}`, {
    method: "PATCH",
    body: JSON.stringify({ fulfilment_status: "processing", updated_at: new Date().toISOString() }),
  });

  for (const [provider, group] of groups) {
    if (!group.every((item) => item.provider_product_id)) {
      failed = true;
      await adminRest("orders", `id=eq.${encodeURIComponent(orderId)}`, {
        method: "PATCH",
        body: JSON.stringify({ fulfilment_status: "failed", updated_at: new Date().toISOString() }),
      });
      throw new Error(`${provider} products are missing provider product IDs.`);
    }

    const existing = await adminRest<FulfilmentRecord[]>(
      "order_fulfilments",
      `select=id,status,provider_order_id&order_id=eq.${encodeURIComponent(orderId)}&provider=eq.${encodeURIComponent(provider)}&limit=1`
    );

    if (existing[0]?.status === "submitted" && existing[0].provider_order_id) {
      completed += 1;
      continue;
    }

    const record = existing[0];
    const timestamp = new Date().toISOString();

    if (record) {
      await adminRest("order_fulfilments", `id=eq.${encodeURIComponent(record.id)}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "submitting", error_message: null, updated_at: timestamp }),
      });
    } else {
      await adminRest("order_fulfilments", "", {
        method: "POST",
        body: JSON.stringify({ order_id: orderId, provider, status: "submitting", updated_at: timestamp }),
      });
    }

    try {
      const items: FulfilmentItem[] = group.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        product: {
          provider_product_id: item.provider_product_id,
          digital_file: item.digital_file,
        },
      }));

      const result = await createProviderOrder(provider, orderId, {
        ...order.shipping_address,
        name: order.shipping_name || order.shipping_address.name || null,
        email: order.customer_email || order.shipping_address.email || null,
      }, items);

      if (!result) {
        completed += 1;
        continue;
      }

      await adminRest("order_fulfilments", `order_id=eq.${encodeURIComponent(orderId)}&provider=eq.${encodeURIComponent(provider)}`, {
        method: "PATCH",
        body: JSON.stringify({
          provider_order_id: result.providerOrderId,
          status: "submitted",
          submitted_at: timestamp,
          updated_at: new Date().toISOString(),
        }),
      });
      completed += 1;
    } catch (error) {
      failed = true;
      const message = error instanceof Error ? error.message : "Provider submission failed.";
      await adminRest("order_fulfilments", `order_id=eq.${encodeURIComponent(orderId)}&provider=eq.${encodeURIComponent(provider)}`, {
        method: "PATCH",
        body: JSON.stringify({ status: "failed", error_message: message, updated_at: new Date().toISOString() }),
      });
    }
  }

  const status = failed ? "failed" : completed === groups.size ? "submitted" : "processing";
  await adminRest("orders", `id=eq.${encodeURIComponent(orderId)}`, {
    method: "PATCH",
    body: JSON.stringify({ fulfilment_status: status, updated_at: new Date().toISOString() }),
  });
}
