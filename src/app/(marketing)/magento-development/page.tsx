import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { RestoredLiveLd } from '@/components/seo/restored-live-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { mgFaqs, mgHero, mgMeta, mgOffshore } from '@/lib/home/magento-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ConsultationClose from '@/components/common/consultation-close';
import { About, Services } from '@/components/magento/blocks';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/** Magento Development — softsuave.com's /magento-development. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: mgMeta.title },
  description: mgMeta.description,
  alternates: { canonical: mgMeta.path },
  robots: pageRobots,
  openGraph: {
    title: mgMeta.title,
    description: mgMeta.description,
    url: absoluteUrl(mgMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(mgMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: mgMeta.title,
    description: mgMeta.description,
    images: [dynamicOgImage(mgMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function MagentoDevelopmentPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <RestoredLiveLd path="/magento-development" />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={mgHero} idPrefix="magento" />

        <div className={home.light}>
          <About />
          <Services />
        </div>

        <CtaBand
          content={{
            title: mgOffshore.title,
            body: (
              <>
                {mgOffshore.before}
                <strong>{mgOffshore.bold}</strong>
                {mgOffshore.after}
              </>
            ),
            cta: mgOffshore.cta,
          }}
        />

        <div className={home.light}>
          <Faq content={mgFaqs} idPrefix="magento-faq" />
        </div>

        <ConsultationClose
          id="book-consultation"
          idPrefix="magento-contact"
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
