"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Plane, Hotel, Car, FileCheck, ShieldCheck, CheckCircle2, ArrowRight
} from "lucide-react";
import { toast } from "sonner";

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );
}

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
    toast.success("Welcome to AuraVoyage Private Gazette! Check your inbox.");
  };

  return (
    <footer className="bg-[#0A101A] text-[#B2BAC8] pt-8 sm:pt-8 pb-6 border-t border-[#C5A059]/20 relative overflow-hidden">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter Box */}
        <div className="bg-[#0E1522] border border-[#C5A059]/30 rounded-3xl p-6 sm:p-10 mb-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 size-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-[#C5A059]/15 text-[#E5C378] border border-[#C5A059]/30 mb-2.5">
                The Private Gazette
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight leading-snug">
                Receive Unpublished Private Jet Legs & Secret Island Openings
              </h3>
              <p className="text-xs sm:text-sm text-[#8E99AB] mt-2 max-w-xl leading-relaxed">
                Delivered monthly to high-net-worth voyagers. Exclusive villa previews, consular regulatory updates, and invitation-only seasonal itineraries.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-3.5 rounded-2xl bg-[#1E7452]/20 border border-[#1E7452]/40 text-[#4ADE80] text-xs sm:text-sm font-semibold">
                  <CheckCircle2 className="size-4 shrink-0" />
                  <span>You are subscribed to the Private Gazette.</span>
                </div>
              ) : (
                <form 
                  onSubmit={handleNewsletter} 
                  className="flex items-center bg-[#161F2E] border border-[#2B374A] focus-within:border-[#C5A059]/60 rounded-full p-1.5 transition-all shadow-inner"
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter confidential email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full bg-transparent px-4 py-2 text-xs sm:text-sm text-[#FAF8F5] placeholder-[#64748B] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 sm:py-3 rounded-full bg-[#C5A059] text-[#0A101A] font-bold text-xs uppercase tracking-wider hover:bg-[#E5C378] transition-all shrink-0 cursor-pointer shadow-md flex items-center gap-1.5"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Footer Navigation Grid - Compact Gaps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 pb-10 border-b border-[#1E293B]">
          
          {/* Brand Col */}
          <div className="space-y-4">
            <Link href="/" className="group inline-flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-tight text-white leading-none group-hover:text-[#C5A059] transition-colors">
                AURA<span className="italic font-normal text-[#C5A059]">VOYAGE</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#8E99AB] mt-1">
                Bespoke Luxury Travel
              </span>
            </Link>
            <p className="text-xs text-[#8E99AB] leading-relaxed">
              The international benchmark in bespoke expeditions, diplomatic visa acceleration, commercial and private flight booking, five-star hotel procurement, and luxury exotic car hire.
            </p>
            <div className="pt-1 flex items-center gap-2 text-[#8E99AB]">
              <a href="#" className="p-2 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="Instagram">
                <InstagramIcon className="size-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="Twitter">
                <TwitterIcon className="size-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="LinkedIn">
                <LinkedinIcon className="size-4" />
              </a>
              <a href="#" className="p-2 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="Facebook">
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Service Pillar Links */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Four Core Services
            </h4>
            <ul className="space-y-2 text-xs text-[#8E99AB]">
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-2">
                  <FileCheck className="size-3.5 text-[#C5A059] shrink-0" /> <span>Visa Services Desk</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-2">
                  <Plane className="size-3.5 text-[#C5A059] shrink-0" /> <span>Flight Ticket Booking</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-2">
                  <Hotel className="size-3.5 text-[#C5A059] shrink-0" /> <span>5-Star Hotel Booking</span>
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-2">
                  <Car className="size-3.5 text-[#C5A059] shrink-0" /> <span>Prestige Car Rental</span>
                </a>
              </li>
              <li><a href="#packages" className="hover:text-[#E5C378] transition-colors block">Integrated Master Packages</a></li>
              <li><a href="#search-engine" className="hover:text-[#E5C378] transition-colors block">Live Search Engine</a></li>
            </ul>
          </div>

          {/* Top Escapes */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Top Escapes
            </h4>
            <ul className="space-y-2 text-xs text-[#8E99AB]">
              <li><a href="#destinations" className="hover:text-white transition-colors block">Santorini, Greece</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors block">Kyoto & Fuji, Japan</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors block">Amalfi Coast, Italy</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors block">St. Moritz, Switzerland</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors block">Dubai & Desert Dunes</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors block">Bora Bora Overwater</a></li>
            </ul>
          </div>

          {/* Security & Accreditations */}
          <div className="space-y-3.5">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
              Security & Accreditations
            </h4>
            <ul className="space-y-2 text-xs text-[#8E99AB]">
              <li className="flex items-center gap-2 text-[#E5C378] font-medium">
                <ShieldCheck className="size-4 shrink-0 text-[#C5A059]" /> <span>ATOL Bonded (#78492)</span>
              </li>
              <li className="flex items-center gap-2 text-[#E5C378] font-medium">
                <ShieldCheck className="size-4 shrink-0 text-[#C5A059]" /> <span>IATA Registered Agent</span>
              </li>
              <li className="flex items-center gap-2 text-[#E5C378] font-medium">
                <ShieldCheck className="size-4 shrink-0 text-[#C5A059]" /> <span>Virtuoso Member Desk</span>
              </li>
              <li><a href="#" className="hover:text-white transition-colors block">Client Confidentiality Charter</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Terms of VIP Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors block">Privacy & GDPR Compliance</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p className="text-center sm:text-left">© 2026 AuraVoyage Luxury Expeditions Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-mono text-[#8E99AB]">
            <span className="px-2.5 py-1 rounded-lg bg-[#131A26] border border-[#242F42]">AMEX CENTURION</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#131A26] border border-[#242F42]">VISA INFINITE</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#131A26] border border-[#242F42]">MASTERCARD WORLD</span>
            <span className="px-2.5 py-1 rounded-lg bg-[#131A26] border border-[#242F42]">CRYPTO BTC/USDT</span>
          </div>
        </div>

      </div>
    </footer>
  );
}