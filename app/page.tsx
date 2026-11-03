import { Navbar } from "@/components/Navbar";
import { StatsCounter } from "@/components/StatsCounter";
import { ServicesSection } from "@/components/ServicesSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { PackagesSection } from "@/components/PackagesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import {Hero} from "@/components/Hero";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <StatsCounter />
        <ServicesSection />
        <DestinationsSection />
        <PackagesSection />
        <WhyChooseUs />
        <TestimonialsSection />
        <FaqSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
