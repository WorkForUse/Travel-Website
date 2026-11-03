"use client";

import React from "react";
import { 
  ShieldCheck, Award, HeartHandshake, Headphones, Leaf,
  ChevronRight, CheckCircle2, Building2
} from "lucide-react";

export function WhyChooseUs() {
  const features = [
    {
      icon: Award,
      title: "99.4% Visa Approval Guarantee",
      description: "Our in-house consular legal team reviews every DS-160, Schengen, and UK dossier before submission, practically eliminating rejection risk with expedited embassy slots.",
      badge: "Diplomatic Legal Vetting",
      highlight: "24-48h Emergency Slots",
      bulletPoints: ["Pre-vetted consular dossiers", "Fast-track biometric slots", "Mock interview simulations"],
    },
    {
      icon: Building2,
      title: "Virtuoso & 5★ Preferred Privileges",
      description: "Direct consortium alliances with Four Seasons, Aman, St. Regis, and Belmond unlock complimentary suite upgrades, daily champagne breakfast, and $200 resort credits.",
      badge: "Virtuoso Privileges",
      highlight: "$200 Hotel Credit Included",
      bulletPoints: ["Guaranteed room upgrades", "Complimentary spa credits", "Early check-in & late check-out"],
    },
    {
      icon: ShieldCheck,
      title: "100% IATA & ATOL Trust Bonded",
      description: "Every dollar deposited is securely ring-fenced under segregated international travel escrow accounts, providing complete statutory financial protection for your capital.",
      badge: "Bank-Grade Escrow",
      highlight: "Fully Insured Deposits",
      bulletPoints: ["Ring-fenced escrow client funds", "Official IATA/ATOL protection", "Zero financial counterparty risk"],
    },
    {
      icon: Headphones,
      title: "24/7 Dedicated Travel Director",
      description: "No automated phone trees or bots. You are assigned a named, senior concierge who coordinates flight re-routings, private dining tables, and diplomatic protocol anytime.",
      badge: "Personal Human Touch",
      highlight: "Under 60-Sec Response",
      bulletPoints: ["Named senior travel director", "Zero chatbots or call queues", "Real-time itinerary adjustments"],
    },
    {
      icon: HeartHandshake,
      title: "Zero Excess Exotic Fleet",
      description: "Drive Ferrari, Porsche, and Maybach vehicles with all-inclusive zero-deductible insurance and seamless tarmac hangar or superyacht curbside drop-off.",
      badge: "Total Independence",
      highlight: "No Security Deposit Holds",
      bulletPoints: ["Tarmac & yacht curbside drop-off", "100% comprehensive zero excess", "Full tank & spotless delivery"],
    },
    {
      icon: Leaf,
      title: "Certified Carbon-Neutral Expeditions",
      description: "We automatically compute and offset 100% of flight and yacht emissions through certified Gold Standard reforestation and marine kelp restoration projects worldwide.",
      badge: "Eco-Conscious Luxury",
      highlight: "Gold Standard Certified",
      bulletPoints: ["100% flight emission offsets", "Certified reforestation projects", "Eco-friendly ground fleet options"],
    },
  ];

  return (
    <section id="why-us" className="py-5 sm:py-10 bg-[#F5F1E8]/60 relative border-t border-b border-[#E8E2D5]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3.5 shadow-sm">
            <span>The AuraVoyage Distinction</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1E36]">
            Why Discerning Voyagers <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#C5A059]">Entrust Us With Their World</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#485363] mt-3 leading-relaxed max-w-2xl mx-auto">
            We operate at the intersection of ultra-luxury hospitality and consular precision, delivering effortless global mobility for private clients, sovereign delegations, and family offices.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-2xl hover:border-[#C5A059]/60 transition-all duration-300 flex flex-col justify-between"
              >
                {/* Top Content Area */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="size-12 rounded-2xl bg-[#F3EFE6] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0F1E36] group-hover:text-[#E5C378] transition-all duration-300 shadow-sm shrink-0">
                      <Icon className="size-5.5" />
                    </div>

                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] bg-[#FAF8F5] text-[#9E7D3B] border border-[#E8E2D5] truncate max-w-[55%]">
                      {feature.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#0F1E36] mb-2.5 group-hover:text-[#C5A059] transition-colors line-clamp-1">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#485363] leading-relaxed mb-5 line-clamp-3">
                    {feature.description}
                  </p>

                  <div className="space-y-2 pt-4 border-t border-[#E8E2D5]/70 mb-4">
                    {feature.bulletPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-center gap-2 text-xs text-[#141A22] font-medium">
                        <CheckCircle2 className="size-3.5 text-[#C5A059] shrink-0" />
                        <span className="truncate">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 mt-auto border-t border-[#E8E2D5] flex items-center justify-between text-xs gap-2">
                  <span className="text-[#1E7452] font-bold truncate">
                    {feature.highlight}
                  </span>

                  <a
                    href="#contact"
                    className="font-bold text-[#0F1E36] hover:text-[#C5A059] flex items-center gap-1 tracking-wider uppercase transition-colors shrink-0"
                  >
                    <span>Consult Desk</span>
                    <ChevronRight className="size-3.5 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}