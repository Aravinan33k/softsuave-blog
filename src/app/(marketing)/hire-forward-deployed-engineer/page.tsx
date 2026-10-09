import type { Metadata } from 'next';

import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import {
  brandName,
  buildJsonLd,
  faqSchema,
  ogImagePath,
  organizationSchema,
  pagePath,
  serviceSchema,
  siteDescription,
  siteTitle,
  websiteSchema,
} from '@/lib/fde/seo';
import { fdeFontVariables } from '@/lib/fde/fonts';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import { Hero } from '@/components/fde/sections/Hero';
import { TrustedBy } from '@/components/fde/sections/TrustedBy';
import { ModelPartners } from '@/components/fde/sections/ModelPartners';
import { Comparison } from '@/components/fde/sections/Comparison';
import { EngagementModels } from '@/components/fde/sections/EngagementModels';
import { Protocol } from '@/components/fde/sections/Protocol';
import { WhyFde } from '@/components/fde/sections/WhyFde';
import { CtaBanner } from '@/components/fde/sections/CtaBanner';
import { Testimonials } from '@/components/fde/sections/Testimonials';
import { Faq } from '@/components/fde/sections/Faq';

import home from '@/components/home/home.module.css';
import '@/components/fde/fde.css';

/**
 * Hire Forward Deployed Engineers.
 *
 * The page body is the Forward Deployed Engineers page built as its own app
 * (Next + Tailwind, light design), ported into `components/fde` and
 * `lib/fde`: same sections, order, copy and classes. Only the site's own
 * header and footer replace that app's, so it sits inside the site like every
 * other page. Its design tokens are scoped to the `.fde` wrapper
 * (`components/fde/fde.css`), so nothing here restyles another page.
 *
 * The standalone page also rendered a "Deployment Units" section and a "CEO
 * Corner", both commented out there, so neither is ported.
 *
 * SEO is that app's too (`lib/fde/seo.ts`): title, description, noindex, and
 * the Organization/WebSite + Service/FAQPage graphs, the FAQ built from the
 * rendered questions. Canonical and URLs are this app's route.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

const ogImage = ogImageUrl(ogImagePath);

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: siteTitle,
  description: siteDescription,
  keywords: [
    'forward deployed engineers',
    'hire forward deployed engineers',
    'FDE team',
    'forward deployed engineering',
    'AI implementation partner',
    'AI agent deployment',
    'dedicated development team',
    'embedded engineering team',
  ],
  alternates: { canonical: pagePath },
  // As the page's own build sets it.
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  openGraph: {
    type: 'website',
    siteName: brandName,
    url: absoluteUrl(pagePath),
    title: siteTitle,
    description: siteDescription,
    locale: 'en_US',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: `${brandName} — Forward Deployed Engineers who ship production code`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    creator: '@softsuave',
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function HireForwardDeployedEngineerPage() {
  return (
    <div className={home.page}>
      {/* Site-wide identity nodes, then the page's own — as the page's build
          emitted them (layout, then page). */}
      <JsonLd data={buildJsonLd([organizationSchema, websiteSchema])} />
      <JsonLd data={buildJsonLd([serviceSchema, faqSchema])} />

      <Nav logoHref={HOME_HREF} />

      {/* `data-nav-tone="light"`: the page is a light design, so the site
          header takes its white ground while scrolling over it — the one
          dark section opts back to the black bar (EngagementModels). */}
      <main id="main" className={`fde ${fdeFontVariables}`} data-nav-tone="light">
        <Hero />
        <TrustedBy />
        <ModelPartners />
        <Comparison />
        <EngagementModels />
        <Protocol />
        <WhyFde />
        <CtaBanner />
        <Testimonials />
        <Faq />
      </main>

      <Footer />
    </div>
  );
}
