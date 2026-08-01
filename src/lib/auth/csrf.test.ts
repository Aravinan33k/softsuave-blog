import { describe, it, expect } from 'vitest';
import type { NextRequest } from 'next/server';
import { verifyCsrf } from './csrf';

function fakeReq(cookie?: string, header?: string): NextRequest {
  return {
    cookies: { get: (n: string) => (n === 'sb_csrf' && cookie ? { value: cookie } : undefined) },
    headers: { get: (n: string) => (n === 'x-csrf-token' ? header ?? null : null) },
  } as unknown as NextRequest;
}

describe('verifyCsrf', () => {
  it('passes when cookie and header match', () => expect(verifyCsrf(fakeReq('abc', 'abc'))).toBe(true));
  it('fails on mismatch', () => expect(verifyCsrf(fakeReq('abc', 'xyz'))).toBe(false));
  it('fails when the header is missing', () => expect(verifyCsrf(fakeReq('abc', undefined))).toBe(false));
  it('fails when the cookie is missing', () => expect(verifyCsrf(fakeReq(undefined, 'abc'))).toBe(false));
});
