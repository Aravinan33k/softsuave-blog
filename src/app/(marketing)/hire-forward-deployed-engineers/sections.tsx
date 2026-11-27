'use client';

import { Hero } from '@/components/fde/sections/Hero';
import { TrustedBy } from '@/components/fde/sections/TrustedBy';
import { ModelPartners } from '@/components/fde/sections/ModelPartners';
import { Comparison } from '@/components/fde/sections/Comparison';
import { EngagementModels } from '@/components/fde/sections/EngagementModels';
import { Protocol } from '@/components/fde/sections/Protocol';
import { WhyFde } from '@/components/fde/sections/WhyFde';
import { CtaBanner } from '@/components/fde/sections/CtaBanner';
import { Testimonials } from '@/components/fde/sections/Testimonials';
import { Faq } from '@/components/fde/sections/Faq';
import '@/components/fde/fde.css';

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
      <Hero />
      <TrustedBy />
      <ModelPartners />
      <Comparison />
      <EngagementModels />
      <Protocol />
      <WhyFde />
      <CtaBanner />
      <Testimonials />
      <Faq />
    </>
  );
}
