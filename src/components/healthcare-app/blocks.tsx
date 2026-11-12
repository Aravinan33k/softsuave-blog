import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import Industries from '@/components/landing/industries';
import { SiteLink } from '@/themes/softsuave/site-link';
import {
  healthAbout,
  healthAdvantages,
  healthCards,
  healthStories,
  type Piece,
} from '@/lib/home/healthcare-app-content';
import landing from '@/components/landing/landing.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './healthcare-app.module.css';

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

function Pieces({ pieces }: { pieces: readonly Piece[] }) {
  return (
    <>
      {pieces.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : 'b' in p ? (
          <strong key={i}>{p.b}</strong>
        ) : (
          <SiteLink key={i} href={p.href}>
            {p.text}
          </SiteLink>
        ),
      )}
    </>
  );
}

/** The two overview rows: text beside a picture, the second row with its picture on the left. */
export function About() {
  return (
    <section className={base.band} id="overview">
      {healthAbout.map((row, i) => (
        <div key={row.title} className={`${base.split} ${i % 2 ? base.splitFlip : ''}`}>
          {i % 2 ? (
            <FadeUp className={base.media}>
              <Image src={row.image.src} alt={row.image.alt} width={row.image.width} height={row.image.height} sizes="(max-width: 900px) 90vw, 40vw" />
            </FadeUp>
          ) : null}
          <FadeUp className={base.prose}>
            <h3 className={base.h3}>
              <Title text={row.title} accent={row.accent} />
            </h3>
            {row.paragraphs.map((p, pi) => (
              <p key={pi}>
                <Pieces pieces={p} />
              </p>
            ))}
          </FadeUp>
          {i % 2 ? null : (
            <FadeUp className={base.media}>
              <Image src={row.image.src} alt={row.image.alt} width={row.image.width} height={row.image.height} sizes="(max-width: 900px) 90vw, 40vw" />
            </FadeUp>
          )}
        </div>
      ))}
    </section>
  );
}

/** The three service cards, in the site's card grid. */
export function ServiceCards() {
  return (
    <Industries
      id="services"
      columns={3}
      content={{
        eyebrow: '',
        title: '',
        body: '',
        items: healthCards.map((c) => ({
          name: c.name,
          body: c.body,
          link: false as const,
          image: { src: c.icon, width: 75, height: 75, alt: c.alt, badge: true },
        })),
      }}
    />
  );
}

function Points({ items }: { items: readonly string[] }) {
  return (
    <ul className={styles.points}>
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  );
}

/** "Our Success Stories": two stories, each a picture beside the solution and its key features. */
export function SuccessStories() {
  const s = healthStories;
  return (
    <section className={base.band} id="stories">
      <FadeUp>
        <SectionHead title={s.title} intro={s.body} />
      </FadeUp>
      {s.items.map((it, i) => (
        <div key={it.title} className={`${styles.story} ${i % 2 ? styles.storyFlip : ''}`}>
          <FadeUp className={`${base.media} ${styles.storyMedia}`}>
            <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(max-width: 900px) 70vw, 28vw" />
          </FadeUp>
          <FadeUp className={base.prose}>
            <h3 className={base.h3}>{it.title}</h3>
            <h4 className={styles.sub}>{s.solutionsLabel}</h4>
            <p>{it.body}</p>
            <h4 className={styles.sub}>{s.featuresLabel}</h4>
            <Points items={it.points} />
            <div className={styles.storyCta}>
              <SiteLink href={s.cta.href} className={`${landing.btn} ${landing.btnPrimary}`}>
                {s.cta.label}
              </SiteLink>
            </div>
          </FadeUp>
        </div>
      ))}
    </section>
  );
}

/** "Advantages of Adopting Healthcare Mobility Solutions": patients, then healthcare providers. */
export function Advantages() {
  const a = healthAdvantages;
  return (
    <section className={base.band} id="advantages">
      <FadeUp>
        <SectionHead title={<Title text={a.title} accent={a.accent} />} intro={a.body} />
      </FadeUp>
      {a.items.map((it, i) => (
        <div key={it.title} className={`${styles.story} ${i % 2 ? styles.storyFlip : ''}`}>
          <FadeUp className={`${base.media} ${styles.storyMedia}`}>
            <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(max-width: 900px) 70vw, 28vw" />
          </FadeUp>
          <FadeUp className={base.prose}>
            <h3 className={base.h3}>{it.title}</h3>
            <p>{it.body}</p>
            <Points items={it.points} />
          </FadeUp>
        </div>
      ))}
    </section>
  );
}
