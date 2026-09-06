import { projects } from "../data/projects";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

// Pulls in any project categorized as "Data Analytics" or "Dashboards".
export default function DataAnalyticsShowcase() {
  const analyticsProjects = projects.filter(
    (p) => p.category === "Data Analytics" || p.category === "Dashboards"
  );

  if (analyticsProjects.length === 0) return null;

  return (
    <section className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            title="Data analytics & dashboard projects"
            description="From raw, inconsistent data to a dashboard people actually check."
          />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {analyticsProjects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.06}>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden h-full flex flex-col">
                <div className="aspect-[16/9] bg-[var(--color-bg-elevated)]">
                  <img
                    src={project.image}
                    alt={`${project.title} dashboard preview`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <h3 className="font-[var(--font-display)] text-[var(--color-text)] font-medium">
                    {project.title}
                  </h3>

                  <div>
                    <p className="text-xs font-medium text-[var(--color-text)] mb-1">
                      Dataset & problem
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {project.problem}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-[var(--color-text)] mb-1">
                      Cleaning & analysis
                    </p>
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {project.solution}
                    </p>
                  </div>

                  {project.results && project.results.length > 0 && (
                    <div>
                      <p className="text-xs font-medium text-[var(--color-text)] mb-2">
                        Key insights & recommendations
                      </p>
                      <ul className="space-y-1.5">
                        {project.results.map((r) => (
                          <li
                            key={r}
                            className="flex gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-2)] mt-1.5 shrink-0" />
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs rounded border border-[var(--color-border)] px-2 py-0.5 text-[var(--color-text-muted)]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
