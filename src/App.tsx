import { BookingProvider } from "./context/BookingContext";
import { AboutSection } from "./components/AboutSection";
import { AddOnsSection } from "./components/AddOnsSection";
import { BookingModal } from "./components/booking/BookingModal";
import { ContactSection } from "./components/ContactSection";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ExperienceSection } from "./components/ExperienceSection";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { InstagramGallery } from "./components/InstagramGallery";
import { Navbar } from "./components/Navbar";
import { PackagesSection } from "./components/PackagesSection";
import { PortfolioGallery } from "./components/PortfolioGallery";
import { Seo } from "./components/Seo";
import { TestimonialsSection } from "./components/TestimonialsSection";

export default function App() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <Seo />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main">
          <HeroSection />
          <AboutSection />
          <PortfolioGallery />
          <PackagesSection />
          <AddOnsSection />
          <ExperienceSection />
          <TestimonialsSection />
          <InstagramGallery />
          <ContactSection />
        </main>
        <Footer />
        <BookingModal />
      </BookingProvider>
    </ErrorBoundary>
  );
}
