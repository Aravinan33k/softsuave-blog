'use client';

import type { ReactNode } from 'react';
import { njFaqs, njHero, njHireCta, njOverview, njServices } from '@/lib/home/nodejs-content';
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
      <Hero content={njHero} idPrefix="nj" variant="compact" />

      <div className={home.light}>
        <Overview content={njOverview} variant="compact" />
      </div>

      {/* Six names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <ServiceBoard content={njServices} />

      <CtaBand content={njHireCta} />

      {/* Client stories ahead of the FAQ (review: "move the testimonials
          before the FAQ"). TechStack, Testimonials and the FAQ are all
          light bands once reordered, so they share one wrapper rather than
          alternating light/dark three times in five sections — the FAQ
          sat dark on its own before, between two light bands either side
          of it. Homepage client stories carry the same heading and
          standfirst as the live page's own band. */}
      <div className={home.light}>
        {techStack}
        <Testimonials />
        <Faq content={njFaqs} idPrefix="nj-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
