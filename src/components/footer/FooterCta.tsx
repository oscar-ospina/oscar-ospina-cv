import type { CvData, UiStrings } from "@/content/types";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";

export function FooterCta({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <footer className="relative mt-20 py-20 px-8 text-center border-t border-(--color-line)">
      <h3 className="font-(family-name:--font-display) text-[clamp(40px,6vw,72px)] font-semibold tracking-[-0.03em] leading-none mb-6">
        {ui.footer.heading}{" "}
        <em className="not-italic italic font-normal text-(--color-accent)">{ui.footer.headingEm}</em>{" "}
        something.
      </h3>
      <p className="text-(--color-ink-3) text-base max-w-[480px] mx-auto">{ui.footer.subtitle}</p>
      <div className="flex flex-wrap gap-2.5 justify-center mt-6">
        <RevealContact
          kind="email"
          encoded={encodeContact(cv.contact.email)}
          labelClosed={ui.reveal.showEmail}
          ariaLabel={ui.reveal.revealEmailAria}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-(--color-accent) text-white border border-(--color-accent) hover:bg-(--color-accent-2) transition-colors"
        />
        <a
          href={`https://${cv.contact.linkedin}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          {ui.docHeader.linkedin}
        </a>
        <a
          href={`https://${cv.contact.github}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        >
          GitHub ↗
        </a>
        <RevealContact
          kind="phone"
          encoded={encodeContact(cv.contact.phone)}
          labelClosed={ui.reveal.showPhone}
          ariaLabel={ui.reveal.revealPhoneAria}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
        />
      </div>
    </footer>
  );
}
