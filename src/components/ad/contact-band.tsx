import Logo from "@/components/home/logo";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import styles from "./ad.module.css";

export interface ContactBandContent {
  readonly title: string;
  readonly body: string;
  readonly email: string;
  readonly form: EnquiryFormContent;
}

/** The page's closing band — "Get in Touch with us!": the logo, a line, the address and the form. */
export default function ContactBand({
  content,
  id = "contact",
  idPrefix = "ad-contact",
}: {
  content: ContactBandContent;
  id?: string;
  idPrefix?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <div className={styles.enq}>
        <div>
          {/* The site's own logo, as in the masthead. */}
          <div style={{ marginBottom: 24 }}>
            <Logo tone="light" size={48} />
          </div>
          <h2 className={styles.enqTitle}>{content.title}</h2>
          <p className={styles.enqSub}>{content.body}</p>
          <a className={`${styles.btn} ${styles.btnWipe} ${styles.contactMail}`} href={`mailto:${content.email}`}>
            {content.email}
          </a>
        </div>
        <div className={styles.enqForm}>
          <EnquiryForm content={content.form} idPrefix={idPrefix} cardId={`${id}-form`} />
        </div>
      </div>
    </section>
  );
}
