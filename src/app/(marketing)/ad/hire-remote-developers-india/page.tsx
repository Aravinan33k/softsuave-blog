import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  rdHero,
  rdMeta,
  rdModels,
  rdProcess,
  rdRateBand,
  rdServices,
  rdTech,
  rdTestimonials,
} from '@/lib/home/ad-hire-remote-developers-india-content';

import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import TechStack from '@/components/landing/tech-stack';
// The icon cards /hire-backend-application-developer uses, here with each card's own icon.
import CardGrid from '@/components/generative-ai/industries';

import EngagementModels from '@/components/ad/engagement-models';
import ConsultationClose from '@/components/common/consultation-close';
import { locationClose } from '@/lib/home/mobile-app-location-shared';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Remote Developers in India — a clone of
 * softsuave.com/ad/hire-remote-developers-india, rebuilt on the current theme and
 * served at /ad/hire-remote-developers-india.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-hire-remote-developers-india-content.ts`). No top navigation and
 * no footer, like the other /ad pages. This page has no
 * popups — every button scrolls to a form on the page.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(rdMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: rdMeta.title,
  description: rdMeta.description,
  alternates: { canonical: rdMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: rdMeta.title,
    description: rdMeta.description,
    url: absoluteUrl(rdMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: rdMeta.title,
    description: rdMeta.description,
    images: [ogImage],
  },
};

export default function AdHireRemoteDevelopersIndiaPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={rdHero} idPrefix="ad-remote-india" breadcrumb={false} />
        </div>

        <div className={home.light}>
          <div className={styles.sectionsJoined}>
            <CardGrid content={rdServices} id="services" variant="bold" />
            <TechStack content={rdTech} />
          </div>
        </div>

        <CtaBand content={rdRateBand} />

        <div className={home.light}>
          <EngagementModels content={rdModels} />
          <Process content={rdProcess} id="journey" />
          <Testimonials content={rdTestimonials} />
        </div>

        <ConsultationClose
          content={locationClose('Ad landing: Book Free Consultation (remote developers India)')}
          idPrefix="ad-remote-india-contact"
        />
      </main>
    </div>
  );
}
