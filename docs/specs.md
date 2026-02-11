# specs.md — Progress Wallpaper Studio (V0→V1)

## 1) Overview
A mobile-first web app that generates lock screen wallpaper packs for goals:
- Countdown goals (days remaining)
- Progress goals (X of Y)

Users “update” goals by editing inputs and regenerating wallpapers.

## 2) Non-goals
- Not a habit tracker (no daily check-ins, no reminders, no streak engine).
- No bank connections.
- No AI image generation.
- No user-uploaded images/photos in V0/V1.
- No accounts/login in V0 (V1 optional local-only persistence).

## 3) Personas
- “I want something simple that keeps me honest without another app.”
- “I want my lock screen to show my progress/countdown.”
- “I want it to look good instantly.”

## 4) UX flows

### 4.1 Landing → Generate (V0)
1. Landing page with autoplay demo + “Generate yours”
2. Generator page:
   - mode picker: Countdown / Progress
   - fields update live preview
   - “Generate pack” button
3. Paywall:
   - free exports available (story PNG w/ watermark)
   - paid exports require Stripe purchase
4. Download hub:
   - deliver ZIPs for iPhone / Android and story PNGs
   - “How to set wallpaper” link

### 4.2 Goals list (V1)
- Goals list view
- Edit goal view
- Generate pack for each goal
- Local-only persistence (browser storage) with explicit error messaging if unavailable

## 5) Functional requirements

### 5.1 Modes
**Countdown**
- Required: title, target date
- Optional: start date (for percent ring calculation)
- Output: days remaining, percent complete ring

**Progress**
- Required: title, current (X), target (Y)
- UI: +/− buttons for X
- Output: X/Y and percent ring

### 5.2 Templates
- Template count:
  - V0: 3 templates
  - V1: 10–15 templates
- Templates are deterministic layouts with:
  - background gradient
  - title typography
  - progress ring / dots
  - “safe zones” for time/widgets/dynamic-island area
- Template definition:
  - JSON layout config (recommended) OR hard-coded React renderers
  - Must produce identical output for same inputs

### 5.3 Export formats
V0 paid exports:
- iPhone PNG pack (at least 3 sizes)
- Android PNG pack (at least 3 sizes)
- Story PNG (1080×1920)

V0 free export:
- Story PNG (1080×1920) watermarked

ZIP structure example:
- /iphone/*.png
- /android/*.png
- /story/*.png

### 5.4 Payments & access control
- One-time purchase unlocks paid exports.
- Payment verification must be server-side:
  - generate a short-lived download token post-payment
  - never unlock downloads purely based on client signals

### 5.5 Analytics (validation sprint)
Track events:
- landing_view
- generator_view
- generate_clicked
- checkout_started
- checkout_success
- download_clicked (by pack type)

Minimum reporting dashboard:
- sessions
- generate rate
- checkout start rate
- conversion rate
- CAC proxy (if any paid boosts are used later)

## 6) Quality requirements
- Mobile-first UI; works on Safari iOS and Chrome Android.
- Time-to-preview: < 1 second after input changes.
- Time-to-export PNG: reasonable on mobile (show progress indicator).
- Reliability: no silent failures; explicit error copy for:
  - missing required fields
  - export failure
  - payment verification failure

## 7) Security & privacy
- No user-uploaded images (reduces abuse/malware issues).
- No AI prompts stored.
- Collect minimal telemetry; avoid PII.
- If email is collected (later), it’s for receipts/download link only.

## 8) Infrastructure requirements (recommended)
- Static hosting for frontend (commercial use allowed on free tier within limits).
- Minimal backend functions:
  - verify Stripe success / webhook
  - mint download tokens
  - serve ZIPs (or provide signed URLs)

## 9) Validation sprint decision rules
- After shipping V0, run the content batch.
- If >=300 landing sessions:
  - >=1% conversion → proceed to V1
  - <1% conversion → iterate once (hooks/templates/price), then decide stop/continue

## 10) Future enhancements (post-validation)
- Photo shuffle pack generator (7/14/30-day variants)
- Template drops (monthly)
- Referral link system
- Optional “year progress” mode
