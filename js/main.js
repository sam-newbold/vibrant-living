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
