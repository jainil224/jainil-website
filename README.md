# 🌐 jainil. — Personal Portfolio Website

> **Jainil Patel** · Full Stack Developer & Data Analyst · Gujarat, India
>
> Live Portfolio: [jainilpatel.vercel.app](https://jainilpatel.vercel.app)

A premium, highly interactive portfolio website showcasing projects, skills, and professional credentials. Built using **Next.js 14**, **GSAP (GreenSock)** for smooth animations, and **Vanilla CSS** for a clean, custom design system.

---

## 🎨 Website Visual & Project Showcase

Here are the key projects developed by Jainil Patel featured on the website:

### 🚀 Highlighted Projects

<table>
  <tr>
    <td align="center"><b>UI Hub Design</b><br/>
      <img src="https://res.cloudinary.com/dsn0ks2hl/image/upload/v1782654096/Screenshot_2026-06-28_191111_cygjjd.png" alt="UI Hub Design" width="100%" />
      <br/><i>UI/UX design resource hub for developers.</i>
    </td>
    <td align="center"><b>Care Connect AI</b><br/>
      <img src="https://res.cloudinary.com/dsn0ks2hl/image/upload/v1782655178/Screenshot_2026-06-28_192921_nazv7x.png" alt="Care Connect AI" width="100%" />
      <br/><i>Generative AI-powered health assistant platform.</i>
    </td>
  </tr>
  <tr>
    <td align="center"><b>Excel Financial Dashboard</b><br/>
      <img src="https://res.cloudinary.com/dsn0ks2hl/image/upload/v1782660713/excel-dashboard-BpO9N0Ih_vqcdcn.png" alt="Excel Financial Dashboard" width="100%" />
      <br/><i>Advanced data analysis and business intelligence dashboard.</i>
    </td>
    <td align="center"><b>UI Motion Studio</b><br/>
      <img src="https://res.cloudinary.com/dsn0ks2hl/image/upload/v1782655054/Screenshot_2026-06-28_192717_up9woq.png" alt="UI Motion Studio" width="100%" />
      <br/><i>Showcase of micro-interactions and web animations.</i>
    </td>
  </tr>
</table>

### 🏆 Professional Credentials & Certifications

<table>
  <tr>
    <td align="center"><b>Python for Data Science, AI & Development</b><br/>
      <img src="/certificates/python-ibm-certificate-BUCfCAzv.png" alt="IBM Python Certificate" width="100%" />
      <br/><i>IBM / Coursera</i>
    </td>
    <td align="center"><b>Gemini Certified Student Ambassador</b><br/>
      <img src="/certificates/gemini-certified-student-VSFRbvIU.png" alt="Google Gemini Certificate" width="100%" />
      <br/><i>Google / Gemini Lab</i>
    </td>
  </tr>
  <tr>
    <td align="center"><b>Tech Consulting Virtual Internship</b><br/>
      <img src="/certificates/deloitte-certificate-BYsVzEjk.png" alt="Deloitte Certificate" width="100%" />
      <br/><i>Deloitte / Forage</i>
    </td>
    <td align="center"><b>Data Visualization</b><br/>
      <img src="/certificates/tata-certificate.png" alt="Tata Certificate" width="100%" />
      <br/><i>Tata Group / Forage</i>
    </td>
  </tr>
</table>

---

## 🛠️ Technology Stack

| Layer | Technology | Usage in Portfolio |
|---|---|---|
| **Frontend Framework** | Next.js 14 (App Router) | Core routing, layout structures, and fast server-side loading. |
| **Styling** | Vanilla CSS + CSS Variables | Complete design system with customized color themes, micro-animations, and fluid layouts. |
| **Animations** | GSAP (GreenSock) + ScrollTrigger | Powers interactive page overlays, card fan-outs, cursor followers, and scroll effects. |
| **Smooth Scrolling** | Lenis | Synchronized with GSAP for buttery smooth, inertia-driven page scrolling. |
| **Integrations** | Vimeo Hero | Embedded video background hero section. |
| **Deployment** | Vercel | Seamless integration, automatic updates, and deployment pipelines. |

---

## 📁 Directory Structure

```text
jainil-website/
├── app/
│   ├── layout.jsx               # Main website layout & SEO metadata
│   ├── page.jsx                 # Main homepage landing layout
│   ├── globals.css              # Global styles entry point (imports partials)
│   ├── styles/                  # Modular styles for specific sections
│   │   ├── base.css             # Theme variables, custom fonts, body setups
│   │   ├── navbar.css           # Navigation & logo styles
│   │   ├── cards.css            # Stacked interactive service cards
│   │   ├── marquee.css          # Tech stacks marquee styles
│   │   └── footer.css           # Footer layouts & sticker physics
│   ├── work/                    # Projects section layout and dynamic route ([slug])
│   └── certificates/            # Certificates section and dynamic route ([slug])
├── components/
│   ├── Navbar.jsx               # Sticky nav with project & credential popovers
│   ├── VimeoHero.jsx            # Dynamic video player hero section
│   ├── ServiceCards.jsx         # "Call us if you need" stacked service cards
│   ├── CertificatesSection.jsx  # Grid layout displaying verified certificates
│   ├── Footer.jsx               # Interactive sticker animations, social links & credentials
│   ├── DoubleMarquee.jsx        # Dual-direction infinite text/brand marquee
│   ├── CursorBubble.jsx         # Custom interactive tracking mouse pointer
│   └── SmoothScroll.jsx         # Lenis smooth scrolling config
├── lib/
│   ├── data.js                  # Static configurations, social links, card definitions
│   ├── projectsData.js          # Project descriptions, year, links, and details
│   └── certificatesData.js      # Certifications mapping, skills, and credential IDs
└── public/
    ├── assets/                  # SVG assets, stickers, icons
    └── resume_jainil.pdf        # Viewable and downloadable resume PDF
```

---

## ✨ Features & Interactions

### 1. Project & Certificate Popovers
* Hovering over the Left (**Project**) or Right (**Certificate**) options on the header triggers an animated spin on the SVG blobs using GSAP.
* A popover menu scales out smoothly from the blob origin, letting users jump straight into specific projects or credentials.

### 2. Elastic Service Cards
* The Service Cards component features 5 cards showing Jainil's specialties (Brand Strategy, Social, Quick Facts, Design & Creativity, What I Love).
* Hovering over a card spreads the rest of the deck horizontally using GSAP's elastic easing (`elastic.out(1, 0.5)`).

### 3. Interactive Footer Stickers
* Moving the mouse quickly over the stickers at the footer (smiley, heart, hands, 100, camera, boom) triggers a springy velocity-based reaction that pushes them, after which they snap back into their default rotation.

### 4. Custom Follower Cursor
* A custom pointer tracker displays dynamic contextual labels depending on which section of the website the user is browsing.

---

## ⚙️ How to Run Locally

1. **Install required packages:**
   ```bash
   npm install
   ```

2. **Run local developer server:**
   ```bash
   npm run dev
   ```
   *Site will run on `http://localhost:3000`*

3. **Compile production build:**
   ```bash
   npm run build
   ```

---

## 👤 Developer Profile

* **Name:** Jainil Patel
* **Email:** jainil11199@gmail.com
* **Location:** Gujarat, India
* **LinkedIn:** [jainil-patel2224](https://www.linkedin.com/in/jainil-patel2224/)
* **GitHub:** [jainil224](https://github.com/jainil224)
* **Instagram:** [jainilll_2208](https://www.instagram.com/jainilll_2208/)

---

*Portfolio Designed & Programmed by Jainil Patel.*
