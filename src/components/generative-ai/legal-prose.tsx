import FadeUp from "@/components/home/fade-up";
import styles from "./gen-ai.module.css";

export type LegalBlock =
  | { readonly type: "p"; readonly text: string }
  | { readonly type: "h2"; readonly text: string }
  | { readonly type: "h3"; readonly text: string }
  | { readonly type: "address"; readonly lines: readonly string[] };

export interface LegalProseContent {
  /** Accessible name for the section — it has no visible masthead. */
  label: string;
  blocks: readonly LegalBlock[];
}

/**
 * Long-form legal text (/privacy-policy): `Overview`'s image-less layout — the
 * same section shell, the same prose measure and body type — extended with the
 * headings and address lines a policy document needs, which `Overview`'s
 * paragraph-only content does not carry.
 *
 * No section head: the page's hero already carries the document's title, so a
 * second masthead here would only repeat it.
 */
export default function LegalProse({
  content,
  id = "policy",
}: {
  content: LegalProseContent;
  id?: string;
}) {
  return (
    <section className={styles.sectionShell} id={id} aria-label={content.label}>
      <FadeUp>
        <div className={`${styles.prose} ${styles.legalProse}`}>
          {content.blocks.map((block, i) => {
            switch (block.type) {
              case "h2":
                return (
                  <h2 key={i} className={styles.legalH2}>
                    {block.text}
                  </h2>
                );
              case "h3":
                return (
                  <h3 key={i} className={styles.legalH3}>
                    {block.text}
                  </h3>
                );
              case "address":
                return (
                  <address key={i} className={styles.legalAddress}>
                    {block.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </address>
                );
              default:
                return <p key={i}>{block.text}</p>;
            }
          })}
        </div>
      </FadeUp>
    </section>
  );
}
