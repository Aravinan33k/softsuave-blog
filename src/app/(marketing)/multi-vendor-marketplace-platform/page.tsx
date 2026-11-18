import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { RestoredLiveLd } from '@/components/seo/restored-live-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { mvBuild, mvFaqs, mvHero, mvMeta } from '@/lib/home/multi-vendor-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ConsultationClose from '@/components/common/consultation-close';
import { About, Features, Highlights, Panels, Platform, Tech, Why } from '@/components/multi-vendor/blocks';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/** Multi-vendor Marketplace Platform — softsuave.com's /multi-vendor-marketplace-platform. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: mvMeta.title },
  description: mvMeta.description,
  alternates: { canonical: mvMeta.path },
  robots: pageRobots,
  openGraph: {
    title: mvMeta.title,
    description: mvMeta.description,
    url: absoluteUrl(mvMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(mvMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: mvMeta.title,
    description: mvMeta.description,
    images: [dynamicOgImage(mvMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function MultiVendorMarketplacePage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <RestoredLiveLd path="/multi-vendor-marketplace-platform" />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={mvHero} idPrefix="multi-vendor" />

        <div className={home.light}>
          <About />
          <Platform />
          <Panels />
        </div>

        <CtaBand content={{ title: mvBuild.title, body: '', cta: mvBuild.cta }} />

        <div className={home.light}>
          <Features />
          <Why />
        </div>

        <Tech />

        <div className={home.light}>
          <Faq content={mvFaqs} idPrefix="multi-vendor-faq" />
          <Highlights />
        </div>

        <ConsultationClose
          id="book-consultation"
          idPrefix="multi-vendor-contact"
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
