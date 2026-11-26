"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { appPath, publicMediaUrl } from "@/lib/media-url";
import {
  EMAIL_MAX,
  NAME_HINT,
  NAME_MAX,
  REQUIREMENT_MAX,
  emailError,
  nameError,
  phoneError,
} from "@/lib/forms/enquiry-rules";
import { focusAtEnd } from "@/lib/forms/focus";
import { leadRouting } from "@/lib/forms/lead-routing";
import { clearLeadDrafts, useLeadDraft } from "@/lib/forms/use-lead-draft";
import { useClearOnClick } from "@/lib/forms/use-clear-on-click";
import { pushDataLayer } from "@/lib/analytics/datalayer";
import { BOOK_ID, cwForm } from "@/lib/home/ad-coffee-with-us-content";
import FieldIcon, { RequiredMark } from "@/components/common/field-icon";
import PhoneField from "@/components/common/phone-field";
import fx from "@/components/common/enquiry-form.module.css";
import styles from "./coffee.module.css";

type Field = "name" | "email" | "phone" | "message";
type Errors = Partial<Record<Field, string>>;

const ORDER: readonly Field[] = ["name", "email", "phone", "message"];

function messageError(value: string): string | null {
  return value.trim().length > REQUIREMENT_MAX ? `Please keep it under ${REQUIREMENT_MAX} characters.` : null;
}

const RULES: Record<Field, (value: string) => string | null> = {
  name: nameError,
  email: emailError,
  phone: phoneError,
  message: messageError,
};

/**
 * The "Have a Coffee With Us" meeting-request card (`/ad/coffee-with-us`).
 *
 * Drawn exactly like the hero enquiry card on /hire-software-developers — the
 * shared card's own stylesheet (`common/enquiry-form.module.css`), its field
 * icons, required marks, floating labels, calling-code phone field and the
 * black hover on the button — with this campaign's own content and fields:
 * the host (portrait, name, role) over the title, then Full Name, Work Email
 * and Phone (required) and an optional message, the button and a short note.
 *
 * Its own component rather than `common/enquiry-form` because the fields and
 * behaviour differ: no required requirement box, no redirect. What makes a lead
 * a lead is shared: the field rules (`enquiry-rules.ts`, the same ones the API
 * enforces), the lead routing and draft saving, and `POST /api/v1/enquiry`.
 *
 * On success it stays on the page and thanks the visitor in place, instead of
 * sending them to /thank-you, so this campaign never fires a conversion that
 * GTM may already have tied to that page. It pushes its own
 * `meeting_request_submitted` once per accepted lead, with no personal data.
 */
export default function CoffeeForm({
  idPrefix = "ad-coffee",
  avatar,
}: {
  idPrefix?: string;
  /** The host's portrait, shown over their name in the card's header. */
  avatar?: { readonly src: string; readonly width: number; readonly height: number };
}) {
  const pathname = usePathname();
  const routing = leadRouting(pathname, "hero");
  const saveDraft = useLeadDraft(routing.draft, pathname);

  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "error" | "sent">("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  const [website, setWebsite] = useState(""); // honeypot
  const sentOnce = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);
  // As on the shared card: the messages go on the next click anywhere.
  useClearOnClick(ORDER.some((key) => errors[key]), () => setErrors({}), formRef);

  const update = (key: Field, value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    // A field already showing a message re-checks as the visitor types, so it clears once right.
    if (errors[key]) setErrors((e) => ({ ...e, [key]: RULES[key](value) ?? undefined }));
  };

  const draft = () =>
    saveDraft({ name: values.name, email: values.email, phone: values.phone, description: values.message }, website);

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
    if (status === "sending" || status === "sent") return;

    const found: Errors = {};
    for (const key of ORDER) found[key] = RULES[key](values[key]) ?? undefined;
    setErrors(found);
    const first = ORDER.find((key) => found[key]);
    if (first) {
      setStatus("idle");
      setServerError(null);
      focusAtEnd(document.getElementById(`${idPrefix}-${first}`));
      return;
    }

    setStatus("sending");
    setServerError(null);
    try {
      // `appPath`: `fetch` does not pick up the app's basePath by itself.
      const res = await fetch(appPath("/api/v1/enquiry"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          phone: values.phone,
          // The API needs a requirement; an empty message box sends a fixed line instead.
          requirement: values.message.trim() || cwForm.fallbackRequirement,
          website,
          subject: cwForm.subject,
          sourcePath: pathname,
          sourceKey: idPrefix,
          leadType: routing.submit,
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
      clearLeadDrafts();
      if (!sentOnce.current) {
        sentOnce.current = true;
        pushDataLayer("meeting_request_submitted", { form_id: "coffee_with_us", page_path: pathname });
      }
      setStatus("sent");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <div className={`${fx.card} ${fx.blackSubmitHover} ${styles.formCard}`} id={BOOK_ID}>
      {/* Left-aligned header (by request): the host on one row, the title,
          then the meeting length behind an accent dot. */}
      <div className={styles.formHead}>
        <div className={styles.formHost}>
          {avatar && (
            <span className={styles.formAvatar} aria-hidden>
              <Image
                src={publicMediaUrl(avatar.src)}
                alt=""
                width={avatar.width}
                height={avatar.height}
                sizes="48px"
                className={styles.formAvatarImg}
              />
            </span>
          )}
          <p className={styles.formHostName}>{cwForm.hostLabel}</p>
        </div>
        <h2 className={styles.formTitle}>{cwForm.title}</h2>
        <p className={styles.formMeta}>{cwForm.meta}</p>
      </div>

      {status === "sent" ? (
        <div className={styles.formDone} ref={doneRef} tabIndex={-1} role="status">
          <p className={styles.formDoneTitle}>{cwForm.success.title}</p>
          <p>{cwForm.success.body}</p>
        </div>
      ) : (
        <form ref={formRef} className={fx.fields} onSubmit={onSubmit} noValidate>
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

          {/* Each row is icon → control → label, as on the shared card: the
              label follows its control so the float is a sibling selector. */}
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
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
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
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={draft}
              {...a11y("email")}
              placeholder="jane@company.com"
            />
            <label className={fx.label} htmlFor={`${idPrefix}-email`}>
              <RequiredMark />
              Work email
            </label>
            {message("email")}
          </div>

          <div className={fieldClass("phone")}>
            <FieldIcon name="phone" />
            <PhoneField
              id={`${idPrefix}-phone`}
              value={values.phone}
              onChange={(phone) => update("phone", phone)}
              onBlur={draft}
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

          <div className={fieldClass("message", fx.fieldArea)}>
            <FieldIcon name="doc" />
            <textarea
              id={`${idPrefix}-message`}
              className={fx.textarea}
              name="message"
              rows={1}
              maxLength={REQUIREMENT_MAX}
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              onBlur={draft}
              {...a11y("message")}
              placeholder="Tell us about your requirements"
            />
            <label className={fx.label} htmlFor={`${idPrefix}-message`}>
              What would you like to discuss? (Optional)
            </label>
            {message("message")}
          </div>

          {status === "error" && serverError && (
            <p className={fx.error} role="alert">
              {serverError}
            </p>
          )}

          <button type="submit" className={fx.submit} disabled={status === "sending"}>
            {status === "sending" ? cwForm.sending : cwForm.submit}
          </button>
        </form>
      )}

      {status !== "sent" && <p className={fx.note}>{cwForm.note}</p>}
    </div>
  );
}
