import 'server-only';
import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import { brand, why } from './content';

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
 * `WebPage` node and the proof band's figures. Those figures come from
 * `content.ts` — the same object the band renders — so a number cannot be
 * marked up here and shown differently above.
 *
 * The company's own facts (offices, phone desks, social profiles) are NOT here
 * any more. They are `lib/seo/organization.ts`, emitted once for the surface by
 * `app/(marketing)/layout.tsx` and referenced below by `@id`; see the note in
 * `homeJsonLd`.
 */

const TITLE = 'Soft Suave — Scalable AI, Automation & Integrations';

const DESCRIPTION =
  'Build scalable AI solutions, intelligent automation systems, and seamless ' +
  'integrations with AI-enabled engineering teams focused on real business outcomes.';

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

  return [webPage, proof];
}

