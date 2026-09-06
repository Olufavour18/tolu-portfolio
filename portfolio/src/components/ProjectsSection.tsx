import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import type { Project, ProjectCategory } from "../data/types";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

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

export default function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>("All");
  const [active, setActive] = useState<Project | null>(null);

  // Only show filters for categories that actually have a project —
  // new categories introduced in projects.ts appear automatically.
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

        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
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
  );
}
