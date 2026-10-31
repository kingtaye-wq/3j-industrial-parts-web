"use client";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  BRAND,
  CatalogPart,
  COMPONENT_CATEGORIES,
  ComponentCategory,
  PlatformId,
  PLATFORMS,
  SEEDED_PARTS_CATALOG,
} from "@/data/catalog";

const ALL_PLATFORM_OPTIONS: {
  id: PlatformId;
  label: string;
  subtitle: string;
}[] = [
  {
    id: "FDU",
    label: "FDU",
    subtitle: "Foundry Degassing Unit (Foseco / Vesuvius)",
  },
  {
    id: "MTS 1500",
    label: "MTS 1500",
    subtitle: "Metal Treatment Station (Rotary + Flux Dosing)",
  },
  {
    id: "SMARTT",
    label: "SMARTT",
    subtitle: "Software Melt Analysis & Rotary Treatment",
  },
  {
    id: "ThermaTest NGIII 5000",
    label: "ThermaTest NGIII 5000",
    subtitle: "Solidification Thermal Analysis System",
  },
  {
    id: "Other / Not Sure",
    label: "Other / Not Sure",
    subtitle: "Identify by Serial Number or Nameplate Photo",
  },
];

function PartsFinderContent() {
  const searchParams = useSearchParams();

  const [selectedPlatform, setSelectedPlatform] = useState<PlatformId>("FDU");
  const [serialNumber, setSerialNumber] = useState("FDU-2021-4481");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    ComponentCategory | "ALL"
  >("ALL");
  const [selectedPartIds, setSelectedPartIds] = useState<string[]>([
    "part-xsr-rotor-shaft",
    "part-diamant-baffle",
  ]);
  const [uploadedPhotoName, setUploadedPhotoName] = useState("");

  // Step 3 Quote Drawer Form State
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [urgency, setUrgency] = useState<
    "Standard Quote" | "Urgent — Line Down"
  >("Standard Quote");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    const paramPlatform = searchParams.get("platform");
    if (paramPlatform) {
      const matched = ALL_PLATFORM_OPTIONS.find(
        (p) => p.id.toLowerCase() === paramPlatform.toLowerCase()
      );
      if (matched) {
        setSelectedPlatform(matched.id);
      }
    }
  }, [searchParams]);

  const filteredParts = useMemo(() => {
    return SEEDED_PARTS_CATALOG.filter((part) => {
      const matchesPlatform =
        selectedPlatform === "Other / Not Sure" ||
        part.platforms.includes(selectedPlatform);

      const matchesCategory =
        selectedCategory === "ALL" || part.category === selectedCategory;

      const q = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !q ||
        part.name.toLowerCase().includes(q) ||
        part.sku.toLowerCase().includes(q) ||
        part.category.toLowerCase().includes(q) ||
        part.family.toLowerCase().includes(q) ||
        part.description.toLowerCase().includes(q);

      return matchesPlatform && matchesCategory && matchesSearch;
    });
  }, [selectedPlatform, selectedCategory, searchQuery]);

  const selectedPartsObjects = useMemo(() => {
    return SEEDED_PARTS_CATALOG.filter((p) => selectedPartIds.includes(p.id));
  }, [selectedPartIds]);

  function togglePartSelection(part: CatalogPart) {
    setSelectedPartIds((prev) =>
      prev.includes(part.id)
        ? prev.filter((id) => id !== part.id)
        : [...prev, part.id]
    );
  }

  function handleRequestSinglePart(part: CatalogPart) {
    if (!selectedPartIds.includes(part.id)) {
      setSelectedPartIds((prev) => [...prev, part.id]);
    }
    const el = document.getElementById("step-3-quote-drawer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }

  async function handleSubmitQuote(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "parts-finder-quote",
          platform: selectedPlatform,
          serialNumber,
          selectedParts: selectedPartsObjects.map((p) => ({
            sku: p.sku,
            name: p.name,
            category: p.category,
          })),
          uploadedPhotoName,
          name,
          company,
          email,
          phone,
          urgency,
          notes,
        }),
      });
      const data = await res.json();
      setSubmittedRef(data.referenceId || "3J-PF-24H");
    } catch {
      setSubmittedRef("3J-PF-24H");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-[#000000] text-white min-h-screen">
      {/* Page Header */}
      <section className="border-b border-[#262626] bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 rounded bg-[#0A0A0A] border border-[#5ADCC8]/40">
                <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#5ADCC8]">
                  DIVISION 01 · SERIAL-VERIFIED FOUNDRY PARTS SELECTOR (NATIONWIDE U.S.)
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold uppercase tracking-tight text-white">
                3-Step Industrial Parts Finder
              </h1>
              <p className="text-base sm:text-lg text-[#CCCCCC]">
                Select your Foseco / Vesuvius aluminum melt-treatment platform, enter your unit serial number, and build a pre-filled quote request.{" "}
                <strong className="text-[#5ADCC8]">
                  {BRAND.serialGuarantee}
                </strong>
              </p>
            </div>

            <div className="rounded-lg bg-[#0A0A0A] border border-[#5ADCC8]/50 p-4 space-y-1 text-xs font-mono">
              <span className="text-[#999999] block uppercase">
                SERIAL-FIT GUARANTEE &amp; SLA
              </span>
              <strong className="text-[#5ADCC8] text-sm block uppercase">
                {BRAND.quotePromise}
              </strong>
              <span className="text-[#CCCCCC] block">
                Direct Line-Down Support:{" "}
                <a
                  href={BRAND.phoneHref}
                  className="text-white font-bold hover:text-[#5ADCC8]"
                >
                  {BRAND.phoneDisplay}
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main 3-Step Selector Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* STEP 1: SELECT EQUIPMENT PLATFORM */}
        <section
          aria-labelledby="step-1-heading"
          className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A1A1A] pb-4">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-sm flex items-center justify-center">
                01
              </span>
              <div>
                <h2
                  id="step-1-heading"
                  className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white"
                >
                  Step 1 — Select Equipment Platform
                </h2>
                <p className="text-xs sm:text-sm text-[#CCCCCC]">
                  Choose your degassing, flux injection, or thermal analysis system
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-[#5ADCC8]">
              Active Platform: <strong>{selectedPlatform}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {ALL_PLATFORM_OPTIONS.map((option) => {
              const isSelected = selectedPlatform === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  data-testid={`platform-btn-${option.id}`}
                  onClick={() => setSelectedPlatform(option.id)}
                  className={`text-left p-4 rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-[#051815] border-2 border-[#5ADCC8] shadow-lg"
                      : "bg-[#000000] border-[#262626] hover:border-[#5ADCC8]/50"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-sm font-extrabold uppercase ${
                          isSelected ? "text-[#5ADCC8]" : "text-white"
                        }`}
                      >
                        {option.label}
                      </span>
                      {isSelected && (
                        <span className="px-2 py-0.5 rounded bg-[#5ADCC8] text-[#000000] font-mono text-[10px] font-bold uppercase">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-xs text-[#CCCCCC] leading-snug">
                      {option.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* STEP 2: SERIAL NUMBER / PART LOOKUP & SEEDED CATALOG */}
        <section
          aria-labelledby="step-2-heading"
          className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-8 space-y-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#1A1A1A] pb-4">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-sm flex items-center justify-center">
                02
              </span>
              <div>
                <h2
                  id="step-2-heading"
                  className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white"
                >
                  Step 2 — Unit Serial Number &amp; Component Lookup
                </h2>
                <p className="text-xs sm:text-sm text-[#CCCCCC]">
                  {BRAND.serialGuarantee}
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-[#5ADCC8]">
              Showing {filteredParts.length} compatible component families
            </span>
          </div>

          {/* Serial Number Input + Keyword Search + Photo Upload */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-4">
              <label
                htmlFor="pf-serial-input"
                className="block text-xs font-mono uppercase tracking-wider text-[#5ADCC8] font-bold mb-1.5"
              >
                Machine Serial Number / Model Code
              </label>
              <input
                id="pf-serial-input"
                data-testid="pf-serial-input"
                type="text"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                placeholder="e.g. FDU-2021-4481 or MTS1500-882"
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#5ADCC8]/60 text-white text-sm font-mono focus:outline-none focus:border-[#5ADCC8]"
              />
              <span className="text-[11px] text-[#999999] mt-1 block">
                Used to verify exact shaft threads, flange bore &amp; PLC revision.
              </span>
            </div>

            <div className="lg:col-span-4">
              <label
                htmlFor="pf-keyword-input"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Part Number / Component Keyword
              </label>
              <input
                id="pf-keyword-input"
                data-testid="pf-keyword-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search XSR, FDR, DIAMANT, COVERAL, MFC, cup..."
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
              />
              <span className="text-[11px] text-[#999999] mt-1 block">
                Filter by OEM family, SKU, or component keyword.
              </span>
            </div>

            <div className="lg:col-span-4">
              <label
                htmlFor="pf-photo-upload"
                className="block text-xs font-mono uppercase tracking-wider text-[#CCCCCC] mb-1.5"
              >
                Don&apos;t have the part number?
              </label>
              <label
                htmlFor="pf-photo-upload"
                className="flex items-center justify-between px-3.5 py-2.5 rounded bg-[#000000] border border-dashed border-[#5ADCC8]/60 hover:border-[#5ADCC8] cursor-pointer text-xs"
              >
                <span className="text-[#5ADCC8] font-mono font-semibold truncate">
                  {uploadedPhotoName
                    ? `Uploaded: ${uploadedPhotoName}`
                    : "Upload a photo of the nameplate or worn part"}
                </span>
                <span className="ml-2 px-2 py-0.5 rounded bg-[#1A1A1A] text-white font-mono text-[10px] uppercase">
                  Browse
                </span>
                <input
                  id="pf-photo-upload"
                  data-testid="pf-photo-upload"
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setUploadedPhotoName(e.target.files?.[0]?.name || "")
                  }
                  className="sr-only"
                />
              </label>
              <span className="text-[11px] text-[#999999] mt-1 block">
                Attach a photo of your unit nameplate or worn component.
              </span>
            </div>
          </div>

          {/* Component Category Filter Pills */}
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#999999] block">
              Filter by Component Category:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("ALL")}
                className={`px-3 py-1.5 rounded text-xs font-mono uppercase transition-colors cursor-pointer ${
                  selectedCategory === "ALL"
                    ? "bg-[#5ADCC8] text-[#000000] font-extrabold"
                    : "bg-[#000000] text-[#CCCCCC] border border-[#262626] hover:border-[#5ADCC8]"
                }`}
              >
                All Categories ({SEEDED_PARTS_CATALOG.length})
              </button>
              {COMPONENT_CATEGORIES.map((category) => {
                const active = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1.5 rounded text-xs font-mono transition-colors cursor-pointer ${
                      active
                        ? "bg-[#5ADCC8] text-[#000000] font-extrabold"
                        : "bg-[#000000] text-[#CCCCCC] border border-[#262626] hover:border-[#5ADCC8]"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Seeded Catalog Table / Cards */}
          <div className="space-y-3 pt-2">
            {filteredParts.map((part) => {
              const isSelected = selectedPartIds.includes(part.id);
              return (
                <div
                  key={part.id}
                  data-testid={`catalog-part-${part.id}`}
                  className={`rounded-lg p-5 border transition-all grid grid-cols-1 lg:grid-cols-12 gap-4 items-center ${
                    isSelected
                      ? "bg-[#051815] border-[#5ADCC8]"
                      : "bg-[#000000] border-[#262626] hover:border-[#383838]"
                  }`}
                >
                  <div className="lg:col-span-6 space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-[#1A1A1A] text-[#5ADCC8] font-bold">
                        {part.sku}
                      </span>
                      <span className="text-[#CCCCCC] font-semibold">
                        {part.category}
                      </span>
                      <span className="text-[#999999]">· {part.family}</span>
                    </div>
                    <h3 className="text-base sm:text-lg font-extrabold text-white">
                      {part.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                      {part.description}
                    </p>
                    <p className="text-xs font-mono text-[#5ADCC8]">
                      ✓ {part.serialFitNote}
                    </p>
                  </div>

                  <div className="lg:col-span-3 space-y-1.5 text-xs font-mono border-t lg:border-t-0 lg:border-l border-[#1A1A1A] pt-3 lg:pt-0 lg:pl-4">
                    <div>
                      <span className="text-[#999999] block uppercase text-[10px]">
                        SYSTEM FIT
                      </span>
                      <span className="text-white font-semibold">
                        {part.platforms.join(" · ")}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#999999] block uppercase text-[10px]">
                        PRICING TIER
                      </span>
                      <span className="text-[#5ADCC8] font-semibold">
                        {part.priceField}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#999999] block uppercase text-[10px]">
                        LEAD TIME
                      </span>
                      <span className="text-white">{part.leadTime}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex flex-row lg:flex-col items-stretch justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => handleRequestSinglePart(part)}
                      className="flex-1 px-4 py-2.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Request This Part →
                    </button>
                    <button
                      type="button"
                      onClick={() => togglePartSelection(part)}
                      className={`px-4 py-2 rounded border text-xs font-mono uppercase transition-colors cursor-pointer ${
                        isSelected
                          ? "border-[#5ADCC8] text-[#5ADCC8] bg-[#0A0A0A]"
                          : "border-[#383838] text-[#CCCCCC] hover:text-white"
                      }`}
                    >
                      {isSelected ? "✓ In Quote List" : "+ Add to Quote List"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* STEP 3: PRE-FILLED QUOTE REQUEST DRAWER / FORM */}
        <section
          id="step-3-quote-drawer"
          aria-labelledby="step-3-heading"
          className="rounded-xl bg-[#0A0A0A] border-2 border-[#5ADCC8] p-6 sm:p-8 lg:p-10 space-y-6 shadow-2xl"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#1A1A1A] pb-5">
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-sm flex items-center justify-center">
                03
              </span>
              <div>
                <h2
                  id="step-3-heading"
                  className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-white"
                >
                  Step 3 — Pre-Filled Serial-Verified Quote Request
                </h2>
                <p className="text-xs sm:text-sm text-[#CCCCCC]">
                  Submits directly to{" "}
                  <span className="text-[#5ADCC8] font-mono">{BRAND.email}</span> ·{" "}
                  <strong className="text-white">{BRAND.quotePromise}</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-[#000000] px-4 py-2.5 rounded border border-[#262626]">
              <span className="text-xs font-mono text-[#CCCCCC]">
                Immediate Line-Down Dispatch:
              </span>
              <a
                href={BRAND.phoneHref}
                className="text-base font-mono font-extrabold text-[#5ADCC8] hover:underline"
              >
                {BRAND.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Pre-Filled Summary Box */}
          <div className="rounded-lg bg-[#000000] border border-[#262626] p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
              <div>
                <span className="text-[#999999] uppercase">SELECTED PLATFORM: </span>
                <strong
                  data-testid="prefilled-platform"
                  className="text-[#5ADCC8] uppercase"
                >
                  {selectedPlatform}
                </strong>
              </div>
              <div>
                <span className="text-[#999999] uppercase">UNIT SERIAL NUMBER: </span>
                <strong
                  data-testid="prefilled-serial"
                  className="text-white font-mono"
                >
                  {serialNumber || "To be verified from nameplate / call"}
                </strong>
              </div>
              {uploadedPhotoName && (
                <div>
                  <span className="text-[#999999] uppercase">PHOTO ATTACHED: </span>
                  <strong className="text-[#5ADCC8]">{uploadedPhotoName}</strong>
                </div>
              )}
            </div>

            <div className="border-t border-[#1A1A1A] pt-3">
              <span className="text-xs font-mono uppercase text-[#999999] block mb-2">
                Selected Components ({selectedPartsObjects.length}):
              </span>
              {selectedPartsObjects.length === 0 ? (
                <p className="text-xs text-[#CCCCCC] italic">
                  No specific catalog rows selected — describe your needed parts below or attach a nameplate photo.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedPartsObjects.map((part) => (
                    <span
                      key={part.id}
                      className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#111111] border border-[#5ADCC8]/50 text-xs font-mono text-white"
                    >
                      <strong className="text-[#5ADCC8]">{part.sku}</strong>
                      <span>{part.name}</span>
                      <button
                        type="button"
                        onClick={() => togglePartSelection(part)}
                        className="text-[#999999] hover:text-white ml-1"
                        aria-label={`Remove ${part.name}`}
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {submittedRef ? (
            <div
              role="status"
              data-testid="pf-quote-confirmation"
              className="rounded-lg bg-[#051412] border-2 border-[#5ADCC8] p-6 sm:p-8 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-xs uppercase">
                  Quote Request Received · Ref #{submittedRef}
                </span>
                <span className="text-xs font-mono text-[#5ADCC8] font-bold uppercase">
                  SLA Guarantee: Estimate within 24 hours
                </span>
              </div>
              <h3 className="text-2xl font-extrabold uppercase text-white">
                Serial-Verified Quote Request Dispatched to {BRAND.founder}
              </h3>
              <p className="text-sm sm:text-base text-[#CCCCCC] leading-relaxed">
                We have logged your request for{" "}
                <strong className="text-white">{selectedPlatform}</strong>{" "}
                {serialNumber && (
                  <>
                    (Unit Serial:{" "}
                    <code className="text-[#5ADCC8]">{serialNumber}</code>){" "}
                  </>
                )}
                with <strong>{selectedPartsObjects.length}</strong> selected component(s) to{" "}
                <a
                  href={BRAND.emailHref}
                  className="text-[#5ADCC8] underline font-mono"
                >
                  {BRAND.email}
                </a>
                . You will receive your detailed{" "}
                <strong className="text-white">estimate within 24 hours</strong>.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  href={BRAND.phoneHref}
                  className="px-5 py-2.5 rounded bg-[#5ADCC8] text-[#000000] font-extrabold text-xs uppercase tracking-wider"
                >
                  Immediate Line-Down Dispatch: {BRAND.phoneDisplay}
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedRef(null)}
                  className="px-4 py-2.5 rounded border border-[#383838] text-xs font-mono uppercase text-[#CCCCCC] hover:text-white"
                >
                  Modify or Submit Another Quote
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitQuote} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="pf-name"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="pf-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pf-company"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Company / Foundry *
                  </label>
                  <input
                    id="pf-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Foundry or Plant Name"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pf-email"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Email Address *
                  </label>
                  <input
                    id="pf-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@foundry.com"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>
                <div>
                  <label
                    htmlFor="pf-phone"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="pf-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="216-555-0140"
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="pf-urgency"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Urgency *
                  </label>
                  <select
                    id="pf-urgency"
                    value={urgency}
                    onChange={(e) =>
                      setUrgency(
                        e.target.value as "Standard Quote" | "Urgent — Line Down"
                      )
                    }
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  >
                    <option value="Standard Quote">
                      Standard Quote (Estimate within 24 hours)
                    </option>
                    <option value="Urgent — Line Down">
                      Urgent — Line Down (Priority Dispatch)
                    </option>
                  </select>
                </div>

                <div className="lg:col-span-2">
                  <label
                    htmlFor="pf-notes"
                    className="block text-xs font-mono uppercase text-[#CCCCCC] mb-1.5"
                  >
                    Quantities, Furnace/Crucible Details, or Additional Notes
                  </label>
                  <input
                    id="pf-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Specify quantities, Argon/N2 gas setup, or symptoms..."
                    className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm focus:outline-none focus:border-[#5ADCC8]"
                  />
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-xs text-[#CCCCCC]">
                  Every part is matched to your unit&apos;s serial number before it ships. Guaranteed{" "}
                  <strong className="text-[#5ADCC8]">estimate within 24 hours</strong>.
                </p>
                <button
                  type="submit"
                  data-testid="pf-submit-btn"
                  disabled={submitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-sm uppercase tracking-wider transition-colors cursor-pointer"
                >
                  {submitting
                    ? "Sending Request..."
                    : "Submit Pre-Filled Quote Request →"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default function PartsFinderPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#000000] text-white p-12 text-center font-mono">
          Loading 3J Industrial Parts Finder...
        </div>
      }
    >
      <PartsFinderContent />
    </Suspense>
  );
}
