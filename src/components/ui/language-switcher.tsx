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
          "cursor-pointer border px-2 py-1 text-[0.58rem] leading-none font-semibold tracking-[0.1em] uppercase transition-all duration-200 md:text-[0.65rem]";

        return (
          <button
            key={option.value}
            type={isActive ? "button" : "submit"}
            name="locale"
            value={option.value}
            className={`${baseClasses} ${
              isActive
                ? "border-black bg-black text-white shadow-[0_4px_12px_rgba(0,0,0,0.18)]"
                : "border-black/20 bg-white/70 text-black/65 hover:-translate-y-px hover:border-black/45 hover:bg-white hover:text-black"
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
