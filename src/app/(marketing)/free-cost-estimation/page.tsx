import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  estimateFaq,
  estimateHero,
  estimateMeta,
  estimatePaths,
  estimateProcess,
} from '@/lib/home/cost-estimation-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// SHARED LANDING SECTIONS, taking this page's copy. Nothing bespoke here.
import Hero from '@/components/landing/hero';
import CardGrid from '@/components/landing/industries';
import Process from '@/components/landing/process';
import Faq from '@/components/landing/faq';

// Reused from the homepage: company-level proof, and the closing CTA every
// conversion page on this surface ends on.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Free Cost Estimation — served at `/free-cost-estimation`, the same path the
 * live site uses, so this is a drop-in replacement rather than a competing URL.
 *
 * READ `lib/home/cost-estimation-content.ts`'s header before changing the
 * section set. The live page is a two-tile chooser into two JavaScript wizards
 * that this app does not have; this page keeps its JOB (get a costed plan
 * before committing) and gives it a body, because shipping two links to routes
 * we do not serve would be a page with nothing on it.
 *
 * UNLIKE the careers and life pages, this one DOES carry the hero enquiry form
 * and the closing `Contact` band. It is a business conversion page — the form
 * is the entire point of it, and it is the mechanism the estimate actually
 * arrives through.
 *
 * A SERVER component so it can own its `metadata`; every section is a client
 * component. Fonts, `.theme-four` tokens and Lenis smooth scroll come from
 * `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${estimateMeta.title} | Soft Suave`,
  description: estimateMeta.description,
  alternates: { canonical: estimateMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${estimateMeta.title} | Soft Suave`,
    description: estimateMeta.description,
    url: absoluteUrl(estimateMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${estimateMeta.title} | Soft Suave`,
    description: estimateMeta.description,
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with the mount
 *  subpath, so it needs the already-public path. */
const HOME_HREF = BASE_PATH || '/';

/**
 * `Service` + `WebPage` + `FAQPage` + `BreadcrumbList` from the shared
 * builder, `@id`-linked to the organization the group layout declares once.
 *
 * The `offers` are the two estimate paths rather than services we sell — which
 * is what they are: two things a reader can ask us to cost.
 */
const LD = pageSchemaGraph({
  path: estimateMeta.path,
  title: estimateMeta.title,
  description: estimateMeta.description,
  serviceType: 'Software project cost estimation',
  serviceName: 'Free Cost Estimation',
  breadcrumbName: estimateMeta.shortTitle,
  offerCatalogName: estimatePaths.title,
  offers: estimatePaths.items.map((i) => ({ name: i.name, description: i.body ?? '' })),
  faqName: estimateFaq.title,
  faqs: estimateFaq.items,
});

export default function FreeCostEstimationPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      {/* Dark hero, then alternating. The FAQ and the testimonials share the
          closing warm-white run, which is the pattern the Java and Python
          pages use for a stretch of more than one section before the close. */}
      <main id="main">
        <Hero content={estimateHero} idPrefix="estimate" variant="compact" />

        <div className={home.light}>
          <CardGrid content={estimatePaths} id="paths" variant="feature" columns={3} />
        </div>

        <Process content={estimateProcess} id="journey" />

        <div className={home.light}>
          <Faq content={estimateFaq} idPrefix="estimate-faq" />

          <Testimonials />
        </div>

        {/* Points back at this page's own hero form rather than the /contact
            route — the same close as every other conversion page here. */}
        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
