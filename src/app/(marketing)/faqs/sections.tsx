'use client';

import {
  faqsGeneral,
  faqsHire,
  faqsPageCta,
  faqsPageHero,
  faqsProject,
} from '@/lib/home/faqs-content';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import SectionHead from '@/components/landing/section-head';
import Faq from '@/components/landing/faq';
import CtaBand from '@/components/landing/cta-band';
import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

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
      <section className={landing.indexHead} id="top">
        <SectionHead
          level={1}
          kicker={faqsPageHero.eyebrow}
          title={faqsPageHero.title}
          intro={faqsPageHero.intro}
        />
      </section>

      <div className={home.light}>
        <Faq content={faqsGeneral} idPrefix="faq-general" />
      </div>

      <Faq content={faqsProject} idPrefix="faq-project" />

      <div className={home.light}>
        <Faq content={faqsHire} idPrefix="faq-hire" />
      </div>

      <CtaBand content={faqsPageCta} />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
