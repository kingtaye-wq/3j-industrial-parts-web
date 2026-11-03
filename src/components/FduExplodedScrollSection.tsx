"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface FduLayerSpec {
  id: string;
  testId: string;
  stepNum: string;
  label: string;
  sublabel: string;
  familyTag: string;
  partLink: string;
}

const FDU_LAYERS: FduLayerSpec[] = [
  {
    id: "drive-head",
    testId: "fdu-label-drive-head",
    stepNum: "01",
    label: "Drive Head / MFC Gas Unit",
    sublabel:
      "Rotary spindle drive assembly, high-temp lip seals, bearings & closed-loop inert gas mass flow controller.",
    familyTag: "Spindle Seals, Bearings & MFC Valves",
    partLink: "/parts-finder?platform=FDU",
  },
  {
    id: "baffle",
    testId: "fdu-label-baffle",
    stepNum: "02",
    label: "DIAMANT Baffle / Anti-Vortex Plate",
    sublabel:
      "DIAMANT ceramic wear sleeve and high-purity graphite anti-vortex baffle plate suppressing surface turbulence.",
    familyTag: "DIAMANT Ceramic Wear Parts",
    partLink: "/parts-finder?platform=FDU",
  },
  {
    id: "shaft",
    testId: "fdu-label-shaft",
    stepNum: "03",
    label: "Graphite Shaft",
    sublabel:
      "Oxidation-inhibited precision graphite shaft with internal inert-gas bore matched to your unit's serial number.",
    familyTag: "XSR / FDR / XDR / FDDR Series",
    partLink: "/parts-finder?platform=FDU",
  },
  {
    id: "rotor",
    testId: "fdu-label-rotor",
    stepNum: "04",
    label: "Graphite Rotor",
    sublabel:
      "High-shear graphite degassing impeller shearing inert gas into fine micro-bubbles throughout the melt.",
    familyTag: "XSR / FDR / XDR / FDDR Impellers",
    partLink: "/parts-finder?platform=FDU",
  },
  {
    id: "crucible",
    testId: "fdu-label-crucible",
    stepNum: "05",
    label: "Crucible",
    sublabel:
      "Refractory vessel and molten aluminum bath zone supported by immersion thermocouples and health checks.",
    familyTag: "Furnace / Ladle Melt Zone",
    partLink: "/parts-finder?platform=FDU",
  },
];

function computeSeparation(progress: number): number {
  if (progress <= 0.08) return 0;
  if (progress <= 0.5) {
    return Math.min(1, Math.max(0, (progress - 0.08) / 0.42));
  }
  if (progress <= 0.72) return 1;
  return Math.min(1, Math.max(0, 1 - (progress - 0.72) / 0.28));
}

export default function FduExplodedScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReducedMotion(mediaQuery.matches);
    };
    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || 844;
      const scrollable = Math.max(1, rect.height - viewportHeight);
      const raw = -rect.top / scrollable;
      const clamped = Math.min(1, Math.max(0, raw));
      setScrollProgress(clamped);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      mediaQuery.removeEventListener("change", updateMotionPreference);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const effectiveSeparation = reducedMotion
    ? 0
    : computeSeparation(scrollProgress);

  const phaseLabel = reducedMotion
    ? "Static Schematic (Reduced Motion Active)"
    : scrollProgress < 0.08
    ? "Assembled FDU Unit — Scroll to Explode Components"
    : scrollProgress <= 0.5
    ? "Exploding FDU Assembly — Separating Serial-Verified Layers"
    : scrollProgress <= 0.72
    ? "Full Exploded View — 5 Serviceable FDU Component Zones"
    : "Reassembling FDU Unit — Locked & Serial-Matched";

  // Vertical offsets (in SVG coordinate space / px) for each of the 5 layers
  const driveHeadOffsetY = Number((-58 * effectiveSeparation).toFixed(1));
  const baffleOffsetY = Number((-28 * effectiveSeparation).toFixed(1));
  const shaftOffsetY = Number((-4 * effectiveSeparation).toFixed(1));
  const rotorOffsetY = Number((28 * effectiveSeparation).toFixed(1));
  const crucibleOffsetY = Number((58 * effectiveSeparation).toFixed(1));

  return (
    <section
      ref={sectionRef}
      data-testid="fdu-exploded-scroll-section"
      data-reduced-motion={reducedMotion ? "true" : "false"}
      data-scroll-progress={scrollProgress.toFixed(2)}
      data-separation={effectiveSeparation.toFixed(2)}
      aria-label="FDU Rotary Degasser Exploded-View Scroll Schematic"
      className={`relative w-full bg-[#000000] border-b border-[#262626] ${
        reducedMotion ? "py-12" : "min-h-[250vh]"
      }`}
    >
      <div
        className={`${
          reducedMotion
            ? "w-full"
            : "sticky top-16 w-full min-h-[calc(100vh-4rem)] flex items-center py-4 sm:py-8"
        } overflow-x-hidden`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Header & Scroll Telemetry Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1A1A1A]">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
                DIVISION 01 HERO SYSTEM · INTERACTIVE CAD SCHEMATIC
              </span>
              <h2 className="mt-1 text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                Inside the FDU Rotary Degasser — Exploded Component Architecture
              </h2>
            </div>

            <div className="flex items-center gap-3 bg-[#0A0A0A] px-3.5 py-2 rounded border border-[#262626] text-xs font-mono">
              <span
                data-testid="fdu-phase-status"
                className="text-[#5ADCC8] font-bold"
              >
                {phaseLabel}
              </span>
            </div>
          </div>

          {/* Scroll Progress Bar */}
          {!reducedMotion && (
            <div className="w-full h-1.5 bg-[#141414] rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#5ADCC8]"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          )}

          {/* Main Stage Grid: Left/Top Exploded SVG + Right/Bottom 5 Component Callout Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
            {/* Exploded SVG Viewport */}
            <div className="lg:col-span-7 rounded-xl bg-[#050505] border border-[#262626] p-3 sm:p-5 relative overflow-hidden">
              <svg
                viewBox="0 0 600 470"
                className="w-full h-auto max-h-[340px] sm:max-h-[430px] mx-auto block"
                role="img"
                aria-labelledby="fdu-exploded-svg-title fdu-exploded-svg-desc"
              >
                <title id="fdu-exploded-svg-title">
                  FDU Rotary Degasser Exploded-View Engineering Schematic
                </title>
                <desc id="fdu-exploded-svg-desc">
                  Five-layer exploded schematic of an FDU Foundry Degassing Unit showing the Drive Head / MFC Gas Unit, DIAMANT Baffle / Anti-Vortex Plate, Graphite Shaft, Graphite Rotor, and Crucible.
                </desc>

                <defs>
                  <pattern
                    id="fduCadGrid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 24 0 L 0 0 0 24"
                      fill="none"
                      stroke="#121212"
                      strokeWidth="1"
                    />
                  </pattern>
                  <radialGradient id="fduMeltGlow" cx="50%" cy="80%" r="50%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.28" />
                    <stop offset="60%" stopColor="#5ADCC8" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* CAD Grid Background */}
                <rect width="600" height="470" fill="#030303" />
                <rect width="600" height="470" fill="url(#fduCadGrid)" />

                {/* Central Assembly Axis Line */}
                <line
                  x1="230"
                  y1="20"
                  x2="230"
                  y2="445"
                  stroke="#5ADCC8"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  strokeOpacity="0.45"
                />

                {/* LAYER 5: CRUCIBLE & MOLTEN ALUMINUM BATH */}
                <g
                  data-testid="fdu-layer-crucible"
                  data-offset-y={crucibleOffsetY}
                  style={{
                    transform: `translate3d(0px, ${crucibleOffsetY}px, 0px)`,
                  }}
                >
                  <ellipse
                    cx="230"
                    cy="345"
                    rx="145"
                    ry="55"
                    fill="url(#fduMeltGlow)"
                  />
                  {/* Outer Refractory Crucible Bowl */}
                  <path
                    d="M 105 245 L 124 366 C 128 384, 152 392, 230 392 C 308 392, 332 384, 336 366 L 355 245 Z"
                    fill="#0A0A0A"
                    stroke="#444444"
                    strokeWidth="2.5"
                  />
                  {/* Inner Molten Aluminum Bath Chamber */}
                  <path
                    d="M 120 256 L 136 356 C 140 370, 160 378, 230 378 C 300 378, 320 370, 324 356 L 340 256 Z"
                    fill="#F59E0B"
                    fillOpacity="0.08"
                    stroke="#F59E0B"
                    strokeWidth="1.2"
                    strokeOpacity="0.65"
                  />
                  {/* Callout Leader to Right */}
                  <line
                    x1="348"
                    y1="340"
                    x2="405"
                    y2="340"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <circle cx="348" cy="340" r="3" fill="#5ADCC8" />
                  <rect
                    x="408"
                    y="324"
                    width="178"
                    height="32"
                    rx="4"
                    fill="#0B0B0B"
                    stroke="#383838"
                  />
                  <text
                    x="416"
                    y="338"
                    fill="#5ADCC8"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    05. CRUCIBLE
                  </text>
                  <text
                    x="416"
                    y="350"
                    fill="#CCCCCC"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    REFRACTORY MELT VESSEL
                  </text>
                </g>

                {/* LAYER 4: GRAPHITE ROTOR (XSR / FDR / XDR / FDDR) */}
                <g
                  data-testid="fdu-layer-rotor"
                  data-offset-y={rotorOffsetY}
                  style={{
                    transform: `translate3d(0px, ${rotorOffsetY}px, 0px)`,
                  }}
                >
                  {/* High-Shear Graphite Rotor Impeller Body */}
                  <rect
                    x="174"
                    y="282"
                    width="112"
                    height="28"
                    rx="4"
                    fill="#141414"
                    stroke="#5ADCC8"
                    strokeWidth="2"
                  />
                  {/* High-Shear Vanes & Gas Dispersion Channels */}
                  <rect
                    x="182"
                    y="287"
                    width="16"
                    height="18"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.35"
                    stroke="#5ADCC8"
                    strokeWidth="1"
                  />
                  <rect
                    x="206"
                    y="287"
                    width="16"
                    height="18"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.45"
                    stroke="#5ADCC8"
                    strokeWidth="1"
                  />
                  <rect
                    x="238"
                    y="287"
                    width="16"
                    height="18"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.45"
                    stroke="#5ADCC8"
                    strokeWidth="1"
                  />
                  <rect
                    x="262"
                    y="287"
                    width="16"
                    height="18"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.35"
                    stroke="#5ADCC8"
                    strokeWidth="1"
                  />
                  {/* Callout Leader */}
                  <line
                    x1="286"
                    y1="296"
                    x2="405"
                    y2="282"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <circle cx="286" cy="296" r="3" fill="#5ADCC8" />
                  <rect
                    x="408"
                    y="266"
                    width="178"
                    height="32"
                    rx="4"
                    fill="#0B0B0B"
                    stroke="#5ADCC8"
                    strokeOpacity="0.7"
                  />
                  <text
                    x="416"
                    y="280"
                    fill="#5ADCC8"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    04. GRAPHITE ROTOR
                  </text>
                  <text
                    x="416"
                    y="292"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    XSR / FDR / XDR / FDDR
                  </text>
                </g>

                {/* LAYER 3: GRAPHITE SHAFT */}
                <g
                  data-testid="fdu-layer-shaft"
                  data-offset-y={shaftOffsetY}
                  style={{
                    transform: `translate3d(0px, ${shaftOffsetY}px, 0px)`,
                  }}
                >
                  {/* Threaded Upper Collar */}
                  <rect
                    x="212"
                    y="152"
                    width="36"
                    height="16"
                    rx="2"
                    fill="#222222"
                    stroke="#CCCCCC"
                    strokeWidth="1.5"
                  />
                  {/* Main Graphite Shaft Column */}
                  <rect
                    x="217"
                    y="168"
                    width="26"
                    height="112"
                    fill="#181818"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  {/* Internal Inert Gas Bore */}
                  <line
                    x1="230"
                    y1="152"
                    x2="230"
                    y2="280"
                    stroke="#5ADCC8"
                    strokeWidth="2.5"
                    strokeDasharray="5 3"
                  />
                  {/* Callout Leader */}
                  <line
                    x1="243"
                    y1="224"
                    x2="405"
                    y2="224"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <circle cx="243" cy="224" r="3" fill="#5ADCC8" />
                  <rect
                    x="408"
                    y="208"
                    width="178"
                    height="32"
                    rx="4"
                    fill="#0B0B0B"
                    stroke="#5ADCC8"
                    strokeOpacity="0.7"
                  />
                  <text
                    x="416"
                    y="222"
                    fill="#5ADCC8"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    03. GRAPHITE SHAFT
                  </text>
                  <text
                    x="416"
                    y="234"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    SERIAL-VERIFIED THREADS
                  </text>
                </g>

                {/* LAYER 2: DIAMANT BAFFLE / ANTI-VORTEX PLATE */}
                <g
                  data-testid="fdu-layer-baffle"
                  data-offset-y={baffleOffsetY}
                  style={{
                    transform: `translate3d(0px, ${baffleOffsetY}px, 0px)`,
                  }}
                >
                  {/* Crucible Cover Plate + Anti-Vortex Baffle Fins */}
                  <rect
                    x="115"
                    y="132"
                    width="230"
                    height="14"
                    rx="3"
                    fill="#1A1A1A"
                    stroke="#5ADCC8"
                    strokeWidth="1.5"
                  />
                  {/* Left & Right DIAMANT Ceramic Anti-Vortex Baffle Blades */}
                  <rect
                    x="148"
                    y="146"
                    width="16"
                    height="62"
                    rx="2"
                    fill="#141414"
                    stroke="#5ADCC8"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="296"
                    y="146"
                    width="16"
                    height="62"
                    rx="2"
                    fill="#141414"
                    stroke="#5ADCC8"
                    strokeWidth="1.5"
                  />
                  {/* Callout Leader */}
                  <line
                    x1="345"
                    y1="140"
                    x2="405"
                    y2="164"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <circle cx="345" cy="140" r="3" fill="#5ADCC8" />
                  <rect
                    x="408"
                    y="148"
                    width="178"
                    height="32"
                    rx="4"
                    fill="#0B0B0B"
                    stroke="#5ADCC8"
                    strokeOpacity="0.7"
                  />
                  <text
                    x="416"
                    y="162"
                    fill="#5ADCC8"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    02. DIAMANT BAFFLE
                  </text>
                  <text
                    x="416"
                    y="174"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    ANTI-VORTEX WEAR PLATE
                  </text>
                </g>

                {/* LAYER 1: DRIVE HEAD / MFC GAS UNIT */}
                <g
                  data-testid="fdu-layer-drive-head"
                  data-offset-y={driveHeadOffsetY}
                  style={{
                    transform: `translate3d(0px, ${driveHeadOffsetY}px, 0px)`,
                  }}
                >
                  {/* Spindle Drive Housing & MFC Gas Manifold */}
                  <rect
                    x="160"
                    y="72"
                    width="140"
                    height="50"
                    rx="5"
                    fill="#121212"
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                  />
                  <rect
                    x="176"
                    y="80"
                    width="108"
                    height="16"
                    rx="2"
                    fill="#051815"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                  />
                  <text
                    x="230"
                    y="91"
                    textAnchor="middle"
                    fill="#5ADCC8"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    FDU DRIVE HEAD &amp; MFC
                  </text>
                  <text
                    x="230"
                    y="112"
                    textAnchor="middle"
                    fill="#CCCCCC"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    SPINDLE SEALS &amp; GAS TRAIN
                  </text>
                  {/* Callout Leader */}
                  <line
                    x1="300"
                    y1="96"
                    x2="405"
                    y2="104"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                  />
                  <circle cx="300" cy="96" r="3" fill="#5ADCC8" />
                  <rect
                    x="408"
                    y="88"
                    width="178"
                    height="32"
                    rx="4"
                    fill="#0B0B0B"
                    stroke="#5ADCC8"
                    strokeOpacity="0.7"
                  />
                  <text
                    x="416"
                    y="102"
                    fill="#5ADCC8"
                    fontSize="10"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    01. DRIVE HEAD / MFC
                  </text>
                  <text
                    x="416"
                    y="114"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    GAS CONTROL &amp; BEARINGS
                  </text>
                </g>
              </svg>
            </div>

            {/* 5 Component Layer Callout Cards (Always Readable on Mobile & Desktop) */}
            <div className="lg:col-span-5 space-y-2.5">
              <div className="flex items-center justify-between text-xs font-mono text-[#CCCCCC] pb-1">
                <span className="uppercase font-bold text-[#5ADCC8]">
                  5 SERIAL-VERIFIED FDU ASSEMBLIES
                </span>
                <span>Every part matched by unit serial</span>
              </div>

              {FDU_LAYERS.map((layer, idx) => {
                const layerHighlighted =
                  reducedMotion ||
                  effectiveSeparation > idx * 0.15;
                return (
                  <div
                    key={layer.id}
                    data-testid={layer.testId}
                    className={`rounded-lg p-3 sm:p-3.5 border transition-colors ${
                      layerHighlighted
                        ? "bg-[#0A0A0A] border-[#5ADCC8]/70"
                        : "bg-[#050505] border-[#262626]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-[#5ADCC8] text-[#000000] font-mono font-extrabold text-[11px]">
                          {layer.stepNum}
                        </span>
                        <h3 className="text-xs sm:text-sm font-extrabold uppercase text-white">
                          {layer.label}
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-[#5ADCC8] hidden sm:inline">
                        {layer.familyTag}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#CCCCCC] leading-snug">
                      {layer.sublabel}
                    </p>
                  </div>
                );
              })}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/parts-finder?platform=FDU"
                  className="w-full sm:w-auto text-center px-5 py-2.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  Find Serial-Verified FDU Parts →
                </Link>
                <span className="text-[11px] font-mono text-[#CCCCCC]">
                  Estimate within 24 hours
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
