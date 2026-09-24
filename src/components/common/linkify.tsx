import type { ReactNode } from "react";
import { SiteLink } from "@/themes/softsuave/site-link";

/**
 * Weaving internal links into copy that is stored as plain strings.
 *
 * Every content module on this surface holds its prose as `readonly string[]`,
 * extracted verbatim from the live page. That is deliberate — the words are not
 * ours to re-author — but it leaves nowhere to put the links the live pages
 * carry inside their sentences, which reviews keep asking for ("internal link
 * is missing in the 2nd paragraph", "highlight the text and add the link in 3rd
 * FAQ answer", "give the page links for Our Services section").
 *
 * So a link is declared by the phrase it wraps rather than by rewriting the
 * copy into JSX. The first unplaced phrase found in a block is replaced with an
 * anchor; anything else passes through untouched.
 *
 * Three properties worth keeping:
 *
 *   - A phrase that no longer appears simply renders no link. Copy and links
 *     can drift without breaking a build — the link goes missing, the sentence
 *     does not.
 *   - `used` is threaded across the blocks of one section, so a phrase that
 *     recurs is linked once. Linking every occurrence would put the same href
 *     on screen three times, which reads as keyword stuffing, not a reference.
 *   - `SiteLink` decides between a local `<Link>` and an absolute anchor, so a
 *     phrase pointing at a page softsuave.com has and this app does not still
 *     resolves instead of 404ing.
 */
export interface InlineLink {
  /** The exact phrase in the copy to turn into a link. */
  readonly text: string;
  /** App-internal route, leading slash. */
  readonly href: string;
}

/**
 * Replace every unplaced link phrase found in `text` with an anchor.
 *
 * All of them, not just the first: one block of copy can carry several. The
 * web-app page's portal service names Education, eCommerce and Healthcare
 * portals in a single description and the live page links all three, so
 * stopping at the first match would silently drop two of them.
 *
 * A plain string search, not a regex: the phrases are page copy and can contain
 * characters a regex would read as syntax. Overlapping phrases cannot both be
 * placed, so a match that starts inside one already taken is skipped — the
 * earlier (and therefore outer) phrase wins.
 */
export function linkify(
  text: string,
  links: readonly InlineLink[] | undefined,
  used: Set<string>,
  className?: string,
): ReactNode {
  if (!links?.length) return text;

  const hits: { at: number; link: InlineLink }[] = [];
  for (const link of links) {
    if (used.has(link.text)) continue;
    const at = text.indexOf(link.text);
    if (at !== -1) hits.push({ at, link });
  }
  if (!hits.length) return text;
  hits.sort((a, b) => a.at - b.at);

  const parts: ReactNode[] = [];
  let cursor = 0;
  for (const { at, link } of hits) {
    if (at < cursor) continue; // overlaps a phrase already placed
    used.add(link.text);
    if (at > cursor) parts.push(text.slice(cursor, at));
    parts.push(
      <SiteLink key={`${link.href}-${at}`} href={link.href} className={className}>
        {link.text}
      </SiteLink>,
    );
    cursor = at + link.text.length;
  }
  if (cursor < text.length) parts.push(text.slice(cursor));
  return <>{parts}</>;
}
