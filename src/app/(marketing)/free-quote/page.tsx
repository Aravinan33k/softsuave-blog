import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  freeQuoteClosingBand,
  freeQuoteHero,
  freeQuoteMeta,
  freeQuoteProcess,
} from '@/lib/home/free-quote-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import Hero from '@/components/landing/hero';
import Process from '@/components/landing/process';

// The homepage's own bands, rendered verbatim: the clients logo band, the
// awards strip, the testimonials and the closing enquiry band.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Free Quote — a clone of softsuave.com/free-quote. Same sections in the same
 * order: Hero, Our Clients, Built Around You, Awards, Testimonials, Book Free
 * Consultation. Built on the same components as its siblings
 * `/free-7-days-trial` and `/30-min-free-consultation`; copy lives in
 * `lib/home/free-quote-content.ts`.
 *
 * Registered in lib/home/landing-pages.ts, which brings every in-app link to
 * /free-quote in-app (they used to resolve to the live site).
 */

export const revalidate = 300;

const ogImage = dynamicOgImage('Free Quote. Fast. Simple.', 'Soft Suave');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: freeQuoteMeta.title,
  description: freeQuoteMeta.description,
  alternates: { canonical: freeQuoteMeta.path },
  robots: pageRobots,
  openGraph: {
    title: freeQuoteMeta.title,
    description: freeQuoteMeta.description,
    url: absoluteUrl(freeQuoteMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: freeQuoteMeta.title,
    description: freeQuoteMeta.description,
    images: [ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function FreeQuotePage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* No breadcrumb: the live page shows none. */}
        <Hero content={freeQuoteHero} idPrefix="free-quote" variant="compact" breadcrumb={false} />

        {/* Same band rhythm as the sibling pages: Clients and the steps on one
            light band, Recognitions on the dark ground, testimonials light. */}
        <div className={home.light}>
          <Clients />
          <Process content={freeQuoteProcess} id="built-around-you" />
        </div>

        <Recognitions />

        <div className={home.light}>
          <Testimonials />
        </div>

        <Contact content={freeQuoteClosingBand} ctaHref={freeQuoteClosingBand.cta.href} eyebrow="" />
      </main>

      <Footer />
    </div>
  );
}
