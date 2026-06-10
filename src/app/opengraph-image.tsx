import { ImageResponse } from "next/og";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";

export const alt = "Irina | Painter";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(name: string, url: string, weight: 500 | 700) {
  const res = await fetch(url, { cache: "force-cache" });
  const data = await res.arrayBuffer();
  return { name, data, weight, style: "normal" as const };
}

const GOOGLE_FONTS = {
  Lora: "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuxJHkq18ndeYxZ0.woff2",
  Manrope: "https://fonts.gstatic.com/s/manrope/v15/xn7gYHE41ni1AdIRggexSvfedN4Yxg.woff2",
};

export default async function Image() {
  const locale = await getLocale();
  const dict = getDictionary(locale);

  const fonts = await Promise.all([
    loadFont("Lora", GOOGLE_FONTS.Lora, 700),
    loadFont("Manrope", GOOGLE_FONTS.Manrope, 500),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#1a7a6e",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            right: "-10%",
            width: "70%",
            height: "80%",
            background:
              "radial-gradient(ellipse at center, rgba(233,196,106,0.15) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "60%",
            height: "60%",
            background:
              "radial-gradient(ellipse at center, rgba(26,90,82,0.4) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Gold accent line */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "28%",
            width: 120,
            height: 4,
            background: "#e9c46a",
            opacity: 0.8,
          }}
        />

        {/* Wave decoration at bottom */}
        <svg
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: 140,
            opacity: 0.12,
          }}
          viewBox="0 0 1200 140"
          preserveAspectRatio="none"
        >
          <path
            d="M0 90 C200 20, 400 160, 600 90 C800 20, 1000 160, 1200 90 L1200 140 L0 140 Z"
            fill="#b8e0d8"
          />
          <path
            d="M0 110 C250 50, 500 140, 750 100 C1000 60, 1100 140, 1200 110 L1200 140 L0 140 Z"
            fill="#2a9d8f"
            opacity="0.6"
          />
        </svg>

        {/* Dots decoration */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 100,
            width: 8,
            height: 8,
            background: "#e9c46a",
            borderRadius: "50%",
            opacity: 0.5,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 100,
            right: 80,
            width: 5,
            height: 5,
            background: "#b8e0d8",
            borderRadius: "50%",
            opacity: 0.4,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 180,
            left: 120,
            width: 6,
            height: 6,
            background: "#e9c46a",
            borderRadius: "50%",
            opacity: 0.4,
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: 0,
            zIndex: 1,
          }}
        >
          <div
            style={{
              fontFamily: "Lora",
              fontSize: 120,
              fontWeight: 700,
              color: "#f0f7f4",
              letterSpacing: "-0.02em",
              lineHeight: 1,
            }}
          >
            Irina
          </div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 32,
              fontWeight: 500,
              color: "#e9c46a",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginTop: 8,
            }}
          >
            {dict.metadata.siteTitle.split("|")[1]?.trim() ?? "Painter"}
          </div>
        </div>

        {/* Bottom URL */}
        <div
          style={{
            position: "absolute",
            bottom: 48,
            left: 0,
            right: 0,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 20,
              fontWeight: 500,
              color: "#b8e0d8",
              letterSpacing: "0.06em",
              opacity: 0.7,
            }}
          >
            estudioirina.com
          </div>
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
