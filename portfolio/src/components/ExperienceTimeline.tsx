import { experience } from "../data/experience";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="Experience" />
        </Reveal>

        <div className="relative max-w-3xl">
          <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--color-border)]" />

          <div className="space-y-10">
            {experience.map((item, i) => (
              <Reveal key={`${item.role}-${item.company}`} delay={i * 0.06}>
                <div className="relative pl-10">
                  <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg)]" />

                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 mb-2">
                    <h3 className="font-[var(--font-display)] text-[var(--color-text)] font-medium">
                      {item.role}
                      <span className="text-[var(--color-text-muted)] font-normal">
                        {" "}
                        · {item.company}
                      </span>
                    </h3>
                    <span className="text-xs text-[var(--color-text-faint)] font-mono">
                      {item.period}
                    </span>
                  </div>

                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
                    {item.description}
                  </p>

                  {item.achievements.length > 0 && (
                    <ul className="space-y-1.5">
                      {item.achievements.map((a) => (
                        <li
                          key={a}
                          className="flex gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-2)] mt-1.5 shrink-0" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
