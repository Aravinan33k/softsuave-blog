import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { ITO_LIVE_LD } from '@/lib/seo/it-outsourcing-company-india';
import {
  itoCaseStudies,
  itoCollaboration,
  itoDestinations,
  itoDestinationsNotes,
  itoFaqs,
  itoFit,
  itoHero,
  itoIndustries,
  itoMeta,
  itoMidCta,
  itoModels,
  itoOverview,
  itoProcess,
  itoServices,
  itoServicesCta,
  itoTech,
  itoWhyUs,
} from '@/lib/home/it-outsourcing-content';
import { linkify } from '@/components/common/linkify';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components: the case-study lane
// (with this page's own stories), testimonials and the closing enquiry band.
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import Comparison from '@/components/landing/comparison';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

/**
 * IT Outsourcing Company in India landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/it-outsourcing-content.ts`). Bands alternate light/dark so no two
 * dark sections sit together; testimonials and the FAQ share one light band
 * ahead of the dark closing enquiry section.
 *
 * Slug note: the mega menu (`lib/home/nav-menu.ts`) previously pointed at
 * `/it-outsourcing-services`. The live page this replaces is published at
 * `/it-outsourcing-company-india`, so that is the canonical slug here and the
 * menu entry was corrected to match rather than the other way round — changing
 * the slug would have orphaned the existing page's search equity.
 */

export const revalidate = 300;

/**
 * The page's link-preview image: softsuave.com's own share card rebuilt at
 * 1200x630 — live's is 840x439, too small for the large preview — with the
 * same logo-and-title layout over a globe-network photograph (review: "add
 * the Social Share Preview image").
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/it-outsourcing-company-india-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Top IT Outsourcing Company in India - Soft Suave',
};

// The live page's own <title>, verbatim — it already ends "| Soft Suave".
export const metadata: Metadata = {
  title: itoMeta.title,
  description: itoMeta.description,
  alternates: { canonical: itoMeta.path },
  robots: pageRobots,
  openGraph: {
    title: itoMeta.title,
    description: itoMeta.description,
    url: absoluteUrl(itoMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: itoMeta.title,
    description: itoMeta.description,
    images: [OG_IMAGE.url],
  },
};

const HOME_HREF = BASE_PATH || '/';


/**
 * The live services section closes on a line and a "Contact us" button; the
 * shared `Services` grid has no footer slot, so the row sits directly under it
 * as its own block in the same band.
 */
function ServicesCta() {
  return (
    <div className={landing.sectionShell}>
      <div className={landing.overviewCtaCenter}>
        <p style={{ margin: '0 0 18px', fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-bright)' }}>
          {itoServicesCta.line}
        </p>
        <a href={itoServicesCta.cta.href} className={`${landing.btn} ${landing.btnPrimary}`}>
          {itoServicesCta.cta.label}
        </a>
      </div>
    </div>
  );
}

/**
 * The three paragraphs the live comparison runs under its table. `Comparison`
 * carries a single closing note only, so they render here, in the same band.
 */
function DestinationsNotes() {
  const used = new Set<string>();
  return (
    <div className={landing.sectionShell}>
      <div className={landing.prose}>
        {itoDestinationsNotes.paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{linkify(p, itoDestinationsNotes.links, used, landing.proseLink)}</p>
        ))}
      </div>
    </div>
  );
}

export default function ItOutsourcingCompanyIndiaPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim, one <script> per
          block — see `lib/seo/it-outsourcing-company-india.ts`. */}
      {ITO_LIVE_LD.map((block, i) => (
        <JsonLd key={i} data={block} />
      ))}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={itoHero} idPrefix="it-outsourcing" />

        <div className={home.light}>
          <Overview content={itoOverview} />
        </div>

        {/* Whole cards link (review: "remove the 'Learn More' and make the
            whole card clickable"). */}
        <Services content={itoServices} variant="bold" cardLinks />
        <ServicesCta />

        <div className={home.light}>
          <Overview content={itoFit} id="fit" />
        </div>

        <Comparison content={itoDestinations} id="destinations" />
        <DestinationsNotes />

        <div className={home.light}>
          <Comparison content={itoModels} id="models" />
        </div>

        <CtaBand content={itoMidCta} />

        <div className={home.light}>
          <Process content={itoProcess} />
        </div>

        <Overview content={itoCollaboration} id="collaboration" />

        <div className={home.light}>
          <CardGrid content={itoIndustries} id="industries" variant="feature" />
        </div>

        <CardGrid content={itoWhyUs} id="why" variant="feature" />

        <div className={home.light}>
          <TechStack content={itoTech} />
        </div>

        <WorkGrid content={itoCaseStudies} id="results" countLabel="success stories" />

        <div className={home.light}>
          <Testimonials />
          <Faq content={itoFaqs} idPrefix="it-outsourcing-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
