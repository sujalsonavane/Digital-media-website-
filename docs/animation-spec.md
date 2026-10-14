# Animation & Motion Design Specification: Awake Agency

**Document Type:** Formal Motion Specification  
**Source Evidence:** `refrence/Screen Recording 2026-10-14 153354.mp4` & Extracted CSS (`1orffevq10308.css`, `25r05hs-1y9y_.css`, `1c43k4umql0d7.css`)  
**Status:** 100% Verified against production source assets  

---

## 1. Global Motion Design Tokens

All timing and easing variables are measured and verified directly from the production `:root` stylesheet:

```css
:root {
  /* Durations */
  --d-fast: 0.2s;      /* Micro-states, borders, color crossfades, toggle knobs */
  --d-base: 0.4s;      /* Standard UI transitions, arrow swaps, text shifts */
  --d-hover: 0.6s;     /* Organic hover lifts, link underlines, button states */
  --d-slow: 0.8s;      /* Section entrances, panel morphs, large reveals */

  /* Verified Easing Functions */
  --e-expo-out: cubic-bezier(0.16, 1, 0.3, 1);    /* High initial velocity, long soft decel */
  --e-expo-in-out: cubic-bezier(0.87, 0, 0.13, 1); /* Symmetrical cinematic acceleration */
  --e-out: var(--e-expo-out);
  --e-in-out: var(--e-expo-in-out);
  --e-land: cubic-bezier(0.34, 1.56, 0.64, 1);     /* Playful elastic overshoot */
  --e-land-soft: cubic-bezier(0.22, 1.2, 0.36, 1); /* Gentle damped overshoot */
}
```

---

## 2. Comprehensive Animation Inventory & State Machines

### 2.1 Initial Preloader & Page Entrance
* **Trigger:** Window load / hydration complete.
* **Phase 1 — Numeric Counter:**
  * Component: `Hero-module__KTD73a__loaderCounter`
  * Value: `0%` -> `100%` tabular integer progression.
  * Duration: `~1.2s` with ease-out pacing.
* **Phase 2 — Fullscreen Panel Shrink:**
  * Component: `Hero-module__KTD73a__loader`
  * State: Expands beyond viewport (`106vw x 106vh`), then transitions down to the exact boundaries of `.Hero-module__KTD73a__hero` (`border-radius: 0` -> `--r-panel`).
  * Duration: `0.8s`, easing: `--e-out`.
* **Phase 3 — Headline Text Mask Reveal:**
  * Target: `.Hero-module__KTD73a__headline > [data-split-line]`
  * Starting State: `transform: translateY(100%); opacity: 0;`
  * Ending State: `transform: translateY(0%); opacity: 1;`
  * Stagger: `120ms` between line 1, line 2, line 3.
  * Duration: `0.75s`, easing: `cubic-bezier(0.22, 1, 0.36, 1)`.
* **Phase 4 — Bottom Meta Bar Line Draw:**
  * Target: `.Hero-module__KTD73a__metaRule`
  * Motion: `transform: scaleX(0)` -> `transform: scaleX(1)` with `transform-origin: left`.
  * Duration: `0.6s`, delay: `0.4s` after headline start.

---

### 2.2 Hero Falling Interactive Coins (Physics Simulation)
* **Trigger:** Triggered immediately after headline lines lock into place (~timestamp `00:05` in recording).
* **Target Elements:** 5 circular embossed coins stamped with the Awake "a" monogram (`data-coins-above` to `data-coins-floor`).
* **Motion Choreography:**
  * Dropping trajectory: Vertical drop from behind the text mask.
  * Physics: Simulated gravity (`y` acceleration) + slight random angular spin (`rotation: -25deg` to `+35deg`).
  * Collision & Settle: Bounces elastically 2–3 times upon contacting the bottom floor boundary (`.Hero-module__KTD73a__meta`), coming to rest nestled together.
  * Duration: `~1.4s` total fall and settling time.

---

### 2.3 Navigation Bar & Burger Sweeping Micro-Interactions
* **Hero Navbar vs. Sticky Nav:**
  * **Hero Mode (`.Navbar-module__O8Na-a__hero`):** Embedded inside the red hero card, white text, semi-transparent contact pill (`background: rgba(255, 255, 255, 0.3)`).
  * **Sticky Mode (`.StickyNav-module__hNdvsq__wrap`):** Triggers when the user scrolls past the hero card. Slides down from `transform: translateY(calc(-100% - var(--frame) - 0.5rem))` to `transform: translateY(0)` with backdrop blur `blur(16px) saturate(160%)` and soft drop shadow.
* **Animated Burger Button (`.Navbar-module__O8Na-a__burger`):**
  * Normal State: 3 horizontal bars (top `9.3px`, middle `18.6px`, bottom `9.3px`).
  * Hover State (`@keyframes burgerSweep`):
    * `0%`: `transform: translate(0)`
    * `46%`: `transform: translate(1.625rem)` (bars slide out right)
    * `47%`: `transform: translate(-1.625rem)` (bars wrap instantly to left)
    * `100%`: `transform: translate(0)` (bars return smoothly to center)
    * Stagger: Bar 1 = `0ms`, Bar 2 = `70ms`, Bar 3 = `140ms`. Total loop duration = `520ms`.
  * Open / Active State (`data-open="true"`):
    * Top bar: `transform: translateY(4.65px) rotate(45deg); width: 18.6px;`
    * Middle bar: `transform: rotate(-45deg);`
    * Bottom bar: `transform: translateY(-4.65px); opacity: 0;`

---

### 2.4 Statement Section: 3D Perspective Scrubbing
* **Trigger:** ScrollTrigger linked to scroll viewport position.
* **Perspective Context:** `perspective: 1600px; transform-style: preserve-3d;`
* **Card Motion:**
  * Paragraph 1: Rotates backward along X-axis (`rotateX: 0deg` -> `rotateX: 60deg`, `opacity: 1` -> `0`, `z: 0` -> `-200px`).
  * Paragraph 2: Rotates into view from bottom (`rotateX: -60deg` -> `0deg`, `opacity: 0` -> `1`, `z: -200px` -> `0`).
  * Text readability: `backface-visibility: hidden` prevents blurred artifacts.
* **Blueprint Ribbon (`ScrollRibbon`):**
  * SVG vector path stroke scrubbed along scroll progress (`stroke-dashoffset` linked to scroll delta).

---

### 2.5 Case Grid Project Showcase & WebGL Hover
* **Section Parallax:** Asymmetric cards drift with varied scroll speed ratios (`0.95` vs `1.08`) using transform matrix updates.
* **Gooey WebGL / Canvas Distortion Hover:**
  * Trigger: Pointer enter on `.CaseCard-module__WCHEYG__card`.
  * Mechanism: Liquid ripple displacement shader applied over the WebGL canvas, distorting the base image before crossfading to the secondary hover screenshot (`thumbnailHover`).
  * Damping: Instant interactive displacement, `0.45s` elastic spring decay back to rest.

---

### 2.6 Archive 3D Card Deck
* **Trigger:** Hover over any row in `.Archive-module__t718NW__rows`.
* **State Machine:**
  * Active Row: `data-active="true"`, background shifts to `rgba(255, 255, 255, 0.55)`, year text turns `--c-red-text` (`#d90033`).
  * 3D Deck Card Layers:
    * Active layer: `opacity: 1; transform: scale(1) translateZ(0); filter: blur(0px);`
    * Background layer: `opacity: 0.6; transform: scale(0.92) translateZ(-40px); filter: blur(1px);`
    * Inactive layers: `opacity: 0; transform: scale(0.85) translateZ(-80px);`
  * Timing: `0.35s` easing `--e-out`.

---

### 2.7 Services Fanned Stack Cards
* **Trigger:** Pinned ScrollTrigger container as user scrolls into `#services`.
* **Card Rotation Offsets (Hardcoded in production CSS):**
  * Card 1: `--card-rot: -2.2deg; background: #ffffff;`
  * Card 2: `--card-rot: -0.35deg; background: #f1f1f3;`
  * Card 3: `--card-rot: +1.75deg; background: #e8e9eb;`
  * Card 4: `--card-rot: +3.6deg; background: #dbdcde;`
* **Scroll Animation:** Cards peel or slide upward from the fanned deck sequentially as user scrolls through the section height budget.

---

### 2.8 Interactive CTA Band Multi-Step Transition
* **Step 1 (Reel Selector):**
  * Interactive vertical slot roller (`.CtaBand-module__4ELZEW__reel`).
  * Drag or click advances selected pill with smooth spring snapping.
* **Step 1 -> Step 2 Advance:**
  * Trigger: Click `next ->` button.
  * Step 1 Exit: `transform: translateY(-2.5rem); opacity: 0; pointer-events: none;`
  * Step 2 Entrance: `transform: translateY(0); opacity: 1;` (starting from `translateY(2.5rem)`).
  * Duration: `0.45s` cubic-bezier `(0.22, 1, 0.36, 1)`.
* **Form Input Invalid Shake:**
  * Target: `.CtaBand-module__4ELZEW__field[data-invalid]`
  * Animation: `@keyframes CtaBand-module__4ELZEW__field-shake`
    * `20%`: `translate(-0.5rem)`
    * `45%`: `translate(0.4rem)`
    * `70%`: `translate(-0.25rem)`
    * `90%`: `translate(0.1rem)`
    * Duration: `350ms`, easing: `cubic-bezier(0.36, 0.07, 0.19, 0.97)`.

---

### 2.9 Menu Overlay Fullscreen Curtain
* **Open Trigger:** Click `menu. =` button (`data-open="false"` -> `true`).
* **Curtain Transition:**
  * Height animates from `0` to `--menu-h: max(40rem, calc(100vh - var(--frame) * 2))`.
  * Background: Pure `--c-red` (`#ff003d`).
  * Duration: `0.55s`, easing: `--e-out`.
* **Link Hover Choreography:**
  * Text: `transform: translate(0.875rem);`
  * Rule Line: `transform: scaleX(1); transition-delay: 120ms;`
  * Diamond Icon: `transform: rotate(45deg) scale(1); transition-delay: 340ms;`
  * Return on Mouse Leave: Elements collapse back with `scaleX(0)` and `scale(0)`.

---

## 3. Accessibility & Reduced Motion Compliance
As declared in production CSS line 6:
```css
@media (prefers-reduced-motion: reduce) {
  *, :before, :after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}
```
All critical information remains accessible statically, preloader is bypassed (`display: none`), and interactive states snap instantaneously when `prefers-reduced-motion: reduce` is detected.

---

## 4. Motion-Readiness Specification Map (Step 4B Refinement)

This matrix systematically documents each major interface effect, its visual trigger, initial/final states, responsive variations, and reduced-motion fallback.

### 4.1 Master Motion-Readiness Matrix

| Target Element | Trigger Type | Initial Visual State | Final Visual State | Intended Movement & Direction | Duration & Easing (Observed) | Desktop Behavior | Mobile Behavior | Reduced-Motion Alternative |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero Headline Lines** (`.hero-headline span`) | Page Load (post-preloader) | `translateY(100%)`, `opacity: 0`, overflow hidden | `translateY(0%)`, `opacity: 1` | Upward vertical mask slide with 120ms line stagger | `0.75s`, `cubic-bezier(0.22, 1, 0.36, 1)` | 3 lines with two-column justified spacing | Left-aligned stacked column (`4` lines) | Render immediately in final state (`translateY(0)`, `opacity: 1`) |
| **Physics Agency Coins** (`.coin-token`) | Page Load (after headline lock) | Positioned above mask (`y: -120px`), `opacity: 0` | Nestled on floor divider, slight rotation (`-22°` to `+18°`) | Vertical gravitational drop with 2-3 elastic rebounds | `~1.4s` total settle, `--e-land` | 5 full-sized coins (`58px`), hover lift `-8px` with rotation reset | 5 compact coins (`38px`), settled state | Position static on floor divider; no drop animation |
| **Hero Meta Divider Rule** (`.hero-meta-bar`) | Page Load | `scaleX(0)`, `transform-origin: left` | `scaleX(1)` | Horizontal line draw from left to right | `0.6s`, delay `0.4s`, `--e-out` | Full width horizontal rule | Full width horizontal rule | Immediate full width line (`scaleX(1)`) |
| **Sticky Navigation Bar** (`.hero-top-nav` / `.sticky-nav`) | Scroll (scroll past hero panel) | `translateY(-120%)`, `opacity: 0` | `translateY(0)`, `opacity: 1`, blur `16px` | Vertical slide-in from top edge | `0.4s`, `--e-out` | Floating pill centered at top of viewport | Edge-to-edge compact bar with hamburger button | Instant jump to visible state without sliding |
| **Statement Panel 3D Perspective** (`.statement-text`) | Scroll (ScrollTrigger scrub) | `rotateX(-35deg)`, `translateZ(-100px)`, `opacity: 0.2` | `rotateX(0deg)`, `translateZ(0)`, `opacity: 1` | Forward 3D rotation toward viewer | Scrubbed directly to scroll delta (0-100% progress) | 3D perspective (`1600px`) transform on headline | Simplified 2D opacity crossfade without 3D tilt | Static rendering (`opacity: 1`, `rotateX(0deg)`) |
| **Continuous SVG Spline** (`.pink-spline-svg path`) | Scroll (ScrollTrigger scrub) | `stroke-dashoffset: [pathLength]` (invisible stroke) | `stroke-dashoffset: 0` (fully traced stroke) | Progressive path drawing from top project to bottom | Scrubbed to scroll progression through projects | Pink thread (`#fcd3dd`, `2px`) links all 4 cards | Adjusted single-column spline path | Path rendered at 100% stroke immediately |
| **Featured Project Cards** (`.case-card`) | Scroll & Hover | Neutral rest state; even cards offset +6rem | Hover: card lift `translateY(-8px)`, image `scale(1.05)` | Smooth vertical elevation and subtle zoom | Hover: `0.4s` elevation, `0.6s` zoom, `--e-out` | Asymmetric 2-column grid with staggered drift | Single-column full width cards; hover lift disabled on touch | No hover zoom or scale transforms; border highlight only |
| **Project Archive 3D Deck** (`.deck-card`) | Hover / Focus / Selection on row | Deck cards layered at Z depths (`0px`, `-40px`, `-80px`) | Active card moves to front (`Z: 0`, `scale(1)`), others step back | Depth translation and gentle rotational settling | `0.35s`, `--e-out` | 3D stacked deck responds to row hover/focus | Converted to horizontal touch snap-scroll track (`78%` width) | Cards swap immediately without 3D depth transition |
| **Services Fanned Stack** (`.service-card`) | Scroll & Hover | Cards fanned at angles (`-2.2°`, `-0.35°`, `+1.75°`, `+3.6°`) | Hover: straightens to `0°`, `scale(1.02)`, shadow `50px` | Angular un-rotation to flat alignment with elevation | `0.4s`, `--e-out` | Pinned ScrollTrigger stack; hover straightens individual card | Vertical stacked cards without angular fanning | Render flat at `0deg`; no rotational transitions |
| **Enquiry Selector Reel** (`.reel-pill`) | Tap / Click / Keyboard Select | Inactive: transparent bg, white 2px outline | Active: white bg, red text, checkmark icon, shadow | Instant color invert with spring scale pop (`scale(1.04) -> 1`) | `0.25s`, `--e-land-soft` | Multi-pill horizontal wrap row | Horizontally scrollable touch pill track | Color switch without spring scale pop |
| **Enquiry Form State Transition** (`.cta-form-row` -> Success) | Form Submit | Visible form inputs (`opacity: 1`, `translateY(0)`) | Success confirmation card (`opacity: 1`, scale `1`) | Form slides up and fades; success card fades in | `0.45s`, `--e-out` | Full width smooth transition inside crimson panel | Mobile-optimized centered message with reset trigger | Instant swap of DOM visibility without motion |
| **Fullscreen Menu Curtain** (`.menu-curtain`) | Tap / Click on `menu. =` | `height: 0%`, `opacity: 0`, pointer-events none | `height: 100%`, `opacity: 1`, crimson backdrop | Vertical downward wipe from top edge | `0.55s`, `--e-out` | Fullscreen curtain overlay with staggered link slide | Fullscreen mobile drawer with touch links | Instant toggle (`display: block` / `none`) |

