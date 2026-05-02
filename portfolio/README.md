# Md. Shobuj — Portfolio

Flutter Developer portfolio built for GitHub Pages deployment.

## 📁 File Structure

```
portfolio/
├── index.html          ← Entry point (GitHub Pages root)
├── css/
│   ├── style.css       ← Design tokens, reset, base styles
│   ├── nav.css         ← Navigation (desktop + mobile drawer)
│   └── sections.css    ← All section-specific styles
├── js/
│   └── main.js         ← Nav scroll, reveal animations, interactions
├── assets/             ← Add your photo here as photo.webp
│   └── og-image.png    ← Social preview image (1200×630)
└── README.md
```

## 🚀 Deploy to GitHub Pages

1. Create a GitHub repo named exactly: `yourusername.github.io`
2. Upload all these files keeping the folder structure intact
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Your site will be live at: `https://yourusername.github.io`

## ✏️ Customizations Before Deploying

### 1. Update URLs (in `index.html`)
- Replace all `yourusername` with your actual GitHub username
- Replace `your-linkedin` with your actual LinkedIn handle

### 2. Add your photo
- Add a photo as `assets/photo.webp` (recommended: 400×400px, compressed)
- In `index.html`, replace the avatar `<div>` block with:
```html
<img
  src="assets/photo.webp"
  alt="Md. Shobuj — Flutter Developer"
  width="200" height="200"
  loading="lazy"
/>
```

### 3. Add OG image
- Create `assets/og-image.png` (1200×630px) for social sharing previews

### 4. Update canonical URL
Change the `<link rel="canonical">` tag to your actual URL.

## ✅ Optimization Checklist

- [x] Mobile-first responsive design
- [x] Separate CSS + JS files (modular)
- [x] `defer` on all scripts (no render blocking)
- [x] `loading="lazy"` on images
- [x] `preconnect` for Google Fonts
- [x] Full SEO meta tags (OG, Twitter Card, structured data)
- [x] `aria-*` attributes for accessibility
- [x] `scroll-behavior: smooth` + polyfill for Safari
- [x] IntersectionObserver for scroll reveal
- [x] Cross-browser compatible CSS (vendor prefixes where needed)
- [x] `rel="noopener noreferrer"` on all external links
- [x] `scroll-padding-top` for fixed nav offset
- [x] CSS custom properties for easy theming

## 🖥️ Tested Browsers
Chrome · Firefox · Safari · Edge · Mobile Chrome · Mobile Safari
