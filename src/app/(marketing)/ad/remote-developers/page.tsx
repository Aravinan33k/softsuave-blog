import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  rsClients,
  rsExperts,
  rsHero,
  rsMeta,
  rsPopup,
  rsPractice,
  rsProcess,
  rsScaleBand,
  rsServices,
  rsServicesCta,
  rsTalent,
  rsTech,
  rsTestimonials,
  rsWhy,
  rsWhyClosing,
} from '@/lib/home/ad-remote-developers-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import TechStack from '@/components/landing/tech-stack';
// The grid whose cards can carry the live page's own icon images.
import CardGrid from '@/components/generative-ai/industries';
// The engagement-model cards the /hire-* pages use, here with a "Hire Now" on each.
import Integration from '@/components/generative-ai/integration';

import TopTalent from '@/components/ad/top-talent';
import CtaRow from '@/components/ad/cta-row';
import TrialModal from '@/components/ad/trial-modal';

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
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={rsHero} idPrefix="ad-remote-developers" breadcrumb={false} />

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={rsClients.title} body={rsClients.body} />
          <TopTalent content={rsTalent} />
          <CardGrid content={rsWhy} id="why" variant="bold" />
          <CtaRow lead={rsWhyClosing} />
          <CardGrid content={rsServices} id="services" variant="bold" />
          <CtaRow {...rsServicesCta} wipe />
        </div>

        <CtaBand content={rsScaleBand} ctaClassName={styles.btnWipe} />

        {/* Light band after the dark "Scale" band, then the dark practice cards. */}
        <div className={home.light}>
          <TechStack content={rsTech} largeLogos />
        </div>

        <div className={styles.markOnDark}>
          <CardGrid content={rsPractice} id="practice" variant="bold" />
        </div>

        <div className={home.light}>
          <Process content={rsProcess} id="journey" label="n" />
        </div>

        {/* Dark band, three across — the engagement-model cards as the /hire-* pages show them. */}
        <Integration
          content={rsExperts}
          id="experts"
          variant="bold"
          blockCta={rsExperts.cta}
          span={4}
        />

        {/* The site's warm-white band, so the dark experts above it are not
            followed by a second dark section. */}
        <div className={home.light}>
          <Testimonials content={rsTestimonials} />
        </div>
      </main>

      {/* Every "Start 40 Hours Free Trial" and "Hire Now" button opens this. */}
      <TrialModal form={rsPopup.form} side={rsPopup.side} idPrefix="ad-remote-developers-trial" wipe />
    </div>
  );
}
