import { SitemapItem, DesignToken, TrustedBadge, NAICSCode, LicensingCredential } from "./types";

export const BRAND_INFO = {
  legalEntity: "Big Easy Services Of New Orleans, LLC",
  dba: "Big Easy Services Plumbing",
  established: 2005,
  classifications: ["Hispanic-owned", "Woman-Owned", "Family-Operated"],
  president: "Paula D. Baldwin",
  contact: {
    address: "2451 Belle Chasse Hwy., Terrytown, LA 70056",
    phone: "(504) 301-2052",
    emails: ["paula@big-ez.com", "info@big-ez.com"],
    website: "https://bigeasyservices.flywheelsites.com/"
  },
  identifiers: {
    uei: "EXLNLYSKJRJ4",
    cage: "9V6R3",
    lapac: "310242016",
    duns: "782015114"
  },
  missionStatement: "At Big Easy Services Plumbing, our mission is to provide reliable, high-quality plumbing solutions with integrity, professionalism, and a commitment to customer satisfaction. As a woman-owned, family-driven business with over 20 years of experience, we take pride in serving our community with 24/7 emergency service, expert craftsmanship, and a dedication to safety and innovation in every residential and commercial project we undertake."
};

export const LA_LICENSES: LicensingCredential[] = [
  {
    id: "lmp",
    licenseName: "LA Master Plumber License",
    number: "LMP 5923",
    authority: "State of Louisiana Plumbers Board",
    scope: "Master authorization for commercial, industrial, and complex residential installations."
  },
  {
    id: "lngf",
    licenseName: "Licensed Natural Gas Fitter License",
    number: "LMNGF 10369",
    authority: "State of Louisiana",
    scope: "Certified gas safety line installation, pressure testing, repair, and standby generators."
  },
  {
    id: "lacl",
    licenseName: "LA State Commercial Contractor License",
    number: "#CL.48646",
    authority: "Louisiana State Licensing Board for Contractors (LSLBC)",
    scope: "Commercial plumbing, municipal infrastructure, and industrial mechanical contracts."
  },
  {
    id: "larl",
    licenseName: "LA State Residential Contractor License",
    number: "#RL.883464",
    authority: "Louisiana State Licensing Board for Contractors (LSLBC)",
    scope: "Residential plumbing, new housing tracts, gas piping systems, and complex service lines."
  },
  {
    id: "ncgc",
    licenseName: "NC General Contractor License",
    number: "#L.83218",
    authority: "North Carolina Licensing Board",
    scope: "General contracting and mechanical scopes."
  }
];

export const NAICS_CODES: NAICSCode[] = [
  {
    code: "238220",
    title: "Plumbing, Heating, and Air-Conditioning Contractors",
    relevance: "Primary Code",
    scope: "Residential, commercial, and industrial plumbing, drain cleaning, gas fitting, and HVAC installations."
  },
  {
    code: "237110",
    title: "Water and Sewer Line and Related Structures Construction",
    relevance: "Secondary / Infrastructure",
    scope: "Municipal gas lines, public water mains, sewer repair, and site utility plumbing contracts."
  },
  {
    code: "236220",
    title: "Commercial and Institutional Building Construction",
    relevance: "Secondary / Federal Facility",
    scope: "Facility renovations, military barracks upgrades, office complex plumbings, and toilet/shower retrofitting."
  },
  {
    code: "237000",
    title: "Heavy and Civil Engineering Construction",
    relevance: "Supporting Trade",
    scope: "Heavy industrial water drainage, commercial water retention system setups, and disaster recovery piping."
  },
  {
    code: "237310",
    title: "Highway, Street, and Bridge Construction",
    relevance: "Supporting Trade",
    scope: "Drainage layout on highway projects, storm water systems, and infrastructure tie-ins."
  },
  {
    code: "236210",
    title: "Industrial Building Construction",
    relevance: "Industrial Services",
    scope: "Chemical plants, fabrication facilities, refineries, and high-temp fluid-carrying mechanical setups."
  }
];

export const SITEMAP_DATA: SitemapItem[] = [
  {
    id: "core-home",
    title: "Master Homepage (Split-Intent)",
    url: "/",
    category: "core",
    description: "Dual-targeted landing zone. Delivers a zero-friction mobile quick-dial pipeline for residential emergency plumbing on the left, while immediately routing B2B commercial procurement / government contracting officers on the right with verifiable trust badges.",
    seoKeywords: ["New Orleans Plumber", "Emergency Gas Fitter New Orleans", "Government Plumber Louisiana", "Woman Owned Business Plumbing"],
    priority: 1.0
  },
  {
    id: "b2bc-comm-hub",
    title: "Commercial & Facilities Hub",
    url: "/commercial",
    category: "commercial",
    description: "Centering B2B contract solutions: backflow prevention testing, high-capacity commercial drainage, industrial grease trap repair, facility maintenance plans, and grease-trap inspections for restaurants and food courts.",
    seoKeywords: ["Commercial Plumber New Orleans", "Commercial Backflow Testing New Orleans", "Facility Pipe Maintenance LA", "Industrial Plumbing Louisiana"],
    priority: 0.9
  },
  {
    id: "b2g-gov-portal",
    title: "Government Capabilities & Procurement Portal",
    url: "/government",
    category: "government",
    description: "Designed specifically to speak to DoD, GSA, and State Contracting Officers. Contains immediate access to downloadable Capabilities Statement, verified certifications (OSHA, TWIC, DBIDS), corporate identifiers (UEI, CAGE, LaPAC), and past performance references.",
    seoKeywords: ["SAM Plumber Contractor", "CAGE 9V6R3 Plumbing", "UEI EXLNLYSKJRJ4", "Government Utility Pipe Contractor", "LaPAC Plumber New Orleans"],
    priority: 0.95
  },
  {
    id: "b2c-res-hub",
    title: "Residential Services Hub",
    url: "/residential",
    category: "residential",
    description: "Comprehensive home plumber hub centering rapid-click emergencies (leak detection, clogged drains, toilet overflows, backup sewer lines). Explicitly integrates Standby Gas Generators and Gas Line installations.",
    seoKeywords: ["Emergency Plumber Terrytown", "Gas Line Repair New Orleans", "Standby Generator Connection LA", "Water Heater Repair New Orleans"],
    priority: 0.85
  },
  {
    id: "b2c-leak-detect",
    title: "Water & Gas Line Services",
    url: "/residential/gas-water-lines",
    category: "residential",
    description: "Specialized focus on high-ticket residential gas fitting, trenchless line replacements, slab leak detection, and natural gas emergency shutoff configurations.",
    seoKeywords: ["Slab Leak Detection New Orleans", "Gas Fitter License Louisiana", "Sewer Line Replacement Terrytown", "Licensed Gas Piping"],
    priority: 0.8
  },
  {
    id: "b2c-generators",
    title: "Standby Generator Gas Connections",
    url: "/residential/standby-generators",
    category: "residential",
    description: "Leveraging Louisiana Master Natural Gas Fitter license LMNGF 10369. Explains safety protocols, fuel regulations, and professional mechanical alignment to secure Generac, Kohler, and Cummins residential emergency power generators.",
    seoKeywords: ["Generator Gas Pipe Plumber", "Standby Generator Plumber Louisiana", "Gas line for generator New Orleans", "LMNGF 10369 Services"],
    priority: 0.8
  },
  {
    id: "core-past-performance",
    title: "Past Performance & Case Studies",
    url: "/portfolio",
    category: "core",
    description: "Verifiable portfolio showing high-value projects, municipal sub-contracts, and residential multi-family housing developments. Bolsters trust with active field photography and quotes from project managers.",
    seoKeywords: ["Louisiana Plumbing Past Performance", "Plumbing Case Studies New Orleans", "Sewer Main Subcontractor LA"],
    priority: 0.75
  }
];

export const DESIGN_TOKENS: DesignToken[] = [
  {
    name: "Deep Franklin Navy",
    usage: "Dominant corporate branding, structural backing, utility frames, and prominent header backgrounds. Inspired by national premium standards.",
    value: "#0B2240 (Royal Deep Blue)",
    tailwindClass: "bg-blue-950 / text-blue-950"
  },
  {
    name: "Cobalt Trust Blue",
    usage: "Body container bounds, content subtitles, primary checkmarks, and informative state text.",
    value: "#0D5CDE (Punctual Blue)",
    tailwindClass: "bg-blue-600 / text-blue-600"
  },
  {
    name: "Golden-Yellow Slogan Glow",
    usage: "Critical action highlights, live call buttons, punctuality flags, and guarantee bullet markers. Drives rapid conversion on high-stress pages.",
    value: "#FACC15 (Vibrant Gold Yellow)",
    tailwindClass: "bg-yellow-400 / text-yellow-500"
  },
  {
    name: "Pure Alpine Base",
    usage: "High contrast canvas base for text readability, interactive wireframe backdrops, cards, and bid proposals.",
    value: "#FFFFFF (Pure White) & #F8FAFC (Cool Soft Slate)",
    tailwindClass: "bg-white / bg-slate-50"
  }
];

export interface CoreGuarantee {
  id: string;
  title: string;
  slogan: string;
  description: string;
  badgeText: string;
  iconName: string;
}

export const IRONCLAD_GUARANTEES: CoreGuarantee[] = [
  {
    id: "guarantee-punctual",
    title: "The Punctual Pipeline Guarantee",
    slogan: "\"If there's any delay, it's you we pay!\" equivalent",
    description: "Time is money—especially during a sewer backup or commercial shutdown. If our licensed dispatch crew is even a minute late for your scheduled service window, we credit $50 off your repair bill instantly. No arguments.",
    badgeText: "$50 Late Credit",
    iconName: "Clock"
  },
  {
    id: "guarantee-pricing",
    title: "Straightforward Honest Pricing",
    slogan: "Upfront pricing quotes before work ever begins",
    description: "No hidden charges, emergency premiums, or mystery surcharge lines. You review of a fixed, itemized mechanical quote before we spin a single wrench. You pay exactly what was authorized—period.",
    badgeText: "100% Transparent",
    iconName: "Banknote"
  },
  {
    id: "guarantee-craft",
    title: "B2B & B2C Double-Protection Guarantee",
    slogan: "LA Master Plumber LMP 5923 Level Craft",
    description: "We back every residential gas line, backflow repair, and standby generator link with a full 2-year warranty on workmanship. If any pipe leak, joint fit, or valve connection fails under code, we fix it entirely free of charge.",
    badgeText: "2-Year Workmanship Warranty",
    iconName: "Award"
  },
  {
    id: "guarantee-supercrew",
    title: "Elite Uniformed Crew Standard",
    slogan: "Background-checked, drug-screened, and OSHA trained",
    description: "Plumbers entering your home or military base represent the pinnacle of professional safety. Uniformed, badged, TWIC-approved, and thoroughly screened. We leave your facilities cleaner than we found them.",
    badgeText: "Background-Checked Elite",
    iconName: "UserCheck"
  }
];

export interface ServiceAreaZip {
  zip: string;
  neighborhood: string;
  status: 'active-dispatch' | 'standard-route';
  deliveryTime: string;
}

export const NEW_ORLEANS_ZIPS: ServiceAreaZip[] = [
  { zip: "70056", neighborhood: "Terrytown / Westbank Hub", status: "active-dispatch", deliveryTime: "Within 25 mins" },
  { zip: "70053", neighborhood: "Gretna Area", status: "active-dispatch", deliveryTime: "Within 30 mins" },
  { zip: "70112", neighborhood: "Downtown / French Quarter", status: "active-dispatch", deliveryTime: "Within 35 mins" },
  { zip: "70115", neighborhood: "Uptown / New Orleans", status: "active-dispatch", deliveryTime: "Within 35 mins" },
  { zip: "70001", neighborhood: "Metairie Eastbank", status: "active-dispatch", deliveryTime: "Within 40 mins" },
  { zip: "70065", neighborhood: "Kenner Business District", status: "standard-route", deliveryTime: "Regular Route Scheduling" },
  { zip: "70458", neighborhood: "Slidell / Northshore Gate", status: "standard-route", deliveryTime: "Scheduled Service Block" },
  { zip: "70037", neighborhood: "Belle Chasse / NAS Base", status: "active-dispatch", deliveryTime: "Within 20 mins" }
];

export const TRUST_BADGES: TrustedBadge[] = [
  {
    id: "badge-twic",
    label: "TWIC® Certified",
    description: "Transportation Worker Identification Credentials. Access-approved for secure ports (Port of New Orleans, St. Bernard Port) and federal maritime installations.",
    iconName: "ShieldAlert",
    category: "credentials"
  },
  {
    id: "badge-dbids",
    label: "DBIDS Accessible",
    description: "Defense Biometric Identification System. Authorized for rapid clearance onto NAS Joint Reserve Base New Orleans and military installations.",
    iconName: "Building2",
    category: "credentials"
  },
  {
    id: "badge-osha",
    label: "OSHA-Compliant safety standard",
    description: "All crew members hold OSHA-10 & OSHA-30 safety training certificates. 100% compliant safety history on public bids.",
    iconName: "HardHat",
    category: "safety"
  },
  {
    id: "badge-backflow",
    label: "Backflow Certified Specialists",
    description: "Certified water supply safety compliance. Authorized state backflow testing, certified installation, and annual commercial recertifications.",
    iconName: "Droplet",
    category: "credentials"
  },
  {
    id: "badge-phcc",
    label: "PHCC Member Association",
    description: "Active members of the Plumbing-Heating-Cooling Contractors Association, adhering to the highest code of ethics, safety, and training.",
    iconName: "Users",
    category: "affiliations"
  },
  {
    id: "badge-wipp",
    label: "Women in Plumbing & Piping",
    description: "Champions of diversity in the plumbing industry. Under Paula D. Baldwin's executive leadership, active supporters and members of the national WiPP association.",
    iconName: "Award",
    category: "affiliations"
  }
];
