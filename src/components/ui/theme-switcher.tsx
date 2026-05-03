"use client";

import { Moon, Sun } from "lucide-react";
import { useState } from "react";
import type { Theme } from "@/lib/theme";

type ThemeSwitcherProps = {
  theme: Theme;
  labels: {
    light: string;
    dark: string;
  };
  className?: string;
};

export function ThemeSwitcher({ theme, labels, className }: ThemeSwitcherProps) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

  const isDark = currentTheme === "dark";
  const nextTheme: Theme = isDark ? "light" : "dark";
  const actionLabel = isDark ? labels.light : labels.dark;

  const handleToggleTheme = () => {
    const root = document.documentElement;

    root.classList.add("theme-transitioning");
    setCurrentTheme(nextTheme);
    root.setAttribute("data-theme", nextTheme);
    document.cookie = `theme=${nextTheme}; path=/; max-age=31536000; samesite=lax`;

    window.setTimeout(() => {
      root.classList.remove("theme-transitioning");
    }, 7000);
  };

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      aria-label={actionLabel}
      title={actionLabel}
      className={`focus-visible:ring-accent/40 focus-visible:ring-offset-canvas relative inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-accent/25 bg-surface text-ink/80 transition-all duration-200 hover:-translate-y-px hover:border-accent/55 hover:bg-accent-soft/40 hover:text-accent focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none ${className ?? ""}`}
    >
      <Sun
        className={`absolute h-4 w-4 transition-all duration-200 ${isDark ? "scale-75 -rotate-45 opacity-0" : "scale-100 rotate-0 opacity-100"}`}
        aria-hidden="true"
      />
      <Moon
        className={`absolute h-4 w-4 transition-all duration-200 ${isDark ? "scale-100 rotate-0 opacity-100" : "scale-75 rotate-45 opacity-0"}`}
        aria-hidden="true"
      />
    </button>
  );
}
