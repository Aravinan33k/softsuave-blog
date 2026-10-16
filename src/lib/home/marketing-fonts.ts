import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';

/**
 * The marketing surface's three faces: Inter (text), Fraunces (display
 * headlines) and JetBrains Mono (labels and buttons). Declared once, here, so
 * the marketing layout and the blog's chrome (the same Nav and Footer, see
 * `themes/softsuave/layout.tsx`) load the same files rather than two copies.
 *
 * They are still not declared in the root layout: fonts declared there preload
 * on every route, admin included. Only the routes that render this surface's
 * header and footer pay for them.
 *
 * What loads when (PageSpeed, 15 Oct). Lighthouse counts every font that
 * finishes before the first paint towards LCP, so only the two faces the first
 * screen is set in are preloaded: Inter (body) and upright Fraunces (the hero
 * headlines). Loading those late made the hero re-wrap when they swapped in.
 * JetBrains Mono (one-line labels) is not preloaded, and nothing names it until
 * `lib/web-fonts` switches it on after the first paint. Fraunces italic is not
 * preloaded: it sets a few accents (the homepage's rotating word, quotes), so
 * it loads only on a page that uses it.
 */
export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// Ultralight editorial serif for the display headlines.
export const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal'],
  display: 'swap',
});

// The italic, under the same family name so `font-style: italic` on any
// Fraunces text picks it up; declared apart only so it is not preloaded.
export const frauncesItalic = Fraunces({
  variable: '--font-fraunces-italic',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['italic'],
  display: 'swap',
  preload: false,
});

export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jbmono',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
});

/** Class names that define the font variables, for a `.theme-four` element. */
export const marketingFontVariables = `${inter.variable} ${fraunces.variable} ${frauncesItalic.variable} ${jetbrainsMono.variable}`;
