/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BRAND_INFO, LA_LICENSES } from '../data';

const DOMAIN = 'https://bigeasyservicesplumbing.com';

/* ============================================
   LOCAL BUSINESS SCHEMA
   ============================================ */
export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${DOMAIN}/#business`,
    name: BRAND_INFO.dba,
    legalName: BRAND_INFO.legalEntity,
    description:
      'Licensed Master Plumber & Natural Gas Fitter serving Greater New Orleans since 2005. 24/7 emergency plumbing, gas line fitting, drain cleaning, standby generator connections, and commercial services. Woman-owned & family-operated.',
    url: DOMAIN,
    telephone: '+15043012052',
    email: 'info@big-ez.com',
    foundingDate: '2005',
    founder: {
      '@type': 'Person',
      name: BRAND_INFO.president,
      jobTitle: 'President',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2451 Belle Chasse Hwy.',
      addressLocality: 'Terrytown',
      addressRegion: 'LA',
      postalCode: '70056',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 29.8952,
      longitude: -90.0394,
    },
    areaServed: [
      { '@type': 'City', name: 'Terrytown', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
      { '@type': 'City', name: 'Gretna', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
      { '@type': 'City', name: 'Metairie', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
      { '@type': 'City', name: 'Belle Chasse', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
      { '@type': 'City', name: 'New Orleans', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
      { '@type': 'City', name: 'Kenner', containedInPlace: { '@type': 'State', name: 'Louisiana' } },
    ],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:00', closes: '18:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '08:00', closes: '16:00' },
    ],
    priceRange: '$$',
    image: `${DOMAIN}/images/logobes.png`,
    logo: `${DOMAIN}/images/logobes.png`,
    sameAs: [],
    hasCredential: LA_LICENSES.map((lic) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: lic.licenseName,
      recognizedBy: { '@type': 'Organization', name: lic.authority },
      identifier: lic.number,
    })),
    knowsAbout: [
      'Residential Plumbing',
      'Commercial Plumbing',
      'Gas Line Fitting',
      'Natural Gas Fitting',
      'Standby Generator Connections',
      'Emergency Plumbing',
      'Drain Cleaning',
      'Sewer Line Repair',
      'Backflow Prevention Testing',
      'Water Heater Installation',
    ],
  };
}

/* ============================================
   AGGREGATE RATING SCHEMA
   ============================================ */
export function generateAggregateRatingSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Plumber',
    '@id': `${DOMAIN}/#business`,
    name: BRAND_INFO.dba,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      bestRating: '5',
      worstRating: '1',
      ratingCount: '47',
      reviewCount: '47',
    },
  };
}

/* ============================================
   SERVICE SCHEMA
   ============================================ */
export function generateServiceSchema(service: {
  title: string;
  slug: string;
  longDescription: string;
}, city?: string) {
  const areaServed = city
    ? { '@type': 'City', name: city, containedInPlace: { '@type': 'State', name: 'Louisiana' } }
    : generateLocalBusinessSchema().areaServed;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: city ? `${service.title} in ${city}, LA` : service.title,
    description: service.longDescription,
    provider: {
      '@type': 'Plumber',
      '@id': `${DOMAIN}/#business`,
      name: BRAND_INFO.dba,
      telephone: '+15043012052',
    },
    areaServed,
    url: city
      ? `${DOMAIN}/services/${service.slug}/${city.toLowerCase().replace(/\s+/g, '-')}`
      : `${DOMAIN}/services/${service.slug}`,
    serviceType: service.title,
    termsOfService: `${DOMAIN}/our-promise`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
      },
    },
  };
}

/* ============================================
   FAQ PAGE SCHEMA
   ============================================ */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/* ============================================
   BREADCRUMB SCHEMA
   ============================================ */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: `${DOMAIN}${item.url}`,
    })),
  };
}

export { DOMAIN };
