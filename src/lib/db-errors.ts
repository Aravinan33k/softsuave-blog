/**
 * Thrown by the stand-in database client when DATABASE_URL is unset (the
 * no-database mode — see lib/env.ts). Kept apart from lib/db.ts so code that
 * only needs to RECOGNISE the error (lib/http.ts) does not pull in Prisma.
 */
export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super('No database is configured (DATABASE_URL is unset).');
    this.name = 'DatabaseNotConfiguredError';
  }
}

export function isDatabaseNotConfigured(err: unknown): err is DatabaseNotConfiguredError {
  return err instanceof Error && err.name === 'DatabaseNotConfiguredError';
}
