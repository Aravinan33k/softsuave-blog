import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
import {
  comprehensiveEcommerceCaseStudy,
  comprehensiveEcommerceMeta,
} from '@/lib/home/case-studies/comprehensive-ecommerce-for-retail';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Comprehensive eCommerce for Retail, rebuilt from
 * https://www.softsuave.com/case-study-comprehensive-ecommerce-for-retail on
 * the case-study template (`components/case-study`). Copy and PDF are the
 * live page's; the layout and type are this site's.
 *
 * Live carries no JSON-LD and no share image (no `og:image`, no Open Graph
 * or Twitter tags at all), so this page emits no JSON-LD and names no image;
 * the route is in PAGES_WITH_OWN_SITE_GRAPH so the layout adds nothing in its
 * place.
 *
 * A SERVER component so it can own its `metadata`. Fonts, the `.theme-four`
 * tokens and Lenis smooth scroll come from `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

const TITLE = comprehensiveEcommerceMeta.title;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: TITLE,
  description: comprehensiveEcommerceMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-comprehensive-ecommerce-for-retail' },
  robots: pageRobots,
  openGraph: {
    title: TITLE,
    description: comprehensiveEcommerceMeta.description,
    url: absoluteUrl(comprehensiveEcommerceMeta.path),
    siteName: 'Soft Suave',
    type: 'article',
  },
  twitter: {
    card: 'summary',
    site: '@softsuave',
    title: TITLE,
    description: comprehensiveEcommerceMeta.description,
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function ComprehensiveEcommerceCaseStudyPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy
          content={comprehensiveEcommerceCaseStudy}
          idPrefix="case-study-comprehensive-ecommerce-for-retail"
        />
      </main>

      <Footer />
    </div>
  );
}
