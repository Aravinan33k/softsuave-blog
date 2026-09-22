import SimpleProcess from "@/components/common/simple-process";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

export interface ProcessContent {
  /**
   * Masthead. Optional as a set: omit `title` and the section renders as a
   * bare run of step cards, for a stage list that continues the section
   * above it (the Overview's own H2 already introduces it) rather than
   * opening a new one with a second heading.
   */
  eyebrow?: string;
  title?: string;
  body?: string;
  steps: readonly {
    readonly n: string;
    readonly name: string;
    readonly body: string;
    /**
     * Optional hand-placed asset. Kept on the type so the content modules
     * that carry one still compile, but no longer drawn: the simple process
     * design is icon-led, and a photo per step was the mosaic's editorial
     * flourish (see the component note below).
     */
    readonly image?: {
      readonly src: string;
      readonly width: number;
      readonly height: number;
      readonly alt: string;
    };
  }[];
}

/**
 * Delivery process — now the shared `SimpleProcess` step row.
 *
 * This section went through four looks (a scroll-pinned orbit, a vertical
 * rail, bordered image cards, then an editorial mosaic of alternating
 * wide/tall cards with a photo each) and ended up with four `variant`s over
 * them. The landing-page review asked for one simple process design on every
 * page, so every variant now renders the same equal-card row with an icon
 * badge per step in place of the "Step 01" pill and numbered marker.
 *
 * `variant` and `columns` are still accepted so the page files and hire
 * templates that pass them need no edit; they are ignored — `SimpleProcess`
 * picks its own column count from the number of steps.
 */
export default function Process({
  content,
  id = "journey",
}: Readonly<{
  content: ProcessContent;
  id?: string;
  /** Ignored — kept for call-site compatibility. See the note above. */
  variant?: "cards" | "even" | "stages" | "mosaic";
  /** Ignored — kept for call-site compatibility. See the note above. */
  columns?: 3 | 4;
}>) {
  return (
    <section className={styles.sectionShell} id={id}>
      {content.title && (
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      )}
      <SimpleProcess steps={content.steps} />
    </section>
  );
}
