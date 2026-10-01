import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import {
  clientsPageBrands,
  clientsPageHero,
  clientsPageMeta,
} from '@/lib/home/clients-content';
import { SiteLink } from '@/themes/softsuave/site-link';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components. Recognitions and
// Testimonials read the homepage's own content, which matches the live page's
// copy verbatim; the logo band takes this page's heading and roster as props.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

import PhotoMasthead from '@/components/common/photo-masthead';

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
 * The section set is the live page's and nothing more: the "Clients" hero,
 * the "Trusted by Leading Brands" logo band with its "Talk To Experts"
 * button, Industry Recognitions, the testimonials, then the consultation form.
 * The homepage's integrations marquee and a "Your company here next" band used
 * to sit between them; the review removed both because live runs neither.
 *
 * A SERVER component so the route owns its `metadata` and JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

// Title and description are the live page's verbatim — no " | Soft Suave"
// suffix, since the live title already names the company.
export const metadata: Metadata = {
  title: { absolute: clientsPageMeta.title },
  description: clientsPageMeta.description,
  alternates: { canonical: clientsPageMeta.path },
  robots: pageRobots,
  openGraph: {
    title: clientsPageMeta.title,
    description: clientsPageMeta.description,
    url: absoluteUrl(clientsPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(clientsPageMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: clientsPageMeta.title,
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
 * `hasPart` names the roster the page actually renders — the same
 * `clientsPageBrands.logos` the band below is handed — which is what keeps
 * schema and markup from drifting.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(clientsPageMeta.path)}#webpage`,
    name: clientsPageMeta.title,
    description: clientsPageMeta.description,
    url: absoluteUrl(clientsPageMeta.path),
    inLanguage: 'en',
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    hasPart: clientsPageBrands.logos.map((l) => ({
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
        {/* Live's hero: the single word, no paragraph, over its handshake
            photograph. */}
        <PhotoMasthead content={clientsPageHero} />

        <div className={home.light}>
          <Clients
            title={clientsPageBrands.title}
            body={clientsPageBrands.body}
            logos={clientsPageBrands.logos}
          />
          {/* `Clients` renders no button of its own, so live's "Talk To
              Experts" sits directly under the band, on the band's content
              measure. The negative top margin takes back the band's own
              bottom padding (`.clients`), which is re-applied beneath the
              button instead, so the button hangs off the logo strip rather
              than floating between two sections. */}
          <div
            style={{
              position: 'relative',
              marginTop: 'calc(-1 * clamp(40px, 5vw, 76px))',
              padding: '0 var(--gutter) clamp(40px, 5vw, 76px)',
            }}
          >
            <div style={{ maxWidth: 1400, margin: '0 auto' }}>
              <SiteLink
                href={clientsPageBrands.cta.href}
                className={`${landing.btn} ${landing.btnPrimary} ${landing.btnLg}`}
              >
                {clientsPageBrands.cta.label}
              </SiteLink>
            </div>
          </div>

          <Recognitions />

          <Testimonials />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
