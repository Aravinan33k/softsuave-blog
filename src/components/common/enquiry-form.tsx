"use client";

import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { appPath } from "@/lib/media-url";
import {
  EMAIL_MAX,
  NAME_HINT,
  NAME_MAX,
  REQUIREMENT_MAX,
  emailError,
  nameError,
  phoneError,
  requirementError,
} from "@/lib/forms/enquiry-rules";
import { focusAtEnd } from "@/lib/forms/focus";
import { THANK_YOU_PATH } from "@/lib/forms/thank-you";
import { useClearOnClick } from "@/lib/forms/use-clear-on-click";
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
  /**
   * Render the title as an `<h2>` rather than a paragraph — for pages whose
   * live counterpart makes the form's heading part of the outline (the hire
   * by role pages: "Get Skilled Backend Developers" is an H2 there). Styling
   * is identical either way; omitted keeps the paragraph.
   */
  titleAs?: "h2";
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

type Field = "name" | "email" | "phone" | "requirement";
type FieldErrors = Partial<Record<Field, string>>;

/** In the card's order, which is also the order submit looks for the first problem. */
const FIELDS: readonly Field[] = ["name", "email", "phone", "requirement"];

const RULES: Record<Field, (value: string) => string | null> = {
  name: nameError,
  email: emailError,
  phone: phoneError,
  requirement: requirementError,
};

/**
 * The one enquiry card on the marketing surface. POSTs to `/api/v1/enquiry`,
 * which validates the lead and writes an `Enquiry` row.
 *
 * Three states: `idle`, `sending` (submit disabled, so a double click cannot
 * write two rows) and `error` (the server's message sits above the submit
 * button and everything typed is still there to retry with). Once the lead is
 * accepted the reader is sent to `/thank-you` (`THANK_YOU_PATH`), as
 * softsuave.com's forms do; the button keeps saying "Sending…" until the page
 * changes.
 *
 * Every field is validated in the browser with the shared rules in
 * `lib/forms/enquiry-rules.ts` — the same ones the API enforces. Pressing
 * submit shows each problem under its own field and focuses the first one.
 * The messages then go on the next click or tap anywhere — another field or
 * the page around the form (`useClearOnClick`) — and a field whose message
 * is showing re-checks as the reader types, so it also clears the moment the
 * value is right. Leaving a field does not raise a message by itself: it would
 * reappear on the very click meant to dismiss it.
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
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", requirement: "" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  useClearOnClick(FIELDS.some((key) => errors[key]), () => setErrors({}), formRef);
  // Honeypot: React owns the input like any other, but it is never shown and
  // never part of `form`.
  const [website, setWebsite] = useState("");

  const check = (key: Field, value: string) =>
    setErrors((e) => ({ ...e, [key]: RULES[key](value) ?? undefined }));

  const update = (key: Field, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) check(key, value);
  };

  const set = (key: Field) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    update(key, e.target.value);

  /** Props tying a control to its error message under the field. */
  const a11y = (key: Field) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${idPrefix}-${key}-error` : undefined,
  });

  const fieldClass = (key: Field, extra = "") =>
    [fx.field, extra, errors[key] ? fx.fieldInvalid : ""].filter(Boolean).join(" ");

  const message = (key: Field) =>
    errors[key] ? (
      <p id={`${idPrefix}-${key}-error`} className={fx.fieldMessage}>
        {errors[key]}
      </p>
    ) : null;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Enter in a text field submits without going through the disabled button.
    if (status === "sending") return;

    // Every field at once, so the reader sees all that needs fixing — then
    // focus on the first. The server applies the same rules; this is the fast
    // half, not the authority.
    const found: FieldErrors = {};
    for (const key of FIELDS) found[key] = RULES[key](form[key]) ?? undefined;
    setErrors(found);
    const first = FIELDS.find((key) => found[key]);
    if (first) {
      setStatus("idle");
      setError(null);
      focusAtEnd(document.getElementById(`${idPrefix}-${first}`));
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

      // Stays "sending" — the form is about to be replaced by the page.
      router.push(THANK_YOU_PATH);
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={fx.card} id="enquiry">
      <div className={fx.header}>
        {content.eyebrow ? <span className={fx.eyebrow}>{content.eyebrow}</span> : null}
        {content.titleAs === "h2" ? (
          <h2 className={fx.title}>{content.title}</h2>
        ) : (
          <p className={fx.title}>{content.title}</p>
        )}
        <span className={fx.accent} aria-hidden />
        {content.body ? <p className={fx.body}>{content.body}</p> : null}
      </div>

      <form ref={formRef} className={fx.fields} onSubmit={onSubmit} noValidate>
        {/* `noValidate`: the browser's own bubbles are replaced by the
            messages under each field, which use the same rules as the
            server. The honeypot below is off-screen rather than
            display:none, which some bots skip. */}
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
        <div className={fieldClass("name")}>
          <FieldIcon name="person" />
          <input
            id={`${idPrefix}-name`}
            className={fx.input}
            type="text"
            name="name"
            autoComplete="name"
            required
            maxLength={NAME_MAX}
            title={NAME_HINT}
            value={form.name}
            onChange={set("name")}
            {...a11y("name")}
            placeholder="Jane Doe"
          />
          <label className={fx.label} htmlFor={`${idPrefix}-name`}>
            <RequiredMark />
            Full name
          </label>
          {message("name")}
        </div>

        <div className={fieldClass("email")}>
          <FieldIcon name="mail" />
          <input
            id={`${idPrefix}-email`}
            className={fx.input}
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={EMAIL_MAX}
            value={form.email}
            onChange={set("email")}
            {...a11y("email")}
            placeholder="jane@company.com"
          />
          <label className={fx.label} htmlFor={`${idPrefix}-email`}>
            <RequiredMark />
            Work email
          </label>
          {message("email")}
        </div>

        {/* The only two-control row: a calling code beside the number. The
            label stays risen (`labelFloat`) rather than resting on the line
            the way the other rows' do — the code is painted from first
            render, so there is never an empty line for it to sit on. */}
        <div className={fieldClass("phone")}>
          <FieldIcon name="phone" />
          <PhoneField
            id={`${idPrefix}-phone`}
            value={form.phone}
            onChange={(phone) => update("phone", phone)}
            invalid={Boolean(errors.phone)}
            describedBy={errors.phone ? `${idPrefix}-phone-error` : undefined}
            required
          />
          <label className={`${fx.label} ${fx.labelFloat}`} htmlFor={`${idPrefix}-phone`}>
            <RequiredMark />
            Phone
          </label>
          {message("phone")}
        </div>

        <div className={fieldClass("requirement", fx.fieldArea)}>
          <FieldIcon name="doc" />
          <textarea
            id={`${idPrefix}-requirement`}
            className={fx.textarea}
            name="requirement"
            required
            rows={1}
            maxLength={REQUIREMENT_MAX}
            value={form.requirement}
            onChange={set("requirement")}
            {...a11y("requirement")}
            placeholder={content.requirementPlaceholder}
          />
          <label className={fx.label} htmlFor={`${idPrefix}-requirement`}>
            <RequiredMark />
            {content.requirementLabel}
          </label>
          {message("requirement")}
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
