import type { CvData, UiStrings } from "@/content/types";

export function Education({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section>
      <div className="section-label">{ui.sections.education}</div>
      <div className="text-sm">
        <div className="font-semibold mb-1">{cv.education.degree}</div>
        <div className="text-(--color-ink-3)">{cv.education.school}</div>
        <div className="font-mono-micro text-[11px] text-(--color-ink-4) tracking-wider mt-1">
          {cv.education.period}
        </div>
      </div>
    </section>
  );
}
