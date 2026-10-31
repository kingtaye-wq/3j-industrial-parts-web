import React from "react";

export default function MeltTreatmentSchematic() {
  return (
    <div
      className="relative w-full rounded-xl bg-[#050505] border border-[#262626] p-4 sm:p-6 overflow-hidden shadow-2xl"
      aria-label="Animated schematic of an aluminum melt-treatment rotary degassing impeller dispersing inert gas bubbles"
    >
      {/* Top Technical Telemetry Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-[#1A1A1A] text-[11px] font-mono text-[#CCCCCC]">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#5ADCC8]" />
          <span className="uppercase tracking-wider text-white font-bold">
            ROTARY DEGASSING &amp; MELT TREATMENT SCHEMATIC
          </span>
        </div>
        <div className="flex items-center gap-3 text-[10px] text-[#5ADCC8]">
          <span>FDU · MTS 1500 · SMARTT · THERMATEST NGIII 5000</span>
        </div>
      </div>

      {/* Pure Inline SVG / CSS Schematic */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center">
        <svg
          viewBox="0 0 560 400"
          className="w-full h-full"
          role="img"
          aria-labelledby="melt-schematic-title melt-schematic-desc"
        >
          <title id="melt-schematic-title">
            Aluminum Melt-Treatment Rotary Degassing Schematic
          </title>
          <desc id="melt-schematic-desc">
            Engineering diagram of an FDU / SMARTT / MTS 1500 graphite rotor and shaft immersed in a molten aluminum crucible, dispersing inert Argon/Nitrogen bubbles for hydrogen removal.
          </desc>

          <defs>
            {/* Subtle Crucible Base Thermal Glow */}
            <radialGradient id="crucibleBaseGlow" cx="50%" cy="88%" r="55%">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.34" />
              <stop offset="50%" stopColor="#D97706" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Teal Inert Gas Dispersion Glow */}
            <radialGradient id="tealDispersionGlow" cx="50%" cy="68%" r="42%">
              <stop offset="0%" stopColor="#5ADCC8" stopOpacity="0.26" />
              <stop offset="65%" stopColor="#5ADCC8" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            {/* Engineering Grid Pattern */}
            <pattern
              id="engGrid"
              width="28"
              height="28"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 28 0 L 0 0 0 28"
                fill="none"
                stroke="#161616"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          {/* Background Engineering Grid */}
          <rect width="560" height="400" fill="#030303" />
          <rect width="560" height="400" fill="url(#engGrid)" />

          {/* Ambient Crucible Thermal Glow + Teal Dispersion Glow */}
          <ellipse
            cx="280"
            cy="330"
            rx="210"
            ry="80"
            fill="url(#crucibleBaseGlow)"
            className="melt-pool-glow"
            data-animated="true"
          />
          <ellipse
            cx="280"
            cy="275"
            rx="155"
            ry="75"
            fill="url(#tealDispersionGlow)"
            className="melt-rotor-vortex"
            data-animated="true"
          />

          {/* Top Spindle Head & Gas Manifold Block */}
          <g>
            <rect
              x="215"
              y="18"
              width="130"
              height="44"
              rx="4"
              fill="#111111"
              stroke="#383838"
              strokeWidth="1.5"
            />
            <rect
              x="235"
              y="26"
              width="90"
              height="12"
              rx="2"
              fill="#1A1A1A"
              stroke="#5ADCC8"
              strokeWidth="1"
            />
            <text
              x="280"
              y="35"
              textAnchor="middle"
              fill="#5ADCC8"
              fontSize="8"
              fontFamily="monospace"
            >
              MFC GAS DRIVE HEAD
            </text>
            <text
              x="280"
              y="53"
              textAnchor="middle"
              fill="#CCCCCC"
              fontSize="8"
              fontFamily="monospace"
            >
              AR / N2 INERT FLOW
            </text>
          </g>

          {/* Crucible Cover & Furnace Lid */}
          <rect
            x="110"
            y="92"
            width="340"
            height="14"
            rx="2"
            fill="#161616"
            stroke="#383838"
            strokeWidth="1.5"
          />

          {/* Crucible Refractory Vessel Walls */}
          <path
            d="M 130 106 L 152 342 C 156 362, 176 372, 205 372 L 355 372 C 384 372, 404 362, 408 342 L 430 106"
            fill="#0B0B0B"
            stroke="#444444"
            strokeWidth="3"
          />
          <path
            d="M 144 106 L 164 334 C 168 350, 184 358, 210 358 L 350 358 C 376 358, 392 350, 396 334 L 416 106"
            fill="#080808"
            stroke="#262626"
            strokeWidth="1.5"
          />

          {/* Molten Aluminum Bath Surface Line */}
          <path
            d="M 150 165 Q 215 160, 280 165 T 410 165"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeOpacity="0.8"
          />
          <path
            d="M 151 166 L 165 334 C 169 349, 185 356, 210 356 L 350 356 C 375 356, 391 349, 395 334 L 409 166 Z"
            fill="#F59E0B"
            fillOpacity="0.06"
          />

          {/* DIAMANT Anti-Vortex Baffle Plate (Left) */}
          <g>
            <rect
              x="176"
              y="106"
              width="16"
              height="120"
              rx="2"
              fill="#1E1E1E"
              stroke="#5ADCC8"
              strokeWidth="1.2"
              strokeOpacity="0.7"
            />
            <line
              x1="98"
              y1="196"
              x2="176"
              y2="196"
              stroke="#5ADCC8"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="92"
              y="193"
              textAnchor="end"
              fill="#5ADCC8"
              fontSize="9"
              fontFamily="monospace"
            >
              DIAMANT BAFFLE
            </text>
            <text
              x="92"
              y="204"
              textAnchor="end"
              fill="#CCCCCC"
              fontSize="8"
              fontFamily="monospace"
            >
              ANTI-VORTEX PLATE
            </text>
          </g>

          {/* Immersion Thermocouple Assembly (Right) */}
          <g>
            <rect
              x="368"
              y="106"
              width="10"
              height="145"
              rx="2"
              fill="#1E1E1E"
              stroke="#F59E0B"
              strokeWidth="1.2"
            />
            <circle cx="373" cy="248" r="3.5" fill="#F59E0B" />
            <line
              x1="378"
              y1="215"
              x2="452"
              y2="215"
              stroke="#F59E0B"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
            <text
              x="458"
              y="212"
              textAnchor="start"
              fill="#FFFFFF"
              fontSize="9"
              fontFamily="monospace"
            >
              THERMOCOUPLE
            </text>
            <text
              x="458"
              y="223"
              textAnchor="start"
              fill="#CCCCCC"
              fontSize="8"
              fontFamily="monospace"
            >
              718°C BATH VERIFIED
            </text>
          </g>

          {/* Graphite Shaft & Internal Inert Gas Bore */}
          <rect
            x="268"
            y="62"
            width="24"
            height="232"
            fill="#1D1D1D"
            stroke="#CCCCCC"
            strokeWidth="1.5"
          />
          <line
            x1="280"
            y1="62"
            x2="280"
            y2="305"
            stroke="#5ADCC8"
            strokeWidth="2.5"
            className="melt-gas-stream"
            data-animated="true"
          />

          {/* High-Shear Graphite Rotor Impeller (XSR / FDR / XDR / FDDR) */}
          <g>
            <rect
              x="228"
              y="292"
              width="104"
              height="28"
              rx="4"
              fill="#181818"
              stroke="#5ADCC8"
              strokeWidth="2"
            />
            {/* Rotor Vanes / Gas Dispersion Ports */}
            <rect x="236" y="298" width="14" height="16" rx="2" fill="#5ADCC8" fillOpacity="0.3" stroke="#5ADCC8" strokeWidth="1" />
            <rect x="260" y="298" width="14" height="16" rx="2" fill="#5ADCC8" fillOpacity="0.4" stroke="#5ADCC8" strokeWidth="1" />
            <rect x="286" y="298" width="14" height="16" rx="2" fill="#5ADCC8" fillOpacity="0.4" stroke="#5ADCC8" strokeWidth="1" />
            <rect x="310" y="298" width="14" height="16" rx="2" fill="#5ADCC8" fillOpacity="0.3" stroke="#5ADCC8" strokeWidth="1" />

            {/* Rotary Motion Elliptical Trajectory */}
            <ellipse
              cx="280"
              cy="306"
              rx="68"
              ry="14"
              fill="none"
              stroke="#5ADCC8"
              strokeWidth="1.2"
              strokeDasharray="5 4"
              className="melt-gas-stream"
              data-animated="true"
            />
          </g>

          {/* Radial Gas Dispersion Flow Paths */}
          <path
            d="M 228 306 C 185 304, 175 260, 190 180"
            fill="none"
            stroke="#5ADCC8"
            strokeWidth="1.4"
            strokeOpacity="0.55"
            className="melt-gas-stream"
            data-animated="true"
          />
          <path
            d="M 332 306 C 375 304, 385 260, 370 180"
            fill="none"
            stroke="#5ADCC8"
            strokeWidth="1.4"
            strokeOpacity="0.55"
            className="melt-gas-stream"
            data-animated="true"
          />

          {/* Rising Inert Gas Bubbles (Bright Teal #5ADCC8) */}
          <g className="melt-bubble-slow" data-animated="true">
            <circle cx="212" cy="295" r="5" fill="#5ADCC8" fillOpacity="0.85" />
            <circle cx="242" cy="272" r="3.5" fill="#5ADCC8" fillOpacity="0.75" />
            <circle cx="318" cy="288" r="5.5" fill="#5ADCC8" fillOpacity="0.85" />
            <circle cx="345" cy="260" r="4" fill="#5ADCC8" fillOpacity="0.7" />
            <circle cx="202" cy="235" r="4.5" fill="#5ADCC8" fillOpacity="0.65" />
            <circle cx="352" cy="228" r="3.5" fill="#5ADCC8" fillOpacity="0.65" />
          </g>

          <g className="melt-bubble-fast" data-animated="true">
            <circle cx="226" cy="308" r="4" fill="#5ADCC8" fillOpacity="0.9" />
            <circle cx="255" cy="285" r="4.5" fill="#5ADCC8" fillOpacity="0.8" />
            <circle cx="305" cy="298" r="4" fill="#5ADCC8" fillOpacity="0.9" />
            <circle cx="334" cy="275" r="5" fill="#5ADCC8" fillOpacity="0.8" />
            <circle cx="235" cy="240" r="3.5" fill="#5ADCC8" fillOpacity="0.75" />
            <circle cx="322" cy="245" r="4" fill="#5ADCC8" fillOpacity="0.75" />
            <circle cx="262" cy="215" r="3" fill="#5ADCC8" fillOpacity="0.7" />
            <circle cx="298" cy="218" r="3.5" fill="#5ADCC8" fillOpacity="0.7" />
          </g>

          {/* Callout: Graphite Rotor & Shaft */}
          <line
            x1="332"
            y1="306"
            x2="452"
            y2="306"
            stroke="#5ADCC8"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
          <text
            x="458"
            y="302"
            textAnchor="start"
            fill="#5ADCC8"
            fontSize="9"
            fontFamily="monospace"
            fontWeight="bold"
          >
            XSR / FDR / XDR / FDDR
          </text>
          <text
            x="458"
            y="314"
            textAnchor="start"
            fill="#CCCCCC"
            fontSize="8"
            fontFamily="monospace"
          >
            SERIAL-VERIFIED ROTOR
          </text>
        </svg>
      </div>

      {/* Bottom Schematic Legend Strip */}
      <div className="mt-3 pt-3 border-t border-[#1A1A1A] grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
        <div className="bg-[#0A0A0A] px-2.5 py-1.5 rounded border border-[#262626]">
          <span className="text-[#999999] block text-[10px]">DEGASSING PLATFORMS</span>
          <span className="text-white font-semibold">FDU · SMARTT · MTS 1500</span>
        </div>
        <div className="bg-[#0A0A0A] px-2.5 py-1.5 rounded border border-[#262626]">
          <span className="text-[#999999] block text-[10px]">THERMAL ANALYSIS</span>
          <span className="text-white font-semibold">ThermaTest NGIII 5000</span>
        </div>
        <div className="bg-[#0A0A0A] px-2.5 py-1.5 rounded border border-[#262626]">
          <span className="text-[#999999] block text-[10px]">PART VERIFICATION</span>
          <span className="text-[#5ADCC8] font-semibold">100% Serial-Matched</span>
        </div>
        <div className="bg-[#0A0A0A] px-2.5 py-1.5 rounded border border-[#262626]">
          <span className="text-[#999999] block text-[10px]">QUOTE TURNAROUND</span>
          <span className="text-[#5ADCC8] font-semibold">≤ 24 Hours SLA</span>
        </div>
      </div>
    </div>
  );
}
