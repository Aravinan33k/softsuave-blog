import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  javaFaqLd,
  javaServiceLd,
  javaWebPageLd,
} from '@/lib/seo/java-application-development-company';
import {
  javaBenefits,
  javaFaqs,
  javaHero,
  javaHireCta,
  javaMeta,
  javaMidCta,
  javaOverview,
  javaServices,
  javaSuccessStories,
  javaTechniques,
  javaWhyUs,
} from '@/lib/home/java-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Shared landing-page surface — every section the live page calls for already
// had a home here; this page adds none of its own.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';

// Company-level bands: the homepage's own components over the homepage's own
// facts (`lib/home/content.ts`). The live page carries a client strip, a
// success-story carousel, an awards row and a testimonials block; all four are
// statements about Soft Suave, not about Java, so they are made with the same
// components and the same words the rest of the site uses rather than a second
// copy free to drift.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import home from '@/components/home/home.module.css';

/**
 * Java Application Development landing page.
 *
 * Served at `/java-application-development-company` — softsuave.com's own slug
 * for this page, so this route takes over a URL that already exists rather
 * than inventing a new one. Registered in `lib/home/landing-pages.ts`, which
 * gates it behind the homepage release flag and puts it in the sitemap.
 *
 * Every word of the copy is the live page's own — see `lib/home/java-content.ts`,
 * whose header maps each live section to the export that carries it and records
 * the one typo corrected along the way.
 *
 * Structured data follows the same split as the Next.js and TypeScript pages:
 * the site-wide Organization node (`lib/seo/organization.ts`, unchanged, not
 * re-declared) plus Service, WebPage and FAQPage schemas built from this page's
 * own content, the three linked back to the Organization by `@id`.
 *
 * A SERVER component on purpose: only a server component may export `metadata`,
 * and the (marketing) layout's own metadata is the homepage's. Every section
 * below is a client component, which a server component may freely render.
 *
 * Fonts, the `.theme-four` token scope and Lenis smooth scroll all come from
 * `app/(marketing)/layout.tsx`, so nothing here re-declares them.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

// No bundled OG image for this page yet, so the dynamic /og route generates one
// from the title — the same fallback every page without a custom image gets.
const ogImage = dynamicOgImage(javaMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: `${javaMeta.title} | Soft Suave`,
  description: javaMeta.description,
  alternates: { canonical: javaMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${javaMeta.title} | Soft Suave`,
    description: javaMeta.description,
    url: absoluteUrl(javaMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [{ url: ogImage, width: 1200, height: 630, alt: javaMeta.title }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${javaMeta.title} | Soft Suave`,
    description: javaMeta.description,
    images: [ogImage],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with any mount
 * subpath, so it needs the already-public path — hence the fallback, without
 * which an empty BASE_PATH would render `href=""`.
 */
const HOME_HREF = BASE_PATH || '/';

export default function JavaApplicationDevelopmentCompanyPage() {
  // Matches the live page's own breadcrumb trail exactly: Home › Web App —
  // the live trail stops at the parent and never names this page itself. "/"
  // is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Web App', path: '/web-application-development-company' },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd
        data={[          javaServiceLd,
          javaWebPageLd,
          javaFaqLd,
          ...(breadcrumb ? [breadcrumb] : []),
        ]}
      />
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm. The `home.light` wrapper re-points the same
       * --bg/--surface/--text tokens every component already reads, so a band
       * is just the wrapper. Hero opens dark and the closing Contact band is
       * dark, and everything between alternates — no run of two dark sections.
       */}
      <main id="main">
        <Hero content={javaHero} idPrefix="java" variant="compact" />

        {/* The live page's "Trusted Partner for Startups and SMBs." strip. */}
        <div className={home.light}>
          <Clients />
        </div>

        {/* The live page's "Advanced Java Development Techniques" lead — its
            paragraph, three claims and CTA — closing on the three counters it
            carries in the band below them. */}
        <Overview content={javaOverview} variant="compact" />

        {/* Centre-focused carousel: one service in focus with its neighbours
            as context. Six services, as the live page lists them. */}
        <div className={home.light}>
          <ServicesCarousel content={javaServices} />
        </div>

        {/* The six techniques, each with the live page's own illustration —
            the card grid's `list` variant, matching the live page's own
            icon/thumbnail-beside-text layout for this section (review:
            "update the design"). */}
        <CardGrid content={javaTechniques} id="techniques" variant="list" />

        <div className={home.light}>
          <CtaBand content={javaMidCta} />
        </div>

        {/* The six enterprise benefits — the `bold` variant's asymmetric
            12-column composition, the same one the GCC page's "Who It Fits"
            band uses. No artwork on the live page for these, so they take the
            text card rather than the picture card. */}
        <CardGrid content={javaBenefits} id="benefits" variant="bold" />

        <div className={home.light}>
          <WhyUs content={javaWhyUs} />
        </div>

        {/* The live page's "Looking For Expert Java Developers?" band. Its CTA
            is the one link that leaves this page, for the hire-by-skill page
            this app already serves. */}
        <CtaBand content={javaHireCta} />

        {/* Success stories, awards and certifications, then client
            testimonials — the live page's own order, and all three the
            homepage's own components. Recognitions sits on the page's dark
            ground between the two light bands, the same light/dark/light
            break the homepage itself uses around this component (there,
            with `Awards` instead) — otherwise these three ran as one
            identical warm-white band with no variation (review: "the final
            3 section all have the same colour theme"). `Recognitions`
            already themes for either ground (see its own dark-mode badge
            styling), so no new CSS was needed. */}
        <div className={home.light}>
          <WorkGrid content={javaSuccessStories} countLabel="case studies" />
        </div>

        <Recognitions />

        <div className={home.light}>
          <Testimonials />
        </div>

        <div className={home.light}>
          <Faq content={javaFaqs} idPrefix="java-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
