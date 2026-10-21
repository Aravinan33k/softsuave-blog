import { Inter, Space_Grotesk } from 'next/font/google';

/**
 * The marketing surface's two faces: Inter (text, labels and buttons) and
 * Space Grotesk (every heading). Declared once, here, so the marketing layout
 * and the blog's chrome (the same Nav and Footer, see
 * `themes/softsuave/layout.tsx`) load the same files rather than two copies.
 *
 * They are still not declared in the root layout: fonts declared there preload
 * on every route, admin included. Only the routes that render this surface's
 * header and footer pay for them.
 *
 * Both are preloaded: the first screen is set in them, and loading either late
 * made the hero re-wrap when it swapped in (CLS, PageSpeed 15 Oct).
 *
 * 21 Oct review: headings moved from Fraunces to Space Grotesk, and the
 * one-line labels and buttons from JetBrains Mono to Inter — so the mono face,
 * which `lib/web-fonts` used to switch on after the first paint, is gone, and
 * so is the separate Fraunces italic. Space Grotesk has no italic; the few
 * italic accents (the homepage's rotating word, quotes) are slanted by the
 * browser.
 */
export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// Variable font (300-700): every heading weight comes from one file.
export const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

/** Class names that define the font variables, for a `.theme-four` element. */
export const marketingFontVariables = `${inter.variable} ${spaceGrotesk.variable}`;
