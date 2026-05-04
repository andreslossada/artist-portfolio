import Link from "next/link";
import { ViewTransition } from "react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { HeaderNavLink } from "@/components/ui/header-nav-link";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ViewModeSwitch } from "@/components/ui/view-mode-switch";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { getTheme } from "@/lib/theme";

export async function SiteHeader() {
  const locale = await getLocale();
  const theme = await getTheme();
  const dict = getDictionary(locale);

  return (
    <ViewTransition
      name="site-header"
      enter="none"
      exit="none"
      share="none"
      update="none"
    >
      <header className="border-b border-accent/15 bg-transparent">
        <div className="mx-auto grid w-full max-w-425 grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-10 md:py-6">
          <div className="flex items-center">
            <Link
              href="/"
              transitionTypes={["header-nav"]}
              className="inline-flex h-8 items-center text-[2rem] leading-none font-semibold tracking-[-0.06em] transition-colors hover:text-accent md:h-10"
            >
              IRINA
            </Link>
          </div>

          <div className="flex items-center justify-center">
            <ViewModeSwitch />
          </div>

          <nav className="flex items-center gap-3 text-xs md:gap-12 md:text-[1.95rem] md:leading-none">
            <LanguageSwitcher
              locale={locale}
              labels={dict.languageSwitcher}
              className="mr-1 md:mr-2"
            />
            <ThemeSwitcher
              theme={theme}
              labels={dict.themeSwitcher}
              className="mr-1 md:mr-2"
            />
            <HeaderNavLink href="/about">
              {dict.landing.about}
            </HeaderNavLink>
            <HeaderNavLink href="/contact">
              {dict.landing.contact}
            </HeaderNavLink>
          </nav>
        </div>
      </header>
    </ViewTransition>
  );
}
