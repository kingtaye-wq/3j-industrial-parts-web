"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export interface MtsBeatSpec {
  beatNumber: number;
  label: string;
  detail: string;
  highlightTag?: string;
}

export const MTS_1500_BEATS: MtsBeatSpec[] = [
  {
    beatNumber: 1,
    label: "Rotor lowers into the melt",
    detail:
      "The MTS 1500 mast lowers the serial-verified graphite shaft and high-shear rotor assembly into the molten aluminum crucible.",
  },
  {
    beatNumber: 2,
    label: "Controlled vortex forms",
    detail:
      "The spindle spins up alongside the DIAMANT baffle plate, forming a controlled surface vortex without air entrainment.",
  },
  {
    beatNumber: 3,
    label: "Inert gas bubbles strip hydrogen",
    detail:
      "Fine inert-gas bubbles shear radially from the rotor impeller and rise evenly through the molten aluminum bath.",
  },
  {
    beatNumber: 4,
    label: "Flux dosed into the vortex (MTS 1500)",
    detail:
      "The MTS 1500 precision auger hopper feeds granular treatment consumables directly into the vortex funnel for rapid, uniform mixing.",
    highlightTag: "COVERAL / SIMODAL / NUCLEANT",
  },
  {
    beatNumber: 5,
    label: "Inclusions float out",
    detail:
      "Rising gas bubbles and reacted flux capture non-metallic oxides and inclusions, floating them upward into a dry surface dross layer.",
  },
  {
    beatNumber: 6,
    label: "Treatment complete — cleaner metal, less dross",
    detail:
      "The rotor slows and lifts clear as the purified aluminum bath settles, ready for thermal verification and casting.",
    highlightTag: "SMARTT sets rotor speed, gas flow & treatment time",
  },
];

export default function Mts1500CycleScrollSection() {
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

  // Determine active beat index (0..5)
  const activeBeatIndex = reducedMotion
    ? 3
    : Math.min(5, Math.floor(scrollProgress * 6));
  const activeBeat = MTS_1500_BEATS[activeBeatIndex];

  // Compute SVG kinematic parameters from scrollProgress
  // 1. Rotor + Shaft vertical travel: lowers in Beat 1 (0..0.17), stays immersed Beats 2..5 (0.17..0.83), lifts in Beat 6 (0.83..1.0)
  let rotorVerticalOffset = 0;
  if (!reducedMotion) {
    if (scrollProgress < 0.17) {
      const t = scrollProgress / 0.17;
      rotorVerticalOffset = Number((-54 * (1 - t)).toFixed(1));
    } else if (scrollProgress <= 0.83) {
      rotorVerticalOffset = 0;
    } else {
      const t = (scrollProgress - 0.83) / 0.17;
      rotorVerticalOffset = Number((-48 * t).toFixed(1));
    }
  }

  // 2. Controlled vortex funnel depth (0 = flat bath, 1 = full vortex in Beats 2..4)
  let vortexFactor = 0.85;
  if (!reducedMotion) {
    if (scrollProgress < 0.15) {
      vortexFactor = 0;
    } else if (scrollProgress < 0.32) {
      vortexFactor = (scrollProgress - 0.15) / 0.17;
    } else if (scrollProgress <= 0.68) {
      vortexFactor = 1;
    } else if (scrollProgress <= 0.86) {
      vortexFactor = 1 - (scrollProgress - 0.68) / 0.18;
    } else {
      vortexFactor = 0;
    }
  }
  const vortexDipY = Math.round(188 + 42 * vortexFactor);

  // 3. Inert gas bubbles opacity (Beats 3..5)
  const gasBubblesOpacity = reducedMotion
    ? 0.9
    : scrollProgress >= 0.3 && scrollProgress <= 0.84
    ? 0.95
    : 0.12;

  // 4. MTS 1500 Flux Dosing stream opacity (Beat 4 signature, plus visible in reducedMotion)
  const fluxDosingOpacity = reducedMotion
    ? 0.95
    : scrollProgress >= 0.46 && scrollProgress <= 0.72
    ? 1
    : 0.15;

  // 5. Surface dross / floated inclusions layer opacity (Beats 5..6)
  const drossLayerOpacity = reducedMotion
    ? 0.85
    : scrollProgress >= 0.64
    ? 0.92
    : 0.1;

  return (
    <section
      ref={sectionRef}
      data-testid="mts-1500-cycle-scroll-section"
      data-reduced-motion={reducedMotion ? "true" : "false"}
      data-scroll-progress={scrollProgress.toFixed(2)}
      data-active-beat={activeBeat.beatNumber}
      aria-label="MTS 1500 Metal Treatment Station In-Action Scroll Cycle"
      className={`relative w-full bg-[#000000] border-b border-[#262626] ${
        reducedMotion ? "py-12" : "min-h-[280vh]"
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
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1A1A1A]">
            <div>
              <span className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-[#5ADCC8] font-bold">
                <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
                DIVISION 01 PROCESS SEQUENCE · MTS 1500 &amp; SMARTT IN ACTION
              </span>
              <h2 className="mt-1 text-xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                MTS 1500 Automated Melt-Treatment Cycle
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-[#0A0A0A] px-3.5 py-2 rounded border border-[#5ADCC8]/50 text-xs font-mono">
              <span className="text-[#999999] uppercase">ACTIVE STAGE:</span>
              <strong
                data-testid="mts-active-beat-label"
                className="text-[#5ADCC8]"
              >
                0{activeBeat.beatNumber} — {activeBeat.label}
              </strong>
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

          {/* Main Grid: Left/Top MTS 1500 SVG Schematic + Right/Bottom 6 Cycle Beats */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center">
            {/* MTS 1500 SVG Stage */}
            <div className="lg:col-span-7 rounded-xl bg-[#050505] border border-[#262626] p-3 sm:p-5 relative overflow-hidden">
              <svg
                viewBox="0 0 600 440"
                className="w-full h-auto max-h-[330px] sm:max-h-[420px] mx-auto block"
                role="img"
                aria-labelledby="mts-cycle-svg-title mts-cycle-svg-desc"
              >
                <title id="mts-cycle-svg-title">
                  MTS 1500 Metal Treatment Station Automated Degassing and Flux Injection Cycle
                </title>
                <desc id="mts-cycle-svg-desc">
                  Six-beat interactive schematic showing the MTS 1500 lowering its graphite rotor into molten aluminum, forming a controlled vortex, dispersing inert gas bubbles, dosing COVERAL / SIMODAL / NUCLEANT flux into the vortex, floating inclusions to the dross layer, and lifting on completion with SMARTT process control.
                </desc>

                <defs>
                  <pattern
                    id="mtsCadGrid"
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
                  <radialGradient id="mtsMeltPoolGlow" cx="50%" cy="78%" r="48%">
                    <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.28" />
                    <stop offset="60%" stopColor="#5ADCC8" stopOpacity="0.09" />
                    <stop offset="100%" stopColor="#000000" stopOpacity="0" />
                  </radialGradient>
                </defs>

                <rect width="600" height="440" fill="#030303" />
                <rect width="600" height="440" fill="url(#mtsCadGrid)" />

                {/* MTS 1500 Vertical Mast & Cantilever Gantry (Left) */}
                <g>
                  <rect
                    x="44"
                    y="24"
                    width="26"
                    height="384"
                    rx="3"
                    fill="#111111"
                    stroke="#383838"
                    strokeWidth="1.5"
                  />
                  {/* SMARTT Process Control Callout Badge on Mast */}
                  <rect
                    x="82"
                    y="26"
                    width="285"
                    height="34"
                    rx="4"
                    fill="#071916"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                  />
                  <text
                    x="94"
                    y="41"
                    fill="#5ADCC8"
                    fontSize="9.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    SMARTT INTEGRATED PROCESS CONTROL
                  </text>
                  <text
                    x="94"
                    y="53"
                    fill="#FFFFFF"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    SMARTT sets rotor speed, gas flow &amp; treatment time
                  </text>
                </g>

                {/* MTS 1500 Precision Flux Hopper & Auger Dosing Tube (Right Side) */}
                <g>
                  {/* Conical Hopper */}
                  <polygon
                    points="430,40 530,40 502,102 458,102"
                    fill="#121212"
                    stroke="#5ADCC8"
                    strokeWidth="1.5"
                  />
                  {/* Auger Dosing Housing */}
                  <rect
                    x="452"
                    y="102"
                    width="56"
                    height="20"
                    rx="3"
                    fill="#1B1B1B"
                    stroke="#FFFFFF"
                    strokeWidth="1.2"
                  />
                  {/* Angled Flux Dosing Chute Pointing at Vortex */}
                  <path
                    d="M 458 118 L 352 178"
                    fill="none"
                    stroke="#CCCCCC"
                    strokeWidth="5"
                  />
                  <path
                    d="M 458 118 L 352 178"
                    fill="none"
                    stroke="#5ADCC8"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <text
                    x="480"
                    y="64"
                    textAnchor="middle"
                    fill="#5ADCC8"
                    fontSize="9"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    MTS 1500 FLUX HOPPER
                  </text>
                  <text
                    x="480"
                    y="77"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="8"
                    fontFamily="monospace"
                  >
                    COVERAL / SIMODAL / NUCLEANT
                  </text>
                </g>

                {/* Crucible Refractory Vessel */}
                <g>
                  <ellipse
                    cx="290"
                    cy="320"
                    rx="165"
                    ry="70"
                    fill="url(#mtsMeltPoolGlow)"
                  />
                  <path
                    d="M 145 155 L 166 372 C 170 392, 198 402, 290 402 C 382 402, 410 392, 414 372 L 435 155"
                    fill="#0A0A0A"
                    stroke="#444444"
                    strokeWidth="3"
                  />
                  <path
                    d="M 160 160 L 178 364 C 182 380, 206 388, 290 388 C 374 388, 398 380, 402 364 L 420 160"
                    fill="#070707"
                    stroke="#262626"
                    strokeWidth="1.5"
                  />
                </g>

                {/* Molten Aluminum Bath Surface + Dynamic Controlled Vortex Path */}
                <path
                  data-testid="mts-melt-surface-path"
                  d={`M 164 188 Q 225 188, 255 ${vortexDipY} Q 290 ${
                    vortexDipY + 14
                  }, 325 ${vortexDipY} Q 355 188, 416 188 L 400 364 C 396 378, 374 386, 290 386 C 206 386, 184 378, 180 364 Z`}
                  fill="#F59E0B"
                  fillOpacity="0.08"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />

                {/* Beat 5 & 6: Floated Oxide / Inclusions Surface Dross Layer */}
                <g
                  data-testid="mts-dross-layer"
                  style={{ opacity: drossLayerOpacity }}
                >
                  <rect
                    x="166"
                    y="180"
                    width="82"
                    height="9"
                    rx="3"
                    fill="#D97706"
                    fillOpacity="0.65"
                    stroke="#F59E0B"
                    strokeWidth="1"
                  />
                  <rect
                    x="332"
                    y="180"
                    width="82"
                    height="9"
                    rx="3"
                    fill="#D97706"
                    fillOpacity="0.65"
                    stroke="#F59E0B"
                    strokeWidth="1"
                  />
                  <text
                    x="168"
                    y="174"
                    fill="#F59E0B"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    FLOATED DROSS &amp; INCLUSIONS LAYER
                  </text>
                </g>

                {/* Beat 4 Signature: Granular Flux Stream Dosing into the Vortex */}
                <g
                  data-testid="mts-flux-dosing-stream"
                  style={{ opacity: fluxDosingOpacity }}
                >
                  <path
                    d={`M 352 178 Q 332 195, 308 ${vortexDipY + 4}`}
                    fill="none"
                    stroke="#5ADCC8"
                    strokeWidth="3"
                    strokeDasharray="3 5"
                  />
                  <circle cx="344" cy="184" r="3.5" fill="#FFFFFF" />
                  <circle cx="332" cy="196" r="3" fill="#5ADCC8" />
                  <circle cx="318" cy="208" r="3.5" fill="#FFFFFF" />
                  <circle cx="305" cy="220" r="3" fill="#5ADCC8" />
                  <circle cx="272" cy="245" r="2.5" fill="#FFFFFF" />
                  <circle cx="312" cy="252" r="2.5" fill="#FFFFFF" />
                </g>

                {/* Beat 3..5: Rising Inert Gas Bubbles Stripping Hydrogen */}
                <g
                  data-testid="mts-gas-bubbles"
                  style={{ opacity: gasBubblesOpacity }}
                >
                  <circle cx="225" cy="325" r="5" fill="#5ADCC8" />
                  <circle cx="248" cy="298" r="4" fill="#5ADCC8" />
                  <circle cx="210" cy="272" r="4.5" fill="#5ADCC8" />
                  <circle cx="238" cy="240" r="3.5" fill="#5ADCC8" />
                  <circle cx="355" cy="322" r="5" fill="#5ADCC8" />
                  <circle cx="332" cy="294" r="4" fill="#5ADCC8" />
                  <circle cx="368" cy="268" r="4.5" fill="#5ADCC8" />
                  <circle cx="342" cy="236" r="3.5" fill="#5ADCC8" />
                  <circle cx="268" cy="276" r="3.5" fill="#5ADCC8" />
                  <circle cx="312" cy="278" r="3.5" fill="#5ADCC8" />
                </g>

                {/* Moving Carriage + Drive Head + Graphite Shaft & Rotor Assembly */}
                <g
                  data-testid="mts-rotor-assembly"
                  data-offset-y={rotorVerticalOffset}
                  style={{
                    transform: `translate3d(0px, ${rotorVerticalOffset}px, 0px)`,
                  }}
                >
                  {/* Cantilever Arm from Mast to Spindle Head */}
                  <rect
                    x="70"
                    y="92"
                    width="175"
                    height="14"
                    fill="#1A1A1A"
                    stroke="#383838"
                    strokeWidth="1.5"
                  />
                  {/* Spindle Drive Head */}
                  <rect
                    x="235"
                    y="78"
                    width="110"
                    height="40"
                    rx="4"
                    fill="#121212"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <text
                    x="290"
                    y="101"
                    textAnchor="middle"
                    fill="#5ADCC8"
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    MTS 1500 DRIVE HEAD
                  </text>

                  {/* DIAMANT Baffle Blade */}
                  <rect
                    x="222"
                    y="118"
                    width="14"
                    height="112"
                    rx="2"
                    fill="#181818"
                    stroke="#5ADCC8"
                    strokeWidth="1.2"
                  />

                  {/* Graphite Shaft */}
                  <rect
                    x="278"
                    y="118"
                    width="24"
                    height="205"
                    fill="#1D1D1D"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                  <line
                    x1="290"
                    y1="118"
                    x2="290"
                    y2="323"
                    stroke="#5ADCC8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />

                  {/* Graphite Rotor Impeller */}
                  <rect
                    x="238"
                    y="316"
                    width="104"
                    height="26"
                    rx="4"
                    fill="#141414"
                    stroke="#5ADCC8"
                    strokeWidth="2"
                  />
                  <rect
                    x="246"
                    y="321"
                    width="15"
                    height="16"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.4"
                  />
                  <rect
                    x="268"
                    y="321"
                    width="15"
                    height="16"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.5"
                  />
                  <rect
                    x="296"
                    y="321"
                    width="15"
                    height="16"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.5"
                  />
                  <rect
                    x="318"
                    y="321"
                    width="15"
                    height="16"
                    rx="2"
                    fill="#5ADCC8"
                    fillOpacity="0.4"
                  />
                </g>
              </svg>
            </div>

            {/* Right / Bottom: The 6 Verbatim MTS 1500 Cycle Beats */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-[#CCCCCC] pb-1">
                <span className="uppercase font-bold text-[#5ADCC8]">
                  6-BEAT MTS 1500 TREATMENT CYCLE
                </span>
                <span>Scroll to scrub process</span>
              </div>

              {MTS_1500_BEATS.map((beat, idx) => {
                const isActive = reducedMotion || idx === activeBeatIndex;
                return (
                  <div
                    key={beat.beatNumber}
                    data-testid={`mts-beat-${beat.beatNumber}`}
                    className={`rounded-lg p-2.5 sm:p-3 border transition-colors ${
                      isActive
                        ? "bg-[#051815] border-[#5ADCC8]"
                        : "bg-[#050505] border-[#262626]"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded font-mono font-extrabold text-[11px] ${
                            isActive
                              ? "bg-[#5ADCC8] text-[#000000]"
                              : "bg-[#1A1A1A] text-[#CCCCCC]"
                          }`}
                        >
                          0{beat.beatNumber}
                        </span>
                        <h3 className="text-xs sm:text-sm font-extrabold text-white">
                          {beat.label}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-1 text-[11px] sm:text-xs text-[#CCCCCC] leading-snug">
                      {beat.detail}
                    </p>
                    {beat.highlightTag && (
                      <div className="mt-1.5 inline-flex items-center px-2 py-0.5 rounded bg-[#000000] border border-[#5ADCC8]/50 text-[10px] font-mono text-[#5ADCC8] font-bold">
                        {beat.highlightTag}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/parts-finder?platform=MTS%201500"
                  className="w-full sm:w-auto text-center px-5 py-2.5 rounded bg-[#5ADCC8] hover:bg-[#4bcbb7] text-[#000000] font-extrabold text-xs uppercase tracking-wider transition-colors"
                >
                  Browse MTS 1500 &amp; SMARTT Parts →
                </Link>
                <span className="text-[11px] font-mono text-[#CCCCCC]">
                  100% Serial-Verified Fit
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
