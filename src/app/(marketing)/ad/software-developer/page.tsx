import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  sdClients,
  sdHero,
  sdMeta,
  sdPricing,
  sdProcess,
  sdServices,
  sdServicesCta,
  sdTalent,
  sdTech,
  sdTestimonials,
  sdTrialBand,
  sdTrialForm,
  sdWhy,
} from '@/lib/home/ad-software-developer-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
// The homepage's marquee rows — they scroll, alternating direction, as on the live page.
import TechStack from '@/components/home/tech-stack';
// The grid whose cards can carry the live page's own icon images.
import CardGrid from '@/components/generative-ai/industries';

import TopTalent from '@/components/ad/top-talent';
import WhyList from '@/components/ad/why-list';
import CtaRow from '@/components/ad/cta-row';
import PricingPlans from '@/components/ad/pricing-plans';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Remote Software Developers on Contract — a clone of
 * softsuave.com/ad/software-developer, rebuilt on the current theme and served
 * at /ad/software-developer.
 *
 * The same ad-page kit as /ad/app-developer, with this page's own content
 * (`lib/home/ad-software-developer-content.ts`). No top navigation and no
 * footer, like the other /ad pages. Every trial and "Hire Developers Now"
 * button opens the form popup, as on the live page, which has no closing form.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(sdMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: sdMeta.title,
  description: sdMeta.description,
  alternates: { canonical: sdMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: sdMeta.title,
    description: sdMeta.description,
    url: absoluteUrl(sdMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: sdMeta.title,
    description: sdMeta.description,
    images: [ogImage],
  },
};

export default function AdSoftwareDeveloperPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={sdHero} idPrefix="ad-software-developer" breadcrumb={false} />

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={sdClients.title} body={sdClients.body} />
          <TopTalent content={sdTalent} />
          <CardGrid content={sdServices} id="services" variant="bold" />
          <CtaRow {...sdServicesCta} wipe />
        </div>

        <TechStack content={sdTech} loopShortRows />

        <div className={home.light}>
          <WhyList title={sdWhy.title} items={sdWhy.items} />
        </div>

        <CtaBand content={sdTrialBand} />

        <div className={home.light}>
          <PricingPlans content={sdPricing} />
          <Process content={sdProcess} id="journey" label="n" />
          <Testimonials content={sdTestimonials} />
        </div>
      </main>

      {/* Every "Start 40 Hours Free Trial" and "Hire Developers Now" button opens this. */}
      <TrialModal form={sdTrialForm} />
    </div>
  );
}
