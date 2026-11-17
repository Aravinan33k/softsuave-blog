'use client';

import type { ReactNode } from 'react';
import {
  anthropicFaqs,
  anthropicHero,
  anthropicOverview,
  anthropicPlanCta,
  anthropicServices,
  anthropicWhyUs,
} from '@/lib/home/anthropic-content';
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim: the clients logo band, the tech marquee,
// the testimonials band, and the closing enquiry CTA.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
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
      {/* No breadcrumb on this page (30 Sep request). */}
      <Hero content={anthropicHero} idPrefix="anthropic" variant="compact" breadcrumb={false} />

      <div className={home.light}>
        <Clients />
      </div>

      <Overview content={anthropicOverview} variant="compact" />

      <div className={home.light}>
        <ServicesCarousel content={anthropicServices} />
      </div>

      <CtaBand content={anthropicPlanCta} />

      <div className={home.light}>
        <WhyUs content={anthropicWhyUs} />
      </div>

      <div className={home.techCompact}>
        {techStack}
      </div>

      <div className={home.light}>
        <Testimonials />
        <Faq content={anthropicFaqs} idPrefix="anthropic-faq" />
      </div>

      <Contact />
    </>
  );
}
