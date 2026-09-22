import type { Metadata } from 'next';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
import { publicMediaUrl } from '@/lib/media-url';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationLd } from '@/lib/seo/organization';
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

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  title: `${awardsPage.title} | Soft Suave`,
  description: awardsPage.metaDescription,
  alternates: { canonical: '/awards-recognition' },
  openGraph: {
    title: `${awardsPage.title} | Soft Suave`,
    description: awardsPage.metaDescription,
    url: absoluteUrl('/awards-recognition'),
    siteName: 'Soft Suave',
    type: 'website',
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

const PAGE_URL = absoluteUrl('/awards-recognition');

/**
 * CollectionPage + ItemList for the award wall.
 *
 * Built from `recognitions.items` — the same list the page renders — so the
 * structured data cannot drift from what a visitor sees. Each entry is the
 * award as its issuer states it; `organizationLd` is referenced by `@id` for
 * the publisher rather than repeated, the pattern the service pages use.
 */
const awardsPageLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: `${awardsPage.title} | Soft Suave`,
  description: awardsPage.metaDescription,
  inLanguage: 'en',
  publisher: { '@id': organizationLd['@id'] },
  mainEntity: {
    '@type': 'ItemList',
    name: recognitions.title,
    numberOfItems: recognitions.items.length,
    itemListElement: recognitions.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.title,
        ...(item.year ? { dateCreated: item.year } : {}),
        award: item.title,
        provider: { '@type': 'Organization', name: item.org },
      },
    })),
  },
} as const;

export default function AwardsRecognitionPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={[awardsPageLd]} />
      <Nav logoHref={HOME_HREF} />

      {/* The whole page content sits in the warm-white `.light` band: it
          re-points the surface tokens, so every `.recog*` rule below inverts
          with it. The nav and footer stay on the dark canvas, exactly as they
          do over the homepage's light bands. */}
      <main id="main" className={styles.light}>
        <section className={`${styles.section} ${styles.awardsPageSection}`} id="awards">
          <div className={styles.sectionHead}>
            {/* light-band variant, per the band's contract */}
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
