import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  rdClients,
  rdExperts,
  rdHero,
  rdMeta,
  rdPopup,
  rdPractice,
  rdProcess,
  rdServices,
  rdServicesCta,
  rdTech,
  rdTestimonials,
  rdWhy,
  rdWhyClosing,
} from '@/lib/home/ad-remote-developer-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import Process from '@/components/landing/process';
import TechStack from '@/components/landing/tech-stack';
// The grid whose cards can carry the live page's own icon images.
import CardGrid from '@/components/generative-ai/industries';
import CtaRow from '@/components/ad/cta-row';
import SkillCarousel from '@/components/ad/skill-carousel';
import ServiceCarousel from '@/components/ad/service-carousel';
import TrialModal from '@/components/ad/trial-modal';
import AdLegalFooter from '@/components/ad/legal-footer';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Remote Developers on Contract — a clone of
 * softsuave.com/ad/remote-developer, rebuilt on the current theme and served at
 * /ad/remote-developer.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-remote-developer-content.ts`). No top navigation, like the
 * other /ad pages; instead of a full footer it closes on the site footer's
 * legal line alone (© year, Privacy Policy, Terms & Conditions), by request.
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
    <div className={home.page}>
      {/* `twoLineHeads`: the Clients and Services headings in two lines, by request. */}
      <main id="main" className={`${styles.adMain} ${styles.twoLineHeads}`}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={rdHero} idPrefix="ad-remote" breadcrumb={false} />
        </div>

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={rdClients.title} body={rdClients.body} />
          <CardGrid content={rdWhy} id="why" variant="bold" />
          {/* The Why section's closing line: under its cards, in the heading face. */}
          <CtaRow lead={rdWhyClosing} attached joined headingLead />
          {/* The services as a carousel, three to a page (by request). */}
          <ServiceCarousel content={rdServices} id="services" />
          {/* The services section's own close: under its cards, with the
              process section's button. */}
          <CtaRow {...rdServicesCta} attached primary headingLead />
        </div>

        <TechStack content={rdTech} largeLogos />

        <div className={home.light}>
          <CardGrid content={rdPractice} id="practice" variant="bold" />
          <Process content={rdProcess} id="journey" label="n" />
        </div>

        {/* Dark band: the twenty skills as a carousel, five to a page (by
            request), each card with its "Hire Now" to the trial popup. */}
        <SkillCarousel content={rdExperts} id="experts" />

        {/* On the light ground, by request — between the dark skills band and
            the dark legal line. */}
        <div className={home.light}>
          <Testimonials content={rdTestimonials} />
        </div>
      </main>

      <AdLegalFooter />

      {/* Every "Start 40 Hours Free Trial" and "Hire Now" button opens this. */}
      <TrialModal form={rdPopup.form} side={rdPopup.side} idPrefix="ad-remote-trial" wipe />
    </div>
  );
}
