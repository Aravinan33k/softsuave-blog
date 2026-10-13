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
  style: ['normal', 'italic'],
  display: 'swap',
});

export const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jbmono',
  subsets: ['latin'],
  display: 'swap',
});

/** Class names that define the three font variables, for a `.theme-four` element. */
export const marketingFontVariables = `${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`;
