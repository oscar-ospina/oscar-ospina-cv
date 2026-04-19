import { notFound } from "next/navigation";
import { Geist, JetBrains_Mono } from "next/font/google";
import { hasLocale, LOCALES } from "@/content/types";
import { getContent } from "@/content";
import { StickyNav } from "@/components/nav/StickyNav";
import { ScrollProgress } from "@/components/chrome/ScrollProgress";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { cv, ui } = getContent(lang);

  return (
    <div className={`${geist.variable} ${jetbrains.variable}`}>
      <a href="#doc" className="skip-link">
        {ui.notFound.backHome}
      </a>
      <ScrollProgress />
      <StickyNav lang={lang} ui={ui} cv={cv} />
      {children}
    </div>
  );
}
