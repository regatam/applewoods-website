# Apple Woods Website — Launch Prep Design

Date: 2026-06-06
Repo: `regatam/applewoods-website`
Base branch: `codex/loaded-github-main`
Status: approved design, pre-implementation

## Goal

Get the Apple Woods sales site ready to publish officially. Two tracks:

1. **Usability fixes** — applied once, in shared components, so they benefit every copy version.
2. **Copy fork** — ship the client's own copy as the official default, while keeping Rene's optimized copy reachable for internal comparison.

Sequencing is deliberate: **usability first, copy second**, so we never maintain two versions of the same fix.

## Architecture — copy fork

One codebase, one deploy. All visible strings move into a content layer; components render from it. Two content sets:

- **`client`** (default, no URL param) — the official launch copy. Resolved from the client's decision table. This is what the public and the client see.
- **`smcopy`** (`applewoods.us/?v=smcopy`) — Rene's optimized copy (the current live wording). Reachable only via the param; persisted to `localStorage` so it sticks per-browser once flipped.

Selection logic (runtime, on load):
```js
const params = new URLSearchParams(location.search);
const stored = localStorage.getItem("aw_copy");
const version = params.get("v") === "smcopy" ? "smcopy" : (stored ?? "client");
// persist when an explicit param is present
```
This is intentionally an internal pre-launch comparison tool. It is security-by-obscurity (both sets ship in the bundle). Acceptable here; we can strip `smcopy` from the production build at launch if desired.

## Phase 1 — Usability fixes (shared, version-agnostic)

### 1. Mobile horizontal feature scroller

**Problem:** The section after the hero (the six "… built in" feature cards) becomes a horizontal scroller on mobile (`≤760px`). It scrolls roughly 4–5× the actual content, ending on empty space. Codex patched it repeatedly without fully fixing it.

**Approach:** Replace the patched flex/`max-content` row with a clean, standard **scroll-snap carousel**. Confirm exact root cause in devtools first (suspected: an overflow/track-sizing miscalc producing phantom scroll width), then rebuild on a known-good pattern rather than patching again.

**Acceptance:**
- Track width equals exactly the cards plus end padding; scroll stops dead at the last card (+16px side padding). No empty runway.
- Snap points per card, native momentum, no horizontal overflow leaking to the page.
- Desktop behavior unchanged.

### 2. Lot map + price sheet — in-page viewer

**Problem:** Both assets are PDFs. Mobile pinch-zoom on the embedded PDF lags, sticks, and breaks. Desktop click opens a new tab and leaves the site. Download CTAs add friction for the same goal (just let people *see* it well).

**Principle for both:** a click opens an **in-page modal/lightbox** with smooth zoom + pan — pinch-zoom on mobile, scroll/click-to-zoom + drag-pan on desktop. No new tab, no forced download, no leaving the page. Use a small, battle-tested pan-zoom component (e.g. `react-zoom-pan-pinch`) instead of the native PDF embed.

**Per asset (Option A, approved):**
- **Lot map** = a high-resolution raster image (render a crisp PNG/WebP from the existing PDF) shown in the pan-zoom modal. It's a graphic, so an image is the right medium.
- **Price sheet** = rebuilt as a **native responsive HTML table** (data sourced from the existing price sheet), shown in the modal. Pixel-sharp at any zoom, naturally responsive, selectable — better than zooming a flat image of a table.

**Acceptance:**
- Page shows a thumbnail/preview for each; clicking opens the modal viewer.
- Modal: ESC + backdrop-click + close button to dismiss, focus trapped, scroll-locked behind it.
- Mobile pinch-zoom and pan are smooth (no stick/lag); desktop zoom + drag works.
- No new-tab navigation; download buttons removed.

### 3. Duplicate "features" section — content-strategy rethink

**Problem:** The horizontal feature cards and the sticky "Our Amenities" scroll communicate nearly the same thing twice ("… built in" features). The sticky section is immersive but redundant.

**Approach:** Prototype 2–3 directions in the live site and choose on localhost. Candidate directions:
- (a) Collapse the two into one stronger sticky sequence.
- (b) Keep the sticky immersion but repurpose it to carry the **value/price argument** — "nothing like this in Brownsville at this price."
- (c) Replace one with a proof/comparison block (what you get here vs. a plain lot elsewhere).

The north star: drive the visitor to make contact by making the value obvious. Decision made visually together; no fixed acceptance until we pick.

## Phase 2 — Copy fork

### Content layer extraction

Move every visible string out of `src/main.jsx` into a content module (e.g. `src/content/`), keyed by section. Components consume `content.<section>.<field>`. While extracting, remove the dead V1 components (`Nav`, `Hero`, `Difference`, `StickyStory`, `HomePage`) — nothing renders them; `App` only returns `VersionTwoPage`.

### Version sets

- **`smcopy`** = the current published wording = **column 4 ("Published v1")** of the decision table. This is effectively today's live site copy.
- **`client`** = resolved from **column 5 ("For applewoods.us Official")** of `docs/applewoods-official-copy-source.md`.

### Decode rules for the `client` set (column 5)

- `3` → use the client's full copy (column 3) — applies to ~30 rows; the client's longer, rawer writing.
- `4` → keep the published wording (column 4) — rows 2 (contact), 3 (hero headline).
- explicit text → use exactly that string.
- blank → both columns matched; use that (row 19 lot names).

### Confirmed edge-case handling

1. Hero secondary CTA → **"View Pricing"** (row 5; was "View Lots") — wired to open the price-sheet viewer.
2. Submit button → **"Ask About Phase 1 homesites"** (row 37; was "Send inquiry").
3. Phase note uses **"will increase"** (row 21) — stronger than "may increase".
4. Lot names → **Classic / Premier / Corner Homesites** (row 19).
5. Row 36's request for a comments/questions field is already satisfied by the existing textarea — no change.
6. The client's copy is materially longer (FAQs especially). Layout must stay clean and responsive at that length; we review the visual weight on localhost and adjust spacing/typography if needed.

## Imagery / non-copy action items (client notes, not rendered)

- Row 12: `(mejorar fotografía ya que ese poste esta oxidado y sucio)` → replace the rusty/dirty security-pole photo in the Security amenity.
- Row 21: `(mas claro en el q&a)` → ensure the "pricing will increase" point is also clearly made in the FAQ.

## Out of scope / known gaps (flagged, not in this plan unless requested)

- **Lead delivery:** `api/lead.js` validates input then only `console.info`s it — no email/CRM. Form submissions currently go nowhere. Recommend wiring real delivery before official launch; not included here unless Rene says so.

## Verification

- `npm run build` stays green throughout.
- Visual QA on the dev server at mobile (≤390px) and desktop widths for each change.
- Scroll fix: confirm no phantom horizontal scroll on mobile; carousel ends at last card.
- Viewer: confirm smooth pinch/drag on mobile, zoom/drag on desktop, no new-tab/download, modal dismiss works.
- Copy fork: default loads client copy; `?v=smcopy` loads optimized copy and persists; both render every section with no missing strings.

## Branch / deploy

Build on `codex/loaded-github-main` (current working branch, holds all latest work). Open the PR into `main` when launch-ready. Vercel deploy stays a single project.
