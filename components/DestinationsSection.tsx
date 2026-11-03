"use client";

import React, { useState } from "react";
import Image from "next/image";
import { 
  MapPin, Star, Calendar, ArrowRight, Check, X, SlidersHorizontal, ChevronDown 
} from "lucide-react";
import { MOCK_DESTINATIONS, DestinationItem } from "@/lib/mock-data";
import { BookingModal } from "@/components/BookingModal";

export function DestinationsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDestination, setSelectedDestination] = useState<DestinationItem | null>(null);
  const [bookingTarget, setBookingTarget] = useState<DestinationItem | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ["All", "Beaches", "Europe", "Alpine", "Middle East", "Asia"];

  const filteredDestinations = MOCK_DESTINATIONS.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  return (
    <section id="destinations" className="py-5 sm:py-10 lg:py-10 bg-[#F5F1E8]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header & Compact Filter */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-14 gap-6">
          <div className="w-full lg:w-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3 shadow-sm">
              <span>Handcrafted Expeditions</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36]">
              Most Coveted <span className="italic font-normal text-[#C5A059]">Global Escapes</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#6A7382] mt-2 max-w-xl leading-relaxed">
              From the azure calderas of Greece to snow-dusted alpine chalets, immerse yourself in extraordinary journeys designed for discerning travelers.
            </p>
          </div>

          {/* Compact Filter Button (Fixed size across ALL screens) */}
          <div className="relative inline-block self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="inline-flex items-center gap-2.5 px-3.5 py-2 bg-[#FFFFFF] border border-[#E8E2D5] rounded-xl text-xs font-bold text-[#0F1E36] shadow-sm hover:border-[#C5A059]/50 transition-all cursor-pointer whitespace-nowrap"
            >
              <SlidersHorizontal className="size-3.5 text-[#C5A059]" />
              <span className="text-[#6A7382] font-normal">Filter:</span>
              <span className="text-[#0F1E36] font-semibold">{selectedCategory}</span>
              <ChevronDown className={`size-3.5 text-[#6A7382] transition-transform duration-200 ${isFilterOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu Overlay */}
            {isFilterOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 z-40 bg-[#FFFFFF] border border-[#E8E2D5] rounded-xl shadow-xl py-1.5 overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-bold text-[#6A7382] uppercase tracking-wider border-b border-[#E8E2D5] mb-1">
                  Select Category
                </div>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-[#0F1E36] text-[#FAF8F5]"
                        : "text-[#6A7382] hover:bg-[#F3EFE6] hover:text-[#0F1E36]"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <Check className="size-3 text-[#E5C378]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredDestinations.map((dest) => (
            <div
              key={dest.id}
              className="destination-card group bg-[#FFFFFF] border border-[#E8E2D5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-[#C5A059]/50 flex flex-col justify-between"
            >
              {/* Image banner */}
              <div className="relative h-48 xs:h-56 sm:h-64 w-full overflow-hidden bg-muted">
                <Image
                  src={dest.image}
                  alt={dest.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out filter brightness-[0.9]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Top badges */}
                <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between gap-2 z-10">
                  {dest.badge ? (
                    <span className="px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-bold bg-[#E5C378] text-[#0F1E36] shadow-md truncate max-w-[60%]">
                      {dest.badge}
                    </span>
                  ) : <div />}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-bold bg-black/60 text-white backdrop-blur-md border border-white/20 shrink-0">
                    <Star className="size-3 fill-[#E5C378] text-[#E5C378]" />
                    <span>{dest.rating}</span>
                    <span className="text-white/60 text-[10px]">({dest.reviews})</span>
                  </div>
                </div>

                {/* Bottom title on image */}
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 text-white">
                  <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-white/80 font-medium mb-1">
                    <MapPin className="size-3.5 text-[#E5C378] shrink-0" />
                    <span className="truncate">{dest.country}</span>
                    <span>•</span>
                    <Calendar className="size-3.5 text-[#E5C378] shrink-0" />
                    <span className="truncate">{dest.duration}</span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight text-white group-hover:text-[#E5C378] transition-colors line-clamp-1">
                    {dest.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
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
                <div className="pt-4 border-t border-[#E8E2D5] flex items-center justify-between gap-3">
                  <div className="shrink-0">
                    <span className="text-[10px] sm:text-[11px] text-[#6A7382] block">Curated Package</span>
                    <p className="font-serif text-base sm:text-2xl font-bold text-[#0F1E36]">
                      ${dest.priceFrom.toLocaleString()}{" "}
                      <span className="text-[10px] sm:text-xs font-normal font-sans text-[#6A7382]">/ person</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedDestination(dest)}
                      className="px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-xs font-bold border border-[#E8E2D5] hover:bg-[#F3EFE6] text-[#0F1E36] transition-colors cursor-pointer"
                    >
                      Itinerary
                    </button>
                    <button
                      onClick={() => setBookingTarget(dest)}
                      className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1 cursor-pointer border border-[#C5A059]/30"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="relative w-full max-w-2xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto bg-[#FFFFFF] border border-[#E8E2D5] rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-8 text-[#141A22] my-auto">
            <button
              onClick={() => setSelectedDestination(null)}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6] transition-colors cursor-pointer z-10 bg-white/80 backdrop-blur-sm"
            >
              <X className="size-4 sm:size-5" />
            </button>

            <div className="relative h-40 sm:h-64 w-full rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6">
              <Image
                src={selectedDestination.image}
                alt={selectedDestination.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-5 sm:right-5 text-white">
                <span className="text-[10px] font-bold text-[#E5C378] uppercase tracking-[0.2em]">{selectedDestination.country}</span>
                <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight">{selectedDestination.title}</h3>
                <p className="text-xs text-white/80 mt-1 flex items-center gap-2 sm:gap-3">
                  <span>{selectedDestination.duration}</span>
                  <span>•</span>
                  <span>Rated {selectedDestination.rating} ★</span>
                </p>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6A7382] mb-2">Editorial Overview</h4>
            <p className="text-xs sm:text-sm text-[#485363] leading-relaxed mb-4 sm:mb-6 font-normal">
              {selectedDestination.overview}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#6A7382] mb-3">VIP Package Inclusions</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 mb-6">
              {selectedDestination.highlights.map((hl, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 sm:p-3 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5] text-xs font-medium text-[#141A22]">
                  <Check className="size-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                  <span>{hl}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#E8E2D5]">
              <div>
                <span className="text-xs text-[#6A7382]">All-Inclusive Rate</span>
                <p className="font-serif text-xl sm:text-3xl font-bold text-[#0F1E36]">
                  From ${selectedDestination.priceFrom.toLocaleString()}
                </p>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedDestination(null)}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-[#E8E2D5] text-xs font-semibold hover:bg-[#F3EFE6] transition-colors cursor-pointer text-center"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const dest = selectedDestination;
                    setSelectedDestination(null);
                    setBookingTarget(dest);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 border border-[#C5A059]/30 cursor-pointer text-center"
                >
                  Reserve
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