"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Plane, Hotel, Car, FileCheck, Search, Calendar, Users, MapPin, 
  ArrowRightLeft, Filter, Check, ChevronRight, Star, Fuel, Gauge, 
  ArrowUpDown, Clock, ShieldCheck, ChevronDown 
} from "lucide-react";
import { 
  MOCK_FLIGHTS, MOCK_HOTELS, MOCK_CARS, MOCK_VISAS 
} from "@/lib/mock-data";
import { BookingModal, BookingTarget } from "@/components/BookingModal";
import { toast } from "sonner";

import { SearchTabs } from "./SearchTabs";
import { FlightSearchForm } from "./FlightSearchForm";
import { HotelSearchForm } from "./HotelSearchForm";
import { CarSearchForm } from "./CarSearchForm";
import { VisaSearchForm } from "./VisaSearchForm";
import { NoDataFoundCard } from "./NoDataFoundCard";

export type ServiceTab = "flights" | "hotels" | "cars" | "visas";

interface SearchEngineProps {
  initialTab?: ServiceTab;
  onSelectBooking?: (item: BookingTarget) => void;
}

export function SearchEngine({ initialTab = "flights" }: SearchEngineProps) {
  const [activeTab, setActiveTab] = useState<ServiceTab>(initialTab);
  const [isSearching, setIsSearching] = useState(false);
  const [flexOpen, setFlexOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingTarget | null>(null);

  // Flight states
  const [flightTripType, setFlightTripType] = useState<"round" | "oneway">("round");
  const [flightFrom, setFlightFrom] = useState("All");
  const [flightTo, setFlightTo] = useState("All");
  const [flightCabin, setFlightCabin] = useState("All");
  const [flightAirline, setFlightAirline] = useState("All");
  const [flightStops, setFlightStops] = useState("All");
  const [flightDate, setFlightDate] = useState("2026-11-20");
  const [flightPassengers, setFlightPassengers] = useState("1");
  const [flightSort, setFlightSort] = useState<"price-asc" | "price-desc" | "duration">("price-asc");

  // Hotel states
  const [hotelDestination, setHotelDestination] = useState("All");
  const [hotelCheckIn, setHotelCheckIn] = useState("2026-11-20");
  const [hotelCheckOut, setHotelCheckOut] = useState("2026-11-27");
  const [hotelGuests, setHotelGuests] = useState("2");
  const [hotelRatingFilter, setHotelRatingFilter] = useState("All");
  const [hotelSort, setHotelSort] = useState<"rating" | "price-asc" | "price-desc">("rating");

  // Car states
  const [carCategory, setCarCategory] = useState("All");
  const [carPickupLocation, setCarPickupLocation] = useState("All");
  const [carTransmission, setCarTransmission] = useState("All");
  const [carStartDate, setCarStartDate] = useState("2026-11-20");
  const [carEndDate, setCarEndDate] = useState("2026-11-25");
  const [carSort, setCarSort] = useState<"price-asc" | "price-desc" | "speed">("price-asc");

  // Visa states
  const [visaCountry, setVisaCountry] = useState("All");
  const [visaCategory, setVisaCategory] = useState("All");
  const [visaSpeed, setVisaSpeed] = useState("All");
  const [visaTravelDate, setVisaTravelDate] = useState("2026-11-20");
  const [showMore, setShowMore] = useState(false);

  const availableDateChips = [
    { date: "2026-11-18", label: "Wed, Nov 18", lowestPrice: "$1,420" },
    { date: "2026-11-19", label: "Thu, Nov 19", lowestPrice: "$2,850" },
    { date: "2026-11-20", label: "Fri, Nov 20", lowestPrice: "$1,420" },
    { date: "2026-11-21", label: "Sat, Nov 21", lowestPrice: "$2,850" },
    { date: "2026-11-22", label: "Sun, Nov 22", lowestPrice: "$2,980" },
    { date: "2026-11-23", label: "Mon, Nov 23", lowestPrice: "$2,850" },
    { date: "2026-11-24", label: "Tue, Nov 24", lowestPrice: "$2,850" },
  ];

  // FILTERED FLIGHTS
  const filteredFlights = useMemo(() => {
    let result = MOCK_FLIGHTS.filter((fl) => {
      if (flightCabin !== "All" && fl.cabinClass !== flightCabin) return false;
      if (flightAirline !== "All" && fl.airline !== flightAirline) return false;
      if (flightStops !== "All" && fl.stops !== flightStops) return false;
      if (flightFrom !== "All" && fl.fromCode !== flightFrom && !fl.fromCity.toLowerCase().includes(flightFrom.toLowerCase())) return false;
      if (flightTo !== "All" && fl.toCode !== flightTo && !fl.toCity.toLowerCase().includes(flightTo.toLowerCase())) return false;
      if (flightDate && fl.availableDates && !fl.availableDates.includes(flightDate)) return false;
      return true;
    });

    if (flightSort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (flightSort === "price-desc") result.sort((a, b) => b.price - a.price);
    else if (flightSort === "duration") result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));

    return result;
  }, [flightCabin, flightAirline, flightStops, flightFrom, flightTo, flightSort, flightDate]);

  // FILTERED HOTELS
  const filteredHotels = useMemo(() => {
    let result = MOCK_HOTELS.filter((ht) => {
      if (hotelDestination !== "All" && !ht.country.toLowerCase().includes(hotelDestination.toLowerCase()) && !ht.destination.toLowerCase().includes(hotelDestination.toLowerCase())) return false;
      if (hotelRatingFilter === "5-Star" && ht.stars < 5) return false;
      return true;
    });

    if (hotelSort === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (hotelSort === "price-asc") result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    else if (hotelSort === "price-desc") result.sort((a, b) => b.pricePerNight - a.pricePerNight);

    return result;
  }, [hotelDestination, hotelRatingFilter, hotelSort]);

  // FILTERED CARS
  const filteredCars = useMemo(() => {
    let result = MOCK_CARS.filter((cr) => {
      if (carCategory !== "All" && cr.category !== carCategory) return false;
      if (carTransmission !== "All" && cr.specs.transmission !== carTransmission) return false;
      return true;
    });

    if (carSort === "price-asc") result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    else if (carSort === "price-desc") result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    else if (carSort === "speed") result.sort((a, b) => parseFloat(a.specs.acceleration) - parseFloat(b.specs.acceleration));

    return result;
  }, [carCategory, carTransmission, carSort]);

  // FILTERED VISAS
  const filteredVisas = useMemo(() => {
    return MOCK_VISAS.filter((vs) => {
      if (visaCountry !== "All" && !vs.country.toLowerCase().includes(visaCountry.toLowerCase())) return false;
      if (visaCategory !== "All" && vs.category !== visaCategory) return false;
      return true;
    });
  }, [visaCountry, visaCategory]);

  const handleResetFilters = () => {
    if (activeTab === "flights") {
      setFlightCabin("All"); setFlightAirline("All"); setFlightStops("All"); setFlightFrom("All"); setFlightTo("All");
    } else if (activeTab === "hotels") {
      setHotelDestination("All"); setHotelRatingFilter("All");
    } else if (activeTab === "cars") {
      setCarCategory("All"); setCarTransmission("All");
    } else if (activeTab === "visas") {
      setVisaCountry("All"); setVisaCategory("All");
    }
    toast.success(`Reset all ${activeTab.toUpperCase()} filters`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      toast.success(`Showing verified availability for ${activeTab.toUpperCase()}`);
    }, 300);
  };

  const selectedChip = availableDateChips.find((c) => c.date === flightDate);

  const limitCount = showMore ? filteredFlights.length : 6;
  const displayedFlights = filteredFlights.slice(0, limitCount);
  const displayedHotels = filteredHotels.slice(0, limitCount);
  const displayedCars = filteredCars.slice(0, limitCount);
  const displayedVisas = filteredVisas.slice(0, limitCount);

  const resultMeta = {
    flights: { title: "Available Flight Itineraries", count: filteredFlights.length, unit: "Options" },
    hotels: { title: "Handpicked 5-Star Sanctuaries", count: filteredHotels.length, unit: "Properties" },
    cars: { title: "Prestige & Exotic Fleet", count: filteredCars.length, unit: "Vehicles" },
    visas: { title: "Global Consular Desks", count: filteredVisas.length, unit: "Regions" },
  }[activeTab];

  return (
    <div id="search-engine" className="w-full max-w-[1440px] mx-auto">
      {/* Search Form Box */}
      <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl shadow-xl p-3.5 sm:p-5 lg:p-6 transition-all">
        <SearchTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <form onSubmit={handleSearch}>
          {activeTab === "flights" && (
            <FlightSearchForm
              flightTripType={flightTripType} setFlightTripType={setFlightTripType}
              flightFrom={flightFrom} setFlightFrom={setFlightFrom}
              flightTo={flightTo} setFlightTo={setFlightTo}
              flightCabin={flightCabin} setFlightCabin={setFlightCabin}
              flightAirline={flightAirline} setFlightAirline={setFlightAirline}
              flightStops={flightStops} setFlightStops={setFlightStops}
              flightDate={flightDate} setFlightDate={setFlightDate}
              flightPassengers={flightPassengers} setFlightPassengers={setFlightPassengers}
              flightSort={flightSort} setFlightSort={setFlightSort}
              isSearching={isSearching}
            />
          )}

          {activeTab === "hotels" && (
            <HotelSearchForm
              hotelDestination={hotelDestination} setHotelDestination={setHotelDestination}
              hotelCheckIn={hotelCheckIn} setHotelCheckIn={setHotelCheckIn}
              hotelCheckOut={hotelCheckOut} setHotelCheckOut={setHotelCheckOut}
              hotelGuests={hotelGuests} setHotelGuests={setHotelGuests}
              hotelRatingFilter={hotelRatingFilter} setHotelRatingFilter={setHotelRatingFilter}
              hotelSort={hotelSort} setHotelSort={setHotelSort}
              isSearching={isSearching}
            />
          )}

          {activeTab === "cars" && (
            <CarSearchForm
              carCategory={carCategory} setCarCategory={setCarCategory}
              carPickupLocation={carPickupLocation} setCarPickupLocation={setCarPickupLocation}
              carTransmission={carTransmission} setCarTransmission={setCarTransmission}
              carStartDate={carStartDate} setCarStartDate={setCarStartDate}
              carEndDate={carEndDate} setCarEndDate={setCarEndDate}
              carSort={carSort} setCarSort={setCarSort}
              isSearching={isSearching}
            />
          )}

          {activeTab === "visas" && (
            <VisaSearchForm
              visaCountry={visaCountry} setVisaCountry={setVisaCountry}
              visaCategory={visaCategory} setVisaCategory={setVisaCategory}
              visaSpeed={visaSpeed} setVisaSpeed={setVisaSpeed}
              visaTravelDate={visaTravelDate} setVisaTravelDate={setVisaTravelDate}
              isSearching={isSearching}
            />
          )}
        </form>
      </div>

      {/* Flexible Dates */}
      {activeTab === "flights" && (
        <div className="mt-4 sm:mt-5 rounded-2xl bg-[#FFFFFF] border border-[#E8E2D5] shadow-sm">
          <button
            type="button"
            onClick={() => setFlexOpen((o) => !o)}
            aria-expanded={flexOpen}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 text-left cursor-pointer md:cursor-default md:pointer-events-none"
          >
            <span className="flex items-center gap-2.5 min-w-0">
              <span className="size-8 rounded-lg bg-[#F3EFE6] flex items-center justify-center shrink-0">
                <Calendar className="size-4 text-[#9E7D3B]" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold text-[#141A22]">
                  Flexible Dates <span className="font-medium text-[#6A7382]">(+/- 3 Days)</span>
                </span>
                <span className="block text-[11px] text-[#6A7382] truncate md:hidden">
                  {selectedChip ? `${selectedChip.label} • from ${selectedChip.lowestPrice}` : "Pick a nearby date"}
                </span>
              </span>
            </span>
            <ChevronDown
              className={`size-4 text-[#C5A059] shrink-0 transition-transform duration-200 md:hidden ${flexOpen ? "rotate-180" : ""}`}
            />
          </button>

          <div className={`${flexOpen ? "grid" : "hidden"} md:grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-2 px-4 pb-4`}>
            {availableDateChips.map((chip) => {
              const [day, ...rest] = chip.label.split(", ");
              const selected = flightDate === chip.date;
              return (
                <button
                  key={chip.date}
                  type="button"
                  onClick={() => {
                    setFlightDate(chip.date);
                    setFlexOpen(false);
                  }}
                  className={`flex flex-col items-center rounded-xl border px-2 py-2.5 transition-all cursor-pointer ${
                    selected
                      ? "bg-[#0F1E36] border-[#0F1E36] text-[#FAF8F5] shadow-sm"
                      : "bg-[#FAF8F5] border-[#E8E2D5] text-[#485363] hover:bg-[#F3EFE6]"
                  }`}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{day}</span>
                  <span className="mt-0.5 text-xs font-bold">{rest.join(", ")}</span>
                  <span className={`mt-1 text-[10px] font-semibold ${selected ? "text-[#E5C378]" : "text-[#1E7452]"}`}>
                    {chip.lowestPrice}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY SECTION */}
      <div className="mt-8 transition-all">
        <div className="mb-5 px-1 space-y-1.5">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 className="font-serif text-lg sm:text-2xl lg:text-3xl font-bold tracking-tight leading-tight text-[#0F1E36]">
              {resultMeta.title}
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold whitespace-nowrap bg-[#F3EFE6] text-[#9E7D3B] border border-[#C5A059]/30">
              {resultMeta.count} {resultMeta.unit}
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#6A7382]">
            Instant guaranteed reservation <span className="mx-1">•</span> 24/7 Dedicated Concierge Support
          </p>
        </div>

        {/* FLIGHT RESULTS (2-Column Grid Layout with guaranteed white background on all screen sizes) */}
        {activeTab === "flights" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {displayedFlights.length === 0 ? (
              <div className="col-span-full">
                <NoDataFoundCard tabName="Flights" onReset={handleResetFilters} />
              </div>
            ) : (
              displayedFlights.map((flight) => (
                <div key={flight.id} className="group relative bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-5 sm:p-6 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between gap-5">
                  <div className="space-y-3.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-xl bg-[#F3EFE6] border border-[#E8E2D5] flex items-center justify-center font-bold text-xs text-[#0F1E36]">
                          {flight.airline.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-base sm:text-lg text-[#0F1E36]">{flight.airline}</h4>
                          <span className="text-xs text-[#6A7382] font-mono">{flight.flightNumber} • {flight.aircraftModel}</span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFE6] text-[#9E7D3B] border border-[#C5A059]/30">
                        {flight.cabinClass}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 items-center text-center sm:text-left gap-2 sm:gap-4">
                      <div>
                        <p className="text-xl sm:text-2xl font-bold font-serif text-[#0F1E36]">{flight.departureTime}</p>
                        <p className="text-xs font-bold text-[#141A22]">{flight.fromCode}</p>
                        <p className="text-[11px] text-[#6A7382] truncate">{flight.fromCity}</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-[11px] text-[#6A7382] mb-0.5">{flight.duration}</span>
                        <div className="w-full flex items-center gap-1">
                          <div className="h-0.5 flex-1 bg-[#E8E2D5]" />
                          <Plane className="size-3.5 text-[#C5A059] rotate-90 shrink-0" />
                          <div className="h-0.5 flex-1 bg-[#E8E2D5]" />
                        </div>
                        <span className="text-[10px] font-bold text-[#1E7452] mt-0.5 uppercase">{flight.stops}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xl sm:text-2xl font-bold font-serif text-[#0F1E36]">{flight.arrivalTime}</p>
                        <p className="text-xs font-bold text-[#141A22]">{flight.toCode}</p>
                        <p className="text-[11px] text-[#6A7382] truncate">{flight.toCity}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
                    <div>
                      <span className="text-[11px] text-[#6A7382] block">All-Inclusive Fares</span>
                      <p className="text-2xl font-bold font-serif text-[#0F1E36]">${flight.price.toLocaleString()}</p>
                    </div>
                    <button onClick={() => setSelectedBooking({ type: "flight", data: flight })} className="px-5 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs uppercase hover:bg-[#1A2E4F] transition-all cursor-pointer">
                      <span>Reserve Seat</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* HOTEL RESULTS */}
        {activeTab === "hotels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedHotels.length === 0 ? (
              <div className="col-span-full"><NoDataFoundCard tabName="Hotels" onReset={handleResetFilters} /></div>
            ) : (
              displayedHotels.map((hotel) => (
                <div key={hotel.id} className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image src={hotel.image} alt={hotel.name} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0F1E36]/80 text-[#FAF8F5]">{hotel.tag}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#0F1E36]">{hotel.name}</h4>
                      <p className="text-xs text-[#6A7382] mt-1">{hotel.roomType}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D5]">
                      <p className="text-xl font-bold font-serif text-[#0F1E36]">${hotel.pricePerNight.toLocaleString()} <span className="text-xs font-normal text-[#6A7382]">/ night</span></p>
                      <button onClick={() => setSelectedBooking({ type: "hotel", data: hotel })} className="px-3.5 py-2 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs uppercase cursor-pointer">Book Suite</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* CAR RESULTS */}
        {activeTab === "cars" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedCars.length === 0 ? (
              <div className="col-span-full"><NoDataFoundCard tabName="Vehicles" onReset={handleResetFilters} /></div>
            ) : (
              displayedCars.map((car) => (
                <div key={car.id} className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image src={car.image} alt={car.name} fill sizes="33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0F1E36]/80 text-[#FAF8F5]">{car.category}</span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#9E7D3B] uppercase">{car.brand}</span>
                      <h4 className="font-serif font-bold text-lg text-[#0F1E36]">{car.name}</h4>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D5]">
                      <p className="text-xl font-bold font-serif text-[#0F1E36]">${car.pricePerDay.toLocaleString()} <span className="text-xs font-normal text-[#6A7382]">/ day</span></p>
                      <button onClick={() => setSelectedBooking({ type: "car", data: car })} className="px-3.5 py-2 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs uppercase cursor-pointer">Reserve Fleet</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* VISA RESULTS */}
        {activeTab === "visas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {displayedVisas.length === 0 ? (
              <div className="col-span-full"><NoDataFoundCard tabName="Visa Regions" onReset={handleResetFilters} /></div>
            ) : (
              displayedVisas.map((visa) => (
                <div key={visa.id} className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-5 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="size-9 rounded-xl bg-[#F3EFE6] flex items-center justify-center text-lg">{visa.flag}</span>
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-[#F3EFE6] text-[#9E7D3B]">{visa.approvalRate} Pass Rate</span>
                    </div>
                    <h4 className="font-serif font-bold text-xl text-[#0F1E36]">{visa.country}</h4>
                    <p className="text-xs text-[#6A7382] mt-0.5">{visa.validity}</p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-[#E8E2D5]">
                    <p className="text-xl font-bold font-serif text-[#0F1E36]">${visa.fee.toLocaleString()} <span className="text-xs font-normal text-[#6A7382]">fee</span></p>
                    <button onClick={() => setSelectedBooking({ type: "visa", data: visa })} className="px-3.5 py-2 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs uppercase cursor-pointer">Apply Now</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Show More / Show Less Toggle Button - Mobile: inside white card */}
        {filteredFlights.length > 6 || filteredHotels.length > 6 || filteredCars.length > 6 || filteredVisas.length > 6 ? (
          <div className="mt-6 flex justify-center sm:hidden">
            <button
              type="button"
              onClick={() => setShowMore(!showMore)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F3EFE6] text-[#0F1E36] font-semibold text-sm hover:bg-[#E8E2D5] transition-colors cursor-pointer shadow-sm border border-[#C5A059]/30"
            >
              {showMore ? (
                <>
                  <span>Show Less</span>
                  <ChevronDown className="size-4 rotate-180" />
                </>
              ) : (
                <>
                  <span>Show More</span>
                  <ChevronDown className="size-4" />
                </>
              )}
            </button>
          </div>
        ) : null}
      </div>

      {/* Desktop: Show More outside white card */}
      {filteredFlights.length > 6 || filteredHotels.length > 6 || filteredCars.length > 6 || filteredVisas.length > 6 ? (
        <div className="hidden sm:flex mt-8 justify-center px-4">
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F3EFE6] text-[#0F1E36] font-semibold text-sm hover:bg-[#E8E2D5] transition-colors cursor-pointer shadow-sm border border-[#C5A059]/30"
          >
            {showMore ? (
              <>
                <span>Show Less</span>
                <ChevronDown className="size-4 rotate-180" />
              </>
            ) : (
              <>
                <span>Show More</span>
                <ChevronDown className="size-4" />
              </>
            )}
          </button>
        </div>
      ) : null}

      <BookingModal item={selectedBooking} onClose={() => setSelectedBooking(null)} />
    </div>
  );
}