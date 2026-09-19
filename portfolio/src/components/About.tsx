import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { site } from "../data/site";
import { useExpand } from "../hooks/useExpand";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const SHORT_INTRO =
  "I'm Tolu Favour Omoloye, an AI Automation Specialist, n8n Workflow Developer, and Data Analyst. My work sits at the intersection of automation and data — building systems that take repetitive, manual tasks off a team's plate.";

export default function About() {
  const { expanded, toggle } = useExpand();
  const isOpen = expanded.about;

  const remainingParagraphs = site.aboutParagraphs.slice(1);

  return (
    <section id="about" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="About" />
        </Reveal>

        <Reveal>
          <div className="max-w-2xl">
            <p className="text-[var(--color-text-muted)] leading-relaxed">
              {SHORT_INTRO}
            </p>

            <button
              type="button"
              onClick={() => toggle("about")}
              aria-expanded={isOpen}
              aria-controls="about-more"
              className="mt-6 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              {isOpen ? "Show less" : "Read more about me"}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        </Reveal>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="about-more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16 pt-10">
                <div className="space-y-5 text-[var(--color-text-muted)] leading-relaxed">
                  {remainingParagraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-7">
                  <h3 className="font-[var(--font-display)] text-[var(--color-text)] font-medium mb-4 text-sm">
                    What I focus on
                  </h3>
                  <ul className="space-y-3">
                    {site.focusAreas.map((area) => (
                      <li
                        key={area}
                        className="flex items-center gap-3 text-sm text-[var(--color-text-muted)]"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] shrink-0" />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
