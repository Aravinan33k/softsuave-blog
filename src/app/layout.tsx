import type { Metadata } from "next";
import { Lato, PT_Serif } from "next/font/google";
import { env } from "@/lib/env";
import "./globals.css";

// Only the two brand fonts are loaded. Fonts declared in the root layout are
// preloaded on every route, so anything unused here costs a render-blocking
// preload and a download on every page — Geist/Geist Mono used to sit here
// without a single glyph rendering from either.

// Soft Suave brand fonts: headings = Lato, body = PT Serif.
const lato = Lato({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-lato",
});

const ptSerif = PT_Serif({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-pt-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: "Softsuave Blog", template: "%s" },
  description: "A fast, SEO-first blog.",
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
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-[#ff0042] focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
