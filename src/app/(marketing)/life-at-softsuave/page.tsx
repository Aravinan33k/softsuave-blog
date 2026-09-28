import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import {
  lifeAwards,
  lifeGallery,
  lifeHero,
  lifeMeta,
  lifePerks,
  lifePractice,
  lifePurpose,
} from '@/lib/home/life-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Contact from '@/components/home/contact';

// PAGE-LOCAL SECTIONS, composed from the landing surface's classes and
// primitives — the photo-led arrangements live uses that the shared landing set
// has no equivalent for (see each component's header).
import PhotoMasthead from '@/components/common/photo-masthead';
import LifeGallery from '@/components/life/life-gallery';
import LifePurpose from '@/components/life/life-purpose';
import LifePerks from '@/components/life/life-perks';
import LifePractice from '@/components/life/life-practice';
import LifeAwards from '@/components/life/life-awards';

import home from '@/components/home/home.module.css';

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
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      {/* Band rhythm: photo masthead (dark), then light and dark alternating
          down to the dark Contact band. */}
      <main id="main">
        <PhotoMasthead content={lifeHero} />

        <div className={home.light}>
          <LifeGallery content={lifeGallery} />
        </div>

        <LifePurpose content={lifePurpose} />

        <div className={home.light}>
          <LifePerks content={lifePerks} />
        </div>

        <LifePractice content={lifePractice} />

        <div className={home.light}>
          <LifeAwards content={lifeAwards} />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
