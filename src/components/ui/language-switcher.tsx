"use client";

import { usePathname, useSearchParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

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
      method="post"
      className={cn("inline-flex h-8 items-stretch border border-accent/25 md:h-10", className)}
      aria-label="Language switcher"
    >
      <input type="hidden" name="redirect" value={redirect} />
      {languageOptions.map((option) => {
        const isActive = option.value === locale;
        const baseClasses =
          "focus-visible:ring-accent/40 focus-visible:ring-offset-canvas inline-flex h-full min-w-8 cursor-pointer items-center justify-center rounded-none border border-transparent px-2 text-[0.58rem] leading-none font-semibold tracking-[0.1em] uppercase transition duration-200 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:min-w-10 md:text-[0.65rem]";

        return (
          <button
            key={option.value}
            type={isActive ? "button" : "submit"}
            name="locale"
            value={option.value}
            className={cn(
              baseClasses,
              isActive
                ? "border-accent bg-accent text-white shadow-[0_4px_12px_rgba(43,95,168,0.3)]"
                : "text-ink/60 hover:border-accent/45 hover:text-accent",
            )}
            aria-current={isActive ? "true" : undefined}
          >
            {labels[option.labelKey]}
          </button>
        );
      })}
    </form>
  );
}
