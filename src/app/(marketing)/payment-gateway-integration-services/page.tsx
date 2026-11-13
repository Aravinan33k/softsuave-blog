import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { staffCostTestimonials } from '@/lib/home/staff-cost-calculator-content';
import {
  pgClients,
  pgFaqs,
  pgHero,
  pgIntegrations,
  pgMeta,
  pgPower,
  pgProcess,
  pgServices,
  pgTech,
  pgTypes,
  pgWhy,
} from '@/lib/home/payment-gateway-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import IconSection from '@/components/genai-services/icon-section';
import WhyChoose from '@/components/genai-services/why-choose';
import TechStack from '@/components/home/tech-stack';

import home from '@/components/home/home.module.css';

/** Payment Gateway Integration Services — softsuave.com's /payment-gateway-integration-services. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: pgMeta.title },
  description: pgMeta.description,
  alternates: { canonical: pgMeta.path },
  robots: pageRobots,
  openGraph: {
    title: pgMeta.title,
    description: pgMeta.description,
    url: absoluteUrl(pgMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(pgMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: pgMeta.title,
    description: pgMeta.description,
    images: [dynamicOgImage(pgMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(pgMeta.path)}#webpage`,
  name: pgMeta.title,
  description: pgMeta.description,
  url: absoluteUrl(pgMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

/** The live testimonials run Tim, Dara, Dimitris, Roland, Aaron. */
const testimonials = {
  ...staffCostTestimonials,
  items: [...staffCostTestimonials.items.slice(1), staffCostTestimonials.items[0]],
};

export default function PaymentGatewayIntegrationServicesPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={pgHero} idPrefix="payment-gateway" />

        <div className={home.light}>
          <Clients eyebrow={pgClients.eyebrow} title={pgClients.title} body={pgClients.body} />
        </div>

        <IconSection id="services" columns={3} {...pgServices} />

        <div className={home.light}>
          <WhyChoose content={pgWhy} />
        </div>

        <IconSection id="types" columns={5} {...pgTypes} />

        <div className={`${home.light} ${home.techFit}`}>
          <TechStack content={pgTech} id="technologies" staticFrom={768} collapsedGroups={pgTech.visible} />
        </div>

        <IconSection
          id="process"
          columns={3}
          mode="badge"
          eyebrow={pgProcess.eyebrow}
          title={pgProcess.title}
          body={pgProcess.body}
          cta={pgProcess.cta}
          items={pgProcess.items}
        />

        <div className={home.light}>
          <IconSection id="integrations" columns={3} {...pgIntegrations} />
        </div>

        <CtaBand content={{ title: pgPower.title, body: pgPower.body, cta: pgPower.cta }} />

        <div className={home.light}>
          <Testimonials content={testimonials} />
        </div>

        <div className={home.light}>
          <Faq content={pgFaqs} idPrefix="payment-gateway-faq" />
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
          idPrefix="payment-gateway-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
