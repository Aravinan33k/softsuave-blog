/**
 * Field rules for the marketing enquiry form.
 *
 * Shared deliberately: the form in `components/landing/hero.tsx` and the zod
 * schema behind `POST /api/v1/enquiry` (`lib/api/schemas.ts`) both read from
 * here, so the message a reader is shown while filling the form is the same
 * rule the server would have enforced. QA filed the two halves of the gap this
 * closes — a Full Name that took `12345` and a Phone that took letters
 * (BUG-008) — and the only way that stays fixed is one definition.
 *
 * No zod in this module on purpose: the form imports it into the browser
 * bundle, and these are plain predicates a `<input pattern>` can also carry.
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
 * A phone number is digits and the punctuation people write them with — the
 * leading `+`, spaces, dots, hyphens and brackets around an area code. No
 * country-specific shape: the form takes international numbers in whatever form
 * the reader writes them, and a stricter rule would reject real ones. Letters
 * are what it is here to exclude.
 */
export const PHONE_PATTERN = "[+\\d\\(][\\d\\s\\(\\)\\.\\-]*";

const nameRe = new RegExp(`^${NAME_PATTERN}$`, "u");
const phoneRe = new RegExp(`^${PHONE_PATTERN}$`, "u");
const letters = /\p{L}/gu;

/** Shortest and longest national number E.164 allows, so the digit count rules
 *  out a mistyped fragment without guessing at a country. */
const PHONE_MIN_DIGITS = 7;
const PHONE_MAX_DIGITS = 15;

export const NAME_MESSAGE = "Please enter your name using letters only.";
export const PHONE_MESSAGE = "Please enter a valid phone number — digits, spaces and + ( ) - only.";

/** Hint text for the fields' `title`, which is what a browser appends to its
 *  own "match the requested format" bubble when `pattern` fails. */
export const NAME_HINT = "Letters, spaces, hyphens and apostrophes only.";
export const PHONE_HINT = "Digits, spaces and + ( ) - only.";

/** True for a name that is at least two letters and carries no digits. */
export function isValidName(value: string): boolean {
  const v = value.trim();
  if (!nameRe.test(v)) return false;
  return (v.match(letters)?.length ?? 0) >= 2;
}

/** True for an empty value — the field is optional — or a plausible number. */
export function isValidPhone(value: string): boolean {
  const v = value.trim();
  if (!v) return true;
  if (!phoneRe.test(v)) return false;
  const digits = v.replace(/\D/g, "").length;
  return digits >= PHONE_MIN_DIGITS && digits <= PHONE_MAX_DIGITS;
}
