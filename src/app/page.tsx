import React from "react";
import Link from "next/link";
import MeltTreatmentSchematic from "@/components/MeltTreatmentSchematic";
import FduExplodedScrollSection from "@/components/FduExplodedScrollSection";
import Mts1500CycleScrollSection from "@/components/Mts1500CycleScrollSection";
import QuoteRequestForm from "@/components/QuoteRequestForm";
import { BRAND, PLATFORMS } from "@/data/catalog";

const SIX_CORE_SERVICES = [
  {
    code: "SVC-01",
    division: "Division 01 · Nationwide U.S.",
    title: "Melt Treatment Consultation",
    description:
      "Melt-treatment process consulting for aluminum foundries and non-ferrous manufacturers across degassing, thermal analysis, and metal treatment systems. We build standard work instructions with pictures and illustrations, then optimize your process to reduce variation between shifts.",
  },
  {
    code: "SVC-02",
    division: "Division 01 · Nationwide U.S.",
    title: "Degassing Machine Repair",
    description:
      "On-site field repair and diagnostics for aluminum degassing equipment including SMARTT, MTS 1500, and FDU Degasser units. We diagnose mechanical, pneumatic, and PLC issues on-site and supply serial-verified replacement components.",
  },
  {
    code: "SVC-03",
    division: "Division 01 · Nationwide U.S.",
    title: "Support & Operator Training",
    description:
      "Hands-on operator and maintenance staff training, preventative maintenance plans, and troubleshooting protocols so your shift teams catch wear issues before they cause unplanned casting line downtime.",
  },
  {
    code: "SVC-04",
    division: "Division 01 · Nationwide U.S.",
    title: "Serial-Verified Spare Parts",
    description:
      "Every part is matched to your unit's serial number before it ships — including XSR/FDR/XDR/FDDR graphite rotors and shafts, DIAMANT ceramic wear parts, COVERAL/SIMODAL/NUCLEANT fluxes, and ThermaTest sampling hardware.",
  },
  {
    code: "SVC-05",
    division: "Division 01 · Nationwide U.S.",
    title: "Equipment Health Checks",
    description:
      "Preventative mechanical and functional audits for FDU, MTS 1500, SMARTT, and ThermaTest NGIII 5000 systems. Includes a detailed inspection report, treatment optimization recommendations, and a prioritized spare parts list.",
  },
  {
    code: "SVC-06",
    division: "Division 01 · Nationwide U.S.",
    title: "Thermal Analysis & Instrumentation Calibration",
    description:
      "Sampling cup verification, cold-junction thermocouple calibration, and grain refinement curve optimization for ThermaTest NGIII 5000 systems prior to casting.",
  },
];

export default function HomePage() {
  return (
    <div className="bg-[#000000] text-white">
      {/* SECTION 1.1: HERO + CSS/SVG ANIMATED MELT-TREATMENT HEADER */}
      <section className="relative border-b border-[#262626] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Hero Copy Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded bg-[#0A0A0A] border border-[#5ADCC8]/40">
                <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5ADCC8]">
                  {BRAND.tagline}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold uppercase tracking-tight leading-[1.08] text-white">
                Precision Parts &amp; Field Service That Keep Production Running.
              </h1>

              <p className="text-base sm:text-lg text-[#CCCCCC] leading-relaxed">
                <strong className="text-white">Division 01 (Nationwide U.S.):</strong>{" "}
                Serial-verified spare parts, field repair, equipment health checks, and process consulting for{" "}
                <span className="text-[#5ADCC8] font-semibold">
                  FDU, MTS 1500, SMARTT, and ThermaTest NGIII 5000
                </span>{" "}
                aluminum melt-treatment platforms. Every part is matched to your unit&apos;s serial number before it ships, with detailed estimates delivered within 24 hours.
              </p>

              {/* Dual Hero CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  href="/parts-finder"
                  className="inline-flex items-center justify-center px-6 py-4 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-sm uppercase tracking-wider transition-colors"
                >
                  Find Parts &amp; Request Quote →
                </Link>
                <Link
                  href="#quote-request"
                  className="inline-flex items-center justify-center px-6 py-4 rounded bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white border border-[#5ADCC8]/50 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Request 24-Hour Estimate →
                </Link>
              </div>

              {/* Quick Trust Strip */}
              <div className="pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center gap-6 text-xs font-mono text-[#CCCCCC]">
                <div>
                  <span className="text-[#999999] block uppercase">QUOTE PROMISE</span>
                  <strong className="text-[#5ADCC8] uppercase">
                    Estimate Within 24 Hours
                  </strong>
                </div>
                <div>
                  <span className="text-[#999999] block uppercase">DIRECT LINE</span>
                  <a
                    href={BRAND.phoneHref}
                    className="text-white font-bold hover:text-[#5ADCC8]"
                  >
                    {BRAND.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="text-[#999999] block uppercase">PART FIT</span>
                  <strong className="text-white">100% Serial-Number Verified</strong>
                </div>
              </div>
            </div>

            {/* Hero Animated Melt-Treatment Schematic Column */}
            <div className="lg:col-span-6">
              <MeltTreatmentSchematic />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.2: PROOF & CREDIBILITY STRIP */}
      <section className="bg-[#0A0A0A] border-b border-[#262626]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 flex items-start gap-4">
              <div className="hidden sm:flex h-12 w-12 flex-shrink-0 rounded bg-[#000000] border border-[#5ADCC8]/40 items-center justify-center font-mono font-extrabold text-[#5ADCC8]">
                6+YR
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold mb-1">
                  Field-Verified Aluminum Melt-Treatment Authority · {BRAND.founder}
                </p>
                <blockquote className="text-base sm:text-lg font-semibold text-white leading-snug">
                  &ldquo;{BRAND.proofQuote}&rdquo;
                </blockquote>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-wrap lg:justify-end items-center gap-3">
              <div className="px-4 py-2.5 rounded bg-[#000000] border border-[#5ADCC8] text-xs font-mono">
                <span className="text-[#999999] block text-[10px] uppercase">
                  RESPONSE SLA
                </span>
                <strong className="text-[#5ADCC8] uppercase font-extrabold">
                  Estimate Within 24 Hours
                </strong>
              </div>
              <div className="px-4 py-2.5 rounded bg-[#000000] border border-[#262626] text-xs font-mono">
                <span className="text-[#999999] block text-[10px] uppercase">
                  DIRECT CONTACT
                </span>
                <a
                  href={BRAND.phoneHref}
                  className="text-white font-bold hover:text-[#5ADCC8]"
                >
                  {BRAND.phoneDisplay}
                </a>
                <span className="mx-1.5 text-[#383838]">·</span>
                <a
                  href={BRAND.emailHref}
                  className="text-[#5ADCC8] hover:underline"
                >
                  {BRAND.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PIECE 1: EXPLODED-VIEW FDU ROTARY DEGASSER SCROLL ANIMATION */}
      <FduExplodedScrollSection />

      {/* SECTION 1.3: TWO-DIVISION SPLIT (CARD GRID) */}
      <section
        data-testid="static-what-we-support-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      >
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            WHAT WE SUPPORT · INDUSTRIAL FOUNDRY SYSTEMS
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Nationwide Aluminum Melt-Treatment Equipment &amp; Spare Parts
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {/* Card A: Division 01 (Full Width) */}
          <div className="rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8]/60 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase tracking-wider">
                  01 — INDUSTRIAL FOUNDRY SUPPORT · NATIONWIDE
                </span>
                <span className="text-xs font-mono uppercase text-[#5ADCC8]">
                  Service Area: All 50 U.S. States (USA)
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                Aluminum Melt-Treatment Spare Parts, Field Service &amp; Consulting
              </h3>

              <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed max-w-4xl">
                Direct specialist support for Foseco / Vesuvius aluminum melt-treatment and thermal analysis platforms.{" "}
                <strong className="text-white">{BRAND.serialGuarantee}</strong> No guesswork, no wrong shipments, and direct access to the specialist who supported these systems nationwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                <div className="p-3.5 rounded bg-[#000000] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold block">
                    FDU DEGASSER
                  </span>
                  <span className="text-xs text-white font-semibold mt-1 block">
                    XSR/FDR/XDR/FDDR Rotors, Baffles, Gas Valves
                  </span>
                </div>
                <div className="p-3.5 rounded bg-[#000000] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold block">
                    MTS 1500
                  </span>
                  <span className="text-xs text-white font-semibold mt-1 block">
                    Precision Augers, Flux Feeders, Treatment Hardware
                  </span>
                </div>
                <div className="p-3.5 rounded bg-[#000000] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold block">
                    SMARTT UNIT
                  </span>
                  <span className="text-xs text-white font-semibold mt-1 block">
                    Mass Flow Controllers, Cycle Optimization Sensors
                  </span>
                </div>
                <div className="p-3.5 rounded bg-[#000000] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold block">
                    THERMATEST NGIII 5000
                  </span>
                  <span className="text-xs text-white font-semibold mt-1 block">
                    Sampling Cups, Holder Leads, Thermocouples
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center gap-4">
              <Link
                href="/parts-finder"
                className="px-6 py-3 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                Launch Parts Finder →
              </Link>
              <Link
                href="#quote-request"
                className="px-5 py-3 rounded border border-[#383838] hover:border-[#5ADCC8] text-white font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Request 24-Hr Foundry Quote
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1.4: FEATURED PLATFORMS STRIP + SIX CORE SERVICES */}
      <section className="bg-[#050505] border-y border-[#262626] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {/* Featured Platforms Strip */}
          <div>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                  DIVISION 01 · FOSECO / VESUVIUS PLATFORMS SUPPORTED
                </span>
                <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                  Select Your Melt-Treatment Platform
                </h2>
              </div>
              <Link
                href="/parts-finder"
                className="text-xs font-mono uppercase tracking-wider text-[#5ADCC8] hover:underline font-bold"
              >
                View Full Serial-Verified Parts Catalog →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {PLATFORMS.map((plat) => (
                <Link
                  key={plat.id}
                  href={`/parts-finder?platform=${encodeURIComponent(plat.id)}`}
                  className="group rounded-xl bg-[#0A0A0A] border border-[#262626] hover:border-[#5ADCC8] p-6 flex flex-col justify-between transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-[#5ADCC8] font-bold">
                        {plat.code}
                      </span>
                      <span className="text-[#999999]">{plat.oemOrigin}</span>
                    </div>
                    <h3 className="text-lg font-extrabold uppercase text-white group-hover:text-[#5ADCC8] transition-colors">
                      {plat.fullName}
                    </h3>
                    <p className="text-xs text-[#CCCCCC] leading-relaxed">
                      {plat.summary}
                    </p>
                  </div>
                  <div className="mt-5 pt-3 border-t border-[#1A1A1A] flex items-center justify-between text-xs font-mono text-[#5ADCC8] font-bold">
                    <span>Browse {plat.name} Parts</span>
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Six Ways We Keep Equipment Running (Enhanced from Live Site) */}
          <div>
            <div className="mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                WHAT WE DO · SIX WAYS WE KEEP EQUIPMENT RUNNING
              </span>
              <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                Engineering Excellence in Every Component &amp; Service Call
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {SIX_CORE_SERVICES.map((svc) => (
                <div
                  key={svc.code}
                  className="rounded-lg bg-[#0A0A0A] border border-[#262626] p-6 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#5ADCC8] font-bold">{svc.code}</span>
                    <span className="text-[#999999]">{svc.division}</span>
                  </div>
                  <h3 className="text-lg font-extrabold uppercase text-white">
                    {svc.title}
                  </h3>
                  <p className="text-sm text-[#CCCCCC] leading-relaxed">
                    {svc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PIECE 2: MTS 1500 IN-ACTION SCROLL-SCRUBBED TREATMENT CYCLE */}
      <Mts1500CycleScrollSection />

      {/* SECTION 1.6: UNIFIED QUOTE / SERVICE REQUEST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <QuoteRequestForm />
      </section>
    </div>
  );
}
