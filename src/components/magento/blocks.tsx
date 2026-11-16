import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import CaseStudyToc from '@/components/case-study/case-study-toc';
import { SiteLink } from '@/themes/softsuave/site-link';
import { mgAbout, mgServices, type Piece } from '@/lib/home/magento-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import article from '@/components/case-study/case-study.module.css';
import styles from './magento.module.css';

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

/** "Outsource Magento Development To Boost Your Business": the copy beside its picture. */
export function About() {
  const a = mgAbout;
  return (
    <section className={base.band} id="overview">
      <FadeUp>
        <SectionHead title={a.title} intro={a.body} />
      </FadeUp>
      <div className={base.split}>
        <FadeUp className={base.prose}>
          {a.paragraphs.map((p, i) => (
            <p key={i}>
              <Pieces pieces={p} />
            </p>
          ))}
        </FadeUp>
        <FadeUp className={base.media}>
          <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
      </div>
    </section>
  );
}

/**
 * "Our Magento Development Services": the heading and intro, then the case-study pages' contents column — one
 * link per service, the current one in the accent colour as the page scrolls, and the button — beside the seven
 * services it lists.
 */
export function Services() {
  const s = mgServices;
  return (
    <section className={landing.sectionShell} id="services">
      <FadeUp>
        <SectionHead title={s.title} intro={s.body} />
      </FadeUp>
      <div className={article.layout}>
        <CaseStudyToc
          activeLine={0.22}
          items={s.items.map((it) => ({ id: it.id, label: it.name }))}
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
                {it.paragraphs.map((p, i) => (
                  <p key={i} className={article.para}>
                    <Pieces pieces={p} />
                  </p>
                ))}
              </section>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
