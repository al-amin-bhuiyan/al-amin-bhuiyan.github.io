# Md. Shobuj — Professional Portfolio

Sleek, world-class developer portfolio built for GitHub Pages deployment. Features a responsive dark-mode cyber design layout, custom scroll-reveal animations, and an interactive developer terminal command-line console.

## 📁 File Structure

```
├── index.html          ← Entry point (GitHub Pages root)
├── css/
│   ├── style.css       ← Design tokens, reset, base styles
│   ├── nav.css         ← Glassmorphic navigation & mobile drawer
│   └── sections.css    ← Terminal console & section-specific styles
├── js/
│   └── main.js         ← Interactive terminal parser, nav scroll, reveal animations
├── assets/
│   ├── photo.png       ← Custom cropped & enhanced professional portrait
│   └── og-image.png    ← Social preview image (1200×630)
└── README.md
```

## 🚀 Deploy to GitHub Pages

1. Create a GitHub repo named exactly: `al-amin-bhuiyan.github.io`
2. Push all these files keeping the folder structure intact
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at: `https://al-amin-bhuiyan.github.io`

## 🖥️ Interactive Terminal Commands
The landing page includes an interactive command terminal console window on desktop and tablet views. You can click inside the terminal window and type standard commands to interact with your CV data:

- `help` - List all available commands.
- `about` - Display a quick introduction text.
- `experience` - Show interactive professional history details.
- `projects` - Summarize the systems and applications built.
- `skills` - List technical skills and architectural competencies.
- `cp` - Show competitive programming profiles and stats.
- `contact` - Display phone number and email address links.
- `clear` - Clear the terminal console output logs.

## ✅ Optimization Checklist

- [x] Interactive Terminal Console (custom JS command-line parsing)
- [x] Mobile-first responsive layout (collapsible responsive design)
- [x] Separate CSS + JS files (modular structure)
- [x] `defer` on all scripts (no render blocking)
- [x] `loading="lazy"` on image tags
- [x] `preconnect` for Google Fonts
- [x] Full SEO meta tags (OG tags, Twitter Card, JSON-LD structured data)
- [x] `aria-*` attributes for accessibility
- [x] `scroll-behavior: smooth` with fallback handling
- [x] IntersectionObserver for scroll-reveal animations
- [x] CSS custom properties for easy variables mapping
- [x] `rel="noopener noreferrer"` on all external links
- [x] `scroll-padding-top` for fixed nav offset heights

## 📱 Tested Browsers
Chrome · Firefox · Safari · Edge · Mobile Chrome · Mobile Safari
