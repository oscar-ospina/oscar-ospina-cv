import type { CvData, UiStrings } from "@/content/types";

export function Skills({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  const groups = Object.entries(cv.skills) as [keyof UiStrings["skillGroups"], string[]][];
  return (
    <section id="skills">
      <div className="section-label">{ui.sections.skills}</div>
      <h3 className="text-[32px] mb-6 tracking-[-0.03em] font-semibold">
        {ui.sections.skillsHeading}
      </h3>
      <div className="grid grid-cols-1 gap-5">
        {groups.map(([group, items]) => (
          <div
            key={group}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-5 items-baseline py-3.5 border-b border-(--color-line) last:border-b-0"
          >
            <div className="font-mono-micro text-[11px] tracking-wider uppercase text-(--color-ink-3)">
              {ui.skillGroups[group] ?? group}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {items.map((item) => (
                <span
                  key={item}
                  className="font-mono-micro text-[11px] px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-(--color-ink-2) border border-(--color-line) hover:bg-(--color-accent-soft) hover:border-(--color-accent) hover:text-(--color-accent-2) transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
