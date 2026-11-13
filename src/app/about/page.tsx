import React from "react";
import Link from "next/link";
import { BRAND } from "@/data/catalog";

const DIFFERENTIATORS = [
  {
    code: "CAP-01",
    title: "Foundry Process Optimization",
    description:
      "We build visual standard work instructions with pictures and illustrations for your melt deck, then optimize rotor RPM, inert gas flow rates, and flux dosing cycles to reduce shift-to-shift variation and porosity scrap.",
  },
  {
    code: "CAP-02",
    title: "Preventative Maintenance & Calibration",
    description:
      "Scheduled mechanical and functional equipment health checks for FDU, MTS 1500, SMARTT, and ThermaTest NGIII 5000 platforms — identifying worn bearings, gas leaks, and thermocouple drift before they stop production.",
  },
  {
    code: "CAP-03",
    title: "Rapid Spare Parts Sourcing",
    description:
      "Every part is matched to your unit's serial number before it ships — from XSR/FDR/XDR/FDDR graphite rotors and shafts to DIAMANT ceramic wear parts, COVERAL/SIMODAL/NUCLEANT fluxes, and thermal analysis cups.",
  },
  {
    code: "CAP-04",
    title: "Emergency Field Troubleshooting",
    description:
      "When a melt-treatment station goes down, you speak directly with Jason Allen — not a call center queue. We diagnose PLC, pneumatic, mass-flow, and mechanical faults rapidly on-site or remotely.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-[#000000] text-white">
      {/* SECTION 2.1: HERO & FOUNDER NARRATIVE */}
      <section className="border-b border-[#262626] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Bio & Backstory */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-[#0A0A0A] border border-[#5ADCC8]/40">
                <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5ADCC8]">
                  About {BRAND.founder} &amp; {BRAND.legalName}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.08] text-white">
                Six-Plus Years at the Forefront of American Aluminum Melt-Treatment.
              </h1>

              <blockquote className="text-base sm:text-lg text-white border-l-4 border-[#5ADCC8] pl-4 italic leading-relaxed bg-[#0A0A0A] p-4 rounded-r">
                &ldquo;{BRAND.proofQuote}&rdquo;
              </blockquote>

              <div className="space-y-4 text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
                <p>
                  Before founding <strong className="text-white">3J Industrial Parts LLC</strong>,{" "}
                  <strong className="text-white">Jason Allen</strong> spent over six years serving as the dedicated national technical specialist for Foseco / Vesuvius melt-treatment systems — leading field service, equipment rebuilds, mechanical audits, and operator training across hundreds of{" "}
                  <strong className="text-white">
                    FDU, MTS 1500, SMARTT, and ThermaTest NGIII 5000
                  </strong>{" "}
                  installations across American aluminum foundries and die casters.
                </p>
                <p>
                  When a melt-treatment unit faults mid-shift or a shipment of unverified graphite rotors arrives with the wrong thread pitch, foundries cannot afford multi-week OEM ticket queues. Through 3J, plant engineers and maintenance managers get direct access to the specialist who built the work instructions, calibrated the mass-flow controllers, and matched the serial numbers across the country.
                </p>
              </div>
            </div>

            {/* Direct Contact & Fast Facts Card */}
            <div className="lg:col-span-4 rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-8 space-y-5">
              <div className="flex items-center gap-3 pb-4 border-b border-[#1A1A1A]">
                <div className="h-14 w-14 rounded bg-[#000000] border border-[#262626] p-1 flex items-center justify-center">
                  <img
                    src={BRAND.logoPath}
                    alt="3J Industrial Parts LLC Logo"
                    className="h-full w-full object-contain"
                    width={56}
                    height={56}
                  />
                </div>
                <div>
                  <h2 className="text-base font-extrabold uppercase text-white">
                    {BRAND.legalName}
                  </h2>
                  <p className="text-xs font-mono text-[#5ADCC8]">
                    {BRAND.founder}, Founder
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-[#999999] block uppercase">DIRECT PHONE</span>
                  <a
                    href={BRAND.phoneHref}
                    className="text-lg font-extrabold text-[#5ADCC8] hover:underline"
                  >
                    {BRAND.phoneDisplay}
                  </a>
                </div>
                <div>
                  <span className="text-[#999999] block uppercase">DIRECT EMAIL</span>
                  <a
                    href={BRAND.emailHref}
                    className="text-sm text-white hover:text-[#5ADCC8] break-all"
                  >
                    {BRAND.email}
                  </a>
                </div>
                <div>
                  <span className="text-[#999999] block uppercase">QUOTE TURNAROUND</span>
                  <strong className="text-[#5ADCC8] uppercase">
                    {BRAND.quotePromise}
                  </strong>
                </div>
                <div>
                  <span className="text-[#999999] block uppercase">
                    DIVISION 01 TERRITORY
                  </span>
                  <span className="text-white">
                    Nationwide U.S. (FDU, MTS 1500, SMARTT, ThermaTest NGIII 5000)
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1A1A1A] flex flex-col gap-2.5">
                <Link
                  href="/parts-finder"
                  className="w-full text-center px-4 py-3 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  Open Parts Finder →
                </Link>
                <Link
                  href="/#quote-request"
                  className="w-full text-center px-4 py-3 rounded border border-[#383838] hover:border-[#5ADCC8] text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  Request a Quote (24h SLA) →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAPABILITIES & DIFFERENTIATORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#262626]">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            FOUNDRY SUPPORT CAPABILITIES
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Engineering Rigor for High-Performance Melt Decks
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIFFERENTIATORS.map((diff) => (
            <div
              key={diff.code}
              className="p-6 rounded-xl bg-[#0A0A0A] border border-[#262626] hover:border-[#5ADCC8]/60 transition-colors space-y-3"
            >
              <span className="text-xs font-mono font-bold text-[#5ADCC8] uppercase">
                {diff.code}
              </span>
              <h3 className="text-lg font-bold uppercase text-white">
                {diff.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                {diff.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* DIRECT CONTACT BLOCK */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-8 sm:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
              {BRAND.legalName} · {BRAND.tagline}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white">
              Need Serial-Verified Foundry Parts or Emergency Support?
            </h2>
            <p className="text-sm text-[#CCCCCC]">
              Every quote request receives a detailed{" "}
              <strong className="text-[#5ADCC8]">estimate within 24 hours</strong>.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href={BRAND.phoneHref}
              className="px-6 py-3.5 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-sm uppercase tracking-wider"
            >
              Call {BRAND.phoneDisplay}
            </a>
            <a
              href={BRAND.emailHref}
              className="px-6 py-3.5 rounded border border-[#383838] hover:border-[#5ADCC8] text-white font-mono text-sm"
            >
              {BRAND.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
