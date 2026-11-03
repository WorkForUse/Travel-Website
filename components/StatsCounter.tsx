"use client";

import React, { useEffect, useRef, useState } from "react";
import { Award, Globe, Users, Clock } from "lucide-react";
import { MOCK_STATS } from "@/lib/mock-data";

const COUNT_DURATION = 1200; // ms — fast and snappy counter duration
const STAGGER = 40; // ms between cards for quick sequence

// Gentle ease-out: starts calmly, settles softly on the final number
const easeOutQuad = (t: number) => 1 - (1 - t) * (1 - t);

const formatValue = (n: number, decimal: boolean) =>
  decimal ? n.toFixed(1) : Math.round(n).toLocaleString();

const icons = [Users, Award, Globe, Clock];

export function StatsCounter() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const [revealed, setRevealed] = useState<boolean[]>(() => MOCK_STATS.map(() => false));

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const frames: number[] = [];

    const runCount = (idx: number) => {
      const el = countRefs.current[idx];
      const stat = MOCK_STATS[idx];
      if (!el || !stat) return;

      const end = stat.value;
      const decimal = end % 1 !== 0;

      if (reduceMotion) {
        el.textContent = formatValue(end, decimal);
        return;
      }

      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / COUNT_DURATION, 1);
        el.textContent = formatValue(end * easeOutQuad(progress), decimal);
        if (progress < 1) frames[idx] = requestAnimationFrame(tick);
      };
      frames[idx] = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) =>
              Number((a.target as HTMLElement).dataset.index) -
              Number((b.target as HTMLElement).dataset.index)
          );

        visible.forEach((entry, order) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          observer.unobserve(entry.target);

          timers.push(
            setTimeout(() => {
              setRevealed((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
              runCount(idx);
            }, reduceMotion ? 0 : order * STAGGER)
          );
        });
      },
      { threshold: 0.01, rootMargin: "0px 0px 30% 0px" } // Triggers early as soon as it comes into view
    );

    cardRefs.current.forEach((el) => el && observer.observe(el));

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
      frames.forEach(cancelAnimationFrame);
    };
  }, []);

  return (
    <section
      aria-label="Our achievements"
      className="relative border-b border-[#E8E2D5]/60 bg-[#FAF8F5] py-10 sm:py-14 lg:py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-8">
          {MOCK_STATS.map((stat, idx) => {
            const IconComponent = icons[idx] || Award;
            const decimal = stat.value % 1 !== 0;

            return (
              <div
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
                data-index={idx}
                className={`transition-all duration-300 ease-out motion-reduce:transition-none ${
                  revealed[idx] ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
              >
                <div className="group flex h-full flex-col rounded-2xl border border-[#E8E2D5] bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#C5A059]/40 hover:shadow-md sm:p-6 lg:p-7">
                  <div className="mb-3 flex size-9 items-center justify-center rounded-xl border border-[#C5A059]/20 bg-[#F4EFE6] text-[#C5A059] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#0F1E36] group-hover:text-[#E5C378] sm:mb-5 sm:size-11">
                    <IconComponent className="size-4 stroke-[1.75] sm:size-5" />
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-0.5 whitespace-nowrap font-sans text-2xl font-bold tracking-tight text-[#0F1E36] tabular-nums sm:gap-1 sm:text-4xl">
                      <span
                        ref={(el) => {
                          countRefs.current[idx] = el;
                        }}
                      >
                        {formatValue(0, decimal)}
                      </span>
                      <span className="text-lg font-medium text-[#C5A059] sm:text-3xl">
                        {stat.suffix}
                      </span>
                    </div>

                    <h4 className="mt-1.5 text-[13px] font-semibold leading-snug text-[#0F1E36] sm:mt-2 sm:text-base">
                      {stat.label}
                    </h4>
                    <p className="mt-1 text-[11px] leading-relaxed text-[#6A7382] sm:text-xs">
                      {stat.detail}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}