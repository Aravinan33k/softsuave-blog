import type { Metadata } from 'next';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
import { publicMediaUrl } from '@/lib/media-url';
import { thankYou, thankYouMeta } from '@/lib/home/thank-you-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import FadeUp from '@/components/home/fade-up';

import home from '@/components/home/home.module.css';
import styles from '@/components/landing/landing.module.css';

/**
 * Thank You — where every lead form lands once the lead is accepted
 * (`lib/forms/thank-you.ts`), as softsuave.com's forms land on its
 * /thank-you. Same content as the live page (`lib/home/thank-you-content.ts`),
 * in this site's header, footer and landing-page type.
 *
 * Deliberately NOT registered in lib/home/landing-pages.ts: that list feeds the
 * sitemap, and a confirmation page is not a search result (the live one is
 * noindex too). It is a static route, so it renders whether or not it is
 * listed there.
 */

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: thankYouMeta.title,
  description: thankYouMeta.description,
  alternates: { canonical: thankYouMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: thankYouMeta.title,
    description: thankYouMeta.description,
    url: absoluteUrl(thankYouMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function ThankYouPage() {
  const t = thankYou;
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <section className={`${styles.hero} ${styles.heroCompact} ${styles.thanks}`} id="top">
          <div className={styles.heroGlow} aria-hidden />

          <FadeUp>
            <h1 className={`${styles.heroTitle} ${styles.thanksTitle}`}>
              {t.title} <span className={styles.heroTitleAccent}>{t.accent}</span>
            </h1>
          </FadeUp>

          <div className={styles.thanksGrid}>
            <FadeUp>
              <figure className={styles.thanksPerson}>
                <Image
                  src={publicMediaUrl(t.person.image)}
                  alt={t.person.alt}
                  width={157}
                  height={157}
                  className={styles.thanksPhoto}
                  priority
                />
                <figcaption className={styles.thanksCaption}>
                  {t.person.caption}
                  <strong>{t.person.name}</strong>
                </figcaption>
              </figure>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className={styles.thanksCopy}>
                <h2 className={styles.thanksHeading}>{t.helpTitle}</h2>
                <ul className={styles.heroPoints}>
                  {t.help.map((item) => (
                    <li key={item} className={styles.heroPoint}>
                      <svg
                        className={styles.heroPointMark}
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="M4 10.6l4 3.8 8-8.8" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={t.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.thanksCta}`}
                >
                  {t.cta.label}
                </a>

                <h3 className={styles.thanksNoteTitle}>{t.note.title}</h3>
                <p className={styles.thanksNote}>
                  {t.note.before}{' '}
                  <a href={`mailto:${t.note.email}`} className={styles.thanksLink}>
                    {t.note.email}
                  </a>{' '}
                  {t.note.after}
                </p>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
