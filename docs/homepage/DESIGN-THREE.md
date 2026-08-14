# DESIGN-THREE.md — `/three` (inspiration: trionn.com)

**Aesthetic in one line:** premium, award-show **dark creative-agency** site — near-black
`#040508` canvas, soft-grey type, a single hot warm-orange accent (`#ff6b50`/`#ff4b2f` → **retuned
to Soft Suave coral `#FF5436` / red `#FB3B5C`**), occasional cream inversion blocks. Typography-led:
oversized **ultralight serif** display + tight-tracked grotesque body + wide-tracked uppercase
**mono** micro-labels. Motion-first & cinematic: Lenis smooth scroll, **GSAP ScrollTrigger** pinned
& horizontal sections, **SplitText** char reveals, clip-path image masks, count-up stats, marquees,
custom cursor, (optional) WebGL & hover sound.

---

## 1. Colors (near-black + hot coral + cream blocks)
| Role | Value |
|---|---|
| Primary background | `#040508` (near-black, faint blue) |
| Primary text | `#D8D8D8` (also `#D2D2D2` bright, `#E8E8E8`) |
| Muted / lines | `#434343`, grey-line `#434343`, grey-light `#9C9C9C` |
| **Accent text** | **`#FF5436`** (was `#ff6b50`) — highlights/hover |
| **Accent border** | **`#FB3B5C`** (was `#ff4b2f`) — emphasis borders |
| Cream inversion block | `#E6E4E2` (bg) with `#D8D8D8` lines; text goes dark on cream |
| Panel darks | `#131415`, `#171717`, `#24262E`, `#2F323B`, `#303640`, `#3A3A42` |
| Semi-transparent labels | `#D8D8D8eb / bf / 80` |

## 2. Typography (the identity)
- **Display (serif, ultralight):** **PP Editorial New Ultralight** → **fallback: `Fraunces` ultralight (wght 100–300)** if PP Editorial license unavailable. Huge elegant headlines.
- **Body/UI (grotesque):** Neue Haas Display feel → **`Inter`** (or `Familjen Grotesk` for the secondary grotesque).
- **Micro-labels/eyebrows/counters (mono):** **Martian Mono** → fallback **`JetBrains Mono`**, ALL-CAPS, wide tracking **`.2em`–`.5em`**.
- **Fluid root-font technique:** `html{font-size:calc(1000vw / var(--size))}` with `--size` switching at breakpoints 320/360/480/750/850/1000/1180/1280 → rem scales linearly with viewport. (We replicate with a clamp-based fluid root or the same vw formula.)
- **Type scale:** display `clamp(5rem,9.164vw,10rem)` (~160px) down through `clamp(3.75rem,6.614vw,6.25rem)`, `clamp(3.5rem,6.349vw,6rem)`, etc.
- **Letter-spacing:** display **tight negative** `-.06em`/`-.08em`/`-.04em`; mono labels **wide** `.2em`/`.5em`. Line-height `normal`/`1` on display.

## 3. Layout & sections (top → bottom)
Fluid vw-based sizing; oversized headlines act as section dividers.

1. **Preloader** — intro loading screen, then reveal (counter / clip-path curtain).
2. **Fixed nav** — logo + links (about/work/services/contact) + rounded-full pill CTA "Book AI Strategy Call". Mobile hamburger → overlay menu. Custom cursor.
3. **Hero** — oversized editorial headline with a **rotating word** ("Scalable / Intelligent / Integrated" or our "AI, Automation & Integrations"), eyebrow "✦ From idea to outcome." Centerpiece media (image; original used a WebGL/video lion — we use a hero image or subtle canvas).
4. **Intro / manifesto** — "Your AI Growth Partner, From Idea to Launch." + "13+ Years of Experience. Est. 2012."
5. **Key facts / counters** — count-up cards: **400+** specialists · **13+** years · **150+** clients · **21+** countries.
6. **Work / projects grid** — case-study tiles with hover reveal (+ optional hover sound). (Our "AI Success Stories Across Key Industries".)
7. **Services** — 8 services with big type + imagery (AI, Integrations, Chatbots/Agents, Custom Software, Mobile, Web, Modernization, GCC).
8. **Industries** — Ecommerce / HealthTech / Logistics / EdTech / FinTech.
9. **Story / "why the name"** — brand manifesto block (cream inversion), "Why Soft Suave".
10. **Awards / featured** — "Featured & Awards" badge strip (Enterprise integrations / recognitions content).
11. **Tech stack** — grouped chips (Foundation Models / Frameworks / Vector DB / Cloud AI) as a marquee or grid.
12. **Testimonials** — "What Our Clients Say About Us".
13. **Contact / business enquiry** — form over a subtle background, "Ready to Transform Your Business with AI?" + **hold-to-confirm** CTA.
14. **Footer** — large-type footer + marquee.

## 4. Component styles
- **Buttons:** `rounded-full`, bordered, **uppercase mono** `-tracking-[0.02em]`, custom-cursor hover; accent border `#FB3B5C` on emphasis; a **hold-to-confirm** button on contact.
- **Custom cursor:** DOM-follow cursor that scales/labels on interactive elements.
- **Project tiles:** image with **clip-path reveal** on scroll + hover scale; optional sound-on-hover.
- **Marquees:** infinite horizontal strips (footer / awards / tech).
- **Counters:** count-up numbers on view.
- **Nav:** overlay menu + burger; sticky logo.
- **Media:** autoplay muted background videos where relevant (kept lightweight; images from pipeline fill all photo slots).

## 5. Animation & transitions (THE stack)
- **GSAP core + ScrollTrigger** — master scroll engine (all scroll-driven animation).
- **Lenis smooth scroll** — `lerp:0.105`, `wheelMultiplier:0.6`, `smoothWheel:true`; inner panels `data-lenis-prevent`. (GSAP ScrollSmoother also present in original; we standardize on Lenis + ScrollTrigger.)
- **SplitText char/word/line reveals** — `stagger:0.05` (or 0.08), lift via `yPercent`, masked with `clipPath`, dur ~.5–.62s, ease `power2.out`/`power3.out`/`expo.out`. *(SplitText is a GSAP paid plugin — we use a free equivalent: manual char/word splitting or the `SplitType` library, animated with GSAP.)*
- **Pinned sections** — `pin:true` + `scrub`, `anticipatePin`, `start:"top top"`, `end:"+=100%..300%"` (mobile-conditional). Horizontal-scroll galleries via pinned ScrollTrigger.
- **Parallax / scrub** — `scrub:0.6`, `ease:"none"` (dominant for linear scrub); `skewY` on velocity; `yPercent` image parallax.
- **Count-up stats** on scroll into view.
- **Preloader + route/overlay transitions** — clip-path curtain reveals.
- **Custom cursor**, **marquees**, **hover sound** (optional; behind a mute toggle, off by default for autoplay-policy safety).
- **WebGL (Three.js) hover displacement** in the original — **we mark this as optional/partial**; default build uses CSS/`clip-path`/GSAP image reveals instead of shaders to keep it robust and performant. (Noted in Step 5.)
- **Eases:** `none` (scrub), `power2.out`/`power3.out`, `expo.out`, `back.out(1.8)` pops. **Durations:** .3/.4/.5/.58/.62 micro, 1–1.2 hero. **Stagger:** .05 primary.

## 6. Next.js recreation notes
`gsap` + `@gsap/react` (`useGSAP`), `ScrollTrigger` registered in a client provider with
`ScrollTrigger.refresh()` after mount + on Lenis scroll. Lenis provider drives `ScrollTrigger.update`.
`SplitType` (free) for char/word splitting → GSAP timelines. Fonts via `next/font/local` (Fraunces
ultralight for display, JetBrains Mono for labels, Inter for body). Preloader as a client overlay with
GSAP timeline. Theme scoped under `.theme-three`. All image slots filled from the Pexels pipeline
(no WebGL required for a faithful look).

## Effects likely NOT 1:1 reproducible (will note in Step 5)
- **Three.js/WebGL shader image displacement & the WebGL "hanging-lion" centerpiece** — replaced
  with GSAP + clip-path image reveals and a hero image (perf + robustness; noted as partial).
- **GSAP SplitText** exact behavior — approximated with `SplitType` + GSAP (visually equivalent).
- **Hover/narration sound design** — implemented as an opt-in muted-by-default toggle (browser
  autoplay policies block unsolicited audio); original's rich SFX layering is simplified.
- **GSAP ScrollSmoother** — replaced by Lenis (both were present in the original).
