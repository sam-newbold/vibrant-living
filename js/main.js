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

  // Only run the scroll-based nav update on pages with a hero
  if (document.querySelector('.hero')) {
    updateNav(); // set initial state
    window.addEventListener('scroll', updateNav, { passive: true });
  } else {
    // Non-hero pages: nav is always scrolled
    if (nav) {
      nav.classList.remove('nav--transparent');
      nav.classList.add('nav--scrolled');
    }
  }

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

  // Close mobile menu on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });

  // Close mobile menu when clicking the overlay background
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    });
  }

  // Reset mobile menu state when resizing above mobile breakpoint
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('is-open')) {
      mobileMenu.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  });
});
