import Image from "next/image";
import type { CvData, UiStrings } from "@/content/types";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";

export function Hero({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section
      id="hero"
      className="relative flex items-center justify-center h-screen min-h-[640px] px-8 overflow-hidden"
    >
      <div className="hero max-w-[880px] w-full flex flex-col items-center text-center gap-7">
        <div className="relative">
          <Image
            src="/oscar.jpg"
            alt={cv.name}
            width={140}
            height={140}
            priority
            className="rounded-full border border-(--color-line-2) shadow-[0_1px_2px_rgba(0,0,0,.04),0_8px_24px_rgba(0,0,0,.06)]"
          />
          <span
            aria-hidden="true"
            className="absolute -inset-1.5 rounded-full border border-dashed border-(--color-line-2) opacity-70"
          />
        </div>

        <div className="inline-flex items-center gap-2.5 font-mono-micro text-xs uppercase tracking-[0.08em] text-(--color-ink-3)">
          <span
            aria-hidden="true"
            className="w-2 h-2 rounded-full bg-(--color-accent)"
            style={{ animation: "pulse-ring 2s ease-in-out infinite", boxShadow: "0 0 0 4px var(--color-accent-glow)" }}
          />
          {ui.hero.eyebrow}
        </div>

        <h1 className="font-(family-name:--font-display) font-semibold text-[clamp(64px,11vw,148px)] leading-[0.92] tracking-[-0.04em]">
          Oscar <em className="not-italic italic font-normal text-(--color-accent)">Ospina</em>.
        </h1>

        <p className="max-w-[600px] text-[clamp(20px,2.4vw,28px)] leading-[1.3] text-(--color-ink-2) tracking-[-0.01em]">
          {cv.tagline} {cv.summary.split(".")[0]}.
        </p>

        <div className="flex gap-5 flex-wrap justify-center font-mono-micro text-xs tracking-wider uppercase text-(--color-ink-3)">
          <span>TS · NODE · REACT</span>
          <span className="text-(--color-ink-4)">·</span>
          <span>GCP · AWS · AZURE</span>
          <span className="text-(--color-ink-4)">·</span>
          <span>{cv.location.toUpperCase()}</span>
        </div>

        <div className="flex gap-2.5 mt-2">
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-(--color-ink) text-(--color-paper) border border-(--color-ink) hover:bg-(--color-ink-2) transition-colors"
          >
            {ui.hero.ctaSeeExperience}
          </a>
          <RevealContact
            kind="email"
            encoded={encodeContact(cv.contact.email)}
            labelClosed={ui.reveal.showEmail}
            ariaLabel={ui.reveal.revealEmailAria}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 font-mono-micro text-[11px] tracking-[0.12em] uppercase text-(--color-ink-4) flex flex-col items-center gap-2"
        style={{ animation: "bounce-hint 2.2s ease-in-out infinite" }}
      >
        {ui.hero.scrollHint}
        <span className="w-px h-6 bg-gradient-to-b from-(--color-ink-4) to-transparent" />
      </div>
    </section>
  );
}
