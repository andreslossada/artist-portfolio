import { NextResponse } from "next/server";
import { resolveTheme } from "@/lib/theme";

const isSafeRedirectPath = (value: string) => {
  return value.startsWith("/") && !value.startsWith("//");
};

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const theme = resolveTheme(searchParams.get("theme"));
  const redirectValue = searchParams.get("redirect") ?? "/";
  const redirectPath = isSafeRedirectPath(redirectValue) ? redirectValue : "/";
  const response = NextResponse.redirect(new URL(redirectPath, origin));

  response.cookies.set({
    name: "theme",
    value: theme,
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
