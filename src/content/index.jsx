import React, { createContext, useContext } from "react";
import { clientContent } from "./client";
import { smcopyContent } from "./smcopy";

const VERSIONS = { client: clientContent, smcopy: smcopyContent };

// Default version per build. The main site leaves this unset (client copy);
// the SM-copy site sets VITE_DEFAULT_VERSION=smcopy at build time.
const BUILD_DEFAULT = import.meta.env.VITE_DEFAULT_VERSION === "smcopy" ? "smcopy" : "client";

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

const ContentContext = createContext(clientContent);
export const useContent = () => useContext(ContentContext);

export function ContentProvider({ children }) {
  const content = VERSIONS[resolveVersion()] ?? clientContent;
  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}
