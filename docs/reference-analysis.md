# Reference Analysis: Awake Agency (www.awakeagency.dev)

**Document Type:** Technical & Visual Architecture Analysis  
**Stage:** Step 1 & Step 2 Reference Reverse-Engineering  
**Source Website:** [https://www.awakeagency.dev/](https://www.awakeagency.dev/)  
**Primary Assets Analyzed:**
- `refrence/Screen Recording 2026-10-14 153354.mp4` (Duration: 99.27s, 1912x964, 30fps)
- `refrence/source code` (171.8 KB full SSR HTML and metadata dump)
- Live CSS chunks: `1orffevq10308.css` (global tokens), `25r05hs-1y9y_.css` (component tokens), `1c43k4umql0d7.css` (hero & grid layout)

---

## 1. Executive Summary & Brand Positioning
Awake Agency is a Warsaw-based creative digital production studio specializing in high-end brand identity, Webflow development, Next.js architecture, and cinematic motion design. The website design communicates boldness, technical mastery, and tactile physicality.

Key defining traits:
1. **The "Picture Frame" Metaphor:** The viewport is not edge-to-edge; instead, a persistent outer border (`--frame: 1.25rem` desktop, `0.75rem` mobile) frames floating, rounded panel cards (`--r-panel: clamp(1.25rem, 2.22vw, 2rem)`).
2. **High-Voltage Color Blocking:** A signature hot crimson red (`--c-red: #ff003d`), deep ink charcoal (`--c-ink: #161d25`), off-white panel grey (`--c-grey-panel: #f1f1f3`), and crisp white (`#ffffff`).
3. **Editorial Typography:** Monolithic, tight-set display headlines using **Syne** (`--font-display`), contrasted with an ultra-clean, technical grotesque **Aeonik** (`--font-body`).
4. **Physicality & Play:** Interactive falling gravity coins, 3D card decks that respond to hover, smooth horizontal reel wheels, and fluid WebGL hover distortion.

---

## 2. Page Hierarchy & Section Breakdown

### 2.1 Preloader & Initial Loading Sequence (`Hero-module__KTD73a__loader`)
- **Structure:** Fullscreen overlay (`106vw x 106vh` with negative margin to guarantee complete viewport coverage) in primary red (`#ff003d`).
- **Counter:** A tabular numeral counter (`0%` to `100%`) positioned at the bottom-left (`place-items: end start`), scaling with `--t-small` font.
- **Exit Motion:** Upon reaching 100%, the overlay morphs / scales down into the hero panel boundaries, revealing the headline elements with staggered clip-path reveals.
- **Failsafe:** An automatic 6-second CSS animation fallback (`loaderFailsafe`) ensures the preloader disappears even if client-side hydration stalls.

### 2.2 Hero Stage (`Hero-module__KTD73a__hero`)
- **Container:** Rounded panel with height `--hero-h: max(40rem, calc(100vh - var(--frame) * 2))`.
- **Navigation Slot:**
  - Left: Logo `awake.` (SVG glyph with 6 custom clip paths).
  - Right: Action pills (`get in touch.` + `menu. =`).
- **Main Headline:**
  - Split into three lines:
    1. Line 1: `WE BUILD` (spread across two columns via `data-split-line="justify"`).
    2. Line 2: `WEBSITES PEOPLE` (spread across columns).
    3. Line 3: `REMEMBER.` (aligned start).
  - Fluid sizing: `--t-hero: calc(var(--content-w) / 12)`.
- **Kicker Body:** Right-aligned paragraph (`width: 18.6875rem`, `margin: -4.75rem 0 0 auto`, opacity `0.8`).
- **Physics Tokens (Dropping Coins):** 5 circular embossed tokens with the letter "a" drop from behind the text, bounce elastically, and settle above the divider rule.
- **Meta Bar:** Bottom flex row separated by a 1px rule (`--c-line-on-red: #fff6`).
  - Left: `BASED IN: WARSAW 12:02 • 8°C` (live time & temperature data).
  - Right: `SAY HELLO: CONTACT@AWAKEAGENCY.DEV` (interactive mailto with hover slide).

### 2.3 Statement / Philosophy Section (`Statement-module__6Nrrla__statement`)
- **Container:** Off-white card (`background: var(--c-grey-panel)` / `#f1f1f3`), `min-height: var(--panel-h)`.
- **Background Blueprint:** Technical vector ribbon graphic (`ScrollRibbon`) featuring CAD construction lines, control nodes, and bezier curves with faint opacity (`0.12` to `0.3`).
- **3D Perspective Text:**
  - Container perspective set to `1600px` (`perspective: 1600px; transform-style: preserve-3d;`).
  - Two sequential statements that flip and transition on the X-axis during scroll scrub.
  - Text: *"We design and build websites, brand systems, and digital products that work as hard as they look. Whether you're launching a product, rebuilding a brand, or replacing a tired site, one team takes it from sketch to live build."*

### 2.4 Case Grid / Featured Projects (`CaseGrid-module__tbWBJq__section`)
- **Heading:** Monumental centered title `OUR PROJECTS` (`--t-mega: max(2.5rem, calc(var(--content-w) * 195 / 1320))`).
- **Layout Paradigm:** Asymmetric absolute stage (`height: 121.458vw`) on desktop (`> 1439px`), switching to a 2-column staggered grid on medium screens (`<= 1439px`), and a 1-column stack on mobile (`<= 767px`).
- **Thread Line:** Continuous pink SVG bezier spline (`stroke: #fcd3dd`, `stroke-width: 1.25px`) meandering between the project cards.
- **Card Anatomy:**
  - Thumbnail container: Aspect ratio `380 / 440`.
  - Base image + hover image + WebGL canvas (`GooeyThumb-module__jKjXxa__canvas`).
  - Meta caption: Discipline (`Development` or `Branding`) and Project Title (`Mihailove`, `Frame`, `Portfolio Ventures`, `Manypixels`).

### 2.5 Archive Deck (`Archive-module__t718NW__section`)
- **Heading:** `ARCHIVE` in uppercase neutral black.
- **Desktop Architecture:**
  - Left/Center: A fixed 3D card stack (`Archive-module__t718NW__deck`, `width: 270px; height: 330px;`).
  - Right: Interactive row list (`Archive-module__t718NW__rows`).
  - Interaction: Hovering any project row activates the row (`data-active="true"`), turns the year text red (`#d90033`), and brings the corresponding project image to the top of the 3D deck with a smooth depth transition.
- **Responsive Fallback (`<= 1279px`):** Deck is hidden; rows transform into a horizontal swipeable snap-scroll track (`scroll-snap-type: x mandatory`).

### 2.6 Services Stack (`ServicesStack-module__QW-zbq__section`)
- **Container:** Dark charcoal/ink panel (`background: var(--c-ink)` / `#161d25`).
- **Watermark:** Gigantic centered word `SERVICES` (`font-size: var(--head-size)`).
- **Stacked Fan Cards:**
  - 4 cards layered vertically with deliberate rotational offsets:
    - Card 01: `Webflow development` (Rotation: `-2.2deg`, Background: `#ffffff`)
    - Card 02: `UX/UI design` (Rotation: `-0.35deg`, Background: `#f1f1f3`)
    - Card 03: `Branding` (Rotation: `+1.75deg`, Background: `#e8e9eb`)
    - Card 04: `Webflow maintenance & support` (Rotation: `+3.6deg`, Background: `#dbdcde`)
  - Each card contains an index number (`01`, `--c-red-text: #c4002e`), headline, description, blueprint diagram, and pill CTA `more information`.

### 2.7 Interactive CTA Band (`CtaBand-module__4ELZEW__band`)
- **Container:** Bold crimson card with `aspect-ratio: 1400 / 619`.
- **Step 1 (Service Selector Reel):**
  - Monumental label: `I need`
  - Vertical rotating slot-machine style pill roller (`development`, `web design`, `branding`).
  - Next button: Pill button with animated swap arrow.
- **Step 2 (Lead Form):**
  - Smooth vertical slide transition (`opacity: 0, translateY(2.5rem)` -> `opacity: 1, translateY(0)`).
  - Selected service badge with click-to-change capability.
  - Large pill input fields: `your name` and `email`.
  - Submit arrow button.

### 2.8 Footer (`Footer-module__yg9ahW__footer`)
- **Container:** Charcoal panel with `min-height: 27.25rem`.
- **4-Column Grid on Desktop:**
  1. Column 1: `awake.` logo + copyright notice.
  2. Column 2: Navigation links (`Home`, `Services`, `Projects`, `Contacts`) + Legal links (`Privacy`, `Cookies`, `Terms`).
  3. Column 3: External platform links (`LinkedIn`, `Upwork`).
  4. Column 4: Contact details (`contact@awakeagency.dev`, Warsaw weather) + `Back to top` trigger with smooth scroll.

### 2.9 Menu Overlay (`MenuOverlay-module__wz4T_a__overlay`)
- **Container:** Fixed full-height overlay in `--c-red` with rounded corners.
- **Links:**
  - `00 HOME`
  - `01 SERVICES`
  - `02 PROJECTS`
  - `03 CONTACTS`
- **Hover Micro-Interaction:** Text slides right (`translate(0.875rem)`), a 150px horizontal line expands (`transform: scaleX(1)`), and a 45° diamond icon appears (`rotate(45deg) scale(1)`).

---

## 3. Structural & Architectural Verification
* Verified from `source code` that Awake is built using Next.js App Router with React Server Components, server-injected CSS module chunks, and client-side Lenis smooth scrolling.
* Verified that all interactive state transitions (`data-open`, `data-step`, `data-active`, `data-intro`) are cleanly managed via HTML5 data attributes and coordinated with GPU-accelerated CSS and GSAP timelines.
