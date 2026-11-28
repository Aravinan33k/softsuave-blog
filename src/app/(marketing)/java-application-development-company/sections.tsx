'use client';

import {
  javaBenefits,
  javaFaqs,
  javaHero,
  javaHireCta,
  javaMidCta,
  javaOverview,
  javaServices,
  javaSuccessStories,
  javaTechniques,
  javaWhyUs,
} from '@/lib/home/java-content';
// Shared landing-page surface — every section the live page calls for already
// had a home here; this page adds none of its own.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
// Company-level bands: the homepage's own components over the homepage's own
// facts (`lib/home/content.ts`). The live page carries a client strip, a
// success-story carousel, an awards row and a testimonials block; all four are
// statements about Soft Suave, not about Java, so they are made with the same
// components and the same words the rest of the site uses rather than a second
// copy free to drift.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
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
      <Hero content={javaHero} idPrefix="java" variant="compact" />

      {/* Bands follow the live page's order and alternate light and dark
          like the other development pages (13 Oct review: "some sections
          are not properly arranged, need arrange the sections similar to
          the existing pages"). It used to open the techniques lead before
          the services and then run three dark bands in a row. */}

      {/* The live page's "Trusted Partner for Startups and SMBs." strip. */}
      <div className={home.light}>
        <Clients />
      </div>

      {/* Centre-focused carousel: one service in focus with its neighbours
          as context. Six services, as the live page lists them. */}
      <ServicesCarousel content={javaServices} />

      {/* The live page's "Advanced Java Development Techniques" section,
          after the services as there: its lead (paragraph, three claims,
          CTA and the three counters), then the six techniques, each with
          the live page's own illustration — one band, so the two read as
          the single section they are on the live page. */}
      <div className={home.light}>
        <Overview content={javaOverview} variant="compact" />
        <CardGrid content={javaTechniques} id="techniques" variant="list" />
      </div>

      <CtaBand content={javaMidCta} />

      {/* The six enterprise benefits — the `bold` variant's asymmetric
          12-column composition, the same one the GCC page's "Who It Fits"
          band uses. No artwork on the live page for these, so they take the
          text card rather than the picture card. */}
      <div className={home.light}>
        <CardGrid content={javaBenefits} id="benefits" variant="bold" />
      </div>

      <WhyUs content={javaWhyUs} />

      {/* The live page's "Looking For Expert Java Developers?" band. Its CTA
          is the one link that leaves this page, for the hire-by-skill page
          this app already serves. */}
      <CtaBand content={javaHireCta} />

      {/* Success stories, awards and certifications, then client
          testimonials and the FAQ — the live page's own order, on the
          homepage's light/dark/light break around `Recognitions`. */}
      <div className={home.light}>
        <WorkGrid content={javaSuccessStories} countLabel="case studies" />
      </div>

      <Recognitions />

      <div className={home.light}>
        <Testimonials />
        <Faq content={javaFaqs} idPrefix="java-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
