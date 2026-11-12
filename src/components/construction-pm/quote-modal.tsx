"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { usePathname, useRouter } from "next/navigation";
import { appPath } from "@/lib/media-url";
import { THANK_YOU_PATH } from "@/lib/forms/thank-you";
import { emailError, nameError, phoneError } from "@/lib/forms/enquiry-rules";
import FieldIcon, { RequiredMark } from "@/components/common/field-icon";
import PhoneField from "@/components/common/phone-field";
import fx from "@/components/common/enquiry-form.module.css";
import { QUOTE_HREF, pmQuoteForm as copy } from "@/lib/home/construction-pm-content";
import home from "@/components/home/home.module.css";
import styles from "./construction-pm.module.css";

type Fields = { name: string; email: string; phone: string; project: string };
type Errors = Partial<Record<"name" | "email" | "phone", string>>;
const EMPTY: Fields = { name: "", email: "", phone: "", project: "" };

/**
 * The "Get a FREE Quote Today!!!" form. Every anchor to `#get-quote` on the page (the banner button, the
 * free-quote band, the portfolio) opens it, as the live Get Free Quote buttons do.
 */
export default function QuoteModal() {
  const dialog = useRef<HTMLDialogElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [sendError, setSendError] = useState<string | null>(null);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    // Capture phase, so the smooth scroller's own handler for in-page anchors never sees the click.
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement | null)?.closest?.(`a[href="${QUOTE_HREF}"]`);
      if (link) {
        e.preventDefault();
        e.stopPropagation();
        setForm(EMPTY);
        setErrors({});
        setStatus("idle");
        setSendError(null);
        if (!el.open) el.showModal();
        return;
      }
      if (e.target === el) el.close();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  const set = (k: keyof Fields) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k !== "project") setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = {
      name: form.name.trim() ? (nameError(form.name) ?? undefined) : copy.required,
      email: form.email.trim() ? (emailError(form.email) ?? undefined) : copy.required,
      phone: form.phone.trim() ? (phoneError(form.phone) ? copy.phoneInvalid : undefined) : copy.required,
    };
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
          // The live project box is optional; the enquiry API wants a requirement, so the title stands in.
          requirement: form.project.trim().length >= 10 ? form.project.trim() : `${copy.title} ${form.project.trim()}`.trim(),
          website,
          subject: "Construction project management software: Get a FREE Quote",
          sourcePath: pathname,
          sourceKey: "construction-pm-quote",
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

  const msg = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`pm-${k}-error`} className={fx.fieldMessage}>
        {errors[k]}
      </p>
    ) : null;
  const sending = status === "sending";
  const at = copy.title.indexOf(copy.accent);

  return (
    <dialog ref={dialog} className={styles.dialog} aria-labelledby="pm-quote-title">
      <div className={`${fx.card} ${styles.modalCard}`}>
        <button type="button" className={styles.close} onClick={() => dialog.current?.close()} aria-label={copy.close}>
          ×
        </button>
        <h2 id="pm-quote-title" className={styles.modalTitle}>
          {copy.title.slice(0, at)}
          <span className={styles.accent}>{copy.accent}</span>
          {copy.title.slice(at + copy.accent.length)}
        </h2>
        <p className={styles.modalBody}>{copy.body}</p>
        <form className={fx.fields} onSubmit={onSubmit} noValidate>
          <div className={fx.honeypot} aria-hidden>
            <label htmlFor="pm-website">Website</label>
            <input id="pm-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className={`${fx.field} ${errors.name ? fx.fieldInvalid : ""}`}>
            <FieldIcon name="person" />
            <input
              id="pm-name"
              className={fx.input}
              type="text"
              name="name"
              autoComplete="name"
              value={form.name}
              onChange={(e) => set("name")(e.target.value)}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "pm-name-error" : undefined}
              placeholder=" "
            />
            <label className={fx.label} htmlFor="pm-name">
              <RequiredMark />
              {copy.name}
            </label>
            {msg("name")}
          </div>
          <div className={`${fx.field} ${errors.email ? fx.fieldInvalid : ""}`}>
            <FieldIcon name="mail" />
            <input
              id="pm-email"
              className={fx.input}
              type="email"
              name="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => set("email")(e.target.value)}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "pm-email-error" : undefined}
              placeholder=" "
            />
            <label className={fx.label} htmlFor="pm-email">
              <RequiredMark />
              {copy.email}
            </label>
            {msg("email")}
          </div>
          <div className={`${fx.field} ${errors.phone ? fx.fieldInvalid : ""}`}>
            <FieldIcon name="phone" />
            <PhoneField
              id="pm-phone"
              value={form.phone}
              onChange={set("phone")}
              invalid={Boolean(errors.phone)}
              describedBy={errors.phone ? "pm-phone-error" : undefined}
            />
            <label className={`${fx.label} ${fx.labelFloat}`} htmlFor="pm-phone">
              <RequiredMark />
              {copy.phone}
            </label>
            {msg("phone")}
          </div>
          <div className={fx.field}>
            <FieldIcon name="doc" />
            <textarea
              id="pm-project"
              className={fx.input}
              name="message"
              rows={2}
              value={form.project}
              onChange={(e) => set("project")(e.target.value)}
              placeholder=" "
            />
            <label className={fx.label} htmlFor="pm-project">
              {copy.project}
            </label>
          </div>
          {status === "error" && sendError && (
            <p className={fx.error} role="alert">
              {sendError}
            </p>
          )}
          <button type="submit" className={`${home.pillFilled} ${styles.submit}`} disabled={sending}>
            {sending ? copy.sending : copy.submit}
          </button>
        </form>
      </div>
    </dialog>
  );
}
