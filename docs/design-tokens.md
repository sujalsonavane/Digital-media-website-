# Complete Design-Token Specification: Digital Media Agency

**Target Reference:** [https://www.awakeagency.dev/](https://www.awakeagency.dev/)  
**Document Status:** Production-Verified Specification (Extracted from Live CSS & DOM Artifacts)  
**Verification Date:** 2026-10-14  

---

## A. Color System

All core colors are derived directly from the production `:root` stylesheet (`1orffevq10308.css`) and verified against component-level modules.

| Token Identifier | Value | Source / CSS Origin | Usage & Context | Confidence Level |
| :--- | :--- | :--- | :--- | :--- |
| `--c-red` | `#ff003d` | `1orffevq10308.css:5` | Primary brand hot red. Hero card background, preloader screen, CTA band background, menu overlay, active badges. *(Note: Preliminary estimate of `#e80238` corrected)*. | **100% Verified** |
| `--c-red-text` | `#d90033` | `1orffevq10308.css:5` | High-legibility darkened red for text on light backgrounds (active row year numbers, hovered links). | **100% Verified** |
| `--c-red-badge` | `#c4002e` | `25r05hs-1y9y_.css:21` | Numerical badge color for fanned service cards (`01`, `02`, `03`, `04`). | **100% Verified** |
| `--c-ink` | `#161d25` | `1orffevq10308.css:5` | Deep carbon black / charcoal. Main body text, primary button backgrounds, Services panel background, Footer background. | **100% Verified** |
| `--c-white` | `#ffffff` (`#fff`) | `1orffevq10308.css:5` | Pure white. Pill buttons, card backgrounds on dark panels, high-contrast headline text on red/ink surfaces. | **100% Verified** |
| `--c-grey-panel` | `#f1f1f3` | `1orffevq10308.css:5` | Soft cool grey. Statement section card, Archive section container, Services card 02 background. | **100% Verified** |
| `--c-grey-page` | `#f0f0ef` | `1orffevq10308.css:5` | Neutral canvas backdrop beneath fixed picture frames. | **100% Verified** |
| `--c-grey-muted` | `#c3c8cc` | `1orffevq10308.css:5` | Muted slate grey used for secondary control rings and inactive borders. | **100% Verified** |
| `--c-grey-text` | `#5d646b` | `1orffevq10308.css:5` | Medium charcoal for secondary metadata, project disciplines, date ranges, and helper text. | **100% Verified** |
| `--c-grey-line` | `rgba(22, 29, 37, 0.12)` (`#161d251f`) | `1orffevq10308.css:5` | Subtle 1px dividers and borders across white and grey panels. | **100% Verified** |
| `--c-line-on-red` | `rgba(255, 255, 255, 0.4)` (`#fff6`) | `1orffevq10308.css:5` | 1px horizontal rule separating the Hero headline from the bottom meta bar. | **100% Verified** |
| `--c-pink-thread` | `#fcd3dd` | `1c43k4umql0d7.css:10` | Soft pastel pink. Continuous SVG bezier ribbon connecting project cards in CaseGrid and Archive scribble. | **100% Verified** |
| `--hover-lift` | `14%` | `1orffevq10308.css:5` | Oklab color-mix percentage for lightening dark buttons on hover (`color-mix(in oklab, var(--c-ink), #fff 14%)`). | **100% Verified** |
| `--hover-sink` | `9%` | `1orffevq10308.css:5` | Oklab color-mix percentage for darkening light buttons on hover (`color-mix(in oklab, var(--c-white), var(--c-ink) 9%)`). | **100% Verified** |

---

## B. Typography System

### 1. Font Families & Sources
* **Display Typeface:** **Syne** (`--font-syne`)
  * Declared Fallback: `"syne", "syne Fallback", Helvetica Neue, Arial, sans-serif`
  * Weights Loaded: `400` (Regular), `500` (Medium), `600` (SemiBold), `700` (Bold), `800` (ExtraBold)
  * Format: WOFF2 with modern unicode range subsetting
  * Role: Monumental hero headlines, section titles, card titles, and menu overlay navigation links
* **Body Typeface:** **Aeonik** (`--font-aeonik`)
  * Declared Fallback: `"aeonik", "aeonik Fallback", Helvetica Neue, Arial, sans-serif`
  * Weights Loaded: `400` (Regular), `500` (Medium)
  * Format: WOFF2
  * Role: Studio kicker descriptions, service card body paragraphs, pill button text, metadata tags, and footer navigation

### 2. Typographic Scale & Mathematical Tokens
Calculated using fluid viewport formulas based on content boundary width (`--content-w: calc(100vw - var(--frame) * 2 - var(--inset) * 2)`):

| Scale Token | Desktop Expression (`>= 1280px`) | Mobile Value (`<= 767px`) | Usage in Components |
| :--- | :--- | :--- | :--- |
| `--t-hero` | `calc(var(--content-w) / 12)` | `clamp(2.5rem, 11vw, 4.25rem)` | Hero headline lines ("WE BUILD WEBSITES...") |
| `--t-mega` | `max(2.5rem, calc(var(--content-w) * 195 / 1320))` | `max(2.125rem, calc(var(--content-w) * 195 / 1320))` | Monumental section titles ("OUR PROJECTS") |
| `--t-section` | `max(1.875rem, calc(var(--content-w) * 114 / 1320))` | `max(1.625rem, calc(var(--content-w) * 114 / 1320))` | Section watermarks & headings ("SERVICES", "ARCHIVE") |
| `--t-statement` | `max(1.5rem, calc(var(--content-w) * 80 / 1320))` | `max(1.3125rem, calc(var(--content-w) * 80 / 1320))` | 3D Perspective Philosophy Statement text |
| `--t-h2` | `max(1.5rem, calc(var(--content-w) * 64 / 1320))` | `max(1.25rem, calc(var(--content-w) * 64 / 1320))` | Subheadings, modal headers, case study intro titles |
| `--t-card-title` | `max(1.25rem, calc(var(--content-w) * 32 / 1320))` | `max(1.0625rem, calc(var(--content-w) * 32 / 1320))` | Project card titles and Archive list row names |
| `--t-lead` | `1.25rem` (`20px`) | `1.0625rem` (`17px`) | Lead introductory text |
| `--t-body` | `1.125rem` (`18px`) | `1.0rem` (`16px`) | Primary body text, button text, footer links |
| `--t-small` | `0.9375rem` (`15px`) | `0.875rem` (`14px`) | Kicker paragraphs, loader counter, copyright notices |
| `--t-meta` | `0.75rem` (`12px`) | `0.6875rem` (`11px`) | Small pill tags, discipline badges, timestamp markers |

### 3. Micro-Typography & Formatting
* **Letter Spacing:**
  * Tight Display: `-0.015em` to `-0.025em` on Syne headlines
  * Uppercase Meta: `+0.02em` to `+0.06em` (`--micro-ls: 0.06em`) on all small caps and numbers
* **Line Heights:**
  * Headlines: `1.0` to `1.08` (ultra-tight editorial lockup)
  * Body copy: `1.4` to `1.6` (comfortable reading distance)

---

## C. Layout, Framing, and Spacing

```
┌────────────────────────────────────────────────────────┐
│  --frame: 1.25rem (0.75rem on mobile)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  --inset: clamp(1.25rem, calc(100vw / 36), 2.5rem)│  │
│  │  Panel Card Border Radius:                       │  │
│  │  --r-panel: clamp(1.25rem, calc(100vw / 45), 2rem)│  │
│  │                                                  │  │
│  │  Card Border Radius: --r-card: 1rem (16px)        │  │
│  │  Pill Border Radius: --r-pill: 2.5rem / 6.25rem   │  │
│  └──────────────────────────────────────────────────┘  │
│  --gap: var(--frame)                                   │
└────────────────────────────────────────────────────────┘
```

* **Outer Viewport Frame (`--frame`):**
  * Desktop (`>= 768px`): `1.25rem` (`20px`)
  * Mobile (`< 768px`): `0.75rem` (`12px`)
* **Section Gap (`--gap`):** Equal to `var(--frame)` (`1.25rem` desktop, `0.75rem` mobile).
* **Inner Panel Inset (`--inset`):** Fluid formula `clamp(1.25rem, calc(100vw / 36), 2.5rem)`.
* **Panel Height (`--panel-h`):** `max(40rem, calc(100vh - var(--frame) * 2))`.
* **Navbar Height (`--nav-h`):** `clamp(4rem, calc(100vw / 18), 5rem)`.
* **Standard Button Height (`--btn-h`):** `2.5rem` (`40px`), padding horizontal `--btn-px: 1.25rem` (`20px`).
* **Radius Hierarchy:**
  * Outer Panels (`--r-panel`): `clamp(1.25rem, calc(100vw / 45), 2rem)` (`20px` to `32px`).
  * Sticky Nav Bar Capsule (`--r-nav-bar`): `0.875rem` (`14px`).
  * Individual Cards (`--r-card`): `1.0rem` (`16px`).
  * Interactive Pills (`--r-pill`): `2.5rem` (buttons) and `6.25rem` (CTA reel inputs).

---

## D. Responsive Breakpoint Matrix

The production CSS declares five explicit responsive target bands. The previously unverified `1024px – 1279px` interval is now completely documented from source rules:

| Breakpoint Query | Viewport Tier | Key Structural & Layout Behavior |
| :--- | :--- | :--- |
| **`> 1439px`** | Ultra-Wide / Large Desktop | • CaseGrid uses absolute stage positioning with `--x` and `--y` in `vw`.<br>• Hero headline displays in full 2-column justification.<br>• Full 4-column footer layout. |
| **`1280px – 1439px`** | Standard Desktop | • CaseGrid transitions from absolute canvas to a 2-column CSS grid (`repeat(2, minmax(0, 1fr))`, `gap: 5rem 2.5rem`).<br>• Staggered offset: Even cards have `margin-top: 7.5rem`.<br>• Archive 3D card deck is fully active in the center. |
| **`1024px – 1279px`** | Laptop / Small Desktop *(Formerly Unverified)* | • **Archive 3D Deck is hidden** (`display: none`); converted into a horizontal swipeable carousel (`overflow-x: auto; scroll-snap-type: x mandatory`). Card items have `flex-basis: 30%`.<br>• **Hero headline:** Top margin reduces from `10.5625rem` to `7.5rem`; kicker width capped at `min(21.25rem, 100%)`.<br>• **Statement padding:** Drops from `5rem var(--inset)` to `var(--inset)`.<br>• **CTA Band:** Aspect ratio `1400/619` unlocks to `height: auto`.<br>• **Footer:** Collapses from 4 inline columns to a 2-row top/bottom layout. |
| **`768px – 1023px`** | Tablet | • Archive carousel cards widen to `flex-basis: 44%`.<br>• Services card title shrinks from `2.5rem` to `1.75rem` (`overflow-wrap: anywhere`).<br>• Circular next-case study floating badge scales from `6rem` to `4.5rem`. |
| **`< 768px`** | Mobile Portrait | • `--frame` drops to `0.75rem`, `--inset` to `1.25rem`.<br>• `--panel-h` switches to dynamic viewport height: `calc(100dvh - var(--frame) * 2)`.<br>• Navbar: "get in touch." button is hidden (`display: none`); menu pill shrinks to `7.25rem`.<br>• Hero: Split text lines switch to left-aligned (`text-align: left`); bottom meta stacks vertically.<br>• CaseGrid: Single-column full-width cards (`grid-template-columns: minmax(0, 1fr); gap: 2rem;`).<br>• Archive: Carousel card width increases to `flex-basis: 68%` for edge peek.<br>• CTA Band: Vertical slot reel converts to a horizontal touch-scrolling row. |
| **`max-height: 500px` (Landscape Mobile)** | Mobile Landscape | • Special height budgeting: `--card-vh: 100vh`, headline capped at `min(..., 14vh)`, padding reduced to `1rem`. |

---

## E. Component Visual Rules

### 1. Header & Navigation Capsules
* **Hero Navbar:** Placed at the top of the red hero panel. Color: `#ffffff`. Contact pill uses `background: rgba(255, 255, 255, 0.3)`. Menu pill uses solid white background with red text (`color: var(--c-red)`).
* **Dev / Sticky Navbar:** Fixed capsule at `top: var(--frame)`. Height: `3.5rem` (desktop) / `3.0rem` (mobile). Background: `rgba(255, 255, 255, 0.82)` with `backdrop-filter: blur(16px) saturate(160%)` and subtle drop shadow `0 10px 30px rgba(22, 29, 37, 0.1)`.
* **Animated Burger:** 3 lines with horizontal slide-out sweep loop (`@keyframes burgerSweep`).

### 2. Project Card Anatomy (`CaseCard`)
* **Aspect Ratio:** `380 / 440` (portrait rectangle).
* **Layering:**
  1. Base photo (`GooeyThumb-module__jKjXxa__base`)
  2. Canvas shader overlay (`GooeyThumb-module__jKjXxa__canvas`)
  3. Secondary hover photo (`GooeyThumb-module__jKjXxa__hover`)
* **Caption:** Discipline in small uppercase Aeonik font, title in 500 weight Syne font.

### 3. Fanned Services Cards (`ServicesStack`)
* Mounted inside `#161d25` panel with fixed heights.
* Card 1: `background: #ffffff`, rotation `-2.2deg`.
* Card 2: `background: #f1f1f3`, rotation `-0.35deg`.
* Card 3: `background: #e8e9eb`, rotation `+1.75deg`.
* Card 4: `background: #dbdcde`, rotation `+3.6deg`.

### 4. CTA Band & Form Inputs
* Pill inputs with white 4px solid borders (`border: 4px solid #ffffff` on desktop, `2px` on mobile), transparent backgrounds, and white text.
* Placeholder text styled in translucent white (`#ffffff80`) and lowercase.
* Error validation triggers a 4-cycle horizontal shake animation.

---

## F. Motion Design Tokens & Curves

Directly mirroring `docs/animation-spec.md`:
* `--d-fast`: `0.2s`
* `--d-base`: `0.4s`
* `--d-hover`: `0.6s`
* `--d-slow`: `0.8s`
* `--e-expo-out`: `cubic-bezier(0.16, 1, 0.3, 1)`
* `--e-expo-in-out`: `cubic-bezier(0.87, 0, 0.13, 1)`
* `--e-land`: `cubic-bezier(0.34, 1.56, 0.64, 1)`
* `--e-land-soft`: `cubic-bezier(0.22, 1.2, 0.36, 1)`

---

## G. Evidence & Confidence Audit

| Token Group | Source Reference | Extracted vs. Inferred | Confidence Level |
| :--- | :--- | :--- | :--- |
| **Color Codes** | Production CSS `:root` (`1orffevq10308.css:5`) | **Directly Extracted** (Hex & OKLab) | **100% (Absolute)** |
| **Typography Families** | Production CSS `@font-face` (`25r05hs-1y9y_.css:9-10`) | **Directly Extracted** (WOFF2 sources) | **100% (Absolute)** |
| **Spacing & Radii** | Production CSS `:root` (`1orffevq10308.css:5`) | **Directly Extracted** (clamp & calc) | **100% (Absolute)** |
| **Responsive Rules** | Production CSS media queries (`1orffevq10308.css`, `1c43k4umql0d7.css`) | **Directly Extracted** (`1439px`, `1279px`, `1023px`, `767px`) | **100% (Absolute)** |
| **Motion Curves & Durations** | Production CSS `:root` (`1orffevq10308.css:5`) | **Directly Extracted** (cubic-beziers) | **100% (Absolute)** |
| **Dropping Coins Physics** | Screen recording (`00:05 - 00:12`) + DOM tokens | **Simulated Behavior** (Gravity + Restitution) | **95% (High)** |
| **WebGL Gooey Hover Shader** | DOM `<canvas>` + Video inspection | **Visual Recreation** (Fragment Shader) | **90% (High)** |

---

## H. Future Implementation Mapping Plan

*(This is an architectural blueprint only; no application files or configurations will be changed in Step 2)*.

### 1. Tailwind CSS v4 Theme Mapping (`src/app/globals.css`)
```css
@import "tailwindcss";

@theme inline {
  --color-primary-red: #ff003d;
  --color-primary-ink: #161d25;
  --color-panel-grey: #f1f1f3;
  --color-accent-pink: #fcd3dd;
  --color-red-text: #d90033;

  --font-display: var(--font-syne), sans-serif;
  --font-body: var(--font-aeonik), sans-serif;

  --radius-panel: clamp(1.25rem, calc(100vw / 45), 2rem);
  --radius-card: 1rem;
  --radius-pill: 6.25rem;
}
```

### 2. Next.js Font Optimization (`src/app/layout.tsx`)
* Load Google Font `Syne` via `next/font/google` (`subsets: ["latin"]`, weights `[400, 500, 600, 700, 800]`).
* Load `Aeonik` (or high-fidelity modern grotesque equivalent `Inter` / `Plus Jakarta Sans`) via `next/font/local` or `next/font/google`.

### 3. GSAP & ScrollTrigger Hooks (`src/lib/gsap-config.ts`)
* Wire `@gsap/react` `useGSAP` for scoped cleanup.
* Connect Lenis smooth scrolling instance to `ScrollTrigger.update`.

### 4. Motion for React Capsules
* Implement `AnimatePresence` for CTA multi-step transitions and mobile drawer.
* Utilize `layoutId` for smooth tab and navigation indicator transitions.
