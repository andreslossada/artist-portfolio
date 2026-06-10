import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import Script from "next/script";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SwimmingFish } from "@/components/animations/swimming-fish";
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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    ),
    title: {
      default: dict.metadata.siteTitle,
      template: `%s | ${dict.metadata.siteTitle.split("|")[1]?.trim() ?? "Estudio Irina"}`,
    },
    description: dict.metadata.siteDescription,
    openGraph: {
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
      type: "website",
      locale: locale === "es" ? "es_CO" : "en_US",
      siteName: "Estudio Irina",
    },
    twitter: {
      card: "summary_large_image",
      title: dict.metadata.siteTitle,
      description: dict.metadata.siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      data-theme="dark"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="text-ink relative flex min-h-full flex-col">
        <Script id="splash-init" strategy="beforeInteractive">
          {`if(location.pathname==="/"||location.pathname==="")document.documentElement.setAttribute("data-splash","active")`}
        </Script>
        <AuroraBackground className="min-h-screen items-stretch justify-start">
          <SwimmingFish />
          <div className="relative z-[1]">{children}</div>
        </AuroraBackground>
      </body>
    </html>
  );
}
