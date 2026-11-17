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

# Release flags are NEXT_PUBLIC_*, so they are compiled into the bundle here and
# cannot be changed by the runtime environment — taking the marketing homepage
# live means rebuilding with `--build-arg NEXT_PUBLIC_HOMEPAGE_ENABLED=true`.
# Omitted means off: the blog ships, "/" redirects to /blog.
ARG NEXT_PUBLIC_HOMEPAGE_ENABLED=false
ENV NEXT_PUBLIC_HOMEPAGE_ENABLED=${NEXT_PUBLIC_HOMEPAGE_ENABLED}

# Also NEXT_PUBLIC_*, so it must be present at BUILD time — providing it only via
# the runtime env is too late: statically prerendered pages bake their canonical,
# OG and sitemap URLs from it, and the schema default would ship localhost.
# The bare origin — this app owns the whole site, so no mount subpath:
#   --build-arg NEXT_PUBLIC_SITE_URL=https://www.softsuave.com
ARG NEXT_PUBLIC_SITE_URL=https://www.softsuave.com
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

# Search indexing, also baked in at build time: every page's robots meta is
# prerendered from it. Omitted means noindex, nofollow everywhere (right for the
# test box, wrong for production). The www.softsuave.com build must pass
#   --build-arg NEXT_PUBLIC_ALLOW_INDEXING=true
ARG NEXT_PUBLIC_ALLOW_INDEXING=false
ENV NEXT_PUBLIC_ALLOW_INDEXING=${NEXT_PUBLIC_ALLOW_INDEXING}

# GTM container ("off" disables it; empty means the default GTM-TWMFSDC) and its
# loading mode (empty means the stock snippet in <head>; "deferred" is opt-in).
ARG NEXT_PUBLIC_GTM_ID=
ENV NEXT_PUBLIC_GTM_ID=${NEXT_PUBLIC_GTM_ID}
ARG NEXT_PUBLIC_GTM_LOAD=
ENV NEXT_PUBLIC_GTM_LOAD=${NEXT_PUBLIC_GTM_LOAD}

# Static-generation workers (next.config.ts). The default 2 suits a small build
# box; set 1 where the builder has little memory, more on a large CI runner.
ARG NEXT_BUILD_CPUS=2
ENV NEXT_BUILD_CPUS=${NEXT_BUILD_CPUS}
ENV DATABASE_URL=mysql://placeholder:placeholder@localhost:3306/db
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
