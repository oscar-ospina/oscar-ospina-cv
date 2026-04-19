import Image from "next/image";
import type { CvData, Locale, UiStrings } from "@/content/types";
import { LocaleToggle } from "./LocaleToggle";
import { ThemeToggle } from "./ThemeToggle";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";

export function StickyNav({
  lang,
  ui,
  cv,
}: {
  lang: Locale;
  ui: UiStrings;
  cv: CvData;
}) {
  return (
    <nav
      className="sticky-nav flex items-center justify-between px-8 py-3 bg-(--color-paper)/85 backdrop-blur-md saturate-[180%] border-b border-(--color-line)"
      aria-label="Primary"
    >
      <div className="flex items-center gap-2.5 font-semibold text-sm">
        <Image
          src="/oscar.jpg"
          alt=""
          width={28}
          height={28}
          className="rounded-full border border-(--color-line-2)"
        />
        <span>{cv.name}</span>
        <span className="text-(--color-ink-4) font-normal">{ui.nav.roleSuffix}</span>
      </div>

      <div className="hidden md:flex gap-5 text-[13px] text-(--color-ink-3)">
        <a href="#experience" className="hover:text-(--color-ink) transition-colors">{ui.nav.experience}</a>
        <a href="#skills" className="hover:text-(--color-ink) transition-colors">{ui.nav.skills}</a>
        <a href="#certs" className="hover:text-(--color-ink) transition-colors">{ui.nav.certs}</a>
        <a href="#contact" className="hover:text-(--color-ink) transition-colors">{ui.nav.contact}</a>
      </div>

      <div className="flex items-center gap-3">
        <LocaleToggle lang={lang} ui={ui.toggles} />
        <ThemeToggle ui={ui.toggles} />
        <RevealContact
          kind="email"
          encoded={encodeContact(cv.contact.email)}
          labelClosed={ui.nav.cta}
          ariaLabel={ui.reveal.revealEmailAria}
          className="bg-(--color-ink) text-(--color-paper) px-3.5 py-2 rounded-md text-[13px] font-medium hover:-translate-y-px transition-transform inline-flex items-center"
        />
      </div>
    </nav>
  );
}
