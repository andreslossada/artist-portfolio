"use client";

import { cn } from "@/lib/utils";
import React, { ReactNode, Suspense, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { SwimmingFish } from "@/components/animations/swimming-fish";
import { getTimeColors, type TimeColors } from "@/lib/time-of-day";

interface TimeOfDayWallpaperBaseProps
  extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
  hourOverride?: number;
}

function buildGlowStyle(colors: TimeColors): React.CSSProperties {
  return {
    backgroundImage: [
      `radial-gradient(ellipse 55% 42% at 82% 4%, ${colors.glowTopColor} 0%, transparent 62%)`,
      `radial-gradient(ellipse 45% 38% at 50% 1%, ${colors.glowTopColor} 0%, transparent 52%)`,
      `radial-gradient(ellipse 90% 38% at 50% 96%, ${colors.glowBottomColor} 0%, transparent 55%)`,
      `radial-gradient(ellipse 45% 32% at 12% 18%, ${colors.glowTopColor} 0%, transparent 50%)`,
    ].join(", "),
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  };
}

function buildAuroraGradient(colors: TimeColors): string {
  return [
    `repeating-linear-gradient(100deg,`,
    `${colors.seagreen600} 10%,`,
    `${colors.sand500} 15%,`,
    `${colors.seagreen500} 20%,`,
    `${colors.sand400} 25%,`,
    `${colors.seagreen400} 30%)`,
  ].join("");
}

function resolveHour(hourOverride?: number): number {
  if (hourOverride !== undefined) return hourOverride;
  const now = new Date();
  return now.getHours() + now.getMinutes() / 60;
}

function TimeOfDayWallpaperBase({
  className,
  children,
  showRadialGradient = true,
  hourOverride,
  ...props
}: TimeOfDayWallpaperBaseProps) {
  const htmlRef = useRef<HTMLElement | null>(null);

  const colors = useMemo(
    () => getTimeColors(resolveHour(hourOverride)),
    [hourOverride],
  );

  useEffect(() => {
    htmlRef.current = document.documentElement;

    const prevCanvas = htmlRef.current.style.getPropertyValue(
      "--color-canvas",
    );
    htmlRef.current.style.setProperty("--color-canvas", colors.canvas);
    htmlRef.current.style.setProperty("--color-canvas-soft", colors.canvasSoft);
    htmlRef.current.style.setProperty("--color-surface", colors.surface);
    htmlRef.current.style.setProperty("--color-ink", colors.ink);
    htmlRef.current.style.setProperty("--color-muted", colors.muted);
    htmlRef.current.style.setProperty("--color-accent", colors.accent);
    htmlRef.current.style.setProperty(
      "--color-accent-soft",
      colors.accentSoft,
    );

    return () => {
      if (htmlRef.current) {
        htmlRef.current.style.setProperty("--color-canvas", prevCanvas ?? "");
      }
    };
  }, [colors]);

  const auroraGradient = useMemo(() => buildAuroraGradient(colors), [colors]);

  useEffect(() => {
    if (hourOverride !== undefined) return;
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours() + now.getMinutes() / 60;
      const fresh = getTimeColors(hour);
      if (htmlRef.current) {
        htmlRef.current.style.setProperty("--color-canvas", fresh.canvas);
        htmlRef.current.style.setProperty("--color-canvas-soft", fresh.canvasSoft);
        htmlRef.current.style.setProperty("--color-surface", fresh.surface);
        htmlRef.current.style.setProperty("--color-ink", fresh.ink);
        htmlRef.current.style.setProperty("--color-muted", fresh.muted);
        htmlRef.current.style.setProperty("--color-accent", fresh.accent);
        htmlRef.current.style.setProperty("--color-accent-soft", fresh.accentSoft);
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [hourOverride]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center transition-colors duration-[2000ms] ease-in-out",
        className,
      )}
      style={{ backgroundColor: colors.canvas, color: colors.ink }}
      data-aurora-bg
      {...props}
    >
      <div
        className="pointer-events-none fixed inset-0 z-[-1] transition-opacity duration-[2000ms] ease-in-out"
        style={buildGlowStyle(colors)}
        aria-hidden="true"
      />
      <div
        className="aurora-overlay pointer-events-none fixed inset-0 overflow-hidden transition-opacity duration-[2000ms] ease-in-out"
        style={
          {
            "--aurora": auroraGradient,
            "--seagreen-500": colors.seagreen500,
            "--seagreen-400": colors.seagreen400,
            "--seagreen-600": colors.seagreen600,
            "--sand-500": colors.sand500,
            "--sand-400": colors.sand400,
            "--black": colors.seagreen600,
            "--white": colors.sand400,
            "--transparent": "transparent",
            opacity: colors.auroraOverlayOpacity,
          } as React.CSSProperties
        }
      >
        <div
          className={cn(
            `after:motion-safe:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--aurora)] [background-size:200%] [background-position:50%_50%] opacity-75 blur-[2px] invert-[0.10] [--aurora:repeating-linear-gradient(100deg,var(--seagreen-600)_10%,var(--sand-500)_15%,var(--seagreen-500)_20%,var(--sand-400)_25%,var(--seagreen-400)_30%)] after:absolute after:inset-0 after:[background-image:var(--aurora)] after:[background-size:150%] after:[background-attachment:fixed] after:opacity-80 after:content-[""]`,
            showRadialGradient &&
              `[mask-image:radial-gradient(ellipse_at_100%_0%,black_30%,var(--transparent)_85%)]`,
          )}
        />
      </div>
      <SwimmingFish color={colors.fishColor} opacity={colors.fishOpacity} />
      <div className="relative z-[1] flex min-h-0 flex-1 flex-col">{children}</div>
    </div>
  );
}

function TimeOfDayWallpaperInner(props: TimeOfDayWallpaperBaseProps) {
  const searchParams = useSearchParams();
  const paramHour = searchParams.get("hour");
  const hourOverride = paramHour ? parseFloat(paramHour) : undefined;
  return <TimeOfDayWallpaperBase {...props} hourOverride={hourOverride} />;
}

export function TimeOfDayWallpaper(props: TimeOfDayWallpaperBaseProps) {
  return (
    <Suspense
      fallback={<TimeOfDayWallpaperBase {...props} />}
    >
      <TimeOfDayWallpaperInner {...props} />
    </Suspense>
  );
}
