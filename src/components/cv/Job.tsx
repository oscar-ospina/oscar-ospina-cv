import type { Job as JobT } from "@/content/types";

export function Job({ job, isCurrent }: { job: JobT; isCurrent: boolean }) {
  return (
    <article
      className="relative pl-6 pb-10 border-l border-(--color-line) last:border-l-transparent last:pb-0"
    >
      <span
        aria-hidden="true"
        className={`absolute left-[-5px] top-1 w-[9px] h-[9px] rounded-full border-2 ${
          isCurrent
            ? "bg-(--color-accent) border-(--color-accent) shadow-[0_0_0_4px_var(--color-accent-glow)]"
            : "bg-(--color-paper) border-(--color-ink)"
        }`}
      />
      <header className="flex justify-between items-start gap-4 mb-1.5 flex-wrap">
        <div>
          <div className="text-lg font-semibold tracking-[-0.01em] flex items-baseline gap-2.5 flex-wrap">
            <span>{job.company}</span>
            <span className="font-mono-micro text-[11px] text-(--color-ink-4) tracking-wider uppercase font-normal">
              {job.industry}
            </span>
          </div>
          <div className="text-sm text-(--color-accent) font-medium mb-1">{job.role}</div>
        </div>
        <div className="font-mono-micro text-[11px] text-(--color-ink-3) tracking-wider whitespace-nowrap">
          {job.period} · {job.duration}
        </div>
      </header>

      {job.team && (
        <div className="text-[13px] text-(--color-ink-3) mb-4">Team: {job.team}</div>
      )}

      <p className="text-sm leading-[1.55] text-(--color-ink-2) mb-4 max-w-[620px]">
        {job.context}
      </p>

      <div className="grid gap-2.5 mb-4">
        {job.highlights.map((h, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-5 p-3.5 border border-(--color-line) rounded-lg bg-white/35 dark:bg-white/5 hover:border-(--color-line-2) hover:bg-white/60 dark:hover:bg-white/10 transition-colors"
          >
            <div className="flex flex-col gap-0.5">
              <span className="font-(family-name:--font-display) text-2xl font-semibold tracking-[-0.03em] text-(--color-accent) leading-none">
                {h.metric}
              </span>
              <span className="font-mono-micro text-[10px] tracking-wider uppercase text-(--color-ink-4) leading-snug">
                {h.label}
              </span>
            </div>
            <div className="text-[13px] leading-[1.55] text-(--color-ink-2)">{h.desc}</div>
          </div>
        ))}
      </div>

      {job.stack.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {job.stack.map((s) => (
            <span
              key={s}
              className="font-mono-micro text-[11px] px-2.5 py-1 rounded bg-black/5 dark:bg-white/5 text-(--color-ink-2) border border-(--color-line) hover:bg-(--color-accent-soft) hover:border-(--color-accent) hover:text-(--color-accent-2) transition-colors"
            >
              {s}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
