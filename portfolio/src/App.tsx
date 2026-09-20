import { ThemeProvider } from "./hooks/useTheme";
import { ExpandProvider } from "./hooks/useExpand";
import { RouteProvider, useRoute } from "./hooks/useRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import HomeAboutIntro from "./components/HomeAboutIntro";
import ExperiencePreview from "./components/ExperiencePreview";
import ExperiencePage from "./components/ExperiencePage";
import CertificationsSection from "./components/CertificationsSection";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import AboutServicesPage from "./components/AboutServicesPage";

function HomePage() {
  return (
    <main>
      <Hero />
      <HomeAboutIntro />
      <ExperiencePreview />
      <CertificationsSection />
      <Testimonials />
      <ContactSection />
    </main>
  );
}

function AppRoutes() {
  const { path } = useRoute();

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <Navbar />
      {path === "/about" && <AboutServicesPage />}
      {path === "/experience" && <ExperiencePage />}
      {path === "/" && <HomePage />}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RouteProvider>
        <ExpandProvider>
          <AppRoutes />
        </ExpandProvider>
      </RouteProvider>
    </ThemeProvider>
  );
}
