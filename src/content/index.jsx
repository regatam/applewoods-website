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
