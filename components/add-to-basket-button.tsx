"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "penrec_basket_v1";

type BasketLine = { id: string; quantity: number };

function readBasket(): BasketLine[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map((line) => ({ id: String(line?.id || ""), quantity: Math.max(1, Math.min(10, Number(line?.quantity) || 1)) }))
      .filter((line) => line.id);
  } catch {
    return [];
  }
}

function writeBasket(lines: BasketLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  window.dispatchEvent(new Event("penrec:basket"));
}

export function AddToBasketButton({ productId }: { productId: string }) {
  const [added, setAdded] = useState(false);

  function add() {
    const lines = readBasket();
    const existing = lines.find((line) => line.id === productId);
    if (existing) existing.quantity = Math.min(10, existing.quantity + 1);
    else lines.push({ id: productId, quantity: 1 });
    writeBasket(lines);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return <button type="button" onClick={add}>{added ? "Added ✓" : "Add to basket"}</button>;
}

export function BasketLink() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readBasket().reduce((sum, line) => sum + line.quantity, 0));
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("penrec:basket", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("penrec:basket", sync);
    };
  }, []);

  return <Link className="button button--outline" href="/store/basket">Basket{count ? ` (${count})` : ""}</Link>;
}
