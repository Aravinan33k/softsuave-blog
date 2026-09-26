import SimpleProcess from "@/components/common/simple-process";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";
import type { ProcessContent } from "@/components/landing/process";

/**
 * Process, formerly drawn as a spine: a coral hairline with numbered markers
 * and a scroll-drawn reveal. The landing-page review asked for one simple
 * process design on every page, so this now renders the shared
 * `SimpleProcess` row like `landing/process.tsx` does. The component and its
 * props are kept so the page that uses it needs no edit.
 */
export default function ProcessRail({
  content,
  id = "journey",
}: Readonly<{
  content: ProcessContent;
  id?: string;
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
