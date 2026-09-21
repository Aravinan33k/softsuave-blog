/**
 * Copy for the /career-overview page — the careers index.
 *
 * SOURCE: https://www.softsuave.com/career-overview, which is a thin page: an
 * H1 ("Career"), the line "Hiring Talents & Rewarding Promising Results.", a
 * "Join Us" heading, a location filter (All / Navalur - Chennai / Bangalore)
 * and a three-column table of openings. Nothing else. That maps onto
 * `components/landing/listing` almost exactly — masthead, filter chips, cards
 * — so this page needs no bespoke section.
 *
 * WHY THIS PAGE MATTERS MORE THAN ITS SIZE SUGGESTS: `delivery-shared.ts`'s
 * `sharedHeroAlert` points every hero enquiry form on the site at
 * `/career-overview` ("This form is for business, not candidates. To apply for
 * jobs, click here."). Seventeen pages link here. Until this route existed,
 * every one of those links 404'd.
 *
 * TWO DEPARTURES FROM THE LIVE PAGE, both deliberate:
 *
 *   1. Gender qualifiers are dropped from two role titles. Live publishes
 *      "Trainee - Software Engineer (Male)" and "Sr. BD (Both Male & female)".
 *      A job advertisement that restricts applicants by sex is unlawful in
 *      most of the markets this site is read in, and is a liability wherever
 *      it is not. The roles are listed; the qualifiers are not. If the
 *      restriction is a real hiring requirement it belongs in a conversation
 *      with HR, not in public page copy.
 *   2. The live table's "Sr. BD" row is missing its opening `<tr>` — the tag
 *      was left inside an HTML comment when a neighbouring row was disabled,
 *      so the row renders outside the table body. It is a live opening, so it
 *      is listed here properly.
 *
 * Roles whose rows are commented out in the live markup (SEO Analyst, HR
 * Executive, and a dozen others) are NOT listed: a commented row is a closed
 * requisition, and republishing it would send applicants at a job that is not
 * open.
 *
 * `applyHref` is root-relative and deliberately NOT one of our routes:
 * `themes/softsuave/nav-data`'s `navHref` resolves any path outside the
 * landing-page registry to softsuave.com, so `/softsuave-career?role=…` lands
 * on the live applicant form — the one HR actually monitors. Building a second
 * intake here would split applications across two inboxes.
 */

import type { ListingContent } from "@/components/landing/listing";
import type { CtaBandContent } from "@/components/landing/cta-band";

export const careersMeta = {
  slug: "career-overview",
  path: "/career-overview",
  /* Rendered as `${title} | Soft Suave`, so the brand name must not appear
     here. The live title is the bare word "Career", which says nothing in a
     SERP line; this leads on what the page is for. */
  title: "Careers — Open Roles in Engineering, Design and Growth",
  shortTitle: "Careers",
  description:
    "Open roles at Soft Suave across engineering, design, HR and business development, in Chennai and Bengaluru. Apply directly to the team doing the hiring.",
} as const;

/** One live opening. `location` doubles as the filter facet. */
export interface Opening {
  readonly key: string;
  readonly role: string;
  readonly location: string;
  /** Discipline, shown as the card's metric label. */
  readonly team: string;
  /** Path on the live applicant form; resolved to softsuave.com by `SiteLink`. */
  readonly applyHref: string;
}

export const openings: readonly Opening[] = [
  {
    key: "trainee-hr",
    role: "Trainee — Human Resources",
    location: "Navalur, Chennai",
    team: "People",
    applyHref: "/softsuave-career?role=trainee-hr",
  },
  {
    key: "trainee-se",
    role: "Trainee — Software Engineer",
    location: "Navalur, Chennai",
    team: "Engineering",
    applyHref: "/softsuave-career?role=trainee-se",
  },
  {
    key: "trainee-bd",
    role: "Trainee — Business Development",
    location: "Navalur, Chennai",
    team: "Growth",
    applyHref: "/softsuave-career?role=trainee-bd",
  },
  {
    key: "sr-bd",
    role: "Senior Business Development Executive",
    location: "Navalur, Chennai",
    team: "Growth",
    applyHref: "/softsuave-career?role=sr-bd",
  },
  {
    key: "executive-ui-ux-designer",
    role: "Executive — UI/UX Designer",
    location: "Navalur, Chennai",
    team: "Design",
    applyHref: "/softsuave-career?role=executive-ui-ux-designer",
  },
];

export const careersListing: ListingContent = {
  eyebrow: "Careers",
  /* The live page's own promise, as a sentence rather than the bare "Career". */
  title: "Hiring talent, rewarding promising results",
  intro:
    "Open roles across engineering, design, people and growth, at the Chennai and Bengaluru delivery centres. Every application goes to the team that is hiring — pick a role and it takes you straight to the form.",
  allLabel: "All locations",
  filterLabel: "location",
  items: openings.map((o) => ({
    key: o.key,
    tag: o.location,
    title: o.role,
    metricLabel: o.team,
    href: o.applyHref,
  })),
};

export const careersMidCta: CtaBandContent = {
  eyebrow: "Life at Soft Suave",
  title: "See what you would be joining",
  body: "Five-day weeks, onsite opportunities, and a team that celebrates what it ships. The culture, the perks and the people are on their own page.",
  cta: { label: "Life at Soft Suave", href: "/life-at-softsuave" },
};

/**
 * Where an applicant should write when no listed role fits. The live page
 * publishes both HR inboxes in its contact panel; a careers page that lists
 * five roles and offers no other route turns everyone else away.
 */
export const careersContact = {
  eyebrow: "No role that fits?",
  title: "Write to us anyway",
  intro:
    "We hire ahead of a requisition when someone is clearly right. Send a CV and a line about the work you want to be doing.",
  inboxes: [
    { key: "chennai", label: "Chennai", email: "careers@softsuave.com", phone: "+91 8015159981" },
    {
      key: "bengaluru",
      label: "Bengaluru",
      email: "teamhr.bangalore@softsuave.com",
      phone: "080 4216 1324",
    },
  ],
} as const;
