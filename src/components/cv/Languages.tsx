import type { CvData, UiStrings } from "@/content/types";

export function Languages({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section className="mb-14">
      <div className="section-label">{ui.sections.languages}</div>
      <div>
        {cv.languages.map((lang) => (
          <div key={lang.name}>
            <div className="flex justify-between items-center mb-3 text-[13px]">
              <span className="font-medium">{lang.name}</span>
              <span className="font-mono-micro text-[11px] text-(--color-ink-4) tracking-wider uppercase">
                {lang.level}
              </span>
            </div>
            <div className="h-0.5 bg-(--color-line) rounded-sm overflow-hidden mb-4">
              <span className="block h-full bg-(--color-ink)" style={{ width: `${lang.pct}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
