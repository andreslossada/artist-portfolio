"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { useGsapContext } from "@/hooks/use-gsap-context";
import { irinaWordmarkFont } from "@/lib/wordmark-font";
import { ShellIcon } from "@/components/ui/shell-icon";
import { getTimeColors, getCurrentHour } from "@/lib/time-of-day";

type SplashScreenProps = {
  onComplete: () => void;
  hourOverride?: number;
};

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

export function SplashScreen({ onComplete, hourOverride }: SplashScreenProps) {
  const hasCompletedRef = useRef(false);

  const finishSplash = useCallback(() => {
    if (hasCompletedRef.current) {
      return;
    }
    hasCompletedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      finishSplash();
    }
  }, [finishSplash]);

  const timeColors = useMemo(() => {
    const hour = hourOverride ?? getCurrentHour();
    return getTimeColors(hour);
  }, [hourOverride]);

  useEffect(() => {
    document.documentElement.setAttribute("data-splash", "active");
    document.documentElement.style.setProperty(
      "--splash-sand",
      timeColors.sandColor,
    );

    return () => {
      document.documentElement.removeAttribute("data-splash");
      document.documentElement.style.removeProperty("--splash-sand");
    };
  }, [timeColors.sandColor]);

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
      const shellIcon = scope.querySelector<HTMLElement>("[data-splash-shell]");
      const titleReflection = scope.querySelector<HTMLElement>(
        "[data-splash-title-reflection]",
      );
      const bgLayer = scope.querySelector<HTMLElement>("[data-splash-bg]");
      const auroraLayer = scope.querySelector<HTMLElement>(
        "[data-splash-aurora]",
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
        opacity: (index) => (index === 0 ? 1.0 : 0.85),
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
        willChange: "clip-path, filter",
        filter: "blur(8px)",
        clipPath: "inset(0% 0% 100% 0%)",
      });
      gsap.set(shellIcon, {
        opacity: 0,
        willChange: "clip-path",
        clipPath: "inset(0% 0% 100% 0%)",
      });
      gsap.set(titleReflection, {
        opacity: 0,
        x: 0,
        y: -(window.innerHeight * 0.18),
        scaleX: 1.03,
        scaleY: 3.05,
        willChange: "clip-path, filter",
        filter: "blur(10px)",
        letterSpacing: "0.12em",
        clipPath: "inset(0% 0% 100% 0%)",
        transformOrigin: "50% 0%",
      });

      const timeline = gsap.timeline({
        defaults: { ease: "sine.inOut" },
        onComplete: () => {
          finishSplash();
        },
      });

      const delay = 0.5;
      const retreatStart = delay + 1.26;

      // Reveal splash content after initial delay
      timeline.set(scope, { opacity: 1 }, delay);

      // GUIDE: Shoreline motion feels layered, like overlapping beach arcs.
      waveBands.forEach((band, index) => {
        const swayProfile =
          waveGeometry.swayProfiles[
            Math.min(index, waveGeometry.swayProfiles.length - 1)
          ];

        const swayX = swayProfile.xPercent * (0.82 + Math.random() * 0.32);
        const swayScaleX = swayProfile.scaleX * (0.996 + Math.random() * 0.016);
        const swayDuration = swayProfile.duration * (0.88 + Math.random() * 0.28);

        gsap.to(band, {
          xPercent: swayX,
          scaleX: swayScaleX,
          duration: swayDuration,
          delay: index * 0.12,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          ease: "sine.inOut",
        });
      });

      // GUIDE: Main narrative sequence
      // 1) wave comes in: surge + settle
      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? -5 : -8),
          opacity: (index) => (index === 0 ? 1 : 0.92),
          duration: 0.9,
          stagger: 0.045,
          ease: "power2.out",
        },
        delay,
      );

      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? -2 : -3),
          duration: 0.42,
          stagger: 0.035,
          ease: "sine.in",
        },
        delay + 0.96,
      );

      timeline.to(
        wash,
        {
          yPercent: 10,
          opacity: 0.80,
          scaleY: 1.06,
          duration: 0.66,
          ease: "sine.out",
        },
        delay + 0.38,
      );

      timeline.to(
        wash,
        {
          yPercent: 6,
          opacity: 0.88,
          scaleY: 1,
          duration: 0.28,
          ease: "sine.inOut",
        },
        delay + 1,
      );

      // 2) short beat while the name stays hidden beneath water
      timeline.to({}, { duration: 0.22 }, delay + 1.2);

      // 3) wave retreats in two fluid phases; reveal happens with the retreat
      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? 44 : 50),
          xPercent: (index) => (index === 0 ? 2.6 : -2.8),
          opacity: (index) => (index === 0 ? 1.0 : 0.85),
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
          opacity: (index) => (index === 0 ? 0.95 : 0.80),
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
          opacity: 0.72,
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
        retreatStart - 0.12,
      );

      timeline.to(
        shellIcon,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 1,
          duration: 0.84,
          ease: "sine.out",
        },
        retreatStart - 0.12,
      );

      timeline.to(
        titleReflection,
        {
          clipPath: "inset(0% 0% 0% 0%)",
          opacity: 0.58,
          duration: 0.88,
          ease: "sine.out",
        },
        retreatStart + 0.06,
      );

      // 4) second wave surges back up to cover the screen and transition out
      const secondSurgeStart = delay + 3.0;

      // Wave bands surge back up from below
      timeline.to(
        waveBands,
        {
          yPercent: (index) => (index === 0 ? -42 : -46),
          xPercent: (index) => (index === 0 ? -2.4 : 2.2),
          opacity: (index) => (index === 0 ? 1 : 0.88),
          scaleY: (index) => (index === 0 ? 1.04 : 1.1),
          duration: 1.7,
          stagger: 0.08,
          ease: "power2.inOut",
        },
        secondSurgeStart,
      );

      // Wash surges back up
      timeline.to(
        wash,
        {
          yPercent: -38,
          opacity: 0.72,
          scaleY: 1.12,
          duration: 1.7,
          ease: "power2.inOut",
        },
        secondSurgeStart,
      );

      // Transition bg from sand to current time-of-day color once the wave is near the top
      if (bgLayer) {
        timeline.to(
          bgLayer,
          {
            backgroundColor: timeColors.canvas,
            duration: 0.45,
            ease: "power2.inOut",
          },
          secondSurgeStart + 1.28,
        );
      }

      // Fade in aurora overlay only once the wave has covered the screen
      if (auroraLayer) {
        timeline.to(
          auroraLayer,
          { opacity: 1, duration: 0.75, ease: "power2.inOut" },
          secondSurgeStart + 1.28,
        );
      }

      // Title and shell disappear from bottom up as the second wave rises
      timeline.to(
        title,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          filter: "blur(6px)",
          duration: 0.5,
          ease: "power2.in",
        },
        secondSurgeStart + 0.55,
      );

      timeline.to(
        shellIcon,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          duration: 0.5,
          ease: "power2.in",
        },
        secondSurgeStart + 0.55,
      );

      timeline.to(
        titleReflection,
        {
          clipPath: "inset(0% 0% 100% 0%)",
          opacity: 0,
          duration: 0.5,
          ease: "power2.in",
        },
        secondSurgeStart + 0.55,
      );

      // Remove splash CSS overrides early so the page bg has time to transition
      // (hidden behind the opaque splash until the wave covers the screen)
      timeline.call(
        () => {
          document.documentElement.removeAttribute("data-splash");
          document.documentElement.style.removeProperty("--splash-sand");
        },
        undefined,
        secondSurgeStart,
      );

      // Fade out splash to reveal the page behind it
      timeline.to(
        scope,
        { opacity: 0, duration: 0.4, ease: "power2.out" },
        4.7,
      );

      // Unmount splash after fade completes
      timeline.to({}, { duration: 0, onComplete: finishSplash }, 5.2);
    },
    [finishSplash, timeColors],
  );
  const titleClassName = "text-[#444444]";

  const reflectionClassName = "text-[#444444]/60";

  const waveMainStops = timeColors.waveMainStops;

  const waveSoftStops = timeColors.waveSoftStops;

  const washBodyStops = timeColors.waveWashStops;

  return (
    <div
      ref={scopeRef}
      data-splash-screen
      className={`fixed inset-0 z-[9999] flex h-dvh w-screen items-center justify-center overflow-hidden`}
      role="presentation"
      aria-hidden="true"
    >
      <div
        data-splash-bg
        className="absolute inset-0"
        style={{ backgroundColor: timeColors.sandColor }}
      />

      <div
        data-splash-aurora
        className="pointer-events-none absolute inset-0 opacity-0"
      >
        <div
          data-aurora-bg
          className="aurora-overlay pointer-events-none absolute inset-0 overflow-hidden bg-transparent"
          style={
            {
              "--aurora": `repeating-linear-gradient(100deg,${timeColors.seagreen600}_10%,${timeColors.sand500}_15%,${timeColors.seagreen500}_20%,${timeColors.sand400}_25%,${timeColors.seagreen400}_30%)`,
              "--seagreen-500": timeColors.seagreen500,
              "--seagreen-400": timeColors.seagreen400,
              "--seagreen-600": timeColors.seagreen600,
              "--sand-500": timeColors.sand500,
              "--sand-400": timeColors.sand400,
              "--black": timeColors.seagreen600,
              "--white": timeColors.sand400,
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className="after:motion-safe:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--aurora)] [background-size:200%] [background-position:50%_50%] opacity-40 blur-[4px] invert-[0.15] [--aurora:repeating-linear-gradient(100deg,var(--seagreen-600)_10%,var(--sand-500)_15%,var(--seagreen-500)_20%,var(--sand-400)_25%,var(--seagreen-400)_30%)] after:absolute after:inset-0 after:[background-image:var(--aurora)] after:[background-size:150%] after:[background-attachment:fixed] after:opacity-60 after:content-[''] [mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]"
          />
        </div>
      </div>
      <svg
        data-wave-band
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        // GUIDE: To hide lateral edges while animating xPercent,
        // make the layer wider than viewport and shift it left.
        // TUNE HERE: left / width control side bleed.
        className="pointer-events-none absolute top-[-14%] left-[-14%] h-[200%] w-[128%] motion-safe:will-change-transform opacity-0"
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
        className="pointer-events-none absolute top-[-16%] left-[-12%] h-[165%] w-[124%] mix-blend-screen motion-safe:will-change-transform opacity-0"
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
        preserveAspectRatio="xMidYMid slice"
        className="pointer-events-none absolute inset-x-0 top-[20%] h-[155%] w-full motion-safe:will-change-transform opacity-0"
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

      <div
        className="absolute inset-x-0 top-[28%] flex justify-center px-4 md:top-[34%] md:px-6"
        style={{ zIndex: 15 }}
      >
        <div className="relative flex flex-col items-center">
          <div className="relative overflow-visible px-4 py-5">
            <div className="relative z-10 flex items-center gap-[0.15em]">
              <span
                data-splash-shell
                className="flex shrink-0 items-center text-[19vw] md:text-[clamp(3.6rem,13vw,9rem)] opacity-0"
              >
                <ShellIcon size="1.3em" />
              </span>
              <span className="relative">
                <span
                  data-splash-title
                  className={`${irinaWordmarkFont.className} block text-[19vw] md:text-[clamp(3.6rem,13vw,9rem)] font-medium tracking-[-0.02em] opacity-0 ${titleClassName}`}
                >
                  Irina
                </span>

                <span
                  data-splash-title-reflection
                  className={`${irinaWordmarkFont.className} pointer-events-none absolute inset-0 text-[19vw] md:text-[clamp(3.6rem,13vw,9rem)] font-medium tracking-[-0.02em] select-none opacity-0 ${reflectionClassName}`}
                  style={{
                    maskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,1) 100%)",
                    WebkitMaskImage:
                      "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.06) 30%, rgba(0,0,0,0.62) 68%, rgba(0,0,0,1) 100%)",
                  }}
                >
                  Irina
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
