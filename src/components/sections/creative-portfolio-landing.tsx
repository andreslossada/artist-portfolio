"use client";

import Lenis from "lenis";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ViewTransition,
  startTransition,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { SplashScreen } from "@/components/animations/splash-screen";
import type { Artwork } from "@/types/content";

const sliderLoopCopies = 3;
const centerLoopCopyIndex = Math.floor(sliderLoopCopies / 2);
const dragActivationThreshold = 10;
const mouseDragScrollFactor = 0.7;
const shownSplashThemes = new Set<string>();
const parallaxImageScale = 1.3;
const parallaxMaxShiftPercent = 12;

type CreativePortfolioLandingProps = {
  artworks: Artwork[];
};

const getSingleLoopWidth = (
  rail: HTMLDivElement,
  itemsPerLoop: number,
  railContent?: HTMLDivElement | null,
) => {
  if (rail.scrollWidth <= rail.clientWidth) {
    return 0;
  }

  if (railContent) {
    const cards =
      railContent.querySelectorAll<HTMLElement>("[data-slider-card]");
    const firstCard = cards[0];
    const nextLoopFirstCard = cards[itemsPerLoop];

    if (firstCard && nextLoopFirstCard) {
      const measuredLoopWidth =
        nextLoopFirstCard.offsetLeft - firstCard.offsetLeft;

      if (measuredLoopWidth > 0) {
        return measuredLoopWidth;
      }
    }
  }

  return rail.scrollWidth / sliderLoopCopies;
};

export function CreativePortfolioLanding({
  artworks,
}: CreativePortfolioLandingProps) {
  const progressSegments = Math.min(12, Math.max(1, artworks.length));
  const loopedLandingGalleryItems = useMemo(
    () =>
      Array.from({ length: sliderLoopCopies }, (_, copyIndex) =>
        artworks.map((item, index) => ({
          ...item,
          copyIndex,
          loopKey: `${copyIndex}-${item.id}`,
          index,
        })),
      ).flat(),
    [artworks],
  );
  const pageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const railContentRef = useRef<HTMLDivElement>(null);
  const [activeSegment, setActiveSegment] = useState(0);
  const [hoveredArtworkTitle, setHoveredArtworkTitle] = useState<string | null>(
    null,
  );
  const [showSplash, setShowSplash] = useState(
    () => !shownSplashThemes.has("dark"),
  );
  const [isRailReady, setIsRailReady] = useState(false);
  const prevShowSplashRef = useRef(showSplash);
  const loopWidthRef = useRef(0);
  const prevSegmentRef = useRef(0);
  const parallaxFrameRef = useRef(0);
  const wrappingRef = useRef(false);
  const parallaxCacheRef = useRef<{
    wraps: HTMLElement[];
    imgs: (HTMLImageElement | null)[];
    cardGeometries: { offsetLeft: number; offsetWidth: number }[];
    railLeft: number;
    railWidth: number;
  }>({
    wraps: [],
    imgs: [],
    cardGeometries: [],
    railLeft: 0,
    railWidth: 0,
  });
  const reducedMotionRef = useRef(false);
  const handleSplashComplete = useCallback(() => {
    startTransition(() => {
      shownSplashThemes.add("dark");
      setShowSplash(false);
    });
    setIsRailReady(true);
  }, []);

  const populateParallaxCache = useCallback(() => {
    const rail = railRef.current;
    const railContent = railContentRef.current;
    if (!rail || !railContent) return;
    const rect = rail.getBoundingClientRect();
    const wraps = [
      ...railContent.querySelectorAll<HTMLElement>("[data-parallax-wrap]"),
    ];
    const cards = [
      ...railContent.querySelectorAll<HTMLElement>("[data-slider-card]"),
    ];
    const imgs = wraps.map(
      (w) => w.querySelector<HTMLImageElement>("img"),
    );
    const railContentOffsetLeft = railContent.offsetLeft;
    const cardGeometries = cards.map((card) => ({
      offsetLeft: card.offsetLeft - railContentOffsetLeft,
      offsetWidth: card.offsetWidth,
    }));
    for (const img of imgs) {
      if (img) img.style.scale = String(parallaxImageScale);
    }
    parallaxCacheRef.current = {
      wraps,
      imgs,
      cardGeometries,
      railLeft: rect.left,
      railWidth: rect.width,
    };
  }, []);

  const syncRailLoopState = useCallback(() => {
    const rail = railRef.current;
    const lenis = lenisRef.current;

    if (!rail) {
      return;
    }

    if (artworks.length === 0) {
      setActiveSegment(0);
      return;
    }

    let singleLoopWidth = loopWidthRef.current;
    if (singleLoopWidth <= 0) {
      singleLoopWidth = getSingleLoopWidth(
        rail,
        artworks.length,
        railContentRef.current,
      );
      loopWidthRef.current = singleLoopWidth;
    }

    if (singleLoopWidth <= 0) {
      setActiveSegment(0);
      return;
    }

    const railScrollLeft = rail.scrollLeft;
    const loopOrigin = singleLoopWidth * centerLoopCopyIndex;
    const offsetFromOrigin = railScrollLeft - loopOrigin;
    const normalizedOffset =
      ((offsetFromOrigin % singleLoopWidth) + singleLoopWidth) %
      singleLoopWidth;
    const effectiveScrollLeft = loopOrigin + normalizedOffset;
    const didWrap = effectiveScrollLeft !== railScrollLeft;

    if (didWrap && lenis && !wrappingRef.current) {
      wrappingRef.current = true;
      lenis.scrollTo(effectiveScrollLeft, { immediate: true });
      wrappingRef.current = false;
    }

    const loopOffset =
      ((effectiveScrollLeft % singleLoopWidth) + singleLoopWidth) %
      singleLoopWidth;
    const progress = loopOffset / singleLoopWidth;
    const nextSegment = Math.round(progress * (progressSegments - 1));
    if (nextSegment !== prevSegmentRef.current) {
      prevSegmentRef.current = nextSegment;
      setActiveSegment(nextSegment);
    }

    let cache = parallaxCacheRef.current;
    if (cache.wraps.length === 0 && !reducedMotionRef.current) {
      populateParallaxCache();
      cache = parallaxCacheRef.current;
    }
    if (cache.wraps.length > 0 && !reducedMotionRef.current) {
      parallaxFrameRef.current = (parallaxFrameRef.current + 1) % 2;
      if (parallaxFrameRef.current === 0) {
        const { wraps, cardGeometries, railLeft, railWidth } = cache;
        const railCenterX = railLeft + railWidth / 2;

        for (let i = 0; i < wraps.length; i++) {
          const geo = cardGeometries[i];
          if (!geo) continue;
          const wrap = wraps[i];

          const visibleCenterX =
            railLeft + geo.offsetLeft - effectiveScrollLeft + geo.offsetWidth / 2;

          if (
            visibleCenterX + geo.offsetWidth / 2 < railLeft ||
            visibleCenterX - geo.offsetWidth / 2 > railLeft + railWidth
          ) {
            wrap.style.transform = "";
            wrap.style.willChange = "";
            continue;
          }

          wrap.style.willChange = "transform";

          const normalizedOffset = Math.max(
            -1,
            Math.min(1, (visibleCenterX - railCenterX) / (railWidth / 2)),
          );

          wrap.style.transform = `translate3d(${normalizedOffset * parallaxMaxShiftPercent}%, 0, 0)`;
        }
      }
    }
  }, [artworks.length, progressSegments, populateParallaxCache]);

  const syncRailLoopStateRef = useRef(syncRailLoopState);
  useEffect(() => {
    syncRailLoopStateRef.current = syncRailLoopState;
  });

  const initializeRailScroll = useCallback(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    loopWidthRef.current = 0;

    const singleLoopWidth = getSingleLoopWidth(
      rail,
      artworks.length,
      railContentRef.current,
    );

    if (singleLoopWidth <= 0) {
      setActiveSegment(0);
      return;
    }

    const loopOffset =
      ((rail.scrollLeft % singleLoopWidth) + singleLoopWidth) % singleLoopWidth;
    const targetScroll = singleLoopWidth * centerLoopCopyIndex + loopOffset;
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(targetScroll, { immediate: true, force: true });
    } else {
      rail.scrollTo({ left: targetScroll, behavior: "instant" });
    }
    syncRailLoopState();
  }, [artworks.length, syncRailLoopState]);

  useLayoutEffect(() => {
    initializeRailScroll();
  }, [initializeRailScroll]);

  useEffect(() => {
    window.addEventListener("resize", initializeRailScroll);

    return () => {
      window.removeEventListener("resize", initializeRailScroll);
    };
  }, [initializeRailScroll]);

  useEffect(() => {
    const page = pageRef.current;
    const rail = railRef.current;
    const railContent = railContentRef.current;

    if (!page || !rail || !railContent) {
      return;
    }

    const lenis = new Lenis({
      wrapper: rail,
      content: railContent,
      eventsTarget: page,
      orientation: "horizontal",
      gestureOrientation: "both",
      smoothWheel: true,
      syncTouch: false,
      lerp: 0.08,
      syncTouchLerp: 0.065,
      wheelMultiplier: 0.7,
      touchMultiplier: 0.9,
      autoRaf: true,
      overscroll: false,
      virtualScroll: ({ deltaX, deltaY }) =>
        Math.abs(deltaX) >= 0.5 || Math.abs(deltaY) >= 0.5,
    });
    lenisRef.current = lenis;

    const onScroll = () => syncRailLoopStateRef.current();
    lenis.on("scroll", onScroll);
    onScroll();

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const rail = railRef.current;

    if (!rail) {
      return;
    }

    let isPointerDown = false;
    let isDragging = false;
    let activePointerId: number | null = null;
    let activePointerType: PointerEvent["pointerType"] | null = null;
    let startX = 0;
    let startScrollLeft = 0;
    let dragDistance = 0;
    let cancelClickUntil = 0;
    let velocityTracker: { x: number; time: number }[] = [];
    let lastDragTarget = 0;

    const startDragging = (event: PointerEvent) => {
      if (event.pointerType === "mouse" && event.button !== 0) {
        return;
      }

      const lenis = lenisRef.current;
      if (lenis) {
        lenis.scrollTo(rail.scrollLeft, { immediate: true, force: true });
      }

      isPointerDown = true;
      isDragging = false;
      activePointerId = event.pointerId;
      activePointerType = event.pointerType;
      startX = event.clientX;
      startScrollLeft = rail.scrollLeft;
      lastDragTarget = rail.scrollLeft;
      dragDistance = 0;
      velocityTracker = [];
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
      const dragScrollFactor =
        activePointerType === "mouse" ? mouseDragScrollFactor : 1;
      const targetScroll = startScrollLeft - deltaX * dragScrollFactor;
      lastDragTarget = targetScroll;

      velocityTracker.push({ x: event.clientX, time: event.timeStamp });
      if (velocityTracker.length > 5) {
        velocityTracker.shift();
      }

      rail.scrollLeft = targetScroll;
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

      const lenis = lenisRef.current;
      if (lenis && velocityTracker.length >= 2) {
        const first = velocityTracker[0];
        const last = velocityTracker[velocityTracker.length - 1];
        const dt = last.time - first.time;
        if (dt > 0) {
          const pxPerMs = (last.x - first.x) / dt;
          const rawMomentum =
            activePointerType === "mouse"
              ? pxPerMs * mouseDragScrollFactor
              : pxPerMs;
          const cappedMomentum =
            rawMomentum > 0
              ? Math.min(rawMomentum, 4)
              : Math.max(rawMomentum, -4);
          const momentumTarget = lastDragTarget - cappedMomentum * 40;
          const singleLoopWidth = loopWidthRef.current;
          if (singleLoopWidth > 0) {
            const loopOrigin = singleLoopWidth * centerLoopCopyIndex;
            const offset = momentumTarget - loopOrigin;
            const normalizedOffset =
              ((offset % singleLoopWidth) + singleLoopWidth) %
              singleLoopWidth;
            const normalizedTarget = loopOrigin + normalizedOffset;
            lenis.scrollTo(normalizedTarget, {
              immediate: false,
              force: true,
            });
          } else {
            lenis.scrollTo(momentumTarget, {
              immediate: false,
              force: true,
            });
          }
        }
      }

      try {
        if (rail.hasPointerCapture(event.pointerId)) {
          rail.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Ignore release errors when pointer capture was never acquired.
      }

      activePointerId = null;
      activePointerType = null;
    };

    const resetDragging = () => {
      isPointerDown = false;
      isDragging = false;
      activePointerId = null;
      activePointerType = null;
      velocityTracker = [];
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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (showSplash) return;
    populateParallaxCache();
    window.addEventListener("resize", populateParallaxCache);
    return () => {
      window.removeEventListener("resize", populateParallaxCache);
    };
  }, [showSplash, populateParallaxCache]);

  useLayoutEffect(() => {
    prevShowSplashRef.current = showSplash;

    if (showSplash) {
      return;
    }

    const rail = railRef.current;
    const railContent = railContentRef.current;

    if (!rail || !railContent) {
      return;
    }

    let animationStarted = false;
    let transitionTimeout: ReturnType<typeof setTimeout> | null = null;
    const gsapCleanupRef = { current: null as (() => void) | null };

    const startAnimations = () => {
      if (animationStarted) return;
      animationStarted = true;

      const reCenterRail = () => {
        const r = railRef.current;
        if (!r) return;
        const singleLoopWidth = getSingleLoopWidth(
          r,
          artworks.length,
          railContentRef.current,
        );
        if (singleLoopWidth <= 0) return;
        const loopOffset =
          ((r.scrollLeft % singleLoopWidth) + singleLoopWidth) %
          singleLoopWidth;
        const targetScroll = singleLoopWidth * centerLoopCopyIndex + loopOffset;
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(targetScroll, { immediate: true, force: true });
        } else {
          r.scrollTo({ left: targetScroll, behavior: "instant" });
        }
      };
      reCenterRail();

      startTransition(() => {
        setIsRailReady(true);
      });

      const ctx = gsap.context(() => {
        const allCards = Array.from(
          railContent.querySelectorAll<HTMLElement>("[data-slider-card]"),
        );
        const cards = allCards.filter((card) => {
          const copyIndexAttr = card.getAttribute("data-copy-index");
          return (
            copyIndexAttr === null ||
            Number(copyIndexAttr) === centerLoopCopyIndex
          );
        });
        const cardCurtains = cards
          .map((card) =>
            card.querySelector<HTMLElement>("[data-slider-curtain]"),
          )
          .filter((curtain): curtain is HTMLElement => curtain !== null);
        const maxAnimatedCards = 5;

        if (cards.length === 0) {
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
          return;
        }

        gsap.set(cards, { autoAlpha: 0 });

        let timeline: gsap.core.Timeline | null = null;
        let removeCenterImageListener: (() => void) | null = null;
        let fallbackTimerId: ReturnType<typeof setTimeout> | null = null;

        const setupAnimation = () => {
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
            return;
          }

          const centerEntry = animatedEntries.reduce((closest, entry) =>
            entry.distanceToCenter < closest.distanceToCenter ? entry : closest,
          );
          const animatedCards = animatedEntries.map(({ card }) => card);
          const animatedCurtains = animatedCards
            .map((card) =>
              card.querySelector<HTMLElement>("[data-slider-curtain]"),
            )
            .filter((curtain): curtain is HTMLElement => curtain !== null);
          const centerMedia = centerEntry.card.querySelector<HTMLElement>(
            "[data-slider-media]",
          );
          const sideCards = animatedEntries
            .filter(({ index }) => index !== centerEntry.index)
            .map(({ card }) => card);

          gsap.set(sideCards, {
            autoAlpha: 0,
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

          if (centerMedia) {
            gsap.set(centerEntry.card, { backgroundColor: "transparent" });
            gsap.set(centerMedia, {
              clipPath: "inset(0% 0% 100% 0%)",
              willChange: "clip-path",
            });
          }

          const playIntro = () => {
            if (timeline) {
              return;
            }

            timeline = gsap.timeline({
              defaults: { ease: "power3.out" },
              onComplete: () => {
                gsap.set(animatedCards, {
                  clearProps: "x,scale,opacity,visibility,zIndex,willChange",
                });
                gsap.set(animatedCurtains, {
                  clearProps: "yPercent,opacity,transform,willChange",
                });
                if (centerMedia) {
                  gsap.set([centerEntry.card, centerMedia], {
                    clearProps: "clipPath,willChange,backgroundColor",
                  });
                }
                gsap.set(cards, {
                  clearProps: "opacity,visibility",
                });
              },
            });

            if (centerMedia) {
              timeline.to(
                centerMedia,
                {
                  clipPath: "inset(0% 0% 0% 0%)",
                  duration: 0.7,
                  ease: "power2.out",
                },
                0.1,
              );
            }

            timeline.to(
              sideCards,
              {
                x: 0,
                scale: 1,
                autoAlpha: 1,
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

          const centerImage =
            centerEntry.card.querySelector<HTMLImageElement>("img");

          if (centerImage && !centerImage.complete) {
            const handleImageReady = () => {
              playIntro();
            };

            centerImage.addEventListener("load", handleImageReady, {
              once: true,
            });
            centerImage.addEventListener("error", handleImageReady, {
              once: true,
            });

            removeCenterImageListener = () => {
              centerImage.removeEventListener("load", handleImageReady);
              centerImage.removeEventListener("error", handleImageReady);
            };

            return;
          }

          playIntro();
        };

        setupAnimation();

        fallbackTimerId = setTimeout(() => {
          if (!timeline) {
            gsap.set(cards, {
              autoAlpha: 1,
              clearProps: "transform,willChange",
            });
            gsap.set(cardCurtains, {
              clearProps: "transform,willChange",
            });
          }
        }, 2000);

        return () => {
          if (fallbackTimerId) {
            clearTimeout(fallbackTimerId);
          }
          removeCenterImageListener?.();
          timeline?.kill();
        };
      }, railContent);

      gsapCleanupRef.current = () => {
        ctx.revert();
      };
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || document.startViewTransition === undefined) {
      startAnimations();
    } else {
      transitionTimeout = setTimeout(() => {
        startAnimations();
      }, 0);
    }

    return () => {
      if (transitionTimeout) {
        clearTimeout(transitionTimeout);
      }
      gsapCleanupRef.current?.();
    };
  }, [showSplash]);

  return (
    <div
      ref={pageRef}
      className="landing-page text-ink h-screen overflow-hidden"
    >
      {showSplash ? <SplashScreen onComplete={handleSplashComplete} /> : null}

      <main className="mx-auto flex h-screen w-full max-w-425 flex-col overflow-hidden px-5 pt-22 md:px-10 md:pt-[8.7rem]">
        <section
          id="projects"
          className="-mx-5 flex min-h-0 flex-1 items-center overflow-hidden md:-mx-10"
        >
          <div
            ref={railRef}
            className="flex h-full w-full cursor-grab touch-none overflow-x-auto overflow-y-hidden py-3 select-none [-ms-overflow-style:none] [scrollbar-width:none] md:py-4 [&::-webkit-scrollbar]:hidden"
          >
            <div
              ref={railContentRef}
              className={`flex h-full w-full gap-3 md:gap-4 ${!isRailReady ? "invisible" : ""}`}
            >
              {loopedLandingGalleryItems.map((item) => (
                <article
                  key={item.loopKey}
                  data-slider-card
                  data-copy-index={item.copyIndex}
                  className="group bg-canvas-soft relative aspect-3/4 h-full min-w-56 shrink-0 basis-[62vw] overflow-hidden md:min-w-0 md:basis-[calc((100%-4rem)/5)]"
                  onMouseEnter={() => setHoveredArtworkTitle(item.title)}
                  onMouseLeave={() => setHoveredArtworkTitle(null)}
                >
                  <Link
                    href={`/artwork/${item.slug}?vt=${item.loopKey}`}
                    transitionTypes={["artwork-open"]}
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
                        <div data-parallax-wrap className="h-full w-full">
                          <Image
                            src={item.imageUrl}
                            alt={`${item.title} - ${item.category}`}
                            fill
                            draggable={false}
                            sizes="(max-width: 768px) 62vw, 22rem"
                            className="object-cover contrast-105 saturate-105 transition-[scale] duration-300 ease-in-out group-hover:scale-[1.72]"
                            style={{ scale: `${parallaxImageScale}` }}
                            priority={
                              item.copyIndex === centerLoopCopyIndex &&
                              item.index < 5
                            }
                            loading={
                              item.copyIndex === centerLoopCopyIndex &&
                              item.index < 5
                                ? undefined
                                : "lazy"
                            }
                          />
                        </div>
                        <div
                          data-slider-curtain
                          className="bg-canvas-soft pointer-events-none absolute -inset-px z-10 opacity-0"
                          aria-hidden="true"
                        />
                      </div>
                    </ViewTransition>
                  </Link>
                </article>
              ))}
            </div>
          </div>
          {artworks.length === 0 ? (
            <div className="text-muted px-5 text-sm tracking-[0.08em] uppercase md:px-10">
              Sin obras publicadas en Sanity.
            </div>
          ) : null}
        </section>

        <footer className="flex flex-col items-center gap-4 py-1 md:gap-5 md:pb-6">
          <div id="about" aria-hidden="true" className="h-0 overflow-hidden" />

          <div
            id="contact"
            className="flex h-16 w-full items-end justify-center overflow-hidden pb-1 md:pb-2"
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
                  className={`h-[2px] w-7 md:w-14 ${index <= activeSegment ? "bg-accent" : "bg-accent/28"}`}
                />
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
