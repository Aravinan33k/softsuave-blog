import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  BOOK_HREF,
  BOOK_HREF_HERO,
  cwCapabilities,
  cwClients,
  cwCredibility,
  cwForm,
  cwHero,
  cwInvite,
  cwMarquee,
  cwMeta,
  cwStandards,
  cwTestimonials,
  cwWhy,
} from '@/lib/home/ad-coffee-with-us-content';
import { cwImages } from '@/lib/home/ad-coffee-with-us-images';

import { clientsPageBrands } from '@/lib/home/clients-content';

import Hero from '@/components/landing/hero';
import Clients from '@/components/home/clients';
import CoffeeForm from '@/components/ad/coffee-form';
import CredibilityStrip from '@/components/ad/credibility-strip';
import WhyBento from '@/components/ad/why-bento';
import CapabilityCards from '@/components/ad/capability-cards';
import StandardsSplit from '@/components/ad/standards-split';
import CoffeeMarquee from '@/components/ad/coffee-marquee';
import CeoInvite from '@/components/ad/ceo-invite';
import CtaTracker from '@/components/ad/cta-tracker';

// Below the first screen: its own chunk, still server-rendered.
const Testimonials = dynamic(() => import('@/components/home/testimonials'));

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';
import coffee from '@/components/ad/coffee.module.css';

/**
 * Have a Coffee With Us — the campaign page for US small and mid-sized
 * businesses, served at /ad/coffee-with-us. Its one conversion is a meeting
 * request with the CEO, through the form in the hero; every CTA scrolls to it.
 *
 * Built on the /ad/remote-developer kit (hero, clients, testimonials, the /ad
 * footer line) with this campaign's own photo-led sections: the meeting card
 * (styled as the /hire-software-developers form), a bento for the differences, photo-topped capability
 * cards, the standards beside an office photo, a marquee and the CEO's
 * invitation over a coffee-table photo. Photos are Pexels slots `landing/cw-*`
 * (`lib/home/ad-coffee-with-us-images.ts`). No shared component changed.
 * Dropped from that page: the trial popup, the enquiry form, the 40-hour trial
 * copy, Tech Stack, the hiring process and the developer carousel.
 *
 * `noindex, nofollow` like the other /ad pages — in its metadata here, and in
 * the site-wide `X-Robots-Tag` header (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(cwMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: cwMeta.title,
  description: cwMeta.description,
  alternates: { canonical: cwMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: cwMeta.title,
    description: cwMeta.description,
    url: absoluteUrl(cwMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: cwMeta.title,
    description: cwMeta.description,
    images: [ogImage],
  },
};

const CTA_TARGETS = [BOOK_HREF, BOOK_HREF_HERO] as const;

export default function AdCoffeeWithUsPage() {
  return (
    <div className={`${home.page} ${styles.wideHeadGap} ${coffee.page}`}>
      <main id="main" className={`${styles.adMain} ${styles.halfHeads}`}>
        {/* Dark: hero (copy left, the meeting card right; stacked below
            1000px), then the proof tiles. */}
        <Hero
          noNav
          content={cwHero}
          idPrefix="ad-coffee"
          breadcrumb={false}
          slot={
            <div className={coffee.heroVisual} id={BOOK_HREF_HERO.slice(1)}>
              <CoffeeForm idPrefix="ad-coffee" avatar={cwInvite.photo} />
            </div>
          }
        />
        <CredibilityStrip items={cwCredibility} />

        <div className={home.light}>
          <Clients logos={clientsPageBrands.logos} eyebrow="Our Clients" title={cwClients.title} body={cwClients.body} wideTitle />
          <WhyBento content={cwWhy} photo={cwImages.collab} />
        </div>

        <CapabilityCards
          content={cwCapabilities}
          photos={[cwImages.ai, cwImages.software, cwImages.engineering]}
        />

        {/* `storyQuote`: the client-story quote at the homepage's 16px. */}
        <div className={`${home.light} ${coffee.storyQuote}`}>
          <StandardsSplit
            content={cwStandards}
            photo={cwImages.office}
          />
          <Testimonials content={cwTestimonials} />
        </div>

        <CoffeeMarquee phrases={cwMarquee} />
        <CeoInvite content={cwInvite} backdrop={cwImages.coffee} room={cwImages.office} tag={cwForm.meta} />
      </main>

      <CtaTracker targets={CTA_TARGETS} />

      {/* Microsoft Clarity, as on /ad/remote-developer (by request). Its origins
          are admitted for this route in next.config.ts (CLARITY_ROUTES). */}
      <Script id="ms-clarity" strategy="lazyOnload">
        {`(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "t5y4fjyp9d");`}
      </Script>
    </div>
  );
}
