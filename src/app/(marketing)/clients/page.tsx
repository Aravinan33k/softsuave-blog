import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { clients as clientRoster } from '@/lib/home/content';
import {
  clientsPageCta,
  clientsPageHero,
  clientsPageMeta,
} from '@/lib/home/clients-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components, reading the homepage's
// own content. This page is almost entirely made of them on purpose: see below.
import Clients from '@/components/home/clients';
import Awards from '@/components/home/awards';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import SectionHead from '@/components/landing/section-head';
import CtaBand from '@/components/landing/cta-band';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

/**
 * Our Clients — softsuave.com's /clients index.
 *
 * Linked from the Resources mega panel ("Our Clients"). Until this route
 * existed the link was not broken — `navHref` treats any path outside
 * `MARKETING_ROUTES` as the live site's, so it sent readers to
 * softsuave.com/clients. Registering the route in `landing-pages.ts` is what
 * brings that traffic back in-app; without it this page would exist and
 * nothing would link to it.
 *
 * Deliberately assembled from the homepage's own sections rather than given
 * its own roster: the live page is the client logo band, the awards marquee,
 * the recognitions strip and the testimonials, in that order, and all four are
 * company-level facts that already live in `lib/home/content.ts`. Copying them
 * into a page-local module would let this page and the homepage disagree about
 * who our clients are and what they said — the exact drift `delivery-shared.ts`
 * documents having already cleaned up once. Only the masthead and the closing
 * band are this page's own copy.
 *
 * A SERVER component so the route owns its `metadata` and JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${clientsPageMeta.title} | Soft Suave`,
  description: clientsPageMeta.description,
  alternates: { canonical: clientsPageMeta.path },
  robots: pageRobots,
  openGraph: {
    title: `${clientsPageMeta.title} | Soft Suave`,
    description: clientsPageMeta.description,
    url: absoluteUrl(clientsPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(clientsPageMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${clientsPageMeta.title} | Soft Suave`,
    description: clientsPageMeta.description,
    images: [dynamicOgImage(clientsPageMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * A `CollectionPage` over the client roster, not a `Service`.
 *
 * Built here rather than through `pageSchemaGraph` for the same reason
 * `app/(marketing)/about/page.tsx` builds its own: that helper always emits a
 * `Service` node and points the `WebPage`'s `mainEntity` at it. This page sells
 * nothing — it lists who we have worked for — so a `Service` here would be a
 * claim the page does not make. The organization is referenced by `@id` so the
 * canonical node the layout emits stays the only description of the company.
 *
 * `hasPart` names the roster the page actually renders, so the collection is
 * not an empty assertion; the marks come from `content.ts`, the same source the
 * `Clients` band reads, which is what keeps schema and markup from drifting.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(clientsPageMeta.path)}#webpage`,
    name: `${clientsPageMeta.title} | Soft Suave`,
    description: clientsPageMeta.description,
    url: absoluteUrl(clientsPageMeta.path),
    inLanguage: 'en',
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    hasPart: clientRoster.logos.map((l) => ({
      '@type': 'Organization',
      name: l.name,
    })),
  },
];

export default function ClientsPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        {/* The masthead carries this page's H1 — there is no hero above it to
            hold one, which is what `level={1}` on SectionHead is for. */}
        <section className={landing.indexHead} id="top">
          <SectionHead
            level={1}
            kicker={clientsPageHero.eyebrow}
            title={clientsPageHero.titleLines.join(' ')}
            intro={clientsPageHero.body[0]}
          />
          <p className={home.lead}>{clientsPageHero.body[1]}</p>
        </section>

        <div className={home.light}>
          <Clients />
        </div>

        <Awards />

        <div className={home.light}>
          <Recognitions />
        </div>

        <CtaBand content={clientsPageCta} />

        <div className={home.light}>
          <Testimonials />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
