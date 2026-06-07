# Apple Woods — Bilingual Nav + Language Switcher Design

Date: 2026-06-07
Repo: `regatam/applewoods-website`
Branch: `launch-prep`
Status: approved design, pre-implementation

## Goal

Add English/Spanish language switching to the site, applied to **both** copy versions (client and smcopy), plus the nav UX to drive it: a desktop language switcher and a mobile slide-in menu. This spec covers the **mechanism only** — the actual Spanish translations are a separate follow-up copy pass (English source + Spanish live in the client's Google Doc; pulled in later).

Two independent dimensions:
- **Version** — `client` (default) vs `smcopy` (`?v=smcopy`). Unchanged.
- **Language** — `en` (default) vs `es`. New, chosen via the switcher, persisted to `localStorage`.

## i18n architecture (Option A — localized leaves)

Keep one content object per version. Make each *translatable* string a pair `{ en, es }`. A `localize(content, lang)` pass resolves every pair to the active language, producing the same flat shape components already consume — so **components don't change**.

`localize(node, lang)`:
- string / number → return as-is
- array → `node.map((n) => localize(n, lang))`
- object that is a translatable leaf (`typeof node.en === "string"`, keys ⊆ {`en`,`es`}) → return `node[lang] ?? node.en`
- any other object → map each value through `localize`

Convention: `{ en, es }` is reserved for translatable strings; no structural content key is named `en`. The function is **backward-compatible** — a plain string (not yet translated) returns as-is, i.e. English in both languages. This lets us ship the full mechanism now and convert strings to `{en,es}` incrementally during the copy pass without anything breaking.

The version fork (`client.js` = `structuredClone(smcopy)` + overrides) is untouched; overrides just carry `{en,es}` leaves where translated.

## Language state & selection

`src/content/index.jsx`:
- `ContentProvider` gains `const [lang, setLang] = useState(readStoredLang)` where `readStoredLang()` returns a valid stored value or `"en"`.
- Compute `const content = useMemo(() => localize(VERSIONS[resolveVersion()] ?? clientContent, lang), [lang])`.
- On `lang` change, persist to `localStorage` (`aw_lang`).
- Context exposes `{ content, lang, setLang }`. `useContent()` returns `content` (unchanged signature for existing components). Add `useLang()` returning `{ lang, setLang }` for the switcher/menu.
- SSR guard: default `"en"` when `window` is undefined.

Language is orthogonal to version: `?v=smcopy` + `es` is a valid combination.

## Components

### `LanguageSwitcher` (desktop, > 1080px) — `src/components/LanguageSwitcher.jsx`
- A square button styled to match `.v2-owner-link` ("Contact us") — same border, min-height, radius, hover — with a centered Phosphor `GlobeIcon`. Sits just left of Contact us; nav right side becomes `[ 🌐 ] [ Contact us ]`.
- Click toggles a dropdown anchored below it listing **English** / **Español**, the active one marked. Selecting calls `setLang` and closes.
- Closes on select, outside-click, and Esc. Proper `aria-expanded`/`aria-haspopup`; options are buttons.

### Mobile menu (≤ 1080px) — `src/components/MobileMenu.jsx`
- At ≤1080px the inline section menu is already hidden; the nav right side collapses to a single **hamburger** button (Phosphor `ListIcon`), replacing the globe + Contact us.
- Tapping it opens a **full-screen panel that slides in from the right (translateX(100%) → 0)**, ~360ms. Rendered via portal to `document.body`, `z-index` above the nav.
- Panel contents, stacked: the section links (`content.nav.links` → Location / Live Here / Community / Amenities), **Contact us** (`#contact`), and the **language switch** (English / Español using `lang`/`setLang`).
- Selecting a section or Contact: **slide the panel back out to the right, then auto-scroll** to the target. Implementation: `setOpen(false)`, then after ~380ms `document.querySelector(href).scrollIntoView({behavior:"smooth"})` (or set `location.hash`). Language taps switch language and keep the panel open.
- Body scroll locks while open; Esc and a close (×) button dismiss it. Focus moves into the panel on open and returns to the hamburger on close (reuse the focus pattern from `Lightbox`).

### `V2Nav` changes — `src/main.jsx`
- Render the inline section menu (existing) for > 1080px, `LanguageSwitcher` + Contact us for > 1080px, and the hamburger for ≤1080px. Visibility handled by CSS media queries (all three exist in the DOM; show/hide per breakpoint).
- The sticky/frosted/hide-on-amenities behavior already in `V2Nav` is unchanged.

## CSS — `src/styles.css`
- `.v2-lang` (square globe button) mirrors `.v2-owner-link` sizing/border/hover.
- `.v2-lang-menu` dropdown (absolute, below the button, clean card, subtle shadow/border).
- `.v2-hamburger` (square button, shown ≤1080, hidden >1080); inline `.v2-owner-link` + `.v2-lang` hidden ≤1080.
- `.v2-mobile-panel` (fixed, full-screen, `transform: translateX(100%)`, transition ~360ms; `.is-open` → `translateX(0)`), backdrop, stacked links, language row, close button. Light theme matching the site.
- Respect `prefers-reduced-motion` (skip the slide, just show/hide).

## Backward compatibility & demo

Because `localize` passes plain strings through unchanged, the site renders identically in English before any translation. To prove switching works end-to-end, the implementation converts a small representative set to `{en,es}` (the nav section labels + the hero tagline/headline) as a demo. The full translation of all copy is the deferred copy pass (from the Google Doc), applied incrementally afterward.

## Parity guard — `scripts/check-content.mjs`
Still compares client vs smcopy shape. With `{en,es}` leaves, the leaf object is part of the shape, so client and smcopy must match (both translated or both plain) per field. Spanish-completeness (every leaf has `es`) is a check for the copy pass, not enforced now.

## Out of scope (follow-up copy pass)
- The actual Spanish strings for every section (client + smcopy), sourced from the Google Doc.
- Auto-detecting browser language (English default with manual switch was chosen).

## Verification
- `npm run build` green; `node scripts/check-content.mjs` OK.
- Desktop (>1080): globe button opens/closes the dropdown; selecting Español flips the demo strings; reload preserves the choice (`localStorage`); both `client` and `?v=smcopy` work.
- Mobile (≤1080): hamburger opens the full-screen panel (slides in from right); section tap slides it out then scrolls to the section; Contact tap scrolls to contact; language tap switches language; Esc/×/backdrop close; body scroll locked while open.
- `prefers-reduced-motion`: panel appears/disappears without the slide.
