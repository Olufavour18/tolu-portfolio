import { useState } from "react";
import { Send } from "lucide-react";
import { site } from "../data/site";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    const subject = encodeURIComponent(form.subject || "Portfolio inquiry");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad bg-[var(--color-bg-elevated)]">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            title="Let's work together"
            description="Have an automation, workflow, or data project in mind? Send a message or reach out directly."
          />
        </Reveal>

        <Reveal>
          <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="name" className="block text-sm text-[var(--color-text-muted)] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-[var(--color-text-muted)] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-[var(--color-text-muted)] mb-2">
                Subject
              </label>
              <input
                id="subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-[var(--color-text-muted)] mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
            >
              <Send size={15} />
              Send message
            </button>

            {sent && (
              <p className="text-sm text-[var(--color-accent-2)]">
                Your email app should now be open with this message ready to send.
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
