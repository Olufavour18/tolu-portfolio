import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Route = "/" | "/about" | "/experience" | "/services";

function normalizePath(pathname: string): Route {
  if (pathname === "/about" || pathname.startsWith("/about/")) return "/about";
  if (pathname === "/experience" || pathname.startsWith("/experience/")) return "/experience";
  if (pathname === "/services" || pathname.startsWith("/services/")) return "/about";
  return "/";
}

interface RouteContextValue {
  path: Route;
  navigate: (to: Route) => void;
}

const RouteContext = createContext<RouteContextValue | null>(null);

export function RouteProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState<Route>(() =>
    normalizePath(window.location.pathname)
  );

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = useCallback((to: Route) => {
    const target = to === "/services" ? "/about" : to;
    if (window.location.pathname !== target) {
      window.history.pushState({}, "", target);
    }
    setPath(normalizePath(target));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const value = useMemo(() => ({ path, navigate }), [path, navigate]);

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
}

export function useRoute() {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used within RouteProvider");
  return ctx;
}
