import { NextResponse } from "next/server";
import { resolveLocale } from "@/lib/i18n";

const isSafeRedirectPath = (value: string, origin: string) => {
  try {
    const url = new URL(value, origin);
    return url.origin === origin && !value.startsWith("//") && !value.includes("\\");
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  const referer = request.headers.get("referer");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (siteUrl && referer) {
    try {
      const refOrigin = new URL(referer).origin;
      const siteOrigin = new URL(siteUrl).origin;
      if (refOrigin !== siteOrigin && refOrigin !== origin) {
        return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }
  }

  const locale = resolveLocale(searchParams.get("locale"));
  const redirectValue = searchParams.get("redirect") ?? "/";
  const redirectPath = isSafeRedirectPath(redirectValue, origin) ? redirectValue : "/";
  const response = NextResponse.redirect(new URL(redirectPath, origin));

  response.cookies.set({
    name: "lang",
    value: locale,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });

  return response;
}
