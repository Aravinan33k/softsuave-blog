import { describe, it, expect } from 'vitest';
import { hashPassword, verifyPassword } from './password';

describe('password hashing (Argon2id)', () => {
  it('verifies the correct password', async () => {
    const hash = await hashPassword('Secret!123');
    expect(hash).toMatch(/^\$argon2id\$/);
    expect(await verifyPassword(hash, 'Secret!123')).toBe(true);
  }, 15_000);

  it('rejects a wrong password', async () => {
    const hash = await hashPassword('Secret!123');
    expect(await verifyPassword(hash, 'wrong')).toBe(false);
  }, 15_000);

  it('returns false for a malformed hash instead of throwing', async () => {
    expect(await verifyPassword('not-a-hash', 'x')).toBe(false);
  });
});
