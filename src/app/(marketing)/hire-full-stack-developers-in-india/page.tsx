import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { RestoredLiveLd } from '@/components/seo/restored-live-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
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
import ConsultationClose from '@/components/common/consultation-close';
import IconSection from '@/components/genai-services/icon-section';
import { About, Steps, StackCards, Trust, WhyIndia } from '@/components/hire-full-stack/blocks';

import home from '@/components/home/home.module.css';
import styles from '@/components/hire-full-stack/hire-full-stack.module.css';
import location from '@/components/landing/location-app-page.module.css';

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

export default function HireFullStackDevelopersPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <RestoredLiveLd path="/hire-full-stack-developers-in-india" />
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

        <EngagementModels content={{ ...fsModels, wideHead: true }} headingFont tintIcons whiteHover />

        <div className={home.light}>
          <IconSection id="benefits" columns={3} mode="bare" wideHead eyebrow="" title={fsBenefits.title} body={fsBenefits.body} items={fsBenefits.items} />
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

        {/* The closing "Book Free Consultation" band in the /developer-profile design (as on /faqs). */}
        <ConsultationClose
          id="book-consultation"
          idPrefix="hire-full-stack-contact"
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
