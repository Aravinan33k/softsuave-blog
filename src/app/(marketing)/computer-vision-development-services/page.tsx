import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  cvCapabilities,
  cvFaqs,
  cvHero,
  cvIndustries,
  cvMeta,
  cvOverview,
  cvPipeline,
  cvProcess,
  cvServices,
  cvSetupCta,
  cvTech,
  cvWhyUs,
} from '@/lib/home/computer-vision-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import CapabilityGuide from '@/components/computer-vision/capability-guide';
import ServicesGrid from '@/components/common/services-grid';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';

// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import CaseStudies from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Computer Vision Development Services landing page.
 *
 * Served at `/computer-vision-development-services` — the app owns the domain
 * root (no `basePath`; see next.config.ts and lib/flags.ts). Registered in
 * lib/home/landing-pages.ts, which gates it behind the homepage release flag.
 *
 * A SERVER component on purpose: only a server component may export `metadata`
 * (node_modules/next/dist/docs/.../generate-metadata.md), and the (marketing)
 * layout's own metadata is the homepage's. Every section below is a client
 * component, which a server component may freely render.
 *
 * Fonts, the `.theme-four` token scope and Lenis smooth scroll all come from
 * `app/(marketing)/layout.tsx`, so nothing here re-declares them.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${cvMeta.title} | Soft Suave`,
  description: cvMeta.description,
  alternates: { canonical: cvMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${cvMeta.title} | Soft Suave`,
    description: cvMeta.description,
    url: absoluteUrl(cvMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${cvMeta.title} | Soft Suave`,
    description: cvMeta.description,
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/** FAQPage + Service structured data — this page's answers are its SEO surface. */

/**
 * This page's JSON-LD, from the shared builder.
 *
 * It replaces a hand-written `Service` whose `provider` was an inline
 * `{'@type': 'Organization', name: 'Soft Suave'}` — an unidentified company
 * repeated on every page of this surface rather than the canonical one — with
 * no `WebPage` node and nothing joining the Service, the FAQ and the trail.
 * `pageSchemaGraph` emits those `@id`-linked and points provider and publisher
 * at the organization `app/(marketing)/layout.tsx` declares once.
 */
const LD = pageSchemaGraph({
  path: cvMeta.path,
  title: cvMeta.title,
  description: cvMeta.description,
  // Both of these are the SEO sheet's own wording for this page (23 Sep).
  serviceType: 'Custom Computer Vision Software Development and Integration',
  audience:
    'Businesses, operations leaders, product leaders, engineering teams, and enterprise technology teams',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'Computer Vision Development Services',
  breadcrumbName: 'Computer Vision Development Services',
  offerCatalogName: cvServices.title,
  offers: cvServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: cvFaqs.title,
  faqs: cvFaqs.items,
});

export default function ComputerVisionDevelopmentServicesPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.

  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a
       * band is just the wrapper. Hero opens dark and the closing Contact
       * band is dark (it carries its own veiled backdrop); everything between
       * alternates, so the only two-dark run on the page is FAQ → Contact.
       */}
      <main id="main">
        {/* Compact look — the generative-AI page's hero, so the service
            pages read as a matched set. */}
        <Hero content={cvHero} idPrefix="cv" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        {/* The overview's H2 introduces both the prose and the five workflow
            stages below it, so the stages render headless rather than
            opening a second section with a duplicate heading. */}
        <Overview content={cvOverview} variant="compact" />
        <Process content={cvPipeline} id="pipeline" variant="stages" />

        <div className={home.light}>
          <CapabilityGuide content={cvCapabilities} />
        </div>

        {/* Every service on screen at once, each card wearing its own
            artwork in its top corner — the GCC page's feature card. */}
        <ServicesGrid content={cvServices} />

        <div className={home.light}>
          <Industries content={cvIndustries} />
        </div>

        <CtaBand content={cvSetupCta} />

        <div className={home.light}>
          {/* Seven steps stay four across (four then three balances better
              than five then two); `even` just levels the card bottoms and
              drops the justified body copy. */}
          <Process content={cvProcess} variant="even" />
        </div>

        <WhyUs content={cvWhyUs} />

        {/* Static bordered group panels, not the homepage's marquee rows:
            thirteen categories of two or three tools each would leave every
            marquee nearly empty. Ahead of the case studies, per the Sep 23
            review: the stack answers "can you build it" before the proof. */}
        <TechStack content={cvTech} />

        {/* Homepage case-study gallery, on the warm-white band as it is there. */}
        <div className={home.light}>
          <CaseStudies />
        </div>

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={cvFaqs} idPrefix="cv-faq" />

        {/* The homepage's closing CTA, on its default /contact destination —
            the review sheet asked for the CTA buttons to lead to the contact
            page rather than back up to the hero's enquiry form. */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
