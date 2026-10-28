'use client';

import type { ReactNode } from 'react';
import {
  gqFaqs,
  gqHero,
  gqOverview,
  gqPlanCta,
  gqServices,
  gqWhyUs,
} from '@/lib/home/graphql-content';
// Shared landing-page surface — every section the brief calls for already had
// a home here; this page adds none of its own.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim, as the brief asks for both explicitly:
// the clients logo band, the testimonials band, and the closing enquiry CTA.
// TechStack is the homepage's own marquee too — the same choice made for the
// Next.js and TypeScript pages, so the three closest sibling pages on this
// surface read as a matched set rather than one using the static panel grid.
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
      {/* Compact look — the same hero as the rest of the surface. */}
      <Hero content={gqHero} idPrefix="gq" variant="compact" />

      <div className={home.light}>
        <Clients />
      </div>

      <Overview content={gqOverview} variant="compact" />

      {/* Centre-focused carousel — one service in focus with its neighbours
          as context, each card wearing its own artwork. */}
      <div className={home.light}>
        <ServicesCarousel content={gqServices} />
      </div>

      <CtaBand content={gqPlanCta} />

      <div className={home.light}>
        <WhyUs content={gqWhyUs} />
      </div>

      {/* The homepage's marquee tech rows, one per group, rather than the
          landing set's static panel grid. Dark, as on the homepage;
          `.techCompact` only clears the homepage's full-viewport
          min-height for this content-height page. `loopShortRows`: rows
          too short to overflow (Backend Platforms, DevOps and Deployment)
          sat still while the others scrolled (13 Oct review: "last 2
          column are not scrolling"), so they repeat their chips to fill. */}
      <div className={home.techCompact}>
        {techStack}
      </div>

      {/* Client stories ahead of the FAQ (review: "move the testimonials
          before the FAQ") — both are light bands, so they share one
          wrapper rather than reopening the same surface twice in a row. */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={gqFaqs} idPrefix="gq-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
