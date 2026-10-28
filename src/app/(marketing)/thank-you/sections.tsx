'use client';

import Image from 'next/image';
import { publicMediaUrl } from '@/lib/media-url';
import { thankYou } from '@/lib/home/thank-you-content';
import FadeUp from '@/components/home/fade-up';
import styles from '@/components/landing/landing.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 */
export default function Sections() {
  const t = thankYou;

  return (
    <>
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
    </>
  );
}
