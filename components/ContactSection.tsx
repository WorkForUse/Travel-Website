"use client";

import React, { useState } from "react";
import { 
  Send, CheckCircle2, Shield, Globe, Headphones,
  User, Mail, Phone, MapPin, DollarSign, FileText,
  FileCheck, Plane, Hotel, Car, ArrowRight, ChevronDown, Check
} from "lucide-react";
import { toast } from "sonner";

export function ContactSection() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedService, setSelectedService] = useState<string>("Visa Services");
  const [budget, setBudget] = useState("$10,000 - $25,000 (First Class & 5★ Suites)");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [isBudgetOpen, setIsBudgetOpen] = useState(false);

  const availableServices = [
    { id: "Visa Services", label: "Visa Services", icon: FileCheck },
    { id: "Flight Ticket Booking", label: "Flight Ticket Booking", icon: Plane },
    { id: "Hotel Booking", label: "Hotel Booking", icon: Hotel },
    { id: "Car Rental", label: "Car Rental", icon: Car },
  ];

  const budgetOptions = [
    "$5,000 - $10,000 (Premium Experience)",
    "$10,000 - $25,000 (First Class & 5★ Suites)",
    "$25,000 - $50,000 (Private Aviation & Villas)",
    "$50,000+ (Ultra-Prestige Unlimited)",
  ];

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

  return (
    <section id="contact" className="py-5 sm:py-10 lg:py-10 bg-[#FAF8F5] relative overflow-hidden border-t border-[#E8E2D5]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Grid Layout: Form on Left, Content on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Interactive Form Card (col-span-7) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E8E2D5] rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 shadow-xl shadow-[#0F1E36]/5 relative">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-6 animate-in zoom-in-95 duration-300">
                  <div className="mx-auto size-20 rounded-full bg-[#F3EFE6] text-[#C5A059] border border-[#C5A059]/30 flex items-center justify-center">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1E36]">
                      Inquiry Received with Distinction
                    </h3>
                    <p className="text-[#6A7382] text-xs sm:text-sm max-w-md mx-auto mt-2">
                      Thank you, <strong className="text-[#0F1E36]">{fullName}</strong>. Your personalized itinerary brief has been assigned to a Senior Private Client Director. We will reach you at <strong className="text-[#0F1E36]">{email}</strong> within 2 hours.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFullName("");
                      setEmail("");
                      setPhone("");
                      setNotes("");
                    }}
                    className="px-6 py-3 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Form Header */}
                  <div>
                    <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#0F1E36]">
                      Request Bespoke Itinerary
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6A7382] mt-0.5">
                      Share your travel aspirations, and our private concierge desk will architect every detail.
                    </p>
                  </div>

                  <hr className="border-[#E8E2D5]/70" />

                  {/* Primary Service Dropdown Selector */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                      Primary Service Required *
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setIsServiceOpen(!isServiceOpen);
                        setIsBudgetOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 rounded-full border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#0F1E36] hover:border-[#C5A059]/60 focus:bg-white focus:outline-none transition-all cursor-pointer"
                    >
                      <span className="font-medium">{selectedService}</span>
                      <ChevronDown className={`size-4 text-[#6A7382] transition-transform duration-200 ${isServiceOpen ? "rotate-180" : ""}`} />
                    </button>

                    {isServiceOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white border border-[#E8E2D5] rounded-2xl shadow-xl overflow-hidden py-1">
                        {availableServices.map((srv) => (
                          <button
                            key={srv.id}
                            type="button"
                            onClick={() => {
                              setSelectedService(srv.id);
                              setIsServiceOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                              selectedService === srv.id
                                ? "bg-[#0F1E36] text-white"
                                : "text-[#485363] hover:bg-[#FAF8F5] hover:text-[#0F1E36]"
                            }`}
                          >
                            <span>{srv.label}</span>
                            {selectedService === srv.id && <Check className="size-4 text-[#C5A059]" />}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Input Fields Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                        Your Full Name *
                      </label>
                      <div className="relative">
                        <User className="size-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alexander Wright"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#0F1E36] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#9A9A9A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="size-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="alexander@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#0F1E36] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#9A9A9A]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                        Mobile / WhatsApp Number
                      </label>
                      <div className="relative">
                        <Phone className="size-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          placeholder="+1 (555) 839-2019"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#0F1E36] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#9A9A9A]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                        Target Destination(s)
                      </label>
                      <div className="relative">
                        <MapPin className="size-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="e.g. Monaco, St. Moritz, Kyoto"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-full border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#0F1E36] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#9A9A9A]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Custom Styled Budget Dropdown Component */}
                  <div className="relative">
                    <label className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                      Estimated Investment / Budget Range
                    </label>
                    <div className="relative">
                      <DollarSign className="size-4 text-[#9A9A9A] absolute left-3.5 top-1/2 -translate-y-1/2 z-10" />
                      <button
                        type="button"
                        onClick={() => {
                          setIsBudgetOpen(!isBudgetOpen);
                          setIsServiceOpen(false);
                        }}
                        className="w-full flex items-center justify-between pl-10 pr-4 py-3 rounded-full border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm font-medium text-[#0F1E36] hover:border-[#C5A059]/60 focus:bg-white focus:outline-none transition-all cursor-pointer text-left"
                      >
                        <span className="truncate">{budget}</span>
                        <ChevronDown className={`size-4 text-[#6A7382] shrink-0 ml-2 transition-transform duration-200 ${isBudgetOpen ? "rotate-180" : ""}`} />
                      </button>

                      {isBudgetOpen && (
                        <div className="absolute top-full left-0 right-0 mt-2 z-30 bg-white border border-[#E8E2D5] rounded-2xl shadow-xl overflow-hidden py-1">
                          {budgetOptions.map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => {
                                setBudget(opt);
                                setIsBudgetOpen(false);
                              }}
                              className={`w-full text-left px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between transition-colors cursor-pointer ${
                                budget === opt
                                  ? "bg-[#0F1E36] text-white"
                                  : "text-[#485363] hover:bg-[#FAF8F5] hover:text-[#0F1E36]"
                              }`}
                            >
                              <span>{opt}</span>
                              {budget === opt && <Check className="size-4 text-[#C5A059] shrink-0 ml-2" />}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Textarea */}
                  <div>
                    <label className="block text-xs font-semibold text-[#0F1E36] mb-1.5">
                      Itinerary Notes & Special Requirements
                    </label>
                    <div className="relative">
                      <FileText className="size-4 text-[#9A9A9A] absolute left-3.5 top-3.5" />
                      <textarea
                        rows={3}
                        placeholder="Please note dietary requirements, private aviation requests, supercar preferences..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] text-xs sm:text-sm text-[#0F1E36] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#C5A059] transition-all placeholder:text-[#9A9A9A]"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 sm:py-4 rounded-full bg-[#0F1E36] text-white font-semibold text-xs sm:text-sm tracking-wide hover:bg-[#1A2E4F] transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="size-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transmitting to Senior Director...</span>
                      </>
                    ) : (
                      <>
                        <Send className="size-4 text-[#C5A059]" />
                        <span>Submit Bespoke Travel Brief</span>
                        <ArrowRight className="size-4 text-white ml-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Column: Heading & Features (col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white text-[#9E7D3B] text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border border-[#C5A059]/30 shadow-sm">
                <span>Private Consultation</span>
              </div>
              
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36] leading-[1.15]">
                Design Your <br />
                <span className="italic font-normal text-[#C5A059]">Bespoke Escape</span>
              </h2>

              <div className="w-16 h-[2px] bg-[#C5A059]"></div>

              <p className="text-xs sm:text-sm text-[#6A7382] leading-relaxed">
                Connect with our senior private client directors. Whether facilitating complex diplomatic visas or organizing private jet transfers, your itinerary is handled with supreme confidentiality.
              </p>
            </div>

            {/* Feature Highlights Grid */}
            <div className="space-y-3">
              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-[#E8E2D5] shadow-sm hover:border-[#C5A059]/50 transition-all">
                <div className="size-10 rounded-xl bg-[#F3EFE6] text-[#0F1E36] flex items-center justify-center shrink-0 border border-[#C5A059]/20">
                  <Shield className="size-4 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F1E36]">Discreet & Confidential</h4>
                  <p className="text-[11px] text-[#6A7382]">Supreme privacy across all operations</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-[#E8E2D5] shadow-sm hover:border-[#C5A059]/50 transition-all">
                <div className="size-10 rounded-xl bg-[#F3EFE6] text-[#0F1E36] flex items-center justify-center shrink-0 border border-[#C5A059]/20">
                  <Globe className="size-4 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F1E36]">Global Expertise</h4>
                  <p className="text-[11px] text-[#6A7382]">Mayfair, Dubai, & New York desks</p>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl border border-[#E8E2D5] shadow-sm hover:border-[#C5A059]/50 transition-all">
                <div className="size-10 rounded-xl bg-[#F3EFE6] text-[#0F1E36] flex items-center justify-center shrink-0 border border-[#C5A059]/20">
                  <Headphones className="size-4 text-[#C5A059]" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#0F1E36]">24/7 Concierge</h4>
                  <p className="text-[11px] text-[#6A7382]">Dedicated human support anytime</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}