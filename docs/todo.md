# todo.md — Progress Wallpaper Studio

## Phase A — Validation Sprint (V0)

### A1) Offer + pricing
- [x] Choose V0 product offer:
  - [x] One-time unlock price ($6.99)
  - [x] Decide free tier limits (story export + watermark)
- [x] Create Stripe product + payment link / checkout

### A2) Landing page (must be shippable fast)
- [x] Hero section: 8–12s autoplay demo (screen recording/live preview)
- [x] 3 bullets: what it is / why it works / how updates work
- [x] “Generate yours” CTA
- [x] FAQ: “No app fatigue”, “No printing required”, “No AI / no uploads”
- [x] Basic legal: privacy policy + terms stub

### A3) Generator UI (single goal, no accounts)
- [x] Mode toggle: Countdown / Progress
- [x] Countdown fields:
  - [x] title
  - [x] target date
  - [x] optional start date (implied via diff)
- [x] Progress fields:
  - [x] title
  - [x] target (Y)
  - [x] current (X) with +/−
- [x] Template picker (6 templates: Minimal, Bold, Neon, Warm, Aura, Glitch)
- [x] Live preview panel
- [x] “Generate pack” button

### A4) Rendering & export engine (deterministic)
- [x] Implement template renderer (canvas or SVG)
- [x] Export Story PNG (1080×1920)
- [x] Export iPhone PNGs (3 sizes: 1290x2796, 1170x2532, 1284x2778)
- [x] Export Android PNGs (3 sizes: 1080x2400, 1440x3088, 1440x3200)
- [x] ZIP creation for iPhone + Android packs
- [x] Watermark toggle for free tier

### A5) Paywall + download gating
- [x] “Unlock” button calls `POST /api/stripe/create-checkout-session`
- [x] Success redirect returns to /?session_id=...
- [x] Client calls `GET /api/stripe/verify-session` to unlock
- [x] Download hub:
  - [x] iPhone ZIP (locked unless verified)
  - [x] Android ZIP (locked unless verified)
  - [x] Story PNG (free; paid removes watermark)

### A6) Analytics for validation
- [x] Event tracking (landing_view, generate_clicked, checkout_started, checkout_success, downloads)
- [ ] Simple dashboard view (or analytics provider)
- [ ] Add UTM support to links

### A7) Support + help content
- [ ] “How to set wallpaper on iPhone” instructions
- [ ] “How to set wallpaper on Android” instructions
- [ ] Troubleshooting: downloads, ZIP extraction, photo shuffle setup (if included)

---

## Phase B — Distribution Sprint (the whole point)

### B1) Content batch (pre-commit before judging outcome)
- [ ] Record 20 clips (8–12s):
  - [ ] 8 hook variations
  - [ ] 4 goal categories (trip, fitness, money, learning)
  - [ ] 2–3 templates shown
- [ ] Create 3 pinned posts (best performing hooks)
- [ ] Add link-in-bio landing page

### B2) Posting plan (cross-post)
- [ ] Post on TikTok
- [ ] Post on Instagram Reels
- [ ] Post on YouTube Shorts
- [ ] Reply to comments with the same CTA: “link in bio”

### B3) Measure and decide
- [ ] Track: views → profile clicks → link clicks → purchases
- [ ] If >=300 landing sessions:
  - [ ] If >=1% conversion: proceed to V1
  - [ ] If <1% conversion: iterate once (hooks/templates/price), then decide stop/continue

---

## Phase C — V1 (only if V0 validates)

### C1) Goals list + local persistence
- [x] Goals list page
- [x] Create/edit goal
- [x] Save goals locally (In-Memory for Prototype)
- [ ] Explicit error if persistence unavailable (no silent failure)

### C2) Template expansion
- [x] Add 7–12 new templates (Started: Aura, Glitch)
- [ ] Add “Month progress” mode

### C3) Photo shuffle packs
- [ ] Generate 7/14/30 variants per goal
- [ ] Bundle as ZIP + simple setup instructions

### C4) Optional channels
- [ ] Etsy listing for template packs (optional)
- [ ] SEO pages (optional)
