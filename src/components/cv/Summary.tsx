import type { CvData, UiStrings } from "@/content/types";

export function Summary({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section className="mb-14">
      <div className="section-label">{ui.sections.summary}</div>
      <p className="text-[15px] leading-[1.6] text-(--color-ink-2) max-w-[540px]">{cv.summary}</p>
    </section>
  );
}
