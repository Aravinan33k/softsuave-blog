import 'server-only';
import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { brand, footer, why } from './content';

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
 * Everything below is derived from `content.ts` — the same objects the footer
 * and the proof band render. Nothing is retyped, so the schema cannot come to
 * advertise an office, a phone number or a figure the page itself no longer
 * shows.
 */

const TITLE = 'Soft Suave — Scalable AI, Automation & Integrations';

const DESCRIPTION =
  'Build scalable AI solutions, intelligent automation systems, and seamless ' +
  'integrations with AI-enabled engineering teams focused on real business outcomes.';

/** The organization's canonical id, so every block below refers to one node
 *  rather than describing three unrelated Organizations. */
const ORG_ID = `${absoluteUrl('/')}#organization`;
const SITE_ID = `${absoluteUrl('/')}#website`;

const OG_IMAGE = dynamicOgImage(brand.name, 'Scalable AI, Automation & Integrations');

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

/**
 * An office as a PostalAddress. `lines` is prose as the footer prints it — the
 * last line carries the town, region and postcode — so it is split on the final
 * comma rather than guessed at field by field, and anything that does not split
 * stays whole in `streetAddress`. Better a correct partial address than an
 * invented `postalCode`.
 */
function addressLd(office: (typeof footer.offices)[number]) {
  const lines = [...office.lines];
  const tail = lines.pop() ?? '';
  const at = tail.lastIndexOf(',');
  const street = [...lines, at === -1 ? '' : tail.slice(0, at)]
    .map((l) => l.trim().replace(/,$/, ''))
    .filter(Boolean)
    .join(', ');

  return {
    '@type': 'PostalAddress',
    streetAddress: street || tail.trim(),
    ...(at === -1 ? {} : { addressLocality: tail.slice(at + 1).trim() }),
  };
}

export function homeJsonLd(): Record<string, unknown>[] {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Soft Suave Technologies',
    alternateName: brand.name,
    url: absoluteUrl('/'),
    description: DESCRIPTION,
    // Matches the About page's own Organization block, which is the one other
    // place the founding year is stated.
    foundingDate: '2012',
    logo: {
      '@type': 'ImageObject',
      url: absoluteUrl('/brand/softsuave_logo_light.webp'),
    },
    email: footer.contact.email,
    sameAs: footer.social.map((s) => s.href),
    address: footer.offices.map(addressLd),
    contactPoint: footer.contact.phones.map((p) => ({
      '@type': 'ContactPoint',
      telephone: p.href.replace(/^tel:/, ''),
      // Read the label, not merely whether there is one: India publishes two
      // numbers and both carry a note, so "has a note" would mark the sales
      // line up as the HR desk.
      contactType: 'note' in p && p.note === 'HR' ? 'human resources' : 'sales',
      areaServed: p.country.toUpperCase(),
      availableLanguage: 'English',
    })),
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SITE_ID,
    name: brand.name,
    url: absoluteUrl('/'),
    description: DESCRIPTION,
    publisher: { '@id': ORG_ID },
    // The app serves this route itself (`app/search/page.tsx`), reading `q`.
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${absoluteUrl('/search')}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const webPage = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': absoluteUrl('/'),
    url: absoluteUrl('/'),
    name: TITLE,
    description: DESCRIPTION,
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
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
    name: 'Soft Suave at a glance',
    itemListElement: why.stats.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `${s.label}: ${s.value}${s.suffix}`,
      description: s.line,
    })),
  };

  return [organization, website, webPage, proof];
}

