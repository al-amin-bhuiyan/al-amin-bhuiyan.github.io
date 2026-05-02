/**
 * portfolio/js/main.js
 * Navigation, scroll reveal, interactions
 */

(function () {
  'use strict';

  /* ── NAV ── */
  const navbar   = document.getElementById('navbar');
  const toggle   = document.getElementById('navToggle');
  const drawer   = document.getElementById('navDrawer');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-drawer a');

  // Sticky shadow on scroll
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
    updateActiveNav();
  }, { passive: true });

  // Hamburger
  toggle?.addEventListener('click', () => {
    const open = toggle.classList.toggle('open');
    drawer.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close drawer on link click
  drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      drawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Active nav highlight
  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === '#' + current);
    });
  }

  /* ── SCROLL REVEAL ── */
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    // Fallback: show all immediately
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ── STAGGERED CHILDREN ── */
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const delay = parseFloat(parent.dataset.stagger) || 0.1;
    const children = parent.querySelectorAll(':scope > *');
    children.forEach((child, i) => {
      child.classList.add('reveal');
      child.style.transitionDelay = `${i * delay}s`;
    });
  });

  /* ── TYPING EFFECT (hero subtitle) ── */
  const typeEl = document.getElementById('typeText');
  if (typeEl) {
    const phrases = [
      'Flutter Developer',
      'Mobile App Builder',
      'Clean Architecture Fan',
      'Competitive Programmer',
    ];
    let phraseIdx = 0, charIdx = 0, deleting = false;
    const speed = { type: 80, delete: 45, pause: 1800 };

    function type() {
      const current = phrases[phraseIdx];
      typeEl.textContent = deleting
        ? current.substring(0, charIdx--)
        : current.substring(0, charIdx++);

      if (!deleting && charIdx === current.length + 1) {
        setTimeout(() => { deleting = true; type(); }, speed.pause);
        return;
      }
      if (deleting && charIdx === 0) {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
      }
      setTimeout(type, deleting ? speed.delete : speed.type);
    }
    setTimeout(type, 1200);
  }

  /* ── SKILL PILL HOVER COLOR ── */
  document.querySelectorAll('.skill-pill-hover').forEach(el => {
    el.addEventListener('mouseenter', () => {
      el.style.borderColor = el.dataset.color || 'var(--accent)';
      el.style.color       = el.dataset.color || 'var(--accent)';
    });
    el.addEventListener('mouseleave', () => {
      el.style.borderColor = '';
      el.style.color       = '';
    });
  });

  /* ── SMOOTH HASH LINKS (Safari fallback) ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── COPY EMAIL ── */
  const emailBtn = document.getElementById('copyEmail');
  if (emailBtn) {
    emailBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(emailBtn.dataset.email);
        const orig = emailBtn.textContent;
        emailBtn.textContent = 'Copied!';
        emailBtn.style.color = 'var(--green)';
        emailBtn.style.borderColor = 'var(--green)';
        setTimeout(() => {
          emailBtn.textContent = orig;
          emailBtn.style.color = '';
          emailBtn.style.borderColor = '';
        }, 2000);
      } catch { /* silent */ }
    });
  }

  /* ── LAZY IMAGES ── */
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading supported; attribute already in HTML
  } else {
    // Polyfill: use IO
    const imgIO = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          imgIO.unobserve(img);
        }
      });
    });
    document.querySelectorAll('img[data-src]').forEach(img => imgIO.observe(img));
  }

  /* ── YEAR in footer ── */
  const yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
