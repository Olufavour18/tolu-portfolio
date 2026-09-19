import { useState } from "react";
import { Mail, Linkedin, Github, MessageCircle, Send, Copy, Check } from "lucide-react";
import { site } from "../data/site";
import Reveal from "./Reveal";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email.";
    if (!form.message.trim()) next.message = "Please describe what is currently manual.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} (${form.email})`
    );
    const subject = encodeURIComponent("Portfolio inquiry — automation / workflow");
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = site.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const social = [
    {
      label: "Email",
      href: `mailto:${site.email}`,
      icon: Mail,
      external: false,
      show: !!site.email,
    },
    {
      label: "LinkedIn",
      href: site.social.linkedin,
      icon: Linkedin,
      external: true,
      show: !!site.social.linkedin,
    },
    {
      label: "GitHub",
      href: site.social.github,
      icon: Github,
      external: true,
      show: !!site.social.github,
    },
    {
      label: "WhatsApp",
      href: site.social.whatsapp,
      icon: MessageCircle,
      external: true,
      show: !!site.social.whatsapp,
    },
  ].filter((l) => l.show);

  return (
    <section id="contact" className="section-pad bg-[var(--color-bg-elevated)]">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <Reveal>
            <div>
              <h2 className="font-[var(--font-display)] font-semibold tracking-tight text-[var(--color-text)] text-2xl sm:text-3xl md:text-[2.1rem]">
                Let's work together.
              </h2>
              <p className="mt-4 text-[var(--color-text-muted)] leading-relaxed max-w-md">
                Have an automation, workflow, or data project in mind? Tell me what's still manual in your business and I'll tell you if it's a good fit.
              </p>

              <p className="mt-8 text-sm text-[var(--color-text)] font-medium break-all">
                {site.email}
              </p>
              <button
                type="button"
                onClick={copyEmail}
                className="mt-3 inline-flex items-center gap-2 rounded-md border border-[var(--color-border)] px-3.5 py-2 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied!" : "Copy email"}
              </button>

              <div className="mt-8 flex items-center gap-3">
                {social.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    aria-label={link.label}
                    title={link.label}
                    className="grid place-items-center w-11 h-11 rounded-full border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
                  >
                    <link.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 md:p-8 space-y-5"
            >
              <div>
                <label htmlFor="name" className="block text-sm text-[var(--color-text-muted)] mb-2">
                  Name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] outline-none transition-colors"
                />
                {errors.name && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm text-[var(--color-text-muted)] mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] outline-none transition-colors"
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm text-[var(--color-text-muted)] mb-2">
                  What's currently manual?
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me a bit about the process you want automated..."
                  className="w-full rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-faint)] focus:border-[var(--color-accent)] outline-none transition-colors resize-none"
                />
                {errors.message && (
                  <p className="mt-1.5 text-xs text-red-400">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-[var(--color-accent)] px-6 py-3 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
              >
                <Send size={15} />
                Send message
              </button>

              {sent && (
                <p className="text-sm text-[var(--color-accent-2)] text-center">
                  Your email app should now be open with this message ready to send.
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
