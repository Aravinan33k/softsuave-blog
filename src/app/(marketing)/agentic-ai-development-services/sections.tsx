'use client';

import type { ReactNode } from 'react';
import {
  hero as heroContent,
  overview as overviewContent,
  comparison as comparisonContent,
  services as servicesContent,
  midCta as midCtaContent,
  process as processContent,
  whyUs as whyUsContent,
  faq as faqContent,
} from '@/lib/home/agentic-ai';
// Every band below is a landing-page section component shared with the
// Generative AI page. Each takes its copy as a prop and defaults to that page's
// content, so both pages render from one implementation and neither repeats a
// look the homepage owns. Case studies and the closing CTA still read their copy
// from `lib/home/content.ts` — one source of truth per section.
import Hero from '@/components/generative-ai/hero';
import Overview from '@/components/generative-ai/overview';
import Comparison from '@/components/generative-ai/comparison';
import ServicesGrid from '@/components/common/services-grid';
import CtaBand from '@/components/generative-ai/cta-band';
import Process from '@/components/generative-ai/process';
import WhyUs from '@/components/generative-ai/why-us';
import CaseStudies from '@/components/home/work-grid';
import Faq from '@/components/generative-ai/faq';
import Contact from '@/components/home/contact';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import styles from '@/components/home/home.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 * Industries, TechStack stay on the server (tech-logo) and arrive as props.
 */
export default function Sections({ industries, industries2, techStack }: Readonly<{ industries: ReactNode; industries2: ReactNode; techStack: ReactNode }>) {
  return (
    <>
      <Hero content={heroContent} idPrefix="agentic" />

      {/* Review: "Our Clients missing" — the homepage's logo carousel. */}
      <div className={styles.light}>
        <Clients wideTitle="38ch" />
      </div>

      {/* One inverted band, mirroring the homepage's single light section —
          it carries the two reading-heavy blocks. */}
      <div className={styles.light}>
        <Overview content={overviewContent} />
        <Comparison content={comparisonContent} />
      </div>

      {/* Every service on screen at once, each card wearing its own
          artwork in its top corner — the GCC page's feature card. */}
      <ServicesGrid content={servicesContent} />
      {/* Light, not dark (1 Oct review: "black colour sections are more on
          this page"): services, applications and the CTA band ran ~3,300px
          of unbroken black. The page now alternates dark / light / dark
          through this stretch. */}
      <div className={styles.light}>
        {industries}
      </div>
      <CtaBand content={midCtaContent} />

      <div className={styles.light}>
        <Process content={processContent} />
        {industries2}
      </div>

      <WhyUs content={whyUsContent} />

      <div className={styles.light}>
        <CaseStudies />
      </div>

      {techStack}

      {/* Client stories and the FAQ close on the warm-white band, the same
          bookend as the homepage and the sibling landing pages. */}
      <div className={styles.light}>
        <Testimonials />
        <Faq content={faqContent} />
      </div>

      <Contact />
    </>
  );
}
