"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { 
  Plane, Hotel, Car, FileCheck, Search, Calendar, Users, MapPin, 
  ArrowRightLeft, Filter, Check, ChevronRight, Star, Fuel, Gauge, 
  ArrowUpDown, SlidersHorizontal, Clock, ShieldCheck, CalendarX
} from "lucide-react";
import { 
  MOCK_FLIGHTS, MOCK_HOTELS, MOCK_CARS, MOCK_VISAS,
  FlightItem, HotelItem, CarItem, VisaItem 
} from "@/lib/mock-data";
import { BookingModal, BookingTarget } from "@/components/BookingModal";
import { toast } from "sonner";

type ServiceTab = "flights" | "hotels" | "cars" | "visas";

interface SearchEngineProps {
  initialTab?: ServiceTab;
  onSelectBooking?: (item: BookingTarget) => void;
}

const AIRPORT_OPTIONS = [
  { code: "JFK", label: "New York (JFK)" },
  { code: "LHR", label: "London (LHR)" },
  { code: "DXB", label: "Dubai (DXB)" },
  { code: "SIN", label: "Singapore (SIN)" },
  { code: "CDG", label: "Paris (CDG)" },
  { code: "HND", label: "Tokyo (HND)" },
  { code: "ZRH", label: "Zurich (ZRH)" },
  { code: "DOH", label: "Doha (DOH)" },
  { code: "AUH", label: "Abu Dhabi (AUH)" },
  { code: "TEB", label: "New York Teterboro Private (TEB)" },
  { code: "GVA", label: "Geneva Cointrin Private (GVA)" },
  { code: "IAD", label: "Washington DC (IAD)" },
  { code: "EWR", label: "Newark Liberty (EWR)" },
];

function NoDataFoundCard({
  tabName,
  dateSummary,
  onReset,
}: {
  tabName: string;
  dateSummary?: string;
  onReset: () => void;
}) {
  return (
    <div className="w-full col-span-full p-8 sm:p-12 text-center bg-[#FFFFFF] rounded-3xl border border-[#E8E2D5] shadow-sm my-3 space-y-4">
      <div className="size-14 rounded-2xl bg-[#F3EFE6] text-[#C5A059] border border-[#C5A059]/30 mx-auto flex items-center justify-center">
        <CalendarX className="size-7" />
      </div>
      <div>
        <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-[0.2em] uppercase bg-[#FAF8F5] text-[#9E7D3B] border border-[#E8E2D5] inline-block mb-2">
          No Such Data Found
        </span>
        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F1E36]">
          No Available {tabName} Found For Selected Dates
        </h4>
        <p className="text-xs sm:text-sm text-[#6A7382] max-w-md mx-auto mt-1.5 leading-relaxed">
          There are currently no verified inventory allotments matching your specific travel dates {dateSummary ? `(${dateSummary})` : ""} or route filters. Try adjusting your dates or resetting filters to browse all available options.
        </p>
      </div>
      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="px-6 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 border border-[#C5A059]/30 cursor-pointer"
        >
          Reset Filters & Show All {tabName}
        </button>
      </div>
    </div>
  );
}

export function SearchEngine({ initialTab = "flights" }: SearchEngineProps) {
  const [activeTab, setActiveTab] = useState<ServiceTab>(initialTab);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingTarget | null>(null);

  // Flight search form state
  const [flightTripType, setFlightTripType] = useState<"round" | "oneway">("round");
  const [flightFrom, setFlightFrom] = useState("All");
  const [flightTo, setFlightTo] = useState("All");
  const [flightCabin, setFlightCabin] = useState("All");
  const [flightAirline, setFlightAirline] = useState("All");
  const [flightStops, setFlightStops] = useState("All");
  const [flightDate, setFlightDate] = useState("2026-11-20");
  const [flightReturnDate, setFlightReturnDate] = useState("2026-11-27");
  const [flightPassengers, setFlightPassengers] = useState("1");
  const [flightSort, setFlightSort] = useState<"price-asc" | "price-desc" | "duration">("price-asc");

  // Hotel search form state
  const [hotelDestination, setHotelDestination] = useState("All");
  const [hotelCheckIn, setHotelCheckIn] = useState("2026-11-20");
  const [hotelCheckOut, setHotelCheckOut] = useState("2026-11-27");
  const [hotelGuests, setHotelGuests] = useState("2");
  const [hotelRatingFilter, setHotelRatingFilter] = useState("All");
  const [hotelSort, setHotelSort] = useState<"rating" | "price-asc" | "price-desc">("rating");

  // Car search form state
  const [carCategory, setCarCategory] = useState("All");
  const [carPickupLocation, setCarPickupLocation] = useState("All");
  const [carTransmission, setCarTransmission] = useState("All");
  const [carStartDate, setCarStartDate] = useState("2026-11-20");
  const [carEndDate, setCarEndDate] = useState("2026-11-25");
  const [carSort, setCarSort] = useState<"price-asc" | "price-desc" | "speed">("price-asc");

  // Visa search form state
  const [visaCountry, setVisaCountry] = useState("All");
  const [visaCategory, setVisaCategory] = useState("All");
  const [visaSpeed, setVisaSpeed] = useState("All");
  const [visaTravelDate, setVisaTravelDate] = useState("2026-11-20");

  // Interactive flexible date chips for flight search
  const availableDateChips = [
    { date: "2026-11-18", label: "Wed, Nov 18", lowestPrice: "$1,420" },
    { date: "2026-11-19", label: "Thu, Nov 19", lowestPrice: "$2,850" },
    { date: "2026-11-20", label: "Fri, Nov 20", lowestPrice: "$1,420", isCurrent: true },
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
      if (flightDate && !fl.availableDates.includes(flightDate)) return false;
      return true;
    });

    if (flightSort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (flightSort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (flightSort === "duration") {
      result.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
    }

    return result;
  }, [flightCabin, flightAirline, flightStops, flightFrom, flightTo, flightSort, flightDate]);

  // FILTERED HOTELS (With Stay Dates & Destination Check)
  const filteredHotels = useMemo(() => {
    let result = MOCK_HOTELS.filter((ht) => {
      if (hotelDestination !== "All" && !ht.country.toLowerCase().includes(hotelDestination.toLowerCase()) && !ht.destination.toLowerCase().includes(hotelDestination.toLowerCase())) {
        return false;
      }
      if (hotelRatingFilter === "5-Star" && ht.stars < 5) return false;
      // Date verification against luxury sanctuary season allotment
      if (hotelCheckIn && (hotelCheckIn < ht.availableFrom || hotelCheckIn > ht.availableTo)) {
        return false;
      }
      return true;
    });

    if (hotelSort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (hotelSort === "price-asc") {
      result.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (hotelSort === "price-desc") {
      result.sort((a, b) => b.pricePerNight - a.pricePerNight);
    }

    return result;
  }, [hotelDestination, hotelRatingFilter, hotelSort, hotelCheckIn]);

  // FILTERED CARS (With Delivery Date Check)
  const filteredCars = useMemo(() => {
    let result = MOCK_CARS.filter((cr) => {
      if (carCategory !== "All" && cr.category !== carCategory) return false;
      if (carTransmission !== "All" && cr.specs.transmission !== carTransmission) return false;
      // Date verification against fleet season allotment
      if (carStartDate && (carStartDate < cr.availableFrom || carStartDate > cr.availableTo)) {
        return false;
      }
      return true;
    });

    if (carSort === "price-asc") {
      result.sort((a, b) => a.pricePerDay - b.pricePerDay);
    } else if (carSort === "price-desc") {
      result.sort((a, b) => b.pricePerDay - a.pricePerDay);
    } else if (carSort === "speed") {
      result.sort((a, b) => parseFloat(a.specs.acceleration) - parseFloat(b.specs.acceleration));
    }

    return result;
  }, [carCategory, carTransmission, carSort, carStartDate]);

  // FILTERED VISAS
  const filteredVisas = useMemo(() => {
    return MOCK_VISAS.filter((vs) => {
      if (visaCountry !== "All" && !vs.country.toLowerCase().includes(visaCountry.toLowerCase())) return false;
      if (visaCategory !== "All" && vs.category !== visaCategory) return false;
      if (visaSpeed === "express" && !vs.expressProcessing.toLowerCase().includes("hours") && !vs.expressProcessing.toLowerCase().includes("express")) {
        return false;
      }
      return true;
    });
  }, [visaCountry, visaCategory, visaSpeed]);

  const handleResetFilters = () => {
    if (activeTab === "flights") {
      setFlightCabin("All");
      setFlightAirline("All");
      setFlightStops("All");
      setFlightFrom("All");
      setFlightTo("All");
      setFlightDate("2026-11-20");
    } else if (activeTab === "hotels") {
      setHotelDestination("All");
      setHotelRatingFilter("All");
      setHotelCheckIn("2026-11-20");
      setHotelCheckOut("2026-11-27");
    } else if (activeTab === "cars") {
      setCarCategory("All");
      setCarTransmission("All");
      setCarStartDate("2026-11-20");
      setCarEndDate("2026-11-25");
    } else if (activeTab === "visas") {
      setVisaCountry("All");
      setVisaCategory("All");
      setVisaSpeed("All");
      setVisaTravelDate("2026-11-20");
    }
    toast.success(`Reset all ${activeTab.toUpperCase()} filters to default`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      toast.success(`Showing verified availability for ${activeTab.toUpperCase()}`);
    }, 350);
  };

  const swapFlightAirports = () => {
    if (flightFrom === "All" && flightTo === "All") {
      toast.info("Select specific departure and arrival airports to swap.");
      return;
    }
    const currentFrom = flightFrom;
    const currentTo = flightTo;
    setFlightFrom(currentTo);
    setFlightTo(currentFrom);
    toast.success(`Route swapped: ${currentTo === "All" ? "All Origins" : currentTo} ⇄ ${currentFrom === "All" ? "All Destinations" : currentFrom}`);
  };

  return (
    <div id="search-engine" className="w-full max-w-6xl mx-auto">
      {/* Search Container with Clean Architectural Luxury Card */}
      <div className="bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl shadow-xl shadow-[#0F1E36]/6 p-5 sm:p-8 transition-all">
        {/* Service Switcher Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D5] pb-5 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("flights")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "flights"
                ? "bg-[#0F1E36] text-[#FAF8F5] shadow-md shadow-[#0F1E36]/20 scale-[1.01]"
                : "text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6]"
            }`}
          >
            <Plane className="size-4 text-[#C5A059]" />
            <span>Flight Ticket Booking</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("hotels")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "hotels"
                ? "bg-[#0F1E36] text-[#FAF8F5] shadow-md shadow-[#0F1E36]/20 scale-[1.01]"
                : "text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6]"
            }`}
          >
            <Hotel className="size-4 text-[#C5A059]" />
            <span>Hotel Booking</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("cars")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "cars"
                ? "bg-[#0F1E36] text-[#FAF8F5] shadow-md shadow-[#0F1E36]/20 scale-[1.01]"
                : "text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6]"
            }`}
          >
            <Car className="size-4 text-[#C5A059]" />
            <span>Car Rental</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("visas")}
            className={`flex items-center gap-2.5 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
              activeTab === "visas"
                ? "bg-[#0F1E36] text-[#FAF8F5] shadow-md shadow-[#0F1E36]/20 scale-[1.01]"
                : "text-[#6A7382] hover:text-[#0F1E36] hover:bg-[#F3EFE6]"
            }`}
          >
            <FileCheck className="size-4 text-[#C5A059]" />
            <span>Visa Services</span>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-[#C5A059]/15 text-[#9E7D3B] text-[10px] font-bold rounded-md uppercase tracking-wider">
              99.4% Pass Rate
            </span>
          </button>
        </div>

        {/* Tab Forms */}
        <form onSubmit={handleSearch}>
          {/* FLIGHTS SEARCH FORM */}
          {activeTab === "flights" && (
            <div className="space-y-4">
              {/* Secondary Sub-Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[#6A7382] pb-2 border-b border-[#E8E2D5]/60">
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer font-medium text-[#141A22]">
                    <input
                      type="radio"
                      name="flightType"
                      checked={flightTripType === "round"}
                      onChange={() => setFlightTripType("round")}
                      className="accent-[#C5A059]"
                    />
                    <span>Round Trip</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer font-medium text-[#141A22]">
                    <input
                      type="radio"
                      name="flightType"
                      checked={flightTripType === "oneway"}
                      onChange={() => setFlightTripType("oneway")}
                      className="accent-[#C5A059]"
                    />
                    <span>One Way</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[#6A7382]">Travelers:</span>
                  <select
                    value={flightPassengers}
                    onChange={(e) => setFlightPassengers(e.target.value)}
                    className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2 py-1 text-xs text-[#141A22] font-semibold focus:outline-none"
                  >
                    <option value="1">1 Adult (Solo)</option>
                    <option value="2">2 Adults (Couple)</option>
                    <option value="3">3 Adults (Small Group)</option>
                    <option value="4+">4+ Delegation</option>
                  </select>
                </div>
              </div>

              {/* Primary Input Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                {/* Departure & Destination */}
                <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2 relative">
                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Origin Airport</span>
                    <select
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      className="w-full bg-transparent font-semibold text-sm text-[#141A22] focus:outline-none cursor-pointer mt-0.5 truncate"
                    >
                      <option value="All">All Global Hubs</option>
                      {AIRPORT_OPTIONS.map((ap) => (
                        <option key={`from-${ap.code}`} value={ap.code}>
                          {ap.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={swapFlightAirports}
                    className="hidden sm:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 size-8 items-center justify-center rounded-full bg-[#FFFFFF] border border-[#E8E2D5] shadow-sm hover:border-[#C5A059] active:scale-95 transition-all duration-200 cursor-pointer group"
                    title="Swap departure and arrival routes"
                  >
                    <ArrowRightLeft className="size-3.5 text-[#C5A059] group-hover:rotate-180 transition-transform duration-300" />
                  </button>

                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Arrival Airport</span>
                    <select
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      className="w-full bg-transparent font-semibold text-sm text-[#141A22] focus:outline-none cursor-pointer mt-0.5 truncate"
                    >
                      <option value="All">All Destinations</option>
                      {AIRPORT_OPTIONS.map((ap) => (
                        <option key={`to-${ap.code}`} value={ap.code}>
                          {ap.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates & Cabin */}
                <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Departure Date</span>
                    <input
                      type="date"
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#141A22] focus:outline-none mt-0.5"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Cabin Class</span>
                    <select
                      value={flightCabin}
                      onChange={(e) => setFlightCabin(e.target.value)}
                      className="w-full bg-transparent font-semibold text-sm text-[#141A22] focus:outline-none cursor-pointer mt-0.5"
                    >
                      <option value="All">All Premium Cabins</option>
                      <option value="Business">Business Class</option>
                      <option value="First Class">First Class Suites</option>
                      <option value="Premium Economy">Premium Economy</option>
                    </select>
                  </div>
                </div>

                {/* Search Button */}
                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full h-[64px] px-6 rounded-2xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/20 disabled:opacity-75 cursor-pointer border border-[#C5A059]/40"
                  >
                    {isSearching ? (
                      <>
                        <span className="size-4 border-2 border-[#E5C378] border-t-transparent rounded-full animate-spin" />
                        <span>Checking Flights...</span>
                      </>
                    ) : (
                      <>
                        <Search className="size-4 text-[#E5C378]" />
                        <span>Search Flights</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Additional In-line Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E2D5]/70 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Filter className="size-3.5 text-[#6A7382]" />
                    <span className="text-[#6A7382] font-medium">Airline:</span>
                    <select
                      value={flightAirline}
                      onChange={(e) => setFlightAirline(e.target.value)}
                      className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                    >
                      <option value="All">All 12 Consortium Carriers</option>
                      <option value="Emirates">Emirates</option>
                      <option value="Singapore Airlines">Singapore Airlines</option>
                      <option value="Qatar Airways">Qatar Airways</option>
                      <option value="Air France">Air France</option>
                      <option value="Swiss International">Swiss International</option>
                      <option value="Japan Airlines">Japan Airlines</option>
                      <option value="British Airways">British Airways</option>
                      <option value="Etihad Airways">Etihad Airways</option>
                      <option value="Lufthansa">Lufthansa</option>
                      <option value="Cathay Pacific">Cathay Pacific</option>
                      <option value="VistaJet Global Charter">VistaJet Private Jet</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[#6A7382] font-medium">Stops:</span>
                    <select
                      value={flightStops}
                      onChange={(e) => setFlightStops(e.target.value)}
                      className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                    >
                      <option value="All">All Routing</option>
                      <option value="Direct">Non-Stop Direct Only</option>
                      <option value="1 Stop">1 Stop Layover</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="size-3.5 text-[#6A7382]" />
                  <span className="text-[#6A7382] font-medium">Sort by:</span>
                  <select
                    value={flightSort}
                    onChange={(e) => setFlightSort(e.target.value as any)}
                    className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                  >
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="duration">Fastest Duration</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* HOTELS SEARCH FORM */}
          {activeTab === "hotels" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                  <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Destination / Sanctuary</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <MapPin className="size-4 text-[#C5A059] shrink-0" />
                    <select
                      value={hotelDestination}
                      onChange={(e) => setHotelDestination(e.target.value)}
                      className="w-full bg-transparent font-semibold text-sm text-[#141A22] focus:outline-none cursor-pointer"
                    >
                      <option value="All">Worldwide (All 5-Star Sanctuaries)</option>
                      <option value="Bora Bora">Bora Bora, French Polynesia</option>
                      <option value="Japan">Tokyo & Kyoto, Japan</option>
                      <option value="France">Antibes & Paris, France</option>
                      <option value="United Arab Emirates">Dubai, UAE</option>
                      <option value="Switzerland">St. Moritz, Switzerland</option>
                      <option value="Indonesia">Ubud, Bali</option>
                      <option value="Italy">Amalfi Coast, Italy</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Check-In Date</span>
                    <input
                      type="date"
                      value={hotelCheckIn}
                      onChange={(e) => setHotelCheckIn(e.target.value)}
                      className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#141A22] focus:outline-none mt-0.5"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Check-Out Date</span>
                    <input
                      type="date"
                      value={hotelCheckOut}
                      onChange={(e) => setHotelCheckOut(e.target.value)}
                      className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#141A22] focus:outline-none mt-0.5"
                    />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full h-[64px] px-6 rounded-2xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/20 disabled:opacity-75 cursor-pointer border border-[#C5A059]/40"
                  >
                    {isSearching ? (
                      <>
                        <span className="size-4 border-2 border-[#E5C378] border-t-transparent rounded-full animate-spin" />
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="size-4 text-[#E5C378]" />
                        <span>Find 5★ Resorts</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Hotel Secondary Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E2D5]/70 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Users className="size-3.5 text-[#6A7382]" />
                    <span className="text-[#6A7382] font-medium">Guests:</span>
                    <select
                      value={hotelGuests}
                      onChange={(e) => setHotelGuests(e.target.value)}
                      className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests (Couple Suite)</option>
                      <option value="3">3-4 Guests (Family Villa)</option>
                      <option value="5+">5+ Private Residence</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Star className="size-3.5 text-[#C5A059]" />
                    <span className="text-[#6A7382] font-medium">Category:</span>
                    <select
                      value={hotelRatingFilter}
                      onChange={(e) => setHotelRatingFilter(e.target.value)}
                      className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                    >
                      <option value="All">All Luxury Ratings</option>
                      <option value="5-Star">5-Star Palace & Resorts Only</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="size-3.5 text-[#6A7382]" />
                  <span className="text-[#6A7382] font-medium">Sort by:</span>
                  <select
                    value={hotelSort}
                    onChange={(e) => setHotelSort(e.target.value as any)}
                    className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                  >
                    <option value="rating">Highest Rated (4.9+ ★)</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* CARS SEARCH FORM */}
          {activeTab === "cars" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                  <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Fleet Category</span>
                  <select
                    value={carCategory}
                    onChange={(e) => setCarCategory(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#141A22] focus:outline-none cursor-pointer mt-0.5"
                  >
                    <option value="All">All Prestige Vehicles</option>
                    <option value="Exotic Supercar">Exotic Supercars (Ferrari, Porsche)</option>
                    <option value="Luxury Sedan">Luxury Sedans (Maybach, Aston Martin)</option>
                    <option value="Executive SUV">Executive SUVs (Range Rover SV)</option>
                    <option value="Electric Prestige">Electric Prestige (Tesla Plaid)</option>
                  </select>
                </div>

                <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Pickup Date</span>
                    <input
                      type="date"
                      value={carStartDate}
                      onChange={(e) => setCarStartDate(e.target.value)}
                      className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#141A22] focus:outline-none mt-0.5"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Return Date</span>
                    <input
                      type="date"
                      value={carEndDate}
                      onChange={(e) => setCarEndDate(e.target.value)}
                      className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#141A22] focus:outline-none mt-0.5"
                    />
                  </div>
                </div>

                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full h-[64px] px-6 rounded-2xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/20 disabled:opacity-75 cursor-pointer border border-[#C5A059]/40"
                  >
                    {isSearching ? (
                      <>
                        <span className="size-4 border-2 border-[#E5C378] border-t-transparent rounded-full animate-spin" />
                        <span>Checking Fleet...</span>
                      </>
                    ) : (
                      <>
                        <Search className="size-4 text-[#E5C378]" />
                        <span>Browse Fleet</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Car Secondary Filters */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E2D5]/70 text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 text-[#6A7382]" />
                    <span className="text-[#6A7382] font-medium">Delivery:</span>
                    <select
                      value={carPickupLocation}
                      onChange={(e) => setCarPickupLocation(e.target.value)}
                      className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                    >
                      <option value="All">Airport Tarmac / Private Jet Hangar</option>
                      <option value="Hotel">Direct to 5-Star Hotel / Villa Doorstep</option>
                      <option value="Port">Superyacht Berth / Marina</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Fuel className="size-3.5 text-[#6A7382]" />
                    <span className="text-[#6A7382] font-medium">Transmission:</span>
                    <select
                      value={carTransmission}
                      onChange={(e) => setCarTransmission(e.target.value)}
                      className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                    >
                      <option value="All">All Transmissions</option>
                      <option value="Automatic">Automatic</option>
                      <option value="Dual-Clutch">Dual-Clutch F1 Paddle</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="size-3.5 text-[#6A7382]" />
                  <span className="text-[#6A7382] font-medium">Sort by:</span>
                  <select
                    value={carSort}
                    onChange={(e) => setCarSort(e.target.value as any)}
                    className="bg-[#FAF8F5] border border-[#E8E2D5] rounded-lg px-2.5 py-1 text-xs text-[#141A22] focus:outline-none font-medium"
                  >
                    <option value="price-asc">Daily Rate: Low to High</option>
                    <option value="price-desc">Daily Rate: High to Low</option>
                    <option value="speed">Fastest Acceleration (0-100 km/h)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* VISAS SEARCH FORM */}
          {activeTab === "visas" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
                <div className="md:col-span-4 p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                  <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Destination Region</span>
                  <select
                    value={visaCountry}
                    onChange={(e) => setVisaCountry(e.target.value)}
                    className="w-full bg-transparent font-semibold text-sm text-[#141A22] focus:outline-none cursor-pointer mt-0.5"
                  >
                    <option value="All">All Global Visa Desks</option>
                    <option value="Schengen">Schengen Area (29 European Countries)</option>
                    <option value="United Kingdom">United Kingdom (Standard / Multi-Year)</option>
                    <option value="United States">United States (B1/B2 Expedited)</option>
                    <option value="United Arab Emirates">Dubai & UAE (e-Visa / Golden Visa)</option>
                    <option value="Japan">Japan (e-Visa & Multi-Entry)</option>
                    <option value="Australia">Australia (eVisitor / Tourist 600)</option>
                  </select>
                </div>

                <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Target Travel Date</span>
                    <input
                      type="date"
                      value={visaTravelDate}
                      onChange={(e) => setVisaTravelDate(e.target.value)}
                      className="w-full bg-transparent font-semibold text-xs sm:text-sm text-[#141A22] focus:outline-none mt-0.5"
                    />
                  </div>

                  <div className="p-3.5 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5]">
                    <span className="text-[10px] font-bold text-[#6A7382] uppercase tracking-[0.15em] block">Processing Speed</span>
                    <select
                      value={visaSpeed}
                      onChange={(e) => setVisaSpeed(e.target.value)}
                      className="w-full bg-transparent font-semibold text-sm text-[#141A22] focus:outline-none cursor-pointer mt-0.5"
                    >
                      <option value="All">All Speed Options</option>
                      <option value="express">Express VIP (24-48 Hours)</option>
                      <option value="standard">Standard Fast-Track</option>
                    </select>
                  </div>
                </div>

                <div className="md:col-span-3">
                  <button
                    type="submit"
                    disabled={isSearching}
                    className="w-full h-[64px] px-6 rounded-2xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/20 disabled:opacity-75 cursor-pointer border border-[#C5A059]/40"
                  >
                    {isSearching ? (
                      <>
                        <span className="size-4 border-2 border-[#E5C378] border-t-transparent rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </>
                    ) : (
                      <>
                        <Search className="size-4 text-[#E5C378]" />
                        <span>Check Eligibility</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Visa Secondary Notes */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#E8E2D5]/70 text-xs text-[#6A7382]">
                <div className="flex items-center gap-2">
                  <Clock className="size-3.5 text-[#C5A059]" />
                  <span>Guaranteed consular appointment slots reserved for November & December 2026.</span>
                </div>
                <div className="flex items-center gap-2 text-[#1E7452] font-semibold">
                  <ShieldCheck className="size-3.5" />
                  <span>Zero refusal fee insurance included</span>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* EXPANDED DATE SELECTOR & STATUS BAR (For Flights) */}
      {activeTab === "flights" && (
        <div className="mt-6 p-4 rounded-2xl bg-[#FFFFFF] border border-[#E8E2D5] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#141A22]">
            <Calendar className="size-4 text-[#C5A059] shrink-0" />
            <span>Flexible Dates (+/- 3 Days):</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {availableDateChips.map((chip) => (
              <button
                key={chip.date}
                type="button"
                onClick={() => setFlightDate(chip.date)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer flex flex-col items-center ${
                  flightDate === chip.date
                    ? "bg-[#0F1E36] text-[#FAF8F5] shadow-sm"
                    : "bg-[#FAF8F5] text-[#485363] hover:bg-[#F3EFE6] border border-[#E8E2D5]"
                }`}
              >
                <span>{chip.label}</span>
                <span className={`text-[10px] ${flightDate === chip.date ? "text-[#E5C378]" : "text-[#1E7452]"}`}>
                  from {chip.lowestPrice}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* RESULTS DISPLAY SECTION */}
      <div className="mt-8 transition-all">
        <div className="flex items-center justify-between mb-5 px-1">
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0F1E36]">
              {activeTab === "flights" && `Available Flight Itineraries (${filteredFlights.length} Options)`}
              {activeTab === "hotels" && `Handpicked 5-Star Sanctuaries (${filteredHotels.length} Properties)`}
              {activeTab === "cars" && `Prestige & Exotic Fleet (${filteredCars.length} Vehicles)`}
              {activeTab === "visas" && `Global Consular Desks (${filteredVisas.length} Regions)`}
            </h3>
            <p className="text-xs sm:text-sm text-[#6A7382] mt-0.5">
              Instant guaranteed reservation • 24/7 Dedicated Concierge Support
            </p>
          </div>

          <span className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#FFFFFF] border border-[#E8E2D5] text-[#0F1E36] shadow-sm">
            <span className="size-2 rounded-full bg-[#1E7452] animate-pulse" />
            Live Verified Inventory
          </span>
        </div>

        {/* FLIGHT RESULTS (Tabular / Luxury Card View) */}
        {activeTab === "flights" && (
          <div className="grid grid-cols-1 gap-4">
            {filteredFlights.length === 0 ? (
              <div className="p-12 text-center bg-[#FFFFFF] rounded-3xl border border-[#E8E2D5]">
                <p className="font-serif text-lg font-bold text-[#0F1E36]">No direct matches for this criteria</p>
                <p className="text-xs text-[#6A7382] mt-1">Try resetting the cabin or carrier filters to see all 12 luxury routes.</p>
                <button
                  type="button"
                  onClick={() => {
                    setFlightCabin("All");
                    setFlightAirline("All");
                    setFlightStops("All");
                    setFlightFrom("All");
                    setFlightTo("All");
                  }}
                  className="mt-4 px-4 py-2 rounded-xl bg-[#0F1E36] text-[#FAF8F5] text-xs font-bold"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              filteredFlights.map((flight) => (
                <div
                  key={flight.id}
                  className="group relative bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
                >
                  <div className="flex-1 space-y-4">
                    {/* Top Bar: Airline & Aircraft */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3.5">
                        <div className="size-11 rounded-2xl bg-[#F3EFE6] border border-[#E8E2D5] overflow-hidden flex items-center justify-center font-bold text-xs text-[#0F1E36]">
                          {flight.airline.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h4 className="font-serif font-bold text-lg text-[#0F1E36] leading-tight">{flight.airline}</h4>
                          <span className="text-xs text-[#6A7382] font-mono">{flight.flightNumber} • {flight.aircraftModel}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F3EFE6] text-[#9E7D3B] border border-[#C5A059]/30">
                          {flight.cabinClass}
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-xs font-medium text-[#1E7452] bg-[#1E7452]/10">
                          {flight.baggage}
                        </span>
                      </div>
                    </div>

                    {/* Route & Times */}
                    <div className="grid grid-cols-3 items-center text-center sm:text-left gap-2 sm:gap-4 max-w-lg">
                      <div>
                        <p className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-[#0F1E36]">{flight.departureTime}</p>
                        <p className="text-xs font-bold text-[#141A22]">{flight.fromCode}</p>
                        <p className="text-[11px] text-[#6A7382] truncate">{flight.fromCity}</p>
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-[11px] text-[#6A7382] mb-1 font-medium">{flight.duration}</span>
                        <div className="w-full flex items-center gap-1">
                          <div className="h-0.5 flex-1 bg-[#E8E2D5]" />
                          <Plane className="size-3.5 text-[#C5A059] rotate-90 shrink-0" />
                          <div className="h-0.5 flex-1 bg-[#E8E2D5]" />
                        </div>
                        <span className="text-[10px] font-bold text-[#1E7452] mt-1 uppercase tracking-wider">{flight.stops}</span>
                      </div>

                      <div className="text-right">
                        <p className="text-2xl sm:text-3xl font-bold font-serif tracking-tight text-[#0F1E36]">{flight.arrivalTime}</p>
                        <p className="text-xs font-bold text-[#141A22]">{flight.toCode}</p>
                        <p className="text-[11px] text-[#6A7382] truncate">{flight.toCity}</p>
                      </div>
                    </div>

                    {/* Perks chips */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {flight.perks.map((perk, idx) => (
                        <span key={idx} className="inline-flex items-center gap-1.5 text-[11px] px-3 py-1 rounded-lg bg-[#FAF8F5] border border-[#E8E2D5] text-[#485363] font-medium">
                          <Check className="size-3 text-[#C5A059]" />
                          {perk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="lg:border-l lg:border-[#E8E2D5] lg:pl-8 flex flex-row lg:flex-col items-center lg:items-end justify-between gap-4 pt-4 lg:pt-0 border-t border-[#E8E2D5] lg:border-t-0">
                    <div className="lg:text-right">
                      <span className="text-[11px] text-[#6A7382] block">All-Inclusive Fares</span>
                      <p className="text-2xl sm:text-3xl font-bold font-serif text-[#0F1E36] tracking-tight">
                        ${flight.price.toLocaleString()}
                      </p>
                      <span className="text-[11px] text-[#1E7452] font-semibold block mt-0.5">
                        {flight.availableSeats} seats at this tier
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedBooking({ type: "flight", data: flight })}
                      className="px-6 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1.5 cursor-pointer whitespace-nowrap border border-[#C5A059]/30"
                    >
                      <span>Reserve Seat</span>
                      <ChevronRight className="size-3.5 text-[#E5C378]" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* HOTEL RESULTS */}
        {activeTab === "hotels" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => (
              <div
                key={hotel.id}
                className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={hotel.image}
                    alt={hotel.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0F1E36]/80 text-[#FAF8F5] backdrop-blur-md border border-white/20">
                    {hotel.tag}
                  </span>
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#E5C378] text-[#0F1E36] shadow-md">
                    <Star className="size-3 fill-current" />
                    <span>{hotel.rating}</span>
                  </div>
                  <div className="absolute bottom-3.5 left-4 text-white">
                    <p className="text-xs font-medium text-white/90 flex items-center gap-1">
                      <MapPin className="size-3 text-[#E5C378]" /> {hotel.destination}, {hotel.country}
                    </p>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h4 className="font-serif font-bold text-xl text-[#0F1E36] leading-snug group-hover:text-[#C5A059] transition-colors">
                      {hotel.name}
                    </h4>
                    <p className="text-xs text-[#6A7382] mt-1 line-clamp-1">{hotel.roomType}</p>

                    <div className="space-y-2 mt-4 pt-4 border-t border-[#E8E2D5]">
                      {hotel.perks.slice(0, 2).map((perk, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#485363]">
                          <Check className="size-3.5 text-[#C5A059] shrink-0" />
                          <span className="truncate">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
                    <div>
                      <span className="text-[11px] text-[#6A7382] block">Starting from</span>
                      <p className="text-2xl font-bold font-serif text-[#0F1E36]">
                        ${hotel.pricePerNight.toLocaleString()}{" "}
                        <span className="text-xs font-normal font-sans text-[#6A7382]">/ night</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedBooking({ type: "hotel", data: hotel })}
                      className="px-4 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1 cursor-pointer border border-[#C5A059]/30"
                    >
                      <span>Book Suite</span>
                      <ChevronRight className="size-3.5 text-[#E5C378]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CAR RESULTS */}
        {activeTab === "cars" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <div
                key={car.id}
                className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden bg-muted">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
                  <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#0F1E36]/80 text-[#FAF8F5] backdrop-blur-md border border-white/20">
                    {car.category}
                  </span>
                  <span className="absolute top-3.5 right-3.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#1E7452] text-white backdrop-blur-md">
                    Zero Deductible
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.2em] text-[#9E7D3B] uppercase">{car.brand}</span>
                    <h4 className="font-serif font-bold text-xl text-[#0F1E36] leading-snug group-hover:text-[#C5A059] transition-colors mt-0.5">
                      {car.name}
                    </h4>

                    {/* Specs badge grid */}
                    <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#E8E2D5] text-center">
                      <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5]">
                        <Gauge className="size-3.5 mx-auto text-[#C5A059] mb-1" />
                        <span className="text-[10px] text-[#6A7382] block">0-100 km/h</span>
                        <span className="text-[11px] font-bold text-[#0F1E36]">{car.specs.acceleration.split(" ")[0]}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5]">
                        <Users className="size-3.5 mx-auto text-[#C5A059] mb-1" />
                        <span className="text-[10px] text-[#6A7382] block">Capacity</span>
                        <span className="text-[11px] font-bold text-[#0F1E36]">{car.specs.seats} Guests</span>
                      </div>
                      <div className="p-2 rounded-xl bg-[#FAF8F5] border border-[#E8E2D5]">
                        <Fuel className="size-3.5 mx-auto text-[#C5A059] mb-1" />
                        <span className="text-[10px] text-[#6A7382] block">Gearbox</span>
                        <span className="text-[11px] font-bold text-[#0F1E36] truncate">{car.specs.transmission}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
                    <div>
                      <span className="text-[11px] text-[#6A7382] block">Daily Rate</span>
                      <p className="text-2xl font-bold font-serif text-[#0F1E36]">
                        ${car.pricePerDay.toLocaleString()}{" "}
                        <span className="text-xs font-normal font-sans text-[#6A7382]">/ day</span>
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedBooking({ type: "car", data: car })}
                      className="px-4 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1 cursor-pointer border border-[#C5A059]/30"
                    >
                      <span>Reserve Fleet</span>
                      <ChevronRight className="size-3.5 text-[#E5C378]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VISA RESULTS */}
        {activeTab === "visas" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVisas.map((visa) => (
              <div
                key={visa.id}
                className="group bg-[#FFFFFF] border border-[#E8E2D5] rounded-3xl p-6 shadow-sm hover:shadow-2xl hover:border-[#C5A059]/50 transition-all duration-300 flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">{visa.flag}</span>
                    <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#F3EFE6] text-[#9E7D3B] border border-[#C5A059]/30">
                      {visa.approvalRate} Pass Rate
                    </span>
                  </div>

                  <h4 className="font-serif font-bold text-2xl text-[#0F1E36] leading-snug group-hover:text-[#C5A059] transition-colors">
                    {visa.country}
                  </h4>
                  <p className="text-xs text-[#6A7382] mt-1">{visa.validity}</p>

                  <div className="space-y-2 mt-4 pt-4 border-t border-[#E8E2D5]">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6A7382]">Standard Delivery:</span>
                      <span className="font-semibold text-[#141A22]">{visa.standardProcessing}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6A7382]">Express Priority:</span>
                      <span className="font-semibold text-[#9E7D3B]">{visa.expressProcessing}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#6A7382]">Next Consular Slot:</span>
                      <span className="font-semibold text-[#1E7452]">{visa.nextAppointmentSlot}</span>
                    </div>
                  </div>

                  {/* Requirements Preview */}
                  <div className="mt-4 p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] text-[11px] space-y-1.5">
                    <span className="font-bold text-[#0F1E36] block mb-1">AuraVoyage Legal Protocol:</span>
                    <p className="text-[#485363] flex items-center gap-1.5">
                      <Check className="size-3 text-[#C5A059]" /> Diplomatic document verification
                    </p>
                    <p className="text-[#485363] flex items-center gap-1.5">
                      <Check className="size-3 text-[#C5A059]" /> Guaranteed fast-track appointment
                    </p>
                    <p className="text-[#485363] flex items-center gap-1.5">
                      <Check className="size-3 text-[#C5A059]" /> Mock consular interview training
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D5]">
                  <div>
                    <span className="text-[11px] text-[#6A7382] block">Concierge Filing</span>
                    <p className="text-2xl font-bold font-serif text-[#0F1E36]">
                      ${visa.fee.toLocaleString()}{" "}
                      <span className="text-xs font-normal font-sans text-[#6A7382]">fee</span>
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedBooking({ type: "visa", data: visa })}
                    className="px-4 py-2.5 rounded-xl bg-[#0F1E36] text-[#FAF8F5] font-bold text-xs tracking-wider uppercase hover:bg-[#1A2E4F] transition-all shadow-md shadow-[#0F1E36]/15 flex items-center gap-1 cursor-pointer border border-[#C5A059]/30"
                  >
                    <span>Apply Now</span>
                    <ChevronRight className="size-3.5 text-[#E5C378]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        item={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}
