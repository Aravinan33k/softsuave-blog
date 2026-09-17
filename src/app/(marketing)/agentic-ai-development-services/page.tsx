import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { aiPageJsonLd } from '@/lib/seo/ai-page-schema';
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
import CaseStudies from '@/components/home/work-grid';
import TechStack from '@/components/generative-ai/tech-stack';
import Faq from '@/components/generative-ai/faq';
import Contact from '@/components/home/contact';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

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
/** Organization + Service + WebPage + FAQPage, from the approved SEO spec. */
const pageLd = aiPageJsonLd('agenticAi');

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
      <JsonLd data={[...pageLd, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav />
      <main id="main">
        <Hero content={heroContent} idPrefix="agentic" />

        {/* Review: "Our Clients missing" — the homepage's logo carousel. */}
        <div className={styles.light}>
          <Clients />
        </div>


        {/* One inverted band, mirroring the homepage's single light section —
            it carries the two reading-heavy blocks. */}
        <div className={styles.light}>
          <Overview content={overviewContent} />
          <Comparison content={comparisonContent} />
        </div>

        <Services content={servicesContent} />
        <Industries content={applicationsContent} id="applications" />
        <CtaBand content={midCtaContent} />

        <div className={styles.light}>
          <Process content={processContent} />
          <Industries content={industriesContent} id="industries" />
        </div>

        <WhyUs content={whyUsContent} />

        <div className={styles.light}>
          <CaseStudies />
        </div>

        <TechStack content={techStackContent} />

        {/* Client stories and the FAQ close on the warm-white band, the same
            bookend as the homepage and the sibling landing pages. */}
        <div className={styles.light}>
          <Testimonials />
          <Faq content={faqContent} />
        </div>

        <Contact />
      </main>
      <Footer />
    </div>
  );
}
