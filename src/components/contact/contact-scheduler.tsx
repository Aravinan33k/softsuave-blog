"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { appPath } from "@/lib/media-url";
import { isValidName, isValidPhone } from "@/lib/forms/enquiry-rules";
import PhoneField from "@/components/common/phone-field";
import { contactForm, scheduleMeeting } from "@/lib/home/contact-content";
import CardHead from "./card-head";
import styles from "./contact.module.css";

/**
 * "Schedule Meeting" — the live page's inline NeetoCal calendar: a month
 * header, a three-day picker, the chosen day's open slots and a time-zone
 * selector. Picking a slot turns the card into the "Enter Details" step form
 * (name, email, phone, what the meeting is about), which books the slot
 * through /api/v1/meeting/book.
 *
 * Slots come from /api/v1/meeting/slots, our server-side NeetoCal proxy,
 * already expressed in the selected time zone. If the calendar cannot load,
 * the card falls back to linking the NeetoCal booking page.
 */

type SlotDay = { date: string; slots: string[] };
type Load = { status: "loading" } | { status: "ready"; days: SlotDay[] } | { status: "error" };

const DAYS_PER_VIEW = 3;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** A "YYYY-MM-DD" date as a UTC Date, so formatting never shifts it a day. */
const asDate = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
const fmt = (iso: string, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-US", { timeZone: "UTC", ...o }).format(asDate(iso));
const monthKey = (iso: string) => iso.slice(0, 7);

/** "18:30" → "06:30 PM", as the live calendar prints its slots. */
function to12h(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${String(h % 12 === 0 ? 12 : h % 12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

export default function ContactScheduler() {
  const [tz, setTz] = useState("");
  const [zones, setZones] = useState<string[]>([]);
  const [load, setLoad] = useState<Load>({ status: "loading" });
  const [dayIdx, setDayIdx] = useState(0);
  const [windowStart, setWindowStart] = useState(0);
  const [picked, setPicked] = useState<{ date: string; time: string } | null>(null);
  const [booked, setBooked] = useState(false);

  // The visitor's zone is only knowable in the browser; resolve it after mount
  // so the server-rendered markup and the first client render agree.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const own = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
      // Chrome still reports the legacy "Asia/Calcutta"; NeetoCal books against "Asia/Kolkata".
      const zone = own === "Asia/Calcutta" ? "Asia/Kolkata" : own;
      const list = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : [zone];
      setZones(list.includes(zone) ? list : [zone, ...list]);
      setTz(zone);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /** Bumped to re-fetch the same zone (after a booking takes a slot). */
  const [reload, setReload] = useState(0);

  // Callers put the card into its loading state before changing `tz` or
  // `reload`; the effect only sets state once the response is in.
  useEffect(() => {
    if (!tz) return;
    const ctrl = new AbortController();
    fetch(appPath(`/api/v1/meeting/slots?tz=${encodeURIComponent(tz)}`), { signal: ctrl.signal })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<{ days: SlotDay[] }>;
      })
      .then((data) => {
        setLoad({ status: "ready", days: data.days });
        setDayIdx(0);
        setWindowStart(0);
      })
      .catch((err: Error) => {
        if (err.name !== "AbortError") setLoad({ status: "error" });
      });
    return () => ctrl.abort();
  }, [tz, reload]);

  if (picked) {
    return (
      <MeetingForm
        slot={picked}
        timeZone={tz}
        booked={booked}
        onBooked={() => setBooked(true)}
        onBack={() => {
          setPicked(null);
          // A booked slot is gone from NeetoCal's list; refresh before showing the calendar again.
          if (booked) {
            setBooked(false);
            setLoad({ status: "loading" });
            setReload((n) => n + 1);
          }
        }}
      />
    );
  }

  const days = load.status === "ready" ? load.days : [];
  const selected = days[dayIdx];

  // Month navigation jumps to the first open day of the neighbouring month.
  const months = [...new Set(days.map((d) => monthKey(d.date)))];
  const curMonth = selected ? monthKey(selected.date) : undefined;
  const mi = curMonth ? months.indexOf(curMonth) : -1;
  const goMonth = (step: number) => {
    const target = months[mi + step];
    if (!target) return;
    const idx = days.findIndex((d) => monthKey(d.date) === target);
    setDayIdx(idx);
    setWindowStart(Math.floor(idx / DAYS_PER_VIEW) * DAYS_PER_VIEW);
  };
  const shiftWindow = (step: number) => {
    const next = windowStart + step * DAYS_PER_VIEW;
    if (next < 0 || next >= days.length) return;
    setWindowStart(next);
    setDayIdx(next);
  };

  return (
    <div className={styles.channelCard}>
      <CardHead icon={scheduleMeeting.icon} title={scheduleMeeting.title} subtitle={scheduleMeeting.subtitle} />

      <div className={styles.scheduleBody}>
        {load.status === "error" || (load.status === "ready" && days.length === 0) ? (
          <div className={styles.calState}>
            <p>{load.status === "error" ? scheduleMeeting.error : scheduleMeeting.empty}</p>
            <a className={styles.stepNext} href={scheduleMeeting.fallback.href} target="_blank" rel="noopener noreferrer">
              {scheduleMeeting.fallback.label}
            </a>
          </div>
        ) : (
          <>
            <div className={styles.calMonth}>
              <button
                type="button"
                className={styles.calMonthNav}
                onClick={() => goMonth(-1)}
                disabled={mi <= 0}
                aria-label="Previous month"
              >
                ‹
              </button>
              <span className={styles.calMonthLabel} aria-live="polite">
                {selected ? (
                  <>
                    {fmt(selected.date, { month: "long" })}
                    <br />
                    {fmt(selected.date, { year: "numeric" })}
                  </>
                ) : (
                  " "
                )}
              </span>
              <button
                type="button"
                className={styles.calMonthNav}
                onClick={() => goMonth(1)}
                disabled={mi === -1 || mi >= months.length - 1}
                aria-label="Next month"
              >
                ›
              </button>
            </div>

            <div className={styles.calDays}>
              <button
                type="button"
                className={styles.calDayNav}
                onClick={() => shiftWindow(-1)}
                disabled={windowStart === 0}
                aria-label="Earlier days"
              >
                ‹
              </button>
              <div className={styles.calDayRow} role="group" aria-label="Choose a day">
                {load.status === "loading"
                  ? Array.from({ length: DAYS_PER_VIEW }, (_, i) => <span key={i} className={styles.calDaySkeleton} />)
                  : days.slice(windowStart, windowStart + DAYS_PER_VIEW).map((d, i) => {
                      const idx = windowStart + i;
                      return (
                        <button
                          key={d.date}
                          type="button"
                          className={idx === dayIdx ? styles.calDayChipOn : styles.calDayChip}
                          aria-pressed={idx === dayIdx}
                          onClick={() => setDayIdx(idx)}
                        >
                          <span>{fmt(d.date, { weekday: "short" })}</span>
                          <strong>{fmt(d.date, { day: "2-digit" })}</strong>
                        </button>
                      );
                    })}
              </div>
              <button
                type="button"
                className={styles.calDayNav}
                onClick={() => shiftWindow(1)}
                disabled={windowStart + DAYS_PER_VIEW >= days.length}
                aria-label="Later days"
              >
                ›
              </button>
            </div>

            <div className={styles.calSlots} role="group" aria-label="Choose a time">
              {load.status === "loading" ? (
                <p className={styles.calLoading}>{scheduleMeeting.loading}</p>
              ) : (
                selected?.slots.map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={styles.calSlot}
                    onClick={() => setPicked({ date: selected.date, time: t })}
                  >
                    {to12h(t)}
                  </button>
                ))
              )}
            </div>
          </>
        )}

        <label className={styles.calTz}>
          <span className={styles.calTzLabel}>{scheduleMeeting.timezoneLabel}</span>
          <span className={styles.calTzField}>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
            </svg>
            <select className={styles.calTzSelect} value={tz} onChange={(e) => {
                setLoad({ status: "loading" });
                setTz(e.target.value);
              }} disabled={!tz}>
              {!tz && <option value="">{scheduleMeeting.timezonePlaceholder}</option>}
              {zones.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </span>
        </label>
      </div>
    </div>
  );
}

type Step = 0 | 1 | 2 | 3;

/** The "Enter Details" card — the live page's four booking questions, one at a time. */
function MeetingForm({
  slot,
  timeZone,
  booked,
  onBooked,
  onBack,
}: {
  slot: { date: string; time: string };
  timeZone: string;
  booked: boolean;
  onBooked: () => void;
  onBack: () => void;
}) {
  const pathname = usePathname();
  const [step, setStep] = useState<Step>(0);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [website, setWebsite] = useState("");
  const [fieldError, setFieldError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const fieldRef = useRef<HTMLDivElement>(null);

  const s = contactForm.steps;
  const d = scheduleMeeting.details;
  const questions = [s.name.question, s.email.question, s.phone.question, d.messageQuestion];
  const when = useMemo(
    () => `${fmt(slot.date, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}, ${to12h(slot.time)} (${timeZone})`,
    [slot, timeZone],
  );

  const check = (at: Step): string | null => {
    if (at === 0) return form.name.trim().length >= 2 && isValidName(form.name) ? null : s.name.error;
    if (at === 1) return EMAIL_RE.test(form.email.trim()) ? null : s.email.error;
    if (at === 2) return form.phone.trim() && isValidPhone(form.phone) ? null : s.phone.error;
    return form.message.trim() ? null : d.messageError;
  };

  const focusField = () =>
    requestAnimationFrame(() => fieldRef.current?.querySelector<HTMLElement>("input:not([type=hidden]), select")?.focus());

  const back = () => {
    setFieldError(null);
    if (step === 0) return onBack();
    setStep((n) => (n - 1) as Step);
    focusField();
  };

  const submit = async () => {
    if (status === "sending") return;
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
      const res = await fetch(appPath("/api/v1/meeting/book"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, website, date: slot.date, time: slot.time, timeZone, sourcePath: pathname }),
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
      setStatus("idle");
      onBooked();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step < 3) {
      const err = check(step);
      setFieldError(err);
      if (err) return;
      setStep((n) => (n + 1) as Step);
      focusField();
    } else void submit();
  };

  const fieldId = `meeting-${["name", "email", "phone", "message"][step]}`;
  const describedBy = fieldError ? "meeting-step-error" : undefined;

  return (
    <form className={`${styles.channelCard} ${styles.formCard}`} onSubmit={onSubmit} noValidate>
      <CardHead icon={scheduleMeeting.icon} title={d.title} subtitle={when} />

      {booked ? (
        <div className={styles.stepBody}>
          <p className={styles.formSuccess} role="status">
            {scheduleMeeting.success}
          </p>
          <div className={styles.stepActions}>
            <button type="button" className={styles.stepBack} onClick={onBack}>
              ‹ {contactForm.back}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.stepBody}>
          <div className={styles.stepMeter} aria-hidden>
            {questions.map((q, i) => (
              <span key={q} className={i <= step ? styles.stepDotOn : styles.stepDot} />
            ))}
          </div>

          <label className={styles.stepQuestion} htmlFor={fieldId}>
            {questions[step]}
          </label>

          <div className={styles.stepField} ref={fieldRef}>
            {step === 0 && (
              <input
                id={fieldId}
                className={styles.textInput}
                type="text"
                autoComplete="name"
                placeholder={s.name.placeholder}
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={describedBy}
              />
            )}
            {step === 1 && (
              <input
                id={fieldId}
                className={styles.textInput}
                type="email"
                autoComplete="email"
                placeholder={s.email.placeholder}
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={describedBy}
              />
            )}
            {step === 2 && (
              <div className={styles.phoneWrap}>
                <PhoneField
                  id={fieldId}
                  value={form.phone}
                  placeholder={s.phone.placeholder}
                  onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                />
              </div>
            )}
            {step === 3 && (
              <input
                id={fieldId}
                className={styles.textInput}
                type="text"
                placeholder={d.messagePlaceholder}
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                aria-invalid={Boolean(fieldError)}
                aria-describedby={describedBy}
              />
            )}
          </div>

          {fieldError && (
            <p id="meeting-step-error" className={styles.fieldError} role="alert">
              {fieldError}
            </p>
          )}
          {status === "error" && error && (
            <p className={styles.formError} role="alert">
              {error}
            </p>
          )}

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

          <div className={styles.stepActions}>
            <button type="button" className={styles.stepBack} onClick={back}>
              ‹ {contactForm.back}
            </button>
            <button type="submit" className={styles.stepNext} disabled={status === "sending"}>
              {step < 3 ? `${contactForm.next} ›` : status === "sending" ? contactForm.sending : contactForm.submit}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
