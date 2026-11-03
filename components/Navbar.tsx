"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { 
  Phone, MapPin, Menu, X, ShieldCheck, ArrowRight
} from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [conciergeModalOpen, setConciergeModalOpen] = useState(false);

  const logoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Premium, Subtle GSAP Logo Animation (No color change, elegant hover feel)
  useEffect(() => {
    const logoEl = logoRef.current;
    if (!logoEl) return;

    const handleMouseEnter = () => {
      gsap.to(logoEl, {
        y: -2,
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(logoEl, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    logoEl.addEventListener("mouseenter", handleMouseEnter);
    logoEl.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      logoEl.removeEventListener("mouseenter", handleMouseEnter);
      logoEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen || conciergeModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen, conciergeModalOpen]);

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

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    window.history.pushState({}, "", "/");
  };

  // Smart Dialer & Modal Handler for Desktop vs Mobile
  const handlePhoneClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
      // Mobile par direct dialer open karega bina kisi extra prompt ke
      window.location.href = "tel:+18008422872";
    } else {
      // Desktop par professional modal popup show karega taaki localhost prompt na aaye
      setConciergeModalOpen(true);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Top VIP Micro-Bar */}
        <div className="bg-[#0A101A] text-[#D1D7E0] text-[11px] py-2 px-4 sm:px-8 border-b border-[#C5A059]/20 hidden md:flex items-center justify-between gap-4 whitespace-nowrap tracking-wide shadow-sm">
          <div className="flex items-center gap-4 xl:gap-6 min-w-0">
            <a
              href="https://maps.google.com/?q=Mayfair+London+Dubai+New+York+Geneva"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex items-center gap-1.5 text-[#E5C378] hover:text-white transition-colors font-medium tracking-wider uppercase text-[10px] group cursor-pointer"
            >
              <MapPin className="size-3 text-[#C5A059] shrink-0 group-hover:scale-110 transition-transform" />
              <span>Desks: Mayfair • Dubai • New York • Geneva</span>
            </a>

            <span className="hidden xl:inline text-[#3A4556]">•</span>

            <a
              href="tel:+18008422872"
              onClick={handlePhoneClick}
              className="flex items-center gap-1.5 text-[#B2BAC8] hover:text-white transition-colors group cursor-pointer"
            >
              <Phone className="size-3 text-[#C5A059] shrink-0 group-hover:scale-110 transition-transform" />
              <span>
                24/7 Concierge:{" "}
                <strong className="text-[#FAF8F5] underline underline-offset-2 decoration-[#C5A059]/40 group-hover:decoration-[#C5A059] font-medium">
                  +1 (800) 842-AURA
                </strong>
              </span>
            </a>
          </div>

          <div className="flex items-center gap-4 xl:gap-5 shrink-0">
            <span className="hidden lg:flex items-center gap-1.5 text-[#E5C378] font-medium tracking-wider uppercase text-[10px]">
              Diplomatic & Private Jet Atelier
            </span>
            <span className="hidden lg:inline text-[#3A4556]">|</span>
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
            {/* Logo with GSAP Ref & No Color Change on Hover */}
            <a ref={logoRef} href="/" onClick={handleLogoClick} className="flex flex-col shrink-0 cursor-pointer select-none">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1E36] leading-none">
                AURA<span className="italic font-normal text-[#C5A059]">VOYAGE</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.28em] uppercase text-[#6A7382] mt-0.5">
                Bespoke Luxury Travel
              </span>
            </a>

            {/* Navigation Links */}
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

            {/* Right Action Button & Mobile Drawer Toggle */}
            <div className="flex items-center gap-3 shrink-0">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 border border-[#C5A059]/30 cursor-pointer group"
              >
                <span>BESPOKE JOURNEY</span>
                <ArrowRight className="size-3.5 text-[#E5C378] group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-[#0F1E36] hover:bg-[#F3EFE6] transition-colors border border-[#E8E2D5] cursor-pointer"
                aria-label="Open Navigation Drawer"
              >
                <Menu className="size-5" />
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Sidebar Drawer */}
        <div
          className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
            mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`absolute inset-0 bg-[#0F1E36]/40 backdrop-blur-sm transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside
            className={`absolute top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#FAF8F5] border-l border-[#E8E2D5] shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out ${
              mobileMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
                <a href="/" onClick={handleLogoClick} className="font-serif text-xl font-bold tracking-tight text-[#0F1E36] cursor-pointer">
                  AURA<span className="italic font-normal text-[#C5A059]">VOYAGE</span>
                </a>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-[#0F1E36] hover:bg-[#F3EFE6] transition-colors border border-[#E8E2D5] cursor-pointer"
                  aria-label="Close Navigation Drawer"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="my-5">
                <a
                  href="tel:+18008422872"
                  onClick={handlePhoneClick}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wide shadow-sm border border-[#C5A059]/30 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="size-4 text-[#E5C378]" />
                    <span>Call 24/7 Concierge</span>
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
                    className="py-3 px-3 text-sm font-semibold text-[#141A22] hover:text-[#C5A059] hover:bg-[#F3EFE6] rounded-xl transition-colors flex items-center justify-between group cursor-pointer"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="size-3.5 text-[#C5A059] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E8E2D5]">
              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, "#contact")}
                className="w-full py-3.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <span>BESPOKE JOURNEY</span>
                <ArrowRight className="size-3.5 text-[#E5C378]" />
              </a>
            </div>
          </aside>
        </div>
      </header>

      {/* Professional Popup Modal (Desktop Only) */}
      {conciergeModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-[#0F1E36]/60 backdrop-blur-md transition-opacity"
            onClick={() => setConciergeModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-[#FAF8F5] border border-[#C5A059]/40 rounded-3xl shadow-2xl p-6 sm:p-8 z-10">
            <button
              onClick={() => setConciergeModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#0F1E36] hover:bg-[#F3EFE6] transition-colors cursor-pointer"
            >
              <X className="size-5" />
            </button>

            <div className="text-center">
              <h3 className="font-serif text-2xl font-bold text-[#0F1E36] mb-1 mt-2">
                AuraVoyage Concierge
              </h3>
              <p className="text-[11px] uppercase tracking-[0.25em] text-[#C5A059] font-bold mb-6">
                24/7 Global Diplomatic & Private Desk
              </p>

              <div className="bg-[#F3EFE6] rounded-2xl p-4 mb-6 border border-[#E8E2D5] text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-[#6A7382] font-medium">Direct Hotline:</span>
                  <a href="tel:+18008422872" className="text-sm font-bold text-[#0F1E36] hover:text-[#C5A059] underline">
                    +1 (800) 842-AURA
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#6A7382] font-medium">Global Desks:</span>
                  <span className="text-xs font-semibold text-[#0F1E36]">Mayfair • Dubai • NY • Geneva</span>
                </div>
              </div>

              <p className="text-xs text-[#485363] leading-relaxed mb-6">
                Our Senior Client Director is available around the clock to assist you with bespoke journeys and private aviation arrangements.
              </p>

              <div className="flex gap-3">
                <a
                  href="tel:+18008422872"
                  className="flex-1 py-3 px-4 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Phone className="size-4 text-[#C5A059]" />
                  <span>Call Now</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}