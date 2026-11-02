"use client";

import React, { useState } from "react";
import { 
  X, CheckCircle2, ShieldCheck, Sparkles, 
  User, Mail, Phone, Calendar, MapPin, Star,
  Lock, ArrowRight, Download
} from "lucide-react";
import { toast } from "sonner";
import { FlightItem, HotelItem, CarItem, VisaItem, DestinationItem } from "@/lib/mock-data";

export type BookingTarget = 
  | { type: "flight"; data: FlightItem }
  | { type: "hotel"; data: HotelItem }
  | { type: "car"; data: CarItem }
  | { type: "visa"; data: VisaItem }
  | { type: "destination"; data: DestinationItem };

interface BookingModalProps {
  item: BookingTarget | null;
  onClose: () => void;
}

export function BookingModal({ item, onClose }: BookingModalProps) {
  const [step, setStep] = useState<"form" | "confirmed">("form");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [specialRequests, setSpecialRequests] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");

  if (!item) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      toast.error("Please enter your name and email address.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const generatedRef = "AV-" + Math.floor(100000 + Math.random() * 900000) + "-VIP";
      setBookingRef(generatedRef);
      setIsSubmitting(false);
      setStep("confirmed");
      toast.success("Reservation confirmed! Your VIP concierge will contact you shortly.");
    }, 900);
  };

  const getTitle = () => {
    switch (item.type) {
      case "flight":
        return `${item.data.airline} • ${item.data.flightNumber}`;
      case "hotel":
        return item.data.name;
      case "car":
        return item.data.name;
      case "visa":
        return `${item.data.country} Consular Filing`;
      case "destination":
        return item.data.title;
    }
  };

  const getPrice = () => {
    switch (item.type) {
      case "flight":
        return `$${item.data.price.toLocaleString()} all-in`;
      case "hotel":
        return `$${item.data.pricePerNight.toLocaleString()} / night`;
      case "car":
        return `$${item.data.pricePerDay.toLocaleString()} / day`;
      case "visa":
        return `$${item.data.fee.toLocaleString()} fee`;
      case "destination":
        return `From $${item.data.priceFrom.toLocaleString()}`;
    }
  };

  const getCategoryLabel = () => {
    switch (item.type) {
      case "flight":
        return "First & Business Flight Booking";
      case "hotel":
        return "5-Star Palace & Sanctuary Booking";
      case "car":
        return "Prestige & Exotic Fleet Rental";
      case "visa":
        return "Diplomatic Visa Expedited Facilitation";
      case "destination":
        return "Curated Master Package";
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl max-h-[92vh] bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl shadow-2xl flex flex-col overflow-hidden text-[#141A22]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* MODAL HEADER (Sticky Top) */}
        <div className="px-5 py-4 sm:px-7 sm:py-5 border-b border-[#E8E2D5] bg-[#FFFFFF] flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase text-[#9E7D3B] mb-1">
              <Sparkles className="size-3 text-[#C5A059]" />
              <span>{getCategoryLabel()}</span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F1E36] leading-snug">
              {getTitle()}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-serif font-bold text-base text-[#0F1E36]">{getPrice()}</span>
              <span className="text-xs text-[#6A7382]">•</span>
              <span className="text-[11px] font-semibold text-[#1E7452] flex items-center gap-1">
                <ShieldCheck className="size-3.5" /> Zero Deductible Guarantee
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6] transition-colors cursor-pointer shrink-0 border border-[#E8E2D5]"
            aria-label="Close modal"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* MODAL BODY (Scrollable with proper padding so nothing is cut off) */}
        {step === "form" ? (
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto px-5 py-4 sm:px-7 sm:py-5 space-y-4">
              {/* Item Overview Mini Banner */}
              <div className="bg-[#FAF8F5] rounded-2xl p-3.5 sm:p-4 border border-[#E8E2D5]">
                {item.type === "hotel" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Destination</span>
                      <span className="font-semibold text-[#0F1E36] truncate block">{item.data.destination}, {item.data.country}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Suite Tier</span>
                      <span className="font-semibold text-[#0F1E36] truncate block">{item.data.roomType}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Privileges</span>
                      <span className="font-semibold text-[#9E7D3B] truncate block">Virtuoso 5★ VIP Perks</span>
                    </div>
                  </div>
                )}

                {item.type === "flight" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Route</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.fromCode} → {item.data.toCode}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Departure</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.departureTime}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Cabin</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.cabinClass}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Aircraft</span>
                      <span className="font-semibold text-[#0F1E36] truncate">{item.data.aircraftModel}</span>
                    </div>
                  </div>
                )}

                {item.type === "car" && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Category</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.category}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">0-100 km/h</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.specs.acceleration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Transmission</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.specs.transmission}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Insurance</span>
                      <span className="font-semibold text-[#1E7452]">Zero Excess</span>
                    </div>
                  </div>
                )}

                {item.type === "visa" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Consular Post</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.flag} {item.data.country}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Approval Success</span>
                      <span className="font-semibold text-[#1E7452] font-mono">{item.data.approvalRate}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Delivery</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.expressProcessing}</span>
                    </div>
                  </div>
                )}

                {item.type === "destination" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Destination</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.title}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Duration</span>
                      <span className="font-semibold text-[#0F1E36]">{item.data.duration}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#6A7382] block">Rating</span>
                      <span className="font-semibold text-[#9E7D3B]">★ {item.data.rating}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#141A22] mb-1">
                    Primary Guest / Traveler Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 size-4 text-[#6A7382]" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Lord Alexander Sterling"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141A22] mb-1">
                    Private Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 size-4 text-[#6A7382]" />
                    <input
                      type="email"
                      required
                      placeholder="alexander@sovereign.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 font-medium"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-[#141A22] mb-1">
                    Direct Phone / WhatsApp Concierge *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 size-4 text-[#6A7382]" />
                    <input
                      type="tel"
                      placeholder="+1 (555) 842-2872"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#141A22] mb-1">
                    Party Size / Guests
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 font-medium cursor-pointer"
                  >
                    <option value="1">1 Guest (Solo Private)</option>
                    <option value="2">2 Guests (Couple / Companion Suite)</option>
                    <option value="3">3 Guests (Executive Delegation)</option>
                    <option value="4">4 Guests (Family Villa)</option>
                    <option value="5+">5+ Guests (Full Private Residence)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#141A22] mb-1">
                  Bespoke Requests (Dietary, Tarmac Meet & Greet, Chauffeur)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Vintage Dom Pérignon on arrival, tarmac chauffeur transfer, high-floor suite..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 resize-none font-medium"
                />
              </div>

              {/* Security Pill */}
              <div className="flex items-center gap-2 p-3 bg-[#FAF8F5] rounded-xl border border-[#E8E2D5] text-[11px] text-[#485363]">
                <Lock className="size-3.5 text-[#C5A059] shrink-0" />
                <span>
                  <strong>AuraVoyage Escrow Security:</strong> No upfront payment deducted until your named concierge confirms suite allocation with the General Manager.
                </span>
              </div>
            </div>

            {/* MODAL FOOTER (Always pinned at bottom, never cut off) */}
            <div className="px-5 py-3.5 sm:px-7 sm:py-4 bg-[#FAF8F5] border-t border-[#E8E2D5] flex items-center justify-between gap-3 shrink-0">
              <span className="text-[11px] text-[#6A7382] hidden sm:inline">
                Instant hold for 24 hours
              </span>

              <div className="flex items-center gap-2.5 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl border border-[#E8E2D5] hover:bg-[#F3EFE6] text-xs font-semibold text-[#0F1E36] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all flex items-center gap-2 disabled:opacity-60 shadow-md shadow-[#0F1E36]/20 border border-[#C5A059]/30 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <span className="size-3.5 border-2 border-[#E5C378] border-t-transparent rounded-full animate-spin" />
                      <span>Securing...</span>
                    </>
                  ) : (
                    <>
                      <span>Lock In Reservation</span>
                      <ArrowRight className="size-3.5 text-[#E5C378]" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        ) : (
          /* Confirmation Screen */
          <div className="p-6 sm:p-10 text-center space-y-5 overflow-y-auto">
            <div className="mx-auto size-16 bg-[#F3EFE6] text-[#C5A059] rounded-2xl flex items-center justify-center border border-[#C5A059]/30 shadow-inner">
              <CheckCircle2 className="size-8 text-[#1E7452]" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-[#F3EFE6] text-[#9E7D3B] text-[10px] font-bold tracking-[0.2em] rounded-full border border-[#C5A059]/30 mb-2">
                RESERVATION ALLOTTED
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1E36]">
                Confirmed, {fullName || "Esteemed Voyager"}
              </h3>
              <p className="text-[#6A7382] text-xs sm:text-sm mt-1 max-w-md mx-auto leading-relaxed">
                Your reservation has been locked with priority status. A formal VIP dossier and digital itinerary have been transmitted to <strong className="text-[#0F1E36]">{email}</strong>.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] max-w-sm mx-auto text-left space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-[#6A7382]">Reservation Reference:</span>
                <span className="font-mono font-bold text-[#0F1E36]">{bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A7382]">Selected Item:</span>
                <span className="font-semibold text-[#0F1E36] truncate max-w-[180px]">{getTitle()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#6A7382]">Concierge Desk:</span>
                <span className="font-semibold text-[#9E7D3B]">Mayfair & Dubai VIP</span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
