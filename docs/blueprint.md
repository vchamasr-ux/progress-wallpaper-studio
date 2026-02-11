# blueprint.md — Progress Wallpaper Studio

## 0) Product thesis
A fast, deterministic generator that turns a goal into a *phone-ready lock screen pack* (PNG downloads).  
Core value: **zero app fatigue** → “update goal → regenerate wallpaper → set lock screen.”

This is *not* a habit tracker. It’s a generator that produces an artifact users want now.

## 1) Goals and constraints
### Primary goals
- Generate lock screen wallpapers in under 30 seconds end-to-end.
- No AI calls, no user photo uploads, no moderation burden.
- Mobile-first UX with a satisfying live preview.
- Paywall unlocks high-value exports (multiple sizes, pack zips, more templates).

### Constraints
- Deterministic rendering (template engine + canvas/SVG).
- Keep backend minimal (payments verification + file delivery gating).
- Fast validation sprint: ship a small V0, measure conversion, decide quickly.

## 2) Product scope by phases

### Phase A — Validation Sprint (V0)
**Objective:** prove paid demand quickly with minimal engineering.

V0 scope:
- Single-goal generator (no accounts, no saved goals).
- Two modes:
  - Countdown (target date → “days remaining”)
  - Progress (X of Y with +/− update)
- 3 templates (Minimal / Bold / Neon).
- Live preview.
- Exports:
  - Free: 1 Story-size PNG (1080×1920) with watermark
  - Paid: iPhone pack + Android pack + Story pack, no watermark
- Stripe paywall:
  - One-time purchase “Unlock packs” (e.g., $6.99–$9.00)
- Instrumentation:
  - Track landing → generate → checkout → success
- Launch content:
  - 12–20 ultra short clips (8–12 seconds)

Success criteria (pre-commit):
- >= 300 landing sessions AND >= 1% purchase conversion OR
- consistent comments asking “where do I get this?” + meaningful click-through

Kill / pivot criteria:
- >= 300 landing sessions AND < 1% conversion AND low engagement
  → change offer (templates, price, hook) once; if still flat, stop.

### Phase B — Productize (V1)
**Objective:** expand value without turning into a tracker app.

V1 scope:
- Goals list + edit flow (local-only persistence).
- Pack generator:
  - multiple sizes
  - optional “photo shuffle pack” (e.g., 7/14/30 variants)
- Template library grows to 10–15.
- “Modes” expand:
  - Month progress
  - Year progress (optional)
- Basic “Download hub” after checkout.
- Optional: email receipt includes download link (via Stripe receipts).

### Phase C — Scale (V2)
**Objective:** growth + distribution loops.

V2 scope:
- Template drops (monthly pack).
- Affiliate/referral (discount link for sharing).
- Optional marketplace channel:
  - Etsy listing that links to generator (or sells template packs).

## 3) Distribution blueprint (non-network marketing)

### Channel mix
- Short-form video: TikTok / Reels / Shorts
- Optional: Etsy listing + Pinterest (evergreen)
- SEO pages (quiet compounding): “goal wallpaper”, “countdown wallpaper”, “progress lock screen”

### Content strategy: “hook → proof → payoff”
Each clip:
- 0–1s: punchy hook text
- 1–7s: screen recording: edit → generate → show lock screen
- 7–10s: CTA: “Generate yours in 20 seconds”

Clip themes (evergreen, not just New Year):
- “Trip countdown lock screen”
- “30 workouts punch card lock screen”
- “Exam countdown”
- “No-spend sprint”
- “Read 12 books”

## 4) Architecture blueprint (minimal backend)
- Frontend: static site
- Rendering: client-side canvas/SVG
- Payments: Stripe Payment Links or Checkout
- Download gating:
  - simplest: after payment success redirect to a unique “download” URL with a short-lived token
  - validate token server-side before serving ZIP

Operational philosophy:
- Fail loudly on required fields and payments verification.
- No silent fallbacks.

## 5) Risk register + mitigations
- Market saturation risk: avoid “habit tracker” messaging; sell “lock screen generator”.
- Seasonality risk: position around countdowns + challenges year-round.
- Content traction risk: require 20-clip batch before judging outcome.
- Support risk: add a “How to set wallpaper” page + device instructions.

## 6) Deliverables
- specs.md (product + technical requirements)
- todo.md (execution checklist)
