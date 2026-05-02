import Link from "next/link";
import { HeroReveal } from "@/components/animations/hero-reveal";

export function LandingHero() {
  return (
    <section className="border-ink/10 shadow-card relative overflow-hidden border bg-[radial-gradient(circle_at_top_right,#d7e5f6_0%,#e9eef3_42%,#f7f1e8_100%)] px-7 py-16 md:px-14">
      <div className="bg-accent/20 pointer-events-none absolute -top-16 -right-10 h-56 w-56 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-12 left-8 h-48 w-48 bg-white/50 blur-2xl" />

      <HeroReveal>
        <p
          data-hero-item
          className="text-muted text-xs tracking-[0.35em] uppercase"
        >
          Estudio abierto 2026
        </p>
        <h1
          data-hero-item
          className="font-display text-ink mt-4 max-w-3xl text-5xl leading-[0.94] md:text-7xl"
        >
          Pintura contemporanea con una narrativa de luz, polvo y memoria.
        </h1>
        <p
          data-hero-item
          className="text-muted mt-6 max-w-xl text-base md:text-lg"
        >
          Portfolio de obra original, piezas en coleccion privada y ediciones
          limitadas. Cada serie nace de recorridos urbanos y paisajes
          erosionados.
        </p>

        <div data-hero-item className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/gallery"
            className="bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Ver galeria
          </Link>
          <Link
            href="/shop"
            className="border-ink/20 text-ink hover:bg-canvas-soft border px-6 py-3 text-sm font-semibold transition"
          >
            Comprar prints
          </Link>
        </div>
      </HeroReveal>
    </section>
  );
}
