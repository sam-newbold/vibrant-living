# Vibrant Living Retreat & Day Spa — Website Design Spec

**Date:** 2026-03-23
**Project:** Full website rebuild for vibrantliving.co.nz
**Target platform:** Webflow (staging site first for client sign-off)
**Approved by:** Sam Newbold

---

## 1. Overview

A complete 33-page website rebuild for **Vibrant Living Retreat and Day Spa**, Hanmer Springs, New Zealand. The staging site will be delivered as component-first flat HTML/CSS/JS structured to map cleanly to Webflow. Once Adela (co-owner) approves the staging site, it migrates to Webflow for production.

---

## 2. Tech Stack

- **Format:** Plain HTML/CSS/JS — no build tools, no framework
- **Structure:** One shared `styles.css` + `components.css`, plus one `main.js` for nav behaviour and shared interactions
- **Templating:** Nav and footer are included via a lightweight JS include (no server required)
- **Webflow alignment:** Class names, section structure, and component boundaries map 1:1 to Webflow Symbols and Classes
- **Scope:** All 33 pages (full site, not MVP)

---

## 3. Design Direction

**Clean Luxury Spa** — white-dominant, refined spacing, editorial image treatment. Inspired by high-end wellness brands. Confidence through minimalism; every element earns its place.

---

## 4. Visual Identity System

### 4.1 Colour Palette

| Role | Hex | Usage |
|---|---|---|
| Brand Green | `#8BBF5A` | CTAs, accents, logo, overlines |
| Warm Grey | `#8A8782` | Body text, nav links, captions |
| Background Sage | `#E3E0C0` | Alternate section backgrounds |
| White | `#FFFFFF` | Primary page background |
| Near-Black | `#1A1A1A` | Headings, hero text, footer bg |
| Warm Cream | `#F5EEE6` | Cards, popovers |
| Muted Stone | `#757575` | Secondary CTA buttons |
| Light Grey | `#E8E6E6` | Dividers, card backgrounds, borders |

### 4.2 Typography

| Role | Font | Size | Style |
|---|---|---|---|
| H1 | Raleway 300 | 52px | Normal weight, tight tracking |
| H2 | Raleway 600 | 24px | Uppercase, +4px letter-spacing |
| H3 | Raleway 400 | 20px | Title case |
| Body | Avenir LT W01 35 Light | 16px | 1.7 line-height |
| Overline/Label | Avenir Light | 11px | Uppercase, +3px letter-spacing, Brand Green |
| CTA/Button | Avenir Medium | 13px | Uppercase, +2px letter-spacing |

### 4.3 Button Variants

- **Primary:** `#8BBF5A` fill, white text, `border-radius: 2px`, `padding: 14px 32px`
- **Outline (dark):** Transparent fill, `1.5px solid #1A1A1A`, dark text
- **Secondary:** `#757575` fill, white text
- **Outline (light):** Transparent fill, `1.5px solid white`, white text — for use on dark/image backgrounds

### 4.4 Spacing System

- Section padding: `80px` top/bottom (desktop), `48px` (mobile)
- Container: max-width `1200px`, centred, `24px` side gutters
- Card gap: `32px`
- Component gap: `48px`
- Hero text: centred, max-width `720px`

---

## 5. Navigation

**Style:** Transparent → Sticky White

- On load: transparent bar, logo and links in white, sits over full-screen video hero
- On scroll (>80px): transitions to white bar with `box-shadow: 0 2px 12px rgba(0,0,0,0.06)`, logo and links switch to dark
- **Links:** Accommodation · Day Spa · Retreats · Packages · Specials · More ▾ · **Book Now** (green CTA button)
- **More dropdown:** Yoga, Fat Bikes, Venue Hire, Partners, Free Resources, Gift Vouchers
- **Mobile:** Hamburger icon → full-width slide-down menu
- **Sticky behaviour:** `position: sticky; top: 0; z-index: 100`

---

## 6. Hero — Cinematic Video (Homepage only)

- Full-viewport-height (`100vh`) section
- Looping muted autoplay video: `https://video.wixstatic.com/video/794854_7da545e460c04596ac7fbec87061f6f6/1080p/mp4/file.mp4`; fallback to static image for browsers that block autoplay
- Dark overlay: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5))`
- Centred text block (max-width `720px`):
  - Overline: `YOUR ESCAPE IN HANMER SPRINGS`
  - H1: `Vibrant Living Retreat & Day Spa`
  - Two CTAs: `Book Your Escape` (primary green) + `Explore` (outline light)
- Subtle scroll indicator at bottom

---

## 7. Section Components (Reusable)

### S1 — Text + Image
Two-column section. Text left (headline, body, optional CTA), image right. Alternates left/right on repeat. Used on detail pages, About.

### S2 — Card Grid
Section heading + 2, 3, or 4-column card grid. Cards: image top, category overline, title, short description, link. Used on hub pages, Specials.

### S3 — Feature Strip
4-column icon + label + short description grid on sage background (`#E3E0C0`). Used for eco values, retreat highlights, why-choose-us.

### S4 — Full-Width CTA Banner
Dark background (`#1A1A1A`), centred headline + subtext + primary CTA button. Used as penultimate section on all service and retreat pages.

### S5 — Pricing Table
2–3 column pricing cards with price, inclusions list, and CTA. Highlighted "popular" variant with green border. Used on accommodation, packages, and retreat calendar pages.

---

## 8. Footer

Dark background (`#1A1A1A`). Four columns:
1. Logo + tagline + address + phone + email
2. Stay (accommodation links)
3. Spa (day spa + package links)
4. Contact + social icons (Facebook, Instagram)

Bottom bar: copyright line left, social icon row right. Divider line separating footer body from bottom bar.

---

## 9. Page Templates

### T1 — Homepage (1 page: `/`)
Cinematic video hero → Feature strip (4 pillars: Accommodation, Day Spa, Retreats, Eco values) → Card grid (accommodation preview, 4 cards) → Text+Image (spa intro) → Card grid (retreat preview, 3 cards) → Specials banner → CTA strip → Footer

### T2 — Hub / Category (5 pages)
Full-width photo hero banner (50vh, image overlay) → Centred intro headline + body → Card grid of sub-pages → CTA strip → Footer

Pages: `/accommodation`, `/day-spa`, `/packages`, `/retreats`, `/specials`

### T3 — Service / Accommodation Detail (16 pages)
Hero banner (50vh) → Centred intro headline + body → Alternating Text+Image sections (2–4 blocks) → Inclusions/features list → Pricing table (S5) → Related services card row → CTA banner (S4) → Footer

Pages: `/lodge-suite`, `/alpine-spa-villa`, `/three-bedroom-villa`, `/campground`, `/massages`, `/beauty`, `/healing`, `/pampering-packages`, `/alpinerenewalritual`, `/spa-escape`, `/family-escape`, `/friends-escape`, `/private-retreats`, `/heart-connecting-retreat`, `/qhretreat`, `/gift-vouchers`

### T4 — Editorial / About (6 pages)
Hero banner (50vh) → Rich editorial text + images (flexible layout) → Optional feature strip or team section → CTA strip → Footer

Pages: `/about-us`, `/yoga-hanmer-springs`, `/fat-bikes`, `/venue-hire`, `/partners`, `/free-resources`

### T5 — Functional (4 pages)
- `/contact` — Hero banner → 2-col layout (contact form left, info panel + map right) → Footer
- `/book-online` — Hero banner → Booking widget embed (external) → Footer
- `/retreat-calendar` — Hero banner → Schedule/availability table → CTA strip → Footer
- `/features` — Hero banner → Media/image grid → Footer

### T6 — Utility (1 page)
- `/thankyou` — Centred logo + confirmation message + link back to home. No nav, no footer.

---

## 10. File Structure

```
vibrant-living/
├── index.html                  # Home (T1)
├── about-us.html               # About (T4)
├── accommodation.html          # Hub (T2)
├── lodge-suite.html            # Detail (T3)
├── alpine-spa-villa.html       # Detail (T3)
├── three-bedroom-villa.html    # Detail (T3)
├── campground.html             # Detail (T3)
├── day-spa.html                # Hub (T2)
├── massages.html               # Detail (T3)
├── beauty.html                 # Detail (T3)
├── healing.html                # Detail (T3)
├── pampering-packages.html     # Detail (T3)
├── alpinerenewalritual.html    # Detail (T3)
├── retreats.html               # Hub (T2)
├── private-retreats.html       # Detail (T3)
├── heart-connecting-retreat.html # Detail (T3)
├── qhretreat.html              # Detail (T3)
├── retreat-calendar.html       # Functional (T5)
├── packages.html               # Hub (T2)
├── spa-escape.html             # Detail (T3)
├── family-escape.html          # Detail (T3)
├── friends-escape.html         # Detail (T3)
├── specials.html               # Hub (T2)
├── gift-vouchers.html          # Detail (T3)
├── yoga-hanmer-springs.html    # Editorial (T4)
├── fat-bikes.html              # Editorial (T4)
├── venue-hire.html             # Editorial (T4)
├── features.html               # Functional (T5)
├── partners.html               # Editorial (T4)
├── free-resources.html         # Editorial (T4)
├── book-online.html            # Functional (T5)
├── contact.html                # Functional (T5)
├── thankyou.html               # Utility (T6)
├── css/
│   ├── styles.css              # Global: reset, variables, typography, spacing
│   └── components.css          # Nav, hero, S1–S5, footer, cards, buttons
├── js/
│   └── main.js                 # Nav scroll behaviour, mobile menu, includes
└── images/
    └── (all downloaded Wix CDN images)
```

---

## 11. Content & Copy

- All content sourced from CLAUDE.md — do not invent content
- NZD pricing throughout; New Zealand English (British spelling)
- Tone: warm, personal, holistic, nature-connected
- Key words: sanctuary, nourishing, restorative, rejuvenate, holistic, heart-centered, vibrant
- Booking: all "Book Now" CTAs link to the external booking widget (preserve existing pattern)
- Contact form: submits to `info@vibrantliving.co.nz`

---

## 12. Images

All images downloaded from Wix CDN at full resolution. Stored in `/images/`. Key assets:

| Image | Wix media ID |
|---|---|
| Logo | `794854_672030cb96664023b0ee728decfd10aa~mv2.jpg` |
| Hero (hot stones) | `0df3ba682314442487f5b9f3e8d7de14.jpg` |
| Team photo | `794854_b627dcb419b847b38d8f179c53dcf5c4~mv2.jpg` |
| Aromatherapy | `794854_8eb8b034ac2545d098aa4955a23e71b1~mv2.jpg` |
| Pregnancy massage | `607152bc37474437828fc852f3f251b9.jpg` |
| Retreat exterior | `794854_b6396cd765ff44f39ce7d20a300714cc~mv2.jpg` |
| Alpine Spa Villa | `794854_0f8dc943f9a04658882a572514744c9f~mv2.jpg` |
| Alpine Renewal room | `794854_ae10d1a404744efba5b712bb060f1547~mv2.jpg` |
| Campground | `794854_cdb775f9345f4cc8b3903a048461ba65~mv2.jpg` |
| Family/owners | `794854_7da545e460c04596ac7fbec87061f6f6f000.jpg` |

Fetch at full resolution: `https://static.wixstatic.com/media/{ID}/v1/fill/w_3000,q_90/{filename}`

---

## 13. Mobile Responsiveness

- Breakpoints: `768px` (tablet), `480px` (mobile)
- Nav collapses to hamburger at `768px`
- Card grids: 3-col → 2-col → 1-col
- Text+Image: side-by-side → stacked (image above text on mobile)
- Hero: same cinematic treatment, text scales down
- Pricing table: horizontal scroll on mobile if needed, or stack cards

---

## 14. Known Content Gaps (to resolve before/during build)

| Page | Gap | Resolution |
|---|---|---|
| Homepage hero | Video asset confirmed | Use `https://video.wixstatic.com/video/794854_7da545e460c04596ac7fbec87061f6f6/1080p/mp4/file.mp4` — static image fallback for browsers that block autoplay |
| `/specials` | Nav position confirmed | **Top-level primary nav item** (not in More dropdown) |
| `/partners` | No content in brief | **Scrape https://www.vibrantliving.co.nz/partners** as part of build step |
| `/free-resources` | No content in brief | **Scrape https://www.vibrantliving.co.nz/free-resources** as part of build step |
| `/features` | No content in brief | **Scrape https://www.vibrantliving.co.nz/features** as part of build step |
| `/retreat-calendar` | No structured schedule data | **Scrape https://www.vibrantliving.co.nz/retreat-calendar** as part of build step |
| `/friends-escape` | No detail content in brief | **Scrape https://www.vibrantliving.co.nz/friends-escape** as part of build step |
| All pages | Images must be downloaded from Wix CDN before build | Image download is step 1 of the build plan |

---

## 15. Accessibility & SEO

- Semantic HTML5 elements (`<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- All images have descriptive `alt` text
- Colour contrast: all text meets WCAG AA on its background
- `<title>` and `<meta description>` unique per page
- Open Graph tags on Home, Accommodation, Day Spa, Retreats, Packages pages
