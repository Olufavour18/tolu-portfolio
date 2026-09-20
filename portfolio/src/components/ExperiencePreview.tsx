import { ArrowRight } from "lucide-react";
import { experience, experienceQuote } from "../data/experience";
import { useRoute } from "../hooks/useRoute";
import Reveal from "./Reveal";

/** Home page: pull-quote + first 2 experience entries */
export default function ExperiencePreview() {
  const { navigate } = useRoute();
  const preview = experience.slice(0, 2);

  return (
    <section id="experience" className="section-pad bg-[var(--color-bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-2xl sm:text-3xl mb-10 md:mb-12">
            Experience
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-10 md:gap-14 lg:gap-16 items-start">
          <Reveal>
            <blockquote className="relative pl-5 md:pl-6 border-l-2 border-[var(--color-accent)]">
              <p className="font-[var(--font-display)] text-[var(--color-text)] text-xl sm:text-2xl md:text-[1.65rem] leading-snug tracking-tight">
                {experienceQuote}
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={0.06}>
            <div className="space-y-0">
              {preview.map((item, i) => (
                <article
                  key={item.id}
                  className={`py-5 ${i > 0 ? "border-t border-[var(--color-border-soft)]" : ""}`}
                >
                  <h3 className="font-[var(--font-display)] text-[var(--color-accent)] text-lg sm:text-xl font-medium leading-snug">
                    {item.role}, {item.company}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--color-text-faint)] font-mono">
                    {item.period}
                  </p>
                  <p className="mt-2.5 text-sm text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </article>
              ))}

              <button
                type="button"
                onClick={() => navigate("/experience")}
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
              >
                Read more
                <ArrowRight size={15} aria-hidden />
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
