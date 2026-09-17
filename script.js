// Theme toggle (persists per-viewer via localStorage)
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function getStoredTheme() {
  try {
    return localStorage.getItem("theme");
  } catch (e) {
    return null;
  }
}

function setStoredTheme(value) {
  try {
    localStorage.setItem("theme", value);
  } catch (e) {
    /* ignore (private mode / blocked storage) */
  }
}

const stored = getStoredTheme();
if (stored === "light" || stored === "dark") {
  root.setAttribute("data-theme", stored);
}

themeToggle.addEventListener("click", () => {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const current = root.getAttribute("data-theme") || (prefersDark ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.setAttribute("data-theme", next);
  setStoredTheme(next);
});

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Typed role rotation
const roles = ["Flutter Developer", "Dart Frog Learner", "Mobile App Engineer", "Backend Explorer"];
const typedEl = document.getElementById("typedRole");
let roleIndex = 0;
let charIndex = roles[0].length;
let deleting = false;

function tick() {
  const current = roles[roleIndex];
  if (!deleting) {
    charIndex++;
    if (charIndex > current.length) {
      deleting = true;
      setTimeout(tick, 1400);
      return;
    }
  } else {
    charIndex--;
    if (charIndex < 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      charIndex = 0;
    }
  }
  typedEl.textContent = roles[roleIndex].slice(0, charIndex);
  setTimeout(tick, deleting ? 40 : 70);
}
setTimeout(tick, 1200);
