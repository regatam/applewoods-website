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
