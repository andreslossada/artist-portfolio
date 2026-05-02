import type { Metadata } from "next";
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
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-10 md:px-10">
      <header className="max-w-3xl">
        <p className="text-muted text-xs tracking-[0.3em] uppercase">
          {dict.aboutPage.eyebrow}
        </p>
        <h1 className="font-display mt-3 text-5xl leading-tight md:text-6xl">
          {dict.aboutPage.title}
        </h1>
        <p className="text-muted mt-6 text-base leading-relaxed md:text-lg">
          {dict.aboutPage.description}
        </p>
      </header>

      <section className="mt-10 grid gap-5 md:grid-cols-3">
        {dict.aboutPage.processPillars.map((pillar) => (
          <article
            key={pillar.title}
            className="border-ink/10 shadow-card border bg-white/70 p-6"
          >
            <h2 className="font-display text-3xl leading-tight">{pillar.title}</h2>
            <p className="text-muted mt-3 text-sm leading-relaxed">
              {pillar.description}
            </p>
          </article>
        ))}
      </section>

      <section className="border-ink/10 mt-10 border bg-white/60 p-6 md:p-8">
        <p className="text-muted text-xs tracking-[0.2em] uppercase">
          {dict.aboutPage.trajectoryEyebrow}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-relaxed md:text-lg">
          {dict.aboutPage.trajectoryDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/gallery"
            className="bg-ink px-5 py-2 text-sm font-semibold text-white transition hover:opacity-90"
          >
            {dict.aboutPage.viewGallery}
          </Link>
          <Link
            href="/contact"
            className="border border-current px-5 py-2 text-sm font-semibold transition hover:bg-black/5"
          >
            {dict.aboutPage.contact}
          </Link>
        </div>
      </section>
    </main>
  );
}
