import React from "react";
import Link from "next/link";
import { BRAND } from "@/data/catalog";

export default function Footer() {
  return (
    <footer className="bg-[#000000] border-t border-[#262626] text-[#CCCCCC]">
      {/* Explicit Service Territory & SLA Banner */}
      <div className="bg-[#0A0A0A] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 rounded bg-[#000000] border border-[#262626]">
            <span className="mt-0.5 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#1A1A1A] text-[#5ADCC8] border border-[#5ADCC8]/40">
              DIV 01 · USA
            </span>
            <p className="text-xs sm:text-sm text-white">
              <strong>Division 01 Foundry Support: Nationwide U.S.</strong> — Serial-verified spare parts, field service, health checks, and consulting for{" "}
              <span className="text-[#5ADCC8] font-mono">
                FDU, MTS 1500, SMARTT &amp; ThermaTest NGIII 5000
              </span>{" "}
              systems.
            </p>
          </div>

          <div className="flex items-start gap-3 p-3 rounded bg-[#000000] border border-[#5ADCC8]/40">
            <span className="mt-0.5 inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-bold uppercase bg-[#5ADCC8] text-[#000000]">
              DIV 02 · 3JI-REPAIR · CUYAHOGA COUNTY
            </span>
            <p className="text-xs sm:text-sm text-white">
              <strong>
                Division 02 — 3JI-Repair Commercial Equipment Service &amp; Loaner Program: Cuyahoga County, Ohio Launch Area Only
              </strong>{" "}
              — Refrigerators, coolers, freezers, ice machines, HVAC, beverage &amp; slushie machines, and loaner machine swaps exclusively within Cuyahoga County, OH.
            </p>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Col 1: Brand & Proof */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-16 w-16 bg-[#000000] rounded border border-[#262626] p-1 flex items-center justify-center">
              <img
                src={BRAND.logoPath}
                alt="3J Industrial Parts LLC Logo"
                className="h-full w-full object-contain"
                width={64}
                height={64}
              />
            </div>
            <div>
              <p className="text-lg font-extrabold uppercase tracking-wider text-white">
                {BRAND.legalName}
              </p>
              <p className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8]">
                {BRAND.tagline}
              </p>
            </div>
          </div>

          <blockquote className="text-xs sm:text-sm text-[#CCCCCC] border-l-2 border-[#5ADCC8] pl-3 italic leading-relaxed">
            &ldquo;{BRAND.proofQuote}&rdquo;
          </blockquote>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0A0A0A] border border-[#262626] text-xs font-mono text-white">
            <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
            <span>SLA Guarantee:</span>
            <strong className="text-[#5ADCC8] uppercase">
              {BRAND.quotePromise}
            </strong>
          </div>
        </div>

        {/* Col 2: Navigation & Divisions */}
        <div className="md:col-span-4 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            Navigation &amp; Divisions
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-[#5ADCC8] transition-colors">
                Home — Overview &amp; Capabilities
              </Link>
            </li>
            <li>
              <Link
                href="/parts-finder"
                className="hover:text-[#5ADCC8] transition-colors"
              >
                Parts Finder — FDU, MTS 1500, SMARTT, ThermaTest NGIII 5000
              </Link>
            </li>
            <li>
              <Link
                href="/food-service"
                className="hover:text-[#5ADCC8] transition-colors"
              >
                3JI-Repair — Food Service &amp; Commercial Equipment (Cuyahoga County)
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-[#5ADCC8] transition-colors"
              >
                About Jason Allen &amp; Join 3JI-Repair
              </Link>
            </li>
            <li>
              <Link
                href="/#quote-request"
                className="text-[#5ADCC8] font-semibold hover:underline"
              >
                Request a Quote (Estimate within 24 hours) →
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 3: Direct Contact */}
        <div className="md:col-span-3 space-y-3">
          <h3 className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            Direct Dispatch &amp; Quotes
          </h3>
          <div className="space-y-2 text-sm">
            <p className="text-white font-semibold">{BRAND.founder}, Founder</p>
            <p>
              <span className="text-xs font-mono uppercase text-[#999999] block">
                Phone (Direct / Line-Down)
              </span>
              <a
                href={BRAND.phoneHref}
                className="text-base font-mono font-bold text-[#5ADCC8] hover:underline"
              >
                {BRAND.phoneDisplay}
              </a>
            </p>
            <p>
              <span className="text-xs font-mono uppercase text-[#999999] block">
                Email (Quotes &amp; Intake)
              </span>
              <a
                href={BRAND.emailHref}
                className="text-sm font-mono text-white hover:text-[#5ADCC8] break-all"
              >
                {BRAND.email}
              </a>
            </p>
            <p className="text-xs text-[#CCCCCC] pt-1">
              Division 01: Nationwide U.S. (USA)
              <br />
              Division 02: Cuyahoga County, Ohio Only
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Legal & OEM Independence Bar */}
      <div className="border-t border-[#1A1A1A] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#999999]">
          <p className="max-w-3xl leading-relaxed">
            {BRAND.legalName} is an independent service provider and is not affiliated with the original equipment manufacturers mentioned. FDU, MTS 1500, SMARTT, and ThermaTest NGIII 5000 are Foseco (Vesuvius) platforms; all manufacturer names, symbols, and descriptions are used for reference purposes only.
          </p>
          <p className="font-mono whitespace-nowrap text-[#CCCCCC]">
            © 2026 {BRAND.legalName.toUpperCase()}. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
