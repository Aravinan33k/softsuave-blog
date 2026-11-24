import type { ComponentType } from 'react';
import type { Metadata } from 'next';

import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import { HIRE_SKILL_LIVE_SCHEMA } from '@/lib/seo/hire-skills-live-schema';
import type { HireSkill } from '@/lib/home/hire-skill';
import { overviewImage } from '@/lib/home/overview-images';
import type { HireSectionsProps } from '@/components/landing/hire-bands';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// Heavy server components: both draw `TechLogo`, ~30 KB gzipped of SVG, so they
// stay here and reach the client bands as a slot (see `HireSectionsProps`).
import TechStack from '@/components/landing/tech-stack';
// The Android page's labelled rows, for a page whose grouped panels are too
// sparse to read as a grid (Kotlin: "need to change the design of the tech stack").
import TechRows from '@/components/home/tech-stack';
// The Agentic AI page's photo-card grid, for a skill with `servicesPhotoCards`.
// Its card icons draw `TechLogo`, so it is a server band like the two above.
import PhotoCards from '@/components/generative-ai/industries';
import SectionCta from '@/components/generative-ai/section-cta';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/**
 * Slugs whose overview takes the pipeline's photo centred against the prose
 * rather than opening at the top of a column twice its height (MEAN, 13 Oct
 * review: "center align the image").
 *
 * That was `align: 'center'` written into the skill record beside the
 * `overviewImage()` call. The record is imported by the browser now, and
 * `overview-images` must not be, so the lookup moved here and the alignment
 * with it.
 */
const CENTERED_OVERVIEW_IMAGES: ReadonlySet<string> = new Set(['hire-mean-stack-developers-india']);

/** Hire pages whose hero form's submit turns black on hover (reviewed page by page; others keep the pink). */
const BLACK_SUBMIT: ReadonlySet<string> = new Set(['saas', 'selenium', 'cms']);

/**
 * The one rendering of a "Hire <skill> Developers" page.
 *
 * A SERVER component, so it can own JSON-LD and be rendered from a route that
 * exports `metadata`. The band rendering itself — hero, the page's run of
 * bands in the order `skill.order` declares, the closing enquiry band — lives in
 * `./hire-bands`, a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * `Sections` is the route's own client wrapper (`<route>/sections.tsx`), which
 * imports that route's skill and hands it to `HireBands`. The skill is NOT
 * passed down from here: a prop crossing server -> client is serialized into the
 * RSC payload as well as rendered, which put every paragraph in the document
 * twice. What the shell does pass are the two things the browser cannot work out
 * for itself — the tech-stack band and the overview photo; see
 * `HireSectionsProps`.
 */
export default function HirePage({
  skill,
  Sections,
}: {
  skill: HireSkill;
  Sections: ComponentType<HireSectionsProps>;
}) {
  const path = `/${skill.slug}`;

  /*
   * All twenty-four pages' JSON-LD, from this one call.
   *
   * What it replaces was a `Service` built here by hand whose `provider` was an
   * inline `{'@type': 'Organization', name: 'Soft Suave'}` — not the canonical
   * `organizationLd`, and a separate one per page — with no `WebPage` node and
   * nothing joining the `Service`, the `FAQPage` and the breadcrumb to each
   * other. `pageSchemaGraph` emits that set `@id`-linked and points provider
   * and publisher at the organization the layout declares once.
   *
   * The empty cases stay handled: NestJS publishes no FAQ and gets no
   * `FAQPage`, a page with no services band gets no `hasOfferCatalog`, and the
   * breadcrumb is off unless the skill opts in (see `HireSkill.showBreadcrumb`)
   * — most of these twenty-four pages have none on their live page — and even
   * then dropped while "/" is still a redirect.
   */
  const structuredData = pageSchemaGraph({
    path,
    title: skill.metaTitle,
    description: skill.metaDescription,
    serviceType: skill.serviceType,
    // The role, not the `<title>` — "ReactJS Developers", not "Hire ReactJS
    // Developers | 14 Years' Experience". The title is the page's sales line;
    // the service is what is actually offered.
    serviceName: skill.role,
    // Off by default — see `HireSkill.showBreadcrumb`. Only a handful of these
    // 24 pages have a breadcrumb on their live page.
    showBreadcrumb: skill.showBreadcrumb ?? false,
    parents: skill.breadcrumbParents,
    breadcrumbName: skill.breadcrumbLabel ?? skill.role,
    // The H1 as one line — the hero splits it for the accent on its last line.
    caption: skill.hero.titleLines.join(' '),
    audience: `Startups, SMBs and enterprises hiring ${skill.role}`,
    offerCatalogName: skill.services?.title,
    offers: skill.services?.items.map((i) => ({ name: i.name, description: i.body })),
    faqName: skill.faq?.title,
    faqs: skill.faq?.items,
  });

  /*
   * The tech-stack band, drawn here because it is the one band that cannot be a
   * client component. `.techFit` drops the homepage band's full-viewport height
   * and `staticFrom` holds the rows still from tablet up — the Android page's
   * pairing.
   */
  const techStack = !skill.techStack ? null : skill.techStackStyle === 'rows' ? (
    <div className={home.techFit}>
      <TechRows content={skill.techStack} staticFrom={768} collapsedGroups={skill.techStackCollapsedRows} />
    </div>
  ) : (
    <TechStack content={skill.techStack} />
  );

  /*
   * The services band as photo cards (`servicesPhotoCards`), drawn here for the
   * same reason as the tech stack: `PhotoCards` renders `TechLogo` through its
   * card icons. A skill without the flag gets `undefined` and the client draws
   * its usual card grid.
   */
  const services =
    skill.services && skill.servicesPhotoCards ? (
      <>
        <PhotoCards
          id="services"
          content={{
            eyebrow: skill.services.eyebrow,
            title: skill.services.title,
            body: skill.services.body,
            wideHead: skill.services.wideHead,
            cta: skill.services.cta,
            items: skill.services.items.map((item) => ({
              name: item.name,
              body: item.body,
              image: item.image?.src,
              link: false as const,
            })),
          }}
        />
        {/* The photo grid draws no closing button of its own. */}
        <div
          className={home.section}
          style={{
            position: 'relative',
            zIndex: 1,
            paddingTop: 0,
            paddingBottom: 0,
            marginTop: 'calc(var(--section-y) * -0.95)',
            marginBottom: 'calc(var(--section-y) * -0.35)',
          }}
        >
          <SectionCta cta={skill.services.cta} />
        </div>
      </>
    ) : undefined;

  // A skill's own overview image wins, so the photo is only looked up (and only
  // sent to the client) when the skill names none.
  const photo = skill.overview && !skill.overview.image ? overviewImage(skill.slug) : undefined;
  const overviewPhoto =
    photo && CENTERED_OVERVIEW_IMAGES.has(skill.slug)
      ? { ...photo, align: 'center' as const }
      : photo;

  return (
    <div className={BLACK_SUBMIT.has(skill.key) ? `${home.page} ${location.submitBlack}` : home.page}>
      {/* The live page's own blocks, one <script> each, where it has any —
          see lib/seo/hire-skills-live-schema; otherwise the graph built above. */}
      {HIRE_SKILL_LIVE_SCHEMA[path] ? (
        HIRE_SKILL_LIVE_SCHEMA[path].map((block, i) => <JsonLd key={i} data={block} />)
      ) : (
        <JsonLd data={structuredData} />
      )}
      <Nav logoHref={BASE_PATH || '/'} />

      <main id="main">
        <Sections techStack={techStack} services={services} overviewImage={overviewPhoto} />
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
  // The live page's title exactly — no " | Soft Suave" suffix, which live
  // does not carry (review: "the title and description have been changed, so
  // they need to be updated"). The root layout's title template is "%s".
  const title = skill.metaTitle;
  const path = `/${skill.slug}`;
  const image = dynamicOgImage(skill.metaTitle, 'Soft Suave');

  return {
    title,
    description: skill.metaDescription,
    alternates: { canonical: path },
    robots: pageRobots,
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
