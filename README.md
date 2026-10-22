# Evo Hawks — Creative Production & Digital Marketing Agency

<div align="center">

[![Vite](https://img.shields.io/badge/Vite-8.2.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0.2-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-FF1361?style=for-the-badge)](LICENSE)

**"See higher. Move faster. Grow further."**

A state-of-the-art, high-converting digital agency platform engineered with high aesthetic fidelity, kinetic animations, full light/dark theme support, live website customization, secure Super Admin & Staff access controls, and technical SEO architecture.

[**Explore Live Website »**](https://evohawks.tech/)

</div>

---

## 🚀 Key Highlights & Architecture

### 🎨 1. Visual & Interaction Design
- **Signature Jet Black, Cerulean Blue & Neon Rose Palette**: Curated dark mode (`#050508`, `#0099FF`, `#FF1361`) paired with an ultra-clean, high-contrast Light Theme.
- **Asymmetric Creative Stadium Pods**: Distinctive modern curvature geometry (`rounded-[3rem] rounded-tl-lg` and `rounded-[2.5rem] rounded-br-sm`) giving the agency an avant-garde edge.
- **Interactive Micro-Animations**: Kinetic Aurora background glow, spotlight cursor illumination, magnetic buttons, 3D tilt cards, and spring-physics page transitions powered by Framer Motion.
- **Comprehensive Theme Engine**: Persistent theme switching with system preference detection and contrast calibration.

### 🛡️ 2. Security & Access Control
- **Super Admin Root Control**: Dedicated Super Admin portal secured for root credentials (`teamevohawks`) with real-time website customization and portfolio publishing.
- **Agency Staff & Team Access Management**:
  - Internal staff roster with department designation (Engineering, Design, Video, Marketing, Operations).
  - Role-based permissions (`Admin Lead` vs `Staff Member`).
  - Account suspension toggle and access revocation.
  - Built-in cryptographically strong password generator.
- **Brute-Force Rate Limiting**: 5 consecutive failed attempts trigger an automatic 15-minute security lockout with a live countdown cooldown timer.
- **Session Protection**: Cryptographically secure 32-byte tokens (`window.crypto.getRandomValues`) with an automatic 4-hour inactivity session watchdog.
- **Defense in Depth**: Strict XSS input sanitization and production HTTP security headers configured in `vercel.json` (`X-Frame-Options: DENY`, `nosniff`, `HSTS`, `Referrer-Policy`).

### 💼 3. Comprehensive Agency Capabilities
- **12 Specialized Service Disciplines**: Dedicated landing views for Website Development, Shopify E-commerce, Video Production, Meta Ads, SEO, Social Media, Branding, Influencer Marketing, and more.
- **"Work That Speaks" Dynamic Portfolio CMS**: High-resolution showcase with instant category filtering, project detail modals, deliverables breakdown, and live Super Admin publishing.
- **Client Sprint & Deliverables Workspace**: Milestone tracker, deliverable sign-offs, velocity reports, and WhatsApp feedback integration.
- **Interactive Project Intake & Pricing**: 3-step project builder with budget estimator and direct WhatsApp booking schedule integration.

### 🔍 4. Technical SEO & Performance
- **Structured Data (JSON-LD)**: Schema.org `ProfessionalService`, `WebSite`, and `BreadcrumbList` schemas.
- **OpenGraph & Twitter Card Tags**: Social media preview cards with custom brand assets.
- **Crawler Optimization**: `robots.txt` disallows internal dashboard paths while prioritizing public landing routes; XML sitemap with priority weightings.

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| **Core Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vitejs.dev/) with `@vitejs/plugin-react` |
| **Styling** | [Tailwind CSS 4](https://tailwindcss.com/) + Custom Design Tokens |
| **Animations** | [Framer Motion 13](https://framer.com/motion) + Canvas Particle Physics |
| **Iconography** | [Lucide React](https://lucide.dev/) |
| **Linting & Code Quality** | [Oxlint](https://oxc.rs/) |
| **Hosting & Edge Delivery** | [Vercel](https://vercel.com/) / [GitHub Pages](https://pages.github.com/) |

---

## 📂 Project Directory Structure

```text
evohawks/
├── public/                 # Static assets (favicons, CNAME, robots.txt, sitemap.xml)
├── src/
│   ├── components/         # Reusable UI components, hero, navbar, modals, footers
│   │   ├── ui/             # Micro-animation components (BorderBeam, TiltCard, Aurora)
│   │   ├── Navbar.tsx      # Responsive header with theme toggle & portal links
│   │   └── Footer.tsx      # Comprehensive footer with quick links & badges
│   ├── context/            # Global React contexts
│   │   ├── AuthContext.tsx # Secure authentication, staff roster & brute-force limits
│   │   ├── authTypes.ts    # TypeScript definitions for auth, staff & projects
│   │   ├── SiteConfigContext.tsx # Live website customizer state & persistence
│   │   └── ThemeContext.tsx      # Light/Dark mode state engine
│   ├── data/               # Static agency configurations & case study data
│   │   └── agencyData.ts   # Core service definitions, case studies & contact info
│   ├── pages/              # Primary views and portal routes
│   │   ├── HomePage.tsx            # Main landing page
│   │   ├── ServicesPage.tsx        # 12 core service suites
│   │   ├── WorkPage.tsx            # "Work That Speaks" portfolio showcase
│   │   ├── AdminDashboardPage.tsx  # Super Admin & Staff management control center
│   │   ├── ClientDashboardPage.tsx # Authenticated client sprint tracker
│   │   └── LoginPage.tsx           # Rate-limited secure login interface
│   ├── utils/              # Utility functions (security, analytics, sanitization)
│   │   └── security.ts     # XSS sanitization, password generator & crypto tokens
│   ├── App.tsx             # Root application orchestrator & route guards
│   ├── index.css           # Global Tailwind 4 styling & kinetic animations
│   └── main.tsx            # Application entry point
├── vercel.json             # Production rewrites & HTTP security headers
├── vite.config.ts          # Vite configuration with Tailwind CSS plugin
└── package.json            # Scripts & project dependencies
```

---

## ⚡ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ or 20+ recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/shivambangwal9/evohawks.git
   cd evohawks
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```
   Generates an optimized, minified bundle in the `dist/` directory.

5. **Lint and code verification**:
   ```bash
   npm run lint
   ```

---

## 🔒 Security Best Practices

- **Never Commit Secrets**: Do not store sensitive production API keys or credentials in client repository code.
- **Production Backend**: For multi-tenant production deployments with live payments, integrate a managed backend service (e.g. Supabase, AWS Cognito, or Clerk) with PostgreSQL Row-Level Security (RLS).
- **HTTP Headers**: All responses deployed on Vercel automatically inherit strict security policies defined in `vercel.json`.

---

## 📄 License & Ownership

Copyright © 2026 Evo Hawks. All rights reserved.
Developed for internal agency production and client collaboration.
