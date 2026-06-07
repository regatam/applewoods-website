# Apple Woods Website — Launch Prep Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the Apple Woods sales site for official launch — fix the three usability problems in shared components, then fork copy so the client's wording is the default and Rene's optimized wording is reachable via `?v=smcopy`.

**Architecture:** One Vite/React SPA, one Vercel deploy. Usability fixes land in shared components. All visible strings then move into a `src/content/` layer with two sets (`client`, `smcopy`); a runtime selector reads `?v=smcopy`/`localStorage` and picks the set. Client copy is the default.

**Tech Stack:** React 18, Vite 5, GSAP (existing), `react-zoom-pan-pinch` (new, for the viewer), Phosphor icons (existing).

**Verification model (read first):** This is a visual frontend project with no test runner, and the work is layout/UX/copy. So "verify" means, per task: (a) `npm run build` stays green, and (b) visual QA on the dev server (`npm run dev`, currently http://127.0.0.1:5174/) at mobile (~390px) and desktop widths. The one place a unit-style check earns its keep is the content layer — a small Node script asserts both copy sets share an identical key shape so no string renders `undefined`. Do NOT add a test framework otherwise (YAGNI).

**Working branch:** Create `launch-prep` off `codex/loaded-github-main` before Task 0. Commit after each task. Open the PR into `main` when launch-ready.

---

## Task 0: Branch + remove dead V1 components

Unused V1 components still live in `main.jsx` and would otherwise get needlessly extracted into the content layer. Remove them first to reduce noise. `App` renders only `VersionTwoPage`; `Nav`, `Hero`, `Difference`, `StickyStory`, and `HomePage` are unreferenced. `LifeInside`, `PhaseOne`, `Location`, `Contact`, `Footer` are shared — keep. `storyItems` is used by the live `V2StickyAmenities` — keep.

**Files:**
- Modify: `src/main.jsx`

- [ ] **Step 1: Create the working branch**

```bash
cd /Users/rene/Documents/applewoods-website
git checkout codex/loaded-github-main
git pull --ff-only origin codex/loaded-github-main
git checkout -b launch-prep
```

- [ ] **Step 2: Confirm the dead components are unreferenced**

Run: `grep -nE "<(Nav|Hero|Difference|StickyStory|HomePage)\b|HomePage\(" src/main.jsx`
Expected: matches only inside the component *definitions* themselves, never inside `VersionTwoPage` or `App`. (`App` returns `<VersionTwoPage />`.)

- [ ] **Step 3: Delete the dead component functions**

In `src/main.jsx`, delete the full function definitions for `Nav`, `Hero`, `Difference`, `StickyStory`, and `HomePage`. Leave every other component, `storyItems`, and all other data arrays intact. Do not touch CSS (dead CSS is harmless; out of scope).

- [ ] **Step 4: Build**

Run: `npm run build`
Expected: PASS, no "is defined but never used" or undefined-reference errors.

- [ ] **Step 5: Visual check + commit**

Load http://127.0.0.1:5174/ — the page must look identical to before. Then:
```bash
git add src/main.jsx
git commit -m "chore: remove unused V1 components"
```

---

## Task 1: Rebuild the mobile horizontal feature scroller

**Problem:** On mobile (`≤760px`) the six feature cards become a horizontal scroller that scrolls well past the last card into empty space. Suspected root cause: the mobile rule sets `overflow-x: auto` while the base rule's `overflow: visible` leaves `overflow-y: visible`, which browsers promote to `auto`, inflating the scroll area. Verify, then rebuild as a clean scroll-snap carousel.

**Files:**
- Modify: `src/styles.css` (mobile `@media (max-width: 760px)` block: `.v2-feature-scroller`, `.v2-feature-row`, `.v2-feature-row article`, ~lines 2319-2349; and base `.v2-feature-scroller` ~line 1687)

- [ ] **Step 1: Reproduce + diagnose**

On localhost at 390px width, scroll the feature section. In devtools console run:
```js
const s = document.querySelector('.v2-feature-scroller');
const r = document.querySelector('.v2-feature-row');
console.log({ scrollWidth: s.scrollWidth, clientWidth: s.clientWidth, rowWidth: r.getBoundingClientRect().width });
```
Expected to confirm bug: `scrollWidth` noticeably larger than `rowWidth` + padding (the phantom space).

- [ ] **Step 2: Fix the base scroller's overflow axis**

In `src/styles.css`, base `.v2-feature-scroller` rule (~1687), change `overflow: visible;` to:
```css
  overflow-x: visible;
  overflow-y: visible;
```
This stops the implicit `overflow-y: visible → auto` promotion once the mobile rule sets `overflow-x: auto`.

- [ ] **Step 3: Rebuild the mobile carousel rules**

Replace the mobile `.v2-feature-scroller`, `.v2-feature-row`, and `.v2-feature-row article` rules (~2319-2349) with:
```css
  .v2-feature-scroller {
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: 16px;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;
  }

  .v2-feature-row {
    display: flex;
    flex-wrap: nowrap;
    width: max-content;
    gap: 16px;
    margin: 0;
    padding-inline: 16px;
  }

  .v2-feature-row article {
    flex: 0 0 clamp(280px, 78vw, 340px);
    scroll-snap-align: start;
    scroll-snap-stop: always;
  }
```

- [ ] **Step 4: Re-measure**

Repeat Step 1's console snippet. Expected: `scrollWidth ≈ rowWidth` (within ~1px) and scrolling stops exactly at the last card + 16px. No empty runway.

- [ ] **Step 5: Build + visual QA + commit**

Run: `npm run build` → PASS. On localhost at 390px: cards snap one-by-one, momentum feels natural, scroll ends at the last card, page has no horizontal body overflow. Desktop unchanged.
```bash
git add src/styles.css
git commit -m "fix: mobile feature scroller stops at last card (scroll-snap rebuild)"
```

---

## Task 2: In-page viewer infrastructure + lot map

Build a reusable zoom/pan lightbox and use it for the Phase 1 lot map. No new tab, no download.

**Files:**
- Create: `src/components/Lightbox.jsx`
- Create: `src/components/Lightbox.css`
- Modify: `src/main.jsx` (`PhaseOne`)
- Modify: `src/styles.css` (`.masterplan-*` — remove the `<object>` embed styles)
- Add asset: `public/assets/phase-1-aw-sold-map@2x.png` (rendered hi-res)
- Dependency: `react-zoom-pan-pinch`

- [ ] **Step 1: Install the pan-zoom dependency**

Run: `npm install react-zoom-pan-pinch@^3`
Expected: added to `dependencies`; `npm run build` still passes.

- [ ] **Step 2: Render a hi-res lot-map PNG from the PDF**

Run:
```bash
cd /Users/rene/Documents/applewoods-website
pdftoppm -png -r 200 -singlefile public/assets/phase-1-aw-sold.pdf public/assets/phase-1-aw-sold-map@2x
sips -g pixelWidth -g pixelHeight public/assets/phase-1-aw-sold-map@2x.png | grep pixel
```
Expected: a PNG markedly larger than 1530×1980. If the render looks degraded, retry at `-r 300`.

- [ ] **Step 3: Create the Lightbox component**

Create `src/components/Lightbox.jsx`:
```jsx
import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./Lightbox.css";

export default function Lightbox({ open, onClose, label, children }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button ref={closeRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close">
        ×
      </button>
      <TransformWrapper
        doubleClick={{ mode: "toggle", step: 1.4 }}
        wheel={{ step: 0.12 }}
        pinch={{ step: 6 }}
        minScale={1}
        maxScale={6}
        centerOnInit
      >
        <TransformComponent wrapperClass="lightbox-stage" contentClass="lightbox-content">
          {children}
        </TransformComponent>
      </TransformWrapper>
    </div>,
    document.body
  );
}
```

- [ ] **Step 4: Create the Lightbox styles**

Create `src/components/Lightbox.css`:
```css
.lightbox-backdrop {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  background: rgba(15, 9, 6, 0.86);
  backdrop-filter: blur(2px);
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 20px;
  z-index: 1;
  width: 44px;
  height: 44px;
  border: 0;
  border-radius: 999px;
  background: rgba(255, 250, 244, 0.92);
  color: #2a1d14;
  font-size: 26px;
  line-height: 1;
  cursor: pointer;
}

.lightbox-stage {
  width: 100% !important;
  height: 100% !important;
  cursor: grab;
}

.lightbox-stage:active {
  cursor: grabbing;
}

.lightbox-content {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  padding: clamp(16px, 4vw, 56px);
}

.lightbox-content img {
  max-width: min(1400px, 94vw);
  max-height: 90vh;
  object-fit: contain;
}
```

- [ ] **Step 5: Wire the lot map into PhaseOne via the Lightbox**

In `src/main.jsx`, import the Lightbox at the top:
```jsx
import Lightbox from "./components/Lightbox";
```
Then in `PhaseOne`, add open state and replace the `masterplan-card` `<a>`/`<object>` block with a button that opens the lightbox:
```jsx
function PhaseOne() {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <section className="phase-one" id="phase-one">
      {/* ...phase-intro unchanged... */}
      <div className="lot-layout">
        <div className="masterplan-card">
          <button
            type="button"
            className="masterplan-trigger"
            onClick={() => setMapOpen(true)}
            aria-label="Open the Phase 1 lot map"
          >
            <img src="/assets/phase-1-aw-sold-map.png" alt="Apple Woods Phase 1 sold lot map" />
            <span className="masterplan-hint">Tap to explore the lot map</span>
          </button>
        </div>
        {/* ...phase-details unchanged for now (price sheet handled in Task 3)... */}
      </div>
      {/* ...phase-note unchanged... */}
      <Lightbox open={mapOpen} onClose={() => setMapOpen(false)} label="Apple Woods Phase 1 lot map">
        <img src="/assets/phase-1-aw-sold-map@2x.png" alt="Apple Woods Phase 1 lot map" />
      </Lightbox>
    </section>
  );
}
```

- [ ] **Step 6: Remove the dead `<object>` embed CSS + style the trigger**

In `src/styles.css`, delete the `.masterplan-pdf` rule (~677-681) and the mobile `.masterplan-pdf`/`.masterplan-map` swap rules (~2421-2430). Add:
```css
.masterplan-trigger {
  display: block;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  background: var(--paper-deep);
  cursor: zoom-in;
  position: relative;
}

.masterplan-trigger img {
  width: 100%;
  height: 100%;
  min-height: 580px;
  object-fit: contain;
}

.masterplan-hint {
  position: absolute;
  left: 16px;
  bottom: 16px;
  padding: 8px 12px;
  background: rgba(15, 9, 6, 0.7);
  color: #fffaf4;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

- [ ] **Step 7: Build + QA + commit**

Run: `npm run build` → PASS. Localhost: clicking the map opens the modal in-page; desktop wheel/double-click zoom + drag works; mobile pinch-zoom + pan is smooth (no stick/lag); ESC, ×, and backdrop close it; no new tab. 
```bash
git add src/components/Lightbox.jsx src/components/Lightbox.css src/main.jsx src/styles.css package.json package-lock.json public/assets/phase-1-aw-sold-map@2x.png
git commit -m "feat: in-page zoom/pan lightbox for the Phase 1 lot map"
```

---

## Task 3: Price sheet as native HTML table in the viewer

Replace the price-sheet PDF preview + Open/Download CTAs with a thumbnail that opens the same Lightbox, showing a native, responsive, selectable HTML table built from the PDF's text layer.

**Files:**
- Create: `src/components/PriceSheet.jsx`
- Create: `src/components/PriceSheet.css`
- Modify: `src/main.jsx` (`PhaseOne` price-sheet block)
- Modify: `src/styles.css` (remove `.price-sheet-actions` if no longer used)
- Source: `public/assets/apple-woods-price-sheet.pdf`

- [ ] **Step 1: Extract the pricing data with layout preserved**

Run:
```bash
cd /Users/rene/Documents/applewoods-website
pdftotext -layout public/assets/apple-woods-price-sheet.pdf - | sed -n '1,80p'
```
Expected: column-aligned rows of NUMBER / TYPE / SUGGESTED RETAIL PRICE / INTRODUCTORY OFFER, plus the header ("DEVELOPER'S INTRODUCTORY OFFER", "78 HOMESITES", "INTRODUCTORY OFFER FROM $85,000"). Capture every homesite row. If `-layout` is still interleaved, also try `pdftotext -table` or parse the raw stream; the goal is an accurate, complete row list.

- [ ] **Step 2: Build the data array**

In `src/components/PriceSheet.jsx`, encode the extracted rows verbatim (do not invent or round prices):
```jsx
// number, type, srp (suggested retail), offer (introductory)
export const priceRows = [
  { number: "41", type: "Square", srp: "$105,000", offer: "$85,000" },
  // ...one object per homesite from the PDF, in document order...
];
```

- [ ] **Step 3: Create the PriceSheet component**

Create `src/components/PriceSheet.jsx` (append to the file with `priceRows` above):
```jsx
import React from "react";
import "./PriceSheet.css";

export default function PriceSheet() {
  return (
    <div className="price-sheet-doc">
      <header className="price-sheet-head">
        <p className="eyebrow">Developer's Introductory Offer</p>
        <h3>Phase 1 Homesites — Suggested Retail vs. Introductory Offer</h3>
        <p>78 homesites · Introductory offer from $85,000</p>
      </header>
      <table className="price-sheet-table">
        <thead>
          <tr>
            <th scope="col">Homesite</th>
            <th scope="col">Type</th>
            <th scope="col">Suggested retail</th>
            <th scope="col">Introductory offer</th>
          </tr>
        </thead>
        <tbody>
          {priceRows.map((row) => (
            <tr key={row.number}>
              <td>{row.number}</td>
              <td>{row.type}</td>
              <td>{row.srp}</td>
              <td className="price-offer">{row.offer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
```

- [ ] **Step 4: Create PriceSheet styles (responsive, sharp at any zoom)**

Create `src/components/PriceSheet.css`:
```css
.price-sheet-doc {
  width: min(720px, 94vw);
  max-height: 88vh;
  overflow: auto;
  padding: clamp(20px, 3vw, 36px);
  background: #fffaf4;
  color: #2a1d14;
  border-radius: 4px;
}

.price-sheet-head {
  margin-bottom: 18px;
  text-align: center;
}

.price-sheet-head h3 {
  margin: 6px 0;
  color: #5f401c;
  font-size: clamp(18px, 2.4vw, 24px);
}

.price-sheet-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 15px;
}

.price-sheet-table th,
.price-sheet-table td {
  padding: 10px 12px;
  border-bottom: 1px solid rgba(88, 53, 41, 0.16);
  text-align: left;
}

.price-sheet-table thead th {
  position: sticky;
  top: 0;
  background: #f1e8dc;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.04em;
}

.price-offer {
  font-weight: 600;
  color: #5f401c;
}
```

- [ ] **Step 5: Swap the price-sheet block in PhaseOne**

In `src/main.jsx`, import:
```jsx
import PriceSheet from "./components/PriceSheet";
```
Add price-sheet open state to `PhaseOne` (`const [priceOpen, setPriceOpen] = useState(false);`) and replace the existing `<aside className="price-sheet-card">` content's links/actions with a single trigger, removing the Open Sheet / Download anchors:
```jsx
<aside className="price-sheet-card" aria-label="Apple Woods Phase 1 price sheet">
  <button
    type="button"
    className="price-sheet-preview"
    onClick={() => setPriceOpen(true)}
    aria-label="Open the Apple Woods price sheet"
  >
    <img
      src="/assets/apple-woods-price-sheet-preview.png"
      alt="Apple Woods Phase 1 developer introductory offer price sheet preview"
    />
  </button>
  <div className="price-sheet-copy">
    <p className="eyebrow">Current Price Sheet</p>
    <h3>Developer's introductory offer</h3>
    <p>Review the latest Phase 1 homesite list, suggested retail pricing, and introductory offer pricing.</p>
  </div>
</aside>
```
Then add, alongside the map Lightbox:
```jsx
<Lightbox open={priceOpen} onClose={() => setPriceOpen(false)} label="Apple Woods price sheet">
  <PriceSheet />
</Lightbox>
```

- [ ] **Step 6: Remove now-unused price-sheet action CSS**

In `src/styles.css`, delete `.price-sheet-actions` and `.price-sheet-actions a` rules (~775-810) and the mobile `.price-sheet-actions` rule (~2448). Change `.price-sheet-preview` to a button reset (`border:0; padding:0; cursor: zoom-in; width:100%;`).

- [ ] **Step 7: Build + QA + commit**

Run: `npm run build` → PASS. Localhost: price-sheet thumbnail opens the modal with a crisp, scrollable, responsive table; numbers match the PDF; zoom/pan works; no Open/Download buttons; no new tab. **Rene verifies the prices against the source PDF.**
```bash
git add src/components/PriceSheet.jsx src/components/PriceSheet.css src/main.jsx src/styles.css
git commit -m "feat: native HTML price sheet in lightbox, drop PDF link/download CTAs"
```

---

## Task 4: Duplicate "features" section rethink (collaborative checkpoint)

**This is not a fire-and-forget subagent task.** The horizontal feature cards (`V2Difference`) and the sticky "Our Amenities" scroll (`V2StickyAmenities`) say nearly the same thing twice. Rene decides the direction live on localhost.

**Files:** `src/main.jsx`, `src/styles.css` (scope depends on chosen direction)

- [ ] **Step 1: Prototype 2-3 directions on localhost**

Build, behind quick toggles or sequential commits, the candidate directions from the spec:
- (a) Collapse the two into one stronger sticky sequence (drop the redundant feature-card row, or fold its 6 items into the sticky's 4).
- (b) Keep the sticky immersion but repurpose it to carry the value/price argument ("nothing like this in Brownsville at this price").
- (c) Replace one section with a proof/comparison block (what you get here vs. a plain lot elsewhere).

- [ ] **Step 2: Review with Rene, pick one**

Present the directions on localhost. Rene chooses. Record the decision in `docs/applewoods-launch-prep-design.md` under Phase 1.3.

- [ ] **Step 3: Implement the chosen direction, build, QA, commit**

Run: `npm run build` → PASS; QA mobile + desktop.
```bash
git add -A
git commit -m "feat: resolve duplicate features section (<chosen direction>)"
```

---

## Task 5: Content-layer scaffold + version selector (no copy change yet)

Move every visible string out of `main.jsx` into `src/content/`, with `smcopy` = the current strings moved **verbatim**, and `client` initialized **identical to `smcopy`** for now. The site must look unchanged after this task — this isolates the risky refactor from the copy swap (Task 6).

**Files:**
- Create: `src/content/index.js` (selector + `useContent` hook + provider)
- Create: `src/content/smcopy.js` (current strings, verbatim)
- Create: `src/content/client.js` (re-exports smcopy for now)
- Create: `scripts/check-content.mjs` (key-shape parity guard)
- Modify: `src/main.jsx` (consume content via `useContent`)

- [ ] **Step 1: Define the content shape in `smcopy.js`**

Create `src/content/smcopy.js` exporting one object whose keys mirror the page sections. Move the **existing literal strings and data arrays verbatim** from `main.jsx` (no rewording). Required keys (every visible string must land in one):
```js
export const smcopyContent = {
  nav: { logoAlt: "Apple Woods Smart Living", links: [/* {href,label} from V2Hero nav */], cta: "Contact us" },
  hero: { tagline: "...", headlineLines: ["More Than a Subdivision:", "A Place to Truly Call Home"], subhead: "...", actions: { explore: "Explore", lots: "View Lots" }, imageAlt: "..." },
  difference: { eyebrow: "...", heading: "...", items: [/* v2FeatureItems: {title,body,image} */] },
  amenities: { titleLines: ["Our", "Amenities"], stories: [/* storyItems: {label,eyebrow,title,body,image} */] },
  valueStack: { eyebrow: "...", heading: "...", body: "...", items: [/* {title,body} */], mediaAlt: "...", actions: { ask: "Ask Costs", call: "Call Sales" } },
  lifeInside: { eyebrow: "...", heading: "...", body: "...", items: [/* {dt,dd} */], imageAlt: "..." },
  phaseOne: { eyebrow: "...", heading: "...", body: "...", lots: [/* {name,price,body} */], phaseNote: "...", priceSheet: { eyebrow, heading, body }, mapAlt: "..." },
  location: { eyebrow: "...", heading: "...", body: "...", imageAlt: "..." },
  contact: {
    heading: { eyebrow: "3.0 Inquiry", title: "...", body: "..." },
    direct: { eyebrow, heading, body, links: [/* directContactLinks: {label,detail,href,icon} */], nextLabel, nextBody },
    form: { eyebrow, title, body, labels: { name, phone, email, notes, lotType, budget, timing, interest }, selects: { lotInterest: [...], budget: [...], timeline: [...] }, interestOptions: [...], submit: "Send inquiry", successMsg, errorMsg },
    faq: { eyebrow: "...", heading: "...", items: [/* faqs: {question,answer} (13) */] }
  },
  footer: { message: "...", facebookLabel: "...", info: [...], nav: [...], copyright: "Copyright © Apple Woods 2026", backToTop: "Back to top" }
};
```
Fill each `"..."` with the exact current string from `main.jsx`. Keep the existing image paths inside the arrays.

- [ ] **Step 2: `client.js` mirrors smcopy for now**

Create `src/content/client.js`:
```js
import { smcopyContent } from "./smcopy";
// Task 6 will replace these values with the client's official copy.
export const clientContent = smcopyContent;
```

- [ ] **Step 3: Selector + context in `index.js`**

Create `src/content/index.js`:
```js
import React, { createContext, useContext } from "react";
import { clientContent } from "./client";
import { smcopyContent } from "./smcopy";

const VERSIONS = { client: clientContent, smcopy: smcopyContent };

export function resolveVersion() {
  if (typeof window === "undefined") return "client";
  const param = new URLSearchParams(window.location.search).get("v");
  if (param === "client" || param === "smcopy") {
    try { window.localStorage.setItem("aw_copy", param); } catch (e) {}
    return param;
  }
  try {
    if (window.localStorage.getItem("aw_copy") === "smcopy") return "smcopy";
  } catch (e) {}
  return "client";
}

const ContentContext = createContext(clientContent);
export const useContent = () => useContext(ContentContext);

export function ContentProvider({ children }) {
  const content = VERSIONS[resolveVersion()] ?? clientContent;
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
```

- [ ] **Step 4: Wrap the app + consume content**

In `src/main.jsx`: import `{ ContentProvider, useContent }` from `./content`. Wrap render:
```jsx
createRoot(document.getElementById("root")).render(
  <ContentProvider>
    <App />
  </ContentProvider>
);
```
Then refactor each component to read from `const c = useContent();` instead of inline literals and the module-level arrays. Delete the now-migrated module-level arrays (`storyItems`, `lotTypes`, `faqs`, `v2FeatureItems`, `valueStackItems`, `directContactLinks`, `initialLeadForm` stays — it's form state, not copy). Apply the same `c.<section>.<field>` pattern to every string. Example (V2Hero):
```jsx
function V2Hero() {
  const c = useContent();
  return (
    <section className="v2-hero" id="top">
      {/* nav uses c.nav.links / c.nav.cta / c.nav.logoAlt */}
      <div className="v2-hero-copy">
        <p>{c.hero.tagline}</p>
        <div>
          <h1>{c.hero.headlineLines.map((l, i) => <span key={i}>{i ? " " : ""}{l}</span>)}</h1>
          <p>{c.hero.subhead}</p>
          <div className="v2-actions">
            <a href="#structured">{c.hero.actions.explore}</a>
            <a href="#phase-one">{c.hero.actions.lots}</a>
          </div>
        </div>
      </div>
      {/* figure unchanged */}
    </section>
  );
}
```

- [ ] **Step 5: Content parity guard**

Create `scripts/check-content.mjs`:
```js
import { clientContent } from "../src/content/client.js";
import { smcopyContent } from "../src/content/smcopy.js";

function keyShape(obj, path = "") {
  if (Array.isArray(obj)) return `${path}:[${obj.length}]`;
  if (obj && typeof obj === "object") {
    return Object.keys(obj).sort().flatMap((k) => keyShape(obj[k], `${path}.${k}`)).join("|");
  }
  return `${path}:scalar`;
}

const a = keyShape(clientContent);
const b = keyShape(smcopyContent);
if (a !== b) {
  console.error("Content shape mismatch between client and smcopy.");
  process.exit(1);
}
console.log("Content shape OK.");
```
Run: `node scripts/check-content.mjs`
Expected: `Content shape OK.` (They're identical now; this guard protects Task 6.)

- [ ] **Step 6: Build + QA + commit**

Run: `npm run build` → PASS, and `node scripts/check-content.mjs` → OK. Localhost: page looks **identical** to before (default + `?v=smcopy` both render the same content for now).
```bash
git add src/content src/main.jsx scripts/check-content.mjs
git commit -m "refactor: move copy into a versioned content layer (no copy change)"
```

---

## Task 6: Populate the client copy + edge cases + verify the toggle

Replace `clientContent` values with the official copy resolved from `docs/applewoods-official-copy-source.md` (column 5). After this, the default site shows the client's copy; `?v=smcopy` shows the optimized copy.

**Files:**
- Modify: `src/content/client.js`

- [ ] **Step 1: Build the resolved `clientContent` object**

In `src/content/client.js`, stop re-exporting smcopy and define a full `clientContent` with the same shape as `smcopyContent`. Resolve each field by the decision table's column 5 (`docs/applewoods-official-copy-source.md`):
- **Use column 3 (client's full copy), verbatim, stripping parenthetical Spanish notes** for rows marked `3`: hero subhead (row 4); all six difference items (rows 6-11, including new Wellness + Attainability); amenities/story bodies (rows 14-16); life-inside body (row 17); phase-one body (row 18); premier lot body (row 20); location body (row 22); **all FAQ answers (rows 23-35)** — these are long paragraphs, copy them exactly from column 3.
- **Keep column 4 (current)** for rows `4`: contact section wiring (row 2 — already in `directContactLinks`); hero headline (row 3 — "More Than a Subdivision: A Place to Truly Call Home").
- **Explicit overrides:** hero secondary CTA → `"View Pricing"` (row 5); amenities security caption → `"The first impression is protected, lit, and intentional."` (row 13); phase note → `"Lot status can change quickly once buyers begin confirming selections. As availability decreases, future pricing will increase."` (row 21).
- **Row 19 (blank, both agree):** lot names → `"Classic Homesites"`, `"Premier Homesites"`, `"Corner Homesites"`.
- **Row 37:** submit button → `"Ask About Phase 1 homesites"`.
- **Row 36:** keep the existing Questions/comments textarea (no change).
- The FAQ list grows to the full 13 client questions (rows 23-35) using column-3 answers.

- [ ] **Step 2: Keep the shape identical**

Run: `node scripts/check-content.mjs`
Expected: `Content shape OK.` If it fails, a key was added/removed/renamed — fix `client.js` to match `smcopy.js` exactly (arrays may differ in length only where the data legitimately differs, e.g. FAQ count; if so, update the guard to compare object key paths but allow array length differences). 

- [ ] **Step 3: Build + QA toggle + commit**

Run: `npm run build` → PASS. Localhost:
- `http://127.0.0.1:5174/` → client copy (longer wording, "View Pricing", "Ask About Phase 1 homesites", 13 FAQs).
- `http://127.0.0.1:5174/?v=smcopy` → optimized copy; reload without param stays on smcopy (localStorage); clear via `?v=client`.
- Every section renders with no `undefined` strings; layout stays clean at the longer length (note any section that needs spacing/typography tuning for Rene).
```bash
git add src/content/client.js scripts/check-content.mjs
git commit -m "feat: official client copy as default version (?v=smcopy = optimized)"
```

---

## Follow-ups (tracked, not blocking this plan)

- **Rusty security photo (row 12 note):** swap the rusty/dirty entrance-pole image in the Security amenity. Needs a replacement asset from Rene; once provided, drop it in `public/assets/` and update the `security` image reference in both content sets.
- **FAQ pricing clarity (row 21 note):** confirmed — the "pricing will increase" point now appears in both the phase note and the FAQ (rows 21 + 25).
- **Lead delivery (`api/lead.js`):** still only logs to console. Recommend wiring real delivery (email/CRM) before official launch. Separate plan when Rene wants it.
