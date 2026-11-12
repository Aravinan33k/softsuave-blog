import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  DED_RATECARD_REQUIREMENT,
  RATECARD_HREF,
  dedClients,
  dedComparison,
  dedEnquiry,
  dedHero,
  dedMeta,
  dedProcess,
  dedRateBand,
  dedRateCardForm,
  dedTech,
  dedWhy,
} from '@/lib/home/ad-hire-dedicated-developer-content';

import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import TechStack from '@/components/landing/tech-stack';
// The same table the /hire-dedicated-developers page renders.
import Comparison from '@/components/generative-ai/comparison';

import WhyList from '@/components/ad/why-list';
import CtaRow from '@/components/ad/cta-row';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Dedicated Developers in India On Contract — a clone of
 * softsuave.com/ad/hire-dedicated-developer, rebuilt on the current theme and
 * served at /ad/hire-dedicated-developer.
 *
 * The same ad-page kit as /ad/hire-ai-developer, with this page's own content.
 * The comparison table and the technologies panels are the ones
 * /hire-dedicated-developers already uses; only their content is the live
 * page's. Copy is `lib/home/ad-hire-dedicated-developer-content.ts`.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap.
 *
 * A SERVER component (so it can export `metadata`); sections are client
 * components. Fonts, `.theme-four` and Lenis come from `(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(dedMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: dedMeta.title,
  description: dedMeta.description,
  alternates: { canonical: dedMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    // The live og:title drops the "from $…/hr" the <title> carries.
    title: 'Hire Dedicated Developers in India On Contract',
    description: dedMeta.description,
    url: absoluteUrl(dedMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: dedMeta.title,
    description: dedMeta.description,
    images: [ogImage],
  },
};

export default function AdHireDedicatedDeveloperPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={dedHero} idPrefix="ad-hire-dedicated" breadcrumb={false} />
        </div>

        <div className={home.light}>
          <Clients logos={[...dedClients.logos]} title={dedClients.title} body="" eyebrow="" loopShortRows noFade />
        </div>

        <TechStack content={dedTech} />

        <div className={home.light}>
          <WhyList title={dedWhy.title} items={dedWhy.items} />
          <CtaRow {...dedWhy.cta} wipe />
        </div>

        <CtaBand content={dedRateBand} ctaClassName={styles.btnWipe} />

        <div className={home.light}>
          <Comparison content={dedComparison} id="compare" />
          <Process content={dedProcess} id="journey" />
        </div>

        <ManagerEnquiry content={dedEnquiry} id="ad-contact-form" idPrefix="ad-dedicated-contact" />
      </main>


      {/* "Request Rate Card" opens this. */}
      <TrialModal
        form={dedRateCardForm}
        href={RATECARD_HREF}
        idPrefix="ad-ratecard"
        fixedRequirement={DED_RATECARD_REQUIREMENT}
        wipe
      />
    </div>
  );
}
