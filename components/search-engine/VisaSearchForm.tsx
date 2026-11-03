"use client";

import React from "react";
import { Clock, ShieldCheck } from "lucide-react";
import { SelectField, DateField } from "./FormField";

interface VisaSearchProps {
  visaCountry: string;
  setVisaCountry: (val: string) => void;
  visaCategory: string;
  setVisaCategory: (val: string) => void;
  visaSpeed: string;
  setVisaSpeed: (val: string) => void;
  visaTravelDate: string;
  setVisaTravelDate: (val: string) => void;
  isSearching: boolean;
}

export function VisaSearchForm({
  visaCountry,
  setVisaCountry,
  visaCategory,
  setVisaCategory,
  visaSpeed,
  setVisaSpeed,
  visaTravelDate,
  setVisaTravelDate,
  isSearching,
}: VisaSearchProps) {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        <SelectField
          label="Destination Region"
          value={visaCountry}
          onChange={setVisaCountry}
          className="col-span-2 lg:col-span-1"
        >
          <option value="All">All Global Visa Desks</option>
          <option value="Schengen">Schengen Area (29 Countries)</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="United States">United States</option>
        </SelectField>

        <DateField label="Target Travel Date" value={visaTravelDate} onChange={setVisaTravelDate} />

        <SelectField label="Processing Speed" value={visaSpeed} onChange={setVisaSpeed}>
          <option value="All">All Speed Options</option>
          <option value="express">Express VIP (24-48 Hours)</option>
          <option value="standard">Standard Fast-Track</option>
        </SelectField>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-[#E8E2D5]/70 bg-[#FAF8F5] px-3.5 py-2.5 text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-2 text-[#6A7382]">
          <Clock className="mt-0.5 size-3.5 shrink-0 text-[#C5A059]" />
          <span>Guaranteed consular appointment slots reserved.</span>
        </div>
        <div className="flex items-start gap-2 font-semibold text-[#1E7452]">
          <ShieldCheck className="mt-0.5 size-3.5 shrink-0" />
          <span>Zero refusal fee insurance included</span>
        </div>
      </div>
    </div>
  );
}
