import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface FaqItem {
  readonly q: string;
  readonly a: string;
  /** Optional link at the end of the answer; points at the enquiry section. */
  readonly cta?: string;
}

export interface FaqProps {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly FaqItem[];
}

/**
 * FAQ list built on native <details>/<summary>.
 *
 * No state, no hydration and no JS to fail: the disclosure works before (and
 * without) React, arrow/enter keys and screen-reader expand-collapse come for
 * free, and the answer text is in the DOM either way, which is what the FAQPage
 * JSON-LD on this page asserts. The +/− mark is drawn in CSS off `[open]`.
 */
export default function Faq({ eyebrow, title, body, items }: FaqProps) {
  return (
    <section className={home.section} id="faq">
      <div className={home.sectionHead}>
        <span className={home.eyebrow}>{eyebrow}</span>
        <SplitReveal as="h2" className={home.h2} type="words">
          {title}
        </SplitReveal>
        <p className={home.lead}>{body}</p>
      </div>

      <FadeUp className={styles.faqList} delay={0.06}>
        {items.map((item) => (
          <details key={item.q} className={styles.faqItem}>
            <summary className={styles.faqQ}>
              <h3>{item.q}</h3>
              <span className={styles.faqMark} aria-hidden />
            </summary>
            <div className={styles.faqA}>
              <p>{item.a}</p>
              {item.cta && (
                <a href="#contact" className={styles.faqCta}>
                  {item.cta}
                </a>
              )}
            </div>
          </details>
        ))}
      </FadeUp>
    </section>
  );
}
