import { motion } from "framer-motion";
import { skillGroups } from "../data/skills";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" className="section-pad bg-[var(--color-bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="Skills" />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8">
          {skillGroups.map((group, i) => (
            <Reveal key={group.id} delay={i * 0.05}>
              <div>
                <h3 className="text-sm font-medium text-[var(--color-text)] mb-4">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ y: -2 }}
                      transition={{ duration: 0.15 }}
                      className="text-sm rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-1.5 text-[var(--color-text-muted)] hover:border-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
