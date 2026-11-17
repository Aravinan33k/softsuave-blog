import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { RestoredLiveLd } from '@/components/seo/restored-live-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { posFaqs, posHero, posMeta } from '@/lib/home/pos-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import QuotePopup from '@/components/pos/quote-popup';
import { About, Features, Portfolio, Services, Solutions } from '@/components/pos/blocks';

import home from '@/components/home/home.module.css';

/** POS Software Development Company — softsuave.com's /pos-software-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: posMeta.title },
  description: posMeta.description,
  alternates: { canonical: posMeta.path },
  robots: pageRobots,
  openGraph: {
    title: posMeta.title,
    description: posMeta.description,
    url: absoluteUrl(posMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(posMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: posMeta.title,
    description: posMeta.description,
    images: [dynamicOgImage(posMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function PosSoftwareDevelopmentPage() {
  return (
    <div className={home.page}>
      <RestoredLiveLd path="/pos-software-development-company" />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={posHero} idPrefix="pos" />

        <div className={home.light}>
          <About />
        </div>

        <Services />

        <div className={home.light}>
          <Portfolio />
        </div>

        <Solutions />

        <div className={home.light}>
          <Features />
          <Faq content={posFaqs} idPrefix="pos-faq" />
        </div>

        <QuotePopup />

        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="book-consultation"
          idPrefix="pos-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
