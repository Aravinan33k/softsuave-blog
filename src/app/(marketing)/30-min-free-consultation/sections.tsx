'use client';

import {
  consultationClosingBand,
  consultationHero,
  consultationProcess,
} from '@/lib/home/consultation-content';
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
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 */
export default function Sections() {
  return (
    <>
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
    </>
  );
}
