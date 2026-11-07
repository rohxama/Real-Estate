# Estatia — Luxury Real Estate

An editorial, single-page real estate website built from a supplied design
reference. Warm ivory surfaces, an oxblood accent, a Didone-style display face
and photography-led sections: hero search, brand statement, featured
properties, a numbered services accordion, a premium-estates collection, FAQ,
closing CTA and an oversized footer wordmark.

> **Status:** complete single-page build. The design system, header, hero,
> about, featured properties, services, collection, FAQ, CTA and footer are
> implemented and validated from 320 px to 1440 px. Original photography and
> final copy remain pending client inputs; every replacement is documented
> below.

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
│   │       ├── hero/         # hero photograph
│   │       ├── about/        # about collage
│   │       ├── properties/   # featured property cards
│   │       ├── services/     # service accordion panoramas
│   │       ├── collection/   # premium-estates thumbnails
│   │       └── cta/          # closing contact-band image
│   ├── components/
│   │   ├── layout/           # Container, Header, Footer
│   │   ├── sections/         # Hero, About, FeaturedProperties, Services,
│   │   │                     # Collection, Faq, Cta (+ HeroSearch)
│   │   └── ui/               # Button, IconButton, LinkArrow, Icon, Eyebrow,
│   │                         # BrandMark, SectionHeading, PropertyCard,
│   │                         # CollectionItem
│   ├── data/                 # typed content (site, navigation, properties,
│   │                         # collection, services, faqs)
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

## Page sections

All sections are assembled in reference order in `src/pages/index.astro`:
hero → about → featured properties → services → collection → FAQ → CTA →
footer. Headings share `SectionHeading`, which renders the upright first line
and the italic second line as block spans so the signature two-line lockup is
preserved at every breakpoint. Content lives in typed modules under
`src/data/`.

### About

| Aspect | Implementation |
|---|---|
| Kicker | `About us`, left-aligned above the centred heading |
| Heading | `Crafted for Exceptional` / *`Modern Luxury Living`* |
| Composition | 12-column grid: 3-column square image top-left, 5-column paragraph in the centre, 4-column 4:3 image lower-right |
| Decoration | Three concentric hairline ellipses at 9 % opacity and a circular `ESTATIA · PRIVATE COLLECTION` seal behind the collage; both are purely decorative and hidden ≤ 768 px |
| CTA | Oxblood `Learn more` pill with a 13 px arrow, placed in the lower-right quadrant of the copy column |
| Stagger | The smaller image sits higher than the larger one, reproducing the reference's deliberately asymmetric collage rather than a plain two-column split |
| Responsive | ≤ 1024 px the collage keeps its proportions with tighter sizing; ≤ 768 px it becomes copy → square image → large image → CTA |

The paragraph is a placeholder: the reference capture truncates it below
legibility.

### Featured properties

- Two columns of 4:3 cards at 46–47 % of the content width, with a
  `clamp(2rem, 6vw, 5rem)` downward offset on every second card. The result is
  the reference's staggered rhythm; cards have no boxes or shadows.
- The caption is a single baseline row: name left in Inter medium, price right
  in muted Bodoni-style numerals (`numeric` utility).
- `Explore all properties →` is a `LinkArrow` aligned to the heading baseline.
- ≤ 768 px the grid drops to one column and loses the stagger, matching the
  reference's stated responsive assumption.
- `Westmere House` `$1,500,000` and `Exeter House` `$1,200,000` are read from
  the reference. `Alder House` and `Marlow Estate` and their prices are
  documented placeholders.

### Services accordion

| Aspect | Implementation |
|---|---|
| Structure | Four native `<details name="services">` rows; row `01` is open on load |
| Row anatomy | Serif index (`01`–`04`), Inter title, 40 px circular control at the far right, hairline divider |
| Panel | 28 % description column + 72 % panorama at 2.3:1, with a 1 px inner hairline on the image |
| Icons | CSS swaps `+` for `−` when the row is open; the control fills oxblood in the open state |
| Behaviour | The shared `name` attribute gives one-open-at-a-time behaviour without JavaScript; `<summary>` is natively focusable and keyboard operable |
| Motion | `interpolate-size: allow-keywords` animates the native details content height where supported; browsers without it get an instant open with no layout risk |
| Responsive | ≤ 768 px the description stacks above the image and the image crops to 1.6:1 |

Descriptions for all four rows and the photographs for rows `02`–`04` are
placeholders; the reference only shows row `01` expanded.

### Collection / premium estates

- Static 2-column × 4-row grid of eight items, with the right column mirrored
  (thumbnail right, text left) exactly as specified in the reference.
- Each item is a 42 % / 58 % media-to-text split. The text block contains the
  name, location and a compact spec stack (`Sq. Ft.`, `Beds`, `Baths`) capped at
  `9.5rem`, so labels and values stay close at every width.
- The section header pairs a small left-aligned heading with a muted paragraph
  and the `View all properties →` pill.
- **Carousel arrow omitted.** The reference shows a single circular next control
  at the right edge, but only eight listing names are known. Inventing
  additional listings to fill a carousel would break copy fidelity, so the
  complete known set is shown as a static grid. The interaction can be restored
  when more inventory is supplied.
- ≤ 1024 px the header stacks; ≤ 768 px the grid becomes a single column and
  every row returns to thumbnail-left / text-right.
- Names are from the reference; locations and specifications are placeholders.

### FAQ

- 0.72 / 1 split: `Frequently` / *`Asked Question?`* on the left, accordion on
  the right. The singular `Question?` spelling is preserved from the reference.
- Four native `<details name="faq">` rows; the first is open and filled with
  `--color-accent-deep`, cream text and a circular `−`. Collapsed rows sit on
  cream with hairline separators and `+` controls.
- One-open-at-a-time via the shared `name` attribute; keyboard and no-JS
  behaviour come from the native element.
- Answers are placeholders. The reference lists one or two further rows that are
  illegible; only the four readable questions are included.

### CTA / contact band

- 46 / 48 split on cream, never a dark band: two-line heading
  (`Find Your Signature Home` / *`Today. Explore the Collection`*), a short
  paragraph, the `Book a private viewing` pill, then a four-item metadata grid
  (phone, email, studio, Instagram).
- The image is a 2.05:1 rounded plate with a soft shadow, matching the
  reference's symmetrical classical villa and lawn.
- ≤ 768 px the content stacks and the image retains a wide crop; ≤ 480 px the
  metadata becomes a single column.

Phone, email, studio address, the button label and the Instagram link are
placeholders.

### Footer

- A single full-bleed band: two oversized Bodoni Moda `estatia` fragments in
  oxblood, separated by the circular spiral monogram. `overflow: hidden` clips
  both outer edges, reproducing the reference's `STATIA ◉ ESTATI` crop.
- No link columns, legal row or copyright line — none are visible in the
  reference and none were invented.
- The brand spelling is inferred from the site name rather than the cropped
  glyphs; confirm with the client if the wordmark differs.

### Responsive summary

| Breakpoint | Behaviour |
|---|---|
| 1440 / 1280 px | Full reference composition; 1360 px container, fluid gutters |
| 1024 px | About collage compresses, collection header stacks, split sections keep their two-column headings |
| 768 px | Mobile navigation, single-column about/featured/collection/CTA, stacked service panels, scaled footer wordmark |
| 480–320 px | Headings scale down but keep the italic second half; metadata and spec stacks reflow; footer remains edge-to-edge |

Validated at 1440, 1280, 1024, 768, 480, 390, 360 and 320 px with no horizontal
overflow.

### Interaction and accessibility

- Accordions use native `<details>`/`<summary>` with a shared `name`, so the
  one-open rule, focus handling and no-JS behaviour are browser-native.
- The hero search is a real `<form role="search">` that submits to
  `#properties`; tabs are native radios and remain keyboard operable.
- Mobile navigation is a native disclosure with close-on-navigate, Escape
  (focus returns to the toggle), outside-click and aria-label syncing.
- Every content image carries descriptive alternative text; decorative arcs,
  the seal and the footer wordmark are hidden from assistive technology.
- `prefers-reduced-motion` disables the card/image zoom and underline/arrow
  transitions.
- Axe (WCAG 2.1 A/AA + best practice) reports no structural, landmark, heading
  or labelling violations. The only finding is colour contrast on the muted
  token, described under [Known limitations](#known-limitations).

---

## Photography and licensing

The original Estatia photography was not supplied. Every slot is filled with a
free-licence Unsplash or Pexels image, retrieved 7 November 2026 at 2200 px on
the long edge (CTA: 2000 px) and served through Astro Assets as AVIF/WebP with a
JPEG fallback.

| Section | File | Source | Licence |
|---|---|---|---|
| About | `about/about-house.jpg` | [Unsplash `photo-1600047509782-20d39509f26d`](https://images.unsplash.com/photo-1600047509782-20d39509f26d) | Unsplash |
| About | `about/about-villa.jpg` | [Unsplash `photo-1580587771525-78b9dba3b914`](https://images.unsplash.com/photo-1580587771525-78b9dba3b914) | Unsplash |
| Properties | `properties/westmere-house.jpg` | [Unsplash `photo-1570129477492-45c003edd2be`](https://images.unsplash.com/photo-1570129477492-45c003edd2be) | Unsplash |
| Properties | `properties/exeter-house.jpg` | [Pexels 259588](https://www.pexels.com/photo/259588/) | Pexels |
| Properties | `properties/alder-house.jpg` | [Unsplash `photo-1613977257363-707ba9348227`](https://images.unsplash.com/photo-1613977257363-707ba9348227) | Unsplash |
| Properties | `properties/marlow-estate.jpg` | [Unsplash `photo-1600047509807-ba8f99d2cdde`](https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde) | Unsplash |
| Services | `services/residential-designs.jpg` | [Unsplash `photo-1600210492486-724fe5c67fb0`](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0) | Unsplash |
| Services | `services/commercial-interiors.jpg` | [Unsplash `photo-1600607687939-ce8a6c25118c`](https://images.unsplash.com/photo-1600607687939-ce8a6c25118c) | Unsplash |
| Services | `services/hospitality-spaces.jpg` | [Unsplash `photo-1600607687920-4e2a09cf159d`](https://images.unsplash.com/photo-1600607687920-4e2a09cf159d) | Unsplash |
| Services | `services/retail-environments.jpg` | [Pexels 7031409](https://www.pexels.com/photo/7031409/) | Pexels |
| Collection | `collection/marble-house.jpg` | [Unsplash `photo-1613490493576-7fde63acd811`](https://images.unsplash.com/photo-1613490493576-7fde63acd811) | Unsplash |
| Collection | `collection/waterfront-estate.jpg` | [Unsplash `photo-1600596542815-ffad4c1539a9`](https://images.unsplash.com/photo-1600596542815-ffad4c1539a9) | Unsplash |
| Collection | `collection/royal-villa.jpg` | [Pexels 1396122](https://www.pexels.com/photo/1396122/) | Pexels |
| Collection | `collection/casa-belle.jpg` | [Unsplash `photo-1564013799919-ab600027ffc6`](https://images.unsplash.com/photo-1564013799919-ab600027ffc6) | Unsplash |
| Collection | `collection/lakeview-manor.jpg` | [Unsplash `photo-1512917774080-9991f1c4c750`](https://images.unsplash.com/photo-1512917774080-9991f1c4c750) | Unsplash |
| Collection | `collection/seaside-villa.jpg` | [Unsplash `photo-1600607688969-a5bfcd646154`](https://images.unsplash.com/photo-1600607688969-a5bfcd646154) | Unsplash |
| Collection | `collection/villa-serenity.jpg` | [Unsplash `photo-1600573472592-401b489a3cdc`](https://images.unsplash.com/photo-1600573472592-401b489a3cdc) | Unsplash |
| Collection | `collection/ivy-court.jpg` | [Unsplash `photo-1600585154526-990dced4db0d`](https://images.unsplash.com/photo-1600585154526-990dced4db0d) | Unsplash |
| CTA | `cta/signature-home.jpg` | [Pexels 208736](https://www.pexels.com/photo/208736/) | Pexels |

- [Unsplash License](https://unsplash.com/license) — free for commercial use,
  attribution not required.
- [Pexels License](https://www.pexels.com/license/) — free for commercial use,
  attribution not required.

The photographer/uploader is not exposed by the CDN URLs. Add credits if the
original source pages are confirmed. Replacement photography remains a pending
client input.

---

## Placeholder content

The reference is a low-resolution capture; the following content is written to
fit the layout and must be confirmed before launch:

| Area | Confirmed from reference | Placeholder |
|---|---|---|
| Hero | H1, `For Sale` / `For Rent` tabs, `4.5K+` | hero paragraph, `Happy clients`, filter labels and options |
| About | kicker, heading, CTA intent | paragraph, `Learn more` label |
| Featured | `Westmere House` / `Exeter House`, visible price prefixes | `Alder House`, `Marlow Estate`, all four complete prices |
| Services | four row titles, row `01` open | all descriptions; images for rows `02`–`04` |
| Collection | all eight names, four spec labels, mirrored layout | locations and every spec value |
| FAQ | four questions, singular `Question?` | all answers |
| CTA | heading, layout | paragraph, button label, phone, email, studio address, Instagram URL |
| Footer | clipped wordmark + monogram layout | confirmed spelling of `estatia` |

---

## Quality checks

| Check | Result |
|---|---|
| `npm run build` (`astro check` + static build) | 0 errors, 0 warnings, 0 hints |
| Responsive | 1440 / 1280 / 1024 / 768 / 480 / 390 / 360 / 320 px, no horizontal overflow |
| Console / page errors | none |
| CLS (desktop and mobile, full-page scroll) | ≈ 0.002 |
| Accordions | one open at a time, Enter toggles, `+` / `−` swap, works without JS |
| Mobile navigation | opens, Escape closes and restores focus, aria-label stays in sync |
| Hero search | keyboard-operable tabs, submits to `#properties` |
| Axe (WCAG 2.1 A/AA + best practice) | no structural violations; muted-token contrast is the only finding |

### Known limitations

- `--color-muted` (`#8c8177`) measures ≈ 3.55:1 on `--color-bg` and ≈ 3.74:1 on
  `--color-surface`, below the WCAG AA 4.5:1 threshold for normal text. The
  value is taken from the reference palette and is used intentionally for
  meta/caption text; darkening it to about `#6f655c` would reach AA without
  changing the design language.
- The collection carousel control is omitted because only eight listings are
  known; the static grid is complete for that set.
- Stock photography replaces unsupplied originals; the crops, subjects and
  palette are curated matches, not the reference photographs.

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

These do not block the build but must be resolved before launch:

- original photography for every section (current images are documented
  Unsplash/Pexels replacements)
- final copy: about/CTA paragraphs, all property and collection metadata,
  service descriptions, FAQ answers and contact details
- additional collection listings if the reference's carousel is required
- confirmation that Bodoni Moda + Inter are acceptable final typefaces (or
  licensed originals supplied)
- confirmation that the in-code spiral monogram matches the original mark
  (no vector asset was supplied)
- footer wordmark spelling confirmation
- sign-off on the muted text token, which currently sits below WCAG AA contrast
  (see [Known limitations](#known-limitations))

## Licence

Proprietary. All rights reserved unless stated otherwise.

The photography is used under the Unsplash and Pexels licences; see
[Photography and licensing](#photography-and-licensing) for the complete source
list.
