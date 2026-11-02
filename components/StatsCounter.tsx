"use client";

import React, { useEffect, useRef } from "react";
import { Award, Globe, Users, Clock } from "lucide-react";
import { MOCK_STATS } from "@/lib/mock-data";

export function StatsCounter() {
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    // Smooth number animation when in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            countRefs.current.forEach((el, index) => {
              if (!el) return;
              const targetStat = MOCK_STATS[index];
              if (!targetStat) return;

              let start = 0;
              const end = targetStat.value;
              const duration = 1500;
              const isDecimal = end % 1 !== 0;
              const startTime = performance.now();

              const animateCount = (now: number) => {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                // easeOutQuad
                const ease = 1 - (1 - progress) * (1 - progress);
                const current = start + (end - start) * ease;

                if (isDecimal) {
                  el.innerText = current.toFixed(1);
                } else {
                  el.innerText = Math.floor(current).toLocaleString();
                }

                if (progress < 1) {
                  requestAnimationFrame(animateCount);
                } else {
                  el.innerText = isDecimal ? end.toFixed(1) : end.toLocaleString();
                }
              };

              requestAnimationFrame(animateCount);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    const target = countRefs.current[0]?.closest("section");
    if (target) observer.observe(target);

    return () => observer.disconnect();
  }, []);

  const icons = [Users, Award, Globe, Clock];

  return (
    <section className="py-8 sm:py-12 relative bg-[#FAF8F5] border-b border-[#E8E2D5]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {MOCK_STATS.map((stat, idx) => {
            const IconComponent = icons[idx] || Award;
            return (
              <div
                key={idx}
                className="relative group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-5 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="size-11 sm:size-12 rounded-2xl bg-[#F3EFE6] text-[#C5A059] border border-[#C5A059]/20 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-[#0F1E36] group-hover:text-[#E5C378] transition-all duration-300">
                  <IconComponent className="size-5" />
                </div>

                <div>
                  <div className="flex items-baseline gap-1 font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0F1E36]">
                    <span
                      ref={(el) => {
                        countRefs.current[idx] = el;
                      }}
                    >
                      {stat.value.toLocaleString()}
                    </span>
                    <span className="text-[#C5A059] font-normal">{stat.suffix}</span>
                  </div>

                  <h4 className="font-semibold text-xs sm:text-base text-[#141A22] mt-1.5">
                    {stat.label}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#6A7382] mt-0.5">
                    {stat.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
