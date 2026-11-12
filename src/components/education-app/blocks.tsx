import Industries from '@/components/landing/industries';
import SectionHead from '@/components/generative-ai/section-head';
import FadeUp from '@/components/home/fade-up';
import { SiteLink } from '@/themes/softsuave/site-link';
import { eduBenefits, eduExperience, eduIntro } from '@/lib/home/education-app-content';
import type { Piece } from '@/lib/home/construction-time-tracking-content';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './education-app.module.css';

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

/** "Redefining your App Idea…": three paragraphs beside the looping video. */
export function Intro() {
  const t = eduIntro;
  return (
    <section className={base.band} id="overview">
      <FadeUp>
        <SectionHead title={<Title text={t.title} accent={t.accent} />} intro={<Pieces pieces={t.body} />} />
      </FadeUp>
      <div className={base.split}>
        <FadeUp className={base.prose}>
          {t.paragraphs.map((p, i) => (
            <p key={i}>
              <Pieces pieces={p} />
            </p>
          ))}
        </FadeUp>
        <FadeUp className={base.media}>
          <video className={styles.video} src={t.video.src} aria-label={t.video.label} autoPlay loop muted playsInline />
        </FadeUp>
      </div>
    </section>
  );
}

/** "Benefits Of Developing Educational Apps": for the users, and for the owner. */
export function Benefits() {
  const b = eduBenefits;
  return (
    <section className={`${base.band} ${base.bandTight}`} id="benefits">
      <FadeUp>
        <SectionHead title={<Title text={b.title} accent={b.accent} />} intro={<Pieces pieces={b.body} />} />
      </FadeUp>
      <div className={styles.benefitCols}>
        {b.columns.map((col) => (
          <FadeUp key={col.title} className={styles.benefitCol}>
            <h3 className={styles.benefitTitle}>
              <Title text={col.title} accent={col.accent} />
            </h3>
            {col.items.map((it) => (
              <p key={it.lead} className={styles.benefit}>
                <strong>{it.lead}</strong>
                {it.text}
              </p>
            ))}
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/** "Enabling Educators to Enhance Students' Experience with Technology": the four offerings. */
export function Experience() {
  const e = eduExperience;
  return (
    <Industries
      id="education-offerings"
      columns={4}
      content={{
        eyebrow: '',
        title: e.title,
        body: e.body,
        cta: e.cta,
        wideHead: true,
        items: e.items.map((it) => ({
          name: it.name,
          body: it.body,
          link: false as const,
          image: { src: it.icon, width: it.width, height: it.height, alt: it.alt, badge: true },
        })),
      }}
    />
  );
}
