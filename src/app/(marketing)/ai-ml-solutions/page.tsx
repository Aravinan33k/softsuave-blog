import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  aiMlBanner,
  aiMlEnquiry,
  aiMlMeta,
  aiMlOverview,
  aiMlSolutions,
} from '@/lib/home/ai-ml-solutions-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import VideoBanner from '@/components/common/video-banner';
// The cards that draw an orange rule across their top edge on hover — "Software Development for a Range
// of Industries" on /software-development-company.
import Industries from '@/components/landing/industries';
import Overview from '@/components/landing/overview';
import ManagerEnquiry from '@/components/ad/manager-enquiry';

import home from '@/components/home/home.module.css';

/**
 * AI / ML Solutions — a clone of softsuave.com/ai-ml-solutions, in the marketing surface's own theme.
 *
 * A looping-video banner, the "Solution Overview" cards, the account-manager enquiry block and the
 * closing "AI-Driven Systems…" overview, in the live order; copy in `lib/home/ai-ml-solutions-content.ts`.
 * With the site's own header and footer, as the live page has. Not in `landing-pages.ts`, so it stays out of the sitemap.
 *
 * A SERVER component, so the route can export `metadata`.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(aiMlMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: aiMlMeta.title },
  description: aiMlMeta.description,
  alternates: { canonical: aiMlMeta.path },
  robots: pageRobots,
  openGraph: {
    title: aiMlMeta.title,
    description: aiMlMeta.description,
    url: absoluteUrl(aiMlMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: aiMlMeta.title,
    description: aiMlMeta.description,
    images: [ogImage],
  },
};

export default function AiMlSolutionsPage() {
  return (
    <div className={home.page}>
      <Nav />

      <main id="main">
        <VideoBanner title={aiMlBanner.title} accent={aiMlBanner.accent} video={aiMlBanner.video} />

        <div className={home.light}>
          <Industries content={aiMlSolutions} id="solutions" columns={3} />
        </div>

        <ManagerEnquiry content={aiMlEnquiry} id="enquiry" idPrefix="ai-ml-contact" />

        <div className={home.light}>
          <Overview content={aiMlOverview} id="overview" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
