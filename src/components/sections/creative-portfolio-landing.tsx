"use client";

import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { SplashScreen } from "@/components/animations/splash-screen";
import { landingGalleryItems } from "@/lib/content/landing-gallery";

const progressSegments = Math.min(12, landingGalleryItems.length);
const defaultLandingTagline = "The soul of the 911";

export function CreativePortfolioLanding() {
  const railRef = useRef<HTMLDivElement>(null);
  const railContentRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [hoveredArtworkTitle, setHoveredArtworkTitle] = useState<string | null>(
    null,
  );
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
  }, []);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    const updateProgress = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;

      if (maxScroll <= 0) {
        setActiveSegment(0);
        return;
      }

      const progress = rail.scrollLeft / maxScroll;
      const nextSegment = Math.round(progress * (progressSegments - 1));
      setActiveSegment(nextSegment);
    };

    updateProgress();
    rail.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      rail.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

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
    });

    const syncProgress = () => {
      const maxScroll = rail.scrollWidth - rail.clientWidth;

      if (maxScroll <= 0) {
        setActiveSegment(0);
        return;
      }

      const progress = rail.scrollLeft / maxScroll;
      setActiveSegment(Math.round(progress * (progressSegments - 1)));
    };

    lenis.on("scroll", syncProgress);
    syncProgress();

    return () => {
      lenis.off("scroll", syncProgress);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    let isDragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const startDragging = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      isDragging = true;
      startX = event.clientX;
      startScrollLeft = rail.scrollLeft;
      rail.classList.add("cursor-grabbing");
      rail.setPointerCapture(event.pointerId);
    };

    const dragRail = (event: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      event.preventDefault();
      const deltaX = event.clientX - startX;
      rail.scrollLeft = startScrollLeft - deltaX;
    };

    const stopDragging = (event: PointerEvent) => {
      if (!isDragging) {
        return;
      }

      isDragging = false;
      rail.classList.remove("cursor-grabbing");

      if (rail.hasPointerCapture(event.pointerId)) {
        rail.releasePointerCapture(event.pointerId);
      }
    };

    const resetDragging = () => {
      isDragging = false;
      rail.classList.remove("cursor-grabbing");
    };

    rail.addEventListener("pointerdown", startDragging);
    rail.addEventListener("pointermove", dragRail);
    rail.addEventListener("pointerup", stopDragging);
    rail.addEventListener("pointercancel", stopDragging);
    rail.addEventListener("lostpointercapture", resetDragging);

    return () => {
      rail.removeEventListener("pointerdown", startDragging);
      rail.removeEventListener("pointermove", dragRail);
      rail.removeEventListener("pointerup", stopDragging);
      rail.removeEventListener("pointercancel", stopDragging);
      rail.removeEventListener("lostpointercapture", resetDragging);
    };
  }, []);

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
            <Link href="#projects" className="font-semibold text-black">
              Projects
            </Link>
            <Link
              href="#about"
              className="text-black/40 transition hover:text-black"
            >
              About
            </Link>
            <Link
              href="#contact"
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
            className="flex h-full w-full cursor-grab overflow-x-auto overflow-y-hidden py-3 [-ms-overflow-style:none] [scrollbar-width:none] [touch-action:pan-y] md:py-4 [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={railContentRef}
              className="flex h-full w-max gap-3 md:gap-4"
            >
              {landingGalleryItems.map((item) => (
                <article
                  key={item.id}
                  className="relative aspect-2/3 h-full min-w-56 shrink-0 overflow-hidden border border-black/9 bg-neutral-100 md:min-w-88"
                  onMouseEnter={() => setHoveredArtworkTitle(item.title)}
                  onMouseLeave={() => setHoveredArtworkTitle(null)}
                >
                  <Image
                    src={item.imageUrl}
                    alt={`${item.title} - ${item.category}`}
                    fill
                    draggable={false}
                    sizes="(max-width: 768px) 62vw, 22vw"
                    className="object-cover contrast-105 saturate-105"
                    priority={item.id === "g1" || item.id === "g2"}
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="grid grid-cols-1 gap-5 py-4 md:grid-cols-[1fr_auto_1fr] md:items-end md:pb-6">
          <p
            id="about"
            className="text-xl leading-[1.2] tracking-[-0.03em] italic md:text-[2.7rem] md:leading-[1.1]"
          >
            Irina
            <br />
            Artista pintora
          </p>

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
            className="order-2 flex justify-start md:order-3 md:justify-end"
          >
            <p
              className="inline-block text-[2rem] leading-[0.95] font-black tracking-[-0.03em] md:text-[4rem]"
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
