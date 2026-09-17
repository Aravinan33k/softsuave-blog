/**
 * The shape of one "Hire <skill> Developers" page's own copy.
 *
 * Everything a hire page says that is *specific to its technology* is declared
 * here; everything it says about the engagement lives in `hire-shared.ts`.
 * `hire-content.ts` composes the two into the content objects the landing
 * components take, so a new skill page is a data entry rather than a new page.
 *
 * The split matters for SEO as much as for maintenance. Twenty-four pages that
 * differ only by a find-and-replace of the technology name are doorway pages,
 * and Google treats them accordingly. Each entry below therefore carries a real
 * argument about its own technology — where it fits, where it does not, and
 * what goes wrong on projects that use it — and only the commercial terms are
 * genuinely shared.
 */

/**
 * Intrinsic size of the hero's background asset. Existing `page: "four"` art is
 * reused rather than fetched — see `content/images.manifest.json` for the slots
 * and `docs/homepage/README.md` for the Pexels pipeline that fills them.
 */
export interface HireImage {
  readonly src: string;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

export interface HireSkill {
  /** Route slug, no leading slash. Matches the live site's existing URL. */
  readonly slug: string;
  /** Stable key for anchors and `idPrefix`. Lowercase, hyphenated. */
  readonly key: string;
  /** The technology, as it should read in a sentence. e.g. "React". */
  readonly name: string;
  /** The role, plural. e.g. "React Developers". */
  readonly role: string;

  /** `<title>`, before the " | Soft Suave" suffix. */
  readonly metaTitle: string;
  /** Meta description. Aim for 150-160 characters. */
  readonly metaDescription: string;
  /** JSON-LD `serviceType`. */
  readonly serviceType: string;

  /** Hero eyebrow, nav CTA label, and the two-line H1. */
  readonly eyebrow: string;
  readonly ctaLabel: string;
  readonly titleLines: readonly [string, string];
  readonly heroBody: readonly [string, string];
  readonly heroPoints: readonly string[];
  readonly image: HireImage;

  /** The enquiry form's prompt, which names the technology. */
  readonly requirementLabel: string;
  readonly requirementPlaceholder: string;

  /** "The short answer" section: what this technology is good for. */
  readonly overviewTitle: string;
  readonly overviewParagraphs: readonly string[];
  readonly pullQuote: string;

  /** What our engineers in this technology actually build. Six cards. */
  readonly capabilities: readonly {
    readonly name: string;
    readonly tag: string;
    readonly body: string;
  }[];

  /** The surrounding stack. Four groups. */
  readonly techGroups: readonly {
    readonly name: string;
    readonly items: readonly string[];
  }[];

  /** Technology-specific FAQs, shown before the shared commercial ones. */
  readonly faqs: readonly { readonly q: string; readonly a: string }[];
}
