/**
 * Shape of a sector page — the eight pages under the `/industries` index.
 *
 * Each sector gets its own module in this directory holding one object of this
 * shape, and `app/(marketing)/<slug>/page.tsx` renders it through
 * `components/industries/sector-page`. The slugs are softsuave.com's own, so
 * these routes take over URLs that already exist rather than inventing new ones
 * (see `MARKETING_PATHS` in themes/softsuave/nav-data).
 *
 * Sourcing rule, same as the index: solution names and descriptions are the
 * live sector page's wording, and no figure appears here at all — proof comes
 * from `why.stats` and `caseStudies` in `lib/home/content.ts`, so a sector page
 * can never quote a number the rest of the site does not.
 */

export interface SectorPageContent {
  /** Matches the sector's key in `industries-content.ts`. */
  readonly key: string;
  /** App-internal route, leading slash. softsuave.com's own path. */
  readonly slug: string;
  /** Display name, as the index and the nav use it. */
  readonly name: string;
  /**
   * The name this sector goes by in `capabilities.items[].sectors`
   * (`industries-content.ts`), which is how the capability band on this page
   * selects its rows. Usually `name`, but the two lists are written
   * independently, so it is stated rather than assumed.
   */
  readonly capabilityTag: string;
  readonly meta: {
    readonly title: string;
    readonly description: string;
  };
  readonly hero: {
    readonly eyebrow: string;
    /** The H1, split into lines. The last line takes the accent. */
    readonly titleLines: readonly string[];
    readonly body: string;
    /**
     * Image slot for the hero frame, or null to take the typographic
     * treatment instead of a photograph.
     *
     * These are the hand-placed `four/sec-hero-<key>` frames: landscape 4:3,
     * which is the aspect `.heroFramesSolo .heroFrame` actually renders. The
     * portrait `ind-*` slots that used to fill this are the sector index's
     * card art — 800x1000, so a lone hero cover-cropped them hard down the
     * middle. One sector still points at its `ind-*` slot and crops that way;
     * see the note on that sector's own `img`.
     */
    readonly img: string | null;
  };
  readonly solutions: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly items: readonly { readonly name: string; readonly body: string }[];
  };
  readonly proof: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    /**
     * Key of the study in `caseStudies.items` that covers this sector, or null.
     * Four of the eight sectors have one; the rest show the figures alone
     * rather than borrowing another sector's work.
     */
    readonly caseStudyKey: string | null;
  };
  readonly closing: {
    readonly title: string;
    readonly body: string;
  };
}
