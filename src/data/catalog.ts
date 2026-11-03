export const BRAND = {
  legalName: "3J Industrial Parts LLC",
  shortName: "3J Industrial Parts",
  tagline: "SPARE PARTS | SERVICES | CONSULTING",
  phoneDisplay: "216-906-2252",
  phoneHref: "tel:2169062252",
  email: "Jallen@3jindustrialparts.com",
  emailHref: "mailto:Jallen@3jindustrialparts.com",
  founder: "Jason Allen",
  proofQuote:
    "6+ years of aluminum melt-treatment expertise — formerly the single point of contact for SMARTT, MTS 1500, and ThermaTest NGIII 5000 support across the U.S.",
  quotePromise: "Estimate within 24 hours",
  serialGuarantee:
    "Every part is matched to your unit's serial number before it ships.",
  accentTealHex: "#5ADCC8",
  logoPath: "/assets/3j-logo.png",
  division01Label: "Division 01 — Industrial Foundry Support · Nationwide U.S.",
  division02Label:
    "Division 02 — 3JI-Repair Commercial Equipment Service & Loaner Program · Cuyahoga County Launch Area",
  serviceNameDiv02: "3JI-Repair",
} as const;

export const REPAIR_EQUIPMENT_SCOPE = [
  "Refrigerators",
  "Coolers",
  "Freezers",
  "Ice Machines",
  "HVAC",
  "Beverage Machines",
  "Frozen Beverage / Slushie Machines",
  "Walk-In Coolers & Freezers",
  "Reach-In & Undercounter Refrigeration",
  "Display Merchandiser Cases",
  "Ice Dispensers & Bins",
  "Soda Fountain & Carbonation Systems",
  "Draft Beer Systems & Glycol Chillers",
  "Bottle Coolers & Kegerators",
  "Juice Dispensers & Mixers",
] as const;

export type PlatformId =
  | "FDU"
  | "MTS 1500"
  | "SMARTT"
  | "ThermaTest NGIII 5000"
  | "Other / Not Sure";

export interface PlatformInfo {
  id: PlatformId;
  code: string;
  name: string;
  fullName: string;
  oemOrigin: string;
  summary: string;
  typicalSerialPrefix: string;
  keyFamilies: string[];
}

export const PLATFORMS: PlatformInfo[] = [
  {
    id: "FDU",
    code: "SYS-01",
    name: "FDU",
    fullName: "FDU (Foundry Degassing Unit)",
    oemOrigin: "Foseco / Vesuvius Platform",
    summary:
      "Rotary inert-gas degassing units for molten aluminum hydrogen removal and inclusion flotation. Full support for XSR, FDR, XDR, and FDDR rotor/shaft geometries and DIAMANT wear assemblies.",
    typicalSerialPrefix: "FDU-",
    keyFamilies: [
      "Graphite Rotors & Shafts (XSR / FDR / XDR / FDDR)",
      "DIAMANT Ceramic Wear Parts & Baffle Plates",
      "Gas Control Valves & Mass Flow Controllers",
      "Drive Seals, Spindle Bearings & PLC/HMI Modules",
    ],
  },
  {
    id: "MTS 1500",
    code: "SYS-02",
    name: "MTS 1500",
    fullName: "MTS 1500 (Metal Treatment Station)",
    oemOrigin: "Foseco / Vesuvius Platform",
    summary:
      "Automated rotary degassing and precision flux injection station. Complete spare parts, auger assemblies, COVERAL / SIMODAL / NUCLEANT treatment dosing hardware, and field calibration.",
    typicalSerialPrefix: "MTS1500-",
    keyFamilies: [
      "Flux Feeders & Precision Auger Assemblies",
      "Graphite Rotors & Shafts (FDR / XDR / FDDR)",
      "COVERAL / SIMODAL / NUCLEANT Treatment Consumables",
      "Gas Control Manifolds & PLC / HMI Modules",
    ],
  },
  {
    id: "SMARTT",
    code: "SYS-03",
    name: "SMARTT",
    fullName: "SMARTT (Melt Treatment Unit)",
    oemOrigin: "Foseco / Vesuvius Platform",
    summary:
      "Software-controlled melt treatment station predicting hydrogen levels and optimizing rotary degassing cycles. Sensor modules, mass flow controllers, rotors, and software/process optimization.",
    typicalSerialPrefix: "SMARTT-",
    keyFamilies: [
      "Graphite Rotors & Shafts (XSR / FDR / XDR)",
      "Mass Flow Controllers & Proportional Gas Valves",
      "PLC / HMI Touch Panels & Cycle Sensors",
      "Thermocouple Assemblies & Spindle Drive Seals",
    ],
  },
  {
    id: "ThermaTest NGIII 5000",
    code: "SYS-04",
    name: "ThermaTest NGIII 5000",
    fullName: "ThermaTest NGIII 5000 (Thermal Analysis)",
    oemOrigin: "Foseco / Vesuvius Platform",
    summary:
      "Precision aluminum solidification thermal analysis system verifying grain refinement and eutectic modification prior to casting. Sampling cups, holder leads, thermocouples, and calibration.",
    typicalSerialPrefix: "TT5000-",
    keyFamilies: [
      "Sampling Cups & Holder Leads",
      "Type-K Immersion Thermocouple Assemblies",
      "Compensation Cables & Cold-Junction Connectors",
      "Thermal Analysis HMI / Acquisition Hardware",
    ],
  },
];

export const COMPONENT_CATEGORIES = [
  "Graphite Rotors & Shafts",
  "Baffle Plates",
  "Gas Control Valves & Mass Flow Controllers",
  "Thermocouple Assemblies",
  "Drive Seals & Bearings",
  "PLC / HMI Modules",
  "Flux Feeders & Auger Assemblies",
  "Sampling Cups & Holder Leads",
] as const;

export type ComponentCategory = (typeof COMPONENT_CATEGORIES)[number];

export interface CatalogPart {
  id: string;
  sku: string;
  name: string;
  category: ComponentCategory;
  family: string;
  platforms: PlatformId[];
  serialFitNote: string;
  priceField: string;
  leadTime: string;
  description: string;
}

export const SEEDED_PARTS_CATALOG: CatalogPart[] = [
  {
    id: "part-xsr-rotor-shaft",
    sku: "3J-FDU-XSR-220",
    name: "XSR High-Shear Graphite Rotor & Shaft Assembly",
    category: "Graphite Rotors & Shafts",
    family: "Graphite Rotors & Shafts (XSR / FDR / XDR / FDDR)",
    platforms: ["FDU", "SMARTT"],
    serialFitNote: "Matched to spindle flange & crucible immersion depth by FDU/SMARTT serial number.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Oxidation-inhibited high-density graphite rotor and shaft set (XSR profile) engineered for fine inert gas bubble dispersion and extended immersion campaign life.",
  },
  {
    id: "part-fdr-xdr-rotor",
    sku: "3J-DEG-FDR-190",
    name: "FDR / XDR / FDDR Rotary Degassing Graphite Impeller & Shaft",
    category: "Graphite Rotors & Shafts",
    family: "Graphite Rotors & Shafts (XSR / FDR / XDR / FDDR)",
    platforms: ["FDU", "MTS 1500", "SMARTT"],
    serialFitNote: "Thread pitch and gas bore verified against unit serial record prior to shipment.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Precision-machined FDR, XDR, and FDDR pumping rotors and threaded shafts for ladle, crucible, and furnace well degassing stations.",
  },
  {
    id: "part-diamant-baffle",
    sku: "3J-DIA-BFL-410",
    name: "DIAMANT Ceramic Wear Sleeve & Anti-Vortex Baffle Plate",
    category: "Baffle Plates",
    family: "DIAMANT Ceramic Wear Parts",
    platforms: ["FDU", "MTS 1500", "SMARTT"],
    serialFitNote: "Verified against cover plate cutout and mast travel by unit serial number.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "2–4 Business Days",
    description:
      "Silicon-nitride / DIAMANT ceramic-composite baffle plate and shaft protection sleeve that suppresses surface vortexing and dross entrainment during high-RPM treatment.",
  },
  {
    id: "part-graphite-baffle-plate",
    sku: "3J-FDU-BFL-305",
    name: "High-Purity Graphite Crucible Baffle Plate Assembly",
    category: "Baffle Plates",
    family: "DIAMANT Ceramic Wear Parts",
    platforms: ["FDU", "SMARTT"],
    serialFitNote: "Mounting bracket center-to-center spacing verified by unit serial number.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Heavy-duty anti-vortex baffle plate with stainless mounting hardware for stationary and mobile FDU and SMARTT degassing units.",
  },
  {
    id: "part-mfc-gas-valve",
    sku: "3J-GAS-MFC-550",
    name: "Digital Mass Flow Controller & Inert Gas Proportional Valve",
    category: "Gas Control Valves & Mass Flow Controllers",
    family: "Gas Control & Metering Hardware",
    platforms: ["FDU", "MTS 1500", "SMARTT"],
    serialFitNote: "Calibrated for Argon or Nitrogen flow range (L/min) per unit serial build sheet.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "2–3 Business Days",
    description:
      "Closed-loop digital mass flow controller (MFC), solenoid shutoff manifold, and back-pressure check valve assembly for precise inert gas metering.",
  },
  {
    id: "part-gas-rotameter-manifold",
    sku: "3J-GAS-MAN-212",
    name: "Purge / Process Gas Solenoid Manifold & Pressure Regulator Kit",
    category: "Gas Control Valves & Mass Flow Controllers",
    family: "Gas Control & Metering Hardware",
    platforms: ["FDU", "MTS 1500", "SMARTT"],
    serialFitNote: "24VDC coil pinout and pneumatic fittings matched to cabinet serial number.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Complete pneumatic gas train rebuild kit including primary regulator, blockage pressure switch, purge bypass valve, and coalescing filter.",
  },
  {
    id: "part-immersion-tc-assembly",
    sku: "3J-TC-IMM-710",
    name: "Molten Aluminum Immersion Thermocouple & Ceramic Protection Tube",
    category: "Thermocouple Assemblies",
    family: "Thermal-Analysis Cups & Thermocouples",
    platforms: ["FDU", "MTS 1500", "SMARTT", "ThermaTest NGIII 5000"],
    serialFitNote: "Immersion length and connector type matched to unit serial configuration.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "High-accuracy Type-K immersion thermocouple assembly with non-wetting ceramic sheath for continuous bath temperature verification during melt treatment.",
  },
  {
    id: "part-spindle-drive-seal-kit",
    sku: "3J-DRV-SLK-880",
    name: "Rotary Spindle High-Temp Lip Seal & Precision Bearing Rebuild Kit",
    category: "Drive Seals & Bearings",
    family: "Rotary Spindle Mechanical Components",
    platforms: ["FDU", "MTS 1500", "SMARTT"],
    serialFitNote: "Spindle housing bore and rotary union diameter verified by serial number.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Viton high-temperature rotary union seals, sealed angular-contact spindle bearings, and synchronous drive belt kit to eliminate gas leaks and shaft runout.",
  },
  {
    id: "part-mast-lift-bearing",
    sku: "3J-DRV-MST-892",
    name: "Mast Linear Guide Bearings & Hoist Limit Switch Kit",
    category: "Drive Seals & Bearings",
    family: "Rotary Spindle Mechanical Components",
    platforms: ["FDU", "MTS 1500", "SMARTT"],
    serialFitNote: "Matched to mast column series and carriage generation by serial number.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "2–4 Business Days",
    description:
      "Heavy-duty mast carriage roller bearings, wiper seals, and upper/lower travel limit switches for smooth vertical rotor positioning.",
  },
  {
    id: "part-plc-hmi-panel",
    sku: "3J-CTL-HMI-900",
    name: "Operator HMI Touch Panel & PLC Treatment Cycle I/O Module",
    category: "PLC / HMI Modules",
    family: "Controls, PLC & HMI Hardware",
    platforms: ["FDU", "MTS 1500", "SMARTT", "ThermaTest NGIII 5000"],
    serialFitNote: "Firmware revision and PLC communication protocol verified by unit serial.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "3–5 Business Days",
    description:
      "Industrial replacement HMI display, analog input module, and VFD communication interface for automated treatment recipes and cycle logging.",
  },
  {
    id: "part-mts-flux-auger",
    sku: "3J-MTS-AUG-610",
    name: "MTS 1500 Precision Flux Feeder Screw, Dosing Tube & Hopper Seal Kit",
    category: "Flux Feeders & Auger Assemblies",
    family: "Fluxes (COVERAL / SIMODAL / NUCLEANT) & Dosing Hardware",
    platforms: ["MTS 1500", "SMARTT"],
    serialFitNote: "Auger flight pitch and pinch-valve diameter matched to MTS 1500 serial number.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Hardened stainless dosing auger, pressurized hopper gasket set, and injection line wear elbows for consistent granular flux entrainment.",
  },
  {
    id: "part-coveral-simodal-nucleant",
    sku: "3J-FLX-CSN-640",
    name: "COVERAL / SIMODAL / NUCLEANT Granular Melt-Treatment Fluxes",
    category: "Flux Feeders & Auger Assemblies",
    family: "Fluxes (COVERAL / SIMODAL / NUCLEANT) & Dosing Hardware",
    platforms: ["MTS 1500", "FDU", "SMARTT"],
    serialFitNote: "Granule mesh size and alloy compatibility verified for your rotary feeder serial.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Drossing, cleaning, sodium-free modification, and grain-refining granular fluxes engineered for automated rotary injection and vortex dosing without bridging.",
  },
  {
    id: "part-thermatest-cups-leads",
    sku: "3J-TT5-CUP-105",
    name: "ThermaTest NGIII 5000 Thermal Analysis Sand Sampling Cups & Holder Leads",
    category: "Sampling Cups & Holder Leads",
    family: "Thermal-Analysis Cups & Thermocouples",
    platforms: ["ThermaTest NGIII 5000"],
    serialFitNote: "Matched to ThermaTest NGIII 5000 stand receptacle and calibration curve.",
    priceField: "Serial-Verified Quote (+35% Std / +25% Contract)",
    leadTime: "In Stock — Ships in 24–48 hrs",
    description:
      "Precision shell-sand thermal analysis cups (plain and grain-refined calibration grades), quick-change cup stand blocks, and heavy-duty compensating holder leads.",
  },
];

export const CUYAHOGA_COUNTY_CITIES = [
  "Bay Village",
  "Beachwood",
  "Bedford",
  "Bedford Heights",
  "Bentleyville",
  "Berea",
  "Bratenahl",
  "Brecksville",
  "Broadview Heights",
  "Brook Park",
  "Brooklyn",
  "Brooklyn Heights",
  "Chagrin Falls",
  "Cleveland",
  "Cleveland Heights",
  "Cuyahoga Heights",
  "East Cleveland",
  "Euclid",
  "Fairview Park",
  "Garfield Heights",
  "Gates Mills",
  "Glenwillow",
  "Highland Heights",
  "Highland Hills",
  "Hunting Valley",
  "Independence",
  "Lakewood",
  "Linndale",
  "Lyndhurst",
  "Maple Heights",
  "Mayfield",
  "Mayfield Heights",
  "Middleburg Heights",
  "Moreland Hills",
  "Newburgh Heights",
  "North Olmsted",
  "North Randall",
  "North Royalton",
  "Oakwood",
  "Olmsted Falls",
  "Orange",
  "Parma",
  "Parma Heights",
  "Pepper Pike",
  "Richmond Heights",
  "Rocky River",
  "Seven Hills",
  "Shaker Heights",
  "Solon",
  "South Euclid",
  "Strongsville",
  "University Heights",
  "Valley View",
  "Walton Hills",
  "Warrensville Heights",
  "Westlake",
  "Woodmere",
] as const;

export const CUYAHOGA_ZIP_CODES = new Set([
  "44017", // Berea
  "44022", // Chagrin Falls / Bentleyville / Moreland Hills
  "44040", // Gates Mills
  "44070", // North Olmsted
  // All 441xx ZIP codes serve Cleveland & Cuyahoga County suburbs
]);

export const OUT_OF_COUNTY_EXAMPLES = new Set([
  "akron",
  "toledo",
  "columbus",
  "cincinnati",
  "dayton",
  "youngstown",
  "canton",
  "mentor",
  "willoughby",
  "painesville",
  "wickliffe",
  "eastlake",
  "lorain",
  "elyria",
  "avon",
  "avon lake",
  "north ridgeville",
  "medina",
  "brunswick",
  "wadsworth",
  "hudson",
  "twinsburg",
  "stow",
  "kent",
  "aurora",
  "streetsboro",
  "sandusky",
  "mansfield",
  "pittsburgh",
  "detroit",
  "chicago",
  "erie",
]);

export const CUYAHOGA_VALIDATION_ALERT =
  "3JI-Repair (Division 02 Commercial Equipment Service & Loaner Fleet) is currently available exclusively within our Cuyahoga County, Ohio launch area. For nationwide Division 01 Industrial Foundry support, please use the Parts Finder.";

export function validateCuyahogaLocation(locationInput: string): {
  valid: boolean;
  reason?: string;
  matchedLocality?: string;
} {
  const raw = locationInput.trim();
  if (!raw) {
    return {
      valid: false,
      reason: "Please enter your Cuyahoga County business city or ZIP code.",
    };
  }

  const normalized = raw.toLowerCase();

  // Check for explicit 5-digit ZIP code in input
  const zipMatch = normalized.match(/\b(\d{5})\b/);
  if (zipMatch) {
    const zip = zipMatch[1];
    const isCuyahogaZip = zip.startsWith("441") || CUYAHOGA_ZIP_CODES.has(zip);
    if (!isCuyahogaZip) {
      return {
        valid: false,
        reason: CUYAHOGA_VALIDATION_ALERT,
      };
    }
  }

  // Check if any known out-of-county city name appears
  for (const outCity of OUT_OF_COUNTY_EXAMPLES) {
    const regex = new RegExp(`\\b${outCity}\\b`, "i");
    if (regex.test(normalized)) {
      return {
        valid: false,
        reason: CUYAHOGA_VALIDATION_ALERT,
      };
    }
  }

  // Check if a Cuyahoga County municipality is matched
  for (const city of CUYAHOGA_COUNTY_CITIES) {
    const regex = new RegExp(`\\b${city.toLowerCase()}\\b`, "i");
    if (regex.test(normalized)) {
      return {
        valid: true,
        matchedLocality: `${city}, OH (Cuyahoga County)`,
      };
    }
  }

  // If a valid Cuyahoga ZIP was provided without city name
  if (zipMatch) {
    const zip = zipMatch[1];
    if (zip.startsWith("441") || CUYAHOGA_ZIP_CODES.has(zip)) {
      return {
        valid: true,
        matchedLocality: `ZIP ${zip} (Cuyahoga County, OH)`,
      };
    }
  }

  // Otherwise, not recognized as a Cuyahoga County city or ZIP
  return {
    valid: false,
    reason: CUYAHOGA_VALIDATION_ALERT,
  };
}
