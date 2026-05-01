"use client";

import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SplashScreen } from "@/components/animations/splash-screen";
import { landingGalleryItems } from "@/lib/content/landing-gallery";

const progressSegments = Math.min(12, landingGalleryItems.length);
const defaultLandingTagline = "The soul of the 911";
const sliderLoopCopies = 5;
const centerLoopCopyIndex = Math.floor(sliderLoopCopies / 2);
const dragActivationThreshold = 14;
let hasShownLandingSplash = false;

const loopedLandingGalleryItems = Array.from(
  { length: sliderLoopCopies },
  (_, copyIndex) =>
    landingGalleryItems.map((item) => ({
      ...item,
      copyIndex,
      loopKey: `${copyIndex}-${item.id}`,
    })),
).flat();

const getSingleLoopWidth = (rail: HTMLDivElement) => {
  if (rail.scrollWidth <= rail.clientWidth) {
    return 0;
  }

  return rail.scrollWidth / sliderLoopCopies;
};

export function CreativePortfolioLanding() {
  const railRef = useRef<HTMLDivElement>(null);
  const railContentRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [hoveredArtworkTitle, setHoveredArtworkTitle] = useState<string | null>(
    null,
  );
  const [showSplash, setShowSplash] = useState(() => !hasShownLandingSplash);
  const handleSplashComplete = useCallback(() => {
    hasShownLandingSplash = true;
    setShowSplash(false);
  }, []);

  const syncRailLoopState = useCallback(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const singleLoopWidth = getSingleLoopWidth(rail);

    if (singleLoopWidth <= 0) {
      setActiveSegment(0);
      return;
    }

    const minBoundary = singleLoopWidth * (centerLoopCopyIndex - 0.5);
    const maxBoundary = singleLoopWidth * (centerLoopCopyIndex + 0.5);

    while (rail.scrollLeft < minBoundary) {
      rail.scrollLeft += singleLoopWidth;
    }

    while (rail.scrollLeft > maxBoundary) {
      rail.scrollLeft -= singleLoopWidth;
    }

    const loopOffset =
      ((rail.scrollLeft % singleLoopWidth) + singleLoopWidth) % singleLoopWidth;
    const progress = loopOffset / singleLoopWidth;
    const nextSegment = Math.round(progress * (progressSegments - 1));
    setActiveSegment(nextSegment);
  }, []);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const initializeLoop = () => {
      const singleLoopWidth = getSingleLoopWidth(rail);

      if (singleLoopWidth <= 0) {
        setActiveSegment(0);
        return;
      }

      const loopOffset =
        ((rail.scrollLeft % singleLoopWidth) + singleLoopWidth) %
        singleLoopWidth;
      rail.scrollLeft = singleLoopWidth * centerLoopCopyIndex + loopOffset;
      syncRailLoopState();
    };

    const frameId = window.requestAnimationFrame(initializeLoop);
    rail.addEventListener("scroll", syncRailLoopState, { passive: true });
    window.addEventListener("resize", initializeLoop);

    return () => {
      window.cancelAnimationFrame(frameId);
      rail.removeEventListener("scroll", syncRailLoopState);
      window.removeEventListener("resize", initializeLoop);
    };
  }, [syncRailLoopState]);

  useEffect(() => {
    const rail = railRef.current;
    const railContent = railContentRef.current;

    if (!rail || !railContent) {
      return;
    }

    const lenis = new Lenis({
      wrapper: rail,
      content: railContent,
      orientation: "horizontal",
      gestureOrientation: "both",
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.9,
      autoRaf: true,
      overscroll: false,
      infinite: true,
    });

    lenis.on("scroll", syncRailLoopState);
    syncRailLoopState();

    return () => {
      lenis.off("scroll", syncRailLoopState);
      lenis.destroy();
    };
  }, [syncRailLoopState]);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    let isPointerDown = false;
    let isDragging = false;
    let activePointerId: number | null = null;
    let startX = 0;
    let startScrollLeft = 0;
    let dragDistance = 0;
    let cancelClickUntil = 0;

    const startDragging = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      isPointerDown = true;
      isDragging = false;
      activePointerId = event.pointerId;
      startX = event.clientX;
      startScrollLeft = rail.scrollLeft;
      dragDistance = 0;

    };

    const dragRail = (event: PointerEvent) => {
      if (!isPointerDown || activePointerId !== event.pointerId) {
        return;
      }

      const deltaX = event.clientX - startX;

      if (!isDragging && Math.abs(deltaX) > dragActivationThreshold) {
        isDragging = true;
        rail.classList.add("cursor-grabbing");

        try {
          rail.setPointerCapture(event.pointerId);
        } catch {
          // Some synthetic pointer sequences or browsers can reject capture.
        }
      }

      if (!isDragging) {
        return;
      }

      event.preventDefault();
      dragDistance = Math.abs(deltaX);
      rail.scrollLeft = startScrollLeft - deltaX;
      syncRailLoopState();
    };

    const stopDragging = (event: PointerEvent) => {
      if (!isPointerDown || activePointerId !== event.pointerId) {
        return;
      }

      isPointerDown = false;

      if (dragDistance > dragActivationThreshold) {
        cancelClickUntil = window.performance.now() + 180;
      }

      isDragging = false;
      rail.classList.remove("cursor-grabbing");

      try {
        if (rail.hasPointerCapture(event.pointerId)) {
          rail.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Ignore release errors when pointer capture was never acquired.
      }

      activePointerId = null;
    };

    const resetDragging = () => {
      isPointerDown = false;
      isDragging = false;
      activePointerId = null;
      rail.classList.remove("cursor-grabbing");
    };

    const handleClickCapture = (event: MouseEvent) => {
      if (window.performance.now() < cancelClickUntil) {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    const preventNativeDrag = (event: DragEvent) => {
      event.preventDefault();
    };

    rail.addEventListener("pointerdown", startDragging);
    rail.addEventListener("pointermove", dragRail);
    rail.addEventListener("pointerup", stopDragging);
    rail.addEventListener("pointercancel", stopDragging);
    rail.addEventListener("lostpointercapture", resetDragging);
    rail.addEventListener("click", handleClickCapture, { capture: true });
    rail.addEventListener("dragstart", preventNativeDrag);

    return () => {
      rail.removeEventListener("pointerdown", startDragging);
      rail.removeEventListener("pointermove", dragRail);
      rail.removeEventListener("pointerup", stopDragging);
      rail.removeEventListener("pointercancel", stopDragging);
      rail.removeEventListener("lostpointercapture", resetDragging);
      rail.removeEventListener("click", handleClickCapture, { capture: true });
      rail.removeEventListener("dragstart", preventNativeDrag);
    };
  }, [syncRailLoopState]);

  return (
    <div className="h-screen overflow-hidden bg-white text-black">
      {showSplash ? <SplashScreen onComplete={handleSplashComplete} /> : null}

      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/10 bg-white/95">
        <div className="mx-auto grid w-full max-w-425 grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-10 md:py-6">
          <div className="flex items-center gap-4 md:gap-9">
            <Link
              href="/"
              className="text-[2rem] leading-none font-semibold tracking-[-0.06em]"
            >
              IRINA
            </Link>
            <p className="text-xs font-medium tracking-[-0.01em] md:text-[1.85rem] md:leading-none md:tracking-[-0.03em]">
              Available July 2026
            </p>
          </div>

          <div className="flex justify-center">
            <Link
              href="/gallery"
              className="text-xs text-black/55 transition hover:text-black md:text-[1.95rem] md:leading-none"
            >
              List
            </Link>
          </div>

          <nav className="flex items-center gap-3 text-xs md:gap-12 md:text-[1.95rem] md:leading-none">
            <Link href="/projects" className="font-semibold text-black">
              Projects
            </Link>
            <Link
              href="/about"
              className="text-black/40 transition hover:text-black"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-black/40 transition hover:text-black"
            >
              Contact
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex h-screen w-full max-w-425 flex-col overflow-hidden px-5 pt-22 md:px-10 md:pt-[8.7rem]">
        <section
          id="projects"
          className="flex min-h-0 flex-1 items-center overflow-hidden"
        >
          <div
            ref={railRef}
            className="flex h-full w-full cursor-grab touch-none select-none overflow-x-auto overflow-y-hidden py-3 [-ms-overflow-style:none] [scrollbar-width:none] md:py-4 [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={railContentRef}
              className="flex h-full w-max gap-3 md:gap-4"
            >
              {loopedLandingGalleryItems.map((item) => (
                <article
                  key={item.loopKey}
                  className="group relative aspect-2/3 h-full min-w-56 shrink-0 overflow-hidden border border-black/9 bg-neutral-100 md:min-w-88"
                  onMouseEnter={() => setHoveredArtworkTitle(item.title)}
                  onMouseLeave={() => setHoveredArtworkTitle(null)}
                >
                  <Link
                    href={`/artwork/${item.slug}`}
                    className="block h-full w-full outline-none"
                  >
                    <div className="relative h-full w-full">
                      <Image
                        src={item.imageUrl}
                        alt={`${item.title} - ${item.category}`}
                        fill
                        draggable={false}
                        sizes="(max-width: 768px) 62vw, 22vw"
                        className="object-cover contrast-105 saturate-105 transition-transform duration-500 will-change-transform motion-safe:group-hover:scale-[1.02]"
                        priority={
                          (item.id === "g1" || item.id === "g2") &&
                          item.copyIndex === centerLoopCopyIndex
                        }
                      />
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="grid grid-cols-1 gap-5 py-4 md:grid-cols-[1fr_auto_1fr] md:items-end md:pb-6">
          <div id="about" aria-hidden="true" className="h-0 overflow-hidden" />

          <div className="order-3 flex justify-center md:order-2">
            <div className="flex items-center gap-2 md:gap-3">
              {Array.from({ length: progressSegments }).map((_, index) => (
                <span
                  key={index}
                  className={`h-px w-7 md:w-14 ${index <= activeSegment ? "bg-black" : "bg-black/24"}`}
                />
              ))}
            </div>
          </div>

          <div
            id="contact"
            className="order-2 flex h-16 items-end justify-start overflow-hidden md:order-3 md:h-32 md:justify-end"
          >
            <p
              className="overflow-hidden text-[1.35rem] leading-[0.95] font-black tracking-[-0.03em] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] md:text-[2.4rem]"
              style={{
                transform: "scaleX(1.08)",
                transformOrigin: "right center",
              }}
            >
              {hoveredArtworkTitle ?? defaultLandingTagline}
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
}
