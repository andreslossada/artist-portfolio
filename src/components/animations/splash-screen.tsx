"use client";

import { useState } from "react";
import { useGsapContext } from "@/hooks/use-gsap-context";

type SplashScreenProps = {
  onComplete: () => void;
};

const signaturePaths = [
  "M110 306L110 150",
  "M182 306L182 204C182 186 196 172 216 172C235 172 248 184 248 200C248 215 236 226 218 232",
  "M294 306L294 210",
  "M294 176m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0",
  "M344 306L344 218C344 192 364 172 391 172C418 172 438 192 438 218L438 306",
  "M488 252C488 220 513 194 544 194C575 194 600 220 600 252C600 284 575 310 544 310C513 310 488 284 488 252M600 306L600 228",
] as const;

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true);

  const scopeRef = useGsapContext<HTMLDivElement>(
    (scope, gsap) => {
      if (!isVisible) {
        return;
      }

      const paths = scope.querySelectorAll<SVGPathElement>(
        "[data-signature-path]",
      );

      if (paths.length === 0) {
        setIsVisible(false);
        onComplete();
        return;
      }

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        setIsVisible(false);
        onComplete();
        return;
      }

      paths.forEach((path) => {
        const length =
          "getTotalLength" in path && typeof path.getTotalLength === "function"
            ? path.getTotalLength()
            : Math.max(
                600,
                "getBBox" in path && typeof path.getBBox === "function"
                  ? path.getBBox().width * 2.2
                  : 1200,
              );

        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          strokeOpacity: 0,
        });
      });

      const timeline = gsap.timeline({
        onComplete: () => {
          setIsVisible(false);
          onComplete();
        },
      });

      timeline.to(paths, {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power1.inOut",
        stagger: 0.28,
      });

      timeline.to(
        paths,
        {
          strokeOpacity: 1,
          duration: 0.05,
          ease: "none",
          stagger: 0.28,
        },
        0.04,
      );

      timeline.to({}, { duration: 1 });

      timeline.to(scope, {
        autoAlpha: 0,
        duration: 0.8,
        ease: "power1.out",
      });
    },
    [isVisible, onComplete],
  );

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={scopeRef}
      className="fixed inset-0 z-9999 flex h-screen w-screen items-center justify-center bg-white"
      role="presentation"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 760 420"
        className="w-[min(94vw,980px)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {signaturePaths.map((path, index) => (
          <path
            key={`signature-path-${index}`}
            data-signature-path
            d={path}
            className="stroke-accent"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}
