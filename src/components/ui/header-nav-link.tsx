"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type HeaderNavLinkProps = {
  href: "/about" | "/contact";
  children: React.ReactNode;
};

export function HeaderNavLink({ href, children }: HeaderNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      transitionTypes={["header-nav"]}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex h-8 items-center border-b border-transparent text-ink/45 transition duration-200 md:h-10",
        isActive
          ? "border-accent/40 text-accent"
          : "hover:border-accent/40 hover:text-accent",
      )}
    >
      {children}
    </Link>
  );
}
