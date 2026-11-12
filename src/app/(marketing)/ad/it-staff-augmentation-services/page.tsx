import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  saClients,
  saExperts,
  saExpertsCta,
  saHero,
  saMeta,
  saPopup,
  saPricing,
  saTalent,
  saTrialBand,
  saWhy,
} from '@/lib/home/ad-it-staff-augmentation-services-content';

import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import SectionHead from '@/components/landing/section-head';
import TechCluster from '@/components/data-science/tech-cluster';

import TopTalent from '@/components/ad/top-talent';
import CtaRow from '@/components/ad/cta-row';
import PricingPlans from '@/components/ad/pricing-plans';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * IT Staff Augmentation Services — a clone of
 * softsuave.com/ad/it-staff-augmentation-services, rebuilt on the current theme and
 * served at /ad/it-staff-augmentation-services.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-it-staff-augmentation-services-content.ts`). No top navigation and
 * no footer, like the other /ad pages. Every "Start 40-hours Free Trial" button
 * opens the popup — the hero's form, as on the live page, which has no closing form.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(saMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: saMeta.title,
  description: saMeta.description,
  alternates: { canonical: saMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: saMeta.title,
    description: saMeta.description,
    url: absoluteUrl(saMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: saMeta.title,
    description: saMeta.description,
    images: [ogImage],
  },
};

export default function AdItStaffAugmentationServicesPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={saHero} idPrefix="ad-staff-aug" breadcrumb={false} />

        <div className={home.light}>
          <Clients logos={[...saClients.logos]} title={saClients.title} body="" eyebrow="" loopShortRows noFade />
          <TopTalent content={saTalent} />
        </div>

        <TechCluster content={saExperts} />
        <CtaRow label={saExpertsCta.label} href={saExpertsCta.href} />

        <div className={home.light}>
          <section className={styles.shell} id="why">
            <SectionHead title={saWhy.title} intro={saWhy.intro} />
          </section>
        </div>

        <CtaBand content={saTrialBand} />

        <div className={home.light}>
          <PricingPlans content={saPricing} />
        </div>
      </main>

      {/* Every "Start 40-hours Free Trial" button opens this. */}
      <TrialModal form={saPopup} idPrefix="ad-staff-aug-trial" wipe />
    </div>
  );
}
