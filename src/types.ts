/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SitemapItem {
  id: string;
  title: string;
  url: string;
  category: 'residential' | 'commercial' | 'government' | 'core';
  description: string;
  seoKeywords: string[];
  priority: number;
}

export interface DesignToken {
  name: string;
  usage: string;
  value: string;
  tailwindClass: string;
}

export interface TrustedBadge {
  id: string;
  label: string;
  description: string;
  iconName: string;
  category: 'safety' | 'credentials' | 'affiliations';
}

export interface NAICSCode {
  code: string;
  title: string;
  relevance: string;
  scope: string;
}

export interface LicensingCredential {
  id: string;
  licenseName: string;
  number: string;
  authority: string;
  scope: string;
}

export interface CopyTemplateInput {
  audience: 'government' | 'commercial' | 'residential-emergency' | 'residential-standard';
  tone: 'professional-integrity' | 'urgent-safety' | 'local-expert';
  topic: string;
  customDetails?: string;
}
