import React from "react";
import Link from "next/link";
import MeltTreatmentSchematic from "@/components/MeltTreatmentSchematic";
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
    division: "Division 02 · Cuyahoga County, OH Only",
    title: "Commercial Equipment & Loaner Program",
    description:
      "Frozen beverage/slushie machines, commercial ice machines, reach-in coolers, freezers, and glycol chillers in Cuyahoga County, Ohio Only. We drop off a sanitized loaner machine first so you keep selling while we repair yours on our bench.",
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
                aluminum melt-treatment platforms.{" "}
                <strong className="text-white">
                  Division 02 (Cuyahoga County, Ohio Only):
                </strong>{" "}
                Rapid commercial frozen-beverage, slushie, and refrigeration repair with loaner machines dropped off first.
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
                  href="/food-service"
                  className="inline-flex items-center justify-center px-6 py-4 rounded bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white border border-[#5ADCC8]/50 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Commercial Equipment Service (Cuyahoga County)
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

      {/* SECTION 1.3: TWO-DIVISION SPLIT (CARD GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            WHAT WE SUPPORT · TWO SPECIALIZED DIVISIONS
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Nationwide Foundry Systems &amp; Local Commercial Equipment Repair
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Card A: Division 01 (Primary Emphasis — 7 Cols) */}
          <div className="lg:col-span-7 rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8]/60 p-6 sm:p-8 flex flex-col justify-between space-y-6">
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

              <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
                Direct specialist support for Foseco / Vesuvius aluminum melt-treatment and thermal analysis platforms.{" "}
                <strong className="text-white">{BRAND.serialGuarantee}</strong> No guesswork, no wrong shipments, and direct access to the specialist who supported these systems nationwide.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded bg-[#000000] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold block">
                    PLATFORMS SUPPORTED
                  </span>
                  <span className="text-sm text-white font-semibold mt-1 block">
                    FDU · MTS 1500 · SMARTT · ThermaTest NGIII 5000
                  </span>
                </div>
                <div className="p-3.5 rounded bg-[#000000] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold block">
                    CORE CONSUMABLES &amp; PARTS
                  </span>
                  <span className="text-sm text-white font-semibold mt-1 block">
                    XSR/FDR/XDR/FDDR Graphite, DIAMANT Wear Parts, Fluxes &amp; Cups
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

          {/* Card B: Division 02 (Secondary Emphasis — 5 Cols) */}
          <div className="lg:col-span-5 rounded-xl bg-[#0A0A0A] border border-[#383838] p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#1A1A1A] text-[#5ADCC8] border border-[#5ADCC8]/50 font-mono font-extrabold text-xs uppercase tracking-wider">
                  02 — COMMERCIAL EQUIPMENT REPAIR &amp; LOANER FLEET
                </span>
                <span className="px-2.5 py-0.5 rounded bg-[#5ADCC8]/15 text-[#5ADCC8] font-mono font-bold text-[11px] uppercase">
                  Cuyahoga County service only
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white">
                Frozen Beverage, Slushie &amp; Bar Equipment Repair — Cuyahoga County, OH Only
              </h3>

              <p className="text-sm text-[#CCCCCC] leading-relaxed">
                Built for bars, restaurants, convenience stores, and venues in{" "}
                <strong className="text-white">Cuyahoga County, Ohio</strong> where a down slushie or ice machine costs{" "}
                <strong className="text-[#5ADCC8]">~$98/day</strong> in lost gross profit.{" "}
                <strong className="text-white">
                  We drop off a replacement machine so you keep selling
                </strong>{" "}
                while we repair yours on our bench.
              </p>

              <ul className="space-y-2 text-xs sm:text-sm text-[#CCCCCC]">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
                  <span>Frozen Beverage &amp; Slushie Machines (Primary Focus)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
                  <span>Commercial Ice Machines, Coolers, Freezers &amp; Glycol Chillers</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
                  <span>
                    $99 Diagnostic (credited toward repair) · Care Plans $149–$199/mo
                  </span>
                </li>
              </ul>
            </div>

            <div className="pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center justify-between gap-3">
              <Link
                href="/food-service"
                className="w-full text-center px-5 py-3 rounded border border-[#5ADCC8] text-[#5ADCC8] hover:bg-[#5ADCC8] hover:text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                Explore Cuyahoga County Food Service &amp; Loaners →
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

      {/* SECTION 1.5: CUYAHOGA COUNTY LOANER PROGRAM CALLOUT (DIVISION 02 TEASER BAND) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="rounded-xl bg-[#0A0A0A] border border-[#5ADCC8]/50 p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase tracking-wider">
                Cuyahoga County service only
              </span>
              <span className="text-xs font-mono uppercase text-[#CCCCCC]">
                Division 02 · Bars, Restaurants &amp; Convenience Stores
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
              Down Frozen Beverage Machine Costs ~$98/Day. We Drop Off a Loaner First.
            </h2>

            <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
              At <strong className="text-white">60 drinks/day × ~$2.72/drink</strong>{" "}
              (~60% gross margin), a broken slushie or frozen cocktail machine costs{" "}
              <strong className="text-[#5ADCC8]">~$98/day in lost gross profit</strong>{" "}
              (~$686/week). With 3J&apos;s Cuyahoga County Loaner Program, we drop off a sanitized replacement machine so you keep pouring while we repair yours on our bench. Loaners are{" "}
              <strong className="text-white">FREE inside a Monthly Care Plan</strong>{" "}
              (<strong className="text-[#5ADCC8]">$149–$199/mo per location</strong> or{" "}
              <strong className="text-[#5ADCC8]">$79–$99/mo</strong> single-machine).
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/food-service"
              className="w-full text-center px-6 py-4 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors"
            >
              Calculate Downtime &amp; Book Loaner →
            </Link>
            <a
              href={BRAND.phoneHref}
              className="w-full text-center px-6 py-3.5 rounded border border-[#383838] hover:border-[#5ADCC8] text-white font-mono font-bold text-xs uppercase tracking-wider transition-colors"
            >
              Cuyahoga Dispatch: {BRAND.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1.6: UNIFIED QUOTE / SERVICE REQUEST SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <QuoteRequestForm />
      </section>
    </div>
  );
}
