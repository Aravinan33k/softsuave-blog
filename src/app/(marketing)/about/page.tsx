import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import {
  aboutHero,
  aboutLeadership,
  aboutMeta,
  aboutMilestones,
  aboutOverview,
} from '@/lib/home/about-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content, so the
// proof on this page is the same proof the rest of the site shows.
import Recognitions from '@/components/home/recognitions';
import Clients from '@/components/home/clients';
import Contact from '@/components/home/contact';

// SHARED LANDING SECTIONS, taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import Team from '@/components/landing/team';

import home from '@/components/home/home.module.css';

/**
 * About Us — the Company page, rebuilt from https://www.softsuave.com/about.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Section set and order follow the live page — hero, overview with mission
 * and vision, milestones, leadership, recognitions, clients — closing on the
 * brand's contact band, as every page in this group does.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: aboutMeta.path },
  robots: pageRobots,
  openGraph: {
    title: aboutMeta.title,
    description: aboutMeta.description,
    url: absoluteUrl(aboutMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(aboutMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutMeta.title,
    description: aboutMeta.description,
    images: [dynamicOgImage(aboutMeta.title, 'Soft Suave')],
  },
};

/* The title is the live page's own and already names the brand, so it is used
   as-is rather than getting the " | Soft Suave" suffix the other pages add. */

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

/**
 * AboutPage, plus one Person per leader.
 *
 * This page is ABOUT the organization, so its schema is an `AboutPage` over
 * people rather than a `Service` over offerings — which is why it is built here
 * and not through `pageSchemaGraph`.
 *
 * It no longer describes the company a second time. This used to open with its
 * own `Organization` — no `@id`, its own description, a single `sameAs` —
 * competing with the canonical `organizationLd` that
 * `app/(marketing)/layout.tsx` now emits on every page of this surface. Two
 * Organization nodes for one company is worse than none: a consumer has to pick
 * one. The leadership is attached to the canonical node by `@id` instead, and
 * every `worksFor` points at that same identifier.
 *
 * The live page ships four Person blocks and nothing else — no Organization, no
 * AboutPage, no breadcrumb — and those four are stale against its own markup:
 * they name people with job titles the rendered cards no longer show, point at
 * an older asset directory, and spell the property `worksfor`, which is not a
 * schema.org property (it is `worksFor`, and a search engine drops the
 * unrecognised key). Generating all of them from `aboutLeadership` fixes the
 * casing and makes drift between the cards and the schema impossible.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': `${absoluteUrl(aboutMeta.path)}#webpage`,
    name: aboutMeta.title,
    description: aboutMeta.description,
    url: absoluteUrl(aboutMeta.path),
    inLanguage: 'en',
    dateModified: SCHEMA_DATE_MODIFIED,
    about: { '@id': organizationLd['@id'] },
    mainEntity: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    isPartOf: { '@id': marketingWebSiteLd['@id'] },
  },
  ...aboutLeadership.members.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${absoluteUrl(aboutMeta.path)}#${m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    name: m.name,
    jobTitle: m.role,
    image: absoluteUrl(m.image),
    ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    worksFor: { '@id': organizationLd['@id'] },
  })),
];

export default function AboutPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={aboutHero} idPrefix="about" />

        {/* The overview (with mission and vision inside it, as on the live
            page) and the milestone timeline share one light band: the section
            they replaced between them was the dark one, and this keeps the
            leadership and proof bands on the inversions they already had. */}
        <div className={home.light}>
          <Overview content={aboutOverview} id="mission" />

          {/* A chronology: each card is labelled with its year, not "Step N". */}
          <Process content={aboutMilestones} id="milestones" label="n" />
        </div>

        <Team content={aboutLeadership} id="team" columns={5} />

        {/* Both proof bands share one light band: they are the same argument
            told twice (who rates us, who buys from us), and splitting them
            across an inversion would read as two unrelated sections. */}
        <div className={home.light}>
          <Recognitions />
          {/* The live About page's own heading and standfirst for this band. */}
          <Clients
            title="Preferred Technology Partner for Startups and SMBs Globally"
            body="We use the latest technology and AI innovation to help startups transform digitally, guiding them through product development with unmatched experience and actionable results."
          />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
