import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { freeDemoHero, freeDemoMeta, freeDemoProcess } from '@/lib/home/free-demo-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import Hero from '@/components/landing/hero';
import Process from '@/components/landing/process';

// The homepage's own bands, rendered verbatim: the clients logo band, the
// awards strip and the testimonials — as on /30-min-free-consultation.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';

import home from '@/components/home/home.module.css';

/**
 * Free Demo App — a clone of softsuave.com/free-demo-app, on the Free
 * Consultation page's structure: Hero, Our Clients, Built Around You, Awards,
 * Testimonials, in the live page's order, on the same components. Copy lives
 * in `lib/home/free-demo-content.ts`.
 *
 * Unlike the consultation page, the live demo page ends on its testimonials —
 * no closing "Book Free Consultation" band — and its head carries only the
 * title, description, canonical and robots: no Open Graph, no Twitter tags,
 * no structured data. So this page has none of those either (the route is in
 * PAGES_WITH_OWN_SITE_GRAPH, so the marketing layout adds no schema).
 */

export const revalidate = 300;

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: freeDemoMeta.title,
  description: freeDemoMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: freeDemoMeta.canonical },
  robots: pageRobots,
};

const HOME_HREF = BASE_PATH || '/';

export default function FreeDemoAppPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* No breadcrumb: the live page shows none. */}
        <Hero content={freeDemoHero} idPrefix="free-demo-app" variant="compact" breadcrumb={false} />

        {/* The consultation page's band rhythm: Clients and the steps on one
            light band, Recognitions on the dark ground, testimonials light. */}
        <div className={home.light}>
          <Clients />
          <Process content={freeDemoProcess} id="built-around-you" />
        </div>

        {/* No "View All" button: the live demo page's awards band has none. */}
        <Recognitions showCta={false} />

        <div className={home.light}>
          <Testimonials />
        </div>
      </main>

      <Footer />
    </div>
  );
}
