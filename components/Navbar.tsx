"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Phone, MapPin, Menu, X, ShieldCheck, ArrowRight, Crown
} from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Search & Book", href: "#search-engine" },
    { label: "Destinations", href: "#destinations" },
    { label: "Packages", href: "#packages" },
    { label: "Why Choose Us", href: "#why-us" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top VIP Micro-Bar in Midnight Navy with Fine Champagne Gold Hairline */}
      <div className="bg-[#0A101A] text-[#D1D7E0] text-[11px] py-1.5 px-4 sm:px-8 border-b border-[#C5A059]/20 hidden md:flex items-center justify-between tracking-wide">
        {/* Left Side: Clickable Locations & Dialer */}
        <div className="flex items-center gap-6">
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="flex items-center gap-1.5 text-[#E5C378] hover:text-[#FAF8F5] transition-colors font-medium tracking-wider uppercase text-[10px] group cursor-pointer"
            title="AuraVoyage Global Diplomatic Desks"
          >
            <MapPin className="size-3 text-[#C5A059] shrink-0" />
            <span>Desks: Mayfair • Dubai • New York • Geneva</span>
          </a>

          <span className="text-[#3A4556]">•</span>

          <a
            href="tel:+18008422872"
            className="flex items-center gap-1.5 text-[#B2BAC8] hover:text-[#FAF8F5] transition-colors group cursor-pointer"
            title="Call 24/7 Global Concierge"
          >
            <Phone className="size-3 text-[#C5A059] shrink-0" />
            <span>
              24/7 Concierge:{" "}
              <strong className="text-[#FAF8F5] underline underline-offset-2 decoration-[#C5A059]/40 group-hover:decoration-[#C5A059] font-medium">
                +1 (800) 842-AURA
              </strong>
            </span>
          </a>
        </div>

        {/* Right Side: Trust & Accreditations */}
        <div className="flex items-center gap-5">
          <span className="flex items-center gap-1.5 text-[#E5C378] font-medium tracking-wider uppercase text-[10px]">
            <Crown className="size-3 text-[#C5A059]" /> Diplomatic & Private Jet Atelier
          </span>

          <span className="text-[#3A4556]">|</span>

          <span className="text-[#D4AF37] font-medium flex items-center gap-1.5 text-[11px] whitespace-nowrap">
            <ShieldCheck className="size-3.5 text-[#C5A059]" /> 100% ATOL & IATA Protected
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`px-4 sm:px-8 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF8F5]/98 backdrop-blur-xl border-b border-[#E8E2D5] shadow-md shadow-[#0F1E36]/5 py-3"
            : "bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D5]/70 py-3.5 sm:py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 lg:gap-8">
          {/* Text-Only Logo (Icon removed as requested) */}
          <Link href="/" className="group flex flex-col shrink-0">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1E36] leading-none group-hover:text-[#9F7E3B] transition-colors">
              AURA<span className="italic font-normal text-[#C5A059]">VOYAGE</span>
            </span>
            <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#6A7382] mt-0.5">
              Bespoke Luxury Travel
            </span>
          </Link>

          {/* Navigation Links — VISIBLE ON LAPTOPS & DESKTOPS */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="relative py-1 text-xs font-bold text-[#485363] hover:text-[#0F1E36] transition-colors duration-150 whitespace-nowrap cursor-pointer tracking-wide group"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C5A059] transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 border border-[#C5A059]/30 cursor-pointer group"
            >
              <span>Design Itinerary</span>
              <ArrowRight className="size-3.5 text-[#E5C378] group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Mobile / Tablet Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#0F1E36] hover:bg-[#F3EFE6] transition-colors border border-[#E8E2D5] cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[60px] sm:top-[68px] bg-[#FAF8F5] border-b border-[#E8E2D5] shadow-2xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="pb-4 mb-3 border-b border-[#E8E2D5]">
            <a
              href="tel:+18008422872"
              className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wide"
            >
              <span className="flex items-center gap-2">
                <Phone className="size-4 text-[#E5C378]" />
                <span>Call 24/7 Global Concierge</span>
              </span>
              <ArrowRight className="size-4 text-[#E5C378]" />
            </a>
          </div>

          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                className="py-3 px-3 text-sm font-semibold text-[#141A22] hover:text-[#C5A059] hover:bg-[#F3EFE6] rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 mt-3 border-t border-[#E8E2D5]">
            <a
              href="#contact"
              onClick={(e) => scrollToSection(e, "#contact")}
              className="w-full py-3 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2"
            >
              <span>Request Private Consultation</span>
              <ArrowRight className="size-3.5 text-[#E5C378]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
