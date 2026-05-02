import type { Metadata } from "next";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.metadata.contactTitle,
    description: dict.metadata.contactDescription,
  };
}

export default async function ContactPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const contactChannels = [
    {
      label: dict.contactPage.channels.email,
      value: "hola@estudioirina.com",
      href: "mailto:hola@estudioirina.com",
    },
    {
      label: dict.contactPage.channels.whatsapp,
      value: "+54 9 11 5555 2026",
      href: "https://wa.me/5491155552026",
    },
    {
      label: dict.contactPage.channels.instagram,
      value: "@estudio.irina",
      href: "https://instagram.com/estudio.irina",
    },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="max-w-3xl">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {dict.contactPage.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-5xl leading-tight md:text-6xl">
          {dict.contactPage.title}
        </h1>
        <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
          {dict.contactPage.description}
        </p>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {contactChannels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target={channel.href.startsWith("http") ? "_blank" : undefined}
            rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
            className="border-ink/10 shadow-card border bg-white/70 p-6 transition hover:-translate-y-0.5"
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

      <section className="border-ink/10 mt-10 border bg-white/60 p-6 md:p-8">
        <h2 className="font-display text-4xl leading-tight">
          {dict.contactPage.acquisitionsTitle}
        </h2>
        <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
          {dict.contactPage.acquisitionsDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {dict.contactPage.goToShop}
          </Link>
          <Link
            href="/gallery"
            className="border border-current px-5 py-2 text-sm font-semibold transition hover:bg-black/5"
          >
            {dict.contactPage.viewArtwork}
          </Link>
        </div>
      </section>
    </main>
  );
}
