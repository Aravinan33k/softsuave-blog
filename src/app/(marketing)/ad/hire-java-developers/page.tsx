import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  jvClosing,
  jvHero,
  jvMeta,
  jvModels,
  jvProcess,
  jvRateBand,
  jvServices,
  jvTestimonials,
} from '@/lib/home/ad-hire-java-developers-content';

import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
// The icon cards /hire-backend-application-developer uses, here with each card's own icon.
import CardGrid from '@/components/generative-ai/industries';

import EngagementModels from '@/components/ad/engagement-models';
import SplitEnquiry from '@/components/ad/split-enquiry';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Offshore Java Developers in India — a clone of
 * softsuave.com/ad/hire-java-developers, rebuilt on the current theme and served
 * at /ad/hire-java-developers.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-hire-java-developers-content.ts`). This page has no popups —
 * every button scrolls to a form on the page.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(jvMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: jvMeta.title,
  description: jvMeta.description,
  alternates: { canonical: jvMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: jvMeta.title,
    description: jvMeta.description,
    url: absoluteUrl(jvMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: jvMeta.title,
    description: jvMeta.description,
    images: [ogImage],
  },
};

export default function AdHireJavaDevelopersPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={jvHero} idPrefix="ad-java" breadcrumb={false} />
        </div>

        <div className={home.light}>
          <CardGrid content={jvServices} id="services" variant="bold" />
        </div>

        <CtaBand content={jvRateBand} />

        <div className={home.light}>
          <EngagementModels content={jvModels} />
          <Process content={jvProcess} id="journey" />
          <Testimonials content={jvTestimonials} />
        </div>

        <SplitEnquiry
          title={jvClosing.title}
          body={jvClosing.body}
          link={jvClosing.link}
          logo
          form={jvClosing.form}
          idPrefix="ad-java-contact"
        />
      </main>

    </div>
  );
}
