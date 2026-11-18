import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { RestoredLiveLd } from '@/components/seo/restored-live-ld';
import {
  ftBenefits,
  ftClose,
  ftFeatures,
  ftHero,
  ftIndustries,
  ftMeta,
  ftPlatform,
  ftRisks,
} from '@/lib/home/field-tracking-product-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import CardGrid from '@/components/generative-ai/industries';
import FeatureAccordion from '@/components/common/feature-accordion';

import home from '@/components/home/home.module.css';
import ad from '@/components/ad/ad.module.css';

/**
 * Field tracking product: softsuave.com/field-tracking-product, the AI
 * field-ops tracker page, on the new theme with the same slug. It is the
 * construction product page's sibling and is built the same way: entirely
 * from existing section components (by request), in the live page's order.
 * The copy, and what the live page has that these sections cannot show, are
 * in `lib/home/field-tracking-product-content.ts`.
 *
 * The head: the page's own title, description and self canonical (by
 * request, replacing the live page's borrowed ones), the live Open Graph
 * image, and `noindex, nofollow` as live. That robots value is kept whatever the site-wide
 * setting, so the page is also out of the sitemap (`sitemap: false` in the
 * registry). The live page's two JSON-LD blocks are served verbatim
 * (`live-schema-restored.ts`). The route is in PAGES_WITH_OWN_SITE_GRAPH,
 * so the layout adds no schema beside them.
 *
 * Band rhythm: hero dark; logos and overview light; features dark; risks
 * light; benefits dark; industries light; closing band dark.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  // The page's title as given (it carries its own "| Soft Suave"); the root title template is "%s".
  title: ftMeta.title,
  description: ftMeta.description,
  // Self canonical (by request).
  alternates: { canonical: ftMeta.canonical },
  robots: { index: false, follow: false },
  openGraph: {
    title: ftMeta.title,
    description: ftMeta.description,
    url: ftMeta.canonical,
    siteName: 'Soft Suave Technologies',
    type: 'website',
    images: [ftMeta.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: ftMeta.title,
    description: ftMeta.description,
    images: [ftMeta.ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function FieldTrackingProductPage() {
  return (
    <div className={home.page}>
      <RestoredLiveLd path={ftMeta.path} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* No breadcrumb: the live page shows none. */}
        <Hero content={ftHero} idPrefix="field-tracking-product" breadcrumb={false} />

        <div className={home.light}>
          {/* The homepage's clients section, as it renders there (by request). */}
          <Clients />
          <CardGrid content={ftPlatform} id="overview" variant="tiles" />
        </div>

        {/* The features as an accordion beside the open one's screenshot, the
            head in two parts (eyebrow on top, heading left, subtext right of
            the rule): by request, the reference layout. */}
        <div className={ad.halfHeads}>
          <FeatureAccordion content={ftFeatures} id="features" />
        </div>

        <div className={home.light}>
          <CardGrid content={ftRisks} id="risks" variant="bold" />
        </div>

        <CardGrid content={ftBenefits} id="benefits" variant="bold" />

        <div className={home.light}>
          <CardGrid content={ftIndustries} id="sectors" variant="tiles" />
        </div>

        <CtaBand content={ftClose} />
      </main>

      <Footer />
    </div>
  );
}
