import { site } from "../data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading title="About" />
        </Reveal>

        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-12 md:gap-16">
          <Reveal>
            <div className="space-y-5 text-[var(--color-text-muted)] leading-relaxed">
              {site.aboutParagraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
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
          </Reveal>
        </div>
      </div>
    </section>
  );
}
