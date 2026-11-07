# Estatia — Luxury Real Estate

An editorial, single-page real estate website built from a supplied design
reference. Warm ivory surfaces, an oxblood accent, a Didone-style display face
and photography-led sections: hero search, brand statement, featured
properties, a numbered services accordion, a premium-estates collection, FAQ,
closing CTA and an oversized footer wordmark.

> **Status:** design system complete. Page sections are implemented in the next
> stage; the current home page is a temporary scaffold.

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
│   │   └── images/           # imported through Astro's image pipeline
│   ├── components/
│   │   ├── layout/           # Container and layout primitives
│   │   └── ui/               # Button, IconButton, LinkArrow, Icon, Eyebrow
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
| `--color-surface-muted` | `#efe9dc` | Image placeholders |
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
- **Primitives:** `Button` (primary/outline/inverse, sm/md), `IconButton`
  (outline/filled/inverse), `LinkArrow`, `Eyebrow`, `Icon`, `Container`
  (default/narrow/wide/flush).
- **Motion:** restrained `--ease-out` transitions; all animation is disabled
  under `prefers-reduced-motion`.

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

- licensed photography for all sections
- final copy, listing data and FAQ answers
- confirmation that Bodoni Moda + Inter are acceptable final typefaces (or
  licensed originals supplied)
- brand monogram as SVG
- footer wordmark spelling confirmation

## Licence

Proprietary. All rights reserved unless stated otherwise.
