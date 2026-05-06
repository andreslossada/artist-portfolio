"use client";

import { Columns3, LayoutGrid, Rows3 } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type ViewModeSwitchProps = {
  className?: string;
};

export function ViewModeSwitch({ className }: ViewModeSwitchProps) {
  const pathname = usePathname();
  const isColumnsActive = pathname === "/";
  const isGridActive = pathname === "/gallery";
  const isListActive = pathname === "/list";

  return (
    <div
      className={cn(
        "inline-flex h-8 items-stretch border border-accent/25 md:h-10",
        className,
      )}
      aria-label="Modo de vista"
    >
      <Link
        href="/"
        transitionTypes={["header-nav"]}
        aria-label="Columnas"
        title="Columnas"
        aria-current={isColumnsActive ? "page" : undefined}
        className={cn(
          "focus-visible:ring-accent/40 focus-visible:ring-offset-canvas inline-flex h-full w-8 items-center justify-center rounded-none border border-transparent transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:w-10",
          isColumnsActive
            ? "border-accent bg-accent !text-white shadow-[0_4px_12px_rgba(43,95,168,0.3)]"
            : "text-ink/60 hover:border-accent/45 hover:text-accent",
        )}
      >
        <Columns3
          className={cn(
            "h-4 w-4 md:h-5 md:w-5",
            isColumnsActive && "!text-white",
          )}
          aria-hidden="true"
        />
      </Link>
      <Link
        href="/gallery"
        transitionTypes={["header-nav"]}
        aria-label="Grid"
        title="Grid"
        aria-current={isGridActive ? "page" : undefined}
        className={cn(
          "focus-visible:ring-accent/40 focus-visible:ring-offset-canvas inline-flex h-full w-8 items-center justify-center rounded-none border border-transparent transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:w-10",
          isGridActive
            ? "border-accent bg-accent !text-white shadow-[0_4px_12px_rgba(43,95,168,0.3)]"
            : "text-ink/60 hover:border-accent/45 hover:text-accent",
        )}
      >
        <LayoutGrid
          className={cn(
            "h-4 w-4 md:h-5 md:w-5",
            isGridActive && "!text-white",
          )}
          aria-hidden="true"
        />
      </Link>
      <Link
        href="/list"
        transitionTypes={["header-nav"]}
        aria-label="Lista"
        title="Lista"
        aria-current={isListActive ? "page" : undefined}
        className={cn(
          "focus-visible:ring-accent/40 focus-visible:ring-offset-canvas inline-flex h-full w-8 items-center justify-center rounded-none border border-transparent transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:w-10",
          isListActive
            ? "border-accent bg-accent !text-white shadow-[0_4px_12px_rgba(43,95,168,0.3)]"
            : "text-ink/60 hover:border-accent/45 hover:text-accent",
        )}
      >
        <Rows3
          className={cn("h-4 w-4 md:h-5 md:w-5", isListActive && "!text-white")}
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
