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
// The engagement-model cards the /hire-* pages use, here with a "Hire Now" on each.
import Integration from '@/components/generative-ai/integration';

import CtaRow from '@/components/ad/cta-row';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Remote Developers on Contract — a clone of
 * softsuave.com/ad/remote-developer, rebuilt on the current theme and served at
 * /ad/remote-developer.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-remote-developer-content.ts`). No top navigation and no footer,
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
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={rdHero} idPrefix="ad-remote" breadcrumb={false} />
        </div>

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={rdClients.title} body={rdClients.body} />
          <CardGrid content={rdWhy} id="why" variant="bold" />
          <CtaRow lead={rdWhyClosing} />
          <CardGrid content={rdServices} id="services" variant="bold" />
          <CtaRow {...rdServicesCta} wipe />
        </div>

        <TechStack content={rdTech} largeLogos />

        <div className={home.light}>
          <CardGrid content={rdPractice} id="practice" variant="bold" />
          <Process content={rdProcess} id="journey" label="n" />
        </div>

        {/* Dark band, three across — the engagement-model cards as the /hire-* pages show them. */}
        <Integration
          content={rdExperts}
          id="experts"
          variant="bold"
          blockCta={rdExperts.cta}
          span={4}
        />

        <Testimonials content={rdTestimonials} />
      </main>

      {/* Every "Start 40 Hours Free Trial" and "Hire Now" button opens this. */}
      <TrialModal form={rdPopup.form} side={rdPopup.side} idPrefix="ad-remote-trial" wipe />
    </div>
  );
}
