import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { homepageEnabled } from '@/lib/flags';
import { faq, meta } from '@/lib/home/generative-ai';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
// Case studies, technology stack and the closing CTA still read their copy from
// `lib/home/content.ts` — one source of truth per section — but render in this
// surface's own layouts rather than the homepage's gallery / marquees / pinned
// focus-pull, so no band on this page repeats a look the homepage owns.
import CaseStudies from '@/components/generative-ai/case-studies';
import TechStack from '@/components/generative-ai/tech-stack';
import FinalCta from '@/components/generative-ai/final-cta';

import Hero from '@/components/generative-ai/hero';
import Clients from '@/components/generative-ai/clients';
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
        <Clients />

        {/* One inverted band, mirroring the homepage's single light section —
            it carries the two reading-heavy blocks. */}
        <div className={styles.light}>
          <Overview />
          <Problems />
        </div>

        <Services />
        <CtaBand />
        <Integration />
        <Process />
        <Industries />
        <WhyUs />

        <CaseStudies />
        <TechStack />

        <Faq />

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
