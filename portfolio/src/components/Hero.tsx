import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { site } from "../data/site";
import WorkflowBackground from "./WorkflowBackground";

const easeOut = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: prefersReducedMotion ? 0 : 0.12 },
    },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden"
    >
      <div className="container-page grid md:grid-cols-[1.15fr_0.85fr] gap-14 md:gap-8 items-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.p
            variants={item}
            className="text-sm text-[var(--color-accent)] font-medium mb-5"
          >
            {site.role}
          </motion.p>

          <motion.h1
            variants={item}
            className="font-[var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-[2.5rem] leading-[1.08] sm:text-[3.1rem] md:text-[3.6rem]"
          >
            AI automation
            <br />
            &amp; data analytics
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[var(--color-text-muted)] text-base md:text-lg leading-relaxed"
          >
            {site.tagline}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              View my projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-6 py-3 text-sm font-medium text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
            >
              Let's work together
              <ArrowUpRight size={15} />
            </a>
            {site.resumeUrl && (
              <a
                href={site.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-md px-6 py-3 text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <Download size={15} />
                Download CV
              </a>
            )}
          </motion.div>

          <motion.div
            variants={item}
            className="mt-14 flex items-center gap-8 text-[var(--color-text-faint)] text-sm"
          >
            <span>n8n</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span>AI Agents</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span>Power BI</span>
            <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
            <span>SQL</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative aspect-square max-w-[420px] mx-auto w-full rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6"
        >
          <WorkflowBackground />
        </motion.div>
      </div>
    </section>
  );
}
