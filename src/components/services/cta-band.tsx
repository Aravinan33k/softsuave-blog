import FadeUp from '@/components/home/fade-up';
import Magnetic from '@/components/home/magnetic';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface CtaBandProps {
  title: string;
  body: string;
  cta: string;
  /** In-page target; ScrollProvider eases to it via Lenis. */
  href?: string;
}

/**
 * Mid-page conversion band. Used twice on the AI page — once after the
 * comparison table, once after the delivery process — so it takes its copy as
 * props. The heading is an h2: these are real sections of the page outline, not
 * decoration, and skipping a level here would break the document structure
 * between the sections either side.
 */
export default function CtaBand({ title, body, cta, href = '#contact' }: CtaBandProps) {
  return (
    <section className={home.section}>
      <FadeUp className={styles.ctaBand}>
        <div>
          <h2 className={styles.ctaTitle}>{title}</h2>
          <p className={styles.ctaBody}>{body}</p>
        </div>
        <Magnetic>
          <a href={href} className={`${home.pill} ${home.pillFilled}`} data-cursor="Book">
            {cta}
          </a>
        </Magnetic>
      </FadeUp>
    </section>
  );
}
