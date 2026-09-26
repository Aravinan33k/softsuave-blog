import CardIconBadge from "./card-icon-badge";
import styles from "./simple-process.module.css";

export interface SimpleProcessStep {
  /** The content's own ordinal ("01"). Only used as a React key now. */
  readonly n?: string;
  readonly name: string;
  readonly body: string;
}

/**
 * Desktop column count for a run of `n` steps: every step in one row up to
 * five, then whichever of three or four leaves no stranded remainder.
 */
function colsFor(n: number): number {
  if (n <= 5) return Math.max(1, n);
  if (n % 4 === 0) return 4;
  if (n % 3 === 0) return 3;
  return 4;
}

/**
 * The one process design every landing page now uses.
 *
 * The review asked for "a simple table and process design on all pages": the
 * surface had grown eight process treatments (a mosaic, three card grids, a
 * rotating orbit, a spine rail…), so the same five steps looked different on
 * every page. This is the plain version they all render now — a row of equal
 * step cards, each led by an icon badge (not the big numeral it replaces), a
 * small "Step N" label, the step name as an H3 and its body.
 *
 * Order stays legible without the numerals: it is an `<ol>`, so assistive tech
 * announces "1 of 5"; visually the cards read left-to-right with a hairline
 * connector across each gap on desktop, and top-to-bottom with a vertical
 * connector once they stack below 1000px. The "Step N" label is `aria-hidden`
 * because the list already says it.
 *
 * A server component with no JavaScript: the fade-in is a CSS scroll-driven
 * animation, applied only where the browser supports it and the reader has not
 * asked for reduced motion (see the module stylesheet).
 *
 * The caller owns the section shell and heading, so each surface keeps its own
 * `SectionHead` (and the H2 it renders).
 */
export default function SimpleProcess({
  steps,
  className,
}: Readonly<{
  steps: readonly SimpleProcessStep[];
  className?: string;
}>) {
  return (
    <ol
      className={className ? `${styles.list} ${className}` : styles.list}
      data-cols={colsFor(steps.length)}
    >
      {steps.map((step, i) => (
        <li key={step.n ?? step.name} className={styles.step}>
          <div className={styles.top}>
            <CardIconBadge title={step.name} body={step.body} />
            <span className={styles.label} aria-hidden>
              Step {i + 1}
            </span>
          </div>
          <h3 className={styles.name}>{step.name}</h3>
          <p className={styles.body}>{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
