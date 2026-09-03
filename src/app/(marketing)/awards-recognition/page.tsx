import type { Metadata } from 'next';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
import { publicMediaUrl } from '@/lib/media-url';
import { awardsPage, recognitions } from '@/lib/home/content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import styles from '@/components/home/home.module.css';

/**
 * Awards and Recognition — the destination for the homepage band's "View All",
 * which used to send the reader off to softsuave.com.
 *
 * The wall is `recognitions.items` rendered in full, using the same
 * `.recog*` classes as the homepage band so a badge looks identical in both
 * places. What it does NOT reuse is `.recogWallWrap`: that wrapper is the
 * homepage's collapse mechanism (`height: 0` until GSAP tweens it open), and
 * here the wall is the point of the page, so it is always open.
 *
 * A SERVER component: only a server component may export `metadata`, and the
 * (marketing) layout's metadata is the homepage's. Fonts, `.theme-four` tokens
 * and Lenis smooth scroll all come from that layout.
 *
 * Nothing here states more about an award than the data holds — the issuing
 * organisation, the wording, and the year where there is one. The live site
 * writes a sentence of prose per award; that copy is not in this content model,
 * and inventing it would put claims under a real directory's name.
 */

export const metadata: Metadata = {
  title: `${awardsPage.title} | Soft Suave`,
  description: awardsPage.body,
  alternates: { canonical: '/awards-recognition' },
  openGraph: {
    title: `${awardsPage.title} | Soft Suave`,
    description: awardsPage.body,
    url: absoluteUrl('/awards-recognition'),
    siteName: 'Soft Suave',
    type: 'website',
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

/** Labels deliberately differ from the homepage's, so no mega panel opens — its
 *  items are homepage anchors that would be dead here. */
const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'AI Services', href: '/#services' },
  { label: 'Our Industries', href: '/#industries' },
  { label: 'Case Studies', href: '/#work' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Book AI Strategy Call', href: '/contact' } as const;

export default function AwardsRecognitionPage() {
  return (
    <div className={styles.page}>
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      {/* The whole page content sits in the warm-white `.light` band: it
          re-points the surface tokens, so every `.recog*` rule below inverts
          with it. The nav and footer stay on the dark canvas, exactly as they
          do over the homepage's light bands. */}
      <main id="main" className={styles.light}>
        <section className={`${styles.section} ${styles.awardsPageSection}`} id="awards">
          <div className={styles.sectionHead}>
            {/* light-band variant, per the band's contract */}
            <span className={styles.eyebrowDark}>{awardsPage.eyebrow}</span>
            <h1 className={styles.h2}>{awardsPage.title}</h1>
            <p className={styles.lead}>{awardsPage.body}</p>
          </div>

          <ul className={styles.recogWall}>
            {recognitions.items.map((item) => (
              <li key={item.key} className={styles.recogCell}>
                <article className={styles.recogCard}>
                  {item.src ? (
                    <span className={styles.recogBadge}>
                      {/* the wording and issuer sit right below, so the artwork
                          adds nothing for a screen reader */}
                      <Image
                        src={publicMediaUrl(item.src)}
                        alt=""
                        fill
                        sizes="160px"
                        className={styles.recogBadgeImg}
                      />
                    </span>
                  ) : null}
                  <h2 className={styles.recogTitle}>{item.title}</h2>
                  <p className={styles.recogMeta}>
                    <span>{item.org}</span>
                    {item.year ? <span className={styles.recogYear}>{item.year}</span> : null}
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}
