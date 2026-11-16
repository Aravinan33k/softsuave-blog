/**
 * Copy for `/case-study-download`, where a case study's download form lands once the request is accepted —
 * softsuave.com's own "Thanks for downloading case study" page (it receives `?email=` and shows nothing of it).
 * Verbatim from https://www.softsuave.com/case-study-download: the tick, the heading with "Soft Suave" in the
 * accent, and the two lines under it. The closing "Book Free Consultation" band is the site's shared one.
 */

export const CASE_STUDY_DOWNLOAD_PATH = "/case-study-download";

export const caseStudyDownloadMeta = {
  path: CASE_STUDY_DOWNLOAD_PATH,
  // The live page's own <title>; it has no description.
  title: "Thanks for downloading case study - Soft Suave",
} as const;

export const caseStudyDownload = {
  tick: { src: "/images/case-study-download/green-tick.png", alt: "Submitted your query", width: 64, height: 64 },
  /** The H1, with `accent` taking the colour as on the live page. */
  title: "Thanks for contacting",
  accent: "Soft Suave",
  lines: [
    "We very much appreciate your interest in this handpicked resource",
    "The resource that you have requested for has been sent straight to your inbox. We hope you find it resourceful",
  ],
} as const;
