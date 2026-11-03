"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      
      // Calculate scroll percentage (0 to 100)
      if (totalHeight > 0) {
        const progress = (currentScroll / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Show button after scrolling past 350px
      if (currentScroll > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // SVG Circle parameters for progress ring
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center size-12 sm:size-13 rounded-full bg-[#0A101A]/95 hover:bg-[#0F1E36] text-[#E5C378] border border-[#C5A059]/40 hover:border-[#E5C378] shadow-2xl backdrop-blur-md transition-all duration-300 ease-out group cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-4 scale-90 pointer-events-none"
      }`}
    >
      {/* SVG Scroll Progress Border Ring */}
      <svg className="absolute inset-0 size-full -rotate-90 pointer-events-none p-1" viewBox="0 0 52 52">
        {/* Background Track Circle */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#1E293B"
          strokeWidth="2.5"
        />
        {/* Animated Progress Fill Circle */}
        <circle
          cx="26"
          cy="26"
          r={radius}
          fill="none"
          stroke="#C5A059"
          strokeWidth="2.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.1s linear" }}
        />
      </svg>

      {/* Subtle luxury ambient gold glow */}
      <span className="absolute inset-0 rounded-full bg-[#C5A059]/15 blur-md group-hover:bg-[#C5A059]/30 transition-all pointer-events-none" />

      {/* Up Arrow Icon with upward hover float */}
      <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-1 text-[#E5C378] group-hover:text-[#FFF8F0] relative z-10" />

      {/* Floating tooltip on hover (desktop only) */}
      <span className="pointer-events-none absolute right-full mr-3 px-2.5 py-1 rounded-lg bg-[#0A101A] text-[#FAF8F5] text-[11px] font-medium tracking-wider uppercase border border-[#C5A059]/35 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:inline-block whitespace-nowrap">
        Back to Top
      </span>
    </button>
  );
}