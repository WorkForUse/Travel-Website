"use client";

import React, { useState } from "react";
import { 
  ChevronDown, Info, Sparkles, Headphones, ShieldCheck, 
  ArrowRight, FileCheck, Plane, Hotel, Car
} from "lucide-react";

interface FAQItem {
  category: "all" | "visa" | "flights" | "hotels" | "cars";
  q: string;
  a: string;
}

const FAQS_LIST: FAQItem[] = [
  {
    category: "visa",
    q: "How does AuraVoyage achieve a verified 99.4% visa approval rate?",
    a: "Our dedicated consular practice includes former embassy visa adjudicators and international immigration attorneys. Every application undergoes rigorous pre-vetting, mock consular interview simulations for US/UK visas, and official itinerary alignment. We also manage express diplomatic biometric appointment slots directly.",
  },
  {
    category: "flights",
    q: "Can I book First and Business class flights with zero-penalty flexibility?",
    a: "Yes. All commercial and private charter flights booked through our bespoke desk come with VIP flexibility, allowing no-penalty re-routing, 24/7 seat changes, and access to premium airline consortium lounges worldwide.",
  },
  {
    category: "hotels",
    q: "What exclusive amenities do you unlock at 5-star partner palaces and resorts?",
    a: "Through our preferred partner affiliations with Virtuoso, Four Seasons Preferred, Aman, and Marriott STARS, our guests receive complimentary room upgrades upon arrival, daily gourmet breakfast for two, $100-$200 dining/spa credits, and guaranteed early check-in and 4 PM late check-out.",
  },
  {
    category: "cars",
    q: "What are the requirements for renting supercars and exotic vehicles?",
    a: "Drivers must be at least 21 years old and possess a valid driving license from their home country (plus an International Driving Permit if traveling outside of their residency territory). All vehicles feature zero-deductible insurance and can be delivered directly to your airport tarmac, superyacht marina, or private villa.",
  },
  {
    category: "all",
    q: "Can AuraVoyage coordinate all four services into a single unified master itinerary?",
    a: "Absolutely. Over 75% of our clients choose an integrated package: we secure your visa clearance first, book your flights, reserve your luxury suites, and schedule an exotic car or chauffeur transfer waiting at your arrival gate.",
  },
  {
    category: "flights",
    q: "How does private jet tarmac ramp access work upon arrival and departure?",
    a: "For all private aviation charters and selected first-class commercial connections, your chauffeur drives directly onto the private FBO tarmac. Luggage is transferred by dedicated porters, and customs/security clearance is conducted in private executive lounges without TSA queues.",
  },
  {
    category: "visa",
    q: "What happens if a visa is delayed or denied due to unforeseen embassy policies?",
    a: "Every visa dossier filed through our consular desk includes our complimentary Zero-Refusal Insurance. In the rare event of a consular issue, our team immediately appeals or re-files with emergency fast-track appointments at no additional cost.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const filteredFaqs = FAQS_LIST.filter((faq) => {
    if (selectedFilter === "all") return true;
    return faq.category === selectedFilter || faq.category === "all";
  });

  const categories = [
    { id: "all", label: "All Inquiries" },
    { id: "visa", label: "Visa Concierge" },
    { id: "flights", label: "Flights & Jets" },
    { id: "hotels", label: "5★ Palaces" },
    { id: "cars", label: "Exotic Fleet" },
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 relative bg-[#F5F1E8]/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3.5 shadow-sm">
            <Info className="size-3 text-[#C5A059]" />
            <span>Essential Intelligence</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1E36]">
            Frequently Asked <span className="italic font-normal text-[#C5A059]">Questions</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#6A7382] mt-3">
            Clear insights into our four bespoke disciplines, booking protocols, and consular guarantees.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                setSelectedFilter(cat.id);
                setOpenIndex(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedFilter === cat.id
                  ? "bg-[#0F1E36] text-[#FAF8F5] shadow-md shadow-[#0F1E36]/15"
                  : "bg-[#FFFFFF] text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#FAF8F5] border border-[#E8E2D5]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:border-[#C5A059]/40 transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5]/60 transition-colors"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#0F1E36]">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`size-5 text-[#6A7382] shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#C5A059]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-[#485363] leading-relaxed border-t border-[#E8E2D5] pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Private Concierge Card */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-[#0F1E36] text-white border border-[#C5A059]/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="size-12 rounded-2xl bg-[#FFFFFF]/10 border border-[#C5A059]/30 flex items-center justify-center shrink-0">
              <Headphones className="size-6 text-[#E5C378]" />
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg text-white">
                Have a bespoke diplomatic inquiry?
              </h4>
              <p className="text-xs text-[#B2BAC8] mt-0.5">
                Our 24/7 Mayfair & Dubai concierge desks are on standby.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="px-6 py-2.5 rounded-xl bg-[#C5A059] text-[#0F1E36] font-bold text-xs tracking-wider uppercase hover:bg-[#D5B069] transition-all shadow-md flex items-center gap-2 whitespace-nowrap cursor-pointer shrink-0"
          >
            <span>Speak With Director</span>
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
