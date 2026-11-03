"use client";

import React from "react";
import Image from "next/image";
import { 
  Check, ArrowRight, ShieldCheck
} from "lucide-react";

interface ServiceCard {
  id: "visas" | "flights" | "hotels" | "cars";
  title: string;
  subtitle: string;
  badge: string;
  stats: string;
  description: string;
  image: string;
  perks: string[];
  ctaLabel: string;
}

const SERVICES_DATA: ServiceCard[] = [
  {
    id: "visas",
    title: "Diplomatic Visa Facilitation",
    subtitle: "Expedited Schengen, US & UK Consular Protocols",
    badge: "99.4% Pass Rate",
    stats: "24-48h Fast-Track",
    description: "Our in-house consular legal team reviews every dossier to eliminate rejection risk, booking emergency appointment slots and guaranteeing flawless passage across 40+ countries.",
    image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1200&q=80",
    perks: [
      "Guaranteed consular appointment slots reserved in advance",
      "Official legal dossier vetting & cover letter drafting",
      "1-on-1 mock consular interview preparation coaching",
      "Zero-refusal fee insurance included on every application"
    ],
    ctaLabel: "Explore Visa Desks"
  },
  {
    id: "flights",
    title: "Private Aviation & First Class Suites",
    subtitle: "Consortium Charters & Lie-Flat Sovereign Cabins",
    badge: "Consortium Access",
    stats: "12 Global Flagships",
    description: "Fly in absolute privacy aboard Bombardier Global 7500 jets or experience lie-flat first-class suites on Emirates, Singapore Airlines, and Air France with tarmac chauffeur transfers.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
    perks: [
      "Direct tarmac ramp access with dedicated VIP security escorts",
      "Private jet charters with customized Michelin-star dining",
      "Unpublished consortium contract rates (up to 30% savings)",
      "24/7 dedicated flight director for zero-penalty schedule changes"
    ],
    ctaLabel: "Search Flight Routes"
  },
  {
    id: "hotels",
    title: "Five-Star Palaces & Sanctuaries",
    subtitle: "Virtuoso & Four Seasons Preferred Privileges",
    badge: "VIP Elite Perks",
    stats: "3,200+ Palaces",
    description: "Unlock unlisted suites and overwater pavilions at Aman, St. Regis, Belmond, and Ritz-Carlton. Enjoy automatic room upgrades, $200 resort credits, and 24-hour private butler service.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    perks: [
      "Complimentary room upgrade upon arrival (subject to availability)",
      "Daily gourmet champagne breakfast for two included",
      "$100–$200 hotel credits for spa treatments and fine dining",
      "Guaranteed early check-in at 10 AM & late check-out until 4 PM"
    ],
    ctaLabel: "Discover Sanctuaries"
  },
  {
    id: "cars",
    title: "Exotic Supercars & Executive Fleet",
    subtitle: "Zero-Deductible Curbside Delivery to Tarmac or Yacht",
    badge: "Zero Deductible",
    stats: "Prestige Garage",
    description: "Command pristine Ferrari 296 GTB, Porsche 911 Cabriolet, Range Rover SV, and Mercedes-Maybach vehicles delivered directly to your airport gate, private villa, or superyacht marina.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    perks: [
      "Curbside delivery directly to airport tarmac or villa doorstep",
      "Comprehensive zero-deductible bank-grade insurance coverage",
      "Uniformed multilingual executive chauffeur service on demand",
      "Unlimited mileage packages & 24/7 prestige roadside support"
    ],
    ctaLabel: "Browse Exotic Fleet"
  }
];

export function ServicesSection() {
  const handleTabJump = (_serviceId: string) => {
    const el = document.getElementById("search-engine");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="services" className="py-5 sm:py-10 lg:py-10 bg-[#FAF8F5] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3 shadow-sm">
            <span>The Four Sovereign Disciplines</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36]">
            Architected for <span className="italic font-normal text-[#C5A059]">Quiet Perfection</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#6A7382] mt-2.5 sm:mt-3 leading-relaxed max-w-2xl mx-auto">
            From expedited consular visas to private tarmac jet boarding, our four pillars ensure flawless continuity for every mile of your journey.
          </p>
        </div>

        {/* 2x2 Grid for Desktop & Tablet, 1-col for Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              className="service-pillar-card group bg-[#FFFFFF] border border-[#E8E2D5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C5A059]/60 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Responsive Image Banner */}
              <div className="relative aspect-[16/9] sm:h-72 w-full overflow-hidden bg-muted">
                <Image
                  src={srv.image}
                  alt={srv.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.88]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1E36] via-[#0F1E36]/40 to-transparent" />

                {/* Badges Overlay */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#E5C378] text-[#0F1E36] shadow-md">
                    {srv.badge}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20">
                    {srv.stats}
                  </span>
                </div>

                {/* Overlay Text */}
                <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-5 sm:right-5 text-white">
                  <span className="text-[9px] sm:text-[10px] font-bold text-[#E5C378] tracking-[0.2em] uppercase block">
                    Pillar 0{idx + 1}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mt-0.5 text-white">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#D1D7E0] mt-0.5 sm:mt-1 font-medium line-clamp-1">
                    {srv.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Content Area */}
              <div className="p-5 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                <p className="text-xs sm:text-sm text-[#485363] leading-relaxed">
                  {srv.description}
                </p>

                {/* Signature Perks Container */}
                <div className="space-y-2 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5]">
                  <div className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9E7D3B] mb-1">
                    Signature Inclusions:
                  </div>
                  {srv.perks.map((perk, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-[#141A22] font-medium">
                      <div className="size-4 rounded-full bg-[#FFFFFF] border border-[#C5A059]/40 text-[#C5A059] flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="size-2.5 stroke-[3]" />
                      </div>
                      <span className="leading-snug">{perk}</span>
                    </div>
                  ))}
                </div>

                {/* Card Action Footer */}
                <div className="pt-4 border-t border-[#E8E2D5] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:flex-col md:items-stretch xl:flex-row xl:items-center">
                  <div className="flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold text-[#1E7452]">
                    <ShieldCheck className="size-4 shrink-0" />
                    <span>Verified Guarantee</span>
                  </div>

                  <button
                    onClick={() => handleTabJump(srv.id)}
                    className="w-full sm:w-auto md:w-full xl:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 cursor-pointer border border-[#C5A059]/30 group/btn"
                  >
                    <span>{srv.ctaLabel}</span>
                    <ArrowRight className="size-3.5 text-[#E5C378] group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}