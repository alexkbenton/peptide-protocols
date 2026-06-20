# One-Time Setup — The Content Machine

Goal: wire this up over a few days, then leave it running. After setup, your only
recurring job is a monthly glance. Everything below is done **once**.

There are two halves: **(A) catch the audience** (email capture) and **(B) feed the
machine** (auto-posting content). Do A first — it's the bucket that makes B worth it.

---

## A. Email capture — wire it up (~10 minutes)

Your site already captures emails. The code is done; it's just not connected to
Mailchimp yet, so right now signups only get logged, not saved. Fix that:

1. **Get your Mailchimp credentials**
   - Log in to Mailchimp → **Account → Extras → API keys** → *Create A Key*. Copy it.
   - Your **server prefix** is the part after the dash in the key (e.g. a key ending
     `-us21` means prefix `us21`). It's also in your Mailchimp URL.
   - Get your **Audience ID**: **Audience → Settings → Audience name and defaults**.

2. **Add them to Vercel**
   - Vercel dashboard → your `peptide-protocols` project → **Settings → Environment Variables**.
   - Add three variables:
     ```
     MAILCHIMP_API_KEY      = (your key)
     MAILCHIMP_AUDIENCE_ID  = (your audience id)
     MAILCHIMP_SERVER_PREFIX= (e.g. us21)
     ```
   - Set them for **Production** (and Preview if you want).

3. **Redeploy** (Vercel → Deployments → ⋯ → Redeploy, or push any commit).

4. **Test:** open the site in an incognito window, enter a test email, then confirm
   it lands in your Mailchimp audience tagged `peptide-protocols-gate`.

That's it. From now on every visitor who passes the gate is saved to a list you own.
You don't have to email them — the list just sits there until you have something to
announce (the Shop launch). One email, one day, when it counts.

> Optional later: write a short welcome email in Mailchimp set to auto-send. Build
> once, runs forever. Not required for capture to work.

---

## B. The content machine — set it once

### B1. Pick your auto-posting tool
You want one that **auto-generates faceless videos AND auto-posts on a schedule**.
Options that do both (compare current pricing yourself, all change often):
- **ReelMoney** — AI voiceover + stock footage, multi-platform auto-post, has a free tier.
- **AutoReels / AutoClips** — faceless AI videos, auto-post daily to TikTok/Reels/Shorts.

Budget reality: ~$30–50/mo gets you daily auto-posting. You have plenty of headroom.

### B2. Connect your accounts (do this once)
- Create **2–3 accounts per platform** (TikTok, Instagram, YouTube). This is your
  insurance: in this niche an account can get suppressed, and you never want the
  machine to stop because one died. Over-provision now, never react later.
- Compliant bio on each: a one-line description + **"Educational only · not medical
  advice"** + your link to `peptideprotocols.us`.
- Connect all accounts to the posting tool.

### B3. Load the brain
- Open `content-engine-prompt.md`, copy the SYSTEM PROMPT block, and paste it into
  the tool's custom-prompt / system-prompt field. This bakes in the compliance
  guardrails so every generated video is safe by default.

### B4. Load the topic queue
- Feed the tool `content-queue.csv` (58 ready topics with hooks, scripts, captions,
  hashtags). Most tools accept a CSV or let you paste topics in bulk.
- Set the schedule: **1 video/day** is plenty to start. The tool generates and posts
  on its own.

### B5. Refill when low (rare, ~5 min)
- 58 posts ≈ two months at 1/day. When the queue runs low, re-run the generator for
  a fresh, reshuffled batch:
  ```
  node marketing/generate-content-queue.mjs > marketing/content-queue.csv
  ```
  Re-running rotates angles so you get new variety from the same library. Add new
  protocols to `src/data/protocols.ts` and the generator picks them up automatically.

---

## What "leave it running" actually means

| Frequency | What you do | Time |
|---|---|---|
| Daily | nothing — the machine posts | 0 |
| Monthly | glance at signups + which posts drove clicks; refill queue if low | ~20 min |
| If an account dies | nothing — the spares keep running; replace it whenever convenient | 0 |

The machine: **your protocols → daily compliant faceless videos → 3 platforms →
link in bio → email gate → a growing list ready for launch day.**
