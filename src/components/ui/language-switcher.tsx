"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  locale: Locale;
  labels: {
    spanish: string;
    english: string;
  };
  className?: string;
};

const languageOptions: { value: Locale; labelKey: "spanish" | "english" }[] = [
  { value: "es", labelKey: "spanish" },
  { value: "en", labelKey: "english" },
];

const buildRedirectPath = (pathname: string | null, searchParams: URLSearchParams) => {
  const basePath = pathname || "/";
  const query = searchParams.toString();

  return query ? `${basePath}?${query}` : basePath;
};

export function LanguageSwitcher({
  locale,
  labels,
  className,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const redirect = buildRedirectPath(pathname, searchParams);

  return (
    <form
      action="/api/lang"
      method="get"
      className={className}
      aria-label="Language switcher"
    >
      <input type="hidden" name="redirect" value={redirect} />
      {languageOptions.map((option) => {
        const isActive = option.value === locale;
        const baseClasses =
          "cursor-pointer border px-2 py-1 text-[0.58rem] leading-none font-semibold tracking-[0.1em] uppercase transition-all duration-200 focus-visible:ring-accent/40 focus-visible:ring-offset-1 focus-visible:outline-none focus-visible:ring-2 md:text-[0.65rem]";

        return (
          <button
            key={option.value}
            type={isActive ? "button" : "submit"}
            name="locale"
            value={option.value}
            className={`${baseClasses} ${
              isActive
                ? "border-accent bg-accent text-white shadow-[0_4px_12px_rgba(43,95,168,0.3)]"
                : "border-accent/25 bg-white text-ink/65 hover:-translate-y-px hover:border-accent/55 hover:bg-accent-soft/40 hover:text-accent"
            }`}
            aria-current={isActive ? "true" : undefined}
          >
            {labels[option.labelKey]}
          </button>
        );
      })}
    </form>
  );
}
