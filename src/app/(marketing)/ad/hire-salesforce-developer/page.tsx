import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  sfCerts,
  sfClients,
  sfEnquiry,
  sfHero,
  sfHeroTestimonial,
  sfMeta,
  sfPricing,
  sfProcess,
  sfServices,
  sfTalent,
  sfTrialBand,
  sfTrialForm,
  sfWhy,
} from '@/lib/home/ad-hire-salesforce-developer-content';

import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
// The icon cards /hire-backend-application-developer uses, here with each card's own icon.
import CardGrid from '@/components/generative-ai/industries';

import TopTalent from '@/components/ad/top-talent';
import WhyList from '@/components/ad/why-list';
import PricingPlans from '@/components/ad/pricing-plans';
import HeroTestimonial from '@/components/ad/hero-testimonial';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Salesforce Developers on Contract — a clone of
 * softsuave.com/ad/hire-salesforce-developer, rebuilt on the current theme and
 * served at /ad/hire-salesforce-developer.
 *
 * The same ad-page kit as /ad/hire-ai-developer, with this page's own content
 * (`lib/home/ad-hire-salesforce-developer-content.ts`) and a certifications
 * carousel. Every "Start 40 hours Free Trial" button opens the free-trial form.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(sfMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: sfMeta.title,
  description: sfMeta.description,
  alternates: { canonical: sfMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: sfMeta.title,
    description: sfMeta.description,
    url: absoluteUrl(sfMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: sfMeta.title,
    description: sfMeta.description,
    images: [ogImage],
  },
};

export default function AdHireSalesforceDeveloperPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero
          noNav
          content={sfHero}
          idPrefix="ad-salesforce"
          breadcrumb={false}
          slot={<HeroTestimonial content={sfHeroTestimonial} />}
        />

        <div className={home.light}>
          {/* The live bands have no label above their headings, so none here. */}
          <Clients
            logos={[...sfClients.logos]}
            title={sfClients.title}
            body=""
            eyebrow=""
            loopShortRows
            noFade
          />
          <TopTalent content={sfTalent} />
          <Clients
            logos={[...sfCerts.logos]}
            title={sfCerts.title}
            body={sfCerts.body}
            eyebrow=""
            badges
            id="certifications"
            noFade
            loopShortRows
          />
          <CardGrid content={sfServices} id="services" variant="bold" />
          <WhyList title={sfWhy.title} items={sfWhy.items} />
        </div>

        <CtaBand content={sfTrialBand} ctaClassName={styles.btnWipe} />

        <div className={home.light}>
          <PricingPlans content={sfPricing} />
          <Process content={sfProcess} id="journey" />
        </div>

        <ManagerEnquiry content={sfEnquiry} id="ad-contact-form" idPrefix="ad-salesforce-contact" />
      </main>

      {/* Every "Start 40 hours Free Trial" button opens this. */}
      <TrialModal form={sfTrialForm} idPrefix="ad-salesforce-trial" wipe />
    </div>
  );
}
