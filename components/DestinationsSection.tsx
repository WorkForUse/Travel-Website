"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { 
  MapPin, Star, Calendar, ArrowRight, Check, X, Compass 
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MOCK_DESTINATIONS, DestinationItem } from "@/lib/mock-data";
import { BookingModal } from "@/components/BookingModal";

export function DestinationsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);
  const [bookingTarget, setBookingTarget] = useState<DestinationItem | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const categories = ["All", "Beaches", "Europe", "Alpine", "Middle East", "Asia"];

  const filteredDestinations = MOCK_DESTINATIONS.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="destinations" className="py-16 sm:py-24 bg-[#F5F1E8]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3 shadow-sm">
              <Compass className="size-3 text-[#C5A059]" />
              <span>Handcrafted Expeditions</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36]">
              Most Coveted <span className="italic font-normal text-[#C5A059]">Global Escapes</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6A7382] mt-2 max-w-xl">
              From the azure calderas of Greece to snow-dusted alpine chalets, immerse yourself in extraordinary journeys designed for discerning travelers.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-[#FFFFFF] p-1.5 rounded-2xl border border-[#E8E2D5] self-start md:self-auto shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-[#0F1E36] text-[#FAF8F5] shadow-sm"
                    : "text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="destination-card group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:border-[#C5A059]/50 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-muted">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  {dest.badge && (
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-[#E5C378] text-[#0F1E36] shadow-md">
                      {dest.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 ml-auto">
                    <Star className="size-3 fill-[#E5C378] text-[#E5C378]" />
                    <span>{dest.rating}</span>
                    <span className="text-white/60 text-[10px]">({dest.reviews})</span>
                  </div>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <div className="flex items-center gap-1.5 text-xs text-white/80 font-medium mb-1">
                    <MapPin className="size-3.5 text-[#E5C378]" />
                    <span className="truncate">{dest.country}</span>
                    <span>•</span>
                    <Calendar className="size-3.5 text-[#E5C378]" />
                    <span className="truncate">{dest.duration}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold leading-tight text-white group-hover:text-[#E5C378] transition-colors">
                    {dest.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <p className="text-xs sm:text-sm text-[#6A7382] line-clamp-2 leading-relaxed">
                  {dest.overview}
                </p>

                {/* Inclusions Preview */}
                <div className="space-y-1.5 pt-3 border-t border-[#E8E2D5]">
                  {dest.highlights.slice(0, 2).map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#141A22] font-medium">
                      <Check className="size-3 text-[#C5A059] shrink-0" />
                      <span className="truncate">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Price and Actions */}
                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#6A7382] block">Curated Package</span>
                    <p className="font-serif text-xl sm:text-2xl font-bold text-[#0F1E36]">
                      ${dest.priceFrom.toLocaleString()}{" "}
                      <span className="text-xs font-normal font-sans text-[#6A7382]">/ person</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedDestination(dest)}
                      className="px-3 py-2 rounded-xl text-xs font-bold border border-[#E8E2D5] hover:bg-[#F3EFE6] text-[#0F1E36] transition-colors cursor-pointer"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => setBookingTarget(dest)}
                      className="px-3.5 py-2 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1 cursor-pointer border border-[#C5A059]/30"
                    >
                      <span>Book</span>
                      <ArrowRight className="size-3 text-[#E5C378]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Itinerary Modal */}
      {selectedDestination && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl shadow-2xl p-6 sm:p-8 text-[#141A22]">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6] transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="relative h-56 sm:h-64 w-full rounded-2xl overflow-hidden mb-6">
              <Image
                src={selectedDestination.image}
                alt={selectedDestination.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <span className="text-[10px] font-bold text-[#E5C378] uppercase tracking-[0.2em]">{selectedDestination.country}</span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold">{selectedDestination.title}</h3>
                <p className="text-xs text-white/80 mt-1 flex items-center gap-3">
                  <span>{selectedDestination.duration}</span>
                  <span>•</span>
                  <span>Rated {selectedDestination.rating} ★</span>
                </p>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6A7382] mb-2">Editorial Overview</h4>
            <p className="text-xs sm:text-sm text-[#485363] leading-relaxed mb-6 font-normal">
              {selectedDestination.overview}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6A7382] mb-3">VIP Package Inclusions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
              {selectedDestination.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5] text-xs font-medium text-[#141A22]">
                  <Check className="size-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E8E2D5]">
              <div>
                <span className="text-xs text-[#6A7382]">All-Inclusive Rate</span>
                <p className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36]">
                  From ${selectedDestination.priceFrom.toLocaleString()}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-xs font-semibold hover:bg-[#F3EFE6] transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const dest = selectedDestination;
                    setSelectedDestination(null);
                    setBookingTarget(dest);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 border border-[#C5A059]/30 cursor-pointer"
                >
                  Reserve This Itinerary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Booking Modal */}
      {bookingTarget && (
        <BookingModal
          item={{ type: "destination", data: bookingTarget }}
          onClose={() => setBookingTarget(null)}
        />
      )}
    </section>
  );
}