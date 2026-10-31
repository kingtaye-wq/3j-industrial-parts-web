# 3J Industrial Parts LLC — Website (`3jindustrialparts.com`)

Production Next.js (App Router) + TypeScript + Tailwind CSS rebuild and enhancement for **3J Industrial Parts LLC** (`SPARE PARTS | SERVICES | CONSULTING`), founded by **Jason Allen**.

## Brand System & Sampled Design Tokens

- **Official Logo Asset:** `public/assets/3j-logo.png` (downloaded verbatim from `https://static.wixstatic.com/media/30829a_823164a3793146ba925b15a134e310d8~mv2.png`, white stylized `3J` wrench/gear mark on black `#000000` container).
- **Sampled Live Site Palette (`https://www.3jindustrialparts.com/`):**
  - `--bg-primary`: `#000000` (Wix `--color_44: 0,0,0`)
  - `--bg-surface`: `#0A0A0A` (Wix `--color_0` / `--color_11: 10,10,10`)
  - `--bg-elevated`: `#1A1A1A` (Wix `--color_2` / `--color_12: 26,26,26`)
  - `--border-subtle`: `#262626` (Wix `--color_23: 38,38,38`)
  - `--border-strong`: `#383838` (Wix `--color_3` / `--color_13: 56,56,56`)
  - `--text-primary`: `#FFFFFF` (Wix `--color_5` / `--color_15: 255,255,255`)
  - `--text-secondary`: `#CCCCCC` (Wix `--color_4` / `--color_14: 204,204,204`)
  - **`--accent-teal`: `#5ADCC8`** (`rgb(90, 220, 200)` — sampled directly from live Wix site CSS root variables `--color_8`, `--color_18`, `--color_41`, `--color_48`, `--color_51`, `--color_58`, `--color_59`, `--color_61`, `--color_62`, `--color_65`).

## Company Facts & Guardrails

- **Legal Name:** 3J Industrial Parts LLC
- **Tagline:** `SPARE PARTS | SERVICES | CONSULTING`
- **Founder:** Jason Allen
- **Direct Phone:** `216-906-2252`
- **Direct Email:** `Jallen@3jindustrialparts.com`
- **Quote Turnaround SLA:** `Estimate within 24 hours`
- **Verbatim Proof Line:** *"6+ years of aluminum melt-treatment expertise — formerly the single point of contact for SMARTT, MTS 1500, and ThermaTest NGIII 5000 support across the U.S."*
- **Division 01 — Industrial Foundry Support (Nationwide U.S.):** Serial-verified spare parts, field service, equipment health checks, and process consulting for **FDU**, **MTS 1500**, **SMARTT**, and **ThermaTest NGIII 5000** (all Foseco / Vesuvius platforms).
- **Division 02 — Commercial Equipment Repair & Loaner Fleet (Cuyahoga County, Ohio Only):** Frozen beverage / slushie machines, commercial ice machines, reach-in coolers/freezers, and glycol chillers with drop-off loaner machines exclusively within **Cuyahoga County, Ohio**.
- **The Junior Tech Program:** Vocational-style training program led by Jason Allen staffing Division 02 in Cuyahoga County and recruiting top graduates toward Division 01 nationwide foundry systems.

## Pages & Routes

1. **`/` (`Home`)**:
   - Pure CSS/SVG animated melt-treatment header schematic (rotary degassing impeller dispersing `#5ADCC8` inert gas bubbles in a molten aluminum crucible bath; honors `@media (prefers-reduced-motion: reduce)`).
   - Verbatim proof strip, Two-Division Split cards, Featured Platforms strip (`FDU`, `MTS 1500`, `SMARTT`, `ThermaTest NGIII 5000`), Six Core Services, Cuyahoga County Loaner Program callout (`~$98/day` downtime math), and Unified Quote Request form.
2. **`/parts-finder` (`Parts Finder`)**:
   - Bosch Rexroth-style 3-step selector (`Select Equipment Platform` → `Unit Serial Number & Seeded Component Catalog + Nameplate Photo Upload` → `Pre-Filled Quote Request Drawer`).
3. **`/food-service` (`Food Service & Commercial Equipment — Cuyahoga County, OH`)**:
   - Explicit `CUYAHOGA COUNTY, OHIO — COMMERCIAL SERVICE` badge, 3-step Loaner Swap workflow, Interactive Downtime Cost Calculator (`60 drinks/day × ~$2.72/drink ≈ $98/day` lost gross profit), 4 Equipment Categories, Transparent Locked Pricing & Care Plan cards, and Cuyahoga County City/ZIP validated booking intake form.
4. **`/about` (`About 3J Industrial Parts`)**:
   - Jason Allen founder bio, verbatim proof quote, 4 core differentiators, and **The Junior Tech Program** vocational pathway section + interactive interest/partnership form.

## Development & Verification

```bash
npm run dev
npm run build
npx playwright test
```
