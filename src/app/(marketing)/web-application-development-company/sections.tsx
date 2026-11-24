'use client';

import {
  webAudience,
  webCoreTech,
  webOutsourceCta,
  webDelivery,
  webFaqs,
  webHero,
  webOverview,
  webProcess,
  webServices,
  webSpecialties,
  webWhyUs,
} from '@/lib/home/web-app-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Integration from '@/components/common/integration';
import ServiceBoard from '@/components/common/service-board';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// copy for both IS the homepage's, to the word — its clients band reads
// "Preferred AI-Enabled Technology Partner for Startups and SMBs" and its
// reviews band "What Our Clients Say About Us", each with the same standfirst.
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
 */
export default function Sections() {
  return (
    <>
      {/* Compact look — the same hero as the rest of the surface. */}
      <Hero content={webHero} idPrefix="web" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      <Overview content={webOverview} variant="compact" />

      {/* Two blocks, front end and back end, each with its own paragraph. */}
      <div className={home.light}>
        <Integration content={webSpecialties} id="specialties" />
      </div>

      {/* Six names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <ServiceBoard content={webServices} />

      {/* The live page's conversion band, between the services and the
          technology grid. `backdrop={false}` keeps it on the page's own
          ground rather than the coral light-field, as every corrected CTA on
          this surface now does. */}
      <CtaBand content={webOutsourceCta} backdrop={false} />

      {/* Eight technologies four across, then the four delivery models. They
          share a band so the process scene below keeps a clean alternation
          over a page this long.
          
          `autoLink` on both: every card in the two grids names a page we
          publish, and neither anchor ("core-tech", "engagement") is a word
          the id heuristic in `landing/industries` looks for, so both grids
          were rendering as plain statements. */}
      <div className={home.light}>
        <Industries content={webCoreTech} id="core-tech" autoLink />
        <Industries content={webDelivery} id="engagement" variant="watermark" autoLink />
      </div>

      {/* Seven stages, one row of five then two on a wide desktop. */}
      <Process content={webProcess} variant="stages" />

      {/* "Who We Work With" names three audiences and describes none, so they
          render as the overview's claim list rather than as empty cards. */}
      <div className={home.light}>
        <Overview content={webAudience} id="audience" variant="compact" />
      </div>

      <WhyUs content={webWhyUs} />

      {/* The closing pair share the warm-white band, same reason as the two
          grids above — with the client stories first, as the review asked
          and as every corrected page on this surface runs them: the proof
          lands before the objection-handling rather than after it. */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={webFaqs} idPrefix="web-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
