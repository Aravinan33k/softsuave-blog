import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { staffCostTestimonials } from '@/lib/home/staff-cost-calculator-content';
import {
  genaiBenefits,
  genaiClients,
  genaiDelivery,
  genaiFaqs,
  genaiHero,
  genaiIndustries,
  genaiMeta,
  genaiProcess,
  genaiProjects,
  genaiServices,
  genaiSolutions,
  genaiTech,
} from '@/lib/home/genai-services-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Hero from '@/components/landing/hero';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import IconSection from '@/components/genai-services/icon-section';
import WhyChoose from '@/components/genai-services/why-choose';

import home from '@/components/home/home.module.css';

/** Generative AI Integration Services — softsuave.com's /generative-ai-integration-services. */

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

/** The live testimonials run Tim, Dara, Dimitris, Roland, Aaron. */
const testimonials = {
  ...staffCostTestimonials,
  items: [...staffCostTestimonials.items.slice(1), staffCostTestimonials.items[0]],
};

export default function GenerativeAiIntegrationServicesPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={genaiHero} idPrefix="genai-services" />

        <div className={home.light}>
          <Clients eyebrow={genaiClients.eyebrow} title={genaiClients.title} body={genaiClients.body} />
        </div>

        <IconSection id="services" {...genaiServices} />

        <div className={home.light}>
          <Process
            id="process"
            content={{
              title: genaiProcess.title,
              body: genaiProcess.body,
              cta: genaiProcess.cta,
              steps: genaiProcess.items.map((it, i) => ({ n: String(i + 1).padStart(2, '0'), name: it.name, body: it.body })),
            }}
          />
        </div>

        <IconSection id="solutions" {...genaiSolutions} />

        <div className={home.light}>
          <IconSection id="benefits" columns={5} {...genaiBenefits} />
        </div>

        <IconSection id="industries" columns={5} {...genaiIndustries} />

        <div className={home.light}>
          <CtaBand content={{ title: genaiProjects.title, body: genaiProjects.body, cta: genaiProjects.cta }} />
        </div>

        <div className={home.light}>
          <WhyChoose />
        </div>

        <CardGrid
          id="technologies"
          columns={3}
          content={{ eyebrow: genaiTech.eyebrow, title: genaiTech.title, body: genaiTech.body, items: genaiTech.items.map((i) => ({ ...i, link: false as const })) }}
        />

        <div className={home.light}>
          <CardGrid
            id="delivery"
            variant="bold"
            content={{
              eyebrow: genaiDelivery.eyebrow,
              title: genaiDelivery.title,
              body: genaiDelivery.body,
              items: genaiDelivery.items.map((i) => ({ name: i.name, body: i.body, ...(i.href ? { href: i.href } : { link: false as const }) })),
            }}
          />
        </div>

        <Testimonials content={testimonials} />

        <div className={home.light}>
          <Faq content={genaiFaqs} idPrefix="genai-services-faq" />
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
          idPrefix="genai-services-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
