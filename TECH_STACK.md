# TECH_STACK.md

**Project:** Luxury real estate landing page (`rohxama/Real-Estate`)
**Research date:** 2026-11-07
**Purpose:** Select the smallest production-ready stack that can faithfully reproduce the reference design.
**Status:** Recommendation only — **nothing installed, nothing scaffolded.**

---

## 1. Requirements this stack must satisfy

Derived from `DESIGN_REFERENCE.md` and `PROJECT_AUDIT.md`:

| Requirement | Weight | Implication |
|---|---|---|
| One long-scroll marketing page, no app routes | High | No router, no SSR, no client framework |
| ~17–20 large architectural photographs | High | First-class image optimisation is the single biggest performance lever |
| Text-heavy SEO surface (headings, FAQ, listings) | High | Pre-rendered HTML, semantic markup, structured data |
| Light interactivity only (tabs, 2 accordions, 1 carousel, reveal) | Medium | Vanilla TS modules; no hydration framework |
| Bespoke editorial design (serif italics, oxblood accents, staggered grids) | High | Custom CSS with design tokens, not a utility-first redesign |
| Slow, restrained motion | Medium | CSS transitions + WAAPI; no animation runtime |
| Static hosting | Medium | `dist/` output deployable anywhere |
| Long-term maintainability by a small team | Medium | Few dependencies, plain HTML/CSS/TS |

**Non-requirements:** authentication, database, CMS, i18n, e-commerce, real-time data, multi-page routing.

---

## 2. Research method

- Versions read from the **npm registry** (`registry.npmjs.org/<pkg>/latest`) on 2026-11-07, not from blog posts.
- Compatibility checked against each package's declared `engines` / `peerDependencies`.
- Feature claims checked against **official documentation** (`docs.astro.build`, `tailwindcss.com`, `gsap.com`, `lenis.dev`).
- Bundle figures from Bundlephobia where available (marked as gzip).
- Node release data from `nodejs.org/dist/index.json`.

---

## 3. Decision summary

| Technology | Version | Decision | Runtime cost |
|---|---|---|---|
| **Astro** | 7.4.7 | ✅ **Selected** | 0 KB framework JS for static pages |
| **Vite** | 8.3.6 (bundled by Astro) | ✅ Included transitively | Build-time only |
| **TypeScript** | 6.0.3 | ✅ **Selected** | Compile-time only |
| **sharp** | 0.35.5 | ✅ **Selected** (Astro image service) | Build-time only |
| **@astrojs/sitemap** | 3.7.4 | ✅ Selected | Build-time only |
| **@astrojs/check** | 0.9.12 | ✅ Selected (dev) | Dev-time only |
| **Node.js** | 26.13.0 LTS "Lithium" | ✅ Runtime for tooling | n/a |
| **Tailwind CSS** | 4.3.5 | ❌ Not selected | 0 KB runtime, but unnecessary abstraction |
| **GSAP** | 3.15.1 | ❌ Not selected | ~27.4 KB gzip |
| **Lenis** | 1.3.27 | ❌ Not selected | ~5.5 KB gzip + scroll hijacking |
| **React** | 19.3.1 | ❌ Not selected | ~40 KB+ gzip + hydration |
| **Next.js** | — | ❌ Not evaluated as viable | Server/runtime overhead for one static page |
| **Sass** | — | ❌ Not selected | Native CSS nesting + custom properties cover it |
| **jQuery / Bootstrap** | — | ❌ Not selected | Unnecessary in 2026 |

---

## 4. Selected technologies

### 4.1 Astro 7.4.7

**Why it is needed**
The site is content-first and photo-heavy. Astro pre-renders every section to static HTML and ships **zero framework JavaScript** unless a component explicitly asks for it. It also provides the only feature that materially matters here: a built-in, Sharp-powered image pipeline (`<Image />`, `<Picture />`) that generates responsive `srcset`/`sizes` and modern formats at build time.

**Problem it solves**
- Eliminates the LCP penalty of client-side rendering on a page dominated by a hero photograph.
- Removes the need to hand-roll an image-resizing script (the usual failure point in plain-Vite builds).
- Gives component boundaries (Header, Hero, About, Services, FAQ…) without a UI runtime.

**Performance benefits**
- Static HTML: content is in the first response → strong FCP/LCP and crawlability.
- No hydration: no React/Vue runtime, no double render.
- Per-section CSS and JS are extracted and minified by Vite.
- `<Picture>` emits AVIF/WebP with width-based `srcset`, so mobile downloads a fraction of the desktop image.
- Island directives (`client:visible`, `client:idle`) exist if a component ever needs JS — used sparingly or not at all here.

**Bundle weight**
- **0 KB** of framework runtime for static `.astro` components.
- Astro's build output for this page should be HTML + CSS + one small TS bundle.
- Dependency cost is build-time only (Astro has 52 direct dependencies; none ship to the browser).

**Trade-off:** a build step and Astro's file conventions. Acceptable for a single, performance-critical page.

**Sources:** `https://docs.astro.build/en/guides/images/`, `https://docs.astro.build/en/guides/client-side-scripts/`, npm `astro@7.4.7` (engines: `node >=22.23.4`).

---

### 4.2 Vite 8.3.6 (via Astro)

**Why it is needed**
Astro 7 uses Vite `^8.3.5` internally for dev server, HMR, TypeScript transpilation, CSS handling and production bundling. No separate Vite config is required.

**Problem it solves**
Fast feedback loop, ES-module-native dev server, deterministic production output, automatic code splitting.

**Performance benefits**
- Rollup-based tree-shaking and minification for the small TS bundle.
- Asset hashing + long-term caching.
- CSS is minified and split, not injected at runtime.

**Bundle weight**
None of Vite ships to the browser. It is a dev/build dependency only.

**Note:** do not add a parallel Vite config that duplicates Astro's pipeline. Use `astro.config.mjs` only.

---

### 4.3 TypeScript 6.0.3

**Why it is needed**
Types for the property/collection data models, accordion/carousel modules, and Astro frontmatter. Catches content-shape mistakes (e.g. a listing missing `beds`) before build.

**Problem it solves**
Refactor safety in a page with repeated data structures (8 collection items, 4 services, 5+ FAQ entries), and safer DOM code in the interaction modules.

**Performance benefits**
Compile-time only. `esbuild` (inside Vite) strips types; zero runtime cost.

**Bundle weight:** 0 KB.

**Version note:** npm `latest` is **TypeScript 7.0.2** (the native compiler line), but `@astrojs/check@0.9.12` declares a peer range of `^5.0.0 || ^6.0.0`. To keep `astro check` working, pin **6.0.3** for now and revisit TS 7 once the Astro toolchain widens its peer range. This is a deliberate compatibility decision, not an oversight.

---

### 4.4 sharp 0.35.5

**Why it is needed**
Astro's default image service. Performs the actual AVIF/WebP/JPEG resizing and encoding at build time.

**Problem it solves**
Serving a 2400 px hero photograph to a 390 px phone is the most common cause of a failing LCP on luxury real-estate sites. Sharp produces the correct derivatives once, at build.

**Performance benefits**
- AVIF typically 40–60 % smaller than JPEG at equal perceived quality (encoder-dependent).
- Correct `width`/`height` attributes prevent layout shift (CLS).
- No runtime image processing, no image CDN required.

**Bundle weight:** 0 KB in the browser; native binary at build time only.

**Note:** Astro requires an explicit `sharp` install under strict package managers (pnpm). We use npm, but pinning it keeps the build reproducible.

---

### 4.5 @astrojs/sitemap 3.7.4

**Why it is needed**
Generates `sitemap-index.xml` at build with correct absolute URLs from `site` in `astro.config.mjs`.

**Problem it solves**
Discoverability for a single-page marketing site and clean submission to Search Console.

**Performance benefits:** build-time only; no runtime cost.

**Bundle weight:** 0 KB.

---

### 4.6 @astrojs/check 0.9.12 (dev)

**Why it is needed**
Runs the Astro language server + TypeScript checks over `.astro` files (`astro check`). Plain `tsc` cannot parse `.astro`.

**Performance benefits:** dev-time only.

**Bundle weight:** 0 KB.

---

### 4.7 Node.js 26.13.0 LTS ("Lithium")

Astro 7 requires `node >=22.23.4`; Vite 8 requires `>=22.12`. Node 26 LTS satisfies both and is the current supported LTS line (Node 24 "Krypton" also works).

**Bundle weight:** n/a (tooling runtime only). Pin via `.nvmrc` / `engines` for reproducibility.

---

## 5. Technologies evaluated and rejected

### 5.1 React 19.3.1 — rejected

- Would add a runtime plus hydration for three small interactions.
- A carousel, two accordions and a tab group are ~150 lines of vanilla TS; React would add indirection and ~40 KB+ gzip.
- Astro can island React later if a genuinely stateful widget appears; no need to pre-install it.

**Verdict:** unnecessary weight, no benefit for this page.

### 5.2 Tailwind CSS 4.3.5 — rejected

- Tailwind v4 is genuinely good: CSS-first config, zero runtime, Vite plugin; output CSS is tiny after purge.
- But this design is **token-driven and bespoke** (oxblood accent, Didone display pairing, staggered grids, 36–44 px radii, italic half-lines). We already need a `tokens.css` layer; expressing those values as Tailwind theme variables plus long utility strings duplicates the system and makes the markup harder to audit against the reference.
- The audit's constraint is "no unnecessary dependencies" — Tailwind is a dependency and a second styling vocabulary.

**Verdict:** skip. Reconsider only if the site grows into a multi-page design system with many contributors.

### 5.3 GSAP 3.15.1 — rejected

- Core is ~70.6 KB min / **~27.4 KB gzip**, plus plugin weight for scroll triggers.
- The required motion is modest: accordion height, tab underline, carousel transform, fade-up reveals. All achievable with CSS transitions, the Web Animations API, and `IntersectionObserver`.
- GSAP's strengths (timelines, complex sequencing, SVG morphing) are not needed and would encourage animation the reference does not have.

**Verdict:** skip. Motion must stay restrained anyway.

### 5.4 Lenis 1.3.27 — rejected

- ~18.9 KB min / **~5.5 KB gzip**, MIT.
- Smooth-scroll libraries override native scrolling, which harms trackpad/keyboard behaviour, can break anchor links, and requires extra care for `prefers-reduced-motion`.
- Native scrolling on modern browsers is already smooth; the reference shows no scroll-jacking.

**Verdict:** skip. Use `scroll-behavior: smooth` only for in-page anchors, disabled under reduced motion.

### 5.5 Next.js — rejected

- Built for routing, server rendering and app-scale data fetching. This is one static page with no backend.
- Adds a server/runtime model and a much larger dependency surface for zero user-facing gain.
- Astro produces the same static HTML with a smaller footprint.

### 5.6 Sass / Less — rejected

- Native CSS custom properties, `clamp()`, nesting and `@layer` cover the token/layout needs.
- An extra compiler adds build complexity without capability we need.

### 5.7 jQuery / Bootstrap / AOS / Swiper — rejected

- No legacy browser support requirement; no component kit matches the bespoke design; a carousel is a small custom module (keyboard + drag optional).
- Swiper (~40 KB+ gzip with modules) is heavier than needed for 8 items.

---

## 6. Version matrix & compatibility

| Package | Version | Type | Notes |
|---|---|---|---|
| `astro` | 7.4.7 | dependency | engines: node `>=22.23.4` |
| `vite` | 8.3.6 | transitive | Astro peer range `^8.3.5` — do not pin separately |
| `typescript` | 6.0.3 | dev | `@astrojs/check` peer `^5 || ^6`; TS 7 not yet supported |
| `sharp` | 0.35.5 | dependency | build-time image service |
| `@astrojs/sitemap` | 3.7.4 | dependency | needs `site` in config |
| `@astrojs/check` | 0.9.12 | dev | requires TS 5/6 |
| Node.js | 26.13.0 LTS | runtime | `.nvmrc` + `engines` |

**Compatibility risks**
- TypeScript 7 is stable but not yet inside Astro's peer range → pin 6.0.3.
- Astro 7 requires a recent Node; document it in `README` and `package.json` `engines`.

---

## 7. Architecture implications

```
Astro static output (dist/)
├── index.html            pre-rendered, semantic
├── _astro/*.css          tokens + component styles, minified
├── _astro/*.js           one small TS bundle (~8–12 KB raw)
└── _astro/images/*       AVIF/WebP/JPEG derivatives per breakpoint
```

- **No client router.** Anchor links + native scroll.
- **No hydration.** Interactions are progressive-enhancement scripts loaded once.
- **CSS:** `tokens.css` → `base.css` → `layout.css` → `components/*` → `sections/*`, imported once in the base layout.
- **Data:** a typed `src/data/properties.ts` (or `.json`) for listings and FAQ, so markup stays declarative and content edits don't touch layout.
- **Images:** all photography imported through `src/assets/images/**` so Astro can hash, resize and emit `srcset`; hero uses `loading="eager"` + `fetchpriority="high"`, everything below the fold `loading="lazy"` + `decoding="async"`.
- **Fonts:** self-hosted `woff2`, `font-display: swap`, preload only the display face actually used above the fold.
- **Deployment:** static output to any host (Vercel/Netlify/Cloudflare Pages/GitHub Pages). If GitHub Pages, set `site` and `base` in `astro.config.mjs` and ensure asset paths respect `base`.

---

## 8. Performance budget

| Metric | Target |
|---|---|
| LCP (mobile, 4G) | ≤ 2.0 s |
| CLS | ≤ 0.02 |
| INP | ≤ 200 ms |
| Total JS (gzip) | ≤ 15 KB |
| Total CSS (gzip) | ≤ 25 KB |
| Hero image (AVIF, mobile) | ≤ 180 KB |
| Fonts above the fold | ≤ 2 files / ≤ 120 KB total |
| Lighthouse Performance | ≥ 95 |
| Lighthouse Accessibility / SEO / Best Practices | ≥ 95 |

Budgets are enforced during Phase 5 of the audit's implementation plan, not by a CI gate yet.

---

## 9. SEO plan (enabled by this stack)

- Pre-rendered semantic HTML with one `<h1>` and ordered section headings.
- `<title>`, meta description, canonical, Open Graph and Twitter cards per page.
- `@astrojs/sitemap` + `robots.txt`.
- JSON-LD: `Organization`, `RealEstateAgent`/`RealEstateListing` for the collection, `FAQPage` for the FAQ section (only when final copy is confirmed).
- Descriptive `alt` text on every architectural image; decorative arcs marked `alt=""`.
- Clean URLs and no client-side-only content.

---

## 10. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Astro conventions unfamiliar to maintainers | Keep the structure explicit (`src/components`, `src/sections`, `src/styles`); document in `README` |
| Image pipeline slows builds as photos grow | Pre-resize source images to ≤ 2560 px before import; generate only needed widths |
| TypeScript 7 release causes peer warnings | Pin 6.0.3; upgrade when `@astrojs/check` widens support |
| Over-animation creep during implementation | Motion spec is fixed in `DESIGN_REFERENCE.md` §8; no GSAP means no temptation |
| Font licensing / identity mismatch | Confirm families before build; self-host only licensed files |

---

## 11. Proposed install plan (NOT executed)

```bash
# 1. Scaffold minimal Astro (no React, no Tailwind)
npm create astro@latest . -- --template minimal --no-install --no-git

# 2. Pin runtime/tooling
npm install astro@7.4.7 sharp@0.35.5 @astrojs/sitemap@3.7.4
npm install -D typescript@6.0.3 @astrojs/check@0.9.12

# 3. Verify
npx astro check
npm run build
```

Notes:
- `--no-git` because the repository already exists with history.
- Do **not** add `@astrojs/react`, `tailwindcss`, `gsap`, or `lenis`.
- `package.json` will declare `"engines": { "node": ">=22.23.4" }`.

---

## 12. Final recommendation

```text
Astro 7.4.7  +  TypeScript 6.0.3  +  native CSS  +  sharp  +  small vanilla TS modules
```

This is the smallest stack that still delivers: static HTML for SEO and LCP, a real image pipeline for a photography-led design, component structure without a UI runtime, and motion built from the platform rather than a library.

**Every dependency must earn its place in the browser.** Under this stack, none of them add framework JavaScript.

Awaiting approval before installation or implementation.
