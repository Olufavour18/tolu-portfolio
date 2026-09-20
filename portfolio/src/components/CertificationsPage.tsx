import { ArrowLeft, Award } from "lucide-react";
import { certifications } from "../data/certifications";
import { useRoute } from "../hooks/useRoute";
import Reveal from "./Reveal";

export default function CertificationsPage() {
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

      <section id="certifications" className="pb-20 md:pb-28">
        <div className="container-page">
          <Reveal>
            <h1 className="font-[var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-2xl sm:text-3xl md:text-[2.1rem]">
              Certifications &amp; courses
            </h1>
            <p className="mt-3 max-w-2xl text-[var(--color-text-muted)] leading-relaxed">
              Credentials and courses I've completed, kept current as I keep learning.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.04}>
                <article className="h-full rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 flex flex-col gap-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--color-accent)] hover:shadow-[0_0_0_1px_var(--color-accent-soft)]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md border border-[var(--color-border)] grid place-items-center text-[var(--color-accent)] shrink-0">
                      {cert.issuer ? (
                        <span className="text-xs font-semibold font-[var(--font-display)]">
                          {cert.issuer
                            .split(/\s+/)
                            .map((w) => w[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </span>
                      ) : (
                        <Award size={16} />
                      )}
                    </div>
                    <p className="text-sm text-[var(--color-text-muted)] leading-snug">
                      {cert.issuer}
                    </p>
                  </div>
                  <h2 className="font-[var(--font-display)] text-[var(--color-text)] font-medium leading-snug text-base">
                    {cert.title}
                  </h2>
                  <p className="mt-auto text-xs font-mono text-[var(--color-text-faint)]">
                    {cert.date}
                  </p>
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-[var(--color-accent)] hover:underline"
                    >
                      View credential
                    </a>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
