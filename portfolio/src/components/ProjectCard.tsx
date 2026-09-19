import { motion } from "framer-motion";
import type { Project } from "../data/types";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  return (
    <motion.button
      layout
      type="button"
      onClick={() => onOpen(project)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="text-left rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden flex flex-col group focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] w-full"
    >
      <div className="aspect-[16/10] overflow-hidden bg-[var(--color-bg-elevated)]">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-[var(--color-accent)]">
            {project.category}
          </span>
          {project.date && (
            <span className="text-xs text-[var(--color-text-faint)]">
              {project.date}
            </span>
          )}
        </div>

        <h3 className="font-[var(--font-display)] text-[var(--color-text)] font-medium leading-snug">
          {project.title}
        </h3>

        <p className="text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
          {project.shortDescription}
        </p>

        <span className="mt-auto pt-2 text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
          Explore more
        </span>
      </div>
    </motion.button>
  );
}
