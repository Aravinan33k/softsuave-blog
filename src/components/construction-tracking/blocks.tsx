import Image from 'next/image';
import { SiteLink } from '@/themes/softsuave/site-link';
import FadeUp from '@/components/home/fade-up';
import home from '@/components/home/home.module.css';
import {
  timeTrackingApps,
  timeTrackingBenefits,
  timeTrackingDemo,
  timeTrackingIntro,
  timeTrackingSteps,
  timeTrackingWhy,
  type Piece,
} from '@/lib/home/construction-time-tracking-content';
import styles from './construction-tracking.module.css';

/** A heading with the live page's coloured words picked out. */
function Title({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={styles.accent}>{accent}</span>
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

/** A centred section head: the title, its three dashes' place taken by the site's own rule, and a standfirst. */
function Head({ title, accent, body }: { title: string; accent?: string; body?: string }) {
  return (
    <FadeUp className={styles.head}>
      <h2 className={styles.h2}>{accent ? <Title text={title} accent={accent} /> : title}</h2>
      {body ? <p className={styles.lead}>{body}</p> : null}
    </FadeUp>
  );
}

/** "Construction Time Tracking Software Development": the two paragraphs beside their picture. */
export function Intro() {
  const t = timeTrackingIntro;
  return (
    <section className={styles.band} id="overview">
      <Head title={t.title} accent={t.accent} body={t.body} />
      <div className={styles.split}>
        <FadeUp className={styles.prose}>
          {t.paragraphs.map((p, i) => (
            <p key={i}>
              <Pieces pieces={p} />
            </p>
          ))}
        </FadeUp>
        <FadeUp className={styles.media}>
          <Image src={t.image.src} alt={t.image.alt} width={t.image.width} height={t.image.height} sizes="(max-width: 900px) 100vw, 40vw" />
        </FadeUp>
      </div>
    </section>
  );
}

/** The four benefit cards under the overview. */
export function Benefits() {
  return (
    <section className={`${styles.band} ${styles.bandTight}`}>
      <ul className={styles.cards}>
        {timeTrackingBenefits.map((b) => (
          <li key={b.name} className={`${styles.card} ${styles.cardTop}`}>
            <Image src={b.icon} alt={b.alt} width={75} height={75} unoptimized className={styles.cardIcon} />
            <h3 className={styles.cardName}>{b.name}</h3>
            <p className={styles.cardBody}>{b.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The steps, then the mobile and web applications, each beside its picture. */
export function StepsAndApps() {
  const s = timeTrackingSteps;
  const { mobile, web } = timeTrackingApps;
  return (
    <section className={styles.band} id="steps">
      <Head title={s.title} accent={s.accent} body={s.body} />

      <div className={styles.split}>
        <FadeUp className={styles.prose}>
          <h3 className={styles.h3}>{s.heading}</h3>
          <p>{s.intro}</p>
          <ol className={styles.steps}>
            {s.steps.map((step, i) => (
              <li key={step} className={styles.step}>
                <span className={styles.stepTag}>
                  {s.stepWord} <span className={styles.stepNum}>{i + 1}</span>
                </span>
                <p>{step}</p>
              </li>
            ))}
          </ol>
        </FadeUp>
        <FadeUp className={styles.media}>
          <Image src={s.image.src} alt={s.image.alt} width={s.image.width} height={s.image.height} sizes="(max-width: 900px) 100vw, 40vw" />
        </FadeUp>
      </div>

      <div className={`${styles.split} ${styles.splitFlip}`}>
        <FadeUp className={`${styles.media} ${styles.mediaPhone}`}>
          <Image src={mobile.image.src} alt={mobile.image.alt} width={mobile.image.width} height={mobile.image.height} sizes="(max-width: 900px) 60vw, 28vw" />
        </FadeUp>
        <FadeUp className={styles.prose}>
          <h3 className={styles.h3}>{mobile.title}</h3>
          <p>{mobile.body}</p>
        </FadeUp>
      </div>

      <div className={styles.split}>
        <FadeUp className={styles.prose}>
          <h3 className={styles.h3}>{web.title}</h3>
          <p>{web.body}</p>
        </FadeUp>
        <FadeUp className={styles.media}>
          <Image src={web.image.src} alt={web.image.alt} width={web.image.width} height={web.image.height} sizes="(max-width: 900px) 100vw, 40vw" />
        </FadeUp>
      </div>
    </section>
  );
}

/** "Test our Employee Time Tracking Software…": the free-demo band. */
export function DemoBand() {
  const d = timeTrackingDemo;
  return (
    <section className={styles.demo} id="demo">
      <FadeUp className={styles.demoInner}>
        <h2 className={styles.demoTitle}>{d.title}</h2>
        <p className={styles.demoBody}>{d.body}</p>
        <SiteLink href={d.cta.href} className={`${home.pill} ${home.pillFilled} ${home.navCta}`}>
          {d.cta.label}
        </SiteLink>
      </FadeUp>
    </section>
  );
}

/** "Why Construction Worker Location Tracking App?" and its four marks. */
export function Why() {
  const w = timeTrackingWhy;
  return (
    <section className={styles.band} id="why">
      <Head title={w.title} accent={w.accent} body={w.body} />
      <ul className={styles.cards}>
        {w.items.map((it) => (
          <li key={it.name} className={`${styles.card} ${styles.cardPlain}`}>
            <Image src={it.icon} alt={it.alt} width={75} height={75} unoptimized className={styles.cardIcon} />
            <p className={styles.cardName}>{it.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
