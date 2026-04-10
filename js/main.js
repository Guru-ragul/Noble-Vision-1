/*
 * ============================================================
 *  NOBLE VISION — Main JavaScript (main.js)
 *  Handles: Mobile nav, scroll effects, fade-in animations,
 *           accordion, active nav link detection.
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------------------------------------
     NAVIGATION: Mobile Menu Toggle
  ------------------------------------------------------- */
  const navToggle = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  /* -------------------------------------------------------
     NAVIGATION: Scroll — add .scrolled class to header
  ------------------------------------------------------- */
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // run on load
  }

  /* -------------------------------------------------------
     NAVIGATION: Highlight current page link
  ------------------------------------------------------- */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentFile) {
      link.classList.add('active');
    }
  });

  /* -------------------------------------------------------
     SCROLL ANIMATIONS: Fade-in on viewport entry
  ------------------------------------------------------- */
  const fadeTargets = document.querySelectorAll('.fade-in');
  if (fadeTargets.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    );
    fadeTargets.forEach(el => observer.observe(el));
  }

  /* -------------------------------------------------------
     ACCORDION: Toggle open/close
  ------------------------------------------------------- */
  document.querySelectorAll('.accordion-header').forEach(hdr => {
    hdr.addEventListener('click', () => {
      const item   = hdr.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Close all open items
      document.querySelectorAll('.accordion-item.open').forEach(open => {
        open.classList.remove('open');
      });

      // If it was closed, open it
      if (!isOpen) item.classList.add('open');
    });
  });

  /* -------------------------------------------------------
     CONTACT FORM: Prevent default submit (demo)
  ------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      const orig = btn.textContent;
      btn.textContent = 'Message Sent ✓';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig;
        btn.disabled = false;
        contactForm.reset();
      }, 3500);
    });
  }

});
