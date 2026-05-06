"use client";

import { usePathname } from "next/navigation";
import { ViewTransition } from "react";

export function RootViewTransition({
  children,
}: {
  children: React.ReactNode;
}) {
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
      }}
      exit={{
        default: "page-shell",
        "artwork-open": "none",
        "header-nav": "page-shell",
      }}
      share={{
        default: "page-shell",
        "artwork-open": "none",
        "header-nav": "page-shell",
      }}
      update={{
        default: "page-shell",
        "artwork-open": "none",
        "header-nav": "page-shell",
      }}
    >
      {children}
    </ViewTransition>
  );
}
