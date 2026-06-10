import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from "react";
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
  // Keep <html lang> in sync so :lang() CSS, screen readers, and search
  // engines see the active language.
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const base = VERSIONS[resolveVersion()] ?? clientContent;
  const content = useMemo(() => localize(base, lang), [base, lang]);
  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
    </LangContext.Provider>
  );
}
