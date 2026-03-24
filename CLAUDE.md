# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

This project is a **complete website rebuild** for **Vibrant Living Retreat and Day Spa** — a wellness retreat and day spa in Hanmer Springs, New Zealand. The current site runs on **Wix** (vibrantliving.co.nz). The goal is to build a staging site for client sign-off, then migrate to **Webflow**.

The new site must faithfully recreate all content, brand identity, and page structure from the existing site while improving quality and design. Do not invent content — source everything from the scraped data in this file.

---

## Business Information

| Field | Detail |
|---|---|
| Business name | Vibrant Living Retreat and Day Spa |
| Address | 88 Rippingale Road, Hanmer Springs 7334, New Zealand |
| Phone | +64 3 315 7429 / +64 20 4176 0151 (Adela) |
| Email | info@vibrantliving.co.nz |
| Hours | Monday–Sunday, 9:00am–8:00pm |
| Social | Facebook, Instagram |
| Booking platform | External booking widget (current Wix site links to external booking tool) |

### Owners
- **Adela** – Co-owner, physiotherapist, massage therapist, athletic trainer, yoga teacher, retreat facilitator. Czech background. Mother to twins Alice & Oliver (born May 2023).
- **Partner/husband** – Co-owner (name not captured on site)
- Took over the retreat in 2023 as a husband-and-wife team.

### Company Bio & Values
Heart-centered wellness retreat set across two acres of tranquil gardens in Hanmer Springs. Key values:
- Resonant collaboration, authentic connections, self-responsibility
- Eco-friendly: chemical-free cleaning, local/organic sourcing, composting, recycling
- Own chickens providing fresh eggs for breakfasts
- Plant-based food focus with home-cooked organic meals
- Holistic approach: body, mind, spirit
- Personal, non-clinical, warm hospitality

Tagline: **"Your escape in Hanmer Springs"**

---

## Brand Identity

### Logo
- Circular mandala/geometric flower icon with sage green leaf segments and grey geometric panels
- Text: "VIBRANT LIVING" (large, sage green) / "RETREAT & DAY SPA" (smaller, warm grey, spaced caps)
- Logo image URL (Wix CDN): `https://static.wixstatic.com/media/794854_672030cb96664023b0ee728decfd10aa~mv2.jpg`

### Colour Palette
| Role | Description | Approximate Hex |
|---|---|---|
| Primary Green | Logo/brand green — fresh sage/leaf green | `#8BBF5A` (visually sampled) |
| Warm Grey | Secondary text, "LIVING" and subtitle in logo | `#8A8782` |
| Background Sage | Light sage/khaki section backgrounds | `#E3E0C0` (rgb 227,224,192) |
| White | Primary background | `#FFFFFF` |
| Near-Black | Body text and headings | `#1A1A1A` |
| Warm Cream | Cards, overlays, popups | `#F5EEE6` |
| Muted Stone | CTA buttons | `#757575` (rgb 117,117,117) |
| Light Grey | Section dividers, card backgrounds | `#E8E6E6` (rgb 232,230,230) |

> Note: Verify exact hex values against the Wix site or provided brand assets before finalising in Webflow. The green is a key brand colour and must match closely.

### Typography
- **Headings**: Raleway (confirmed from computed CSS) — used for all H1–H4 and display text
- **Body**: Avenir LT W01 35 Light / sans-serif (from Wix CSS rules: `avenir-lt-w01_35-light1475496`)
- Heading style: uppercase tracking for section titles (e.g. "SERVICES", "WELCOME", "ACCOMMODATION")
- Tone: elegant, warm, approachable — avoid clinical or corporate language

---

## Site Structure (33 Pages)

### Primary Navigation
- Home
- Specials and Promotions
- Accommodation
- Day Spa
- Stay and Spa Packages
- More *(dropdown)*

### All Pages
| URL slug | Page title |
|---|---|
| `/` | Home |
| `/about-us` | About Us |
| `/accommodation` | Accommodation (hub) |
| `/lodge-suite` | Lodge Suite B&B |
| `/alpine-spa-villa` | Alpine Spa Villa |
| `/three-bedroom-villa` | Three Bedroom Villa |
| `/campground` | Campground |
| `/day-spa` | Day Spa (hub) |
| `/massages` | Massages |
| `/beauty` | Holistic Beauty |
| `/healing` | Healing & Transformation |
| `/pampering-packages` | Pampering Packages |
| `/alpinerenewalritual` | Alpine Renewal Ritual |
| `/retreats` | Wellness Retreats |
| `/private-retreats` | Private Retreats |
| `/heart-connecting-retreat` | Heart Connecting Retreat |
| `/qhretreat` | QH Retreat |
| `/retreat-calendar` | Retreat Calendar |
| `/packages` | Wellness Escape Packages (hub) |
| `/spa-escape` | Spa Escape Packages |
| `/family-escape` | Family Escape |
| `/friends-escape` | Friends Escape |
| `/specials` | Specials and Promotions |
| `/gift-vouchers` | Gift Vouchers |
| `/yoga-hanmer-springs` | Yoga Hanmer Springs |
| `/fat-bikes` | Fat Bikes |
| `/venue-hire` | Venue Hire |
| `/features` | Features |
| `/partners` | Partners |
| `/free-resources` | Free Resources |
| `/book-online` | Book Online |
| `/contact` | Contact |
| `/thankyou` | Thank You |

---

## Accommodation Options

### 1. Lodge Suite (B&B)
- Super-king/twin bed, private ensuite bathroom, private infrared sauna, mountain views
- Air conditioning, underfloor heating, satellite TV/DVD, tea/coffee facilities
- Located in main lodge; access to guest lounge, feng shui courtyard, 2-acre gardens
- **Pricing**: NZ$280/night (no breakfast) | NZ$360/night (B&B for 2 adults)

### 2. Alpine Spa Villa
- Standalone luxury villa with private outdoor hot tub, patio, super-king bedroom
- Open-plan kitchen/lounge, spacious bathroom with mountain views, heat pump/AC, Wi-Fi
- Perfect for couples or solo travellers
- **Pricing**: NZ$280/night (no breakfast) | NZ$360/night (B&B for 2 adults)
- Spa Escape Packages from NZ$549

### 3. Three Bedroom Villa
- Standalone fully self-contained villa for families/groups, sleeps 2–8
- 2 queen bedrooms + 1 twin room (2 single beds), large lounge, full kitchen, laundry, 1 bathroom (deep bath + shower)
- Large deck with BBQ, heat pump, mountain views, kids' games/toys/DVDs
- Also available as self-catering holiday home

### 4. Campground
- Tent and campervan sites on 2-acre property. Pet friendly.
- Includes: hot shower, washing machine/dryer, shared courtyard
- Optional organic breakfast add-on: $40pp
- **Pricing**: $30/night (1 person) | $45/night (2 people)
- Special: Book 90-min massage = complimentary 1-night solo stay

---

## Day Spa Services

### Massages
- Holistic Relaxation Massage
- Therapeutical Massage
- Deep Tissue Massage
- Hot Stone Massage
- Reflexology
- Pregnancy Massage
- Indian Head Massage
- Lymphatic Drainage Massage
- Duration: 60 minutes to 3 hours | Individual or Couples

### Beauty Treatments
- Holistic Hydrating Facial
- Vitality Facial with Eye Treatment
- Beauty Tofu Facial Ritual
- Detox and Glow Body Wraps
- Back & Shoulder Massage & Facial
- Organic Sugar Glow full-body exfoliation

### Healing Modalities
- Energy work addressing energetic, emotional, and mental wellbeing
- Reiki Healing
- Counselling/coaching-style sessions
- Singing bowl / meditation
- Cacao ceremonies

### Signature Packages

#### Devine Bliss Half-Day Package
4-hour experience including: welcome refreshments, organic Sugar Glow body scrub, hot tub or candlelit bath soak, full-body aroma-bliss massage with hot stones, nourishing platter, Absolute Bliss Vitality Facial (NZ organic products).
- **Pricing**: $549/individual | $999/couple
- Enhancement: +$155 for 60-min healing session
- Slots: 9:30am or 1:30pm

#### Alpine Renewal Ritual (Signature 4–5 hour journey)
Welcome drink → private treatment suite (robes/slippers) → full-body sugar exfoliation with personalised aromatherapy oil → private infrared sauna with mountain views → cheese platter & handmade chocolate pralines → relaxation lounge.
- **Pricing**: $699/single | $1,349/couple

#### Pampering Packages (90 min–3 hours)
- Massage & Facials
- Massage & Body Exfoliation
- Body Exfoliation & Massage & Facial
- Spa Bath & Massage

### Pricing Reference
- 60-min massage: $169 regular | $135 midweek special (Mon–Thu)
- Healing session add-on: $155/60min

---

## Wellness Retreats

Flexible stays 2–13 nights. Facilitated by Adela. Group or private bookings.

### Daily Schedule (Example)
- 7:45am: Ginger Lemon Detox Drink
- 8:00am: Yoga & Meditation
- 9:30am: Healthy Breakfast
- 11:00am: Spa Treatment or session of choice
- 1:00pm: Free/lunch break
- Afternoon: Rest, hot pools, garden walks
- 5:30–6:30pm: Restorative Yoga / Meditation / Cacao Ceremony
- 6:45pm: Home-cooked organic dinner
- 7:30pm: Optional inspirational film
- 9–10pm: Journaling/reading/rest

### Retreat Pricing (per 24hrs)
| Option | Price |
|---|---|
| Camping (campervan, shared bathroom) | $225 |
| Three Bedroom Villa – private queen room (shared bathroom) | $395 |
| Three Bedroom Villa – shared twin room (2 people min) | $300pp |
| Lodge Ensuite Room with infrared sauna | $495 |

Add-ons: pampering spa treatments, private yoga/healing sessions, sacred circles, cacao ceremonies.

---

## Current Specials (March–May 2026)
- **Midweek Massage Special**: $135/60min (Mon–Thu only; reg $169)
- **Book 3 Nights, Get a Free Massage**: Direct bookings only

---

## Key Images to Transfer

All images hosted on Wix static CDN (`static.wixstatic.com`). Download originals at highest resolution available (remove `/fill/w_XXX...` parameters from URL to get the source file, or use the base media hash).

| Description | Wix URL (base media ID) |
|---|---|
| Logo | `794854_672030cb96664023b0ee728decfd10aa~mv2.jpg` |
| Hero – Hot Stones Massage | `0df3ba682314442487f5b9f3e8d7de14.jpg` |
| Team photo | `794854_b627dcb419b847b38d8f179c53dcf5c4~mv2.jpg` |
| Aromatherapy & Hot Stone | `794854_8eb8b034ac2545d098aa4955a23e71b1~mv2.jpg` |
| Pregnancy Massage | `607152bc37474437828fc852f3f251b9.jpg` |
| Retreat exterior panorama | `794854_b6396cd765ff44f39ce7d20a300714cc~mv2.jpg` |
| Alpine Spa Villa exterior | `794854_0f8dc943f9a04658882a572514744c9f~mv2.jpg` |
| Alpine Renewal Ritual room | `794854_ae10d1a404744efba5b712bb060f1547~mv2.jpg` |
| Campground | `794854_cdb775f9345f4cc8b3903a048461ba65~mv2.jpg` |
| Family/owners photo | `794854_7da545e460c04596ac7fbec87061f6f6f000.jpg` |

To get full-resolution Wix images, construct URLs as:
```
https://static.wixstatic.com/media/{MEDIA_ID}/v1/fill/w_3000,q_90/{filename}
```
Or fetch without the fill parameters for the original.

---

## Webflow Migration Notes

- Build in **Webflow** as the final target platform
- Create a **staging/preview site** first for client (Adela) sign-off before going live
- The current site is Wix-based — all content must be manually migrated (no automated Wix→Webflow tool)
- Booking is handled via an external system (currently linked via "Book Here" CTAs) — preserve this pattern
- Contact form should send to info@vibrantliving.co.nz
- The site uses NZD pricing throughout
- All content written in New Zealand English (British spelling conventions)
- The "More" nav item is a dropdown containing additional pages (yoga, fat bikes, venue hire, partners, etc.)

---

## Content Writing Tone

Match the existing site's voice: warm, personal, holistic, nature-connected. Use words like: sanctuary, nourishing, restorative, rejuvenate, holistic, heart-centered, vibrant. Avoid clinical or corporate language. Reference the mountain/alpine setting and New Zealand nature.
