'use client';

import {
  rnBenefits,
  rnFaqs,
  rnHero,
  rnOutsourceCta,
  rnOverview,
  rnServices,
} from '@/lib/home/react-native-app-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own: every section the live page carries
// already had a home here, and the service board it shares with the Android
// page moved into `common` for it.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import Industries from '@/components/landing/industries';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
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
      {/* Compact look — the same hero as the other app-development pages,
          so the marketing surface reads as a matched set. */}
      <Hero content={rnHero} idPrefix="rn" variant="compact" />

      <div className={home.light}>
        <Overview content={rnOverview} variant="compact" />
      </div>

      {/* Four names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <ServiceBoard content={rnServices} />

      {/* `backdrop={false}` drops the coral light-field loop, which read on
          review as "the section is in a different colour theme than the other
          sections" — the band now sits on the page's own near-black ground
          like everything around it. */}
      <CtaBand content={rnOutsourceCta} backdrop={false} />

      {/* Client stories now sit ahead of the FAQ, as the review asked and as
          every corrected page on this surface runs them — the proof lands
          before the objection-handling rather than after it.

          That puts two light bands back to back, so they share one wrapper:
          the benefits grid and the stories read as a single warm-white
          chapter instead of two stacked panels with doubled padding, which is
          how `landing/hire-page` merges its own runs. */}
      <div className={home.light}>
        {/* Six benefits, three across so neither row is left with an orphan. */}
        <Industries content={rnBenefits} id="benefits" columns={3} />
        <Testimonials />
      </div>

      <Faq content={rnFaqs} idPrefix="rn-faq" />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
