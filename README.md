# 🌐 jainil. — Personal Portfolio Website

> **Jainil Patel** · Full Stack Developer & Data Analyst · Gujarat, India

A premium personal portfolio built with **Next.js**, **GSAP**, and vanilla CSS — featuring buttery-smooth animations, interactive navbar popovers, scroll-triggered sticker effects, and a full resume viewer. Deployed on **Vercel**.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | JavaScript (JSX) |
| Animations | GSAP + ScrollTrigger |
| Smooth Scroll | Lenis (via SmoothScroll component) |
| Video Hero | Vimeo embed |
| Styling | Vanilla CSS + CSS Variables |
| Deployment | Vercel |
| Fonts | Epilogue (900 weight wordmark) |

---

## 📁 Project Structure

```
jainil-website/
├── app/
│   ├── page.jsx              # Home page (hero, services, resume section)
│   ├── layout.jsx            # Root layout + metadata + PageTransitionOverlay
│   ├── globals.css           # Global CSS variables & base styles
│   ├── styles/               # Additional style sheets
│   ├── work/                 # /work and /work/[slug] pages
│   └── certificates/         # /certificates and /certificates/[slug] pages
├── components/
│   ├── Navbar.jsx            # Sticky nav with animated work/cert popovers
│   ├── VimeoHero.jsx         # Full-screen Vimeo video hero section
│   ├── HorizontalWords.jsx   # Horizontal scroll word reveal
│   ├── ServiceCards.jsx      # Interactive stacked service cards
│   ├── Showreel.jsx          # Showreel / reel section
│   ├── DoubleMarquee.jsx     # Dual-direction animated marquee (tech brands)
│   ├── CertificatesSection.jsx # Certificates grid section
│   ├── Footer.jsx            # Footer with stickers, socials, credits pop-out
│   ├── CursorBubble.jsx      # Custom SVG cursor bubble
│   ├── SmoothScroll.jsx      # Lenis smooth scroll wrapper
│   ├── PageTransitionOverlay.jsx # Full-screen page transition scribble
│   ├── TransitionScribble.jsx    # SVG scribble animation
│   ├── MotionCards.jsx       # Motion / tilt cards
│   ├── ScrollVideo.jsx       # Scroll-scrubbed video
│   └── SvgSymbols.jsx        # Shared SVG <defs> symbols
├── lib/
│   ├── data.js               # Brands, service cards, social icons, wiggle config
│   ├── projectsData.js       # All projects with slug, title, tech stack, images
│   └── certificatesData.js   # All certificates with slug, category, images
└── public/
    ├── assets/               # All SVGs (stickers, navbar blobs, cursor, etc.)
    └── resume_jainil.pdf     # Resume file (viewable + downloadable inline)
```

---

## 📄 Pages

### `/` — Home
- **Navbar** with hover-activated project & certificate popovers (GSAP scale-out from blob icon)
- **VimeoHero** — Full-screen background Vimeo video
- **HorizontalWords** — Scroll-linked horizontal text reveal
- **Showreel** section
- **ServiceCards** — 5 interactive stacked cards (brand, social, quick facts, design, what I love) with elastic card-fan hover effect
- **Resume Viewer** — Inline PDF iframe with download button + GSAP pop-in sticker
- **CertificatesSection** — Certificate cards
- **DoubleMarquee** — Dual-direction marquee showcasing: React, Next.js, Node.js, Python, MongoDB, Tailwind CSS, Three.js, JavaScript, Docker
- **Footer** — Location (Gujarat, India), email (`jainil11199@gmail.com`), LinkedIn / Instagram / GitHub, credits pop-out box, footer stickers

### `/work` — All Projects
All projects listed from `lib/projectsData.js`

### `/work/[slug]` — Single Project
Dynamic route for each project detail page

### `/certificates` — All Certificates
All certificates from `lib/certificatesData.js`

### `/certificates/[slug]` — Single Certificate
Dynamic route for each certificate detail

---

## 🎨 Key Design Details

- **Colour palette**: CSS variables (`--color-green`, `--color-darkblue`, `--color-orange`, `--color-maroon`, `--color-pink`, `--color-lightblue`, `--color-lightgreen`, `--color-dark`)
- **Typography**: Epilogue (900 weight) for wordmarks; lowercase aesthetic throughout
- **Wordmark**: `jainil.` — displayed in footer (clamp `5rem`→`15rem`), navbar center, and page title
- **Cursor**: Custom SVG cursor (`/assets/Cursor SVG/cursor-pointer.svg`)
- **Stickers**: Cartoon SVG stickers (smiley, heart, hands, 100, camera, boom, resume) with GSAP scroll-triggered pop-in and cursor velocity push
- **Wiggle system**: Consistent `initWiggle()` function across Navbar and Footer for micro-interaction on hover

---

## ⚙️ Animation Architecture

| Effect | Implementation |
|---|---|
| Navbar popover | GSAP `scale` from blob-icon origin + item stagger |
| Card fan hover | GSAP elastic spread with `elastic.out(1, 0.5)` |
| Footer stickers | ScrollTrigger `back.out(1.7)` + cursor velocity proximity push |
| Credits pop-out | GSAP physical width/height grow (not scale) + text slide-up |
| Resume sticker | ScrollTrigger `back.out(1.7)` with `rotation: 15` |
| Page transitions | SVG scribble overlay (TransitionScribble + PageTransitionOverlay) |
| Marquee underlines | SVG `strokeDashoffset` draw on scroll |
| Smooth scroll | Lenis (SmoothScroll component) |
| Navbar colour | Scroll-position-based `on-dark` / `on-light` class toggling |

---

## 👤 About Jainil

- **Name**: Jainil Patel
- **Email**: jainil11199@gmail.com
- **Location**: Gujarat, India
- **Focus**: Full Stack Development, AI & Machine Learning, UI/UX Design
- **Status**: Open to Opportunities
- **LinkedIn**: [jainil-patel2224](https://www.linkedin.com/in/jainil-patel2224/)
- **Instagram**: [jainilll_2208](https://www.instagram.com/jainilll_2208/)
- **GitHub**: [jainil224](https://github.com/jainil224)

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run local dev server
npm run dev

# Build for production
npm run build
```

> Dev server runs on `http://localhost:3000`

---

## 📦 Deployment

Deployed via **Vercel** (configured via `vercel.json`). Push to `main` triggers automatic deployment.

---

## 📜 Projects Showcase

| Project | Category | Year |
|---|---|---|
| UI Hub Design | UI Design | 2026 |
| Excel Financial Dashboard | Data Analysis | 2024 |
| Care Connect AI | Health Tech | 2026 |
| UI Motion Studio | Motion Design | 2025 |
| Chromatic Color Palette | Design Tool | 2025 |

---

*Design by Jainil · Code by Jainil*
