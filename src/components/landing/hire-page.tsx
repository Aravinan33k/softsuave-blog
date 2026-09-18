import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import type { HireBand, HireSkill } from '@/lib/home/hire-skill';
import { HIRE_CLIENT_LOGOS, HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import type { CardGridContent } from '@/components/landing/industries';
import type { ServicesContent } from '@/components/landing/services';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Company-level bands: the homepage's own components over the homepage's own
// copy. A hire page's claim to these clients and these client stories is the
// same claim the homepage makes, so it is made with the same component rather
// than a second version free to drift out of step.
//
// Note what is NOT imported: `home/manifesto`. The homepage's "Why Soft Suave"
// manifesto used to render on all twenty of these pages under an `#why` anchor,
// and it appears on none of their live pages — it is homepage copy, and the
// per-page "Why hire X from Soft Suave" cards in `whyUs` are what the live
// pages actually run in its place.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// Page-specific bands: the landing components, taking this skill's own copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import CardGrid from '@/components/landing/industries';
// The homepage's horizontal scroll-snap lane, reused for the expertise band.
import WorkCarousel from '@/components/home/work-grid';
import ExploreMarquee from '@/components/landing/explore-marquee';
import TechStack from '@/components/landing/tech-stack';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import Comparison from '@/components/landing/comparison';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * Which bands sit on the warm-white ground and which stay dark.
 *
 * Presentation only — it decides nothing about what a page says. Consecutive
 * light bands are merged into one wrapper below, so a run of them reads as a
 * single chapter rather than several stacked panels with doubled padding.
 */
const LIGHT_BANDS: ReadonlySet<HireBand> = new Set<HireBand>([
  'clients',
  'overview',
  'services',
  'process',
  'vetting',
  'exploreMore',
  'testimonials',
  'faq',
]);

/**
 * A services band's content, as the card grid takes it.
 *
 * Every card section on these pages renders through `CardGrid` with
 * `variant="bold"` — the same component and variant the Global Capability
 * Center page's "Who It Fits" band uses, which is the structure these sections
 * are meant to match: the 12-column `gridSpansFor` composition, the accent rule
 * across the top of each card, the per-card accent from the warm ramp, and no
 * ordinal.
 *
 * The services and applications bands are typed as `ServicesContent` because
 * that is the shape their copy was written in, so they are converted here
 * rather than being rendered by a different component that merely looks close.
 * `image` is dropped — the bold card has no header-image slot, and no hire-page
 * band sets one.
 */
function asCardGrid(content: ServicesContent): CardGridContent {
  return {
    eyebrow: content.eyebrow,
    title: content.title,
    body: content.body,
    items: content.items.map((item) => ({
      name: item.name,
      tag: item.tag,
      body: item.body,
    })),
  };
}

/**
 * The one rendering of a "Hire <skill> Developers" page.
 *
 * All twenty routes share this component, but *not* one fixed band order.
 * softsuave.com does not run these pages in a single sequence: the six newer
 * pages (Django, Drupal, Kotlin, Laravel, Magento, Rails) open on a client band
 * and reach their hiring steps second, the ten older ones put a rate band
 * before the process, Node and Angular open on the applications they build,
 * React Native runs its comparison before its rates, and NestJS publishes no
 * FAQ. So the order is content, declared per page in `order` and rendered here
 * in exactly that sequence.
 *
 * A SERVER component, so it can own JSON-LD and be rendered from a route that
 * exports `metadata`; the section components inside are the client ones. Fonts,
 * `.theme-four` tokens and Lenis smooth scroll come from
 * `app/(marketing)/layout.tsx`.
 */
export default function HirePage({ skill }: { skill: HireSkill }) {
  const path = `/${skill.slug}`;

  /**
   * The nav only advertises anchors this page actually renders. It used to list
   * a fixed seven for every page, several of which pointed at bands that no
   * longer exist here (`#why` was the homepage manifesto, `#engagement` a
   * hand-written models band), leaving dead links on pages whose live source
   * runs neither.
   */
  const has = (band: HireBand) => skill.order.includes(band);
  const pageNav = [
    { label: 'Home', href: '/' },
    ...(has('overview') ? [{ label: 'Overview', href: '#overview' }] : []),
    ...(has('services') ? [{ label: 'Services', href: '#services' }] : []),
    ...(has('techStack') ? [{ label: 'Tech Stack', href: '#tech' }] : []),
    ...(has('process') ? [{ label: 'How Hiring Works', href: '#journey' }] : []),
    ...(has('whyUs') ? [{ label: 'Why Soft Suave', href: '#why' }] : []),
    ...(has('faq') ? [{ label: 'FAQs', href: '#faq' }] : []),
    { label: 'Blog', href: '/blog' },
  ];

  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: skill.metaTitle, path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  const structuredData: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: skill.metaTitle,
      serviceType: skill.serviceType,
      description: skill.metaDescription,
      url: absoluteUrl(path),
      areaServed: 'Worldwide',
      provider: {
        '@type': 'Organization',
        name: 'Soft Suave',
        url: 'https://www.softsuave.com',
      },
      ...(skill.services
        ? {
            hasOfferCatalog: {
              '@type': 'OfferCatalog',
              name: skill.services.title,
              itemListElement: skill.services.items.map((i) => ({
                '@type': 'Offer',
                itemOffered: { '@type': 'Service', name: i.name, description: i.body },
              })),
            },
          }
        : {}),
    },
  ];

  // Only emit FAQ schema where the live page publishes an FAQ — NestJS does not.
  if (skill.faq) {
    structuredData.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: skill.faq.items.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof f.a === 'string' ? f.a : f.a.join(' '),
        },
      })),
    });
  }

  function render(band: HireBand): ReactNode {
    switch (band) {
      case 'clients':
        return <Clients key={band} logos={HIRE_CLIENT_LOGOS} />;
      case 'overview':
        return skill.overview ? (
          <Overview key={band} content={skill.overview} id="overview" variant="compact" />
        ) : null;
      case 'applications':
        return skill.applications ? (
          <CardGrid key={band} content={asCardGrid(skill.applications)} id="applications" variant="bold" />
        ) : null;
      case 'combinations':
        return skill.combinations ? (
          <CardGrid key={band} content={skill.combinations} id="combinations" variant="bold" />
        ) : null;
      case 'services':
        return skill.services ? (
          <CardGrid key={band} content={asCardGrid(skill.services)} id="services" variant="bold" />
        ) : null;
      case 'techStack':
        return skill.techStack ? <TechStack key={band} content={skill.techStack} /> : null;
      case 'expertise':
        /*
         * The horizontal scroll-snap lane from the homepage's case-study
         * section, not the bold card grid the other bands use — a deliberate
         * break, so the one band on the page that lists deep technical ground
         * does not read as a fourth stack of identical cards.
         *
         * Content is passed through untouched: `name` becomes the tile title
         * because that is what this template calls the same field, and nothing
         * in `lib/home/hire-skills-*.ts` changed. These items carry no artwork,
         * so the lane renders its text-only tiles (see WorkCarousel).
         *
         * It stays off LIGHT_BANDS, so the ground is the dark one it already
         * had.
         */
        return skill.expertise ? (
          <WorkCarousel
            key={band}
            id="expertise"
            countLabel="capabilities"
            /* Slower than the 4.6s the old services carousel used: these tiles
               carry a full paragraph, and advancing before it can be read is
               worse than not advancing at all. Pauses on hover and focus. */
            autoplayMs={6000}
            content={{
              eyebrow: skill.expertise.eyebrow,
              title: skill.expertise.title,
              body: skill.expertise.body,
              items: skill.expertise.items.map((item) => ({
                title: item.name,
                body: item.body ?? '',
              })),
            }}
          />
        ) : null;
      case 'midCta':
        return skill.midCta ? <CtaBand key={band} content={skill.midCta} /> : null;
      case 'process':
        return skill.process ? (
          <Process key={band} content={skill.process} variant="mosaic" />
        ) : null;
      case 'whyUs':
        return skill.whyUs ? (
          <CardGrid key={band} content={skill.whyUs} id="why" variant="bold" />
        ) : null;
      case 'comparison':
        return skill.comparison ? <Comparison key={band} content={skill.comparison} /> : null;
      case 'vetting':
        return skill.vetting ? (
          <Process key={band} content={skill.vetting} id="vetting" variant="even" />
        ) : null;
      case 'exploreMore':
        // The display-type marquee, not a card grid: these cards were a label
        // in a box with no body copy under it, because the live pages give
        // these links none. See components/landing/explore-marquee.tsx.
        return skill.exploreMore ? (
          <ExploreMarquee key={band} content={skill.exploreMore} id="explore" />
        ) : null;
      case 'testimonials':
        return <Testimonials key={band} />;
      case 'faq':
        return skill.faq ? (
          <Faq key={band} content={skill.faq} idPrefix={`${skill.key}-faq`} />
        ) : null;
      default:
        return null;
    }
  }

  // Merge each run of consecutive light bands into a single wrapper.
  const groups: { light: boolean; nodes: ReactNode[] }[] = [];
  for (const band of skill.order) {
    const node = render(band);
    if (!node) continue;
    const light = LIGHT_BANDS.has(band);
    const last = groups[groups.length - 1];
    if (last && last.light === light) last.nodes.push(node);
    else groups.push({ light, nodes: [node] });
  }

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={pageNav} cta={{ label: skill.ctaLabel, href: '#enquiry' }} logoHref={BASE_PATH || '/'} />

      <main id="main">
        <Hero content={skill.hero} idPrefix={skill.key} />
        {groups.map((g, i) =>
          g.light ? (
            <div key={i} className={home.light}>
              {g.nodes}
            </div>
          ) : (
            <div key={i}>{g.nodes}</div>
          ),
        )}
        <Contact ctaHref="#enquiry" content={HIRE_CLOSING_BAND} eyebrow="" />
      </main>

      <Footer />
    </div>
  );
}

/**
 * The route's `metadata` export, built from the same skill record.
 *
 * Route files call this rather than assembling the object themselves, so the
 * title template, canonical, and OG image stay identical across all twenty —
 * the class of inconsistency that is invisible in review and obvious in Search
 * Console.
 */
export function hireMetadata(skill: HireSkill): Metadata {
  const title = `${skill.metaTitle} | Soft Suave`;
  const path = `/${skill.slug}`;
  const image = dynamicOgImage(skill.metaTitle, 'Soft Suave');

  return {
    title,
    description: skill.metaDescription,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: skill.metaDescription,
      url: absoluteUrl(path),
      siteName: 'Soft Suave',
      type: 'website',
      images: [image],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: skill.metaDescription,
      images: [image],
    },
  };
}
