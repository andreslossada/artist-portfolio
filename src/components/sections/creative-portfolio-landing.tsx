"use client";

import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ViewTransition, useCallback, useEffect, useRef, useState } from "react";
import { SplashScreen } from "@/components/animations/splash-screen";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { landingGalleryItems } from "@/lib/content/landing-gallery";
import type { Locale } from "@/lib/i18n";

const progressSegments = Math.min(12, landingGalleryItems.length);
const sliderLoopCopies = 5;
const centerLoopCopyIndex = Math.floor(sliderLoopCopies / 2);
const dragActivationThreshold = 14;
let hasShownLandingSplash = false;

type CreativePortfolioLandingProps = {
  locale: Locale;
  labels: {
    list: string;
    projects: string;
    about: string;
    contact: string;
  };
  languageLabels: {
    spanish: string;
    english: string;
  };
};

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

export function CreativePortfolioLanding({
  locale,
  labels,
  languageLabels,
}: CreativePortfolioLandingProps) {
  const railRef = useRef<HTMLDivElement>(null);
  const railContentRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [hoveredArtworkTitle, setHoveredArtworkTitle] = useState<string | null>(
    null,
  );
  const [showSplash, setShowSplash] = useState(() => !hasShownLandingSplash);
  const [isSliderIntroReady, setIsSliderIntroReady] = useState(false);
  const markSliderIntroReady = useCallback(() => {
    window.requestAnimationFrame(() => {
      setIsSliderIntroReady(true);
    });
  }, []);
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

  useEffect(() => {
    if (showSplash) {
      return;
    }

    const rail = railRef.current;
    const railContent = railContentRef.current;

    if (!rail || !railContent) {
      return;
    }

    const cards = Array.from(
      railContent.querySelectorAll<HTMLElement>("[data-slider-card]"),
    );
    const cardCurtains = cards
      .map((card) => card.querySelector<HTMLElement>("[data-slider-curtain]"))
      .filter((curtain): curtain is HTMLElement => curtain !== null);
    const maxAnimatedCards = 5;

    if (cards.length === 0) {
      markSliderIntroReady();
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(cards, {
        autoAlpha: 1,
        x: 0,
        scale: 1,
        clearProps: "x,scale,opacity,visibility,zIndex,willChange",
      });
      gsap.set(cardCurtains, {
        clearProps: "yPercent,opacity,transform,willChange",
      });
      markSliderIntroReady();
      return;
    }

    let timeline: gsap.core.Timeline | null = null;
    let removeCenterImageListener: (() => void) | null = null;
    const frameId = window.requestAnimationFrame(() => {
      const railRect = rail.getBoundingClientRect();
      const viewportCenterX = railRect.left + railRect.width / 2;
      const cardEntries = cards.map((card, index) => {
        const cardRect = card.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;

        return {
          card,
          index,
          centerX,
          distanceToCenter: Math.abs(centerX - viewportCenterX),
        };
      });

      const animatedEntries = [...cardEntries]
        .sort((a, b) => a.distanceToCenter - b.distanceToCenter)
        .slice(0, Math.min(maxAnimatedCards, cardEntries.length))
        .sort((a, b) => a.index - b.index);

      if (animatedEntries.length === 0) {
        markSliderIntroReady();
        return;
      }

      const centerEntry = animatedEntries.reduce((closest, entry) =>
        entry.distanceToCenter < closest.distanceToCenter ? entry : closest,
      );
      const animatedCards = animatedEntries.map(({ card }) => card);
      const animatedCurtains = animatedCards
        .map((card) => card.querySelector<HTMLElement>("[data-slider-curtain]"))
        .filter((curtain): curtain is HTMLElement => curtain !== null);
      const centerCurtain = centerEntry.card.querySelector<HTMLElement>(
        "[data-slider-curtain]",
      );
      const sideCards = animatedEntries
        .filter(({ index }) => index !== centerEntry.index)
        .map(({ card }) => card);

      gsap.set(animatedCards, {
        autoAlpha: 1,
        scale: 0.94,
        willChange: "transform, opacity",
      });

      const maxLayer = animatedEntries.length * 2;

      animatedEntries.forEach((entry) => {
        const distance = Math.abs(entry.index - centerEntry.index);
        const sideBias = entry.index < centerEntry.index ? 1 : 0;

        gsap.set(entry.card, {
          x: Math.round(viewportCenterX - entry.centerX),
          zIndex: Math.max(1, maxLayer - distance * 2 + sideBias),
        });
      });

      gsap.set(centerEntry.card, {
        autoAlpha: 1,
        scale: 1,
        zIndex: maxLayer + 2,
      });

      if (centerCurtain) {
        gsap.set(centerCurtain, {
          yPercent: 0,
          opacity: 1,
          willChange: "transform, opacity",
        });
      }

      const playIntro = () => {
        if (timeline) {
          return;
        }

        markSliderIntroReady();

        timeline = gsap
          .timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              gsap.set(animatedCards, {
                clearProps: "x,scale,opacity,visibility,zIndex,willChange",
              });
              gsap.set(animatedCurtains, {
                clearProps: "yPercent,opacity,transform,willChange",
              });
            },
          });

        if (centerCurtain) {
          timeline.to(
            centerCurtain,
            {
              yPercent: 100,
              duration: 0.8,
              ease: "power2.out",
            },
            0,
          );
        }

        timeline.to(
          sideCards,
          {
            x: 0,
            scale: 1,
            duration: 1.2,
            stagger: { each: 0.08, from: "center" },
            ease: "power3.out",
          },
          ">",
        );

        timeline.to(
          centerEntry.card,
          {
            x: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "<",
        );
      };

      const centerImage = centerEntry.card.querySelector<HTMLImageElement>("img");

      if (centerImage && !centerImage.complete) {
        const handleImageReady = () => {
          playIntro();
        };

        centerImage.addEventListener("load", handleImageReady, { once: true });
        centerImage.addEventListener("error", handleImageReady, { once: true });

        removeCenterImageListener = () => {
          centerImage.removeEventListener("load", handleImageReady);
          centerImage.removeEventListener("error", handleImageReady);
        };

        return;
      }

      playIntro();
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      removeCenterImageListener?.();
      timeline?.kill();
    };
  }, [markSliderIntroReady, showSplash]);

  return (
    <div className="h-screen overflow-hidden bg-white text-black">
      {showSplash ? <SplashScreen onComplete={handleSplashComplete} /> : null}

      <header className="fixed inset-x-0 top-0 z-30 border-b border-black/10 bg-white/95">
        <div className="mx-auto grid w-full max-w-425 grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-10 md:py-6">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-[2rem] leading-none font-semibold tracking-[-0.06em]"
            >
              IRINA
            </Link>
          </div>

          <div className="flex justify-center">
            <Link
              href="/gallery"
              className="text-xs text-black/55 transition hover:text-black md:text-[1.95rem] md:leading-none"
            >
              {labels.list}
            </Link>
          </div>

          <nav className="flex items-center gap-3 text-xs md:gap-12 md:text-[1.95rem] md:leading-none">
            <LanguageSwitcher
              locale={locale}
              labels={languageLabels}
              className="mr-1 flex items-center gap-1 md:mr-2 md:gap-2"
            />
            <Link href="/projects" className="font-semibold text-black">
              {labels.projects}
            </Link>
            <Link
              href="/about"
              className="text-black/40 transition hover:text-black"
            >
              {labels.about}
            </Link>
            <Link
              href="/contact"
              className="text-black/40 transition hover:text-black"
            >
              {labels.contact}
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex h-screen w-full max-w-425 flex-col overflow-hidden px-5 pt-22 md:px-10 md:pt-[8.7rem]">
        <section
          id="projects"
          className="-mx-5 flex min-h-0 flex-1 items-center overflow-hidden md:-mx-10"
        >
          <div
            ref={railRef}
            className="flex h-full w-full cursor-grab touch-none select-none overflow-x-auto overflow-y-hidden py-3 [-ms-overflow-style:none] [scrollbar-width:none] md:py-4 [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={railContentRef}
              className={`flex h-full w-full gap-3 md:gap-4 ${isSliderIntroReady ? "opacity-100" : "opacity-0"}`}
            >
              {loopedLandingGalleryItems.map((item) => (
                <article
                  key={item.loopKey}
                  data-slider-card
                  className="group relative aspect-2/3 h-full min-w-56 shrink-0 basis-[62vw] overflow-hidden bg-neutral-100 md:min-w-0 md:basis-[calc((100%-4rem)/5)]"
                  onMouseEnter={() => setHoveredArtworkTitle(item.title)}
                  onMouseLeave={() => setHoveredArtworkTitle(null)}
                >
                  <Link
                    href={`/artwork/${item.slug}?vt=${item.loopKey}`}
                    className="block h-full w-full outline-none"
                  >
                    <ViewTransition
                      name={`artwork-image-${item.loopKey}`}
                      share="artwork-morph"
                    >
                      <div
                        data-slider-media
                        className="relative h-full w-full overflow-hidden"
                      >
                        <Image
                          src={item.imageUrl}
                          alt={`${item.title} - ${item.category}`}
                          fill
                          draggable={false}
                          sizes="(max-width: 768px) 62vw, 22vw"
                          className="object-cover object-center contrast-105 saturate-105"
                          priority={
                            (item.id === "g1" || item.id === "g2") &&
                            item.copyIndex === centerLoopCopyIndex
                          }
                        />
                        <div
                          data-slider-curtain
                          className="pointer-events-none absolute -inset-px z-10 bg-white opacity-0"
                          aria-hidden="true"
                        />
                      </div>
                    </ViewTransition>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <footer className="flex flex-col items-center gap-4 py-4 md:gap-5 md:pb-6">
          <div id="about" aria-hidden="true" className="h-0 overflow-hidden" />

          <div
            id="contact"
            className="flex h-16 w-full items-end justify-center overflow-hidden pb-1 md:h-24 md:pb-2"
          >
            {hoveredArtworkTitle ? (
              <p
                key={hoveredArtworkTitle}
                className="max-w-[88vw] text-center text-[1.2rem] leading-[1.08] font-black tracking-[-0.025em] text-balance motion-safe:animate-[landing-title-fade-in_220ms_ease-out] md:max-w-[48rem] md:text-[1.9rem]"
              >
                {hoveredArtworkTitle}
              </p>
            ) : null}
          </div>

          <div className="flex justify-center">
            <div className="flex items-center gap-2 md:gap-3">
              {Array.from({ length: progressSegments }).map((_, index) => (
                <span
                  key={index}
                  className={`h-px w-7 md:w-14 ${index <= activeSegment ? "bg-black" : "bg-black/24"}`}
                />
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
