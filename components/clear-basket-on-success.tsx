"use client";

import { useEffect } from "react";

export function ClearBasketOnSuccess({ paid }: { paid: boolean }) {
  useEffect(() => {
    if (!paid) return;
    window.localStorage.removeItem("penrec_basket_v1");
    window.dispatchEvent(new Event("penrec:basket"));
  }, [paid]);
  return null;
}
