import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { maplFaqLd } from '@/lib/seo/mobile-app-development-company-poland';
import {
  maplAbout,
  maplClose,
  maplCta,
  maplExpertise,
  maplFaqs,
  maplHero,
  maplMeta,
  maplTechnologies,
} from '@/lib/home/mobile-app-poland-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
// The location pages' hero, overview, FAQ and closing band.
import Hero from '@/components/generative-ai/hero';
import Overview from '@/components/generative-ai/overview';
import Faq from '@/components/generative-ai/faq';
import ConsultationClose from '@/components/common/consultation-close';
// The shared mid-page CTA band.
import CtaBand from '@/components/generative-ai/cta-band';
// Technology groups with prose, checklists and logo chips.
import TechGroupCards from '@/components/common/tech-group-cards';

import home from '@/components/home/home.module.css';
// The location pages' type, rhythm and section widths (heading weight 600,
// the hire-software-developers reference's spacing, the overview heading and
// FAQ answer widths), shared rather than redefined.
import location from '@/components/landing/location-app-page.module.css';

/**
 * Mobile App Development Company Poland — softsuave.com's
 * /mobile-app-development-company-poland carried into the new theme, slug
 * unchanged, every word from `lib/home/mobile-app-poland-content.ts`.
 *
 * The live Poland page is a different layout from the Dubai/Germany/Italy/
 * Maryland template (no clients strip, "who we work for", portfolio or
 * process; an expertise band, a technologies band and a mid-page CTA in their
 * place), so it is composed here in its own section order, from the same
 * shared sections and the same page styles as `LocationAppPage`.
 *
 * Band rhythm: hero dark, about light, expertise dark, technologies light,
 * the CTA band (its own dark surface), FAQ light, closing band dark.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD.
 */

export const revalidate = 300;

const OG_IMAGE = { url: maplMeta.ogImage };

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: maplMeta.title,
  description: maplMeta.description,
  // The live page carries a keywords meta; kept verbatim.
  keywords: maplMeta.keywords,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: maplMeta.canonical },
  robots: pageRobots,
  openGraph: {
    title: maplMeta.ogTitle,
    description: maplMeta.ogDescription,
    url: maplMeta.canonical,
    siteName: maplMeta.ogSiteName,
    // Live serves "Website"; Next.js only emits the protocol's lowercase value.
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: maplMeta.twitterSite,
    title: maplMeta.ogTitle,
    description: maplMeta.ogDescription,
    images: [OG_IMAGE.url],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function MobileAppDevelopmentCompanyPolandPage() {
  return (
    <div className={`${home.page} ${location.root}`} data-type-scale="hire">
      {/* softsuave.com's own schema for this page, verbatim — its lone
          FAQPage. The route is in PAGES_WITH_OWN_SITE_GRAPH, so the layout
          adds nothing beside it. */}
      <JsonLd data={maplFaqLd} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={maplHero} idPrefix="mobile-app-poland" wide />

        <div className={home.light}>
          <Overview content={maplAbout} />
        </div>

        <TechGroupCards content={maplExpertise} id="expertise" itemHeading="h4" columns={2} />

        <div className={home.light}>
          <TechGroupCards content={maplTechnologies} id="tech" columns={3} />
        </div>

        <CtaBand content={maplCta} titleAs="h3" />

        <div className={home.light}>
          <Faq content={maplFaqs} idPrefix="mobile-app-poland-faq" questionAs="h4" />
        </div>

        <ConsultationClose content={maplClose} idPrefix="mobile-app-poland-close" />
      </main>

      <Footer />
    </div>
  );
}
