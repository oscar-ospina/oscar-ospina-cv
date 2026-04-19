import type { CvData, UiStrings } from "@/content/types";

export function Certifications({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section id="certs" className="mb-14">
      <div className="section-label">{ui.sections.certifications}</div>
      <div className="flex flex-col gap-2.5">
        {cv.certifications.map((c) => (
          <a
            key={c.name}
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col gap-1 p-3.5 border border-(--color-line-2) rounded-lg bg-white/30 dark:bg-white/5 hover:border-(--color-accent) hover:bg-(--color-accent-soft) transition-colors"
          >
            <span className="font-semibold text-sm">{c.name}</span>
            <span className="font-mono-micro text-[11px] text-(--color-ink-3) tracking-wider">
              {c.issuer} · {c.date} ↗
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
