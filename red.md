# 🌐 jainil. — Premium Personal Portfolio Website

> **Jainil Patel** · Full Stack Developer & Data Analyst · Gujarat, India

A high-fidelity, premium personal portfolio built with **Next.js**, **GSAP**, and vanilla CSS — featuring buttery-smooth custom scroll-linked animations, interactive navbar popovers, elastic layout shifts, scroll-triggered sticker physics, and a full embedded resume viewer.

---

## 📸 Website Visual Showcase

Here is a visual breakdown of the key layout sections of the website:

<table>
  <tr>
    <td align="center"><b>Header Hero Section</b><br/><img src="https://github.com/user-attachments/assets/195d1543-3e28-4678-8545-567ca9b08767" alt="Header Section" width="100%" /></td>
    <td align="center"><b>MotionCard Section</b><br/><img src="https://github.com/user-attachments/assets/14d46fcf-f5d4-4b32-ac8e-e99eef1e964f" alt="MotionCard Section" width="100%" /></td>
  </tr>
  <tr>
    <td align="center"><b>Interactive Service Cards</b><br/><img src="https://github.com/user-attachments/assets/cb80f406-998e-4853-9ea5-7dec87952117" alt="Service Card Section" width="100%" /></td>
    <td align="center"><b>Double Marquee (Brand Showcase)</b><br/><img src="https://github.com/user-attachments/assets/9ca5af12-5e0b-4b81-954c-1dcb484c671a" alt="Double Marquee Section" width="100%" /></td>
  </tr>
  <tr>
    <td align="center" colspan="2"><b>Footer Section (Interactive Stickers & Credits)</b><br/><img src="https://github.com/user-attachments/assets/1f0c8b9c-50c7-452e-af4c-23cadcdb58c0" alt="Footer Section" width="100%" /></td>
  </tr>
</table>

---

## 🚀 Tech Stack

| Component | Technology | Description |
|---|---|---|
| **Core Framework** | Next.js 14 (App Router) | High-performance React framework for server-side rendering, client transitions, and routing. |
| **Language** | JavaScript (JSX) | Modular, components-driven logic. |
| **Animations** | GSAP + ScrollTrigger | GreenSock Animation Platform to power high-fidelity scroll, hover, and timeline animations. |
| **Smooth Scroll** | Lenis | Integrated with GSAP ticker for seamless physics-based inertia scrolling. |
| **Interactive Video** | Vimeo Hero Player | Full-screen background player rendering Vimeo stream. |
| **Styling** | Vanilla CSS + Variables | A pure CSS design system utilizing CSS Variables—completely free of styling framework overhead. |
| **Fonts** | Epilogue & DM Sans | Self-hosted typography files rendering high-impact headers and body text. |

---

## 📁 Directory Architecture

```text
jainil-website/
├── app/
│   ├── page.jsx                  # Main index landing page
│   ├── layout.jsx                # Layout definitions, root HTML, and metadata
│   ├── globals.css               # Primary styling entry point
│   ├── styles/                   # Section-specific CSS partial files
│   │   ├── base.css              # Custom font declarations, CSS variables, resets
│   │   ├── navbar.css            # Navigation bar and logo styles
│   │   ├── hero.css              # Main section titles and SVG underlines
│   │   ├── vimeo-hero.css        # Vimeo background player configuration
│   │   ├── motion-cards.css      # MotionCard fling grid styles
│   │   ├── showreel.css          # Showreel display layout
│   │   ├── cards.css             # Service card colors and overlays
│   │   ├── marquee.css           # Brand marquee styles
│   │   ├── footer.css            # Footer positioning, credits, and stickers
│   │   ├── cursor.css            # Custom cursor blob styling
│   │   └── responsive.css        # Fluid breakpoints for mobile and tablet views
│   ├── work/                     # Projects lists and dynamic routing ([slug])
│   └── certificates/             # Credentials lists and dynamic routing ([slug])
├── components/
│   ├── Navbar.jsx                # Sticky header with hover popovers
│   ├── VimeoHero.jsx             # Top section background player
│   ├── HorizontalWords.jsx       # Scroll-scrubbed text reveal
│   ├── ServiceCards.jsx          # Stacked service cards with fan-out animation
│   ├── Showreel.jsx              # Custom video showreel section
│   ├── DoubleMarquee.jsx         # Custom dual-direction endless scrolling marquee
│   ├── CertificatesSection.jsx   # Grid of professional credentials
│   ├── Footer.jsx                # Dynamic footer with wiggling elements and stickers
│   ├── CursorBubble.jsx          # SVG cursor-tracker layout
│   ├── SmoothScroll.jsx          # Lenis smooth scroll initializer
│   ├── PageTransitionOverlay.jsx # Fullscreen SVG scribble screen transition
│   ├── TransitionScribble.jsx    # Overlay SVG container
│   ├── MotionCards.jsx           # Physics-based mouse fling cards
│   ├── ScrollVideo.jsx           # Custom video controller mapped to scroll position
│   └── SvgSymbols.jsx            # Reusable SVG symbol templates
├── lib/
│   ├── data.js                   # Static data (social icons, service card config, wiggles)
│   ├── projectsData.js           # Catalog of projects, descriptions, tags, and images
│   └── certificatesData.js       # Catalog of certificates and verification details
└── public/
    ├── assets/                   # Stickers, icons, pointer SVGs
    └── resume_jainil.pdf         # Professional Resume PDF (embed + download)
```

---

## 🎨 Key Features & Animations

### 1. Navbar Work & Certificate Popovers
* **Interactive Blobs:** Left and right navbar controls utilize SVG blobs (`/assets/Navbar SVG/nav-work-blob.svg`) that spin `360deg` on hover using GSAP.
* **Scale-Out Popovers:** The popovers emerge elastically from the exact center of their respective blob icons, staggering the project/certificate listings smoothly.

### 2. Elastic Service Cards (`components/ServiceCards.jsx`)
* **Elastic Spread:** Desktop users hovering over the card deck trigger a physics-based horizontal fan-out using `elastic.out(1, 0.5)`. Nearby cards move aside dynamically to prevent overlapping.
* **Scroll Stack (Mobile):** On mobile viewports, the hover effect disables, and the layout falls back to a clean CSS-flex scrolling layout.

### 3. Interactive Footer Stickers & Proximity Push (`components/Footer.jsx`)
* **Scroll Pop-Up:** Decorative cartoon stickers slide up and rotate elastically (`back.out(1.7)`) as the footer enters the viewport.
* **Cursor Velocity Interaction:** Proximity detection calculates cursor distance and speed. Moving the mouse rapidly past a sticker pushes it away, which then snaps back to its original rotation via GSAP.

### 4. Custom Cursor Follower (`components/CursorBubble.jsx`)
* A custom SVG cursor follows the mouse smoothly using GSAP `quickTo()`. Over interactive sections, the cursor transforms into a bubble displaying contextual copy.

---

## 🚀 Setup & Execution

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run local dev environment:**
   ```bash
   npm run dev
   ```
   *Access local server at `http://localhost:3000`*

3. **Build production bundle:**
   ```bash
   npm run build
   ```

---

## 💼 Featured Projects Catalog

| Project Slug | Specialization | Tech Stack |
|---|---|---|
| **ui-hub-design** | UI/UX Design | React, Next.js, CSS Modules, Figma API |
| **excel-financial-dashboard** | Data Analysis | Excel, VBA, Power Query, Pivot Tables |
| **care-connect-ai** | Health Tech | Next.js, FastAPI, PyTorch, Tailwind CSS |
| **ui-motion-studio** | Motion Design | Next.js, GSAP, Framer Motion, WebGL |
| **chromatic-color-palette** | Web Tooling | React, CSS Variables, LocalStorage |

---

*Design & Code by Jainil Patel*
