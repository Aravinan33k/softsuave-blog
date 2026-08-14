# DESIGN-ONE.md — `/one` (inspiration: sanjaya.framer.ai)

**Aesthetic in one line:** dark, minimal, engineered B2B/AI aesthetic — near-black canvas,
white→gray monochrome type, sharp 0-radius geometry, hairline borders, a single accent spark
(inspiration = electric green `#00ff51`; **we replace it with Soft Suave coral `#FF5436`**).
Motion is slow, spring-based, and buttery (Framer Motion appear reveals + Lenis smooth scroll +
pinned/masked scroll sequences). Reads premium, calm, confident — not flashy.

---

## 1. Colors (dark monochrome + coral accent)
| Role | Value |
|---|---|
| Page background | `#010004` (near-black, faint blue) |
| Surface / card | `#1A1A1D` |
| Surface raised | `#212121` |
| Border / divider | `#323135` and `rgba(255,255,255,0.10)` (hairline) |
| Stronger border | `rgba(255,255,255,0.25)` |
| Text primary | `#FFFFFF` |
| Text body / muted | `#A8A8A8` |
| Text tertiary | `#999999` |
| Light gray text | `#DEDEDE` |
| **Accent (brand)** | **`#FF5436`** (was `#00ff51`) — sparingly: hovers, key stats, one word in hero, focus rings |
| Section-blend gradient | `linear-gradient(180deg,#010004cc,#01000480 25%,#01000480 50%,#010004cc 75%,#010004)` |
| Marquee edge mask | `linear-gradient(#0000,#000 16.9% 80.1%,#0000)` |

## 2. Typography
- **Display/body:** `Geist` (weights 400/500/700). Headings weight **500** dominant.
- **Eyebrows/labels/stats:** `Geist Mono`, ALL-CAPS, `+0.08em` tracking, 12–13px.
- **Type scale (px):** Hero H1 ~56 (48–50 smaller bp) / H2 32–40 / card title 22–28 /
  body 16–18 / small 12–14 / eyebrow 12–13.
- **Letter-spacing signature:** headings tight **`-0.05em`** (up to `-0.07em`); mono labels **`+0.08em`**.
- **Line-height:** 100% display, 120% sub-heads, 150% body.

## 3. Layout & sections (top → bottom)
Container **max-width 1200px**; 8px spacing grid; section padding **100px** (secondary 64px).
Corners are **sharp (0px radius)** — near-brutalist, crisp.

1. **Sticky header** — glass `backdrop-filter: blur(4px)`, nav links + primary CTA "Book AI Strategy Call". A floating "Talk with an AI expert · Book 15-min call" side card.
2. **Hero** — big H1 (one word coral-accented), sub-copy, two CTAs. Centered single column.
3. **Logos marquee** — "TRUSTED BY TEAMS ACROSS INDUSTRIES" infinite ticker, edge-masked.
4. **Problem/value section** — "Why Soft Suave" pain→gain grid.
5. **Works / case studies** — sticky-stacking project cards (year, category tag, title, stat pair, "View Case Study"). `position:sticky; top:100px` stack.
6. **How it works** — numbered steps (our 6-step AI Transformation Journey fits here: Business Challenge → AI Assessment → Prototype → Integration → Deployment → Optimization).
7. **Integrations** — "Connected Systems, Not More Tools" tool/logo grid (Enterprise AI Integrations content).
8. **Services** — numbered `/ 01 … / 08` list, each with bulleted features (our 8 services).
9. **Why Us** — comparison table (Soft Suave vs Other Agencies vs In-House).
10. **Testimonials** — quote cards + **count-up stat counters** (`0+`→`400+`, `0`→`150+`, `13+`, `21+`).
11. **Tech stack** — grouped chips (Foundation Models / Frameworks / Vector DB / Cloud AI).
12. **FAQ** — accordion + repeat expert-call card.
13. **Final CTA** — "Ready to Transform Your Business with AI?" + CTA.
14. **Footer** — nav columns, legal, socials, email, tagline.

## 4. Component styles
- **Corners:** sharp 0px everywhere (avatars/dots circular only).
- **Buttons:** rectangular solid (white/light fill on dark) + bordered ghost (`rgba(255,255,255,.1)` border). Hover = color transition `.4s cubic-bezier(.44,0,.56,1)`.
- **Cards:** surface `#1A1A1D`/`#212121`, 1px hairline `rgba(255,255,255,.1)`, sharp corners, very soft multi-layer low-opacity shadows (no heavy drop shadow).
- **Glass:** `backdrop-filter: blur(4px)` on nav & floating cards.
- **Badges/tags:** mono all-caps 12–13px `+0.08em`.
- **Marquee:** infinite horizontal ticker with gradient edge masks.

## 5. Animation & transitions (THE stack)
- **Framer Motion** — appear reveals. Springs with **`bounce:0`, `duration:1s`**, staggered delays ~**0.1s cascade** (0.5→0.6→0.7→1.0→1.1). States: fade+rise `{opacity:0.001,y:15–30}`→`{y:0}`; fade+scale `0.8→1` and `1.2→1`; some `translateX(±16–150px)`. Opacity floor `0.001`.
- **Lenis smooth scroll v1.3.23** — inertial eased scroll (lerp ~0.1). The page's buttery feel.
- **Pinned/sticky stacking** — `position:sticky` at `top:0/80/100px` + `-webkit-mask` edge fades → stacking case-study cards and pinned lists.
- **Marquee** — constant-speed infinite ticker, edge-masked.
- **Count-up stats** — animate from 0 on scroll-into-view.
- **Hover micro:** `color .4s cubic-bezier(.44,0,.56,1)` and quick `.15s`.
- **Signature easing:** `cubic-bezier(0.44,0,0.56,1)` (symmetric ease-in-out).

## 6. Next.js recreation notes
Geist + Geist Mono via `next/font/google`. Framer Motion `whileInView` variants
(`initial{opacity:0,y:24}`→`whileInView{opacity:1,y:0}`, `transition:{type:'spring',bounce:0,duration:1}`,
`staggerChildren:0.1`). Lenis `^1.3` RAF loop in a client `SmoothScroll` provider. Sticky+mask CSS
for pinned sections. Marquee component (CSS keyframes or duplicated track). `useInView` + count-up hook
for stats. Theme scoped under `.theme-one`.

## Effects likely NOT 1:1 reproducible (will note in Step 5)
- Framer's exact spring-to-bezier internal conversion (we approximate with equivalent springs).
- Framer's proprietary Ticker easing edges (we use CSS mask + linear keyframe — visually equivalent).
