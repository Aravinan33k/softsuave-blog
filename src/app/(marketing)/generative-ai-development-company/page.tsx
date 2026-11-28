import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { aiPageJsonLd, softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { meta } from '@/lib/home/generative-ai';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';
import Industries from '@/components/generative-ai/industries';

import styles from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

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

/**
 * The page's OG image — the hero artwork cropped to 1200×630, served from the
 * exact path the approved schema spec names, so the Service `image`, the
 * WebPage `primaryImageOfPage` and the og:image are one file.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/generative-ai-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Generative AI Development Company - Soft Suave',
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

/**
 * Service + WebPage + FAQPage, from the approved SEO spec
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
    <div className={`${styles.page} ${location.submitBlack}`}>
      {/* The spec's four blocks are this page's entire structured data:
          Organization (verbatim — no Facebook profile, unlike the site-wide
          node) + Service, WebPage, FAQPage. The layout adds nothing here, not
          even its WebSite, and the footer's PostalAddress microdata is off —
          see PAGES_WITH_OWN_SITE_GRAPH. */}
      <JsonLd data={softSuaveOrganizationLd} />
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
        <Sections
          industries={<Industries cardLinks />}
          techStack={<TechStack />}
        />
      </main>
      <Footer addressMicrodata={false} />
    </div>
  );
}
