# Which template to build each missing page with

Companion to `PAGE-GAP.md` (144 pages on softsuave.com not built here yet).
Every recommendation below names a template that already ships in this repo and
a page currently using it, so "copy this one" is always a real instruction.

## The templates that exist

| # | Template | Shape | In use by | Cost of one more page |
|---|---|---|---|---|
| T1 | `components/hire/hire-role-page.tsx` | whole page, one prop | 14 hire-by-**role** pages | content module + 5-line route |
| T2 | `components/landing/hire-page.tsx` | whole page, one prop | 20 hire-by-**skill** pages | entry in a `hire-skills-*.ts` + 5-line route |
| T3 | `components/industries/sector-page.tsx` | whole page, one prop | `ai-in-aviation` only | content module in `lib/home/sectors/` + route |
| T4 | **Landing composition** — `components/landing/*` sections assembled per route | ~8 sections picked per page | ~40 service/tech pages | content module + ~60-line route |
| T5 | CMS `Page` → `src/app/[slug]/page.tsx` | rich text + SEO fields | editor-authored | no deploy |

T1–T3 are turnkey: one prop in, whole page out. T4 is the general-purpose
assembly — copy `app/(marketing)/nodejs-development-company/page.tsx`, which
runs Hero → Overview → ServiceBoard → CtaBand → TechStack → Faq → Testimonials
→ Contact.

**Two templates do not exist and have to be built: a case-study detail page and
a listing/index page.** Between them they account for 89 of the 144.

Every new route must also be registered in `src/lib/home/landing-pages.ts`, or
it ships ahead of the release gate and never reaches the sitemap.

---

## Recommendations by group

### Hire roles — 5 pages → **T2**, no new code

`hire-cms-developer`, `hire-saas-developer`, `hire-selenium-tester`,
`hire-xamarin-developer`

Add an entry to the matching `hire-skills-<category>.ts` (same shape as the
`hire-reactjs-developers` entry: `slug`, `key`, `name`, `role`, `metaTitle`,
`serviceType`, `order`, `hero`, …), then a route that is five lines. Nothing new
to design.

`hire-full-stack-developers-in-india` is a role **and** a geo page — see the geo
note below before writing it as a 21st standalone skill.

### Service / technology pages — ~14 → **T4**

`php-application-development-company`, `python-application-development-company`,
`wordpress-development-company`, `magento-development`,
`low-code-development-company`, `cross-platform-application-development-company`,
`offshore-ror-development-company`, `video-call-app-development-company`,
`ecommerce-mobile-app-development-company`, `education-app-development-company`,
`healthcare-mobile-app-development-company`, `multi-vendor-marketplace-platform`,
`pos-software-development-company`, `secured-communication-app-for-patient-care`

Copy `nodejs-development-company/page.tsx` and write
`lib/home/<slug>-content.ts`. These are the same page as the 18 tech pages we
already ship, with different copy.

Two of the PHP/Python ones are **linked from the nav today and 404** — do those
first.

### Industry solution pages — ~6 → **T3**

`construction-project-management-software`,
`construction-employee-time-tracking-app`, `real-estate-crm-software-development`,
`retail-solutions`, `onestop-digital-banking-solution`,
`ecommerce-app-development-package`

These are sector stories, not technology pitches, so `sector-page.tsx` fits
better than T4. Note `lib/home/sectors/` already holds eight content modules but
only `ai-in-aviation` renders through `SectorPage` — the other seven sectors
still use T4. Worth deciding which way that goes before adding six more.

### Geo pages — 12 → **T4, but parameterised**

`mobile-app-development-company-{dubai,germany,italy,maryland,poland,saudi-arabia,south-africa}`,
`software-development-company-{france,germany,india,spain}`,
`hire-full-stack-developers-in-india`

These are one page with a location swapped. Twelve near-identical content
modules will drift apart within a quarter and are a poor SEO asset besides.

Build a location content **factory** — `lib/home/locations/<city>.ts` holding
only what differs (city, region, currency, local proof, timezone copy) merged
over one shared base — rendered by explicit routes so each keeps its own
`metadata` and canonical. Same visual template, one source of truth.

### Offshore tech sub-pages — 8 → **one dynamic route**

`offshore-software-development-company/{angular,dot-net,flutter,java,php,react-native,ror,ruby-on-rails}`

The parent segment does not exist here at all. All eight are the same page with
a different stack, so build `offshore-software-development-company/[tech]/` with
`generateStaticParams` over a content map, plus the parent index.

`ror` and `ruby-on-rails` are duplicates of each other on live — make one the
canonical and redirect the other via the `Redirect` model rather than shipping
both.

### Lead-gen and calculators — 9 → split in two

**Form pages (4) — T4, minimal.** `30-min-free-consultation`, `free-quote`,
`free-cost-estimation`, `free-7-days-trial`. `landing/hero.tsx` already carries
an enquiry form that POSTs to `/api/v1/enquiry`, so these are Hero + FinalCta
and little else. `free-cost-estimation` is linked from the nav and 404s today.

**Real tools (5) — new interactive components.** `developer-estimation`,
`mobile-app-estimation`, `staff-augmentation-cost-calculator`,
`developer-rate-card`, `free-demo-app`. No template covers a multi-step
calculator; these need building and are the only group here that is genuinely
new engineering rather than assembly.

### Case studies — 64 + index → **new template, T3-style**

No case-study detail template exists. `landing/case-studies.tsx` is a *shelf of
cards* for a landing page, not a detail page.

Build `components/case-study/case-study-page.tsx` taking one content prop, and
`lib/home/case-studies/<slug>.ts` modules — exactly the pattern `sectors/`
already proves. The live pages share one shape: Client Overview · Industry ·
Client Requirements · Challenges · Solution · Results · download CTA. One
template covers all 64.

**Consider the CMS (T5) instead.** 64 pages is a lot of content to hold in
TypeScript, and marketing cannot add the 65th without a deploy. If these are
expected to keep growing, a structured CMS type is the better home; if they are
a fixed portfolio that must stay on-brand, keep them in code.

### Portfolio — 17 + index → **fold into case studies**

Live portfolio pages carry only "Project Description" + "App Screenshots" —
a thinner version of a case study, and several cover the same projects. Rather
than a second template, make them a variant of the case-study template (or drop
them and redirect to the matching case study).

Worth confirming with whoever owns the content before building 17 pages that
may be redundant with 64 you are already building.

### Hub / index pages — 8 → **new listing template + reuse**

| Page | Build from |
|---|---|
| `/clients` | Pure reuse: `home/clients.tsx` + `home/recognitions.tsx` + `home/testimonials.tsx`. The live page *is* those three sections. **Linked from nav, 404s today.** |
| `/faqs` | `landing/faq.tsx` as a full page |
| `/services` | `landing/services.tsx` / `common/service-board.tsx` full-page |
| `/technologies` | `landing/tech-stack.tsx` full-page |
| `/engagement-model` | `landing/comparison.tsx` + `landing/process.tsx` |
| `/case-studies` | new listing template. **Linked from nav, 404s today.** |
| `/success-stories` | same listing template, testimonial variant. **Linked from nav, 404s today.** |
| `/portfolio` | same listing template — or redirect to `/case-studies` |

The three listing pages want one paginated/filterable grid component between
them. `home/work-grid.tsx` is the closest existing thing to start from.

### Company / legal — 3

`life-at-softsuave` (nav-linked, 404s today) → T4 with a photo-led hero.
`privacy-policy` → **T5, the CMS** — rich text with no design requirement is
exactly what the `Page` model is for. `test-web-est` is a live-site test page;
do not port it.

---

## Suggested order

1. **The 10 dead nav links** — the menu 404s today. `/clients`, `/faqs` and
   `/life-at-softsuave` are near-free; `/case-studies` and `/success-stories`
   need the listing template first. `/career-overview` and `/how-to-hire` are
   linked here but do not exist on live either, so decide whether to build or
   unlink them — `/career-overview` also backs the applicant notice under every
   hero enquiry form.
2. **The two missing templates** — listing, then case-study detail. They unblock
   89 of the 144.
3. **The cheap bulk** — 4 hire skills (T2), then the service/tech pages (T4).
4. **Decide before building** — geo factory vs. 12 modules; sectors on T3 vs.
   T4; portfolio kept or folded into case studies; case studies in code vs. CMS.
5. **The calculators last** — the only group needing genuinely new engineering.
