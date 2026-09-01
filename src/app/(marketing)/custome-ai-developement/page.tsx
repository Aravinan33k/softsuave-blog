import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import {
  caApproachCta,
  caCaseStudies,
  caEstimateCta,
  caFaqs,
  caFinalCta,
  caHero,
  caIndustries,
  caMeta,
  caOfferings,
  caOverview,
  caProcess,
  caTech,
  caTestimonials,
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
import Testimonials from '@/components/landing/testimonials';
import Faq from '@/components/landing/faq';
import FinalCta from '@/components/landing/final-cta';

// Page-specific sections: the proof band with its logo rail, and the
// custom-vs-off-the-shelf comparison.
import Clients from '@/components/custom-ai/clients';
import Comparison from '@/components/custom-ai/comparison';

import home from '@/components/home/home.module.css';

/**
 * Custom AI Development Services landing page.
 *
 * Public URL depends on the mount: `basePath` is '/blog' in production and ''
 * in local dev (next.config.ts / lib/flags.ts), so this route serves at
 * `https://www.softsuave.com/blog/custome-ai-developement` in production and at
 * `http://localhost:3100/custome-ai-developement` locally.
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

const PAGE_CTA = { label: 'Book AI Strategy Call', href: '#enquiry' } as const;

/** FAQPage + Service structured data — this page's answers are its SEO surface. */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: caFaqs.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof f.a === 'string' ? f.a : f.a.join(' '),
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: caMeta.title,
    description: caMeta.description,
    provider: { '@type': 'Organization', name: 'Soft Suave' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: caOfferings.title,
      itemListElement: caOfferings.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function CustomAiDevelopmentPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={caHero} idPrefix="custom-ai" />
        <Clients />

        <div className={home.light}>
          <Overview content={caOverview} />
        </div>

        <Services content={caOfferings} />
        <Comparison />

        <CtaBand content={caApproachCta} />

        <WhyUs content={caWhyUs} />
        <Process content={caProcess} />

        <CtaBand content={caEstimateCta} />

        <div className={home.light}>
          <Industries content={caIndustries} />
        </div>

        <CaseStudies content={caCaseStudies} />
        <TechStack content={caTech} />

        <div className={home.light}>
          <Testimonials content={caTestimonials} />
        </div>

        <Faq content={caFaqs} idPrefix="custom-ai-faq" />
        <FinalCta content={caFinalCta} />
      </main>

      <Footer />
    </div>
  );
}
