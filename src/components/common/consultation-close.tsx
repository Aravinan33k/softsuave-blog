import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { publicMediaUrl } from "@/lib/media-url";
import { heroBadgeSizes, type HeroBadge } from "@/lib/home/hero-badges";
import { SiteLink } from "@/themes/softsuave/site-link";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./consultation-close.module.css";

export interface ConsultationCloseContent {
  /** The band's headline. Rendered as a paragraph, as the live band has it. */
  title: string;
  body: string;
  /** The "what happens next" pair beside the form. */
  steps: readonly { readonly title: string; readonly body: string }[];
  /** The consultant card: portrait, name, role and booking link. */
  person: {
    readonly image: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
    readonly name: string;
    readonly role: string;
  };
  cta: { readonly label: string; readonly href: string };
  /** Partner lockups under the card — the issuers' own art on white plaques. */
  badges: readonly HeroBadge[];
  /** Copy for the shared enquiry card on the right. */
  form: EnquiryFormContent;
}

/**
 * Closing "Book Free Consultation" band with the enquiry form beside it — the
 * full version of the live pages' footer enquiry block: headline and body, the
 * two "what happens next" steps, the consultant card with its "Schedule a
 * Call" link, the partner badges, and the form.
 *
 * The homepage's `Contact` band carries only the headline, body and one
 * button; this is for a page whose brief keeps the whole block. The form is
 * the shared `EnquiryForm` (same validation, same POST to /api/v1/enquiry,
 * same /thank-you redirect), on its own card id so it never collides with the
 * hero's `#enquiry`.
 *
 * A server component: only the form inside it is a client component.
 */
export default function ConsultationClose({
  content,
  idPrefix,
  id = "contact",
  ctaIcon = false,
}: Readonly<{
  /** A calendar icon before the booking button's label, as on the live booking buttons. */
  ctaIcon?: boolean;
  content: ConsultationCloseContent;
  /** Namespaces the form's field ids and is the lead's `sourceKey`. */
  idPrefix: string;
  id?: string;
}>) {
  const { person } = content;

  return (
    <section className={`${gen.sectionShell} ${styles.section}`} id={id}>
      <div className={styles.grid}>
        <div className={styles.copy}>
          <p className={styles.title}>{content.title}</p>
          <span className={styles.rule} aria-hidden />
          <p className={styles.body}>{content.body}</p>

          <ol className={styles.steps}>
            {content.steps.map((step, i) => (
              <li key={step.title} className={styles.step}>
                <span className={styles.stepNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className={styles.stepTitle}>{step.title}</p>
                  <p className={styles.stepBody}>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className={styles.person}>
            <Image
              src={publicMediaUrl(person.image.src)}
              alt={person.image.alt}
              width={person.image.width}
              height={person.image.height}
              sizes="64px"
              className={styles.personImg}
            />
            <div className={styles.personText}>
              <p className={styles.personName}>{person.name}</p>
              <p className={styles.personRole}>{person.role}</p>
            </div>
            {/* An in-page anchor (the form beside it) stays a plain link: SiteLink would send a bare "#…" to the live site. */}
            {content.cta.href.startsWith("#") ? (
              <a href={content.cta.href} className={`${gen.btn} ${gen.btnPrimary} ${styles.personCta}`}>
                {ctaIcon && <CalendarDays size={18} aria-hidden />}
                {content.cta.label}
              </a>
            ) : (
              <SiteLink href={content.cta.href} className={`${gen.btn} ${gen.btnPrimary} ${styles.personCta}`}>
                {ctaIcon && <CalendarDays size={18} aria-hidden />}
                {content.cta.label}
              </SiteLink>
            )}
          </div>

          {content.badges.length > 0 ? (
            <ul className={styles.badges} aria-label="Credentials">
              {content.badges.map((b) => (
                <li key={b.src} className={styles.badge}>
                  <Image
                    src={publicMediaUrl(b.src)}
                    alt={b.alt}
                    width={b.width}
                    height={b.height}
                    sizes={heroBadgeSizes(b, 28)}
                    className={styles.badgeImg}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className={styles.formCol}>
          <EnquiryForm content={content.form} idPrefix={idPrefix} cardId={`${id}-enquiry`} />
        </div>
      </div>
    </section>
  );
}
