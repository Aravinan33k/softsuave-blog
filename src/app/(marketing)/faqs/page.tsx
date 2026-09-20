import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd, faqPageLd } from '@/lib/seo/jsonld';
import { organizationLd } from '@/lib/seo/organization';
import {
  faqsGeneral,
  faqsHire,
  faqsPageCta,
  faqsPageHero,
  faqsPageMeta,
  faqsProject,
} from '@/lib/home/faqs-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Contact from '@/components/home/contact';

import SectionHead from '@/components/landing/section-head';
import Faq from '@/components/landing/faq';
import CtaBand from '@/components/landing/cta-band';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

/**
 * Frequently Asked Questions — softsuave.com's /faqs page.
 *
 * Linked from the nav. That link was previously resolved to the live site by
 * `navHref` (any path outside `MARKETING_ROUTES` is treated as softsuave.com's);
 * registering this route in `landing-pages.ts` is what brings it in-app.
 *
 * Three accordions rather than one: the live page splits these across General,
 * Project Development and Hire Developer tabs, and 24 questions in a single
 * list is a wall. Each `Faq` gets its own `idPrefix` so the three accordions'
 * trigger/panel ids stay distinct — they coexist on one page, which is exactly
 * what that prop is for.
 *
 * A SERVER component so the route owns its `metadata` and JSON-LD; the
 * accordions below are client components.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${faqsPageMeta.title} | Soft Suave`,
  description: faqsPageMeta.description,
  alternates: { canonical: faqsPageMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${faqsPageMeta.title} | Soft Suave`,
    description: faqsPageMeta.description,
    url: absoluteUrl(faqsPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(faqsPageMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${faqsPageMeta.title} | Soft Suave`,
    description: faqsPageMeta.description,
    images: [dynamicOgImage(faqsPageMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * One `FAQPage` over all three groups, plus the `WebPage` and the trail.
 *
 * The groups are a reading aid, not three separate documents, so they flatten
 * into a single `mainEntity` list — a crawler that finds two FAQPage nodes on
 * one URL has to choose between them. Answers are flattened to their string
 * form here because `faqPageLd` takes plain text; the `link` an item may carry
 * is a rendering affordance, not part of the answer.
 */
const ALL_ITEMS = [...faqsGeneral.items, ...faqsProject.items, ...faqsHire.items].map((it) => ({
  q: it.q,
  a: Array.isArray(it.a) ? it.a.join(' ') : (it.a as string),
}));

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(faqsPageMeta.path)}#webpage`,
    name: `${faqsPageMeta.title} | Soft Suave`,
    description: faqsPageMeta.description,
    url: absoluteUrl(faqsPageMeta.path),
    inLanguage: 'en',
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
  },
  faqPageLd(ALL_ITEMS),
];

export default function FaqsPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: faqsPageMeta.shortTitle, path: faqsPageMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <section className={landing.indexHead} id="top">
          <SectionHead
            level={1}
            kicker={faqsPageHero.eyebrow}
            title={faqsPageHero.title}
            intro={faqsPageHero.intro}
          />
        </section>

        <div className={home.light}>
          <Faq content={faqsGeneral} idPrefix="faq-general" />
        </div>

        <Faq content={faqsProject} idPrefix="faq-project" />

        <div className={home.light}>
          <Faq content={faqsHire} idPrefix="faq-hire" />
        </div>

        <CtaBand content={faqsPageCta} />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
