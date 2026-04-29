"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { registerGsapPlugins } from "@/core/gsap/registrar";

type SetupFn<T extends HTMLElement> = (
  scope: T,
  gsapInstance: typeof gsap,
) => void;

export function useGsapContext<T extends HTMLElement>(
  setup: SetupFn<T>,
  dependencies: unknown[] = [],
) {
  const scopeRef = useRef<T | null>(null);

  useGSAP(
    () => {
      if (!scopeRef.current) {
        return;
      }

      registerGsapPlugins();
      setup(scopeRef.current, gsap);
    },
    {
      scope: scopeRef,
      dependencies,
      revertOnUpdate: true,
    },
  );

  return scopeRef;
}
