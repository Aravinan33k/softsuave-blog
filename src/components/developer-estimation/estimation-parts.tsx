"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { appPath } from "@/lib/media-url";
import { THANK_YOU_PATH } from "@/lib/forms/thank-you";
import FieldIcon, { RequiredMark } from "@/components/common/field-icon";
import PhoneField from "@/components/common/phone-field";
import fx from "@/components/common/enquiry-form.module.css";
import { emailError, nameError, phoneError } from "@/lib/forms/enquiry-rules";
import { estimationContact } from "@/lib/home/developer-estimation-content";
import home from "@/components/home/home.module.css";
import styles from "./developer-estimation.module.css";

/**
 * Pieces shared by the two estimate wizards (/developer-estimation and /mobile-app-estimation): the option
 * tile, the step heading, the breadcrumb trail and the closing contact form.
 */

/** Toggle a value in a list, keeping the order it was first added. */
export const toggle = <T,>(list: readonly T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export function Tile({
  icon,
  label,
  selected,
  onToggle,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <button type="button" className={`${styles.tile} ${selected ? styles.tileOn : ""}`} aria-pressed={selected} onClick={onToggle}>
      <span className={styles.tileCard}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" width={64} height={64} />
      </span>
      <span className={styles.tileLabel}>{label}</span>
    </button>
  );
}

export function Heading({ children, as: Tag = "h3" }: { children: string; as?: "h1" | "h3" }) {
  return (
    <div className={`${styles.head} ${Tag === "h1" ? styles.headTight : ""}`}>
      <Tag className={Tag === "h1" ? styles.h1 : styles.h3}>{children}</Tag>
    </div>
  );
}

export type CrumbItem = { key: string; icon: string; label: string; to: string };

/** The breadcrumb pill. The last crumb is the current step; the others take the reader back. */
export function Crumbs({ items, onSelect }: { items: readonly CrumbItem[]; onSelect: (to: string) => void }) {
  const list = useRef<HTMLOListElement | null>(null);
  const currentKey = items[items.length - 1]?.key;
  // On a narrow screen the trail scrolls; keep the current step in view.
  useEffect(() => {
    const el = list.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [items.length, currentKey]);

  return (
    <nav aria-label="breadcrumb" className={styles.crumbs}>
      <ol ref={list}>
        {items.map((c, i) => {
          const active = i === items.length - 1;
          return (
            <li key={c.key} className={`${styles.crumb} ${active ? styles.crumbOn : ""}`}>
              <button type="button" onClick={() => onSelect(c.to)} aria-current={active ? "step" : undefined}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.icon} alt="" width={22} height={22} />
                {c.label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** A "Your Requirement" card: a titled panel of label / value rows. */
export function SummaryCard({
  icon,
  title,
  children,
}: {
  icon?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className={styles.summary}>
      <div className={styles.summaryHead}>
        {icon ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={icon} alt="" width={28} height={28} />
        ) : null}
        {title}
      </div>
      <dl className={styles.summaryBody}>{children}</dl>
    </div>
  );
}

export function SummaryRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={styles.summaryRow}>
      <dt>{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}

export function ChipIcon({ icon, children }: { icon?: string; children: React.ReactNode }) {
  return (
    <span className={styles.chipIcon}>
      {icon ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={icon} alt="" width={26} height={26} />
      ) : null}
      {children}
    </span>
  );
}

/**
 * The closing "Fill the form below to get a FREE Estimation!" step. Posts the reader's contact details
 * and the estimate (as the plain text `requirement()` returns) to the site's enquiry endpoint.
 */
export function ContactStep({ requirement, subject, sourceKey }: { requirement: () => string; subject: string; sourceKey: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [sendError, setSendError] = useState<string | null>(null);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = { name: nameError(form.name) ?? undefined, email: emailError(form.email) ?? undefined, phone: phoneError(form.phone) ?? undefined };
    setErrors(next);
    if (next.name || next.email || next.phone) return;

    setStatus("sending");
    setSendError(null);
    try {
      // `appPath`, not a bare "/api/…": `fetch` does not pick up `basePath`.
      const res = await fetch(appPath("/api/v1/enquiry"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          requirement: requirement(),
          website,
          subject,
          sourcePath: pathname,
          sourceKey,
        }),
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        throw new Error(
          detail?.error?.message ??
            (res.status === 429 ? "Too many attempts. Please wait a minute and try again." : "Something went wrong. Please try again."),
        );
      }
      router.push(THANK_YOU_PATH);
    } catch (err) {
      setStatus("error");
      setSendError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const msg = (k: "name" | "email" | "phone") =>
    errors[k] ? (
      <p id={`est-${k}-error`} className={fx.fieldMessage}>
        {errors[k]}
      </p>
    ) : null;

  return (
    <section className={styles.step}>
      <Heading>{estimationContact.title}</Heading>
      <div className={styles.contact}>
        <div className={`${fx.card} ${styles.contactCard}`}>
          <form className={fx.fields} onSubmit={onSubmit} noValidate>
            <div className={fx.honeypot} aria-hidden>
              <label htmlFor="est-website">Website</label>
              <input id="est-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </div>
            <div className={`${fx.field} ${errors.name ? fx.fieldInvalid : ""}`}>
              <FieldIcon name="person" />
              <input
                id="est-name"
                className={fx.input}
                type="text"
                name="name"
                autoComplete="name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? "est-name-error" : undefined}
                placeholder=" "
              />
              <label className={fx.label} htmlFor="est-name">
                <RequiredMark />
                {estimationContact.nameLabel}
              </label>
              {msg("name")}
            </div>
            <div className={`${fx.field} ${errors.email ? fx.fieldInvalid : ""}`}>
              <FieldIcon name="mail" />
              <input
                id="est-email"
                className={fx.input}
                type="email"
                name="email"
                autoComplete="email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "est-email-error" : undefined}
                placeholder=" "
              />
              <label className={fx.label} htmlFor="est-email">
                <RequiredMark />
                {estimationContact.emailLabel}
              </label>
              {msg("email")}
            </div>
            <div className={`${fx.field} ${errors.phone ? fx.fieldInvalid : ""}`}>
              <FieldIcon name="phone" />
              <PhoneField
                id="est-phone"
                value={form.phone}
                onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                invalid={Boolean(errors.phone)}
                describedBy={errors.phone ? "est-phone-error" : undefined}
              />
              <label className={`${fx.label} ${fx.labelFloat}`} htmlFor="est-phone">
                <RequiredMark />
                {estimationContact.phoneLabel}
              </label>
              {msg("phone")}
            </div>
            {status === "error" && sendError && (
              <p className={fx.error} role="alert">
                {sendError}
              </p>
            )}
            <button type="submit" className={`${home.pillFilled} ${styles.submit}`} disabled={status === "sending"}>
              {estimationContact.submit}
            </button>
          </form>
        </div>
        <div className={styles.contactArt}>
          <Image src={estimationContact.image} alt="" width={640} height={460} unoptimized />
        </div>
      </div>
    </section>
  );
}
