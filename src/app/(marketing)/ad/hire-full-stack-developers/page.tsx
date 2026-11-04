import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  fsClosing,
  fsHero,
  fsMeta,
  fsProcess,
  fsRateBand,
  fsStacks,
  fsTech,
  fsTrusted,
} from '@/lib/home/ad-hire-full-stack-developers-content';

import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import TechStack from '@/components/landing/tech-stack';
// The icon cards /hire-backend-application-developer uses for "Choose Backend Developers by Technology".
import CardGrid from '@/components/generative-ai/industries';

import StatsRow from '@/components/ad/stats-row';
import SplitEnquiry from '@/components/ad/split-enquiry';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Full Stack Developers India — a clone of
 * softsuave.com/ad/hire-full-stack-developers, rebuilt on the current theme and
 * served at /ad/hire-full-stack-developers.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-hire-full-stack-developers-content.ts`). The tech panels, the
 * stack cards and the rate banner are the components the /hire-* pages already
 * use; only their words are the live page's. This page has no popups — every
 * button scrolls to a form on the page.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(fsMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: fsMeta.title,
  description: fsMeta.description,
  alternates: { canonical: fsMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: fsMeta.title,
    description: fsMeta.description,
    url: absoluteUrl(fsMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: fsMeta.title,
    description: fsMeta.description,
    images: [ogImage],
  },
};

export default function AdHireFullStackDevelopersPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={fsHero} idPrefix="ad-full-stack" breadcrumb={false} />
        </div>

        <div className={home.light}>
          {/* The live band has no label above its heading, so none here. */}
          <Clients
            logos={[...fsTrusted.logos]}
            title={fsTrusted.title}
            body=""
            eyebrow=""
            loopShortRows
            noFade
          />
          <StatsRow stats={fsTrusted.stats} />
        </div>

        <TechStack content={fsTech} />

        <div className={home.light}>
          <CardGrid content={fsStacks} id="stacks" variant="bold" />
        </div>

        <CtaBand content={fsRateBand} ctaClassName={styles.btnWipe} />

        <div className={home.light}>
          <Process content={fsProcess} id="journey" />
        </div>

        <SplitEnquiry
          title={fsClosing.title}
          body={fsClosing.body}
          link={fsClosing.link}
          logo
          form={fsClosing.form}
        />
      </main>

    </div>
  );
}
