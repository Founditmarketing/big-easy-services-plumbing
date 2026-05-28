import {
  Droplets,
  Drill,
  HardHat,
} from 'lucide-react';
import type { ComponentType } from 'react';

export interface ServiceDetail {
  slug: string;
  title: string;
  tagline: string;
  shortDescription: string;
  longDescription: string;
  icon: ComponentType<{ style?: React.CSSProperties }>;
  color: string;
  heroGradient: string;
  features: { title: string; description: string }[];
  whyChooseUs: string[];
  relatedLicenseIds: string[];
  faqs: { question: string; answer: string }[];
  ctaText: string;
  image: string;
}

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    slug: 'plumbing',
    title: 'Plumbing',
    tagline: 'Licensed Master Plumber — Residential & Commercial',
    shortDescription: 'Complete plumbing solutions including leak repair, pipe replacement, water heater installation, sewer lines, backflow testing, and 24/7 emergency service.',
    longDescription: 'Big Easy Services Plumbing provides comprehensive residential and commercial plumbing services across Greater New Orleans. With over 20 years of experience and a Louisiana Master Plumber license (LMP #5923), we handle everything from minor faucet repairs and water heater installations to full re-piping, sewer line replacement, backflow prevention testing, and 24/7 emergency response. Our licensed, background-checked technicians deliver upfront pricing, code-compliant workmanship, and our $50 Punctual Pipeline Guarantee on every job.',
    icon: Droplets,
    color: '#3B82F6',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #1E3A5F 50%, #1A4B8C 100%)',
    features: [
      { title: 'Leak Detection & Repair', description: 'Advanced electronic equipment to locate hidden leaks in walls, slabs, and underground lines without unnecessary demolition.' },
      { title: 'Water Heater Services', description: 'Installation, repair, and replacement of tank and tankless water heaters from all major brands including Rheem, A.O. Smith, and Rinnai.' },
      { title: 'Pipe Replacement & Repiping', description: 'Complete whole-home and commercial repiping with modern PEX or copper, replacing aging galvanized, polybutylene, or cast-iron lines.' },
      { title: 'Sewer & Drain Services', description: 'Camera inspections, hydro jetting, trenchless repair, and full sewer line replacements to restore proper drainage.' },
      { title: 'Backflow Prevention & Testing', description: 'Certified annual backflow device testing, installation, and repair to maintain water supply safety compliance for commercial properties.' },
      { title: '24/7 Emergency Response', description: 'Burst pipes, sewer backups, gas leaks, and water heater failures — average dispatch under 30 minutes in our active coverage zones.' },
    ],
    whyChooseUs: [
      'Louisiana Master Plumber License (LMP #5923)',
      'Licensed Natural Gas Fitter (LMNGF #10369)',
      '$50 on-time guarantee on every service call',
      'Upfront, transparent pricing before work begins',
      'Background-checked, uniformed technicians',
      '2-year workmanship warranty on all repairs',
    ],
    relatedLicenseIds: ['lmp', 'lngf', 'larl', 'lacl'],
    faqs: [
      { question: 'How quickly can you respond to a plumbing emergency?', answer: 'In our active dispatch zones (Terrytown, Gretna, Belle Chasse, Downtown), we average under 30 minutes. For the broader GNO metro, we offer same-day emergency scheduling.' },
      { question: 'Do you handle both residential and commercial plumbing?', answer: 'Yes. We hold both Master Plumber License LMP #5923 and Commercial Contractor License #CL.48646, fully licensed for residential and commercial plumbing throughout Greater New Orleans.' },
      { question: 'Are your plumbers licensed and insured?', answer: 'Absolutely. Every technician works under our Louisiana Master Plumber License (LMP #5923) and we carry full commercial liability and workers\' compensation insurance.' },
      { question: 'Do you provide free estimates?', answer: 'We provide upfront, fixed-price quotes before any work begins. There is a standard dispatch/diagnostic fee that is applied to the cost of repair if you proceed with the work.' },
    ],
    ctaText: 'Schedule Plumbing Service',
    image: '/images/DSC03648 (1).jpg',
  },
  {
    slug: 'directional-boring',
    title: 'Directional Boring',
    tagline: 'Trenchless Solutions That Preserve Your Property',
    shortDescription: 'Horizontal directional drilling (HDD) for underground utility installation without trenching. Minimal surface disruption for pipes, conduits, and cables.',
    longDescription: 'Big Easy Services Plumbing brings precision horizontal directional drilling (HDD) to Greater New Orleans — the modern, trenchless method for installing underground utilities without tearing up driveways, landscapes, and roadways. Our directional boring services are ideal for routing water lines, sewer mains, gas piping, electrical conduits, and fiber optic cables beneath obstacles that traditional open-cut trenching cannot navigate. With Louisiana State Contractor Licenses and over 20 years of underground infrastructure experience, we deliver efficient, minimally invasive installations that protect your property and keep projects on schedule.',
    icon: Drill,
    color: '#F59E0B',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #2D1B00 50%, #4A2D00 100%)',
    features: [
      { title: 'Horizontal Directional Drilling', description: 'Precision HDD for installing underground utilities beneath roads, driveways, sidewalks, waterways, and landscaping without surface disruption.' },
      { title: 'Water & Sewer Line Installation', description: 'Trenchless installation of new water mains, service lines, and sewer connections using directional boring to avoid excavation damage.' },
      { title: 'Gas Line Boring', description: 'Licensed Natural Gas Fitter (LMNGF #10369) credentials for directional boring of natural gas piping with full pressure testing and code compliance.' },
      { title: 'Conduit & Cable Installation', description: 'Underground routing of electrical conduit, fiber optic cable, and telecommunications lines for residential, commercial, and municipal projects.' },
      { title: 'Road & Driveway Crossings', description: 'Bore underneath roads, highways, railroad tracks, and driveways without cutting pavement or disrupting traffic flow.' },
      { title: 'Site Restoration', description: 'Minimal surface disruption means little to no restoration needed — saving time, money, and preserving established landscapes.' },
    ],
    whyChooseUs: [
      'Louisiana State Contractor Licenses (CL.48646 & RL.883464)',
      'Licensed Master Plumber & Natural Gas Fitter for full-scope boring',
      'Precision GPS guidance for accurate bore paths',
      'Minimal surface disruption — no trenching required',
      'Experience with municipal, commercial, and residential boring',
      'Coordination with utility locates and One Call services',
    ],
    relatedLicenseIds: ['lmp', 'lngf', 'lacl', 'larl'],
    faqs: [
      { question: 'What is directional boring?', answer: 'Directional boring (also called horizontal directional drilling or HDD) is a trenchless method of installing underground pipes, conduits, and cables by drilling a guided bore path beneath the surface — without digging open trenches.' },
      { question: 'What utilities can be installed with directional boring?', answer: 'We bore for water lines, sewer mains, gas piping, electrical conduit, fiber optic cable, and telecommunications lines. If it runs underground, directional boring can likely install it.' },
      { question: 'Will directional boring damage my yard or driveway?', answer: 'That is the primary advantage of HDD — it requires only small entry and exit pits, leaving driveways, landscaping, and roadways virtually undisturbed compared to traditional trenching.' },
      { question: 'How deep can you bore?', answer: 'Our equipment handles bore depths suitable for most residential and commercial utility installations. Depth is planned based on utility requirements, soil conditions, and existing underground infrastructure.' },
    ],
    ctaText: 'Request Boring Estimate',
    image: '/images/DSC03726.jpg',
  },
  {
    slug: 'utility-work',
    title: 'Utility Work',
    tagline: 'Underground Infrastructure — Built to Last',
    shortDescription: 'Complete underground utility installation, repair, and relocation for water, sewer, gas, and stormwater systems across Greater New Orleans.',
    longDescription: 'Big Easy Services Plumbing delivers comprehensive underground utility services for residential developments, commercial properties, municipal infrastructure, and government facilities across Greater New Orleans. From new water main installations and sewer line extensions to gas piping, stormwater drainage, and utility relocations, our licensed crews bring Master Plumber and Natural Gas Fitter credentials to every underground project. With DBIDS clearance for military base access and SAM.gov registration (CAGE 9V6R3) for government contracts, we serve both private and public sector clients with code-compliant, inspected work.',
    icon: HardHat,
    color: '#059669',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #0A2E1B 50%, #0D4028 100%)',
    features: [
      { title: 'Water Main Installation', description: 'New water main connections, service line installations, and water system upgrades for residential subdivisions, commercial sites, and municipal projects.' },
      { title: 'Sewer Line Construction', description: 'New sewer main installation, lateral connections, lift station piping, and gravity sewer systems built to Louisiana DEQ and parish specifications.' },
      { title: 'Gas Line Infrastructure', description: 'Licensed Natural Gas Fitter (LMNGF #10369) services for underground gas main extensions, service connections, and commercial gas piping systems.' },
      { title: 'Stormwater & Drainage', description: 'Storm drain installation, catch basins, culverts, and drainage systems designed for the Greater New Orleans high water table and heavy rainfall conditions.' },
      { title: 'Utility Relocation', description: 'Coordination and execution of utility relocations for road widening, new construction, and infrastructure improvement projects.' },
      { title: 'Site Development', description: 'Complete underground utility rough-in for new construction including subdivisions, commercial developments, and industrial facilities.' },
    ],
    whyChooseUs: [
      'Commercial Contractor License #CL.48646',
      'NAICS 238220 (Plumbing) & 237110 (Water/Sewer)',
      'DBIDS & TWIC cleared for military and port facilities',
      'SAM.gov registered — CAGE 9V6R3, UEI EXLNLYSKJRJ4',
      'Woman-owned small business certification',
      'Full permit management and inspection coordination',
    ],
    relatedLicenseIds: ['lmp', 'lngf', 'lacl', 'larl'],
    faqs: [
      { question: 'What types of utility work do you perform?', answer: 'We handle water mains, sewer lines, gas piping, stormwater drainage, and utility relocations for residential, commercial, municipal, and government projects throughout Greater New Orleans.' },
      { question: 'Are you licensed for government and military utility work?', answer: 'Yes. We hold DBIDS clearance for NAS JRB access, TWIC certification for port facilities, and are registered in SAM.gov (CAGE 9V6R3) for federal, state, and municipal procurement.' },
      { question: 'Do you handle permits and inspections?', answer: 'Absolutely. We manage the complete permitting process and coordinate all required inspections with Jefferson Parish, Orleans Parish, and state authorities for every utility project.' },
      { question: 'Can you work on existing utility systems?', answer: 'Yes. In addition to new installations, we perform utility repairs, replacements, upgrades, and relocations on existing water, sewer, gas, and drainage infrastructure.' },
    ],
    ctaText: 'Request Utility Quote',
    image: '/images/Copy of DSC03873.jpg',
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
