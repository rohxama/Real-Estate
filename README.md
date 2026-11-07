# Estatia — Luxury Real Estate

An editorial, single-page real estate website built from a supplied design
reference. Warm ivory surfaces, an oxblood accent, a Didone-style display face
and photography-led sections: hero search, brand statement, featured
properties, a numbered services accordion, a premium-estates collection, FAQ,
closing CTA and an oversized footer wordmark.

> **Status:** design system, site header and hero complete. Remaining page
> sections are implemented in later stages.

---

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | [Astro](https://astro.build) | 7.4.7 |
| Bundler | [Vite](https://vite.dev) (via Astro) | 8.3.6 |
| Language | TypeScript | 6.0.3 |
| Styling | Native CSS + design tokens | — |
| Display type | [Bodoni Moda Variable](https://fontsource.org/fonts/bodoni-moda) (self-hosted) | 5.3.0 |
| Body type | [Inter Variable](https://fontsource.org/fonts/inter) (self-hosted) | 5.3.0 |
| Images | Astro Assets + [sharp](https://sharp.pixelplumbing.com) | 0.35.5 |
| SEO | @astrojs/sitemap | 3.7.4 |
| Type checking | @astrojs/check | 0.9.12 |
| Runtime | Node.js ≥ 22.23.4 (developed on 24.16.0 LTS) | — |

No UI framework, no Tailwind, no animation library, no smooth-scroll library.
See [`TECH_STACK.md`](TECH_STACK.md) for the research and rejected alternatives.

---

## Requirements

- **Node.js 22.23.4 or newer** (Astro 7 requirement; `.nvmrc` pins 24.16.0)
- npm 9.6.5 or newer

## Getting started

```bash
# install dependencies
npm install

# start the dev server at http://localhost:4321/Real-Estate/
npm run dev

# type-check and production build into dist/
npm run build

# preview the production build
npm run preview
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Astro dev server with HMR |
| `npm run build` | `astro check` + static build to `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | Type-check `.astro` and `.ts` files |
| `npm run astro` | Astro CLI passthrough |

---

## Project structure

```text
.
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── fonts/            # reserved for licensed original woff2 files
│   │   └── images/
│   │       └── hero/         # hero photograph, imported through Astro Assets
│   ├── components/
│   │   ├── layout/           # Container, Header
│   │   ├── sections/         # Hero, HeroSearch (one file per page section)
│   │   └── ui/               # Button, IconButton, LinkArrow, Icon, Eyebrow, BrandMark
│   ├── data/                 # typed content (site metadata, listings, FAQ)
│   ├── layouts/
│   │   └── BaseLayout.astro  # document shell, SEO meta, fonts, global styles
│   ├── pages/
│   │   ├── index.astro       # single page entry
│   │   └── design-system.astro  # noindex style guide (verification only)
│   ├── scripts/              # progressive-enhancement TS modules
│   ├── styles/
│   │   ├── tokens.css        # colour, type, spacing, layout, radius, motion
│   │   ├── base.css          # reset and element defaults
│   │   ├── typography.css    # display/heading/body/label roles
│   │   ├── layout.css        # container, section, grid, media, utilities
│   │   └── global.css        # single import surface
│   └── env.d.ts
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── .editorconfig
├── .nvmrc
├── DESIGN_REFERENCE.md      # design analysis
├── PROJECT_AUDIT.md         # pre-implementation audit
├── TECH_STACK.md            # stack research
└── README.md
```

### Conventions

- **Sections** live in `src/components/sections/` (added during implementation),
  one `.astro` file per page section, styles scoped to the component.
- **Primitives** (button, container, icon) live in `src/components/ui/` and
  `src/components/layout/`.
- **Tokens only** — colours, spacing, radii and motion come from
  `src/styles/tokens.css`; no hard-coded hex values in components.
- **Path alias** — `@/` maps to `src/`.
- **Content** — listings and FAQ data live in `src/data/` as typed objects so
  copy can change without touching layout.
- **Progressive enhancement** — markup works without JS; scripts are added in
  `src/scripts/main.ts` and loaded once.

---

## Design system

The visual language is defined once in `src/styles/tokens.css` and consumed by
every component. The internal style guide at **`/design-system/`** renders the
palette, type scale, spacing, radii, shadows, grid and primitives; it is
`noindex` and is not linked from the site.

### Palette

| Token | Value | Role |
|---|---|---|
| `--color-bg` | `#faf7f1` | Page field |
| `--color-bg-alt` | `#f3eee4` | Alternate section surface |
| `--color-surface` | `#fffdf8` | Cards, search widget |
| `--color-img-tint` | `#e6dccb` | Image placeholders |
| `--color-ink` | `#241a15` | Primary text |
| `--color-ink-soft` | `#4a3e35` | Lead paragraphs |
| `--color-muted` | `#8c8177` | Captions, meta |
| `--color-line` | `#e3dccf` | Hairline borders |
| `--color-accent` | `#5a1d16` | Oxblood accent |
| `--color-accent-hover` | `#6b2a20` | Accent hover |
| `--color-accent-deep` | `#4b1712` | Open FAQ row, dark panels |
| `--color-on-accent` | `#fbf6ec` | Text on accent |

One accent only. Gradients are reserved for photographic scrims; UI surfaces
never carry decorative gradients.

### Typography

| Role | Family | Tokens |
|---|---|---|
| Display / headings | Bodoni Moda Variable | `--font-display`, `--text-display`, `--text-h1`–`--text-h4` |
| Body / UI | Inter Variable | `--font-body`, `--text-body`, `--text-lead` |
| Labels | Inter Variable | `--text-xs`, `--tracking-label`, uppercase |

The reference capture is 730 px wide, which does not allow a reliable
identification of the licensed originals. Bodoni Moda (a high-contrast Didone)
and Inter (a neutral grotesque) are the closest legitimate open-licensed
matches; both are self-hosted as variable woff2 with `font-display: swap`.
Families sit behind single tokens, so replacing them later is a one-line change.

- **Bodoni Moda** — SIL Open Font License 1.1
- **Inter** — SIL Open Font License 1.1

### Tokens and primitives

- **Spacing:** 4 px base scale, `--space-1` … `--space-10`; section rhythm via
  `--section-space` and `--section-space-sm`.
- **Layout:** `--container-max` 1360 px, `--container-narrow`, `--container-wide`,
  fluid `--gutter`, 12-column `--grid-columns` and `--grid-gap`.
- **Shape:** `--radius-xs` … `--radius-xl`, `--radius-pill`; hairline and strong
  border tokens.
- **Elevation:** `--shadow-soft`, `--shadow-float`, plus photographic
  `--gradient-scrim`.
- **Image ratios:** `--ratio-hero`, `--ratio-wide`, `--ratio-landscape`,
  `--ratio-portrait`, `--ratio-thumb`, `--ratio-square`; use the matching
  `.ratio-*` class on `.media` so `object-fit: cover` keeps the reference crop.
- **Primitives:** `Button` (primary/outline/inverse, xs/sm/md), `IconButton`
  (outline/filled/inverse), `LinkArrow`, `Eyebrow`, `Icon`, `BrandMark`,
  `Container` (default/narrow/wide/flush).
- **Motion:** restrained `--ease-out` transitions; all animation is disabled
  under `prefers-reduced-motion`.

---

## Header and navigation

The header is a transparent, non-sticky bar over the ivory field, laid out as a
three-zone grid: primary navigation left, brand lockup optically centred in the
viewport, accent call-to-action right.

| Property | Value |
|---|---|
| Height | 80 px desktop (`--header-height`), 64 px ≤ 768 px |
| Background | Transparent — the page field shows through |
| Brand | Spiral monogram SVG at 27 px + lowercase Bodoni Moda `estatia`, 22 px / 0.18em tracking |
| Primary links | `Home`, `Property`, `About us`, `Contact us`; 11 px uppercase Inter, 0.12em tracking |
| Link gap | `clamp(20px, 2vw, 28px)`; 10 px type and a 12 px gap at 769–960 px to keep a single line |
| Active / hover | Accent colour plus a hairline underline that wipes in from the left |
| Call to action | `Button` size `xs` — 12 × 20 px padding, 10 px label, pill radius, arrow icon |
| Sticky / fixed | None in the reference; the header scrolls with the page |

### Section anchors

Navigation targets canonical section IDs on the single-page layout. The
sections themselves arrive in later stages, so the hashes resolve once those
sections land:

| Label | Target |
|---|---|
| Home | `/` (site base) |
| Property | `#properties` |
| About us | `#about` |
| Contact us | `#contact` |

### Mobile navigation

Below 768 px the primary list and the standalone CTA collapse into a circular
menu toggle. The menu is a native `<details>` disclosure, so it opens without
JavaScript; `src/scripts/navigation.ts` adds close-on-navigate, Escape (focus
returns to the toggle), outside-click and desktop-resize handling, and keeps the
toggle's `aria-label` in sync. The panel is full-width below the bar and repeats
the four links plus the accent CTA.

All navigation is keyboard operable with the global `:focus-visible` ring;
`Home` carries `aria-current="page"` so the active state is exposed to assistive
technology. The brand lockup is an anchor back to the site root.

---

## Hero

The hero is the page's primary composition: a two-column display headline, a
bottom-aligned trust/meta cluster, a full-content-width photograph and a floating
search widget that overlaps the photograph's lower edge.

| Aspect | Implementation |
|---|---|
| Section rhythm | 64 px header → H1, 40 px H1 → image, image overlapped 50 px by the search card at 1440 px |
| Headline | Two lines: `Find Your Dream` upright, `Luxury Home` italic; Bodoni Moda, 95 px / 0.98 at 1440 px, `-0.025em` tracking |
| Text columns | `1.8fr / 0.95fr` (≈ 60 % / 32 %) with a 10 % gutter; meta block bottom-aligned to the H1 baseline |
| Meta cluster | `users` line icon + serif `4.5K+` + micro-caps label; 3-line muted paragraph at 13 px / 1.7 |
| Photograph | Local asset, 2.35:1, `--radius-xl` (40 px), `object-fit: cover`, subtle radial vignette; AVIF/WebP with a JPEG fallback and responsive `srcset` |
| Search widget | `--color-surface`, 40 px radius, `--shadow-float`, 97 px tall at 1440 px, 40 px inset from the image edges |
| Search contents | Vertical `For Sale` / `For Rent` radio tabs with an oxblood underline, four native selects (`Location`, `Type`, `Property`, `Price`), thin rules, accent `Search now` pill |
| Motion | 400 ms tab-underline wipe and a 3 px arrow shift on the CTA; both suppressed by `prefers-reduced-motion` |
| Image priority | `loading="eager"`, `fetchpriority="high"`; the production image is 75 KB AVIF at the mobile width and 398 KB at the 1600 px desktop step |

### Responsive behaviour

- **≤ 1024 px:** the text band stacks; the meta cluster moves below the H1; the
  search card becomes a stacked card with a two-column field grid and a
  full-width CTA.
- **≤ 768 px:** the menu collapses (header stage); the photograph switches to a
  1.45:1 crop so it remains legible.
- **≤ 480 px:** the H1 scales to `clamp(2.5rem, 11vw, 3.25rem)` and the photo to
  1.2:1; the two-line headline is preserved at 360–480 px.
- **≤ 320 px:** a final 2.1 rem headline step keeps the two-line lockup.

### Hero photograph

The original Estatia hero image was not present in the project or any supplied
folder, and the source template's assets could not be recovered. The current
image is the approved curated replacement:

| Property | Value |
|---|---|
| File | `src/assets/images/hero/hero-villa.jpg` |
| Source | [Unsplash CDN image `photo-1600585154340-be6161a56a0c`](https://images.unsplash.com/photo-1600585154340-be6161a56a0c) |
| Retrieved | 7 November 2026, 3200 × 2133 px |
| Licence | [Unsplash License](https://unsplash.com/license) — free for commercial use, attribution not required |
| Match | Dusk contemporary villa, warm glazing, mature trees and dark-green foliage at both edges. It is darker/timber-clad rather than the reference's curved travertine volumes; the original asset remains a pending input. |

The photographer/uploader is not exposed by the CDN URL. Add a credit line if the
original Unsplash page is confirmed.

### Copy status

The reference capture is too low-resolution to read the hero paragraph and filter
labels. `4.5K+`, `Happy clients`, the paragraph, the four field labels and their
option lists are inferred placeholders, not confirmed client copy. The H1 and the
`For Sale` / `For Rent` tabs are taken directly from the reference.

---

## Design and planning documents

| Document | Purpose |
|---|---|
| [`DESIGN_REFERENCE.md`](DESIGN_REFERENCE.md) | Section-by-section analysis of the reference design |
| [`PROJECT_AUDIT.md`](PROJECT_AUDIT.md) | Pre-implementation audit and implementation strategy |
| [`TECH_STACK.md`](TECH_STACK.md) | Stack research, versions and rejected alternatives |

---

## Performance budget

| Metric | Target |
|---|---|
| LCP (mobile, 4G) | ≤ 2.0 s |
| CLS | ≤ 0.02 |
| INP | ≤ 200 ms |
| JS (gzip) | ≤ 15 KB |
| CSS (gzip) | ≤ 25 KB |
| Hero image (AVIF, mobile) | ≤ 180 KB |
| Lighthouse | ≥ 95 across categories |

## Deployment

The build is fully static (`dist/`). `astro.config.mjs` is already configured
for a GitHub Pages project site:

```js
site: 'https://rohxama.github.io',
base: '/Real-Estate',
```

- **GitHub Pages (project site):** publish the contents of `dist/`. The base
  path is already applied to assets, canonical URLs and the sitemap.
- **Vercel / Netlify / Cloudflare Pages (domain root):** remove `base`, set
  `site` to the production origin, then rebuild. Build command:
  `npm run build`; output directory: `dist`.

## Pending inputs

These do not block development but must be resolved before launch:

- original hero photograph (the current image is the approved Unsplash replacement)
- licensed photography for the remaining sections
- final copy, listing data and FAQ answers, including the hero paragraph and
  search-filter labels/options currently inferred
- confirmation that Bodoni Moda + Inter are acceptable final typefaces (or
  licensed originals supplied)
- confirmation that the in-code spiral monogram matches the original mark
  (no vector asset was supplied)
- footer wordmark spelling confirmation

## Licence

Proprietary. All rights reserved unless stated otherwise.

The hero photograph is used under the Unsplash License; see
[Hero photograph](#hero-photograph) for the source and licence details.
