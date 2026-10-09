import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  DEFAULT_DIAL,
  DIAL_CODES,
  TZ_COUNTRY,
  detectDialCode,
  dialForCountry,
  splitPhone,
} from './dial-codes';

/**
 * The phone field guesses a country calling code from the browser's timezone
 * and lets the reader override it. Two things can quietly break that and cost
 * a lead rather than raise an error:
 *
 *   - a timezone mapped to a country the code list does not carry, which
 *     silently downgrades a correct guess to the India default;
 *   - `splitPhone` matching the wrong code, which shows a returning reader a
 *     number with its first digits missing.
 *
 * Both are pinned here. `isValidPhone` is NOT re-tested — the combined value
 * this field emits goes through the same predicate as before, and that pair is
 * covered in `enquiry-rules.test.ts`.
 */

describe('DIAL_CODES', () => {
  it('gives every country an E.164 code and a unique ISO', () => {
    const seen = new Set<string>();
    for (const c of DIAL_CODES) {
      expect(c.dial, c.name).toMatch(/^\+\d{1,4}$/);
      expect(c.iso, c.name).toMatch(/^[A-Z]{2}$/);
      expect(seen.has(c.iso), `duplicate ISO ${c.iso}`).toBe(false);
      seen.add(c.iso);
    }
  });

  it('lists countries alphabetically, which is what the select promises', () => {
    const names = DIAL_CODES.map((c) => c.name);
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  it('carries the default', () => {
    expect(dialForCountry('IN')).toBe(DEFAULT_DIAL);
  });
});

describe('TZ_COUNTRY', () => {
  // The failure this catches is invisible in the UI: the zone resolves, the
  // country has no entry, and the reader silently gets +91 instead.
  it('maps every zone to a country the code list carries', () => {
    for (const [zone, iso] of Object.entries(TZ_COUNTRY)) {
      expect(dialForCountry(iso), `${zone} -> ${iso}`).not.toBeNull();
    }
  });

  it('keeps the aliases browsers still report', () => {
    expect(TZ_COUNTRY['Asia/Calcutta']).toBe('IN');
    expect(TZ_COUNTRY['Asia/Kolkata']).toBe('IN');
    expect(TZ_COUNTRY['Europe/Kiev']).toBe('UA');
    expect(TZ_COUNTRY['Asia/Saigon']).toBe('VN');
  });
});

describe('splitPhone', () => {
  // The list files every NANP country under a bare +1, so a Trinidad number
  // keeps its area code in the national part. That is the right split for a
  // reader who picked "Trinidad and Tobago (+1)" from the select.
  it('keeps the area code of a shared +1 with the number', () => {
    expect(splitPhone('+1 868 620 1234')).toEqual({ dial: '+1', national: '868 620 1234' });
  });

  // `splitPhone` resolves ties by taking the longest match, which nothing in
  // the list currently exercises — no code is a prefix of another. Pinned so
  // that an entry which DOES collide (a +1868 filed separately, say) is a
  // failure here rather than a number displayed with its first digits eaten.
  it('has no code that prefixes another, which is what makes the split exact', () => {
    const codes = DIAL_CODES.map((c) => c.dial);
    for (const a of codes) {
      for (const b of codes) {
        if (a !== b && b.startsWith(a)) {
          throw new Error(`${a} prefixes ${b}; splitPhone must be re-checked`);
        }
      }
    }
  });

  it('round-trips what the field emits', () => {
    expect(splitPhone('+91 98765 43210')).toEqual({ dial: '+91', national: '98765 43210' });
    expect(splitPhone('+44 20 7946 0000')).toEqual({ dial: '+44', national: '20 7946 0000' });
  });

  it('leaves a number with no code alone', () => {
    expect(splitPhone('98765 43210')).toEqual({ dial: '', national: '98765 43210' });
    expect(splitPhone('')).toEqual({ dial: '', national: '' });
  });

  it('does not invent a code for a + it cannot place', () => {
    expect(splitPhone('+999 123 4567')).toEqual({ dial: '', national: '+999 123 4567' });
  });
});

describe('detectDialCode', () => {
  // `{ ...Intl }` would copy nothing — the namespace's members are
  // non-enumerable — and the locale fallback would then look broken because
  // `Intl.Locale` had gone missing from the stub rather than from the browser.
  const { Locale } = Intl;

  const withEnv = (timeZone: string, language: string) => {
    vi.stubGlobal('Intl', {
      Locale,
      DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone }) }),
    });
    vi.stubGlobal('navigator', { language });
  };

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('reads the timezone first', () => {
    withEnv('Europe/London', 'en-US');
    expect(detectDialCode()).toBe('+44');
  });

  it('falls back to the locale region when the zone is not in the table', () => {
    withEnv('Antarctica/Troll', 'de-DE');
    expect(detectDialCode()).toBe('+49');
  });

  it('falls back to the default when neither signal resolves', () => {
    withEnv('Antarctica/Troll', '');
    expect(detectDialCode()).toBe(DEFAULT_DIAL);
  });

  it('survives a browser that throws on either API', () => {
    vi.stubGlobal('Intl', {
      Locale,
      DateTimeFormat: () => {
        throw new Error('no Intl');
      },
    });
    vi.stubGlobal('navigator', { language: 'en-IN' });
    expect(detectDialCode()).toBe('+91');
  });
});
