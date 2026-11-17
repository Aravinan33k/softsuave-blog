'use client';

import type { ReactNode } from 'react';
import {
  itoCaseStudies,
  itoCollaboration,
  itoDestinations,
  itoDestinationsNotes,
  itoFaqs,
  itoFit,
  itoHero,
  itoIndustries,
  itoMidCta,
  itoModels,
  itoOverview,
  itoProcess,
  itoServices,
  itoServicesCta,
  itoWhyUs,
} from '@/lib/home/it-outsourcing-content';
import { linkify } from '@/components/common/linkify';
// COMPANY-LEVEL SECTIONS — the homepage's own components: the case-study lane
// (with this page's own stories), testimonials and the closing enquiry band.
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import Comparison from '@/components/landing/comparison';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';
import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

function DestinationsNotes() {
  const used = new Set<string>();
  return (
    <div className={landing.sectionShell}>
      <div className={landing.prose}>
        {itoDestinationsNotes.paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{linkify(p, itoDestinationsNotes.links, used, landing.proseLink)}</p>
        ))}
      </div>
    </div>
  );
}

function ServicesCta() {
  return (
    <div className={landing.sectionShell}>
      <div className={landing.overviewCtaCenter}>
        <p style={{ margin: '0 0 18px', fontSize: 'var(--fs-body)', fontWeight: 600, color: 'var(--text-bright)' }}>
          {itoServicesCta.line}
        </p>
        <a href={itoServicesCta.cta.href} className={`${landing.btn} ${landing.btnPrimary}`}>
          {itoServicesCta.cta.label}
        </a>
      </div>
    </div>
  );
}

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
      <Hero content={itoHero} idPrefix="it-outsourcing" />

      <div className={home.light}>
        <Overview content={itoOverview} />
      </div>

      {/* Whole cards link (review: "remove the 'Learn More' and make the
          whole card clickable"). */}
      <Services content={itoServices} variant="bold" cardLinks />
      <ServicesCta />

      <div className={home.light}>
        <Overview content={itoFit} id="fit" />
      </div>

      <Comparison content={itoDestinations} id="destinations" />
      <DestinationsNotes />

      <div className={home.light}>
        <Comparison content={itoModels} id="models" />
      </div>

      <CtaBand content={itoMidCta} />

      <div className={home.light}>
        <Process content={itoProcess} />
      </div>

      <Overview content={itoCollaboration} id="collaboration" />

      <div className={home.light}>
        <CardGrid content={itoIndustries} id="industries" variant="feature" />
      </div>

      <CardGrid content={itoWhyUs} id="why" variant="feature" />

      <div className={home.light}>
        {techStack}
      </div>

      <WorkGrid content={itoCaseStudies} id="results" countLabel="success stories" />

      <div className={home.light}>
        <Testimonials />
        <Faq content={itoFaqs} idPrefix="it-outsourcing-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
