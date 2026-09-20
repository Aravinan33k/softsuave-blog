/**
 * Copy for the /success-stories index.
 *
 * The nav draws the distinction this page exists to hold: /case-studies is
 * "problem, system, measured outcome" — our account of the engineering — and
 * /success-stories is "the client's account of the same work". So this page
 * leads with the testimonials and points across to the case studies, rather
 * than restating the same four projects in the same words.
 *
 * Neither the testimonials nor the client roster is redefined here; both come
 * from `content.ts`, so this page cannot quote a client the rest of the site
 * does not.
 */

export const successStoriesPageMeta = {
  slug: "success-stories",
  path: "/success-stories",
  title: "Success Stories",
  description:
    "What Soft Suave's clients say about the work in their own words — founders and engineering leads on the teams we built and the systems we shipped for them.",
} as const;

export const successStoriesPageHero = {
  eyebrow: "Success Stories",
  title: "The same work, in the client's words",
  intro:
    "Our case studies describe the systems we built and what they changed. These are the people who commissioned them, describing the experience of working with us.",
} as const;

/** Points across to the engineering account of the same engagements. */
export const successStoriesCrossLink = {
  eyebrow: "The Other Half",
  title: "Prefer the engineering account?",
  body: "The case studies cover the same engagements from the build side: the architecture, the constraints and the number that moved.",
  cta: { label: "Read the case studies", href: "/case-studies" },
} as const;
