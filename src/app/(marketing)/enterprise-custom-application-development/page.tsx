import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { entBanner, entEnquiry, entMeta } from '@/lib/home/enterprise-app-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import VideoBanner from '@/components/common/video-banner';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { CustomSolutions, Solutions } from '@/components/enterprise-app/blocks';

import home from '@/components/home/home.module.css';

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
    <div className={home.page}>
      <Nav />

      <main id="main">
        <VideoBanner title={entBanner.title} accent={entBanner.accent} accentGradient video={entBanner.video} />

        <div className={home.light}>
          <Solutions />
        </div>

        <ManagerEnquiry content={entEnquiry} id="enquiry" idPrefix="enterprise-contact" headingFont />

        <div className={home.light}>
          <CustomSolutions />
        </div>
      </main>

      <Footer />
    </div>
  );
}
