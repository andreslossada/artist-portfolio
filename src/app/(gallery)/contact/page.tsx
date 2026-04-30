import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact | Estudio Irina",
  description:
    "Contacta al estudio para adquisiciones, comisiones, exposiciones o prensa.",
};

const contactChannels = [
  {
    label: "Correo",
    value: "hola@estudioirina.com",
    href: "mailto:hola@estudioirina.com",
  },
  {
    label: "WhatsApp",
    value: "+54 9 11 5555 2026",
    href: "https://wa.me/5491155552026",
  },
  {
    label: "Instagram",
    value: "@estudio.irina",
    href: "https://instagram.com/estudio.irina",
  },
];

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="max-w-3xl">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">Contact</p>
        <h1 className="font-display mt-3 text-5xl leading-tight md:text-6xl">
          Hablemos de tu proximo proyecto
        </h1>
        <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
          El estudio responde consultas sobre obra disponible, comisiones,
          colaboraciones curatoriales y prensa. Tiempo estimado de respuesta:
          24-48 horas habiles.
        </p>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {contactChannels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            className="rounded-card border-ink/10 shadow-card border bg-white/70 p-6 transition hover:-translate-y-0.5"
          >
            <p className="text-muted text-xs tracking-[0.2em] uppercase">
              {channel.label}
            </p>
            <p className="font-display mt-3 text-3xl leading-tight">
              {channel.value}
            </p>
          </a>
        ))}
      </section>

      <section className="rounded-card border-ink/10 mt-10 border bg-white/60 p-6 md:p-8">
        <h2 className="font-display text-4xl leading-tight">Adquisiciones</h2>
        <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
          Si te interesa adquirir una pieza o una edicion limitada, puedes
          explorar la tienda y escribirnos para recibir ficha tecnica completa,
          disponibilidad y opciones de entrega local.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="bg-ink rounded-full px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Ir a tienda
          </Link>
          <Link
            href="/gallery"
            className="rounded-full border border-current px-5 py-2 text-sm font-semibold transition hover:bg-black/5"
          >
            Ver obra
          </Link>
        </div>
      </section>
    </main>
  );
}