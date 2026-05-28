"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

type ProductCartCtaProps = {
  labels: {
    addToCart: string;
    unavailable: string;
  };
  available: boolean;
};

export function ProductCartCta({ labels, available }: ProductCartCtaProps) {
  if (!available) {
    return (
      <span
        className={cn(
          "flex h-12 cursor-not-allowed items-center justify-center border border-ink/20 px-5 text-sm font-semibold !text-muted md:inline-flex md:h-11",
          "bg-ink/5"
        )}
      >
        {labels.unavailable}
      </span>
    );
  }

  return (
    <Link
      href="/contact"
      className="bg-accent flex h-12 items-center justify-center border border-accent px-5 text-sm font-semibold !text-white transition hover:brightness-110 md:inline-flex md:h-11"
    >
      {labels.addToCart}
    </Link>
  );
}