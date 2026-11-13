import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import { SiteLink } from '@/themes/softsuave/site-link';
import CaseStudyToc from '@/components/case-study/case-study-toc';
import { entCustom, entSolutions } from '@/lib/home/enterprise-app-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import article from '@/components/case-study/case-study.module.css';
import styles from './enterprise-app.module.css';

/**
 * "Solutions Overview": the case-study pages' contents column — the heading, one link per solution with the
 * current one in the accent colour as the page scrolls, and the button — beside the nine solutions it lists.
 */
export function Solutions() {
  const s = entSolutions;
  return (
    <div className={`${landing.sectionShell} ${article.layout}`} id="solutions">
      <CaseStudyToc
        title={s.title}
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
              <span className={landing.kicker}>{it.tag}</span>
              <h3 id={`${it.id}-title`} className={`${landing.title} ${article.sectionTitle}`}>
                {it.name}
              </h3>
              <p className={article.para}>{it.body}</p>
            </section>
          </FadeUp>
        ))}
      </div>
    </div>
  );
}

/** "Custom Solutions for Enterprise Application Development": the CRM picture beside its two paragraphs. */
export function CustomSolutions() {
  const c = entCustom;
  return (
    <section className={base.band} id="custom-solutions">
      <div className={`${base.split} ${base.splitFlip}`}>
        <FadeUp className={base.media}>
          <Image src={c.image.src} alt={c.image.alt} width={c.image.width} height={c.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
        <FadeUp className={base.prose}>
          <h2 className={`${base.h2} ${styles.customTitle}`}>{c.title}</h2>
          {c.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </FadeUp>
      </div>
    </section>
  );
}
