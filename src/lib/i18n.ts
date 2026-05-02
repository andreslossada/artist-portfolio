import { cookies } from "next/headers";

export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

const localeSet = new Set<Locale>(locales);

export const resolveLocale = (value?: string | null): Locale => {
  if (!value) {
    return defaultLocale;
  }

  return localeSet.has(value as Locale) ? (value as Locale) : defaultLocale;
};

export async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  return resolveLocale(cookieStore.get("lang")?.value);
}
