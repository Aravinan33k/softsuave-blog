# Marketing homepage

The Soft Suave marketing homepage served at `/`. It began life as a standalone Next.js app
(`ss-site-main`) containing three landing-page design studies; the shipped design — "four", a
cinematic/award-show evolution of `DESIGN-THREE.md` — was merged into this application. There is
no second app, package.json or build: it is one route group inside the blog.

## Release state: not served yet

The blog and the homepage share one codebase but ship on different dates — the blog goes out
first, the homepage a release later. `NEXT_PUBLIC_HOMEPAGE_ENABLED` decides which of the two the
deployment actually serves. **Nothing here is deleted or excluded from the build**: the homepage
compiles, typechecks and tests on every commit either way. It is only reachable when the flag is on.

| | `NEXT_PUBLIC_HOMEPAGE_ENABLED` unset / `false` | `=true` |
|---|---|---|
| `/` | 307 → `/blog` (`next.config.ts` `redirects()`) | the homepage |
| `/blog` and every post | unchanged | unchanged |
| `/` in `sitemap.xml` | omitted | listed |
| "Home" breadcrumb (visible + JSON-LD) | dropped, or points at `www.softsuave.com` | points at `/` |
| Header logo, footer links | `www.softsuave.com` | `/` |
| Admin "View site" | `/blog` | `/` |

Two things to keep in mind:

- **The redirect is a 307, never a 301.** A permanent redirect is cached indefinitely by browsers
  and search engines, so it would keep sending visitors to `/blog` long after the homepage went
  live — exactly the outcome this staging exists to avoid.
- **The flag is `NEXT_PUBLIC_*`, so it is baked in at build time.** Changing it in a runtime
  environment does nothing; taking the homepage live means rebuilding. For Docker that is
  `--build-arg NEXT_PUBLIC_HOMEPAGE_ENABLED=true` (see `Dockerfile` / `docker-compose.yml`).

Going live is therefore a one-variable change plus a rebuild, with no code moved back. The flag
lives in `src/lib/flags.ts`; `src/themes/softsuave/nav-data.test.ts` covers both states.

## Where the code lives

| Concern | Path |
|---|---|
| Route + layout (fonts, theme wrapper, metadata) | `src/app/(marketing)/{page,layout}.tsx` |
| Theme tokens (`.theme-four`) | `src/app/(marketing)/home.css` |
| Section components | `src/components/home/*.tsx` |
| Scoped styles | `src/components/home/home.module.css` |
| Copy / content data | `src/lib/home/content.ts` |
| GSAP + plugin registration | `src/lib/home/gsap.ts` |
| Generated image manifest + accessor | `src/lib/home/images.{ts,generated.json}` |
| Art, logo, hero video | `public/images/`, `public/brand/`, `public/videos/` |

Motion stack: GSAP ScrollTrigger + `@gsap/react`, `SplitType` for line splitting, and Lenis
smooth scroll (`ScrollProvider`). `prefers-reduced-motion` is respected throughout.

## Isolation

The homepage is wrapped in `.theme-four`, which redefines the semantic CSS variables (`--bg`,
`--surface`, `--text`, `--accent`, fonts). Both that stylesheet and the three display fonts
(Inter / Fraunces / JetBrains Mono) are declared in `src/app/(marketing)/layout.tsx`, so Next
ships them only with this route — the blog and admin keep the root layout's Lato / PT Serif and
the shadcn palette, and pay for neither. Nothing here is global: the upstream app's bare `*`,
`a` and `img` resets were either dropped (Tailwind's preflight already does them) or scoped to
`.theme-four`.

## Image pipeline (Pexels — no placeholders)

- `content/images.manifest.json` lists every image slot per design: id, purpose, alt,
  orientation, width, height, and keyword tiers (primary → broader → generic on-brand).
- `npm run images:home` (`scripts/generate-home-images.mjs`) queries Pexels per slot, falls back
  down the keyword tiers, dedupes by photo id across all slots, crops to the exact slot size with
  `sharp`, writes `public/images/<page>/<id>.webp` plus a `blurDataURL`, caches API responses in
  `.cache/pexels`, and skips already-downloaded slots. If a slot can't be filled it fails loudly
  rather than writing a placeholder. Needs `PEXELS_API_KEY` in `.env`.
- Output: `src/lib/home/images.generated.json`, read through `BrandImage` (`next/image` with
  correct `sizes`, blur-up, and `priority` on heroes). The generated files are committed, so a
  normal build never calls Pexels.
- `next.config.ts` must keep `/images/**` and `/brand/**` in `images.localPatterns`, or the
  optimizer 400s every homepage image.

## Design specs

`BRAND.md` holds the brand tokens. `DESIGN-ONE.md`, `DESIGN-TWO.md` and `DESIGN-THREE.md` are the
original specs for the three design studies — kept for reference. Only the "four" evolution of
DESIGN-THREE ships; the file paths those documents mention are the standalone app's, not this
repo's (see the table above). `public/images/{one,two,three}/` still holds their art.

## Attribution

Photography via [Pexels](https://www.pexels.com). Per-photo photographer and source URL are
stored in `src/lib/home/images.generated.json`.
