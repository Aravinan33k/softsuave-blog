# Production image for self-hosting. Uses Debian slim (glibc) for reliable
# native modules (sharp, @node-rs/argon2). Migrations run on container start.
FROM node:22-slim AS builder
WORKDIR /app

# openssl: required by Prisma tooling.
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Install dependencies (cached unless lockfile changes).
COPY package.json package-lock.json ./
RUN npm ci

# Build. Placeholder env satisfies validation at build time (env.ts validates
# format only); real values are provided at runtime. Static pages that query the
# DB fall back gracefully when no database is reachable during build.
ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://placeholder:placeholder@localhost:5432/db?schema=public
ENV JWT_ACCESS_SECRET=build-placeholder-secret-000000000000
ENV JWT_REFRESH_SECRET=build-placeholder-secret-0000000000000
ENV PREVIEW_SECRET=build-placeholder-secret-0000000000000000
ENV REVALIDATE_SECRET=build-placeholder-secret-00000000000000
COPY . .
RUN npx prisma generate && npm run build

FROM node:22-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# openssl: required by `prisma migrate deploy` at container start.
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Copy the full app (kept simple so the Prisma CLI is available for migrations).
COPY --from=builder /app ./

EXPOSE 3000

# Apply migrations, then start. Provide env via docker-compose / --env-file.
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
