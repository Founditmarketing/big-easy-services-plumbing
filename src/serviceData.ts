import {
  Droplets,
  Building2,
  Flame,
  Zap,
  Clock,
  Wrench,
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
    slug: 'residential-plumbing',
    title: 'Residential Plumbing',
    tagline: 'Your Home Deserves Expert Care',
    shortDescription: 'Complete home plumbing solutions including leak repair, pipe replacement, water heater installation, and fixture upgrades.',
    longDescription: 'From minor drips to major overhauls, Big Easy Services Plumbing provides comprehensive residential plumbing services throughout Greater New Orleans. With over 20 years of experience and a Louisiana Master Plumber license (LMP #5923), we handle every home plumbing challenge with precision, professionalism, and our signature punctuality guarantee.',
    icon: Droplets,
    color: '#3B82F6',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #1E3A5F 50%, #1A4B8C 100%)',
    features: [
      { title: 'Leak Detection & Repair', description: 'Advanced equipment to locate hidden leaks in walls, slabs, and underground lines without unnecessary demolition.' },
      { title: 'Water Heater Services', description: 'Installation, repair, and replacement of tank and tankless water heaters from all major brands.' },
      { title: 'Pipe Replacement & Repiping', description: 'Complete whole-home repiping with modern PEX or copper, replacing aging galvanized or polybutylene lines.' },
      { title: 'Fixture Installation', description: 'Professional installation of faucets, toilets, showers, bathtubs, garbage disposals, and dishwashers.' },
      { title: 'Sewer Line Services', description: 'Camera inspections, trenchless repair, and full sewer line replacements to restore proper drainage.' },
      { title: 'Water Filtration', description: 'Whole-home and point-of-use water filtration systems to ensure clean, safe drinking water.' },
    ],
    whyChooseUs: [
      'Louisiana Master Plumber License (LMP #5923)',
      '$50 on-time guarantee on every service call',
      'Upfront, transparent pricing before work begins',
      'Background-checked, uniformed technicians',
      '2-year workmanship warranty on all repairs',
      '24/7 emergency availability',
    ],
    relatedLicenseIds: ['lmp', 'larl'],
    faqs: [
      { question: 'How quickly can you respond to a residential emergency?', answer: 'In our active dispatch zones (Terrytown, Gretna, Belle Chasse, Downtown), we average under 30 minutes. For the broader GNO metro, we offer same-day emergency scheduling.' },
      { question: 'Do you provide free estimates?', answer: 'We provide upfront, fixed-price quotes before any work begins. There is a standard dispatch/diagnostic fee that is applied to the cost of repair if you proceed with the work.' },
      { question: 'Are your plumbers licensed and insured?', answer: 'Absolutely. Every technician works under our Louisiana Master Plumber License (LMP #5923) and we carry full commercial liability and workers\' compensation insurance.' },
    ],
    ctaText: 'Schedule Residential Service',
    image: '/images/DSC03648 (1).jpg',
  },
  {
    slug: 'commercial-services',
    title: 'Commercial Services',
    tagline: 'Industrial-Grade Reliability for Your Business',
    shortDescription: 'Full-scale commercial plumbing for restaurants, offices, and facilities. Backflow testing, grease trap service, and maintenance plans.',
    longDescription: 'Big Easy Services Plumbing delivers dependable, code-compliant commercial plumbing solutions for businesses, property managers, and facility operators across the Greater New Orleans metro. Licensed under LA State Commercial Contractor License #CL.48646, we\'re equipped to handle high-capacity systems, regulatory compliance, and scheduled preventative maintenance programs.',
    icon: Building2,
    color: '#0D5CDE',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #0D3B6F 50%, #104E8B 100%)',
    features: [
      { title: 'Backflow Prevention & Testing', description: 'Certified annual backflow device testing, installation, and repair to maintain water supply safety compliance.' },
      { title: 'Grease Trap Services', description: 'Installation, cleaning, and maintenance of grease interceptors for restaurants, cafeterias, and food service operations.' },
      { title: 'Preventative Maintenance Plans', description: 'Customized scheduled maintenance programs to prevent costly emergency shutdowns and extend system lifespan.' },
      { title: 'Tenant Improvement Plumbing', description: 'Build-out and renovation plumbing for new tenant spaces, restroom additions, and break room installations.' },
      { title: 'High-Capacity Drain Systems', description: 'Industrial drainage, floor drains, and stormwater systems designed for heavy commercial loads.' },
      { title: 'ADA Compliance Upgrades', description: 'Restroom and facility plumbing modifications to meet ADA accessibility requirements and building codes.' },
    ],
    whyChooseUs: [
      'Commercial Contractor License #CL.48646',
      'OSHA-compliant safety programs with zero-incident record',
      'TWIC® certified crews for port and secure facility access',
      'Flexible scheduling to minimize business disruptions',
      'Detailed documentation for property management records',
      'Experience with multi-story and large-footprint facilities',
    ],
    relatedLicenseIds: ['lmp', 'lacl'],
    faqs: [
      { question: 'Can you work around our business hours?', answer: 'Yes. We offer after-hours, weekend, and overnight scheduling for commercial clients to minimize disruptions to your operations.' },
      { question: 'Do you handle government and military facility work?', answer: 'Yes. Our crews hold TWIC® credentials and DBIDS clearance for access to the Port of New Orleans and NAS Joint Reserve Base.' },
      { question: 'What areas do you service commercially?', answer: 'We service the entire Greater New Orleans metropolitan area including Jefferson Parish, Orleans Parish, St. Bernard Parish, and surrounding municipalities.' },
    ],
    ctaText: 'Request Commercial Quote',
    image: '/images/DSC03726.jpg',
  },
  {
    slug: 'gas-line-fitting',
    title: 'Gas Line & Fitting',
    tagline: 'Licensed Natural Gas Experts You Can Trust',
    shortDescription: 'Licensed Natural Gas Fitter (LMNGF #10369). Gas line installation, leak detection, pressure testing, and safety shutoffs.',
    longDescription: 'Gas work demands the highest level of expertise and certification. Big Easy Services Plumbing holds the Louisiana Licensed Master Natural Gas Fitter credential (LMNGF #10369), authorizing us for residential and commercial gas line installations, repairs, pressure testing, and emergency shutoff services. Safety is never optional — it\'s our foundation.',
    icon: Flame,
    color: '#F59E0B',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #2D1B00 50%, #4A2D00 100%)',
    features: [
      { title: 'Gas Line Installation', description: 'New gas line runs for stoves, dryers, fireplaces, outdoor grills, pool heaters, and whole-home systems.' },
      { title: 'Gas Leak Detection', description: 'Electronic gas detection equipment to identify and locate leaks quickly for immediate safety remediation.' },
      { title: 'Pressure Testing', description: 'Comprehensive pressure testing of gas systems to verify integrity before service activation or after repairs.' },
      { title: 'Gas Appliance Hookups', description: 'Safe, code-compliant connections for all gas-burning appliances including ranges, water heaters, and furnaces.' },
      { title: 'Emergency Gas Shutoff', description: '24/7 emergency response for gas odor reports, damaged lines, and safety shutoff coordination with utility companies.' },
      { title: 'Gas Meter & Regulator Service', description: 'Coordination with Entergy and Atmos for meter relocations, regulator upgrades, and service line modifications.' },
    ],
    whyChooseUs: [
      'Licensed Master Natural Gas Fitter (LMNGF #10369)',
      'Specialized gas leak detection equipment',
      'Coordination with local gas utility providers',
      '24/7 emergency response for gas safety',
      'Strict adherence to NFPA and local gas codes',
      'All work documented for insurance and inspection purposes',
    ],
    relatedLicenseIds: ['lmp', 'lngf'],
    faqs: [
      { question: 'What should I do if I smell gas?', answer: 'Leave the building immediately. Do not operate any switches or electronics. Call 911 and then call us at (504) 301-2052 for emergency gas line service.' },
      { question: 'Can you run a new gas line for my outdoor kitchen?', answer: 'Absolutely. We install gas lines for outdoor grills, cooktops, fire pits, and patio heaters. All lines include pressure testing and code-compliant fittings.' },
      { question: 'Do you work with Entergy/Atmos Energy?', answer: 'Yes. We coordinate directly with local gas utilities for meter installations, service activations, and line locates before any excavation.' },
    ],
    ctaText: 'Schedule Gas Service',
    image: '/images/Copy of DSC03764.jpg',
  },
  {
    slug: 'standby-generators',
    title: 'Standby Generators',
    tagline: 'Keep Your Power On When Storms Hit',
    shortDescription: 'Professional gas connections for Generac, Kohler, and Cummins standby generators. Keep your home powered during storms.',
    longDescription: 'In Louisiana, storm season isn\'t a question of if, but when. Big Easy Services Plumbing provides the critical gas line connection that powers your standby generator — the last link between your home and uninterrupted power. Licensed as both a Master Plumber and Natural Gas Fitter, we handle the fuel supply side of generator installations with absolute precision and code compliance.',
    icon: Zap,
    color: '#059669',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #0A2E1B 50%, #0D4028 100%)',
    features: [
      { title: 'Generator Gas Connections', description: 'Professional fuel line installation from your gas meter to your Generac, Kohler, Cummins, or Briggs & Stratton standby generator.' },
      { title: 'Load Sizing Consultation', description: 'Help determining the right generator capacity for your home based on your critical circuits and fuel supply.' },
      { title: 'Natural Gas & LP Setups', description: 'Gas connections for both natural gas and liquid propane (LP) generator systems with proper regulators and shutoffs.' },
      { title: 'Permit & Inspection Coordination', description: 'We handle all permits, inspections, and documentation required by Jefferson Parish, Orleans Parish, and state authorities.' },
      { title: 'Post-Storm Safety Checks', description: 'After major weather events, we inspect generator gas connections, regulators, and lines for damage or safety concerns.' },
      { title: 'Maintenance Programs', description: 'Annual generator gas system maintenance including leak checks, regulator testing, and connection integrity verification.' },
    ],
    whyChooseUs: [
      'Licensed Master Natural Gas Fitter (LMNGF #10369)',
      'Experience with all major generator brands',
      'Full permit and inspection management',
      'Coordination with generator installers and electricians',
      'Hurricane season priority scheduling',
      'Post-storm emergency response capability',
    ],
    relatedLicenseIds: ['lmp', 'lngf', 'larl'],
    faqs: [
      { question: 'Do you install the generator itself?', answer: 'We specialize in the gas fuel line connection — the critical plumbing and gas fitting side. We coordinate with your electrician and generator installer to ensure a seamless installation.' },
      { question: 'How long does a generator gas connection take?', answer: 'Most residential generator gas connections are completed in a single day, depending on the distance from your gas meter to the generator pad location.' },
      { question: 'Should I get natural gas or propane for my generator?', answer: 'If you have an existing natural gas service to your home, natural gas is typically more convenient and cost-effective. We can help evaluate your options during a consultation.' },
    ],
    ctaText: 'Get Generator Quote',
    image: '/images/Copy of DSC03769.jpg',
  },
  {
    slug: 'emergency-service',
    title: '24/7 Emergency Service',
    tagline: 'When Minutes Matter, We\'re Already on the Way',
    shortDescription: 'Burst pipes, sewer backups, gas leaks — we respond fast. Average dispatch under 30 minutes in our active coverage zones.',
    longDescription: 'Plumbing emergencies don\'t wait for business hours — and neither do we. Big Easy Services Plumbing maintains a 24/7 emergency dispatch team ready to respond to burst pipes, sewer backups, gas leaks, and water heater failures across the Greater New Orleans metro. With an average response time under 30 minutes in our active zones, we minimize damage and restore safety fast.',
    icon: Clock,
    color: '#DC2626',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #3B0D0D 50%, #5C1A1A 100%)',
    features: [
      { title: 'Burst Pipe Response', description: 'Rapid water shutoff and emergency pipe repair to stop flooding and prevent structural water damage to your property.' },
      { title: 'Sewer Backup Resolution', description: 'Emergency sewer line clearing and backup remediation to restore sanitary drainage and prevent health hazards.' },
      { title: 'Gas Leak Emergency', description: 'Immediate gas leak detection, line isolation, and repair by our LMNGF #10369 licensed gas fitting team.' },
      { title: 'Water Heater Failures', description: 'Emergency water heater diagnosis, repair, or same-day replacement when your hot water system fails.' },
      { title: 'Flood Damage Mitigation', description: 'Emergency water extraction assistance and plumbing repairs to minimize flood and water damage to your home.' },
      { title: 'Toilet & Drain Emergencies', description: 'Overflowing toilets, clogged main lines, and backed-up floor drains cleared quickly with professional equipment.' },
    ],
    whyChooseUs: [
      '$50 on-time guarantee — if we\'re late, we pay you',
      'Average dispatch under 30 minutes in active zones',
      '24/7/365 availability including holidays',
      'Upfront pricing even on emergency calls',
      'Fully stocked service vehicles for first-trip repairs',
      'Direct phone line — no call centers or voicemail trees',
    ],
    relatedLicenseIds: ['lmp', 'lngf'],
    faqs: [
      { question: 'How fast can you get to my home?', answer: 'In our active dispatch zones (Terrytown, Gretna, Downtown, Belle Chasse), we average under 30 minutes. For the broader metro, we dispatch as quickly as possible with real-time ETAs.' },
      { question: 'Is there an extra charge for after-hours emergencies?', answer: 'We provide upfront pricing on every call, including emergencies. You\'ll know the exact cost before we begin any work. No hidden surcharges.' },
      { question: 'What should I do while waiting for the plumber?', answer: 'For water emergencies: locate and turn off your main water shutoff valve. For gas: leave the building immediately and call from outside. We can guide you over the phone.' },
    ],
    ctaText: 'Call Emergency Line Now',
    image: '/images/DSC03595 (1).jpg',
  },
  {
    slug: 'drain-cleaning',
    title: 'Drain Cleaning',
    tagline: 'Clear Drains, Clear Peace of Mind',
    shortDescription: 'High-pressure hydro jetting, sewer camera inspections, trenchless line repair, and slab leak detection for any property.',
    longDescription: 'Slow drains, recurring clogs, and sewer odors are signs of deeper issues that need professional attention. Big Easy Services Plumbing uses advanced drain cleaning technology — including high-pressure hydro jetting, sewer camera inspections, and trenchless repair methods — to diagnose and resolve drainage problems without unnecessary excavation or disruption to your property.',
    icon: Wrench,
    color: '#7C3AED',
    heroGradient: 'linear-gradient(135deg, #0B2240 0%, #1A0D3B 50%, #2D1B5C 100%)',
    features: [
      { title: 'Hydro Jetting', description: 'High-pressure water jetting to blast away grease, scale, roots, and debris from drain and sewer lines — the most thorough cleaning available.' },
      { title: 'Sewer Camera Inspection', description: 'HD video camera inspection of your drain and sewer lines to identify blockages, cracks, bellies, and root intrusions with precision.' },
      { title: 'Trenchless Line Repair', description: 'Minimally invasive pipe repair and relining technology that fixes broken sewer lines without digging up your yard or driveway.' },
      { title: 'Slab Leak Detection', description: 'Electronic and acoustic leak detection to pinpoint leaks beneath concrete slabs without destructive exploratory demolition.' },
      { title: 'Preventative Drain Maintenance', description: 'Scheduled drain cleaning programs for homes and businesses to prevent costly emergency blockages and backups.' },
      { title: 'Root Removal', description: 'Mechanical root cutting and chemical root treatment to clear tree root intrusions from sewer lines and prevent regrowth.' },
    ],
    whyChooseUs: [
      'Advanced hydro jetting equipment for thorough cleaning',
      'HD sewer camera inspections with recorded footage',
      'Trenchless repair options to protect your landscaping',
      'Flat-rate pricing on standard drain services',
      'Same-day service available in most zones',
      'Commercial and residential drain expertise',
    ],
    relatedLicenseIds: ['lmp', 'lacl', 'larl'],
    faqs: [
      { question: 'How do I know if I need hydro jetting vs. regular snaking?', answer: 'Snaking clears individual clogs, while hydro jetting scours the entire pipe wall clean. We typically recommend hydro jetting for recurring clogs, grease buildup, or older pipes. A camera inspection helps us determine the right approach.' },
      { question: 'Can you show me what\'s inside my pipes?', answer: 'Yes! Our sewer camera inspections produce HD video of the inside of your drain and sewer lines. We review the footage with you on-site and provide a copy for your records.' },
      { question: 'What is trenchless repair and is it available for my home?', answer: 'Trenchless repair uses pipe lining or pipe bursting technology to fix sewer lines without digging trenches. It\'s available for most residential and commercial properties. We\'ll evaluate your specific situation during a camera inspection.' },
    ],
    ctaText: 'Schedule Drain Service',
    image: '/images/DSC03638 (1) (1).jpg',
  },
];

export function getServiceBySlug(slug: string): ServiceDetail | undefined {
  return SERVICE_DETAILS.find((s) => s.slug === slug);
}
