# DESIGN.md
## Luminous Digital Studio — Visual and Interaction System

This file is the single source of truth for how the site looks and moves. Any AI agent or developer building the site must follow it. If something is not covered here, choose the option that is **simpler, calmer, and higher-contrast**.

> **Brand:** Luminous Digital Studio (short form: Luminous). The wordmark is a placeholder until a real logo exists.

---

## 1. Design direction

**Mood:** bright, clean, editorial, light by default, with an optional dark mode. Confident typography with a fresh green accent.
**Personality:** confident · fast · warm · precise.
**One-sentence brief:** "A bright, clean studio site with huge type, a vibrant green accent, and scroll-driven storytelling that feels crafted but loads instantly."

### Principles
1. **Type is the hero.** Big headlines do most of the visual work.
2. **One accent, used sparingly.** Accent colour marks actions and a single emphasised word per headline.
3. **Motion has a purpose.** Animate to guide attention or confirm interaction, never just to decorate.
4. **Generous space.** When unsure, add more whitespace.
5. **Performance is design.** If an effect costs speed, simplify it.
6. **Accessible by default.** Contrast, focus, and reduced-motion are requirements, not extras.

### Deliberately different from the inspiration
Different green hue from the reference site (our palette uses vibrant `#3FD86F` fills with high-contrast `#0B7A3E` text, not low-contrast mint), different type pairing (Bricolage Grotesque + Instrument Serif, not Matter + Playfair), different services-colour system, different layout details (asymmetric hero, mono labels, grain texture). Do not reuse any text, imagery, or logo from the reference site.

---

## 2. Colour

### 2.1 Core tokens

| Token | Light (default) | Dark (optional) | Use |
|---|---|---|---|
| `--bg` | `#F7F8F4` | `#0C110E` | Page background |
| `--bg-elevated` | `#FFFFFF` | `#141B17` | Cards, panels |
| `--bg-sunken` | `#ECEEE6` | `#080C0A` | Footer, inset areas |
| `--fg` | `#0E1512` | `#F2F5EF` | Primary text |
| `--fg-muted` | `#4B5A52` | `#A5B1AA` | Secondary text |
| `--fg-subtle` | `#7A877F` | `#6B7A72` | Captions, decorative (non-text use only) |
| `--border` | `rgba(14,21,18,0.12)` | `rgba(242,245,239,0.12)` | Hairlines |
| `--accent` | `#3FD86F` | `#3FD86F` | Primary accent fills, buttons, indicators |
| `--accent-hover` | `#2FC25E` | `#5FE488` | Button hover state |
| `--on-accent` | `#0E1512` | `#0C110E` | Text on accent fills/buttons |
| `--accent-text` | `#0B7A3E` | `#3FD86F` | Emphasised text, accent words, text links |
| `--focus` | `#0369A1` | `#7DD3FC` | Focus ring |
| `--success` | `#15803D` | `#4ADE80` | Form success |
| `--error` | `#B91C1C` | `#F87171` | Form error |

> **The Two-Green Rule:** `--accent` is exclusively for fills (buttons, pills, chips, dots) paired with `--on-accent` dark text; `--accent-text` is for any green text (including the emphasised word in headlines and text labels). This guarantees ≥ 4.5:1 contrast against both light (`#F7F8F4`) and dark (`#0C110E`) backgrounds.

### 2.2 Service colours (used as small tints, never as page backgrounds)

| Service | Token | Light (default) | Dark (optional) |
|---|---|---|---|
| Video Editing | `--svc-video` | `#E4572E` | `#FF7A55` |
| Web Development | `--svc-web` | `#5B4BDB` | `#8B7CFF` |
| Data Analysis | `--svc-data` | `#0284C7` | `#38BDF8` |

Use for: small label dots, service-panel glow, hover underlines. Keep large areas neutral.

### 2.3 Texture and effects
- **Grain overlay:** fixed, full-screen, 3% opacity noise in light mode, 5% opacity in dark mode, `pointer-events: none`, hidden in reduced-motion/low-power mode if needed.
- **Accent glow:** radial gradient `rgba(63,216,111,0.18)` behind hero headline and service panels. Blur ≤ 120px.
- Avoid heavy drop shadows. Use crisp borders + subtle elevation instead.

---

## 3. Typography

All fonts load via `next/font/google` (self-hosted, no layout shift).

| Role | Font | Weights | Use |
|---|---|---|---|
| **Display** | **Bricolage Grotesque** | 500, 600, 700 | Headlines, nav, buttons |
| **Accent** | **Instrument Serif** (italic) | 400 italic | The single emphasised word in a headline |
| **Body** | **Geist Sans** | 400, 500 | Paragraphs, UI |
| **Label / mono** | **Geist Mono** | 400, 500 | Small uppercase labels, numbers, tags |

### 3.1 Type scale (fluid, using `clamp`)

| Style | Size | Line height | Tracking | Font |
|---|---|---|---|---|
| `display-xl` (hero) | `clamp(3.25rem, 9vw + 1rem, 9rem)` | 0.95 | -0.03em | Display 600 |
| `display-lg` (section titles) | `clamp(2.5rem, 5.5vw + 0.5rem, 5.5rem)` | 1.0 | -0.025em | Display 600 |
| `h2` | `clamp(2rem, 3.5vw + 0.5rem, 3.5rem)` | 1.05 | -0.02em | Display 600 |
| `h3` | `clamp(1.5rem, 2vw + 0.5rem, 2.25rem)` | 1.15 | -0.015em | Display 500 |
| `body-lg` | `1.25rem` (20px) | 1.55 | 0 | Geist 400 |
| `body` | `1rem` (16px) | 1.6 | 0 | Geist 400 |
| `small` | `0.875rem` | 1.5 | 0 | Geist 400 |
| `label` | `0.75rem`, uppercase | 1.2 | +0.08em | Geist Mono 500 |

### 3.2 Accent-word pattern
Every major headline may emphasise **one** word using Instrument Serif italic in the accent text colour:
```html
<h1>Content that <em class="accent-word">performs</em>.</h1>
```
```css
.accent-word {
  font-family: var(--font-accent);
  font-style: italic;
  font-weight: 400;
  color: var(--accent-text);
  font-size: 1.08em;
}
```
Increase the accent word size by ~1.08em to optically match the grotesque.

### 3.3 Rules
- Max line length for body copy: 65ch.
- Headlines left-aligned (centre only for short CTAs).
- Never use more than 3 font families, never more than 2 weights in one component.

---

## 4. Layout and spacing

### 4.1 Breakpoints
`sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536` (px)

### 4.2 Grid
- 12-column grid on desktop, 4-column on mobile.
- Container max width: `1440px`; page gutters: `20px` (mobile), `32px` (md), `48px` (lg+).
- Hero and service panels may bleed to the full viewport width.

### 4.3 Spacing scale (4px base)
`4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192`
- Section vertical padding: `96px` mobile, `160px` desktop (use `clamp(6rem, 12vw, 12rem)`).
- Component inner padding: 24–40px.

### 4.4 Radius
| Token | Value | Use |
|---|---|---|
| `--r-sm` | 8px | Inputs, tags |
| `--r-md` | 16px | Cards |
| `--r-lg` | 28px | Large panels, video frames |
| `--r-pill` | 999px | Buttons, chips |

---

## 5. Components

### 5.1 Buttons
| Variant | Style |
|---|---|
| **Primary** | Pill, `--accent` background, `--on-accent` text, Display 600, 16px, padding 16×28. Hover: `--accent-hover`, arrow icon slides 4px right. |
| **Secondary** | Pill, 1px `--border` outline, `--fg` text. Hover: border → `--fg`, background `--bg-elevated`. |
| **Ghost/link** | Text with animated underline (width 0 → 100% in 300ms). |
- Min height 48px. Focus ring: 2px `--focus` + 2px offset.
- Magnetic hover effect (≤ 8px pull) on desktop primary buttons only; disabled under reduced motion and on touch.

### 5.2 Header / navigation
- Height 72px (56px on mobile). Logo left, links centre/right, CTA far right.
- After 80px scroll: background `color-mix(in srgb, var(--bg) 70%, transparent)` + `backdrop-filter: blur(16px)` + bottom hairline.
- Hide on scroll down / show on scroll up (300ms ease).
- **Mobile menu:** full-screen overlay, links in `display-lg`, staggered reveal (60ms per item), social links at bottom, close button top-right, focus trapped, `Esc` closes.
- Active link: accent dot before the label.

### 5.3 Hero
- Asymmetric layout: headline spans ~9 columns, subhead and CTAs below left, a small mono label top-left ("Video · Web · Data").
- Background: subtle video loop with grain overlay, OR animated clean gradient fallback.
- Scroll cue: small mono "Scroll" with a line that animates downward.

### 5.4 Stat counters
- Three or four items in a row (2×2 on mobile).
- Number in `display-lg`, label in mono uppercase, hairline top border.
- Count-up 1.2s, `power3.out`, triggers once at 30% visibility.

### 5.5 Service panels (signature component)
- Full-width panel, min-height `100vh` desktop, `--bg-elevated`, radius `--r-lg` at top corners, 1px border.
- Layout: left (label with colour dot, big title with accent word, description, 3 capabilities, link), right (large visual: looping clip, mockup, or animated chart).
- **Desktop scroll behaviour:** each panel pins at `top: 0` while the next slides over it; the covered panel scales to 0.94 and dims to 60% opacity. Implemented with GSAP ScrollTrigger (`pin`, `scrub`).
- **Mobile:** no pinning; panels stack normally with reveal-on-scroll.

### 5.6 Project cards
- Aspect ratio 4:3 (or 16:10), radius `--r-md`, cover image/video.
- Below image: title (h3), tags in mono small caps, year right-aligned.
- Hover (desktop): image scales to 1.04, video preview plays muted, cursor shows "View".
- Focus: same as hover plus ring.

### 5.7 Capabilities list
- Large rows, `h2`-size text, hairline between rows. On hover: row text shifts right 12px, accent colour, a small arrow appears, and a thumbnail follows the cursor (desktop only).

### 5.8 Marquee
- Large outlined or solid text, separated by small accent stars. Speed ~40px/s. Pauses on hover. Static when reduced motion is on.

### 5.9 Testimonials
- Large quote in `h3`, name and role in mono label. Navigation arrows + dots, swipe on touch, `aria-live="polite"` on change.

### 5.10 FAQ accordion
- Native `<details>/<summary>` or ARIA accordion. Plus icon rotates 45° when open. Height animates 250ms.

### 5.11 Forms
- Inputs: 56px height, `--bg-elevated`, 1px border, radius `--r-sm`, label above in mono small caps.
- Focus: border `--accent` and 2px `--focus` ring.
- Service selection: pill chips (multi-select) with check icon when selected.
- Errors: red text below field + icon, `aria-describedby`, never colour-only.
- Success state replaces the form with a confirmation card (accent check, next steps).

### 5.12 Footer
- `--bg-sunken`. Large wordmark/CTA at top ("Let's make something *loud*."), 4 link columns, status badge ("● Available for new work" with pulsing green dot), copyright row.

### 5.13 Tags / chips
- Mono 12px uppercase, 1px border, pill radius, padding 6×12. Service-colour dot before label.

---

## 6. Motion

### 6.1 Tokens
| Token | Value |
|---|---|
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` |
| `--dur-fast` | 150ms (hover/press) |
| `--dur-base` | 300ms (UI transitions) |
| `--dur-slow` | 700ms (reveals) |
| `--dur-hero` | 1000ms (hero intro) |
GSAP equivalents: `power3.out`, `power2.inOut`, `expo.out`.

### 6.2 Patterns
| Pattern | Spec |
|---|---|
| **Headline reveal** | Split by line; each line translateY(100%) → 0 inside overflow hidden mask; stagger 0.08s; `expo.out`; 0.9s |
| **Fade-up on scroll** | opacity 0 → 1, translateY 24px → 0, 0.7s, triggers at 85% viewport, once |
| **Image reveal** | clip-path inset(0 0 100% 0) → inset(0), 1s |
| **Parallax** | Max ±40px, only on hero media and big images, desktop only |
| **Page transition** | 250ms fade + 12px slide |
| **Hover** | Always 150–300ms; never change layout size |

### 6.3 Rules
- Animate only `transform` and `opacity` where possible.
- One main animation per viewport at a time.
- Respect `prefers-reduced-motion: reduce`: disable Lenis, pinning, parallax, marquee, magnetic buttons, and counters (show final value); keep simple opacity fades ≤ 200ms.
- Pause video loops when tab is hidden or element is off-screen.

---

## 7. Imagery and video

- **Style:** high-contrast, editorial, natural tones with the accent colour as the signature punch. No generic stock handshakes.
- **Video:** hero loop 1280×720, ≤ 4 MB, 8–12 s, WebM + MP4, poster provided. Project previews ≤ 2 MB.
- **Images:** AVIF/WebP, max 1920px wide, `sizes` attribute always set, descriptive alt text.
- **Device mockups:** simple flat frames, no brand logos.
- **Data visuals:** custom SVG/Canvas charts in service colours on neutral background; keep clean, label axes.
- **Icons:** Lucide icon set, 1.5px stroke, 20–24px.
- **Logo placeholder:** wordmark in Bricolage Grotesque 700 with an accent-colour dot; replace once real logo exists.

---

## 8. Accessibility checklist (design-level)

- Body text contrast ≥ 4.5:1; large text ≥ 3:1; UI components ≥ 3:1.
- Never rely on colour alone (errors, active states, service tints).
- Visible focus on every interactive element.
- Touch targets ≥ 44×44px.
- Headings in logical order; only one `h1` per page.
- Videos: muted by default, controls on the lightbox player, captions for showreel.
- Animation ≤ 5s auto-playing loops must be pausable (provide pause control for hero video).

---

## 9. Implementation tokens

### 9.1 CSS variables (`globals.css`)
```css
:root {
  --bg: #F7F8F4; --bg-elevated: #FFFFFF; --bg-sunken: #ECEEE6;
  --fg: #0E1512; --fg-muted: #4B5A52; --fg-subtle: #7A877F;
  --border: rgba(14,21,18,0.12);
  --accent: #3FD86F; --accent-hover: #2FC25E; --on-accent: #0E1512;
  --accent-text: #0B7A3E;
  --focus: #0369A1; --success: #15803D; --error: #B91C1C;
  --svc-video: #E4572E; --svc-web: #5B4BDB; --svc-data: #0284C7;
  --grain-opacity: 0.03;
  --r-sm: 8px; --r-md: 16px; --r-lg: 28px; --r-pill: 999px;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 150ms; --dur-base: 300ms; --dur-slow: 700ms; --dur-hero: 1000ms;
}
:root[data-theme="dark"], .dark {
  --bg: #0C110E; --bg-elevated: #141B17; --bg-sunken: #080C0A;
  --fg: #F2F5EF; --fg-muted: #A5B1AA; --fg-subtle: #6B7A72;
  --border: rgba(242,245,239,0.12);
  --accent: #3FD86F; --accent-hover: #5FE488; --on-accent: #0C110E;
  --accent-text: #3FD86F;
  --focus: #7DD3FC; --success: #4ADE80; --error: #F87171;
  --svc-video: #FF7A55; --svc-web: #8B7CFF; --svc-data: #38BDF8;
  --grain-opacity: 0.05;
}
```
Default theme is **light**; set `data-theme="light"` on `<html>` unless the user has chosen otherwise.

### 9.2 Tailwind v4 mapping (`@theme`)
```css
@theme inline {
  --color-bg: var(--bg);
  --color-elevated: var(--bg-elevated);
  --color-sunken: var(--bg-sunken);
  --color-fg: var(--fg);
  --color-muted: var(--fg-muted);
  --color-subtle: var(--fg-subtle);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-on-accent: var(--on-accent);
  --color-accent-text: var(--accent-text);
  --color-focus: var(--focus);
  --color-success: var(--success);
  --color-error: var(--error);
  --color-svc-video: var(--svc-video);
  --color-svc-web: var(--svc-web);
  --color-svc-data: var(--svc-data);
  --font-display: var(--font-bricolage), system-ui, sans-serif;
  --font-accent: var(--font-instrument), Georgia, serif;
  --font-sans: var(--font-geist-sans), system-ui, sans-serif;
  --font-mono: var(--font-geist-mono), ui-monospace, monospace;
  --radius-sm: var(--r-sm);
  --radius-md: var(--r-md);
  --radius-lg: var(--r-lg);
  --radius-pill: var(--r-pill);
}
```

---

## 10. Do and don't

| Do | Don't |
|---|---|
| Use `--accent-text` for green text | Use `--accent` for text on light backgrounds (poor contrast) |
| One accent word per headline | Colour whole headlines in the accent |
| Large type, lots of space | Cram multiple messages into one viewport |
| Hairline borders on cards | Heavy drop shadows |
| Animate transform/opacity | Animate width/height/top/left |
| Provide reduced-motion fallbacks | Autoplay audio or unpausable motion |
| Use real project content | Ship lorem ipsum or placeholder logos live |
| Keep components consistent with this file | Invent new colours or fonts mid-build |

---

## 11. Agent instructions (paste at the start of any AI build session)

> You are building the website described in `PRD.md` using the visual system in `DESIGN.md`. Use Next.js (App Router), TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Motion, and Lenis. Use only the colour, type, spacing, and motion tokens defined in `DESIGN.md`; do not invent new ones. Build mobile-first, keep it accessible (WCAG 2.2 AA, reduced-motion support), and keep performance budgets from the PRD. Work on **one step at a time**, explain what you changed, and stop for review after each step. Do not copy text, images, or code from any reference website.
