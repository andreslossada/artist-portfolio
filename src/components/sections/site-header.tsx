import Link from "next/link";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";

export async function SiteHeader() {
  const locale = await getLocale();
  const dict = getDictionary(locale);
  const links = [
    { href: "/", label: dict.header.home },
    { href: "/gallery", label: dict.header.gallery },
    { href: "/shop", label: dict.header.shop },
    { href: "/about", label: dict.header.about },
    { href: "/contact", label: dict.header.contact },
  ];

  return (
    <header className="border-ink/10 bg-canvas/90 sticky top-0 z-20 border-b backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 md:px-10">
        <Link href="/" className="font-display text-2xl tracking-wide">
          Estudio Irina
        </Link>

        <div className="flex items-center gap-4 md:gap-5">
          <LanguageSwitcher
            locale={locale}
            labels={dict.languageSwitcher}
            className="flex items-center gap-1.5"
          />

          <nav className="text-muted flex items-center gap-5 text-sm font-semibold">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-ink transition"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
