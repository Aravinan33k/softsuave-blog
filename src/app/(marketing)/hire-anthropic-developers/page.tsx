import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { softSuaveOrganizationLd } from '@/lib/seo/ai-page-schema';
import {
  anthropicFaqLd,
  anthropicServiceLd,
  anthropicWebPageLd,
} from '@/lib/seo/hire-anthropic-developers';
import {
  anthropicFaqs,
  anthropicHero,
  anthropicMeta,
  anthropicOverview,
  anthropicPlanCta,
  anthropicServices,
  anthropicTech,
  anthropicWhyUs,
} from '@/lib/home/anthropic-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';

// Reused from the homepage verbatim: the clients logo band, the tech marquee,
// the testimonials band, and the closing enquiry CTA.
import Clients from '@/components/home/clients';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Hire Anthropic Developers landing page.
 *
 * A clone of `/vuejs-development-company`: same sections, same order, same
 * bands — only the copy (`lib/home/anthropic-content.ts`) and the structured
 * data (`lib/seo/hire-anthropic-developers.ts`) differ. No breadcrumb, as on
 * the Vue page. Registered in lib/home/landing-pages.ts, which gates it behind
 * the homepage release flag.
 *
 * A SERVER component on purpose: only a server component may export
 * `metadata`, and the (marketing) layout's own metadata is the homepage's.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

// PLACEHOLDER: a copy of the Vue page's OG image until real artwork replaces it.
const ogImage = absoluteUrl('/assets/images/hire-anthropic-developers-og.webp');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${anthropicMeta.title} | Soft Suave`,
  description: anthropicMeta.description,
  alternates: { canonical: anthropicMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${anthropicMeta.title} | Soft Suave`,
    description: anthropicMeta.description,
    url: absoluteUrl(anthropicMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: anthropicMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${anthropicMeta.title} | Soft Suave`,
    description: anthropicMeta.description,
    images: [ogImage],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function HireAnthropicDevelopersPage() {
  return (
    <div className={home.page}>
      <JsonLd data={softSuaveOrganizationLd} />
      <JsonLd data={[anthropicServiceLd, anthropicWebPageLd, anthropicFaqLd]} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
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
          <TechStack content={anthropicTech} staticFrom={768} />
        </div>

        <div className={home.light}>
          <Testimonials />
          <Faq content={anthropicFaqs} idPrefix="anthropic-faq" />
        </div>

        <Contact />
      </main>

      <Footer addressMicrodata={false} />
    </div>
  );
}
