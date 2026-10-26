import type { CaseStudyContent } from "@/components/case-study/case-study";
import { caseStudyEntries } from "../case-studies-data";

/**
 * Every case-study page's "Related Case Studies" lane, chosen by position in
 * the case-study listing (`caseStudyEntries` — the /case-studies page's
 * order, its single source of truth):
 *
 *   1st card     the previous study
 *   2nd–5th      the next four
 *
 * The list wraps both ways, so the first study's previous is the last one and
 * the last studies run on into the start — every page gets five. A card that
 * links to the page itself is skipped, and no link appears twice: the
 * listing carries two entries ("Remote Platform…", "Custom Telehealth App…")
 * that both link to the online-consultation page, so that page and its
 * neighbours step past the repeat to the next study. A page found more than
 * once is placed at its first entry. With fewer than six studies the lane
 * shows as many as there are.
 *
 * Each card is the study's listing card — its title, summary, image and link —
 * with the title as the image's alt (the listing's alts are copy-paste
 * leftovers). A study added to the listing joins its neighbours' lanes on its
 * own. A path the listing doesn't have throws, so a typo fails the build.
 */

const LANE_SIZE = 5;

type RelatedItem = CaseStudyContent["related"]["items"][number];

function card(i: number): RelatedItem {
  const e = caseStudyEntries[i];
  return { title: e.title, body: e.body, image: { src: e.image.src, alt: e.title }, href: e.href };
}

/** The related lane for the case study at `selfHref`. */
export function relatedCaseStudies(selfHref: string): CaseStudyContent["related"] {
  const n = caseStudyEntries.length;
  const at = caseStudyEntries.findIndex((e) => e.href === selfHref);
  if (at < 0) throw new Error(`relatedCaseStudies: no case-study listing entry for ${selfHref}`);

  const seen = new Set<string>([selfHref]);
  const usable = (i: number) => !seen.has(caseStudyEntries[i].href);

  // The previous study: the nearest usable entry walking back (wrapping).
  const items: RelatedItem[] = [];
  for (let step = 1; step < n; step++) {
    const i = (at - step + n) % n;
    if (usable(i)) {
      items.push(card(i));
      seen.add(caseStudyEntries[i].href);
      break;
    }
  }

  // The next four: usable entries walking forward (wrapping).
  for (let step = 1; step < n && items.length < LANE_SIZE; step++) {
    const i = (at + step) % n;
    if (usable(i)) {
      items.push(card(i));
      seen.add(caseStudyEntries[i].href);
    }
  }

  return {
    eyebrow: "Related Case Studies",
    title: "Real-World Impact Through Digital Transformation",
    body: "Explore how we help startups and SMBs grow, launch successful products, and solve challenges with tech and strategy—backed by real results in every case study.",
    tileCta: "View Case Study",
    items,
  };
}
