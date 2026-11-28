'use client';

import type { ReactNode } from 'react';
import {
  ionFaqs,
  ionHero,
  ionHireCta,
  ionOverview,
  ionServices,
} from '@/lib/home/ionic-app-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim. Not a stylistic choice here: the
// live page's copy for both IS the homepage's, to the word — its clients band
// reads "Preferred AI-Enabled Technology Partner for Startups and SMBs" and its
// reviews band "What Our Clients Say About Us", both with the same standfirst.
import Clients from '@/components/home/clients';
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
      {/* Compact look — the same hero as the other app-development pages,
          so the marketing surface reads as a matched set. */}
      <Hero content={ionHero} idPrefix="ion" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      <Overview content={ionOverview} variant="compact" />

      {/* Six names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <div className={home.light}>
        <ServiceBoard content={ionServices} />
      </div>

      <CtaBand content={ionHireCta} />

      {/* The FAQ now follows the client stories, as the review asked and as
          every corrected page on this surface runs them — the proof lands
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

      <Faq content={ionFaqs} idPrefix="ion-faq" />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
