"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Star, 
  Sparkles, Calendar, MapPin, Eye, Crown
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import { DestinationItem } from "@/lib/mock-data";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function PackagesSection() {
  const [selectedPackage, setSelectedPackage] = useState<DestinationItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);

  const packages: (DestinationItem & {
    fourPillars: { visa: string; flight: string; hotel: string; car: string };
  })[] = [
    {
      id: "pkg-1",
      title: "French Riviera & Monaco Grand Prix VIP",
      country: "France & Monaco",
      category: "Europe" as const,
      priceFrom: 6850,
      duration: "6 Days / 5 Nights",
      rating: 4.98,
      reviews: 142,
      image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80",
      badge: "Private Jet & Yacht",
      overview: "Experience the epitome of European glamour: private helicopter transfer from Nice, Hotel Du Cap-Eden-Roc sea view pavilion, Ferrari 296 GTB rental, and VIP harbor yacht mooring in Monaco.",
      fourPillars: {
        visa: "Schengen 48h VIP Fast-Track",
        flight: "Air France La Première First Suites",
        hotel: "Hotel Du Cap-Eden-Roc 5-Star Pavilion",
        car: "Ferrari 296 GTB Hybrid Supercar",
      },
      highlights: [
        "Schengen Express Visa Facilitation (48h)",
        "Air France La Première First Class Suites",
        "Hotel Du Cap-Eden-Roc 5-Star Suite",
        "Ferrari 296 GTB Hybrid Supercar Rental",
        "Private VIP Monaco Yacht Access",
      ],
    },
    {
      id: "pkg-2",
      title: "Dubai & Abu Dhabi Royal Sovereign Retreat",
      country: "United Arab Emirates",
      category: "Middle East" as const,
      priceFrom: 5400,
      duration: "7 Days / 6 Nights",
      rating: 4.96,
      reviews: 210,
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80",
      badge: "Ultra-Luxury Flagship",
      overview: "Experience the glittering jewel of the Arabian Gulf. Includes instant 60-day VIP multiple entry visa, Emirates Business Class, Burj Al Arab two-bedroom ocean suite, and Mercedes-Maybach S 680 chauffeur.",
      fourPillars: {
        visa: "Instant UAE Digital e-Visa (12h)",
        flight: "Emirates A380 Business Return",
        hotel: "Burj Al Arab Duplex Ocean Suite",
        car: "Mercedes-Maybach S 680 Chauffeur",
      },
      highlights: [
        "UAE Instant Digital Visa Processing",
        "Emirates A380 Business Class Return",
        "Burj Al Arab Duplex Ocean Suite with Butler",
        "Mercedes-Maybach S 680 Dedicated Chauffeur",
        "Private Falconry & Desert Dune Sanctuary",
      ],
    },
    {
      id: "pkg-3",
      title: "Swiss Alpine Glacier & St. Moritz Chalet",
      country: "Switzerland",
      category: "Alpine" as const,
      priceFrom: 7200,
      duration: "8 Days / 7 Nights",
      rating: 4.99,
      reviews: 95,
      image: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1200&q=80",
      badge: "Alpine Peak Elegance",
      overview: "The pinnacle of winter and alpine luxury. Swiss International Business Class, Badrutt's Palace Suite in St. Moritz, Range Rover Autobiography SV, and private Matterhorn helicopter glacier tour.",
      fourPillars: {
        visa: "Swiss Visa Fast-Track Pre-Clearance",
        flight: "Swiss International Business Class",
        hotel: "Badrutt's Palace Alpine Panoramic Suite",
        car: "Range Rover Autobiography SV (Ski Rack)",
      },
      highlights: [
        "Swiss Visa Fast-Track Pre-Clearance",
        "Swiss International Business Class",
        "Badrutt's Palace Alpine Panoramic Suite",
        "Range Rover Autobiography SV (Heated Ski Rack)",
        "Private Heli-Skiing & Thermal Spa Passes",
      ],
    },
    {
      id: "pkg-4",
      title: "Kyoto & Tokyo Zen Imperial Odyssey",
      country: "Japan",
      category: "Asia" as const,
      priceFrom: 6450,
      duration: "9 Days / 8 Nights",
      rating: 4.98,
      reviews: 168,
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80",
      badge: "Cultural Masterpiece",
      overview: "Immerse in Japanese imperial heritage: Japan Airlines First Class Suites, Aman Tokyo premier suite, traditional Kyoto Ryokan with private hot-spring onsen, and Aston Martin DB12 delivery.",
      fourPillars: {
        visa: "Japan Multi-Entry Consular Expedited",
        flight: "JAL A350-1000 First Class Suites",
        hotel: "Aman Tokyo & Private Ryokan Onsen",
        car: "Aston Martin DB12 Super Tourer",
      },
      highlights: [
        "Japan Multi-Entry Visa Pre-Clearance",
        "Japan Airlines First Class A350-1000 Suites",
        "Aman Tokyo & Kyoto Traditional Onsen Ryokan",
        "First Class Shinkansen Gran Class Tickets",
        "Private Tea Master & Michelin Omakase Table",
      ],
    },
  ];

  const categories = ["All", "Europe", "Middle East", "Alpine", "Asia"];

  const filteredPackages = packages.filter((pkg) => {
    if (activeCategory === "All") return true;
    return pkg.category === activeCategory;
  });

  return (
    <section id="packages" className="py-16 sm:py-24 relative bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3.5 shadow-sm">
              <Crown className="size-3 text-[#C5A059]" />
              <span>All-Inclusive Master Itineraries</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1E36]">
              Curated Four-Pillar <span className="italic font-normal text-[#C5A059]">Master Packages</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6A7382] mt-2 max-w-xl">
              Harmonizing Visa Expedited Clearance, First Class Flights, 5-Star Hotel Suites, and Exotic Fleets into unified, discounted luxury journeys.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FFFFFF] p-1.5 rounded-2xl border border-[#E8E2D5] self-start md:self-auto shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0F1E36] text-[#FAF8F5] shadow-sm"
                    : "text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 2x2 Grid for Balanced Editorial View */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="package-card group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-[#C5A059]/50 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-muted">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/30 to-transparent" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#E5C378] text-[#0F1E36] shadow-md">
                    {pkg.badge}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                    <Star className="size-3 fill-[#E5C378] text-[#E5C378]" />
                    <span>{pkg.rating}</span>
                    <span className="text-white/60 text-[10px]">({pkg.reviews})</span>
                  </div>
                </div>

                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[11px] font-semibold text-[#D1D7E0] uppercase tracking-wider flex items-center gap-1.5 mb-0.5">
                    <MapPin className="size-3 text-[#E5C378]" />
                    {pkg.country} • {pkg.duration}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white group-hover:text-[#E5C378] transition-colors">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-[#485363] leading-relaxed">
                  {pkg.overview}
                </p>

                {/* 4 Sovereign Pillars Matrix */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9E7D3B] block">
                    All-Inclusive Four Pillars:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#141A22] font-medium truncate">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                      <span className="truncate">{pkg.fourPillars.visa}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#141A22] font-medium truncate">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                      <span className="truncate">{pkg.fourPillars.flight}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#141A22] font-medium truncate">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                      <span className="truncate">{pkg.fourPillars.hotel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#141A22] font-medium truncate">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                      <span className="truncate">{pkg.fourPillars.car}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking CTA */}
                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#6A7382] block">All-Inclusive Master Rate</span>
                    <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36]">
                      ${pkg.priceFrom.toLocaleString()}{" "}
                      <span className="text-xs font-normal font-sans text-[#6A7382]">/ guest</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className="px-5 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1.5 cursor-pointer border border-[#C5A059]/30"
                  >
                    <span>Reserve Package</span>
                    <ArrowRight className="size-3.5 text-[#E5C378]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedPackage && (
        <BookingModal
          item={{ type: "destination", data: selectedPackage }}
          onClose={() => setSelectedPackage(null)}
        />
      )}
    </section>
  );
}
