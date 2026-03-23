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
