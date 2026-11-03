"use client";

import React, { useEffect, useRef, useState } from "react";
import { Plane, Hotel, Car, FileCheck, ChevronDown, Check } from "lucide-react";
import { ServiceTab } from "./index";

interface SearchTabsProps {
  activeTab: ServiceTab;
  setActiveTab: (tab: ServiceTab) => void;
}

const tabLabels: Record<ServiceTab, string> = {
  flights: "Flight Ticket Booking",
  hotels: "Hotel Booking",
  cars: "Car Rental",
  visas: "Visa Services",
};

export function SearchTabs({ activeTab, setActiveTab }: SearchTabsProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) setMobileMenuOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <div className="border-b border-[#E8E2D5] pb-3 mb-4">
      {/* Mobile Dropdown Selector */}
      <div ref={menuRef} className="relative sm:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-haspopup="menu"
          aria-expanded={mobileMenuOpen}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold shadow-md cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {activeTab === "flights" && <Plane className="size-4 text-[#C5A059]" />}
            {activeTab === "hotels" && <Hotel className="size-4 text-[#C5A059]" />}
            {activeTab === "cars" && <Car className="size-4 text-[#C5A059]" />}
            {activeTab === "visas" && <FileCheck className="size-4 text-[#C5A059]" />}
            <span className="uppercase tracking-wider">{tabLabels[activeTab]}</span>
          </div>
          <ChevronDown className={`size-4 text-[#C5A059] transition-transform duration-200 ${mobileMenuOpen ? "rotate-180" : ""}`} />
        </button>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-[#FFFFFF] border border-[#E8E2D5] rounded-xl shadow-xl z-30 p-1.5 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
            {(["flights", "hotels", "cars", "visas"] as ServiceTab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActiveTab(tab);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-left transition-all cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#0F1E36] text-[#FAF8F5]"
                    : "bg-[#FAF8F5] text-[#6A7382] hover:bg-[#F3EFE6] hover:text-[#0F1E36]"
                }`}
              >
                <div className="flex items-center gap-2">
                  {tab === "flights" && <Plane className="size-4 text-[#C5A059]" />}
                  {tab === "hotels" && <Hotel className="size-4 text-[#C5A059]" />}
                  {tab === "cars" && <Car className="size-4 text-[#C5A059]" />}
                  {tab === "visas" && <FileCheck className="size-4 text-[#C5A059]" />}
                  <span>{tabLabels[tab]}</span>
                </div>
                {activeTab === tab && <Check className="size-3.5 text-[#E5C378]" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop / Tablet Full Fill Grid */}
      <div className="hidden sm:grid grid-cols-4 gap-2.5 w-full">
        {(["flights", "hotels", "cars", "visas"] as ServiceTab[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "bg-[#0F1E36] text-[#FAF8F5] shadow-sm scale-[1.01]"
                : "bg-[#FAF8F5] text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6] border border-[#E8E2D5]"
            }`}
          >
            {tab === "flights" && <Plane className="size-4 text-[#C5A059] shrink-0" />}
            {tab === "hotels" && <Hotel className="size-4 text-[#C5A059] shrink-0" />}
            {tab === "cars" && <Car className="size-4 text-[#C5A059] shrink-0" />}
            {tab === "visas" && <FileCheck className="size-4 text-[#C5A059] shrink-0" />}
            <span className="truncate">{tabLabels[tab]}</span>
          </button>
        ))}
      </div>
    </div>
  );
}