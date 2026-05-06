import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import { RootViewTransition } from "@/components/ui/root-view-transition";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { getTheme } from "@/lib/theme";
import "./globals.css";

const display = Lora({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  return {
    title: dict.metadata.siteTitle,
    description: dict.metadata.siteDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const theme = await getTheme();

  return (
    <html
      lang={locale}
      data-theme={theme}
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="bg-canvas text-ink flex min-h-full flex-col">
        <RootViewTransition>
          {children}
        </RootViewTransition>
      </body>
    </html>
  );
}
