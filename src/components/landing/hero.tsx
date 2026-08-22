"use client";

import { Fragment, useRef, useState } from "react";
import { brand } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./landing.module.css";

/**
 * Shape of the copy this hero renders. Every AI landing page supplies its own
 * object of this shape; the Generative AI page's is the default, so existing
 * usage (`<Hero />`) is unchanged.
 */
export interface HeroContent {
  /** Optional — omitted on pages whose headline stands on its own. */
  eyebrow?: string;
  /** The H1, split into lines. The last line takes the accent. */
  titleLines: readonly string[];
  body: readonly string[];
  points: readonly string[];
  badges: readonly string[];
  form: {
    eyebrow: string;
    title: string;
    note: string;
    submit: string;
    sending: string;
    requirementLabel: string;
    requirementPlaceholder: string;
    /** Subject line of the composed mailto. */
    subject: string;
  };
}

/**
 * Page hero: the H1 + positioning copy and supporting points on the left, the
 * consultation enquiry form on the right, with the trust badges bridging the
 * two on narrow viewports.
 *
 * Typographically this is the landing-page voice, not the homepage's: a tight
 * semibold Inter headline instead of the ultralight Fraunces display, squared
 * tags and buttons instead of capsules, and hairline-ruled supporting points
 * instead of a bulleted list.
 *
 * The form posts nowhere: this deployment has no lead endpoint, and the
 * marketing surface's established convention for enquiries is a composed
 * `mailto:` (see `components/home/contact.tsx`). Submitting therefore opens the
 * visitor's mail client pre-filled with what they typed, so no requirement is
 * silently dropped. Swap `onSubmit` for a POST once a leads API exists.
 *
 * `idPrefix` namespaces the field ids so each landing page's form owns its own
 * label/control pairs.
 */
export default function Hero({
  content,
  idPrefix = "landing",
}: {
  content: HeroContent;
  idPrefix?: string;
}) {
  const root = useRef<HTMLElement | null>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", requirement: "" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(`.${styles.heroTitleLine}`, {
        yPercent: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
      })
        .from(`.${styles.heroBody}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out", stagger: 0.08 }, "-=0.5")
        .from(`.${styles.heroPoint}`, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.05 }, "-=0.4")
        .from(`.${styles.badge}`, { opacity: 0, y: 12, duration: 0.45, ease: "power2.out", stagger: 0.04 }, "-=0.3")
        .from(`.${styles.form}`, { opacity: 0, y: 28, duration: 0.8, ease: "power2.out" }, 0.25);
    },
    { scope: root },
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : null,
      "",
      "Requirement:",
      form.requirement,
    ]
      .filter((l) => l !== null)
      .join("\n");
    setSent(true);
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
      content.form.subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const lastLine = content.titleLines.length - 1;

  return (
    <section ref={root} className={styles.hero} id="top">
      <div className={styles.heroGlow} aria-hidden />

      <div className={styles.heroGrid}>
        <div>
          {content.eyebrow && <span className={styles.kicker}>{content.eyebrow}</span>}

          <h1 className={styles.heroTitle}>
            {/* The spans are display:block, so the spaces between them only
                matter to the text content crawlers and screen readers see. */}
            {content.titleLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 ? " " : null}
                <span
                  className={`${styles.heroTitleLine}${
                    i === lastLine ? ` ${styles.heroTitleAccent}` : ""
                  }`}
                >
                  {line}
                </span>
              </Fragment>
            ))}
          </h1>

          {content.body.map((p) => (
            <p key={p.slice(0, 24)} className={styles.heroBody}>
              {p}
            </p>
          ))}

          <ul className={styles.heroPoints}>
            {content.points.map((point) => (
              <li key={point} className={styles.heroPoint}>
                <svg
                  className={styles.heroPointMark}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 10.6l4 3.8 8-8.8" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          <ul className={styles.badges} aria-label="Credentials">
            {content.badges.map((b) => (
              <li key={b} className={styles.badge}>
                <span className={styles.badgeDot} aria-hidden />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.form} id="enquiry">
          <span className={styles.kicker}>{content.form.eyebrow}</span>
          <p className={styles.formTitle}>{content.form.title}</p>

          <form className={styles.formFields} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${idPrefix}-name`}>
                Full name
              </label>
              <input
                id={`${idPrefix}-name`}
                className={styles.input}
                type="text"
                name="name"
                autoComplete="name"
                required
                value={form.name}
                onChange={set("name")}
                placeholder="Jane Doe"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${idPrefix}-email`}>
                Work email
              </label>
              <input
                id={`${idPrefix}-email`}
                className={styles.input}
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={set("email")}
                placeholder="jane@company.com"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${idPrefix}-phone`}>
                Phone <span aria-hidden>(optional)</span>
              </label>
              <input
                id={`${idPrefix}-phone`}
                className={styles.input}
                type="tel"
                name="phone"
                autoComplete="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="+1 555 000 1234"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${idPrefix}-requirement`}>
                {content.form.requirementLabel}
              </label>
              <textarea
                id={`${idPrefix}-requirement`}
                className={styles.textarea}
                name="requirement"
                required
                value={form.requirement}
                onChange={set("requirement")}
                placeholder={content.form.requirementPlaceholder}
              />
            </div>

            <button type="submit" className={`${styles.btn} ${styles.btnPrimary} ${styles.formSubmit}`}>
              {sent ? content.form.sending : content.form.submit}
            </button>
          </form>

          <p className={styles.formNote}>{content.form.note}</p>

          {sent && (
            <p className={styles.formStatus} role="status">
              Thanks — a draft to {brand.email} is opening with your details. We reply within one business day.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
