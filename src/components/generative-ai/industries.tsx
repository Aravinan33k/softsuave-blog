import { industries as generativeAiIndustries } from "@/lib/home/generative-ai";
import CardIcon, { isBrandIcon } from "./card-icon";
import IndustriesClient from "./industries-client";

// `CardIcon` holds the glyph vocabulary; see that file for why it is not here.
// The "01"-style ordinals these cards used to carry are gone (review: icons
// instead of numbers) — every variant already leads with a `CardIcon`, and a
// card with no icon key now gets one picked from its own words.

/** Shared by every card-grid section on the AI landing pages. */
export interface CardGridContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly key?: string;
    readonly name: string;
    readonly body: string;
    /** Decorative backdrop shown at rest with the icon and name. */
    readonly image?: string;
    /**
     * Where the card's "Know More" goes. Defaults to `#enquiry`, the hero form
     * — right for a card that describes something we would scope with you.
     * Cards that name a page we actually publish give that page's path instead,
     * which is what turns the hire-by-role specialisation grids into real
     * navigation between the nine role pages rather than nine dead ends.
     */
    readonly href?: string;
    /**
     * `false` keeps this one card unlinked even where its name matches one of
     * our pages — for a card whose right destination does not exist yet
     * (hire-by-role review: "Hire Xamarin Developers - remove the link from
     * this card for now").
     */
    readonly link?: false;
  }[];
  /**
   * Optional button under the grid — the live hire pages close some of these
   * sections on one ("Ready to discuss? Contact us"; review: "a CTA button is
   * missing"). Same size as the mid-page conversion band's button.
   */
  cta?: { readonly label: string; readonly href: string };
}

/**
 * A reveal-on-hover image grid — the sectors this page builds for.
 *
 * Matches the production softsuave.com Industries section: each card shows
 * only its photographic backdrop, an icon, and the industry name at rest.
 * Hovering or focusing cross-fades in `.indCardOverlay`, an inverted
 * (dark-on-photo) rectangle sized to the card's own bounds carrying the name
 * again, the description, and a "Know More" link — not a strip that grows
 * from the bottom edge, which could out-grow a short 4-up card and overflow
 * it. `:focus-within` drives the same reveal as `:hover` so the link is
 * reachable without a pointer, and both the rest face and the overlay stay
 * mounted throughout so the transition is a plain opacity/transform tween.
 *
 * Split in two: this server half draws each card's badge (`CardIcon`, which
 * holds the brand marks of `TechLogo` and the drawn glyphs — tens of KB) and
 * hands the glyphs to the interactive client half ready-made, so none of that
 * ships as JavaScript (PageSpeed, 15 Oct).
 */
export default function Industries({
  content = generativeAiIndustries,
  id = "industries",
  variant = "photo",
  links = true,
  cardLinks = false,
}: {
  content?: CardGridContent;
  id?: string;
  /**
   * `photo` (default) is the reveal-on-hover picture card above. `compact` is
   * the text card: content-height, bordered, everything legible at rest. Use it
   * when the items have no artwork — in the picture card an imageless item
   * leaves two-thirds of a square empty and hides its description behind a
   * hover the reader has no cue to try.
   *
   * `bold` is the same text card composed the way the Global Capability Center
   * page's "Who It Fits" band composes its own: an asymmetric 12-column grid
   * off `gridSpansFor()` and a per-card accent rule along the top edge. It is
   * what every hire page uses, so the two families read as one design system.
   * See the CARD GRID — BOLD VARIANT block in gen-ai.module.css.
   *
   * `tiles` is the bold card cut down to a badge and a name, for a section
   * that lists labels with no description of their own (the QA page's testing
   * types, domains and approach). An even grid rather than the asymmetric
   * spans, because every tile carries the same amount: four across, or three
   * where the count divides by three and not four. A body, if an item has
   * one, still renders.
   */
  variant?: "photo" | "compact" | "bold" | "tiles";
  /**
   * `false` drops every card's "Know More", `href`s included. The AI service
   * pages' industry grids run without it: the sectors are context for the
   * service, not destinations of their own.
   */
  links?: boolean;
  /**
   * The whole card is the link instead of a "Know More" inside it.
   *
   * `bold`: the "Know More" under the copy goes (hire-by-role review: "remove
   * the 'Know More' buttons; the entire cards must be clickable"); the card
   * title carries the link, stretched over the card, so the accessible name is
   * the card's own name.
   *
   * `photo`: a link layer over the whole card, named for the card, above the
   * hover overlay; the overlay keeps its "Know More" as a cue, no longer a link
   * of its own (7 Oct review, Generative AI and Agentic AI industries: "link
   * the cards with respective industry pages and make the whole cards
   * clickable").
   */
  cardLinks?: boolean;
} = {}) {
  return (
    <IndustriesClient
      content={content}
      id={id}
      variant={variant}
      links={links}
      cardLinks={cardLinks}
      icons={content.items.map((item) => (
        <CardIcon key={item.name} iconKey={item.key} text={`${item.name}. ${item.body}`} />
      ))}
      brand={content.items.map((item) => isBrandIcon(item.key))}
    />
  );
}
