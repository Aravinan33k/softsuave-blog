import SimpleProcess from "@/components/common/simple-process";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

export interface ReleaseTrackContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Optional button under the track — the section's own CTA on the live page. */
  cta?: { readonly label: string; readonly href: string };
  steps: readonly {
    readonly n: string;
    readonly name: string;
    readonly body: string;
  }[];
}

/**
 * The mobile-app delivery process — now the shared `SimpleProcess` step row.
 *
 * This was a bespoke "release track": a horizontal rail with the phases
 * zigzagging above and below it, drawn in by a GSAP timeline. The Sep
 * corrections review asked for one simple process design on every page, so it
 * renders the same step cards as every other landing page. The content shape
 * is unchanged, so `mobile-app-content.ts` needs no edit; the section's own CTA
 * is kept below the steps.
 */
export default function ReleaseTrack({
  content,
  id = "journey",
}: {
  content: ReleaseTrackContent;
  id?: string;
}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <SimpleProcess steps={content.steps} />

      {content.cta && (
        <div className={styles.trkCta}>
          <a className={styles.trkCtaLink} href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      )}
    </section>
  );
}
