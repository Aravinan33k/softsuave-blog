import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import ScrollProvider from '@/components/home/scroll-provider';
import './home.css';

// Layout for the public marketing surface: the homepage at "/" and the service
// landing pages beside it (e.g. /ai-development-service). They share these fonts,
// the `.theme-four` tokens and the Lenis scroll provider, which is what makes a
// service page able to reuse the homepage's own sections verbatim.
//
// The three display fonts and the homepage stylesheet are declared here rather
// than in the root layout on purpose: fonts declared at the root are preloaded
// on *every* route, so the blog and admin would pay for three webfonts they
// never render. Declaring them here scopes both the preload and the CSS to this
// route group, and puts the font variables on the same element as the
// `.theme-four` tokens that reference them.

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

// Ultralight editorial serif for the display headlines.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jbmono',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Soft Suave — Scalable AI, Automation & Integrations',
  description:
    'Build scalable AI solutions, intelligent automation systems, and seamless integrations with AI-enabled engineering teams focused on real business outcomes.',
  alternates: { canonical: '/' },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable} theme-four`}>
      <ScrollProvider>{children}</ScrollProvider>
    </div>
  );
}
