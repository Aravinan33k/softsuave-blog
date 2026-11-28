'use client';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import home from '@/components/home/home.module.css';
import ServiceHero from '@/components/services/hero';
import Definition from '@/components/services/definition';
import CardSection from '@/components/services/card-section';
import CtaBand from '@/components/services/cta-band';
import Process from '@/components/services/process';
import TechStack from '@/components/services/tech-stack';
import Faq from '@/components/services/faq';
import * as copy from '@/lib/services/ai-development';

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
      <ServiceHero {...copy.hero} />

      {/* Client proof immediately under the hero, on the light band it wears
          on the homepage — the names are the first answer to "who are you". */}
      <div className={home.light}>
        <Clients />
      </div>

      <Definition {...copy.definition} />

      <div className={home.light}>
        <CardSection id="services" {...copy.offerings} />
      </div>

      <CardSection id="why" {...copy.whyChoose} />

      <div className={home.light}>
        <CtaBand {...copy.ctaBands.approach} />
      </div>

      <Process {...copy.process} />

      <div className={home.light}>
        <CardSection id="industries" {...copy.industries} />
      </div>

      <CtaBand {...copy.ctaBands.estimate} />

      <div className={home.light}>
        <TechStack {...copy.techStack} />
      </div>

      <Testimonials />

      <div className={home.light}>
        <Faq {...copy.faq} />
      </div>

      <Contact />
    </>
  );
}
