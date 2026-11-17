import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { vcHero, vcMeta } from '@/lib/home/video-call-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { About, Features, Portfolio } from '@/components/video-call/blocks';

import home from '@/components/home/home.module.css';

/** Video Call App Development Company — softsuave.com's /video-call-app-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> already carries its own " - Soft Suave" ending.
  title: { absolute: vcMeta.title },
  description: vcMeta.description,
  alternates: { canonical: vcMeta.path },
  robots: pageRobots,
  openGraph: {
    title: vcMeta.title,
    description: vcMeta.description,
    url: absoluteUrl(vcMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(vcMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: vcMeta.title,
    description: vcMeta.description,
    images: [dynamicOgImage(vcMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(vcMeta.path)}#webpage`,
  name: vcMeta.title,
  description: vcMeta.description,
  url: absoluteUrl(vcMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function VideoCallAppDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={vcHero} idPrefix="vc" breadcrumb={false} />

        <div className={home.light}>
          <About />
        </div>

        <Features />

        <div className={home.light}>
          <Portfolio />
        </div>

        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="book-consultation"
          idPrefix="vc-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
