'use client';

import {
  ngFaqs,
  ngHero,
  ngHireCta,
  ngProjectCta,
  ngServices,
  ngStacks,
  ngStories,
  ngStrengths,
  ngWhyUs,
} from '@/lib/home/angular-app-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import ServicesCarousel from '@/components/common/services-carousel';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import StoryCards from '@/components/common/story-cards';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim: the logo band, the awards wall and the
// reviews band. The testimonials heading here is the homepage's to the word;
// the clients heading is shorter on the live page, but the logos are the same,
// so the shared band is used rather than a second copy of it.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

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
      {/* Compact look — the same hero as the rest of the surface. */}
      <Hero content={ngHero} idPrefix="ng" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      {/* Centre-focused carousel — one service in focus with its neighbours
          as context, each card wearing its own artwork. */}
      <ServicesCarousel content={ngServices} />

      {/* Four stacks, the three supporting claims above them. */}
      <div className={home.light}>
        <Industries content={ngStacks} id="stacks" columns={4} />
      </div>

      {/* Carries this page's three counters. */}
      <CtaBand content={ngHireCta} />

      {/* Six capabilities, three across, two full rows. */}
      <div className={home.light}>
        <Industries content={ngStrengths} id="strengths" columns={3} variant="watermark" />
      </div>

      <WhyUs content={ngWhyUs} />

      {/* The live page's second conversion band, after the why-us case.
          `backdrop={false}` keeps it on the page's own ground rather than
          the coral light-field, as every corrected CTA on this surface does. */}
      <CtaBand content={ngProjectCta} backdrop={false} />

      <div className={`${home.light} ${location.awardsJoined}`}>
        <StoryCards content={ngStories} />
        {/* The live page's "Awards & Certifications" band. NOT
            `home/awards.tsx` — that file is misleadingly named and renders
            the enterprise integrations section; the awards band is
            `home/recognitions.tsx`. */}
        <Recognitions />
      </div>

      {/* The client stories now come before the FAQ, as the review asked and
          as every corrected page on this surface runs them — the proof lands
          before the objection-handling rather than after it. The live page's
          band carries the same heading and standfirst. */}
      <div className={home.light}>
        <Testimonials />
      </div>

      <Faq content={ngFaqs} idPrefix="ng-faq" />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
