import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  FORM_PREFIX,
  TRIAL_HREF,
  rdpClients,
  rdpClosing,
  rdpExperts,
  rdpHero,
  rdpMeta,
  rdpPractice,
  rdpProcess,
  rdpScale,
  rdpServices,
  rdpServicesCta,
  rdpStats,
  rdpStrategy,
  rdpTalent,
  rdpTalentSecond,
  rdpTech,
  rdpTestimonials,
  rdpWhy,
} from '@/lib/home/ad-remote-developers-page-content';

import { clientsPageBrands } from '@/lib/home/clients-content';

import Hero from '@/components/landing/hero';
import Clients from '@/components/home/clients';
import CtaRow from '@/components/ad/cta-row';
import PracticeShowcase from '@/components/ad/practice-showcase';
import StatsStrip from '@/components/ad/rdp/stats-strip';
import TalentCollage from '@/components/ad/rdp/talent-collage';
import WhyGrid from '@/components/ad/rdp/why-grid';
import ServiceGrid from '@/components/ad/rdp/service-grid';
import ScaleBanner from '@/components/ad/rdp/scale-banner';
import TechTabs from '@/components/ad/rdp/tech-tabs';
import GlowBanner from '@/components/ad/rdp/glow-banner';
import ProcessTimeline from '@/components/ad/rdp/process-timeline';
import ExpertTiles from '@/components/ad/rdp/expert-tiles';
import TrialFocus from '@/components/ad/rdp/trial-focus';

// Below the first screens: its own chunk, still server-rendered.
const Testimonials = dynamic(() => import('@/components/home/testimonials'));

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';
import rdp from '@/components/ad/rdp.module.css';

/**
 * /ad/remote-developers-page — the Remote Developers ad page (the content of
 * /ad/remote-developers) redesigned in the look of /ad/coffee-with-us (brief,
 * 27 Nov). Same goal: the 40-hour free trial, with "Book a Meeting" second.
 *
 * Every trial, "Learn More" and "Hire Now" link goes to the hero's enquiry
 * form (`#enquiry`) and focuses its first field (`TrialFocus`); there is no
 * popup on this page. The form is the existing `EnquiryForm` with the
 * "Staffing gaps?" content, so validation, the honeypot, draft saving, the
 * endpoint (routed by path, the same "developer" pair as /ad/remote-developers)
 * and the /thank-you redirect are all unchanged.
 *
 * `noindex, nofollow` like the original (and the `X-Robots-Tag` every /ad/*
 * route gets in next.config.ts); not in the sitemap. The /ad layout adds the
 * footer's legal line. Bands alternate dark / light; the section heads are the
 * coffee page's split heads (`halfHeads`).
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(rdpMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: rdpMeta.title,
  description: rdpMeta.description,
  alternates: { canonical: rdpMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: rdpMeta.title,
    description: rdpMeta.description,
    url: absoluteUrl(rdpMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: rdpMeta.title,
    description: rdpMeta.description,
    images: [ogImage],
  },
};

export default function AdRemoteDevelopersRedesignPage() {
  return (
    <div className={`${home.page} ${styles.wideHeadGap} ${rdp.page}`}>
      <main id="main" className={`${styles.adMain} ${styles.halfHeads}`}>
        {/* Dark: hero (copy left, the enquiry form right; stacked below 1000px), then the figures. */}
        <Hero noNav content={rdpHero} idPrefix={FORM_PREFIX} breadcrumb={false} />
        <StatsStrip items={rdpStats} />

        <div className={home.light}>
          <Clients logos={clientsPageBrands.logos} eyebrow="Our Clients" title={rdpClients.title} body={rdpClients.body} wideTitle />
        </div>

        {/* Dark: Top Talent as a photo collage (round "40 hrs" badge) beside the
            five points as a numbered list (by request). */}
        <TalentCollage content={rdpTalent} second={rdpTalentSecond} />

        <div className={home.light}>
          <WhyGrid content={rdpWhy} />
          <ServiceGrid content={rdpServices} />
          <CtaRow {...rdpServicesCta} attached primary headingLead />
        </div>

        {/* Dark: the scale banner. */}
        <ScaleBanner content={rdpScale} />

        <div className={home.light}>
          <TechTabs content={rdpTech} />
        </div>

        {/* Dark: Code & Practice, the photo cards with "Learn More". */}
        <PracticeShowcase content={rdpPractice} id="practice" />

        <div className={home.light}>
          <GlowBanner id="strategy" eyebrow={rdpStrategy.eyebrow} lines={rdpStrategy.lines} body={rdpStrategy.body} ctas={rdpStrategy.ctas} />
          <ProcessTimeline content={rdpProcess} />
        </div>

        {/* Dark: the twenty skills. */}
        <ExpertTiles content={rdpExperts} />

        <div className={home.light}>
          <Testimonials content={rdpTestimonials} />
          <GlowBanner id="closing" lines={rdpClosing.lines} ctas={rdpClosing.ctas} />
        </div>
      </main>

      <TrialFocus href={TRIAL_HREF} fieldId={`${FORM_PREFIX}-name`} />
    </div>
  );
}
