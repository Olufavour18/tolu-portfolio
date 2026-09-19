import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { services } from "../data/services";
import { projects } from "../data/projects";
import type { Project, ProjectCategory } from "../data/types";
import { resolveIcon } from "./IconResolver";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useRoute } from "../hooks/useRoute";

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

export default function ServicesPage() {
  const { navigate } = useRoute();
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
      <section className="pt-28 pb-8 md:pt-36">
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

      <section id="services" className="pb-16 md:pb-20">
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
                  <div className="group h-full bg-[var(--color-bg)] p-7 transition-colors hover:bg-[var(--color-surface)]">
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

      <section id="projects" className="section-pad bg-[var(--color-bg-elevated)]">
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
    </>
  );
}
