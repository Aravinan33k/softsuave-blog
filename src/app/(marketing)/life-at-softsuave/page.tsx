import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import {
  lifeHero,
  lifeMeta,
  lifeMidCta,
  lifeOverview,
  lifePerks,
  lifePractice,
  lifePurpose,
} from '@/lib/home/life-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTION — the homepage's own awards band, reading the one list
// of accolades in `content.ts`. The live page ends on "Awards & Certifications"
// with eleven directory badges; rendering the shared band means this page and
// the homepage can never disagree about what we have won.
import Recognitions from '@/components/home/recognitions';

// SHARED LANDING SECTIONS, taking this page's copy.
import SectionHead from '@/components/landing/section-head';
import Overview from '@/components/landing/overview';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

/**
 * Life at Soft Suave — rebuilt from
 * https://www.softsuave.com/life-at-softsuave, section for section.
 *
 * A SERVER component so it can own its `metadata`; every section below is a
 * client component. Fonts, `.theme-four` tokens and Lenis smooth scroll come
 * from `app/(marketing)/layout.tsx`.
 *
 * NO HERO ENQUIRY FORM AND NO CLOSING `Contact` BAND, for the same reason the
 * careers page has neither: this page's reader is a candidate, and the enquiry
 * form on every other page is a sales form that `sharedHeroAlert` explicitly
 * redirects candidates away from. It closes on the careers CTA instead, which
 * is the action this page actually wants.
 *
 * The masthead is `SectionHead level={1}` on `.indexHead` rather than the
 * landing `Hero`, which is the pattern `/faqs` and `/clients` use for a page
 * with no form: an H1, a standfirst, and straight into the content.
 *
 * NO PHOTOGRAPHY YET. The live page carries office and event photographs, and
 * this surface's rule is that photographic slots go through the Pexels
 * pipeline and `BrandImage` — but stock photography of someone else's office
 * would be a worse lie than no photograph at all on a page whose entire
 * subject is THIS office. The slots belong in `content/images.manifest.json`
 * once the real photographs are exported from the live site; the layout takes
 * them without restructuring.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${lifeMeta.title} | Soft Suave`,
  description: lifeMeta.description,
  alternates: { canonical: lifeMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${lifeMeta.title} | Soft Suave`,
    description: lifeMeta.description,
    url: absoluteUrl(lifeMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(lifeMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${lifeMeta.title} | Soft Suave`,
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
    name: `${lifeMeta.title} | Soft Suave`,
    description: lifeMeta.description,
    url: absoluteUrl(lifeMeta.path),
    inLanguage: 'en',
    dateModified: SCHEMA_DATE_MODIFIED,
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

      {/* Band rhythm: dark masthead, then alternating. The perks grid and the
          practice grid are deliberately NOT adjacent on the same ground —
          eight cards followed by five on one surface reads as thirteen cards. */}
      <main id="main">
        <section className={landing.indexHead} id="top">
          <SectionHead
            level={1}
            kicker={lifeHero.eyebrow}
            title={lifeHero.title}
            intro={lifeHero.intro}
          />
        </section>

        <div className={home.light}>
          <Overview content={lifeOverview} id="people" />
        </div>

        <CardGrid content={lifePurpose} id="purpose" variant="feature" columns={3} />

        <div className={home.light}>
          <CardGrid content={lifePerks} id="perks" columns={4} />
        </div>

        {/* `bold` rather than a third plain card grid: this is the page's
            third consecutive grid, and the variant gives it its own
            composition and the card-accent ramp instead of reading as a
            repeat of the perks above it. */}
        <CardGrid content={lifePractice} id="practice" variant="bold" />

        <div className={home.light}>
          <Recognitions />
        </div>

        <CtaBand content={lifeMidCta} />
      </main>

      <Footer />
    </div>
  );
}
