'use client';

import type { ReactNode } from 'react';
import {
  vueFaqs,
  vueHero,
  vueOverview,
  vuePlanCta,
  vueServices,
  vueWhyUs,
} from '@/lib/home/vuejs-content';
// Shared landing-page surface — every section the brief calls for already had
// a home here; this page adds none of its own.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim, as the content doc asks: the clients logo
// band, the testimonials band, and the closing enquiry CTA. TechStack is the
// homepage's own marquee too — the same choice made for the Next.js,
// TypeScript and GraphQL pages from the same doc, so they read as a matched set.
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
      <Hero content={vueHero} idPrefix="vue" variant="compact" />

      <div className={home.light}>
        <Clients />
      </div>

      <Overview content={vueOverview} variant="compact" />

      {/* Centre-focused carousel — one service in focus with its neighbours
          as context, each card wearing its own artwork. */}
      <div className={home.light}>
        <ServicesCarousel content={vueServices} />
      </div>

      <CtaBand content={vuePlanCta} />

      <div className={home.light}>
        <WhyUs content={vueWhyUs} />
      </div>

      {/* The homepage's tech rows, one per group, rather than the landing
          set's static panel grid. Dark, as on the homepage; `.techCompact`
          only clears the homepage's full-viewport min-height for this
          content-height page. `staticFrom` holds the rows still from tablet
          width up — they wrap rather than scroll (29 Sep review: stop the
          "Backend Platforms" row scrolling); phones keep the scrolling rows. */}
      <div className={home.techCompact}>
        {techStack}
      </div>

      {/* Client stories, then the FAQ, on one warm-white band (29 Sep
          review: testimonials before the FAQ). */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={vueFaqs} idPrefix="vue-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
