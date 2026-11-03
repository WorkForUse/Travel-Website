"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Minus } from "lucide-react";
import fagbg from "@/assets/faq-section-bg.png";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS_LIST: FAQItem[] = [
  {
    q: "How does AuraVoyage achieve a verified 99.4% visa approval rate?",
    a: "Our dedicated consular practice includes former embassy visa adjudicators and international immigration attorneys. Every application undergoes rigorous pre-vetting, mock consular interview simulations for US/UK visas, and official itinerary alignment. We also manage express diplomatic biometric appointment slots directly.",
  },
  {
    q: "Can I book First and Business class flights with zero-penalty flexibility?",
    a: "Yes. All commercial and private charter flights booked through our bespoke desk come with VIP flexibility, allowing no-penalty re-routing, 24/7 seat changes, and access to premium airline consortium lounges worldwide.",
  },
  {
    q: "What exclusive amenities do you unlock at 5-star partner palaces and resorts?",
    a: "Through our preferred partner affiliations with Virtuoso, Four Seasons Preferred, Aman, and Marriott STARS, our guests receive complimentary room upgrades upon arrival, daily gourmet breakfast for two, $100-$200 dining/spa credits, and guaranteed early check-in and 4 PM late check-out.",
  },
  {
    q: "What are the requirements for renting supercars and exotic vehicles?",
    a: "Drivers must be at least 21 years old and possess a valid driving license from their home country (plus an International Driving Permit if traveling outside of their residency territory). All vehicles feature zero-deductible insurance and can be delivered directly to your airport tarmac, superyacht marina, or private villa.",
  },
  {
    q: "Can AuraVoyage coordinate all four services into a single unified master itinerary?",
    a: "Absolutely. Over 75% of our clients choose an integrated package: we secure your visa clearance first, book your flights, reserve your luxury suites, and schedule an exotic car or chauffeur transfer waiting at your arrival gate.",
  },
  {
    q: "How does private jet tarmac ramp access work upon arrival and departure?",
    a: "For all private aviation charters and selected first-class commercial connections, your chauffeur drives directly onto the private FBO tarmac. Luggage is transferred by dedicated porters, and customs/security clearance is conducted in private executive lounges without TSA queues.",
  },
  {
    q: "What happens if a visa is delayed or denied due to unforeseen embassy policies?",
    a: "Every visa dossier filed through our consular desk includes our complimentary Zero-Refusal Insurance. In the rare event of a consular issue, our team immediately appeals or re-files with emergency fast-track appointments at no additional cost.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-5 sm:py-10 lg:py-10 relative overflow-hidden bg-[#FAF8F5]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-25 sm:opacity-35">
        <Image
          src={fagbg}
          alt="FAQ Background Map"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center filter brightness-[1.05]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Left Column: Heading & Subtitle */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#9E7D3B] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 shadow-sm">
              <span>Essential Intelligence</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36] leading-tight">
              Frequently Asked <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C5A059]">Questions</span>
            </h2>

            <p className="text-xs sm:text-sm text-[#6A7382] leading-relaxed max-w-md">
              Clear insights into our four bespoke disciplines: booking protocols, and essential guarantees.
            </p>
          </div>

          {/* Right Column: Accordions List (Plus/Minus only, Fully Responsive) */}
          <div className="lg:col-span-7 space-y-3.5 w-full">
            {FAQS_LIST.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-md border border-[#E8E2D5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#C5A059]/50 transition-all duration-300"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/50 transition-colors"
                  >
                    <span className="font-serif font-semibold text-xs sm:text-sm lg:text-base text-[#0F1E36] leading-snug">
                      {faq.q}
                    </span>
                    
                    {/* Plus / Minus Icon Only */}
                    <div className="text-[#C5A059] shrink-0 transition-transform duration-300">
                      {isOpen ? (
                        <Minus className="size-4 sm:size-5 stroke-[2.5]" />
                      ) : (
                        <Plus className="size-4 sm:size-5 stroke-[2.5]" />
                      )}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 text-xs sm:text-sm text-[#485363] leading-relaxed border-t border-[#E8E2D5]/60 pt-3.5 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}