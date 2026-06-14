"use client";
import { cn } from "@/lib/utils";
import { getCurrentHour, getTimeColors } from "@/lib/time-of-day";
import React, { ReactNode, useMemo } from "react";

interface OceanAuroraProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const OceanAurora = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: OceanAuroraProps) => {
  const auroraOpacity = useMemo(
    () => getTimeColors(getCurrentHour()).auroraOverlayOpacity,
    [],
  );

  return (
    <main>
      <div
        className={cn(
          "bg-seagreen-950 text-sand-100 relative flex h-[100vh] flex-col items-center justify-center",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#1a7a6e_10%,#f5f5dc_15%,#2d9d82_20%,#fffacd_25%,#7de8c0_30%)",
              "--light-gradient":
                "repeating-linear-gradient(100deg,#fffef0_0%,#fffef0_7%,transparent_10%,transparent_12%,#fffef0_16%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#0d3b38_0%,#0d3b38_7%,transparent_10%,transparent_12%,#0d3b38_16%)",

              "--seagreen-600": "#1a7a6e",
              "--seagreen-500": "#2d9d82",
              "--seagreen-400": "#7de8c0",
              "--sand-500": "#f5f5dc",
              "--sand-400": "#fffacd",
              "--black": "#0d3b38",
              "--white": "#fffef0",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--light-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--seagreen-600)_10%,var(--sand-500)_15%,var(--seagreen-500)_20%,var(--sand-400)_25%,var(--seagreen-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--light-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--light-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
            style={{ opacity: auroraOpacity }}
          />
        </div>
        {children}
      </div>
    </main>
  );
};
