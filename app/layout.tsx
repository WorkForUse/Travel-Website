import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "AuraVoyage | Bespoke Luxury Travel, Visas, Flights, Hotels & Exotic Cars",
  description:
    "The world's premier bespoke travel atelier. Diplomatic Visa Facilitation, Commercial & Private Aviation, 5-Star Preferred Hotels, and Exotic Supercar Hire.",
  keywords: [
    "luxury travel agency",
    "diplomatic visa concierge",
    "private aviation and first class",
    "five star hotels",
    "exotic supercar rental",
    "bespoke global itineraries",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} font-sans h-full antialiased scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#FAF9F5] text-[#1E252B] selection:bg-[#C5A059]/25 selection:text-[#0B131F]" suppressHydrationWarning>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}