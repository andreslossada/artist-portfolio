"use client";

import Link from "next/link";
import { useCartStore } from "@/store/cart-store";
import type { Artwork } from "@/types/content";

type ArtworkCartCtaProps = {
  artwork: Artwork;
  labels: {
    addToCart: string;
    viewCart: string;
  };
};

export function ArtworkCartCta({ artwork, labels }: ArtworkCartCtaProps) {
  const addArtwork = useCartStore((state) => state.addArtwork);
  const isInCart = useCartStore((state) => state.isInCart(artwork.id));

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
      onClick={() => addArtwork(artwork)}
      className="bg-accent inline-flex h-11 items-center justify-center border border-accent px-5 text-sm font-semibold !text-white transition hover:brightness-110"
    >
      {labels.addToCart}
    </button>
  );
}
