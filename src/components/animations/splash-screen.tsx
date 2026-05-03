"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGsapContext } from "@/hooks/use-gsap-context";

type SplashScreenProps = {
  onComplete: () => void;
};

const SPLASH_FADE_MS = 500;
const SPLASH_MAX_DURATION_MS = 9000;
const IRINA_SVG_URL = "/Irina.svg";
const SWEEP_DURATION = 2.5;

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const hasCompletedRef = useRef(false);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishSplash = useCallback(() => {
    if (hasCompletedRef.current) {
      return;
    }

    hasCompletedRef.current = true;
    setIsFading(true);

    fadeTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      onComplete();
    }, SPLASH_FADE_MS);
  }, [onComplete]);

  useEffect(() => {
    let cancelled = false;

    fetch(IRINA_SVG_URL, { cache: "force-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load splash SVG");
        }

        return response.text();
      })
      .then((markup) => {
        if (!cancelled) {
          setSvgMarkup(markup);
        }
      })
      .catch(() => {
        if (!cancelled) {
          finishSplash();
        }
      });

    return () => {
      cancelled = true;
    };
  }, [finishSplash]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      finishSplash();
    }
  }, [finishSplash]);

  const scopeRef = useGsapContext<HTMLDivElement>(
    (scope, gsap) => {
      if (!isVisible || !svgMarkup || hasCompletedRef.current) {
        return;
      }

      const paths = Array.from(
        scope.querySelectorAll<SVGPathElement>("svg path"),
      );

      const orderedPaths = [...paths].sort((a, b) => {
        try {
          return a.getBBox().x - b.getBBox().x;
        } catch {
          return 0;
        }
      });

      if (orderedPaths.length === 0) {
        finishSplash();
        return;
      }

      const pathMetrics = orderedPaths.map((path, index) => {
        let length = 900;
        let x = index;

        if (typeof path.getTotalLength === "function") {
          try {
            length = path.getTotalLength();
          } catch {
            length = 900;
          }
        }

        try {
          x = path.getBBox().x;
        } catch {
          x = index;
        }

        gsap.set(path, {
          strokeDasharray: length + 2,
          strokeDashoffset: length + 2,
          stroke: "#161616",
          strokeWidth: 1.7,
          strokeLinecap: "butt",
          strokeLinejoin: "round",
          strokeOpacity: 0,
          fillOpacity: 0,
          opacity: 0,
        });

        return { path, length, x };
      });

      const minX = Math.min(...pathMetrics.map((metric) => metric.x));
      const maxX = Math.max(...pathMetrics.map((metric) => metric.x));
      const xSpan = Math.max(1, maxX - minX);

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: finishSplash,
      });

      timeline.fromTo(
        "[data-splash-logo]",
        {
          opacity: 0,
          y: 16,
          scale: 0.985,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
        },
      );

      timeline.fromTo(
        "[data-splash-reveal]",
        {
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: SWEEP_DURATION,
          ease: "power2.inOut",
        },
        0.08,
      );

      let latestPathEnd = 0;

      pathMetrics.forEach(({ path, length, x }) => {
        const progress = (x - minX) / xSpan;
        const startAt = 0.12 + progress * (SWEEP_DURATION - 0.3);
        const drawDuration = Math.max(0.28, Math.min(0.76, length / 520));
        const fillAt = startAt + drawDuration * 0.64;
        const strokeFadeAt = startAt + drawDuration * 0.82;
        const pathEnd = fillAt + 0.22;

        latestPathEnd = Math.max(latestPathEnd, pathEnd);

        timeline.to(
          path,
          {
            strokeDashoffset: 0,
            strokeOpacity: 1,
            opacity: 1,
            duration: drawDuration,
            ease: "power2.out",
          },
          startAt,
        );

        timeline.to(
          path,
          {
            fillOpacity: 1,
            duration: 0.22,
            ease: "power1.out",
          },
          fillAt,
        );

        timeline.to(
          path,
          {
            strokeOpacity: 0.38,
            duration: 0.18,
            ease: "power1.out",
          },
          strokeFadeAt,
        );
      });

      timeline.to({}, { duration: 0.4 }, latestPathEnd + 0.05);
    },
    [finishSplash, isVisible, svgMarkup],
  );

  useEffect(() => {
    const failSafeTimeout = setTimeout(
      finishSplash,
      SPLASH_MAX_DURATION_MS,
    );

    return () => {
      window.clearTimeout(failSafeTimeout);

      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [finishSplash]);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={scopeRef}
      className={`fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-[radial-gradient(circle_at_20%_18%,#e8f1fb_0%,#ffffff_54%,#f4f8fd_100%)] transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
      role="presentation"
      aria-hidden="true"
    >
      {svgMarkup ? (
        <div className="w-[min(90vw,760px)] px-4 opacity-0" data-splash-logo>
          <div
            className="[&>svg]:h-auto [&>svg]:w-full"
            data-splash-reveal
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: svgMarkup }}
          />
        </div>
      ) : null}
    </div>
  );
}
