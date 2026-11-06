import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import { careersHero, careersMeta, careersOpenings } from '@/lib/home/careers-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import SectionHead from '@/components/landing/section-head';
// PAGE-SPECIFIC SECTION — the live page's location tabs over a table of roles,
// which no shared landing component renders.
import OpeningsTable from '@/components/careers/openings-table';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

/**
 * Careers — rebuilt from https://www.softsuave.com/career-overview.
 *
 * A SERVER component so it can own its `metadata`; every section is a client
 * component. Fonts, `.theme-four` tokens and Lenis smooth scroll come from
 * `app/(marketing)/layout.tsx`.
 *
 * The live page is a masthead ("Career" and its one-line standfirst) and the
 * "Join Us" openings table, then the footer — so is this one. The masthead is
 * `SectionHead level={1}` on `.indexHead`, the pattern `/faqs`, `/clients` and
 * `/life-at-softsuave` use for a page with no hero form. Band rhythm: dark
 * masthead, light openings band.
 *
 * NO `Contact` BAND AND NO HERO ENQUIRY FORM: live has neither, and the enquiry
 * form is for business — `sharedHeroAlert` sends candidates HERE, away from it,
 * from seventeen other pages.
 *
 * NO `JobPosting` SCHEMA either, deliberately. Google's JobPosting requires
 * `datePosted` and a real `description`, and rewards `validThrough` and
 * `baseSalary`. The live page publishes a role name and a city and nothing
 * else, so every posting here would be a stub — and an incomplete JobPosting
 * is worse than none. When the roles carry dates and descriptions, this is the
 * place to add it.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: careersMeta.title,
  description: careersMeta.description,
  alternates: { canonical: careersMeta.path },
  robots: pageRobots,
  openGraph: {
    title: careersMeta.title,
    description: careersMeta.description,
    url: absoluteUrl(careersMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(careersMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: careersMeta.title,
    description: careersMeta.description,
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with the mount
 *  subpath, so it needs the already-public path. */
const HOME_HREF = BASE_PATH || '/';

/**
 * A `CollectionPage` over the openings, linked by `@id` to the canonical
 * `Organization` the group layout emits — never a second Organization node,
 * for the reason `/about` documents at length.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(careersMeta.path)}#webpage`,
    name: careersMeta.title,
    description: careersMeta.description,
    url: absoluteUrl(careersMeta.path),
    inLanguage: 'en',
    dateModified: SCHEMA_DATE_MODIFIED,
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    isPartOf: { '@id': marketingWebSiteLd['@id'] },
  },
];

export default function CareerOverviewPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <section className={landing.indexHead} id="top">
          <SectionHead level={1} title={careersHero.title} intro={careersHero.intro} />
        </section>

        <div className={home.light}>
          <OpeningsTable content={careersOpenings} id="openings" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
