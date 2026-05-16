"use client";

import { useState, useEffect, useCallback } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cart-store";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import type { Locale } from "@/lib/i18n";
import type { Theme } from "@/lib/theme";

type MobileMenuProps = {
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
};

export function MobileMenu({
  locale,
  theme,
  languageLabels,
  themeLabels,
  navLabels,
  showCart = true,
}: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  // Close on escape key
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
        className="focus-visible:ring-accent/40 focus-visible:ring-offset-canvas inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/25 bg-surface text-ink/80 transition-all duration-200 hover:border-accent/55 hover:bg-accent-soft/40 hover:text-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
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
              className="focus-visible:ring-accent/40 focus-visible:ring-offset-canvas inline-flex h-8 w-8 items-center justify-center rounded-full border border-accent/25 bg-surface text-ink/80 transition-all duration-200 hover:border-accent/55 hover:bg-accent-soft/40 hover:text-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
              {showCart ? (
                <li>
                  <MobileCartLink label={navLabels.cart} onClick={closeMenu} />
                </li>
              ) : null}
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
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">Tema</span>
                <ThemeSwitcher
                  theme={theme}
                  labels={themeLabels}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────────────────── */
/*  Mobile-specific link components                               */
/* ──────────────────────────────────────────────────────────────── */

type MobileNavLinkProps = {
  href: "/about" | "/contact" | "/cart" | "/shop";
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

type MobileCartLinkProps = {
  label: string;
  onClick?: () => void;
};

function MobileCartLink({ label, onClick }: MobileCartLinkProps) {
  const pathname = usePathname();
  const count = useCartStore((state) => state.count());
  const hasHydrated = useCartStore((state) => state._hasHydrated);
  const isActive = pathname === "/cart";

  return (
    <Link
      href="/cart"
      onClick={onClick}
      aria-label={label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "flex items-center gap-3 py-3 text-lg font-medium tracking-wide transition-colors duration-200",
        isActive
          ? "text-accent"
          : "text-ink/70 hover:text-accent",
      )}
    >
      <span className="relative inline-flex">
        <ShoppingCart className="h-5 w-5" aria-hidden="true" />
        {hasHydrated && count > 0 ? (
          <span className="border-accent/30 bg-surface absolute -top-1.5 -right-2.5 min-w-4 border px-1 text-center text-[0.55em] leading-4">
            {count}
          </span>
        ) : null}
      </span>
      {label}
    </Link>
  );
}
