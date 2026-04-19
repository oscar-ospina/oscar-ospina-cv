import type { Metadata } from "next";
import { headers } from "next/headers";
import { Analytics } from "@vercel/analytics/next";
import { ThemeScript } from "@/components/chrome/ThemeScript";
import { DEFAULT_LOCALE, hasLocale } from "@/content/types";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://oscarospina.com"),
  title: {
    default: "Oscar Ospina — Senior Fullstack Developer",
    template: "%s · Oscar Ospina",
  },
  description:
    "Senior Fullstack Developer with 13+ years shipping distributed systems that scale to millions.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerList = await headers();
  const headerLocale = headerList.get("x-locale");
  const lang = headerLocale && hasLocale(headerLocale) ? headerLocale : DEFAULT_LOCALE;

  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="bg-paper text-ink antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
