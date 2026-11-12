import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { navHref } from '@/themes/softsuave/nav-data';
import { genaiClients, genaiCta, genaiFaqs, genaiHero, genaiIndustries, genaiMeta, genaiServices } from '@/lib/home/genai-integration-content';
import { staffCostTestimonials } from '@/lib/home/staff-cost-calculator-content';
import {
  staffBenefits,
  staffModels,
  staffProcess,
  staffRoles,
  staffTechnologies,
} from '@/lib/home/staff-augmentation-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import ManagerEnquiry from '@/components/ad/manager-enquiry';

import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import IconSection from '@/components/genai-integration/icon-section';
import WhyChoose from '@/components/genai-integration/why-choose';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';
import styles from '@/components/genai-integration/genai-integration.module.css';

/**
 * Generative AI Integration Services — softsuave.com's /generative-ai-integration-service.
 *
 * The live page is the IT staff augmentation page under its own hero, "services we offer" block and
 * call-to-action band, so it is composed from the same sections, in the live page's order.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: genaiMeta.title,
  description: genaiMeta.description,
  alternates: { canonical: genaiMeta.path },
  robots: pageRobots,
  openGraph: {
    title: genaiMeta.title,
    description: genaiMeta.description,
    url: absoluteUrl(genaiMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(genaiMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: genaiMeta.title,
    description: genaiMeta.description,
    images: [dynamicOgImage(genaiMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(genaiMeta.path)}#webpage`,
  name: genaiMeta.title,
  description: genaiMeta.description,
  url: absoluteUrl(genaiMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function GenerativeAiIntegrationPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={genaiHero} idPrefix="genai-integration" />

        <div className={home.light}>
          <Clients eyebrow={genaiClients.eyebrow} title={genaiClients.title} body={genaiClients.body} />
        </div>

        <IconSection id="services" tint {...genaiServices} />

        <div className={home.light}>
          <Process content={{ ...staffProcess, cta: { label: staffProcess.cta?.label ?? '', href: '/30-min-free-consultation' } }} />
        </div>

        <div className={home.light}>
          <div className={styles.pullUp}>
            <Services content={staffRoles} variant="bold" cardLinks />
          </div>
        </div>

        <div className={home.light}>
          <CtaBand content={genaiCta} />
        </div>

        <div className={home.light}>
          <WhyChoose />
        </div>

        <div className={home.light}>
          <div className={styles.pullUp}>
            <CardGrid content={staffModels} id="models" variant="bold" />
          </div>
        </div>

        <CardGrid content={staffTechnologies} id="technologies" columns={4} />

        <div className={home.light}>
          <CardGrid content={genaiIndustries} id="industries" columns={5} />
        </div>

        <CardGrid content={staffBenefits} id="benefits" columns={5} />

        <div className={home.light}>
          <Testimonials content={staffCostTestimonials} />
          <div className={styles.pullUp}>
            <Faq content={genaiFaqs} idPrefix="genai-faq" />
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
          idPrefix="genai-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
