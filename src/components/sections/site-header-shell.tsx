"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { HeaderCartLink } from "@/components/ui/header-cart-link";
import { HeaderNavLink } from "@/components/ui/header-nav-link";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { ViewModeSwitch } from "@/components/ui/view-mode-switch";
import type { Locale } from "@/lib/i18n";
import type { Theme } from "@/lib/theme";

type SiteHeaderShellProps = {
  locale: Locale;
  theme: Theme;
  languageLabels: {
    spanish: string;
    english: string;
  };
  themeLabels: {
    light: string;
    dark: string;
  };
  navLabels: {
    about: string;
    cart: string;
    contact: string;
  };
  showCart?: boolean;
  headerClassName?: string;
};

export function SiteHeaderShell({
  locale,
  theme,
  languageLabels,
  themeLabels,
  navLabels,
  showCart = true,
  headerClassName = "border-b border-accent/15 bg-transparent",
}: SiteHeaderShellProps) {
  return (
    <ViewTransition
      name="site-header"
      enter="none"
      exit="none"
      share="none"
      update="none"
    >
      <header className={headerClassName}>
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
              labels={languageLabels}
              className="mr-1 md:mr-2"
            />
            <ThemeSwitcher
              theme={theme}
              labels={themeLabels}
              className="mr-1 md:mr-2"
            />
            <HeaderNavLink href="/about">{navLabels.about}</HeaderNavLink>
            {showCart ? <HeaderCartLink label={navLabels.cart} /> : null}
            <HeaderNavLink href="/contact">{navLabels.contact}</HeaderNavLink>
          </nav>
        </div>
      </header>
    </ViewTransition>
  );
}
