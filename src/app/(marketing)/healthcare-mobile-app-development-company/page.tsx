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
import ConsultationClose from '@/components/common/consultation-close';
import { About, Advantages, ServiceCards, SuccessStories } from '@/components/healthcare-app/blocks';

import home from '@/components/home/home.module.css';
import styles from '@/components/healthcare-app/healthcare-app.module.css';
import location from '@/components/landing/location-app-page.module.css';

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
    <div className={`${home.page} ${location.submitBlack}`}>
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

        {/* The closing "Book Free Consultation" band in the /developer-profile design (as on /faqs). */}
        <ConsultationClose
          id="enquiry"
          idPrefix="healthcare-contact"
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
