import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  aboutHero,
  aboutLeadership,
  aboutMeta,
  aboutMidCta,
  aboutMilestones,
  aboutMissionVision,
  aboutOverview,
} from '@/lib/home/about-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content, so the
// proof on this page is the same proof the rest of the site shows.
import Manifesto from '@/components/home/manifesto';
import Recognitions from '@/components/home/recognitions';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SHARED LANDING SECTIONS, taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import CardGrid from '@/components/landing/industries';
import Process from '@/components/landing/process';
import Team from '@/components/landing/team';
import CtaBand from '@/components/landing/cta-band';

import home from '@/components/home/home.module.css';

/**
 * About Us — the Company page, rebuilt from https://www.softsuave.com/about.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Section order follows the live page — hero, mission/vision, milestones,
 * leadership, recognitions, clients — with the brand's own testimonial and
 * contact bands appended, which is the order every other page in this group
 * closes on.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${aboutMeta.title} | Soft Suave`,
  description: aboutMeta.description,
  alternates: { canonical: aboutMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${aboutMeta.title} | Soft Suave`,
    description: aboutMeta.description,
    url: absoluteUrl(aboutMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(aboutMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${aboutMeta.title} | Soft Suave`,
    description: aboutMeta.description,
    images: [dynamicOgImage(aboutMeta.title, 'Soft Suave')],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

/** Every href here is an anchor this page actually renders — `#why` from the
 *  Manifesto wrapper, `#awards` from Recognitions, the rest from the sections
 *  below — so no nav item scrolls to nothing. */
const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Why Soft Suave', href: '#why' },
  { label: 'Milestones', href: '#milestones' },
  { label: 'Leadership', href: '#team' },
  { label: 'Recognitions', href: '#awards' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Book free consultation', href: '#enquiry' } as const;

const ORG_URL = 'https://www.softsuave.com';

/**
 * Organization + AboutPage, plus one Person per leader.
 *
 * The live page ships four Person blocks and nothing else — no Organization, no
 * AboutPage, no breadcrumb — and those four are stale against its own markup:
 * they name people with job titles the rendered cards no longer show, point at
 * an older asset directory, and spell the property `worksfor`, which is not a
 * schema.org property (it is `worksFor`, and a search engine drops the
 * unrecognised key). Generating all nine from `aboutLeadership` fixes the
 * casing and makes drift between the cards and the schema impossible.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Soft Suave Technologies',
    alternateName: 'Soft Suave',
    url: ORG_URL,
    description: aboutMeta.description,
    foundingDate: '2012',
    sameAs: ['https://www.linkedin.com/company/soft-suave-technologies'],
    employee: aboutLeadership.members.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: `${aboutMeta.title} | Soft Suave`,
    description: aboutMeta.description,
    url: absoluteUrl(aboutMeta.path),
    about: { '@type': 'Organization', name: 'Soft Suave Technologies', url: ORG_URL },
  },
  ...aboutLeadership.members.map((m) => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: m.name,
    jobTitle: m.role,
    image: absoluteUrl(m.image),
    ...(m.linkedin ? { sameAs: [m.linkedin] } : {}),
    worksFor: {
      '@type': 'Organization',
      name: 'Soft Suave Technologies',
      url: ORG_URL,
    },
  })),
];

export default function AboutPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: aboutMeta.shortTitle, path: aboutMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={aboutHero} idPrefix="about" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Overview content={aboutOverview} />
        </div>

        <CardGrid content={aboutMissionVision} id="mission" variant="feature" />

        <div className={home.light}>
          <Process content={aboutMilestones} id="milestones" variant="mosaic" />
        </div>

        <Team content={aboutLeadership} id="team" />

        {/* Both proof bands share one light band: they are the same argument
            told twice (who rates us, who buys from us), and splitting them
            across an inversion would read as two unrelated sections. */}
        <div className={home.light}>
          <Recognitions />
          <Clients />
        </div>

        <CtaBand content={aboutMidCta} />

        <div className={home.light}>
          <Testimonials />
        </div>

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
