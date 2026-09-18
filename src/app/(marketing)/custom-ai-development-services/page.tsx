import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { aiPageJsonLd } from '@/lib/seo/ai-page-schema';
import { absoluteUrl } from '@/lib/seo/metadata';
import {
  caApproachCta,
  caCaseStudies,
  caEstimateCta,
  caFaqs,
  caHero,
  caIndustries,
  caMeta,
  caOfferings,
  caOverview,
  caProcess,
  caTech,
  caWhyUs,
} from '@/lib/home/custom-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface. Same components the generative-AI page uses —
// its own design language (bordered panels and grids) over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Process from '@/components/landing/process';
import Industries from '@/components/landing/industries';
import CaseStudies from '@/components/landing/case-studies';
import TechStack from '@/components/landing/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Faq from '@/components/landing/faq';
import Contact from '@/components/home/contact';

// The homepage's own client logo carousel — this page used to show a
// stats-only panel with no logos in it.
import Clients from '@/components/home/clients';

// Page-specific section: the custom-vs-off-the-shelf comparison.
import Comparison from '@/components/custom-ai/comparison';

import home from '@/components/home/home.module.css';

/**
 * Custom AI Development Services landing page.
 *
 * Public URL depends on the mount: `basePath` is '/blog' in production and ''
 * in local dev (next.config.ts / lib/flags.ts), so this route serves at
 * `https://www.softsuave.com/blog/custom-ai-development-services` in production and at
 * `http://localhost:3100/custom-ai-development-services` locally.
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
  title: `${caMeta.title} | Soft Suave`,
  description: caMeta.description,
  alternates: { canonical: caMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${caMeta.title} | Soft Suave`,
    description: caMeta.description,
    url: absoluteUrl(caMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 * needs the already-public path. `BASE_PATH` is '' in local dev and '/blog' in
 * production — hence the fallback, without which dev would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/** Nav for this page: its own section anchors, plus real routes out. */
const PAGE_NAV = [
  // "/" goes through next/link, which DOES apply basePath, so it resolves to
  // the marketing homepage under either mount.
  { label: 'Home', href: '/' },
  { label: 'AI Services', href: '#services' },
  { label: 'Compare', href: '#comparison' },
  { label: 'Why Soft Suave', href: '#why' },
  { label: 'Process', href: '#journey' },
  { label: 'Industries', href: '#industries' },
  { label: 'Case Studies', href: '#work' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Book AI Strategy Call', href: '/contact' } as const;

/**
 * Organization + Service + WebPage + FAQPage, from the approved SEO spec
 * (`lib/seo/ai-page-schema.ts`).
 *
 * This replaces the FAQPage and Service this page used to derive from its own
 * content objects. The approved Service carries an offer catalogue whose
 * entries link out to the sibling service pages by `@id` — Generative AI,
 * Agentic AI, RAG & Document AI, Computer Vision, Predictive Intelligence —
 * which is the hub relationship this page is meant to express and which a
 * catalogue built from `caOfferings` could not state.
 */
const structuredData = aiPageJsonLd('customAi');

export default function CustomAiDevelopmentPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      {/*
       * Dark/light alternates every section (the `home.light` wrapper
       * re-points the same --bg/--surface/--text tokens every component
       * already reads — see the "light band" comment in landing.module.css),
       * same technique the homepage uses for its own light bands. Hero opens
       * dark and FinalCta closes dark, matching the homepage's Hero → …→
       * Contact bookends; everything between strictly alternates so no run of
       * dark sections gets longer than one.
       */}
      <main id="main">
        <Hero content={caHero} idPrefix="custom-ai" />

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={caOverview} />

        <div className={home.light}>
          <Services content={caOfferings} />
        </div>

        <Comparison />

        <div className={home.light}>
          <CtaBand content={caApproachCta} />
        </div>

        <WhyUs content={caWhyUs} />

        <div className={home.light}>
          <Process content={caProcess} />
        </div>

        <CtaBand content={caEstimateCta} />

        <div className={home.light}>
          <Industries content={caIndustries} columns={3} />
        </div>

        <CaseStudies content={caCaseStudies} />

        <div className={home.light}>
          <TechStack content={caTech} />
        </div>

        {/* Client stories and the FAQ share the closing warm-white band, so
            the run reads CaseStudies(dark) → stories + FAQ(light) →
            Contact(dark), the same bookend the homepage uses. */}
        <div className={home.light}>
          <Testimonials />
          <Faq content={caFaqs} idPrefix="custom-ai-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
