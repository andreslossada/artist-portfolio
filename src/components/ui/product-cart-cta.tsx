"use client";

import Link from "next/link";

type ProductCartCtaProps = {
  labels: {
    addToCart: string;
  };
};

export function ProductCartCta({ labels }: ProductCartCtaProps) {
  return (
    <Link
      href="/contact"
      className="bg-accent flex h-12 items-center justify-center border border-accent px-5 text-sm font-semibold !text-white transition hover:brightness-110 md:inline-flex md:h-11"
    >
      {labels.addToCart}
    </Link>
  );
}