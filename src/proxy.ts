import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale } from "./content/types";

function pickLocale(acceptLanguage: string | null): string {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const requested = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0].toLowerCase());
  for (const req of requested) {
    const base = req.split("-")[0];
    if (hasLocale(base)) return base;
  }
  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const firstSegment = pathname.split("/")[1];
  if (hasLocale(firstSegment)) return NextResponse.next();

  if (pathname !== "/") return NextResponse.next();

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const chosen = cookieLocale && hasLocale(cookieLocale)
    ? cookieLocale
    : pickLocale(request.headers.get("accept-language"));

  if (chosen === DEFAULT_LOCALE) {
    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = `/${DEFAULT_LOCALE}`;
    const response = NextResponse.rewrite(rewriteUrl);
    if (!cookieLocale) response.cookies.set("NEXT_LOCALE", DEFAULT_LOCALE, { path: "/" });
    return response;
  }

  const redirectUrl = request.nextUrl.clone();
  redirectUrl.pathname = `/${chosen}`;
  const response = NextResponse.redirect(redirectUrl);
  response.cookies.set("NEXT_LOCALE", chosen, { path: "/" });
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/|api/|.*\\..*).*)",
  ],
};
