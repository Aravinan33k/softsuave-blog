import type { Metadata } from 'next';
import { marketingFontVariables } from '@/lib/home/marketing-fonts';
import ScrollProvider from '@/components/home/scroll-provider';
import { JsonLd } from '@/components/seo/json-ld';
import { SiteGraph } from '@/components/seo/site-graph';
import { MARKETING_SITE_GRAPH } from '@/lib/seo/page-graph';
import './home.css';

// Layout for the public marketing surface: the homepage at "/" and the service
// landing pages beside it (e.g. /ai-development-service). They share these fonts,
// the `.theme-four` tokens and the Lenis scroll provider, which is what makes a
// service page able to reuse the homepage's own sections verbatim.
//
// The three display fonts (`lib/home/marketing-fonts`) and the homepage
// stylesheet are loaded here rather than in the root layout on purpose: fonts
// declared at the root are preloaded on *every* route, so admin would pay for
// three webfonts it never renders. This puts the font variables on the same
// element as the `.theme-four` tokens that reference them. The blog's theme
// layout loads the same pair for the header and footer it shares with us.

export const metadata: Metadata = {
  title: 'Soft Suave — Scalable AI, Automation & Integrations',
  description:
    'Build scalable AI solutions, intelligent automation systems, and seamless integrations with AI-enabled engineering teams focused on real business outcomes.',
  alternates: { canonical: '/' },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${marketingFontVariables} theme-four`}>
      {/*
       * Who publishes this surface, declared once for every page under it.
       *
       * Each page's own graph names the organization and the website by `@id`
       * instead of describing them again — see `lib/seo/page-graph.ts`. That
       * only resolves if the nodes are actually in the document, which is what
       * this is. Emitting it here rather than per page is also the fix for the
       * thing it replaces: every landing page used to inline its own
       * `{'@type': 'Organization', name: 'Soft Suave'}` stub, so the surface
       * described eighty unrelated companies that happened to share a name.
       *
       * Not on the homepage, which mirrors softsuave.com's own homepage schema
       * exactly — Organization included — nor on the pages whose approved
       * schema spec is their whole structured data (see `SiteGraph`).
       */}
      <SiteGraph>
        <JsonLd data={MARKETING_SITE_GRAPH} />
      </SiteGraph>
      <ScrollProvider>{children}</ScrollProvider>
    </div>
  );
}
