import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { OFFSHORE_LIVE_LD } from '@/lib/seo/offshore-software-development-company';
import { offIndustries, offMeta, offTech } from '@/lib/home/offshore-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/landing/tech-stack';
// The live page's sector cards — a photo at rest, the description on hover.
import Industries from '@/components/generative-ai/industries';

import home from '@/components/home/home.module.css';
import genAi from '@/components/generative-ai/gen-ai.module.css';
import landing from '@/components/landing/landing.module.css';
import location from '@/components/landing/location-app-page.module.css';
// Section heads set like /ad/remote-developers' "Our Clients" (`halfHeads`).
import ad from '@/components/ad/ad.module.css';
import Sections from './sections';

/**
 * Offshore Software Development Company landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/offshore-content.ts`). Bands alternate so no two dark sections sit
 * together: the services and engagement models share one light band so the
 * always-dark CTA band can follow them, and testimonials and the FAQ share the
 * light band ahead of the dark closing enquiry.
 */

export const revalidate = 300;

/**
 * The page's link-preview image: softsuave.com's own share card for this
 * page (1200x628), set to the exact 1200x630 the large preview uses
 * (review: "add the Social Share Preview image").
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/offshore-software-development-company-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Offshore Software Development Company - Soft Suave',
};

// The live page's own <title>, verbatim — it already ends "| Soft Suave".
export const metadata: Metadata = {
  title: offMeta.title,
  description: offMeta.description,
  alternates: { canonical: offMeta.path },
  robots: pageRobots,
  openGraph: {
    title: offMeta.title,
    description: offMeta.description,
    url: absoluteUrl(offMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: offMeta.title,
    description: offMeta.description,
    images: [OG_IMAGE.url],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function OffshoreSoftwareDevelopmentPage() {
  return (
    <div className={`${home.page} ${location.submitBlack} ${ad.halfHeads} ${ad.stackHeads} ${landing.stackedHeads} ${genAi.stackedHeads} ${home.stackedHeads}`}>
      {/* softsuave.com's own schema for this page, verbatim, one <script> per
          block — see `lib/seo/offshore-software-development-company.ts`. */}
      {OFFSHORE_LIVE_LD.map((block, i) => (
        <JsonLd key={i} data={block} />
      ))}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections
          industries={<Industries content={offIndustries} links={false} />}
          techStack={<TechStack content={offTech} />}
        />
      </main>

      <Footer />
    </div>
  );
}
