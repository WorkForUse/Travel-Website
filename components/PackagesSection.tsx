"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  ArrowRight, Star, MapPin, SlidersHorizontal, ChevronDown, Check
} from "lucide-react";
import { BookingModal } from "@/components/BookingModal";
import { DestinationItem } from "@/lib/mock-data";

export function PackagesSection() {
  const [selectedPackage, setSelectedPackage] = useState<DestinationItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
    <section id="packages" className="py-5 sm:py-10 lg:py-10 relative bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Compact Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3.5 shadow-sm">
              <span>All-Inclusive Master Itineraries</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36]">
              Curated Four-Pillar <span className="italic font-normal text-[#C5A059]">Master Packages</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6A7382] mt-2 max-w-xl leading-relaxed">
              Harmonizing Visa Expedited Clearance, First Class Flights, 5-Star Hotel Suites, and Exotic Fleets into unified, discounted luxury journeys.
            </p>
          </div>

          {/* Compact Filter Button */}
          <div className="relative inline-block self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E2D5] rounded-xl text-xs font-bold text-[#0F1E36] shadow-sm hover:border-[#C5A059]/50 transition-all cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="size-3.5 text-[#C5A059]" />
              <span className="text-[#6A7382] font-normal">Filter:</span>
              <span className="text-[#0F1E36] font-semibold">{activeCategory}</span>
              <ChevronDown className={`size-3.5 text-[#6A7382] transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu Popup */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 z-40 bg-[#FFFFFF] border border-[#E8E2D5] rounded-xl shadow-xl py-1.5 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#6A7382] uppercase tracking-wider border-b border-[#E8E2D5] mb-1">
                  Select Category
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setActiveCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      activeCategory === cat
                        ? "bg-[#0F1E36] text-[#FAF8F5]"
                        : "text-[#6A7382] hover:bg-[#F3EFE6] hover:text-[#0F1E36]"
                    }`}
                  >
                    <span>{cat}</span>
                    {activeCategory === cat && <Check className="size-3 text-[#E5C378]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 2x2 Grid for Desktop/Tablet, 1-col for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="package-card group bg-[#FFFFFF] border border-[#E8E2D5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#C5A059]/50 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-muted shrink-0">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/30 to-transparent" />

                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-[#E5C378] text-[#0F1E36] shadow-md truncate max-w-[60%]">
                    {pkg.badge}
                  </span>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 shrink-0">
                    <Star className="size-3 fill-[#E5C378] text-[#E5C378]" />
                    <span>{pkg.rating}</span>
                    <span className="text-white/60 text-[10px]">({pkg.reviews})</span>
                  </div>
                </div>

                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-white">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-[#D1D7E0] uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <MapPin className="size-3 text-[#E5C378] shrink-0" />
                    <span className="truncate">{pkg.country}</span> • <span className="truncate">{pkg.duration}</span>
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight text-white group-hover:text-[#E5C378] transition-colors line-clamp-1">
                    {pkg.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-[#485363] leading-relaxed line-clamp-2">
                  {pkg.overview}
                </p>

                {/* 4 Sovereign Pillars Matrix */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] space-y-2.5">
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9E7D3B] block">
                    All-Inclusive Four Pillars:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-[#141A22] font-medium">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                      <span className="truncate">{pkg.fourPillars.visa}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#141A22] font-medium">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                      <span className="truncate">{pkg.fourPillars.flight}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#141A22] font-medium">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                      <span className="truncate">{pkg.fourPillars.hotel}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#141A22] font-medium">
                      <span className="size-5 rounded-md bg-[#FFFFFF] border border-[#C5A059]/30 text-[#0F1E36] text-[10px] font-bold flex items-center justify-center shrink-0">4</span>
                      <span className="truncate">{pkg.fourPillars.car}</span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Booking CTA */}
                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between gap-3">
                  <div className="shrink-0">
                    <span className="text-[10px] sm:text-[11px] text-[#6A7382] block">All-Inclusive Master Rate</span>
                    <p className="font-serif text-base sm:text-2xl font-bold text-[#0F1E36]">
                      ${pkg.priceFrom.toLocaleString()}{" "}
                      <span className="text-[10px] sm:text-xs font-normal font-sans text-[#6A7382]">/ guest</span>
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedPackage(pkg)}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1.5 cursor-pointer border border-[#C5A059]/30 shrink-0"
                  >
                    <span>Reserve</span>
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