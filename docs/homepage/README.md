# Marketing homepage

The Soft Suave marketing homepage served at `/`. It began life as a standalone Next.js app
(`ss-site-main`) containing three landing-page design studies; the shipped design — "four", a
cinematic/award-show evolution of `DESIGN-THREE.md` — was merged into this application. There is
no second app, package.json or build: it is one route group inside the blog.

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
