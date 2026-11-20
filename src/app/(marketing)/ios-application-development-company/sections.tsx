'use client';

import {
  iosBenefits,
  iosDevelopersCta,
  iosFaqs,
  iosHero,
  iosLaunchCta,
  iosServices,
  iosStories,
  iosTech,
  iosWhyUs,
} from '@/lib/home/ios-app-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Springboard from '@/components/ios-app/springboard';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import StoryCards from '@/components/common/story-cards';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
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
      {/* Compact look — the same hero as the other service pages, so the
          marketing surface reads as a matched set. */}
      <Hero content={iosHero} idPrefix="ios" variant="compact" />

      <div className={home.light}>
        <Clients />
      </div>

      {/* Six services on rounded square tiles — the home-screen grid the
          iPhone, Watch and TV work all share. */}
      <Springboard content={iosServices} />

      {/* Four technology themes, with the section's own three bullets. */}
      <div className={home.light}>
        <Industries content={iosTech} id="tech" columns={4} />
      </div>

      {/* Carries the page's three counters. */}
      <CtaBand content={iosLaunchCta} />

      <div className={home.light}>
        <Industries content={iosBenefits} id="benefits" columns={3} variant="watermark" />
      </div>

      <Industries content={iosWhyUs} id="why" columns={3} />

      <CtaBand content={iosDevelopersCta} />

      {/* This page's own three case studies, not the homepage gallery. */}
      <div className={home.light}>
        <StoryCards content={iosStories} />
      </div>

      {/* The live page's "Awards & Certifications" band. NOT
          `home/awards.tsx` — that file is misleadingly named and renders
          the enterprise integrations section; the awards band is
          `home/recognitions.tsx` (id="awards"). */}
      <Recognitions />

      {/* Homepage client stories, on the warm-white band as they are there. */}
      <div className={home.light}>
        <Testimonials />
      </div>

      <Faq content={iosFaqs} idPrefix="ios-faq" />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
