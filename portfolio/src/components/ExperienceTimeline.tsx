import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience } from "../data/experience";
import { useExpand } from "../hooks/useExpand";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ExperienceTimeline() {
  const { expanded, toggle } = useExpand();
  const isOpen = expanded.experience;

  return (
    <section id="experience" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            title="Experience"
            description="Roles and projects that shaped how I work with data, automation, and systems."
          />
        </Reveal>

        <Reveal>
          <button
            type="button"
            onClick={() => toggle("experience")}
            aria-expanded={isOpen}
            aria-controls="experience-timeline"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            {isOpen ? "Hide experience" : "View my experience"}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </Reveal>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="experience-timeline"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="relative max-w-3xl pt-10">
                <div className="absolute left-[7px] top-12 bottom-2 w-px bg-[var(--color-border)]" />

                <div className="space-y-10">
                  {experience.map((item) => (
                    <div
                      key={`${item.role}-${item.company}`}
                      className="relative pl-10"
                    >
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
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
