import { testimonials } from "../data/testimonials";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section-pad bg-[var(--color-bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="What people say" />
        </Reveal>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.06}>
              <blockquote className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6">
                <p className="text-[var(--color-text-muted)] leading-relaxed mb-4">
                  "{t.quote}"
                </p>
                <footer className="text-sm text-[var(--color-text)] font-medium">
                  {t.name}
                  <span className="text-[var(--color-text-faint)] font-normal">
                    {" "}
                    · {t.role}
                  </span>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
