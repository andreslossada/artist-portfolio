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
      value: "irinagaray17@gmail.com",
      href: "mailto:irinagaray17@gmail.com",
    },
    {
      label: dict.contactPage.channels.whatsapp,
      value: "+58 424-2616988",
      href: "https://wa.me/584242616988",
    },
    {
      label: dict.contactPage.channels.instagram,
      value: "@r_a_t_girl",
      href: "https://www.instagram.com/r_a_t_girl/",
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
        {contactChannels.map((channel) => {
          const isEmail = channel.href.startsWith("mailto:");

          return (
            <a
              key={channel.label}
              href={channel.href}
              target={channel.href.startsWith("http") ? "_blank" : undefined}
              rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
              className={`border-ink/10 shadow-card border p-6 transition hover:-translate-y-0.5 ${
                isEmail
                  ? "bg-accent !text-white hover:border-accent/80"
                  : "hover:border-accent/30 bg-surface"
              }`}
            >
              <p
                className={`text-xs tracking-[0.2em] uppercase ${
                  isEmail ? "text-white/85" : "text-muted"
                }`}
              >
                {channel.label}
              </p>
              <p className="font-display mt-3 text-3xl leading-tight">
                {channel.value}
              </p>
            </a>
          );
        })}
      </section>

      <section className="border-ink/10 mt-10 border bg-surface p-6 md:p-8">
        <h2 className="font-display text-4xl leading-tight">
          {dict.contactPage.acquisitionsTitle}
        </h2>
        <p className="text-muted mt-4 max-w-2xl text-base leading-relaxed md:text-lg">
          {dict.contactPage.acquisitionsDescription}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="mailto:irinagaray17@gmail.com"
            className="bg-accent px-5 py-2 text-sm font-semibold !text-white visited:!text-white hover:!text-white transition hover:brightness-110"
          >
            {dict.contactPage.channels.email}
          </Link>
          <Link
            href="/gallery"
            className="border-accent/35 text-accent hover:bg-accent-soft/55 border px-5 py-2 text-sm font-semibold transition"
          >
            {dict.contactPage.viewArtwork}
          </Link>
        </div>
      </section>
    </main>
  );
}
