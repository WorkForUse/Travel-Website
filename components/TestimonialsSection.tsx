"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Star, Quote, CheckCircle2, SlidersHorizontal, ChevronDown, Check } from "lucide-react";
import { MOCK_TESTIMONIALS } from "@/lib/mock-data";

export function TestimonialsSection() {
  const [filterService, setFilterService] = useState<string>("All");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const services = ["All", "Visa Services", "Flight Ticket Booking", "Hotel Booking", "Car Rental"];

  const filteredTestimonials = MOCK_TESTIMONIALS.filter((t) => {
    if (filterService === "All") return true;
    return t.serviceUsed === filterService || t.serviceUsed === "Complete Package";
  });

  // Auto Loop Logic
  useEffect(() => {
    if (isPaused || filteredTestimonials.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredTestimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused, filteredTestimonials.length]);

  return (
    <section id="testimonials" className="py-5 sm:py-10 lg:py-10 relative bg-[#FAF8F5] overflow-hidden border-t border-b border-[#E8E2D5]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Compact Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div className="w-full lg:w-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3 shadow-sm">
              <span>Private Client Gazette</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36]">
              Verified Words from <span className="italic font-normal text-[#C5A059]">Distinguished Voyagers</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6A7382] mt-2 max-w-xl leading-relaxed">
              From diplomatic missions to sovereign family offices, discover what our clients say about their bespoke journeys.
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
              <span className="text-[#0F1E36] font-semibold">{filterService}</span>
              <ChevronDown className={`size-3.5 text-[#6A7382] transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu Popup */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 lg:left-auto lg:right-0 mt-2 w-52 z-40 bg-[#FFFFFF] border border-[#E8E2D5] rounded-xl shadow-xl py-1.5 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#6A7382] uppercase tracking-wider border-b border-[#E8E2D5] mb-1">
                  Select Service
                </div>
                {services.map((srv) => (
                  <button
                    key={srv}
                    type="button"
                    onClick={() => {
                      setFilterService(srv);
                      setCurrentIndex(0);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      filterService === srv
                        ? "bg-[#0F1E36] text-[#FAF8F5]"
                        : "text-[#6A7382] hover:bg-[#F3EFE6] hover:text-[#0F1E36]"
                    }`}
                  >
                    <span>{srv}</span>
                    {filterService === srv && <Check className="size-3 text-[#E5C378]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Carousel Container (Expanded width max-w-6xl to minimize side gaps) */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Faded Smoke Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-10 bg-gradient-to-r from-[#FAF8F5] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-10 bg-gradient-to-l from-[#FAF8F5] to-transparent z-20 pointer-events-none" />

          {/* Testimonials Slider */}
          <div className="overflow-hidden px-1 sm:px-2 py-2">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {filteredTestimonials.map((t) => (
                <div
                  key={t.id}
                  className="w-full shrink-0 px-1"
                >
                  <div className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-8 sm:p-12 shadow-lg hover:shadow-2xl hover:border-[#C5A059]/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden text-left">
                    
                    <Quote className="absolute top-6 right-6 size-16 sm:size-20 text-[#C5A059]/10 -rotate-12 pointer-events-none" />

                    <div className="space-y-4 relative z-10">
                      {/* Rating & Service Badge */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1 text-[#C5A059]">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="size-4 fill-current" />
                          ))}
                        </div>

                        <span className="px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FAF8F5] text-[#9E7D3B] border border-[#C5A059]/30">
                          {t.serviceUsed}
                        </span>
                      </div>

                      {/* Review Content */}
                      <p className="font-serif text-base sm:text-lg lg:text-xl text-[#0F1E36] leading-relaxed italic pt-2 text-left">
                        &ldquo;{t.content}&rdquo;
                      </p>
                    </div>

                    {/* Author Footer */}
                    <div className="pt-6 mt-8 border-t border-[#E8E2D5] flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-center gap-3.5 text-left">
                        <div className="relative size-12 rounded-full overflow-hidden border-2 border-[#C5A059]/40 shrink-0 bg-muted shadow-sm">
                          <Image
                            src={t.avatar}
                            alt={t.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#0F1E36] flex items-center gap-1.5">
                            {t.name}
                            <CheckCircle2 className="size-4 text-[#1E7452] fill-[#1E7452] text-white shrink-0" />
                          </h4>
                          <p className="text-xs text-[#6A7382]">{t.role}</p>
                          <p className="text-[10px] text-[#9E7D3B] font-bold uppercase tracking-wider">{t.country}</p>
                        </div>
                      </div>

                      <span className="text-xs text-[#6A7382] font-mono sm:text-right shrink-0">
                        {t.date}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          {filteredTestimonials.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {filteredTestimonials.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx 
                      ? "w-8 bg-[#C5A059]" 
                      : "w-2 bg-[#E8E2D5] hover:bg-[#C5A059]/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}