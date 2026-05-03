import { cookies } from "next/headers";

export const themes = ["light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const defaultTheme: Theme = "light";

const themeSet = new Set<Theme>(themes);

export const resolveTheme = (value?: string | null): Theme => {
  if (!value) {
    return defaultTheme;
  }

  return themeSet.has(value as Theme) ? (value as Theme) : defaultTheme;
};

export async function getTheme(): Promise<Theme> {
  const cookieStore = await cookies();
  return resolveTheme(cookieStore.get("theme")?.value);
}
