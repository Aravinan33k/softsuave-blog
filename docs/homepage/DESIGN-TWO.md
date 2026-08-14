# DESIGN-TWO.md — `/two` (inspiration: plat-form.framer.ai)

**Aesthetic in one line:** premium dark "AI-infrastructure SaaS" — warm-charcoal canvas,
warm off-white Inter-Display headlines in tight negative tracking, a single confident **orange
accent** (inspiration `#fa6e43` → **retuned to Soft Suave coral `#FF5436`**), soft-shadowed 8px
rounded cards, bento grids, animated dashboards & tickers, slow overshoot-eased Framer Motion
reveals over Lenis scroll. Calm, technical, expensive — warm (not cold-blue) neutrals.

---

## 1. Colors (warm dark + coral accent)
| Role | Value |
|---|---|
| Background (page) | `#161719` |
| Surface 1 | `#1D1E21` |
| Surface 2 (heavy use) | `#212225` |
| Surface 3 (hover/raised) | `#2C2C2F` |
| Border | `#434346` |
| Text primary (warm off-white) | `#E3DBD8` / `#DFD9D7` |
| Text emphasis | `#FFFFFF` |
| Muted 1 | `#888891` |
| Muted 2 | `#5F5F66` |
| **Accent / primary** | **`#FF5436`** (was `#fa6e43`) — buttons, highlights, glows |
| Accent gradient end | `#FB3B5C` (brand red; inspiration used `#f2673d`) |
| Glow | `radial/linear rgba(255,84,54,0)→#FF5436` behind hero & CTA |
| Edge masks (tickers) | `linear-gradient(90deg, rgba(0,0,0,0)→#161719)` both ends |

## 2. Typography
- **Headings:** Inter Display feel — we use **Inter** at display sizes, tracking **`-0.04em`/`-0.05em`**, weight **500** (medium, not heavy).
- **Body/UI:** **Inter** 400/500. Body lead **21px**, secondary **17px**.
- **Type scale (px):** hero display **80–120** · section headings 48–70 · sub-heads 24–35 ·
  body 17–21 · small 11–15.
- **Line-height:** 120–130% headings, 140–150% body, ~0.9–1em tight hero lines.

## 3. Layout & sections (top → bottom)
Containers: outer 1400–1600px · main column **1199px** · text measure **809px** · cards 230–400px.
Radius scale: **8px** primary (cards/buttons), 2px chips, 20px pills.

1. **Header/nav** — logo + horizontal links + "Book a Demo" CTA, floating over hero.
2. **Hero** — oversized display headline ("Empowering Businesses with Scalable AI, Automation & Integrations"), subtext, primary CTA + floating **stat chips** (Uptime/Performance-style → our 400+/13+/150+/21+).
3. **Logo ticker** — `opacity:0.5` infinite marquee of partner/tech logos.
4. **"See it in action" band** — guided-tour CTA.
5. **Featured product / bento grid** — 4 feature cards w/ icons (maps to our Services highlights: Custom AI, Integrations & Automation, Chatbots & Agents, Modernization) — bento layout.
6. **Beta/progress** — progress-bar band (reuse as "AI Transformation Journey" progress).
7. **Our Services** — 4 pillars w/ keyword labels (our 8 services, grouped).
8. **Our Process** — stepped list with metrics (our 6-step journey).
9. **Smart Analytics** — dashboard mockup: **donut chart** + status pills (Optimal/Stable/Issues) + live metrics. (Use as an "AI impact dashboard" — measurable outcomes.)
10. **Industries** — 5 industry cards (Ecommerce/HealthTech/Logistics/EdTech/FinTech).
11. **Pricing/Engagement** — 3-tier cards (Studio/Scale/Supreme → our engagement models) w/ orange CTA. *(Optional; our content has no pricing — render as "Engagement Models" or omit.)*
12. **FAQ** — accordion.
13. **Team** — member cards.
14. **Testimonials** — quote cards ("What Our Clients Say About Us").
15. **Tech stack ("Labs"/blog-style grid)** — grouped chips (Foundation Models/Frameworks/Vector DB/Cloud AI).
16. **Big CTA** — "Ready to Transform Your Business with AI?" / "Let's Talk."
17. **Contact** — split form + office info.
18. **Newsletter + footer.**

## 4. Component styles
- **Buttons:** primary solid **coral** fill (~8px radius) + ghost with `#434346` border. Hover `0.2s`. Accent glow via `rgba(255,84,54,…)`.
- **Cards:** dark `#212225`/`#1D1E21`, hairline `#434346`, 8px radius, soft layered shadows (`0 7px 9px rgba(0,0,0,.4)` + micro `0.6px` shadows), occasional inset outline.
- **Glass:** modest `backdrop-filter: blur(3px)` on floating hero chips.
- **Badges/pills:** radius-2px or radius-20px chips (status/keyword labels), muted `#888891` or accent.
- **Gradients:** directional edge-mask fades on marquees; accent glow gradients; donut/segmented chart.

## 5. Animation & transitions (THE stack)
- **Lenis smooth scroll v1.3.23** — default smooth wheel/touch (lerp ~0.1); body `overscroll-behavior:none`.
- **Framer Motion appear/reveal** — `opacity:0`+translate → in place on scroll/enter.
  - **Distances:** translateY **40px** (dominant), also 10/20/30/60; translateX 10; hero from `-80/-90px`.
  - **Timing/easing:** tween `ease:[0,1.03,0.56,1]` (slight overshoot), `duration:1s`, **stagger ladder** 0.3→0.4→0.5→0.7→0.9→1.0→1.1→1.2→1.4s down the page. Hero big moves `[0.01,1.04,0.5,0.96]` dur 1.4, `[0.1,0.79,0.56,1]` dur 2.
  - **Spring variants:** `type:'spring',bounce:0.2,duration:1–2s` for floating/ambient (hero chips, ticker items).
  - **Hover micro:** `0.2s`.
- **Marquees:** Logo Ticker (`opacity:0.5`, edge-faded) + News/tech Ticker — continuous horizontal loops.
- **Ambient float:** spring loops on hero stat chips & decorative nodes.
- **Animated counters / live metrics** in the Analytics dashboard; **progress bars** fill on view.
- **Glow/gradient motion** behind hero & CTA; **blur-in** overlays on hero chips.

## 6. Next.js recreation notes
`next/font` Inter (+ tight-tracked display usage). Framer Motion `whileInView`
(`initial{opacity:0,y:40}`→`{y:0}`, `ease:[0,1.03,0.56,1]`, `duration:1`, `staggerChildren:0.1–0.2`).
Lenis `^1.3` provider + `overscroll-behavior:none`. Two marquee tracks. Count-up hook + animated
donut (SVG stroke-dasharray) + progress bars via `whileInView`. Ambient float via Motion
`animate` keyframe loops. Theme scoped under `.theme-two`.

## Effects likely NOT 1:1 reproducible (will note in Step 5)
- The live "real-time" analytics numbers are decorative in the original; we animate plausible
  static-then-settle values rather than a real data feed.
- Framer's exact overshoot bezier — approximated with the same control points in Motion.
