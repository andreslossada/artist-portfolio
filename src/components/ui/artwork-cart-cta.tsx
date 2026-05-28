"use client";

import Link from "next/link";

type ArtworkCartCtaProps = {
  labels: {
    addToCart: string;
  };
};

export function ArtworkCartCta({ labels }: ArtworkCartCtaProps) {
  return (
    <Link
      href="/contact"
      className="bg-accent inline-flex h-11 items-center justify-center border border-accent px-5 text-sm font-semibold !text-white transition hover:brightness-110"
    >
      {labels.addToCart}
    </Link>
  );
}