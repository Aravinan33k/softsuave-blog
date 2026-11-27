'use client';

import { Fragment, type ReactNode } from 'react';

import type { HireBand, HireRolePageContent } from '@/lib/home/hire-roles/types';
import { assignGrounds } from '@/lib/home/hire-roles/band-grounds';
import { tilesGrid } from '@/lib/home/hire-roles/band-content';
import { partnerHeroBadges } from '@/lib/home/hero-badges';
import { sharedHeroCtas } from '@/lib/home/delivery-shared';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';

// Company-level sections: the homepage's own components, rendering the
// homepage's own copy from `lib/home/content.ts`. A role page's claim to these
// clients, these figures, these case studies and these client stories is the
// same claim the homepage makes — so it is made with the same component, the
// same layout and the same words, not a second version that can drift out of
// step. Only the bands the live role pages actually run are imported: the Why
// Soft Suave manifesto, the industries fan and the awards strip are not among
// them, so they are not here.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// Role-specific sections: the landing-page components, which exist because the
// homepage has no equivalent. The hero carries the enquiry form (the homepage
// hero is a video showreel), and the rest are the parts of a hire page that are
// genuinely about this role — what it does, which technologies, how you engage,
// how hiring works, and how we compare to the alternatives.
import Hero from '@/components/generative-ai/hero';
import Overview, { type OverviewContent } from '@/components/generative-ai/overview';
import Problems from '@/components/generative-ai/problems';
import FitTable from '@/components/generative-ai/fit-table';
import SectionHead from '@/components/generative-ai/section-head';
import Services from '@/components/generative-ai/services';
import CtaBand from '@/components/generative-ai/cta-band';
import Integration from '@/components/generative-ai/integration';
import Process from '@/components/generative-ai/process';
import type { CardGridContent } from '@/components/generative-ai/industries';
// The card grid's interactive half. Its server half (`generative-ai/industries`)
// only draws each card's badge, which `CardIcon` holds the brand marks for — see
// `HireRoleServerProps.cardBadges` — so that half is not imported here.
import IndustriesClient from '@/components/generative-ai/industries-client';
import Comparison from '@/components/generative-ai/comparison';
import Faq from '@/components/generative-ai/faq';

import styles from '@/components/home/home.module.css';

/** An `Overview` illustration, as the pipeline records it. */
type BandImage = NonNullable<OverviewContent['image']>;

/** The badges of one card grid, one per card in order, as `Industries` draws them. */
export interface CardBadges {
  readonly icons: readonly ReactNode[];
  /** Whether each badge is a full-colour brand mark, which drops its accent tint. */
  readonly brand: readonly boolean[];
}

/**
 * What the server shell (`HireRolePage`) hands in beside the page's own copy —
 * the things that cannot be computed in the browser bundle without shipping
 * their source with it.
 */
export interface HireRoleServerProps {
  /**
   * The technology bands, drawn on the server and keyed by the band that places
   * them: `techStack`, or `list:<key>` for a label-only list. `TechLogo` is ~30
   * KB gzipped of SVG, so these stay server components and arrive ready-made
   * (see the note in `components/landing/tech-stack`). A band with no entry here
   * renders nothing.
   */
  readonly techStacks: Readonly<Record<string, ReactNode>>;
  /**
   * The card grids' badges, drawn on the server and keyed by band:
   * `specialisations`, `whyRole`, or `list:<key>` for a `tiles` list. `CardIcon`
   * routes to `TechLogo` (~30 KB gzipped of SVG) and the drawn-glyph set, so the
   * glyphs arrive ready-made while the cards' copy stays on this side. A band
   * with no entry here renders nothing.
   */
  readonly cardBadges: Readonly<Record<string, CardBadges>>;
  /**
   * The pipeline's photo for the overview band, resolved on the server because
   * its record (`images.generated.json`, ~300 KB of blur placeholders) must not
   * reach the browser. Absent when the page carries its own `overview.image`.
   */
  readonly overviewImage?: BandImage;
  /** The same, for the global-delivery band's `landing/dl-<slug>` photo. */
  readonly deliveryImage?: BandImage;
}

/**
 * The bands of a "Hire Developers by Role" page, from the hero to the closing
 * enquiry band.
 *
 * All thirteen routes share this component, but *not* one fixed band order:
 * softsuave.com does not run these pages in a single sequence, and several of
 * them differ substantially — the Salesforce and Blockchain pages open on their
 * why-hire cards, the backend page puts its evaluation criteria after the
 * delivery section, the dedicated page closes on its rate table and challenges.
 * So the order is content, declared per page in `order` and rendered here in
 * exactly that sequence. A page's module is therefore the single description of
 * both what its live page says and the order it says it in.
 *
 * **The split that matters**: a section is either about Soft Suave or about the
 * role. Everything in the first group is the homepage's component *and* the
 * homepage's content — the clients, the figures, the case studies, the client
 * stories and the closing enquiry band. Only the second group is written per
 * role, from that role's live page.
 *
 * **What is not rendered at all**: every band here corresponds to one the live
 * role pages run. The homepage bands they do not run — the Why Soft Suave
 * manifesto, the industries fan and the awards strip — are left off, so these
 * pages carry nothing their source does not.
 *
 * A client component, rendered from each route's `sections.tsx`, which imports
 * that role's own copy. Handed down from the server as props, the copy was
 * serialized into the RSC payload as well as rendered, so every paragraph was in
 * the document twice; imported on this side of the boundary the payload carries
 * a bare client reference instead.
 */
export default function HireRoleBands({
  content,
  techStacks,
  cardBadges,
  overviewImage,
  deliveryImage,
}: Readonly<{ content: HireRolePageContent } & HireRoleServerProps>) {
  /**
   * `ownsAnchors` on the nav promises this page has #services and #why. Which
   * band carries each depends on what the live page runs: the services anchor
   * goes to the capability carousel, or to the specialisations grid on a page
   * whose only "what you can hire" band is that grid. The why anchor goes to
   * the page's own why-hire cards, or — on the pages that publish none — to the
   * client strip, and failing that to the overview.
   */
  const servicesBand: HireBand = content.capabilities ? 'capabilities' : 'specialisations';
  const whyBand: HireBand = content.whyRole
    ? 'whyRole'
    : content.order.includes('clients')
      ? 'clients'
      : 'overview';

  /**
   * The hero's credentials: the page's own text tags (the free-trial
   * guarantee, the FDE figures) first, then the four partner lockups every
   * other hero on the surface closes on. Added here, once, because they are
   * the company's standing rather than the role's.
   */
  const hero = {
    ...content.hero,
    badges: [
      ...(content.hero.badges ?? []),
      ...(content.heroPartnerBadges === false ? [] : partnerHeroBadges),
    ],
    // The trial/meeting pair every live role hero runs beside its form — the
    // same two buttons the hire-by-skill pages get from the same constant.
    ctas: sharedHeroCtas,
  };

  /** What `Industries` renders, less its server half: the badges arrive drawn (`cardBadges`). */
  function cardGrid(
    band: HireBand,
    grid: CardGridContent,
    id: string,
    variant: 'bold' | 'tiles',
    cardLinks = false,
  ): ReactNode {
    const badges = cardBadges[band];
    return badges ? (
      <IndustriesClient
        key={band}
        content={grid}
        id={id}
        variant={variant}
        links
        cardLinks={cardLinks}
        span={grid.span}
        icons={badges.icons}
        brand={badges.brand}
      />
    ) : null;
  }

  function render(band: HireBand): ReactNode {
    const anchor = (own: HireBand, fallback: string) => (whyBand === own ? 'why' : fallback);

    switch (band) {
      case 'clients':
        return (
          <div key={band} id={whyBand === 'clients' ? 'why' : undefined}>
            <Clients wideTitle={content.clientsWideTitle} />
          </div>
        );
      case 'overview':
        return content.overview ? (
          <Overview
            key={band}
            // A page's own image wins; otherwise the pipeline's per-page photo.
            content={{
              ...content.overview,
              image: content.overview.image ?? overviewImage,
            }}
            id={anchor('overview', 'overview')}
          />
        ) : null;
      case 'capabilities':
        return content.capabilities ? (
          <Services
            key={band}
            content={content.capabilities}
            id={servicesBand === 'capabilities' ? 'services' : 'capabilities'}
          />
        ) : null;
      case 'specialisations':
        return content.specialisations
          ? cardGrid(
              band,
              content.specialisations,
              servicesBand === 'specialisations' ? 'services' : 'expertise',
              'bold',
              // The whole card is the link (review: "remove the 'Know More'
              // buttons; the entire cards must be clickable").
              true,
            )
          : null;
      case 'fit':
        if (content.fitTable)
          return (
            <FitTable
              key={band}
              content={content.fitTable}
              id="fit"
              halfHeadOff={content.halfHeadsSkip?.includes(band)}
            />
          );
        return content.fit ? <Problems key={band} content={content.fit} id="fit" /> : null;
      case 'engagement':
        return content.engagement ? (
          <Integration
            key={band}
            content={content.engagement}
            id="engagement"
            variant="bold"
            // Each live engagement model carries its own "Hire Now".
            blockCta={{ label: 'Hire Now', href: '/contact' }}
          />
        ) : null;
      case 'globalDelivery':
        return content.globalDelivery ? (
          <Overview
            key={band}
            // A page's own image wins; otherwise the pipeline's per-page
            // delivery photo (`landing/dl-<slug>`) — the live band has one.
            content={{
              ...content.globalDelivery,
              image: content.globalDelivery.image ?? deliveryImage,
            }}
            id="delivery"
          />
        ) : null;
      case 'process':
        return <Process key={band} content={content.process} />;
      case 'midCta':
        return content.midCta ? <CtaBand key={band} content={content.midCta} /> : null;
      case 'whyRole':
        return content.whyRole ? cardGrid(band, content.whyRole, 'why', 'bold') : null;
      case 'comparison':
        return content.comparison ? (
          <Comparison key={band} content={content.comparison} id="compare" />
        ) : null;
      case 'rates':
        return content.rates ? <Comparison key={band} content={content.rates} id="rates" /> : null;
      case 'techStack':
        // Drawn by the server shell, in whichever treatment the page asks for
        // (grouped panels, or the Android page's labelled rows).
        return techStacks[band] ? <Fragment key={band}>{techStacks[band]}</Fragment> : null;
      case 'caseStudies':
        // The page's own projects where its live page names them; otherwise
        // the homepage's case studies.
        return (
          <WorkGrid
            key={band}
            content={content.caseStudies}
            mobileSlide={content.caseStudiesMobileSlide}
            head={
              // The page's own projects carry their head as the other
              // bands do (eyebrow, heading, subtext — split by `halfHeads`),
              // rather than the lane's side column (review: "like the hire
              // software developers page").
              content.caseStudiesHeadTop && content.caseStudies ? (
                <SectionHead
                  kicker={content.caseStudies.eyebrow}
                  title={content.caseStudies.title}
                  intro={content.caseStudies.body}
                  wide
                />
              ) : undefined
            }
          />
        );
      case 'testimonials':
        return <Testimonials key={band} />;
      case 'faq':
        return <Faq key={band} content={content.faq} idPrefix={`${content.key}-faq`} />;
      default: {
        // `list:<key>` — one of the page's own label-only bands, rendered
        // through the technology band because that is what it is: a heading and
        // a row of named things. Same treatment, its own place in the page.
        const list = content.lists?.find((l) => `list:${l.key}` === band);
        // Its own anchor, not the band's default `tech`: a page may run several
        // of these beside its real technology section, and they must not all
        // answer to the same id — that is invalid HTML and it stole the nav's
        // Tech Stack link, which belongs to the `techStack` band above.
        // Labels, not tools — so no brand marks: a bullet per label rather than
        // the generic fallback disc on every chip.
        if (list?.display === 'tiles') {
          return cardGrid(band, tilesGrid(list), `list-${list.key}`, 'tiles');
        }
        // The chip rows are drawn by the server shell, like the stack above.
        return list && techStacks[band] ? <Fragment key={band}>{techStacks[band]}</Fragment> : null;
      }
    }
  }

  // Render in the page's own order, dropping bands whose content is absent,
  // then fold each run of same-ground bands into one wrapper, so a chapter
  // reads as one surface rather than as stacked panels with doubled padding.
  const bands = content.order
    .map((band) => ({ band, node: render(band) }))
    .filter((b): b is { band: HireBand; node: ReactNode } => b.node !== null);

  const grounds = assignGrounds(
    bands.map((b) => b.band),
    content.groundOverrides,
  );
  const chapters: { light: boolean; nodes: ReactNode[] }[] = [];
  bands.forEach(({ node }, i) => {
    const light = grounds[i] === 'light';
    const last = chapters.at(-1);
    if (last && last.light === light) last.nodes.push(node);
    else chapters.push({ light, nodes: [node] });
  });

  return (
    <>
      <Hero content={hero} idPrefix={content.key} />

      {chapters.map((chapter, i) =>
        chapter.light ? (
          <div key={i} className={styles.light}>
            {chapter.nodes}
          </div>
        ) : (
          <div key={i}>{chapter.nodes}</div>
        ),
      )}

      {/* The homepage's closing band — the scrubbed focus pull and the
          press-and-hold confirm, which is this surface's rendering of the
          "Book Free Consultation" form every live role page ends on. Its CTA
          keeps the default `/contact` destination — the review asked for
          every final CTA to lead to the contact page. Every role page now
          takes this copy (13 Oct review); four used to opt in to it and the
          rest kept the homepage's AI-strategy pitch. */}
      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon={content.closingCtaIcon} />
    </>
  );
}
