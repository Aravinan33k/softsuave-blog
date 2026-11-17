import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { RestoredLiveLd } from '@/components/seo/restored-live-ld';
import {
  cpApps,
  cpAppsCta,
  cpClose,
  cpDowntime,
  cpFeatures,
  cpHero,
  cpMeta,
  cpOffer,
  cpResults,
  cpSteps,
} from '@/lib/home/construction-product-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import CardGrid from '@/components/generative-ai/industries';
import Integration from '@/components/generative-ai/integration';
import ServiceBoard from '@/components/common/service-board';

import home from '@/components/home/home.module.css';

/**
 * Construction product: softsuave.com/construction-product, the heavy-equipment
 * rental micro-SaaS page, on the new theme with the same slug. It is built
 * entirely from existing section components (by request), in the live page's
 * order. The copy, and the list of what the live page has that these sections
 * cannot show, are in `lib/home/construction-product-content.ts`.
 *
 * The head is as live: title, description, canonical and Open Graph image,
 * and `noindex, nofollow`. That robots value is kept whatever the site-wide
 * setting, so the page is also out of the sitemap (`sitemap: false` in
 * the registry). The live page's two JSON-LD blocks are served verbatim
 * (`live-schema-restored.ts`). The route is in PAGES_WITH_OWN_SITE_GRAPH,
 * so the layout adds no schema beside them.
 *
 * Band rhythm: hero dark, features light, downtime band dark, offer light,
 * results dark, apps and steps light, closing band dark.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: cpMeta.title,
  description: cpMeta.description,
  // The live canonical, verbatim (it points at the homepage).
  alternates: { canonical: cpMeta.canonical },
  robots: { index: false, follow: false },
  openGraph: {
    title: cpMeta.title,
    description: cpMeta.description,
    url: cpMeta.canonical,
    siteName: 'Soft Suave Technologies',
    type: 'website',
    images: [cpMeta.ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: cpMeta.title,
    description: cpMeta.description,
    images: [cpMeta.ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function ConstructionProductPage() {
  return (
    <div className={home.page}>
      <RestoredLiveLd path={cpMeta.path} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* No breadcrumb: the live page shows none. */}
        <Hero content={cpHero} idPrefix="construction-product" breadcrumb={false} />

        <div className={home.light}>
          <CardGrid content={cpFeatures} id="features" variant="bold" span={3} />
        </div>

        <CtaBand content={cpDowntime} />

        <div className={home.light}>
          <ServiceBoard content={cpOffer} id="offer" />
        </div>

        <Overview content={cpResults} id="results" />

        <div className={home.light}>
          <Integration content={cpApps} id="apps" variant="bold" blockCta={cpAppsCta} span={6} />
          <Process content={cpSteps} id="steps" />
        </div>

        <CtaBand content={cpClose} />
      </main>

      <Footer />
    </div>
  );
}
