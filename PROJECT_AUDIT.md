# PROJECT_AUDIT.md

**Project:** `D:\Real estate` (luxury real estate landing page)
**Audit date:** 2026-11-07
**Audit type:** Pre-implementation technical audit
**Verdict:** **Greenfield / empty project.** No application code exists to review. This document records the verified state, the blockers, and a concrete plan for the build.

---

## 0. Audit scope & method

What was inspected:

| Check | Method | Result |
|---|---|---|
| Folder contents | recursive glob incl. hidden files, directory read | **1 file**: `DESIGN_REFERENCE.md` |
| Hidden files / `.git` | glob with `hidden: true` | none |
| Repository status | `git status`, `worktree_list` | **not a git repository** |
| Remote configuration | `git remote -v` | not runnable (see §3.1) — no repo exists, so no remote |
| Package manifests | glob for `package.json`, lockfiles | none |
| Source files | glob for `*.html`, `*.js`, `*.ts`, `*.jsx`, `*.tsx`, `*.css`, `*.scss` | none |
| Assets | folder read | none |
| Build scripts | manifests / CI config | none |

**Conclusion:** there is no existing framework, dependency set, component library, CSS architecture, routing, animation layer, or build pipeline. The audit below is therefore an inventory of *absence* plus the risks/decisions that must be settled before implementation. Nothing was rewritten, deleted, installed, or implemented.

> Note: sibling folders on `D:\` (`pallete`, `darbaan core`, …) were **not** inspected and are not part of this workspace. If the intended "existing project" lives elsewhere, point me to it and I will re-run this audit against it.

---

## 1. Current architecture

```
D:\Real estate\
└── DESIGN_REFERENCE.md      ← stage-01 design analysis (only artefact)
```

- **Type:** static document folder, not an application.
- **Entry point:** none.
- **Routing:** none.
- **Build output:** none.
- **Deployment target:** undetermined.
- **Version control:** none initialised in this directory.

The single document describes a one-page marketing site with these sections (from `DESIGN_REFERENCE.md`):

```
Header → Hero (+ search widget) → About → Featured properties →
Services accordion → Premium estates carousel → FAQ → CTA → Footer wordmark
```

---

## 2. Existing technical stack

| Layer | Present? | Detail |
|---|---|---|
| Language(s) | ❌ | none |
| Framework | ❌ | none (no React/Next/Astro/Vue/etc.) |
| Package manager | ❌ | no `package.json`, lockfile, or `node_modules` |
| Dependencies | ❌ | none installed (compliant with "do not install yet") |
| CSS architecture | ❌ | none — no tokens, reset, utilities, or section styles |
| Components | ❌ | none |
| Templates / partials | ❌ | none |
| JavaScript / interactivity | ❌ | none |
| Fonts | ❌ | no local font files; families not yet identified |
| Images / icons | ❌ | no assets; photography must still be sourced |
| Build tooling | ❌ | none |
| Linting / formatting | ❌ | none |
| Tests | ❌ | none |
| CI/CD | ❌ | none |
| Environment files / secrets | ✅ (none present) | no `.env`, keys, or credentials in the folder |
| Git remote | ❌ | no repository, therefore no remote to push to |

**Effective stack:** plain filesystem + a Markdown design spec.

---

## 3. Problems identified

### 3.1 Blocking environment issues

1. **The shell is non-functional.** Every command — `git --version`, `gh auth status`, `git status`, `cmd /c dir`, `cmd /c "echo CMD_OK"` — fails with:
   `Internal Windows PowerShell error. Loading managed Windows PowerShell failed with error 80070002.`
   The shell tool always launches its managed PowerShell host first, so passing a command to `cmd.exe` does not bypass the failure — the error occurs *before* the command is selected. `powershell.exe` itself is present at `C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe`, so the fault is in the host/runtime loading (missing assembly or PATH), not a missing binary.
   Consequences: `npm`/`node`/`git`/`gh` cannot be invoked at all. This blocks dependency installation, builds, tests, and **every Git operation**, including the requested commit and push.
2. **No repository and no remote.** The folder is not a git repo; no GitHub URL or repo name has been supplied. Even with a working shell, the push target is unknown.
3. **No Node/toolchain verification possible.** Runtime versions cannot be confirmed until the shell works.

### 3.2 Project-level gaps

4. **No `.gitignore`** → a future `node_modules`, build output, and `.env` files would be at risk of being committed.
5. **No `README.md`** → no onboarding, run, or deployment instructions.
6. **No license / no ownership metadata.**
7. **No image assets.** The design needs ~17–20 distinct photographs (hero, about collage ×2, 4+ property cards, 8 collection thumbs, services panorama, CTA villa). None exist.
8. **Fonts unidentified.** The serif/sans families are not confirmed (flagged in `DESIGN_REFERENCE.md` §10). Shipping with guessed fonts would break the visual identity.
9. **Copy is unreadable at reference resolution.** Most paragraphs, button labels, property names, prices, and FAQ answers are placeholders pending confirmation.
10. **No responsive specification.** The reference is desktop-only; mobile/tablet behaviour is undefined.
11. **No accessibility baseline** (focus states, accordion `aria-expanded`, carousel controls, reduced-motion, contrast on oxblood).
12. **No performance budget** defined; a photo-heavy page needs explicit image sizing/lazy-loading rules from day one.

### 3.3 Risks if unaddressed

| Risk | Impact |
|---|---|
| Building before fonts/copy/photography are decided | Rework of every section; visual identity drifts from reference |
| Choosing a heavy framework for a one-page site | Unnecessary dependencies, slower load, harder maintenance |
| Guessed content shipped as final | Client-facing inaccuracies; contradicts "do not invent" rule |
| Broken shell left unresolved | No builds, no tests, no Git history — project cannot be delivered |

---

## 4. Recommended improvements

### 4.1 Recommended stack

Given the deliverable is **one static marketing page** with light interactivity (tabs, two accordions, one carousel, reveal-on-scroll), the dependency-minimal option is the best fit:

**Recommended (default):**
- **HTML5 + modern CSS + vanilla ES modules**
- CSS custom properties for the token layer; no preprocessor required
- A single small JS bundle authored as modules (accordion, carousel, filters, reveal)
- Build: **Vite** (dev server + production bundling only — no UI framework)
- Fonts: self-hosted `woff2` (once identified) with `font-display: swap`
- Images: `AVIF`/`WebP` with `srcset`, explicit `width`/`height`, `loading="lazy"` below the fold

**Alternative (only if the client wants component reuse or future pages):**
- **Astro** — static output, component model, zero JS by default; slightly more tooling
- **Next.js** — *not recommended* here: heavy for a single static page, adds runtime/SSR concerns with no benefit

**Decision required before build.** I will not install anything until this is confirmed.

### 4.2 CSS strategy

- **Token-first:** `tokens.css` (colour, type scale, spacing, radius, shadow, easing) mirroring `DESIGN_REFERENCE.md` §3/§6.
- **Layered structure:** `reset → tokens → base → layout → components → sections → utilities`.
- **Naming:** BEM-ish block classes (`hero`, `hero__title`, `hero__title-em`, `search-bar`, `accordion__row--open`) — readable, framework-agnostic.
- **Fluid type/spacing:** `clamp()` for display sizes; spacing scale `4/8/12/16/24/32/48/64/96/120`.
- **No utility-soup framework** (Tailwind optional but unnecessary at this scale and adds a build dependency).
- **Reduced motion** honoured globally.

### 4.3 Content & asset strategy (needs client input)

1. Confirm/obtain the **font families** (or approve closest equivalents).
2. Provide **final copy** for paragraphs, buttons, listings, FAQ answers.
3. Provide **licensed photography** matching the reference grades, or approve curated stock.
4. Provide the **brand monogram** as SVG (header + footer divider).
5. Confirm **footer wordmark spelling** and whether a legal row exists below the crop.
6. Define **responsive** expectations (tablet/mobile) — I will propose a faithful adaptation for approval.

Until then, the build can proceed structurally with clearly-marked placeholder tokens (neutral blocks, `data-placeholder`), but **not** be presented as final.

### 4.4 Reuse / improve / replace / remove

| Item | Decision | Rationale |
|---|---|---|
| `DESIGN_REFERENCE.md` | **Reuse** | Authoritative visual spec; keep in `docs/` |
| Any future component library | Not present | Build only what the page needs |
| Tailwind / Bootstrap / jQuery | **Do not add** | Unnecessary for this scope |
| Inline styles | **Avoid** | Tokens + classes only |
| Placeholder lorem ipsum | **Avoid in final** | Violates "do not invent"; use marked placeholders during development |
| `.env` files | **Never commit** | Add `.gitignore` before first commit |

Nothing exists to remove.

---

## 5. Proposed folder structure

```
D:\Real estate\
├── index.html                  # single page entry
├── package.json                # only if Vite is approved
├── .gitignore                  # node_modules, dist, .env, OS files
├── README.md                   # run/build/deploy + asset credits
│
├── docs/
│   ├── DESIGN_REFERENCE.md     # stage-01 analysis (moved here)
│   └── PROJECT_AUDIT.md        # this file
│
├── src/
│   ├── styles/
│   │   ├── reset.css
│   │   ├── tokens.css
│   │   ├── base.css
│   │   ├── layout.css
│   │   ├── components/
│   │   │   ├── button.css
│   │   │   ├── nav.css
│   │   │   ├── search-bar.css
│   │   │   ├── property-card.css
│   │   │   ├── collection-item.css
│   │   │   └── accordion.css
│   │   └── sections/
│   │       ├── hero.css
│   │       ├── about.css
│   │       ├── featured.css
│   │       ├── services.css
│   │       ├── collection.css
│   │       ├── faq.css
│   │       ├── cta.css
│   │       └── footer.css
│   │
│   ├── scripts/
│   │   ├── main.js
│   │   └── modules/
│   │       ├── accordion.js
│   │       ├── carousel.js
│   │       ├── search-tabs.js
│   │       └── reveal.js
│   │
│   └── assets/
│       ├── fonts/              # self-hosted woff2 (after approval)
│       ├── icons/              # svg sprite / individual svg
│       └── images/
│           ├── hero/
│           ├── about/
│           ├── properties/
│           ├── collection/
│           └── cta/
│
└── public/
    ├── favicon.svg
    └── og-image.jpg
```

**Principles:** one concern per file, sections isolated, no deep nesting beyond three levels, assets grouped by section so unused imagery is easy to spot.

---

## 6. Implementation strategy

### Phase 0 — Unblock (must happen first)
- Repair the PowerShell host so `node`, `npm`, `git`, `gh` are callable.
- Obtain the GitHub repository URL (or approval to create a **public** repo).
- Initialise Git, add `.gitignore`, verify `git status`, commit the two docs.

### Phase 1 — Foundation
- Create the token layer from `DESIGN_REFERENCE.md` §3/§4/§6 (colour, type scale, space, radius, shadow, easing).
- Reset + base typography; self-host fonts once approved.
- Semantic page skeleton with all nine sections and correct heading order.

### Phase 2 — Layout shell
- Header (three-zone, centered lockup).
- Hero text band + rounded hero image + floating search widget.
- Container/gutter system and section rhythm.

### Phase 3 — Content sections
- About collage (arcs, offset images, pill CTA).
- Featured staggered grid with captions.
- Services numbered accordion with expanded image row.
- Collection mirrored 2×4 list + carousel controls.
- FAQ split layout with dark active row.
- CTA band + contact meta.
- Oversized footer wordmark with monogram divider.

### Phase 4 — Interaction
- Accordions (single-open, `aria-expanded`, animated height).
- Hero tabs (sliding underline).
- Carousel (edge arrows, keyboard, reduced-motion aware).
- Subtle reveal-on-scroll; hover states for buttons/links/cards.

### Phase 5 — Hardening
- Responsive pass at 1440 / 1280 / 1024 / 768 / 390.
- Accessibility: focus-visible, contrast check on `#5A1D16`, landmarks, alt text, `prefers-reduced-motion`.
- Performance: responsive images, lazy loading, font subsetting, no layout shift.
- Cross-browser check (Chromium, Firefox, WebKit).

### Phase 6 — QA & delivery
- Visual diff against the reference at desktop width.
- Lighthouse pass (target ≥ 90 in Performance/Accessibility/Best Practices/SEO).
- `README` with run/build instructions and asset credits.
- Commit in coherent units; push; verify with `git log`, `git status`, `git remote -v`.

### Definition of done
- Build succeeds, no console errors, no broken links.
- All nine sections match the reference's sequence, composition, palette and typography.
- No unapproved fonts, invented sections, or placeholder copy left in production.
- Repository public, history preserved, no secrets committed.

---

## 7. Git status at audit time

| Check | Result |
|---|---|
| Repository initialised | ❌ no |
| Remote configured | ❌ no |
| Branch | n/a |
| Tracked files | 0 |
| Untracked files | 1 (`DESIGN_REFERENCE.md`) — plus this audit once written |
| Secrets present | none found |
| `git status` / `git remote -v` executable | ❌ blocked by shell failure (§3.1) |

**Therefore `PROJECT_AUDIT.md` cannot be committed or pushed yet.** No commit has been made and no history exists to overwrite. I am reporting the blocker rather than simulating success.

To proceed I need:
1. A working shell in this session (restart the app / repair `powershell.exe`).
2. The GitHub repo URL, or approval to create a new **public** repo.
3. Stack confirmation (§4.1) before any dependency is installed.

---

*End of audit. No project files were modified, deleted, or installed.*
