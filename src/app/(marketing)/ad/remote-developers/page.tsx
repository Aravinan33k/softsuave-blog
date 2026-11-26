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
  rsProcessPhotos,
  rsScaleBand,
  rsServices,
  rsServicesCta,
  rsTalent,
  rsTech,
  rsTestimonials,
  rsWhyFeatures,
  rsWhyClosing,
} from '@/lib/home/ad-remote-developers-content';

import { clientsPageBrands } from '@/lib/home/clients-content';

import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import TechStack from '@/components/landing/tech-stack';

import TopTalent from '@/components/ad/top-talent';
// Why Choose Us as an accordion beside a photo, as on /field-tracking-product (by request).
import FeatureAccordion from '@/components/common/feature-accordion';
import CtaRow from '@/components/ad/cta-row';
// The Our Services and Experts carousels, as /ad/remote-developer has them (by request).
import ServiceCarousel from '@/components/ad/service-carousel';
// Image-led sections for this page (review: "make the page creative, add image visuals").
import PhotoSteps from '@/components/ad/photo-steps';
import PracticeShowcase from '@/components/ad/practice-showcase';

// Below the first screen: split into their own chunks so the hero and the first
// sections hydrate without them. Still server-rendered, so the HTML is unchanged.
const SkillCarousel = dynamic(() => import('@/components/ad/skill-carousel'));
const Testimonials = dynamic(() => import('@/components/home/testimonials'));
const TrialModal = dynamic(() => import('@/components/ad/trial-modal'));

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Remote Developers on Contract — a clone of
 * softsuave.com/ad/remote-developers, rebuilt on the current theme and served at
 * /ad/remote-developers.
 *
 * The same ad-page kit as /ad/remote-developer, with this page's own masthead
 * (a trial button beside the logo, a hero with no form), a "Top Talent" block
 * and a "Scale Your Developer Team On-Demand" band
 * (`lib/home/ad-remote-developers-content.ts`). No top navigation and no footer,
 * like the other /ad pages. Every trial and "Hire Now" button opens the
 * two-column popup (heading, logos, form), as on the live page, which has no
 * closing form.
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
    // `wideHeadGap`: a wider gap under every section head (by request, as /ad/remote-developer).
    <div className={`${home.page} ${styles.wideHeadGap}`}>
      {/* `halfHeads`: section heads with the eyebrow on top, then heading left
          and subtext right of a centre rule (by request, as /ad/remote-developer). */}
      <main id="main" className={`${styles.adMain} ${styles.stackHeads} ${styles.statsGrotesk}`}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={rsHero} idPrefix="ad-remote-developers" breadcrumb={false} />

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          {/* `headStacked`: the heading held to 70% of the screen, its paragraph under it (by request). */}
          <Clients logos={clientsPageBrands.logos} eyebrow="Our Clients" title={rsClients.title} body={rsClients.body} wideTitle headStacked />
        </div>

        {/* Top Talent on the dark ground, by request; Why and Our Services stay on the light band after it.
            `primary`: its button matches the Our Services one (by request). */}
        <TopTalent content={rsTalent} primary />

        <div className={home.light}>
          {/* `ctaRoomy`: a full section's room under the closing line, so Services
              opens a proper section gap below it (by request). */}
          <div className={`${styles.gridWithCta} ${styles.ctaRoomy}`}>
            <FeatureAccordion content={rsWhyFeatures} id="why" />
            <CtaRow lead={rsWhyClosing} tight />
          </div>
          {/* The services as a carousel, one card at a time with the Experts
              arrows, then its own close — as on /ad/remote-developer (by request). */}
          <ServiceCarousel content={rsServices} id="services" />
          <CtaRow {...rsServicesCta} attached primary headingLead />
        </div>

        <CtaBand content={rsScaleBand} />

        {/* Light band after the dark "Scale" band, then the dark practice cards. */}
        <div className={home.light}>
          <TechStack content={rsTech} largeLogos />
        </div>

        {/* Photo-backed cards closing on a CTA card (review, from a reference). */}
        <PracticeShowcase content={rsPracticeShowcase} id="practice" />

        <div className={home.light}>
          <PhotoSteps content={rsProcessPhotos} id="journey" />
        </div>

        {/* Dark band: the twenty skills as a carousel with centred cards, each
            with its "Hire Now" to the trial popup — as on /ad/remote-developer (by request). */}
        <SkillCarousel content={rsExperts} id="experts" />

        {/* The site's warm-white band, so the dark experts above it are not
            followed by a second dark section. */}
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
