import Logo from "@/components/home/logo";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import styles from "./ad.module.css";

/** A closing band: a heading, a line and an optional link on the left, the enquiry form on the right. */
export default function SplitEnquiry({
  title,
  body,
  link,
  logo = false,
  form,
  id = "contact",
  cardId = "ad-contact-form",
  idPrefix = "ad-contact",
}: {
  title: string;
  body: string;
  link?: { label: string; href: string };
  /** The Soft Suave logo above the heading — the live closing block carries it. */
  logo?: boolean;
  form: EnquiryFormContent;
  id?: string;
  cardId?: string;
  idPrefix?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <div className={`${styles.enq} ${styles.wipeForm}`}>
        <div>
          {logo && (
            <div className={styles.enqLogo}>
              <Logo tone="light" size={44} />
            </div>
          )}
          <h2 className={styles.enqTitle}>{title}</h2>
          <p className={styles.enqSub}>{body}</p>
          {link && (
            <a className={`${styles.btn} ${styles.btnWipe} ${styles.enqMail}`} href={link.href}>
              <svg
                className={styles.enqMailIcon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3.5 7 8.5 6 8.5-6" />
              </svg>
              {link.label}
            </a>
          )}
        </div>
        <EnquiryForm content={form} idPrefix={idPrefix} cardId={cardId} />
      </div>
    </section>
  );
}
