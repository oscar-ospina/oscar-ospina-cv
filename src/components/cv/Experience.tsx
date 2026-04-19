import type { CvData, UiStrings } from "@/content/types";
import { Job } from "./Job";

export function Experience({ cv, ui }: { cv: CvData; ui: UiStrings }) {
  return (
    <section id="experience" className="mb-14">
      <div className="section-label">{ui.sections.experience}</div>
      <h3 className="text-[32px] mb-8 tracking-[-0.03em] font-semibold">
        {ui.sections.experienceHeading}
      </h3>
      {cv.jobs.map((job, idx) => (
        <Job key={job.company} job={job} isCurrent={idx === 0} ui={ui} />
      ))}
    </section>
  );
}
