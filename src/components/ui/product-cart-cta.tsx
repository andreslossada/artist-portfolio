"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import type { Product } from "@/types/content";

type ProductCartCtaProps = {
  product: Product;
  labels: {
    addToCart: string;
    viewCart: string;
  };
};

export function ProductCartCta({ product, labels }: ProductCartCtaProps) {
  const addProduct = useCartStore((state) => state.addProduct);
  const isInCart = useCartStore((state) => state.isInCart(product.id));

  if (isInCart) {
    return (
      <Link
        href="/cart"
        className="border-accent/35 text-accent hover:bg-accent-soft/55 inline-flex h-11 items-center justify-center border px-5 text-sm font-semibold transition"
      >
        {labels.viewCart}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() => addProduct(product)}
      className="bg-accent inline-flex h-11 items-center justify-center border border-accent px-5 text-sm font-semibold !text-white transition hover:brightness-110"
    >
      {labels.addToCart}
    </button>
  );
}
