# Smoke Test Guide (Manual)

## 1. Landing Page
- [ ] **Load**: Check hero renders with future date (e.g., ~400 days from now).
- [ ] **Metadata**: Hover tab to see "Progress Wallpaper Studio".
- [ ] **Privacy Link**: Verify "How it Works" and "Privacy First" copy mentions "Minimal anonymous analytics".

## 2. Generator (Free Flow)
- [ ] **Edit**: Change title to "Test Goal".
- [ ] **Mode**: Switch to "Progress" mode. Usage inputs work.
- [ ] **Download Free**: Click "Download Free Sample".
  - [ ] Button shows "Generating...".
  - [ ] ZIP captures. Unzip to see `progress-wallpaper-progress.zip`.
  - [ ] Contains 7 files (iphone/android folders + story).
  - [ ] Images have watermark (if logic implemented in template - currently assumes template handles watermark prop).

## 3. Stripe Flow (Pro)
- [ ] **Unlock**: Click "Unlock Pro Pack ($6.99)".
- [ ] **Redirect**: Should go to Stripe Checkout (test mode).
- [ ] **Payment**: Use test card (4242...).
- [ ] **Return**: Should redirect back with `?session_id=...`.
- [ ] **Verify**: "Verifying..." spinner appears.
- [ ] **Success**: "Unlock" button disappears, "Download Hub" appears.
- [ ] **Download Pro**: Click "Download Full Pack".
- [ ] **Check**: ZIP contains same structure but check if watermark is gone (need to visually verify export).

## 4. Mobile Export QA
- [ ] **Aspect Ratios**: Verify story is 9:16.
- [ ] **Text Size**: Check readability on mobile device.
