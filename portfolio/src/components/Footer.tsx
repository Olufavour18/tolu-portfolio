import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border-soft)] py-8">
      <div className="container-page flex items-center justify-center">
        <p className="text-sm text-[var(--color-text-faint)] text-center">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
