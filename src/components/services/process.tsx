import SimpleProcess from '@/components/common/simple-process';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';

export interface ProcessProps {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly { readonly name: string; readonly body: string }[];
}

/**
 * The delivery pipeline. It renders the shared `SimpleProcess` step row, the
 * one process design every landing page uses since the Sep corrections review
 * — the numbered-rule columns it used to draw were a design of their own.
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

      <SimpleProcess steps={steps} />
    </section>
  );
}
