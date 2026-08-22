import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { homepageEnabled } from '@/lib/flags';
import { faq, meta } from '@/lib/home/generative-ai';

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
import FinalCta from '@/components/generative-ai/final-cta';

import Hero from '@/components/generative-ai/hero';
import Overview from '@/components/generative-ai/overview';
import Problems from '@/components/generative-ai/problems';
import Services from '@/components/generative-ai/services';
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
const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Generative AI Development Services',
  serviceType: 'Generative AI development',
  description: meta.description,
  url: absoluteUrl(meta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
};

export default function GenerativeAiDevelopmentCompanyPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Generative AI Development Company', path: meta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={styles.page}>
      <JsonLd data={[serviceLd, faqLd, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav />
      <main id="main">
        <Hero />

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

        <Services />
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

        <div className={styles.light}>
          <Faq />
        </div>

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
