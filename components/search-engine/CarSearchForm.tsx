"use client";

import React from "react";
import { MapPin, Fuel, ArrowUpDown } from "lucide-react";
import { SelectField, DateField, FilterBar } from "./FormField";

interface CarSearchProps {
  carCategory: string;
  setCarCategory: (val: string) => void;
  carPickupLocation: string;
  setCarPickupLocation: (val: string) => void;
  carTransmission: string;
  setCarTransmission: (val: string) => void;
  carStartDate: string;
  setCarStartDate: (val: string) => void;
  carEndDate: string;
  setCarEndDate: (val: string) => void;
  carSort: string;
  setCarSort: (val: any) => void;
  isSearching: boolean;
}

export function CarSearchForm({
  carCategory,
  setCarCategory,
  carPickupLocation,
  setCarPickupLocation,
  carTransmission,
  setCarTransmission,
  carStartDate,
  setCarStartDate,
  carEndDate,
  setCarEndDate,
  carSort,
  setCarSort,
  isSearching,
}: CarSearchProps) {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        <SelectField
          label="Fleet Category"
          value={carCategory}
          onChange={setCarCategory}
          className="col-span-2 lg:col-span-1"
        >
          <option value="All">All Prestige Vehicles</option>
          <option value="Exotic Supercar">Exotic Supercars</option>
          <option value="Luxury Sedan">Luxury Sedans</option>
          <option value="Executive SUV">Executive SUVs</option>
        </SelectField>

        <DateField label="Pickup Date" value={carStartDate} onChange={setCarStartDate} />
        <DateField label="Return Date" value={carEndDate} onChange={setCarEndDate} />
      </div>

      <FilterBar>
        <SelectField
          label="Delivery"
          icon={<MapPin className="size-3.5 text-[#C5A059]" />}
          value={carPickupLocation}
          onChange={setCarPickupLocation}
        >
          <option value="All">Airport Tarmac</option>
          <option value="Hotel">5-Star Hotel / Villa</option>
        </SelectField>

        <SelectField
          label="Transmission"
          icon={<Fuel className="size-3.5 text-[#C5A059]" />}
          value={carTransmission}
          onChange={setCarTransmission}
        >
          <option value="All">All Types</option>
          <option value="Automatic">Automatic</option>
        </SelectField>

        <SelectField
          label="Sort By"
          icon={<ArrowUpDown className="size-3.5 text-[#C5A059]" />}
          value={carSort}
          onChange={setCarSort}
          className="col-span-2 sm:col-span-1"
        >
          <option value="price-asc">Rate: Low to High</option>
          <option value="price-desc">Rate: High to Low</option>
        </SelectField>
      </FilterBar>
    </div>
  );
}
