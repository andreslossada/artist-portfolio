"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.startsWith("/studio")) {
    return <>{children}</>;
  }

  return (
    <ViewTransition
      default="page-shell"
      enter={{
        default: "page-shell",
        "artwork-open": "none",
        "header-nav": "page-shell",
        "landing-nav": "none",
        "splash-wordmark": "none",
      }}
      exit={{
        default: "page-shell",
        "artwork-open": "none",
        "header-nav": "page-shell",
        "landing-nav": "none",
        "splash-wordmark": "none",
      }}
      share={{
        default: "page-shell",
        "artwork-open": "none",
        "header-nav": "page-shell",
        "landing-nav": "none",
        "splash-wordmark": "none",
      }}
      update={{
        default: "page-shell",
        "artwork-open": "none",
        "header-nav": "page-shell",
        "landing-nav": "none",
        "splash-wordmark": "none",
      }}
    >
      {children}
    </ViewTransition>
  );
}
