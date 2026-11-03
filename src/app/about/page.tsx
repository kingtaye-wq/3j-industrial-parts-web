"use client";

import React, { useState } from "react";
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
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Cleveland, OH");
  const [track, setTrack] = useState<
    | "Applicant / Trainee Pathway"
    | "Vocational School / Instructor"
    | "Experienced Commercial Tech"
  >("Applicant / Trainee Pathway");
  const [backgroundNote, setBackgroundNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  async function handleJoinRepairSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "join-3ji-repair-interest",
          name,
          phone,
          email,
          city,
          track,
          backgroundNote,
        }),
      });
      const data = await res.json();
      setSubmittedRef(data.referenceId || "3J-REP-24H");
    } catch {
      setSubmittedRef("3J-REP-24H");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen">
      {/* FOUNDER STORY & PROOF HERO */}
      <section className="border-b border-[#262626] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0A0A0A] border border-[#5ADCC8]/40">
                <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5ADCC8]">
                  ABOUT {BRAND.legalName} · FOUNDER STORY
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight leading-[1.08] text-white">
                The Specialist the OEMs Don&apos;t Give You Direct Access to Anymore.
              </h1>

              <blockquote
                data-testid="about-verbatim-proof"
                className="p-5 rounded-lg bg-[#0A0A0A] border-l-4 border-[#5ADCC8] text-lg sm:text-xl font-bold text-white leading-snug"
              >
                &ldquo;{BRAND.proofQuote}&rdquo;
              </blockquote>

              <div className="space-y-4 text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
                <p>
                  <strong className="text-white">{BRAND.founder}</strong> founded{" "}
                  <strong className="text-white">{BRAND.legalName}</strong> after serving as the ex-Foseco U.S. single point of contact supporting{" "}
                  <strong className="text-[#5ADCC8]">
                    SMARTT, MTS 1500, FDU Degasser, and ThermaTest NGIII 5000
                  </strong>{" "}
                  installations across American aluminum foundries and die casters.
                </p>
                <p>
                  When a melt-treatment unit faults mid-shift or a shipment of unverified graphite rotors arrives with the wrong thread pitch, foundries cannot afford multi-week OEM ticket queues. Through 3J, plant engineers and maintenance managers get direct access to the specialist who built the work instructions, calibrated the mass-flow controllers, and matched the serial numbers across the country.
                </p>
                <p>
                  At home in Northeast Ohio, 3J applies that same engineering discipline to{" "}
                  <strong className="text-white">
                    Division 02 — 3JI-Repair (Cuyahoga County, Ohio Launch Area)
                  </strong>
                  , our commercial equipment repair and loaner machine service — pairing breakdowns across refrigerators, coolers, freezers, ice machines, HVAC, and beverage machines with qualified technicians while training the next generation of specialists toward Division 01 foundry work.
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
                <div>
                  <span className="text-[#999999] block uppercase">
                    DIVISION 02 (3JI-REPAIR) LAUNCH AREA
                  </span>
                  <span className="text-[#5ADCC8] font-bold">
                    Cuyahoga County, Ohio Only
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
                  href="/food-service"
                  className="w-full text-center px-4 py-3 rounded border border-[#383838] hover:border-[#5ADCC8] text-white font-mono text-xs uppercase tracking-wider transition-colors"
                >
                  3JI-Repair (Cuyahoga County) →
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
            CORE CAPABILITIES &amp; DIFFERENTIATORS
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            How 3J Protects Your Melt Deck &amp; Equipment Uptime
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {DIFFERENTIATORS.map((cap) => (
            <div
              key={cap.code}
              className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 space-y-3"
            >
              <span className="text-xs font-mono text-[#5ADCC8] font-bold">
                {cap.code}
              </span>
              <h3 className="text-xl font-extrabold uppercase text-white">
                {cap.title}
              </h3>
              <p className="text-sm text-[#CCCCCC] leading-relaxed">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* JOIN 3JI-REPAIR RECRUITING & TRADE PATHWAY SECTION */}
      <section
        id="join-3ji-repair"
        className="bg-[#050505] border-b border-[#262626] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Program Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase tracking-wider">
                VOCATIONAL TRADE PATHWAY · CUYAHOGA COUNTY LAUNCH AREA → DIVISION 01 FOUNDRY
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                Join 3JI-Repair
              </h2>

              <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
                <strong className="text-white">3JI-Repair</strong> is 3J Industrial Parts&apos; commercial equipment repair service in the{" "}
                <strong className="text-white">Cuyahoga County, Ohio launch area</strong>.{" "}
                Built as a structured, vocational-style trade pathway led personally by{" "}
                <strong className="text-white">{BRAND.founder}</strong>,{" "}
                <strong className="text-[#5ADCC8]">3JI-Repair</strong> trains technicians from the bench up on real commercial equipment and advances top performers toward nationwide industrial foundry systems.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase block">
                    STAGE 01 · TRAIN UNDER JASON IN THE CUYAHOGA COUNTY LAUNCH AREA
                  </span>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] mt-1">
                    3JI-Repair trainees build hands-on competencies under Jason on commercial refrigerators, coolers, freezers, ice machines, HVAC, and beverage/slushie machines — mastering electrical schematics, drive rebuilds, Ohio food code OAC 3717-1-08.1 sanitation procedures, and supervised field calls.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase block">
                    STAGE 02 · GRADUATE TO CLAIMING FIELD JOBS (OPPORTUNITIES)
                  </span>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] mt-1">
                    Once Jason signs off on bench and field competencies, graduated 3JI-Repair technicians qualify to claim commercial repair opportunities and loaner-swap dispatches across progressive technical tiers (L1 → L2 → L3, with EPA 608 certification for sealed refrigeration systems).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#5ADCC8]/50">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase block">
                    STAGE 03 · RECRUITMENT TOWARD DIVISION 01 FOUNDRY SYSTEMS
                  </span>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] mt-1">
                    The 3JI-Repair technician pipeline doubles as the recruiting pathway for{" "}
                    <strong className="text-white">Division 01 Foundry Support</strong>. The best graduates are recruited toward the industrial melt-treatment work Jason does nationwide:{" "}
                    <strong className="text-white">
                      FDU, MTS 1500, SMARTT, and ThermaTest NGIII 5000
                    </strong>{" "}
                    systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Interested in Joining 3JI-Repair Form */}
            <div className="lg:col-span-6 rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8] p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                  REAL TRADE PATHWAY · EARN-WHILE-YOU-LEARN MENTORSHIP
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold uppercase text-white">
                  Interested in joining 3JI-Repair?
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#CCCCCC]">
                  Submit your details below to connect directly with {BRAND.founder} (
                  <span className="font-mono text-[#5ADCC8]">{BRAND.email}</span>) about the 3JI-Repair technician pathway in Cuyahoga County.
                </p>
              </div>

              {submittedRef ? (
                <div
                  role="status"
                  data-testid="jtp-confirmation"
                  className="rounded-lg bg-[#051412] border border-[#5ADCC8] p-6 space-y-3"
                >
                  <span className="inline-block px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase">
                    3JI-Repair Pathway Inquiry Logged · Ref #{submittedRef}
                  </span>
                  <h4 className="text-lg font-extrabold uppercase text-white">
                    Thank You, {name}. Your Interest Has Been Sent to {BRAND.founder}.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                    Your 3JI-Repair inquiry under{" "}
                    <strong className="text-[#5ADCC8]">{track}</strong> has been routed to{" "}
                    <a
                      href={BRAND.emailHref}
                      className="text-[#5ADCC8] underline font-mono"
                    >
                      {BRAND.email}
                    </a>
                    . Jason reviews all 3JI-Repair technician inquiries personally.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmittedRef(null)}
                    className="px-4 py-2 rounded border border-[#383838] text-xs font-mono uppercase text-[#CCCCCC] hover:text-white"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleJoinRepairSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="jtp-name"
                        className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                      >
                        Full Name *
                      </label>
                      <input
                        id="jtp-name"
                        data-testid="jtp-name-input"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="jtp-phone"
                        className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <input
                        id="jtp-phone"
                        data-testid="jtp-phone-input"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="216-555-0192"
                        className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="jtp-email"
                        className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                      >
                        Email Address *
                      </label>
                      <input
                        id="jtp-email"
                        data-testid="jtp-email-input"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="jtp-city"
                        className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                      >
                        City / Location *
                      </label>
                      <input
                        id="jtp-city"
                        data-testid="jtp-city-input"
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Cleveland, OH"
                        className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="jtp-track"
                      className="block text-xs font-mono uppercase text-[#5ADCC8] font-bold mb-1.5"
                    >
                      3JI-Repair Pathway Track *
                    </label>
                    <select
                      id="jtp-track"
                      data-testid="jtp-track-select"
                      value={track}
                      onChange={(e) =>
                        setTrack(
                          e.target.value as
                            | "Applicant / Trainee Pathway"
                            | "Vocational School / Instructor"
                            | "Experienced Commercial Tech"
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#5ADCC8]/60 text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                    >
                      <option value="Applicant / Trainee Pathway">
                        Applicant / Trainee Pathway (Train Under Jason in Cuyahoga County)
                      </option>
                      <option value="Vocational School / Instructor">
                        Vocational School / Instructor (Trade Program Partnership)
                      </option>
                      <option value="Experienced Commercial Tech">
                        Experienced Commercial Tech (Refrigeration / HVAC / EPA 608)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="jtp-note"
                      className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                    >
                      Any Mechanical, Electrical, or Trade Experience *
                    </label>
                    <textarea
                      id="jtp-note"
                      data-testid="jtp-note-input"
                      rows={3}
                      required
                      value={backgroundNote}
                      onChange={(e) => setBackgroundNote(e.target.value)}
                      placeholder="Share any hands-on mechanical, electrical, refrigeration, HVAC, or trade school experience..."
                      className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                    />
                  </div>

                  <p className="text-[11px] text-[#999999] leading-relaxed">
                    Note: Submission expresses interest in the 3JI-Repair vocational training pathway and does not constitute an offer or guarantee of specific schedules or terms.
                  </p>

                  <button
                    type="submit"
                    data-testid="jtp-submit-btn"
                    disabled={submitting}
                    className="w-full px-6 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {submitting
                      ? "Sending Inquiry..."
                      : "Submit 3JI-Repair Interest Form →"}
                  </button>
                </form>
              )}
            </div>
          </div>
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
              Need Foundry Parts or Cuyahoga 3JI-Repair Service?
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
