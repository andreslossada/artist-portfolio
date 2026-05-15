"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { irinaWordmarkFont } from "@/lib/wordmark-font";
import type { Theme } from "@/lib/theme";

type SplashScreenProps = {
  theme: Theme;
  onComplete: () => void;
};

const SPLASH_EXIT_DELAY_MS = 40;
const SPLASH_MAX_DURATION_MS = 5200;

type ArcPathOptions = {
  baseline: number;
  minSpan: number;
  maxSpan: number;
  liftMin: number;
  liftMax: number;
  dipMin: number;
  dipMax: number;
  startX: number;
  endX: number;
  minArcs?: number;
  maxArcs?: number;
};

type ClosedArcPathOptions = ArcPathOptions & {
  bottomY: number;
};

type WaveGeometry = {
  mainFill: string;
  softFill: string;
  washFill: string;
  swayProfiles: Array<{
    xPercent: number;
    scaleX: number;
    duration: number;
  }>;
};

const toFixed1 = (value: number) => Number(value.toFixed(1));

function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

function createOpenArcPath(options: ArcPathOptions, random: () => number) {
  const {
    baseline,
    minSpan,
    maxSpan,
    liftMin,
    liftMax,
    dipMin,
    dipMax,
    startX,
    endX,
    minArcs,
    maxArcs,
  } = options;

  let currentX = startX;
  let path = `M${toFixed1(currentX)} ${toFixed1(baseline)}`;

  if (typeof minArcs === "number" && typeof maxArcs === "number") {
    const lowerArcCount = Math.max(1, Math.floor(minArcs));
    const upperArcCount = Math.max(lowerArcCount, Math.floor(maxArcs));
    const targetArcs =
      lowerArcCount +
      Math.floor(random() * (upperArcCount - lowerArcCount + 1));
    const totalWidth = endX - startX;
    let remainingWidth = totalWidth;

    for (let arcIndex = 0; arcIndex < targetArcs; arcIndex += 1) {
      const arcsLeft = targetArcs - arcIndex;
      let span = remainingWidth;

      if (arcsLeft > 1) {
        const minForCurrent = Math.max(
          minSpan,
          remainingWidth - maxSpan * (arcsLeft - 1),
        );
        const maxForCurrent = Math.min(
          maxSpan,
          remainingWidth - minSpan * (arcsLeft - 1),
        );

        if (maxForCurrent >= minForCurrent) {
          span = minForCurrent + (maxForCurrent - minForCurrent) * random();
        } else {
          span = remainingWidth / arcsLeft;
        }
      }

      const nextX = currentX + span;
      const crestY = baseline - (liftMin + (liftMax - liftMin) * random());
      const troughY = baseline + (dipMin + (dipMax - dipMin) * random());
      const control1X = currentX + span * (0.22 + random() * 0.16);
      const control2X = currentX + span * (0.64 + random() * 0.18);

      path += ` C${toFixed1(control1X)} ${toFixed1(crestY)} ${toFixed1(control2X)} ${toFixed1(troughY)} ${toFixed1(nextX)} ${toFixed1(baseline)}`;
      currentX = nextX;
      remainingWidth = endX - currentX;
    }

    return path;
  }

  while (currentX < endX - 0.1) {
    const span = Math.min(
      endX - currentX,
      minSpan + (maxSpan - minSpan) * random(),
    );
    const nextX = currentX + span;
    const crestY = baseline - (liftMin + (liftMax - liftMin) * random());
    const troughY = baseline + (dipMin + (dipMax - dipMin) * random());
    const control1X = currentX + span * (0.24 + random() * 0.16);
    const control2X = currentX + span * (0.62 + random() * 0.2);

    path += ` C${toFixed1(control1X)} ${toFixed1(crestY)} ${toFixed1(control2X)} ${toFixed1(troughY)} ${toFixed1(nextX)} ${toFixed1(baseline)}`;
    currentX = nextX;
  }

  return path;
}

function createClosedArcPath(
  options: ClosedArcPathOptions,
  random: () => number,
) {
  const openPath = createOpenArcPath(options, random);

  return `${openPath} L${toFixed1(options.endX)} ${toFixed1(options.bottomY)} L${toFixed1(options.startX)} ${toFixed1(options.bottomY)} Z`;
}

function createRandomWaveGeometry(): WaveGeometry {
  const seed = (Math.random() * 4294967295) >>> 0 || 246813579;
  const random = createSeededRandom(seed);
  const randomBetween = (min: number, max: number) =>
    min + (max - min) * random();

  return {
    mainFill: createClosedArcPath(
      {
        baseline: 318,
        minSpan: 460,
        maxSpan: 780,
        liftMin: 18,
        liftMax: 34,
        dipMin: 8,
        dipMax: 20,
        startX: 0,
        endX: 1440,
        bottomY: 900,
        minArcs: 2,
        maxArcs: 3,
      },
      random,
    ),
    softFill: createClosedArcPath(
      {
        baseline: 346,
        minSpan: 500,
        maxSpan: 860,
        liftMin: 14,
        liftMax: 28,
        dipMin: 8,
        dipMax: 18,
        startX: 0,
        endX: 1440,
        bottomY: 900,
        minArcs: 2,
        maxArcs: 3,
      },
      random,
    ),
    washFill: createClosedArcPath(
      {
        baseline: 196,
        minSpan: 520,
        maxSpan: 980,
        liftMin: 10,
        liftMax: 20,
        dipMin: 6,
        dipMax: 14,
        startX: 0,
        endX: 1440,
        bottomY: 900,
        minArcs: 2,
        maxArcs: 3,
      },
      random,
    ),
    swayProfiles: [
      {
        xPercent: randomBetween(0.55, 1.1),
        scaleX: randomBetween(1.003, 1.01),
        duration: randomBetween(3.2, 4.2),
      },
      {
        xPercent: -randomBetween(1.2, 2.0),
        scaleX: randomBetween(1.008, 1.018),
        duration: randomBetween(3.8, 5.2),
      },
    ],
  };
}

export function SplashScreen({ theme, onComplete }: SplashScreenProps) {
  const [isAnimationReady, setIsAnimationReady] = useState(false);
  const hasCompletedRef = useRef(false);
  const fadeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const finishSplash = useCallback(() => {
    if (hasCompletedRef.current) {
      return;
    }

    hasCompletedRef.current = true;

    fadeTimeoutRef.current = setTimeout(() => {
      onComplete();
    }, SPLASH_EXIT_DELAY_MS);
  }, [onComplete]);

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
      if (hasCompletedRef.current) {
        return;
      }

      // GUIDE: Each visual layer has a data-* selector.
      // If you add/remove layers in JSX, keep these selectors in sync.

      const waveBands = scope.querySelectorAll<HTMLElement>("[data-wave-band]");
      const wash = scope.querySelector<SVGSVGElement>("[data-splash-wash]");
      const mainFillPath = scope.querySelector<SVGPathElement>(
        "[data-wave-main-fill]",
      );
      const softFillPath = scope.querySelector<SVGPathElement>(
        "[data-wave-soft-fill]",
      );
      const title = scope.querySelector<HTMLElement>("[data-splash-title]");
      const titleReflection = scope.querySelector<HTMLElement>(
        "[data-splash-title-reflection]",
      );
      const waveGeometry = createRandomWaveGeometry();

      if (mainFillPath) {
        mainFillPath.setAttribute("d", waveGeometry.mainFill);
      }

      if (softFillPath) {
        softFillPath.setAttribute("d", waveGeometry.softFill);
      }

      if (wash) {
        const washFillPath = wash.querySelector<SVGPathElement>(
          "[data-splash-wash-fill]",
        );

        if (washFillPath) {
          washFillPath.setAttribute("d", waveGeometry.washFill);
        }
      }

      // GUIDE: Initial hidden state before the timeline starts.
      // TUNE HERE for where the wave starts (bigger yPercent = lower/off-screen).
      gsap.set(waveBands, {
        yPercent: (index) => (index === 0 ? 92 : 96),
        xPercent: (index) => (index === 0 ? -5 : 4),
        opacity: (index) => (index === 0 ? 0.98 : 0.68),
        scaleY: (index) => (index === 0 ? 1.03 : 1.08),
      });
      gsap.set(wash, {
        yPercent: 92,
        opacity: 0,
        scaleY: 1.18,
        transformOrigin: "50% 100%",
      });
      gsap.set(title, {
        opacity: 0,
        y: 0,
        filter: "blur(8px)",
        clipPath: "inset(0% 0% 100% 0%)",
      });
      gsap.set(titleReflection, {
        opacity: 0,
        x: 0,
        y: -184,
        scaleX: 1.03,
        scaleY: 3.05,
        filter: "blur(10px)",
        letterSpacing: "0.12em",
        clipPath: "inset(0% 0% 100% 0%)",
        transformOrigin: "50% 0%",
      });

      setIsAnimationReady(true);

      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        onComplete: finishSplash,
      });
      const retreatStart = 1.26;

      // GUIDE: Shoreline motion feels layered, like overlapping beach arcs.
      waveBands.forEach((band, index) => {
        const swayProfile =
          waveGeometry.swayProfiles[
            Math.min(index, waveGeometry.swayProfiles.length - 1)
          ];

        gsap.to(band, {
          xPercent: () => swayProfile.xPercent * (0.82 + Math.random() * 0.32),
          scaleX: () => swayProfile.scaleX * (0.996 + Math.random() * 0.016),
          duration: () => swayProfile.duration * (0.88 + Math.random() * 0.28),
          delay: index * 0.12,
          repeat: -1,
          yoyo: true,
          repeatRefresh: true,
          yoyoEase: true,
          ease: "sine.inOut",
        });
      });

      // GUIDE: Main narrative sequence
      // 1) wave comes in: surge + settle
      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? -5 : -1),
          opacity: (index) => (index === 0 ? 1 : 0.74),
          duration: 0.9,
          stagger: 0.045,
          ease: "power2.out",
        },
        0,
      );

      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? -2 : 1.5),
          duration: 0.42,
          stagger: 0.035,
          ease: "sine.in",
        },
        0.96,
      );

      timeline.to(
        wash,
        {
          yPercent: 10,
          opacity: 0.5,
          scaleY: 1.06,
          duration: 0.66,
          ease: "sine.out",
        },
        0.38,
      );

      timeline.to(
        wash,
        {
          yPercent: 6,
          opacity: 0.62,
          scaleY: 1,
          duration: 0.28,
          ease: "sine.inOut",
        },
        1,
      );

      // 2) short beat while the name stays hidden beneath water
      timeline.to({}, { duration: 0.22 }, 1.2);

      // 3) wave retreats in two fluid phases; reveal happens with the retreat
      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? 44 : 50),
          xPercent: (index) => (index === 0 ? 2.6 : -2.8),
          opacity: (index) => (index === 0 ? 0.94 : 0.6),
          scaleY: (index) => (index === 0 ? 1.06 : 1.11),
          duration: 0.52,
          stagger: 0.04,
          ease: "power1.in",
        },
        retreatStart,
      );

      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? 114 : 120),
          xPercent: (index) => (index === 0 ? 3.8 : -3.8),
          opacity: (index) => (index === 0 ? 0.9 : 0.56),
          scaleY: (index) => (index === 0 ? 1.02 : 1.06),
          duration: 0.88,
          stagger: 0.03,
          ease: "sine.out",
        },
        retreatStart + 0.36,
      );

      timeline.to(
        wash,
        {
          yPercent: 28,
          opacity: 0.48,
          scaleY: 1.02,
          duration: 0.46,
          ease: "sine.in",
        },
        retreatStart + 0.02,
      );

      timeline.to(
        wash,
        {
          yPercent: 108,
          opacity: 0,
          scaleY: 1.35,
          duration: 0.88,
          ease: "sine.out",
        },
        retreatStart + 0.4,
      );

      timeline.to(
        title,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.84,
          ease: "sine.out",
        },
        retreatStart + 0.08,
      );

      timeline.to(
        titleReflection,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 0.58,
          duration: 0.88,
          ease: "sine.out",
        },
        retreatStart + 0.14,
      );

      // GUIDE: small hold before view-transition capture
      timeline.to({}, { duration: 0.28 }, 3.02);
    },
    [finishSplash],
  );

  useEffect(() => {
    const failSafeTimeout = setTimeout(finishSplash, SPLASH_MAX_DURATION_MS);

    return () => {
      window.clearTimeout(failSafeTimeout);

      if (fadeTimeoutRef.current) {
        window.clearTimeout(fadeTimeoutRef.current);
      }
    };
  }, [finishSplash]);

  const shellClassName = theme === "dark" ? "bg-[#0d131b]" : "bg-[#f7eed8bf]";
  const titleClassName = theme === "dark" ? "text-[#f0f0f0]" : "text-[#444444]";
  const reflectionClassName =
    theme === "dark" ? "text-[#f0f0f0]/40" : "text-[#444444]/60";

  const waveMainStops =
    theme === "dark"
      ? [
          "rgba(255,255,255,0.22)",
          "rgba(255,255,255,0.18)",
          "rgba(255,255,255,0.14)",
          "rgba(255,255,255,0.10)",
          "rgba(255,255,255,0.08)",
        ]
      : [
          "rgba(255,255,255,0.88)",
          "rgba(196,233,251,0.72)",
          "rgba(64,158,206,0.76)",
          "rgba(36,116,175,0.78)",
          "rgba(36,116,175,0.72)",
        ];

  const waveSoftStops =
    theme === "dark"
      ? [
          "rgba(255,255,255,0.18)",
          "rgba(255,255,255,0.14)",
          "rgba(255,255,255,0.10)",
          "rgba(255,255,255,0.08)",
          "rgba(255,255,255,0.06)",
        ]
      : [
          "rgba(255,255,255,0.74)",
          "rgba(217,244,255,0.56)",
          "rgba(111,194,229,0.5)",
          "rgba(77,166,208,0.52)",
          "rgba(77,166,208,0.4)",
        ];

  const washBodyStops =
    theme === "dark"
      ? [
          "rgba(255,255,255,0.14)",
          "rgba(255,255,255,0.10)",
          "rgba(255,255,255,0.08)",
          "rgba(255,255,255,0.06)",
          "rgba(255,255,255,0.04)",
        ]
      : [
          "rgba(241,251,255,0.78)",
          "rgba(194,234,250,0.4)",
          "rgba(148,210,236,0.34)",
          "rgba(106,182,218,0.26)",
          "rgba(106,182,218,0.14)",
        ];

  return (
    <div
      ref={scopeRef}
      className={`fixed inset-0 z-9999 flex h-screen w-screen items-center justify-center overflow-hidden ${shellClassName}`}
      style={isAnimationReady ? undefined : { visibility: "hidden" }}
      role="presentation"
      aria-hidden="true"
    >
      <svg
        data-wave-band
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        // GUIDE: To hide lateral edges while animating xPercent,
        // make the layer wider than viewport and shift it left.
        // TUNE HERE: left / width control side bleed.
        className="pointer-events-none absolute top-[-14%] left-[-14%] h-[132%] w-[128%] motion-safe:will-change-transform"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.96) 88%, rgba(0,0,0,0.68) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.96) 88%, rgba(0,0,0,0.68) 95%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden="true"
      >
        <path
          data-wave-main-fill
          d="M0 300 C170 252 350 252 520 300 C690 348 870 348 1040 300 C1210 252 1360 262 1440 308 L1440 900 L0 900 Z"
          fill="url(#waveMain)"
        />

        <defs>
          <linearGradient id="waveMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={waveMainStops[0]} />
            <stop offset="30%" stopColor={waveMainStops[1]} />
            <stop offset="72%" stopColor={waveMainStops[2]} />
            <stop offset="90%" stopColor={waveMainStops[3]} />
            <stop offset="100%" stopColor={waveMainStops[4]} />
          </linearGradient>
        </defs>
      </svg>

      <svg
        data-wave-band
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute top-[-16%] left-[-12%] h-[108%] w-[124%] mix-blend-screen motion-safe:will-change-transform"
        style={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.96) 88%, rgba(0,0,0,0.68) 95%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 78%, rgba(0,0,0,0.96) 88%, rgba(0,0,0,0.68) 95%, rgba(0,0,0,0) 100%)",
        }}
        aria-hidden="true"
      >
        <path
          data-wave-soft-fill
          d="M0 334 C182 292 362 292 544 334 C726 376 906 376 1088 334 C1244 298 1368 304 1440 342 L1440 900 L0 900 Z"
          fill="url(#waveSoft)"
        />

        <defs>
          <linearGradient id="waveSoft" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={waveSoftStops[0]} />
            <stop offset="34%" stopColor={waveSoftStops[1]} />
            <stop offset="74%" stopColor={waveSoftStops[2]} />
            <stop offset="92%" stopColor={waveSoftStops[3]} />
            <stop offset="100%" stopColor={waveSoftStops[4]} />
          </linearGradient>
        </defs>
      </svg>

      <svg
        data-splash-wash
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-x-0 top-[20%] h-[100%] w-full motion-safe:will-change-transform"
        aria-hidden="true"
      >
        <path
          data-splash-wash-fill
          d="M0 188 C238 146 426 230 720 188 C1036 146 1218 228 1440 186 L1440 520 L0 520 Z"
          fill="url(#washBody)"
        />

        <defs>
          <linearGradient id="washBody" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={washBodyStops[0]} />
            <stop offset="38%" stopColor={washBodyStops[1]} />
            <stop offset="78%" stopColor={washBodyStops[2]} />
            <stop offset="92%" stopColor={washBodyStops[3]} />
            <stop offset="100%" stopColor={washBodyStops[4]} />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-x-0 top-[34%] flex justify-center px-6">
        <div className="relative flex flex-col items-center">
          <div className="relative overflow-visible px-4 py-5">
            <span
              data-splash-title
              className={`${irinaWordmarkFont.className} relative z-10 block text-[clamp(3.6rem,13vw,9rem)] font-medium tracking-[0.06em] italic ${titleClassName}`}
            >
              Irina
            </span>

            <span
              data-splash-title-reflection
              className={`${irinaWordmarkFont.className} pointer-events-none absolute top-0 left-0 z-20 block text-[clamp(3.6rem,13vw,9rem)] font-medium tracking-[0.06em] italic select-none ${reflectionClassName}`}
              style={{
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,1) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,1) 100%)",
              }}
            >
              Irina
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
