"use client";

import React from "react";
import { ArrowUpRight, ShieldCheck, Crown, Sparkles, CheckCircle2, Phone } from "lucide-react";
import { SearchEngine } from "@/components/SearchEngine";

export function Hero() {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative pt-24 pb-8 sm:pt-32 sm:pb-12 overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F6F1E7] to-[#FAF8F5] border-b border-[#E8E2D5]/60">
      {/* Luxury Radial Glow Backgrounds */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-tr from-[#C5A059]/12 via-[#E5C378]/18 to-transparent blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#C5A059]/8 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Header Content */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          {/* Sovereign Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFFFF] border border-[#C5A059]/40 text-[#0F1E36] text-[10px] sm:text-[11px] font-bold tracking-[0.22em] uppercase mb-4 shadow-sm">
            <Crown className="size-3.5 text-[#C5A059]" />
            <span>Diplomatic & Private Aviation Atelier</span>
            <span className="size-1.5 rounded-full bg-[#C5A059]" />
            <span className="text-[#9E7D3B]">Bespoke 2026/2027</span>
          </div>

          {/* Majestic Luxury Title */}
          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0F1E36] mb-4 leading-[1.12]">
            Journeys Crafted <br className="hidden sm:inline" />
            <span className="italic font-normal text-[#9F7E3B]">
              With Quiet Perfection.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm lg:text-base text-[#485363] font-normal max-w-2xl mx-auto leading-relaxed mb-6">
            Effortless global mobility across four sovereign disciplines: expedited diplomatic visas, private jet charters, premier hotel sanctuaries, and executive ground fleets.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold">
            <a
              href="#search-engine"
              onClick={(e) => scrollToSection(e, "#search-engine")}
              className="px-6 py-3 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-2 border border-[#C5A059]/30 cursor-pointer"
            >
              <span>Explore Search & Reserve</span>
              <ArrowUpRight className="size-4 text-[#E5C378]" />
            </a>

            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="px-6 py-3 rounded-xl bg-[#FFFFFF] text-[#0F1E36] hover:bg-[#F3EFE6] transition-all border border-[#C5A059]/40 tracking-wider uppercase flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <ShieldCheck className="size-4 text-[#C5A059]" />
              <span>Request Private Concierge</span>
            </a>
          </div>

          {/* Micro Trust Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 pt-5 border-t border-[#E8E2D5]/70 text-[11px] text-[#6A7382]">
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="size-3.5 text-[#1E7452]" /> 99.4% Visa Pass Rate
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="size-3.5 text-[#1E7452]" /> Direct Tarmac Ramp Access
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="size-3.5 text-[#1E7452]" /> Virtuoso Preferred Partner
            </span>
            <span className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="size-3.5 text-[#1E7452]" /> Zero-Deductible Supercars
            </span>
          </div>
        </div>

        {/* Embedded 4-in-1 Professional Search Engine */}
        <div className="relative z-20">
          <SearchEngine />
        </div>
      </div>
    </section>
  );
}
