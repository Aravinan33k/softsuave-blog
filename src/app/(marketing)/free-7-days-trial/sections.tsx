'use client';

import {
  freeTrialClosingBand,
  freeTrialHero,
  freeTrialProcess,
} from '@/lib/home/free-trial-content';
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
      {/* No breadcrumb: the live trial page shows none. */}
      <Hero content={freeTrialHero} idPrefix="free-trial" variant="compact" breadcrumb={false} />

      {/* Clients and the steps share one light band; Recognitions sits on the
          dark ground between it and the light testimonials — the same
          light/dark/light break the other landing pages use around it. */}
      <div className={home.light}>
        <Clients />
        <Process content={freeTrialProcess} id="built-around-you" />
      </div>

      <Recognitions />

      <div className={home.light}>
        <Testimonials />
      </div>

      <Contact content={freeTrialClosingBand} eyebrow="" />
    </>
  );
}
