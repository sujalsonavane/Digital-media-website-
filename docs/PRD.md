# Product Requirements Document (PRD)
## Luminous Digital Studio — Digital Media Agency Website

| | |
|---|---|
| **Version** | 1.0 (draft) |
| **Date** | 16 Oct 2026 |
| **Owner** | [Founder name] |
| **Status** | Ready for build |
| **Companion docs** | `DESIGN.md` (visual system), `ROADMAP` (build steps, delivered step by step) |

> Replace every `[domain]` and `[email]` placeholder before launch.

---

## 1. Overview

### 1.1 What we are building
A fast, animation-rich marketing website for a digital media agency that sells three services:

1. **Video Editing** (short-form, long-form, ads, showreels, motion graphics)
2. **Website Development** (design + build, landing pages, business sites, custom web apps)
3. **Data Analysis** (dashboards, reporting, cleaning, insights, visualisation)

The site's job is to make a visitor think "these people are polished and fast," then get them to **start a project** (contact/quote request).

### 1.2 Inspiration and originality
Structural inspiration comes from modern studio sites such as mkvision.studio: big typographic hero, stat counters, showreel, stacked scroll-driven service sections, project grid, client logo wall, testimonials, FAQ, and a friendly closing CTA. **Our implementation must be original**: different fonts, palette, copy, layout details, imagery, and logo. No copied text, assets, or code.

### 1.3 Problem statement
Small and mid-size businesses, creators, and startups need video, web, and data work but get it from three different freelancers. We offer **one team, one process, one invoice**. The site must communicate that clearly and prove it with work.

### 1.4 Goals
| # | Goal | Measure |
|---|---|---|
| G1 | Generate qualified leads | ≥ 3% of unique visitors submit the contact form (after launch + 8 weeks) |
| G2 | Communicate all 3 services in under 10 seconds | Usability test: 4 of 5 testers can name all services after the hero + first scroll |
| G3 | Look premium, load fast | Lighthouse ≥ 90 (Performance, Accessibility, SEO, Best Practices) on mobile |
| G4 | Be easy to update without code | Owner can add a project in < 10 minutes |
| G5 | Rank for local/niche searches | Indexed in Google within 7 days; core pages in Search Console with no errors |

### 1.5 Non-goals (v1)
- No e-commerce or online payments
- No client login portal or project-management area
- No multi-language (structure should allow it later)
- No blog in v1 (route and content model reserved for v1.1)
- No custom CMS built from scratch

---

## 2. Audience and personas

| Persona | Who | What they want | What worries them |
|---|---|---|---|
| **Local business owner** ("Priya") | Runs a shop/clinic/restaurant, no tech background | A website and promo videos, clear pricing, quick turnaround | Being overcharged, jargon |
| **Creator / personal brand** ("Arjun") | YouTuber/Instagram creator | Fast editing, consistent style, reels | Missed deadlines, style mismatch |
| **Startup founder** ("Sam") | Early-stage product team | Landing page + product demo video + analytics dashboard | Quality, reliability, one point of contact |
| **Marketing manager** ("Neha") | In-house at a mid-size company | Reports, dashboards, campaign videos | Needs proof, case studies, results |

Primary device split assumption: **65% mobile / 35% desktop**. Mobile is designed first.

---

## 3. Positioning and messaging

- **One-liner (draft):** "Video, websites, and data: one studio that makes your brand impossible to scroll past."
- **Tone:** confident, warm, direct. No buzzword soup. Short sentences.
- **Differentiators:** one team for three disciplines; fast turnaround; transparent process; measurable results (we analyse data, so we prove impact).
- **Headline pattern:** plain statement with **one emphasised word in the accent italic serif**, e.g. "Content that *performs*."

---

## 4. Sitemap and navigation

```
/                      Home
/services              Services overview
/services/video-editing
/services/web-development
/services/data-analysis
/work                  Projects grid with filters
/work/[slug]           Case study
/process               How we work
/about                 Studio, team, values
/contact               Quote request + contact details
/privacy               Privacy policy
/terms                 Terms (optional v1)
/404                   Custom not-found
/sitemap.xml, /robots.txt   Generated
```

**Header:** logo (left) · Work · Services · Process · About · Contact · primary CTA "Start a project" (right). On mobile: logo + hamburger opening a full-screen menu with large type and social links.
**Header behaviour:** transparent over hero; becomes solid blurred background after 80px scroll; hides on scroll down, shows on scroll up.
**Footer:** logo, nav, services list, contact email/phone, social links, newsletter-free (v1), "Available for new work" status badge, copyright, privacy link, back-to-top.

---

## 5. Page requirements

Priority key: **P0** = launch blocker, **P1** = should have, **P2** = nice to have.

### 5.1 Home (`/`)

| # | Section | Requirements | Priority |
|---|---|---|---|
| H1 | **Hero** | Full-viewport. Large headline with one accent-italic word. One-line subhead. Two CTAs: "View our work" (primary), "Start a project" (secondary). Background: muted looping video (≤ 4 MB, WebM + MP4, poster image) or animated gradient/noise fallback. Entrance animation: headline lines slide up with stagger. | P0 |
| H2 | **Stat counters** | 3–4 numbers (e.g. projects delivered, happy clients, turnaround days, services). Count up once when scrolled into view. Values editable in content file. | P0 |
| H3 | **Showreel / intro** | Short "who we are" paragraph + a showreel video card (click to open lightbox player, not autoplay with sound). | P0 |
| H4 | **Featured projects** | 4 cards from CMS, hover shows image/video preview and tags. Links to case study. "View all projects" CTA. | P0 |
| H5 | **Services stack** | The signature section. Three full-width service panels (Video / Web / Data). On desktop they **pin and stack as the user scrolls** (GSAP ScrollTrigger); on mobile they become normal stacked cards. Each panel: small label, big title with accent word, 2-sentence description, 3 bullet capabilities, "Learn more" link, abstract visual/loop. | P0 |
| H6 | **Capabilities list** | Large typographic list of 8–10 specific offerings (e.g. Reels editing, YouTube editing, Motion graphics, Business websites, Landing pages, Web apps, Dashboards, Reports, Data cleaning). Hover highlights row and links to relevant service page. | P1 |
| H7 | **Marquee** | Infinite horizontally scrolling text band of services. Pauses on hover; respects reduced-motion (becomes static). | P1 |
| H8 | **Client logos** | Grid/wall of logos (greyscale, colour on hover). Placeholder logos acceptable until real clients exist; hide section if fewer than 4. | P1 |
| H9 | **Process teaser** | 4 steps in a row: Discover → Design → Build/Edit → Launch & Measure. Links to `/process`. | P1 |
| H10 | **Testimonials** | Carousel or stacked cards, 3–5 quotes with name, role, company. Keyboard accessible. | P1 |
| H11 | **FAQ** | 6–8 questions in accessible accordion (turnaround, pricing, revisions, ownership of files, hosting, communication, tools). FAQ structured data (JSON-LD). | P1 |
| H12 | **Closing CTA** | Large headline "Got an idea? *Let's talk.*", email and phone, button to `/contact`. Optional animated graphic. | P0 |

### 5.2 Services overview (`/services`)
- Intro headline and paragraph.
- Three large cards linking to each service page with hover motion.
- "How the services work together" strip (e.g. site + launch video + analytics dashboard bundle).
- Closing CTA. **P0**

### 5.3 Service detail pages (×3)
Shared template, different content:
1. Hero (service name, one-liner, CTA)
2. What's included (grid of 6 items, icon + title + sentence)
3. Process specific to this service (4–5 steps)
4. Tools and deliverables (e.g. Premiere Pro, After Effects, DaVinci / Next.js, Figma / Python, SQL, Power BI, Looker Studio)
5. Related projects (filtered from CMS)
6. Pricing approach: "Starting from" ranges or "Custom quote" (owner decision, see Open Questions)
7. Service FAQ (3–4 questions)
8. CTA

**Video Editing:** show before/after or reel samples; formats (9:16, 16:9, 1:1); turnaround; revision policy.
**Web Development:** show device mockups; tech used; performance/SEO promise; hosting/maintenance option.
**Data Analysis:** show dashboard mockups and an example insight; data security statement; typical deliverables (dashboard, report, cleaned dataset). **P0**

### 5.4 Work / Projects (`/work`)
- Grid (2 columns desktop, 1 mobile) of project cards: cover image/video, title, client, tags.
- Filter bar: All · Video · Web · Data (client-side filter with animated layout change; URL query param `?type=video` is shareable).
- Cards lazy-load; hover preview muted video on desktop. **P0**

### 5.5 Case study (`/work/[slug]`)
Template sections: hero cover + title + tags + year + services used → overview (client, challenge) → solution → gallery/video embed → results (metrics, 2–4 numbers) → client quote (optional) → next project link → CTA.
Each case study must have its own title, meta description, and OG image. **P0**

### 5.6 Process (`/process`)
Vertical timeline, 5 stages (Discovery call → Proposal & scope → Creation → Review & revisions → Launch & support). Each: what we do, what we need from you, typical duration. Link to FAQ. **P1**

### 5.7 About (`/about`)
- Studio story and values (3 value cards)
- Team grid (photo, name, role, short line); photos optimised
- Tools/stack strip
- "We're hiring / collaborate" mini-CTA (optional). **P1**

### 5.8 Contact (`/contact`)
**Form fields:** Name* · Email* · Phone (optional) · Company (optional) · Service interested in* (multi-select chips: Video / Web / Data / Not sure) · Budget range (select, optional) · Project details* (textarea, min 20 chars) · Preferred contact method (optional).
**Behaviour:** inline validation (Zod), disabled submit while sending, success message with next-steps copy ("We reply within 1 working day"), error fallback showing email address. Honeypot field + rate limiting for spam. Service pre-selected via `?service=` query param.
**Side panel:** email, phone/WhatsApp, working hours, time zone, social links, response-time promise.
**Delivery:** email to the agency inbox via transactional email API; auto-reply to the sender; submission also stored (see §7). **P0**

### 5.9 Legal and utility pages
Privacy policy (what data the form and analytics collect), cookie notice only if non-essential cookies are used, custom 404 with link back home. **P0** for privacy + 404.

---

## 6. Content model (CMS-ready)

Start with local typed content files (JSON/MDX in repo). Structure fields so a headless CMS (Sanity) can replace them later without changing components.

**Project**
```
slug, title, client, year, summary,
type[] (video|web|data), tags[], cover (image|video),
gallery[], videoUrl?, liveUrl?,
challenge, solution, results[{label,value}],
testimonial?{quote,name,role}, featured(bool), order
```
**Service:** `slug, title, tagline, description, capabilities[], tools[], process[], faqs[], relatedType`
**Testimonial:** `quote, name, role, company, avatar?`
**TeamMember:** `name, role, photo, bio?, links?`
**FAQ:** `question, answer, scope (global|service slug)`
**SiteSettings:** `agencyName, email, phone, address?, socials[], availabilityStatus, stats[]`

---

## 7. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| F1 | Contact form submits server-side (API route / server action), validates with the same Zod schema on client and server | P0 |
| F2 | Email notification to agency + auto-reply to sender via Resend (or equivalent) | P0 |
| F3 | Spam protection: honeypot + IP rate limit (e.g. 5/hour) + optional Cloudflare Turnstile | P0 |
| F4 | Light/dark theme: default dark, toggle in header, preference saved, respects `prefers-color-scheme` on first visit | P1 |
| F5 | Smooth scrolling (Lenis) that is disabled when `prefers-reduced-motion` is set | P1 |
| F6 | Page transitions (fade/slide) between routes | P2 |
| F7 | Video: lazy-loaded, muted loops, poster images, no autoplay on data-saver, lightbox player for full showreel | P0 |
| F8 | Project filter with shareable URL state | P0 |
| F9 | Custom cursor on desktop (subtle follower; hidden on touch devices) | P2 |
| F10 | Analytics: privacy-friendly (Plausible or Vercel Analytics) with events: `cta_click`, `form_start`, `form_submit`, `project_view`, `showreel_play` | P1 |
| F11 | Sitemap, robots, canonical URLs, OpenGraph/Twitter images per page, JSON-LD (Organization, FAQPage, Service, CreativeWork) | P0 |
| F12 | Sticky mobile CTA button ("Start a project") after hero | P1 |
| F13 | "Available for new work" badge driven by SiteSettings | P2 |
| F14 | Click-to-copy email, click-to-call phone, WhatsApp link | P1 |

---

## 8. Non-functional requirements

**Performance (mobile, 4G throttled):** LCP ≤ 2.5 s · CLS ≤ 0.1 · INP ≤ 200 ms · initial JS ≤ 200 KB gzipped on Home · total Home page weight (excluding deferred video) ≤ 1.5 MB.
- Images: AVIF/WebP via `next/image`, explicit dimensions, responsive `sizes`.
- Fonts: self-hosted through `next/font`, `display: swap`, max 3 families.
- Video: compressed (H.264 MP4 + WebM), hero loop ≤ 4 MB, others loaded on interaction/visibility.
- Heavy animation libraries loaded only where used (dynamic import).

**Accessibility (WCAG 2.2 AA):** colour contrast ≥ 4.5:1 body, 3:1 large text · visible focus rings · full keyboard navigation · semantic landmarks and headings · alt text on all meaningful media · captions/transcript for showreel · `prefers-reduced-motion` removes parallax, pinning, marquee, counters animate instantly · touch targets ≥ 44×44 px.

**SEO:** one `<h1>` per page · unique title (≤ 60 chars) and description (≤ 155) · clean slugs · internal linking between services and projects · image alt text · fast mobile experience.

**Responsive:** 360 px to 1920 px+ with breakpoints in `DESIGN.md`. No horizontal scroll at any width.

**Browser support:** last 2 versions of Chrome, Safari (incl. iOS), Firefox, Edge.

**Security and privacy:** HTTPS only · security headers (CSP, X-Content-Type-Options, Referrer-Policy) · no secrets in client bundle · form data used only to reply, stored ≤ 12 months, deletable on request · cookie banner only if non-essential cookies are added.

**Reliability:** deployed on a platform with CDN and automatic rollbacks; uptime monitoring with alerts (UptimeRobot or Better Stack free tier).

---

## 9. Technical approach (summary)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js (App Router) + React + TypeScript** | SEO, image optimisation, server-side form handling, file-based routing |
| Runtime | **Node.js current LTS** | Required by Next.js tooling |
| Styling | **Tailwind CSS v4** with CSS variables from `DESIGN.md` | Fast, consistent tokens |
| Animation | **GSAP + ScrollTrigger** (pinned service stack, counters), **Motion (Framer Motion)** for UI transitions, **Lenis** for smooth scroll | Best-in-class scroll storytelling |
| Forms | React Hook Form + Zod | Shared validation |
| Email | Resend | Simple API, free tier |
| Content | Typed JSON/MDX files in repo → optional Sanity later | Zero cost start, upgradeable |
| Hosting | Vercel (free/hobby tier to start; check commercial-use terms before launch) | Native Next.js support |
| Analytics | Plausible or Vercel Analytics | Privacy-friendly |
| Package manager | pnpm | Fast, disk-efficient |
| Quality | ESLint, Prettier, Lighthouse CI, Playwright smoke tests | Catch regressions |

Detailed setup is delivered in the step-by-step guide.

---

## 10. Success metrics (first 90 days)

- Unique visitors, traffic sources, top pages
- Contact form conversion rate (target ≥ 3%)
- Qualified leads per month (target set by owner)
- Showreel play rate (target ≥ 15% of Home visitors on desktop)
- Core Web Vitals "Good" for ≥ 75% of page loads
- Average engagement time on Home ≥ 45 s

---

## 11. Milestones

| Phase | Output | Rough time (solo, part-time) |
|---|---|---|
| 0. Setup | Repo, tooling, deploy pipeline, design tokens | 1–2 days |
| 1. Foundation | Layout, nav, footer, theme, fonts, base components | 3–4 days |
| 2. Home | All Home sections with animation | 5–7 days |
| 3. Inner pages | Services, Work, Case study, Process, About | 5–7 days |
| 4. Contact + backend | Form, email, spam protection | 2–3 days |
| 5. Content | Real copy, projects, images, videos | 3–5 days (parallel) |
| 6. Polish | Accessibility, performance, SEO, cross-browser | 3–4 days |
| 7. Launch | Domain, analytics, monitoring, Search Console | 1 day |

---

## 12. Risks and mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Heavy video/animation slows the site | Poor Core Web Vitals, lost leads | Compress video, lazy-load, performance budget, test on a mid-range phone |
| No real portfolio yet | Weak proof | Create 3–4 self-initiated showcase projects (one per service); label honestly |
| Too similar to the inspiration site | Credibility and legal risk | Original copy, palette, type, layout details; review against DESIGN.md |
| Scope creep | Late launch | Strict P0/P1/P2; features outside this PRD go to v1.1 list |
| AI-generated code inconsistency | Messy codebase | Keep `DESIGN.md` + `PRD.md` in repo root; review each step; commit after every step |
| Free hosting limits / terms | Surprise limits | Verify commercial-use terms; budget for paid tier or move to Cloudflare Pages/Netlify |

---

## 13. Open questions (owner to decide)

1. Agency name, logo, domain
2. Target region/currency; show prices or "custom quote"?
3. Real portfolio items available now?
4. Team members shown on site (names, photos)?
5. Preferred contact channel (email, WhatsApp, call booking via Cal.com)?
6. Include a booking widget (Cal.com) in v1?
7. Social links and showreel source (self-hosted vs YouTube/Vimeo)?

---

## 14. Acceptance criteria (launch checklist)

- [ ] All P0 pages and sections implemented and responsive
- [ ] Contact form delivers email and auto-reply; spam protections active
- [ ] Lighthouse mobile ≥ 90 on Home, Services, Work, Contact
- [ ] Keyboard-only walkthrough passes; axe scan has zero critical issues
- [ ] Reduced-motion mode verified
- [ ] Unique meta title/description/OG image on every page; sitemap submitted
- [ ] Privacy policy and 404 live
- [ ] Analytics events firing; uptime monitor active
- [ ] Tested on iPhone Safari, Android Chrome, desktop Chrome/Firefox/Edge
- [ ] No placeholder text (lorem ipsum) remains
