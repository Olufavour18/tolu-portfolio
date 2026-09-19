import { ArrowRight } from "lucide-react";
import { useRoute } from "../hooks/useRoute";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  const { navigate } = useRoute();

  return (
    <section id="services" className="section-pad bg-[var(--color-bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            title="Services"
            description="Ways I can help — from a single automation to a full reporting system."
          />
        </Reveal>

        <Reveal>
          <button
            type="button"
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            View services &amp; projects
            <ArrowRight size={16} />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
