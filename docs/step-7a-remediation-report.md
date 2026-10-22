# STAGE 7A REMEDIATION REPORT: Lead Handling, Accessibility, and Business Integrity Fixes

**Project:** Luminous Digital Studio  
**Workspace:** `D:\Demo website\Company website 3`  
**Reference Document:** [`docs/step-6-audit-report.md`](file:///d:/Demo%20website/Company%20website%203/docs/step-6-audit-report.md)  
**Stage:** 7A Implementation Fixes  
**Status:** Completed & Verified (0 regressions, 13/13 automated tests passing, 0 TypeScript errors, production build verified)

---

## 1. Summary of Changes & Confirmed Defects Fixed

| # | Area / Defect | Exact Files Modified | Fix Implemented |
| :--- | :--- | :--- | :--- |
| 1 | **Enquiry API Malformed JSON 500 Error** | [src/app/api/enquiry/route.ts](file:///d:/Demo%20website/Company%20website%203/src/app/api/enquiry/route.ts) | Implemented safe `request.text()` read and dedicated `try/catch` around `JSON.parse`. Returns HTTP **400 Bad Request** with `{ ok: false, error: 'Malformed JSON payload in request body.' }` instead of 500 Internal Server Error. |
| 2 | **Spam Bot Vulnerability & Large Payloads** | [src/app/api/enquiry/route.ts](file:///d:/Demo%20website/Company%20website%203/src/app/api/enquiry/route.ts), [src/components/agency/EnquirySection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/EnquirySection.tsx) | Added hidden anti-spam honeypot inputs (`website`) on both form steps. Server safely returns generic `200 OK` acknowledgment on bot submissions without processing or alerting. Added 64KB max request size check (HTTP 413) and baseline sliding window rate limiter (5 req/min per IP -> HTTP 429). |
| 3 | **Dishonest / Unpersisted Lead Delivery** | [src/app/api/enquiry/route.ts](file:///d:/Demo%20website/Company%20website%203/src/app/api/enquiry/route.ts), [src/components/agency/EnquirySection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/EnquirySection.tsx) | Server inspects environment for real credentials (`RESEND_API_KEY` & `LEAD_DESTINATION_EMAIL`). If missing, returns `deliveryStatus: 'unconfigured_local_logged'` with clear messaging. UI honestly clarifies that the brief was logged to the development receiver and advises direct email for urgent projects. |
| 4 | **Estimator Fast-Track Keyboard Inaccessibility** | [src/components/agency/ProjectEstimator.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx) | Replaced unadorned clickable `<div>` with a semantic `<button type="button" role="checkbox" aria-checked={isExpedited} aria-label="...">` featuring keyboard focus indicators (`focus-visible:ring-2`) and Space/Enter key handlers. Added ARIA radio and checkbox roles across all category and deliverable options. |
| 5 | **Missing Estimator Email Action** | [src/components/agency/ProjectEstimator.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx) | Added dedicated `✉ Email Specification Draft ↗` action opening a pre-populated, URL-encoded `mailto:` draft with selected service, deliverables, tier, investment range (₹ INR), and timeline. Labeled form scroll action clearly as `Submit Inquiry Form With This Spec ↑`. |
| 6 | **Dummy WhatsApp Number Exposure** | [src/data/agencyData.ts](file:///d:/Demo%20website/Company%20website%203/src/data/agencyData.ts), [src/components/agency/WhatsAppButton.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/WhatsAppButton.tsx), [src/components/agency/ProjectEstimator.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectEstimator.tsx), [src/components/agency/FooterSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/FooterSection.tsx), [src/components/agency/EnquirySection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/EnquirySection.tsx) | Centralized contact configuration in `agencyData.ts` with `isWhatsAppConfigured: false` flag. Cleared dummy number `+91 98765 43210`. WhatsAppButton is hidden until verified number is configured. Estimator and footer display informative "Pending Setup" status instead of routing visitors to stranger numbers. |
| 7 | **Fabricated Testimonials Presented as Facts** | [src/components/agency/TestimonialsSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/TestimonialsSection.tsx) | Added prominent, honest `[ PORTFOLIO DEMONSTRATION NOTICE ]` banner explaining that quotes and metrics represent concept prototype models for capability demonstration. Replaced misleading "Verified Endorsements" with "Concept Benchmarks & Demonstration Reviews" and "Concept Case Partner". |
| 8 | **Generic Outbound Social Links** | [src/data/agencyData.ts](file:///d:/Demo%20website/Company%20website%203/src/data/agencyData.ts), [src/types/agency.ts](file:///d:/Demo%20website/Company%20website%203/src/types/agency.ts), [src/components/agency/FooterSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/FooterSection.tsx) | Added `isConfigured: false` flag to `SocialLink` interface. Set social URLs to `#` with status note "Official profile pending verification". Footer renders accessible "Pending" badges instead of presenting generic social homepages as agency profiles. |
| 9 | **Misleading Corporate Partnership Labels in Archive & Projects** | [src/components/agency/ProjectsSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ProjectsSection.tsx), [src/components/agency/ArchiveSection.tsx](file:///d:/Demo%20website/Company%20website%203/src/components/agency/ArchiveSection.tsx), [src/data/agencyData.ts](file:///d:/Demo%20website/Company%20website%203/src/data/agencyData.ts) | Renamed Archive section from "Verified Partnerships" / "Live Clients" to `[ Concept Engagements ]` / `CLIENT INDEX`. Modal labels in ProjectsSection updated from "Client Partner" to `Concept Partner` and "Measured Outcomes" to `Target Benchmarks & Concept Metrics`. |

---

## 2. Test Commands Executed & Outcomes

### Automated API & Security Verification Suite
Script: [`scripts/test-enquiry-api.mjs`](file:///d:/Demo%20website/Company%20website%203/scripts/test-enquiry-api.mjs)
Execution Command: `node scripts/test-enquiry-api.mjs`

```text
=== STARTING ENQUIRY API & SECURITY CONTROLS TEST SUITE ===

[PASS] Valid payload returns 200 (Got: 200)
[PASS] Valid payload response has ok=true
[PASS] Honest deliveryStatus returned: unconfigured_local_logged
[PASS] Empty name returns 400 Bad Request (Got: 400)
[PASS] Empty name returns ok=false
[PASS] Invalid email returns 400 Bad Request (Got: 400)
[PASS] Empty services array returns 400 Bad Request (Got: 400)
[PASS] Malformed JSON returns 400 Bad Request instead of 500 (Got: 400)
[PASS] Clean error message without stack trace: "Malformed JSON payload in request body."
[PASS] Honeypot submission returns 200 silent acknowledge (Got: 200)
[PASS] Honeypot response looks normal to bot (ok=true)
[PASS] Oversized payload (>64KB) rejected with 413 Payload Too Large (Got: 413)
[PASS] Rate limit triggers 429 on excessive rapid submissions

=== ALL TESTS PASSED: 13 PASSED, 0 FAILED ===
```

### Static Analysis, Types & Production Compilation

| Command | Target / Scope | Result | Outcome |
| :--- | :--- | :--- | :--- |
| `npx tsc --noEmit` | Full Workspace | Code 0 | **0 TypeScript errors**. All interfaces, props, and types valid. |
| `npm run build` | Next.js 16 Production Build | Code 0 | **Compiled in 947ms**. All 9 static and dynamic routes built successfully. |
| `node scratch/check_html.js` | HTML DOM & Structure Check | Code 0 | **Verified**. Exactly 1 `<h1>`, all anchor navigation IDs exist, 0 dummy WhatsApp links on page. |

---

## 3. Lead Delivery Status: Operational vs. Blocked

### Current Status: **Blocked on Studio Owner Credentials**
- **Technical Integration Boundary:** Fully prepared in [`src/app/api/enquiry/route.ts`](file:///d:/Demo%20website/Company%20website%203/src/app/api/enquiry/route.ts). The server checks for `process.env.RESEND_API_KEY` and `process.env.LEAD_DESTINATION_EMAIL`.
- **Honest Behavior:** When environment variables are absent, the API does **not** claim successful email delivery. It records the lead locally and returns `deliveryStatus: 'unconfigured_local_logged'`.
- **Values Required from Studio Owner to Enable Real Delivery:**
  1. `RESEND_API_KEY` (or equivalent SMTP credentials).
  2. `LEAD_DESTINATION_EMAIL` (the verified business inbox where inquiries should be forwarded).
  3. `RESEND_FROM_DOMAIN` (verified sending domain, e.g. `briefs@luminousdigital.studio`).

---

## 4. Spam Protection Limitations

1. **Honeypot Protection:**
   - Active on both Step 1 and Step 2 of the enquiry form. Bots that auto-fill all form fields are silently neutralized with an immediate 200 response without saving or forwarding.
2. **Payload Size Guard:**
   - Payloads exceeding 64 KB are rejected at the edge with HTTP 413.
3. **In-Memory Rate Limiting Ceiling:**
   - Baseline rate limiting is enforced via an in-memory sliding window (max 5 requests per minute per IP).
   - **Architectural Ceiling:** In-memory rate limiting applies per Node.js server process. If deployed to a serverless edge network (e.g. Vercel Edge / AWS Lambda) across multiple container instances, rate limiting state is not shared between instances.
   - **Upgrade Path for High-Traffic Production:** Integrate a centralized distributed cache such as Upstash Redis (`@upstash/ratelimit`) when commercial production demands multi-instance distributed throttling.

---

## 5. Accessibility Status

- **Project Estimator Fast-Track Control:** Converted to an accessible semantic `<button>` with `role="checkbox"`, `aria-checked={isExpedited}`, and Space/Enter keyboard activation. Focus ring (`focus-visible:ring-2 focus-visible:ring-[#FF003D]`) is clearly visible.
- **Service & Scale Selectors:** Provided `role="radio"` and `aria-checked` attributes.
- **Deliverables Checkboxes:** Provided `role="checkbox"` and `aria-checked` attributes.
- **External Links:** All active external links have `rel="noopener noreferrer"` and descriptive accessible labels (e.g. `(opens in a new tab)`).
- **Reduced Motion:** All GSAP timelines and CSS animations continue to respect `prefers-reduced-motion: reduce`.

---

## 6. Business & Contact Information Checklist for Studio Owner

The following items are marked as unconfigured demonstration placeholders and require real credentials before public launch:

1. **WhatsApp Business Line:**
   - Current status: Blank / Disabled in UI.
   - Required from Owner: Verified WhatsApp business number in international format (e.g. `+91 98XXXXXXXX`).
   - Where to set: `agencyConfig.contact.whatsapp` and set `isWhatsAppConfigured: true` in `agencyData.ts`.
2. **Transactional Mailbox:**
   - Current status: Unconfigured local receiver.
   - Required from Owner: Mail provider API key (`RESEND_API_KEY`) and destination email.
3. **Official Social Profiles:**
   - Current status: Tagged as `isConfigured: false` (displays "Pending" in footer).
   - Required from Owner: Real profile URLs for LinkedIn, GitHub, X, and Awwwards.
4. **Commercial Client Testimonials:**
   - Current status: Tagged with `[ PORTFOLIO DEMONSTRATION NOTICE ]`.
   - Required from Owner: Authorized client reviews and measurable KPIs to replace the demonstration concept models when available.

---

## 7. Visual & Functional Regression Check

- **Visual Frame & Aesthetic:** Unchanged. The warm panel framing, typography, and card radius tokens remain identical.
- **Scroll Animations:** GSAP timelines (Process spline draw, statement 3D scrub, services card deck pinning, and cursor preview tracking) remain intact and operational.
- **Estimator Math:** Cost calculations, scale multipliers, expedited additions, and timeline projections continue to calculate accurately with Indian Rupee (₹ INR) formatting.

---

**Next Action:** Awaiting review and approval before proceeding to any subsequent stages.
