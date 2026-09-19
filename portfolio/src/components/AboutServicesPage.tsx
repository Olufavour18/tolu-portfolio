import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { site } from "../data/site";
import { services } from "../data/services";
import { projects } from "../data/projects";
import type { Project, ProjectCategory } from "../data/types";
import { useExpand } from "../hooks/useExpand";
import { useRoute } from "../hooks/useRoute";
import { resolveIcon } from "./IconResolver";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import SkillsSection from "./SkillsSection";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

const SHORT_INTRO =
  "I'm Tolu Favour Omoloye, an AI Automation Specialist, n8n Workflow Developer, and Data Analyst. My work sits at the intersection of automation and data — building systems that take repetitive, manual tasks off a team's plate.";

type Filter = "All" | ProjectCategory;

const categories: ProjectCategory[] = [
  "AI Automation",
  "n8n",
  "Data Analytics",
  "CRM",
  "AI Agents",
  "Dashboards",
  "Web Applications",
];

export default function AboutServicesPage() {
  const { navigate } = useRoute();
  const { expanded, toggle } = useExpand();
  const aboutOpen = expanded.about;
  const remainingParagraphs = site.aboutParagraphs.slice(1);

  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  const availableFilters = useMemo(() => {
    const used = new Set(projects.map((p) => p.category));
    return categories.filter((c) => used.has(c));
  }, []);

  const sorted = useMemo(
    () => [...projects].sort((a, b) => Number(b.featured) - Number(a.featured)),
    []
  );

  const filtered = useMemo(
    () => (filter === "All" ? sorted : sorted.filter((p) => p.category === filter)),
    [filter, sorted]
  );

  return (
    <>
      <section className="pt-28 pb-4 md:pt-36">
        <div className="container-page">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            Back to home
          </button>
        </div>
      </section>

      <section id="about" className="pb-16 md:pb-20">
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
                aria-expanded={aboutOpen}
                aria-controls="about-more"
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                {aboutOpen ? "Show less" : "Read more about me"}
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-300 ${aboutOpen ? "rotate-180" : ""}`}
                />
              </button>
            </div>
          </Reveal>

          <AnimatePresence initial={false}>
            {aboutOpen && (
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

      <section id="services" className="section-pad bg-[var(--color-bg-elevated)]">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="Services"
              description="Ways I can help — from a single automation to a full reporting system."
            />
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--color-border-soft)] rounded-xl overflow-hidden border border-[var(--color-border-soft)]">
            {services.map((service, i) => {
              const Icon = resolveIcon(service.icon);
              return (
                <Reveal key={service.id} delay={(i % 3) * 0.06}>
                  <div className="group h-full bg-[var(--color-bg-elevated)] p-7 transition-colors hover:bg-[var(--color-surface)]">
                    <div className="w-10 h-10 rounded-md border border-[var(--color-border)] grid place-items-center text-[var(--color-accent)] mb-5 transition-transform duration-300 group-hover:-translate-y-0.5">
                      <Icon size={18} />
                    </div>
                    <h3 className="font-[var(--font-display)] text-[var(--color-text)] font-medium mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="section-pad">
        <div className="container-page">
          <Reveal>
            <SectionHeading
              title="Projects"
              description="A selection of automation, AI, and data analytics work — filterable by category."
            />
          </Reveal>

          <Reveal>
            <div className="flex flex-wrap gap-2 mb-10">
              {(["All", ...availableFilters] as Filter[]).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setFilter(c)}
                  className={`text-sm px-3.5 py-1.5 rounded-full border transition-colors ${
                    filter === c
                      ? "bg-[var(--color-accent)] border-[var(--color-accent)] text-white"
                      : "border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-text-faint)]"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                >
                  <ProjectCard project={project} onOpen={setActive} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-[var(--color-text-muted)] text-sm">
              No projects in this category yet.
            </p>
          )}
        </div>

        <ProjectModal project={active} onClose={() => setActive(null)} />
      </section>

      <section className="section-pad bg-[var(--color-bg-elevated)]">
        <div className="container-page">
          <SkillsSection compact />
        </div>
      </section>
    </>
  );
}
