import { DM_Sans, DM_Serif_Display, Outfit } from "next/font/google";

/**
 * The Forward Deployed Engineers page's own type: DM Sans (body), Outfit
 * (headings) and DM Serif Display (the italic accents). Self-hosted by
 * next/font at build time like the site's other fonts, so the CSP's
 * `font-src 'self'` holds.
 *
 * The variables are set on the page's `.fde` wrapper only and read by
 * `fde.css` and the `font-display` / `font-serif` theme entries in
 * globals.css. Mono reuses the marketing layout's JetBrains Mono
 * (`--font-jbmono`) rather than downloading it twice.
 */

export const fdeSans = DM_Sans({
  subsets: ["latin"],
  variable: "--fde-font-sans",
  display: "swap",
});

// Variable font: the full 100-900 axis in one file, so any weight utility works.
export const fdeDisplay = Outfit({
  subsets: ["latin"],
  variable: "--fde-font-display",
  display: "swap",
});

export const fdeSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--fde-font-serif",
  display: "swap",
});

/** Class names that define the three font variables, for the page wrapper. */
export const fdeFontVariables = `${fdeSans.variable} ${fdeDisplay.variable} ${fdeSerif.variable}`;
