"use client";

import { useEffect, useRef, useState } from "react";
import { PHONE_HINT, PHONE_PATTERN } from "@/lib/forms/enquiry-rules";
import { DEFAULT_DIAL, DIAL_CODES, detectDialCode, splitPhone } from "@/lib/forms/dial-codes";
import fx from "./enquiry-form.module.css";

/**
 * The enquiry form's phone control: a country calling code beside the number.
 *
 * Shared rather than inlined because there were two copies of this field —
 * `components/landing/hero.tsx` and `components/generative-ai/hero.tsx` — and
 * a change made to one of them was a change the other silently missed.
 *
 * ## the value contract
 * The parent keeps ONE string, exactly as before: this emits
 * `"+91 98765 43210"`, the server stores it whole, and neither
 * `lib/api/schemas.ts` nor the Prisma model changed. The code is split out for
 * display only. `PHONE_PATTERN` already admits a leading `+` and the digit
 * count is checked across the whole string, so the shared validation in
 * `enquiry-rules.ts` covers the combined value untouched.
 *
 * An empty number emits `""`, not a bare `"+91"` — the field is optional, and
 * a lead row holding nothing but a country code would read as a number we
 * failed to capture rather than one that was never given.
 *
 * ## the code is a guess, and says so by being changeable
 * The select is a real, always-enabled control, not a display of a detected
 * value. `detectDialCode` only ever supplies its INITIAL setting, and only
 * while the reader has not touched it — a VPN, a work laptop bought abroad or
 * a traveller all defeat any detection method there is, so the override is the
 * feature and the guess is the convenience.
 */
export default function PhoneField({
  id,
  value,
  onChange,
  name = "phone",
  placeholder = "98765 43210",
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  placeholder?: string;
}) {
  const [dial, setDial] = useState(DEFAULT_DIAL);
  const [national, setNational] = useState(() => splitPhone(value).national);
  /** Set once the reader picks a code themselves, so detection can't overrule them. */
  const chosen = useRef(false);

  // Detection runs after mount and never during render: these pages are
  // static/ISR, so the server has no timezone to read and guessing during
  // render would mean hydrating a bar the server could not have produced.
  useEffect(() => {
    if (chosen.current) return;
    setDial(detectDialCode());
  }, []);

  /**
   * The last value this field itself produced, so a change it did NOT make can
   * be told apart from an echo of its own. State and not a ref: this is read
   * during render, which is exactly what a ref may not be used for.
   */
  const [emitted, setEmitted] = useState(value);

  // The parent clears `phone` on a successful submit, and the number the
  // reader just sent would otherwise sit on in the emptied form. Adjusted
  // during render rather than in an effect — React's own pattern for state
  // derived from a changed prop, resolved in the same pass instead of
  // painting the stale number first and correcting it after
  // (react.dev/reference/react/useState#storing-information-from-previous-renders).
  //
  // `emit` records what it sent, so this only ever fires for a change that
  // came from OUTSIDE. Without that, every keystroke would be re-split and a
  // reader typing their own "+44" would watch the field eat the code.
  if (value !== emitted) {
    setEmitted(value);
    setNational(splitPhone(value).national);
  }

  const emit = (nextDial: string, nextNational: string) => {
    const trimmed = nextNational.trim();
    // A reader who types their own "+" has given a complete international
    // number; prefixing the select's code onto it would produce "+91 +44 …".
    const next = !trimmed ? "" : trimmed.startsWith("+") ? trimmed : `${nextDial} ${trimmed}`;
    // Both updates land in one batch with the parent's, so the render that
    // sees the new `value` also sees it recorded here.
    setEmitted(next);
    onChange(next);
  };

  return (
    <div className={fx.phoneRow}>
      <span className={fx.dialWrap}>
        <select
          className={fx.dialSelect}
          value={dial}
          aria-label="Country calling code"
          onChange={(e) => {
            chosen.current = true;
            setDial(e.target.value);
            emit(e.target.value, national);
          }}
        >
          {DIAL_CODES.map((c) => (
            // `iso` as the key and `dial` as the value: +1 alone is eight
            // countries, so the code cannot identify the option.
            <option key={c.iso} value={c.dial}>
              {c.name} ({c.dial})
            </option>
          ))}
        </select>
        {/* The select paints its selected option's whole text, which at
            "United Arab Emirates (+971)" is wider than the number beside it.
            So the real control sits transparent on top and this span paints
            just the code — the select keeps every bit of its native keyboard,
            screen-reader and mobile-picker behaviour, and the focus ring is
            carried across by the sibling rule in the stylesheet. */}
        <span className={fx.dialValue} aria-hidden>
          {dial}
          <svg viewBox="0 0 10 6" className={fx.dialCaret} aria-hidden>
            <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </span>

      {/* The visible input holds the national part alone, so it deliberately
          carries NO name — a `FormData` read of it would hand the server
          "98765 43210" with the country silently dropped. This hidden field is
          the one named `phone`, and it carries the whole number. The two
          controlled forms build their payload from React state and are
          unaffected either way; this is what makes the field correct in a form
          that is read from the DOM instead. */}
      <input type="hidden" name={name} value={value} readOnly />

      <input
        id={id}
        className={fx.input}
        type="tel"
        autoComplete="tel-national"
        inputMode="tel"
        pattern={PHONE_PATTERN}
        title={PHONE_HINT}
        value={national}
        onChange={(e) => {
          setNational(e.target.value);
          emit(dial, e.target.value);
        }}
        placeholder={placeholder}
      />
    </div>
  );
}
