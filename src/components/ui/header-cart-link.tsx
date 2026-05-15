"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";

type HeaderCartLinkProps = {
  label: string;
};

export function HeaderCartLink({ label }: HeaderCartLinkProps) {
  const pathname = usePathname();
  const count = useCartStore((state) => state.count());
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const isActive = pathname === "/cart";

  return (
    <Link
      href="/cart"
      transitionTypes={["header-nav"]}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative inline-flex h-8 items-center justify-center border-b border-transparent text-ink/45 transition duration-200 md:h-10",
        isActive
          ? "border-accent/40 text-accent"
          : "hover:border-accent/40 hover:text-accent",
      )}
    >
      <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
      {hasHydrated && count > 0 ? (
        <span className="border-accent/30 bg-surface absolute -top-0 right-0 min-w-4 -translate-y-1/2 translate-x-1/2 border px-1 text-center text-[0.55em] leading-4">
          {count}
        </span>
      ) : null}
    </Link>
  );
}
