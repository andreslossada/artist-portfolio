import Link from "next/link";
import { HeroReveal } from "@/components/animations/hero-reveal";

export function LandingHero() {
    return (
        <section className="relative overflow-hidden rounded-4xl border border-ink/10 bg-[radial-gradient(circle_at_top_right,#d7e5f6_0%,#e9eef3_42%,#f7f1e8_100%)] px-7 py-16 shadow-card md:px-14">
            <div className="pointer-events-none absolute -top-16 -right-10 h-56 w-56 rounded-full bg-accent/20 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 left-8 h-48 w-48 rounded-full bg-white/50 blur-2xl" />

            <HeroReveal>
                <p data-hero-item className="text-xs uppercase tracking-[0.35em] text-muted">
                    Estudio abierto 2026
                </p>
                <h1
                    data-hero-item
                    className="mt-4 max-w-3xl font-display text-5xl leading-[0.94] text-ink md:text-7xl"
                >
                    Pintura contemporanea con una narrativa de luz, polvo y memoria.
                </h1>
                <p data-hero-item className="mt-6 max-w-xl text-base text-muted md:text-lg">
                    Portfolio de obra original, piezas en coleccion privada y ediciones limitadas.
                    Cada serie nace de recorridos urbanos y paisajes erosionados.
                </p>

                <div data-hero-item className="mt-10 flex flex-wrap gap-3">
                    <Link
                        href="/gallery"
                        className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
                    >
                        Ver galeria
                    </Link>
                    <Link
                        href="/shop"
                        className="rounded-full border border-ink/20 px-6 py-3 text-sm font-semibold text-ink transition hover:bg-canvas-soft"
                    >
                        Comprar prints
                    </Link>
                </div>
            </HeroReveal>
        </section>
    );
}
