import { describe, expect, it } from 'vitest';

import {
  NAME_PATTERN,
  PHONE_PATTERN,
  emailError,
  isValidEmail,
  isValidName,
  isValidPhone,
  nameError,
  phoneError,
  requirementError,
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

describe('isValidPhone — a calling code and exactly ten digits', () => {
  it('takes ten digits, with or without the code the phone field adds', () => {
    for (const phone of ['+91 9876543210', '+1 5550001234', '+971 5012345678', '9876543210']) {
      expect(isValidPhone(phone), phone).toBe(true);
    }
  });

  it('rejects empty, short, long, and anything that is not digits', () => {
    for (const phone of [
      '',
      '   ',
      'abcdef', // the bug as filed
      '+91 987654321', // nine digits
      '+91 98765432101', // eleven
      '+91 98765 43210', // spaces inside the number
      '98765-43210',
      '(044) 4855 6789',
      '+91 98765abcde',
      'jane@company.com',
    ]) {
      expect(isValidPhone(phone), phone).toBe(false);
    }
  });

  it('says what is wrong', () => {
    expect(phoneError('')).toBe('Please enter your phone number.');
    expect(phoneError('+91 12345')).toBe('Please enter a 10-digit phone number.');
    expect(phoneError('+91 9876543210')).toBeNull();
  });
});

describe('isValidEmail', () => {
  it('takes ordinary work and personal addresses', () => {
    for (const email of ['jane@company.com', 'jane.doe+leads@mail.co.uk', 'j_d-1@sub.domain.io', '  jane@company.com  ']) {
      expect(isValidEmail(email), email).toBe(true);
    }
  });

  it('rejects what the browser lets through and plain mistakes', () => {
    for (const email of ['', 'jane', 'jane@', '@company.com', 'jane@company', 'jane@company.', 'jane@@company.com', 'jane..doe@company.com', '.jane@company.com', 'jane doe@company.com', 'jane@company.c', 'jane@-company.com']) {
      expect(isValidEmail(email), email).toBe(false);
    }
  });

  it('says what is wrong', () => {
    expect(emailError('')).toBe('Please enter your email address.');
    expect(emailError('jane@company')).toBe('Please enter a valid email address, e.g. name@company.com.');
  });
});

describe('nameError', () => {
  it('distinguishes empty, symbols and too short', () => {
    expect(nameError('')).toBe('Please enter your full name.');
    expect(nameError('Jane2')).toBe('Please use letters only — no numbers or symbols.');
    expect(nameError('J')).toBe('Please enter at least 2 letters.');
    expect(nameError('Jane Doe')).toBeNull();
    expect(nameError('A'.repeat(61))).toBe('Please keep your name under 60 characters.');
  });
});

describe('requirementError', () => {
  it('asks for a real description, within limits', () => {
    expect(requirementError('')).toBe('Please tell us about your requirements.');
    expect(requirementError('   ')).toBe('Please tell us about your requirements.');
    expect(requirementError('App')).toBe('Please add a little more detail (at least 10 characters).');
    expect(requirementError('A mobile app for our clinic bookings')).toBeNull();
    expect(requirementError('x'.repeat(2001))).toBe('Please keep it under 2000 characters.');
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
