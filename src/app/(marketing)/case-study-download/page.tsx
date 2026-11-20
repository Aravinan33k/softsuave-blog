import type { Metadata } from 'next';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/flags';
import { publicMediaUrl } from '@/lib/media-url';
import { caseStudyDownload as t, caseStudyDownloadMeta } from '@/lib/home/case-study-download-content';
import { locationClose } from '@/lib/home/mobile-app-location-shared';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import ConsultationClose from '@/components/common/consultation-close';

import home from '@/components/home/home.module.css';
import gen from '@/components/generative-ai/gen-ai.module.css';
import styles from '@/components/case-study/case-study-download-page.module.css';

/**
 * Thanks for downloading case study — where a case study's download form lands once the request is accepted
 * (`components/case-study/case-study-download.tsx`), as softsuave.com's own does at /case-study-download?email=….
 * Its words and tick are the live page's (`lib/home/case-study-download-content.ts`), in this site's header,
 * footer and type; it closes on the shared "Book Free Consultation" band, as the live page does.
 *
 * Noindex, nofollow: a form's thank-you page has nothing to rank, and the SEO team asked for it on 17 Nov
 * (overriding sheet row 245, which said index). So it is kept out of the sitemap (`sitemap: false` in
 * `landing-pages.ts`). Its canonical is its own URL; inheriting the homepage's sent a mixed signal.
 * The `email` the live page receives is not used, so the page is static.
 */

export const metadata: Metadata = {
  title: caseStudyDownloadMeta.title,
  alternates: { canonical: '/case-study-download' },
  robots: { index: false, follow: false },
};

const HOME_HREF = BASE_PATH || '/';

export default function CaseStudyDownloadPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <div className={home.light}>
          {/* No `id="top"`: the header reads that id as a dark hero and paints its dark fade and white logo for it. */}
          <section className={`${gen.sectionShell} ${styles.shell}`} id="thanks">
            <div className={styles.box}>
              <Image
                src={publicMediaUrl(t.tick.src)}
                alt={t.tick.alt}
                width={t.tick.width}
                height={t.tick.height}
                className={styles.tick}
                priority
              />
              <h1 className={styles.title}>
                {t.title} <span className={styles.accent}>{t.accent}</span>
              </h1>
              <div className={styles.lines}>
                {t.lines.map((line) => (
                  <p key={line} className={styles.line}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>

        <ConsultationClose content={locationClose('Case study download thank you')} idPrefix="case-study-download-close" />
      </main>

      <Footer />
    </div>
  );
}
