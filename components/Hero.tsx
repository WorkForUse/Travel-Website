// "use client";

// import React, { useEffect } from "react";
// import Image from "next/image";
// import { ArrowRight } from "lucide-react";
// import { SearchEngine } from "@/components/search-engine/index";
// import BgImage from "@/assets/hero-section-bg.png";

// // Initialize GSAP only on client side
// const loadGSAP = async () => {
//   try {
//     const gsap = await import("gsap");
//     return gsap.default;
//   } catch (error) {
//     console.error("Failed to load GSAP:", error);
//     return null;
//   }
// };

// export function Hero() {
//   const scrollToSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
//     e.preventDefault();
//     document.querySelector("#search-engine")?.scrollIntoView({
//       behavior: "smooth",
//       block: "start",
//     });
//   };

//   // GSAP animations for content fade-in effect
//   useEffect(() => {
//     const animateHeroContent = async () => {
//       const gsap = await loadGSAP();
//       if (!gsap) return;

//       const fadeUpElements = document.querySelectorAll(
//         ".hero-fade-up"
//       ) as NodeListOf<HTMLElement>;
//       const fadeElements = document.querySelectorAll(
//         ".hero-fade-in"
//       ) as NodeListOf<HTMLElement>;

//       // Animate top subtitle badge
//       if (fadeUpElements.length > 0) {
//         gsap.fromTo(
//           fadeUpElements[0],
//           { opacity: 0, y: 30 },
//           { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
//         );
//       }

//       // Animate headline
//       if (fadeUpElements.length > 1) {
//         gsap.fromTo(
//           fadeUpElements[1],
//           { opacity: 0, y: 30 },
//           { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.2 }
//         );
//       }

//       // Animate paragraph
//       if (fadeElements.length > 0) {
//         gsap.fromTo(
//           fadeElements[0],
//           { opacity: 0 },
//           { opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.4 }
//         );
//       }

//       // Animate CTA button
//       if (fadeUpElements.length > 2) {
//         gsap.fromTo(
//           fadeUpElements[2],
//           { opacity: 0, y: 20 },
//           { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.6 }
//         );
//       }
//     };

//     animateHeroContent();
//   }, []);

//   return (
//     <section
//       className="relative isolate overflow-hidden bg-[#F8F5F0] text-[#12223A]"
//       id="home"
//     >
//       {/* Background Image maintained strictly as requested */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] sm:h-[650px] lg:h-[700px]">
//         <Image
//           src={BgImage}
//           alt="Santorini coastline at sunset"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-[68%_center] sm:object-[center_42%]"
//         />
//       </div>

//       {/* Editorial Gradients for clear contrast */}
//       <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-[#FFF9F1]/95 via-[#FFF8F0]/90 to-[#FFF8F0]/25 sm:h-[650px] sm:bg-gradient-to-r sm:from-[#FFF9F1]/90 sm:via-[#FFF8F0]/70 sm:to-transparent lg:h-[700px] lg:via-[#FFF8F0]/50" />
//       <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-white/10 via-transparent to-[#F8F5F0] sm:h-[760px] lg:h-[800px]" />

//       {/* Main Container - Added pt-24 sm:pt-32 lg:pt-36 to prevent badge hiding under Header */}
//       <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-24 sm:px-8 sm:pb-14 sm:pt-32 lg:px-12 lg:pt-36">
        
//         {/* Content Wrapper */}
//         <div className="max-w-3xl relative z-10">
          
//           {/* Top Subtitle Badge (Fixed Visibility & Aligned properly) */}
//           <div className="hero-fade-up mb-2 inline-flex items-center gap-2 rounded-full border border-[#C49A4A]/40 bg-white/90 px-4 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#9E7D3B] shadow-sm backdrop-blur-md">
//             <span>Bespoke Luxury Travel</span>
//           </div>

//           {/* Main Headline */}
//           <h1 className="hero-fade-up mt-2 max-w-3xl font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em] text-[#102039]">
//             Journeys Crafted <br />
//             <span className="font-normal italic text-[#B4883D]">
//               With Quiet Perfection.
//             </span>
//           </h1>

//           {/* Subtitle Description */}
//           <p className="hero-fade-in mt-4 max-w-[34rem] text-[13px] sm:text-base leading-relaxed text-[#1B2B42] font-medium [text-shadow:0_0_14px_rgba(255,249,241,0.95)]">
//             Effortless global mobility across four sovereign disciplines:
//             expedited diplomatic visas, private jet charters, premier hotel
//             sanctuaries,{" "}
//             <br className="sm:hidden" />
//             and executive ground fleets.
//           </p>

//           {/* CTA Button */}
//           <a
//             href="#search-engine"
//             onClick={scrollToSearch}
//             className="hero-fade-up mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#102039] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#102039]/20 transition hover:-translate-y-0.5 hover:bg-[#1B3151] focus:outline-none cursor-pointer"
//           >
//             <span>Explore Experiences</span>
//             <ArrowRight className="size-4 text-[#E1B65E]" />
//           </a>
//         </div>

//         {/* Search Engine Section */}
//         <div
//           id="search-engine"
//           className="relative z-10 mx-auto mt-8 max-w-[1240px] sm:mt-12 lg:mt-14"
//         >
//           <div className="sm:rounded-[28px] sm:border sm:border-white/80 sm:bg-white/90 sm:p-4 sm:shadow-[0_24px_80px_rgba(35,43,55,0.16)] sm:backdrop-blur-xl lg:p-6">
//             <SearchEngine />
//           </div>
//         </div>

//       </div>
//     </section>
//   );
// }

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SearchEngine } from "@/components/search-engine/index";
import BgImage from "@/assets/hero-section-bg.png";

// Initialize GSAP only on client side
const loadGSAP = async () => {
  try {
    const gsap = await import("gsap");
    return gsap.default;
  } catch (error) {
    console.error("Failed to load GSAP:", error);
    return null;
  }
};

export function Hero() {
  const scrollToSearch = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.querySelector("#search-engine")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // GSAP animations for perfectly synced content fade-in effect
  useEffect(() => {
    const animateHeroContent = async () => {
      const gsap = await loadGSAP();
      if (!gsap) return;

      const fadeUpElements = document.querySelectorAll(
        ".hero-fade-up"
      ) as NodeListOf<HTMLElement>;
      const fadeElements = document.querySelectorAll(
        ".hero-fade-in"
      ) as NodeListOf<HTMLElement>;

      // Create a master timeline for perfectly synchronized sequence
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Animate top subtitle badge
      if (fadeUpElements.length > 0) {
        tl.fromTo(
          fadeUpElements[0],
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9 }
        );
      }

      // Animate headline (slightly overlapped for fluidity)
      if (fadeUpElements.length > 1) {
        tl.fromTo(
          fadeUpElements[1],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.5"
        );
      }

      // Animate paragraph description
      if (fadeElements.length > 0) {
        tl.fromTo(
          fadeElements[0],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.6"
        );
      }

      // Animate CTA button
      if (fadeUpElements.length > 2) {
        tl.fromTo(
          fadeUpElements[2],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
      }
    };

    animateHeroContent();
  }, []);

  return (
    <section
      className="relative isolate overflow-hidden bg-[#F8F5F0] text-[#12223A]"
      id="home"
    >
      {/* Background Image maintained strictly as requested */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-20 h-[560px] sm:h-[650px] lg:h-[700px]">
        <Image
          src={BgImage}
          alt="Santorini coastline at sunset"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[68%_center] sm:object-[center_42%]"
        />
      </div>

      {/* Editorial Gradients for clear contrast */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[560px] bg-gradient-to-b from-[#FFF9F1]/95 via-[#FFF8F0]/90 to-[#FFF8F0]/25 sm:h-[650px] sm:bg-gradient-to-r sm:from-[#FFF9F1]/90 sm:via-[#FFF8F0]/70 sm:to-transparent lg:h-[700px] lg:via-[#FFF8F0]/50" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[640px] bg-gradient-to-b from-white/10 via-transparent to-[#F8F5F0] sm:h-[760px] lg:h-[800px]" />

      {/* Main Container */}
      <div className="mx-auto max-w-[1440px] px-4 pb-8 pt-24 sm:px-8 sm:pb-14 sm:pt-32 lg:px-12 lg:pt-36">
        
        {/* Content Wrapper */}
        <div className="max-w-3xl relative z-10">
          
          {/* Top Subtitle Badge (opacity-0 initial state prevents flicker) */}
          <div className="hero-fade-up opacity-0 mb-2 inline-flex items-center gap-2 rounded-full border border-[#C49A4A]/40 bg-white/90 px-4 py-1.5 text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase text-[#9E7D3B] shadow-sm backdrop-blur-md">
            <span>Bespoke Luxury Travel</span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-fade-up opacity-0 mt-2 max-w-3xl font-serif text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-[-0.03em] text-[#102039]">
            Journeys Crafted <br />
            <span className="font-normal italic text-[#B4883D]">
              With Quiet Perfection.
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="hero-fade-in opacity-0 mt-4 max-w-[34rem] text-[13px] sm:text-base leading-relaxed text-[#1B2B42] font-medium [text-shadow:0_0_14px_rgba(255,249,241,0.95)]">
            Effortless global mobility across four sovereign disciplines:
            expedited diplomatic visas, private jet charters, premier hotel
            sanctuaries,{" "}
            <br className="sm:hidden" />
            and executive ground fleets.
          </p>

          {/* CTA Button */}
          <a
            href="#search-engine"
            onClick={scrollToSearch}
            className="hero-fade-up opacity-0 mt-6 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#102039] px-6 py-3.5 text-xs sm:text-sm font-semibold text-white shadow-lg shadow-[#102039]/20 transition hover:-translate-y-0.5 hover:bg-[#1B3151] focus:outline-none cursor-pointer"
          >
            <span>Explore Experiences</span>
            <ArrowRight className="size-4 text-[#E1B65E]" />
          </a>
        </div>

        {/* Search Engine Section */}
        <div
          id="search-engine"
          className="relative z-10 mx-auto mt-8 max-w-[1240px] sm:mt-12 lg:mt-14"
        >
          <div className="sm:rounded-[28px] sm:border sm:border-white/80 sm:bg-white/90 sm:p-4 sm:shadow-[0_24px_80px_rgba(35,43,55,0.16)] sm:backdrop-blur-xl lg:p-6">
            <SearchEngine />
          </div>
        </div>

      </div>
    </section>
  );
}