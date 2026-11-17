'use client';

import { caseStudiesClosingBand, caseStudiesListing, caseStudiesPageMeta } from '@/lib/home/case-studies-content';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/site-url';
import { organizationLd } from '@/lib/seo/organization';
import { navHref } from '@/themes/softsuave/nav-data';
import Contact from '@/components/home/contact';
import Listing from '@/components/landing/listing';
import home from '@/components/home/home.module.css';

/**
 * A `CollectionPage` whose `hasPart` is the studies themselves, as `Article`
 * nodes. Not `pageSchemaGraph`: that helper emits a `Service` and points the
 * WebPage's `mainEntity` at it, and this page offers nothing for sale — it
 * lists work already delivered.
 *
 * Each part's `url` is its detail page on softsuave.com — those pages are not
 * rebuilt here, so `navHref` resolves them to the live site, the same
 * destination the card's "View Case Study" button takes.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(caseStudiesPageMeta.path)}#webpage`,
    name: caseStudiesPageMeta.title,
    description: caseStudiesPageMeta.description,
    url: absoluteUrl(caseStudiesPageMeta.path),
    inLanguage: 'en',
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    hasPart: caseStudiesListing.items.map((it) => ({
      '@type': 'Article',
      headline: it.title,
      ...(it.href ? { url: navHref(it.href) } : {}),
      ...(it.image ? { image: absoluteUrl(it.image.src) } : {}),
      ...(it.body ? { description: it.body } : {}),
      ...(it.tag ? { articleSection: it.tag } : {}),
      author: { '@id': organizationLd['@id'] },
      publisher: { '@id': organizationLd['@id'] },
    })),
  },
];

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 */
export default function Sections() {
  return (
    <>
      <JsonLd data={structuredData} />

      {/* Dark masthead, warm-white list, dark closing band — the surface's
          band rhythm, and the live cards' photos and platform icons were
          drawn for a light page. */}
      <Listing content={caseStudiesListing} id="work" listClassName={home.light} />

      <Contact content={caseStudiesClosingBand} eyebrow="" />
    </>
  );
}
