import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  fdeClients,
  fdeExperts,
  fdeHero,
  fdeMeta,
  fdePopup,
  fdePractice,
  fdeProcess,
  fdeServices,
  fdeServicesCta,
  fdeTech,
  fdeWhy,
  fdeWhyClosing,
} from '@/lib/home/ad-hire-forward-deployed-engineer-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
import CardGrid from '@/components/landing/industries';
import Process from '@/components/landing/process';
import TechStack from '@/components/landing/tech-stack';
// The engagement-model cards the /hire-* pages use, here with a "Hire Now" on each.
import Integration from '@/components/generative-ai/integration';

import CtaRow from '@/components/ad/cta-row';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Forward Deployed Engineers on Contract — a clone of
 * softsuave.com/ad/hire-forward-deployed-engineer, rebuilt on the current theme
 * and served at /ad/hire-forward-deployed-engineer.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-hire-forward-deployed-engineer-content.ts`). Every trial and
 * "Hire Now" button opens the two-column popup (heading, logos, form), as on the live page, which has no closing form.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(fdeMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: fdeMeta.title,
  description: fdeMeta.description,
  alternates: { canonical: fdeMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: fdeMeta.title,
    description: fdeMeta.description,
    url: absoluteUrl(fdeMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: fdeMeta.title,
    description: fdeMeta.description,
    images: [ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function AdHireForwardDeployedEngineerPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero content={fdeHero} idPrefix="ad-hire-fde" breadcrumb={false} />
        </div>

        <div className={home.light}>
          {/* The live page's client logos sit inside its hero section; here they
              open the white band that follows it. */}
          <Clients logos={HIRE_CLIENT_LOGOS} title={fdeClients.title} body={fdeClients.body} />
          <CardGrid content={fdeWhy} id="why" variant="bold" autoLink={false} />
          <CtaRow lead={fdeWhyClosing} />
          <CardGrid content={fdeServices} id="services" variant="bold" autoLink={false} />
          <CtaRow {...fdeServicesCta} wipe />
        </div>

        <TechStack content={fdeTech} />

        <div className={home.light}>
          <CardGrid content={fdePractice} id="practice" variant="bold" autoLink={false} />
          <Process content={fdeProcess} id="journey" label="n" />
        </div>

        {/* Dark band, three across — the engagement-model cards as the /hire-* pages show them. */}
        <Integration
          content={fdeExperts}
          id="experts"
          variant="bold"
          blockCta={fdeExperts.cta}
          span={4}
        />

      </main>

      <Footer />

      {/* Every "Start 40 Hours Free Trial" and "Hire Now" button opens this. */}
      <TrialModal form={fdePopup.form} side={fdePopup.side} idPrefix="ad-fde-trial" wipe />
    </div>
  );
}
