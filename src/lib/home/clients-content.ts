/**
 * Copy for the /clients index.
 *
 * The page itself is assembled almost entirely from the homepage's own
 * company-level sections — the client logo band, the recognitions strip and the
 * testimonials — because softsuave.com's /clients page is those same three
 * things in that order. Reproducing their content here would let the two
 * disagree about who our clients are, so only the page's own masthead and
 * closing copy live in this file.
 *
 * See `src/lib/home/content.ts` for `clients`, `recognitions` and
 * `testimonials`, which this page renders unchanged.
 */

export const clientsPageMeta = {
  slug: "clients",
  path: "/clients",
  title: "Our Clients",
  description:
    "The companies Soft Suave has shipped for — from funded startups to enterprise teams — with the awards, certifications and client accounts behind that work.",
} as const;

/**
 * Page masthead. Deliberately not the homepage band's eyebrow/title, which
 * introduce the logo strip as one section of a longer page; here the strip is
 * the subject.
 */
export const clientsPageHero = {
  eyebrow: "Our Clients",
  titleLines: ["Who we have", "shipped for"],
  body: [
    "Thirteen years of engagements across healthcare, fintech, logistics, retail and education — some a single release, most a team that stayed for years.",
    "Below: the companies, the recognitions that came out of the work, and what the clients themselves said about it.",
  ],
} as const;

/**
 * Closing band. Points at the enquiry form the Contact section already renders,
 * so the page ends on the same conversion path as every other landing page.
 */
export const clientsPageCta = {
  eyebrow: "Start Something",
  title: "Your company here next",
  body: "Tell us what you are building and we will come back with a team shape, a timeline and a number — usually within one business day.",
  cta: { label: "Talk to us", href: "#contact" },
} as const;
