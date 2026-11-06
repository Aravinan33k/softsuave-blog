import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  raClients,
  raHero,
  raMeta,
  raPopup,
  raServices,
  raServicesCta,
  raTech,
  raTestimonials,
  raWhy,
  raWhyClosing,
} from '@/lib/home/ad-remote-angular-developers-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import TechStack from '@/components/landing/tech-stack';
import CardGrid from '@/components/generative-ai/industries';

import CtaRow from '@/components/ad/cta-row';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Angular Developers on Contract — a clone of
 * softsuave.com/ad/remote-angular-developers, rebuilt on the current theme and
 * served at /ad/remote-angular-developers.
 *
 * The same ad-page kit as /ad/remote-developer, with this page's own content
 * (`lib/home/ad-remote-angular-developers-content.ts`). No top navigation and
 * no footer, like the other /ad pages. Every trial button opens the two-column
 * popup (heading, logos, form), as on the live page, which has no closing form.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(raMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: raMeta.title,
  description: raMeta.description,
  alternates: { canonical: raMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: raMeta.title,
    description: raMeta.description,
    url: absoluteUrl(raMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: raMeta.title,
    description: raMeta.description,
    images: [ogImage],
  },
};

export default function AdRemoteAngularDevelopersPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={raHero} idPrefix="ad-remote-angular" breadcrumb={false} />
        </div>

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={raClients.title} body={raClients.body} />
          <CardGrid content={raWhy} id="why" variant="bold" />
          <CtaRow lead={raWhyClosing} />
          <CardGrid content={raServices} id="services" variant="bold" />
          <CtaRow {...raServicesCta} wipe />
        </div>

        <TechStack content={raTech} largeLogos />

        {/* The site's warm-white band, so the dark tech stack above it is not
            followed by a second dark section. */}
        <div className={home.light}>
          <Testimonials content={raTestimonials} />
        </div>
      </main>

      {/* Every "Start 40 Hours Free Trial" button opens this. */}
      <TrialModal form={raPopup.form} side={raPopup.side} idPrefix="ad-remote-angular-trial" wipe />
    </div>
  );
}
