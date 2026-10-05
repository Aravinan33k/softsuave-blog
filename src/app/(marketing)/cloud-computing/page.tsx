import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import {
  cloudAbout,
  cloudApproach,
  cloudApproachSteps,
  cloudHero,
  cloudIntro,
  cloudMeta,
  cloudModels,
  cloudPlatforms,
  cloudServices,
} from '@/lib/home/cloud-computing-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's closing enquiry band, which stands
// in for the live page's "Book Free Consultation" form.
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import TechStack from '@/components/landing/tech-stack';

import home from '@/components/home/home.module.css';

/**
 * Cloud Computing Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/cloud-computing-content.ts`). Bands alternate so no two dark
 * sections sit together; the models and platforms share one light band so the
 * section ahead of the dark closing band is light.
 */

export const revalidate = 300;

/**
 * The page's link-preview image (review: "add the Social Share Preview
 * image"). softsuave.com publishes none for this page, so it is a 1200x630
 * card in the style of its other share images: the logo and the page's name
 * over a darkened photograph from the page.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/cloud-computing-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Cloud Software Development Company - Soft Suave',
};

// The live page's own <title>, verbatim — it carries its brand suffix already.
export const metadata: Metadata = {
  title: cloudMeta.title,
  description: cloudMeta.description,
  alternates: { canonical: cloudMeta.path },
  robots: pageRobots,
  openGraph: {
    title: cloudMeta.title,
    description: cloudMeta.description,
    url: absoluteUrl(cloudMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: cloudMeta.title,
    description: cloudMeta.description,
    images: [OG_IMAGE.url],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function CloudComputingPage() {
  return (
    <div className={home.page}>
      {/* No page JSON-LD: softsuave.com's own page carries none (its only block
          is the site Organization the shared GTM container injects, which
          this site loads too), and the review asked for the live schema with
          the rest removed. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the
          layout adds no Organization/WebSite of its own either. */}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={cloudHero} idPrefix="cloud" variant="compact" />

        <div className={home.light}>
          <Overview content={cloudIntro} id="overview" />
        </div>

        <Overview content={cloudAbout} id="about" />

        <div className={home.light}>
          <Overview content={cloudApproach} id="approach" />
          <Process content={cloudApproachSteps} id="approach-steps" />
        </div>

        {/* Live cards carry no links, so none are inferred from their names. */}
        <CardGrid content={cloudServices} id="services" variant="bold" autoLink={false} />

        <div className={home.light}>
          <CardGrid content={cloudModels} id="models" variant="bold" autoLink={false} />
          <TechStack content={cloudPlatforms} id="platforms" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
