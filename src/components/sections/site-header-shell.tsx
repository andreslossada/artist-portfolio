"use client";

import { Suspense } from "react";
import Link from "next/link";
import { ShellIcon } from "@/components/ui/shell-icon";
import { HeaderNavLink } from "@/components/ui/header-nav-link";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { MobileMenu } from "@/components/ui/mobile-menu";
import { ViewModeSwitch } from "@/components/ui/view-mode-switch";
import type { Locale } from "@/lib/i18n";
import { irinaWordmarkFont } from "@/lib/wordmark-font";

type SiteHeaderShellProps = {
  locale: Locale;
  languageLabels: {
    spanish: string;
    english: string;
  };
  navLabels: {
    shop?: string;
    about: string;
    contact: string;
  };
  headerClassName?: string;
  hideWordmark?: boolean;
};

export function SiteHeaderShell({
  locale,
  languageLabels,
  navLabels,
  headerClassName = "border-b border-accent/15 bg-transparent",
  hideWordmark = false,
}: SiteHeaderShellProps) {
  return (
    <header className={`site-header ${headerClassName}`}>
        <div className="mx-auto grid w-full max-w-425 grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-4 md:px-10 md:py-6">
          <div className="flex items-center">
            <Link
              href="/"
              transitionTypes={["landing-nav"]}
              className={`${irinaWordmarkFont.className} hover:text-accent inline-flex h-8 items-center gap-2 text-[2rem] leading-none font-medium tracking-[-0.02em] italic transition-colors md:h-10`}
            >
              <span className="block h-6 w-6 md:h-7 md:w-7">
                <ShellIcon size="100%" aria-hidden="true" />
              </span>
              {hideWordmark ? (
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
            <Suspense>
              <ViewModeSwitch />
            </Suspense>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden items-center gap-3 text-xs md:flex md:gap-12 md:text-[1.95rem] md:leading-none">
            <LanguageSwitcher
              locale={locale}
              labels={languageLabels}
              className="mr-1 md:mr-2"
            />
            <HeaderNavLink href="/about">{navLabels.about}</HeaderNavLink>
            {navLabels.shop ? (
              <HeaderNavLink href="/shop">{navLabels.shop}</HeaderNavLink>
            ) : null}
            <HeaderNavLink href="/contact">{navLabels.contact}</HeaderNavLink>
          </nav>

          {/* Mobile menu */}
          <div className="flex items-center justify-end md:hidden">
            <MobileMenu
              locale={locale}
              languageLabels={languageLabels}
              navLabels={navLabels}
            />
          </div>
        </div>
      </header>
  );
}