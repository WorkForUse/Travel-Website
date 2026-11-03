"use client";

import React, { useState } from "react";
import { Search, Users, PlaneTakeoff, PlaneLanding } from "lucide-react";
import { SearchModal } from "./SearchModal";
import { SelectField, DateField, fieldBox, labelCls } from "./FormField";

const TRIP_OPTIONS = [
  { value: "round", label: "Round Trip" },
  { value: "oneway", label: "One Way" },
] as const;

export function FlightSearchForm({
  flightTripType,
  setFlightTripType,
  flightFrom,
  setFlightFrom,
  flightTo,
  setFlightTo,
  flightCabin,
  setFlightCabin,
  flightDate,
  setFlightDate,
  flightPassengers,
  setFlightPassengers,
  isSearching,
}: any) {
  const [modalType, setModalType] = useState<"origin" | "arrival" | null>(null);
  const [fromLabel, setFromLabel] = useState(flightFrom === "All" ? "All Global Hubs" : flightFrom);
  const [toLabel, setToLabel] = useState(flightTo === "All" ? "All Destinations" : flightTo);

  return (
    <div className="space-y-3">
      {/* Trip type + travelers */}
      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="radiogroup"
          aria-label="Trip type"
          className="grid grid-cols-2 gap-1 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] p-1 sm:inline-grid"
        >
          {TRIP_OPTIONS.map((opt) => {
            const active = flightTripType === opt.value;
            return (
              <label
                key={opt.value}
                className={`cursor-pointer select-none rounded-lg px-5 py-2 text-center text-xs font-semibold transition-all focus-within:ring-2 focus-within:ring-[#C5A059]/40 ${
                  active ? "bg-[#0F1E36] text-[#FAF8F5] shadow-sm" : "text-[#6A7382] hover:text-[#0F1E36]"
                }`}
              >
                <input
                  type="radio"
                  name="flightType"
                  className="sr-only"
                  checked={active}
                  onChange={() => setFlightTripType(opt.value)}
                />
                {opt.label}
              </label>
            );
          })}
        </div>

        <SelectField
          variant="inline"
          label="Travelers"
          icon={<Users className="size-3.5 text-[#C5A059]" />}
          value={flightPassengers}
          onChange={setFlightPassengers}
        >
          <option value="1">1 Adult (Solo)</option>
          <option value="2">2 Adults</option>
          <option value="3">3+ Group</option>
        </SelectField>
      </div>

      {/* Primary fields: stacked airports on mobile, 4 equal columns on desktop */}
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <button
          type="button"
          onClick={() => setModalType("origin")}
          className={`${fieldBox} group col-span-2 w-full cursor-pointer text-left hover:border-[#C5A059] sm:col-span-1`}
        >
          <span className={labelCls}>
            <PlaneTakeoff className="size-3.5 text-[#C5A059]" />
            Origin Airport
          </span>
          <span className="mt-1.5 flex items-center justify-between gap-2">
            <span className="truncate text-[13px] font-semibold text-[#141A22] sm:text-sm">{fromLabel}</span>
            <Search className="size-4 shrink-0 text-[#C5A059] transition-transform group-hover:scale-110" />
          </span>
        </button>

        <button
          type="button"
          onClick={() => setModalType("arrival")}
          className={`${fieldBox} group col-span-2 w-full cursor-pointer text-left hover:border-[#C5A059] sm:col-span-1`}
        >
          <span className={labelCls}>
            <PlaneLanding className="size-3.5 text-[#C5A059]" />
            Arrival Airport
          </span>
          <span className="mt-1.5 flex items-center justify-between gap-2">
            <span className="truncate text-[13px] font-semibold text-[#141A22] sm:text-sm">{toLabel}</span>
            <Search className="size-4 shrink-0 text-[#C5A059] transition-transform group-hover:scale-110" />
          </span>
        </button>

        <DateField label="Departure Date" value={flightDate} onChange={setFlightDate} />

        <SelectField label="Cabin Class" value={flightCabin} onChange={setFlightCabin}>
          <option value="All">All Cabins</option>
          <option value="Business">Business Class</option>
          <option value="First Class">First Class</option>
          <option value="Premium Economy">Premium Economy</option>
        </SelectField>
      </div>

      <SearchModal
        isOpen={modalType !== null}
        onClose={() => setModalType(null)}
        title={modalType === "origin" ? "Select Departure Airport" : "Select Arrival Airport"}
        onSelect={(code, label) => {
          if (modalType === "origin") {
            setFlightFrom(code);
            setFromLabel(label);
          } else {
            setFlightTo(code);
            setToLabel(label);
          }
        }}
      />
    </div>
  );
}