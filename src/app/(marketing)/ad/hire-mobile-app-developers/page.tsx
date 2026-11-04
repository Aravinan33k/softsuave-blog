import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  mbClients,
  mbEnquiry,
  mbHero,
  mbMeta,
  mbPricing,
  mbProcess,
  mbSkills,
  mbSkillsCta,
  mbTalent,
  mbTrialBand,
  mbTrialForm,
  mbWhy,
} from '@/lib/home/ad-hire-mobile-app-developers-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import TechCluster from '@/components/data-science/tech-cluster';

import TopTalent from '@/components/ad/top-talent';
import WhyList from '@/components/ad/why-list';
import CtaRow from '@/components/ad/cta-row';
import PricingPlans from '@/components/ad/pricing-plans';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Mobile App Developers on Contract — a clone of
 * softsuave.com/ad/hire-mobile-app-developers, rebuilt on the current theme and
 * served at /ad/hire-mobile-app-developers.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-hire-mobile-app-developers-content.ts`). Every "Start 7-day Free
 * Trial" button opens the popup form, as on the live page.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(mbMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: mbMeta.title,
  description: mbMeta.description,
  alternates: { canonical: mbMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: mbMeta.title,
    description: mbMeta.description,
    url: absoluteUrl(mbMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: mbMeta.title,
    description: mbMeta.description,
    images: [ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function AdHireMobileAppDevelopersPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero content={mbHero} idPrefix="ad-mobile" breadcrumb={false} />
        </div>

        <div className={home.light}>
          {/* The live band has no label above its heading, so none here. */}
          <Clients
            logos={[...mbClients.logos]}
            title={mbClients.title}
            body=""
            eyebrow=""
            loopShortRows
            noFade
          />
          <TopTalent content={mbTalent} />
        </div>

        <TechCluster content={mbSkills} />
        <CtaRow {...mbSkillsCta} />

        <div className={home.light}>
          <WhyList title={mbWhy.title} items={mbWhy.items} />
        </div>

        <CtaBand content={mbTrialBand} />

        <div className={home.light}>
          <PricingPlans content={mbPricing} />
          <Process content={mbProcess} id="journey" />
        </div>

        <ManagerEnquiry content={mbEnquiry} id="ad-contact-form" idPrefix="ad-mobile-contact" />
      </main>

      <Footer />

      {/* Every "Start 7-day Free Trial" button opens this. */}
      <TrialModal form={mbTrialForm} idPrefix="ad-mobile-trial" wipe />
    </div>
  );
}
