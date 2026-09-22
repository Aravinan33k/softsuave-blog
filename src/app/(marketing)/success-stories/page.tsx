import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { testimonials } from '@/lib/home/content';
import {
  successStoriesCrossLink,
  successStoriesPageHero,
  successStoriesPageMeta,
} from '@/lib/home/success-stories-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Testimonials from '@/components/home/testimonials';
import Clients from '@/components/home/clients';
import Contact from '@/components/home/contact';

import SectionHead from '@/components/landing/section-head';
import CtaBand from '@/components/landing/cta-band';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

/**
 * Success Stories — the client-account counterpart to /case-studies.
 *
 * Linked from the Resources mega panel. That link previously resolved to the
 * live site via `navHref`; registering this route in `landing-pages.ts` brings
 * it in-app.
 *
 * Reuses the homepage's testimonials grid rather than restating the quotes:
 * two copies of what a client said is exactly the drift this surface has
 * cleaned up elsewhere (see `delivery-shared.ts`). Only the masthead and the
 * cross-link to /case-studies are this page's own copy.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${successStoriesPageMeta.title} | Soft Suave`,
  description: successStoriesPageMeta.description,
  alternates: { canonical: successStoriesPageMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${successStoriesPageMeta.title} | Soft Suave`,
    description: successStoriesPageMeta.description,
    url: absoluteUrl(successStoriesPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(successStoriesPageMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${successStoriesPageMeta.title} | Soft Suave`,
    description: successStoriesPageMeta.description,
    images: [dynamicOgImage(successStoriesPageMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * A `CollectionPage` whose parts are `Review` nodes — one per testimonial,
 * attributed to the person who gave it and about the organization.
 *
 * `itemReviewed` points at the canonical organization by `@id` rather than
 * describing the company again. `reviewRating` is emitted only where the
 * testimonial carries a rating, because a Review asserting a rating the source
 * does not state is a fabricated one.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(successStoriesPageMeta.path)}#webpage`,
    name: `${successStoriesPageMeta.title} | Soft Suave`,
    description: successStoriesPageMeta.description,
    url: absoluteUrl(successStoriesPageMeta.path),
    inLanguage: 'en',
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    hasPart: testimonials.items.map((t) => ({
      '@type': 'Review',
      reviewBody: t.quote,
      author: { '@type': 'Person', name: t.name, ...(t.role ? { jobTitle: t.role } : {}) },
      itemReviewed: { '@id': organizationLd['@id'] },
      ...(t.rating
        ? {
            reviewRating: {
              '@type': 'Rating',
              ratingValue: String(t.rating),
              bestRating: '5',
            },
          }
        : {}),
    })),
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <section className={landing.indexHead} id="top">
          <SectionHead
            level={1}
            kicker={successStoriesPageHero.eyebrow}
            title={successStoriesPageHero.title}
            intro={successStoriesPageHero.intro}
          />
        </section>

        <div className={home.light}>
          <Testimonials />
        </div>

        <CtaBand content={successStoriesCrossLink} />

        <div className={home.light}>
          <Clients />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
