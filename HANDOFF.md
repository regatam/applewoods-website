# Apple Woods Website — Handoff

Public sales site for Apple Woods (Brownsville, TX). Vite + React SPA, bilingual (EN/ES), deployed to Vercel.

- **Branch:** `main` (this repo ships from `main`)
- **Latest commit:** `bfd3a75` — also what's live in production
- **Live:** https://applewoods-website.vercel.app

## Build & run
```bash
npm install          # required after clone — node_modules are not committed
npm run dev          # local dev server (Vite)
npm run build        # production build → dist/
npm run preview -- --port 4180   # serve the built dist for review
```

## Deploy
Vercel is **CLI-deployed, not git-auto-deploy** — pushing `main` does NOT ship. To release:
```bash
vercel --prod --yes        # from repo root; builds remotely and aliases the prod domain
```
Verify a release by checking the live bundle:
```bash
curl --compressed https://applewoods-website.vercel.app/ | grep -oE '/assets/index-[A-Za-z0-9_-]+\.js'
# then: curl --compressed <that bundle url> | grep -F "<a phrase you changed>"
# NB: pipe curl|grep directly — storing the minified bundle in a shell variable truncates it.
```

## What's done (recent)
- Hero perf: responsive WebP/JPEG (`hero-desktop/mobile.*`) + `<link rel=preload>` + below-fold `loading=lazy` (was an 8MB PNG).
- Removed ~34MB of unreferenced legacy assets from `public/assets`.
- Life Inside cards: long-copy cards show a 3-line clamped teaser + Read more (`AmenityCard`, `.amenity-card-teaser`).
- Phase 1 Premier lot: `LotBody` Read-more expander; collapsed teaser fills the card and fades (`.lot-cards article` flex column + `.lot-body-teaser`).
- FAQ: new headings; +3 Restrictions FAQs (vehicles, garage entertaining, parking). FAQ data lives in `faqDocItems` (shared) + each variant's `faq.groups`.
- Gym amenity image swapped (`public/assets/life-gym.jpg`).

## What's next (1–3)
1. **Form headline** — decide between the doc's "Phase 1 is the lowest entry point into Apple Woods." and the current "Tell us what you are thinking." (`contact.heading.title` in the content files).
2. New **clubhouse** image, an **Ecology** photo edit, and the **Location map** (new photos + a clickable Google Maps link) — pending assets.
3. Place the remaining client-doc content (a 10-item differentiator list + a weighted community-standards rubric) — location TBD.

## Known issues / constraints
- Two content variants: **`src/content/client.js`** (the LIVE/default) overrides a **`src/content/smcopy.js`** base. Edit `client.js` for live copy; keep the two in rough parity (a switcher exists at `?v=smcopy`). Content leaves are `{ en, es }` objects.
- Premier lot ES closing paragraph is a working translation pending the client's official Spanish.
- A separate, unmerged `contact-success-polish` worktree/branch holds older built-but-undeployed contact + map-icon work — leave it unless picking that thread up.
- Secrets (Resend, Slack webhook) live in Vercel env vars, not in the repo — reference by name only.

## Key files
- `src/main.jsx` — all components (Hero, difference cards, sticky amenities, `AmenityCard`, `LotBody`, FAQ, form, footer).
- `src/styles.css` — single stylesheet.
- `src/content/client.js` / `src/content/smcopy.js` — all copy (EN/ES) + `faqDocItems`.
- `src/content/index.jsx` — content loader / language + variant resolution.
- `index.html` — head, hero preload, social tags.
