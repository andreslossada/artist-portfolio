import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Portfolio Artistico",
  description: "Portfolio artistico premium construido con Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
          lang="es"
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
          <body className="min-h-full flex flex-col bg-canvas text-ink">
              <SiteHeader />
              {children}
              <SiteFooter />
          </body>
    </html>
  );
}
