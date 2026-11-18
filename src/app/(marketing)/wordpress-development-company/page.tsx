import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { wpFaqs, wpHero, wpMeta, wpOffshore } from '@/lib/home/wordpress-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ConsultationClose from '@/components/common/consultation-close';
import { About, Services } from '@/components/wordpress/blocks';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/** WordPress Development Company — softsuave.com's /wordpress-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: wpMeta.title },
  description: wpMeta.description,
  alternates: { canonical: wpMeta.path },
  robots: pageRobots,
  openGraph: {
    title: wpMeta.title,
    description: wpMeta.description,
    url: absoluteUrl(wpMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(wpMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: wpMeta.title,
    description: wpMeta.description,
    images: [dynamicOgImage(wpMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(wpMeta.path)}#webpage`,
  name: wpMeta.title,
  description: wpMeta.description,
  url: absoluteUrl(wpMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function WordpressDevelopmentCompanyPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={wpHero} idPrefix="wp" />

        <div className={home.light}>
          <About />
          <Services />
        </div>

        <CtaBand
          content={{
            title: wpOffshore.title,
            body: (
              <>
                {wpOffshore.before}
                <strong>{wpOffshore.bold}</strong>
                {wpOffshore.after}
              </>
            ),
            cta: wpOffshore.cta,
          }}
        />

        <div className={home.light}>
          <Faq content={wpFaqs} idPrefix="wp-faq" />
        </div>

        <ConsultationClose
          id="book-consultation"
          idPrefix="wp-contact"
          blackSubmit
          content={{
            title: faqsPageEnquiry.title,
            body: faqsPageEnquiry.body,
            steps: faqsPageEnquiry.steps,
            person: {
              image: { src: faqsPageEnquiry.manager.photo, width: 157, height: 157, alt: 'Soft Suave Manager' },
              name: faqsPageEnquiry.manager.name,
              role: faqsPageEnquiry.manager.role,
            },
            cta: {
              label: faqsPageEnquiry.manager.cta?.label ?? 'Schedule a Call',
              href: navHref(faqsPageEnquiry.manager.cta?.href ?? '/30-min-free-consultation'),
            },
            badges: faqsPageEnquiry.badges,
            form: faqsPageEnquiry.form,
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
