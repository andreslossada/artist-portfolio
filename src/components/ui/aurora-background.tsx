"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center bg-canvas text-ink",
        className,
      )}
      data-aurora-bg
      {...props}
    >
      <div
        className="aurora-overlay pointer-events-none fixed inset-0 overflow-hidden"
        style={
          {
            "--aurora":
              "repeating-linear-gradient(100deg,#0891b2_10%,#f59e0b_15%,#06b6d4_20%,#fbbf24_25%,#22d3ee_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",
            "--cyan-500": "#06b6d4",
            "--cyan-400": "#22d3ee",
            "--cyan-600": "#0891b2",
            "--amber-500": "#f59e0b",
            "--amber-400": "#fbbf24",
            "--black": "#000",
            "--white": "#fff",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--aurora)] [background-size:200%] [background-position:50%_50%] opacity-40 blur-[10px] invert-[0.15] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--cyan-600)_10%,var(--amber-500)_15%,var(--cyan-500)_20%,var(--amber-400)_25%,var(--cyan-400)_30%)] after:absolute after:inset-0 after:[background-image:var(--aurora)] after:[background-size:150%] after:[background-attachment:fixed] after:opacity-60 after:content-[""]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        />
      </div>
      {children}
    </div>
  );
};
