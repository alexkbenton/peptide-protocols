# Peptide Protocols — Project Reference

## Quick Info
- **Live site:** https://peptideprotocols.us
- **Vercel URL:** https://peptide-protocols-xi.vercel.app
- **GitHub repo:** https://github.com/alexkbenton/peptide-protocols
- **Owner:** Alex Benton (alex.k.benton@gmail.com)
- **Domain registrar:** GoDaddy (DNS A record → 76.76.21.21)
- **Hosting:** Vercel (auto-deploys from `main` branch)

## Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3.4
- Google Fonts: Inter (body) + Playfair Display (headings)
- Klaviyo API for newsletter email collection (env vars not yet configured)
- Vimeo embeds for video content

## Design System
- **Palette:** Warm sand (#faf8f5 base), muted sage green (#47684b / #5c8160 accents), white cards
- **Aesthetic:** Premium wellness — clean, light, inviting. Reference: Levels Health, Function Health
- **Typography:** Playfair Display for headings, Inter for body. Strong hierarchy with lots of whitespace
- **Components:** Rounded cards, pill buttons, subtle hover animations, fade-in-up transitions

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, meta, JSON-LD)
│   ├── page.tsx                # Root redirect → /home
│   ├── globals.css             # Tailwind + custom components + animations
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── not-found.tsx           # Custom 404 page
│   ├── home/page.tsx           # Main homepage
│   ├── protocols/
│   │   ├── page.tsx            # Protocol index grid
│   │   └── [slug]/
│   │       ├── page.tsx        # Protocol template (dynamic route)
│   │       └── content/        # Individual protocol content components
│   │           ├── gut-health-anti-inflammation.tsx
│   │           ├── optimal-fat-muscle-mito.tsx
│   │           └── cellular-repair.tsx
│   ├── videos/page.tsx         # Vimeo video grid
│   ├── shop/page.tsx           # Coming Soon placeholder
│   ├── about/page.tsx          # Mission/purpose page
│   ├── privacy/page.tsx        # Privacy policy
│   ├── terms/page.tsx          # Terms of use
│   └── api/subscribe/route.ts  # Klaviyo newsletter subscription endpoint
├── components/
│   ├── Navigation.tsx          # Sticky nav with mobile hamburger
│   ├── NewsletterSignup.tsx    # Klaviyo email capture (footer, videos, wizard)
│   ├── Footer.tsx              # Site footer
│   ├── SiteLayout.tsx          # Nav + main + footer wrapper
│   └── ProtocolElements.tsx    # Shared protocol styling (tables, warnings, etc.)
├── data/
│   ├── protocols.ts            # Protocol metadata (slug, title, category, compounds)
│   └── videos.ts               # Video metadata (title, Vimeo ID, category)
public/
├── favicon.svg                 # SVG favicon (sage green P circle)
└── robots.txt                  # SEO robots file
```

## How Things Work

### Newsletter Signup
- No age gate. Root URL (`/`) redirects straight to `/home`.
- `NewsletterSignup` component (`src/components/NewsletterSignup.tsx`) renders in the
  footer (site-wide), the videos page CTA, and after protocol generation in the wizard
- Each placement passes a `source` prop, which becomes `custom_source` in Klaviyo so you
  can see which spot converts
- Posts to `/api/subscribe`, which calls Klaviyo's Bulk Subscribe Profiles endpoint
- Single vs. double opt-in is controlled by the Klaviyo list setting, not by this code
- In dev mode (no Klaviyo key), emails are logged to console and the UI still succeeds

### Protocols
- Protocol metadata lives in `src/data/protocols.ts` (slug, title, category, compounds list)
- Actual content is in separate React components under `src/app/protocols/[slug]/content/`
- The dynamic route `[slug]/page.tsx` maps slugs to content components via `contentMap`
- Shared formatting components in `src/components/ProtocolElements.tsx`

### Adding a New Protocol
1. Add entry to `src/data/protocols.ts` with slug, title, category, summary, compounds
2. Create content component in `src/app/protocols/[slug]/content/your-slug.tsx`
3. Import and add to `contentMap` in `src/app/protocols/[slug]/page.tsx`
4. Push to deploy

### Videos
- Video data in `src/data/videos.ts` — update `vimeoId` with real Vimeo video IDs
- Videos render as embedded Vimeo iframes in a responsive grid

### Shop (Future)
- Currently a "Coming Soon" page at `/shop`
- Nav shows "Shop" with a "Soon" badge
- Architecture is ready for Shopify Buy Button or storefront embed

## Environment Variables (Vercel)
These need to be set in Vercel → Settings → Environment Variables:
```
KLAVIYO_PRIVATE_API_KEY=pk_...   # scopes: subscriptions:write, profiles:write, lists:write
KLAVIYO_LIST_ID=abc123           # optional; omit to use account default opt-in settings
KLAVIYO_API_REVISION=2026-07-15  # optional; defaults to 2026-07-15
```

## Deployment Workflow
```bash
# Make changes, then:
git add .
git commit -m "Description of changes"
git push
# Vercel auto-deploys from main branch in ~60 seconds
```

## Key Design Decisions
- **No CMS yet** — content lives in code for speed and simplicity. Can add Sanity/Contentful later.
- **No Shopify yet** — shop page is a placeholder. Easy to add Buy Buttons or embed a storefront.
- **Gate uses cookies, not accounts** — simple, no user management needed. 30-day expiry.
- **Static generation** — protocol pages are statically generated at build time for fast loading.
- **Mobile-first responsive** — all pages work on mobile, tablet, and desktop.

## SEO
- Per-page title and meta descriptions
- Open Graph and Twitter Card tags
- Auto-generated sitemap.xml
- robots.txt blocks /api from indexing
- JSON-LD structured data on root layout

## What's Not Done Yet
- [ ] Klaviyo API key + list ID (env vars need to be added in Vercel)
- [ ] Real Vimeo video IDs (currently using placeholders)
- [ ] Shopify integration
- [ ] Analytics (Vercel Analytics available, just needs enabling)
- [ ] OG image for social sharing previews
