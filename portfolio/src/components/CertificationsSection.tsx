import { ArrowRight } from "lucide-react";
import { useRoute } from "../hooks/useRoute";
import Reveal from "./Reveal";

/** Home: compact clickable heading row only — full list lives on /certifications */
export default function CertificationsSection() {
  const { navigate } = useRoute();

  return (
    <section id="certifications" className="py-10 md:py-12">
      <div className="container-page">
        <Reveal>
          <button
            type="button"
            onClick={() => navigate("/certifications")}
            className="group w-full flex items-center justify-between gap-4 text-left rounded-md focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
          >
            <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-2xl sm:text-3xl group-hover:text-[var(--color-accent)] transition-colors">
              Certifications &amp; courses
            </h2>
            <ArrowRight
              size={22}
              className="shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all"
              aria-hidden
            />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
