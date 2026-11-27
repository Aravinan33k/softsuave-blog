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
  rdServices,
  rdServicesCta,
  rdTech,
  rdTestimonials,
  rdWhyClosing,
} from '@/lib/home/ad-remote-developer-content';
// The Why, Code & Practice and Process sections as /ad/remote-developers sets them
// (by request). Same copy as this page's own: those three are built from it.
import { rsPracticeShowcase, rsProcessPhotos, rsWhyFeatures } from '@/lib/home/ad-remote-developers-content';

import { clientsPageBrands } from '@/lib/home/clients-content';

import Clients from '@/components/home/clients';
const SkillCarousel = dynamic(() => import('@/components/ad/skill-carousel'));
const Testimonials = dynamic(() => import('@/components/home/testimonials'));
const TrialModal = dynamic(() => import('@/components/ad/trial-modal'));

import Hero from '@/components/landing/hero';
import TechStack from '@/components/landing/tech-stack';
import FeatureAccordion from '@/components/common/feature-accordion';
import PracticeShowcase from '@/components/ad/practice-showcase';
import PhotoSteps from '@/components/ad/photo-steps';
import CtaRow from '@/components/ad/cta-row';
import ServiceCarousel from '@/components/ad/service-carousel';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

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
    <div className={`${home.page} ${styles.h2Leading} ${styles.wideHeadGap}`}>
      {/* `stackHeads`: every section head as /ad/remote-developers sets it — the
          eyebrow, then the heading held to 70% of the screen, then its subtext
          under it, no divider (by request). */}
      <main id="main" className={`${styles.adMain} ${styles.stackHeads}`}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        {/* `heroNoteHighlight`: the guarantee line in the accent colour (by request). */}
        <div className={`${styles.wipeForm} ${styles.heroNoteHighlight} ${styles.heroBodyEarly}`}>
          <Hero noNav content={rdHero} idPrefix="ad-remote" breadcrumb={false} />
        </div>

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={clientsPageBrands.logos} eyebrow="Our Clients" title={rdClients.title} body={rdClients.body} wideTitle headStacked />
          {/* Why Choose Us as an accordion beside a photo, as /ad/remote-developers (by request). */}
          <FeatureAccordion content={rsWhyFeatures} id="why" />
          {/* The Why section's closing line: under its cards, in the heading face.
              Not `joined`: it keeps the band's bottom padding, so Services opens
              a full section gap below it (by request). */}
          <CtaRow lead={rdWhyClosing} attached headingLead />
          {/* The services as a carousel, three to a page (by request). */}
          <ServiceCarousel content={rdServices} id="services" />
          {/* The services section's own close: under its cards, with the
              process section's button. */}
          <CtaRow {...rdServicesCta} attached primary headingLead />
        </div>

        <TechStack content={rdTech} largeLogos />

        {/* Code & Practice on the dark ground, as /ad/remote-developers (by request):
            photo-backed cards closing on a CTA card. */}
        <PracticeShowcase content={rsPracticeShowcase} id="practice" />

        {/* The steps as photo cards on the light band, as /ad/remote-developers. */}
        <div className={home.light}>
          <PhotoSteps content={rsProcessPhotos} id="journey" />
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
