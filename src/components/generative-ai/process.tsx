import { process as generativeAiProcess } from "@/lib/home/generative-ai";
import SimpleProcess from "@/components/common/simple-process";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface ProcessContent {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly { readonly n: string; readonly name: string; readonly body: string }[];
}

/**
 * Delivery process for the AI pages and the hire-by-role pages.
 *
 * This was a rotating orbit — steps on an ellipse, the active one spun to
 * 12 o'clock on a timer, with a tabpanel for its copy — which put four of
 * every five steps behind an interaction and looked unlike every other
 * process section on the site. The landing-page review asked for one simple
 * process design on all pages, so it now renders the shared `SimpleProcess`
 * row: every step visible at once, an icon badge in place of the numeral.
 *
 * The exported `ProcessContent` shape and the default content are unchanged,
 * so the content modules and `hire-role-page.tsx` need no edit.
 */
export default function Process({
  content = generativeAiProcess,
  id = "journey",
}: Readonly<{
  content?: ProcessContent;
  id?: string;
}> = {}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <SimpleProcess steps={content.steps} />
    </section>
  );
}
