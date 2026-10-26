import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { aiPageJsonLd, softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
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

/**
 * The page's OG image — the hero artwork cropped to 1200×630, served from the
 * exact path the approved schema spec names, so the Service `image`, the
 * WebPage `primaryImageOfPage` and the og:image are one file.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/rag-development-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'RAG Development Services and Document AI Solutions by Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${ragMeta.title} | Soft Suave`,
  description: ragMeta.description,
  alternates: { canonical: ragMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${ragMeta.title} | Soft Suave`,
    description: ragMeta.description,
    url: absoluteUrl(ragMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${ragMeta.title} | Soft Suave`,
    description: ragMeta.description,
    images: [OG_IMAGE.url],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

/**
 * Service + WebPage + FAQPage, from the approved SEO spec
 * (`lib/seo/ai-page-schema.ts`). It replaces the graph this page used to build
 * from its own content with `pageSchemaGraph`: the approved set is the page's
 * exact structured data.
 */
const LD = aiPageJsonLd('ragDocumentAi');

export default function RagDocumentAiServicePage() {
  return (
    <div className={home.page}>
      {/* The spec's four blocks are this page's entire structured data:
          Organization (verbatim — no Facebook profile, unlike the site-wide
          node) + Service, WebPage, FAQPage. The layout adds nothing here, not
          even its WebSite, and the footer's PostalAddress microdata is off —
          see PAGES_WITH_OWN_SITE_GRAPH. */}
      <JsonLd data={softSuaveOrganizationLd} />
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

        {/* All four paragraphs shown in full: the "View more / View less"
            clamp is gone (1 Oct review: "remove the View More and View Less
            options in this section"). */}
        <Overview content={ragOverview} variant="compact" />

        <div className={home.light}>
          {/* Every service on screen at once, each card wearing its own
              artwork in its top corner — the GCC page's feature card. */}
          <ServicesGrid content={ragServices} />
        </div>

        {/* Same bordered card grid as Industries, filled with use cases —
            three across (1 Oct review: "we can try 3x2 alignments"), so the
            five cards sit 3 + 2 instead of 4 + 1. */}
        <Industries content={ragUseCases} id="use-cases" columns={3} />

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
            only clears the homepage's full-viewport min-height.
            `loopShortRows`: rows of five (Evaluation & Monitoring,
            Infrastructure) fit a wide screen and held still while the longer
            rows scrolled (7 Oct review: "the technologies under 'Evaluation &
            Monitoring' are not scrolling"). */}
        <div className={home.techCompact}>
          <TechStack content={ragTech} loopShortRows />
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

      <Footer addressMicrodata={false} />
    </div>
  );
}
