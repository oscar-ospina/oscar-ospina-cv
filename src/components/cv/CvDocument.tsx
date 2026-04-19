import Image from "next/image";
import type { CvData, UiStrings } from "@/content/types";
import { yearsOfExperience } from "@/content/types";
import { RevealContact } from "@/components/contact/RevealContact";
import { encodeContact } from "@/content/encode";
import { Summary } from "./Summary";
import { Contact } from "./Contact";
import { Languages } from "./Languages";
import { Certifications } from "./Certifications";
import { Education } from "./Education";
import { Experience } from "./Experience";
import { Skills } from "./Skills";

export function CvDocument({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  const years = yearsOfExperience(cv.careerStartYear);
  return (
    <main id="doc" className="doc relative z-[2] max-w-[1200px] mx-auto px-8 pt-10 pb-32">
      <header className="grid grid-cols-[auto_1fr_auto] gap-6 items-center pb-6 mb-10 border-b border-(--color-line)">
        <Image
          src="/oscar.jpg"
          alt=""
          width={64}
          height={64}
          className="rounded-full border border-(--color-line-2)"
        />
        <div>
          <h2 className="text-[22px] font-semibold tracking-[-0.02em]">{cv.name}</h2>
          <div className="font-mono-micro text-[11px] text-(--color-ink-3) tracking-wider uppercase mt-1">
            {cv.role} · {years}
            {ui.experience.yearsSuffix}
          </div>
        </div>
        <div className="flex gap-2">
          <a
            href={`https://${cv.contact.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium border border-(--color-line-2) hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
          >
            {ui.docHeader.linkedin}
          </a>
          <RevealContact
            kind="email"
            encoded={encodeContact(cv.contact.email)}
            labelClosed={ui.docHeader.hireMe}
            ariaLabel={ui.reveal.revealEmailAria}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-medium bg-(--color-accent) text-white border border-(--color-accent) hover:bg-(--color-accent-2) transition-colors"
          />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_2.2fr] gap-16">
        <aside>
          <Summary cv={cv} ui={ui} />
          <Contact cv={cv} ui={ui} />
          <Languages cv={cv} ui={ui} />
          <Certifications cv={cv} ui={ui} />
          <Education cv={cv} ui={ui} />
        </aside>
        <div>
          <Experience cv={cv} ui={ui} />
          <Skills cv={cv} ui={ui} />
        </div>
      </div>
    </main>
  );
}
