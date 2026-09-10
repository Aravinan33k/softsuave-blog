import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { homepageEnabled } from '@/lib/flags';
import {
  meta,
  hero as heroContent,
  overview as overviewContent,
  comparison as comparisonContent,
  services as servicesContent,
  applications as applicationsContent,
  midCta as midCtaContent,
  process as processContent,
  industries as industriesContent,
  whyUs as whyUsContent,
  techStack as techStackContent,
  faq as faqContent,
} from '@/lib/home/agentic-ai';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Every band below is a landing-page section component shared with the
// Generative AI page. Each takes its copy as a prop and defaults to that page's
// content, so both pages render from one implementation and neither repeats a
// look the homepage owns. Case studies and the closing CTA still read their copy
// from `lib/home/content.ts` — one source of truth per section.
import Hero from '@/components/generative-ai/hero';
import Overview from '@/components/generative-ai/overview';
import Comparison from '@/components/generative-ai/comparison';
import Services from '@/components/generative-ai/services';
import CtaBand from '@/components/generative-ai/cta-band';
import Process from '@/components/generative-ai/process';
import Industries from '@/components/generative-ai/industries';
import WhyUs from '@/components/generative-ai/why-us';
import CaseStudies from '@/components/generative-ai/case-studies';
import TechStack from '@/components/generative-ai/tech-stack';
import Faq from '@/components/generative-ai/faq';
import FinalCta from '@/components/generative-ai/final-cta';

import styles from '@/components/home/home.module.css';

/**
 * Custom Agentic AI Development Services landing page.
 *
 * A server component so the page can own its own `metadata` and emit JSON-LD;
 * the animated sections underneath are the client components. The surrounding
 * `(marketing)` layout supplies the display fonts, the `.theme-four` tokens and
 * the Lenis `ScrollProvider`, exactly as it does for the homepage and the
 * Generative AI page.
 *
 * Note on the public URL: this app is mounted at `basePath: '/blog'`
 * (next.config.ts), so the route resolves at `/blog/agentic-ai-development-services`
 * in this deployment. Serving it at the bare `/agentic-ai-development-services/`
 * is a reverse-proxy change, not a code change.
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
  mainEntity: faqContent.items.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
};

const serviceLd = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Agentic AI Development Services',
  serviceType: 'Agentic AI development',
  description: meta.description,
  url: absoluteUrl(meta.path),
  provider: {
    '@type': 'Organization',
    name: 'Soft Suave',
    url: 'https://www.softsuave.com',
  },
  areaServed: 'Worldwide',
};

export default function AgenticAiDevelopmentServicesPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Agentic AI Development Services', path: meta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={styles.page}>
      <JsonLd data={[serviceLd, faqLd, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav />
      <main id="main">
        <Hero content={heroContent} idPrefix="agentic" />


        {/* One inverted band, mirroring the homepage's single light section —
            it carries the two reading-heavy blocks. */}
        <div className={styles.light}>
          <Overview content={overviewContent} />
          <Comparison content={comparisonContent} />
        </div>

        <Services content={servicesContent} />
        <Industries content={applicationsContent} id="applications" />
        <CtaBand content={midCtaContent} />
        <Process content={processContent} />
        <Industries content={industriesContent} id="industries" />
        <WhyUs content={whyUsContent} />

        <CaseStudies />
        <TechStack content={techStackContent} />

        <Faq content={faqContent} />

        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
