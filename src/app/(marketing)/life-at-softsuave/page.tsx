import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import { lifeHero, lifeMeta } from '@/lib/home/life-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';
import genAi from '@/components/generative-ai/gen-ai.module.css';
import Sections from './sections';

/**
 * Life at Soft Suave — rebuilt from
 * https://www.softsuave.com/life-at-softsuave, section for section, with its
 * copy verbatim and its own photographs (re-encoded under
 * `public/images/life/`).
 *
 * A SERVER component so it can own its `metadata`. Fonts, `.theme-four` tokens
 * and Lenis smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Closes on the site's `Contact` band, the equivalent of the "Book Free
 * Consultation" form live ends on.
 */

export const revalidate = 300;

// Live's <title> and meta description verbatim — no brand suffix there.
export const metadata: Metadata = {
  title: lifeMeta.title,
  description: lifeMeta.description,
  alternates: { canonical: lifeMeta.path },
  robots: pageRobots,
  openGraph: {
    title: lifeMeta.title,
    description: lifeMeta.description,
    url: absoluteUrl(lifeMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(lifeMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: lifeMeta.title,
    description: lifeMeta.description,
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with the mount
 *  subpath, so it needs the already-public path. */
const HOME_HREF = BASE_PATH || '/';

/**
 * An `AboutPage` over the organization — this page is about the company, not
 * about a service it sells. Linked by `@id` to the canonical `Organization`
 * the group layout emits rather than declaring a second one.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absoluteUrl(lifeMeta.path)}#webpage`,
    name: lifeMeta.title,
    description: lifeMeta.description,
    url: absoluteUrl(lifeMeta.path),
    inLanguage: 'en',
    dateModified: SCHEMA_DATE_MODIFIED,
    primaryImageOfPage: absoluteUrl(lifeHero.image.src),
    about: { '@id': organizationLd['@id'] },
    mainEntity: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    isPartOf: { '@id': marketingWebSiteLd['@id'] },
  },
];

export default function LifeAtSoftSuavePage() {
  return (
    <div className={`${home.page} ${home.stackedHeads} ${landing.stackedHeads} ${genAi.stackedHeads}`}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      {/* Band rhythm: photo masthead (dark), then light and dark alternating
          down to the dark Contact band. */}
      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
