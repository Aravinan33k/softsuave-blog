'use client';

import {
  rjAudience,
  rjBenefits,
  rjFaqs,
  rjHero,
  rjHireCta,
  rjOverview,
  rjServices,
  rjWhyUs,
} from '@/lib/home/reactjs-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServiceBoard from '@/components/common/service-board';
import CtaBand from '@/components/landing/cta-band';
import Industries from '@/components/landing/industries';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim. The clients band carries this page's
// own eight-logo strip rather than the homepage's larger roster on the live
// site, but the homepage's own component is reused for it anyway — see the
// content module's docblock. The reviews band IS the homepage's, to the
// word: "What Our Clients Say About Us" with the same standfirst.
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
      <Hero content={rjHero} idPrefix="rj" variant="compact" />

      <div className={home.light}>
        <Clients />
      </div>

      <Overview content={rjOverview} variant="compact" />

      {/* Six names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <div className={home.light}>
        <ServiceBoard content={rjServices} />
      </div>

      <CtaBand content={rjHireCta} />

      <div className={home.light}>
        <Industries content={rjBenefits} id="benefits" columns={3} />
      </div>

      {/* "We Work For" names three audiences and describes them only in one
          closing sentence, so it renders as a claim list rather than as
          cards needing a body each we do not have. Its own "Talk to
          Experts" button carries through as the claim list's cta. */}
      <div className={home.light}>
        <Overview content={rjAudience} id="audience" variant="compact" />
      </div>

      <WhyUs content={rjWhyUs} />

      {/* Client stories ahead of the FAQ (review: "move the testimonials
          before the FAQ") — both are light bands, so they share one
          wrapper rather than reopening the same surface twice in a row.
          Homepage client stories, on the warm-white band as they are
          there — the live page's band carries the same heading and
          standfirst. */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={rjFaqs} idPrefix="rj-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
