import type { CvData, UiStrings } from "@/content/types";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";

type Row =
  | { k: string; kind: "text"; v: string }
  | { k: string; kind: "link"; v: string; href: string }
  | { k: string; kind: "reveal"; which: "email" | "phone" };

export function Contact({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  const rows: Row[] = [
    { k: ui.contactRows.email, kind: "reveal", which: "email" },
    { k: ui.contactRows.phone, kind: "reveal", which: "phone" },
    { k: ui.contactRows.location, kind: "text", v: cv.location },
    { k: ui.contactRows.linkedin, kind: "link", v: cv.contact.linkedinHandle, href: `https://${cv.contact.linkedin}` },
    { k: ui.contactRows.github, kind: "link", v: cv.contact.githubHandle, href: `https://${cv.contact.github}` },
    { k: ui.contactRows.stackoverflow, kind: "link", v: cv.contact.stackoverflowHandle, href: `https://${cv.contact.stackoverflow}` },
  ];

  return (
    <section id="contact" className="mb-14">
      <div className="section-label">{ui.sections.contact}</div>
      <div className="flex flex-col gap-2.5">
        {rows.map((row) => (
          <div
            key={row.k}
            className="flex justify-between items-center text-[13px] py-2 border-b border-dashed border-(--color-line) last:border-b-0"
          >
            <span className="font-mono-micro text-[10px] tracking-wider uppercase text-(--color-ink-4)">
              {row.k}
            </span>
            {row.kind === "reveal" ? (
              <RevealContact
                kind={row.which}
                encoded={encodeContact(row.which === "email" ? cv.contact.email : cv.contact.phone)}
                labelClosed={row.which === "email" ? ui.reveal.showEmail : ui.reveal.showPhone}
                ariaLabel={row.which === "email" ? ui.reveal.revealEmailAria : ui.reveal.revealPhoneAria}
                className="max-w-[60%] text-right truncate hover:text-(--color-accent) transition-colors"
              />
            ) : row.kind === "link" ? (
              <a
                href={row.href}
                target="_blank"
                rel="noopener noreferrer"
                className="max-w-[60%] text-right truncate hover:text-(--color-accent) transition-colors"
              >
                {row.v}
              </a>
            ) : (
              <span className="max-w-[60%] text-right truncate">{row.v}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
