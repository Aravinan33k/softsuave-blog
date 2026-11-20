'use client';

import type { ReactNode } from 'react';
import {
  andFaqs,
  andHero,
  andHireCta,
  andOverview,
  andServices,
} from '@/lib/home/android-app-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section. The
// live page's testimonials band carries the identical heading.
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
      {/* Compact look — the same hero as the other service pages, so the
          marketing surface reads as a matched set. */}
      <Hero content={andHero} idPrefix="and" variant="compact" />

      <div className={home.light}>
        <Overview content={andOverview} variant="compact" />
      </div>

      {/* Six names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <ServiceBoard content={andServices} />

      <CtaBand content={andHireCta} />

      {/* Client stories ahead of the FAQ (review: "place the faqs after
          the testimonials"). Tech stack, testimonials and the FAQ are all
          light bands once reordered, so they share one wrapper — the FAQ
          sat dark on its own before, between two light bands either side
          of it. Homepage client stories carry the live page's own
          heading.

          The tech stack is the homepage's tech rows, as the Vue.js,
          PostgreSQL, TypeScript and GraphQL pages have it (review: "update
          the tech stack section like in other pages"). It stays on this
          light band rather than going dark as on those pages: the service
          board and CTA band above are already two dark bands in a row.
          `.techFit` clears the homepage's full-viewport min-height (the
          `.techCompact` those pages use never matches — see the CSS);
          `staticFrom` holds the rows still from tablet width up. */}
      <div className={home.light}>
        <div className={home.techFit}>
          {techStack}
        </div>
        <Testimonials />
        <Faq content={andFaqs} idPrefix="and-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
