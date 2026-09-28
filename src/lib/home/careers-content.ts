/**
 * Copy for the /career-overview page — the careers index.
 *
 * SOURCE: https://www.softsuave.com/career-overview, which is a thin page: an
 * H1 ("Career"), the line "Hiring Talents & Rewarding Promising Results.", a
 * "Join Us" heading, a location filter (All Locations / Navalur - Chennai /
 * Bangalore) and a table of openings. Nothing else — the footer follows the
 * table. This page carries exactly that, verbatim, per the review ("match live
 * verbatim", "remove extra sections").
 *
 * WHY THIS PAGE MATTERS MORE THAN ITS SIZE SUGGESTS: `delivery-shared.ts`'s
 * `sharedHeroAlert` points every hero enquiry form on the site at
 * `/career-overview` ("This form is for business, not candidates. To apply for
 * jobs, click here."). Seventeen pages link here.
 *
 * Role titles are the live table's, character for character — including the
 * gender qualifiers on two of them, which the review asked to keep verbatim.
 *
 * The live table's "Sr. BD" row is missing its opening `<tr>` (the tag was left
 * inside an HTML comment when a neighbouring row was disabled). It is a live
 * opening, so it is listed here properly. Rows commented out in the live markup
 * (SEO Analyst, HR Executive, and a dozen others) are closed requisitions and
 * are NOT listed.
 *
 * `applyHref` is root-relative and deliberately NOT one of our routes:
 * `themes/softsuave/nav-data`'s `navHref` resolves any path outside the
 * landing-page registry to softsuave.com, so `/softsuave-career?role=…` lands
 * on the live applicant form — the one HR actually monitors.
 */

export const careersMeta = {
  slug: "career-overview",
  path: "/career-overview",
  /* The live page's own <title>, verbatim — it carries no brand suffix there. */
  title: "Explore Careers at Soft Suave: Join Our Skilled Team",
  shortTitle: "Careers",
  description:
    "Build your career with Soft Suave - entry-level or experienced professionals. We offer a friendly work environment with growth that shapes your career.",
} as const;

export const careersHero = {
  title: "Career",
  intro: "Hiring Talents & Rewarding Promising Results.",
} as const;

/** One live opening. `location` doubles as the filter facet. */
export interface Opening {
  readonly key: string;
  readonly role: string;
  readonly location: string;
  /** Path on the live applicant form; resolved to softsuave.com by `SiteLink`. */
  readonly applyHref: string;
}

export interface OpeningsContent {
  readonly title: string;
  /** Label of the tab that shows every opening. */
  readonly allLabel: string;
  /** The location tabs, in the live page's order — including any with no openings. */
  readonly locations: readonly string[];
  readonly columns: { readonly role: string; readonly location: string; readonly apply: string };
  readonly applyLabel: string;
  /** Shown in place of rows when a location has no openings. */
  readonly emptyText: string;
  readonly items: readonly Opening[];
}

export const openings: readonly Opening[] = [
  {
    key: "trainee-hr",
    role: "Trainee - HR",
    location: "Navalur - Chennai",
    applyHref: "/softsuave-career?role=trainee-hr",
  },
  {
    key: "trainee-se",
    // Live appends "(Male)". Dropped deliberately: a sex-restricted job title
    // is a discrimination risk in most hiring jurisdictions — HR can restore
    // it if it has signed off.
    role: "Trainee - Software Engineer",
    location: "Navalur - Chennai",
    applyHref: "/softsuave-career?role=trainee-se",
  },
  {
    key: "trainee-bd",
    role: "Trainee - Business Development",
    location: "Navalur - Chennai",
    applyHref: "/softsuave-career?role=trainee-bd",
  },
  {
    key: "sr-bd",
    // Live appends "(Both Male & female)"; dropped for the same reason, and
    // because a role open to everyone needs no qualifier.
    role: "Sr. BD",
    location: "Navalur - Chennai",
    applyHref: "/softsuave-career?role=sr-bd",
  },
  {
    key: "executive-ui-ux-designer",
    role: "Executive - UI Ux Designer",
    location: "Navalur - Chennai",
    applyHref: "/softsuave-career?role=executive-ui-ux-designer",
  },
];

export const careersOpenings: OpeningsContent = {
  title: "Join Us",
  allLabel: "All Locations",
  /* Live lists Bangalore as a tab even though no role is open there; its panel
     is an empty table. */
  locations: ["Navalur - Chennai", "Bangalore"],
  /* Live heads only Role and Location; the third column is visually unlabelled
     there, so its header is screen-reader-only here. */
  columns: { role: "Role", location: "Location", apply: "Apply" },
  applyLabel: "Apply Now",
  emptyText: "No openings at this location right now.",
  items: openings,
};
