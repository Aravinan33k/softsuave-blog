import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import { telecomFaqs, telecomMeta, telecomSolutions } from '@/lib/home/telecom-ai-content';
import { industryTechApproach } from '@/lib/home/industry-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';
import Sections from './sections';

/**
 * Telecom AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/telecom-ai-content.ts`). Bands alternate so no two dark sections
 * sit together: technology and success stories share one light band, and
 * testimonials and FAQ another, either side of the dark consultation band, so
 * the FAQ sits light ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it already carries the brand, so no
// suffix is added.
export const metadata: Metadata = {
  title: telecomMeta.title,
  description: telecomMeta.description,
  alternates: { canonical: telecomMeta.path },
  robots: pageRobots,
  openGraph: {
    title: telecomMeta.title,
    description: telecomMeta.description,
    url: absoluteUrl(telecomMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(telecomMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: telecomMeta.title,
    description: telecomMeta.description,
    images: [dynamicOgImage(telecomMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own AI solutions list), `WebPage` and `FAQPage` (the page's own FAQs),
 * `@id`-linked to the organization `app/(marketing)/layout.tsx` declares once.
 * Built from the same content the page renders, so the schema can never drift
 * from what a visitor reads.
 *
 * `webPageName` is the live title as it stands: it already carries the brand,
 * so the builder's default " | Soft Suave" suffix would double it.
 */
const LD = pageSchemaGraph({
  path: telecomMeta.path,
  title: telecomMeta.title,
  webPageName: telecomMeta.title,
  description: telecomMeta.description,
  serviceType: 'Telecom AI development services',
  offerCatalogName: telecomSolutions.title,
  offers: telecomSolutions.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: telecomFaqs.title,
  faqs: telecomFaqs.items,
});

export default function TelecomAiSolutionsPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections
          techStack={<TechStack content={industryTechApproach} />}
        />
      </main>

      <Footer />
    </div>
  );
}
