import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BRAND } from "@/data/catalog";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: `${BRAND.legalName} | ${BRAND.tagline}`,
    template: `%s | ${BRAND.legalName}`,
  },
  description:
    "Precision spare parts, field service, and consulting for aluminum melt-treatment (FDU, MTS 1500, SMARTT, ThermaTest NGIII 5000) across the U.S., plus commercial equipment repair & loaner machines in Cuyahoga County, Ohio Only.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#000000] text-[#FFFFFF]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
