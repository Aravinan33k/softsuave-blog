import type { Metadata } from 'next';

import Nav from '@/components/home/nav';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import Footer from '@/components/home/footer';
import home from '@/components/home/home.module.css';

import ServiceHero from '@/components/services/hero';
import Definition from '@/components/services/definition';
import CardSection from '@/components/services/card-section';
import CtaBand from '@/components/services/cta-band';
import Process from '@/components/services/process';
import TechStack from '@/components/services/tech-stack';
import Faq from '@/components/services/faq';

import { JsonLd } from '@/components/seo/json-ld';
import { BASE_PATH } from '@/lib/flags';
import { breadcrumbLd, faqPageLd, serviceLd } from '@/lib/seo/jsonld';
import * as copy from '@/lib/services/ai-development';

/**
 * Custom AI Development Services — /ai-development-service.
 *
 * A server component: the copy is static, so the whole page prerenders and only
 * the sections that genuinely need the browser (the hero's enquiry card, and the
 * homepage sections it reuses) ship JavaScript. The FAQ is native
 * <details>/<summary>, so it costs nothing at all.
 *
 * Three sections are the homepage's own components, not copies — Our Clients,
 * What Our Clients Say and the closing Business Enquiry CTA. They read
 * `lib/home/content.ts`, so that copy stays in exactly one place and this page
 * inherits any change to it. Everything specific to this page lives in
 * `lib/services/ai-development.ts`.
 *
 * Section ids (#services, #industries, #work, #why, #contact) match the shared
 * nav's anchors so the header links work here as they do on the homepage.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  title: `${copy.meta.title} | Soft Suave`,
  description: copy.meta.description,
  alternates: { canonical: copy.meta.path },
  openGraph: {
    title: `${copy.meta.title} | Soft Suave`,
    description: copy.meta.description,
    url: copy.meta.path,
    type: 'website',
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so
 *  it needs the already-public path. */
const HOME_HREF = BASE_PATH || '/';

export default function AiDevelopmentServicePage() {
  return (
    <div className={home.page}>
      <JsonLd
        data={[
          serviceLd({
            name: copy.meta.title,
            description: copy.meta.description,
            path: copy.meta.path,
            providerName: 'Soft Suave',
            offers: copy.offerings.items,
          }),
          faqPageLd(copy.faq.items),
          breadcrumbLd([
            { name: 'Home', path: '/' },
            { name: copy.meta.title, path: copy.meta.path },
          ]),
        ]}
      />

      {/* This page has the bar's own #services and #why sections, so its
          anchors stay in-page instead of resolving to the homepage's copies.
          `logoHref` is stated because `ownsAnchors` keeps the logo's default
          `#top` in-page too, and the lockup must go HOME from a sub-page. */}
      <Nav ownsAnchors logoHref={HOME_HREF} />

      <main id="main">
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
      </main>

      <Footer />
    </div>
  );
}
