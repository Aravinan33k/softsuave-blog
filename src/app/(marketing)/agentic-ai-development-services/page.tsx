import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { aiPageJsonLd, softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import {
  meta,
  applications as applicationsContent,
  industries as industriesContent,
  techStack as techStackContent,
} from '@/lib/home/agentic-ai';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Industries from '@/components/generative-ai/industries';
import TechStack from '@/components/generative-ai/tech-stack';

import styles from '@/components/home/home.module.css';
import { pageRobots } from '@/lib/flags';
import Sections from './sections';

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

/**
 * The page's OG image — the hero artwork cropped to 1200×630, served from the
 * exact path the approved schema spec names, so the Service `image`, the
 * WebPage `primaryImageOfPage` and the og:image are one file.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/agentic-ai-development-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Agentic AI Development Services by Soft Suave',
};

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.path },
  robots: pageRobots,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: absoluteUrl(meta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
    images: [OG_IMAGE.url],
  },
};

/** Service + WebPage + FAQPage, from the approved SEO spec. */
const pageLd = aiPageJsonLd('agenticAi');

export default function AgenticAiDevelopmentServicesPage() {
  return (
    <div className={styles.page}>
      {/* The spec's four blocks are this page's entire structured data:
          Organization (verbatim — no Facebook profile, unlike the site-wide
          node) + Service, WebPage, FAQPage. The layout adds nothing here, not
          even its WebSite, and the footer's PostalAddress microdata is off —
          see PAGES_WITH_OWN_SITE_GRAPH. */}
      <JsonLd data={softSuaveOrganizationLd} />
      <JsonLd data={pageLd} />
      <Nav />
      <main id="main">
        <Sections
          industries={<Industries content={applicationsContent} id="applications" />}
          industries2={<Industries content={industriesContent} id="industries" cardLinks />}
          techStack={<TechStack content={techStackContent} />}
        />
      </main>
      <Footer addressMicrodata={false} />
    </div>
  );
}
