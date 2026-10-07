"use client";

import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { appPath, publicMediaUrl } from "@/lib/media-url";
import { EMAIL_MAX, NAME_MAX, emailError, nameError, phoneError } from "@/lib/forms/enquiry-rules";
import { focusAtEnd } from "@/lib/forms/focus";
import { useClearOnClick } from "@/lib/forms/use-clear-on-click";
import PhoneField from "@/components/common/phone-field";
import FadeUp from "@/components/home/fade-up";
import { contactForm, quickContact, serviceOptions } from "@/lib/home/contact-content";
import CardHead from "./card-head";
import ContactScheduler from "./contact-scheduler";
import LiveChat from "./live-chat";
import styles from "./contact.module.css";

/**
 * The three contact channels at the top of /contact, in the live page's order:
 * the stepped contact form, the meeting scheduler, and the quick-contact list.
 *
 * The cards are white panels on the dark masthead, the same treatment the
 * landing heroes give their enquiry card, so `PhoneField` (which paints from
 * the enquiry card's `--fx-*` palette) reads correctly — `.channelCard`
 * defines that palette.
 */
export default function ContactChannels() {
  return (
    <div className={styles.channels}>
      <FadeUp>
        <SteppedForm />
      </FadeUp>
      <FadeUp delay={0.08}>
        <ContactScheduler />
      </FadeUp>
      <FadeUp delay={0.16}>
        <QuickContactCard />
      </FadeUp>
    </div>
  );
}

/** The Contact Form card's id — the Live Chat row brings the reader here. */
const CONTACT_FORM_ID = "contact-form";

type Step = 0 | 1 | 2 | 3;

/**
 * The live page's four-step form — name, email, phone, service — one question
 * at a time with Back / Next, submitting on the last step. It POSTs to the
 * same `/api/v1/enquiry` endpoint as every other enquiry card, so a lead from
 * here lands in the `Enquiry` table with `sourceKey: "contact"`; the chosen
 * service is stored as the requirement.
 */
function SteppedForm() {
  const pathname = usePathname();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "" });
  const [website, setWebsite] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  // A step's message goes on the next click or tap anywhere (the form's own
  // Next / Submit aside), as on every enquiry card.
  useClearOnClick(Boolean(fieldError), () => setFieldError(null), formRef);

  const s = contactForm.steps;
  const questions = [s.name, s.email, s.phone, s.service] as const;
  const current = questions[step];

  /**
   * The rule for each step, from the shared `lib/forms/enquiry-rules.ts` (the
   * same ones every enquiry card and the API use): a name of letters, a valid
   * email, a ten-digit phone. Returns the message to show, or null.
   */
  const rule = (at: Step, f: typeof form): string | null => {
    if (at === 0) return nameError(f.name);
    if (at === 1) return emailError(f.email);
    if (at === 2) return phoneError(f.phone);
    return f.service ? null : s.service.error;
  };
  const check = (at: Step) => rule(at, form);

  /** Updates a value; once this step has shown a message, re-checks as the reader types. */
  const edit = (key: keyof typeof form, value: string) => {
    const nextForm = { ...form, [key]: value };
    setForm(nextForm);
    if (fieldError) setFieldError(rule(step, nextForm));
  };

  const focusField = () =>
    requestAnimationFrame(() => {
      // The text box first: on the phone step the country-code select comes
      // before the number in the DOM, and the number is what needs fixing.
      const box = fieldRef.current?.querySelector("input:not([type=hidden])");
      focusAtEnd(box ?? fieldRef.current?.querySelector("select"));
    });

  const next = () => {
    const err = check(step);
    setFieldError(err);
    // Back into the field to fix it, rather than leaving focus on Next.
    if (err) return focusField();
    setStep((n) => (n < 3 ? ((n + 1) as Step) : n));
    focusField();
  };

  const back = () => {
    setFieldError(null);
    setStep((n) => (n > 0 ? ((n - 1) as Step) : n));
    focusField();
  };

  const submit = async () => {
    if (status === "sending") return;
    // Re-check every step: a reader can only move forward past a valid step,
    // but a value edited after going Back is otherwise not re-validated.
    for (const at of [0, 1, 2, 3] as const) {
      const err = check(at);
      if (err) {
        setStep(at);
        setFieldError(err);
        focusField();
        return;
      }
    }

    setStatus("sending");
    setError(null);
    try {
      const res = await fetch(appPath("/api/v1/enquiry"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          requirement: form.service,
          website,
          subject: contactForm.subject,
          sourcePath: pathname,
          sourceKey: "contact",
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) next();
    else void submit();
  };

  const fieldId = `contact-${["name", "email", "phone", "service"][step]}`;

  return (
    <form ref={formRef} id={CONTACT_FORM_ID} className={`${styles.channelCard} ${styles.formCard}`} onSubmit={onSubmit} noValidate>
      <CardHead icon={contactForm.icon} title={contactForm.title} subtitle={contactForm.subtitle} />

      {status === "ok" ? (
        <p className={styles.formSuccess} role="status">
          {contactForm.success}
        </p>
      ) : (
        <div className={styles.stepBody}>
          <label className={styles.stepQuestion} htmlFor={fieldId}>
            {current.question}
          </label>

          <div className={styles.stepField} ref={fieldRef}>
            {step === 0 && (
              <input
                id={fieldId}
                className={styles.textInput}
                type="text"
                name="name"
                autoComplete="name"
                maxLength={NAME_MAX}
                placeholder={s.name.placeholder}
                value={form.name}
                onChange={(e) => edit("name", e.target.value)}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={fieldError ? "contact-step-error" : undefined}
              />
            )}
            {step === 1 && (
              <input
                id={fieldId}
                className={styles.textInput}
                type="email"
                name="email"
                autoComplete="email"
                maxLength={EMAIL_MAX}
                placeholder={s.email.placeholder}
                value={form.email}
                onChange={(e) => edit("email", e.target.value)}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={fieldError ? "contact-step-error" : undefined}
              />
            )}
            {step === 2 && (
              <div className={styles.phoneWrap}>
                <PhoneField
                  id={fieldId}
                  value={form.phone}
                  placeholder={s.phone.placeholder}
                  onChange={(phone) => edit("phone", phone)}
                  invalid={Boolean(fieldError)}
                  describedBy={fieldError ? "contact-step-error" : undefined}
                />
              </div>
            )}
            {step === 3 && (
              <select
                id={fieldId}
                className={styles.selectInput}
                name="service"
                value={form.service}
                onChange={(e) => edit("service", e.target.value)}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={fieldError ? "contact-step-error" : undefined}
              >
                <option value="" disabled hidden>
                  {s.service.placeholder}
                </option>
                {serviceOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            )}
          </div>

          {fieldError && (
            <p id="contact-step-error" className={styles.fieldError} role="alert">
              {fieldError}
            </p>
          )}
          {status === "error" && error && (
            <p className={styles.formError} role="alert">
              {error}
            </p>
          )}

          {/* Honeypot — hidden from people and from assistive tech. */}
          <input
            className={styles.honeypot}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />

          <div className={step === 0 ? styles.stepActionsEnd : styles.stepActions}>
            {step > 0 && (
              <button type="button" className={styles.stepBack} onClick={back}>
                ‹ {contactForm.back}
              </button>
            )}
            {step < 3 ? (
              <button type="submit" className={styles.stepNext}>
                {contactForm.next} ›
              </button>
            ) : (
              <button type="submit" className={styles.stepNext} disabled={status === "sending"}>
                {status === "sending" ? contactForm.sending : contactForm.submit}
              </button>
            )}
          </div>
        </div>
      )}

      <p className={styles.formAlert}>
        <strong>{contactForm.alert.label}</strong> {contactForm.alert.text}{" "}
        <Link href={contactForm.alert.href}>{contactForm.alert.linkLabel}</Link>.
      </p>
    </form>
  );
}

function QuickContactCard() {
  const q = quickContact;
  const [chatOpen, setChatOpen] = useState(false);
  const closeChat = useCallback(() => setChatOpen(false), []);
  return (
    <div className={styles.channelCard}>
      <CardHead icon={q.icon} title={q.title} subtitle={q.subtitle} level={3} />

      <div className={styles.quickPair}>
        <a className={styles.quickWhatsapp} href={q.whatsapp.href} target="_blank" rel="noopener noreferrer">
          <Image src={publicMediaUrl(q.whatsapp.icon)} alt="" width={34} height={34} />
          <span>{q.whatsapp.label}</span>
        </a>
        <a className={styles.quickTeams} href={q.teams.href} target="_blank" rel="noopener noreferrer">
          <Image src={publicMediaUrl(q.teams.icon)} alt="" width={34} height={34} className={styles.teamsIcon} />
          <span>{q.teams.label}</span>
        </a>
      </div>

      <a className={styles.quickRow} href={q.email.href}>
        <span className={styles.mailIcon} aria-hidden>
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3.5 6 8.5 7 8.5-7" />
          </svg>
        </span>
        <span className={styles.quickText}>
          <span className={styles.quickTitle}>{q.email.label}</span>
          <span className={styles.quickSub}>{q.email.text}</span>
        </span>
        <Arrow />
      </a>

      {/* Opens the Soft Suave assistant panel — the live page's Live Chat —
          rather than an external app: see `quickContact.liveChat`. */}
      <button
        type="button"
        className={styles.quickRow}
        onClick={() => setChatOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={chatOpen}
      >
        <Image src={publicMediaUrl(q.liveChat.icon)} alt="" width={46} height={46} className={styles.quickRowImg} />
        <span className={styles.quickText}>
          <span className={styles.quickTitle}>
            {q.liveChat.label}
            <span className={styles.liveDot} aria-hidden />
          </span>
          <span className={styles.quickSub}>{q.liveChat.text}</span>
        </span>
        <Arrow />
      </button>
      <LiveChat open={chatOpen} onClose={closeChat} />
    </div>
  );
}

function Arrow() {
  return (
    <span className={styles.quickArrow} aria-hidden>
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M7 17 17 7M9 7h8v8" />
      </svg>
    </span>
  );
}
