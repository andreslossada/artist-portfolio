import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About | Estudio Irina",
  description:
    "Conoce la vision, proceso y trayectoria de la artista detras de Estudio Irina.",
};

const processPillars = [
  {
    title: "Materia y gesto",
    description:
      "Capas de cal, pigmento y veladuras construyen una superficie viva que cambia con la luz.",
  },
  {
    title: "Archivo costero",
    description:
      "La coleccion nace de caminatas frente al mar y del registro de texturas en muros erosionados.",
  },
  {
    title: "Serie limitada",
    description:
      "Cada obra y edicion se desarrolla en lotes pequenos para mantener una narrativa curatorial consistente.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="max-w-3xl">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">About</p>
        <h1 className="font-display mt-3 text-5xl leading-tight md:text-6xl">
          Pintura contemporanea desde el borde del mar
        </h1>
        <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
          Estudio Irina desarrolla obra pictorica en tecnica mixta con enfoque
          en materialidad, ritmo y memoria del paisaje costero. Cada serie
          explora la tension entre estructura y accidente.
        </p>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {processPillars.map((pillar) => (
          <article
            key={pillar.title}
            className="rounded-card border-ink/10 shadow-card border bg-white/70 p-6"
          >
            <h2 className="font-display text-3xl leading-tight">{pillar.title}</h2>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              {pillar.description}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-card border-ink/10 mt-10 border bg-white/60 p-6 md:p-8">
        <p className="text-muted text-xs tracking-[0.2em] uppercase">Trayectoria</p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed md:text-lg">
          Desde 2020, la artista ha presentado obra en residencias y muestras de
          estudio en Buenos Aires, Montevideo y Barcelona, colaborando con
          talleres de conservacion para investigar soportes minerales y
          materiales de larga duracion.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/gallery"
            className="bg-ink rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ver galeria
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-current px-5 py-2 text-sm font-semibold transition hover:bg-black/5"
          >
            Contactar
          </Link>
        </div>
      </section>
    </main>
  );
}