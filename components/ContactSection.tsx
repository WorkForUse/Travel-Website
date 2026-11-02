"use client";

import React, { useState } from "react";
import { 
  Send, CheckCircle2, ShieldCheck, Clock, Check
} from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [services, setServices] = useState<string[]>([
    "Visa Services",
    "Flight Ticket Booking",
    "Hotel Booking",
  ]);
  const [budget, setBudget] = useState("$10,000 - $25,000");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (srv: string) => {
    setServices((prev) =>
      prev.includes(srv) ? prev.filter((s) => s !== srv) : [...prev, srv]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      toast.error("Please fill in your full name and email.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Bespoke inquiry received! A senior travel director has been assigned.");
    }, 1200);
  };

  const offices = [
    { city: "London Mayfair", address: "14 Berkeley Square, London W1J 6BQ", phone: "+44 (20) 7946-0812" },
    { city: "Dubai Downtown", address: "Burj Crown Tower, Suite 4801, Dubai", phone: "+971 (4) 382-9900" },
    { city: "New York", address: "645 Madison Avenue, 22nd Fl, NY 10022", phone: "+1 (212) 555-0198" },
  ];

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F5F1E8]/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Value Prop & Offices */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFFFFF] text-[#9E7D3B] text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 mb-3.5 shadow-sm">
                <ShieldCheck className="size-3 text-[#C5A059]" />
                <span>Private Consultation</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#0F1E36]">
                Design Your <br />
                <span className="italic font-normal text-[#C5A059]">Bespoke Escape</span>
              </h2>
              <p className="text-sm sm:text-base text-[#6A7382] mt-4 leading-relaxed">
                Connect with our senior private client directors. Whether facilitating complex diplomatic visas or organizing private jet transfers, your itinerary is handled with supreme confidentiality.
              </p>
            </div>

            {/* Quick Guarantees */}
            <div className="space-y-3 p-6 rounded-3xl bg-[#FFFFFF] border border-[#E8E2D5] shadow-sm">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#141A22]">
                <ShieldCheck className="size-4 text-[#C5A059] shrink-0" />
                <span>Guaranteed 2-Hour Response Time for Inquiries</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#141A22]">
                <Clock className="size-4 text-[#C5A059] shrink-0" />
                <span>24/7 Dedicated Human WhatsApp Concierge</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold text-[#141A22]">
                <CheckCircle2 className="size-4 text-[#C5A059] shrink-0" />
                <span>Zero Commitment Complimentary Consultation</span>
              </div>
            </div>

            {/* Global Desks */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#6A7382]">
                AuraVoyage Global Consular Desks
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {offices.map((office, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E2D5] shadow-sm">
                    <p className="font-serif font-bold text-base text-[#0F1E36]">{office.city}</p>
                    <p className="text-xs text-[#6A7382] mt-0.5">{office.address}</p>
                    <p className="text-xs font-bold text-[#C5A059] mt-1">{office.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Consultation Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-7 sm:p-11 shadow-xl relative">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                  <div className="mx-auto size-20 rounded-full bg-[#F3EFE6] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36]">
                      Inquiry Received with Distinction
                    </h3>
                    <p className="text-[#6A7382] text-sm max-w-md mx-auto mt-2">
                      Thank you, <strong className="text-[#0F1E36]">{fullName}</strong>. Your personalized itinerary brief has been assigned to a Senior Private Client Director. We will reach you at <strong className="text-[#0F1E36]">{email}</strong> within 2 hours.
                    </p>
                  </div>

                  <div className="p-5 bg-[#FAF8F5] rounded-2xl border border-[#E8E2D5] max-w-sm mx-auto text-xs text-left space-y-1.5">
                    <p><span className="text-[#6A7382]">Reference:</span> <span className="font-mono font-bold text-[#0F1E36]">AV-REQ-9842</span></p>
                    <p><span className="text-[#6A7382]">Selected Services:</span> <span className="font-semibold text-[#0F1E36]">{services.join(", ") || "Full Package"}</span></p>
                    <p><span className="text-[#6A7382]">Budget Tier:</span> <span className="font-semibold text-[#0F1E36]">{budget}</span></p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName("");
                      setEmail("");
                      setPhone("");
                      setNotes("");
                    }}
                    className="px-6 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-colors"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1E36]">
                      Request Bespoke Itinerary
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6A7382] mt-1">
                      Share your travel aspirations, and our private concierge desk will architect every detail.
                    </p>
                  </div>

                  {/* Service selector checkboxes */}
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#6A7382] mb-2.5">
                      Services Required (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        "Visa Services",
                        "Flight Ticket Booking",
                        "Hotel Booking",
                        "Car Rental",
                      ].map((srv) => {
                        const active = services.includes(srv);
                        return (
                          <button
                            type="button"
                            key={srv}
                            onClick={() => toggleService(srv)}
                            className={`p-3.5 rounded-2xl border text-xs font-semibold text-left transition-all flex flex-col justify-between h-22 cursor-pointer ${
                              active
                                ? "bg-[#0F1E36] text-[#FAF8F5] border-[#0F1E36] shadow-sm"
                                : "bg-[#FAF8F5] border-[#E8E2D5] text-[#141A22] hover:bg-[#F3EFE6]"
                            }`}
                          >
                            <span className="line-clamp-2">{srv}</span>
                            <span className={`size-4 rounded-md flex items-center justify-center text-[10px] ${
                              active ? "bg-[#C5A059] text-white" : "border border-[#E8E2D5]"
                            }`}>
                              {active && <Check className="size-3" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Personal details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#141A22] mb-1.5">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alexander Wright"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#141A22] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="alexander@domain.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#141A22] mb-1.5">
                        Mobile / WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 839-2019"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#141A22] mb-1.5">
                        Target Destination(s)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Monaco, St. Moritz, Kyoto, Dubai"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="w-full px-4 py-3 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                      />
                    </div>
                  </div>

                  {/* Budget Selector */}
                  <div>
                    <label className="block text-xs font-bold text-[#141A22] mb-1.5">
                      Estimated Investment / Budget Range
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50 cursor-pointer"
                    >
                      <option value="$5,000 - $10,000">$5,000 - $10,000 (Premium Experience)</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000 (First Class & 5★ Suites)</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000 (Private Aviation & Villas)</option>
                      <option value="$50,000+">$50,000+ (Ultra-Prestige Unlimited)</option>
                    </select>
                  </div>

                  {/* Special requests textarea */}
                  <div>
                    <label className="block text-xs font-bold text-[#141A22] mb-1.5">
                      Itinerary Notes & Special Requirements
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Please note dietary requirements, private aviation requests, supercar preferences, or urgent visa deadlines..."
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full px-4 py-3 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] text-sm text-[#141A22] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-2xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-lg shadow-[#0F1E36]/25 flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer border border-[#C5A059]/40"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="size-4 border-2 border-[#E5C378] border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to Senior Director...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4 text-[#E5C378]" />
                        <span>Submit Bespoke Travel Brief</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
