import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] py-8">
      <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--color-text-faint)]">
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
        <p>Built with React, TypeScript & Tailwind CSS.</p>
      </div>
    </footer>
  );
}
