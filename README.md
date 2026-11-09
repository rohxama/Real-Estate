# Estatia — Luxury Real Estate

An editorial, single-page real estate website built from a supplied design
reference. Warm ivory surfaces, an oxblood accent, a Didone-style display face
and photography-led sections: hero search, brand statement, featured
properties, a numbered services accordion, a premium-estates collection, FAQ,
closing CTA and an oversized footer wordmark.

> **Status:** complete single-page build, performance/SEO/accessibility pass and
> final visual/functional audit applied. The design system, header, hero,
> about, featured properties, services, collection, FAQ, CTA and footer are
> implemented and validated from 320 px to 1920 px, including touch-target and
> coarse-pointer checks. Current
> Lighthouse results are 95–99/100/100/100 (mobile) and 100/100/100/100
> (desktop); see [Performance, SEO and accessibility](#performance-seo-and-accessibility).
> Original photography and final copy remain pending client inputs; every
> replacement is documented below.

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
| SEO | @astrojs/sitemap + JSON-LD | 3.7.4 |
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
│   ├── .nojekyll            # lets GitHub Pages serve _astro/
│   ├── favicon.svg
│   ├── fonts/                # SIL OFL notices for the vendored fonts
│   ├── og-estatia.jpg        # 1200 × 630 social share card
│   └── robots.txt
├── src/
│   ├── assets/
│   │   ├── fonts/            # three self-hosted latin variable woff2 files
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
│   │                         # collection, services, faqs) + schema.ts JSON-LD
│   ├── layouts/
│   │   └── BaseLayout.astro  # document shell, SEO/OG meta, fonts, JSON-LD
│   ├── pages/
│   │   ├── index.astro       # single page entry
│   │   └── design-system.astro  # noindex style guide (verification only)
│   ├── scripts/              # progressive-enhancement TS modules
│   │   ├── main.ts           # single entry point
│   │   ├── navigation.ts     # mobile disclosure behaviour
│   │   └── reveals.ts        # one IntersectionObserver for scroll reveals
│   ├── styles/
│   │   ├── fonts.css         # latin-only @font-face declarations
│   │   ├── tokens.css        # colour, type, spacing, layout, radius, motion
│   │   ├── base.css          # reset and element defaults
│   │   ├── typography.css    # display/heading/body/label roles
│   │   ├── layout.css        # container, section, grid, media, utilities
│   │   ├── motion.css        # scroll reveals, reduced-motion safety net
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
| `--color-muted` | `#746a60` | Captions, meta (AA contrast) |
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

Only the three faces the site renders are declared in `src/styles/fonts.css`
and vendored into `src/assets/fonts/` — Bodoni normal, Bodoni italic and Inter
normal, latin subset only. They were sourced from Fontsource 5.3.0; the
Fontsource packages are no longer installed because the woff2 files are
committed and nothing imports the package CSS. The SIL OFL notices are
included at `public/fonts/OFL-Bodoni-Moda.txt` and `public/fonts/OFL-Inter.txt`.
All three files are preloaded from `BaseLayout`; the full Fontsource stylesheet
(≈20 KB covering Cyrillic, Greek, Vietnamese, maths and symbols) is not
imported.

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
- **Motion:** restrained `--ease-out` transitions (400–700 ms); scroll
  reveals, hover nudges and the mobile panel are suppressed under
  `prefers-reduced-motion`. See [Motion and interaction](#motion-and-interaction).

---

## Motion and interaction

The reference motion character is restrained: 400–700 ms, `ease-out`, no
bounce and no parallax. Only a few elements move — headings and media enter
once, interactive controls respond on hover/focus/press, and accordions and the
mobile panel open with a short fade and rise. There is no animation loop,
no scroll listener and no continuous motion.

### Architecture

| Decision | Implementation |
|---|---|
| Smooth scrolling | Native `scroll-behavior: smooth` in `base.css`; no Lenis or GSAP. The page is short, the anchor set is small, and the browser implementation avoids another dependency. Set to `auto` under reduced motion. |
| Scroll reveals | `src/scripts/reveals.ts` creates **one** `IntersectionObserver` for every `[data-reveal]` element, adds `.is-revealed`, then unobserves it. No scroll handler, no layout measurement and no rAF loop. |
| Progressive enhancement | Content is visible by default. `reveals.ts` adds `html.reveal-ready` only when it can reveal; the hidden state lives behind that class. Without JavaScript or without `IntersectionObserver`, nothing is hidden. |
| Reduced motion | The hidden state and reveal keyframes only exist under `prefers-reduced-motion: no-preference`. If the preference changes at runtime, the observer disconnects and every target is made visible. A global safety net also collapses remaining durations and smooth scroll to their end state. |
| Why CSS | All motion is opacity/translate/scale or colour; there is no sequence that needs GSAP. Keeping it in CSS means no animation runtime on the critical path. |
| Why animations rather than transitions for reveals | A transition declared on `[data-reveal]` would replace a button's or link's own transition list. Reveal keyframes animate only `opacity`, `translate` and `scale`, so component hover transitions keep working. |
| Stagger | A per-element `--reveal-delay` (0–180 ms) offsets paired items and copy blocks. Only pairs stagger; the whole page never moves at once. |

`motion.css` is imported after the layout styles, and `reveals.ts` is imported
from `src/scripts/main.ts` beside the navigation module. The hero is the only
section that does not use the reveal observer: its typography plays a one-time
entrance on load and its photograph is deliberately untouched.

### Interaction inventory

| Element | Behaviour |
|---|---|
| Hero headline | Two-line translate-only entrance (700 ms, second line +90 ms); no opacity on the title, so the first paint still contains the LCP text. |
| Hero meta | Fade + 12 px rise at 160 ms. |
| Section headings, copy blocks, cards, collection items, FAQ and footer band | Fade + 20 px rise on first intersection (700 ms); media also scales from 0.985. |
| Property cards / collection items | Image scales 1.03 / 1.04 on hover (700 ms). |
| Services rows | Title turns accent on hover; control fills oxblood when open; `+` and `−` rotate/cross-fade instead of swapping with `display`; panel fades and rises; image scales 1.02 on hover. |
| FAQ rows | Same icon morph; open row fills oxblood with cream text; answer fades and rises. Padding is identical in both states so question text never shifts horizontally. |
| Desktop navigation | Accent colour plus a 1 px underline that wipes in from the left (400 ms). |
| Mobile navigation | Panel fades and drops 8 px in/out (400 ms) using `@starting-style` + `display ... allow-discrete`; links nudge their arrow 2 px on hover; toggle bars morph to a close icon. |
| Hero search | Active tab underline wipes between labels; field labels darken on hover/focus; chevron rotates 180° while the select has focus; submit arrow shifts 3 px. |
| Buttons / link arrows | Background or border darkens; trailing arrow nudges 2–3 px; buttons press down 1 px. |
| Accordions | Native `<details name>` open/close height via `interpolate-size: allow-keywords` where supported; one row open at a time everywhere. |

### Deliberate omissions

- **No Lenis.** Native smooth scrolling already matches the reference's calm
  anchor behaviour, and reduced motion disables it.
- **No GSAP.** No timeline, pinning, scroll-scrubbed sequence or staggered
  choreography justifies the runtime.
- **No page transitions.** The site is a single static page; anchor navigation
  is the only route change.
- **No collection carousel.** The reference shows a next control, but only
  eight listings are known. Inventing inventory to fill a carousel would break
  copy fidelity; the grid stays static. Hover zooms still provide feedback.
- **No loading overlay or spinner.** The page is statically rendered and the
  hero image is preloaded; a synthetic loader would delay content. The hero
  typography entrance is the only load-time effect.

### Motion validation

| Check | Result |
|---|---|
| `npm run build` (`astro check` + static build) | 0 errors, 0 warnings, 0 hints |
| Reveal targets | 30 / 30 revealed after a full desktop scroll; 30 / 30 on a 390 px viewport (footer included) |
| No-JS | `reveal-ready` absent, 0 hidden targets, first FAQ and first service still open |
| Reduced motion | `reveal-ready` absent, 0 hidden targets, `scroll-behavior: auto`, hover zooms `none`, hero animation 0.01 ms |
| Hover states | card zoom 1.03, service zoom 1.02, link arrow +3 px, button arrow +2 px, button press +1 px |
| Accordions | one open at a time; icon opacity swaps; FAQ answers become visible; question left edges identical (686.4 px) |
| Navigation | mobile panel opens/closes in ≈400 ms, `aria-label` syncs, Escape returns focus to the toggle, link click closes and navigates |
| Hero search | underline moves to the checked tab; focused chevron rotates 180°; submit arrow nudges |
| Console / page errors | none |
| CLS (1440 px full-page scroll with reveals) | ≈ 0.0021–0.0026 |
| Horizontal overflow | 0 px at 1440, 1280, 1024, 768, 480, 390, 360 and 320 px |

`@starting-style`, transitionable `display` and `::details-content` are
progressive: browsers without them get an instant open/close with no layout or
content risk. The reduced-motion safety net guarantees that even component
transitions without an explicit guard collapse to their end state.

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

At ≤ 768 px the primary list collapses into the menu toggle. The standalone CTA
stays beside the toggle from 601–768 px, then moves into the panel at ≤ 600 px;
this prevents the centred wordmark from colliding with the CTA on 481–600 px
screens while keeping the action available one tap away.

### Section anchors

Navigation targets canonical section IDs on the single-page layout:

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
| Section rhythm | 64 px header → H1, 40 px H1 → image, image overlapped ~65 px by the search card at 1440 px |
| Headline | Two lines: `Find Your Dream` upright, `Luxury Home` italic; Bodoni Moda, 95 px / 0.98 at 1440 px, `-0.025em` tracking, warm cocoa `#5f3b2f` with the italic line stepping to `#8d6a55` |
| Text columns | `1.8fr / 0.95fr` (≈ 60 % / 32 %) with a 10 % gutter; meta block bottom-aligned to the H1 baseline |
| Meta cluster | Three overlapping 34 px avatar discs with a serif `+50K` (screen readers hear `+50K happy clients`); 3-line muted paragraph at 13 px / 1.7 |
| Photograph | Local asset, 2.35:1 (2200 × 936), `--radius-xl` (40 px), `object-fit: cover`; the sky is keyed to `#f3eee4` so the card reads as one continuous cream surface, with no vignette. AVIF/WebP with a JPEG fallback and responsive `srcset` |
| Search widget | `--color-surface`, `--radius-sm` (14 px), `--shadow-float`, 127 px tall at 1440 px, 40 px inset from the image edges |
| Search contents | Radio tabs `Residential` (default) / `Apartment` / `Commercial` as accent pills, then four native selects (`Bedroom`, `Country`, `Currency`, `Starting From`) split by hairlines, and the accent `Search Properties` pill. Submits `GET` to `#properties`. |
| Motion | 200 ms pill fill on the tabs, chevron flip in the focused field and a 3 px arrow shift on the submit; all suppressed by `prefers-reduced-motion` |
| Image priority | `loading="eager"`, `fetchpriority="high"`; 12 KB AVIF at the 480 px step and 76 KB at the 1600 px step |

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

The hero uses the client's own uploaded villa render. The supplied PNG already
ships with a clean transparent background, so nothing is keyed or masked: the
cut-out is trimmed to its opaque bounding box and composited onto the page cream.

| Property | Value |
|---|---|
| File | `src/assets/images/hero/hero-estate.jpg` |
| Source | Client-supplied cut-out render, `src/assets/images/hero/source/modern-two-story-luxury-villa.png` (1579 × 996, 4-channel PNG, transparent) |
| Composition | Trimmed to 1393 × 953, scaled to 1681 × 1150, centred with a 260 px side margin and a 24 px top margin; the ground floor runs under the search panel |
| Output | 2200 × 936 px (2.35:1), 167 KB mozjpeg (quality 88); the AVIF/WebP steps are generated by Astro at build time |
| Backdrop | Solid `#f3eee4` (`--color-bg-alt`), so the card edge disappears into the page |

Because the artwork arrives pre-cut, the earlier colour-keying workaround is
retired. Keying was only needed when the source photograph had a sky behind
white walls; here the alpha channel is authored, so the walls and balcony edges
stay crisp and the background is exactly the page cream.

### Search widget

The widget follows the later screenshot supplied by the client, replacing the
`For Sale` / `For Rent` version measured from the original reference:
`Residential` / `Apartment` / `Commercial` pills over `Bedroom`, `Country`,
`Currency` and `Starting From`, with a `Search Properties` submit. Fields are
native selects — arrow keys, type-ahead and the platform picker all work — and
`Any` submits an empty value while `Currency` keeps its `USD` default. Below
64 rem the fields become a 2 × 2 grid with a full-width submit, and coarse
pointers get 44 px tap targets.

### Copy status

The original reference capture is too low-resolution to read the hero paragraph
and its filter labels, so the earlier hero copy was a placeholder. The client's
second screenshot supplied the current hero copy (`Not just a home…`), the
`+50K` client count and the avatar cluster, and the search screenshot supplied
the tab labels (`Residential` / `Apartment` / `Commercial`) and the four field
labels (`Bedroom`, `Country`, `Currency`, `Starting From`). Only the option lists
under those four fields remain inferred.

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
- 641–768 px keeps the two-up staggered rhythm at ≈ 337 px per card; ≤ 640 px
  the grid drops to one column and loses the stagger.
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
- ≤ 1024 px the header stacks; 641–768 px keeps the two-column collection grid;
  ≤ 640 px it becomes a single column and every row returns to
  thumbnail-left / text-right.
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
- ≤ 1024 px the content stacks and the image retains a wide 2.2:1 crop; ≤ 768 px
  it narrows to 1.8:1, ≤ 480 px to 1.5:1 and the metadata becomes a single
  column.

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

### Responsive design

The layout is designed from the desktop reference down, but every breakpoint
introduces a deliberate reflow rather than shrinking the desktop canvas.

| Reflow point | Range | What changes |
|---|---|---|
| Desktop | ≥ 1025 px | Reference composition unchanged: 1360 px container, fluid gutters, 96 px H1, two-up property and collection grids, split about/CTA/FAQ |
| Tablet landscape | 769–1024 px | Hero text band and split sections stack; search becomes a 2 × 2 field card; collection header stacks; desktop nav remains |
| Tablet portrait | 641–768 px | Mobile menu; hero photograph crops to 1.45:1; featured and collection stay two-up; service copy and panorama stack |
| Large phone | 481–640 px | Single-column featured and collection grids; 1.2:1 hero; header CTA hidden at ≤ 600 px; two-column CTA metadata |
| Phone | 321–480 px | Type scale tightens while keeping the two-line lockup; CTA metadata single column; footer wordmark scales |
| Small phone | ≤ 320 px | Final 2.1 rem headline step; spec stacks and metadata retain their hierarchy |

#### Key adaptations

- **Header / navigation** — three-zone desktop grid preserved; the menu
  collapses at 768 px. The CTA stays beside the toggle until 600 px, then moves
  into the scrollable panel so the centred brand never collides with it.
- **Hero** — the split headline/meta band stacks at 1024 px; the photograph
  keeps its reference 2.35:1 crop on desktop, moves to 1.45:1 at 768 px and
  1.2:1 at 480 px. The search card changes from a single row to a 2 × 2 grid
  with a full-width submit.
- **Images** — every `<Picture>` has AVIF/WebP sources, a JPEG fallback and a
  `sizes` value that matches its rendered width at each breakpoint. The hero is
  eager/high priority; all below-fold imagery is lazy and async.
- **Text** — display headings use `clamp()` with explicit small-phone steps;
  body copy is capped at 62 ch (CTA) / 58 ch (FAQ answers, tablet service copy)
  and hero copy at 52 ch so line length stays comfortable on wide tablets.
- **Grids** — featured and collection keep their paired rhythm through 768 px
  (641 px minimum) and stack only on phones; the four-field search, CTA
  metadata and spec stacks reflow independently of the main section grids.
- **Footer** — the oversized wordmark scales with `clamp(3.5rem, 13.5vw, 13.5rem)`
  and remains intentionally clipped by `overflow: hidden`; the document itself
  never overflows.

#### Touch and input

- `@media (pointer: coarse)` adds 44 px minimum height to every button and
  native search select, and expands the hit areas of the brand, desktop nav
  links, link arrows and CTA contact links with pseudo-elements. The visible
  boxes keep the reference proportions.
- Mobile nav rows have a 44 px minimum height and the panel is capped at
  `100svh − header` with `overflow-y: auto` and `overscroll-behavior: contain`,
  so it remains usable on short landscape phones.
- Verified on 390 × 844, 390 × 667, 667 × 375 (landscape), 844 × 390 and
  320 × 568: the panel and CTA stay reachable at every height.

#### Responsive validation

| Check | Result |
|---|---|
| Viewport sweep | 1920, 1600, 1440, 1280, 1024, 820, 768, 480, 430, 390, 375, 360, 320 |
| Horizontal overflow | 0 px at every viewport; only the intentionally clipped footer wordmark exceeds the box |
| Console / page errors | 0 |
| Header sweep | 320, 360, 375, 390, 430, 480, 481, 500, 560, 600, 601, 620, 640, 700, 767, 768, 769, 780, 800, 850, 900, 950, 960, 961, 1000, 1024, 1100, 1200 — no overlap; minimum brand/actions gap 21 px at 610 px |
| Touch probes | brand, nav links, link arrows and CTA phone/email/Instagram links all respond 10–14 px above and below their visible boxes (≥ 44 px effective target) |
| Reveals | 30 / 30 targets revealed on desktop and mobile |
| CLS | ≈ 0.0021 after a full-page scroll with reveals |
| Build | 0 errors, 0 warnings, 0 hints |

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
- Axe (WCAG 2.1 A/AA + best practice) reports no violations at 1440 px or 390 px.
  The previous muted-token contrast finding is fixed (`#746a60`, ≈4.9:1); see
  [Performance, SEO and accessibility](#performance-seo-and-accessibility).

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
| Hero | H1, hero paragraph, `+50K` with avatars, `Residential` / `Apartment` / `Commercial` tabs, the four field labels | the option lists under the four fields |
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
| Responsive | 1920 / 1600 / 1440 / 1280 / 1024 / 820 / 768 / 480 / 430 / 390 / 375 / 360 / 320 px, no horizontal overflow |
| Touch targets | 44 px effective areas on coarse pointers; header, nav, link arrows and CTA contact links included |
| Console / page errors | none |
| CLS (desktop and mobile, full-page scroll) | 0 |
| Accordions | one open at a time, Enter toggles, `+` / `−` swap, works without JS |
| Mobile navigation | opens, Escape closes and restores focus, aria-label stays in sync |
| Hero search | keyboard-operable tabs, submits to `#properties` |
| Axe (WCAG 2.1 A/AA + best practice) | 0 violations on desktop (1440 px) and mobile (390 px) |
| Lighthouse mobile | 95–99 performance / 100 accessibility / 100 best practices / 100 SEO |
| Lighthouse desktop | 100 / 100 / 100 / 100 |

### Known limitations

- The collection carousel control is omitted because only eight listings are
  known; the static grid is complete for that set.
- Stock photography replaces unsupplied originals; the crops, subjects and
  palette are curated matches, not the reference photographs.
- On phones the search card is ≈ 320 px tall because every native select gets a
  44 px tap height. This intentionally favours touch accuracy over compactness;
  the card still clears the fold on a 390 × 844 device.
- Desktop hit boxes remain visually compact (11 px labels, 27 px brand). The
  44 px touch areas are invisible pseudo-element expansions and only apply to
  coarse pointers, so mouse layouts are unchanged.
- Lighthouse's desktop run still estimates ≈210 KiB of responsive-image
  headroom on conservative `sizes` values. The images are already served at
  the nearest correct step; closing the estimate would require pixel-perfect
  breakpoint variants for a 1–3 % rendered-width gap, not a real payload win.
- Mobile Lighthouse scores vary by run (95–99 performance across re-runs, with
  identical assets); LCP and TBT move with the emulated CPU and network. Re-run
  before quoting a number.

---

## Design and planning documents

| Document | Purpose |
|---|---|
| [`DESIGN_REFERENCE.md`](DESIGN_REFERENCE.md) | Section-by-section analysis of the reference design |
| [`PROJECT_AUDIT.md`](PROJECT_AUDIT.md) | Pre-implementation audit and implementation strategy |
| [`TECH_STACK.md`](TECH_STACK.md) | Stack research, versions and rejected alternatives |

---

## Performance, SEO and accessibility

### How the numbers were measured

Lighthouse 12 with its bundled Chromium, against the production build served by
`astro preview` at `http://127.0.0.1:4321/Real-Estate/`. Mobile emulates a
390 × 844 viewport at DPR 2 with 150 ms RTT, 1.6 Mbps throughput and 4× CPU
slowdown; desktop emulates 1350 × 940 at DPR 1 with 40 ms RTT, 10 Mbps and no
CPU slowdown. These are lab measurements on a local server, not field data;
mobile scores move by a few points between runs.

### Before and after

| Metric | Mobile before | Mobile after | Desktop before | Desktop after |
|---|---:|---:|---:|---:|
| Performance | 93 | **99** | 99 | **100** |
| Accessibility | 96 | **100** | 97 | **100** |
| Best practices | 100 | **100** | 100 | **100** |
| SEO | 100 | **100** | 100 | **100** |
| FCP | 1.7 s | **0.9 s** | 0.4 s | **0.3 s** |
| LCP | 3.1 s | **2.1 s** | 0.8 s | **0.8 s** |
| TBT | 0 ms | 40 ms | 0 ms | 10 ms |
| CLS | 0.002 | **0** | 0.003 | **0** |
| Total transfer | 1,002 KiB | **570 KiB** | 822 KiB | **695 KiB** |
| Render-blocking estimate | 790 ms | **120 ms** | 110 ms | **0 ms** |
| Responsive-image waste | 341 KiB | **0** | — | (≈210 KiB estimate) |

The mobile "after" column reports the best of repeated runs. Re-runs measured
95–99 mobile performance (LCP 2.1–2.9 s, TBT 30–40 ms) with identical assets;
the spread comes from Lighthouse's simulated-throttling model, not a code
change. Desktop measured 100 on every run.

The 30–40 ms mobile TBT is one short task under the emulated 4× CPU profile, not
a long-task regression: the page ships ≈1.2 KB of inline JavaScript and no
external script. Mobile LCP improved because the hero now serves a 720 w AVIF
(≈78 KB at DPR 2) instead of the 960–1280 w files the previous `sizes` selected.

### What changed

**Images**

- Every photographic slot already used Astro's `<Picture>` with AVIF, WebP and a
  JPEG fallback. The pass tuned `widths`, `sizes` and `quality` per component:
  hero 75, property cards 72, about/services 74, CTA 76, collection 72.
- The hero dropped its unused 3200 w step and gained 480/720 w steps, so phones
  fetch a much smaller file; below-fold images keep `loading="lazy"` and
  `decoding="async"`, while the hero stays `eager` + `fetchpriority="high"`.
- `sizes` now matches the rendered box at each breakpoint, including the
  90–100 vw phone layouts. Mobile responsive-image warnings are gone.
- Build output fell from 36.18 MB to 28.79 MB (259 → 276 files with more
  breakpoint variants but lower quality and no 3200 w hero).

**Fonts**

- Replaced the three Fontsource stylesheets (≈20 KB of `@font-face` rules for
  Cyrillic, Greek, Vietnamese, maths and symbols) with `src/styles/fonts.css`:
  three latin-only variable faces, `font-display: swap`, explicit
  `unicode-range`.
- The three woff2 files (102 KB total) are self-hosted, hashed by Vite and
  preloaded in `BaseLayout`. The woff2 files are vendored with their SIL OFL
  notices under `public/fonts/`, so the Fontsource packages are no longer
  dependencies.

**CSS and JavaScript**

- No UI framework, no CSS framework, no animation library, no smooth-scroll
  library, no polyfills. CSS is native and component-scoped; one shared module
  handles navigation and reveals.
- The home page loads two stylesheets totalling ≈47 KB uncompressed / **9.1 KB
  transferred** and ≈1.2 KB of inline JavaScript. There are no external script
  requests.
- `build.inlineStylesheets: 'auto'` was chosen by measurement: `'always'`
  removed the render-blocking request but produced 91–93 mobile performance
  with 180–350 ms TBT; `'auto'` measured 99 with 40 ms. Astro inlines the small
  per-page chunk and keeps the shared one cacheable.
- No unused CSS or JS audit flagged anything above Lighthouse's reporting
  threshold; the unused Fontsource subsets were the real dead weight and are
  gone.

**Stability and motion**

- Every image sits in a fixed `aspect-ratio` box, so loading never shifts
  layout; fonts use `swap` and metric-compatible fallbacks; reveals animate only
  `opacity`/`translate`/`scale`, never layout properties.
- CLS measured 0 on both profiles, and 0 through a full-page scroll with
  reveals active.
- All motion already lived behind `prefers-reduced-motion: no-preference`; the
  pass re-verified it (0 hidden targets, no hover zoom, 0.01 ms durations under
  reduced motion).

**SEO**

- Descriptive `<title>` and meta description, one `<h1>`, canonical URL,
  `robots` meta, `theme-color`, full Open Graph (`og:type`, `og:site_name`,
  `og:locale`, `og:title`, `og:description`, `og:url`, `og:image` with type,
  1200 × 630 dimensions and alt) and a `summary_large_image` Twitter card.
- A generated 1200 × 630 JPEG share image at `public/og-estatia.jpg` (≈144 KB).
- `@astrojs/sitemap` writes `sitemap-index.xml` / `sitemap-0.xml`; the
  `design-system/` page is filtered out and marked `noindex, nofollow`.
  `robots.txt` allows crawling and points at the sitemap.
- JSON-LD in `src/data/schema.ts` describes only visible content:
  `RealEstateAgent` (name, URL, description, phone, email, address, area,
  specialties), `WebSite`, and `FAQPage` with the four rendered questions.
- Sections use `header`, `nav`, `main`, `section`, `article`, `figure`,
  `figcaption`, `dl`, `details`/`summary` and a single `footer`; heading order
  is sequential. All content images have descriptive alt text; decorative
  arcs, the seal and the footer wordmark are `aria-hidden`.

**Accessibility**

- `--color-muted` changed from `#8c8177` (3.55:1 on the page field) to
  `#746a60` (≈4.9:1). This was the only contrast failure Lighthouse and axe
  reported; the muted look is preserved.
- Skip link to `#main-content`, visible 2 px `:focus-visible` ring on every
  interactive element, `aria-current="page"` on Home, labelled search selects,
  native radio tabs, keyboard-operable `<summary>` accordions, Escape to close
  the mobile panel with focus returned to the toggle.
- Axe (WCAG 2.1 A/AA) reports **0 violations** at 1440 px and 390 px, with no
  console or page errors. The full tab walk reaches every control.

### Performance budget

| Metric | Target | Measured |
|---|---|---|
| LCP (mobile, emulated 4G) | ≤ 2.0 s | 2.1–2.9 s — over target in emulation |
| CLS | ≤ 0.02 | 0 |
| TBT (proxy for INP) | ≤ 200 ms | 30–40 ms mobile / 0–10 ms desktop |
| JS (transfer) | ≤ 15 KB | ≈1.2 KB inline |
| CSS (transfer) | ≤ 25 KB | 9.1 KB |
| Hero image (AVIF, 390 px, DPR 2) | ≤ 180 KB | ≈78 KB |
| Lighthouse | ≥ 95 across categories | 95–99/100/100/100 mobile, 100/100/100/100 desktop |

## Final visual and functional audit

The reference is supplied as a low-resolution two-panel capture and the original
bitmap is **not present in this workspace**. This audit therefore compares the
built page with the measurements, content inventory and confidence notes in
[`DESIGN_REFERENCE.md`](DESIGN_REFERENCE.md); it is a specification comparison,
not a pixel diff, and the page is **not claimed to be pixel-identical**.

Full-page and per-section captures were taken at **1440 × 900** (desktop),
**1024 × 768** (tablet) and **390 × 844** (mobile) after scrolling through the
reveals. They are kept outside the repository as QA artefacts.

### Visual specification check (1440 px)

| Element | Reference range | Built value |
|---|---|---|
| Header height | 64–80 px | 80 px |
| Container / gutter | max 1280–1360 / 40–64 px | 1324.8 px / 57.6 px |
| Section padding | 88–120 px | 120 px |
| Hero H1 | 84–96 px, line-height 0.98–1.02 | 95.0 px / 0.98 |
| Hero column split | ≈58 % / 32 % | 60 % / 32 % (1.8fr / 0.95fr) |
| Hero image | 2.2–2.4:1, radius 24–40 px | 2.35:1, radius 40 px |
| Search widget | ≈76–96 px tall, radius 36–44 px | 97.4 px, radius 40 px |
| About heading | 44–56 px | 56 px |
| About collage | 1:1 small, 4:3 large, asymmetric | 1:1 / 4:3 with 80 px vertical offset |
| Featured cards | 2 columns, 32–40 px gap, staggered | 2 columns, 40 px gap, 80 px stagger |
| Featured card media | rounded, 24–32 px | 4:3, radius 24 px |
| Services rows | 64–76 px collapsed | 67.2 px |
| Services open media | wide panorama ≈2.3:1 | 2.3:1 |
| Collection heading | 38–46 px | 46 px |
| Collection thumbs | landscape, radius 8–12 px | 4:3, radius 8 px |
| FAQ heading | 38–46 px | 46 px |
| FAQ collapsed rows | ≈48–56 px (low-confidence) | 65.6 px |
| CTA heading | 44–56 px | 48 px |
| CTA image | ≈46 % column, ≈300 px tall | 2.05:1, 318 px tall, radius 32 px |
| Footer wordmark | 180–230 px | 194 px |

All palette tokens match the reference estimates except `--color-muted`,
which was intentionally darkened from `#8c8177` to `#746a60` to reach WCAG AA
(3.55:1 → 4.9:1). Display type is set in Bodoni Moda (400 weight, italic second
line) and utility text in Inter (500 weight, uppercase, wide tracking), as
specified. The FAQ row height is the largest numeric deviation from the
reference estimate; the estimate is low-confidence, and reducing the padding
further would shrink the row below the current touch comfort without changing
the section's proportions.

### Functional check

| Check | Result |
|---|---|
| Internal anchors | 12 / 12 resolve to an existing section; all header, mobile-menu and section links work |
| Search form | submits and lands on `#properties`; tabs are keyboard-operable radios |
| Accordions | one open at a time for both services and FAQ; keyboard toggles |
| Mobile navigation | opens, closes on link/Escape/outside click, focus returns to toggle |
| CTA / contact links | valid `mailto:` and `tel:`; Instagram is a documented placeholder |
| Console / page errors | 0 at 1440, 1024 and 390 px |
| Failed requests | 0; all HTML, CSS, font and image requests return 200 |
| Routes | `/` and `/design-system/` return 200; the latter is `noindex, nofollow` |
| Missing images | 0; every `<img>` has a source and alt text |
| Responsive sweep | 13 widths from 320 to 1920 px, 0 horizontal overflow |
| Reveals / motion | 30 / 30 targets reveal; reduced-motion and no-JS states verified |

### Known visual deviations

- Photography is curated Unsplash/Pexels stock, not the unsupplied reference
  photographs; subjects and crops are close in spirit but not identical.
- About, CTA, service descriptions and metadata copy remain placeholders where
  the capture was illegible.
- The collection carousel is a static eight-item grid because only eight
  listings are known; the reference's next control is intentionally omitted.
- The header CTA label, search field labels and several prices are inferred
  placeholders. These are listed under [Placeholder content](#placeholder-content).
- Exact original typefaces and the monogram vector are unknown; the current
  choices are documented substitutes.

## Deployment

The build is fully static (`dist/`). `astro.config.mjs` is configured for a
GitHub Pages project site:

```js
site: 'https://rohxama.github.io',
base: '/Real-Estate',
```

- **Build command:** `npm run build` (`astro check` + `astro build`).
- **Output directory:** `dist/`.
- **Node:** 22.23.4 or newer (`24.16.0` used here).
- `public/.nojekyll` is copied to `dist/.nojekyll` so GitHub Pages serves the
  `_astro/` asset directory instead of hiding it as a Jekyll-internal path.
- **GitHub Pages (project site):** publish the contents of `dist/` to the Pages
  branch/environment. The base path is already applied to assets, canonical
  URLs, robots and the sitemap.
- **Vercel / Netlify / Cloudflare Pages (domain root):** remove `base`, set
  `site` to the production origin, then rebuild. Build command and output
  directory stay the same.

No external deployment has been performed; this remains a manual step pending
approval.

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

## Licence

Proprietary. All rights reserved unless stated otherwise.

The photography is used under the Unsplash and Pexels licences; see
[Photography and licensing](#photography-and-licensing) for the complete source
list.
