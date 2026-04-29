import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsapPlugins() {
  if (registered || typeof window === "undefined") {
    return;
  }

  gsap.registerPlugin(useGSAP, ScrollTrigger);
  registered = true;
}
