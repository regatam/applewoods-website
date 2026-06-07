# Apple Woods — Bilingual Nav + Language Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Add English/Spanish switching (mechanism only) with a desktop globe switcher and a mobile slide-in menu, applied to both copy versions.

**Architecture:** Translatable strings become `{ en, es }` leaves; a `localize(content, lang)` pass in `ContentProvider` resolves them to the active language, keeping the flat shape components already consume (plain strings pass through = English, so translation is incremental). `lang` lives in provider state, defaults `en`, persists to `localStorage` (`aw_lang`), orthogonal to `?v=smcopy`.

**Tech Stack:** React 18, Vite 5, `@phosphor-icons/react` (GlobeIcon, ListIcon, XIcon), `react-dom` createPortal.

**Verification model:** No test runner. Per task: `npm run build` green, `node scripts/check-content.mjs` OK, and visual QA on the dev server (`npm run dev`, http://127.0.0.1:5173). The demo strings (Task 1) make language switching visibly testable.

**Branch:** `launch-prep`. Commit after each task.

---

## Spec
Full design: `docs/applewoods-i18n-nav-design.md`. Read it first.

---

## Task 1: i18n layer (localize + language state) + demo strings

**Files:**
- Modify: `src/content/index.jsx`
- Modify: `src/content/smcopy.js` (convert a demo set to `{en,es}`; client inherits via clone)

- [ ] **Step 1: Add `localize` + language state to `src/content/index.jsx`**

Replace the current file body so it imports the extra hooks and adds language handling. Current file exports `resolveVersion`, `useContent`, `ContentProvider`, `BUILD_DEFAULT`. Keep `resolveVersion`/`BUILD_DEFAULT` exactly as-is and add:

```jsx
import React, { createContext, useContext, useState, useMemo, useCallback } from "react";
import { clientContent } from "./client";
import { smcopyContent } from "./smcopy";

const VERSIONS = { client: clientContent, smcopy: smcopyContent };
const BUILD_DEFAULT = import.meta.env.VITE_DEFAULT_VERSION === "smcopy" ? "smcopy" : "client";
const LANGS = ["en", "es"];

export function resolveVersion() {
  if (typeof window === "undefined") return BUILD_DEFAULT;
  const param = new URLSearchParams(window.location.search).get("v");
  if (param === "client" || param === "smcopy") {
    try { window.localStorage.setItem("aw_copy", param); } catch (e) {}
    return param;
  }
  try {
    const stored = window.localStorage.getItem("aw_copy");
    if (stored === "client" || stored === "smcopy") return stored;
  } catch (e) {}
  return BUILD_DEFAULT;
}

function readStoredLang() {
  if (typeof window === "undefined") return "en";
  try {
    const v = window.localStorage.getItem("aw_lang");
    if (LANGS.includes(v)) return v;
  } catch (e) {}
  return "en";
}

// Resolve { en, es } leaves to the active language; pass everything else through.
// A plain string (not yet translated) returns as-is = English in both languages.
function localize(node, lang) {
  if (node === null || typeof node !== "object") return node;
  if (Array.isArray(node)) return node.map((n) => localize(n, lang));
  if (typeof node.en === "string") return node[lang] ?? node.en;
  const out = {};
  for (const key of Object.keys(node)) out[key] = localize(node[key], lang);
  return out;
}

const ContentContext = createContext(clientContent);
const LangContext = createContext({ lang: "en", setLang: () => {} });
export const useContent = () => useContext(ContentContext);
export const useLang = () => useContext(LangContext);

export function ContentProvider({ children }) {
  const [lang, setLangState] = useState(readStoredLang);
  const setLang = useCallback((next) => {
    if (!LANGS.includes(next)) return;
    setLangState(next);
    try { window.localStorage.setItem("aw_lang", next); } catch (e) {}
  }, []);
  const base = VERSIONS[resolveVersion()] ?? clientContent;
  const content = useMemo(() => localize(base, lang), [base, lang]);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
    </LangContext.Provider>
  );
}
```

- [ ] **Step 2: Convert the demo strings to `{en,es}` in `src/content/smcopy.js`**

These are inherited by `client.js` (it clones smcopy), so both versions get them. In `smcopyContent.nav`, change the labels/cta, and in `smcopyContent.hero` change tagline + headlineLines:

```js
nav: {
  logoAlt: "Apple Woods Smart Living",
  links: [
    { href: "#location", label: { en: "Location", es: "Ubicación" } },
    { href: "#life-inside", label: { en: "Live Here", es: "Vive Aquí" } },
    { href: "#different", label: { en: "Community", es: "Comunidad" } },
    { href: "#structured", label: { en: "Amenities", es: "Amenidades" } },
  ],
  cta: { en: "Contact us", es: "Contáctanos" },
},
```
(Use the EXISTING href values from the current file — confirm them; only wrap the `label` and `cta` strings in `{en,es}`.) And in `hero`:
```js
tagline: { en: "Life, beautifully organized.", es: "La vida, bellamente organizada." },
headlineLines: [
  { en: "More Than a Subdivision:", es: "Más Que Un Fraccionamiento:" },
  { en: "A Place to Truly Call Home", es: "Un Lugar Para Sentirte En Casa" },
],
```
Leave every other string a plain string for now (renders English in both languages until the copy pass).

- [ ] **Step 3: Build + parity + commit**

Run: `npm run build` → PASS. Run: `node scripts/check-content.mjs` → "Content shape OK." (The `{en,es}` leaf is an object in both client and smcopy, so shapes still match.)
```bash
git add src/content/index.jsx src/content/smcopy.js
git commit -m "feat: i18n content layer (localize + lang state) with demo en/es strings"
```

---

## Task 2: Desktop language switcher

**Files:**
- Create: `src/components/LanguageSwitcher.jsx`
- Modify: `src/main.jsx` (V2Nav)
- Modify: `src/styles.css`

- [ ] **Step 1: Create `src/components/LanguageSwitcher.jsx`**

```jsx
import React, { useEffect, useRef, useState } from "react";
import { GlobeIcon } from "@phosphor-icons/react";
import { useLang } from "../content";

const LANG_LABELS = { en: "English", es: "Español" };

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="v2-lang" ref={ref}>
      <button
        type="button"
        className="v2-lang-button"
        aria-haspopup="true"
        aria-expanded={open}
        aria-label="Change language"
        onClick={() => setOpen((v) => !v)}
      >
        <GlobeIcon size={20} weight="regular" aria-hidden="true" />
      </button>
      {open ? (
        <div className="v2-lang-menu" role="menu">
          {["en", "es"].map((code) => (
            <button
              key={code}
              type="button"
              role="menuitemradio"
              aria-checked={lang === code}
              className={lang === code ? "is-active" : ""}
              onClick={() => {
                setLang(code);
                setOpen(false);
              }}
            >
              {LANG_LABELS[code]}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
```

- [ ] **Step 2: Wire into `V2Nav` in `src/main.jsx`**

Add imports near the top: `import LanguageSwitcher from "./components/LanguageSwitcher";` and `import MobileMenu from "./components/MobileMenu";` (MobileMenu is built in Task 3; importing it now is fine once Task 3 creates the file — if doing Task 2 alone, add the LanguageSwitcher import only and add MobileMenu import in Task 3).

Replace the `V2Nav` return's `<nav>...</nav>` + `<a className="v2-owner-link">` tail so the right-side controls are wrapped:
```jsx
    <header
      className={hidden ? "v2-nav is-hidden" : "v2-nav"}
      aria-label="Primary navigation"
    >
      <a className="v2-logo" href="#top" aria-label="Apple Woods home">
        <img src="/assets/applewoods-logo.png" alt={nav.logoAlt} />
      </a>
      <nav className="v2-nav-menu">
        {nav.links.map((link) => (
          <a href={link.href} key={link.href}>
            {link.label}
          </a>
        ))}
      </nav>
      <div className="v2-nav-actions">
        <LanguageSwitcher />
        <a className="v2-owner-link" href="#contact">
          {nav.cta}
        </a>
        <MobileMenu />
      </div>
    </header>
```
Note the inline menu now has class `v2-nav-menu` (the CSS that targeted `.v2-nav nav` must be updated to `.v2-nav .v2-nav-menu` or `.v2-nav-menu` — see Step 3).

- [ ] **Step 3: CSS in `src/styles.css`**

The existing `.v2-nav nav { ... }` and `.v2-nav nav a ...` rules target the inline menu — rename their selector to `.v2-nav-menu` (it's still a `<nav>` so `.v2-nav nav` still matches, but add the class for clarity). The `.v2-nav` base grid `minmax(150px, 1fr) auto minmax(150px, 1fr)` stays (logo | menu | actions). Add:
```css
.v2-nav-actions {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 10px;
}

.v2-lang {
  position: relative;
}

.v2-lang-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  min-height: 44px;
  padding: 0;
  border: 1px solid var(--brown);
  border-radius: 6px;
  background: transparent;
  color: var(--brown);
  cursor: pointer;
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    color 180ms ease;
}

.v2-lang-button:hover,
.v2-lang-button:focus-visible {
  transform: translateY(-1px);
  background: var(--brown);
  color: var(--white);
}

.v2-lang-menu {
  position: absolute;
  top: calc(100% + 8px);
  right: 0;
  z-index: 60;
  display: grid;
  min-width: 150px;
  padding: 6px;
  background: var(--white);
  border: 1px solid rgba(88, 53, 41, 0.16);
  border-radius: 8px;
  box-shadow: 0 18px 40px rgba(42, 23, 17, 0.16);
}

.v2-lang-menu button {
  padding: 10px 12px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--brown);
  font-family: var(--font-heading);
  font-size: 13px;
  text-align: left;
  cursor: pointer;
}

.v2-lang-menu button:hover,
.v2-lang-menu button:focus-visible {
  background: var(--paper-deep);
}

.v2-lang-menu button.is-active {
  font-weight: 700;
  color: var(--ink);
}
```

- [ ] **Step 4: Build + QA + commit**

Run: `npm run build` → PASS. Localhost (>1080px): globe button left of Contact us, opens dropdown, selecting Español flips the demo strings (nav labels, tagline, headline), reload preserves it; `?v=smcopy` still works.
```bash
git add src/components/LanguageSwitcher.jsx src/main.jsx src/styles.css
git commit -m "feat: desktop language switcher (globe button + dropdown)"
```

---

## Task 3: Mobile menu (hamburger + slide-in panel)

**Files:**
- Create: `src/components/MobileMenu.jsx`
- Modify: `src/styles.css` (responsive show/hide + panel)
- (V2Nav already renders `<MobileMenu />` from Task 2.)

- [ ] **Step 1: Create `src/components/MobileMenu.jsx`**

```jsx
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ListIcon, XIcon, GlobeIcon } from "@phosphor-icons/react";
import { useContent, useLang } from "../content";

const LANG_LABELS = { en: "English", es: "Español" };

export default function MobileMenu() {
  const c = useContent();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      triggerRef.current?.focus();
    };
  }, [open]);

  const go = (href) => {
    setOpen(false);
    window.setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 380);
  };

  return (
    <>
      <button
        type="button"
        className="v2-hamburger"
        aria-label="Open menu"
        aria-expanded={open}
        ref={triggerRef}
        onClick={() => setOpen(true)}
      >
        <ListIcon size={24} weight="regular" aria-hidden="true" />
      </button>
      {createPortal(
        <div
          className={open ? "v2-mobile-panel is-open" : "v2-mobile-panel"}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          aria-hidden={!open}
        >
          <div className="v2-mobile-top">
            <button
              type="button"
              className="v2-mobile-close"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <XIcon size={24} weight="bold" aria-hidden="true" />
            </button>
          </div>
          <nav className="v2-mobile-links" aria-label="Sections">
            {c.nav.links.map((link) => (
              <button type="button" key={link.href} onClick={() => go(link.href)}>
                {link.label}
              </button>
            ))}
            <button type="button" className="v2-mobile-contact" onClick={() => go("#contact")}>
              {c.nav.cta}
            </button>
          </nav>
          <div className="v2-mobile-lang" role="group" aria-label="Language">
            <GlobeIcon size={20} weight="regular" aria-hidden="true" />
            {["en", "es"].map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={lang === code}
                className={lang === code ? "is-active" : ""}
                onClick={() => setLang(code)}
              >
                {LANG_LABELS[code]}
              </button>
            ))}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
```

- [ ] **Step 2: CSS in `src/styles.css`**

Default (desktop) hides the hamburger; the existing `@media (max-width: 1080px)` block hides the inline menu — extend it to also hide the desktop-only controls and show the hamburger. Add base rules:
```css
.v2-hamburger {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  min-height: 44px;
  padding: 0;
  border: 1px solid var(--brown);
  border-radius: 6px;
  background: transparent;
  color: var(--brown);
  cursor: pointer;
}

.v2-mobile-panel {
  position: fixed;
  inset: 0;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  padding: 20px 24px 40px;
  background: var(--v2-paper);
  transform: translateX(100%);
  transition: transform 360ms ease;
  overflow-y: auto;
}

.v2-mobile-panel.is-open {
  transform: translateX(0);
}

.v2-mobile-top {
  display: flex;
  justify-content: flex-end;
}

.v2-mobile-close {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 0;
  background: transparent;
  color: var(--brown);
  cursor: pointer;
}

.v2-mobile-links {
  display: grid;
  gap: 4px;
  margin-top: 12px;
}

.v2-mobile-links button {
  padding: 16px 0;
  border: 0;
  border-bottom: 1px solid rgba(88, 53, 41, 0.12);
  background: transparent;
  color: var(--brown);
  font-family: var(--font-heading);
  font-size: 22px;
  font-weight: 500;
  text-align: left;
  text-transform: uppercase;
  cursor: pointer;
}

.v2-mobile-contact {
  margin-top: 8px;
  color: var(--ink) !important;
}

.v2-mobile-lang {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: auto;
  padding-top: 24px;
  color: var(--brown);
}

.v2-mobile-lang button {
  padding: 8px 14px;
  border: 1px solid var(--brown);
  border-radius: 6px;
  background: transparent;
  color: var(--brown);
  font-family: var(--font-heading);
  font-size: 13px;
  cursor: pointer;
}

.v2-mobile-lang button.is-active {
  background: var(--brown);
  color: var(--white);
}

@media (prefers-reduced-motion: reduce) {
  .v2-mobile-panel {
    transition: none;
  }
}
```
In the existing `@media (max-width: 1080px)` block, add:
```css
  .v2-lang,
  .v2-owner-link {
    display: none;
  }
  .v2-hamburger {
    display: inline-flex;
  }
```
(The `.v2-nav { grid-template-columns: 1fr auto }` and the inline-menu `display: none` are already there; confirm the inline menu selector still matches `.v2-nav-menu`.)

- [ ] **Step 3: Build + QA + commit**

Run: `npm run build` → PASS. Localhost (≤1080px): inline menu + globe + Contact us are gone, a hamburger shows; tap → full-screen panel slides in from the right; section tap slides it out then scrolls to that section; Contact tap scrolls to contact; language buttons switch language (panel stays open); ×/Esc close it; body scroll locked while open; reduced-motion shows no slide. Both versions work.
```bash
git add src/components/MobileMenu.jsx src/main.jsx src/styles.css
git commit -m "feat: mobile hamburger menu with slide-in panel + language switch"
```

---

## Self-review
- **Spec coverage:** i18n layer (Task 1), desktop switcher (Task 2), mobile menu (Task 3), language state/persistence (Task 1), demo strings (Task 1). All spec sections covered.
- **Placeholders:** none — full code in each task. Demo Spanish strings are real; full translation is the deferred copy pass.
- **Consistency:** `useLang`/`useContent` names, `.v2-lang`/`.v2-hamburger`/`.v2-mobile-panel` classes, `localize` signature consistent across tasks.

---

## RESUME NOTES (read after compaction)

**Current state (2026-06-07):**
- Working repo: `/Users/rene/Documents/applewoods-website`, branch `launch-prep` (pushed to origin). All session code committed.
- Dev server: `npm run dev` → http://127.0.0.1:5173 (restart if not running).
- The whole launch-prep effort is done and committed: usability fixes (scroll, lot-map + v3 price-sheet zoom/pan lightboxes), copy fork (`?v=smcopy`; default = client copy), value section ("Affordable Luxury"), Phase 1 two-PDF + 3-card layout, footer Facebook link, and the sticky frosted nav (full-width, hides over amenities, mobile width fix).

**Deploys:**
- Live: `applewoods-website.vercel.app` (client) and `applewoods-smcopy.vercel.app` (smcopy, env `VITE_DEFAULT_VERSION=smcopy`).
- These were last deployed at the **Facebook-link commit**. Everything since (all the **sticky nav work**) is committed locally but **NOT redeployed**. Redeploy both (`vercel --prod --yes` on main; relink to `applewoods-smcopy` + deploy + restore `.vercel`) once Rene confirms the nav.

**Pending after this plan:**
- **Spanish translation copy pass** — convert all remaining strings (both versions) to `{en,es}` using the client's Google Doc (English source + Spanish there; confirm which tab/column). This plan only does the mechanism + demo strings.
- Earlier-flagged follow-ups: swap the rusty security-entrance photo; wire `api/lead.js` to actually deliver leads.
