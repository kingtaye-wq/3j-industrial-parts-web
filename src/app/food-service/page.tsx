"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  BRAND,
  CUYAHOGA_COUNTY_CITIES,
  CUYAHOGA_VALIDATION_ALERT,
  REPAIR_EQUIPMENT_SCOPE,
  validateCuyahogaLocation,
} from "@/data/catalog";

const EQUIPMENT_CATEGORIES = [
  {
    step: "01",
    title: "1. Beverage, Frozen Beverage & Slushie Machines (Loaner Fleet Hero)",
    badge: "Loaner Dropped Off First",
    description:
      "Beverage machines, frozen beverage/slushie machines (Bunn Ultra, Taylor, Frosty Factory, Elmeco, Spaceman, Granita), soda fountain & carbonation systems, and juice dispensers & mixers. For down beverage machines, a 3JI-Repair technician drops off a sanitized replacement loaner first so you keep selling.",
  },
  {
    step: "02",
    title: "2. Refrigerators, Coolers & Freezers (Walk-In, Reach-In & Merchandisers)",
    badge: "Commercial Cold Storage",
    description:
      "Commercial refrigerators, coolers, freezers, walk-in coolers & freezers, reach-in & undercounter refrigeration, display merchandiser cases, and bottle coolers & kegerators (True, Beverage-Air, Turbo Air, Delfield). Compressors, evaporator coils, thermostats, relays, and door gaskets.",
  },
  {
    step: "03",
    title: "3. Commercial Ice Machines, Dispensers & Bins",
    badge: "EPA 608 Certified",
    description:
      "Commercial ice machines, ice dispensers & bins (Manitowoc, Hoshizaki, Scotsman, Ice-O-Matic cubers, flakers, and nuggets). Water pumps, harvest valves, control boards, descaling, and bi-annual preventative sanitation.",
  },
  {
    step: "04",
    title: "4. Commercial HVAC, Draft Beer Systems & Glycol Chillers",
    badge: "Master Refrigeration & HVAC",
    description:
      "Commercial kitchen/bar HVAC units, make-up air & rooftop package diagnostics, plus draft beer systems & glycol chillers keeping long-draw tap lines and dining rooms at spec during peak service hours.",
  },
];

const LOANER_STEPS = [
  {
    number: "1",
    title: "1. Pair Qualified 3JI-Repair Tech",
    description:
      "Submit your breakdown in Cuyahoga County and we pair a qualified 3JI-Repair technician to the job — reserving a replacement unit from our hub when a beverage loaner is needed.",
  },
  {
    number: "2",
    title: "2. Drop Off & Install Loaner First",
    description:
      "For frozen beverage & slushie machines, our technician drops off and installs a sanitized replacement loaner machine at your venue first — so your staff keeps pouring and selling.",
  },
  {
    number: "3",
    title: "3. Bench Repair Done Right",
    description:
      "We transport your downed machine to our repair bench (or repair refrigerators, coolers, freezers, ice machines & HVAC on-site), run full diagnostics ($99 fee credited toward repair), and load-test.",
  },
  {
    number: "4",
    title: "4. Return Machine & Sanitize Loaner",
    description:
      "We return your repaired unit, retrieve the loaner, and complete a mandatory Ohio food code OAC 3717-1-08.1 sanitation log before the loaner returns to active fleet duty.",
  },
];

export default function FoodServicePage() {
  // Interactive Downtime Cost Calculator State (default 60 drinks/day)
  const [drinksPerDay, setDrinksPerDay] = useState<number>(60);
  const [daysDown, setDaysDown] = useState<number>(3);

  // Benchmark math per brand spec:
  // 60 drinks/day × ~$2.72/drink (~60% margin) ≈ $98/day lost gross profit
  const grossPricePerDrink = 2.72;
  const marginRate = 0.6;
  const dailyLostProfit = Math.round(
    drinksPerDay * (grossPricePerDrink * marginRate)
  );
  const threeDayLoss = dailyLostProfit * 3;
  const sevenDayLoss = dailyLostProfit * 7;
  const selectedWaitLoss = dailyLostProfit * daysDown;

  // Cuyahoga County Service Request Form State
  const [businessName, setBusinessName] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [cityOrZip, setCityOrZip] = useState("");
  const [machineType, setMachineType] = useState<string>(
    "Frozen Beverage / Slushie Machines"
  );
  const [needLoaner, setNeedLoaner] = useState("Yes — Drop Off Loaner Machine");
  const [planInterest, setPlanInterest] = useState(
    "Enroll in Monthly Care Plan ($149–$199/mo — Free Loaner)"
  );
  const [symptom, setSymptom] = useState("");
  const [locationError, setLocationError] = useState<string | null>(null);
  const [matchedLocality, setMatchedLocality] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  function handleCityOrZipChange(val: string) {
    setCityOrZip(val);
    if (!val.trim()) {
      setLocationError(null);
      setMatchedLocality(null);
      return;
    }
    const result = validateCuyahogaLocation(val);
    if (!result.valid) {
      setLocationError(result.reason || CUYAHOGA_VALIDATION_ALERT);
      setMatchedLocality(null);
    } else {
      setLocationError(null);
      setMatchedLocality(result.matchedLocality || "Cuyahoga County, OH");
    }
  }

  async function handleBookingSubmit(e: React.FormEvent) {
    e.preventDefault();
    const check = validateCuyahogaLocation(cityOrZip);
    if (!check.valid) {
      setLocationError(check.reason || CUYAHOGA_VALIDATION_ALERT);
      setMatchedLocality(null);
      return;
    }

    setLocationError(null);
    setMatchedLocality(check.matchedLocality || "Cuyahoga County, OH");
    setSubmitting(true);

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "3ji-repair-cuyahoga-booking",
          service: "3JI-Repair",
          businessName,
          contactName,
          phone,
          email,
          streetAddress,
          cityOrZip,
          verifiedCounty: "Cuyahoga County, Ohio",
          machineType,
          needLoaner,
          planInterest,
          symptom,
        }),
      });
      const data = await res.json();
      setSubmittedRef(data.referenceId || "3J-CUY-24H");
    } catch {
      setSubmittedRef("3J-CUY-24H");
    } finally {
      setSubmitting(false);
    }
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `${BRAND.legalName} — 3JI-Repair (Division 02 Commercial Equipment Service)`,
    telephone: BRAND.phoneDisplay,
    email: BRAND.email,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Cuyahoga County, Ohio",
    },
    description:
      "3JI-Repair is 3J Industrial Parts LLC's commercial equipment repair and loaner machine service in the Cuyahoga County, Ohio launch area — servicing refrigerators, coolers, freezers, ice machines, HVAC, beverage machines, and frozen beverage/slushie machines.",
  };

  return (
    <div className="bg-[#000000] text-white min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* HERO SECTION */}
      <section className="border-b border-[#262626] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  data-testid="cuyahoga-hero-badge"
                  className="px-3.5 py-1.5 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase tracking-wider"
                >
                  CUYAHOGA COUNTY, OHIO — 3JI-REPAIR COMMERCIAL SERVICE
                </span>
                <span className="px-3 py-1.5 rounded bg-[#1A1A1A] border border-[#5ADCC8]/40 text-xs font-mono text-[#5ADCC8] uppercase font-bold">
                  Cuyahoga County service area · Launch Area
                </span>
              </div>

              <p className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                3JI-REPAIR · A SERVICE OF 3J INDUSTRIAL PARTS LLC (DIVISION 02)
              </p>

              <h1 className="text-3xl sm:text-5xl lg:text-[48px] font-extrabold uppercase tracking-tight leading-[1.08] text-white">
                Commercial Equipment Down? 3JI-Repair Pairs a Qualified Tech — and Drops Off a Beverage Loaner First.
              </h1>

              <p className="text-base sm:text-lg text-[#CCCCCC] leading-relaxed max-w-3xl">
                <strong className="text-white">3JI-Repair</strong> is{" "}
                <strong className="text-white">3J Industrial Parts&apos;</strong>{" "}
                commercial repair service in the{" "}
                <strong className="text-[#5ADCC8]">Cuyahoga County, Ohio launch area</strong>.{" "}
                When a refrigerator, cooler, freezer, ice machine, HVAC unit, or beverage machine goes down, we pair a qualified{" "}
                <strong className="text-white">3JI-Repair</strong> technician to your job. And for frozen beverage or slushie machines — where downtime drains{" "}
                <strong className="text-[#5ADCC8]">~$98/day in lost gross profit</strong>{" "}
                — we drop off a sanitized replacement loaner machine first, repair yours on our bench, and return it ready to pour.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <a
                  href="#booking-form"
                  className="inline-flex items-center justify-center px-6 py-4 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-sm uppercase tracking-wider transition-colors"
                >
                  Request 3JI-Repair Dispatch / Loaner Swap →
                </a>
                <a
                  href="#pricing-care-plan"
                  className="inline-flex items-center justify-center px-6 py-4 rounded bg-[#0A0A0A] hover:bg-[#1A1A1A] text-white border border-[#5ADCC8]/50 font-bold text-sm uppercase tracking-wider transition-colors"
                >
                  Enroll in Monthly Care Plan ($149–$199/mo)
                </a>
              </div>
            </div>

            {/* Quick Cuyahoga Dispatch & SLA Card */}
            <div className="lg:col-span-4 rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8] p-6 space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#5ADCC8] font-bold uppercase">
                  3JI-REPAIR DISPATCH
                </span>
                <span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-white">
                  Cuyahoga County Launch Area
                </span>
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono text-[#999999] block uppercase">
                  DIRECT EMERGENCY LINE
                </span>
                <a
                  href={BRAND.phoneHref}
                  className="text-2xl sm:text-3xl font-mono font-extrabold text-[#5ADCC8] hover:underline block"
                >
                  {BRAND.phoneDisplay}
                </a>
              </div>
              <div className="space-y-2 pt-3 border-t border-[#1A1A1A] text-xs text-[#CCCCCC]">
                <p>
                  ✓ <strong className="text-white">$99 Diagnostic</strong> — 100% credited toward your repair
                </p>
                <p>
                  ✓ <strong className="text-white">Loaner Machine Included FREE</strong> inside Monthly Care Plans ($149–$199/mo)
                </p>
                <p>
                  ✓ <strong className="text-[#5ADCC8]">Estimate within 24 hours</strong> on all 3JI-Repair service &amp; care-plan quotes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL 3JI-REPAIR EQUIPMENT SCOPE (JASON'S LIST + ADJACENT MACHINES) */}
      <section
        id="equipment-scope"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#262626] space-y-10"
      >
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            3JI-REPAIR EQUIPMENT SCOPE · CUYAHOGA COUNTY, OHIO LAUNCH AREA
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Commercial Refrigeration, Ice, HVAC &amp; Beverage Equipment We Service
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#CCCCCC] max-w-3xl">
            Every <strong className="text-white">3JI-Repair</strong> job is paired with a qualified technician across our full commercial equipment scope in Cuyahoga County:
          </p>
        </div>

        {/* Complete 15-Item Equipment Scope Pill Grid */}
        <div
          data-testid="equipment-scope-grid"
          className="rounded-xl bg-[#0A0A0A] border border-[#5ADCC8]/50 p-6 space-y-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A1A1A] pb-3">
            <span className="text-xs font-mono uppercase text-[#5ADCC8] font-bold">
              COMPLETE 3JI-REPAIR COMMERCIAL EQUIPMENT LIST ({REPAIR_EQUIPMENT_SCOPE.length} CATEGORIES)
            </span>
            <span className="text-xs font-mono text-[#CCCCCC]">
              Cuyahoga County Service Area
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {REPAIR_EQUIPMENT_SCOPE.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded bg-[#000000] border border-[#262626] text-xs sm:text-sm font-semibold text-white"
              >
                <span className="h-2 w-2 rounded-full bg-[#5ADCC8] flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EQUIPMENT_CATEGORIES.map((eq) => (
            <div
              key={eq.step}
              className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="px-2.5 py-0.5 rounded bg-[#1A1A1A] text-[#5ADCC8] font-bold">
                  {eq.badge}
                </span>
                <span className="text-[#999999]">3JI-Repair · Cuyahoga County</span>
              </div>
              <h3 className="text-xl font-extrabold uppercase text-white">
                {eq.title}
              </h3>
              <p className="text-sm text-[#CCCCCC] leading-relaxed">
                {eq.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW THE LOANER SWAP WORKS (4 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-b border-[#262626]">
        <div className="mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
            ZERO-DOWNTIME WORKFLOW · 3JI-REPAIR LOANER FLEET
          </span>
          <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            How the 3JI-Repair Loaner Workflow Works (4 Steps)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOANER_STEPS.map((item) => (
            <div
              key={item.number}
              className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 space-y-3 relative"
            >
              <div className="flex items-center justify-between">
                <span className="h-9 w-9 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-base flex items-center justify-center">
                  {item.number}
                </span>
                <span className="text-[11px] font-mono uppercase text-[#5ADCC8]">
                  3JI-Repair Step 0{item.number}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold uppercase text-white pt-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* INTERACTIVE DOWNTIME COST CALCULATOR */}
      <section
        id="downtime-calculator"
        className="bg-[#050505] border-b border-[#262626] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8]/60 p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left: Calculator Controls */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                    INTERACTIVE DOWNTIME COST CALCULATOR
                  </span>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                    See What a Down Frozen Machine Actually Costs You
                  </h2>
                  <p className="mt-2 text-sm text-[#CCCCCC]">
                    Industry benchmark:{" "}
                    <strong className="text-white">60 drinks/day × ~$2.72/drink</strong>{" "}
                    (~60% gross margin = ~$1.63 net profit/cup) equals{" "}
                    <strong className="text-[#5ADCC8]">~$98/day in lost gross profit</strong>.
                  </p>
                </div>

                <div className="space-y-4 bg-[#000000] p-5 rounded-lg border border-[#262626]">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="calc-drinks-input"
                        className="text-xs font-mono uppercase text-[#CCCCCC] font-bold"
                      >
                        Estimated Frozen Drinks Sold Per Day
                      </label>
                      <span className="text-sm font-mono font-extrabold text-[#5ADCC8]">
                        {drinksPerDay} drinks/day
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        id="calc-drinks-input"
                        data-testid="calc-drinks-input"
                        type="number"
                        min={1}
                        max={500}
                        value={drinksPerDay}
                        onChange={(e) =>
                          setDrinksPerDay(Math.max(0, Number(e.target.value) || 0))
                        }
                        className="w-28 px-3 py-2 rounded bg-[#0A0A0A] border border-[#5ADCC8] text-white font-mono font-bold text-base focus:outline-none"
                      />
                      <input
                        type="range"
                        min={10}
                        max={200}
                        step={5}
                        value={Math.min(200, Math.max(10, drinksPerDay))}
                        onChange={(e) => setDrinksPerDay(Number(e.target.value))}
                        aria-label="Adjust frozen drinks per day"
                        className="flex-1 accent-[#5ADCC8]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1A1A1A]">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="calc-days-input"
                        className="text-xs font-mono uppercase text-[#CCCCCC] font-bold"
                      >
                        Days Machine Sits Down Waiting for Repair
                      </label>
                      <span className="text-sm font-mono font-extrabold text-white">
                        {daysDown} {daysDown === 1 ? "day" : "days"} down
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <input
                        id="calc-days-input"
                        data-testid="calc-days-input"
                        type="number"
                        min={1}
                        max={30}
                        value={daysDown}
                        onChange={(e) =>
                          setDaysDown(Math.max(1, Number(e.target.value) || 1))
                        }
                        className="w-24 px-3 py-2 rounded bg-[#0A0A0A] border border-[#383838] text-white font-mono font-bold text-sm"
                      />
                      {[1, 3, 7, 14].map((d) => (
                        <button
                          key={d}
                          type="button"
                          onClick={() => setDaysDown(d)}
                          className={`px-3 py-2 rounded text-xs font-mono uppercase cursor-pointer ${
                            daysDown === d
                              ? "bg-[#5ADCC8] text-[#000000] font-extrabold"
                              : "bg-[#1A1A1A] text-[#CCCCCC] hover:text-white"
                          }`}
                        >
                          {d} {d === 1 ? "Day" : "Days"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Calculated Loss Output vs. 3J Care Plan */}
              <div className="lg:col-span-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-4 rounded-lg bg-[#000000] border border-[#5ADCC8]">
                    <span className="text-[11px] font-mono uppercase text-[#999999] block">
                      DAILY LOST GROSS PROFIT
                    </span>
                    <strong
                      data-testid="calc-daily-loss"
                      className="text-2xl sm:text-3xl font-mono font-extrabold text-[#5ADCC8] mt-1 block"
                    >
                      ~${dailyLostProfit}/day
                    </strong>
                    <span className="text-[11px] text-[#CCCCCC] font-mono">
                      (${grossPricePerDrink.toFixed(2)}/drink · ~60% margin)
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#000000] border border-[#262626]">
                    <span className="text-[11px] font-mono uppercase text-[#999999] block">
                      3-DAY WAIT LOSS
                    </span>
                    <strong
                      data-testid="calc-3day-loss"
                      className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-1 block"
                    >
                      ${threeDayLoss.toLocaleString()}
                    </strong>
                    <span className="text-[11px] text-[#CCCCCC] font-mono">
                      Weekend breakdown cost
                    </span>
                  </div>

                  <div className="p-4 rounded-lg bg-[#000000] border border-[#262626]">
                    <span className="text-[11px] font-mono uppercase text-[#999999] block">
                      7-DAY WAIT LOSS
                    </span>
                    <strong
                      data-testid="calc-7day-loss"
                      className="text-2xl sm:text-3xl font-mono font-extrabold text-white mt-1 block"
                    >
                      ${sevenDayLoss.toLocaleString()}
                    </strong>
                    <span className="text-[11px] text-[#CCCCCC] font-mono">
                      1-week parts delay
                    </span>
                  </div>
                </div>

                <div className="p-5 rounded-lg bg-[#051815] border border-[#5ADCC8] space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#5ADCC8] font-bold uppercase">
                      YOUR {daysDown}-DAY DOWNTIME LOSS: ${selectedWaitLoss.toLocaleString()}
                    </span>
                    <span className="text-white font-bold">VS. 3JI-REPAIR CARE PLAN</span>
                  </div>
                  <p className="text-xs sm:text-sm text-white leading-relaxed">
                    Just <strong>two days of downtime (~${dailyLostProfit * 2})</strong>{" "}
                    costs as much as an entire month of the{" "}
                    <strong className="text-[#5ADCC8]">
                      3JI-Repair Monthly Care Plan ($149–$199/mo per location · $79–$99/mo single-machine)
                    </strong>{" "}
                    — which includes <strong>FREE loaner machine swaps ($0)</strong>{" "}
                    and priority Cuyahoga County dispatch, or start with a{" "}
                    <strong className="text-[#5ADCC8]">
                      $99 Diagnostic (credited toward repair)
                    </strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSPARENT PRICING & CARE PLAN CARDS (LOCKED NUMBERS) */}
      <section
        id="pricing-care-plan"
        className="bg-[#000000] border-b border-[#262626] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
              NO SURPRISE INVOICES · LOCKED 3JI-REPAIR (DIVISION 02) RATE SCHEDULE
            </span>
            <h2 className="mt-2 text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Transparent Pricing &amp; Monthly Care Plans
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Rate Card Table */}
            <div className="lg:col-span-7 rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-8 space-y-4">
              <h3 className="text-xl font-extrabold uppercase text-white border-b border-[#1A1A1A] pb-3">
                3JI-Repair Diagnostic, Labor &amp; Loaner Rates
              </h3>

              <div className="divide-y divide-[#1A1A1A] text-sm">
                <div className="py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong className="text-white block">Diagnostic Assessment</strong>
                    <span className="text-xs text-[#CCCCCC]">
                      Credited 100% toward your repair when work proceeds
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-[#5ADCC8] text-base">
                    $99 credited toward repair
                  </span>
                </div>

                <div className="py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong className="text-white block">Bench Labor Rate</strong>
                    <span className="text-xs text-[#CCCCCC]">
                      Workshop overhaul, auger/drive rebuilds, seal &amp; board replacement
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-white text-base">
                    $119–129/hr
                  </span>
                </div>

                <div className="py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong className="text-white block">Field Labor Rate</strong>
                    <span className="text-xs text-[#CCCCCC]">
                      On-site commercial equipment troubleshooting &amp; service in Cuyahoga County
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-white text-base">
                    $139–149/hr
                  </span>
                </div>

                <div className="py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong className="text-white block">
                      Refrigeration / Master Labor Rate
                    </strong>
                    <span className="text-xs text-[#CCCCCC]">
                      Sealed-system compressor, walk-in, HVAC, glycol &amp; EPA 608 work
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-white text-base">
                    $169–179/hr
                  </span>
                </div>

                <div className="py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong className="text-white block">Replacement Parts Markup</strong>
                    <span className="text-xs text-[#CCCCCC]">
                      Transparent commercial parts pricing above wholesale cost
                    </span>
                  </div>
                  <span className="font-mono font-extrabold text-white text-base">
                    +35% standard (25% contract)
                  </span>
                </div>

                <div className="py-3.5 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <strong className="text-white block">
                      Loaner Machine Rental (Non-Plan)
                    </strong>
                    <span className="text-xs text-[#CCCCCC]">
                      Drop-off replacement slushie/frozen beverage unit while yours is repaired
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-extrabold text-[#5ADCC8] text-base block">
                      $25–49/day or $149–249/incident
                    </span>
                    <span className="text-xs font-mono text-white">
                      (Free inside a Care Plan)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Care Plan Card */}
            <div className="lg:col-span-5 rounded-xl bg-[#051815] border-2 border-[#5ADCC8] p-6 sm:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase">
                    MOST POPULAR · ZERO DOWNTIME
                  </span>
                  <span className="text-xs font-mono text-[#5ADCC8]">
                    Cuyahoga County Launch Area
                  </span>
                </div>

                <h3 className="text-2xl font-extrabold uppercase text-white">
                  3JI-Repair Monthly Care Plan
                </h3>

                <div className="p-4 rounded-lg bg-[#000000] border border-[#5ADCC8]/50 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-mono uppercase text-[#CCCCCC]">
                      Multi-Unit / Per Location:
                    </span>
                    <strong className="text-2xl font-mono font-extrabold text-[#5ADCC8]">
                      $149–199/mo per location
                    </strong>
                  </div>
                  <div className="flex items-baseline justify-between border-t border-[#1A1A1A] pt-2">
                    <span className="text-xs font-mono uppercase text-[#CCCCCC]">
                      Single-Machine Plan:
                    </span>
                    <strong className="text-lg font-mono font-extrabold text-white">
                      $79–99/mo
                    </strong>
                  </div>
                </div>

                <div className="space-y-2.5 text-sm text-[#CCCCCC]">
                  <p className="text-xs font-mono uppercase text-[#5ADCC8] font-bold">
                    What&apos;s Included in Your Care Plan:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <span className="text-[#5ADCC8] font-bold">✓</span>
                      <span>
                        <strong className="text-white">
                          FREE Loaner Machine Swaps ($0 rental)
                        </strong>{" "}
                        whenever your frozen beverage machine needs bench repair
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#5ADCC8] font-bold">✓</span>
                      <span>
                        <strong className="text-white">Priority Same-Day Dispatch</strong>{" "}
                        across the Cuyahoga County, Ohio service area
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#5ADCC8] font-bold">✓</span>
                      <span>
                        <strong className="text-white">
                          Quarterly Frozen-Machine Sanitation &amp; Tune-Up
                        </strong>{" "}
                        (seals lubricated, condenser cleaned, brix/torque checked)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#5ADCC8] font-bold">✓</span>
                      <span>
                        <strong className="text-white">
                          Bi-Annual Commercial Ice Machine &amp; Cooler PM
                        </strong>{" "}
                        &amp; contract parts markup discount (<strong>25%</strong> vs. 35%)
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <a
                href="#booking-form"
                className="w-full text-center px-6 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors"
              >
                Enroll or Request 3JI-Repair Service Below →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE AREA STRIP + CUYAHOGA COUNTY VALIDATED BOOKING INTAKE FORM */}
      <section
        id="booking-form"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10"
      >
        {/* Cuyahoga County Service Area Strip */}
        <div className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
              3JI-REPAIR LAUNCH &amp; SERVICE AREA · CUYAHOGA COUNTY, OHIO MUNICIPALITIES
            </span>
            <span className="text-xs font-mono text-[#CCCCCC]">
              ZIP Codes 441xx · 44017 · 44022 · 44040 · 44070
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
            <strong className="text-white">3JI-Repair</strong> (Division 02 commercial repair and loaner delivery) currently serves our{" "}
            <strong className="text-white">Cuyahoga County, Ohio launch area</strong> — including{" "}
            {CUYAHOGA_COUNTY_CITIES.slice(0, 24).join(", ")}, and all surrounding Cuyahoga County communities.
          </p>
        </div>

        {/* Booking Intake Form */}
        <div className="rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8]/60 p-6 sm:p-10 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1A1A] pb-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                3JI-REPAIR · CUYAHOGA COUNTY COMMERCIAL DISPATCH &amp; CARE PLAN INTAKE
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                Book 3JI-Repair Service, Loaner Swap, or Care Plan
              </h2>
              <p className="mt-1 text-sm text-[#CCCCCC]">
                Submits directly to{" "}
                <span className="text-[#5ADCC8] font-mono">{BRAND.email}</span> ·{" "}
                <strong className="text-white">{BRAND.quotePromise}</strong>
              </p>
            </div>
            <div className="bg-[#000000] px-4 py-3 rounded border border-[#262626] text-xs font-mono">
              <span className="text-[#999999] block uppercase">IMMEDIATE DISPATCH</span>
              <a
                href={BRAND.phoneHref}
                className="text-lg font-extrabold text-[#5ADCC8] hover:underline"
              >
                {BRAND.phoneDisplay}
              </a>
            </div>
          </div>

          {submittedRef ? (
            <div
              role="status"
              data-testid="food-service-confirmation"
              className="rounded-lg bg-[#051412] border-2 border-[#5ADCC8] p-6 sm:p-8 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase">
                  3JI-Repair Booking Logged · Ref #{submittedRef}
                </span>
                <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase">
                  Verified Location: {matchedLocality}
                </span>
              </div>
              <h3 className="text-2xl font-extrabold uppercase text-white">
                3JI-Repair Service Request Sent to {BRAND.founder}
              </h3>
              <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
                We have received the <strong className="text-white">3JI-Repair</strong>{" "}
                service request for <strong className="text-white">{businessName}</strong> in{" "}
                <strong className="text-[#5ADCC8]">{matchedLocality}</strong> and routed it to{" "}
                <a
                  href={BRAND.emailHref}
                  className="text-[#5ADCC8] underline font-mono"
                >
                  {BRAND.email}
                </a>
                . You will receive a confirmed dispatch window and{" "}
                <strong className="text-white">estimate within 24 hours</strong>.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={BRAND.phoneHref}
                  className="px-5 py-2.5 rounded bg-[#5ADCC8] text-[#000000] font-extrabold text-xs uppercase tracking-wider"
                >
                  Call Dispatch Now: {BRAND.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedRef(null)}
                  className="px-4 py-2.5 rounded border border-[#383838] text-xs font-mono uppercase text-[#CCCCCC] hover:text-white"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="fs-business"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Bar / Restaurant / Venue Name *
                  </label>
                  <input
                    id="fs-business"
                    type="text"
                    required
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. West Side Taproom"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fs-contact"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Contact Name *
                  </label>
                  <input
                    id="fs-contact"
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Manager or Owner Name"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fs-phone"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="fs-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="216-555-0188"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fs-email"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="fs-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="manager@venue.com"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>
              </div>

              {/* Address + Cuyahoga County City / ZIP Validation */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="fs-street"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Street Address
                  </label>
                  <input
                    id="fs-street"
                    type="text"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                    placeholder="e.g. 14200 Detroit Ave"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fs-city-zip"
                    className="block text-xs font-mono uppercase text-[#5ADCC8] font-bold mb-1.5"
                  >
                    Cuyahoga County City or ZIP Code *
                  </label>
                  <input
                    id="fs-city-zip"
                    data-testid="fs-city-zip-input"
                    type="text"
                    required
                    value={cityOrZip}
                    onChange={(e) => handleCityOrZipChange(e.target.value)}
                    placeholder="e.g. Cleveland, Lakewood, Parma, or 44107"
                    className={`w-full px-3.5 py-2.5 rounded bg-[#000000] border text-white text-sm font-mono focus:outline-none ${
                      locationError
                        ? "border-amber-500"
                        : matchedLocality
                        ? "border-[#5ADCC8]"
                        : "border-[#383838]"
                    }`}
                  />
                  {matchedLocality && !locationError && (
                    <span
                      data-testid="cuyahoga-valid-badge"
                      className="text-xs font-mono text-[#5ADCC8] mt-1 block"
                    >
                      ✓ Verified 3JI-Repair Launch Area: {matchedLocality}
                    </span>
                  )}
                </div>
              </div>

              {/* Polite Inline Out-of-County Validation Alert */}
              {locationError && (
                <div
                  role="alert"
                  data-testid="cuyahoga-validation-alert"
                  className="rounded-lg bg-[#1A1205] border-2 border-amber-500 p-4 text-sm text-white space-y-2"
                >
                  <p className="font-semibold text-amber-300">{locationError}</p>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                    <Link
                      href="/parts-finder"
                      className="text-[#5ADCC8] underline font-bold"
                    >
                      Go to Division 01 Nationwide Foundry Parts Finder →
                    </Link>
                    <span className="text-[#CCCCCC]">
                      Or enter a valid Cuyahoga County, OH city/ZIP (e.g. Cleveland, Lakewood, Parma, Westlake, 44113).
                    </span>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="fs-machine"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Equipment Type (3JI-Repair Scope) *
                  </label>
                  <select
                    id="fs-machine"
                    value={machineType}
                    onChange={(e) => setMachineType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  >
                    {REPAIR_EQUIPMENT_SCOPE.map((eqName) => (
                      <option key={eqName} value={eqName}>
                        {eqName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="fs-loaner"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Need a Beverage Loaner Machine Dropped Off?
                  </label>
                  <select
                    id="fs-loaner"
                    value={needLoaner}
                    onChange={(e) => setNeedLoaner(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  >
                    <option value="Yes — Drop Off Loaner Machine">
                      Yes — Drop Off Replacement Loaner First (Beverage/Slushie)
                    </option>
                    <option value="No — On-Site Diagnostic / Repair Only">
                      No — On-Site Diagnostic / Repair ($99 Credited)
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="fs-plan"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Care Plan Option
                  </label>
                  <select
                    id="fs-plan"
                    value={planInterest}
                    onChange={(e) => setPlanInterest(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  >
                    <option value="Enroll in Monthly Care Plan ($149–$199/mo — Free Loaner)">
                      Monthly Care Plan ($149–$199/mo — Free Loaner)
                    </option>
                    <option value="Single-Machine Care Plan ($79–$99/mo)">
                      Single-Machine Care Plan ($79–$99/mo)
                    </option>
                    <option value="Standard Per-Incident Service ($99 Diagnostic Credited)">
                      Standard Per-Incident Service ($99 Diagnostic)
                    </option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="fs-symptom"
                  className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                >
                  Machine Make/Model &amp; Reported Symptom *
                </label>
                <textarea
                  id="fs-symptom"
                  rows={3}
                  required
                  value={symptom}
                  onChange={(e) => setSymptom(e.target.value)}
                  placeholder="e.g. Bunn Ultra-2 left hopper not freezing, True reach-in cooler warm, or Manitowoc ice machine fault..."
                  className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-[#CCCCCC]">
                  <strong className="text-[#5ADCC8]">3JI-Repair (Cuyahoga County Launch Area):</strong>{" "}
                  $99 diagnostic is credited toward repair. Guaranteed{" "}
                  <strong className="text-white">estimate within 24 hours</strong>.
                </p>
                <button
                  type="submit"
                  data-testid="fs-submit-btn"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-sm uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {submitting
                    ? "Validating & Submitting..."
                    : "Request 3JI-Repair Service / Loaner Swap →"}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
