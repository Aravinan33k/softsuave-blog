import 'server-only';
import { hash, verify, type Options } from '@node-rs/argon2';

// Argon2id parameters. Keep in sync with prisma/seed.ts.
// algorithm 2 = Argon2id (const enum value passed numerically for isolatedModules).
const ARGON2_OPTIONS: Options = {
  algorithm: 2,
  memoryCost: 19_456, // 19 MiB (OWASP-recommended floor)
  timeCost: 2,
  parallelism: 1,
};

export function hashPassword(plain: string): Promise<string> {
  return hash(plain, ARGON2_OPTIONS);
}

export async function verifyPassword(hashString: string, plain: string): Promise<boolean> {
  try {
    return await verify(hashString, plain, ARGON2_OPTIONS);
  } catch {
    // Malformed hash, etc. — treat as a failed verification, never throw.
    return false;
  }
}

// A real Argon2id hash, computed once, used to spend comparable CPU time when
// logging in an account that does not exist — keeps timing roughly constant to
// resist user enumeration.
let dummyHashPromise: Promise<string> | null = null;
function getDummyHash(): Promise<string> {
  dummyHashPromise ??= hash('softsuave-dummy-password-constant', ARGON2_OPTIONS);
  return dummyHashPromise;
}

/** Constant-ish-time dummy verify for unknown users (anti-enumeration). */
export async function verifyDummyPassword(plain: string): Promise<void> {
  try {
    await verify(await getDummyHash(), plain, ARGON2_OPTIONS);
  } catch {
    // Ignore — this exists purely to spend comparable CPU time.
  }
}
