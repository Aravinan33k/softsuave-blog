import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  rdClients,
  rdExperts,
  rdHero,
  rdMeta,
  rdPopup,
  rdProcess,
  rdServices,
  rdServicesCta,
  rdTech,
  rdTestimonials,
} from '@/lib/home/ad-remote-developer-content';
// The Why, Code & Practice and Process sections as /ad/remote-developers sets them
// (by request). Same copy as this page's own: those three are built from it.
import { rsPracticeShowcase } from '@/lib/home/ad-remote-developers-content';
// The hero, stats strip, Top Talent and Why sections as /ad/remote-developers-page
// sets them (by request).
import { rdpHero, rdpStats, rdpTalent, rdpWhy } from '@/lib/home/ad-remote-developers-page-content';
import { AD_TRIAL_CTA, adProcess } from '@/lib/home/ad-app-developer-content';

import { clientsPageBrands } from '@/lib/home/clients-content';

import Clients from '@/components/home/clients';
const SkillCarousel = dynamic(() => import('@/components/ad/skill-carousel'));
const Testimonials = dynamic(() => import('@/components/home/testimonials'));
const TrialModal = dynamic(() => import('@/components/ad/trial-modal'));

import Hero from '@/components/landing/hero';
// The /hire-web-app-developers tech stack: one tab per group (by request).
import TechTabs from '@/components/common/tech-tabs';
// The shared step cards (icon, "Step N", arrows between), as /ad/app-developer.
import Process from '@/components/landing/process';
import StatsStrip from '@/components/ad/rdp/stats-strip';
import TalentCollage from '@/components/ad/rdp/talent-collage';
import WhyGrid from '@/components/ad/rdp/why-grid';
import PracticeShowcase from '@/components/ad/practice-showcase';
import CtaRow from '@/components/ad/cta-row';
import ServiceCarousel from '@/components/ad/service-carousel';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';
import rdp from '@/components/ad/rdp.module.css';

/**
 * The /ad/remote-developers-page hero on this page (its photo, form card and
 * stats strip) with this page's own words — "Hire Remote Developers on
 * Contract", the intro line and the highlighted guarantee, "OR" between the
 * buttons, no checklist (by request) — and this page's own wiring — its trial buttons keep opening the popup
 * (`#trial`), and the form keeps this page's lead subject.
 */
const hero = {
  ...rdpHero,
  titleLines: rdHero.titleLines,
  accent: rdHero.accent,
  body: rdHero.body,
  boldBody: rdHero.boldBody,
  points: [],
  ctaSeparator: "OR",
  ctas: rdpHero.ctas?.map((c) => (c.href.startsWith('#') ? { ...c, href: AD_TRIAL_CTA.href } : c)),
  logoCta: { ...AD_TRIAL_CTA, label: 'Start 40 Hours Free Trial →' },
  // This page's own hero form (by request): "40-Hour Risk-Free Trial" /
  // "Get Skilled Remote Developers", "Start My FREE Trial", its own lead subject.
  form: rdHero.form,
};
/** This page's own smaller collage photo (by request). */
/**
 * The process as the shared step cards with the four steps from the ad kit
 * ("Share Your Developer Requirement" …, by request), under this page's own
 * head and trial button.
 */
const process = { ...rdProcess, steps: adProcess.steps };

/** Why Choose Us with this page's own photo, without the closing line (by request). */
const why = {
  ...rdpWhy,
  closing: undefined,
  photo: {
    src: "/images/landing/ad-remote-developer-why.webp",
    alt: "A developer coding on a laptop at a desk in a modern office",
    width: 1536,
    height: 1024,
  },
};

const talentSecond = {
  src: "/images/landing/ad-remote-developer-talent-2.webp",
  alt: "Developers coding side by side at monitors in an office",
} as const;
const talent = {
  ...rdpTalent,
  cta: { ...rdpTalent.cta, href: AD_TRIAL_CTA.href },
  // This page's own main photo in the collage (by request); the badge stays.
  image: rdpTalent.image && {
    ...rdpTalent.image,
    src: "/images/landing/ad-remote-developer-talent-v2.webp",
    alt: "A team gathered around a developer's monitors in a high-rise office",
    width: 1500,
    height: 844,
    blurDataURL:
      "data:image/webp;base64,UklGRmQAAABXRUJQVlA4IFgAAADQAQCdASoQAAkAA4BaJZQAArMkKQxWAAD4W6OzZvZ3/fx/DkNEm+5jbmHlTwoDQh2/v3quNyqxlYwVmahTgr8FqipDCdpITlPtsSiR7CANWr5BPpygUwAA",
  },
};

/**
 * Hire Remote Developers on Contract — a clone of
 * softsuave.com/ad/remote-developer, rebuilt on the current theme and served at
 * /ad/remote-developer.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-remote-developer-content.ts`). No top navigation, like the
 * other /ad pages; instead of a full footer it closes on the site footer
 * legal line alone, which the /ad layout adds (`ad/layout.tsx`).
 * Every trial and "Hire Now" button opens the
 * two-column popup (heading, logos, form), as on the live page, which has no
 * closing form.
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

export default function AdRemoteDeveloperPage() {
  return (
    // `h2Leading`: every H2 on this page at a 130% line height; `wideHeadGap`:
    // a wider gap under every section head (both by request).
    <div className={`${home.page} ${styles.h2Leading} ${styles.wideHeadGap} ${rdp.page}`}>
      {/* `stackHeads`: every section head as /ad/remote-developers sets it — the
          eyebrow, then the heading held to 70% of the screen, then its subtext
          under it, no divider (by request). */}
      <main id="main" className={`${styles.adMain} ${styles.stackHeads}`}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        {/* The /ad/remote-developers-page hero and its figures (by request). */}
        {/* `heroNoteHighlight`: the guarantee line highlighted; `heroNoteGreen` sets it in green (by request). */}
        <div className={`${styles.heroNoteHighlight} ${styles.heroNoteGreen}`}>
          <Hero noNav content={hero} idPrefix="ad-remote" breadcrumb={false} />
        </div>
        <StatsStrip items={rdpStats} />

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={clientsPageBrands.logos} eyebrow="Our Clients" title={rdClients.title} body={rdClients.body} wideTitle headStacked />
        </div>

        {/* Dark: Top Talent as /ad/remote-developers-page sets it (by request). */}
        <TalentCollage content={talent} second={talentSecond} />

        <div className={home.light}>
          {/* Why Choose Us as /ad/remote-developers-page sets it: one photo beside
              the five cards, its closing line under them (by request). */}
          {/* This page's own photo and no closing line (by request). */}
          <WhyGrid content={why} />
          {/* The services as a carousel, three to a page (by request). */}
          <ServiceCarousel content={rdServices} id="services" />
          {/* The services section's own close: under its cards, with the
              process section's button. */}
          <CtaRow {...rdServicesCta} attached primary headingLead />
        </div>

        <TechTabs content={rdTech} />

        {/* Code & Practice on the dark ground, as /ad/remote-developers (by request):
            photo-backed cards closing on a CTA card. */}
        <PracticeShowcase content={rsPracticeShowcase} id="practice" />

        {/* The steps as the shared step cards on the light band (by request). */}
        <div className={home.light}>
          <Process content={process} id="journey" />
        </div>

        {/* Dark band: the twenty skills as a carousel, five to a page (by
            request), each card with its "Hire Now" to the trial popup. */}
        <SkillCarousel content={rdExperts} id="experts" />

        {/* On the light ground, by request, after the dark skills band. */}
        <div className={home.light}>
          <Testimonials content={rdTestimonials} />
        </div>
      </main>

      {/* Microsoft Clarity, on this page only (by request). `lazyOnload`: it runs
          after the page has loaded and gone idle, so it doesn't compete with
          hydration. Its origins are admitted for this route alone in
          next.config.ts (CLARITY_ROUTES). */}
      <Script id="ms-clarity" strategy="lazyOnload">
        {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "t5y4fjyp9d");`}
      </Script>

      {/* Every "Start 40 Hours Free Trial" and "Hire Now" button opens this. */}
      <TrialModal form={rdPopup.form} side={rdPopup.side} idPrefix="ad-remote-trial" wipe />
    </div>
  );
}
