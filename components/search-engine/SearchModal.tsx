"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Search, X, MapPin, Plane } from "lucide-react";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSelect: (code: string, label: string) => void;
}

const AIRPORT_OPTIONS = [
  { code: "JFK", label: "New York John F. Kennedy International", city: "New York", country: "United States" },
  { code: "LHR", label: "London Heathrow Airport", city: "London", country: "United Kingdom" },
  { code: "DXB", label: "Dubai International Airport", city: "Dubai", country: "United Arab Emirates" },
  { code: "SIN", label: "Singapore Changi Airport", city: "Singapore", country: "Singapore" },
  { code: "CDG", label: "Paris Charles de Gaulle Airport", city: "Paris", country: "France" },
  { code: "HND", label: "Tokyo Haneda Airport", city: "Tokyo", country: "Japan" },
  { code: "ZRH", label: "Zurich Airport", city: "Zurich", country: "Switzerland" },
  { code: "TEB", label: "New York Teterboro Private Jet Hangar", city: "New York", country: "United States" },
];

export function SearchModal({ isOpen, onClose, title, onSelect }: SearchModalProps) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
    return () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = AIRPORT_OPTIONS.filter(
    (ap) =>
      ap.label.toLowerCase().includes(query.toLowerCase()) ||
      ap.code.toLowerCase().includes(query.toLowerCase()) ||
      ap.city.toLowerCase().includes(query.toLowerCase())
  );

  const modalContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F1E36]/60 backdrop-blur-md animate-in fade-in duration-200">
      <div className="w-full max-w-2xl bg-white border border-[#E8E2D5] rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 m-4">
        
        {/* Top Header & Large Search Input */}
        <div className="p-4 sm:p-6 border-b border-[#E8E2D5] bg-[#FAF8F5] relative">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#9E7D3B]">
              {title}
            </span>
            <button
              onClick={onClose}
              className="size-8 rounded-full bg-white border border-[#E8E2D5] flex items-center justify-center hover:bg-[#F3EFE6] transition-colors"
            >
              <X className="size-4 text-[#0F1E36]" />
            </button>
          </div>

          <div className="relative flex items-center">
            <Search className="absolute left-4 size-5 text-[#C5A059]" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type airport name, city, or 3-letter IATA code..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-[#E8E2D5] text-sm font-semibold text-[#0F1E36] placeholder-[#6A7382] focus:outline-none focus:border-[#C5A059] shadow-inner"
            />
          </div>
        </div>

        {/* Suggestion Dropdown List */}
        <div className="max-h-80 overflow-y-auto p-3 space-y-1">
          <button
            type="button"
            onClick={() => {
              onSelect("All", "All Global Hubs");
              onClose();
            }}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF8F5] text-left transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="size-9 rounded-xl bg-[#F3EFE6] flex items-center justify-center">
                <Plane className="size-4 text-[#C5A059]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#0F1E36]">All Global Hubs</p>
                <p className="text-[11px] text-[#6A7382]">Show flights from all available international airports</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#9E7D3B] font-bold">ALL</span>
          </button>

          {filtered.map((ap) => (
            <button
              key={ap.code}
              type="button"
              onClick={() => {
                onSelect(ap.code, `${ap.city} (${ap.code})`);
                onClose();
              }}
              className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-[#F3EFE6]/80 text-left transition-colors cursor-pointer border border-transparent hover:border-[#E8E2D5]"
            >
              <div className="flex items-center gap-3">
                <div className="size-9 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5] flex items-center justify-center">
                  <MapPin className="size-4 text-[#0F1E36]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F1E36]">{ap.label}</p>
                  <p className="text-[11px] text-[#6A7382]">{ap.city}, {ap.country}</p>
                </div>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-[#0F1E36] text-[#FAF8F5]">
                {ap.code}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}