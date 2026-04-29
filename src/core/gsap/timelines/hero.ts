import gsap from "gsap";

export function createHeroTimeline(scope: HTMLElement) {
  return gsap
    .timeline({ defaults: { ease: "power2.out" } })
    .fromTo(
      scope.querySelectorAll("[data-hero-item]"),
      { autoAlpha: 0, y: 32 },
      { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.12 },
    );
}
