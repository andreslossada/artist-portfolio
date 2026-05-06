"use client";

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
  const isActive = pathname === "/cart";

  return (
    <Link
      href="/cart"
      transitionTypes={["header-nav"]}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-8 items-center gap-2 border-b border-transparent text-ink/45 transition duration-200 md:h-10",
        isActive
          ? "border-accent/40 text-accent"
          : "hover:border-accent/40 hover:text-accent",
      )}
    >
      <span>{label}</span>
      <span className="border-accent/30 min-w-6 border px-1 text-center text-[0.65em] leading-5">
        {count}
      </span>
    </Link>
  );
}
