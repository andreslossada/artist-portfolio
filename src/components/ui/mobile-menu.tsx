"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import type { Locale } from "@/lib/i18n";

type MobileMenuProps = {
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
};

export function MobileMenu({
  locale,
  languageLabels,
  navLabels,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeMenu]);

  return (
    <>
      {/* Hamburger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
        className="focus-visible:ring-accent/40 focus-visible:ring-offset-canvas focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/25 bg-surface text-ink/80 transition-all duration-200 hover:border-accent/55 hover:bg-accent-soft/40 hover:text-accent md:hidden"
      >
        {isOpen ? (
          <X className="h-4 w-4" aria-hidden="true" />
        ) : (
          <Menu className="h-4 w-4" aria-hidden="true" />
        )}
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        id="mobile-menu-panel"
        className={`fixed top-0 right-0 z-50 h-full w-[min(320px,85vw)] transform border-l border-accent/15 bg-canvas shadow-2xl transition-transform duration-300 ease-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex h-full flex-col">
          {/* Close button area */}
          <div className="flex items-center justify-end px-5 pt-4 pb-2">
            <button
              type="button"
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="focus-visible:ring-accent/40 focus-visible:ring-offset-canvas focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/25 bg-surface text-ink/80 transition-all duration-200 hover:border-accent/55 hover:bg-accent-soft/40 hover:text-accent"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-8 py-6">
            <ul className="flex flex-col gap-2">
              <li>
                <MobileNavLink href="/about" onClick={closeMenu}>
                  {navLabels.about}
                </MobileNavLink>
              </li>
              {navLabels.shop ? (
                <li>
                  <MobileNavLink href="/shop" onClick={closeMenu}>
                    {navLabels.shop}
                  </MobileNavLink>
                </li>
              ) : null}
              <li>
                <MobileNavLink href="/contact" onClick={closeMenu}>
                  {navLabels.contact}
                </MobileNavLink>
              </li>
            </ul>
          </nav>

          {/* Bottom Controls */}
          <div className="border-t border-accent/15 px-8 py-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Idioma</span>
                <LanguageSwitcher
                  locale={locale}
                  labels={languageLabels}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type MobileNavLinkProps = {
  href: "/about" | "/contact" | "/shop";
  children: React.ReactNode;
  onClick?: () => void;
};

function MobileNavLink({ href, children, onClick }: MobileNavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center py-3 text-lg font-medium tracking-wide transition-colors duration-200",
        isActive
          ? "text-accent"
          : "text-ink/70 hover:text-accent",
      )}
    >
      {children}
    </Link>
  );
}