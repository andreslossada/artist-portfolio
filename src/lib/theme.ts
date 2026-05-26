export type Theme = "dark";

export const defaultTheme: Theme = "dark";

export async function getTheme(): Promise<Theme> {
  return defaultTheme;
}
