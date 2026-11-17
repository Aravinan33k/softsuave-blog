import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { healthFaqs, healthHero, healthMeta } from '@/lib/home/healthcare-app-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { About, Advantages, ServiceCards, SuccessStories } from '@/components/healthcare-app/blocks';

import home from '@/components/home/home.module.css';
import styles from '@/components/healthcare-app/healthcare-app.module.css';

/** Healthcare mobile app development company — softsuave.com's /healthcare-mobile-app-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: healthMeta.title,
  description: healthMeta.description,
  alternates: { canonical: healthMeta.path },
  robots: pageRobots,
  openGraph: {
    title: healthMeta.title,
    description: healthMeta.description,
    url: absoluteUrl(healthMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(healthMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: healthMeta.title,
    description: healthMeta.description,
    images: [dynamicOgImage(healthMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(healthMeta.path)}#webpage`,
  name: healthMeta.title,
  description: healthMeta.description,
  url: absoluteUrl(healthMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function HealthcareMobileAppPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={healthHero} idPrefix="healthcare-app" />

        <div className={home.light}>
          <About />
          <div className={styles.cardsPull}>
            <ServiceCards />
          </div>
        </div>

        <SuccessStories />

        <div className={home.light}>
          <Advantages />
          <div className={styles.pullUp}>
            <Faq content={healthFaqs} idPrefix="healthcare-faq" />
          </div>
        </div>

        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="enquiry"
          idPrefix="healthcare-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
