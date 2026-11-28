import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface DefinitionProps {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
}

/**
 * The plain-language answer to "what is this service", sitting high on the page.
 * Deliberately a wide measure of prose and nothing else: it is the section most
 * likely to be lifted verbatim into a search result, so it stays scannable text
 * rather than being broken up into cards.
 */
export default function Definition({ eyebrow, title, paragraphs }: DefinitionProps) {
  return (
    <section className={home.section} id="definition">
      <div className={home.sectionHead}>
        <span className={home.eyebrow}>{eyebrow}</span>
        <SplitReveal as="h2" className={home.h2} type="words">
          {title}
        </SplitReveal>
      </div>

      <FadeUp className={styles.prose} delay={0.06}>
        {paragraphs.map((p) => (
          <p key={p.slice(0, 32)}>{p}</p>
        ))}
      </FadeUp>
    </section>
  );
}
