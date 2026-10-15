import type { Metadata } from "next";
import { Lato, PT_Serif } from "next/font/google";
import { env } from "@/lib/env";
import { pageRobots } from "@/lib/flags";
import GoogleTagManager from "@/components/analytics/google-tag-manager";
import ChatBot from "@/components/chatbot/chatbot";
import "./globals.css";

// Only the two brand fonts are loaded. Fonts declared in the root layout are
// preloaded on every route, so anything unused here costs a render-blocking
// preload and a download on every page — Geist/Geist Mono used to sit here
// without a single glyph rendering from either.

// Soft Suave brand fonts: headings = Lato, body = PT Serif.
//
// `preload: false` (BUG-026): this layout wraps the marketing pages too, so
// its preloads went out on every one of them — five font files the marketing
// surface never draws (it sets its own three in `(marketing)/layout.tsx`),
// competing with the render-blocking CSS on a phone connection. Unpreloaded,
// each still downloads the moment a page actually renders text in it.
const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
  preload: false,
});

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-serif",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: "Softsuave Blog", template: "%s" },
  description: "A fast, SEO-first blog.",
  // Site-wide default for any page that sets no robots of its own — noindex,
  // nofollow while `siteIndexable` (lib/flags.ts) is off.
  robots: pageRobots,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${lato.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* z-[1000]: the marketing header is z-index 120, so at 100 the
            focused link sat UNDER the bar and its logo (BUG-022). `fixed`, not
            `absolute`, so it shows wherever the page is scrolled to. */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[1000] focus:rounded-full focus:bg-[#ff0042] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
        {/* The "Soft Suave - Live Chat" widget, on every public page as on
            softsuave.com (it hides itself on /admin and previews). */}
        <ChatBot />
        {/* Last in the body: the container is `afterInteractive`, so its
            position here only decides where the noscript fallback lands. */}
        <GoogleTagManager />
      </body>
    </html>
  );
}
