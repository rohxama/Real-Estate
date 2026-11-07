# Estatia — Luxury Real Estate

An editorial, single-page real estate website built from a supplied design
reference. Warm ivory surfaces, an oxblood accent, a Didone-style display face
and photography-led sections: hero search, brand statement, featured
properties, a numbered services accordion, a premium-estates collection, FAQ,
closing CTA and an oversized footer wordmark.

> **Status:** project foundation complete. Page sections are implemented in the
> next stage; the current page is a temporary scaffold.

---

## Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | [Astro](https://astro.build) | 7.4.7 |
| Bundler | [Vite](https://vite.dev) (via Astro) | 8.3.6 |
| Language | TypeScript | 6.0.3 |
| Styling | Native CSS + design tokens | — |
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
│   │   ├── fonts/            # self-hosted woff2 (pending font selection)
│   │   └── images/           # imported through Astro's image pipeline
│   ├── components/
│   │   ├── layout/           # Container and layout primitives
│   │   └── ui/               # Button and reusable UI atoms
│   ├── data/                 # typed content (site metadata, listings, FAQ)
│   ├── layouts/
│   │   └── BaseLayout.astro  # document shell, SEO meta, global styles
│   ├── pages/
│   │   └── index.astro       # single page entry
│   ├── scripts/              # progressive-enhancement TS modules
│   ├── styles/
│   │   ├── tokens.css        # colour, type, spacing, radius, motion
│   │   ├── base.css          # reset and element defaults
│   │   ├── layout.css        # container, section, utilities
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

- final typeface selection (currently system serif/sans fallbacks)
- licensed photography for all sections
- final copy, listing data and FAQ answers
- brand monogram as SVG
- footer wordmark spelling confirmation

## Licence

Proprietary. All rights reserved unless stated otherwise.
