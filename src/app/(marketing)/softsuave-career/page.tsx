import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { careerLabels, careerMeta, careerRoles } from '@/lib/home/career-content';
import { publicMediaUrl } from '@/lib/media-url';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import FadeUp from '@/components/home/fade-up';
import CareerForm from '@/components/career/career-form';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';
import styles from '@/components/career/career.module.css';

/** Soft Suave Career — softsuave.com's /softsuave-career: one role's details beside the application form. */

export const metadata: Metadata = {
  // Head as live: the title (no " | Soft Suave" suffix) and robots — `noindex, nofollow`, kept whatever the site-wide
  // indexing setting is (not `pageRobots`, which turns indexable when the site opens to search). The live page has no
  // meta description, canonical or share tags, so none is written: the empty description and the nulls stop the
  // layout's homepage ones (a canonical pointing at the homepage, among them) being inherited. The route is out of
  // the sitemap (`sitemap: false` in the registry) and in PAGES_WITH_OWN_SITE_GRAPH, so no structured data is
  // emitted, as live has none.
  title: { absolute: careerMeta.title },
  description: '',
  alternates: { canonical: null },
  robots: { index: false, follow: false },
  openGraph: null,
  twitter: null,
};

const HOME_HREF = BASE_PATH || '/';

export default async function SoftsuaveCareerPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // `?role=<slug>` picks the role. Anything unknown (or no role) leaves the details empty, as on the live page.
  const raw = (await searchParams).role;
  const slug = typeof raw === 'string' ? raw : null;
  const role = slug ? (careerRoles[slug] ?? null) : null;

  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <section className={`${landing.sectionShell} ${styles.shell}`} id="softsuave-job">
          <div className={styles.split}>
            <FadeUp>
              <div className={styles.row}>
                <h2 className={styles.label}>{careerLabels.role}</h2>
                <span className={styles.value}>{role?.role}</span>
              </div>
              <div className={styles.row}>
                <h2 className={styles.label}>{careerLabels.experience}</h2>
                <span className={styles.value}>{role?.experience}</span>
              </div>
              <h2 className={styles.descLabel}>{careerLabels.description}</h2>
              <ul className={styles.points} style={{ ['--bag' as string]: `url(${publicMediaUrl('/images/career/portfolio-job.svg')})` }}>
                {role?.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </FadeUp>

            <FadeUp>
              <CareerForm role={slug} />
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
