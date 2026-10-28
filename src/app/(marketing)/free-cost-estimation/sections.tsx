'use client';

import {
  estimateFaq,
  estimateHero,
  estimatePaths,
  estimateProcess,
} from '@/lib/home/cost-estimation-content';
// SHARED LANDING SECTIONS, taking this page's copy. Nothing bespoke here.
import Hero from '@/components/landing/hero';
import CardGrid from '@/components/landing/industries';
import Process from '@/components/landing/process';
import Faq from '@/components/landing/faq';
// Reused from the homepage: company-level proof, and the closing CTA every
// conversion page on this surface ends on.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
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
      <Hero content={estimateHero} idPrefix="estimate" variant="compact" />

      <div className={home.light}>
        <CardGrid content={estimatePaths} id="paths" variant="feature" columns={3} />
      </div>

      <Process content={estimateProcess} id="journey" />

      <div className={home.light}>
        <Faq content={estimateFaq} idPrefix="estimate-faq" />

        <Testimonials />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
