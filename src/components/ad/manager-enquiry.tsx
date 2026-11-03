import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { heroBadgeSizes, type HeroBadge } from "@/lib/home/hero-badges";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import styles from "./ad.module.css";

export interface ManagerEnquiryContent {
  readonly title: string;
  readonly body: string;
  readonly steps: readonly { readonly title: string; readonly body: string }[];
  readonly manager: {
    readonly name: string;
    readonly role: string;
    readonly photo: string;
    readonly cta: { readonly label: string; readonly href: string };
  };
  readonly badges: readonly HeroBadge[];
  readonly form: EnquiryFormContent;
}

/**
 * The page's closing band — "Start Your 40 Hours Trial": what happens next, the
 * account manager who will call, the credential lockups, and the enquiry form.
 */
export default function ManagerEnquiry({
  content,
  id = "enquiry",
}: {
  content: ManagerEnquiryContent;
  id?: string;
}) {
  const { manager } = content;
  return (
    <section className={styles.shell} id="contact">
      <div className={styles.enq}>
        <div>
          <h2 className={styles.enqTitle}>{content.title}</h2>
          <p className={styles.enqSub}>{content.body}</p>

          <div className={styles.enqSteps}>
            {content.steps.map((s) => (
              <div key={s.title}>
                <h3 className={styles.enqStepTitle}>{s.title}</h3>
                <p className={styles.enqStepBody}>{s.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.manager}>
            <div className={styles.managerWho}>
              <Image
                src={publicMediaUrl(manager.photo)}
                alt="Soft Suave Manager"
                width={75}
                height={75}
                className={styles.managerPhoto}
              />
              <div>
                <h3 className={styles.managerName}>{manager.name}</h3>
                <p className={styles.managerRole}>{manager.role}</p>
              </div>
            </div>
            {/* Plain anchor: the form below is on this page, and Lenis handles it. */}
            <a className={`${styles.btn} ${styles.btnWipe}`} href={manager.cta.href}>
              {manager.cta.label}
            </a>
          </div>

          <ul className={styles.enqBadges}>
            {content.badges.map((b) => (
              <li key={b.src} className={styles.enqBadge}>
                <Image
                  src={publicMediaUrl(b.src)}
                  alt={b.alt}
                  width={b.width}
                  height={b.height}
                  sizes={heroBadgeSizes(b, 32)}
                  style={{ height: 32, width: "auto" }}
                />
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.enqForm}>
          <EnquiryForm content={content.form} idPrefix="ad-ai-contact" cardId={id} />
        </div>
      </div>
    </section>
  );
}
