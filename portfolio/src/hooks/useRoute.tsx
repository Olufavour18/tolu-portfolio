import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Route = "/" | "/services";

function normalizePath(pathname: string): Route {
  if (pathname === "/services" || pathname.startsWith("/services/")) {
    return "/services";
  }
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
    if (window.location.pathname !== to) {
      window.history.pushState({}, "", to);
    }
    setPath(to);
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
