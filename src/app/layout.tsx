import type { Metadata } from "next";
import { Lora, Manrope } from "next/font/google";
import Script from "next/script";
import { getDictionary } from "@/lib/dictionaries";
import { getLocale } from "@/lib/i18n";
import { TimeOfDayWallpaper } from "@/components/ui/time-of-day-wallpaper";
import { TimeSlider } from "@/components/ui/time-slider";
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
          {`(function(){var urlHour=null;try{var p=new URLSearchParams(location.search);var h=p.get("hour");if(h!=null)urlHour=parseFloat(h)}catch(e){}var hour=urlHour!=null?urlHour:(new Date()).getHours()+(new Date()).getMinutes()/60;var sand;if(hour<5.5)sand="#0a111a";else if(hour<7.5)sand="#1a2535";else if(hour<12)sand="#d4c9a8";else if(hour<15)sand="#f5ecd8";else if(hour<17.5)sand="#eadcc0";else if(hour<19.5)sand="#d4b896";else sand="#4a3a2a";if(location.pathname==="/"||location.pathname===""){document.documentElement.setAttribute("data-splash","active");document.documentElement.style.setProperty("--splash-sand",sand)}})()`}
        </Script>
        <TimeOfDayWallpaper className="min-h-screen items-stretch justify-start">
          {children}
        </TimeOfDayWallpaper>
        <TimeSlider />
      </body>
    </html>
  );
}
