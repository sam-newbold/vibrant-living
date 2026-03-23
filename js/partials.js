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
        <a href="https://www.facebook.com/vibrantlivinghanmersprings" aria-label="Facebook">f</a>
        <a href="https://www.instagram.com/vibrantlivinghanmersprings" aria-label="Instagram">&#9670;</a>
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
