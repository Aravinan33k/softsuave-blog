# BRAND.md — Soft Suave (shared across all three pages)

The logo, colors, fonts, and copy below are **MY brand** and are constant across `/one`, `/two`,
and `/three`. Only the *design language and motion* differ per page (per its inspiration).

## Logo
- File: `d:/SS/softsuave_logo.webp` → copied to `/public/brand/softsuave_logo.webp`.
- Mark: a stylized cube / hexagonal "S" with an **orange→red gradient**.
- Wordmark: **"Soft Suave"** in dark navy, with tagline **"A KiwiTech Affiliate Company"**.
- For dark backgrounds (site-1, site-3) the wordmark must be rendered light; I'll ship a
  light-wordmark variant via CSS (`filter`/white text lockup) or a recolored logo so the
  mark stays gradient but the wordmark reads on dark.

## Brand color tokens (inferred from the logo gradient)
| Token | Value | Role |
|---|---|---|
| `--brand-coral` | `#FF7A45` | Gradient start (warm orange) |
| `--brand-red`   | `#FB3B5C` | Gradient end (red/pink) |
| `--brand-500`   | `#FF5436` | Primary solid (mid of the gradient) — CTAs, accents |
| `--brand-600`   | `#F0402E` | Hover/darker primary |
| `--brand-navy`  | `#1E293B` | Wordmark navy / dark text on light |
| `--brand-ink`   | `#0B1020` | Deepest ink |
| Gradient | `linear-gradient(135deg,#FF7A45 0%,#FB3B5C 100%)` | Signature brand gradient |

This coral→red gradient is the single accent that ties all three otherwise-distinct pages
back to Soft Suave. Each page adopts it in its own idiom:
- **/one** — uses coral as the lone accent spark on a monochrome dark canvas (replaces the
  inspiration's green `#00ff51`).
- **/two** — the inspiration is *already* orange (`#fa6e43`); we retune it to the exact brand
  coral so it reads as Soft Suave.
- **/three** — the inspiration is *already* orange-red (`#ff6b50`/`#ff4b2f`); retuned to brand.

## Fonts (vibe: modern, engineered, credible)
- **Primary UI/body:** `Inter` (variable) via `next/font` — clean, neutral, enterprise-safe.
- **Per-page display fonts** (each page keeps its inspiration's typographic character):
  - /one → **Geist** + **Geist Mono** (technical, tightly tracked).
  - /two → **Inter Display** feel (we use Inter tight-tracked at display sizes) + Inter body.
  - /three → **PP Editorial New** (ultralight serif display) or a free equivalent
    (**Fraunces** ultralight as fallback if PP Editorial license unavailable) + Inter/Neue-Haas-like
    grotesque body + a mono (**Martian Mono** or **JetBrains Mono**) for micro-labels.

## Tone
Enterprise-credible, confident, outcome-focused, AI-forward but human. Not hypey.
"We build practical AI that ships and moves real business metrics."

## Content source
All copy comes from `content/content.ts` (derived from the *New home page content - 29.6.26.docx*).
Same content renders in all three pages; each page maps it into its inspiration's structure.
Key blocks: Hero, Why Soft Suave (+4 stats), 2 value props, 5 Industries, 8 Services,
6-step AI Transformation Journey, Enterprise AI Integrations, Tech Stack (4 groups), Big CTA,
Testimonials, mega-menu nav.

## Per-page isolation
Each route is self-contained under `app/(one|two|three)/` with its own `components/`, its own
CSS-variable theme scope (`.theme-one` / `.theme-two` / `.theme-three` wrapper), and its own
animation stack init. No global styles leak between pages beyond the reset + brand tokens.
