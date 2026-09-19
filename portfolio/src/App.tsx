import { ThemeProvider } from "./hooks/useTheme";
import { ExpandProvider } from "./hooks/useExpand";
import { RouteProvider, useRoute } from "./hooks/useRoute";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import SkillsSection from "./components/SkillsSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import CertificationsSection from "./components/CertificationsSection";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ServicesPage from "./components/ServicesPage";

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <SkillsSection />
      <ExperienceTimeline />
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
      {path === "/services" ? <ServicesPage /> : <HomePage />}
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
