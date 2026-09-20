import { useState } from "react";
import { ArrowLeft, Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/certifications";
import { useRoute } from "../hooks/useRoute";
import Reveal from "./Reveal";

function CertImage({ src, alt }: { src?: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className="aspect-[16/10] bg-[var(--color-bg-elevated)] grid place-items-center">
        <Award size={28} className="text-[var(--color-text-faint)]" aria-hidden />
      </div>
    );
  }

  return (
    <div className="aspect-[16/10] bg-[var(--color-bg-elevated)] overflow-hidden">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

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

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {certifications.map((cert, i) => (
              <Reveal key={cert.id} delay={i * 0.05}>
                <article className="rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden h-full flex flex-col">
                  <CertImage src={cert.image} alt={`${cert.title} certificate`} />
                  <div className="p-5 flex flex-col gap-2 flex-1">
                    <div className="w-9 h-9 rounded-md border border-[var(--color-border)] grid place-items-center text-[var(--color-accent)] mb-1">
                      <Award size={16} aria-hidden />
                    </div>
                    <h2 className="font-[var(--font-display)] text-[var(--color-text)] font-medium leading-snug">
                      {cert.title}
                    </h2>
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
                        <ExternalLink size={14} aria-hidden />
                        View credential
                      </a>
                    )}
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
