"use client";

import React from "react";

interface NoDataProps {
  tabName: string;
  dateSummary?: string;
  onReset: () => void;
}

export function NoDataFoundCard({ tabName, dateSummary, onReset }: NoDataProps) {
  return (
    <div className="w-full col-span-full p-6 sm:p-10 text-center bg-[#FFFFFF] rounded-3xl border border-[#E8E2D5] shadow-sm my-4 space-y-4 animate-in fade-in duration-300">
      <div className="relative size-20 sm:size-24 mx-auto flex items-center justify-center">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="60" cy="60" r="50" fill="#FAF8F5" stroke="#E8E2D5" strokeWidth="2" />
          <rect x="38" y="38" width="44" height="44" rx="12" fill="#F3EFE6" stroke="#C5A059" strokeWidth="2" />
          <line x1="48" y1="50" x2="72" y2="50" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
          <circle cx="52" cy="62" r="2.5" fill="#0F1E36" />
          <circle cx="68" cy="62" r="2.5" fill="#0F1E36" />
          <path d="M52 71C56 68 64 68 68 71" stroke="#0F1E36" strokeWidth="2" strokeLinecap="round" />
          <line x1="78" y1="78" x2="94" y2="94" stroke="#C5A059" strokeWidth="3.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-md mx-auto space-y-1.5">
        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-[#FAF8F5] text-[#9E7D3B] border border-[#E8E2D5] inline-block">
          No Inventory Found
        </span>
        <h4 className="font-serif text-lg sm:text-2xl font-bold text-[#0F1E36]">
          No Available {tabName} For Selected Dates
        </h4>
        <p className="text-xs sm:text-sm text-[#6A7382] leading-relaxed">
          There are currently no verified inventory allotments matching your specific travel dates {dateSummary ? `(${dateSummary})` : ""} or route filters.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 border border-[#C5A059]/30 cursor-pointer"
        >
          Reset Filters & Show All {tabName}
        </button>
      </div>
    </div>
  );
}