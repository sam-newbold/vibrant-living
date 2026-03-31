# Webflow Migration Design Spec
**Date:** 2026-03-31
**Project:** Vibrant Living Retreat and Day Spa
**Webflow site:** vibrant-living-8f5018 (ID: 69cad6b6e7588092d3d696b6)
**Source:** Static HTML staging site at `/Users/samnewbold/Documents/vibrant-living`

---

## Context

The HTML/CSS/JS staging site (72 pages) was built for client sign-off. This spec covers the full migration into Webflow using the Webflow MCP Designer and Data API tools. The migration replaces the static site's JS-injected nav/footer with Webflow Symbols, converts repeatable service/accommodation/specials pages into CMS Collections, and maps all CSS classes to Webflow styles.

**Webflow MCP approach:** All work done programmatically via MCP (Designer tools + Data API). Webflow Designer must be open in browser throughout.

---

## Pre-Migration Checklist

Before starting any phase:
- Confirm Webflow site ID: `69cad6b6e7588092d3d696b6`
- Confirm Webflow plan supports CMS (free tier supports up to 50 CMS items; this migration uses 42 items — within limit)
- Note: Avenir LT W01 35 Light is a Wix-licensed font not available on Google Fonts. Use **"Nunito"** from Google Fonts as the body font substitute in Webflow (closest open-license match to Avenir LT Light). This affects all body text and button labels.

---

## Architecture

### CMS Collections (6)

Repeatable content modelled as CMS Collections. Each collection has a static hub page (listing items) and a CMS template page (individual item detail).

Note: `/spa-escape`, `/family-escape`, `/friends-escape` are **static pages**, not CMS items — they are one-off promotional packages with unique layout/content that don't follow a repeatable pattern. Pampering Packages are CMS because they follow an identical card + pricing + inclusions template.

| Collection | Items | Hub Page | Template URL |
|---|---|---|---|
| Accommodation | 4 | `/accommodation` | `/accommodation/{slug}` |
| Massages | 15 | `/massages` | `/massages/{slug}` |
| Beauty Treatments | 5 | `/beauty` | `/beauty/{slug}` |
| Healing Services | 7 | `/healing` | `/healing/{slug}` |
| Pampering Packages | 8 | `/pampering-packages` | `/pampering-packages/{slug}` |
| Specials | 3 | `/specials` | `/specials/{slug}` |

**Total CMS items: 42** (within Webflow free tier limit of 50)

### Static Pages (30)

| Template | Pages |
|---|---|
| T1 – Homepage | `/` |
| T2 – Hub/Category | `/accommodation`, `/day-spa`, `/massages`, `/beauty`, `/healing`, `/pampering-packages`, `/retreats`, `/packages`, `/specials` |
| T3 – Detail/Service | `/alpinerenewalritual`, `/private-retreats`, `/heart-connecting-retreat`, `/qhretreat`, `/spa-escape`, `/family-escape`, `/friends-escape`, `/gift-vouchers` |
| T4 – Editorial | `/about-us`, `/yoga-hanmer-springs`, `/fat-bikes`, `/venue-hire`, `/partners`, `/free-resources`, `/things-to-do-hanmer-springs` |
| T5 – Functional | `/book-online`, `/contact`, `/retreat-calendar`, `/features` |
| T6 – Utility | `/thankyou` (no nav/footer Symbols — exclude both from this page) |

### CMS Template Pages (6)

One detail template per CMS collection, built in Webflow Designer and connected to collection data.

---

## Phase 1: Design System

### Color Variables — collection "Brand Colors"

| Variable Name | Hex | Usage |
|---|---|---|
| `brand-green` | `#8BBF5A` | Primary CTAs, logo, overlines |
| `warm-grey` | `#8A8782` | Body text, secondary text |
| `bg-sage` | `#E3E0C0` | Section backgrounds (sage) |
| `near-black` | `#1A1A1A` | Headings, dark backgrounds |
| `white` | `#FFFFFF` | Primary backgrounds |
| `warm-cream` | `#F5EEE6` | Cards, overlays |
| `muted-stone` | `#757575` | Secondary buttons |
| `light-grey` | `#E8E6E6` | Dividers, card backgrounds |

### Typography Variables — collection "Typography"

| Variable | Value |
|---|---|
| `heading-font` | Raleway |
| `body-font` | Nunito, sans-serif (substitute for Avenir LT W01 — see pre-migration note) |

### Base Styles (All Elements / Body)

- **Body:** Nunito, 16px, 1.7 line-height, `#8A8782` (warm grey — matches staging CSS `color: var(--warm-grey)`)
- **H1:** Raleway 300, 64px (desktop) / 40px (mobile), uppercase, letter-spacing 0.02em, `#1A1A1A`
- **H2:** Raleway 300, 48px / 32px, `#1A1A1A`
- **H3:** Raleway 400, 32px / 24px, `#1A1A1A`
- **H4:** Raleway 500, 24px / 20px, `#1A1A1A`
- **Overline:** Raleway 600, 12px, uppercase, letter-spacing 0.15em, `#8BBF5A` (brand green — matches staging CSS `color: var(--green)`)

### Breakpoints

Webflow uses fixed breakpoint widths. The staging CSS uses 768px/480px; Webflow's nearest equivalents are 767px/478px — a 1px difference. No layout issues expected, but verify card grid collapse at ≤768px.

| Webflow breakpoint | Applied width | Staging equivalent |
|---|---|---|
| Main | All (default) | — |
| Medium (tablet) | ≤ 991px | — |
| Small (mobile landscape) | ≤ 767px | 768px |
| Tiny (mobile portrait) | ≤ 478px | 480px |

---

## Phase 2: Global Styles

Class names here are **Webflow style names** to create (they match the staging CSS class names in `css/components.css`).

### Layout

| Class | Properties |
|---|---|
| `container` | max-width: 1200px, margin: 0 auto, padding-left: 24px, padding-right: 24px |
| `section` | padding-top: 80px, padding-bottom: 80px → medium: 48px 0 |
| `section-sage` | background-color: `#E3E0C0` |
| `section-dark` | background-color: `#1A1A1A`, color: `#FFFFFF` |
| `section-cream` | background-color: `#F5EEE6` |

### Buttons

Base class `btn`: border-radius: 2px, padding-top: 14px, padding-bottom: 14px, padding-left: 32px, padding-right: 32px, font-family: Nunito, font-weight: 600, font-size: 14px, text-transform: uppercase, letter-spacing: 0.1em, transition: all 0.2s.

| Class | Additional properties |
|---|---|
| `btn-primary` | background-color: `#8BBF5A`, color: `#FFFFFF` |
| `btn-secondary` | background-color: `#757575`, color: `#FFFFFF` |
| `btn-outline` | border: 2px solid `#1A1A1A`, color: `#1A1A1A`, background-color: transparent |
| `btn-outline-light` | border: 2px solid `#FFFFFF`, color: `#FFFFFF`, background-color: transparent |

### Hero

| Class | Properties |
|---|---|
| `hero` | position: relative, overflow: hidden |
| `hero-full` | height: 100vh, min-height: 600px |
| `hero-short` | height: 50vh, min-height: 400px |
| `hero-overlay` | position: absolute, top: 0, right: 0, bottom: 0, left: 0, background-color: rgba(0,0,0,0.35) |
| `hero-content` | position: relative, z-index: 1, text-align: center, color: `#FFFFFF` |

### Cards

| Class | Properties |
|---|---|
| `card` | background-color: `#FFFFFF`, border-radius: 4px, overflow: hidden, box-shadow: 0 2px 12px rgba(0,0,0,0.08) |
| `card-image` | width: 100%, object-fit: cover |
| `card-body` | padding: 24px |
| `card-title` | font-family: Raleway, font-weight: 500, font-size: 20px, margin-bottom: 8px |
| `card-excerpt` | font-size: 14px, color: `#8A8782`, margin-bottom: 16px |
| `card-price` | font-family: Raleway, font-weight: 600, font-size: 16px, color: `#8BBF5A` |

### Section Patterns

**Actual CSS class names from `css/components.css`:**

**s-text-image (S1 – Text + Image)**
- `.s-text-image`: Two-column grid (50/50), gap: 64px → stacks on mobile (image above text)
- `.s-text-image--reversed`: image on right

**card-grid (S2 – Card Grid)**
- `.card-grid`, `.card-grid--4col` / `.card-grid--3col` / `.card-grid--2col`: responsive grid, gap: 24px, collapses to 1 col on mobile

**s-features (S3 – Feature Strip)**
- `.s-features`: sage background, 4-column icon+label grid → 2-col tablet → 1-col mobile

**s-cta-banner (S4 – CTA Banner)**
- `.s-cta-banner`: dark background, centred heading + subtext + primary button

**pricing-grid (S5 – Pricing Table)**
- `.pricing-grid`: 2-3 column pricing cards, `.pricing-card--featured` has green border variant

---

## Phase 3: Assets

Upload all 10 images to Webflow asset library via `asset_tool > upload` (or manually via Designer Assets panel):

| Asset name | Source file |
|---|---|
| logo.jpg | `images/logo.jpg` |
| hero-hot-stones.jpg | `images/hero-hot-stones.jpg` |
| team.jpg | `images/team.jpg` |
| owners.jpg | `images/owners.jpg` |
| aromatherapy.jpg | `images/aromatherapy.jpg` |
| pregnancy-massage.jpg | `images/pregnancy-massage.jpg` |
| retreat-exterior.jpg | `images/retreat-exterior.jpg` |
| alpine-spa-villa.jpg | `images/alpine-spa-villa.jpg` |
| alpine-renewal-room.jpg | `images/alpine-renewal-room.jpg` |
| campground.jpg | `images/campground.jpg` |

---

## Phase 4: CMS Collections

### Accommodation (4 items: Lodge Suite, Alpine Spa Villa, Three Bedroom Villa, Campground)
- `name` (Plain Text, required)
- `slug` (auto)
- `tagline` (Plain Text)
- `description` (Rich Text)
- `hero-image` (Image)
- `price-no-breakfast` (Number) — NZD per night
- `price-bb` (Number) — NZD B&B for 2
- `highlights` (Rich Text) — key features list
- `excerpt` (Plain Text) — for hub page card

### Massages (15 items — includes energy healing massage variant)
- `name` (Plain Text, required)
- `slug` (auto)
- `excerpt` (Plain Text)
- `description` (Rich Text)
- `hero-image` (Image)
- `duration-60-price` (Number)
- `duration-90-price` (Number)
- `duration-120-price` (Number)
- `is-couples` (Switch) — whether couples option available
- `category` (Option: Relaxation, Therapeutic, Specialty)

### Beauty Treatments (5 items: Back & Facial Combo, Express Facial, Gemstone Facial, Sugar Exfoliation, Vitality Facial)
- `name`, `slug`, `excerpt`, `description`, `hero-image`
- `duration` (Plain Text — e.g. "60 minutes")
- `price` (Number)

### Healing Services (7 items)
- `name`, `slug`, `excerpt`, `description`, `hero-image`
- `duration` (Plain Text)
- `price` (Number)

### Pampering Packages (8 items)
- `name`, `slug`, `excerpt`, `description`, `hero-image`
- `duration` (Plain Text)
- `price-individual` (Number)
- `price-couple` (Number)
- `included-services` (Rich Text)

### Specials (3 items: Easter Renewal, Midweek Reset, Midweek for Two)
- `name`, `slug`, `excerpt`, `description`, `hero-image`
- `validity` (Plain Text — e.g. "Mon–Thu, March–May 2026")
- `price` (Number)
- `regular-price` (Number)
- `conditions` (Rich Text)
- `is-active` (Switch)

---

## Phase 5: Symbols (Components)

### Navbar Symbol

**States:** Transparent (load) → sticky white (on scroll)

Primary navigation matches `js/partials.js` and CLAUDE.md:

```
Nav wrapper
├── Logo (image link → /)
├── Nav links (desktop)
│   ├── Specials and Promotions → /specials
│   ├── Accommodation → /accommodation
│   ├── Day Spa → /day-spa
│   ├── Stay & Spa Packages → /packages
│   ├── More ▾ (dropdown trigger)
│   │   └── Dropdown menu
│   │       ├── About Us → /about-us
│   │       ├── Yoga → /yoga-hanmer-springs
│   │       ├── Fat Bikes → /fat-bikes
│   │       ├── Venue Hire → /venue-hire
│   │       ├── Partners → /partners
│   │       ├── Free Resources → /free-resources
│   │       └── Gift Vouchers → /gift-vouchers
│   └── Book Now (btn-primary) → /book-online
└── Hamburger button (mobile only)
    └── Mobile menu (full-width slide-down, includes all nav links + Book Now)
```

**Webflow Interaction:** On page scroll past 80px → apply `nav-scrolled` style (background-color: white, text: `#1A1A1A`, box-shadow). Reverse on scroll up.

### Footer Symbol

**4-column grid** (`grid-template-columns: 2fr 1fr 1fr 1fr`):

```
Footer
├── Footer top (4 columns)
│   ├── Brand column (2fr): logo, tagline "Your escape in Hanmer Springs", social icons (Facebook, Instagram)
│   ├── Explore links: Accommodation, Day Spa, Retreats, Packages, Specials
│   ├── More links: Yoga, Fat Bikes, Venue Hire, Partners, Free Resources, Gift Vouchers
│   └── Contact: 88 Rippingale Road Hanmer Springs 7334 NZ | +64 3 315 7429 | info@vibrantliving.co.nz | Mon–Sun 9am–8pm
└── Footer bottom: © 2026 Vibrant Living Retreat and Day Spa
```

---

## Phase 6: CMS Template Pages

Each uses T3 pattern: short hero → content sections → pricing → CTA → related items.

### `/accommodation/{slug}`
Hero (hero-image) → Room highlights (s-text-image) → Amenities (s-features) → Pricing (pricing-grid) → Book CTA (s-cta-banner) → Other Rooms (card-grid, filtered collection)

### `/massages/{slug}`
Hero → Description (s-text-image) → Duration & Pricing (pricing-grid) → Book CTA (s-cta-banner) → Related Massages (card-grid, filtered collection)

### `/beauty/{slug}`, `/healing/{slug}`
Same pattern as massages template.

### `/pampering-packages/{slug}`
Hero → Package description → What's included (s-text-image rich text) → Pricing (pricing-grid) → Book CTA (s-cta-banner) → Other Packages (card-grid)

### `/specials/{slug}`
Hero → Special details → Validity & conditions → Pricing (pricing-grid, regular vs special price) → Book CTA (s-cta-banner)

---

## Phase 7: Static Pages

### T1 – Homepage (`/`)
1. Full-height hero (hero-hot-stones.jpg) — headline "Your escape in Hanmer Springs" + two CTAs (View Accommodation, Book Day Spa)
2. s-features — 4 pillars: Accommodation, Day Spa, Retreats, Packages
3. card-grid--4col — Accommodation options (4 CMS items)
4. s-text-image — Day spa intro (aromatherapy.jpg)
5. card-grid--3col — Retreats overview
6. s-cta-banner — Current specials
7. s-text-image--reversed — About Adela/owners (owners.jpg)
8. s-cta-banner — Book Now

### T2 – Hub pages (9)
Pattern: short hero → intro paragraph → card-grid (linking to detail pages/CMS items) → s-cta-banner

### T3 – Detail pages (8 non-CMS)
`/alpinerenewalritual`, `/private-retreats`, `/heart-connecting-retreat`, `/qhretreat`, `/spa-escape`, `/family-escape`, `/friends-escape`, `/gift-vouchers`

Pattern: short hero → intro → s-text-image sections → pricing-grid → s-cta-banner

### T4 – Editorial pages (7)
Pattern: short hero → rich text content + images → optional s-features → s-cta-banner
Content source: `docs/scraped/*.md` for Partners, Free Resources, Features; CLAUDE.md for About Us, Yoga, Fat Bikes, Venue Hire, Things to Do

### T5 – Functional pages (4)
- **Contact (`/contact`):** 2-column — contact info left, Webflow native form right. Form submits to `info@vibrantliving.co.nz`. Use Webflow's built-in form handling (no `action` attribute needed — Webflow handles email notifications).
- **Book Online (`/book-online`):** Full-width embed block with Little Hotelier / SiteMinder widget code (copy exact embed from staging `book-online.html`)
- **Retreat Calendar (`/retreat-calendar`):** Table of upcoming retreat dates (content from `docs/scraped/retreat-calendar.md`)
- **Features (`/features`):** Grid of property features (content from `docs/scraped/features.md`)

### T6 – Thank You (`/thankyou`)
Minimal page: **do not add Navbar or Footer Symbols to this page**. Centred thank-you message + return to home link.

---

## Phase 8: Interactions

1. **Nav scroll:** Page Scroll interaction on Nav Symbol → at scroll ≥ 80px, add `nav-scrolled` class (white background, dark text, shadow). Reverse on scroll back to top.
2. **Mobile hamburger:** Click on hamburger → toggle mobile menu display (height: 0px → auto, opacity: 0 → 1).
3. **Nav dropdown:** Hover on "More" trigger → show dropdown (opacity: 0 → 1, transform: translateY(-8px) → translateY(0)).

---

## Phase 9: SEO Migration

For each static page, set in Webflow page settings:
- **SEO title:** Match `<title>` from staging HTML (e.g. "Lodge Suite B&B | Vibrant Living Hanmer Springs")
- **SEO description:** Match `<meta name="description">` from staging HTML
- **Open Graph title + description:** Copy from SEO fields
- **Slug:** Match staging URL slug exactly

For CMS items, set `seo-title` and `seo-description` fields during data entry (Phase 4).

**301 Redirects:** If any Webflow slugs differ from Wix slugs, add redirects in Webflow Site Settings > Redirects. Key slug to verify: Wix used `/alpinerenewalritual` (no hyphens) — preserve this exact slug.

After launch:
- Submit `vibrantliving.co.nz/sitemap.xml` to Google Search Console

---

## Phase 10: Publish

- Publish to Webflow subdomain: `vibrant-living-8f5018.webflow.io`
- Share URL with Adela for sign-off
- Custom domain `vibrantliving.co.nz` connected after sign-off

---

## Verification

1. **Design system:** Snapshot a test element with brand-green background and Raleway heading. Verify colour and font render correctly.
2. **Global styles:** Snapshot a `.btn-primary` button — verify padding, colour, border-radius, font weight.
3. **Assets:** Open Webflow asset library — confirm all 10 images are present.
4. **CMS:** Check each collection's field schema. Verify total item count = 42. Spot-check 2–3 items per collection for correct field values.
5. **Symbols:** Use `element_snapshot_tool` (Webflow MCP Designer API call) on the Nav and Footer Symbols to verify layout matches staging site.
6. **CMS templates:** Navigate to `/accommodation/lodge-suite` and snapshot — verify hero, pricing table, and CTA sections render with CMS data.
7. **Static pages:** Snapshot Home hero, Contact form, and one T3 page (e.g. `/alpinerenewalritual`).
8. **Interactions:** Snapshot nav at scroll 0 (transparent) and scroll 200 (white sticky).
9. **SEO:** Spot-check 3 pages in Webflow page settings to verify SEO title and description are set.
10. **Publish:** Visit `vibrant-living-8f5018.webflow.io` — verify Home loads, a CMS item URL resolves, and the Contact form is functional.

---

## Source Files Reference

| File | Purpose |
|---|---|
| `css/styles.css` | CSS custom properties and base typography → Webflow variables + base styles |
| `css/components.css` | All component class names → Webflow styles (use exact class names) |
| `js/partials.js` | Nav + footer HTML → Webflow Symbols |
| `images/` | 10 assets to upload |
| `docs/scraped/*.md` | Content for editorial pages (partners, free-resources, features, retreat-calendar, friends-escape) |
| `CLAUDE.md` | Authoritative content reference (pricing, descriptions, business info, page list) |
| Staging HTML pages | Visual reference and content source for each page |
