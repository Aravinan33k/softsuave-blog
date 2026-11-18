import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { eduFaqs, eduHero, eduMeta, eduTech } from '@/lib/home/education-app-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/generative-ai/hero';
import Faq from '@/components/generative-ai/faq';
import TechStack from '@/components/landing/tech-stack';
import ConsultationClose from '@/components/common/consultation-close';
import { Benefits, Experience, Intro } from '@/components/education-app/blocks';

import home from '@/components/home/home.module.css';
import styles from '@/components/education-app/education-app.module.css';
import location from '@/components/landing/location-app-page.module.css';

/** Education app development company — softsuave.com's /education-app-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: eduMeta.title,
  description: eduMeta.description,
  alternates: { canonical: eduMeta.path },
  robots: pageRobots,
  openGraph: {
    title: eduMeta.title,
    description: eduMeta.description,
    url: absoluteUrl(eduMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(eduMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: eduMeta.title,
    description: eduMeta.description,
    images: [dynamicOgImage(eduMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(eduMeta.path)}#webpage`,
  name: eduMeta.title,
  description: eduMeta.description,
  url: absoluteUrl(eduMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function EducationAppPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={eduHero} idPrefix="education-app" wide breadcrumb={false} />

        <div className={home.light}>
          <Intro />
          <Benefits />
        </div>

        <Experience />

        <div className={home.light}>
          <TechStack content={eduTech} id="technologies" largeLogos />
          <div className={styles.faqPull}>
            <Faq content={eduFaqs} idPrefix="education-faq" />
          </div>
        </div>

        {/* The closing "Book Free Consultation" band in the /developer-profile design (as on /faqs). */}
        <ConsultationClose
          id="enquiry"
          idPrefix="education-contact"
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
