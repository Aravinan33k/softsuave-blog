import { defineConfig } from 'vitest/config';
import path from 'node:path';

const root = import.meta.dirname;

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    // Env for modules that validate process.env at import time (src/lib/env.ts).
    env: {
      NODE_ENV: 'test',
      DATABASE_URL: 'postgresql://blog:blog@localhost:5433/softsuave_blog?schema=public',
      JWT_ACCESS_SECRET: 'test-access-secret-0000000000000000',
      JWT_REFRESH_SECRET: 'test-refresh-secret-000000000000000',
      PREVIEW_SECRET: 'test-preview-secret-000000000000000',
      REVALIDATE_SECRET: 'test-revalidate-secret-0000000000000',
    },
  },
  resolve: {
    alias: {
      // `server-only`/`client-only` throw outside their bundler context; stub them.
      'server-only': path.resolve(root, 'tests/stubs/empty.ts'),
      'client-only': path.resolve(root, 'tests/stubs/empty.ts'),
      '@': path.resolve(root, 'src'),
    },
  },
});
