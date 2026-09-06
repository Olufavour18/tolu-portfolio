import { ThemeProvider } from "./hooks/useTheme";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import ProjectsSection from "./components/ProjectsSection";
import AutomationShowcase from "./components/AutomationShowcase";
import DataAnalyticsShowcase from "./components/DataAnalyticsShowcase";
import SkillsSection from "./components/SkillsSection";
import ExperienceTimeline from "./components/ExperienceTimeline";
import CertificationsSection from "./components/CertificationsSection";
import Testimonials from "./components/Testimonials";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Services />
          <ProjectsSection />
          <AutomationShowcase />
          <DataAnalyticsShowcase />
          <SkillsSection />
          <ExperienceTimeline />
          <CertificationsSection />
          <Testimonials />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
