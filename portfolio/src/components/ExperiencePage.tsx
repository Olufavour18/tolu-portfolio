import { ArrowLeft } from "lucide-react";
import { experience, experienceQuote } from "../data/experience";
import { useRoute } from "../hooks/useRoute";
import Reveal from "./Reveal";

export default function ExperiencePage() {
  const { navigate } = useRoute();

  return (
    <>
      <section className="pt-28 pb-4 md:pt-36">
        <div className="container-page">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2 rounded-sm"
          >
            <ArrowLeft size={16} aria-hidden />
            Back to home
          </button>
        </div>
      </section>

      <section id="experience" className="pb-20 md:pb-28">
        <div className="container-page">
          <Reveal>
            <h1 className="font-[var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-2xl sm:text-3xl md:text-[2.1rem] mb-10 md:mb-14">
              Experience
            </h1>
          </Reveal>

          <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 md:gap-14 lg:gap-16 items-start">
            <Reveal>
              <blockquote className="relative pl-5 md:pl-6 border-l-2 border-[var(--color-accent)] md:sticky md:top-28">
                <p className="font-[var(--font-display)] text-[var(--color-text)] text-xl sm:text-2xl md:text-[1.65rem] leading-snug tracking-tight">
                  {experienceQuote}
                </p>
              </blockquote>
            </Reveal>

            <div className="space-y-0">
              {experience.map((item, i) => (
                <Reveal key={item.id} delay={i * 0.04}>
                  <article
                    className={`py-6 md:py-7 ${i > 0 ? "border-t border-[var(--color-border-soft)]" : ""}`}
                  >
                    <h2 className="font-[var(--font-display)] text-[var(--color-accent)] text-lg sm:text-xl font-medium leading-snug">
                      {item.role}, {item.company}
                    </h2>
                    <p className="mt-1 text-xs text-[var(--color-text-faint)] font-mono">
                      {item.period}
                    </p>
                    <p className="mt-2.5 text-sm text-[var(--color-text-muted)] leading-relaxed">
                      {item.description}
                    </p>
                    {item.achievements && item.achievements.length > 0 && (
                      <ul className="mt-3 space-y-1.5">
                        {item.achievements.map((a) => (
                          <li
                            key={a}
                            className="flex gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] mt-1.5 shrink-0" />
                            {a}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.tools.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.tools.map((tool) => (
                          <span
                            key={tool}
                            className="text-xs rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-2.5 py-1 text-[var(--color-text-muted)]"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
