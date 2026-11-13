import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import CaseStudyToc from '@/components/case-study/case-study-toc';
import { SiteLink } from '@/themes/softsuave/site-link';
import { wpAbout, wpServices, type Piece } from '@/lib/home/wordpress-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import article from '@/components/case-study/case-study.module.css';
import styles from './wordpress.module.css';

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

/** "Unparalleled WordPress Development Company": the three paragraphs beside their picture. */
export function About() {
  const a = wpAbout;
  return (
    <section className={landing.sectionShell} id="overview">
      <FadeUp>
        <SectionHead title={<Title text={a.title} accent={a.accent} />} intro={a.body} wide />
      </FadeUp>
      <div className={`${base.split} ${base.splitFlip}`}>
        <FadeUp className={base.media}>
          <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
        <FadeUp className={base.prose}>
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

/**
 * "Our Wordpress Development Services Offerings": the heading and intro, then the case-study pages' contents column —
 * one link per service, the current one in the accent colour as the page scrolls, and the button — beside the six
 * services it lists.
 */
export function Services() {
  const s = wpServices;
  return (
    <section className={landing.sectionShell} id="services">
      <FadeUp>
        <SectionHead title={<Title text={s.title} accent={s.accent} />} intro={s.body} wide />
      </FadeUp>
      <div className={article.layout}>
        <CaseStudyToc
          activeLine={0.22}
          items={s.items.map((it) => ({ id: it.id, label: it.nav }))}
          action={
            <SiteLink href={s.cta.href} className={`${home.pill} ${home.pillFilled}`}>
              {s.cta.label}
            </SiteLink>
          }
        />
        <div className={article.article}>
          {s.items.map((it) => (
            <FadeUp key={it.id} className={styles.item}>
              <section id={it.id} className={article.section} aria-labelledby={`${it.id}-title`}>
                <h3 id={`${it.id}-title`} className={`${landing.title} ${article.sectionTitle}`}>
                  {it.name}
                </h3>
                <p className={article.para}>
                  <Pieces pieces={it.paragraph} />
                </p>
              </section>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
