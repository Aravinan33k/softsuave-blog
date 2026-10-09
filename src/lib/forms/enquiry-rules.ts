/**
 * Field rules for every lead form on the site — the enquiry card on each
 * marketing page (`components/common/enquiry-form.tsx`) and the two /contact
 * forms — and for the API that receives them.
 *
 * Shared deliberately: each form validates in the browser with these, and the
 * zod schemas behind `POST /api/v1/enquiry` and `/api/v1/meeting/book` refine
 * with the same predicates, so the message a reader is shown while filling a
 * form is the rule the server enforces. QA filed the two halves of the gap this
 * closed — a Full Name that took `12345` and a Phone that took letters
 * (BUG-008) — and the only way that stays fixed is one definition.
 *
 * Each field has an `…Error(value)` that returns the message to show under the
 * field, or null when the value is fine; the `isValid…` predicates are those
 * same checks as booleans, for the schemas.
 *
 * No zod in this module on purpose: the forms import it into the browser
 * bundle, and these are plain functions a `<input pattern>` can partly mirror.
 *
 * Both patterns are written to compile under the RegExp `u` AND `v` flags —
 * every syntax character inside a class is escaped — because that is what an
 * HTML `pattern` attribute is compiled with, and the same source string is used
 * for both the attribute and the RegExp below.
 */

/**
 * A name starts with a letter and continues with letters, the combining marks
 * that belong to them, and the four separators real names use: space, hyphen,
 * apostrophe (straight or curly) and a period after an initial. `\p{L}` rather
 * than `A-Za-z` — "Ramírez", "Müller" and "Åkesson" are names, and an ASCII
 * rule would reject a large share of the people this form is for. Digits are
 * what it is here to exclude.
 */
export const NAME_PATTERN = "\\p{L}[\\p{L}\\p{M}'’\\.\\- ]*";

/**
 * The national number: exactly ten digits, nothing else (7 Oct: "strict 10
 * digit validation"). The country calling code is chosen separately, beside
 * it, so the reader never types a `+`, spaces or dashes here.
 */
export const PHONE_DIGITS = 10;
export const PHONE_PATTERN = "\\d{10}";

export const NAME_MAX = 60;
export const EMAIL_MAX = 254;
export const REQUIREMENT_MIN = 10;
export const REQUIREMENT_MAX = 2000;

const nameRe = new RegExp(`^${NAME_PATTERN}$`, "u");
const letters = /\p{L}/gu;

/**
 * An address the mail server will actually accept: a local part of the usual
 * characters, an @, then a domain of dot-separated labels ending in a
 * letters-only TLD of two or more ("name@company.com", "a.b+c@mail.co.uk").
 * Rejects the shapes the browser's own `type=email` lets through — no TLD
 * ("jane@company"), a trailing dot, doubled dots, spaces.
 */
const emailRe =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

/** The country code and the ten digits, as `PhoneField` emits them: "+91 9876543210". */
const fullPhoneRe = /^\+\d{1,4} \d{10}$/;

export const NAME_MESSAGE = "Please use letters only — no numbers or symbols.";
export const EMAIL_MESSAGE = "Please enter a valid email address, e.g. name@company.com.";
export const PHONE_MESSAGE = "Please enter a 10-digit phone number.";

/** Hint text for the fields' `title`, which a browser shows on hover. */
export const NAME_HINT = "Letters, spaces, hyphens and apostrophes only.";
export const PHONE_HINT = "10 digits, numbers only.";

/** The message for a Full Name value, or null when it is fine. */
export function nameError(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please enter your full name.";
  if (!nameRe.test(v)) return NAME_MESSAGE;
  if ((v.match(letters)?.length ?? 0) < 2) return "Please enter at least 2 letters.";
  if (v.length > NAME_MAX) return `Please keep your name under ${NAME_MAX} characters.`;
  return null;
}

/** The message for an email value, or null when it is fine. */
export function emailError(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please enter your email address.";
  if (v.length > EMAIL_MAX || !emailRe.test(v)) return EMAIL_MESSAGE;
  return null;
}

/**
 * The message for a phone value, or null when it is fine. Takes the field's
 * whole value ("+91 9876543210", which is what `PhoneField` emits and the
 * server stores) or the ten digits alone.
 */
export function phoneError(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please enter your phone number.";
  if (fullPhoneRe.test(v) || new RegExp(`^${PHONE_PATTERN}$`).test(v)) return null;
  return PHONE_MESSAGE;
}

/** The message for a requirement / message box, or null when it is fine. */
export function requirementError(value: string): string | null {
  const v = value.trim();
  if (!v) return "Please tell us about your requirements.";
  if (v.length < REQUIREMENT_MIN) return `Please add a little more detail (at least ${REQUIREMENT_MIN} characters).`;
  if (v.length > REQUIREMENT_MAX) return `Please keep it under ${REQUIREMENT_MAX} characters.`;
  return null;
}

/** True for a name that is at least two letters and carries no digits. */
export function isValidName(value: string): boolean {
  return nameError(value) === null;
}

/** True for a country code and exactly ten digits. Empty is not valid. */
export function isValidPhone(value: string): boolean {
  return phoneError(value) === null;
}

/** True for a well-formed email address. */
export function isValidEmail(value: string): boolean {
  return emailError(value) === null;
}
