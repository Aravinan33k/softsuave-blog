import { Fragment } from 'react';
import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import { retailAddons, retailFeatures } from '@/lib/home/retail-content';
import landing from '@/components/landing/landing.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './retail.module.css';

/** A heading with the live page's coloured words picked out. */
function Title({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={base.accent}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

/** "Special Features that we offer": the standfirst, the omnichannel line, then seventeen numbered features. */
export function Features() {
  const f = retailFeatures;
  return (
    <section className={`${landing.sectionShell} ${styles.featuresShell}`} id="features">
      <FadeUp>
        <SectionHead title={<Title text={f.title} accent={f.accent} />} intro={f.body} wide />
      </FadeUp>
      <FadeUp>
        <p className={styles.lead}>{f.lead}</p>
      </FadeUp>
      <ol className={styles.features}>
        {f.items.map((it, i) => (
          <li key={it.name} className={styles.feature}>
            <FadeUp className={styles.featureInner}>
              <span className={styles.num} aria-hidden>
                {i + 1}
              </span>
              <div>
                <h3 className={styles.featureName}>{it.name}</h3>
                <p className={styles.featureBody}>{it.body}</p>
              </div>
            </FadeUp>
          </li>
        ))}
      </ol>
    </section>
  );
}

/** "Special Add-Ons that we offer": four rows, text and picture side by side, the picture alternating sides. */
export function Addons() {
  const a = retailAddons;
  return (
    <section className={landing.sectionShell} id="add-ons">
      <FadeUp>
        <SectionHead title={<Title text={a.title} accent={a.accent} />} intro={a.body} wide />
      </FadeUp>
      <div className={styles.addons}>
        {a.items.map((it, i) => (
          <Fragment key={it.name}>
            <div className={styles.addonRow}>
              <FadeUp className={`${styles.addonText} ${i % 2 ? styles.addonTextLast : ''}`}>
                <h3 className={styles.addonName}>{it.name}</h3>
                <p className={styles.addonLead}>{it.lead}</p>
                <ul className={styles.points}>
                  {it.points.map((p) => (
                    <li key={p.text}>
                      {p.b && <strong>{p.b}</strong>}
                      {p.b ? ' ' : ''}
                      {p.text}
                    </li>
                  ))}
                </ul>
              </FadeUp>
              <FadeUp className={`${styles.addonMedia} ${i % 2 ? styles.addonMediaFirst : ''}`}>
                <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
              </FadeUp>
            </div>
            {/* The dotted line that leads the eye from one add-on to the next, in the gap between the rows (desktop only). */}
            {i < a.items.length - 1 && (
              <Image
                className={`${styles.connector} ${i % 2 ? styles.connectorFlip : ''}`}
                src={a.connector.src}
                alt=""
                width={a.connector.width}
                height={a.connector.height}
                unoptimized
                aria-hidden
              />
            )}
          </Fragment>
        ))}
      </div>
    </section>
  );
}
