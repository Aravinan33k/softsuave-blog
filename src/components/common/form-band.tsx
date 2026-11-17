import { SiteLink } from "@/themes/softsuave/site-link";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import gen from "@/components/generative-ai/gen-ai.module.css";
import close from "./consultation-close.module.css";
import styles from "./form-band.module.css";

export interface FormBandContent {
  /** The kicker over the heading ("Download"), led by a short accent rule. */
  readonly kicker: string;
  readonly title: string;
  readonly body: string;
  /** The business-only notice, set in its own box under the copy. */
  readonly alert?: { readonly label: string; readonly text: string; readonly linkLabel: string; readonly href: string };
  readonly form: EnquiryFormContent;
}

/**
 * A closing band built around one form: kicker, heading, the accent rule and
 * a line of copy on the left, an optional notice box under them, and the
 * shared enquiry card on the right. The developer rate card's "Download Rate
 * Card" section (by request, in place of the consultation block).
 *
 * The same ground, grid, heading, rule and copy as `ConsultationClose`
 * (its module's classes, reused), without the steps, consultant card and
 * badges. The form is the shared `EnquiryForm` (same validation, same POST to
 * /api/v1/enquiry, same /thank-you redirect). Its card takes `${id}-form`, so it
 * never collides with a hero's `#enquiry`.
 *
 * A server component: only the form inside it is a client component.
 */
export default function FormBand({
  content,
  idPrefix,
  id,
}: Readonly<{
  content: FormBandContent;
  /** Namespaces the form's field ids and is the lead's `sourceKey`. */
  idPrefix: string;
  /** The section's anchor; the form card is `${id}-form`. */
  id: string;
}>) {
  const { alert } = content;
  return (
    <section className={`${gen.sectionShell} ${close.section}`} id={id} aria-labelledby={`${id}-title`}>
      <div className={`${close.grid} ${styles.grid}`}>
        <div className={close.copy}>
          <p className={styles.kicker}>{content.kicker}</p>
          <h2 id={`${id}-title`} className={close.title}>
            {content.title}
          </h2>
          <span className={close.rule} aria-hidden />
          <p className={close.body}>{content.body}</p>
          {alert && (
            <p className={styles.alert}>
              <strong className={styles.alertLabel}>{alert.label}</strong> {alert.text}{" "}
              <SiteLink href={alert.href} className={styles.alertLink}>
                {alert.linkLabel}
              </SiteLink>
              .
            </p>
          )}
        </div>
        <div className={close.formCol}>
          <EnquiryForm content={content.form} idPrefix={idPrefix} cardId={`${id}-form`} />
        </div>
      </div>
    </section>
  );
}
