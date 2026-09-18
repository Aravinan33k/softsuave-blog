---
name: softsuave-marketing-page
description: Build or edit a page in the Soft Suave marketing surface — the cinematic dark "theme four" design language used by the homepage. Use when asked to create a landing page, marketing page, service/industry/solution page, or a new section for the homepage; when adding sections to src/app/(marketing)/ or src/components/home/; or when styling/animating anything that must match the Soft Suave homepage look. Covers the design tokens, type scale, section shells, GSAP/Lenis motion contract, image pipeline, and the basePath/CSP constraints.
---

# Soft Suave marketing pages ("theme four")

The marketing surface lives **inside the blog app** — one route group, no second
build. Read `docs/homepage/README.md` and `docs/homepage/BRAND.md` before large
work; `docs/homepage/DESIGN-THREE.md` is the design spec the shipped "four"
design evolved from.

## Aesthetic in one line

Premium, award-show **dark creative-agency** editorial: near-black `#040508`
canvas, oversized **ultralight Fraunces serif** display, tight Inter body,
wide-tracked uppercase **mono micro-labels**, a single hot coral accent, and
occasional full-viewport **light / cream inversion bands**. Motion-first and
cinematic — Lenis smooth scroll, GSAP ScrollTrigger, masked word reveals,
scrubbed clip-path wipes, count-ups, marquees. Never hypey; enterprise-credible
and outcome-focused.

## Where things live

| Concern | Path |
|---|---|
| Route group + layout (fonts, `.theme-four`, ScrollProvider) | `src/app/(marketing)/{layout,page}.tsx` |
| Theme tokens | `src/app/(marketing)/home.css` |
| Section components | `src/components/home/*.tsx` |
| All scoped styles (one 4.3k-line module) | `src/components/home/home.module.css` |
| Copy / content data | `src/lib/home/content.ts` |
| GSAP + plugin registration | `src/lib/home/gsap.ts` |
| Image manifest → generated manifest | `content/images.manifest.json` → `src/lib/home/images.generated.json` |
| Art, logo, hero video | `public/images/`, `public/brand/`, `public/videos/` |

## Routing (read this first)

- The app is mounted at **`basePath: '/blog'`** (`next.config.ts`). App route `/`
  is published at public `/blog`. A new page at
  `src/app/(marketing)/pricing/page.tsx` is served at **`/blog/pricing`**.
- Internal links stay root-relative (`/pricing`); `basePath` prefixes `<Link>`,
  router navigation, `next/image` and framework assets automatically.
- **Anything you write by hand does NOT get prefixed** — `fetch('/api/…')`,
  stored media URLs, plain `<img src>`. Route those through `appPath()` /
  `publicMediaUrl()` from `@/lib/media-url`.
- **Slug collision:** `src/app/[slug]/page.tsx` is the dynamic CMS page/post
  route. A static segment under `(marketing)` shadows it, so a new marketing
  route silently hides any CMS page with the same slug. Pick a slug that is not
  in the CMS.
- Section anchors: in-page `#id` links must be plain `<a href="#id">` so the
  Lenis handler in `ScrollProvider` intercepts them. Real routes use `next/link`.
  The root layout's skip link targets `#main`, so keep a `<main id="main">`.

## What the layout already gives you

`src/app/(marketing)/layout.tsx` wraps every page in the group with the three
`next/font` variables, the `.theme-four` class, and `<ScrollProvider>`. **A new
page in this group therefore inherits fonts, tokens and smooth scroll for
free.** Do not re-declare fonts, re-import `home.css`, or mount a second
ScrollProvider.

## Two surfaces: the homepage, and the landing pages

The marketing route group holds **two** design languages over one set of tokens.
Pick the right one before writing anything.

| | homepage (`/`) | landing pages |
|---|---|---|
| components | `src/components/home/*` | **`src/components/landing/*`** |
| styles | `home/home.module.css` | `landing/landing.module.css` |
| look | display-type marquees, pinned scenes, image galleries, cream inversion | static bordered panels, card grids, closed-border tables |
| typography | — | **the homepage's, verbatim** |

The landing surface is **layout-only divergence**: `.title` is `home.h2`,
`.kicker` is `home.eyebrow`, `.intro` is `home.lead`, `.btn`/`.btnPrimary` are
`home.pill`/`.pillFilled` — same values. Only the arrangement differs. So a
landing page reads as the same brand without re-using the homepage's set pieces.

**Any new service/solution/industry page is a landing page.** Do not rebuild
these sections — they are content-driven and reusable:

| component | content prop |
|---|---|
| `hero` | `HeroContent` — eyebrow, `titleLines` (last takes the accent), `body[]`, `points[]`, `badges[]`, `form{…}` |
| `overview` | `OverviewContent` — `paragraphs[]`, optional `pullQuote`, optional `image` |
| `services` | `ServicesContent` — `items[{name, body}]` |
| `industries`, `why-us` | `CardGridContent` — `items[{name, body}]` |
| `process` | `ProcessContent` — `steps[{n, name, body}]` |
| `case-studies` | `CaseStudiesContent` — `items[{key, tag, title, metricValue, metricLabel, year?}]` |
| `tech-stack` | `TechStackContent` — `groups[{name, items[]}]` |
| `faq` | `FaqContent` — `items[{q, a: string or string[], link?}]` |
| `cta-band` | `CtaBandContent` — mid-page conversion band |
| `final-cta` | `FinalCtaContent` — closing panel, links to `#enquiry` |
| `section-head` | props: `kicker`, `title`, `intro` — every section's masthead |

The hero carries the enquiry form (`id="enquiry"`); `final-cta` links back to it.
Both compose a `mailto:` because there is no leads endpoint — swap for a POST
through `appPath()` when one exists.

### Adding a landing page

1. Content module in `src/lib/home/<page>-content.ts`, typed against the prop
   types above — `import type { CardGridContent } from '@/components/landing/industries'`
   and so on. No JSX in copy.
2. `src/app/(marketing)/<slug>/page.tsx` — a **server** component (only those may
   export `metadata`), rendering `<Nav links={…} cta={…} logoHref={BASE_PATH || '/'} />`,
   a `<main id="main">` of shared sections with `content={…}`, then `<Footer />`.
3. Register the route in `src/lib/home/landing-pages.ts` — one line, and the
   sitemap picks it up.
4. Only build a bespoke component for a section the shared set genuinely lacks,
   and put its classes in `landing.module.css` so the next page can reuse them.
5. Wrap alternating sections in `home.module.css`'s `.light` for the band rhythm.

Section anchors the shared components default to: `#top`, `#overview`,
`#services`, `#journey`, `#industries`, `#why`, `#work`, `#tech`, `#faq`,
`#contact`, `#enquiry`.

## Design tokens (`.theme-four`, in `home.css`)

Brand — constant across everything:

```
--brand-coral #ff7a45   --brand-red #fb3b5c   --brand-500 #ff5436 (primary)
--brand-600  #f0402e    --brand-navy #1e293b  --brand-ink #0b1020
--brand-gradient: linear-gradient(135deg, #ff7a45 0%, #fb3b5c 100%)
```

Fonts — reference the aliases, never the raw `--font-*` vars:

```
--font-body           Inter            body / UI
--font-display-serif  Fraunces         display  (alias: --font-heading)
--font-mono-label     JetBrains Mono   micro-labels (alias: --font-eyebrow)
```

Dark surface (default):

```
--bg #040508  --surface #131415  --surface-2 #171717  --surface-3 #24262e
--text #d8d8d8  --text-bright #e8e8e8  --muted #9c9c9c  --line #434343
--accent var(--brand-500)  --accent-border var(--brand-red)
--cream #e6e4e2  --cream-line #d8d8d8
```

### Inversion bands — the core layout rhythm

Every component reads the semantic vars, so a band just **re-points them and
cascades**. No component markup changes.

- **`.light`** — warm-white band. Wrap sections at page level:
  `<div className={styles.light}><Services /></div>`. It sets
  `--bg #f8f6f3`, `--surface #eeebe5`, `--text #4a4842`, `--text-bright #17140f`,
  `--muted #6b6862`, `--line #ddd8cf`, `--accent #b8341a`,
  `--accent-border #c94327`.
- **`.cream`** — a single full-viewport hard-inversion *section* (`min-height:
  100vh`, `background: var(--cream)`, `color: #1b1a18`). This is the one
  dramatic contrast moment; do not scatter it.
- On light/cream surfaces swap `.eyebrow` → **`.eyebrowDark`**.

Alternate dark → light → dark so the page breathes; the homepage order is
hero(dark) · why(light) · work(dark) · services(light) · journey/industries(dark)
· story(cream) · awards/tech(dark) · testimonials(light) · contact(dark).

## Type & layout primitives (`home.module.css`)

| Class | Spec |
|---|---|
| `.page` | page root. Sets `--gutter: clamp(20px, 5vw, 90px)` and `overflow-x: clip` |
| `.section` | `padding: clamp(30px,3.6vw,58px) var(--gutter)` |
| `.sectionHead` | `max-width: 60rem; margin-bottom: clamp(26px,4vw,56px)` |
| `.eyebrow` / `.eyebrowDark` | mono, uppercase, `clamp(10px,.78vw,12px)`, `letter-spacing .28em`, `::before` 26px coral rule |
| `.h2` / `.statement` | Fraunces **300**, `clamp(2.25rem,4.6vw,4rem)`, `line-height 1.08`, `letter-spacing -.03em`, `var(--text-bright)` |
| `.lead` | `max-width 46ch`, `clamp(1.0625rem,1.4vw,1.25rem)`, `line-height 1.6`, `var(--muted)` |
| `.pill` / `.pillFilled` | `border-radius 999px`, `padding .85em 1.6em`, mono uppercase `letter-spacing .12em`; filled = coral on ink |
| `.srOnly` | visually-hidden text (rotating-word a11y, etc.) |

Rules of the type system: display is **ultralight serif, negative tracking**;
micro-labels are **mono, uppercase, wide tracking**; ordinals and counters are
**zero-padded** (`01`, `02`). Sizes are fluid `clamp()` — never fixed px for
type. The real breakpoint is **1000px** (desktop scene vs. mobile stack);
520/640/700/800/900 exist for minor reflow only.

### Section shell — copy this

```tsx
<section className={`${styles.section} ${styles.fooSection}`} id="foo">
  <div className={styles.sectionHead}>
    <span className={styles.eyebrow}>{foo.eyebrow}</span>
    <SplitReveal as="h2" className={styles.h2} type="words">{foo.title}</SplitReveal>
    <p className={styles.lead}>{foo.body}</p>
  </div>
  <div className={styles.fooBody} data-skew>{/* … */}</div>
</section>
```

## Reusable primitives (`src/components/home/`)

| Component | Use | Key props |
|---|---|---|
| `SplitReveal` | masked word/char reveal for every heading | `as`, `type: "words"\|"chars"`, `stagger` (.045–.05), `duration` .62, `ease` `expo.out`, `scrub` |
| `FadeUp` | fade + lift for paragraphs, cards, rows | `y` 32, `delay`, `start` `"top 88%"`, `duration` .8 |
| `Magnetic` | cursor-attracting wrapper for pill CTAs / nav | `strength` .4, `innerStrength` .15 — auto-disabled on coarse pointer + reduced motion |
| `Marquee` | infinite horizontal strip, pauses on hover | `speed`, `reverse`, `velocity`, `separator`; children must be an array |
| `BrandImage` | every photographic slot | `page="four"`, `id`, `fill`, `sizes`, `priority` |
| `HoldButton` | the prominent enquiry CTA | `label`, `doneLabel`, `onConfirm` |
| `Logo` | brand lockup | `tone="light"` on dark, `"dark"` on light; `size` = lockup height |
| `TechLogo` | inline SVG tech-brand marks | `name` |

Composed patterns worth reading before inventing one: `story-block.tsx`
(scrubbed clip-path panel wipe + image drift + pull-quote), `testimonials.tsx`
(stagger card grid), `awards.tsx` (dual counter-rotating marquees),
`stats.tsx` (odometer count-up), `services.tsx` (self-playing stacked-card
carousel with `gsap.matchMedia`), `hero.tsx` (video frame + rotating word).

## Motion contract — non-negotiable

1. **Import GSAP only from the barrel**, so plugins register exactly once:
   `import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";`
   Never `import { gsap } from "gsap"` and never call `registerPlugin` again.
2. Every animated component is `"use client"` and every effect runs inside
   `useGSAP(() => { … }, { scope: ref })` so cleanup is automatic.
3. **First line of every effect:** `if (prefersReducedMotion()) return;` — leave
   the static layout fully visible and readable. `home.css` also zeroes CSS
   animations under `prefers-reduced-motion`, but JS must opt out itself.
4. Vocabulary: eases `power2.out` / `power3.out` / `expo.out`, and `none` for
   anything scrubbed. Durations .3–.7 micro, .9–1.4 hero. Stagger .045–.12.
   Reveals `start: "top 85%"` (or 82–88%) with `once: true`; parallax
   `scrub: 0.6–1` over `start "top bottom"` → `end "bottom top"`.
5. `SplitType` instances must be reverted: `return () => split.revert();`
6. **`data-skew`** on a content block enrolls it in the global depth-parallax
   engine in `ScrollProvider` (optional `data-depth="0.75"`). Do not put it on
   anything inside a pinned horizontal scene. **`data-scrollfree`** marks a
   section whose internal scroll must stay free.
7. Late-loading media invalidates trigger positions — call
   `ScrollTrigger.refresh()` (e.g. video `onLoadedData`). ScrollProvider already
   refreshes on mount, fonts-ready, `load`, and resize.
8. Desktop-only scenes go behind `gsap.matchMedia().add("(min-width: 1000px)", …)`
   with a mobile fallback branch, not a media query alone.
9. `data-cursor="Label"` on interactive elements feeds the custom cursor. The
   cursor is **currently disabled** (commented out in `page.tsx`) — keep the
   attributes so re-enabling is one line.

## Images — no placeholders, ever

Photography comes from the Pexels pipeline, not inline URLs:

1. Add a slot per image to `content/images.manifest.json` under `images`:
   `{ id, page: "four", purpose, alt, orientation, width, height, keywords: [primary, broader, broader, generic] }`.
   Existing `page: "four"` ids: `hero`, `work-1…6`, `story`, `contact-bg`,
   `avatar-1…3`, `svc-<key>`, `ind-<key>`.
2. `npm run images:home` (needs `PEXELS_API_KEY` in `.env`) crops to the exact
   slot size, dedupes by photo id site-wide, writes `public/images/four/<id>.webp`
   plus a blurDataURL, and **fails loudly** rather than writing a placeholder.
   Generated files are committed, so normal builds never call Pexels.
3. Render with `<BrandImage page="four" id="…" />`.

Bundled art (logo, brand marks) goes in `public/brand` or `public/images` and
must be listed in `next.config.ts` → `images.localPatterns` **both bare and
`/blog`-prefixed**, or the optimizer 400s every request.

## Content model

Copy lives in `src/lib/home/content.ts` as `as const` exports, **not inline
JSX** — sections read from it. Follow the existing shape:

```ts
export const foo = {
  eyebrow: "Section Label",
  title: "Sentence-case headline that carries the promise",
  body: "One supporting sentence, outcome-focused.",
  items: [{ key: "slug", name: "Item", body: "…" }],
} as const;
```

`nav` and `footer` in the same file drive `Nav`/`Footer`. Tone: enterprise-
credible, confident, AI-forward but human — "we build practical AI that ships
and moves real business metrics."

## Hard constraints

- **CSP** (`next.config.ts`): `script-src 'self' 'unsafe-inline'`,
  `font-src 'self' data:`, `connect-src 'self'`. No CDN scripts, no `<link>` to
  Google Fonts, no external XHR. Fonts go through `next/font` (self-hosted at
  build). `img-src` does allow `https:`.
- **Nothing global.** All styles are scoped under `.theme-four` or the CSS
  module. Do not add bare `*` / `a` / `img` resets (Tailwind preflight already
  does them, and they would leak into the blog and admin). Do not re-import
  Tailwind in `home.css` — `app/globals.css` emits it once.
- `home.module.css` is one shared file, camelCase class names. Append a
  clearly-commented block per new section; do not reorganize it.
- `ChapterNav`'s `SECTIONS` array is hardcoded — a new **homepage** section needs
  an entry there (`{ id, label }`, ids must match the section `id`). A separate
  marketing page should ship its own chapter nav or none.
- `NEXT_PUBLIC_HOMEPAGE_ENABLED` is a build-time flag (`src/lib/flags.ts`) that
  still gates "home" links, breadcrumbs and the sitemap. It is currently
  **false**, so nav home links resolve to the external site even though the
  homepage is served. Flipping it needs a rebuild.

## Build a new page — recipe

1. Add copy to `src/lib/home/content.ts`.
2. Add image slots to `content/images.manifest.json`; run `npm run images:home`.
3. Create `src/app/(marketing)/<slug>/page.tsx` — `"use client"`, root
   `<div className={styles.page}>`, then `<Nav />`, `<main id="main">` with the
   sections, `<Footer />`. Wrap alternating sections in `styles.light`.
4. One component per section in `src/components/home/`, each `"use client"`,
   built from the section shell + primitives above.
5. Append that section's classes to `home.module.css` under a comment banner.
6. Give the route a `metadata` export (title + description + canonical) — the
   group layout's metadata is the homepage's. A `"use client"` page cannot export
   `metadata`, so put it in a sibling `layout.tsx` or keep the page a server
   component that renders client sections.
7. Verify: `npm run typecheck`, `npm run lint`, `npm test`, then check the page
   in the browser at `/blog/<slug>` — including with reduced motion on, below
   1000px, and in the light bands.

## Checklist before calling it done

- [ ] Renders correctly with `prefers-reduced-motion: reduce` — nothing hidden
- [ ] Mobile (<1000px) has a real layout, not a squeezed desktop scene
- [ ] Eyebrows switch to `.eyebrowDark` on every light/cream band
- [ ] All type uses `clamp()` and the token vars, no hardcoded hex or px type
- [ ] Every image goes through `BrandImage`, with real `alt` and `sizes`
- [ ] In-page anchors are plain `<a>`; cross-route links use `next/link`
- [ ] No new global CSS, no CDN asset, no `import { gsap } from "gsap"`
- [ ] `typecheck`, `lint` and `test` pass
