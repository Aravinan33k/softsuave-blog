import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import type { HireSkill } from '@/lib/home/hire-skill';
import {
  hireCapabilities,
  hireFaqs,
  hireHero,
  hireOverview,
  hireTechStack,
} from '@/lib/home/hire-content';
import {
  
  hireEngagementModels,
  hireMidCta,
  hireProcess,
  hireWhyUs,
} from '@/lib/home/hire-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content.
import Manifesto from '@/components/home/manifesto';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// PAGE-SPECIFIC SECTIONS — shared landing components taking this skill's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CardGrid from '@/components/landing/industries';
import Process from '@/components/landing/process';
import CtaBand from '@/components/landing/cta-band';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * The shared body of every "Hire <skill> Developers" page.
 *
 * All 24 routes render this with a different `skill`. They exist as separate
 * route folders rather than one `[slug]` dynamic route because each needs its
 * own static `metadata` export and its own prerendered output — and because a
 * dynamic route would put all 24 behind one file that nobody would think to
 * look in when changing one page.
 *
 * A SERVER component, so it can own JSON-LD and be rendered from a route that
 * exports `metadata`; every section below is a client component. Fonts,
 * `.theme-four` tokens and Lenis smooth scroll come from
 * `app/(marketing)/layout.tsx`.
 *
 * Section order differs from the delivery pages in two deliberate ways. The
 * homepage's `Industries` fan is dropped — on a page about hiring a React
 * engineer, the sectors we serve is the least relevant thing we could show, and
 * it is also one of the two heaviest scenes to prerender (see the `cpus` note
 * in `next.config.ts`, which 24 more pages would otherwise make considerably
 * worse). And the homepage's `TechStack` is replaced by the landing one carrying
 * this skill's own stack, which is strictly more useful here and avoids two
 * sections competing for `id="tech"`.
 */
export default function HirePage({ skill }: { skill: HireSkill }) {
  const path = `/${skill.slug}`;

  const pageNav = [
    { label: 'Home', href: '/' },
    { label: 'Why Soft Suave', href: '#why' },
    { label: 'Capabilities', href: '#services' },
    { label: 'Engagement', href: '#engagement' },
    
    { label: 'How Hiring Works', href: '#journey' },
    { label: 'Tech Stack', href: '#tech' },
    
    { label: 'FAQs', href: '#faq' },
    { label: 'Blog', href: '/blog' },
  ];

  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: skill.metaTitle, path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  const faqs = hireFaqs(skill);
  const capabilities = hireCapabilities(skill);

  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.items.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: typeof f.a === 'string' ? f.a : f.a.join(' '),
        },
      })),
    },
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
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: capabilities.title,
        itemListElement: capabilities.items.map((i) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: i.name, description: i.body },
        })),
      },
    },
  ];

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={pageNav} cta={{ label: skill.ctaLabel, href: '#enquiry' }} logoHref={BASE_PATH || '/'} />

      <main id="main">
        {/* Section list follows the live hire pages (audited against
            /hire-reactjs-developers and /hire-java-developers, which agree):
            hero, positioning, overview, capabilities, rate/engagement models,
            a four-step hiring sequence, what makes the developers unique, more
            technologies, testimonials, FAQ, enquiry form.

            NOT on either live page, so not rendered here: client logo strip,
            company stats block, awards, recognitions band, case studies, and a
            comparison table. */}
        <Hero content={hireHero(skill)} idPrefix={skill.key} />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        {/* Skill-specific middle. */}
        <Overview content={hireOverview(skill)} />

        <div className={home.light}>
          <Services content={capabilities} id="services" variant="bold" />
        </div>

        <CardGrid content={hireEngagementModels} id="engagement" variant="bold" />

        {/* The advantages read as short statements, so they take the badge
            treatment rather than the asymmetric grid — same split the GCC page
            uses between its benefits and its other card sections. */}
        <div className={home.light}>
          <CardGrid content={hireWhyUs} id="advantages" variant="feature" />
        </div>

        <Process content={hireProcess} variant="mosaic" />

        <div className={home.light}>
          <CtaBand content={hireMidCta} />
        </div>

        <TechStack content={hireTechStack(skill)} />

        <div className={home.light}>
          <Testimonials />
          <Faq content={faqs} idPrefix={`${skill.key}-faq`} />
        </div>

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}

/**
 * The route's `metadata` export, built from the same skill record.
 *
 * Route files call this rather than assembling the object themselves, so the
 * title template, canonical, and OG image stay identical across all 24 — the
 * class of inconsistency that is invisible in review and obvious in Search
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
