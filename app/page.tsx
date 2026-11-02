import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { StatsCounter } from "@/components/StatsCounter";
import { ServicesSection } from "@/components/ServicesSection";
import { DestinationsSection } from "@/components/DestinationsSection";
import { PackagesSection } from "@/components/PackagesSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Fixed Luxury Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section with Integrated 4-in-1 Search Engine */}
        <Hero />

        {/* GSAP Animated Statistics & Trust Numbers */}
        <StatsCounter />

        {/* The Four Core Pillars: Visa, Flight, Hotel, Car */}
        <ServicesSection />

        {/* Coveted Global Destinations with Category Filters */}
        <DestinationsSection />

        {/* Complete Integrated Master Packages */}
        <PackagesSection />

        {/* Why Choose AuraVoyage */}
        <WhyChooseUs />

        {/* Customer Testimonials & Verified Reviews */}
        <TestimonialsSection />

        {/* Essential Intelligence & FAQs */}
        <FaqSection />

        {/* Bespoke Itinerary Planner & Consultation Form */}
        <ContactSection />
      </main>

      {/* Comprehensive Footer */}
      <Footer />
    </div>
  );
}
