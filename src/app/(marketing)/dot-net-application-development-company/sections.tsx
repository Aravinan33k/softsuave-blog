'use client';

import type { ReactNode } from 'react';
import {
  netFaqs,
  netHero,
  netHireCta,
  netOverview,
  netServices,
} from '@/lib/home/dotnet-app-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// reviews band IS the homepage's, to the word — "What Our Clients Say About Us"
// with the same standfirst.
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
 * TechStack stays on the server (tech-logo) and arrives as a prop.
 */
export default function Sections({ techStack }: Readonly<{ techStack: ReactNode }>) {
  return (
    <>
      {/* Compact look — the same hero as the rest of the surface. */}
      <Hero content={netHero} idPrefix="net" variant="compact" />

      <div className={home.light}>
        <Overview content={netOverview} variant="compact" />
      </div>

      {/* Six names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <ServiceBoard content={netServices} />

      {/* `backdrop={false}` drops the coral light-field loop, which read on
          review as "the section colour is different" — the band now sits on
          the page's own near-black ground like everything around it. */}
      <CtaBand content={netHireCta} backdrop={false} />

      {/* The client stories now come before the FAQ, as the review asked and
          as every corrected page on this surface runs them — the proof lands
          before the objection-handling rather than after it.

          That puts the technology stack and the stories back to back on the
          warm white, so they share one wrapper: two light bands stacked
          would double the padding between them and read as separate panels
          rather than one chapter. Same merge `landing/hire-page` does with
          its own runs. */}
      <div className={home.light}>
        {techStack}
        {/* Homepage client stories — the live page's band carries the same
            heading and standfirst. */}
        <Testimonials />
      </div>

      <Faq content={netFaqs} idPrefix="net-faq" />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
