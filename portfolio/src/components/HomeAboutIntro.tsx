import { ArrowRight } from "lucide-react";
import { useRoute } from "../hooks/useRoute";
import AboutOverlapVisual from "./AboutOverlapVisual";
import Reveal from "./Reveal";

const SHORT_INTRO =
  "I'm Tolu Favour Omoloye, an AI Automation Specialist, n8n Workflow Developer, and Data Analyst. My work sits at the intersection of automation and data — building systems that take repetitive, manual tasks off a team's plate.";

export default function HomeAboutIntro() {
  const { navigate } = useRoute();

  return (
    <section id="about-intro" className="section-pad pt-4 md:pt-6">
      <div className="container-page">
        <Reveal>
          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] gap-8 md:gap-12 items-center">
            {/* Mobile: text first */}
            <div className="order-1 md:order-2">
              <p className="text-[var(--color-text-muted)] leading-relaxed text-base md:text-lg max-w-xl">
                {SHORT_INTRO}
              </p>
              <button
                type="button"
                onClick={() => navigate("/about")}
                className="mt-6 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-4 py-2.5 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
              >
                Read more
                <ArrowRight size={15} aria-hidden />
              </button>
            </div>
            <div className="order-2 md:order-1 flex justify-center md:justify-start">
              <AboutOverlapVisual />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
