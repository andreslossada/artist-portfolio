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
        "bg-canvas text-ink relative flex flex-col items-center justify-center",
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
              "repeating-linear-gradient(100deg,#7de8c0_10%,#f5f5dc_15%,#7dd3c0_20%,#fffacd_25%,#a8e6cf_30%)",
            "--dark-gradient":
              "repeating-linear-gradient(100deg,#0d5c4d_0%,#0d5c4d_7%,transparent_10%,transparent_12%,#0d5c4d_16%)",
            "--white-gradient":
              "repeating-linear-gradient(100deg,#fffef0_0%,#fffef0_7%,transparent_10%,transparent_12%,#fffef0_16%)",
            "--seagreen-500": "#2d9d82",
            "--seagreen-400": "#7de8c0",
            "--seagreen-600": "#1a7a6e",
            "--sand-500": "#f5f5dc",
            "--sand-400": "#fffacd",
            "--warm-light": "#fff8e7",
            "--black": "#0d5c4d",
            "--white": "#fffef0",
            "--transparent": "transparent",
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--aurora)] [background-size:200%] [background-position:50%_50%] opacity-40 blur-[10px] invert-[0.15] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--seagreen-600)_10%,var(--sand-500)_15%,var(--seagreen-500)_20%,var(--sand-400)_25%,var(--seagreen-400)_30%)] after:absolute after:inset-0 after:[background-image:var(--aurora)] after:[background-size:150%] after:[background-attachment:fixed] after:opacity-60 after:content-[""]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
          )}
        />
      </div>
      {children}
    </div>
  );
};
