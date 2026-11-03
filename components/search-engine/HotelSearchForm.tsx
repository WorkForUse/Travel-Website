"use client";

import React from "react";
import { MapPin, Users, Star, ArrowUpDown } from "lucide-react";
import { SelectField, DateField, FilterBar } from "./FormField";

interface HotelSearchProps {
  hotelDestination: string;
  setHotelDestination: (val: string) => void;
  hotelCheckIn: string;
  setHotelCheckIn: (val: string) => void;
  hotelCheckOut: string;
  setHotelCheckOut: (val: string) => void;
  hotelGuests: string;
  setHotelGuests: (val: string) => void;
  hotelRatingFilter: string;
  setHotelRatingFilter: (val: string) => void;
  hotelSort: string;
  setHotelSort: (val: any) => void;
  isSearching: boolean;
}

export function HotelSearchForm({
  hotelDestination,
  setHotelDestination,
  hotelCheckIn,
  setHotelCheckIn,
  hotelCheckOut,
  setHotelCheckOut,
  hotelGuests,
  setHotelGuests,
  hotelRatingFilter,
  setHotelRatingFilter,
  hotelSort,
  setHotelSort,
  isSearching,
}: HotelSearchProps) {
  return (
    <div className="space-y-3.5">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-3">
        <SelectField
          label="Destination / Sanctuary"
          icon={<MapPin className="size-3.5 text-[#C5A059]" />}
          value={hotelDestination}
          onChange={setHotelDestination}
          className="col-span-2 lg:col-span-1"
        >
          <option value="All">Worldwide (All 5★ Sanctuaries)</option>
          <option value="Bora Bora">Bora Bora, French Polynesia</option>
          <option value="Japan">Tokyo & Kyoto, Japan</option>
          <option value="France">Antibes & Paris, France</option>
          <option value="United Arab Emirates">Dubai, UAE</option>
        </SelectField>

        <DateField label="Check-In Date" value={hotelCheckIn} onChange={setHotelCheckIn} />
        <DateField label="Check-Out Date" value={hotelCheckOut} onChange={setHotelCheckOut} />
      </div>

      <FilterBar>
        <SelectField
          label="Guests"
          icon={<Users className="size-3.5 text-[#C5A059]" />}
          value={hotelGuests}
          onChange={setHotelGuests}
        >
          <option value="2">2 Guests (Couple)</option>
          <option value="1">1 Guest</option>
          <option value="3">3-4 Guests (Villa)</option>
        </SelectField>

        <SelectField
          label="Category"
          icon={<Star className="size-3.5 text-[#C5A059]" />}
          value={hotelRatingFilter}
          onChange={setHotelRatingFilter}
        >
          <option value="All">All Luxury</option>
          <option value="5-Star">5-Star Palaces</option>
        </SelectField>

        <SelectField
          label="Sort By"
          icon={<ArrowUpDown className="size-3.5 text-[#C5A059]" />}
          value={hotelSort}
          onChange={setHotelSort}
          className="col-span-2 sm:col-span-1"
        >
          <option value="rating">Highest Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </SelectField>
      </FilterBar>
    </div>
  );
}
