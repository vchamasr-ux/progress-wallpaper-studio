# todo.md — Progress Wallpaper Studio

## Phase A — Validation Sprint (V0)

### A1) Offer + pricing
- [ ] Choose V0 product offer:
  - [ ] One-time unlock price (pick: $6.99 / $8.99 / $9.99)
  - [ ] Decide free tier limits (story export only + watermark)
- [ ] Create Stripe product + payment link / checkout

### A2) Landing page (must be shippable fast)
- [ ] Hero section: 8–12s autoplay demo (screen recording)
- [ ] 3 bullets: what it is / why it works / how updates work
- [ ] “Generate yours” CTA
- [ ] FAQ: “No app fatigue”, “No printing required”, “No AI / no uploads”
- [ ] Basic legal: privacy policy + terms stub

### A3) Generator UI (single goal, no accounts)
- [ ] Mode toggle: Countdown / Progress
- [ ] Countdown fields:
  - [ ] title
  - [ ] target date
  - [ ] optional start date
- [ ] Progress fields:
  - [ ] title
  - [ ] target (Y)
  - [ ] current (X) with +/−
- [ ] Template picker (3 templates)
- [ ] Live preview panel
- [ ] “Generate pack” button

### A4) Rendering & export engine (deterministic)
- [ ] Implement template renderer (canvas or SVG)
- [ ] Export Story PNG (1080×1920)
- [ ] Export iPhone PNGs (3 sizes minimum)
- [ ] Export Android PNGs (3 sizes minimum)
- [ ] ZIP creation for iPhone + Android packs
- [ ] Watermark toggle for free tier

### A5) Paywall + download gating
- [ ] “Checkout” button opens Stripe payment link/checkout
- [ ] Success redirect returns to /download with session id
- [ ] Server verifies payment success
- [ ] Mint short-lived download token
- [ ] Download hub:
  - [ ] iPhone ZIP (locked unless paid)
  - [ ] Android ZIP (locked unless paid)
  - [ ] Story PNG (free; paid removes watermark)

### A6) Analytics for validation
- [ ] Event tracking (landing_view, generate_clicked, checkout_started, checkout_success, downloads)
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
- [ ] Goals list page
- [ ] Create/edit goal
- [ ] Save goals locally
- [ ] Explicit error if persistence unavailable (no silent failure)

### C2) Template expansion
- [ ] Add 7–12 new templates
- [ ] Add “Month progress” mode

### C3) Photo shuffle packs
- [ ] Generate 7/14/30 variants per goal
- [ ] Bundle as ZIP + simple setup instructions

### C4) Optional channels
- [ ] Etsy listing for template packs (optional)
- [ ] SEO pages (optional)
