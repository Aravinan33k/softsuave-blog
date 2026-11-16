import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import {
  anthropicFaqLd,
  anthropicServiceLd,
  anthropicWebPageLd,
} from '@/lib/seo/hire-anthropic-developers';
import { anthropicMeta, anthropicTech } from '@/lib/home/anthropic-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Hire Anthropic Developers landing page.
 *
 * A clone of `/vuejs-development-company`: same sections, same order, same
 * bands — only the copy (`lib/home/anthropic-content.ts`) and the structured
 * data (`lib/seo/hire-anthropic-developers.ts`) differ. No breadcrumb, as on
 * the Vue page. Registered in lib/home/landing-pages.ts, which gates it behind
 * the homepage release flag.
 *
 * A SERVER component on purpose: only a server component may export
 * `metadata`, and the (marketing) layout's own metadata is the homepage's.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

// PLACEHOLDER: a copy of the Vue page's OG image until real artwork replaces it.
const ogImage = absoluteUrl('/assets/images/hire-anthropic-developers-og.webp');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${anthropicMeta.title} | Soft Suave`,
  description: anthropicMeta.description,
  alternates: { canonical: anthropicMeta.path },
  // Always noindex, nofollow (SEO page sheet, row 185).
  robots: { index: false, follow: false },
  openGraph: {
    title: `${anthropicMeta.title} | Soft Suave`,
    description: anthropicMeta.description,
    url: absoluteUrl(anthropicMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: anthropicMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${anthropicMeta.title} | Soft Suave`,
    description: anthropicMeta.description,
    images: [ogImage],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function HireAnthropicDevelopersPage() {
  return (
    <div className={home.page}>
      <JsonLd data={softSuaveOrganizationLd} />
      <JsonLd data={[anthropicServiceLd, anthropicWebPageLd, anthropicFaqLd]} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections
          techStack={<TechStack content={anthropicTech} staticFrom={768} />}
        />
      </main>

      <Footer addressMicrodata={false} />
    </div>
  );
}
