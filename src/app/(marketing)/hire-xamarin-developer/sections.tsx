'use client';

import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroCtas } from '@/lib/home/delivery-shared';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import {
  hxComparison,
  hxExpertise,
  hxFaqs,
  hxHero,
  hxProcess,
  hxServices,
  hxSkillCheck,
  hxWhyHire,
} from '@/lib/home/hire-xamarin-content';
// The hire-software-developers bands: the hero, process, comparison and FAQ
// every hire-by-role page renders, plus the homepage's own clients, client
// stories and closing enquiry band.
import Hero from '@/components/generative-ai/hero';
import Process from '@/components/generative-ai/process';
import Comparison from '@/components/generative-ai/comparison';
import Faq from '@/components/generative-ai/faq';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
// The sections this page's brief borrows from sibling pages: TypeScript's Why
// Choose Us and Services, Data Science's Technology Stack, and the
// hire-php-developers card grid for the vetting band.
import WhyUs from '@/components/landing/why-us';
import ServicesCarousel from '@/components/common/services-carousel';
import TechCluster from '@/components/data-science/tech-cluster';
import CardGrid from '@/components/landing/industries';
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
      {/* The partner lockups and trial/meeting pair are the company's
          standing, added here as `HireRolePage` adds them. */}
      <Hero
        content={{ ...hxHero, badges: partnerHeroBadges, ctas: sharedHeroCtas }}
        idPrefix="hire-xamarin"
      />

      <div className={home.light}>
        <Clients />
        <WhyUs content={hxWhyHire} />
      </div>

      <Process content={hxProcess} />

      <div className={home.light}>
        <TechCluster content={hxExpertise} />
      </div>

      <ServicesCarousel content={hxServices} />

      <div className={home.light}>
        <CardGrid content={hxSkillCheck} id="vetting" variant="bold" span={3} />
      </div>

      <Comparison content={hxComparison} id="compare" />

      <div className={home.light}>
        <Testimonials />
        <Faq content={hxFaqs} idPrefix="hire-xamarin-faq" />
      </div>

      {/* The old page's own "Book Free Consultation" band — the same copy
          and no eyebrow, exactly as the hire-by-skill pages close. The CTA
          keeps its /contact destination. */}
      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
