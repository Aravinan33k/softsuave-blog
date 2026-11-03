import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  aiClients,
  aiEnquiry,
  aiHero,
  aiHeroTestimonial,
  aiMeta,
  aiPricing,
  aiProcess,
  aiTalent,
  aiTech,
  aiTrialBand,
  aiTrialForm,
  aiWhy,
} from '@/lib/home/ad-hire-ai-developer-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TechRows from '@/components/home/tech-stack';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';

import Clients from '@/components/home/clients';
import TopTalent from '@/components/ad/top-talent';
import WhyList from '@/components/ad/why-list';
import PricingPlans from '@/components/ad/pricing-plans';
import HeroTestimonial from '@/components/ad/hero-testimonial';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';

/**
 * Hire AI Developers on Contract — a clone of softsuave.com/ad/hire-ai-developer,
 * rebuilt on the current theme and served at /ad/hire-ai-developer.
 *
 * The same ad-page kit as /ad/app-developer, with this page's own content:
 * hero + testimonial card, trusted clients, top talent + engagement models,
 * technology stack, why hire + trial band, plans, process, and the closing
 * "Start Your 40 Hours Trial" form. Copy is
 * `lib/home/ad-hire-ai-developer-content.ts`. Every trial button opens the shared
 * `TrialModal`, which shows the site's existing free-trial form.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap.
 *
 * A SERVER component (so it can export `metadata`); sections are client
 * components. Fonts, `.theme-four` and Lenis come from `(marketing)/layout.tsx`.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(aiMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: aiMeta.title,
  description: aiMeta.description,
  alternates: { canonical: aiMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: aiMeta.title,
    description: aiMeta.description,
    url: absoluteUrl(aiMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: aiMeta.title,
    description: aiMeta.description,
    images: [ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function AdHireAiDeveloperPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero
          content={aiHero}
          idPrefix="ad-hire-ai"
          breadcrumb={false}
          slot={<HeroTestimonial content={aiHeroTestimonial} />}
        />

        <div className={home.light}>
          <Clients logos={[...aiClients.logos]} title={aiClients.title} body="" loopShortRows noFade />
          <TopTalent content={aiTalent} />
        </div>

        <TechRows content={aiTech} loopShortRows />

        <div className={home.light}>
          <WhyList title={aiWhy.title} items={aiWhy.items} />
        </div>

        <CtaBand content={aiTrialBand} />

        <div className={home.light}>
          <PricingPlans content={aiPricing} />
          <Process content={aiProcess} id="journey" />
        </div>

        <ManagerEnquiry content={aiEnquiry} />
      </main>

      <Footer />

      {/* Every "Start 7-day Free Trial" button opens this. */}
      <TrialModal form={aiTrialForm} />
    </div>
  );
}
