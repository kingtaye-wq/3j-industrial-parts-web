"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/data/catalog";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/parts-finder", label: "Parts Finder" },
  { href: "/food-service", label: "Food Service (Cuyahoga County)" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#000000]/95 backdrop-blur-md border-b border-[#262626]">
      {/* Top SLA & Division Territory Bar */}
      <div className="bg-[#0A0A0A] border-b border-[#1A1A1A] text-xs text-[#CCCCCC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-mono uppercase tracking-wider text-[#5ADCC8] font-semibold">
              <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
              {BRAND.tagline}
            </span>
            <span className="hidden md:inline text-[#383838]">|</span>
            <span className="hidden md:inline text-[#CCCCCC]">
              Div 01 Foundry Support: <strong className="text-white">Nationwide U.S.</strong>
            </span>
            <span className="hidden lg:inline text-[#383838]">|</span>
            <span className="hidden lg:inline text-[#CCCCCC]">
              Div 02 (<strong>3JI-Repair</strong>):{" "}
              <strong className="text-[#5ADCC8]">Cuyahoga County, OH Launch Area</strong>
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[#1A1A1A] text-[#5ADCC8] border border-[#5ADCC8]/30">
              Estimate Within 24 Hours
            </span>
            <a
              href={BRAND.emailHref}
              className="hover:text-[#5ADCC8] transition-colors hidden sm:inline"
            >
              {BRAND.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="3J Industrial Parts LLC Home"
        >
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 bg-[#000000] rounded border border-[#262626] group-hover:border-[#5ADCC8]/60 transition-colors flex items-center justify-center p-1">
            {/* Official 3J White Logo on Black Container */}
            <img
              src={BRAND.logoPath}
              alt="3J Industrial Parts LLC Logo"
              className="h-full w-full object-contain"
              width={64}
              height={64}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-extrabold tracking-wider uppercase text-white group-hover:text-[#5ADCC8] transition-colors">
              3J Industrial Parts
            </span>
            <span className="text-[10px] sm:text-xs font-mono tracking-widest uppercase text-[#CCCCCC]">
              Spare Parts | Services | Consulting
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded text-sm font-semibold tracking-wide transition-colors ${
                  active
                    ? "bg-[#1A1A1A] text-[#5ADCC8] border border-[#5ADCC8]/40"
                    : "text-[#CCCCCC] hover:text-white hover:bg-[#1A1A1A]/60"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Direct Call + Request a Quote CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={BRAND.phoneHref}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded border border-[#383838] bg-[#0A0A0A] hover:border-[#5ADCC8] text-white text-sm font-mono font-bold transition-colors"
            aria-label={`Call ${BRAND.phoneDisplay}`}
          >
            <svg
              className="w-4 h-4 text-[#5ADCC8]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>{BRAND.phoneDisplay}</span>
          </a>

          <Link
            href="/#quote-request"
            className="inline-flex flex-col items-center justify-center px-4 py-2 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            <span>Request a Quote</span>
            <span className="text-[10px] font-mono font-semibold opacity-85">
              24-Hr Estimate
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="lg:hidden inline-flex items-center justify-center p-2 rounded border border-[#383838] text-white hover:border-[#5ADCC8] hover:text-[#5ADCC8]"
          aria-expanded={mobileOpen}
          aria-label="Toggle Navigation Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {mobileOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0A0A0A] border-b border-[#262626] px-4 pt-3 pb-5 space-y-3">
          <div className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-2.5 rounded text-sm font-semibold ${
                    active
                      ? "bg-[#1A1A1A] text-[#5ADCC8] border border-[#5ADCC8]/40"
                      : "text-white hover:bg-[#1A1A1A]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-[#262626] flex flex-col sm:flex-row gap-2">
            <a
              href={BRAND.phoneHref}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded border border-[#383838] bg-[#000000] text-white font-mono font-bold text-sm"
            >
              Call {BRAND.phoneDisplay}
            </a>
            <Link
              href="/#quote-request"
              onClick={() => setMobileOpen(false)}
              className="flex-1 inline-flex items-center justify-center px-4 py-2.5 rounded bg-[#5ADCC8] text-[#000000] font-extrabold text-sm uppercase tracking-wider"
            >
              Request a Quote (24h Estimate)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
