import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  consultationClosingBand,
  consultationHero,
  consultationMeta,
  consultationProcess,
} from '@/lib/home/consultation-content';

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
 * Free Consultation — a clone of softsuave.com/30-min-free-consultation.
 * Same sections in the same order: Hero, Our Clients, Built Around You,
 * Awards, Testimonials, Book Free Consultation. Built on the same components
 * as its sibling `/free-7-days-trial`; copy lives in
 * `lib/home/consultation-content.ts`.
 *
 * Registered in lib/home/landing-pages.ts, which brings every in-app
 * "Schedule a Call" link to this path in-app (they used to resolve to the
 * live site).
 */

export const revalidate = 300;

const ogImage = dynamicOgImage('Free Consultation. Fast. Simple.', 'Soft Suave');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: consultationMeta.title,
  description: consultationMeta.description,
  alternates: { canonical: consultationMeta.path },
  robots: pageRobots,
  openGraph: {
    title: consultationMeta.title,
    description: consultationMeta.description,
    url: absoluteUrl(consultationMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: consultationMeta.title,
    description: consultationMeta.description,
    images: [ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function FreeConsultationPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* No breadcrumb: the live page shows none. */}
        <Hero content={consultationHero} idPrefix="free-consultation" variant="compact" breadcrumb={false} />

        {/* Same band rhythm as /free-7-days-trial: Clients and the steps on one
            light band, Recognitions on the dark ground, testimonials light. */}
        <div className={home.light}>
          <Clients />
          <Process content={consultationProcess} id="built-around-you" />
        </div>

        <Recognitions />

        <div className={home.light}>
          <Testimonials />
        </div>

        {/* The band's button scrolls back to the hero form (see the content). */}
        <Contact content={consultationClosingBand} ctaHref="#top" eyebrow="" />
      </main>

      <Footer />
    </div>
  );
}
