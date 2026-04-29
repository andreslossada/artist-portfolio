"use client";

import type { ReactNode } from "react";
import { createHeroTimeline } from "@/core/gsap/timelines/hero";
import { useGsapContext } from "@/hooks/use-gsap-context";

type HeroRevealProps = {
    children: ReactNode;
};

export function HeroReveal({ children }: HeroRevealProps) {
    const scopeRef = useGsapContext<HTMLDivElement>((scope) => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }

        createHeroTimeline(scope);
    });

    return <div ref={scopeRef}>{children}</div>;
}
