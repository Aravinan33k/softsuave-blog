import type { ComponentType, ReactNode } from 'react';

import { BASE_PATH } from '@/lib/flags';
import type { HireBand, HireRolePageContent } from '@/lib/home/hire-roles/types';
import { tilesGrid } from '@/lib/home/hire-roles/band-content';
import { landingPhoto, overviewImage } from '@/lib/home/overview-images';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import type { CardBadges, HireRoleServerProps } from './hire-role-bands';

// The card grids' badge glyphs: the brand marks of `TechLogo` and the drawn set.
import CardIcon, { isBrandIcon } from '@/components/generative-ai/card-icon';
import type { CardGridContent } from '@/components/generative-ai/industries';

// The static grouped stack panels the Android and service pages run, in place
// of the homepage marquee (review: "Technology Stack — change the tech stack
// design ... reuse from already completed pages").
import TechStack from '@/components/landing/tech-stack';
// The Android page's labelled rows, for a page that asks for them instead.
import TechRows from '@/components/home/tech-stack';

import styles from '@/components/home/home.module.css';

/**
 * The server shell of a "Hire Developers by Role" page: the nav, `<main>` and
 * footer, and everything the band rendering cannot compute for itself.
 *
 * The bands themselves are `HireRoleBands` (see its header for how the page is
 * put together), rendered through `Sections` — the route's own `sections.tsx`,
 * a client component that imports that role's copy. The route passes the same
 * copy here as `content`, but only this shell reads it: handed on to the client
 * components as props it was serialized into the RSC payload as well as
 * rendered, so every paragraph was in the document twice.
 *
 * What the shell does pass down is what must not be computed on the browser's
 * side of the boundary:
 *
 * - **The technology bands.** `TechStack` and `TechRows` draw `TechLogo`, ~30 KB
 *   gzipped of SVG, so they stay server components and arrive as slots.
 * - **The card grids' badges.** `Industries` is a server half that draws each
 *   card's badge (`CardIcon`, which routes to `TechLogo` too) for a client half
 *   that draws the rest. The client half is rendered from the bands with the
 *   page's own copy, and only the badges arrive here, ready-made.
 * - **The pipeline's photos.** `overviewImage` / `landingPhoto` read
 *   `images.generated.json` (~300 KB of blur placeholders), which would ship to
 *   every visitor if a client module imported it. Only the one record the page
 *   uses is resolved here and passed on.
 */
/** One badge per card, drawn exactly as `Industries` draws them. */
function cardBadges(grid: CardGridContent): CardBadges {
  return {
    icons: grid.items.map((item) => (
      <CardIcon key={item.name} iconKey={item.key} text={`${item.name}. ${item.body}`} />
    )),
    brand: grid.items.map((item) => isBrandIcon(item.key)),
  };
}

export default function HireRolePage({
  content,
  Sections,
}: Readonly<{
  content: HireRolePageContent;
  /** The route's `sections.tsx`: `HireRoleBands` over this role's own copy. */
  Sections: ComponentType<HireRoleServerProps>;
}>) {
  const slug = content.slug.replace(/^\//, '');

  /**
   * The technology bands, keyed by the `order` entry that places them — only
   * the ones this page actually runs, since each is a rendered subtree that
   * would otherwise cross the boundary unused.
   */
  const techStacks: Record<string, ReactNode> = {};
  if (content.techStack && content.order.includes('techStack')) {
    techStacks.techStack =
      content.techStackStyle === 'rows' ? (
        // `.techFit` drops the homepage band's full-viewport height;
        // `staticFrom` holds the rows still from tablet width up — the same
        // pairing the Android page uses.
        <div className={styles.techFit}>
          <TechRows content={content.techStack} staticFrom={768} />
        </div>
      ) : (
        <TechStack content={content.techStack} largeLogos={content.techStackLargeLogos} />
      );
  }

  /** The same, for the bands that are card grids. */
  const badges: Record<string, CardBadges> = {};
  if (content.specialisations && content.order.includes('specialisations')) {
    badges.specialisations = cardBadges(content.specialisations);
  }
  if (content.whyRole && content.order.includes('whyRole')) {
    badges.whyRole = cardBadges(content.whyRole);
  }

  for (const list of content.lists ?? []) {
    const band: HireBand = `list:${list.key}`;
    if (!content.order.includes(band)) continue;
    if (list.display === 'tiles') {
      // Labels as badge-and-name tiles: a card grid, made from the list the
      // same way the bands make it.
      badges[band] = cardBadges(tilesGrid(list));
    } else {
      // Labels as the technology band's chip rows. Own anchor, and no brand
      // marks: labels, not tools (see `HireRoleBands`).
      techStacks[band] = <TechStack content={list} id={`list-${list.key}`} logos={false} />;
    }
  }

  // A page's own image wins; otherwise the pipeline's per-page photo, which is
  // resolved here (see above) for the bands that run without one.
  const ownOverview =
    content.overview && content.order.includes('overview') && !content.overview.image
      ? overviewImage(slug)
      : undefined;
  const overviewPhoto =
    ownOverview && content.overviewImageAlign
      ? { ...ownOverview, align: content.overviewImageAlign }
      : ownOverview;
  // The live band has a photo of its own: `landing/dl-<slug>`.
  const deliveryPhoto =
    content.globalDelivery &&
    content.order.includes('globalDelivery') &&
    !content.globalDelivery.image
      ? landingPhoto(`dl-${slug}`)
      : undefined;

  return (
    <div className={styles.page}>
      {/* `logoHref` is stated because `ownsAnchors` also keeps the logo's
          default `#top` in-page, and the lockup must go HOME from a sub-page. */}
      <Nav ownsAnchors logoHref={BASE_PATH || '/'} />

      <main id="main">
        <Sections
          techStacks={techStacks}
          cardBadges={badges}
          overviewImage={overviewPhoto}
          deliveryImage={deliveryPhoto}
        />
      </main>

      <Footer />
    </div>
  );
}
