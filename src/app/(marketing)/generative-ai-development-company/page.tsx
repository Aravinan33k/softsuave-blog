import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { aiPageJsonLd } from '@/lib/seo/ai-page-schema';
import { BASE_PATH } from '@/lib/flags';
import { meta, services as servicesContent } from '@/lib/home/generative-ai';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
// The closing CTA still reads its copy from `lib/home/content.ts` — one
// source of truth per section — but renders in this surface's own layout
// rather than the homepage's pinned focus-pull, so it doesn't repeat a look
// the homepage owns. Case studies and the tech stack are the exception: their
// content here is the homepage's own, verbatim, so they render with the
// homepage's actual components rather than a second implementation of the
// same section.
import CaseStudies from '@/components/home/work-grid';
import TechStack from '@/components/home/tech-stack';
import Contact from '@/components/home/contact';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/generative-ai/hero';
import Overview from '@/components/generative-ai/overview';
import Problems from '@/components/generative-ai/problems';
import ServicesGrid from '@/components/common/services-grid';
import CtaBand from '@/components/generative-ai/cta-band';
import Integration from '@/components/generative-ai/integration';
import Process from '@/components/generative-ai/process';
import Industries from '@/components/generative-ai/industries';
import WhyUs from '@/components/generative-ai/why-us';
import Faq from '@/components/generative-ai/faq';

import styles from '@/components/home/home.module.css';

/**
 * Generative AI Development Company landing page.
 *
 * A server component so the page can own its own `metadata` and emit JSON-LD;
 * the animated sections underneath are the client components. The surrounding
 * `(marketing)` layout supplies the display fonts, the `.theme-four` tokens and
 * the Lenis `ScrollProvider`, exactly as it does for the homepage.
 *
 * Note on the public URL: this app is mounted at `basePath: '/blog'`
 * (next.config.ts), so the route resolves at `/blog/generative-ai-development-company`
 * in this deployment. Serving it at the bare `/generative-ai-development-company/`
 * requested in the brief is a reverse-proxy change, not a code change.
 */

// Matches the homepage/marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: absoluteUrl(meta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

/** FAQPage schema, built from the same data the accordion renders. */
/**
 * Organization + Service + WebPage + FAQPage, from the approved SEO spec
 * (`lib/seo/ai-page-schema.ts`). It replaces the hand-rolled Service and
 * FAQPage this page used to build from its own content: the approved set is
 * richer (offer catalogue, audience, primary image, publisher `@id`) and its
 * nodes cross-reference each other, which a per-page literal cannot do.
 */
const pageLd = aiPageJsonLd('generativeAi');

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so
 *  it needs the already-public path. */
const HOME_HREF = BASE_PATH || '/';

export default function GenerativeAiDevelopmentCompanyPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={pageLd} />
      {/* This page owns both of the bar's anchor sections itself — `Services`
          renders #services and `WhyUs` renders #why — so the bar scrolls in-page
          instead of sending the reader to the homepage's copies. Without this
          those two links leave the page, and both also drop out of the bar's
          active-section highlight, which only tracks `#` hrefs.

          `logoHref` is stated because `ownsAnchors` also keeps the logo's
          default `#top` in-page, and the lockup must go HOME from a sub-page
          rather than scroll to the top of this one. */}
      <Nav ownsAnchors logoHref={HOME_HREF} />
      <main id="main">
        <Hero />

        {/* The homepage's client logo carousel — this page had no proof band
            between the hero and the overview at all. */}
        <div className={styles.light}>
          <Clients />
        </div>

        {/* Band rhythm. The marketing surface alternates dark and inverted
            sections so a long page breathes; with a single light band up top,
            everything from Services down ran as one unbroken near-black slab.
            Sections are grouped two or three to a band rather than flipped one
            by one, which would strobe. Both CTA panels and the hero stay dark:
            they are the page's punctuation and want the deepest ground. */}
        <div className={styles.light}>
          <Overview />
          <Problems />
        </div>

        {/* Every service on screen at once, each card wearing its own
            artwork in its top corner — the GCC page's feature card. The
            centre-focused carousel this replaces showed three of ten behind a
            timer, which put the page's actual offering behind an interaction. */}
        <ServicesGrid content={servicesContent} />
        <CtaBand />

        <div className={styles.light}>
          <Integration />
          <Process />
        </div>

        <Industries />

        <div className={styles.light}>
          <WhyUs />
        </div>

        <CaseStudies />

        {/* Dark, not wrapped in `.light` — on the homepage TechStack renders
            between Awards and the light Testimonials band, i.e. on the dark
            ground, and this page follows that so both pages' tech-stack
            sections carry the same background instead of this one going
            cream. `.techCompact` is unrelated to that: it only clears the
            homepage's full-viewport `min-height` for this content-height
            page, not a color concern. */}
        <div className={styles.techCompact}>
          <TechStack />
        </div>

        {/* Client stories and the FAQ close the page on the warm-white
            band, mirroring the homepage's stories → Contact bookend. */}
        <div className={styles.light}>
          <Testimonials />
          <Faq />
        </div>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
