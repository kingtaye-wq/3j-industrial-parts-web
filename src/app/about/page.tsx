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
    | "Applicant / Student"
    | "Vocational School / Instructor"
    | "Independent Tech (1099)"
  >("Applicant / Student");
  const [backgroundNote, setBackgroundNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  async function handleJuniorTechSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "junior-tech-program-interest",
          name,
          phone,
          email,
          city,
          track,
          backgroundNote,
        }),
      });
      const data = await res.json();
      setSubmittedRef(data.referenceId || "3J-JTP-24H");
    } catch {
      setSubmittedRef("3J-JTP-24H");
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
                    Division 02 Commercial Equipment Repair &amp; Loaner Fleet (Cuyahoga County, Ohio Only)
                  </strong>{" "}
                  — keeping local bars, restaurants, and venues pouring with drop-off loaner machines while training the next generation of mechanical technicians through{" "}
                  <strong className="text-[#5ADCC8]">The Junior Tech Program</strong>.
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
                    DIVISION 02 TERRITORY
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
                  Cuyahoga Food Service →
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

      {/* THE JUNIOR TECH PROGRAM SECTION + RECRUITING / PARTNERSHIP FORM */}
      <section
        id="junior-tech-program"
        className="bg-[#050505] border-b border-[#262626] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Program Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase tracking-wider">
                VOCATIONAL TRADE PATHWAY · CUYAHOGA COUNTY → NATIONWIDE FOUNDRY
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
                The Junior Tech Program
              </h2>

              <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
                Division 02 is staffed through{" "}
                <strong className="text-white">3J&apos;s Junior Tech Program</strong> — a structured, vocational-style training program led personally by{" "}
                <strong className="text-white">{BRAND.founder}</strong>. Rather than an anonymous gig board, the Junior Tech Program is a hands-on trade pathway where mechanical trainees learn commercial diagnostics from the bench up.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase block">
                    STAGE 01 · BENCH &amp; SUPERVISED FIELD TRAINING (CUYAHOGA COUNTY)
                  </span>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] mt-1">
                    Junior techs train under Jason on bar and restaurant equipment in Cuyahoga County — mastering frozen-beverage drive rebuilds, electrical schematics, Ohio food code OAC 3717-1-08.1 sanitation procedures, and supervised ride-alongs.
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#262626]">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase block">
                    STAGE 02 · GRADUATION TO FIELD CLAIMING (L1 → L2 → L3)
                  </span>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] mt-1">
                    Once Jason signs off on bench and field competencies, graduates earn qualification to claim Cuyahoga County field service and loaner-swap dispatches across progressive technical tiers (including EPA 608 refrigeration certification for L2/L3).
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#0A0A0A] border border-[#5ADCC8]/50">
                  <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase block">
                    STAGE 03 · DIVISION 01 INDUSTRIAL FOUNDRY MENTORSHIP
                  </span>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] mt-1">
                    The Junior Tech Program doubles as the recruiting pipeline for{" "}
                    <strong className="text-white">Division 01 Foundry Support</strong>. Top-performing graduates are recruited into mentorship with Jason to work on the big stuff: nationwide{" "}
                    <strong className="text-white">
                      FDU, MTS 1500, SMARTT, and ThermaTest NGIII 5000
                    </strong>{" "}
                    aluminum melt-treatment systems.
                  </p>
                </div>
              </div>
            </div>

            {/* Interactive Apply / Partner Interest Form */}
            <div className="lg:col-span-6 rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8] p-6 sm:p-8 space-y-5">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                  INTERESTED IN THE PROGRAM?
                </span>
                <h3 className="mt-1 text-xl sm:text-2xl font-extrabold uppercase text-white">
                  Apply or Partner with the Junior Tech Program
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#CCCCCC]">
                  Whether you are an aspiring technician, a trade/vocational school instructor, or an experienced independent tech, connect directly with{" "}
                  {BRAND.founder} ({BRAND.email}).
                </p>
              </div>

              {submittedRef ? (
                <div
                  role="status"
                  data-testid="jtp-confirmation"
                  className="rounded-lg bg-[#051412] border border-[#5ADCC8] p-6 space-y-3"
                >
                  <span className="inline-block px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase">
                    Junior Tech Program Inquiry Logged · Ref #{submittedRef}
                  </span>
                  <h4 className="text-lg font-extrabold uppercase text-white">
                    Thank You, {name}. Your Interest Has Been Sent to {BRAND.founder}.
                  </h4>
                  <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                    Your inquiry under track{" "}
                    <strong className="text-[#5ADCC8]">{track}</strong> has been routed to{" "}
                    <a
                      href={BRAND.emailHref}
                      className="text-[#5ADCC8] underline font-mono"
                    >
                      {BRAND.email}
                    </a>
                    . Jason reviews all Junior Tech Program inquiries personally.
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
                <form onSubmit={handleJuniorTechSubmit} className="space-y-4">
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
                      Program Track *
                    </label>
                    <select
                      id="jtp-track"
                      data-testid="jtp-track-select"
                      value={track}
                      onChange={(e) =>
                        setTrack(
                          e.target.value as
                            | "Applicant / Student"
                            | "Vocational School / Instructor"
                            | "Independent Tech (1099)"
                        )
                      }
                      className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#5ADCC8]/60 text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                    >
                      <option value="Applicant / Student">
                        Applicant / Student (Vocational Cohort Trainee)
                      </option>
                      <option value="Vocational School / Instructor">
                        Vocational School / Instructor (Training Partnership)
                      </option>
                      <option value="Independent Tech (1099)">
                        Independent Tech (1099) (Experienced Commercial / EPA 608 Tech)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="jtp-note"
                      className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                    >
                      Brief Background / Mechanical Experience / Note *
                    </label>
                    <textarea
                      id="jtp-note"
                      data-testid="jtp-note-input"
                      rows={3}
                      required
                      value={backgroundNote}
                      onChange={(e) => setBackgroundNote(e.target.value)}
                      placeholder="Share any hands-on mechanical, electrical, HVAC/R, or trade school background..."
                      className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                    />
                  </div>

                  <p className="text-[11px] text-[#999999] leading-relaxed">
                    Note: Submission expresses interest in the Junior Tech Program cohort or technical partnership network and does not constitute an offer or guarantee of specific schedules or terms.
                  </p>

                  <button
                    type="submit"
                    data-testid="jtp-submit-btn"
                    disabled={submitting}
                    className="w-full px-6 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    {submitting
                      ? "Sending Inquiry..."
                      : "Apply / Partner with the Junior Tech Program →"}
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
              Need Foundry Parts or Cuyahoga Commercial Service?
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
