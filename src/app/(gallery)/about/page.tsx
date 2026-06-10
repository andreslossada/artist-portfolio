import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.metadata.aboutTitle,
    description: dict.metadata.aboutDescription,
  };
}

export default async function AboutPage() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-6 md:px-8">
      <section className="bg-surface relative overflow-hidden p-4 md:p-6">
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(43,95,168,0.28)_0%,rgba(43,95,168,0)_68%)]" />
        <div className="pointer-events-none absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(255,183,125,0.32)_0%,rgba(255,183,125,0)_68%)]" />

        <div className="relative grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-end">
          <header>
            <p className="text-muted text-xs tracking-[0.3em] uppercase">
              {dict.aboutPage.eyebrow}
            </p>
            <h1 className="font-display mt-2 text-5xl leading-[0.95] md:text-7xl">
              {dict.aboutPage.title}
            </h1>
            <p className="text-ink/88 mt-4 max-w-3xl text-base leading-relaxed md:text-lg">
              {dict.aboutPage.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {dict.aboutPage.visualTags.map((tag) => (
                <span
                  key={tag}
                  className="bg-accent-soft/70 text-accent px-3 py-1 text-xs tracking-[0.14em] uppercase"
                >
                  {tag}
                </span>
              ))}
            </div>
          </header>


          <figure className="h-full w-full">
            <div className="overflow-hidden">
              <Image
                src="/arte/irinaperfil.webp"
                alt="Irina"
                width={896}
                height={1181}
                sizes="(min-width: 1024px) 42vw, (min-width: 768px) 48vw, 100vw"
                className="h-auto w-full"
                priority
              />
            </div>
          </figure>

        </div>
      </section>

      <section className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3">
        {dict.aboutPage.processPillars.map((pillar, index) => (
          <article key={pillar.title} className="bg-surface p-4">
            <p className="text-muted text-xs tracking-[0.16em] uppercase">
              0{index + 1}
            </p>
            <h2 className="font-display mt-2 text-3xl leading-tight">
              {pillar.title}
            </h2>
            <p className="text-muted mt-2 text-sm leading-relaxed md:text-base">
              {pillar.description}
            </p>
          </article>
        ))}
      </section>

      <section className="bg-surface relative mt-6 overflow-hidden p-4 md:mt-8 md:p-6">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_100%_30%,rgba(43,95,168,0.18),rgba(43,95,168,0))]" />
        <p className="text-muted relative text-xs tracking-[0.2em] uppercase">
          {dict.aboutPage.trajectoryEyebrow}
        </p>
        <p className="relative mt-3 max-w-3xl text-base leading-relaxed md:text-lg">
          {dict.aboutPage.trajectoryDescription}
        </p>
        <div className="relative mt-5 flex flex-wrap gap-2.5">
          <Link
            href="/gallery"
            className="bg-accent px-5 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            {dict.aboutPage.viewGallery}
          </Link>
          <Link
            href="/contact"
            className="bg-accent-soft/65 text-accent px-5 py-2 text-sm font-semibold transition hover:brightness-95"
          >
            {dict.aboutPage.contact}
          </Link>
        </div>
      </section>
    </main>
  );
}
