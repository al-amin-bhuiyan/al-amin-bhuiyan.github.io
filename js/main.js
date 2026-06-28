
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

  /* ── INTERACTIVE TERMINAL ── */
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const terminalBody = document.getElementById('terminalBody');

  if (terminalInput && terminalOutput && terminalBody) {
    // Focus terminal on click anywhere inside the body
    terminalBody.addEventListener('click', () => {
      terminalInput.focus();
    });

    const commands = {
      help: () => `Available commands:
  <span class="accent-cmd">about</span>       - Quick introduction about me
  <span class="accent-cmd">experience</span>  - Summary of my professional work history
  <span class="accent-cmd">projects</span>    - Showcase of things I've built
  <span class="accent-cmd">skills</span>      - My technical core expertise
  <span class="accent-cmd">cp</span>          - Competitive programming achievements
  <span class="accent-cmd">contact</span>     - How to get in touch
  <span class="accent-cmd">clear</span>       - Clear the screen`,
      about: () => `Md. Shobuj - Flutter Developer
-----------------------------
- Graduated from Dhaka University of Engineering & Technology (DUET) in 2025.
- 1.5+ years of experience shipping production-ready cross-platform apps.
- Proficient in Clean Architecture, state management, and custom integrations.`,
      experience: () => `Work History:
-------------
1. <span class="accent-cmd">Spark Tech Agency</span> (Jr. Flutter Developer | Sep 2025 - Present)
   - Built real-time Socket.IO features and payment gateways (Stripe/bKash).
2. <span class="accent-cmd">Dilla Software Ltd</span> (Flutter Developer | Apr 2025 - Aug 2025)
   - Engineered scalable apps with automated unit and widget testing.
3. <span class="accent-cmd">Brain Station 23 PLC</span> (Flutter Developer Intern | Jan 2025 - Mar 2025)
   - Built NewsApp, E-Commerce, and wellness apps using MVVM.`,
      projects: () => `Featured Projects:
------------------
- <span class="accent-cmd">AI Bag Design</span>      - AI-powered custom designs using MVC.
- <span class="accent-cmd">Fatema Mind Glow</span>  - Wellness tracking via GetX & Firebase.
- <span class="accent-cmd">Austin Small Talk</span>  - Chat app utilizing Socket.IO.
- <span class="accent-cmd">Mental Health App</span> - Metric charts and Firebase backend.
Type 'projects' on my portfolio sections below for full links.`,
      skills: () => `Technical Core Skills:
----------------------
- Languages:    Dart, C++, Java, Python, C
- Mobile:       Flutter (Skia/Impeller, Render Tree lifecycle)
- Architecture: MVVM, MVC, Clean Architecture, SOLID Principles
- Services:     REST APIs, Firebase (Auth/Firestore), Socket.IO
- Other:        Git/GitHub, Figma, Unit & Widget Testing`,
      cp: () => `Competitive Programming Profiles:
---------------------------------
- LeetCode:    1638 Rating | 200+ solved
- Codeforces:  1228 Rating | 850+ solved
- CodeChef:    1603 Rating | 100+ solved
Total Solved: 1200+ across platforms.`,
      contact: () => `Contact Channels:
-----------------
- Phone:  01902042000
- Email:  mdshobuj204111@gmail.com
- Github: https://github.com/al-amin-bhuiyan`
    };

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const cmdText = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        // Print input prompt line in output
        const cmdLine = document.createElement('div');
        cmdLine.className = 'terminal-line';
        cmdLine.innerHTML = `<span style="color:var(--purple); font-weight:700;">shobuj@duet:~ $</span> ${cmdText}`;
        terminalOutput.appendChild(cmdLine);

        if (cmdText) {
          if (cmdText === 'clear') {
            terminalOutput.innerHTML = '';
          } else if (commands[cmdText]) {
            const outLine = document.createElement('div');
            outLine.className = 'terminal-line';
            outLine.innerHTML = commands[cmdText]();
            terminalOutput.appendChild(outLine);
          } else {
            const errLine = document.createElement('div');
            errLine.className = 'terminal-line';
            errLine.innerHTML = `bash: command not found: ${cmdText}. Type <span class="accent-cmd">'help'</span> for list of commands.`;
            terminalOutput.appendChild(errLine);
          }
        }

        // Scroll body to bottom
        setTimeout(() => {
          terminalBody.scrollTop = terminalBody.scrollHeight;
        }, 10);
      }
    });
  }

})();

