import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { entBanner, entEnquiry, entMeta } from '@/lib/home/enterprise-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import VideoBanner from '@/components/common/video-banner';
import ConsultationClose from '@/components/common/consultation-close';
import { navHref } from '@/themes/softsuave/nav-data';
import { CustomSolutions, Solutions } from '@/components/enterprise-app/blocks';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/** Enterprise Custom Application Development — softsuave.com's /enterprise-custom-application-development. */

export const revalidate = 300;

const ogImage = dynamicOgImage(entMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: entMeta.title },
  description: entMeta.description,
  alternates: { canonical: entMeta.path },
  robots: pageRobots,
  openGraph: {
    title: entMeta.title,
    description: entMeta.description,
    url: absoluteUrl(entMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: entMeta.title,
    description: entMeta.description,
    images: [ogImage],
  },
};

export default function EnterpriseCustomApplicationDevelopmentPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <Nav />

      <main id="main">
        <VideoBanner title={entBanner.title} accent={entBanner.accent} accentGradient video={entBanner.video} />

        <div className={home.light}>
          <Solutions />
        </div>

        <ConsultationClose
          id="enquiry"
          idPrefix="enterprise-contact"
          blackSubmit
          content={{
            title: entEnquiry.title,
            body: entEnquiry.body,
            steps: entEnquiry.steps,
            person: {
              image: { src: entEnquiry.manager.photo, width: 157, height: 157, alt: 'Soft Suave Manager' },
              name: entEnquiry.manager.name,
              role: entEnquiry.manager.role,
            },
            cta: { label: 'Schedule a Call', href: navHref('/30-min-free-consultation') },
            badges: entEnquiry.badges,
            form: entEnquiry.form,
          }}
        />

        <div className={home.light}>
          <CustomSolutions />
        </div>
      </main>

      <Footer />
    </div>
  );
}
