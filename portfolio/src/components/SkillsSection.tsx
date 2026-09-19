import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { skillGroups } from "../data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function SkillsSection({ compact = false }: { compact?: boolean }) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="skills" className={compact ? "pt-4 pb-8" : "section-pad bg-[var(--color-bg-elevated)]"}>
      <div className={compact ? "" : "container-page"}>
        <Reveal>
          <SectionHeading
            title="Skills"
            description="Core capabilities, grouped by area — open a category to see the tools I work with."
          />
        </Reveal>

        <div className="max-w-2xl space-y-3">
          {skillGroups.map((group) => {
            const isOpen = openIds.has(group.id);
            return (
              <div
                key={group.id}
                className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(group.id)}
                  aria-expanded={isOpen}
                  aria-controls={`skills-${group.id}`}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-[var(--color-bg-elevated)] transition-colors"
                >
                  <span className="font-[var(--font-display)] text-sm font-medium text-[var(--color-text)]">
                    {group.title}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-[var(--color-text-muted)] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`skills-${group.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 flex flex-wrap gap-2">
                        {group.skills.map((skill) => (
                          <span
                            key={skill}
                            className="text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-[var(--color-text-muted)]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
