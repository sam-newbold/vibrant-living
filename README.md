# Vibrant Living Retreat & Day Spa — Staging Site

Static HTML/CSS/JS staging site for vibrantliving.co.nz.
Built for client sign-off before Webflow migration.

## Local development

Run: python3 -m http.server 8080
Open: http://localhost:8080

## Webflow migration notes
- Each HTML page → Webflow page
- CSS classes in components.css → Webflow class names
- Nav and footer (js/partials.js) → Webflow Symbols
- Section types S1–S5 → Webflow component templates
- Replace booking widget placeholder in book-online.html with embed code
- Update contact form action to use Webflow form handling

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

## Content to verify with Adela before go-live
- Three Bedroom Villa nightly rack rate (currently "Price on request")
- Friends Escape package pricing (currently "Contact us")
- Pampering packages pricing (currently "From NZ$169" — confirm correct)
- Retreat calendar upcoming dates (page shows retreat types and pricing tiers; no live dates yet)
- Partner business details (verify all 8 are still current)
- Free resources eBook form — connect to email marketing platform (currently mailto fallback)

## Client sign-off options
Share the staging site with Adela before Webflow migration:
- **Option A:** Run `python3 -m http.server 8080` and share via ngrok: `ngrok http 8080`
- **Option B:** Deploy to Netlify Drop (drag the project folder to app.netlify.com/drop)
- **Option C:** Deploy to GitHub Pages (push repo, enable Pages on main branch)
