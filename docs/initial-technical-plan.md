# Initial Technical Implementation Plan: Digital Media Agency Website

**Document Type:** Technical Architecture & Implementation Blueprint  
**Target Reference:** [https://www.awakeagency.dev/](https://www.awakeagency.dev/)  
**Environment:** Next.js 16.4.0 (Turbopack), React 19.3.0, TypeScript 5, Tailwind CSS v4, GSAP 3.15, Motion for React 14.2  
**Status:** Planning Stage (Documentation Only — No Code Changes Executed)  

---

## 1. Core Architectural Pillars

### 1.1 Next.js App Router & Hybrid Rendering Model
* **Server Components (RSC):** Default for static layout shells, SEO metadata generation (`generateMetadata`), schema.org JSON-LD structured data, and initial HTML generation.
* **Client Components (`"use client"`):** Dedicated to interactive islands requiring browser APIs:
  * Lenis smooth scrolling coordinator
  * GSAP ScrollTrigger timeline orchestrators (`@gsap/react` with `useGSAP`)
  * Motion for React spring button handlers and layout state capsules
  * Canvas/WebGL hover distortion shader mounts
  * 2D physics simulation for hero dropping coins

### 1.2 Layout & Viewport "Picture Frame" System
The website uses a signature viewport constraint where all content lives inside an enclosed boundary:
```
Window Viewport
┌────────────────────────────────────────────────────────┐
│  --frame: 1.25rem (0.75rem on mobile)                   │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Active Section Card / Panel                     │  │
│  │  border-radius: clamp(1.25rem, 2.22vw, 2rem)     │  │
│  │  padding: var(--inset)                           │  │
│  └──────────────────────────────────────────────────┘  │
│  --gap: var(--frame)                                   │
└────────────────────────────────────────────────────────┘
```
This is achieved cleanly in Next.js via `src/app/layout.tsx` wrapping the application in a fixed framing wrapper with `overflow-x: hidden` and global CSS custom properties.

---

## 2. Component Modular Breakdown

```
src/
├── app/
│   ├── layout.tsx              # Root HTML shell, fonts (Syne + Aeonik), global metadata
│   ├── page.tsx                # Single-page assembly composing all sections
│   ├── projects/
│   │   ├── page.tsx            # Full project catalog & filterable archive
│   │   └── [slug]/page.tsx     # Case study detail template
│   ├── services/
│   │   └── page.tsx            # Comprehensive services overview
│   └── contacts/
│       └── page.tsx            # Standalone inquiry and contact portal
├── components/
│   ├── layout/
│   │   ├── FrameWrapper.tsx    # Global picture frame border coordinator
│   │   ├── Navbar.tsx          # Dual-state navbar (Hero red mode vs. Dev sticky pill)
│   │   ├── MenuOverlay.tsx     # Fullscreen red curtain navigation drawer
│   │   └── Footer.tsx          # 4-column brand footer with live time & back-to-top
│   ├── hero/
│   │   ├── Preloader.tsx       # 0% - 100% counter with morph exit
│   │   ├── HeroStage.tsx       # Monumental display headline & split text mask
│   │   └── FallingCoins.tsx    # 2D Verlet / Matter.js canvas physics simulation
│   ├── statement/
│   │   ├── StatementPanel.tsx  # 3D perspective scroll-scrub flip
│   │   └── BlueprintSvg.tsx    # Technical CAD ribbon & construction grid
│   ├── projects/
│   │   ├── CaseGrid.tsx        # Asymmetric stage & thread ribbon path
│   │   ├── CaseCard.tsx        # Project card with metadata and WebGL hover
│   │   └── ArchiveDeck.tsx     # 3D stacked card deck with interactive row list
│   ├── services/
│   │   ├── ServicesStack.tsx   # ScrollTrigger pinned container
│   │   └── ServiceCard.tsx     # Fanned cards with hardcoded rotation tokens
│   └── cta/
│       ├── CtaBand.tsx         # 2-step inquiry band
│       ├── ServiceReel.tsx     # Vertical rotating slot-machine wheel
│       └── LeadForm.tsx        # Pill inputs and validation state
├── lib/
│   ├── lenis.ts                # Smooth scroll manager and GSAP ticker sync
│   ├── gsap-config.ts          # Centralized GSAP + ScrollTrigger registration
│   └── types.ts                # Strict TypeScript interfaces for projects & services
└── styles/
    └── tokens.css              # Pure CSS design token declarations from :root
```

---

## 3. Technology Integration Strategy

### 3.1 GSAP 3.15 + ScrollTrigger Orchestration
* **Registration:** Consolidated in a single client module to prevent duplicate registrations and SSR hydration mismatches:
  ```ts
  "use client";
  import gsap from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";
  import { useGSAP } from "@gsap/react";

  if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
  }
  ```
* **Lenis Smooth Scroll Synchronization:**
  GSAP's ticker must drive Lenis scroll updates to ensure pixel-perfect sub-frame synchronization during ScrollTrigger scrubs:
  ```ts
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
  ```

### 3.2 Motion for React (`motion/react`)
* Dedicated strictly to localized, interruptible micro-interactions:
  * Sticky navbar slide-down and layout morphing
  * Mobile menu drawer accordion states
  * Bouncy spring taps on buttons (`whileTap={{ scale: 0.94 }}`)
  * Multi-step form step swapping with `AnimatePresence mode="wait"`

### 3.3 Physics Simulation (Dropping Coins)
* A lightweight 2D physics loop (Matter.js or custom Verlet integration in ~80 lines of code) bound to an HTML `<canvas>` positioned behind the hero text.
* Reusable for our own company branding (e.g. customized coins with our logo).

---

## 4. Phase-by-Phase Roadmap

1. **Step 2 (Current):** Design Token Extraction & Verification (Complete verification of all color codes, font files, radii, easings, and media query breakpoints).
2. **Step 3:** Structural Token Implementation (Configuring tokens in CSS and laying out clean, accessible DOM shells).
3. **Step 4:** Motion & Timeline Integration (Lenis smooth scroll, ScrollTrigger pins, and 3D text flip).
4. **Step 5:** Interactive Polish (Physics coins, WebGL distortion hover, slot reel wheel).
5. **Step 6:** Content Adaptation & QA (Replacing Awake references with our digital media agency branding, copy, services, and portfolio case studies).
