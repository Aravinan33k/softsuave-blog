import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  odAudience,
  odClients,
  odGrowth,
  odHero,
  odMeta,
  odPathBand,
  odPopup,
  odSolutions,
  odTalentBand,
  odTech,
  odTestimonials,
} from '@/lib/home/ad-on-demand-app-development-company-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
// The homepage's marquee rows — they scroll, alternating direction, as on the live page.
import TechRows from '@/components/home/tech-stack';

import Hero from '@/components/landing/hero';
// The bands and the problems selector the generative-ai page uses.
import GenAiCtaBand from '@/components/generative-ai/cta-band';
import Problems from '@/components/generative-ai/problems';
import Contact from '@/components/home/contact';
// The reveal-on-hover photo cards.
import CardGrid from '@/components/generative-ai/industries';

import AudienceCards from '@/components/ad/audience-cards';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Top Mobile App Development Company in India (on-demand) — a clone of
 * softsuave.com/ad/on-demand-app-development-company, rebuilt on the current theme and
 * served at /ad/on-demand-app-development-company.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-on-demand-app-development-company-content.ts`). No top navigation and no
 * footer, like the other /ad pages; the live page has no closing form either. Every
 * "Get …" and "Launch …" button opens the enquiry popup.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(odMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: odMeta.title,
  description: odMeta.description,
  alternates: { canonical: odMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: odMeta.title,
    description: odMeta.description,
    url: absoluteUrl(odMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: odMeta.title,
    description: odMeta.description,
    images: [ogImage],
  },
};

export default function AdOnDemandAppDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={odHero} idPrefix="ad-on-demand" breadcrumb={false} />

        <div className={home.light}>
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={odClients.title} body={odClients.body} />
        </div>

        {/* "Industries Soft Suave Builds Generative AI For" is a dark band on the generative-ai page; so is this. */}
        <div>
          <CardGrid content={odSolutions} id="solutions" variant="photo" links={false} />
        </div>

        <div className={home.light}>
          <TechRows content={odTech} loopShortRows />
        </div>

        <GenAiCtaBand content={odTalentBand} />

        <div className={home.light}>
          <Problems content={odGrowth} id="growth" photoOnly />
          <AudienceCards content={odAudience} />
        </div>

        {/* The generative-ai page's closing "Business Enquiry" band: centred copy and a button, no photograph. */}
        <Contact content={odPathBand} ctaHref={odPathBand.cta.href} eyebrow="" />

        <div className={home.light}>
          <Testimonials content={odTestimonials} />
        </div>
      </main>

      {/* Every "Get …" and "Launch …" button opens this. */}
      <TrialModal form={odPopup} idPrefix="ad-on-demand-trial" wipe />
    </div>
  );
}
