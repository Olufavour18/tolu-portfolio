import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type SectionId = "about" | "experience" | "certifications";

interface ExpandContextValue {
  expanded: Record<SectionId, boolean>;
  setExpanded: (id: SectionId, value: boolean) => void;
  toggle: (id: SectionId) => void;
  open: (id: SectionId) => void;
}

const ExpandContext = createContext<ExpandContextValue | null>(null);

export function ExpandProvider({ children }: { children: ReactNode }) {
  const [expanded, setExpandedState] = useState<Record<SectionId, boolean>>({
    about: false,
    experience: false,
    certifications: false,
  });

  const setExpanded = useCallback((id: SectionId, value: boolean) => {
    setExpandedState((prev) => ({ ...prev, [id]: value }));
  }, []);

  const toggle = useCallback((id: SectionId) => {
    setExpandedState((prev) => ({ ...prev, [id]: !prev[id] }));
  }, []);

  const open = useCallback((id: SectionId) => {
    setExpandedState((prev) => ({ ...prev, [id]: true }));
  }, []);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent<SectionId>).detail;
      if (detail === "about" || detail === "experience" || detail === "certifications") {
        open(detail);
      }
    };
    window.addEventListener("portfolio:open-section", onOpen);
    return () => window.removeEventListener("portfolio:open-section", onOpen);
  }, [open]);

  const value = useMemo(
    () => ({ expanded, setExpanded, toggle, open }),
    [expanded, setExpanded, toggle, open]
  );

  return (
    <ExpandContext.Provider value={value}>{children}</ExpandContext.Provider>
  );
}

export function useExpand() {
  const ctx = useContext(ExpandContext);
  if (!ctx) throw new Error("useExpand must be used within ExpandProvider");
  return ctx;
}

export function openSection(id: SectionId) {
  window.dispatchEvent(
    new CustomEvent("portfolio:open-section", { detail: id })
  );
}
