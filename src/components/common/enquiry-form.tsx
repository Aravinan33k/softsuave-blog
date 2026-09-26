"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { appPath } from "@/lib/media-url";
import {
  NAME_HINT,
  NAME_MESSAGE,
  NAME_PATTERN,
  PHONE_MESSAGE,
  isValidName,
  isValidPhone,
} from "@/lib/forms/enquiry-rules";
import { SiteLink } from "@/themes/softsuave/site-link";
import fx from "./enquiry-form.module.css";
import FieldIcon, { RequiredMark } from "./field-icon";
import PhoneField from "./phone-field";

/**
 * Per-page copy for the enquiry card. Every hero that carries the form supplies
 * one of these; the card's fields, validation and submit path are the same on
 * every page and live here, not in the page's content.
 */
export interface EnquiryFormContent {
  eyebrow?: string;
  title: string;
  /** Short paragraph under the title, where the card has one. */
  body?: string;
  note?: string;
  /** Optional trailing link appended to the note ("...To apply for jobs, click here."). */
  noteLink?: { readonly label: string; readonly href: string };
  submit: string;
  sending: string;
  requirementLabel: string;
  requirementPlaceholder: string;
  /** The lead's subject line, written per page and stored on the `Enquiry` row for triage. */
  subject: string;
  /** Notice under the form steering job applicants away from the sales inbox. */
  alert?: { label: string; text: string; linkLabel: string; href: string };
}

/**
 * The one enquiry card on the marketing surface. POSTs to `/api/v1/enquiry`,
 * which validates the lead and writes an `Enquiry` row.
 *
 * Four states: `idle`, `sending` (submit disabled, so a double click cannot
 * write two rows), `ok` (the fields are replaced by the confirmation) and
 * `error` (the message sits above the submit button and everything typed is
 * still there to retry with).
 *
 * `idPrefix` namespaces the field ids so two cards on one document never share
 * a label/control pair, and doubles as the lead's `sourceKey`.
 */
export default function EnquiryForm({
  content,
  idPrefix,
}: {
  content: EnquiryFormContent;
  idPrefix: string;
}) {
  const pathname = usePathname();
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", requirement: "" });
  // Honeypot: React owns the input like any other, but it is never shown and
  // never part of `form`.
  const [website, setWebsite] = useState("");

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Enter in a text field submits without going through the disabled button.
    if (status === "sending") return;

    // The server applies the same two predicates from the same module; this is
    // the fast half, not the authority.
    if (!isValidName(form.name)) {
      setStatus("error");
      setError(NAME_MESSAGE);
      return;
    }
    // `form.phone` already carries the calling code: PhoneField emits the
    // combined "+91 98765 43210", or "" for an untouched optional field.
    if (!isValidPhone(form.phone)) {
      setStatus("error");
      setError(PHONE_MESSAGE);
      return;
    }

    setStatus("sending");
    setError(null);

    try {
      // `appPath`, not a bare "/api/…": `fetch` does not pick up `basePath`.
      const res = await fetch(appPath("/api/v1/enquiry"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...form,
          website,
          subject: content.subject,
          sourcePath: pathname,
          sourceKey: idPrefix,
        }),
      });

      if (!res.ok) {
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
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={fx.card} id="enquiry">
      <div className={fx.header}>
        {content.eyebrow ? <span className={fx.eyebrow}>{content.eyebrow}</span> : null}
        <p className={fx.title}>{content.title}</p>
        <span className={fx.accent} aria-hidden />
        {content.body ? <p className={fx.body}>{content.body}</p> : null}
      </div>

      {status === "ok" ? (
        <div className={fx.done} role="status">
          <svg
            className={fx.doneMark}
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
          <p className={fx.doneTitle}>Thanks — we&rsquo;ve got your details.</p>
          <p className={fx.doneBody}>One of our team will contact you within one business day.</p>
        </div>
      ) : (
        <form className={fx.fields} onSubmit={onSubmit}>
          {/* Off-screen rather than display:none, which some bots skip. */}
          <div className={fx.honeypot} aria-hidden>
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

          {/* Each row is icon → control → label. The label comes *after* its
              control in source so the float can be a plain sibling selector
              (`.input:not(:placeholder-shown) ~ .label`) with no `:has()` and
              no JS; `htmlFor`/`id` still pairs them for assistive tech, and
              CSS grid puts the icon in its own column while the label is
              positioned over the control's line. */}
          <div className={fx.field}>
            <FieldIcon name="person" />
            <input
              id={`${idPrefix}-name`}
              className={fx.input}
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
            <label className={fx.label} htmlFor={`${idPrefix}-name`}>
              <RequiredMark />
              Full name
            </label>
          </div>

          <div className={fx.field}>
            <FieldIcon name="mail" />
            <input
              id={`${idPrefix}-email`}
              className={fx.input}
              type="email"
              name="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={set("email")}
              placeholder="jane@company.com"
            />
            <label className={fx.label} htmlFor={`${idPrefix}-email`}>
              <RequiredMark />
              Work email
            </label>
          </div>

          {/* The only two-control row: a calling code beside the number. The
              label stays risen (`labelFloat`) rather than resting on the line
              the way the other rows' do — the code is painted from first
              render, so there is never an empty line for it to sit on. */}
          <div className={fx.field}>
            <FieldIcon name="phone" />
            <PhoneField
              id={`${idPrefix}-phone`}
              value={form.phone}
              onChange={(phone) => setForm((f) => ({ ...f, phone }))}
            />
            <label className={`${fx.label} ${fx.labelFloat}`} htmlFor={`${idPrefix}-phone`}>
              Phone <span className={fx.optional} aria-hidden>(optional)</span>
            </label>
          </div>

          <div className={`${fx.field} ${fx.fieldArea}`}>
            <FieldIcon name="doc" />
            <textarea
              id={`${idPrefix}-requirement`}
              className={fx.textarea}
              name="requirement"
              required
              rows={1}
              value={form.requirement}
              onChange={set("requirement")}
              placeholder={content.requirementPlaceholder}
            />
            <label className={fx.label} htmlFor={`${idPrefix}-requirement`}>
              <RequiredMark />
              {content.requirementLabel}
            </label>
          </div>

          {status === "error" && error && (
            <p className={fx.error} role="alert">
              {error}
            </p>
          )}

          <button type="submit" className={fx.submit} disabled={status === "sending"}>
            {status === "sending" ? content.sending : content.submit}
          </button>
        </form>
      )}

      {(content.note || content.noteLink) && (
        <p className={fx.note}>
          {content.note}
          {content.noteLink && (
            <>
              {" "}
              <SiteLink href={content.noteLink.href} className={fx.noteLink}>
                {content.noteLink.label}
              </SiteLink>
            </>
          )}
        </p>
      )}

      {content.alert && (
        <p className={fx.alert}>
          <span className={fx.alertLabel}>{content.alert.label}</span> {content.alert.text}{" "}
          {/* `SiteLink`: the href is usually /career-overview, a live-site path
              this app does not serve, so a plain next/link 404s on it. */}
          <SiteLink className={fx.alertLink} href={content.alert.href}>
            {content.alert.linkLabel}
          </SiteLink>
        </p>
      )}
    </div>
  );
}
