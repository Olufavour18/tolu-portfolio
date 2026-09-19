import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { site } from "../data/site";
import { useTheme } from "../hooks/useTheme";
import { useRoute } from "../hooks/useRoute";
import { openSection } from "../hooks/useExpand";

type NavLink =
  | { label: string; kind: "route"; to: "/" | "/services" }
  | { label: string; kind: "hash"; hash: string; section?: "about" | "experience" | "certifications" };

const homeLinks: NavLink[] = [
  { label: "Home", kind: "hash", hash: "#home" },
  { label: "About", kind: "hash", hash: "#about", section: "about" },
  { label: "Services", kind: "route", to: "/services" },
  { label: "Skills", kind: "hash", hash: "#skills" },
  { label: "Experience", kind: "hash", hash: "#experience", section: "experience" },
  { label: "Certifications", kind: "hash", hash: "#certifications", section: "certifications" },
  { label: "Contact", kind: "hash", hash: "#contact" },
];

const servicesLinks: NavLink[] = [
  { label: "Home", kind: "route", to: "/" },
  { label: "Services", kind: "hash", hash: "#services" },
  { label: "Projects", kind: "hash", hash: "#projects" },
  { label: "Contact", kind: "route", to: "/" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { path, navigate } = useRoute();

  const links = path === "/services" ? servicesLinks : homeLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

  const handleLink = (link: NavLink) => {
    setOpen(false);
    if (link.kind === "route") {
      navigate(link.to);
      if (link.label === "Contact" && link.to === "/") {
        setTimeout(() => {
          document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
      return;
    }

    if (path !== "/") {
      navigate("/");
      setTimeout(() => {
        if (link.section) openSection(link.section);
        const el = document.querySelector(link.hash);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 80);
      return;
    }

    if (link.section) openSection(link.section);
    const el = document.querySelector(link.hash);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    setOpen(false);
    navigate("/");
  };

  const goContact = () => {
    setOpen(false);
    if (path !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      }, 50);
    } else {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/85 backdrop-blur-md border-b border-[var(--color-border-soft)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="container-page flex items-center justify-between h-16 md:h-[4.5rem]">
        <button
          type="button"
          onClick={goHome}
          className="flex items-center gap-2.5 font-[var(--font-display)] text-[15px] font-semibold tracking-tight text-[var(--color-text)]"
        >
          <span className="grid place-items-center w-8 h-8 rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-accent)] text-xs">
            {initials}
          </span>
          <span className="hidden sm:inline">{site.name}</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.label}
              type="button"
              onClick={() => handleLink(link)}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
            className="grid place-items-center w-9 h-9 rounded-md border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors"
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            type="button"
            onClick={goContact}
            className="hidden md:inline-flex items-center rounded-md bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            Let's talk
          </button>

          <button
            type="button"
            className="md:hidden grid place-items-center w-9 h-9 rounded-md border border-[var(--color-border)] text-[var(--color-text)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[var(--color-bg)] border-b border-[var(--color-border-soft)]"
          >
            <div className="container-page py-4 flex flex-col gap-1">
              {links.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={() => handleLink(link)}
                  className="py-3 text-left text-[15px] text-[var(--color-text-muted)] hover:text-[var(--color-text)] border-b border-[var(--color-border-soft)] last:border-none"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
