import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  rsClients,
  rsExperts,
  rsHero,
  rsMeta,
  rsPopup,
  rsPracticeShowcase,
  rsProcess,
  rsServices,
  rsServicesCta,
  rsTech,
  rsTestimonials,
} from '@/lib/home/ad-remote-developers-content';
// Below the hero, every section as /ad/remote-developer sets it (by request):
// its stats strip, Top Talent collage and Why grid, from /ad/remote-developers-page.
import { rdpStats, rdpTalent, rdpWhy } from '@/lib/home/ad-remote-developers-page-content';
import { AD_TRIAL_CTA, adProcess } from '@/lib/home/ad-app-developer-content';

import { clientsPageBrands } from '@/lib/home/clients-content';

import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
// The tech stack as tabs, one per group, and the shared step cards, as /ad/remote-developer.
import TechTabs from '@/components/common/tech-tabs';
import Process from '@/components/landing/process';
import StatsStrip from '@/components/ad/rdp/stats-strip';
import TalentCollage from '@/components/ad/rdp/talent-collage';
import WhyGrid from '@/components/ad/rdp/why-grid';
import CtaRow from '@/components/ad/cta-row';
import ServiceCarousel from '@/components/ad/service-carousel';
import PracticeShowcase from '@/components/ad/practice-showcase';

// Below the first screen: split into their own chunks so the hero and the first
// sections hydrate without them. Still server-rendered, so the HTML is unchanged.
const SkillCarousel = dynamic(() => import('@/components/ad/skill-carousel'));
const Testimonials = dynamic(() => import('@/components/home/testimonials'));
const TrialModal = dynamic(() => import('@/components/ad/trial-modal'));

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/*
 * The sections below the hero are set up exactly as on /ad/remote-developer
 * (by request): the same photos, trial-button wiring and four steps. The
 * content is already shared: every `rs*` export is the matching `rd*` one.
 */

/** The four steps from the ad kit, under this page's process head and trial button. */
const process = { ...rsProcess, steps: adProcess.steps };

/** Why Choose Us: one photo beside the cards, no closing line. */
const why = {
  ...rdpWhy,
  closing: undefined,
  photo: {
    src: '/images/landing/ad-remote-developer-why.webp',
    alt: 'A developer coding on a laptop at a desk in a modern office',
    width: 1536,
    height: 1024,
  },
};

/** Top Talent: its button opens the trial popup; the collage photos as on /ad/remote-developer. */
const talent = {
  ...rdpTalent,
  cta: { ...rdpTalent.cta, href: AD_TRIAL_CTA.href },
  image: rdpTalent.image && {
    ...rdpTalent.image,
    src: '/images/landing/ad-remote-developer-talent-v2.webp',
    alt: "A team gathered around a developer's monitors in a high-rise office",
    width: 1500,
    height: 844,
    blurDataURL:
      'data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAQCdASoQAAkAA4BaJZQAArMkKQxWAAD4W6OzZvZ3/fx/DkNEm+5jbmHlTwoDQh2/v3quNyqxlYwVmahTgr8FqipDCdpITlPtsSiR7CANWr5BPpygUwAA',
  },
};
const talentSecond = {
  src: '/images/landing/ad-remote-developer-talent-2.webp',
  alt: 'Developers coding side by side at monitors in an office',
} as const;

/**
 * Hire Remote Developers on Contract — a clone of
 * softsuave.com/ad/remote-developers, rebuilt on the current theme and served at
 * /ad/remote-developers.
 *
 * This page's own masthead and hero (a trial button beside the logo, a centred
 * hero with no form); everything below it follows /ad/remote-developer
 * section for section (by request). No top navigation and no footer, like the
 * other /ad pages. Every trial and "Hire Now" button opens the two-column
 * popup (heading, logos, form).
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(rsMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: rsMeta.title,
  description: rsMeta.description,
  alternates: { canonical: rsMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: rsMeta.title,
    description: rsMeta.description,
    url: absoluteUrl(rsMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: rsMeta.title,
    description: rsMeta.description,
    images: [ogImage],
  },
};

export default function AdRemoteDevelopersPage() {
  return (
    // `h2Leading` and `wideHeadGap`: every H2 at a 130% line height and a wider
    // gap under every section head, as /ad/remote-developer.
    <div className={`${home.page} ${styles.h2Leading} ${styles.wideHeadGap}`}>
      {/* `stackHeads`: the eyebrow, then the heading, then its subtext under it. */}
      <main id="main" className={`${styles.adMain} ${styles.stackHeads}`}>
        {/* This page's own hero, unchanged (by request). */}
        <Hero noNav content={rsHero} idPrefix="ad-remote-developers" breadcrumb={false} />

        {/* From here down, the /ad/remote-developer sections in its order (by
            request). Dark → light → dark rhythm; no two dark sections touch. */}
        <StatsStrip items={rdpStats} />

        <div className={home.light}>
          <Clients logos={clientsPageBrands.logos} eyebrow="Our Clients" title={rsClients.title} body={rsClients.body} wideTitle headStacked />
        </div>

        <TalentCollage content={talent} second={talentSecond} />

        <div className={home.light}>
          <WhyGrid content={why} />
          <ServiceCarousel content={rsServices} id="services" />
          <CtaRow {...rsServicesCta} attached primary headingLead />
        </div>

        <TechTabs content={rsTech} />

        <PracticeShowcase content={rsPracticeShowcase} id="practice" />

        <div className={home.light}>
          <Process content={process} id="journey" />
        </div>

        <SkillCarousel content={rsExperts} id="experts" />

        <div className={home.light}>
          <Testimonials content={rsTestimonials} />
        </div>
      </main>

      {/* Microsoft Clarity, on this page (by request). Its origins are
          admitted for this route in next.config.ts (CLARITY_ROUTES). */}
      <Script id="ms-clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "t5y4fjyp9d");`}
      </Script>

      {/* Every "Start 40 Hours Free Trial" and "Hire Now" button opens this. */}
      <TrialModal form={rsPopup.form} side={rsPopup.side} idPrefix="ad-remote-developers-trial" wipe />
    </div>
  );
}
