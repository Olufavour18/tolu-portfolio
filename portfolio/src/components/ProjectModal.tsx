import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Code2, ExternalLink, ArrowRight, FileDown } from "lucide-react";
import type { Project } from "../data/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start md:items-center justify-center p-0 md:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full md:max-w-3xl max-h-[92vh] md:max-h-[85vh] overflow-y-auto rounded-t-2xl md:rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-elevated)]"
          >
            <button
              onClick={onClose}
              aria-label="Close project details"
              className="absolute top-4 right-4 z-10 grid place-items-center w-9 h-9 rounded-md bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
            >
              <X size={16} />
            </button>

            <div className="aspect-[16/9] bg-[var(--color-surface)]">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 md:p-10">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-medium text-[var(--color-accent)]">
                  {project.category}
                </span>
                {project.date && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                    <span className="text-xs text-[var(--color-text-faint)]">
                      {project.date}
                    </span>
                  </>
                )}
              </div>

              <h3
                id="project-modal-title"
                className="font-[var(--font-display)] text-2xl md:text-3xl font-semibold text-[var(--color-text)] mb-4"
              >
                {project.title}
              </h3>

              <p className="text-[var(--color-text-muted)] leading-relaxed mb-8">
                {project.fullDescription}
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-2">
                    Problem
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {project.problem}
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-2">
                    Solution
                  </h4>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {project.workflow && project.workflow.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-4">
                    Process
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    {project.workflow.map((step, i) => (
                      <div key={step.label} className="flex items-center gap-2">
                        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-3 py-2">
                          <p className="text-xs font-medium text-[var(--color-text)]">
                            {step.label}
                          </p>
                          {step.description && (
                            <p className="text-xs text-[var(--color-text-faint)] mt-0.5">
                              {step.description}
                            </p>
                          )}
                        </div>
                        {i < project.workflow!.length - 1 && (
                          <ArrowRight
                            size={14}
                            className="text-[var(--color-text-faint)] shrink-0"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.screenshots && project.screenshots.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-4">
                    Screenshots
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {project.screenshots.map((src) => (
                      <img
                        key={src}
                        src={src}
                        alt={`${project.title} screenshot`}
                        className="rounded-lg border border-[var(--color-border)] w-full object-cover"
                      />
                    ))}
                  </div>
                </div>
              )}

              {project.results && project.results.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-3">
                    Results
                  </h4>
                  <ul className="space-y-2">
                    {project.results.map((r) => (
                      <li
                        key={r}
                        className="flex gap-3 text-sm text-[var(--color-text-muted)] leading-relaxed"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-2)] mt-1.5 shrink-0" />
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mb-8">
                <h4 className="text-sm font-medium text-[var(--color-text)] mb-3">
                  Tools
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs rounded border border-[var(--color-border)] px-2 py-1 text-[var(--color-text-muted)]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {project.files && project.files.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-sm font-medium text-[var(--color-text)] mb-3">
                    Files
                  </h4>
                  <div className="flex flex-col gap-2">
                    {project.files.map((file) => (
                      <a
                        key={file.url}
                        href={file.url}
                        download
                        className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
                      >
                        <FileDown size={15} />
                        {file.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 pt-2 border-t border-[var(--color-border-soft)]">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
                  >
                    <ExternalLink size={15} />
                    Live demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-5 py-2.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
                  >
                    <Code2 size={15} />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
