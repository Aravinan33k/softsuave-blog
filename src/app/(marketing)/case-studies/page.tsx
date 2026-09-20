import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { organizationLd } from '@/lib/seo/organization';
import {
  caseStudiesListing,
  caseStudiesPageCta,
  caseStudiesPageMeta,
} from '@/lib/home/case-studies-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Contact from '@/components/home/contact';

import Listing from '@/components/landing/listing';
import CtaBand from '@/components/landing/cta-band';

import home from '@/components/home/home.module.css';

/**
 * Case Studies index.
 *
 * Three things point here: the Resources mega panel ("Case Studies"), the
 * footer, and the homepage's own case-study band, whose "View Case Study" CTA
 * is `/case-studies`. All three previously resolved to the live site, because
 * `navHref` treats any path outside `MARKETING_ROUTES` as softsuave.com's.
 * Registering this route in `landing-pages.ts` is what brings them in-app.
 *
 * A SERVER component so the route owns its `metadata` and JSON-LD; `Listing`
 * below is the client component, because the industry filter is client state.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${caseStudiesPageMeta.title} | Soft Suave`,
  description: caseStudiesPageMeta.description,
  alternates: { canonical: caseStudiesPageMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${caseStudiesPageMeta.title} | Soft Suave`,
    description: caseStudiesPageMeta.description,
    url: absoluteUrl(caseStudiesPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(caseStudiesPageMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${caseStudiesPageMeta.title} | Soft Suave`,
    description: caseStudiesPageMeta.description,
    images: [dynamicOgImage(caseStudiesPageMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * A `CollectionPage` whose `hasPart` is the studies themselves, as `Article`
 * nodes. Not `pageSchemaGraph`: that helper emits a `Service` and points the
 * WebPage's `mainEntity` at it, and this page offers nothing for sale — it
 * lists work already delivered.
 *
 * No `url` on the parts, because no detail pages exist yet. A `url` pointing
 * at a route that 404s is worse than none.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(caseStudiesPageMeta.path)}#webpage`,
    name: `${caseStudiesPageMeta.title} | Soft Suave`,
    description: caseStudiesPageMeta.description,
    url: absoluteUrl(caseStudiesPageMeta.path),
    inLanguage: 'en',
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    hasPart: caseStudiesListing.items.map((it) => ({
      '@type': 'Article',
      headline: it.title,
      ...(it.body ? { description: it.body } : {}),
      ...(it.tag ? { articleSection: it.tag } : {}),
      author: { '@id': organizationLd['@id'] },
      publisher: { '@id': organizationLd['@id'] },
    })),
  },
];

export default function CaseStudiesPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: caseStudiesPageMeta.title, path: caseStudiesPageMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Listing content={caseStudiesListing} id="work" />

        <CtaBand content={caseStudiesPageCta} />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
