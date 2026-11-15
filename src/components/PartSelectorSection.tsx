"use client";

import React, { useState, useEffect } from "react";
import { PlatformId } from "@/data/catalog";

interface PartSelectorSectionProps {
  initialSystem?: PlatformId;
  onGetPart?: (system: string, partFamily: string, serial: string) => void;
}

interface SystemPartConfig {
  id: PlatformId;
  code: string;
  name: string;
  families: string[];
}

const SYSTEM_PARTS: SystemPartConfig[] = [
  {
    id: "FDU",
    code: "SYS-01",
    name: "FDU Degasser",
    families: [
      "XSR/FDR/XDR/FDDR rotors & shafts",
      "DIAMANT baffles/wear assemblies",
      "Gas valves",
    ],
  },
  {
    id: "MTS 1500",
    code: "SYS-02",
    name: "MTS 1500",
    families: [
      "Augers",
      "Flux feeders/dosing hardware",
      "Treatment hardware",
    ],
  },
  {
    id: "SMARTT",
    code: "SYS-03",
    name: "SMARTT",
    families: [
      "Mass flow controllers",
      "Sensors",
      "Rotors",
    ],
  },
  {
    id: "ThermaTest NGIII 5000",
    code: "SYS-04",
    name: "ThermaTest NGIII 5000",
    families: [
      "Sampling cups",
      "Holder leads",
      "Thermocouples",
    ],
  },
];

export default function PartSelectorSection({
  initialSystem = "FDU",
  onGetPart,
}: PartSelectorSectionProps) {
  const [selectedSystem, setSelectedSystem] = useState<PlatformId>(initialSystem);
  const [selectedFamily, setSelectedFamily] = useState<string>(
    SYSTEM_PARTS[0].families[0]
  );
  const [serial, setSerial] = useState<string>("");

  useEffect(() => {
    if (initialSystem) {
      setSelectedSystem(initialSystem);
      const cfg = SYSTEM_PARTS.find((s) => s.id === initialSystem);
      if (cfg && cfg.families.length > 0) {
        setSelectedFamily(cfg.families[0]);
      }
    }
  }, [initialSystem]);

  const currentSystemConfig =
    SYSTEM_PARTS.find((s) => s.id === selectedSystem) || SYSTEM_PARTS[0];

  const handleSystemChange = (id: PlatformId) => {
    setSelectedSystem(id);
    const cfg = SYSTEM_PARTS.find((s) => s.id === id);
    if (cfg && cfg.families.length > 0) {
      setSelectedFamily(cfg.families[0]);
    }
  };

  const handleGetPartClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (onGetPart) {
      onGetPart(selectedSystem, selectedFamily, serial.trim());
    } else {
      const messageText = `Part Family Request: ${selectedFamily} for ${selectedSystem}${
        serial.trim() ? ` (Unit Serial: ${serial.trim()})` : ""
      }`;
      window.dispatchEvent(
        new CustomEvent("3j:prefill-quote", {
          detail: {
            platform: selectedSystem,
            serial: serial.trim(),
            message: messageText,
          },
        })
      );
      const target = document.getElementById("quote-request");
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setTimeout(() => {
        const msgField = document.getElementById("quote-message");
        if (msgField) msgField.focus();
      }, 400);
    }
  };

  return (
    <section
      id="part-selector"
      data-testid="part-selector-section"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
      aria-label="3-Step Part Selector"
    >
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#0A0A0A] border border-[#5ADCC8]/40 text-xs font-mono font-bold uppercase tracking-widest text-[#5ADCC8]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#5ADCC8]" />
          PRECISION SOURCING · 3-STEP SELECTOR
        </div>
        <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
          Identify Your Replacement Part Family
        </h2>
        <p className="mt-2 text-sm text-[#CCCCCC] max-w-3xl">
          Rexroth &amp; McMaster-style rapid configuration. Select your melt-treatment platform, choose the component family, optionally supply your unit&apos;s serial number, and generate a pre-filled quote request in seconds.
        </p>
      </div>

      <div className="rounded-xl bg-[#0A0A0A] border border-[#262626] p-6 sm:p-8 lg:p-10 shadow-2xl">
        <form onSubmit={handleGetPartClick} className="space-y-8">
          {/* STEP 1: PICK YOUR SYSTEM */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5ADCC8] font-bold mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5ADCC8] text-black font-extrabold text-[11px]">
                1
              </span>
              <span>Step 1 — Pick Your System</span>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {SYSTEM_PARTS.map((sys) => {
                const isActive = selectedSystem === sys.id;
                return (
                  <button
                    key={sys.id}
                    type="button"
                    data-testid={`ps-system-${sys.id}`}
                    onClick={() => handleSystemChange(sys.id)}
                    className={`p-3.5 rounded-lg border text-left transition-all ${
                      isActive
                        ? "bg-[#051412] border-[#5ADCC8] ring-1 ring-[#5ADCC8] text-white"
                        : "bg-[#000000] border-[#262626] text-[#CCCCCC] hover:border-[#383838] hover:text-white"
                    }`}
                  >
                    <span className="text-[10px] font-mono font-bold text-[#5ADCC8] block uppercase">
                      {sys.code}
                    </span>
                    <span className="text-sm font-extrabold uppercase block mt-1">
                      {sys.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: PICK THE PART FAMILY */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5ADCC8] font-bold mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5ADCC8] text-black font-extrabold text-[11px]">
                2
              </span>
              <span>
                Step 2 — Pick Part Family for {currentSystemConfig.name}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentSystemConfig.families.map((fam) => {
                const isSelected = selectedFamily === fam;
                return (
                  <button
                    key={fam}
                    type="button"
                    data-testid={`ps-family-${fam}`}
                    onClick={() => setSelectedFamily(fam)}
                    className={`p-4 rounded-lg border text-left flex items-start gap-3 transition-all ${
                      isSelected
                        ? "bg-[#051412] border-[#5ADCC8] ring-1 ring-[#5ADCC8] text-white"
                        : "bg-[#000000] border-[#262626] text-[#CCCCCC] hover:border-[#383838] hover:text-white"
                    }`}
                  >
                    <span
                      className={`h-4 w-4 mt-0.5 rounded-full border flex-shrink-0 flex items-center justify-center ${
                        isSelected
                          ? "border-[#5ADCC8] bg-[#5ADCC8]"
                          : "border-[#404040]"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-1.5 w-1.5 rounded-full bg-black" />
                      )}
                    </span>
                    <div>
                      <span className="text-xs sm:text-sm font-bold block">
                        {fam}
                      </span>
                      <span className="text-[11px] font-mono text-[#888888] mt-0.5 block">
                        Serial-matched component
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: OPTIONAL SERIAL NUMBER */}
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#5ADCC8] font-bold mb-3">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#5ADCC8] text-black font-extrabold text-[11px]">
                3
              </span>
              <span>
                Step 3 — Optional Unit Serial Number
              </span>
            </div>
            <div className="max-w-md">
              <label
                htmlFor="ps-serial-input"
                className="block text-xs font-mono text-[#999999] mb-1.5"
              >
                Matched to your unit before it ships (e.g. FDU-2019-4481)
              </label>
              <input
                id="ps-serial-input"
                data-testid="ps-serial-input"
                type="text"
                value={serial}
                onChange={(e) => setSerial(e.target.value)}
                placeholder="Enter machine serial number if available..."
                className="w-full px-3.5 py-2.5 rounded bg-[#000000] border border-[#383838] text-white text-sm font-mono focus:outline-none focus:border-[#5ADCC8]"
              />
            </div>
          </div>

          {/* CTA BAR */}
          <div className="pt-4 border-t border-[#1A1A1A] flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#999999]">
              Configuration: <strong className="text-white">{selectedSystem}</strong> ·{" "}
              <span className="text-[#5ADCC8] font-semibold">{selectedFamily}</span>
              {serial ? (
                <> · Serial: <code className="text-white">{serial}</code></>
              ) : null}
            </div>

            <button
              type="submit"
              data-testid="ps-get-this-part-btn"
              className="inline-flex items-center justify-center px-8 py-3.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-sm uppercase tracking-wider transition-colors shadow-lg shadow-[#5ADCC8]/20 cursor-pointer"
            >
              Get this part →
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
