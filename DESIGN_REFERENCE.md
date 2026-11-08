# DESIGN_REFERENCE.md

**Project:** Luxury real estate marketing website
**Brand shown:** "estatia" (header wordmark) / large footer wordmark (see §9 — spelling requires confirmation)
**Source of truth:** Single reference image containing two captures of the **same** website at two different scroll positions.
**Status:** Analysis only. No implementation started.

---

## 0. How the two captures combine

The reference image contains two narrow captures placed side by side. They are **not** two pages and must **not** be laid out horizontally.

| Capture | Position in source | Role in the real page |
|---|---|---|
| **LEFT panel** | left half of the image | Top of the page: header → hero → about → featured properties (grid is cut off at the bottom edge of the capture) |
| **RIGHT panel** | right half of the image | Continuation of the page: services accordion → premium estates collection → FAQ → CTA → giant footer wordmark |

**Correct reading / build order = vertical stitch:**

```
[ LEFT panel, top edge ]
  Header
  Hero (headline + meta + hero image + search widget)
  About / brand statement (image collage)
  "Explore Spaces Designed For Modern Living" property grid
        ↓  ← stitch point (grid continues past the crop)
[ RIGHT panel, top edge ]
  "Timeless Services, Singular Vision." services accordion
  "Premium estates, elegant waterfront living" collection grid
  FAQ
  "Find Your Signature Home Today" CTA + contact block
  Giant footer wordmark (cropped at page bottom)
```

**Notes on the captures:**
- The left capture is slightly wider than the right capture (~364 px vs ~320 px of source pixels). Treat the two as the same viewport rendered at slightly different capture scale — the layouts are consistent.
- Vertical gaps between sections can be read reliably; absolute pixel values cannot (source is heavily downscaled). See §10 for the confidence policy.

---

## 1. Overall structure & section hierarchy

The site is a **single long-scroll marketing page** for a high-end real estate brand. There is **no obvious side navigation** and no visible secondary footer link columns — the page ends in a typographic wordmark.

```
PAGE
├── 01  Header (fixed/transparent-feeling bar on cream)
├── 02  Hero
│        ├─ H1 (2 lines, line 2 italic)
│        ├─ Meta block (rating/stat + short paragraph)
│        ├─ Full-width architectural hero image (rounded)
│        └─ Floating pill search widget overlapping the image bottom
├── 03  About  ("Crafted for Exceptional / Modern Luxury Living")
│        ├─ kicker + centered two-line display heading
│        └─ asymmetric image collage + paragraph + "Learn more" pill
├── 04  Featured properties ("Explore Spaces Designed / For Modern Living.")
│        ├─ heading + "Explore all properties →" link
│        └─ staggered 2-column card grid (3 rows visible, last row cropped)
├── 05  Services ("Timeless Services, / Singular Vision.")
│        └─ numbered accordion 01–04 with one expanded row containing a
│           wide cinematic image
├── 06  Collection / listing ("Premium estates, / elegant waterfront living")
│        ├─ kicker + heading (left) + paragraph & "View all properties" (right)
│        └─ 2-column × 4-row list: thumbnail + name + spec meta
├── 07  FAQ ("Frequently / Asked Question?")
│        └─ 2-column: heading left, accordion right (first item open, dark)
├── 08  CTA ("Find Your Signature Home / Today. Explore the Collection")
│        ├─ left: paragraph, pill button, contact/meta list
│        └─ right: rounded classical villa image
└── 09  Footer — oversized Didone wordmark with circular monogram divider
```

**Section rhythm:** every section alternates between *centered display type* (About, Services) and *split left-heading / right-supporting-copy* (Collection, FAQ, CTA). This alternation is part of the identity and must be preserved.

---

## 2. Header / navigation / hero

### 2.1 Header bar
- Height: slim, ~64–80 px at desktop (est. ~4–5 % of viewport width visually).
- Background: **same cream as the page** — no visible bar fill, no border, no blur/shadow identifiable.
- Layout: **three zones, one row**
  - **Left:** text links `Home`, `Property`, `About us`, `Contact us` (order to be confirmed at higher resolution — see §10). Very small, uppercase or small-caps-looking sans, wide letter-spacing, muted dark ink.
  - **Center:** brand lockup — small circular line-icon/spiral monogram followed by lowercase serif wordmark `estatia` with generous letter-spacing.
  - **Right:** small pill button in **deep oxblood**, label ~`Contact Us` (illegible at source resolution) in cream micro-caps, with a right arrow or chevron.
- The brand lockup is optically centered on the page, not part of a left flex group.

### 2.2 Hero — text band
Two-column, top-aligned, generous whitespace above and below:

- **Left (~60 %):** H1 in two lines
  - Line 1: `Find Your Dream` — upright display serif, dark espresso ink, tight tracking, normal weight (not bold).
  - Line 2: `Luxury Home` — the **same size, italic, lighter weight** serif. The upright/italic pairing is the signature typographic device of the whole site.
- **Right (~32 %), vertically aligned to the bottom of the H1:** a compact meta cluster
  - A small line of statistics, appears as a rating/volume figure with a tiny avatar-group icon (`4.5K+`, exact figure requires inspection).
  - Directly below: 3–4 lines of small muted body copy beginning ~"Discover the exceptional… where architecture, craftsmanship and…". Text is not fully legible at provided resolution.
  - This block sits with a clear gap from the H1, roughly 8–10 % of container width.

### 2.3 Hero image
- Full content-width image, large landscape (approx. 2.2:1 to 2.4:1 in the capture), **rounded corners** (large radius, est. 24–40 px at desktop). Slight soft/vignette treatment; no visible border.
- Subject: contemporary luxury villa — curved travertine/limestone volumes, deep recessed balcony, floor-to-ceiling glazing with warm interior light, dusk sky.
- The image's left and right extremes fade into **blurred dark-green foliage**; this soft blurred framing appears intentional (decorative blurred backdrop behind/around the sharp architecture). Flag as needing a higher-res check.

### 2.4 Floating search widget
- Positioned **overlapping the lower edge of the hero image** and protruding below it, centered, with wide horizontal inset.
- White/off-white surface, large rounded corners (pill-ish), soft diffuse drop shadow, no hard border.
- Contents, left→right:
  1. Vertical tab toggle: `For Sale` / `For Rent` — active tab marked by a short underline and darker text.
  2. Three or four filter fields, each with a tiny uppercase label and a value/placeholder with a small chevron-down: `Location`, `Type`, `Property`, and possibly a fourth (`Price`/`Beds`). **Number and labels require confirmation.**
  3. Right: filled oxblood pill button `Search Now` / `Find Property` (label illegible) with arrow.
- Thin vertical rules separate fields.

> **Update, 8 November 2026.** The client later supplied a screenshot of the
> finished form: horizontal `Residential` / `Apartment` / `Commercial` pills over
> `Bedroom`, `Country`, `Currency` and `Starting From`, with a `Search Properties`
> button. The build follows that screenshot; the geometry in §2.4 (overlap, cream
> surface, large radius, soft shadow, oxblood pill) still applies, but the tab and
> field details above are superseded.

---

## 3. Colour palette

All values are **visually estimated from the low-resolution reference**; they are close but must be re-sampled from a higher-resolution asset before final build.

| Token | Role | Estimate | Notes |
|---|---|---|---|
| `--bg` | Page background | `#FAF7F1` | Warm ivory; visible in every section gutter |
| `--bg-alt` | Slightly deeper cream surface | `#F3EEE4` | Behind some rows/cards, e.g. collapsed accordion area |
| `--surface` | Cards, search widget | `#FFFDF8` | Search bar reads brighter than the page |
| `--ink` | Primary text | `#241A15` | Near-black warm brown, not pure black |
| `--ink-soft` | Secondary text | `#4A3E35` | |
| `--muted` | Labels, meta, body | `#8C8177` | Warm grey-taupe |
| `--line` | Hairline dividers/borders | `#E3DCCF` | ~1 px, very low contrast |
| `--accent` | Primary oxblood / burgundy | `#5A1D16` | All filled pills and the footer wordmark |
| `--accent-hover` | Accent hover | `#6B2A20` | Inferred |
| `--accent-deep` | Open FAQ row / dark chips | `#4B1712` | |
| `--on-accent` | Text on accent | `#FBF6EC` | |
| `--img-tint` | Image placeholder / warm stone tint | `#E6DCCB` | |

**Palette behaviour**
- One accent only (oxblood). No secondary bright colour anywhere.
- The page is a **monochrome warm-ivory field**; contrast comes from photography and the dark accent, never from coloured blocks.
- No gradients are visible on UI surfaces. Any gradient is photographic (dusk skies, image vignettes).

---

## 4. Typography

> Exact font families cannot be read from the reference. Below is the *style* plus closest candidates. Final families must be confirmed (see §10).

### 4.1 Display serif (headings, numerals, footer wordmark)
- High-contrast, transitional/Didone-flavoured serif with elegant, sharp serifs.
- Used at large sizes with **normal or light weight** — never heavy/bold.
- **Italic cut is used as a deliberate stylistic half-line** (hero, about, collection, FAQ, CTA, services). Italics are noticeably lighter and narrower.
- Slight negative tracking on large sizes (≈ −0.02em).
- Candidates: *Playfair Display*, *Bodoni Moda*, *Cormorant Garamond* (italic lines read more Cormorant-like: airy, high x-height contrast). **Requires confirmation.**

### 4.2 Micro sans (nav, labels, buttons, meta)
- Neutral grotesque, small sizes, **uppercase**, wide letter-spacing (≈ 0.14–0.20em).
- Button labels and filter labels share this style.
- Candidates: *Inter*, *Jost*, *Manrope*. **Requires confirmation.**

### 4.3 Hierarchy & sizes (desktop estimates, 1440 px design width)

| Role | Size | Line-height | Weight | Case / style | Colour |
|---|---|---|---|---|---|
| Hero H1 | 84–96 px | 0.98–1.02 | 400 (line 1) / 300 italic (line 2) | Title case, line 2 italic | `--ink` |
| Section H2 (About, Services, CTA) | 44–56 px | 1.05 | 400 + italic line | Title case | `--ink` |
| Section H2 (Collection, FAQ) | 38–46 px | 1.08 | 400 + italic line | Title case | `--ink` |
| Kicker / eyebrow | 10–11 px | 1.2 | 500 | UPPERCASE, 0.18em | `--muted` |
| Body / paragraph | 13–15 px | 1.7 | 400 | Sentence case | `--muted` / `--ink-soft` |
| Nav links | 11–12 px | 1.2 | 500 | UPPERCASE or small caps, 0.12em | `--ink-soft` |
| Button label | 10–11 px | 1 | 500 | UPPERCASE, 0.14em | `--on-accent` |
| Filter label | 9–10 px | 1.2 | 500 | UPPERCASE, 0.14em | `--muted` |
| Filter value | 12–13 px | 1.2 | 400/500 | Sentence case | `--ink` |
| Card title (property) | 13–15 px | 1.3 | 500 | Sentence case, serif? (borderline at this res) | `--ink` |
| Card price / meta | 11–12 px | 1.3 | 400 | Sentence case | `--muted` |
| Accordion index (01/02/03/04) | 12–13 px | 1 | 400 | Serif, tabular | `--muted` |
| Accordion title | 15–17 px | 1.2 | 500 | Title case, sans | `--ink` |
| Footer wordmark | ~180–230 px (fills viewport width) | 0.8 | 400 | UPPERCASE | `--accent` |

**Hierarchy rule:** serif = emotion/identity, uppercase micro sans = utility. Never mix within a single line except the deliberate italic second line of headings.

---

## 5. Images & visual assets

| # | Asset | Placement | Treatment |
|---|---|---|---|
| 1 | Brand monogram (circular line-art spiral/teardrop, mirrored) | Header center lockup; repeated large in footer as divider | 1 px-ish stroke, accent colour |
| 2 | Hero architecture photo (modern curved villa, dusk, glazing, greenery edges) | Hero, full content width | Rounded corners ~24–40 px, warm grade, soft blurred green edges |
| 3 | About collage image A (small modern house) | About, left/top of text block | Small rounded rect, est. 16–20 px radius |
| 4 | About collage image B (villa, landscape) | About, lower right, offset, next to "Learn more" | Slightly larger rounded rect |
| 5 | Property card image ×4+ (various mansions, blue sky, lawns) | Featured grid | Portrait-ish/landscape rounded cards, consistent grade |
| 6 | Wide cinematic interior/exterior (expanded services row) | Inside open accordion row 01 | Very wide panorama, rounded, ~1 px inner hairline |
| 7 | Collection thumbnails ×8 (classical and modern villas) | Premium estates list | Small landscape thumbs, ~8–12 px radius |
| 8 | CTA villa image (symmetrical classical facade, warm yellow stucco) | CTA right | Large rounded rect, soft shadow |
| 9 | Decorative arcs / faint circular line graphics + tiny circular badge text | Behind the About paragraph | Very low opacity, monochrome, huge radius arcs |
| 10 | Small avatar/people glyph | Hero stat cluster | Tiny line icon |

**Asset rules**
- All photography is warm, naturalistic, golden-hour or clear-daylight; no cool/blue-grey real-estate stock look.
- Images are never full-bleed to the viewport edge except the hero's blurred outer glow — every content image sits inside a rounded frame with visible cream margin.
- No icon set beyond: chevron-down, arrow-right/up-right, plus/minus, small line icons. Icon strokes thin.

---

## 6. Layout, spacing, sizing

### 6.1 Container
- Content max-width ≈ **1280–1360 px**, centered.
- Horizontal gutters ≈ **40–64 px** desktop (visually ~5 % of viewport each side at the captured width).
- Full-bleed elements: header (transparent), footer wordmark (edge to edge).

### 6.2 Vertical rhythm
- Section padding: ≈ **88–120 px** top and bottom desktop; large sections (hero, services, CTA) feel closer to 120 px.
- Gap between heading and its content: ≈ **32–48 px**.
- Gap between kicker and H2: ≈ **16–20 px**.
- Hero: header → H1 ≈ 64 px; H1 → hero image ≈ 40 px; image overlaps search widget by ≈ 44–56 px.

### 6.3 Section-specific geometry
- **Hero text band:** asymmetric 2 columns, `~58% / ~32%` with the remaining space as a gap; right column bottom-aligned to H1 baseline area.
- **Search widget:** height ≈ 76–96 px; fields flex with equal Grow; button pinned right; internal padding ≈ 20–28 px.
- **About:** centered heading, then a 3-part collage: paragraph column in the middle, small image upper-left, larger image lower-right, arcs behind. Visually the text block is ~46 % wide and the images are offset on a shared baseline grid — a deliberately *un-symmetric* composition, not a plain 2-column split.
- **Featured grid:** 2 columns, each card ≈ 46–47 % width, gap ≈ 32–40 px; **second row is offset** (right card sits lower), producing a staggered masonry-like rhythm. Third row is centered/narrower and cropped by the capture.
- **Services accordion:** full content width; rows ≈ 64–76 px collapsed; expanded row ≈ 300–340 px containing text column (~22 %) + wide image (~74 %) with a circular icon button bottom-right.
- **Collection list:** 2 columns; each row = thumbnail (~40 % of column) + text block; **right column is mirrored** (text left, thumbnail right) — confirm at higher res.
- **FAQ:** `~40% / ~55%` split; accordion rows ≈ 48–56 px; open row is a filled dark bar.
- **CTA:** `~46% / ~48%` split; left content stack, right image; image height ≈ 300 px.
- **Footer:** wordmark spans full width; monogram sits between two word fragments, vertically centered.

### 6.4 Radius, borders, shadows
- Radius scale: `8px` (thumbs) · `16px` (small image cards) · `24–32px` (property/CTA images) · `36–44px` (hero image, search widget) · pill `999px` (buttons, tabs).
- Borders: 1 px `--line` on accordion row separators and small icon circles; images sometimes get a 1 px inner hairline.
- Shadows: **only on the search widget** and possibly the CTA image — very soft, large-blur, low-opacity warm shadow (e.g. `0 24px 60px rgba(60,40,25,.10)`). No shadow on property cards.
- No visible gradients on UI. No glassmorphism. No hard outlines.

### 6.5 Grid system
- Base: 12-column, 24–32 px gutters (inferred; not directly measurable).
- Repeated patterns: 2-col split (heading/copy), 2-col card grid, 4-field filter row, 2-col mirrored list.
- Alignment: headings are **left-aligned** in split sections and **centered** in About/Services; body copy is always left-aligned even when the heading is centered.

### 6.6 Responsive behaviour
Not derivable from a desktop-only capture. Conservative, reference-faithful assumptions to verify later:
- ≤1024 px: split sections stack; hero meta block moves under H1; featured grid becomes 1 column and loses the stagger.
- ≤768 px: nav collapses to a menu button (design of which is **not in the reference**); search widget becomes a stacked card; accordion stays stacked; footer wordmark scales down but remains full-width.
- Italic second lines must survive at every breakpoint (they are identity, not decoration).

---

## 7. Section-by-section specification

### 7.1 Header
- Transparent over cream; no sticky state visible in the capture (unknown whether it becomes sticky on scroll — mark unverified).
- Left nav items separated by ~24–32 px.
- Accent pill button: padding ≈ `12px 20px`, radius 999 px, label + arrow.

### 7.2 Hero
- H1 two lines, second italic; no underline/decoration.
- Meta block: top line = stat + avatars; below = 3–4 line paragraph in `--muted`.
- Hero image: rounded, large; sits on cream with equal margins left/right.
- Search widget: white card, shadow, tabs above the fields on the left, fields in a row, accent CTA at right.
- Interaction: tab switch changes the active underline; filters open dropdown panels (not shown in reference — mark unverified).

### 7.3 About
- Kicker `About us` (left-aligned, tiny).
- Centered heading: `Crafted for Exceptional` / *`Modern Luxury Living`*.
- Composition: faint giant circle arcs + circular badge text behind; small image top-left; paragraph in the middle; larger image lower-right; oxblood pill `Learn more` (or `About us`) with arrow at the lower right.
- Paragraph text is truncated/illegible in the reference.

### 7.4 Featured properties
- Heading left: `Explore Spaces Designed` / *`For Modern Living.`*
- Top-right: small uppercase/arrow link `Explore all properties →`.
- Cards: image on top (rounded), then a single line under it: **name left**, **price right** (e.g. `$1,500,000`). No boxes, no shadows — the caption sits directly on the cream.
- Observed names (approximate): `Westmere House`, `Exeter House`; second row `…`; prices visible as `$1,500…` / `$1,200…`. **All names/prices require confirmation.**
- Staggered vertical offset between columns; the row 2 right card is lower; row 3 is inset from both sides.

### 7.5 Services accordion
- Heading centered: `Timeless Services,` / *`Singular Vision.`*
- Four numbered rows, indices in serif: `01 Residential Designs`, `02 Commercial Interiors`, `03 Hospitality Spaces`, `04 Retail Environments`.
- Row anatomy: index | title | (expanded only) short paragraph | circular icon button at far right (plus for closed, arrow/dash for open).
- Expanded row (01) reveals a **wide panoramic image** under the title row, inside the same row block, plus a small description at left.
- Hairline divider between rows; generous vertical padding.
- Behaviour: one-open-at-a-time accordion; smooth height/opacity transition; the open row's image is likely the hero of that service.

### 7.6 Collection / premium estates
- Left: tiny kicker + heading `Premium estates,` / *`elegant waterfront living`*.
- Right: 2–3 line paragraph (muted) + oxblood pill `View all properties` (illegible exact label) + arrow.
- List: 8 items in 2 columns × 4 rows.
  - Left column: thumbnail | name + spec stack.
  - Right column: name + spec stack | thumbnail (mirrored).
  - Spec lines are 4 tiny rows: location, sq ft, beds, baths (labels and values, e.g. `New York, USA`, `Sq. Ft. 5,000`, `Beds 5`, `Baths 4`).
  - Names visible/estimated: `Marble House`, `The Royal Villa`, `Lakeview Manor`, `Villa Serenity`, `The Waterfront Estate`, `Casa Belle`, `Seaside Villa`, `Ivy Court`. **Confirm all.**
- Row spacing using hairline separators is **not** present — items float on cream with ~24–32 px gaps.
- A circular chevron button ("next") is visible at the **right viewport edge, vertically centered on this section** → this listing is a **carousel/slider**.

### 7.7 FAQ
- Left: `Frequently` / *`Asked Question?`* (note: singular "Question" in the reference — preserve the wording).
- Right: accordion, first row open and **filled dark oxblood with cream text**, question `What are your fees, and how do you charge?` and a `−` control.
- Collapsed rows (cream, hairline separated, `+` control): `Do you offer an initial or private tour?`, `Should we make an offer or can we negotiate directly?`, `Do we need an extra deposit/booking fee?`, plus 1–2 more illegible rows.
- Open row may contain answer copy (not legible).

### 7.8 CTA
- Left: `Find Your Signature Home` / *`Today. Explore the Collection`*, 2–3 line paragraph, oxblood pill button (label illegible — likely `Book a visit` / `Contact us`), then a small 2-column contact/meta list (phone, email, address, social) in tiny type.
- Right: large rounded image of a symmetrical classical villa with warm stone facade and lawn.
- This block reads as a **pre-footer band**, not a dark CTA — it stays on cream.

### 7.9 Footer
- No link columns, no legal row visible.
- Only a **giant uppercase Didone wordmark** in oxblood, spanning the full viewport width, with a **circular interlaced monogram** dividing it at the center.
- Visible glyph run reads approximately `STATIA ◉ ESTATI`; almost certainly a clipped rendering of `ESTATIA` (brand name) — **spelling must be confirmed before implementation**.
- Cropped at the bottom edge in the capture, so the true footer height and any copyright line are unknown.

---

## 8. Motion & interaction (inferred from static frames)

| Element | Behaviour | Confidence |
|---|---|---|
| Service accordion | Height/opacity expand, one open at a time; icon morphs + ↔ − | High (open state shown) |
| FAQ accordion | Same pattern; active row becomes dark filled bar | High (open state shown) |
| Hero search tabs (`For Sale` / `For Rent`) | Active underline slides between labels (superseded by the 8 Nov screenshot — pills now fill with accent) | Medium |
| Hero filter fields | Dropdown panels (custom or native) | Low — not shown |
| Estates listing | Horizontal carousel with circular next/prev at viewport edge | Medium-High (arrow visible) |
| Property cards | Image zoom on hover (scale ~1.03) + caption shift | Low-Medium — standard for this style, **not visible** |
| Buttons / links | Background darken on hover; arrow translates ~2–4 px right | Low-Medium |
| Section entrances | Soft fade/translate-up on scroll | Low — **not visible**; do not add flashy motion |
| Header | Possibly sticky with cream fill on scroll | Unknown |

**Overall motion character:** restrained, slow (400–700 ms), `ease-out`/custom cubic-bezier, no bounce, no parallax spectacle.

---

## 9. Content inventory (visible text, as read)

```
NAV        Home · Property · About us · Contact us        [Contact Us →]
HERO       Find Your Dream / Luxury Home
           4.5K+ · short paragraph (illegible)
           For Sale | For Rent   Location ▾  Type ▾  Property ▾  [Search →]
ABOUT      About us
           Crafted for Exceptional / Modern Luxury Living
           [paragraph illegible]        [Learn more →]
PROPERTIES Explore Spaces Designed / For Modern Living.     Explore all properties →
           Westmere House ……… $1,500,000
           Exeter House   ……… $1,200,000
           (further cards cropped)
SERVICES   Timeless Services, / Singular Vision.
           01 Residential Designs
           02 Commercial Interiors
           03 Hospitality Spaces
           04 Retail Environments
COLLECTION Premium estates, / elegant waterfront living
           [paragraph]        [View all properties]
           Marble House · The Waterfront Estate · The Royal Villa · Casa Belle
           Lakeview Manor · Seaside Villa · Villa Serenity · Ivy Court
FAQ        Frequently / Asked Question?
           What are your fees, and how do you charge?
           Do you offer an initial or private tour?
           Should we make an offer or can we negotiate directly?
           Do we need an extra deposit/booking fee?
           (1–2 further rows illegible)
CTA        Find Your Signature Home / Today. Explore the Collection
           [paragraph] [button] [contact list]
FOOTER     STATIA ◉ ESTATI   (giant wordmark — spelling to confirm)
```

> Punctuation and capitalization in the reference are inconsistent in places (e.g. `Asked Question?`, trailing periods on italic heading lines). Preserve exactly as written once confirmed at higher resolution; do **not** "fix" it during the first build.

---

## 10. Unknowns / requires further inspection

The following cannot be reliably determined from the supplied image and must be verified against a higher-resolution source (or an explicit decision from the client) **before** they are finalised:

1. **Font families** — style is clear, exact families are not.
2. **All body paragraph copy** — illegible below ~13 px.
3. **Nav labels & order** — first two items (`Home`, `Property`) are confident; remaining labels are guesses.
4. **All button labels** — hero search, about, collection, CTA.
5. **Search widget field count/labels** — 3 or 4 fields.
6. **Property names and prices** — only two are partly legible.
7. **Collection item metadata** — exact spec labels (sq ft / beds / baths formatting).
8. **FAQ full question list and answer copy.**
9. **Footer wordmark spelling** and whether a legal/copyright row exists below the crop.
10. **Header sticky behaviour, hover states, dropdown panels** — no second state is captured.
11. **Whether the hero's blurred foliage is a separate decorative layer** or part of the photo.
12. **Exact background hex values** — estimates only; re-sample from source.
13. **Tablet/mobile layouts** — completely absent from the reference.
14. **Section background alternation** — all sections appear to share one cream background, but subtle tint differences between blocks cannot be excluded at this resolution.

---

## 11. Build constraints (do not deviate)

- One continuous vertical page — the two captures are **top and bottom of the same page**, never side by side.
- Cream-dominant, oxblood-only accent. No additional brand colours.
- Display serif with a **light italic second line** in every major heading — this is the core visual signature.
- Images always inside rounded frames with cream breathing room; no full-bleed photo sections other than the hero's soft edge blur.
- Hairline dividers, no card shadows except the hero search widget (and possibly the CTA image).
- Uppercase, wide-tracked micro sans for all utility text.
- Numeric section indices (`01–04`) in the services accordion must be preserved.
- Staggered property grid and mirrored collection columns are structural, not decorative.
- Keep copy exactly as in the reference; do not rewrite, expand, or "improve" it.
- Do not invent sections, tabs, testimonial sliders, logos, or footer link columns that are not in the reference.

---

*Analysis complete. Awaiting the next instruction before any implementation.*
