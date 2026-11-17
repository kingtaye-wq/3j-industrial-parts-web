"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import { PLATFORMS, PlatformId, PlatformInfo } from "@/data/catalog";

export interface HeroMachineSelectorProps {
  onRepairMachine?: (platformId: string) => void;
  onBrowseParts?: (platformId: string) => void;
}

interface MachineSelectorData extends PlatformInfo {
  image: string;
  badge: string;
  displayName: string;
}

const MACHINE_ITEMS: MachineSelectorData[] = [
  {
    ...PLATFORMS.find((p) => p.id === "FDU")!,
    image: "/machines/fdu.png",
    badge: "SYS-01",
    displayName: "FDU Degasser",
  },
  {
    ...PLATFORMS.find((p) => p.id === "MTS 1500")!,
    image: "/machines/mts-1500.png",
    badge: "SYS-02",
    displayName: "MTS 1500",
  },
  {
    ...PLATFORMS.find((p) => p.id === "SMARTT")!,
    image: "/machines/smartt.png",
    badge: "SYS-03",
    displayName: "SMARTT",
  },
  {
    ...PLATFORMS.find((p) => p.id === "ThermaTest NGIII 5000")!,
    image: "/machines/thermatest.png",
    badge: "SYS-04",
    displayName: "ThermaTest NGIII 5000",
  },
];

export default function HeroMachineSelector({
  onRepairMachine,
  onBrowseParts,
}: HeroMachineSelectorProps) {
  // FDU selected by default
  const [selectedId, setSelectedId] = useState<PlatformId>("FDU");
  const [hoveredId, setHoveredId] = useState<PlatformId | null>(null);

  // Active view: hovered preview on desktop, locked by click/tap/enter
  const activeId = hoveredId || selectedId;
  const activeMachine =
    MACHINE_ITEMS.find((m) => m.id === activeId) || MACHINE_ITEMS[0];

  const handleSelect = (id: PlatformId) => {
    setSelectedId(id);
    setHoveredId(null);
  };

  const handleRepairClick = useCallback(() => {
    if (onRepairMachine) {
      onRepairMachine(activeMachine.id);
    } else {
      // Dispatches custom event and scrolls
      window.dispatchEvent(
        new CustomEvent("3j:prefill-quote", {
          detail: { platform: activeMachine.id },
        })
      );
      const target = document.getElementById("quote-request");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        const serialField = document.getElementById("quote-serial");
        if (serialField) serialField.focus();
      }, 400);
    }
  }, [activeMachine.id, onRepairMachine]);

  const handleBrowseClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (onBrowseParts) {
        onBrowseParts(activeMachine.id);
      } else {
        const target = document.getElementById("part-selector");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    },
    [activeMachine.id, onBrowseParts]
  );

  return (
    <section
      data-testid="hero-machine-selector"
      className="relative bg-[#000000] border-b border-[#262626] overflow-hidden pt-4 pb-8 sm:pt-6 sm:pb-12"
      aria-label="Above-the-Fold Machine Selector Hero"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* COMPACT HEADLINE + TRUST CHIPS */}
        <div className="text-center sm:text-left space-y-2.5 mb-5 sm:mb-6">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#0A0A0A] border border-[#5ADCC8]/40 text-[11px] font-mono font-bold uppercase tracking-widest text-[#5ADCC8]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
              Division 01 · Aluminum Melt Treatment
            </span>
            <span className="hidden md:inline-block text-[#383838]">|</span>
            <span className="hidden md:inline-block text-xs font-mono text-[#999999]">
              Supported OEM: Foseco / Vesuvius Platforms
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase tracking-tight text-white leading-tight">
            Precision Parts &amp; Field Service That Keep Production Running.
          </h1>

          {/* Three Compact Trust Chips */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-4 text-xs font-mono">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#262626]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
              <span className="text-[#CCCCCC]">Estimate Within 24 Hours</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#262626]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
              <span className="text-white font-semibold">
                100% Serial-Number Verified
              </span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#262626]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
              <span className="text-[#CCCCCC]">6+ Years Field-Proven</span>
            </div>
          </div>
        </div>

        {/* 4-MACHINE SELECTOR GRID / SNAP CAROUSEL */}
        <div
          role="tablist"
          aria-label="Supported Foundry Machine Selector"
          className="flex sm:grid sm:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto sm:overflow-x-visible snap-x snap-mandatory scrollbar-none pb-2 sm:pb-0"
        >
          {MACHINE_ITEMS.map((machine, index) => {
            const isSelected = selectedId === machine.id;
            const isHovered = hoveredId === machine.id;
            const isFocused = isHovered || isSelected;

            return (
              <button
                key={machine.id}
                role="tab"
                id={`tab-${machine.id.toLowerCase().replace(/[^a-z0-9]/g, "-")}`}
                aria-selected={isSelected}
                aria-controls="machine-detail-panel"
                data-testid={`machine-card-${machine.id}`}
                onClick={() => handleSelect(machine.id)}
                onMouseEnter={() => setHoveredId(machine.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`group relative flex-shrink-0 w-[240px] sm:w-auto snap-center text-left rounded-xl bg-[#070707] border p-2.5 sm:p-3 transition-all duration-350 ease-out focus:outline-none focus:ring-2 focus:ring-[#5ADCC8] motion-reduce:transform-none motion-reduce:transition-none cursor-pointer ${
                  isFocused
                    ? "border-[#5ADCC8] ring-2 ring-[#5ADCC8]/60 shadow-[0_0_25px_rgba(90,220,200,0.30)] scale-[1.02] sm:scale-[1.03] opacity-100 brightness-100 z-10"
                    : "border-[#262626] opacity-60 brightness-[0.55] hover:opacity-90 hover:brightness-90 scale-[0.98] sm:scale-[0.97]"
                }`}
              >
                {/* 4:5 Aspect Ratio Image Frame with dark background */}
                <div className="relative aspect-[4/5] w-full bg-[#000000] rounded-lg overflow-hidden border border-[#1A1A1A]">
                  <Image
                    src={machine.image}
                    alt={`${machine.displayName} industrial aluminum melt-treatment unit`}
                    fill
                    sizes="(max-width: 640px) 240px, (max-width: 1024px) 25vw, 300px"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    className="object-contain p-2 transition-transform duration-350 group-hover:scale-105"
                  />
                  {/* Subtle Corner Badge */}
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-[#000000]/80 border border-[#333333] text-[10px] font-mono text-[#5ADCC8] font-bold">
                    {machine.badge}
                  </div>
                </div>

                {/* Machine Name & Status Tag */}
                <div className="mt-2.5 px-1 flex items-center justify-between">
                  <div>
                    <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-white group-hover:text-[#5ADCC8] transition-colors">
                      {machine.displayName}
                    </h2>
                    <span className="text-[10px] font-mono text-[#888888] block">
                      {machine.typicalSerialPrefix}XXXX
                    </span>
                  </div>
                  {isSelected && (
                    <span className="h-2 w-2 rounded-full bg-[#5ADCC8] shadow-[0_0_8px_#5ADCC8]" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* DETAIL PANEL (ARIA-LIVE POLITE, VERBATIM SYS-01...04 COPY) */}
        <div
          id="machine-detail-panel"
          data-testid="machine-detail-panel"
          role="tabpanel"
          aria-live="polite"
          className="mt-4 sm:mt-5 rounded-xl bg-[#0A0A0A] border border-[#262626] p-4 sm:p-6 shadow-xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6">
            {/* Machine Copy Column */}
            <div className="space-y-2.5 max-w-4xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#1A1A1A] border border-[#5ADCC8]/40 text-xs font-mono font-bold text-[#5ADCC8]">
                  {activeMachine.code}
                </span>
                <span className="text-xs font-mono text-[#999999]">
                  {activeMachine.oemOrigin}
                </span>
                <span className="text-xs font-mono text-[#5ADCC8] hidden sm:inline">
                  · 100% Serial-Number Verified
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-white">
                {activeMachine.fullName}
              </h2>

              <p className="text-xs sm:text-sm text-[#CCCCCC] leading-relaxed">
                {activeMachine.summary}
              </p>

              {/* Key Parts List Chips */}
              <div className="pt-1 flex flex-wrap gap-1.5">
                {activeMachine.keyFamilies.map((fam) => (
                  <span
                    key={fam}
                    className="px-2.5 py-1 rounded bg-[#000000] border border-[#262626] text-[11px] font-mono text-[#CCCCCC]"
                  >
                    {fam}
                  </span>
                ))}
              </div>
            </div>

            {/* CTAs Column */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 flex-shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-[#1A1A1A]">
              <button
                type="button"
                data-testid="hero-repair-machine-cta"
                onClick={handleRepairClick}
                className="inline-flex items-center justify-center px-6 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-colors shadow-lg shadow-[#5ADCC8]/20 cursor-pointer"
              >
                Repair this machine →
              </button>
              <a
                href="#part-selector"
                data-testid="hero-browse-parts-link"
                onClick={handleBrowseClick}
                className="text-xs font-mono uppercase tracking-wider text-[#5ADCC8] hover:underline text-center sm:text-right font-bold py-1"
              >
                Browse {activeMachine.name} parts →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
