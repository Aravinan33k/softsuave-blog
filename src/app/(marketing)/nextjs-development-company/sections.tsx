'use client';

import type { ReactNode } from 'react';
import {
  nxFaqs,
  nxHero,
  nxOverview,
  nxPlanCta,
  nxServices,
  nxWhyUs,
} from '@/lib/home/nextjs-content';
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
      <Hero content={nxHero} idPrefix="nx" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      <Overview content={nxOverview} variant="compact" />

      {/* Centre-focused carousel — one service in focus with its neighbours
          as context, each card wearing its own artwork. */}
      <div className={home.light}>
        <ServicesCarousel content={nxServices} />
      </div>

      <CtaBand content={nxPlanCta} />

      <div className={home.light}>
        <WhyUs content={nxWhyUs} />
      </div>

      {/* The landing set's grouped panel grid, not the homepage's marquee.
          The marquee scrolls each row continuously, so at any moment the
          chips at both ends are cut mid-word — fine as homepage motion,
          but this is a reference table a reader scans, and the review
          asked for the design to be updated. The same grid the .NET,
          Ionic and Flutter pages use, so the surface reads as one set. */}
      {techStack}

      {/* The client stories now come before the FAQ, as the review asked and
          as every corrected page on this surface runs them — the proof lands
          before the objection-handling rather than after it. They share the
          warm-white band, so the two read as one closing chapter. */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={nxFaqs} idPrefix="nx-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
