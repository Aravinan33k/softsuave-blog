import 'server-only';
import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import { brand, why } from './content';
import { HOME_SERVICE_CATALOG } from './home-service-catalog';

/**
 * Metadata and structured data for the homepage.
 *
 * The 11 Sep review found the page shipping neither: no Open Graph or Twitter
 * tags (the group layout declared title, description and canonical and stopped
 * there, so a shared link had no card), and no JSON-LD at all, while every
 * landing page beside it emits both. This module is the homepage's equivalent of
 * `sectors/seo.ts` and `hire-roles/page-meta.ts`.
 *
 * It lives here rather than in the route so the page file stays a composition of
 * sections, and it is `server-only` because `absoluteUrl` is.
 *
 * What remains here is what is particular to this page: its metadata, its
 * `WebPage` node, the proof band's figures, and the company-wide `Service`
 * (with its catalogue of service pages) and US-office `LocalBusiness` that the
 * SEO brief puts on the homepage alone. Those figures come from
 * `content.ts` — the same object the band renders — so a number cannot be
 * marked up here and shown differently above.
 *
 * The company's own facts (offices, phone desks, social profiles) are NOT here
 * any more. They are `lib/seo/organization.ts`, emitted once for the surface by
 * `app/(marketing)/layout.tsx` and referenced below by `@id`; see the note in
 * `homeJsonLd`.
 */

/* The SEO title and description as supplied for the homepage (24 Sep): 46 and
   149 characters, inside the ~60 / ~160 where Google truncates on desktop. */
const TITLE = 'Soft Suave | AI & Software Development Company';

/*
 * Both figures are ones the page already publishes — 13+ years in
 * `clients.body`, 400+ specialists in the proof band's `why.stats` — so neither
 * is a new claim. If either changes on the page, this has to change with it.
 */
const DESCRIPTION =
  'Soft Suave is an AI and software development company with 13+ years of ' +
  'experience and 400+ specialists building scalable, production-ready solutions.';

const OG_IMAGE = dynamicOgImage(brand.name, 'AI & Software Development Company');

export const homeMetadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl('/'),
    siteName: brand.name,
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export function homeJsonLd(): Record<string, unknown>[] {
  /*
   * The Organization and WebSite that used to be built here are gone.
   *
   * `app/(marketing)/layout.tsx` now emits the canonical pair for every page on
   * this surface, and this page is on it — so describing the company and the
   * site again here produced two of each in one document. Worse than redundant:
   * the two Organization nodes carried DIFFERENT `@id`s (`organizationLd`
   * spells its own with a trailing slash before the fragment, this file derived
   * one without), so a consumer saw two companies; and the two WebSite nodes
   * carried the SAME `@id`, which is a straight collision.
   *
   * Nothing is lost by deferring to them. `lib/seo/organization.ts` states
   * everything this block did — offices, email, the phone desks, the social
   * profiles — and adds the ISO 27001 credential and the KiwiTech parent that
   * this one never had. The site search moved to `marketingWebSiteLd`, which is
   * where a site-wide action belongs.
   */
  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl('/')}#webpage`,
    url: absoluteUrl('/'),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { '@id': marketingWebSiteLd['@id'] },
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    mainEntity: { '@id': `${absoluteUrl('/')}#proof` },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    dateModified: SCHEMA_DATE_MODIFIED,
    inLanguage: 'en',
  };

  /**
   * The proof band's four figures, as the ItemList the page actually renders.
   * `why.stats` is the single source for both, so a number cannot be marked up
   * here and shown differently above.
   */
  const proof = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${absoluteUrl('/')}#proof`,
    name: 'Soft Suave at a glance',
    itemListElement: why.stats.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${s.label}: ${s.value}${s.suffix}`,
      description: s.line,
    })),
  };

  return [webPage, proof, homeServiceLd(), homeLocalBusinessLd()];
}

/**
 * Markets the brief lists as served. ISO 3166-1 alpha-2, which is what
 * `areaServed`/`eligibleRegion` expect — the brief wrote the UK as "UK", which
 * is not a country code; it is "GB".
 */
const AREA_SERVED = ['US', 'CA', 'GB', 'AU', 'FR', 'IT', 'DE', 'ES'] as const;

const SERVICE_DESCRIPTION =
  'Soft Suave provides AI-powered IT services, custom software development, and digital ' +
  'transformation solutions to businesses worldwide. Leveraging cutting-edge AI and automation ' +
  'technologies, Soft Suave accelerates product development, optimizes operations, and drives ' +
  'innovation across industries such as aviation, logistics, fintech, healthcare, education, and more.';

/**
 * The company's service offering as a whole, with the catalogue of service
 * pages behind it.
 *
 * `provider` is the site-wide organization by `@id`, not the inline copy the
 * brief carried: that copy is already on the page in full (the marketing layout
 * emits it), and a second, differently-worded Organization is a second company
 * to a consumer.
 *
 * The brief's top-level Offer is kept for its eligibility and pricing note but
 * without `price: "Variable"` (price must be a number, so the whole offer is
 * rejected) or `priceValidUntil: "2025-12-31"` (already past, which flags the
 * offer as expired). Pricing is per project, so there is no honest number to
 * put there — leaving the field out is the valid way to say so.
 */
export function homeServiceLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl('/')}#service`,
    name: organizationLd.name,
    url: absoluteUrl('/'),
    description: SERVICE_DESCRIPTION,
    serviceType: [
      'AI Solutions',
      'Offshore Software Development',
      'IT Staff Augmentation',
      'Hire Dedicated Developers',
      'Legacy Modernization Services',
      'Mobile App Development',
      'Android App Development',
      'iOS Application Development',
      'Hire React Native Developers',
      'Flutter Application Development',
      'Ionic App Development',
      'Xamarin App Development',
      'Web App Development',
      'AngularJS Development',
      'Ruby on Rails Development',
      'NodeJS Development',
      'Java Development',
      'Python Development',
      'PHP Development',
      'Dot NET Development',
      'IT Outsourcing Services',
      'Product Engineering Services',
      'Cloud Computing Services',
    ],
    provider: { '@id': organizationLd['@id'] },
    areaServed: AREA_SERVED,
    offers: {
      '@type': 'Offer',
      url: absoluteUrl('/ai-development-service'),
      priceCurrency: 'USD',
      eligibleRegion: AREA_SERVED,
      description: 'Flexible pricing based on project scope, technology stack, and service requirements.',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Soft Suave Service Catalog',
      itemListElement: HOME_SERVICE_CATALOG.map((s) => ({
        '@type': 'Offer',
        url: absoluteUrl(s.path),
        itemOffered: { '@type': 'Service', name: s.name, description: s.description },
      })),
    },
  };
}

/** The US sales office the brief names — the same one `organizationLd` lists. */
const US_SALES_OFFICE = organizationLd.address.find((a) => a.addressCountry === 'US')!;

/**
 * The US sales office as a LocalBusiness.
 *
 * Its address is read from `organizationLd` rather than retyped, so the two
 * nodes cannot drift onto different streets. `parentOrganization` ties it back
 * to the company by `@id`.
 */
export function homeLocalBusinessLd(): Record<string, unknown> {
  // The office's own `name` label stays behind; the business carries the name.
  const address = {
    '@type': 'PostalAddress',
    streetAddress: US_SALES_OFFICE.streetAddress,
    addressLocality: US_SALES_OFFICE.addressLocality,
    addressRegion: US_SALES_OFFICE.addressRegion,
    postalCode: US_SALES_OFFICE.postalCode,
    addressCountry: US_SALES_OFFICE.addressCountry,
  };
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${absoluteUrl('/')}#localbusiness`,
    name: organizationLd.name,
    description:
      'Soft Suave provides AI-powered IT services, custom software development, and digital transformation solutions to businesses worldwide.',
    url: absoluteUrl('/'),
    image: organizationLd.logo,
    logo: organizationLd.logo,
    telephone: '+1-410-220-6301',
    email: organizationLd.email,
    priceRange: '$$',
    address,
    geo: { '@type': 'GeoCoordinates', latitude: 39.2804, longitude: -76.8411 },
    openingHours: 'Mo-Fr 09:00-18:00',
    sameAs: ['https://www.linkedin.com/company/softsuave', 'https://www.facebook.com/softsuave/'],
    areaServed: AREA_SERVED,
    paymentAccepted: 'Credit Card, Bank Transfer',
    currenciesAccepted: 'USD',
    parentOrganization: { '@id': organizationLd['@id'] },
  };
}

