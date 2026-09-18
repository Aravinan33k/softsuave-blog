import { describe, expect, it } from 'vitest';

import {
  NAME_PATTERN,
  PHONE_PATTERN,
  isValidName,
  isValidPhone,
} from './enquiry-rules';

/**
 * QA filed the enquiry form as accepting a Full Name of `12345` and a Phone of
 * `abcdef` (BUG-008). The fix is only worth anything if it holds on both sides
 * of the wire, so what is pinned here is the predicate pair itself — the form
 * and the zod schema behind `POST /api/v1/enquiry` both import these, and a
 * regression in either shows up as a failure here rather than as a lead.
 *
 * The permissive cases matter as much as the rejections: a name rule that only
 * knows ASCII, or a phone rule that only knows one country's format, turns a
 * validation fix into a conversion bug for everyone it cannot spell.
 */
describe('isValidName', () => {
  it('takes ordinary names, including ones this codebase is not written in', () => {
    for (const name of [
      'Jane Doe',
      'Li',
      "O'Neill",
      'Anne-Marie Blanc',
      'J. R. Hartley',
      'José Ramírez',
      'Müller',
      'Åkesson',
      '田中 太郎',
      'Нина Петрова',
    ]) {
      expect(isValidName(name), name).toBe(true);
    }
  });

  it('rejects the reported case and its neighbours', () => {
    for (const name of [
      '12345', // the bug as filed
      'Jane2',
      '2Jane',
      'J', // a single letter is a typo, not a name
      '',
      '   ',
      '!!!',
      '<script>alert(1)</script>',
      '+44 7700 900000', // a phone number in the name field
    ]) {
      expect(isValidName(name), name).toBe(false);
    }
  });

  it('ignores surrounding whitespace rather than failing on it', () => {
    expect(isValidName('  Jane Doe  ')).toBe(true);
  });
});

describe('isValidPhone', () => {
  it('is optional — an empty value is valid', () => {
    expect(isValidPhone('')).toBe(true);
    expect(isValidPhone('   ')).toBe(true);
  });

  it('takes international numbers in the shapes people write them', () => {
    for (const phone of [
      '+1 555 000 1234',
      '+44 7700 900000',
      '+91 98765 43210',
      '(044) 4855 6789',
      '044-4855-6789',
      '9876543210',
      '+1.555.000.1234',
    ]) {
      expect(isValidPhone(phone), phone).toBe(true);
    }
  });

  it('rejects the reported case and lengths no number has', () => {
    for (const phone of [
      'abcdef', // the bug as filed
      '555 CALL NOW',
      '+44 7700 90000x',
      '12345', // too few digits to be a number
      '1234567890123456', // more digits than E.164 allows
      'jane@company.com',
    ]) {
      expect(isValidPhone(phone), phone).toBe(false);
    }
  });
});

/**
 * The same two pattern strings are handed to the inputs' `pattern` attribute,
 * which a browser compiles with the `v` flag. A class member that is legal
 * under `u` but not `v` would throw there and silently take the browser-side
 * half of the validation with it, so both flags are exercised here.
 */
describe('patterns compile for an HTML pattern attribute', () => {
  it('are valid under both the u and v flags', () => {
    for (const source of [NAME_PATTERN, PHONE_PATTERN]) {
      for (const flags of ['u', 'v']) {
        expect(() => new RegExp(`^${source}$`, flags), `${source} /${flags}`).not.toThrow();
      }
    }
  });
});
