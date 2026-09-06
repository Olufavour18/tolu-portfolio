import { ArrowRight } from "lucide-react";
import { projects } from "../data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Automatically pulls in any project that defines a "workflow" chain —
// add one to a project in data/projects.ts to have it appear here.
export default function AutomationShowcase() {
  const automations = projects.filter(
    (p) => p.workflow && p.workflow.length > 0
  );

  if (automations.length === 0) return null;

  return (
    <section className="section-pad bg-[var(--color-bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            title="Automation systems I've built"
            description="Each system follows the same shape: something happens, the workflow processes it, and an action follows without anyone touching it."
          />
        </Reveal>

        <div className="space-y-4">
          {automations.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 md:p-7">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <h3 className="font-[var(--font-display)] text-[var(--color-text)] font-medium">
                    {project.title}
                  </h3>
                  <span className="text-xs text-[var(--color-accent)] font-medium">
                    {project.category}
                  </span>
                </div>

                <div className="flex items-stretch gap-2 overflow-x-auto pb-1">
                  {project.workflow!.map((step, idx) => (
                    <div key={step.label} className="flex items-center gap-2 shrink-0">
                      <div className="w-36 rounded-lg border border-[var(--color-border)] bg-[var(--color-surface)] px-3.5 py-3">
                        <p className="text-[10px] uppercase tracking-wide text-[var(--color-text-faint)] font-mono">
                          Step {idx + 1}
                        </p>
                        <p className="text-sm font-medium text-[var(--color-text)] mt-1">
                          {step.label}
                        </p>
                        {step.description && (
                          <p className="text-xs text-[var(--color-text-muted)] mt-1 leading-snug">
                            {step.description}
                          </p>
                        )}
                      </div>
                      {idx < project.workflow!.length - 1 && (
                        <ArrowRight
                          size={16}
                          className="text-[var(--color-text-faint)] shrink-0"
                        />
                      )}
                    </div>
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
