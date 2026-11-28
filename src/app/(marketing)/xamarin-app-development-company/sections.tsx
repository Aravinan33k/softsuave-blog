'use client';

import {
  xamHero,
  xamHireCta,
  xamOverview,
  xamServices,
  xamTech,
} from '@/lib/home/xamarin-app-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import PlatformTabs from '@/components/mobile-app/platform-tabs';
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
 */
export default function Sections() {
  return (
    <>
      {/* Compact look — the same hero as the other app-development pages,
          so the marketing surface reads as a matched set. */}
      <Hero content={xamHero} idPrefix="xam" variant="compact" />

      <div className={home.light}>
        <Overview content={xamOverview} variant="compact" />
      </div>

      {/* Four names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <ServiceBoard content={xamServices} />

      {/* The CTA now sits between the services and the technology stack, as
          the review asked — the reader is invited to act straight off the
          services they have just read, rather than after a grid of logos. */}
      <CtaBand content={xamHireCta} />

      {/* Moving the CTA up leaves the stack and the stories adjacent on the
          warm white, so they share one wrapper: two light bands stacked
          would double the padding between them and read as separate panels
          rather than one chapter. Same merge `landing/hire-page` does with
          its own runs. */}
      <div className={home.light}>
        {/* The Mobile App page's tab chooser (review: "change the tech stack
            design like this page - /mobile-application-development-company"),
            keeping this section's `#tech` anchor. */}
        <PlatformTabs content={xamTech} id="tech" />
        {/* Homepage client stories — the live page's band carries the same
            heading and standfirst. */}
        <Testimonials />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
