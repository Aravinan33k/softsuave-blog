'use client';

import type { ReactNode } from 'react';
import {
  caApproachCta,
  caCaseStudies,
  caEstimateCta,
  caFaqs,
  caHero,
  caIndustries,
  caOfferings,
  caOverview,
  caProcess,
  caWhyUs,
} from '@/lib/home/custom-ai-content';
// Shared landing-page surface. Same components the generative-AI page uses —
// its own design language (bordered panels and grids) over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
// The homepage's horizontal work lane, reused for this page's offerings —
// same component the hire pages run for their expertise band.
import ServicesLane from '@/components/home/work-grid';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Process from '@/components/landing/process';
import Industries from '@/components/landing/industries';
import CaseStudies from '@/components/landing/case-studies';
import Testimonials from '@/components/home/testimonials';
import Faq from '@/components/landing/faq';
import Contact from '@/components/home/contact';
// The homepage's own client logo carousel — this page used to show a
// stats-only panel with no logos in it.
import Clients from '@/components/home/clients';
import home from '@/components/home/home.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 * Comparison, TechStack stay on the server (tech-logo) and arrive as props.
 */
export default function Sections({ comparison, techStack }: Readonly<{ comparison: ReactNode; techStack: ReactNode }>) {
  return (
    <>
      <Hero content={caHero} idPrefix="custom-ai" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      <Overview content={caOverview} />

      {/*
       * The five offerings run as the homepage's horizontal work lane rather
       * than the numbered card grid this page opened with. Same five items
       * and the same copy — `name` becomes the tile title, which is what
       * this template calls that field, and each card's hand-placed artwork
       * carries straight over.
       *
       * `id="services"` because the lane defaults to `#work`, which the case
       * studies section further down this page already owns; two sections
       * sharing an id would break the nav anchor and leave a duplicate id in
       * the document. `countLabel` follows suit — the tiles are services, so
       * the counter reads "05 services" and not "05 projects".
       *
       * No `outro`: the lane's closing card is a pitch written for case
       * studies ("The next one is yours"), and omitting it simply ends the
       * lane on the last real offering.
       */}
      <div className={home.light}>
        <ServicesLane
          id="services"
          countLabel="services"
          content={{
            eyebrow: caOfferings.eyebrow,
            title: caOfferings.title,
            body: caOfferings.body,
            items: caOfferings.items.map((s) => ({
              title: s.name,
              body: s.body,
              tag: s.tag,
              // The lane takes `src`/`alt` only — it sizes the media itself,
              // so the intrinsic width/height on the source asset are not
              // carried across.
              image: s.image ? { src: s.image.src, alt: s.image.alt } : undefined,
              // Each card opens its own service page (1 Oct review).
              href: s.href,
            })),
          }}
        />
      </div>

      {comparison}

      <div className={home.light}>
        <CtaBand content={caApproachCta} />
      </div>

      <WhyUs content={caWhyUs} />

      <div className={home.light}>
        <Process content={caProcess} />
      </div>

      <CtaBand content={caEstimateCta} />

      <div className={home.light}>
        <Industries content={caIndustries} columns={3} />
      </div>

      <CaseStudies content={caCaseStudies} />

      <div className={home.light}>
        {techStack}
      </div>

      {/* Client stories and the FAQ share the closing warm-white band, so
          the run reads CaseStudies(dark) → stories + FAQ(light) →
          Contact(dark), the same bookend the homepage uses. */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={caFaqs} idPrefix="custom-ai-faq" />
      </div>

      <Contact />
    </>
  );
}
