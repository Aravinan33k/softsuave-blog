import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import {
  careersContact,
  careersListing,
  careersMeta,
  careersMidCta,
} from '@/lib/home/careers-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// SHARED LANDING SECTIONS, taking this page's copy. Nothing bespoke: the live
// careers page is a masthead, a location filter and a table of roles, which is
// exactly what `landing/listing` already renders for the case-study and
// success-story indexes.
import Listing from '@/components/landing/listing';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';

import home from '@/components/home/home.module.css';

/**
 * Careers — rebuilt from https://www.softsuave.com/career-overview.
 *
 * A SERVER component so it can own its `metadata`; every section is a client
 * component. Fonts, `.theme-four` tokens and Lenis smooth scroll come from
 * `app/(marketing)/layout.tsx`.
 *
 * NO `Contact` BAND AND NO HERO ENQUIRY FORM, which every other page on this
 * surface closes with. That is the whole reason this route exists: the enquiry
 * form is for business, and `sharedHeroAlert` sends candidates HERE, away from
 * it, from seventeen other pages. Closing a careers page with a sales form
 * would walk the applicant straight back into the thing they were redirected
 * out of. The HR inboxes below are the close instead.
 *
 * NO `JobPosting` SCHEMA either, deliberately. Google's JobPosting requires
 * `datePosted` and a real `description`, and rewards `validThrough` and
 * `baseSalary`. The live page publishes a role name and a city and nothing
 * else, so every posting here would be a stub — and an incomplete JobPosting
 * is worse than none: it is eligible for the jobs experience, gets rejected in
 * Search Console, and puts a stale listing in front of applicants with no
 * expiry. When the roles carry dates and descriptions, this is the place to
 * add it.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${careersMeta.title} | Soft Suave`,
  description: careersMeta.description,
  alternates: { canonical: careersMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${careersMeta.title} | Soft Suave`,
    description: careersMeta.description,
    url: absoluteUrl(careersMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(careersMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${careersMeta.title} | Soft Suave`,
    description: careersMeta.description,
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with the mount
 *  subpath, so it needs the already-public path. */
const HOME_HREF = BASE_PATH || '/';

/**
 * A `CollectionPage` over the openings, hiring-organization-linked by `@id` to
 * the canonical `Organization` the group layout emits — never a second
 * Organization node, for the reason `/about` documents at length.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(careersMeta.path)}#webpage`,
    name: `${careersMeta.title} | Soft Suave`,
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
        {/* Masthead and the openings in one component — `Listing` renders its
            own H1, so this is the page's top rather than a section of it. */}
        <Listing content={careersListing} id="openings" />

        <CtaBand content={careersMidCta} />

        {/* The close: the two HR inboxes, on the warm-white band so the page
            does not end on the same dark ground the CTA sits on. Each card
            links its own mailbox — `mailto:` reaches `SiteLink`, which now
            passes a complete URL through untouched (themes/softsuave/nav-data). */}
        <div className={home.light}>
          <CardGrid
            content={{
              eyebrow: careersContact.eyebrow,
              title: careersContact.title,
              body: careersContact.intro,
              items: careersContact.inboxes.map((i) => ({
                name: i.label,
                body: `${i.email} · ${i.phone}`,
                href: `mailto:${i.email}`,
              })),
            }}
            id="contact"
            columns={3}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}
