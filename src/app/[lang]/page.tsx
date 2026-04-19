import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "@/content/types";
import { getContent } from "@/content";
import { Hero } from "@/components/hero/Hero";
import { CvDocument } from "@/components/cv/CvDocument";
import { FooterCta } from "@/components/footer/FooterCta";
import { SmoothScroll } from "@/components/chrome/SmoothScroll";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { cv, ui } = getContent(lang);

  const title = `${cv.name} — ${ui.meta.titleRole}`;
  const description = cv.summary;
  const canonical = lang === "en" ? "/" : `/${lang}`;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
      languages: {
        "x-default": "/",
        en: "/",
        es: "/es",
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "profile",
      locale: lang === "es" ? "es_CO" : "en_US",
      alternateLocale: lang === "es" ? ["en_US"] : ["es_CO"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { cv, ui } = getContent(lang);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: cv.name,
    jobTitle: cv.role,
    description: cv.summary,
    url: lang === "en" ? "https://oscarospina.com/" : `https://oscarospina.com/${lang}`,
    sameAs: [
      `https://${cv.contact.linkedin}`,
      `https://${cv.contact.github}`,
      `https://${cv.contact.stackoverflow}`,
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressCountry: "CO",
    },
    knowsAbout: [
      ...cv.skills.Languages,
      ...cv.skills.Frontend,
      ...cv.skills.Backend,
      ...cv.skills.Cloud,
    ],
  };

  return (
    <>
      <SmoothScroll />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero cv={cv} ui={ui} />
      <CvDocument cv={cv} ui={ui} />
      <FooterCta cv={cv} ui={ui} />
    </>
  );
}
