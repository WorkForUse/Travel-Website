"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Compass, Plane, Hotel, Car, FileCheck, ShieldCheck, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

// Inline social SVGs for brand fidelity and zero dependency errors
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
    <footer className="bg-[#0A101A] text-[#B2BAC8] pt-16 sm:pt-24 pb-12 border-t border-[#C5A059]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter CTA Box in Deep Obsidian with Gold Hairline */}
        <div className="bg-[#0E1522] border border-[#C5A059]/30 rounded-3xl p-8 sm:p-12 mb-16 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 size-64 bg-[#C5A059]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] bg-[#C5A059]/15 text-[#E5C378] border border-[#C5A059]/30 mb-3">
                 The Private Gazette
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#FFFFFF] tracking-tight">
                Receive Unpublished Private Jet Legs & Secret Island Openings
              </h3>
              <p className="text-xs sm:text-sm text-[#8E99AB] mt-2 max-w-xl">
                Delivered monthly to high-net-worth voyagers. Exclusive villa previews, consular regulatory updates, and invitation-only seasonal itineraries.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="flex items-center gap-2 p-4 rounded-2xl bg-[#1E7452]/20 border border-[#1E7452]/40 text-[#4ADE80] text-sm font-semibold">
                  <CheckCircle2 className="size-5 shrink-0" />
                  <span>You are subscribed to the Private Gazette.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    required
                    placeholder="Enter confidential email..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-[#161F2E] border border-[#2B374A] text-sm text-[#FAF8F5] placeholder-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#C5A059]/50"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl bg-[#C5A059] text-[#0A101A] font-bold text-xs uppercase tracking-wider hover:bg-[#E5C378] transition-all shrink-0 cursor-pointer shadow-lg shadow-[#C5A059]/20"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* 4 Pillars Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-[#1E293B]">
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="size-10 rounded-xl bg-gradient-to-tr from-[#9F7E3B] to-[#F3D99C] p-[1.5px]">
                <div className="size-full bg-[#0A101A] rounded-[10px] flex items-center justify-center">
                  <Compass className="size-4.5 text-[#E5C378]" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Aura<span className="italic font-normal text-[#C5A059]">Voyage</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#8E99AB] -mt-0.5">
                  Luxury Travel Atelier
                </span>
              </div>
            </Link>
            <p className="text-xs text-[#8E99AB] leading-relaxed max-w-sm">
              The international benchmark in bespoke expeditions, diplomatic visa acceleration, commercial and private flight booking, five-star hotel procurement, and luxury exotic car hire.
            </p>
            <div className="pt-2 flex items-center gap-3 text-[#8E99AB]">
              <a href="#" className="p-2.5 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="Instagram">
                <InstagramIcon className="size-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="Twitter">
                <TwitterIcon className="size-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="LinkedIn">
                <LinkedinIcon className="size-4" />
              </a>
              <a href="#" className="p-2.5 rounded-xl bg-[#131A26] hover:text-white hover:bg-[#1E2738] transition-colors border border-[#242F42]" aria-label="Facebook">
                <FacebookIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Service Pillar Links */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
              Four Core Services
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E99AB]">
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-1.5">
                  <FileCheck className="size-3 text-[#C5A059]" /> Visa Services Desk
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-1.5">
                  <Plane className="size-3 text-[#C5A059]" /> Flight Ticket Booking
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-1.5">
                  <Hotel className="size-3 text-[#C5A059]" /> 5-Star Hotel Booking
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-[#E5C378] transition-colors flex items-center gap-1.5">
                  <Car className="size-3 text-[#C5A059]" /> Prestige Car Rental
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-[#E5C378] transition-colors">
                  Integrated Master Packages
                </a>
              </li>
              <li>
                <a href="#search-engine" className="hover:text-[#E5C378] transition-colors">
                  Live Search Engine
                </a>
              </li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
              Top Escapes
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E99AB]">
              <li><a href="#destinations" className="hover:text-white transition-colors">Santorini, Greece</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Kyoto & Fuji, Japan</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Amalfi Coast, Italy</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">St. Moritz, Switzerland</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Dubai & Desert Dunes</a></li>
              <li><a href="#destinations" className="hover:text-white transition-colors">Bora Bora Overwater</a></li>
            </ul>
          </div>

          {/* Trust & Legal */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-4">
              Security & Accreditations
            </h4>
            <ul className="space-y-2.5 text-xs text-[#8E99AB]">
              <li className="flex items-center gap-1.5 text-[#E5C378] font-medium">
                <ShieldCheck className="size-3.5" /> ATOL Bonded (#78492)
              </li>
              <li className="flex items-center gap-1.5 text-[#E5C378] font-medium">
                <ShieldCheck className="size-3.5" /> IATA Registered Agent
              </li>
              <li className="flex items-center gap-1.5 text-[#E5C378] font-medium">
                <ShieldCheck className="size-3.5" /> Virtuoso Member Desk
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Client Confidentiality Charter</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of VIP Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy & GDPR Compliance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Payment Security */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
          <p>© 2026 AuraVoyage Luxury Expeditions Ltd. All rights reserved.</p>

          <div className="flex items-center gap-2.5 text-[10px] font-mono text-[#8E99AB]">
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
