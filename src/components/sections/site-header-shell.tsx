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
import { irinaWordmarkFont } from "@/lib/wordmark-font";

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
    shop?: string;
    about: string;
    cart: string;
    contact: string;
  };
  showCart?: boolean;
  headerClassName?: string;
  wordmarkTransitionName?: string;
  hideWordmark?: boolean;
};

export function SiteHeaderShell({
  locale,
  theme,
  languageLabels,
  themeLabels,
  navLabels,
  showCart = true,
  headerClassName = "border-b border-accent/15 bg-transparent",
  wordmarkTransitionName,
  hideWordmark = false,
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
              className={`${irinaWordmarkFont.className} hover:text-accent inline-flex h-8 items-center text-[2rem] leading-none font-medium tracking-[0.06em] italic transition-colors md:h-10`}
            >
              {wordmarkTransitionName ? (
                <ViewTransition
                  name={wordmarkTransitionName}
                  share="irina-wordmark"
                >
                  <span className="block">Irina</span>
                </ViewTransition>
              ) : hideWordmark ? (
                <span
                  className="pointer-events-none block opacity-0 select-none"
                  aria-hidden="true"
                >
                  Irina
                </span>
              ) : (
                <span className="block">Irina</span>
              )}
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
            {navLabels.shop ? (
              <HeaderNavLink href="/shop">{navLabels.shop}</HeaderNavLink>
            ) : null}
            <HeaderNavLink href="/contact">{navLabels.contact}</HeaderNavLink>
            {showCart ? <HeaderCartLink label={navLabels.cart} /> : null}
          </nav>
        </div>
      </header>
    </ViewTransition>
  );
}
