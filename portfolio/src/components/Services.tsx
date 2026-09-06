import { services } from "../data/services";
import { resolveIcon } from "./IconResolver";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  return (
    <section id="services" className="section-pad bg-[var(--color-bg-elevated)]">
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
                <div className="group h-full bg-[var(--color-bg-elevated)] p-7 transition-colors hover:bg-[var(--color-surface)]">
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
  );
}
