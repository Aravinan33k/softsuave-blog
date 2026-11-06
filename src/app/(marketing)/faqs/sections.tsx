'use client';

import {
  faqsGeneral,
  faqsHire,
  faqsPageEnquiry,
  faqsPageHero,
  faqsPageIntro,
  faqsProject,
} from '@/lib/home/faqs-content';
import { navHref } from '@/themes/softsuave/nav-data';
import Hero from '@/components/landing/hero';
import SectionHead from '@/components/landing/section-head';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
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
      <Hero content={faqsPageHero} idPrefix="faqs" variant="compact" breadcrumb={false} />

      <div className={home.light}>
        <section className={landing.sectionShell} id="faqs-intro">
          <SectionHead title={faqsPageIntro.title} intro={faqsPageIntro.body} />
        </section>
        <Faq content={faqsGeneral} idPrefix="faq-general" />
      </div>

      <Faq content={faqsProject} idPrefix="faq-project" />

      <div className={home.light}>
        <Faq content={faqsHire} idPrefix="faq-hire" />
      </div>

      {/* The live page's closing "Book Free Consultation" block; its "Schedule a Call" goes to the free-consultation page. */}
      <ManagerEnquiry
        content={{
          ...faqsPageEnquiry,
          manager: {
            ...faqsPageEnquiry.manager,
            cta: faqsPageEnquiry.manager.cta && {
              ...faqsPageEnquiry.manager.cta,
              href: navHref(faqsPageEnquiry.manager.cta.href),
            },
          },
        }}
        id="enquiry"
        idPrefix="faqs-contact"
      />
    </>
  );
}
