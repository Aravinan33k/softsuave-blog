"use client";

import { Fragment, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { appPath, publicMediaUrl } from "@/lib/media-url";
import {
  NAME_HINT,
  NAME_MESSAGE,
  NAME_PATTERN,
  PHONE_HINT,
  PHONE_MESSAGE,
  PHONE_PATTERN,
  isValidName,
  isValidPhone,
} from "@/lib/forms/enquiry-rules";
import { SiteLink } from "@/themes/softsuave/site-link";
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
  /** Trust badges under the points. Optional — omit for a badge-less hero. */
  badges?: readonly string[];
  form: {
    /** Optional — omitted where the live form card carries no kicker above its title. */
    eyebrow?: string;
    title: string;
    /**
     * Optional — omitted where the live form card carries no descriptive note.
     * The hire-by-skill pages are the case: their form runs a heading, the
     * fields and the applicant alert, and nothing between.
     */
    note?: string;
    /**
     * Optional trailing link appended to the note, for a disclaimer that ends
     * on a real destination ("...To apply for jobs, click here."). Omitted
     * everywhere else, which is why every existing page's note still renders
     * as plain text — nothing changes for a page that doesn't set this.
     */
    noteLink?: { readonly label: string; readonly href: string };
    submit: string;
    sending: string;
    requirementLabel: string;
    requirementPlaceholder: string;
    /**
     * The lead's subject line, written per page ("Hire ReactJS Developers
     * enquiry"). It was the subject of the composed `mailto:`; now it is POSTed
     * with the lead and stored on the `Enquiry` row, where it is the most human
     * label a triage view can lead with. Still per-page copy, so it stays here.
     */
    subject: string;
    /**
     * Notice under the form steering job applicants away from the sales
     * inbox. `href` is passed to next/link, so it picks up the basePath.
     */
    alert?: { label: string; text: string; linkLabel: string; href: string };
  };
  /**
   * Optional full-bleed background image behind the *whole* hero section —
   * veiled for contrast, the same "image behind the text" treatment as the
   * homepage hero (`components/home/hero.tsx`'s `.videoHeroFrame`/
   * `.videoHeroVeil`). The copy column sits directly on it, no card/border
   * around the text (matching the marketing site's older AI pages); the
   * enquiry form stays its own bordered, opaque card floating on top, same as
   * always. Omitted on pages whose hero stands on a flat surface (the
   * default) — that keeps the decorative `.heroGlow` blob instead.
   *
   * `src` is stored root-relative and resolved through `publicMediaUrl` (see
   * `overview.tsx`'s `image` for the same convention) — this is a hand-placed
   * asset, not a Pexels-pipeline slot, so it is not routed through
   * `BrandImage`/the image manifest.
   */
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** 16px placeholder of the same frame, as the overview illustration has. */
    blurDataURL?: string;
  };
}

/**
 * Two looks over the same markup and tokens:
 *
 *   display   the default — oversized serif headline, generous section
 *             padding, slow drift on the backdrop, icon-labelled form fields.
 *   compact   the generative-AI page's hero, verbatim: a tighter headline
 *             clamp, hairline-ruled points, the backdrop held near-full
 *             opacity under a two-pass veil with the coral glow over it, and
 *             plain mono field labels. Pick it when a page should sit
 *             alongside `/generative-ai-development-company`.
 */
export type HeroVariant = "display" | "compact";

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
 * The form POSTs to `/api/v1/enquiry`, which validates it and writes an
 * `Enquiry` row. It previously composed a `mailto:` and set
 * `window.location.href`, which lost every submission from a visitor without a
 * configured desktop mail client — on pages where this form is the only
 * conversion path — and left the button reading "Sending..." for ever, because
 * nothing ever resolved.
 *
 * Four states, because a form that takes a real request has four: `idle`,
 * `sending` (submit disabled, so a double click cannot write two rows),
 * `ok` (the fields are replaced by the confirmation — there is nothing left to
 * do on this card) and `error` (the message appears above the submit button and
 * everything the reader typed is still there to retry with).
 *
 * `idPrefix` namespaces the field ids so each landing page's form owns its own
 * label/control pairs, and doubles as the lead's `sourceKey`.
 */
export default function Hero({
  content,
  idPrefix = "landing",
  variant = "display",
}: {
  content: HeroContent;
  idPrefix?: string;
  variant?: HeroVariant;
}) {
  const root = useRef<HTMLElement | null>(null);
  const compact = variant === "compact";
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", requirement: "" });
  /* Honeypot. Held in state like any other field so React owns the input, but
     never shown and never sent as part of `form` — see the markup below. */
  const [website, setWebsite] = useState("");

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
        .from(`.${styles.heroPoint}`, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.05 }, "-=0.4");
      if (content.badges?.length) {
        tl.from(`.${styles.badge}`, { opacity: 0, y: 12, duration: 0.45, ease: "power2.out", stagger: 0.04 }, "-=0.3");
      }
      tl.from(`.${styles.form}`, { opacity: 0, y: 28, duration: 0.8, ease: "power2.out" }, 0.25);

      // Backdrop lifts out of black underneath all of that — the same hand-off
      // the homepage hero gives its video frame. Added last, at an absolute
      // position, so the relative offsets above keep their original timing.
      if (content.image) {
        tl.from(`.${styles.heroBg}`, { opacity: 0, duration: 1.3, ease: "power2.out" }, 0);
      }
    },
    { scope: root },
  );

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Guard the in-flight window as well as the button's `disabled`: Enter in a
    // text field submits the form without going through the button at all.
    if (status === "sending") return;

    // Shape checks before the request. `pattern` on the inputs already stops
    // most of this at the browser's own bubble, but it cannot count digits, and
    // a submit can reach here from a programmatic path that never ran it. The
    // server enforces the same two rules from the same module — this is the
    // fast, quiet half of that pair, not the authority (BUG-008).
    if (!isValidName(form.name)) {
      setStatus("error");
      setError(NAME_MESSAGE);
      return;
    }
    if (!isValidPhone(form.phone)) {
      setStatus("error");
      setError(PHONE_MESSAGE);
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      // `appPath`, not a bare "/api/…": the app is mounted under `basePath`
      // ('/blog' in production), and `fetch` is one of the things Next does NOT
      // prefix — see the routing note in the marketing docs.
      const res = await fetch(appPath("/api/v1/enquiry"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          website,
          subject: content.form.subject,
          sourcePath: pathname,
          sourceKey: idPrefix,
        }),
      });

      if (!res.ok) {
        // The route's own message where it sent one — it is written for the
        // reader ("Please enter a valid email address.") and is more use than a
        // status code. The 429 is the one worth naming, since "try again" is
        // exactly the wrong advice there.
        const detail = await res.json().catch(() => null);
        throw new Error(
          detail?.error?.message ??
            (res.status === 429
              ? "Too many attempts. Please wait a minute and try again."
              : "Something went wrong. Please try again."),
        );
      }

      setStatus("ok");
    } catch (err) {
      // Includes the offline/DNS case, where `fetch` rejects before any
      // response exists — so the reader is told the send failed rather than
      // being left on a button that never resolves.
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const lastLine = content.titleLines.length - 1;

  /** One shared stroke style for every field icon below — keeps them a
   *  matched set without repeating the same five attributes four times. */
  const iconProps = {
    className: styles.labelIcon,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  return (
    <section
      ref={root}
      className={[
        styles.hero,
        content.image ? styles.heroWithBg : "",
        compact ? styles.heroCompact : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="top"
    >
      {content.image ? (
        <>
          <Image
            src={publicMediaUrl(content.image.src)}
            alt={content.image.alt}
            fill
            sizes="100vw"
            className={styles.heroBg}
            priority
            {...(content.image.blurDataURL
              ? { placeholder: "blur" as const, blurDataURL: content.image.blurDataURL }
              : {})}
          />
          <div className={styles.heroBgVeil} aria-hidden />
          {/* The compact look layers the coral glow over the photo as well,
              the way the generative-AI hero does; the display look drops it
              (the photo is the accent there). */}
          {compact && <div className={styles.heroGlow} aria-hidden />}
        </>
      ) : (
        <div className={styles.heroGlow} aria-hidden />
      )}

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

          {content.badges && content.badges.length > 0 && (
            <ul className={styles.badges} aria-label="Credentials">
              {content.badges.map((b) => (
                <li key={b} className={styles.badge}>
                  <span className={styles.badgeDot} aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className={styles.form} id="enquiry">
          <div className={styles.formHeader}>
            {content.form.eyebrow ? <span className={styles.kicker}>{content.form.eyebrow}</span> : null}
            <p className={styles.formTitle}>{content.form.title}</p>
            <span className={styles.formAccent} aria-hidden />
          </div>

          {/* On success the fields are gone: the reader has nothing left to do
              here, and leaving a filled form beside a confirmation invites a
              second submission of the same lead. `role="status"` announces it
              without stealing focus. */}
          {status === "ok" ? (
            <div className={styles.formDone} role="status">
              <svg
                className={styles.formDoneMark}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <circle cx="12" cy="12" r="9.2" />
                <path d="M7.8 12.4l3 2.9 5.4-6" />
              </svg>
              <p className={styles.formDoneTitle}>Thanks — we&rsquo;ve got your details.</p>
              <p className={styles.formDoneBody}>
                One of our team will contact you within one business day.
              </p>
            </div>
          ) : (
          <form className={styles.formFields} onSubmit={onSubmit}>
            {/* Honeypot: off-screen rather than display:none, which some bots
                skip. Hidden from the accessibility tree and from the tab order,
                so no real user can reach it — anything that fills it is
                automated, and the route drops the submission. */}
            <div className={styles.honeypot} aria-hidden>
              <label htmlFor={`${idPrefix}-website`}>Website</label>
              <input
                id={`${idPrefix}-website`}
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${idPrefix}-name`}>
                <svg {...iconProps}>
                  <circle cx="12" cy="8" r="3.6" />
                  <path d="M4.5 20c0-4.3 3.4-6.8 7.5-6.8s7.5 2.5 7.5 6.8" />
                </svg>
                Full name
                <span className={styles.required} aria-hidden>
                  *
                </span>
              </label>
              <input
                id={`${idPrefix}-name`}
                className={styles.input}
                type="text"
                name="name"
                autoComplete="name"
                required
                minLength={2}
                pattern={NAME_PATTERN}
                title={NAME_HINT}
                value={form.name}
                onChange={set("name")}
                placeholder="Jane Doe"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${idPrefix}-email`}>
                <svg {...iconProps}>
                  <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
                  <path d="M4.5 7l7.5 5.5L19.5 7" />
                </svg>
                Work email
                <span className={styles.required} aria-hidden>
                  *
                </span>
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
                <svg {...iconProps}>
                  <path d="M5.5 4h3l1.6 4.4-2.1 2.1a11 11 0 005.5 5.5l2.1-2.1L20 15.5v3a1.5 1.5 0 01-1.6 1.5C10.7 19.6 4.4 13.3 4 5.6A1.5 1.5 0 015.5 4z" />
                </svg>
                Phone <span aria-hidden>(optional)</span>
              </label>
              <input
                id={`${idPrefix}-phone`}
                className={styles.input}
                type="tel"
                name="phone"
                autoComplete="tel"
                inputMode="tel"
                pattern={PHONE_PATTERN}
                title={PHONE_HINT}
                value={form.phone}
                onChange={set("phone")}
                placeholder="+1 555 000 1234"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${idPrefix}-requirement`}>
                <svg {...iconProps}>
                  <rect x="5" y="3.5" width="14" height="17" rx="2" />
                  <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" />
                </svg>
                {content.form.requirementLabel}
                <span className={styles.required} aria-hidden>
                  *
                </span>
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

            {/* `role="alert"` so a failure is announced the moment it lands —
                the reader's attention is on the button they just pressed, and
                the message sits directly above it. */}
            {status === "error" && error && (
              <p className={styles.formError} role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              className={`${styles.btn} ${styles.btnPrimary} ${styles.formSubmit}`}
              disabled={status === "sending"}
            >
              {status === "sending" ? content.form.sending : content.form.submit}
            </button>
          </form>
          )}

          {(content.form.note || content.form.noteLink) && (
            <p className={styles.formNote}>
              {content.form.note}
              {content.form.noteLink && (
                <>
                  {" "}
                  <SiteLink href={content.form.noteLink.href} className={styles.formNoteLink}>
                    {content.form.noteLink.label}
                  </SiteLink>
                </>
              )}
            </p>
          )}

          {content.form.alert && (
            <p className={styles.formAlert}>
              <span className={styles.formAlertLabel}>{content.form.alert.label}</span>{" "}
              {content.form.alert.text}{" "}
              <Link className={styles.formAlertLink} href={content.form.alert.href}>
                {content.form.alert.linkLabel}
              </Link>
            </p>
          )}

        </div>
      </div>
    </section>
  );
}
