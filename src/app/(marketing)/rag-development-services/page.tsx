import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  ragComparison,
  ragFaqs,
  ragHero,
  ragIndustries,
  ragMeta,
  ragOverview,
  ragProjectCta,
  ragServices,
  ragTech,
  ragUseCases,
  ragWhyUs,
} from '@/lib/home/rag-document-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesGrid from '@/components/common/services-grid';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Comparison from '@/components/common/comparison';
import WhyUs from '@/components/landing/why-us';
// The homepage's marquee tech stack over this page's own groups — the same
// section the generative-AI page renders, so the two read as a pair.
import TechStack from '@/components/home/tech-stack';
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
 * RAG & Document AI landing page.
 *
 * Served at `/rag-development-services` — the app owns the domain root (no
 * `basePath`; see next.config.ts and lib/flags.ts). Registered in
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
  title: `${ragMeta.title} | Soft Suave`,
  description: ragMeta.description,
  alternates: { canonical: ragMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${ragMeta.title} | Soft Suave`,
    description: ragMeta.description,
    url: absoluteUrl(ragMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ragMeta.title} | Soft Suave`,
    description: ragMeta.description,
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
  path: ragMeta.path,
  title: ragMeta.title,
  description: ragMeta.description,
  serviceType: 'RAG and Document AI development',
  // The page's own short name for what it sells, not its `<title>`, which is
  // written to win the click.
  serviceName: 'RAG & Document AI',
  breadcrumbName: 'RAG & Document AI',
  offerCatalogName: ragServices.title,
  offers: ragServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: ragFaqs.title,
  faqs: ragFaqs.items,
});

export default function RagDocumentAiServicePage() {
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
        {/* Compact look — the generative-AI page's hero, so the two service
            pages read as a matched pair. */}
        <Hero content={ragHero} idPrefix="rag" variant="compact" />

        <div className={home.light}>
          <Clients />
        </div>

        {/* Four paragraphs of definition — clipped to the first few lines
            behind "View more" so the illustration and pull quote stay in
            reach without the reader scrolling past a wall of prose. */}
        <Overview content={ragOverview} variant="compact" clampLines={6} />

        <div className={home.light}>
          {/* Every service on screen at once, each card wearing its own
              artwork in its top corner — the GCC page's feature card. */}
          <ServicesGrid content={ragServices} />
        </div>

        {/* Same bordered card grid as Industries, filled with use cases. */}
        <Industries content={ragUseCases} id="use-cases" />

        <div className={home.light}>
          <CtaBand content={ragProjectCta} />
        </div>

        {/* Decision board — each factor leans a marker toward the approach
            that fits, with a tally of who takes how many. */}
        <Comparison content={ragComparison} />

        <div className={home.light}>
          <Industries content={ragIndustries} />
        </div>

        <WhyUs content={ragWhyUs} />

        {/* Homepage case-study gallery, on the warm-white band as it is there. */}
        <div className={home.light}>
          <CaseStudies />
        </div>

        {/* Dark, as on the homepage and the generative-AI page. `.techCompact`
            only clears the homepage's full-viewport min-height. */}
        <div className={home.techCompact}>
          <TechStack content={ragTech} />
        </div>

        {/* Homepage client stories, on the warm-white band as they are there. */}
        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={ragFaqs} idPrefix="rag-faq" />

        {/* The homepage's closing CTA, on its default /contact destination —
            the review sheet asked for the CTA buttons to lead to the contact
            page rather than back up to the hero's enquiry form. */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
