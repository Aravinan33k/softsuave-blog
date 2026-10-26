import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  clientsPageBrands,
  clientsPageHero,
  clientsPageMeta,
} from '@/lib/home/clients-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components. Recognitions and
// Testimonials read the homepage's own content, which matches the live page's
// copy verbatim; the logo band takes this page's heading and roster as props.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';

import PhotoMasthead from '@/components/common/photo-masthead';

import home from '@/components/home/home.module.css';

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
 * the "Trusted by Leading Brands" logo band (its "Talk To Experts" button was
 * removed as unnecessary), Industry Recognitions, the testimonials, then the
 * consultation form.
 * The homepage's integrations marquee and a "Your company here next" band used
 * to sit between them; the review removed both because live runs neither.
 *
 * A SERVER component so the route owns its `metadata`; every
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

export default function ClientsPage() {
  return (
    <div className={home.page}>
      {/* No JSON-LD, matching softsuave.com/clients, which serves none: its
          only structured data is the footer's PostalAddress microdata, which
          the shared footer carries here too. The route is in
          PAGES_WITH_OWN_SITE_GRAPH, so the layout adds no Organization or
          WebSite either. The CollectionPage this used to emit listed each
          client logo under `hasPart` as an Organization, which schema.org
          only allows to hold CreativeWorks: one validator error per logo. */}
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
          <Recognitions />

          <Testimonials />
        </div>

        <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
      </main>

      <Footer />
    </div>
  );
}
