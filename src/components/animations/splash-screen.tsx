"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGsapContext } from "@/hooks/use-gsap-context";

type SplashScreenProps = {
  onComplete: () => void;
};

const SPLASH_FADE_MS = 450;
const SPLASH_MAX_DURATION_MS = 9000;
const IRINA_SVG_URL = "/Irina.svg";

function splitCompoundPathData(d: string) {
  const subpaths = d.match(/[Mm][^Mm]*/g);

  if (!subpaths || subpaths.length <= 1) {
    return null;
  }

  return subpaths.map((segment) => segment.trim()).filter(Boolean);
}

function expandCompoundSvgPaths(markup: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(markup, "image/svg+xml");
  const svg = doc.querySelector("svg");

  if (!svg) {
    return markup;
  }

  const paths = Array.from(svg.querySelectorAll("path"));

  paths.forEach((path) => {
    const d = path.getAttribute("d");

    if (!d) {
      return;
    }

    const splitSegments = splitCompoundPathData(d);

    if (!splitSegments) {
      return;
    }

    const parent = path.parentNode;

    if (!parent) {
      return;
    }

    splitSegments.forEach((segment) => {
      const nextPath = path.cloneNode(true) as SVGPathElement;
      nextPath.setAttribute("d", segment);
      parent.insertBefore(nextPath, path);
    });

    parent.removeChild(path);
  });

  return new XMLSerializer().serializeToString(svg);
}

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
          setSvgMarkup(expandCompoundSvgPaths(markup));
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

      orderedPaths.forEach((path) => {
        let length = 900;

        if (typeof path.getTotalLength === "function") {
          try {
            length = path.getTotalLength();
          } catch {
            length = 900;
          }
        }

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          stroke: "#111111",
          strokeWidth: 2.35,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          strokeOpacity: 1,
          fillOpacity: 0,
        });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: finishSplash,
      });

      timeline.to(orderedPaths, {
        strokeDashoffset: 0,
        duration: (_index, target) => {
          const path = target as SVGPathElement;

          try {
            return Math.max(0.28, Math.min(0.76, path.getTotalLength() / 520));
          } catch {
            return 0.5;
          }
        },
        stagger: 0.14,
      });

      timeline.to(
        orderedPaths,
        {
          fillOpacity: 1,
          duration: 0.28,
          stagger: 0.08,
        },
        ">-0.22",
      );

      timeline.to(
        orderedPaths,
        {
          strokeOpacity: 0.45,
          duration: 0.2,
          stagger: 0.05,
        },
        "<",
      );

      timeline.to({}, { duration: 0.45 });
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
      className={`pointer-events-none fixed inset-0 z-9999 flex h-screen w-screen items-center justify-center bg-white transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}
      role="presentation"
      aria-hidden="true"
    >
      {svgMarkup ? (
        <div
          className="w-[min(92vw,900px)] [&>svg]:h-auto [&>svg]:w-full"
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      ) : null}
    </div>
  );
}
