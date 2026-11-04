import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  adClients,
  adExperts,
  adHero,
  adMeta,
  adMobile,
  adMobileCta,
  adPricing,
  adProcess,
  adTalent,
  adTestimonials,
  adTrialBand,
  adTrialForm,
  adWhy,
} from '@/lib/home/ad-app-developer-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import CardGrid from '@/components/landing/industries';
import Process from '@/components/landing/process';
import TechCluster from '@/components/data-science/tech-cluster';

import TopTalent from '@/components/ad/top-talent';
import WhyList from '@/components/ad/why-list';
import CtaRow from '@/components/ad/cta-row';
import PricingPlans from '@/components/ad/pricing-plans';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Remote App Developers on Contract — a clone of
 * softsuave.com/ad/app-developer, the paid-traffic landing page, rebuilt on the
 * current theme and served at /ad/app-developer.
 *
 * Same sections in the same order as the live page: hero + enquiry form,
 * clients, top talent + engagement models, mobile innovation, experts, why
 * hire, free-trial band, plans, process, testimonials. Every trial button opens
 * a modal form. Copy is `lib/home/ad-app-developer-content.ts`.
 *
 * Like the live page it is `noindex, nofollow` regardless of the site-wide
 * indexing flag, and it is deliberately NOT in `landing-pages.ts` — that
 * registry feeds the sitemap, which an ad landing page must stay out of.
 *
 * A SERVER component (so it can export `metadata`); sections are client
 * components. Fonts, `.theme-four` and Lenis come from `(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(adMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: adMeta.title,
  description: adMeta.description,
  alternates: { canonical: adMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: adMeta.title,
    description: adMeta.description,
    url: absoluteUrl(adMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: adMeta.title,
    description: adMeta.description,
    images: [ogImage],
  },
};

export default function AdAppDeveloperPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={adHero} idPrefix="ad-app-developer" breadcrumb={false} />

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={HIRE_CLIENT_LOGOS} title={adClients.title} body={adClients.body} />
          <TopTalent content={adTalent} />
          <CardGrid content={adMobile} id="services" variant="bold" span={4} autoLink={false} />
          <CtaRow {...adMobileCta} />
        </div>

        <TechCluster content={adExperts} />
        <CtaRow label={adTrialBand.cta.label} href={adTrialBand.cta.href} />

        <div className={home.light}>
          <WhyList title={adWhy.title} items={adWhy.items} />
        </div>

        <CtaBand content={adTrialBand} />

        <div className={home.light}>
          <PricingPlans content={adPricing} />
          <Process content={adProcess} id="journey" />
        </div>

        <Testimonials content={adTestimonials} />
      </main>


      {/* Every "Start 40 Hours Free Trial" button opens this. */}
      <TrialModal form={adTrialForm} />
    </div>
  );
}
