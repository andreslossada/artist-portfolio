import { NextResponse } from "next/server";
import { resolveLocale } from "@/lib/i18n";

const isSafeRedirectPath = (value: string) => {
  return value.startsWith("/") && !value.startsWith("//");
};

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const locale = resolveLocale(searchParams.get("locale"));
  const redirectValue = searchParams.get("redirect") ?? "/";
  const redirectPath = isSafeRedirectPath(redirectValue) ? redirectValue : "/";
  const response = NextResponse.redirect(new URL(redirectPath, origin));

  response.cookies.set({
    name: "lang",
    value: locale,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
