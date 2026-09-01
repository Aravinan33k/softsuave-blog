import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface ProcessProps {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly { readonly name: string; readonly body: string }[];
}

/**
 * The delivery pipeline, as numbered rules rather than cards — the steps are a
 * sequence, and an open rule-topped column reads as one continuous progression
 * where boxes would read as four unrelated features.
 */
export default function Process({ eyebrow, title, body, steps }: ProcessProps) {
  return (
    <section className={home.section} id="process">
      <div className={home.sectionHead}>
        <span className={home.eyebrow}>{eyebrow}</span>
        <SplitReveal as="h2" className={home.h2} type="words">
          {title}
        </SplitReveal>
        <p className={home.lead}>{body}</p>
      </div>

      <FadeUp className={styles.steps} delay={0.06}>
        {steps.map((step, i) => (
          <div key={step.name} className={styles.step}>
            <span className={styles.stepNum} aria-hidden>
              {i + 1}
            </span>
            <h3 className={styles.stepName}>{step.name}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
