import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface CardSectionProps {
  id?: string;
  eyebrow: string;
  title: string;
  body: string;
  items: readonly { readonly name: string; readonly body: string }[];
  /** Heading level for the item names — h3 under an h2 section title. */
  as?: 'h3' | 'h4';
}

/**
 * A numbered card grid under a section head. Three sections on the AI page share
 * this exact shape — the offerings, the reasons to choose Soft Suave, and the
 * industries — so they share one component rather than three near-identical
 * files. The grid is a single hairline-ruled surface (1px gaps over a `--line`
 * background), so it reflows from two to four columns without the gaps drifting.
 */
export default function CardSection({ id, eyebrow, title, body, items, as: Heading = 'h3' }: CardSectionProps) {
  return (
    <section className={home.section} id={id}>
      <div className={home.sectionHead}>
        <span className={home.eyebrow}>{eyebrow}</span>
        <SplitReveal as="h2" className={home.h2} type="words">
          {title}
        </SplitReveal>
        <p className={home.lead}>{body}</p>
      </div>

      <FadeUp className={styles.cards} delay={0.06}>
        {items.map((item, i) => (
          <article key={item.name} className={styles.card}>
            <span className={styles.cardNum}>{String(i + 1).padStart(2, '0')}</span>
            <Heading className={styles.cardName}>{item.name}</Heading>
            <p className={styles.cardBody}>{item.body}</p>
          </article>
        ))}
      </FadeUp>
    </section>
  );
}
