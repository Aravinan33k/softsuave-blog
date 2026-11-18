'use client';

import { Fragment, type ReactNode } from 'react';

import type { HireBand, HireSkill } from '@/lib/home/hire-skill';
import { HIRE_CLIENT_LOGOS, HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroCtas } from '@/lib/home/delivery-shared';
import type { CardGridContent } from '@/components/landing/industries';
import type { OverviewContent } from '@/components/landing/overview';
import type { ServicesContent } from '@/components/landing/services';

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
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import ConsultationClose from '@/components/common/consultation-close';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { navHref } from '@/themes/softsuave/nav-data';

// Page-specific bands: the landing components, taking this skill's own copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import CardGrid from '@/components/landing/industries';
// The homepage's horizontal scroll-snap lane, reused for the expertise band.
import WorkCarousel from '@/components/home/work-grid';
import ExploreMarquee from '@/components/landing/explore-marquee';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import Comparison from '@/components/landing/comparison';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/**
 * Hire pages that have had their page-by-page review: a clients heading held to two lines and the
 * testimonials joined to the FAQ. Others keep their earlier look until reviewed.
 */
const REVIEWED: ReadonlySet<string> = new Set(['saas', 'cms']);

/** Hire pages whose testimonials sit on the dark ground instead of joining the light FAQ band. */
const DARK_TESTIMONIALS: ReadonlySet<string> = new Set(['cms']);

/** Hire pages that close on the "Book Free Consultation" band (a superset of REVIEWED). */
const CONSULT_CLOSE: ReadonlySet<string> = new Set(['saas', 'selenium', 'cms']);

/**
 * What the server shell (`HirePage`) hands the route's client wrapper, and the
 * wrapper hands on here.
 *
 * Both are things this client module cannot work out for itself:
 *
 * - `techStack` is the tech-stack band, already drawn. `TechStack` and
 *   `TechRows` both render `TechLogo`, ~30 KB gzipped of SVG that has to stay
 *   on the server (see the comment on `landing/tech-stack.tsx`), so the band
 *   arrives as a slot rather than being imported here. `null` for a skill with
 *   no tech-stack band.
 * - `overviewImage` is the pipeline's photo for the page, for a skill whose
 *   own overview names none. It comes from `lib/home/overview-images`, which
 *   imports the 302 KB `images.generated.json` and so cannot be imported from
 *   anything the browser loads; the shell resolves it and passes the one small
 *   object this page needs.
 * - `services` is the services band already drawn as photo cards, for a skill
 *   with `servicesPhotoCards`. Those cards' icons render `TechLogo` too, so the
 *   band comes in as a slot. `undefined` means: draw the usual card grid here.
 */
export interface HireSectionsProps {
  techStack: ReactNode;
  services?: ReactNode;
  overviewImage?: OverviewContent['image'];
}

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
    cta: content.cta,
    items: content.items.map((item) => ({
      name: item.name,
      tag: item.tag,
      body: item.body,
    })),
  };
}

/**
 * The bands of a "Hire <skill> Developers" page — hero, the page's own run of
 * bands in the order `skill.order` declares, and the closing enquiry band —
 * rendered from one client boundary.
 *
 * Split out of `HirePage` so the skill's copy never travels as a prop. Handed to
 * these client components by a server component, the record was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document
 * twice. The route's `sections.tsx` imports its own skill (and only that one —
 * never the registry, which carries all twenty) and passes it here, so the
 * payload carries a bare client reference instead.
 *
 * All twenty routes share this component, but *not* one fixed band order.
 * softsuave.com does not run these pages in a single sequence: the six newer
 * pages (Django, Drupal, Kotlin, Laravel, Magento, Rails) open on a client band
 * and reach their hiring steps second, the ten older ones put a rate band
 * before the process, Node and Angular open on the applications they build,
 * React Native runs its comparison before its rates, and NestJS publishes no
 * FAQ. So the order is content, declared per page in `order` and rendered here
 * in exactly that sequence.
 */
export default function HireBands({
  skill,
  techStack,
  services,
  overviewImage,
}: Readonly<HireSectionsProps & { skill: HireSkill }>) {
  const reviewed = REVIEWED.has(skill.key);

  function render(band: HireBand): ReactNode {
    switch (band) {
      case 'clients':
        return (
          <Clients
            key={band}
            logos={(skill.clientsBand?.logos as typeof HIRE_CLIENT_LOGOS | undefined) ?? HIRE_CLIENT_LOGOS}
            {...(reviewed ? { wideTitle: '31ch' } : {})}
            {...(skill.clientsBand?.eyebrow ? { eyebrow: skill.clientsBand.eyebrow } : {})}
          />
        );
      case 'overview':
        return skill.overview ? (
          <Overview
            key={band}
            // A skill's own image wins; otherwise the pipeline's per-page photo.
            content={{ ...skill.overview, image: skill.overview.image ?? overviewImage }}
            id="overview"
            variant="compact"
          />
        ) : null;
      case 'applications':
        // `autoLink` forced on: the id "applications" doesn't match
        // `CardGrid`'s own service/industry/solution guess, which left every
        // card in this band unlinked on the two pages (Node, Angular) that
        // open on it (review: "several buttons are not linked to any pages").
        return skill.applications ? (
          <CardGrid
            key={band}
            content={asCardGrid(skill.applications)}
            id="applications"
            variant="bold"
            // No card links (hire-by-skill review: "Remove the links from the
            // service cards").
            autoLink={false}
          />
        ) : null;
      case 'combinations':
        return skill.combinations ? (
          <CardGrid key={band} content={skill.combinations} id="combinations" variant="bold" />
        ) : null;
      case 'services':
        // Photo cards, drawn on the server (see `HireSectionsProps.services`).
        if (services) return <Fragment key={band}>{services}</Fragment>;
        return skill.services ? (
          // `autoLink={false}`: the `services` id would otherwise link every card
          // whose name matches a page (review: "Remove the links from the
          // service cards").
          <CardGrid
            key={band}
            content={asCardGrid(skill.services)}
            id="services"
            variant="bold"
            autoLink={false}
          />
        ) : null;
      case 'techStack':
        // Drawn on the server — `TechStack`, or `TechRows` for a skill whose
        // grouped panels are too sparse to read as a grid — and slotted in here.
        return techStack ? <Fragment key={band}>{techStack}</Fragment> : null;
      case 'expertise':
        /*
         * The horizontal scroll-snap lane from the homepage's case-study
         * section, not the bold card grid the other bands use — a deliberate
         * break, so the one band on the page that lists deep technical ground
         * does not read as a fourth stack of identical cards.
         *
         * Content is passed through untouched: `name` becomes the tile title
         * because that is what this template calls the same field, and nothing
         * in `lib/home/hire-skills/` changed. These items carry no artwork,
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
          <Process key={band} content={skill.process} variant="mosaic" label={skill.processLabel} />
        ) : null;
      case 'whyUs':
        return skill.whyUs ? (
          <CardGrid key={band} content={skill.whyUs} id="why" variant="bold" />
        ) : null;
      case 'comparison':
        return skill.comparison ? <Comparison key={band} content={skill.comparison} /> : null;
      case 'vetting':
        return skill.vetting ? (
          <Process key={band} content={skill.vetting} id="vetting" variant="even" label={skill.vettingLabel} />
        ) : null;
      case 'exploreMore':
        // The display-type marquee, not a card grid: these cards were a label
        // in a box with no body copy under it, because the live pages give
        // these links none. See components/landing/explore-marquee.tsx.
        return skill.exploreMore ? (
          <ExploreMarquee key={band} content={skill.exploreMore} id="explore" tabs={skill.exploreTabs} />
        ) : null;
      case 'testimonials':
        return <Testimonials key={band} content={skill.testimonials} />;
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
    const light = LIGHT_BANDS.has(band) && !(band === 'testimonials' && DARK_TESTIMONIALS.has(skill.key));
    const last = groups[groups.length - 1];
    if (last && last.light === light) last.nodes.push(node);
    else groups.push({ light, nodes: [node] });
  }

  return (
    <>
      {/* The partner lockups and the trial/meeting CTA pair are stated here,
          once, rather than in twenty skill records: both are the company's
          standing, not the skill's, and every live role page runs the same
          two buttons beside the same four lockups. */}
      <Hero
        content={{
          ...skill.hero,
          // The heavier veil on every skill hero (review: "add a black
          // gradient to increase visibility in the hero section").
          image: skill.hero.image && { ...skill.hero.image, veil: 'strong' },
          // A skill whose live hero differs states its own badges, buttons and separator.
          badges: skill.hero.badges ?? partnerHeroBadges,
          ctas: skill.hero.ctas ?? sharedHeroCtas,
        }}
        idPrefix={skill.key}
        breadcrumb={!skill.hideHeroBreadcrumb}
      />
      {groups.map((g, i) =>
        g.light ? (
          <div key={i} className={reviewed ? `${home.light} ${location.reviewsJoined}` : home.light}>
            {g.nodes}
          </div>
        ) : (
          <div key={i}>{g.nodes}</div>
        ),
      )}
      {/* No `ctaHref`: the closing CTA takes its default, the /contact
          route — the review asked for every final CTA to lead there. */}
      {skill.closingEnquiry && CONSULT_CLOSE.has(skill.key) ? (
        <ConsultationClose
          id="book-consultation"
          idPrefix={`${skill.key}-contact`}
          blackSubmit
          content={{
            title: faqsPageEnquiry.title,
            body: faqsPageEnquiry.body,
            steps: faqsPageEnquiry.steps,
            person: {
              image: { src: faqsPageEnquiry.manager.photo, width: 157, height: 157, alt: 'Soft Suave Manager' },
              name: faqsPageEnquiry.manager.name,
              role: faqsPageEnquiry.manager.role,
            },
            cta: {
              label: faqsPageEnquiry.manager.cta?.label ?? 'Schedule a Call',
              href: navHref(faqsPageEnquiry.manager.cta?.href ?? '/30-min-free-consultation'),
            },
            badges: faqsPageEnquiry.badges,
            form: faqsPageEnquiry.form,
          }}
        />
      ) : skill.closingEnquiry ? (
        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="book-consultation"
          idPrefix={`${skill.key}-contact`}
          headingFont
        />
      ) : (
        <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
      )}
    </>
  );
}
