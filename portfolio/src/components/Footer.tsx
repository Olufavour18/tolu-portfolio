import { Mail, Linkedin, Github, MessageCircle } from "lucide-react";
import { site } from "../data/site";

const iconLinks = [
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

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] py-8">
      <div className="container-page flex flex-col items-center gap-5">
        <div className="flex items-center justify-center gap-3">
          {iconLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noopener noreferrer" : undefined}
              aria-label={link.label}
              title={link.label}
              className="grid place-items-center w-10 h-10 rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
        <p className="text-sm text-[var(--color-text-faint)] text-center">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
