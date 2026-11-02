"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  Star, Quote, CheckCircle2, Crown
} from "lucide-react";
import { MOCK_TESTIMONIALS, TestimonialItem } from "@/lib/mock-data";

export function TestimonialsSection() {
  const [filterService, setFilterService] = useState<string>("All");

  const services = ["All", "Visa Services", "Flight Ticket Booking", "Hotel Booking", "Car Rental"];

  const filteredTestimonials = MOCK_TESTIMONIALS.filter((t) => {
    if (filterService === "All") return true;
    return t.serviceUsed === filterService || t.serviceUsed === "Complete Package";
  });

  return (
    <section id="testimonials" className="py-16 sm:py-24 relative bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3.5 shadow-sm">
              <Crown className="size-3 text-[#C5A059]" />
              <span>Private Client Gazette</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1E36]">
              Verified Words from <br className="hidden sm:inline" />
              <span className="italic font-normal text-[#C5A059]">Distinguished Voyagers</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#485363] mt-2 max-w-xl">
              From diplomatic missions to sovereign family offices, discover what our clients say about their bespoke journeys.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FFFFFF] p-1.5 rounded-2xl border border-[#E8E2D5] self-start md:self-auto shadow-sm">
            {services.map((srv) => (
              <button
                key={srv}
                type="button"
                onClick={() => setFilterService(srv)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  filterService === srv
                    ? "bg-[#0F1E36] text-[#FAF8F5] shadow-sm"
                    : "text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6]"
                }`}
              >
                {srv}
              </button>
            ))}
          </div>
        </div>

        {/* Testimonials Grid — 100% visible with NO opacity:0 locking */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredTestimonials.map((t) => (
            <div
              key={t.id}
              className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-7 sm:p-9 shadow-sm hover:shadow-2xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <Quote className="absolute top-6 right-6 size-16 text-[#C5A059]/10 -rotate-12 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating & Service tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="size-4 fill-current" />
                    ))}
                  </div>

                  <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#FAF8F5] text-[#9E7D3B] border border-[#C5A059]/30">
                    {t.serviceUsed}
                  </span>
                </div>

                {/* Content */}
                <p className="font-serif text-base sm:text-lg text-[#141A22] leading-relaxed italic">
                  &ldquo;{t.content}&rdquo;
                </p>
              </div>

              {/* Author footer */}
              <div className="pt-6 mt-6 border-t border-[#E8E2D5] flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="relative size-12 rounded-full overflow-hidden border-2 border-[#C5A059]/40 shrink-0 bg-muted">
                    <Image
                      src={t.avatar}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-base text-[#0F1E36] flex items-center gap-1.5">
                      {t.name}
                      <CheckCircle2 className="size-3.5 text-[#1E7452] fill-[#1E7452] text-white" />
                    </h4>
                    <p className="text-xs text-[#6A7382]">{t.role}</p>
                    <p className="text-[11px] text-[#9E7D3B] font-semibold uppercase tracking-wider">{t.country}</p>
                  </div>
                </div>

                <span className="text-[11px] text-[#6A7382] font-mono hidden sm:inline">
                  {t.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
