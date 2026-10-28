import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import {
  onlineConsultationCaseStudy,
  onlineConsultationMeta,
} from '@/lib/home/case-studies/online-consultation-platform-for-doctors';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Online consultation platform for doctors, rebuilt from
 * https://www.softsuave.com/case-study-online-consultation-platform-for-doctors
 * on the case-study template (`components/case-study`). Copy, images, logos
 * and PDF are the live page's; the layout and type are this site's.
 *
 * Live carries no JSON-LD, so this page emits none either; the route is in
 * PAGES_WITH_OWN_SITE_GRAPH so the layout adds nothing in its place.
 *
 * A SERVER component so it can own its `metadata`. Fonts, the `.theme-four`
 * tokens and Lenis smooth scroll come from `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

/** The link-preview image: live's share card, as served (840×439 JPEG), at live's path. */
const OG_IMAGE = {
  url: ogImageUrl('/assets/case-studies/remote-platform-to-connect-doctors-and-patients.jpg'),
  width: 840,
  height: 439,
  alt: 'Remote Platform to Connect Doctors and Patients from Anywhere',
};

const TITLE = onlineConsultationMeta.title;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: TITLE,
  description: onlineConsultationMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-online-consultation-platform-for-doctors' },
  robots: pageRobots,
  openGraph: {
    title: TITLE,
    description: onlineConsultationMeta.description,
    url: absoluteUrl(onlineConsultationMeta.path),
    siteName: 'Soft Suave',
    type: 'article',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@softsuave',
    title: TITLE,
    description: onlineConsultationMeta.description,
    images: [OG_IMAGE.url],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function OnlineConsultationCaseStudyPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy
          content={onlineConsultationCaseStudy}
          idPrefix="case-study-online-consultation-platform-for-doctors"
        />
      </main>

      <Footer />
    </div>
  );
}
