import { motion, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, ChevronDown } from "lucide-react";
import { certifications } from "../data/certifications";
import { useExpand } from "../hooks/useExpand";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function CertificationsSection() {
  const { expanded, toggle } = useExpand();
  const isOpen = expanded.certifications;

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

        <Reveal>
          <button
            type="button"
            onClick={() => toggle("certifications")}
            aria-expanded={isOpen}
            aria-controls="certifications-grid"
            className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
          >
            {isOpen ? "Hide certifications" : "View certifications"}
            <ChevronDown
              size={16}
              className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </Reveal>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id="certifications-grid"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-10">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden h-full flex flex-col"
                  >
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
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
