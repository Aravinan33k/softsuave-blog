'use client';

import type { ReactNode } from 'react';
import { services as servicesContent } from '@/lib/home/generative-ai';
// The closing CTA still reads its copy from `lib/home/content.ts` — one
// source of truth per section — but renders in this surface's own layout
// rather than the homepage's pinned focus-pull, so it doesn't repeat a look
// the homepage owns. Case studies and the tech stack are the exception: their
// content here is the homepage's own, verbatim, so they render with the
// homepage's actual components rather than a second implementation of the
// same section.
import CaseStudies from '@/components/home/work-grid';
import Contact from '@/components/home/contact';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Hero from '@/components/generative-ai/hero';
import Overview from '@/components/generative-ai/overview';
import Problems from '@/components/generative-ai/problems';
import ServicesGrid from '@/components/common/services-grid';
import CtaBand from '@/components/generative-ai/cta-band';
import Integration from '@/components/generative-ai/integration';
import Process from '@/components/generative-ai/process';
import WhyUs from '@/components/generative-ai/why-us';
import Faq from '@/components/generative-ai/faq';
import styles from '@/components/home/home.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 * Industries, TechStack stay on the server (tech-logo) and arrive as props.
 */
export default function Sections({ industries, techStack }: Readonly<{ industries: ReactNode; techStack: ReactNode }>) {
  return (
    <>
      <Hero />

      {/* The homepage's client logo carousel — this page had no proof band
          between the hero and the overview at all. */}
      <div className={styles.light}>
        <Clients />
      </div>

      {/* Band rhythm. The marketing surface alternates dark and inverted
          sections so a long page breathes; with a single light band up top,
          everything from Services down ran as one unbroken near-black slab.
          Sections are grouped two or three to a band rather than flipped one
          by one, which would strobe. Both CTA panels and the hero stay dark:
          they are the page's punctuation and want the deepest ground. */}
      <div className={styles.light}>
        <Overview />
        <Problems />
      </div>

      {/* Every service on screen at once, each card wearing its own
          artwork in its top corner — the GCC page's feature card. The
          centre-focused carousel this replaces showed three of ten behind a
          timer, which put the page's actual offering behind an interaction. */}
      <ServicesGrid content={servicesContent} />
      <CtaBand />

      <div className={styles.light}>
        <Integration />
        <Process />
      </div>

      {industries}

      <div className={styles.light}>
        <WhyUs />
      </div>

      <CaseStudies />

      {/* Dark, not wrapped in `.light` — on the homepage TechStack renders
          between Awards and the light Testimonials band, i.e. on the dark
          ground, and this page follows that so both pages' tech-stack
          sections carry the same background instead of this one going
          cream. `.techCompact` is unrelated to that: it only clears the
          homepage's full-viewport `min-height` for this content-height
          page, not a color concern. */}
      <div className={styles.techCompact}>
        {techStack}
      </div>

      {/* Client stories and the FAQ close the page on the warm-white
          band, mirroring the homepage's stories → Contact bookend. */}
      <div className={styles.light}>
        <Testimonials />
        <Faq />
      </div>

      <Contact />
    </>
  );
}
