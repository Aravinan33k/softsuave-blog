import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import {
  fsBenefits,
  fsFaqs,
  fsHero,
  fsMeta,
  fsModels,
  fsRate,
} from '@/lib/home/hire-full-stack-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import Faq from '@/components/landing/faq';
import CtaBand from '@/components/landing/cta-band';
import EngagementModels from '@/components/ad/engagement-models';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import IconSection from '@/components/genai-services/icon-section';
import { About, Steps, StackCards, Trust, WhyIndia } from '@/components/hire-full-stack/blocks';

import home from '@/components/home/home.module.css';
import styles from '@/components/hire-full-stack/hire-full-stack.module.css';

/** Hire Full Stack Developers — softsuave.com's /hire-full-stack-developers-in-india. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: fsMeta.title,
  description: fsMeta.description,
  alternates: { canonical: fsMeta.path },
  robots: pageRobots,
  openGraph: {
    title: fsMeta.title,
    description: fsMeta.description,
    url: absoluteUrl(fsMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(fsMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: fsMeta.title,
    description: fsMeta.description,
    images: [dynamicOgImage(fsMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(fsMeta.path)}#webpage`,
  name: fsMeta.title,
  description: fsMeta.description,
  url: absoluteUrl(fsMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function HireFullStackDevelopersPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={fsHero} idPrefix="hire-full-stack" breadcrumb={false} />

        <div className={home.light}>
          <About />
        </div>

        <StackCards />

        <div className={home.light}>
          <WhyIndia />
        </div>

        <EngagementModels content={fsModels} headingFont tintIcons />

        <div className={home.light}>
          <IconSection id="benefits" columns={3} mode="bare" eyebrow="" title={fsBenefits.title} body={fsBenefits.body} items={fsBenefits.items} />
        </div>

        <CtaBand content={fsRate} />

        <div className={home.light}>
          <Steps />
          <Trust />
        </div>

        <div className={home.light}>
          <div className={styles.pullUp}>
            <Faq content={fsFaqs} idPrefix="hire-full-stack-faq" />
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
          id="book-consultation"
          idPrefix="hire-full-stack-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
