# Vibrant Living Website Build — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete 33-page HTML/CSS/JS staging website for Vibrant Living Retreat & Day Spa, structured for clean migration to Webflow.

**Architecture:** Component-first flat HTML with shared CSS (variables + components) and a single JS file. Nav and footer are written as JS-injected partials (template literals) to avoid duplication across 33 files without requiring a server. All section types are reusable CSS classes mapped to Webflow components.

**Tech Stack:** HTML5, CSS3 (custom properties), Vanilla JS (ES6), Python 3 (for local dev server + image download), curl (for image download)

**Spec:** `docs/superpowers/specs/2026-03-23-website-design.md`

---

## Chunk 1: Project Setup & Asset Acquisition

### Task 1: Initialise project structure

**Files:**
- Create: `index.html`
- Create: `css/styles.css`
- Create: `css/components.css`
- Create: `js/main.js`
- Create: `js/partials.js`
- Create: `images/.gitkeep`
- Create: `.gitignore`
- Create: `README.md`

- [ ] **Step 1: Create directory structure**

```bash
cd /Users/samnewbold/Documents/vibrant-living
mkdir -p css js images
touch css/styles.css css/components.css js/main.js js/partials.js images/.gitkeep
```

- [ ] **Step 2: Create .gitignore**

```
.superpowers/
images/*.mp4
node_modules/
.DS_Store
# images/*.jpg are tracked intentionally — binary assets for the staging site
```

- [ ] **Step 3: Create placeholder index.html to confirm structure works**

```html
<!DOCTYPE html>
<html lang="en-NZ">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibrant Living Retreat & Day Spa — Hanmer Springs</title>
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <div id="nav-placeholder"></div>
  <main id="main-content"></main>
  <div id="footer-placeholder"></div>
  <script src="js/partials.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 4: Create README.md**

```bash
cat > /Users/samnewbold/Documents/vibrant-living/README.md << 'EOF'
# Vibrant Living Retreat & Day Spa — Staging Site

Static HTML/CSS/JS staging site for vibrantliving.co.nz.
Built for client sign-off before Webflow migration.

## Local development

```bash
python3 -m http.server 8080
# Open http://localhost:8080
```

## Webflow migration notes
- Each HTML page → Webflow page
- CSS classes in components.css → Webflow class names
- Nav and footer (js/partials.js) → Webflow Symbols
- Section types S1–S5 → Webflow component templates
- Replace booking widget placeholder in book-online.html with embed code
- Update contact form action to use Webflow form handling
EOF
```

- [ ] **Step 5: Start local dev server in background and verify index.html loads**

```bash
cd /Users/samnewbold/Documents/vibrant-living
python3 -m http.server 8080 &
sleep 1
curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/index.html
```

Expected output: `200`. If not 200, check nothing else is running on port 8080.

- [ ] **Step 6: Commit**

```bash
git init
git add .gitignore css/ js/ images/.gitkeep index.html README.md
git commit -m "chore: initialise project structure"
```

---

### Task 2: Download images from Wix CDN

**Files:**
- Create: `images/logo.jpg`
- Create: `images/hero-hot-stones.jpg`
- Create: `images/team.jpg`
- Create: `images/aromatherapy.jpg`
- Create: `images/pregnancy-massage.jpg`
- Create: `images/retreat-exterior.jpg`
- Create: `images/alpine-spa-villa.jpg`
- Create: `images/alpine-renewal-room.jpg`
- Create: `images/campground.jpg`
- Create: `images/owners.jpg`

- [ ] **Step 1: Download all key images at full resolution**

```bash
cd /Users/samnewbold/Documents/vibrant-living/images

curl -o logo.jpg "https://static.wixstatic.com/media/794854_672030cb96664023b0ee728decfd10aa~mv2.jpg/v1/fill/w_3000,q_90/logo.jpg"

curl -o hero-hot-stones.jpg "https://static.wixstatic.com/media/0df3ba682314442487f5b9f3e8d7de14.jpg/v1/fill/w_3000,q_90/hero-hot-stones.jpg"

curl -o team.jpg "https://static.wixstatic.com/media/794854_b627dcb419b847b38d8f179c53dcf5c4~mv2.jpg/v1/fill/w_3000,q_90/team.jpg"

curl -o aromatherapy.jpg "https://static.wixstatic.com/media/794854_8eb8b034ac2545d098aa4955a23e71b1~mv2.jpg/v1/fill/w_3000,q_90/aromatherapy.jpg"

curl -o pregnancy-massage.jpg "https://static.wixstatic.com/media/607152bc37474437828fc852f3f251b9.jpg/v1/fill/w_3000,q_90/pregnancy-massage.jpg"

curl -o retreat-exterior.jpg "https://static.wixstatic.com/media/794854_b6396cd765ff44f39ce7d20a300714cc~mv2.jpg/v1/fill/w_3000,q_90/retreat-exterior.jpg"

curl -o alpine-spa-villa.jpg "https://static.wixstatic.com/media/794854_0f8dc943f9a04658882a572514744c9f~mv2.jpg/v1/fill/w_3000,q_90/alpine-spa-villa.jpg"

curl -o alpine-renewal-room.jpg "https://static.wixstatic.com/media/794854_ae10d1a404744efba5b712bb060f1547~mv2.jpg/v1/fill/w_3000,q_90/alpine-renewal-room.jpg"

curl -o campground.jpg "https://static.wixstatic.com/media/794854_cdb775f9345f4cc8b3903a048461ba65~mv2.jpg/v1/fill/w_3000,q_90/campground.jpg"

curl -o owners.jpg "https://static.wixstatic.com/media/794854_7da545e460c04596ac7fbec87061f6f6f000.jpg/v1/fill/w_3000,q_90/owners.jpg"
```

- [ ] **Step 2: Verify all images downloaded (should each be > 50KB)**

```bash
ls -lh /Users/samnewbold/Documents/vibrant-living/images/*.jpg
```

Expected: 10 files, each 100KB–3MB. Images are tracked in git intentionally (staging site asset delivery — no external CDN in use during development).

- [ ] **Step 3: Commit**

```bash
git add images/
git commit -m "assets: download Wix CDN images at full resolution"
```

---

### Task 3: Scrape missing page content from live Wix site

**Files:**
- Create: `docs/scraped/partners.md`
- Create: `docs/scraped/free-resources.md`
- Create: `docs/scraped/features.md`
- Create: `docs/scraped/friends-escape.md`
- Create: `docs/scraped/retreat-calendar.md`

- [ ] **Step 1: Create scraped docs directory**

```bash
mkdir -p /Users/samnewbold/Documents/vibrant-living/docs/scraped
```

- [ ] **Step 2: Fetch each missing page using the WebFetch tool and save content as markdown**

> **Important:** Wix pages are client-side rendered. `curl` will return a JS shell with no useful content. Use the **WebFetch tool** for each URL — it renders JavaScript and returns readable text.

For each URL, use WebFetch, then write the extracted content to the corresponding `.md` file using this template:

```markdown
# [Page title]

## Headline
[H1 or main heading from page]

## Body copy
[Main descriptive paragraphs]

## Listed items / services
- [item 1]
- [item 2]

## Pricing
[Any prices mentioned]

## Images
[Any image descriptions or alt text noted]
```

Pages to fetch and save:

| URL | Save to |
|-----|---------|
| https://www.vibrantliving.co.nz/partners | `docs/scraped/partners.md` |
| https://www.vibrantliving.co.nz/free-resources | `docs/scraped/free-resources.md` |
| https://www.vibrantliving.co.nz/features | `docs/scraped/features.md` |
| https://www.vibrantliving.co.nz/friends-escape | `docs/scraped/friends-escape.md` |
| https://www.vibrantliving.co.nz/retreat-calendar | `docs/scraped/retreat-calendar.md` |

- [ ] **Step 3: Verify all 5 markdown files exist and have content**

```bash
wc -l /Users/samnewbold/Documents/vibrant-living/docs/scraped/*.md
```

Expected: each file > 5 lines.

- [ ] **Step 4: Commit scraped content**

```bash
git add docs/scraped/
git commit -m "content: scrape missing pages from live Wix site"
```

---

## Chunk 2: CSS Foundation & Components

### Task 4: Write global CSS (styles.css)

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Write CSS custom properties, reset, and base typography**

```css
/* css/styles.css */

/* Web fonts — must be first rule in file */
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@300;400;600;700&display=swap');

/* =====================
   CUSTOM PROPERTIES
   ===================== */
:root {
  --green: #8BBF5A;
  --warm-grey: #8A8782;
  --bg-sage: #E3E0C0;
  --white: #FFFFFF;
  --near-black: #1A1A1A;
  --warm-cream: #F5EEE6;
  --muted-stone: #757575;
  --light-grey: #E8E6E6;

  --font-heading: 'Raleway', sans-serif;
  --font-body: 'Avenir LT W01 35 Light', 'Avenir', 'Century Gothic', sans-serif;

  --container-width: 1200px;
  --section-padding: 80px;
  --section-padding-mobile: 48px;
  --gutter: 24px;
  --card-gap: 32px;
}

/* =====================
   RESET
   ===================== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--warm-grey);
  background: var(--white);
}
img { max-width: 100%; height: auto; display: block; }
a { color: inherit; text-decoration: none; }
ul { list-style: none; }

/* =====================
   TYPOGRAPHY
   ===================== */
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  color: var(--near-black);
}
h1 {
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 300;
  letter-spacing: -0.5px;
  line-height: 1.15;
}
h2 {
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 600;
  letter-spacing: 4px;
  text-transform: uppercase;
  margin-bottom: 24px;
}
h3 {
  font-size: clamp(16px, 2vw, 20px);
  font-weight: 400;
  margin-bottom: 12px;
}
p { margin-bottom: 16px; }
p:last-child { margin-bottom: 0; }

.overline {
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--green);
  display: block;
  margin-bottom: 12px;
}

/* =====================
   LAYOUT UTILITIES
   ===================== */
.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: 0 var(--gutter);
}
.section {
  padding: var(--section-padding) 0;
}
.section--sage { background: var(--bg-sage); }
.section--cream { background: var(--warm-cream); }
.section--dark { background: var(--near-black); color: var(--white); }
.section--dark h2, .section--dark h3 { color: var(--white); }

.text-center { text-align: center; }
.text-center h2, .text-center p { margin-left: auto; margin-right: auto; }
.text-center p { max-width: 640px; }

/* =====================
   FIXED NAV COMPENSATION
   ===================== */
/* Nav is position:fixed — pages without a full-screen hero need top padding.
   Add class="has-hero" to <body> on the homepage only. */
body:not(.has-hero) { padding-top: 80px; }
@media (max-width: 768px) { body:not(.has-hero) { padding-top: 64px; } }
```

- [ ] **Step 2: Open index.html in browser and verify base font and colour variables are applied**

With dev server running at `http://localhost:8080`, open browser console and run:
```js
getComputedStyle(document.body).getPropertyValue('--green')
```
Expected: `" #8BBF5A"` (with leading space).

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "style: add CSS custom properties, reset, and typography"
```

---

### Task 5: Write component CSS (components.css)

**Files:**
- Modify: `css/components.css`

- [ ] **Step 1: Write button styles**

```css
/* css/components.css */

/* =====================
   BUTTONS
   ===================== */
.btn {
  display: inline-block;
  padding: 14px 32px;
  font-family: var(--font-body);
  font-size: 13px;
  letter-spacing: 2px;
  text-transform: uppercase;
  border-radius: 2px;
  border: 1.5px solid transparent;
  cursor: pointer;
  transition: opacity 0.2s ease, background 0.2s ease;
  white-space: nowrap;
}
.btn:hover { opacity: 0.85; }
.btn--primary { background: var(--green); color: var(--white); }
.btn--secondary { background: var(--muted-stone); color: var(--white); }
.btn--outline { background: transparent; border-color: var(--near-black); color: var(--near-black); }
.btn--outline-light { background: transparent; border-color: rgba(255,255,255,0.7); color: var(--white); }
```

- [ ] **Step 2: Write navigation styles**

```css
/* =====================
   NAVIGATION
   ===================== */
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 100;
  padding: 0 var(--gutter);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}
.nav--transparent { background: transparent; }
.nav--scrolled {
  background: var(--white);
  box-shadow: 0 2px 12px rgba(0,0,0,0.06);
}
.nav__inner {
  max-width: var(--container-width);
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid rgba(255,255,255,0.12);
  transition: border-color 0.3s ease, padding 0.3s ease;
}
.nav--scrolled .nav__inner {
  padding: 14px 0;
  border-bottom-color: transparent;
}
.nav__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--white);
  transition: color 0.3s ease;
}
.nav--scrolled .nav__logo { color: var(--near-black); }
.nav__logo-mark {
  width: 28px; height: 28px;
  background: var(--green);
  border-radius: 50%;
  flex-shrink: 0;
}
.nav__links {
  display: flex;
  align-items: center;
  gap: 28px;
}
.nav__link {
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.85);
  transition: color 0.3s ease;
  position: relative;
}
.nav--scrolled .nav__link { color: var(--warm-grey); }
.nav__link:hover { color: var(--green); }
.nav__cta { margin-left: 8px; }

/* Dropdown */
.nav__dropdown { position: relative; }
.nav__dropdown-menu {
  display: none;
  position: absolute;
  top: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: var(--white);
  min-width: 200px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
  border-radius: 2px;
  padding: 8px 0;
  z-index: 200;
}
.nav__dropdown:hover .nav__dropdown-menu { display: block; }
.nav__dropdown-menu a {
  display: block;
  padding: 10px 20px;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--warm-grey);
}
.nav__dropdown-menu a:hover { background: var(--warm-cream); color: var(--green); }

/* Hamburger (mobile) */
.nav__hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  flex-direction: column;
  gap: 5px;
  padding: 4px;
}
.nav__hamburger span {
  display: block;
  width: 24px; height: 2px;
  background: var(--white);
  transition: background 0.3s ease;
  border-radius: 2px;
}
.nav--scrolled .nav__hamburger span { background: var(--near-black); }

/* Mobile menu */
.nav__mobile-menu {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--near-black);
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
}
.nav__mobile-menu.is-open { display: flex; }
.nav__mobile-menu a {
  font-size: 16px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--white);
  font-family: var(--font-heading);
  font-weight: 300;
}
.nav__mobile-menu a:hover { color: var(--green); }
.nav__mobile-close {
  position: absolute;
  top: 24px; right: 24px;
  background: none;
  border: none;
  color: var(--white);
  font-size: 32px;
  cursor: pointer;
  line-height: 1;
}
```

- [ ] **Step 3: Write hero styles**

```css
/* =====================
   HERO — CINEMATIC VIDEO
   ===================== */
.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero__video {
  position: absolute;
  inset: 0;
  width: 100%; height: 100%;
  object-fit: cover;
  z-index: 0;
}
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.55));
  z-index: 1;
}
.hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
  max-width: 720px;
  padding: 0 var(--gutter);
  color: var(--white);
}
.hero__content h1 { color: var(--white); margin-bottom: 24px; }
.hero__actions { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.hero__scroll {
  position: absolute;
  bottom: 28px; left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
}

/* Hero banner (used on non-home pages — 50vh, image bg) */
.hero-banner {
  position: relative;
  height: 50vh;
  min-height: 320px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
}
.hero-banner__bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}
.hero-banner__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(transparent 30%, rgba(0,0,0,0.6));
  z-index: 1;
}
.hero-banner__content {
  position: relative;
  z-index: 2;
  padding: 40px var(--gutter);
  max-width: var(--container-width);
  margin: 0 auto;
  width: 100%;
  color: var(--white);
}
.hero-banner__content h1 { color: var(--white); font-size: clamp(24px, 4vw, 42px); }
```

- [ ] **Step 4: Write section component styles (S1–S5)**

```css
/* =====================
   S1 — TEXT + IMAGE
   ===================== */
.s-text-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: center;
}
.s-text-image--reversed { direction: rtl; }
.s-text-image--reversed > * { direction: ltr; }
.s-text-image__text { display: flex; flex-direction: column; gap: 16px; }
.s-text-image__image { border-radius: 4px; overflow: hidden; }
.s-text-image__image img { width: 100%; height: 100%; object-fit: cover; }

/* =====================
   S2 — CARD GRID
   ===================== */
.s-cards { }
.s-cards__header { text-align: center; margin-bottom: 48px; }
.card-grid {
  display: grid;
  gap: var(--card-gap);
}
.card-grid--2 { grid-template-columns: repeat(2, 1fr); }
.card-grid--3 { grid-template-columns: repeat(3, 1fr); }
.card-grid--4 { grid-template-columns: repeat(4, 1fr); }
.card {
  background: var(--white);
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  overflow: hidden;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
}
.card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.08); transform: translateY(-2px); }
.card__image { aspect-ratio: 4/3; overflow: hidden; }
.card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
.card:hover .card__image img { transform: scale(1.03); }
.card__body { padding: 24px; }
.card__body h3 { margin-bottom: 8px; }
.card__body p { font-size: 15px; margin-bottom: 16px; }
.card__link {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--green);
  font-family: var(--font-body);
  font-weight: 600;
}
.card__link::after { content: ' →'; }

/* =====================
   S3 — FEATURE STRIP
   ===================== */
.s-features { }
.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  text-align: center;
}
.feature-item { }
.feature-item__icon {
  width: 48px; height: 48px;
  background: var(--green);
  border-radius: 50%;
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 20px;
}
.feature-item h3 { font-size: 15px; margin-bottom: 8px; }

/* =====================
   S4 — CTA BANNER
   ===================== */
.s-cta-banner {
  text-align: center;
  padding: var(--section-padding) var(--gutter);
}
.s-cta-banner h2 { color: var(--white); margin-bottom: 12px; }
.s-cta-banner p { color: rgba(255,255,255,0.75); max-width: 560px; margin: 0 auto 32px; }

/* =====================
   S5 — PRICING TABLE
   ===================== */
.pricing-grid {
  display: grid;
  gap: 24px;
}
.pricing-grid--2 { grid-template-columns: repeat(2, 1fr); }
.pricing-grid--3 { grid-template-columns: repeat(3, 1fr); }
.pricing-card {
  border: 1px solid var(--light-grey);
  border-radius: 4px;
  padding: 32px;
  text-align: center;
}
.pricing-card--featured { border-color: var(--green); border-width: 2px; }
.pricing-card__badge {
  display: inline-block;
  background: var(--green);
  color: var(--white);
  font-size: 10px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
}
.pricing-card__price {
  font-size: 36px;
  font-weight: 700;
  color: var(--green);
  font-family: var(--font-heading);
  line-height: 1;
}
.pricing-card__period {
  font-size: 13px;
  color: var(--warm-grey);
  margin-bottom: 20px;
}
.pricing-card__features {
  text-align: left;
  margin-bottom: 28px;
}
.pricing-card__features li {
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid var(--light-grey);
  color: var(--warm-grey);
}
.pricing-card__features li::before { content: '✓  '; color: var(--green); }

/* =====================
   FOOTER
   ===================== */
.footer {
  background: var(--near-black);
  color: rgba(255,255,255,0.75);
  padding: 64px var(--gutter) 32px;
}
.footer__inner {
  max-width: var(--container-width);
  margin: 0 auto;
}
.footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 48px;
}
.footer__brand { }
.footer__logo {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  color: var(--white);
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 3px;
  text-transform: uppercase;
}
.footer__logo-mark {
  width: 24px; height: 24px;
  background: var(--green);
  border-radius: 50%;
  flex-shrink: 0;
}
.footer__tagline { font-size: 13px; margin-bottom: 12px; }
.footer__address { font-size: 12px; line-height: 1.8; }
.footer__col h4 {
  font-family: var(--font-body);
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 16px;
}
.footer__col ul { display: flex; flex-direction: column; gap: 10px; }
.footer__col a { font-size: 13px; }
.footer__col a:hover { color: var(--white); }
.footer__bottom {
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
.footer__copy { font-size: 12px; }
.footer__social { display: flex; gap: 12px; }
.footer__social a {
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}
.footer__social a:hover { border-color: var(--green); color: var(--green); }

/* =====================
   RESPONSIVE — SHARED
   ===================== */
@media (max-width: 768px) {
  :root {
    --section-padding: var(--section-padding-mobile);
  }
  .nav__links { display: none; }
  .nav__hamburger { display: flex; }
  .s-text-image { grid-template-columns: 1fr; gap: 32px; }
  .s-text-image--reversed { direction: ltr; }
  .card-grid--3, .card-grid--4 { grid-template-columns: repeat(2, 1fr); }
  .feature-grid { grid-template-columns: repeat(2, 1fr); }
  .footer__grid { grid-template-columns: 1fr 1fr; }
  .pricing-grid--3 { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  .card-grid--2, .card-grid--3, .card-grid--4 { grid-template-columns: 1fr; }
  .feature-grid { grid-template-columns: 1fr 1fr; }
  .footer__grid { grid-template-columns: 1fr; }
  .pricing-grid--2 { grid-template-columns: 1fr; }
  .hero__actions { flex-direction: column; align-items: center; }
}
```

- [ ] **Step 5: Verify components.css has no syntax errors**

Open browser devtools on `http://localhost:8080` → Console. Expected: no CSS parse errors.

- [ ] **Step 6: Commit**

```bash
git add css/components.css
git commit -m "style: add full component CSS (nav, hero, S1-S5, footer, responsive)"
```

---

### Task 6: Write JS (partials.js + main.js)

**Files:**
- Modify: `js/partials.js`
- Modify: `js/main.js`

- [ ] **Step 1: Write partials.js — nav and footer as injectable HTML**

```js
// js/partials.js
// Injects shared nav and footer into every page.
// Works with file:// protocol (no fetch needed).

(function () {
  const NAV_HTML = `
<nav class="nav nav--transparent" id="main-nav">
  <div class="nav__inner container">
    <a href="/index.html" class="nav__logo">
      <div class="nav__logo-mark"></div>
      <span>VIBRANT LIVING</span>
    </a>
    <div class="nav__links">
      <a href="/accommodation.html" class="nav__link">Accommodation</a>
      <a href="/day-spa.html" class="nav__link">Day Spa</a>
      <a href="/retreats.html" class="nav__link">Retreats</a>
      <a href="/packages.html" class="nav__link">Packages</a>
      <a href="/specials.html" class="nav__link">Specials</a>
      <div class="nav__dropdown">
        <a href="#" class="nav__link">More ▾</a>
        <div class="nav__dropdown-menu">
          <a href="/yoga-hanmer-springs.html">Yoga</a>
          <a href="/fat-bikes.html">Fat Bikes</a>
          <a href="/venue-hire.html">Venue Hire</a>
          <a href="/partners.html">Partners</a>
          <a href="/free-resources.html">Free Resources</a>
          <a href="/gift-vouchers.html">Gift Vouchers</a>
        </div>
      </div>
      <a href="/book-online.html" class="nav__link nav__cta btn btn--primary">Book Now</a>
    </div>
    <button class="nav__hamburger" id="hamburger" aria-label="Open menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav__mobile-menu" id="mobile-menu">
  <button class="nav__mobile-close" id="mobile-close">✕</button>
  <a href="/accommodation.html">Accommodation</a>
  <a href="/day-spa.html">Day Spa</a>
  <a href="/retreats.html">Retreats</a>
  <a href="/packages.html">Packages</a>
  <a href="/specials.html">Specials</a>
  <a href="/yoga-hanmer-springs.html">Yoga</a>
  <a href="/fat-bikes.html">Fat Bikes</a>
  <a href="/venue-hire.html">Venue Hire</a>
  <a href="/partners.html">Partners</a>
  <a href="/free-resources.html">Free Resources</a>
  <a href="/gift-vouchers.html">Gift Vouchers</a>
  <a href="/book-online.html" style="color: var(--green);">Book Now</a>
</div>`;

  const FOOTER_HTML = `
<footer class="footer">
  <div class="footer__inner">
    <div class="footer__grid">
      <div class="footer__brand">
        <div class="footer__logo">
          <div class="footer__logo-mark"></div>
          <span>VIBRANT LIVING</span>
        </div>
        <p class="footer__tagline">Your escape in Hanmer Springs</p>
        <address class="footer__address">
          88 Rippingale Road<br>
          Hanmer Springs 7334<br>
          New Zealand<br><br>
          <a href="tel:+6433157429">+64 3 315 7429</a><br>
          <a href="mailto:info@vibrantliving.co.nz">info@vibrantliving.co.nz</a><br>
          Mon–Sun, 9:00am–8:00pm
        </address>
      </div>
      <div class="footer__col">
        <h4>Stay</h4>
        <ul>
          <li><a href="/lodge-suite.html">Lodge Suite</a></li>
          <li><a href="/alpine-spa-villa.html">Alpine Spa Villa</a></li>
          <li><a href="/three-bedroom-villa.html">Three Bedroom Villa</a></li>
          <li><a href="/campground.html">Campground</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Spa &amp; Retreats</h4>
        <ul>
          <li><a href="/massages.html">Massages</a></li>
          <li><a href="/beauty.html">Holistic Beauty</a></li>
          <li><a href="/healing.html">Healing</a></li>
          <li><a href="/retreats.html">Wellness Retreats</a></li>
          <li><a href="/packages.html">Packages</a></li>
        </ul>
      </div>
      <div class="footer__col">
        <h4>Contact</h4>
        <ul>
          <li><a href="/contact.html">Contact Us</a></li>
          <li><a href="/about-us.html">About Us</a></li>
          <li><a href="/gift-vouchers.html">Gift Vouchers</a></li>
          <li><a href="/book-online.html">Book Online</a></li>
        </ul>
      </div>
    </div>
    <div class="footer__bottom">
      <p class="footer__copy">© ${new Date().getFullYear()} Vibrant Living Retreat and Day Spa. All rights reserved.</p>
      <div class="footer__social">
        <a href="https://facebook.com" aria-label="Facebook">f</a>
        <a href="https://instagram.com" aria-label="Instagram">&#9670;</a>
      </div>
    </div>
  </div>
</footer>`;

  // Inject nav
  const navEl = document.getElementById('nav-placeholder');
  if (navEl) navEl.outerHTML = NAV_HTML;

  // Inject footer
  const footerEl = document.getElementById('footer-placeholder');
  if (footerEl) footerEl.outerHTML = FOOTER_HTML;
})();
```

- [ ] **Step 2: Write main.js — nav scroll behaviour + hamburger**

```js
// js/main.js

document.addEventListener('DOMContentLoaded', function () {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-close');

  // Nav scroll behaviour
  function updateNav() {
    if (!nav) return;
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }

  // On non-home pages the nav should start scrolled (no video behind it)
  if (!document.querySelector('.hero')) {
    if (nav) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // Hamburger
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      mobileMenu.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    });
  }
  if (mobileClose && mobileMenu) {
    mobileClose.addEventListener('click', function () {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    });
  }
});
```

- [ ] **Step 3: Update index.html to use partials and verify nav injects**

Reload `http://localhost:8080`. Expected: nav appears at top of page, transparent background.

Open browser console → Elements panel. Expected: `<nav class="nav nav--transparent" id="main-nav">` is present in the DOM.

- [ ] **Step 4: Scroll down the test page and verify nav transitions to scrolled state**

Scroll past 80px. Expected: nav background becomes white.

- [ ] **Step 5: Resize browser to <768px and verify hamburger appears**

Expected: nav links hidden, hamburger icon visible. Click hamburger → full-screen mobile menu opens.

- [ ] **Step 6: Commit**

```bash
git add js/partials.js js/main.js
git commit -m "feat: add nav/footer partials and scroll/mobile nav behaviour"
```

---

## Chunk 3: Homepage & Hub Pages

### Task 7: Build Homepage (T1)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write the full homepage HTML**

Replace `index.html` contents:

```html
<!DOCTYPE html>
<html lang="en-NZ">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vibrant Living Retreat & Day Spa — Your Escape in Hanmer Springs</title>
  <meta name="description" content="Heart-centred wellness retreat and day spa across two acres of tranquil gardens in Hanmer Springs, New Zealand. Accommodation, massages, healing, yoga and wellness retreats.">
  <meta property="og:title" content="Vibrant Living Retreat & Day Spa">
  <meta property="og:description" content="Your escape in Hanmer Springs, New Zealand.">
  <meta property="og:image" content="images/retreat-exterior.jpg">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body class="has-hero">
  <!-- class="has-hero" disables the fixed-nav padding-top compensation in styles.css
       since the full-screen video hero intentionally sits behind the transparent nav -->

  <div id="nav-placeholder"></div>

  <main>

    <!-- HERO: Cinematic video -->
    <section class="hero">
      <video class="hero__video" autoplay muted loop playsinline poster="images/retreat-exterior.jpg">
        <source src="https://video.wixstatic.com/video/794854_7da545e460c04596ac7fbec87061f6f6/1080p/mp4/file.mp4" type="video/mp4">
      </video>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <span class="overline" style="color:rgba(255,255,255,0.7)">Your escape in Hanmer Springs</span>
        <h1>Vibrant Living<br>Retreat &amp; Day Spa</h1>
        <div class="hero__actions">
          <a href="book-online.html" class="btn btn--primary">Book Your Escape</a>
          <a href="accommodation.html" class="btn btn--outline-light">Explore</a>
        </div>
      </div>
      <div class="hero__scroll">↓ scroll</div>
    </section>

    <!-- S3: Feature Strip — Four pillars -->
    <section class="section section--sage">
      <div class="container">
        <div class="text-center" style="margin-bottom:48px;">
          <span class="overline">Heart-centred wellness</span>
          <h2>Your sanctuary awaits</h2>
          <p>Two acres of tranquil gardens in Hanmer Springs. Chemical-free, plant-based, deeply personal.</p>
        </div>
        <div class="feature-grid">
          <div class="feature-item">
            <!-- Emoji icons used throughout feature strips — intentional for staging.
               Renders acceptably across macOS/iOS/Windows. Replace with SVG icons before Webflow handoff. -->
          <div class="feature-item__icon">🏡</div>
            <h3>Accommodation</h3>
            <p>Lodge suite, alpine villa, family villa, and campground — all with mountain views.</p>
            <a href="accommodation.html" class="card__link" style="margin-top:8px;display:inline-block;">Explore stays</a>
          </div>
          <div class="feature-item">
            <div class="feature-item__icon">✦</div>
            <h3>Day Spa</h3>
            <p>Therapeutic massages, holistic facials, healing sessions, and signature rituals.</p>
            <a href="day-spa.html" class="card__link" style="margin-top:8px;display:inline-block;">View treatments</a>
          </div>
          <div class="feature-item">
            <div class="feature-item__icon">🌿</div>
            <h3>Wellness Retreats</h3>
            <p>2 to 13-night immersive retreats with yoga, organic meals, and guided healing.</p>
            <a href="retreats.html" class="card__link" style="margin-top:8px;display:inline-block;">View retreats</a>
          </div>
          <div class="feature-item">
            <div class="feature-item__icon">🌱</div>
            <h3>Eco &amp; Organic</h3>
            <p>Chemical-free cleaning, composting, own chickens, local organic produce.</p>
            <a href="about-us.html" class="card__link" style="margin-top:8px;display:inline-block;">Our values</a>
          </div>
        </div>
      </div>
    </section>

    <!-- S2: Card Grid — Accommodation preview -->
    <section class="section">
      <div class="container">
        <div class="s-cards__header">
          <span class="overline">Stay with us</span>
          <h2>Accommodation</h2>
          <p>Choose your perfect retreat base — from intimate lodge suites to self-contained family villas.</p>
        </div>
        <div class="card-grid card-grid--4">
          <div class="card">
            <div class="card__image"><img src="images/team.jpg" alt="Lodge Suite interior with mountain views"></div>
            <div class="card__body">
              <span class="overline">From NZ$280/night</span>
              <h3>Lodge Suite</h3>
              <p>Private ensuite, infrared sauna, mountain views. In the main lodge.</p>
              <a href="lodge-suite.html" class="card__link">View suite</a>
            </div>
          </div>
          <div class="card">
            <div class="card__image"><img src="images/alpine-spa-villa.jpg" alt="Alpine Spa Villa exterior with hot tub"></div>
            <div class="card__body">
              <span class="overline">From NZ$280/night</span>
              <h3>Alpine Spa Villa</h3>
              <p>Standalone luxury villa, private outdoor hot tub, open-plan kitchen/lounge.</p>
              <a href="alpine-spa-villa.html" class="card__link">View villa</a>
            </div>
          </div>
          <div class="card">
            <div class="card__image"><img src="images/retreat-exterior.jpg" alt="Three bedroom villa exterior"></div>
            <div class="card__body">
              <span class="overline">Sleeps 2–8</span>
              <h3>Three Bedroom Villa</h3>
              <p>Fully self-contained. Large deck, BBQ, mountain views. Perfect for families.</p>
              <a href="three-bedroom-villa.html" class="card__link">View villa</a>
            </div>
          </div>
          <div class="card">
            <div class="card__image"><img src="images/campground.jpg" alt="Campground with garden setting"></div>
            <div class="card__body">
              <span class="overline">From NZ$30/night</span>
              <h3>Campground</h3>
              <p>Tent and campervan sites on the 2-acre property. Pet friendly.</p>
              <a href="campground.html" class="card__link">View campground</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- S1: Text + Image — Day Spa intro -->
    <section class="section section--cream">
      <div class="container">
        <div class="s-text-image">
          <div class="s-text-image__text">
            <span class="overline">Day Spa</span>
            <h2>Restore & rejuvenate</h2>
            <p>Our day spa offers a sanctuary of calm — therapeutic massages, organic facials, energy healing, and signature rituals crafted to nourish body, mind, and spirit.</p>
            <p>Led by Adela — physiotherapist, massage therapist, yoga teacher, and retreat facilitator — every treatment is deeply personal and clinically informed.</p>
            <a href="day-spa.html" class="btn btn--primary" style="margin-top:8px;">Explore the spa</a>
          </div>
          <div class="s-text-image__image" style="height:420px;">
            <img src="images/aromatherapy.jpg" alt="Aromatherapy and hot stone massage at Vibrant Living Day Spa" style="height:100%;">
          </div>
        </div>
      </div>
    </section>

    <!-- S2: Card Grid — Retreats preview -->
    <section class="section">
      <div class="container">
        <div class="s-cards__header">
          <span class="overline">Immersive experiences</span>
          <h2>Wellness Retreats</h2>
          <p>Flexible 2–13 night retreats facilitated by Adela. Yoga, organic meals, healing sessions, and guided transformation in the heart of Hanmer Springs.</p>
        </div>
        <div class="card-grid card-grid--3">
          <div class="card">
            <div class="card__image"><img src="images/retreat-exterior.jpg" alt="Vibrant Living retreat grounds"></div>
            <div class="card__body">
              <span class="overline">Group &amp; Private</span>
              <h3>Wellness Retreats</h3>
              <p>2 to 13 nights. Yoga, meditation, organic meals, healing, and guided rest.</p>
              <a href="retreats.html" class="card__link">View retreats</a>
            </div>
          </div>
          <div class="card">
            <div class="card__image"><img src="images/alpine-renewal-room.jpg" alt="Alpine Renewal Ritual private suite"></div>
            <div class="card__body">
              <span class="overline">From NZ$699</span>
              <h3>Alpine Renewal Ritual</h3>
              <p>A 4–5 hour signature journey: exfoliation, infrared sauna, chocolate pralines, and deep relaxation.</p>
              <a href="alpinerenewalritual.html" class="card__link">View ritual</a>
            </div>
          </div>
          <div class="card">
            <div class="card__image"><img src="images/owners.jpg" alt="Vibrant Living owners Adela and partner"></div>
            <div class="card__body">
              <span class="overline">Bespoke</span>
              <h3>Private Retreats</h3>
              <p>A fully tailored retreat just for you — designed around your wellbeing goals.</p>
              <a href="private-retreats.html" class="card__link">View private retreats</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Specials Banner -->
    <section class="section section--sage">
      <div class="container text-center">
        <span class="overline">March – May 2026</span>
        <h2>Current specials</h2>
        <div class="card-grid card-grid--2" style="max-width:800px;margin:0 auto;">
          <div class="card" style="text-align:center;padding:32px;">
            <h3>Midweek Massage Special</h3>
            <p>60-minute massage for <strong style="color:var(--green);">NZ$135</strong> (regular NZ$169). Monday–Thursday only.</p>
            <a href="book-online.html" class="btn btn--primary" style="margin-top:16px;">Book now</a>
          </div>
          <div class="card" style="text-align:center;padding:32px;">
            <h3>Book 3 Nights, Get a Free Massage</h3>
            <p>Stay 3 or more nights and receive a complimentary massage. Direct bookings only.</p>
            <a href="book-online.html" class="btn btn--primary" style="margin-top:16px;">Book now</a>
          </div>
        </div>
        <a href="specials.html" class="btn btn--outline" style="margin-top:32px;">View all specials</a>
      </div>
    </section>

    <!-- S4: CTA Banner -->
    <section class="section section--dark">
      <div class="container s-cta-banner">
        <span class="overline" style="color:var(--green);">Ready to escape?</span>
        <h2>Begin your journey to vibrant wellbeing</h2>
        <p>Book your stay, spa treatment, or wellness retreat in Hanmer Springs today.</p>
        <a href="book-online.html" class="btn btn--primary">Book your escape</a>
      </div>
    </section>

  </main>

  <div id="footer-placeholder"></div>
  <script src="js/partials.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open http://localhost:8080 and verify homepage**

Checklist:
- [ ] Video hero loads and plays (or shows fallback image)
- [ ] Nav is transparent over video, transitions to white on scroll
- [ ] All 4 feature strip items visible
- [ ] Accommodation card grid shows 4 cards with images
- [ ] Day Spa text+image section renders correctly
- [ ] Retreats card grid shows 3 cards
- [ ] Specials section visible
- [ ] CTA banner visible
- [ ] Footer present with all columns

- [ ] **Step 3: Check mobile layout at 375px width**

Resize browser to 375px. Verify:
- [ ] Hamburger icon visible, desktop nav links hidden
- [ ] Card grids stack to 1 column
- [ ] Feature strip is 2-column
- [ ] Text+Image section stacks vertically
- [ ] Hero text readable, CTAs stacked

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "feat: build homepage (T1) — video hero, feature strip, card grids, CTA"
```

---

### Task 8: Build Hub Pages (T2) — 5 pages

**Files:**
- Create: `accommodation.html`
- Create: `day-spa.html`
- Create: `retreats.html`
- Create: `packages.html`
- Create: `specials.html`

T2 template structure:
```html
<!DOCTYPE html>
<html lang="en-NZ">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] — Vibrant Living Retreat & Day Spa</title>
  <meta name="description" content="[Description]">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <div id="nav-placeholder"></div>
  <main>
    <!-- Hero Banner -->
    <section class="hero-banner">
      <div class="hero-banner__bg" style="background-image:url('images/[image].jpg');"></div>
      <div class="hero-banner__overlay"></div>
      <div class="hero-banner__content container">
        <span class="overline">[overline]</span>
        <h1>[Headline]</h1>
      </div>
    </section>
    <!-- Intro -->
    <section class="section text-center">
      <div class="container">
        <h2>[Section heading]</h2>
        <p>[Intro copy]</p>
      </div>
    </section>
    <!-- Card Grid of sub-pages -->
    <section class="section section--cream">
      <div class="container">
        <div class="card-grid card-grid--[2|3|4]">
          <!-- cards -->
        </div>
      </div>
    </section>
    <!-- CTA Banner -->
    <section class="section section--dark">
      <div class="container s-cta-banner">
        <h2>[CTA headline]</h2>
        <p>[CTA subtext]</p>
        <a href="book-online.html" class="btn btn--primary">Book Now</a>
      </div>
    </section>
  </main>
  <div id="footer-placeholder"></div>
  <script src="js/partials.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 1: Build accommodation.html**

Use T2 template. Hero image: `images/alpine-spa-villa.jpg`. Cards: Lodge Suite, Alpine Spa Villa, Three Bedroom Villa, Campground (4 cards, `card-grid--4`). Intro copy: "Choose from four unique accommodation styles — each with mountain views, personalised hospitality, and access to Vibrant Living's two-acre organic gardens."

- [ ] **Step 2: Build day-spa.html**

Hero image: `images/aromatherapy.jpg`. Cards: Massages, Holistic Beauty, Healing & Transformation, Pampering Packages, Alpine Renewal Ritual (5 cards, `card-grid--3` with last 2 in second row). Intro: "A sanctuary of calm in Hanmer Springs. From therapeutic massage to energy healing, every treatment is crafted to restore your body, mind, and spirit."

- [ ] **Step 3: Build retreats.html**

Hero image: `images/retreat-exterior.jpg`. Cards: Wellness Retreats, Private Retreats, Heart Connecting Retreat, QH Retreat, Retreat Calendar (5 cards, `card-grid--3`). Intro: "Immersive 2–13 night wellness retreats facilitated by Adela. Yoga, organic meals, healing, and transformation — in the heart of Hanmer Springs."

- [ ] **Step 4: Build packages.html**

Hero image: `images/alpine-renewal-room.jpg`. Cards: Spa Escape Packages, Family Escape, Friends Escape, Stay and Spa Packages (4 cards, `card-grid--4`). Intro: "Curated packages combining accommodation and spa — the most nourishing way to experience Vibrant Living."

- [ ] **Step 5: Build specials.html**

Hero image: `images/hero-hot-stones.jpg`. Card grid with current specials (Midweek Massage, 3 Nights + Free Massage). Intro: "Take advantage of our current offers and seasonal specials — available for a limited time."

- [ ] **Step 6: Verify accommodation.html** — open `http://localhost:8080/accommodation.html`. Confirm: hero banner visible, nav starts white (no transparency — body lacks `has-hero` class), intro section centred, 4-column card grid, CTA banner, footer.

- [ ] **Step 7: Verify day-spa.html** — same checks. Card grid is 3-column with 5 cards (wraps automatically — no special markup needed for second row).

- [ ] **Step 8: Verify retreats.html** — hero image is retreat exterior, 5 cards in 3-column grid.

- [ ] **Step 9: Verify packages.html** — 4 cards in 4-column grid.

- [ ] **Step 10: Verify specials.html** — current specials displayed as cards.

- [ ] **Step 11: Commit**

```bash
git add accommodation.html day-spa.html retreats.html packages.html specials.html
git commit -m "feat: build hub pages (T2) — accommodation, day-spa, retreats, packages, specials"
```

---

## Chunk 4: Accommodation & Day Spa Detail Pages (T3)

### Task 9: Build Accommodation Detail Pages (T3)

**Files:**
- Create: `lodge-suite.html`
- Create: `alpine-spa-villa.html`
- Create: `three-bedroom-villa.html`
- Create: `campground.html`

T3 template structure:
```html
<!-- Full T3 template — see notes below -->
<!DOCTYPE html>
<html lang="en-NZ">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Page Title] — Vibrant Living Retreat & Day Spa</title>
  <meta name="description" content="[Description]">
  <meta property="og:title" content="[Page Title] — Vibrant Living Retreat & Day Spa">
  <meta property="og:description" content="[Description]">
  <meta property="og:image" content="images/[hero-image].jpg">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
  <div id="nav-placeholder"></div>
  <main>
    <!-- Hero banner -->
    <section class="hero-banner">
      <div class="hero-banner__bg" style="background-image:url('images/[image].jpg');"></div>
      <div class="hero-banner__overlay"></div>
      <div class="hero-banner__content container">
        <span class="overline">[category]</span>
        <h1>[Name]</h1>
      </div>
    </section>
    <!-- Intro -->
    <section class="section">
      <div class="container text-center">
        <span class="overline">[overline]</span>
        <h2>[Heading]</h2>
        <p style="max-width:680px;margin:0 auto;">[Intro paragraph]</p>
      </div>
    </section>
    <!-- Text + Image blocks (2-3 alternating) -->
    <section class="section section--cream">
      <div class="container">
        <div class="s-text-image">
          <div class="s-text-image__text">
            <span class="overline">[label]</span>
            <h2>[Feature heading]</h2>
            <p>[Feature copy]</p>
            <ul style="margin-top:12px;display:flex;flex-direction:column;gap:8px;">
              <li style="font-size:14px;color:var(--warm-grey);">✓ [Feature 1]</li>
              <li style="font-size:14px;color:var(--warm-grey);">✓ [Feature 2]</li>
            </ul>
          </div>
          <div class="s-text-image__image" style="height:400px;">
            <img src="images/[image].jpg" alt="[alt text]" style="height:100%;">
          </div>
        </div>
      </div>
    </section>
    <!-- Pricing Table (S5) -->
    <section class="section">
      <div class="container">
        <div class="text-center" style="margin-bottom:40px;">
          <span class="overline">Pricing</span>
          <h2>Rates & inclusions</h2>
        </div>
        <div class="pricing-grid pricing-grid--[2|3]" style="max-width:800px;margin:0 auto;">
          <!-- pricing cards -->
        </div>
      </div>
    </section>
    <!-- Related services (3-card row linking to sibling pages) -->
    <section class="section section--sage">
      <div class="container">
        <div class="s-cards__header">
          <span class="overline">You might also enjoy</span>
          <h2>Related experiences</h2>
        </div>
        <div class="card-grid card-grid--3">
          <!-- 3 related service/accommodation cards — choose contextually relevant pages -->
        </div>
      </div>
    </section>
    <!-- CTA -->
    <section class="section section--dark">
      <div class="container s-cta-banner">
        <h2>Ready to book?</h2>
        <p>[Tailored CTA copy]</p>
        <a href="book-online.html" class="btn btn--primary">Book now</a>
      </div>
    </section>
  </main>
  <div id="footer-placeholder"></div>
  <script src="js/partials.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 1: Build lodge-suite.html**

Use T3 template. Overline: "Accommodation". H1: "Lodge Suite B&B". Hero image: `images/team.jpg`.

Features block: Super-king/twin bed, private ensuite, private infrared sauna, mountain views, air conditioning, underfloor heating, satellite TV/DVD, tea/coffee facilities, access to guest lounge and feng shui courtyard.

Pricing (2 cards): NZ$280/night (room only) | NZ$360/night (B&B for 2 adults — includes organic breakfast).

CTA copy: "Experience warm, personal hospitality in the heart of Hanmer Springs."

- [ ] **Step 2: Build alpine-spa-villa.html**

H1: "Alpine Spa Villa". Hero image: `images/alpine-spa-villa.jpg`.

Features: Standalone luxury villa, private outdoor hot tub, patio, super-king bedroom, open-plan kitchen/lounge, spacious bathroom with mountain views, heat pump/AC, Wi-Fi. "Perfect for couples or solo travellers seeking total privacy."

Pricing (3 cards): NZ$280/night (room only) | NZ$360/night (B&B) | From NZ$549 (Spa Escape Package).

- [ ] **Step 3: Build three-bedroom-villa.html**

H1: "Three Bedroom Villa". Hero image: `images/retreat-exterior.jpg`.

Features: 2 queen bedrooms + 1 twin room, large lounge, fully equipped kitchen, laundry, 1 bathroom with deep bath + shower, large deck with BBQ, heat pump, mountain views, children's games/toys/DVDs.

Pricing (3 cards): NZ$300pp/24hrs (shared twin room, 2 people minimum) | NZ$395/24hrs (private queen room) | Contact for self-catering holiday let pricing.

- [ ] **Step 4: Build campground.html**

H1: "Campground". Hero image: `images/campground.jpg`.

Features: Tent and campervan sites, hot shower, washing machine/dryer, shared feng shui courtyard, organic breakfast add-on available, pet friendly.

Pricing (2 cards): NZ$30/night (1 person) | NZ$45/night (2 people). Highlight special: "Book a 90-min massage and receive 1 complimentary night (solo)."

- [ ] **Step 5: Open each page and verify**

For each page:
- [ ] Hero banner visible with correct image
- [ ] Intro section renders
- [ ] Text+Image block with feature list renders correctly
- [ ] Pricing table renders (correct number of cards, prices accurate)
- [ ] CTA banner visible

- [ ] **Step 6: Commit**

```bash
git add lodge-suite.html alpine-spa-villa.html three-bedroom-villa.html campground.html
git commit -m "feat: build accommodation detail pages (T3) — lodge suite, villa, three-bed, campground"
```

---

### Task 10: Build Day Spa Detail Pages (T3)

**Files:**
- Create: `massages.html`
- Create: `beauty.html`
- Create: `healing.html`
- Create: `pampering-packages.html`
- Create: `alpinerenewalritual.html`

- [ ] **Step 1: Build massages.html**

H1: "Massages". Hero image: `images/hero-hot-stones.jpg`. Overline: "Day Spa".

Text+Image intro: "Holistic massage therapy tailored to your body's needs. From deeply restorative relaxation to targeted therapeutic work — all treatments use premium organic products and are delivered with genuine care."

Services list (use a 2-column feature grid within the T3 body):
- Holistic Relaxation Massage
- Therapeutical Massage
- Deep Tissue Massage
- Hot Stone Massage
- Reflexology
- Pregnancy Massage
- Indian Head Massage
- Lymphatic Drainage Massage

All available 60 min to 3 hours, Individual or Couples.

Pricing (2 cards): NZ$169 / 60 min (regular) | NZ$135 / 60 min (midweek Mon–Thu special).

- [ ] **Step 2: Build beauty.html**

H1: "Holistic Beauty". Hero image: `images/aromatherapy.jpg`.

Treatments: Holistic Hydrating Facial, Vitality Facial with Eye Treatment, Beauty Tofu Facial Ritual, Detox and Glow Body Wraps, Back & Shoulder Massage & Facial, Organic Sugar Glow full-body exfoliation.

Pricing (1 card): Contact us for current beauty treatment pricing — `info@vibrantliving.co.nz` or +64 3 315 7429.

- [ ] **Step 3: Build healing.html**

H1: "Healing & Transformation". Hero image: `images/team.jpg`.

Copy: "Energy work addressing energetic, emotional, and mental wellbeing. Facilitated by Adela — trained in Reiki, counselling, and sacred ceremony."

Modalities: Reiki Healing, Counselling/coaching sessions, Singing bowl meditation, Cacao ceremonies.

Pricing (1 card): NZ$155 / 60 min healing session.

- [ ] **Step 4: Build pampering-packages.html**

H1: "Pampering Packages". Hero image: `images/alpine-renewal-room.jpg`.

Packages (use card grid within body):
- Massage & Facials (90 min)
- Massage & Body Exfoliation
- Body Exfoliation & Massage & Facial (3 hrs)
- Spa Bath & Massage

Pricing table (S5) — 2 rows:
- Pampering Packages (90 min–3 hrs): Contact us for current pricing — `info@vibrantliving.co.nz`
- Devine Bliss Half-Day (4 hrs): NZ$549 individual / NZ$999 couple. Enhancement: +NZ$155 for 60-min healing session. Slots: 9:30am or 1:30pm.

- [ ] **Step 5: Build alpinerenewalritual.html**

H1: "Alpine Renewal Ritual". Hero image: `images/alpine-renewal-room.jpg`.

Journey description: "A 4–5 hour signature wellness journey. Welcome drink → private treatment suite (robes & slippers) → full-body sugar exfoliation with personalised aromatherapy oil → private infrared sauna with mountain views → cheese platter & handmade chocolate pralines → relaxation lounge."

Pricing (2 cards): NZ$699 single | NZ$1,349 couple.

- [ ] **Step 6: Verify massages.html** — hero, services list, pricing (2 cards: NZ$169 / NZ$135), CTA, footer, related services row.

- [ ] **Step 7: Verify beauty.html** — treatments list, "contact for pricing" card, footer.

- [ ] **Step 8: Verify healing.html** — modalities listed, NZ$155 pricing card, footer.

- [ ] **Step 9: Verify pampering-packages.html** — Devine Bliss pricing (NZ$549/NZ$999), footer.

- [ ] **Step 10: Verify alpinerenewalritual.html** — NZ$699 single / NZ$1,349 couple pricing, journey description, footer.

- [ ] **Step 11: Commit**

```bash
git add massages.html beauty.html healing.html pampering-packages.html alpinerenewalritual.html
git commit -m "feat: build day spa detail pages (T3) — massages, beauty, healing, packages, ritual"
```

---

## Chunk 5: Packages, Retreats, Editorial & Functional Pages

### Task 11: Build Packages & Retreat Detail Pages (T3)

**Files:**
- Create: `spa-escape.html`
- Create: `family-escape.html`
- Create: `friends-escape.html`
- Create: `private-retreats.html`
- Create: `heart-connecting-retreat.html`
- Create: `qhretreat.html`
- Create: `gift-vouchers.html`

- [ ] **Step 1: Build spa-escape.html**

H1: "Spa Escape Packages". Hero image: `images/alpine-spa-villa.jpg`.

Content: Alpine Spa Villa + spa treatments package. "The perfect couples or solo escape — combine a night in the Alpine Spa Villa with your choice of spa treatment."

Pricing (2 cards): From NZ$549 (solo — villa + 1 treatment) | From NZ$999 (couple — villa + 2 treatments). Contact for custom package pricing.

- [ ] **Step 2: Build family-escape.html**

H1: "Family Escape". Hero image: `images/retreat-exterior.jpg`.

Content: Three Bedroom Villa + family-focused add-ons. Sleeps 2–8, self-contained, mountain views. Kids' games and toys. "Give your family the gift of nature, space, and nourishment."

Pricing (2 cards): Three Bedroom Villa (self-catering) — contact for nightly rate | Organic breakfast add-on — NZ$40pp.

- [ ] **Step 3: Build friends-escape.html**

H1: "Friends Escape". Hero image: `images/owners.jpg`.

Primary copy below is complete and self-contained. `docs/scraped/friends-escape.md` is created in Task 3 (Chunk 1) — use it to supplement if it contains richer content, otherwise use the copy as written:

"Gather your closest friends and retreat together — shared accommodation, group spa treatments, and private yoga sessions at Vibrant Living. Choose the Three Bedroom Villa (sleeps up to 8) as your base, add spa treatments for each guest, and let Adela design a tailored daily programme of yoga, healing, and nourishing organic meals. Contact us to create your perfect friends' escape."

Related services: link to Three Bedroom Villa, Massages, Yoga. CTA: link to contact.html.

- [ ] **Step 4: Build private-retreats.html**

H1: "Private Retreats". Hero image: `images/retreat-exterior.jpg`.

Content: "A fully bespoke retreat designed exclusively for you. Work one-on-one with Adela to craft a healing journey — choosing accommodation, spa treatments, yoga sessions, healing modalities, and organic meal plans that match your personal goals." Contact for pricing.

- [ ] **Step 5: Build heart-connecting-retreat.html**

H1: "Heart Connecting Retreat". Hero image: `images/owners.jpg`.

Content: Facilitated by Adela. Group retreat focused on connection, authenticity, and heart-centred living. Programme includes yoga, cacao ceremonies, sacred circles, and guided group sharing. Flexible duration. Pricing from NZ$395/24hrs (villa room).

- [ ] **Step 6: Build qhretreat.html**

H1: "QH Retreat". Hero image: `images/team.jpg`.

Content: Quantum Healing retreat facilitated by Adela. Combines quantum healing techniques with yoga, meditation, and restorative spa treatments. Contact for upcoming dates and pricing.

- [ ] **Step 7: Build gift-vouchers.html**

H1: "Gift Vouchers". Hero image: `images/aromatherapy.jpg`.

Content: "Give the gift of wellbeing. Vibrant Living gift vouchers are available for any service, package, or accommodation stay — redeemable at any time. Beautifully presented and personally emailed or posted to the recipient."

Pricing cards: Custom amount | Specific treatment (e.g., 60-min massage NZ$169) | Pampering Package (from NZ$549).

CTA: Contact to purchase — `info@vibrantliving.co.nz` or phone.

- [ ] **Step 8: Verify spa-escape.html** — hero, pricing from NZ$549, related services, CTA, footer.

- [ ] **Step 9: Verify family-escape.html** — hero, features, contact pricing card, footer.

- [ ] **Step 10: Verify friends-escape.html** — hero, copy, related services links, contact CTA, footer.

- [ ] **Step 11: Verify private-retreats.html** — hero, bespoke copy, contact CTA, footer.

- [ ] **Step 12: Verify heart-connecting-retreat.html** — hero, programme description, pricing from NZ$395, footer.

- [ ] **Step 13: Verify qhretreat.html** — hero, content, footer.

- [ ] **Step 14: Verify gift-vouchers.html** — hero, 3 pricing cards, contact details, footer.

- [ ] **Step 15: Commit**

```bash
git add spa-escape.html family-escape.html friends-escape.html private-retreats.html heart-connecting-retreat.html qhretreat.html gift-vouchers.html
git commit -m "feat: build packages and retreat detail pages (T3)"
```

---

### Task 12: Build Editorial Pages (T4)

**Files:**
- Create: `about-us.html`
- Create: `yoga-hanmer-springs.html`
- Create: `fat-bikes.html`
- Create: `venue-hire.html`
- Create: `partners.html`
- Create: `free-resources.html`

T4 template: hero-banner → editorial text+image content (flexible) → optional feature strip → CTA strip → footer.

- [ ] **Step 1: Build about-us.html**

H1: "About Vibrant Living". Hero image: `images/owners.jpg`.

Section 1 (Text+Image): "Adela and her husband took over Vibrant Living in 2023 — bringing their combined skills in physiotherapy, massage therapy, yoga, and retreat facilitation to create a heart-centred sanctuary in Hanmer Springs. Adela is a physiotherapist, massage therapist, athletic trainer, yoga teacher, and retreat facilitator. Originally from the Czech Republic, she is mother to twins Alice and Oliver (born May 2023)."

Section 2 (Feature strip — values):
- Heart-centred care
- Eco-friendly practices (chemical-free cleaning, composting, own chickens)
- Plant-based organic meals
- Holistic body/mind/spirit approach

Section 3 (Text): "Our mission is to offer a space where you feel genuinely held — not just treated. Everything at Vibrant Living is chosen with love: the food we cook, the products we use, the modalities we offer."

Image: `images/team.jpg`.

- [ ] **Step 2: Build yoga-hanmer-springs.html**

H1: "Yoga in Hanmer Springs". Hero image: `images/retreat-exterior.jpg`.

Content: "Join Adela for yoga classes and private sessions in the tranquil gardens of Vibrant Living. Drawing on therapeutic yoga principles, classes are suitable for all levels — from beginners to experienced practitioners." Mention morning yoga as part of retreats. Contact for class schedule and private bookings.

- [ ] **Step 3: Build fat-bikes.html**

H1: "Fat Bike Hire". Hero image: `images/campground.jpg`.

Content: "Explore the trails around Hanmer Springs on one of our fat bikes. Perfect for all ages and fitness levels, fat bikes handle both gravel paths and alpine terrain with ease. Available to guests of Vibrant Living — contact us to book." (Use scraped content from `docs/scraped/friends-escape.md` or `docs/scraped/retreat-calendar.md` if either includes fat bike references; otherwise the copy above is sufficient.)

- [ ] **Step 4: Build venue-hire.html**

H1: "Venue Hire". Hero image: `images/retreat-exterior.jpg`.

Content: "Vibrant Living is available for private events, corporate wellness days, workshops, and retreat facilitation. Our two-acre property offers a range of indoor and outdoor spaces — from the guest lounge and treatment rooms to the gardens and outdoor courtyard. Contact us to discuss your event." Include capacity/pricing note if found in scraped content.

- [ ] **Step 5: Build partners.html**

Use scraped content from `docs/scraped/partners.md`. If minimal, display: "We work with a select group of local and national partners who share our values of wellness, sustainability, and authentic hospitality." Display partner logos or names as a simple grid.

- [ ] **Step 6: Build free-resources.html**

Use scraped content from `docs/scraped/free-resources.md`. If minimal, display a simple list with links: "A curated collection of free resources to support your wellbeing journey — guided meditations, yoga sequences, and wellness articles."

- [ ] **Step 7: Verify about-us.html and yoga-hanmer-springs.html in browser**

- [ ] **Step 8: Commit**

```bash
git add about-us.html yoga-hanmer-springs.html fat-bikes.html venue-hire.html partners.html free-resources.html
git commit -m "feat: build editorial pages (T4) — about, yoga, fat bikes, venue hire, partners, resources"
```

---

### Task 13: Build Functional Pages (T5) & Utility Page (T6)

**Files:**
- Create: `contact.html`
- Create: `book-online.html`
- Create: `retreat-calendar.html`
- Create: `features.html`
- Create: `thankyou.html`

- [ ] **Step 1: Build contact.html**

H1: "Get in touch". Hero image: `images/retreat-exterior.jpg`.

Two-column layout below hero: left column = contact form; right column = info panel.

Contact form fields: Name (required), Email (required), Phone, Subject (dropdown: Accommodation, Day Spa, Retreat Enquiry, Other), Message (textarea), Submit button.

Form action: `mailto:info@vibrantliving.co.nz` (fallback for static site; note in plan that Webflow will use native form handling).

Info panel:
- Address: 88 Rippingale Road, Hanmer Springs 7334
- Phone: +64 3 315 7429 / +64 20 4176 0151
- Email: info@vibrantliving.co.nz
- Hours: Monday–Sunday, 9:00am–8:00pm

```css
/* Add to components.css */
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 64px;
  align-items: start;
}
.contact-form label {
  display: block;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  margin-bottom: 6px;
  color: var(--near-black);
}
.contact-form input,
.contact-form select,
.contact-form textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1.5px solid var(--light-grey);
  border-radius: 2px;
  font-family: var(--font-body);
  font-size: 15px;
  color: var(--near-black);
  background: var(--white);
  margin-bottom: 20px;
  transition: border-color 0.2s;
}
.contact-form input:focus,
.contact-form select:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: var(--green);
}
.contact-form textarea { height: 140px; resize: vertical; }
.contact-info { padding: 40px; background: var(--warm-cream); border-radius: 4px; }
.contact-info h3 { margin-bottom: 24px; }
.contact-info-item { display: flex; gap: 12px; margin-bottom: 20px; font-size: 14px; }
@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
```

- [ ] **Step 2: Build book-online.html**

H1: "Book Online". Hero image: `images/hero-hot-stones.jpg`.

Content below hero:
```html
<section class="section">
  <div class="container text-center">
    <span class="overline">Secure your dates</span>
    <h2>Book your experience</h2>
    <p style="max-width:560px;margin:0 auto 40px;">Select your preferred accommodation, spa treatment, or retreat below. For multi-night retreat packages or bespoke enquiries, please <a href="contact.html" style="color:var(--green);">contact us directly</a>.</p>
    <!-- Booking widget placeholder -->
    <div style="background:var(--warm-cream);border-radius:4px;padding:48px;text-align:center;">
      <p style="color:var(--warm-grey);">Booking widget loads here — replace with Vibrant Living's external booking tool embed code.</p>
      <a href="contact.html" class="btn btn--primary" style="margin-top:16px;">Enquire directly</a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Build retreat-calendar.html**

H1: "Retreat Calendar". Hero image: `images/retreat-exterior.jpg`.

Use scraped content from `docs/scraped/retreat-calendar.md`. Display upcoming retreats as a simple styled table:

```html
<table style="width:100%;border-collapse:collapse;">
  <thead>
    <tr style="background:var(--bg-sage);">
      <th style="padding:14px;text-align:left;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Retreat</th>
      <th style="padding:14px;text-align:left;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Dates</th>
      <th style="padding:14px;text-align:left;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Duration</th>
      <th style="padding:14px;text-align:left;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Price</th>
      <th style="padding:14px;"></th>
    </tr>
  </thead>
  <tbody>
    <!-- Replace with actual dates from docs/scraped/retreat-calendar.md if available.
         Placeholder rows shown so the table is visible during browser verification: -->
    <tr style="border-bottom:1px solid var(--light-grey);">
      <td style="padding:14px;">Wellness Retreat</td>
      <td style="padding:14px;">TBC — contact us</td>
      <td style="padding:14px;">5 nights</td>
      <td style="padding:14px;">From NZ$495/night</td>
      <td style="padding:14px;"><a href="book-online.html" class="card__link">Enquire</a></td>
    </tr>
    <tr style="border-bottom:1px solid var(--light-grey);">
      <td style="padding:14px;">Heart Connecting Retreat</td>
      <td style="padding:14px;">TBC — contact us</td>
      <td style="padding:14px;">3 nights</td>
      <td style="padding:14px;">From NZ$395/night</td>
      <td style="padding:14px;"><a href="book-online.html" class="card__link">Enquire</a></td>
    </tr>
  </tbody>
</table>
```

- [ ] **Step 4: Build features.html**

H1: "Features". Hero image: `images/retreat-exterior.jpg`. Use scraped content from `docs/scraped/features.md` (created in Task 3, Chunk 1). Display as image/media grid using `card-grid card-grid--3`. If `features.md` is sparse or empty, display a 3-column grid of the property's key features (infrared sauna, hot tub, mountain views, organic gardens, yoga space, fat bikes) as feature cards with the relevant `images/` photos.

- [ ] **Step 5: Build thankyou.html (T6 — no nav, no footer)**

```html
<!DOCTYPE html>
<html lang="en-NZ">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You — Vibrant Living</title>
  <link rel="stylesheet" href="css/styles.css">
</head>
<body style="display:flex;align-items:center;justify-content:center;min-height:100vh;background:var(--warm-cream);">
  <div style="text-align:center;max-width:480px;padding:var(--gutter);">
    <div style="width:64px;height:64px;background:var(--green);border-radius:50%;margin:0 auto 24px;display:flex;align-items:center;justify-content:center;color:white;font-size:28px;">✓</div>
    <h1 style="font-size:32px;margin-bottom:16px;">Thank you!</h1>
    <p>Your message has been received. We'll be in touch within 24 hours.</p>
    <a href="index.html" class="btn btn--primary" style="margin-top:32px;">Return home</a>
  </div>
</body>
</html>
```

- [ ] **Step 6: Verify contact.html** — 2-column layout, form fields render, info panel visible.

- [ ] **Step 7: Verify book-online.html** — booking widget placeholder card visible, contact fallback link present.

- [ ] **Step 8: Verify retreat-calendar.html** — table renders with 2 placeholder rows, not empty.

- [ ] **Step 9: Verify features.html** — hero, card grid content from scraped file, footer.

- [ ] **Step 10: Verify thankyou.html** — centred logo + tick + message, no nav/footer present.

- [ ] **Step 11: Commit**

```bash
git add contact.html book-online.html retreat-calendar.html features.html thankyou.html css/components.css
git commit -m "feat: build functional and utility pages (T5, T6) — contact, book-online, calendar, thankyou"
```

---

## Chunk 6: Final QA & Polish

### Task 14: Cross-browser responsive QA

**Files:**
- Modify: `css/components.css` (fix any responsive issues found)

- [ ] **Step 1: Check all 33 pages open without broken images or console errors**

With server running at `http://localhost:8080`, open each page and confirm no broken images and no JS errors in the console. Full page list:

```
index.html, about-us.html, accommodation.html, lodge-suite.html,
alpine-spa-villa.html, three-bedroom-villa.html, campground.html,
day-spa.html, massages.html, beauty.html, healing.html,
pampering-packages.html, alpinerenewalritual.html, retreats.html,
private-retreats.html, heart-connecting-retreat.html, qhretreat.html,
retreat-calendar.html, packages.html, spa-escape.html, family-escape.html,
friends-escape.html, specials.html, gift-vouchers.html,
yoga-hanmer-springs.html, fat-bikes.html, venue-hire.html, features.html,
partners.html, free-resources.html, book-online.html, contact.html, thankyou.html
```

For each page verify:
- [ ] Nav renders correctly (transparent on `index.html`; white sticky on all others)
- [ ] No broken `<img>` elements (red X or empty space)
- [ ] Footer columns align correctly
- [ ] No overflowing text or horizontal scroll

- [ ] **Step 2: Verify the More dropdown on desktop**

On any page, hover the "More ▾" nav link. Confirm the dropdown menu appears with: Yoga, Fat Bikes, Venue Hire, Partners, Free Resources, Gift Vouchers. Click one to confirm navigation works.

- [ ] **Step 3: SEO meta tag audit**

Run the following grep to confirm every HTML file has a unique `<title>` and `<meta name="description">`:

```bash
cd /Users/samnewbold/Documents/vibrant-living
grep -l "<title>" *.html | wc -l   # should be 33
grep -l 'meta name="description"' *.html | wc -l   # should be 33
```

Expected: both counts = 33. For any missing, add the tag.

Also confirm OG tags on the 5 required pages (spec §15):

```bash
grep -l 'og:title' index.html accommodation.html day-spa.html retreats.html packages.html
```

Expected: 5 matches.

- [ ] **Step 4: Accessibility spot-check**

Check 5 pages (index, massages, lodge-suite, contact, alpinerenewalritual):
- [ ] Every `<img>` has a non-empty `alt` attribute — run: `grep -c 'alt=""' [page].html` — expected: 0
- [ ] All body text (`color: var(--warm-grey)` on white) passes WCAG AA: #8A8782 on #FFFFFF = 3.4:1 contrast. This passes AA for large text only (18px+ or 14px+ bold). For small body text, check using https://webaim.org/resources/contrastchecker/ — if failing for 16px body, darken `--warm-grey` to `#767676` (4.5:1 ratio) and update the variable in `styles.css`.

- [ ] **Step 5: Tablet QA — resize browser to 768px**

Check on `index.html`, `massages.html`, and `contact.html`:
- [ ] Hamburger icon visible, desktop nav links hidden
- [ ] Card grids are 2-column
- [ ] Text+Image sections stack vertically
- [ ] Footer is 2-column

- [ ] **Step 6: Mobile QA — resize browser to 375px**

Check on same 3 pages:
- [ ] All card grids are 1-column
- [ ] Pricing cards stack
- [ ] Contact form is full-width
- [ ] No horizontal scroll (check with browser horizontal scrollbar or `document.documentElement.scrollWidth > window.innerWidth` in console)

- [ ] **Step 7: Validate HTML on all pages**

```bash
cd /Users/samnewbold/Documents/vibrant-living
npx html-validate *.html 2>&1 | grep -E "^(error|warning)" | sort | uniq -c | sort -rn | head -20
```

If `npx html-validate` is unavailable, validate at least `index.html`, `contact.html`, and `thankyou.html` via https://validator.w3.org/#validate_by_input. Expected: 0 errors.

- [ ] **Step 8: Check all internal links resolve**

```bash
# Find all local .html hrefs and check each file exists
grep -oh 'href="[^"]*\.html"' /Users/samnewbold/Documents/vibrant-living/*.html \
  | sed 's/href="//;s/"//' \
  | sed 's|/||' \
  | sort -u \
  | while read f; do
      [ -f "/Users/samnewbold/Documents/vibrant-living/$f" ] || echo "MISSING: $f"
    done
```

Expected: no MISSING output.

- [ ] **Step 9: Fix any issues found in steps 1–8 in `css/components.css` or the relevant HTML files**

- [ ] **Step 10: Final commit**

```bash
git add css/ js/ *.html
git commit -m "fix: responsive QA pass, accessibility check, link validation"
```

---

### Task 15: Handoff notes and client sign-off

- [ ] **Step 1: Append Webflow migration notes to README (safe append — does not overwrite existing content)**

```bash
cat >> /Users/samnewbold/Documents/vibrant-living/README.md << 'EOF'

## Webflow Migration Checklist
- Each HTML page → Webflow page (1:1 mapping)
- CSS classes in `css/components.css` → Webflow class names
- Nav and footer (`js/partials.js`) → Webflow Symbols
- Section types S1–S5 → Webflow component templates
- Replace booking widget placeholder in `book-online.html` with actual embed code
- Update contact form `action` attribute to use Webflow native form handling
- Replace social link hrefs in footer (currently placeholder URLs)
- Replace emoji icons in feature strips with SVG icons for cross-platform consistency
- Add `.superpowers/` to any deployment exclude list

## Client Sign-off
Share the staging site with Adela before Webflow migration:
- Option A: Run `python3 -m http.server 8080` and share via ngrok: `ngrok http 8080`
- Option B: Deploy to Netlify Drop (drag the project folder to app.netlify.com/drop)
- Option C: Deploy to GitHub Pages (push repo, enable Pages on main branch)
EOF
```

- [ ] **Step 2: Final commit**

```bash
git add README.md
git commit -m "docs: add Webflow migration checklist and client sign-off instructions"
```
