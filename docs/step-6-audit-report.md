# STEP 6 AUDIT REPORT: Current Implementation, Functionality, Motion, and Performance

**Target Application:** Luminous Digital Studio  
**Workspace:** `D:\Demo website\Company website 3`  
**Reference Site:** [Awake Agency (www.awakeagency.dev)](https://www.awakeagency.dev/)  
**Technology Stack:** Next.js 16.4.0 (Turbopack, App Router), TypeScript 5, Tailwind CSS 4, GSAP 3.15 + `@gsap/react`  
**Audit Roles:** Senior Frontend Engineer, QA Engineer, Motion Designer, Web Performance Specialist  
**Audit Date:** October 2026  
**Status:** Audit Only (No application code modified, no dependencies added/removed)

---

## 1. Executive Summary

A comprehensive, multi-disciplinary audit of **Luminous Digital Studio** was conducted across code structure, dynamic API routes, browser interactions, animation choreographies, public claims, accessibility, and multi-device viewport responsiveness.

The application is operational in development mode on `http://localhost:3000` and successfully compiles to a static/edge production build (`next build`) in **3.4 seconds** with **zero TypeScript errors**. The root route `/` correctly loads **Luminous Digital Studio** with the approved brand architecture, warm panel framing, and typography.

However, several production defects and unverified items require remediation before commercial launch:
1. **Enquiry Leads Not Persisted:** The `/api/enquiry` endpoint merely logs leads to `console.log`. If the server restarts, customer inquiries are irretrievably lost.
2. **Missing Spam & Rate-Limiting Protection:** The enquiry API lacks rate-limiting, honeypots, and CAPTCHAs, leaving it vulnerable to automated spam floods.
3. **Placeholder WhatsApp Configuration:** The site uses the dummy telephone number `+91 98765 43210` across all floating and inline triggers.
4. **Fictional Testimonials & Metrics:** The 4 client reviews and dramatic performance numbers (+142% conversion, 4.9★, 3.2M impressions, -40% ad waste) are entirely fictional demonstration items with zero supporting evidence in repo files.
5. **Keyboard Accessibility Gap in Estimator:** The Priority Fast-Track toggle in [ProjectEstimator.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx) is a `<div>` element lacking keyboard focus and ARIA checkbox states.

---

## 2. Route & Application Status (Task 1)

All application routes and static assets were individually queried and verified:

| Route / Asset | Type | HTTP Status | Verified Functionality |
| :--- | :--- | :--- | :--- |
| `/` | Page (SSR / Static) | **200 OK** | Displays Luminous Digital Studio home panel sequence |
| `/privacy` | Page (Static) | **200 OK** | Full GDPR/DPDP compliant Privacy Policy |
| `/terms` | Page (Static) | **200 OK** | Terms of Service, IP rights, and project governing terms |
| `/cookies` | Page (Static) | **200 OK** | Cookie policy detailing essential and analytics cookies |
| `/api/enquiry` | API (Dynamic POST) | **200 / 400** | JSON validation & response handling endpoint |
| `/_not-found` | Page (Static) | **404 OK** | Next.js fallback boundary |
| `/icon.png` | Image / Favicon | **200 OK** | Standard favicon asset |
| `/apple-icon.png` | Image / Icon | **200 OK** | iOS homescreen touch icon |

### Heading Hierarchy & SEO Metadata Verification
- **Page `<title>`:** `Luminous Digital Studio — Full-Service Digital Media Agency` (Present)
- **`<meta name="description">`:** `Full-service digital media production studio partnering with ambitious brands across Web Development, Web/App Development, Video Editing, and Digital Analytics.` (Present)
- **Heading 1 (`<h1>`) Count:** Exactly **1** on the entire home page:
  `WE BUILD WEBSITES PEOPLE REMEMBER. Luminous is a creative digital studio in India...` (Complies with WCAG 2.1 single-H1 semantic standard).
- **Navigation In-Page Anchor IDs:** `#process`, `#projects`, `#testimonials`, `#clients`, `#services`, `#estimator`, and `#cta` all exist and match navigation targets.

---

## 3. Functional Testing Results (Task 2)

### 3.1 Project Enquiry API (`/api/enquiry`)
*File:* [src/app/api/enquiry/route.ts](file:///d:/Demo%20website/Company%20website%203/src/app/api/enquiry/route.ts)

* **Validation Rules:**
  - `name`: Must be a string with length $\ge 2$ characters. Returns `400` with `"Please enter your full name."` on failure. (Verified)
  - `email`: Validated against regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`. Returns `400` with `"Please enter a valid work email address."` on failure. (Verified)
  - `services`: Must be a non-empty array. Returns `400` with `"Please select at least one service category."` on failure. (Verified)
  - `budget`, `timeline`, `company`, `message`: Optional with fallback defaults. (Verified)
* **API Delivery / Persistence Audit:**
  - **Finding:** The handler generates an `enquiryRecord` with a timestamp and ID, but only executes `console.log('[LUMINOUS INQUIRY RECEIVED]:', ...)`.
  - **Risk:** Inquiries are **NOT saved** to any database (e.g. Supabase, MongoDB, PostgreSQL) and are **NOT forwarded** via email (e.g. Resend, SendGrid) or webhook (e.g. Slack). If the server restarts, all inquiries submitted by prospective clients are permanently lost.
* **Spam & Abuse Audit:**
  - **Finding:** No rate limiting (e.g., Redis / memory IP bucket), no honeypot field, and no CAPTCHA (Turnstile / reCAPTCHA). A malicious actor or bot can send thousands of POST requests per second unimpeded.
* **Malformed Request Handling Defect:**
  - When a client sends malformed JSON, `await request.json()` throws a syntax error caught by the generic catch block, returning `500 Internal Server Error` instead of `400 Bad Request`.

### 3.2 Project Estimator
*File:* [src/components/agency/ProjectEstimator.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx)

* **Category & Subcategory Coverage:**
  1. **Website (01):** Starting price ₹1,20,000, 3 weeks baseline. 6 selectable subcategories (Frontend UI +₹35k, Backend APIs +₹45k, Database +₹30k, Headless CMS +₹30k, SEO/Speed +₹25k, E-Commerce +₹45k).
  2. **Full-Stack Web / Mobile App (02):** Starting price ₹2,40,000, 5 weeks baseline. 6 subcategories (Cross-Platform iOS/Android +₹85k, iOS Only +₹65k, Android Only +₹55k, Web Dashboard +₹60k, User Auth/DB +₹35k, Real-Time Sync +₹40k).
  3. **Video Editing (03):** Starting price ₹80,000, 2 weeks baseline. 6 subcategories (Commercial Brand Film +₹50k, Reels/Shorts +₹30k, YouTube +₹35k, Color Grading +₹25k, Motion Graphics/3D VFX +₹45k, Sound Design +₹20k).
  4. **Data Analyst (04):** Starting price ₹75,000, 2 weeks baseline. 6 subcategories (Telemetry +₹35k, Funnel Audit +₹30k, Executive Dashboard +₹40k, SQL Reports +₹30k, Ad Spend ROI +₹35k, A/B Testing +₹25k).
* **Calculation Math & Bounds:**
  - Total Raw Cost = $(\text{StartingPrice} + \sum \text{SubcategoryCosts}) \times \text{ScaleMultiplier} + \text{ExpeditedCost}$
  - Scale Multipliers: Startup MVP ($1.0\times$), Growth ($1.35\times$), Enterprise Flagship ($1.85\times$).
  - Expedited Sprint: $+₹45,000$, timeline reduced by $1.5\text{ weeks}$ (clamped to a minimum of $2\text{ weeks}$).
  - Display Quotation Range:
    - Low Estimate: Raw total $-10\%$, rounded to nearest ₹5,000.
    - High Estimate: Raw total $+15\%$, rounded to nearest ₹5,000.
  - Calculated Extreme Bounds:
    - **Minimum Possible:** Data Analyst + 0 subcategories + Startup scale = **₹65,000 – ₹85,000** (~2 Weeks).
    - **Maximum Possible:** Full-Stack App + all 6 subcategories + Enterprise scale + Expedited = **₹10,00,000 – ₹12,75,000** (~15 Weeks).
* **Guaranteed vs. Estimated Status:**
  - The UI explicitly renders: `*Standard agency market rates. Custom quotation finalized after brief.` and title says `[ Estimated Quotation ]`. These are clearly **indicative estimates**, not binding legal quotations.
* **Estimator Action Buttons:**
  - **WhatsApp Action:** Renders pre-formatted and URL-encoded query string containing selected service, requirements list, scale, speed, investment range, and timeline. (Verified working)
  - **Email Action:** The button labeled "Submit Inquiry With This Spec" is currently an anchor link jumping to `#cta` (the form). It does not trigger an email client (`mailto:`) with the prefilled breakdown.

### 3.3 WhatsApp Direct Line
*Files:* [src/components/agency/WhatsAppButton.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/WhatsAppButton.tsx), [src/data/agencyData.ts](file:///d:/Demo%20website/Company%20website%203/src/data/agencyData.ts)

* **Destination Number:** Hardcoded to `+91 98765 43210` in `agencyData.ts` and `ProjectEstimator.tsx`.
* **Finding:** This is a **dummy placeholder number**. Clicking the WhatsApp buttons will open WhatsApp pointing to an unowned/dummy phone number.
* **Required Action:** The site owner must supply the real studio phone number with international country code.

---

## 4. Public-Facing Claims Verification (Task 3)

| Claim / Item | Current Presentation | Repository Evidence | Verification Finding | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
| **Aetheria Systems** | "+142% Enterprise Conversion Lift", "LCP from 3.2s to 0.38s" | None in repo | **Unverified / Fictional Demo** | Label as "Interactive Prototype Case Concept" |
| **Orbital Health** | "4.9★ App Store Rating", "VP of Product Elena Rostova" | None in repo | **Unverified / Fictional Demo** | Replace with real client quote or label as sample |
| **Lumina Media Group** | "3.2M+ Organic Impressions", "Awwwards Nominee" | None in repo | **Unverified / Fictional Demo** | Replace with authentic metrics or label as demo |
| **Vector Enterprise** | "-40% Ad Spend Reduction", "David Lin COO" | None in repo | **Unverified / Fictional Demo** | Replace with authentic client quote or label as demo |
| **Client Avatars** | Monogram circles (`MT`, `ER`, `JS`, `DL`) | Monograms only | **Synthetic Placeholders** | Use client photographs or authorized company marks |
| **Studio Phone** | `+91 98765 43210` | Hardcoded in data | **Placeholder Dummy Number** | Replace with active business line |
| **Studio Email** | `hello@luminousdigital.studio` | Hardcoded in data | **Unverified Domain Mailbox** | Verify DNS MX records are configured |
| **Social Links** | LinkedIn, GitHub, X, Awwwards | Links to homepages | **Root Domain Placeholders** | Update to actual agency handles |

> [!WARNING]
> In live commerce, publishing fabricated client testimonials or unverified quantifiable claims can violate consumer protection regulations (FTC / ASCI). Before production launch, either replace these with verified client approvals or add an explicit disclaimer: *"Representative case concept models demonstrated for portfolio purposes."*

---

## 5. Animation Inventory & Reference Comparison (Task 4)

### 5.1 Current Animation Inventory

| # | Effect / Component | Trigger | Implementation | Observed Behavior | Status / Issue |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | **Preloader Counter** (`HeroSection.tsx`) | Page Load | `requestAnimationFrame` 0–100% | Smooth numeric count-up overlay | Works cleanly; 180ms fadeout |
| 2 | **Headline Reveal** (`HeroSection.tsx`) | Loader complete | GSAP `fromTo` `yPercent: 110` | 3 staggered line mask reveals | Crisp editorial motion |
| 3 | **IST Clock Pulse** (`HeroSection.tsx`) | Mount | `setInterval` (10s) + CSS pulse | Green pulsing dot with live Indian time | Accurate and responsive |
| 4 | **3D Statement Scrub** (`StatementSection.tsx`) | ScrollTrigger | GSAP `rotateX: -24 -> 0`, scrub: 1 | Text un-tilts along X-axis as user scrolls | Smooth perspective tilt |
| 5 | **CAD Background Drift** (`StatementSection.tsx`) | ScrollTrigger | GSAP `rotate: 18, scale: 1.06`, scrub: 1.8 | Vector technical circles rotate slowly | Adds subtle depth |
| 6 | **Pink Spline Path Draw** (`ProcessSection.tsx`) | ScrollTrigger | `strokeDashoffset` scrubbed to 0 | Vector ribbon draws along user scroll | Clean visual thread |
| 7 | **Countdown Gauge** (`ProcessSection.tsx`) | ScrollTrigger | SVG circle stroke scrub + sprint step | Circular dial fills up as cards pass | Functional stage tracker |
| 8 | **Case Study Modal** (`ProjectsSection.tsx`) | Click "Read Case Study" | CSS `animate-fade-in` + `overflow: hidden` | Dark overlay with modal breakdown | ESC and backdrop click close cleanly |
| 9 | **Archive Cursor Preview** (`ArchiveSection.tsx`) | Mousemove over row | GSAP `quickTo` (x, y) on floating card | Preview card glides with mouse on desktop | Disabled on touch/mobile as intended |
| 10 | **Pinned Services Deck** (`ServicesSection.tsx`) | ScrollTrigger | GSAP `pin: true, end: '+=2400', scrub: 0.75` | Section locks while cards 02–04 slide up | Functional card stacking |
| 11 | **Curtain Menu Slide** (`MenuCurtain.tsx`) | Click Menu Button | CSS `translate-y-0 duration-500` | Full-screen red curtain drops down | Locks body scroll, ESC listener active |
| 12 | **Sticky Navbar Slide** (`HeaderNav.tsx`) | Scroll > 380px | CSS `translate-y-0 duration-400` | Pill navbar slides down from top | Backdrop blur and enquire button active |

### 5.2 Reference Comparison vs. Awake Agency

| Reference Effect (Awake Agency) | Status | Analysis & Evidence |
| :--- | :--- | :--- |
| **1. Falling hero coins with physics** | **Absent** | Awake drops 5 embossed circular coins with Matter.js 2D physics simulation that bounce and settle. Luminous hero uses pure typography and kicker copy. |
| **2. Scroll-scrubbed perspective typography** | **Partially Implemented** | Luminous implements single 3D statement perspective un-tilt (`rotateX: -24 -> 0`). Awake implements a two-stage sequential flip between two separate paragraphs. |
| **3. Scroll-linked SVG ribbon drawing** | **Implemented** | Both [ProcessSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProcessSection.tsx) and [ProjectsSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectsSection.tsx) scrub SVG path stroke lengths to 0 using ScrollTrigger. |
| **4. Interactive archive card synchronization** | **Partially Implemented (Alternative)** | Awake has a static pinned 3D card deck on the left that updates layers on row hover. Luminous implements a cursor-following floating preview card with `gsap.quickTo`. |
| **5. Pinned services-card sequence** | **Implemented** | [ServicesSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ServicesSection.tsx) pins the section for 2400px of scroll delta while three stacked cards slide sequentially over the base card. |
| **6. Advanced project-image distortion** | **Absent** | Awake uses a WebGL fragment shader (`GooeyThumb`) for liquid ripple image displacement. Luminous uses responsive SVG architectural mockups with CSS transforms. |
| **7. Full-screen navigation choreography** | **Partially Implemented** | Full-screen red curtain exists with hover preview panel. However, the Awake 3-bar wrap-around burger animation (`@keyframes burgerSweep`) is simplified to two static horizontal bars (`=`). |

---

## 6. Quality, Responsiveness, and Accessibility Audit (Task 5)

### 6.1 Viewport Responsiveness Breakdown

| Viewport Tested | Device Representative | Layout Observations & Findings |
| :--- | :--- | :--- |
| **1440 × 900** | Large Desktop / iMac | Perfect layout. Outer frame `1.25rem`, hero fits viewport neatly without vertical spill. Cursor-following archive card active. |
| **1366 × 768** | Standard Laptop | Proportional scaling. Services deck pins cleanly. Estimator 7:5 two-column split provides good reading density. |
| **768 × 1024** | iPad / Tablet Portrait | Hero shifts to responsive text sizing. Process grid shifts to 2 columns. Estimator switches to single-column stack. Cursor preview hidden. |
| **390 × 844** | iPhone 12/13/14/15 | Frame contracts to `0.5rem`. Kicker copy moves underneath headline cleanly. Sticky navbar remains compact within `calc(100vw - 2rem)`. |
| **320 × 700** | Compact Mobile | No horizontal overflow. Email address wraps cleanly with `break-all`. Subcategory buttons stack into single column. |

### 6.2 Accessibility & Usability Issues

1. **Estimator Expedited Toggle Keyboard Trap / Inaccessibility:**
   - *File:* [src/components/agency/ProjectEstimator.tsx:L352-L359](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx#L352-L359)
   - *Issue:* The Priority Fast-Track toggle is built as an unadorned `<div onClick=...>` without `tabIndex={0}`, `role="checkbox"`, `aria-checked={isExpedited}`, or an `onKeyDown` handler. Screen readers announce it as generic text, and keyboard-only users cannot activate it.
2. **Missing External Link Announcements:**
   - In [src/components/agency/FooterSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/FooterSection.tsx), social links open in new tabs (`target="_blank"`) but omit `aria-label="... (opens in a new tab)"` or screen-reader visually hidden notices.
3. **Reduced Motion Support:**
   - **Passing:** `globals.css` sets `animation-duration: 0.01ms !important; transition-duration: 0.01ms !important;` when `prefers-reduced-motion: reduce` is detected. GSAP hooks query `prefersReducedMotion()` and bypass timelines.

### 6.3 Test Commands Executed & Outcomes

| Command | Working Directory | Exit Code | Result Summary |
| :--- | :--- | :--- | :--- |
| `npx tsc --noEmit` | `D:\Demo website\Company website 3` | **0** | Clean pass. Zero type errors. |
| `npm run build` | `D:\Demo website\Company website 3` | **0** | Production build created in 3.4s; all 9 static and dynamic routes compiled. |
| `npx eslint src/app/page.tsx` | `D:\Demo website\Company website 3` | **0** | Clean pass on target page. |
| `curl.exe -I http://localhost:3000` | `D:\Demo website\Company website 3` | **0** | HTTP 200 OK. Server responsive. |
| `node scratch/check_html.js` | `D:\Demo website\Company website 3` | **0** | Verified single H1, all navigation anchor IDs, legal links, and meta tags. |

---

## 7. Prioritized Remediation Roadmap (Task 6)

### Critical Priority (P0) — Must Fix Before Commercial Launch
1. **Enquiry Persistence & Delivery:**
   - Connect [src/app/api/enquiry/route.ts](file:///d:/Demo%20website/Company%20website%203/src/app/api/enquiry/route.ts) to a transactional delivery service (e.g. Resend, SendGrid) or a persistent database (e.g. Supabase, PostgreSQL) so leads are actually delivered to the agency.
2. **Spam Prevention & Rate Limiting:**
   - Add an IP-based rate limiter (Upstash or in-memory bucket) and a hidden honeypot input field in [EnquirySection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/EnquirySection.tsx) to discard bot submissions.
3. **Update WhatsApp Phone Number:**
   - Replace dummy number `+91 98765 43210` in [src/data/agencyData.ts](file:///d:/Demo%20website/Company%20website%203/src/data/agencyData.ts) and [ProjectEstimator.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx) with the verified studio phone number.

### High Priority (P1) — Functional & Accessibility Compliance
4. **Estimator Keyboard Accessibility:**
   - Refactor the expedited sprint toggle in [ProjectEstimator.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx) to a semantic `<button type="button" role="checkbox" aria-checked={isExpedited}>` with keyboard space/enter toggling.
5. **Enquiry API Malformed JSON Handling:**
   - Differentiate request parsing errors from server exceptions in [route.ts](file:///d:/Demo%20website/Company%20website%203/src/app/api/enquiry/route.ts), returning `400 Bad Request` instead of `500 Internal Server Error`.
6. **Social & Contact Information Update:**
   - Update generic root URLs (`linkedin.com`, `github.com`, `x.com`) to official studio profiles.

### Medium Priority (P2) — Brand Integrity & Feature Completeness
7. **Public Claims Clarification:**
   - Add a demo disclaimer badge or replace concept case studies with verified client testimonials once contracts permit.
8. **Estimator "Email Breakdown" Direct Action:**
   - Provide a direct `mailto:` link with the formatted project breakdown alongside the "Submit Inquiry" scroll action.
9. **Burger Menu Micro-Interaction (`burgerSweep`):**
   - Add the 3-phase staggered horizontal sweep animation to the burger button in [HeaderNav.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/HeaderNav.tsx) for closer parity with the Awake reference.

### Low Priority (P3) — Creative Polish & Advanced Motion
10. **WebGL Project Distortion:**
    - If desired, integrate Three.js or a WebGL shader canvas for gooey hover distortion on project art cards.
11. **Hero Gravity Coins Simulation:**
    - If desired, introduce 2D physics coins (e.g., Matter.js) falling behind the hero headline.

---

## 8. Recommended Next Implementation Stage

With the audit complete and zero code changes applied during this stage, the recommended next step is:

**Stage 7: Production Hardening, Lead Delivery Integration & Accessibility Pass**
- Integrate an email dispatch handler (Resend / SMTP) in `/api/enquiry` with honeypot spam protection.
- Make the Project Estimator Priority toggle fully accessible (`role="checkbox"`, keyboard navigable).
- Update telephone and contact metadata to live client credentials.
- Add an explicit portfolio concept disclaimer for unverified metric claims.
