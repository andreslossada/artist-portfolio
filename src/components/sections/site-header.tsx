import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export async function SiteHeader() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return (
    <header className="border-b border-accent/15 bg-white/95">
      <div className="mx-auto grid w-full max-w-425 grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-10 md:py-6">
        <div className="flex items-center">
          <Link
            href="/"
            className="text-[2rem] leading-none font-semibold tracking-[-0.06em] transition-colors hover:text-accent"
          >
            IRINA
          </Link>
        </div>

        <div className="flex justify-center">
          <Link
            href="/gallery"
            className="border-b border-transparent text-xs text-ink/60 transition duration-200 hover:border-accent/45 hover:text-accent md:text-[1.95rem] md:leading-none"
          >
            {dict.landing.list}
          </Link>
        </div>

        <nav className="flex items-center gap-3 text-xs md:gap-12 md:text-[1.95rem] md:leading-none">
          <LanguageSwitcher
            locale={locale}
            labels={dict.languageSwitcher}
            className="mr-1 flex items-center gap-1 md:mr-2 md:gap-2"
          />
          <Link
            href="/about"
            className="border-b border-transparent text-ink/45 transition duration-200 hover:border-accent/40 hover:text-accent"
          >
            {dict.landing.about}
          </Link>
          <Link
            href="/contact"
            className="border-b border-transparent text-ink/45 transition duration-200 hover:border-accent/40 hover:text-accent"
          >
            {dict.landing.contact}
          </Link>
        </nav>
      </div>
    </header>
  );
}
