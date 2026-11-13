import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import CardIconBadge from '@/components/common/card-icon-badge';
import { SiteLink } from '@/themes/softsuave/site-link';
import { swiftAbout, swiftTech, swiftWhy, swiftWorkFor, type Piece } from '@/lib/home/swift-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './swift.module.css';

function Pieces({ pieces }: { pieces: readonly Piece[] }) {
  return (
    <>
      {pieces.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : (
          <SiteLink key={i} href={p.href} className={styles.inlineLink}>
            {p.text}
          </SiteLink>
        ),
      )}
    </>
  );
}

/** "Who We Are": the picture beside the heading and three paragraphs, the live photo fading in behind on desktop. */
export function About() {
  const a = swiftAbout;
  return (
    <section className={`${landing.sectionShell} ${styles.about}`} id="about">
      <Image className={styles.backdrop} src={a.backdrop.src} alt="" width={a.backdrop.width} height={a.backdrop.height} unoptimized aria-hidden />
      <div className={`${base.split} ${styles.aboutSplit}`}>
        <FadeUp className={base.media}>
          <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
        <FadeUp className={base.prose}>
          <span className={landing.kicker}>{a.kicker}</span>
          <h2 className={base.h2}>{a.title}</h2>
          {a.paragraphs.map((p, i) => (
            <p key={i}>
              <Pieces pieces={p} />
            </p>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}

/** "We Work For": the copy and its button beside three audience cards. */
export function WorkFor() {
  const w = swiftWorkFor;
  return (
    <section className={landing.sectionShell} id="work-for">
      <div className={styles.workSplit}>
        <FadeUp>
          <h2 className={base.h2}>{w.title}</h2>
          <p className={styles.workBody}>{w.body}</p>
          <SiteLink href={w.cta.href} className={`${home.pill} ${home.pillFilled}`}>
            {w.cta.label}
          </SiteLink>
        </FadeUp>
        <ul className={styles.workCards}>
          {w.cards.map((c) => (
            <li key={c} className={landing.proofItem}>
              <FadeUp className={styles.workCard}>
                <CardIconBadge title={c} />
                <h3 className={styles.workName}>{c}</h3>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** "Why Choose Soft Suave?": the live picture beside its five reasons. */
export function Why() {
  const w = swiftWhy;
  const i = w.title.indexOf(w.accent);
  return (
    <section className={landing.sectionShell} id="why">
      <FadeUp>
        <SectionHead
          title={
            <>
              {w.title.slice(0, i)}
              <span className={base.accent}>{w.accent}</span>
            </>
          }
          intro={w.body}
        />
      </FadeUp>
      <div className={styles.whySplit}>
        <FadeUp className={styles.whyMedia}>
          <Image src={w.image.src} alt={w.image.alt} width={w.image.width} height={w.image.height} sizes="(max-width: 900px) 70vw, 30vw" unoptimized />
        </FadeUp>
        <ul className={styles.whyList}>
          {w.items.map((it) => {
            const at = it.link ? it.body.indexOf(it.link.text) : -1;
            return (
              <li key={it.name} className={styles.whyItem}>
                <CardIconBadge title={it.name} body={it.body} size="sm" />
                <div>
                  <h3 className={styles.whyName}>{it.name}</h3>
                  <p className={styles.whyBody}>
                    {it.link && at >= 0 ? (
                      <>
                        {it.body.slice(0, at)}
                        <SiteLink href={it.link.href} className={styles.inlineLink}>
                          {it.link.text}
                        </SiteLink>
                        {it.body.slice(at + it.link.text.length)}
                      </>
                    ) : (
                      it.body
                    )}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/** "Our Software Development Technology Expertise": six hexagon tiles that lift and turn their mark on hover. */
export function TechTiles() {
  const t = swiftTech;
  const i = t.title.indexOf(t.accent);
  return (
    <section className={landing.sectionShell} id="technologies">
      <FadeUp>
        <SectionHead
          title={
            <>
              {t.title.slice(0, i)}
              <span className={base.accent}>{t.accent}</span>
            </>
          }
          intro={t.body}
          wide
        />
      </FadeUp>
      <ul className={styles.techGrid}>
        {t.items.map((it, n) => (
          <li key={it.name} className={styles.techItem}>
            <FadeUp delay={n * 0.06} className={styles.techTile}>
              <span className={styles.hex}>
                <span className={styles.hexInner}>
                  <Image src={it.src} alt="" width={72} height={72} unoptimized />
                </span>
              </span>
              <span className={styles.techName}>{it.name}</span>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}
