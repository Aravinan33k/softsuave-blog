'use client';

import {
  madCaseStudies,
  madEngagement,
  madFaqs,
  madHero,
  madHireCta,
  madIndustries,
  madPlatforms,
  madProcess,
  madServices,
  madWhyUs,
} from '@/lib/home/mobile-app-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import ServiceSlats from '@/components/mobile-app/service-slats';
import PlatformTabs from '@/components/mobile-app/platform-tabs';
import ReleaseTrack from '@/components/mobile-app/release-track';
import WhyUs from '@/components/landing/why-us';
import Industries from '@/components/landing/industries';
import EngagementModels from '@/components/common/engagement-models';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section. The
// live page's clients band carries the identical heading, so it is literally
// the same section.
import Clients from '@/components/home/clients';
import CaseStudies from '@/components/home/work-grid';
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
      <Hero content={madHero} idPrefix="mad" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      {/* Seven slats, all on screen, one of them open. The section's
          argument is the range, so the range stays visible. */}
      <ServiceSlats content={madServices} />

      {/* "Choose the right technology" — so it is built as a chooser. */}
      <div className={home.light}>
        <PlatformTabs content={madPlatforms} />
      </div>

      {/* Six phases on one rail, alternating above and below it. */}
      <ReleaseTrack content={madProcess} />

      <div className={home.light}>
        <WhyUs content={madWhyUs} />
      </div>

      {/* Nine sectors: three across, three full rows, no orphan card. */}
      <Industries content={madIndustries} columns={3} />

      <div className={home.light}>
        <EngagementModels content={madEngagement} />
      </div>

      {/* The dark band the live page closes its engagement section with —
          its own title, paragraph and button, so it is its own section
          here too. */}
      <CtaBand content={madHireCta} />

      {/* Homepage case-study gallery, this page's own mobile-app projects
          rather than the generic AI/Vision default (review: "need to
          update relevant case studies"). */}
      <div className={home.light}>
        <CaseStudies content={madCaseStudies} countLabel="projects" />
      </div>

      {/* Homepage client stories, on the warm-white band as they are there. */}
      <div className={home.light}>
        <Testimonials />
      </div>

      <Faq content={madFaqs} idPrefix="mad-faq" />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
