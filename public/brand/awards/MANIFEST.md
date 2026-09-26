# Award & badge artwork

Pulled from the legacy site (`https://www.softsuave.com`) by crawling all 212
non-blog sitemap URLs. Every file below is a byte-for-byte copy of the live
asset — nothing was re-encoded or redrawn.

## Partner / certification strip
Used in the legacy hero + contact blocks (Upwork, Clutch, Microsoft, AWS row).

| Local | Origin |
|---|---|
| `upwork-badge-new.webp` | `/new-assets/common/images/upwork-badge-new.webp` |
| `clutch-color.webp` | `/new-assets/common/images/clutch-color.webp` |
| `microsoft-silver.webp` | `/new-assets/common/images/microsoft-silver.webp` |
| `aws-color.webp` | `/new-assets/common/images/aws-color.webp` |

`aws-color.webp` and `microsoft-silver.webp` are clipped at the right edge in
the source ("network" / "Partner" lose their last letter). The legacy site hides
this with container padding.

## Directory award badges
Wired into `src/lib/home/content.ts`.

| Local | Award | Origin |
|---|---|---|
| `clutch.webp` | Clutch — Top B2B Companies Global 2024 | `/assets/new-formate/awards/awards-12.webp` |
| `upfirms.webp` | UpFirms — Top Web Development Companies | `/assets/new-formate/awards/awards-11.webp` |
| `softwareworld.webp` | SoftwareWorld — Top Rated 2024 | `/assets/new-formate/awards/softwareworld-2024.webp` |
| `techreviewer.webp` | Techreviewer — Top WordPress Developers 2024 | `/assets/new-formate/awards/top-software-2024.webp` |
| `topdevelopers.webp` | TopDevelopers — Top Web Development 2023 | `/assets/new-formate/awards/td-mobile.webp` |
| `allaboutapps.webp` | All About Apps — Top Web Development 2023 | `/assets/new-formate/awards/allaboutapps.webp` |
| `techimply.webp` | Techimply — Top Mobile App Development | `/assets/new-formate/awards/techimply.webp` |
| `goodfirms.webp` | GoodFirms — Top Mobile App Development | `/assets/new-formate/awards/app-development.webp` |
| `selectedfirms.webp` | SelectedFirms — Top Ecommerce Development | `/assets/new-formate/awards/Bitmap.webp` |
| `extract.webp` | Extract — Reliable Company | `/assets/new-formate/awards/extract.webp` |
| `wadline.webp` | Wadline — Top Mobile App Developers | `/assets/new-formate/awards/wadlin.webp` |
| `nasscom.webp` | NASSCOM membership wordmark | `/assets/new-formate/awards/naascom.webp` |

## Added, not yet wired up

| Local | Award | Origin |
|---|---|---|
| `developer4u.webp` | Developer4U — Featured Member | `/assets/new-formate/awards/developer4u.webp` |
| `softwareworld-2022.webp` | SoftwareWorld — Top Rated 2022 | `/assets/new-formate/awards/softwareworld.webp` |
| `techreviewer-2022.webp` | Techreviewer — Top WordPress Developers 2022 | `/assets/new-formate/awards/top-software.webp` |
| `techimply-hd.webp` | Techimply badge, higher-res raster | `/assets/new-formate/awards/techimply-new.webp` |
| `techimply.svg` | Techimply badge, vector | `/assets/new-formate/awards/techimply-new.svg` |
| `anniversary-12-years.webp` | Celebrating 12 Years | `/new-site/resources/images/footer/12th_anniversary_logo.webp` |
| `iso-9001-2015.webp` | ISO 9001:2015 seal (small, ~80px) | `/assets/new-formate/about/1WZ-ISO-9001-2015-e1475841644781.webp` |

`softwareworld-2022` / `techreviewer-2022` are the older year variants of badges
already wired up — keep or drop as you like.

## Rating lockups (`ratings/`)
Flat vector "logo + 5 stars + 4.8" strips. Small (103x59 viewBox) but scale
cleanly. Good for a compact trust row.

| Local | Origin |
|---|---|
| `ratings/clutch.svg` | `/new-assets/products/images/awards-certificate-new-1.svg` |
| `ratings/goodfirms.svg` | `/new-assets/products/images/awards-certificate-new-2.svg` |
| `ratings/topdevelopers.svg` | `/new-assets/products/images/awards-certificate-new-3.svg` |
| `ratings/upfirms.svg` | `/new-assets/products/images/awards-certificate-new-5.svg` |
| `ratings/designrush.svg` | `/new-assets/products/images/awards_certificate_design_rush_enhanced.svg` |
| `ratings/designrush-alt.svg` | `/new-assets/products/images/awards-certificate-new-4.svg` |

`designrush-alt.svg` draws "DESIGN" in white and only "RUSH" in cyan, so it
needs a dark background. `designrush.svg` sets the whole wordmark in cyan and
works on either — prefer it.

The `4.8` and star row are baked into the artwork, not live data.

## Deliberately skipped
- `/new-assets/products/images/indus-award-{1,2,3}.webp` — low-res ghosted
  fragments (a stray star, a faded AWS lockup), decorative overlays rather than
  badges.
- `/assets/images/iso_certification.jpg` — ISO/IEC 27001:2022 lockup; already in
  the repo as `public/brand/iso-iec-27001-2022.webp`.
