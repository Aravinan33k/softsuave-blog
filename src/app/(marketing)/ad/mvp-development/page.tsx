import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  mvAnalysis,
  mvAudience,
  mvClients,
  mvHero,
  mvMeta,
  mvPopup,
  mvRoadmap,
  mvScreens,
  mvSolution,
  mvTech,
  mvTestimonials,
  mvWhy,
} from '@/lib/home/ad-mvp-development-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
// The homepage's marquee rows — they scroll, alternating direction, as on the live page.
import TechRows from '@/components/home/tech-stack';

import Hero from '@/components/landing/hero';
// The grid whose cards can carry the live page's own icon images.
import CardGrid from '@/components/generative-ai/industries';

import StatsStory from '@/components/ad/stats-story';
import StepCards from '@/components/ad/step-cards';
import StepTabs from '@/components/ad/step-tabs';
import AppScreens from '@/components/ad/app-screens';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * MVP Development Company in India — a clone of softsuave.com/ad/mvp-development,
 * rebuilt on the current theme and served at /ad/mvp-development.
 *
 * A sibling of /ad/app-development-company-india: the same ad-page kit and, where the
 * live pages share them, the same content (`lib/home/ad-mvp-development-content.ts`). No
 * top navigation and no footer, like the other /ad pages, and no masthead button. Every
 * "Get …" button opens the enquiry popup.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(mvMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: mvMeta.title,
  description: mvMeta.description,
  alternates: { canonical: mvMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: mvMeta.title,
    description: mvMeta.description,
    url: absoluteUrl(mvMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: mvMeta.title,
    description: mvMeta.description,
    images: [ogImage],
  },
};

export default function AdMvpDevelopmentPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={mvHero} idPrefix="ad-mvp" breadcrumb={false} />

        <div className={home.light}>
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={mvClients.title} body={mvClients.body} />
          <StatsStory content={mvAnalysis} />
          {/* The live icons are white, drawn on its red tiles; here they are turned dark. */}
          <div className={styles.markOnDark}>
            <CardGrid content={mvSolution} id="solution" variant="bold" />
          </div>
        </div>

        {/* "Process": a dark band between two light ones. */}
        <div>
          <StepCards content={mvRoadmap} />
        </div>

        <div className={home.light}>
          <StepTabs content={mvWhy} />
          {/* The top line of each card draws across from the left on hover. */}
          <div className={`${styles.markOnDark} ${styles.sweepTop}`}>
            <CardGrid content={mvAudience} id="audience" variant="bold" />
          </div>
        </div>

        {/* "Technology Stack": a dark band between two light ones. */}
        <div>
          <TechRows content={mvTech} loopShortRows />
        </div>

        <div className={home.light}>
          <AppScreens content={mvScreens} />
          <Testimonials content={mvTestimonials} />
        </div>
      </main>

      {/* Every "Get …" button opens this. */}
      <TrialModal form={mvPopup} idPrefix="ad-mvp-trial" wipe />
    </div>
  );
}
