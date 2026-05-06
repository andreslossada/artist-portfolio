"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/cart-store";

type CartPanelProps = {
  labels: {
    title: string;
    empty: string;
    subtotal: string;
    checkout: string;
    clear: string;
    remove: string;
    loading: string;
    error: string;
    success: string;
  };
  checkoutStatus?: string;
};

export function CartPanel({ labels, checkoutStatus }: CartPanelProps) {
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (checkoutStatus === "success") {
      clearCart();
    }
  }, [checkoutStatus, clearCart]);

  const handleCheckout = async () => {
    if (items.length === 0) {
      return;
    }

    setIsCheckingOut(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            priceId: item.stripePriceId,
            quantity: 1,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Checkout request failed");
      }

      const data = (await response.json()) as { checkoutUrl?: string };

      if (!data.checkoutUrl) {
        throw new Error("Checkout URL missing");
      }

      window.location.assign(data.checkoutUrl);
    } catch {
      setErrorMessage(labels.error);
      setIsCheckingOut(false);
    }
  };

  return (
    <section className="border-ink/10 mt-10 border bg-surface p-6 md:p-8">
      <h2 className="font-display text-4xl leading-tight">{labels.title}</h2>

      {checkoutStatus === "success" ? (
        <p className="mt-4 text-sm font-semibold text-green-700">{labels.success}</p>
      ) : null}

      {items.length === 0 ? (
        <p className="text-muted mt-4 text-base leading-relaxed">{labels.empty}</p>
      ) : (
        <>
          <div className="mt-6 space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="border-ink/10 grid grid-cols-[4rem_1fr_auto] items-center gap-3 border p-3"
              >
                <div className="relative aspect-square w-16 overflow-hidden bg-canvas-soft">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-display text-2xl leading-tight">{item.title}</p>
                  <p className="text-accent mt-1 text-sm font-semibold">
                    ${item.price.toFixed(2)} USD
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="border-accent/20 text-muted hover:border-accent/40 hover:bg-accent-soft/45 hover:text-accent inline-flex h-9 cursor-pointer items-center border px-3 text-xs tracking-[0.14em] uppercase transition"
                >
                  {labels.remove}
                </button>
              </article>
            ))}
          </div>

          <p className="mt-6 text-sm">
            <span className="text-muted uppercase tracking-[0.14em]">
              {labels.subtotal}
            </span>{" "}
            <span className="text-accent ml-2 font-semibold">
              ${subtotal.toFixed(2)} USD
            </span>
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={handleCheckout}
              disabled={isCheckingOut}
              className="bg-accent inline-flex h-11 items-center justify-center border border-accent px-5 text-sm font-semibold !text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isCheckingOut ? labels.loading : labels.checkout}
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="border-accent/35 text-accent hover:bg-accent-soft/55 inline-flex h-11 items-center justify-center border px-5 text-sm font-semibold transition"
            >
              {labels.clear}
            </button>
          </div>
        </>
      )}

      {errorMessage ? (
        <p className="mt-4 text-sm font-semibold text-red-600">{errorMessage}</p>
      ) : null}
    </section>
  );
}
