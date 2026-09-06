import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/certifications";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function CertificationsSection() {
  if (certifications.length === 0) return null;

  return (
    <section id="certifications" className="section-pad">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            title="Certifications & courses"
            description="Credentials and courses I've completed, kept current as I keep learning."
          />
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {certifications.map((cert, i) => (
            <Reveal key={cert.id} delay={i * 0.05}>
              <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden h-full flex flex-col">
                {cert.image && (
                  <div className="aspect-[16/10] bg-[var(--color-bg-elevated)]">
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="w-9 h-9 rounded-md border border-[var(--color-border)] grid place-items-center text-[var(--color-accent)] mb-1">
                    <Award size={16} />
                  </div>
                  <h3 className="font-[var(--font-display)] text-[var(--color-text)] font-medium leading-snug">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {cert.issuer} · {cert.date}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto pt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      <ExternalLink size={14} />
                      View credential
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
