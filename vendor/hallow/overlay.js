var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// packages/overlay/src/provider.tsx
import { useCallback as useCallback3, useEffect as useEffect5, useMemo, useRef as useRef4, useState as useState4 } from "react";
import { createPortal } from "react-dom";

// packages/overlay/src/components/icons.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function Svg({ children, size = 16 }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "aria-hidden": "true",
      fill: "none",
      height: size,
      stroke: "currentColor",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "1.6",
      viewBox: "0 0 24 24",
      width: size,
      children
    }
  );
}
var ChevronRightIcon = () => /* @__PURE__ */ jsx(Svg, { children: /* @__PURE__ */ jsx("path", { d: "M9 6l6 6-6 6" }) });
var PencilIcon = () => /* @__PURE__ */ jsx(Svg, { size: 14, children: /* @__PURE__ */ jsx("path", { d: "M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19l-4 1z" }) });
var CheckIcon = ({ size = 28 }) => /* @__PURE__ */ jsx(
  "svg",
  {
    "aria-hidden": "true",
    fill: "none",
    height: size,
    stroke: "currentColor",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2.4",
    viewBox: "0 0 24 24",
    width: size,
    children: /* @__PURE__ */ jsx("path", { d: "M5 12.5l4.5 4.5L19 7.5" })
  }
);
var SendIcon = ({ size = 14 }) => /* @__PURE__ */ jsxs(Svg, { size, children: [
  /* @__PURE__ */ jsx("path", { d: "M20 4L3 10.5l6.5 2.6L12 20l8-16z" }),
  /* @__PURE__ */ jsx("path", { d: "M9.5 13.1L20 4" })
] });
var MarkerIcon = ({ size = 20 }) => /* @__PURE__ */ jsxs(Svg, { size, children: [
  /* @__PURE__ */ jsx("path", { d: "M12 21s6.5-5.6 6.5-10.5a6.5 6.5 0 10-13 0C5.5 15.4 12 21 12 21z" }),
  /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10.5", r: "2.2" })
] });

// packages/overlay/src/components/Ceremony.tsx
import { Fragment, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function metaLine(annotation) {
  const page = annotation.pagePath === "/" ? "Home" : annotation.pagePath;
  const snippet = annotation.textSnippet ? ` \xB7 ${annotation.textSnippet.slice(0, 60)}` : ` \xB7 ${annotation.selector}`;
  return `${page}${snippet}`;
}
function Ceremony({
  annotations,
  generalMessages,
  sent,
  locked,
  busy,
  error,
  onConfirm,
  onReconcile,
  onCancel,
  onDismiss,
  onReset
}) {
  const elementCount = annotations.length;
  const generalCount = generalMessages.length;
  const totalCount = elementCount + generalCount;
  const countCopy = `${elementCount} element ${elementCount === 1 ? "note" : "notes"} + ${generalCount} general ${generalCount === 1 ? "note" : "notes"}`;
  return /* @__PURE__ */ jsx2(
    "div",
    {
      className: "hallow-backdrop",
      onClick: () => !busy && (sent ? onDismiss() : !locked && onCancel()),
      role: "dialog",
      "aria-modal": "true",
      "aria-label": sent ? "Round sent" : locked ? "Sending round" : "Review before sending",
      children: /* @__PURE__ */ jsx2(
        "div",
        {
          className: "hallow-modal",
          onClick: (event) => event.stopPropagation(),
          children: sent ? /* @__PURE__ */ jsxs2("div", { className: "hallow-sent", children: [
            /* @__PURE__ */ jsx2("div", { className: "hallow-check", children: /* @__PURE__ */ jsx2(CheckIcon, {}) }),
            /* @__PURE__ */ jsx2("h2", { className: "hallow-sent-title", children: "Round sent" }),
            /* @__PURE__ */ jsxs2("p", { className: "hallow-sent-text", children: [
              totalCount === 1 ? "Your note is" : "Your notes are",
              " with the team. Every one will be reviewed, and you\u2019ll hear back before anything changes."
            ] }),
            error && /* @__PURE__ */ jsx2("span", { className: "hallow-status is-error", role: "alert", children: error }),
            /* @__PURE__ */ jsxs2("div", { className: "hallow-sent-actions", children: [
              /* @__PURE__ */ jsx2(
                "button",
                {
                  className: "hallow-btn hallow-btn-primary",
                  disabled: busy,
                  onClick: error ? onReconcile : onReset,
                  type: "button",
                  children: error ? busy ? "Saving\u2026" : "Retry saving sent state" : "Start a new round"
                }
              ),
              !error && /* @__PURE__ */ jsx2(
                "button",
                {
                  className: "hallow-btn hallow-btn-ghost",
                  disabled: busy,
                  onClick: onDismiss,
                  type: "button",
                  children: "Close"
                }
              )
            ] }),
            !error && /* @__PURE__ */ jsx2("p", { className: "hallow-sent-aside", children: "Start a new round when you\u2019re ready to share more feedback." })
          ] }) : /* @__PURE__ */ jsxs2(Fragment, { children: [
            /* @__PURE__ */ jsxs2("div", { className: "hallow-modal-head", children: [
              /* @__PURE__ */ jsx2("div", { className: "hallow-eyebrow", children: "Review before sending" }),
              /* @__PURE__ */ jsx2("h2", { className: "hallow-modal-title", children: "You\u2019re about to send this round" }),
              /* @__PURE__ */ jsx2("p", { className: "hallow-modal-sub", children: locked ? "This round is locked while delivery is reconciled." : `${countCopy} go together as one round. Take a last look \u2014 once sent, this round locks for review and a fresh round begins.` })
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "hallow-modal-list", children: [
              annotations.map((annotation, position) => /* @__PURE__ */ jsxs2("div", { className: "hallow-review-row", children: [
                /* @__PURE__ */ jsx2("span", { className: "hallow-card-index", children: position + 1 }),
                /* @__PURE__ */ jsxs2("div", { className: "hallow-card-body", children: [
                  /* @__PURE__ */ jsx2("p", { className: "hallow-review-note", children: annotation.note }),
                  /* @__PURE__ */ jsx2("p", { className: "hallow-review-meta", children: metaLine(annotation) })
                ] })
              ] }, annotation.id)),
              generalMessages.map((message) => /* @__PURE__ */ jsxs2("div", { className: "hallow-review-row", children: [
                /* @__PURE__ */ jsx2("span", { className: "hallow-card-index", children: "G" }),
                /* @__PURE__ */ jsxs2("div", { className: "hallow-card-body", children: [
                  /* @__PURE__ */ jsx2("p", { className: "hallow-review-note", children: message.body }),
                  /* @__PURE__ */ jsxs2("p", { className: "hallow-review-meta", children: [
                    "General note",
                    " ",
                    /* @__PURE__ */ jsx2("span", { className: "hallow-already-sent", children: "Already sent" })
                  ] })
                ] })
              ] }, message.id))
            ] }),
            /* @__PURE__ */ jsxs2("div", { className: "hallow-modal-foot", children: [
              error && /* @__PURE__ */ jsx2("span", { className: "hallow-status is-error", role: "alert", children: error }),
              !locked && /* @__PURE__ */ jsx2(
                "button",
                {
                  className: "hallow-btn hallow-btn-ghost",
                  disabled: busy,
                  onClick: onCancel,
                  type: "button",
                  children: "Keep editing"
                }
              ),
              /* @__PURE__ */ jsx2(
                "button",
                {
                  className: "hallow-btn hallow-btn-primary",
                  disabled: busy,
                  onClick: onConfirm,
                  type: "button",
                  children: busy ? "Sending\u2026" : locked ? "Retry sending" : "Send round"
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}

// packages/overlay/src/components/Composer.tsx
import { useEffect, useRef, useState } from "react";
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var SIDEBAR_GUTTER = 374;
var COMPOSER_WIDTH = 300;
function positionFor(rect) {
  const maxLeft = window.innerWidth - COMPOSER_WIDTH - 12;
  const sidebarLimit = window.innerWidth - SIDEBAR_GUTTER - COMPOSER_WIDTH - 8;
  const left = Math.max(12, Math.min(rect.left, maxLeft, sidebarLimit));
  const top = Math.max(
    12,
    Math.min(rect.bottom + 10, window.innerHeight - 210)
  );
  return { left, top };
}
function Composer({
  rect,
  onSave,
  onCancel
}) {
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
  }, []);
  const save = async () => {
    const trimmed = note.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    try {
      await onSave(trimmed);
    } finally {
      setSaving(false);
    }
  };
  return /* @__PURE__ */ jsxs3("div", { className: "hallow-composer", style: positionFor(rect), children: [
    /* @__PURE__ */ jsx3("span", { className: "hallow-eyebrow hallow-composer-label", children: "New note" }),
    /* @__PURE__ */ jsx3(
      "textarea",
      {
        "aria-label": "New note",
        className: "hallow-textarea",
        onChange: (event) => setNote(event.target.value),
        onKeyDown: (event) => {
          if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) save();
        },
        placeholder: "Describe the change you'd like\u2026",
        ref,
        value: note
      }
    ),
    /* @__PURE__ */ jsxs3("div", { className: "hallow-edit-actions", children: [
      /* @__PURE__ */ jsx3(
        "button",
        {
          className: "hallow-btn hallow-btn-ghost hallow-btn-sm",
          onClick: onCancel,
          type: "button",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx3(
        "button",
        {
          className: "hallow-btn hallow-btn-primary hallow-btn-sm",
          disabled: !note.trim() || saving,
          onClick: () => void save(),
          type: "button",
          children: saving ? "Capturing\u2026" : "Save note"
        }
      )
    ] })
  ] });
}

// packages/overlay/src/components/pins.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var clamp = (value, min, max) => Math.max(min, Math.min(max, value));
function Ring({
  rect,
  variant,
  pulseKey
}) {
  const style = {
    height: rect.height + 6,
    left: rect.left - 3,
    top: rect.top - 3,
    width: rect.width + 6
  };
  return /* @__PURE__ */ jsx4(
    "div",
    {
      className: `hallow-ring ${variant === "hover" ? "is-hover" : ""} ${pulseKey ? "is-pulse" : ""}`,
      style
    },
    pulseKey
  );
}
function Pin({
  index,
  rect,
  active,
  pulseKey,
  onSelect
}) {
  const top = clamp(rect.top - 12, 4, window.innerHeight - 28);
  const left = clamp(rect.left - 12, 4, window.innerWidth - 28);
  return /* @__PURE__ */ jsx4(
    "button",
    {
      className: `hallow-pin ${active ? "is-active" : ""} ${pulseKey ? "is-pulse" : ""}`,
      onClick: onSelect,
      style: { left, top },
      type: "button",
      "aria-label": `Note ${index}`,
      children: index
    },
    pulseKey ? `p-${pulseKey}` : void 0
  );
}

// packages/overlay/src/components/Sidebar.tsx
import { useEffect as useEffect3, useLayoutEffect, useRef as useRef3, useState as useState2 } from "react";

// packages/overlay/src/components/Dock.tsx
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function Dock({
  mode,
  onChange
}) {
  return /* @__PURE__ */ jsxs4(
    "div",
    {
      className: "hallow-seg",
      "data-mode": mode,
      role: "group",
      "aria-label": "Hallow mode",
      children: [
        /* @__PURE__ */ jsx5("span", { className: "hallow-seg-thumb", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx5(
          "button",
          {
            "aria-pressed": mode === "browse",
            onClick: () => onChange("browse"),
            type: "button",
            children: "Browse"
          }
        ),
        /* @__PURE__ */ jsxs4(
          "button",
          {
            "aria-pressed": mode === "annotate",
            onClick: () => onChange("annotate"),
            type: "button",
            children: [
              /* @__PURE__ */ jsx5("span", { className: "hallow-seg-dot", "aria-hidden": "true" }),
              "Annotate"
            ]
          }
        )
      ]
    }
  );
}

// packages/overlay/src/components/Feed.tsx
import { useEffect as useEffect2, useRef as useRef2 } from "react";

// packages/overlay/src/feed.ts
import { useCallback, useSyncExternalStore } from "react";
var STORAGE_PREFIX = "hallow.feed.v1.";
var DRAFT_STORAGE_PREFIX = "hallow.feed.draft.v1.";
var MESSAGE_CACHE_LIMIT = 50;
var PERSISTENCE_ERROR = "Messages could not be saved in this browser. Free storage or enable local storage before continuing.";
var MESSAGE_MAX_LENGTH = 4e3;
function storageKey(projectKey) {
  return `${STORAGE_PREFIX}${projectKey}`;
}
function draftStorageKey(projectKey) {
  return `${DRAFT_STORAGE_PREFIX}${projectKey}`;
}
function newFeed() {
  return { draft: "", messages: [] };
}
function newId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `message-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}
function isMessage(value) {
  if (!value || typeof value !== "object") return false;
  const message = value;
  return typeof message.id === "string" && typeof message.body === "string" && typeof message.createdAt === "string" && (message.roundId === void 0 || message.roundId === null || typeof message.roundId === "string") && (message.status === "sending" || message.status === "sent" || message.status === "failed");
}
function isFeed(value) {
  if (!value || typeof value !== "object") return false;
  const feed = value;
  return Array.isArray(feed.messages) && feed.messages.every(isMessage);
}
function parseDraft(raw) {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}
function compactMessages(messages) {
  if (messages.length <= MESSAGE_CACHE_LIMIT) return messages;
  const unsentCount = messages.filter(
    (message) => message.status !== "sent"
  ).length;
  let sentToKeep = Math.max(0, MESSAGE_CACHE_LIMIT - unsentCount);
  const kept = /* @__PURE__ */ new Set();
  for (let index = messages.length - 1; index >= 0 && sentToKeep > 0; index--) {
    const message = messages[index];
    if (message.status === "sent") {
      kept.add(message.id);
      sentToKeep -= 1;
    }
  }
  return messages.filter(
    (message) => message.status !== "sent" || kept.has(message.id)
  );
}
var FeedStore = class {
  constructor(projectKey) {
    __publicField(this, "key");
    __publicField(this, "draftKey");
    __publicField(this, "snapshot");
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "storageListener", null);
    __publicField(this, "readPersistenceError", null);
    __publicField(this, "subscribe", (listener) => {
      this.listeners.add(listener);
      if (this.listeners.size === 1 && typeof window !== "undefined") {
        this.storageListener = (event) => {
          if (event.key !== this.key && event.key !== this.draftKey) return;
          this.snapshot = {
            feed: this.read(),
            persistenceError: this.readPersistenceError
          };
          this.emit();
        };
        window.addEventListener("storage", this.storageListener);
      }
      return () => {
        this.listeners.delete(listener);
        if (this.listeners.size === 0 && this.storageListener && typeof window !== "undefined") {
          window.removeEventListener("storage", this.storageListener);
          this.storageListener = null;
        }
      };
    });
    __publicField(this, "getSnapshot", () => this.snapshot);
    this.key = storageKey(projectKey);
    this.draftKey = draftStorageKey(projectKey);
    this.snapshot = {
      feed: this.read(),
      persistenceError: this.readPersistenceError
    };
  }
  read() {
    if (typeof window === "undefined") return newFeed();
    this.readPersistenceError = null;
    try {
      const raw = window.localStorage.getItem(this.key);
      const parsed = raw ? JSON.parse(raw) : null;
      const storedFeed = isFeed(parsed) ? parsed : null;
      const legacyFeed = storedFeed ?? newFeed();
      const messages = legacyFeed.messages.map(
        (message) => message.status === "sending" ? { ...message, status: "failed" } : message
      );
      const rawDraft = window.localStorage.getItem(this.draftKey);
      let draft = rawDraft === null ? null : parseDraft(rawDraft) ?? "";
      if (rawDraft === null && typeof storedFeed?.draft === "string") {
        draft = storedFeed.draft;
        try {
          window.localStorage.setItem(this.draftKey, JSON.stringify(draft));
          window.localStorage.setItem(
            this.key,
            JSON.stringify({ messages: compactMessages(messages) })
          );
        } catch {
          this.readPersistenceError = PERSISTENCE_ERROR;
        }
      }
      return {
        draft: draft ?? "",
        messages
      };
    } catch {
      return newFeed();
    }
  }
  failPersistence() {
    this.snapshot = {
      ...this.snapshot,
      persistenceError: PERSISTENCE_ERROR
    };
    this.emit();
    return false;
  }
  writeMessages(messages) {
    const compacted = compactMessages(messages);
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(
          this.key,
          JSON.stringify({ messages: compacted })
        );
      } catch {
        return this.failPersistence();
      }
    }
    this.snapshot = {
      feed: { ...this.snapshot.feed, messages: compacted },
      persistenceError: null
    };
    this.emit();
    return true;
  }
  writeDraft(draft) {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(this.draftKey, JSON.stringify(draft));
      } catch {
        return this.failPersistence();
      }
    }
    this.snapshot = {
      feed: { ...this.snapshot.feed, draft },
      persistenceError: null
    };
    this.emit();
    return true;
  }
  emit() {
    this.listeners.forEach((listener) => listener());
  }
  replace(id, change) {
    return this.writeMessages(
      this.snapshot.feed.messages.map(
        (message) => message.id === id ? change(message) : message
      )
    );
  }
  setDraft(draft) {
    return this.writeDraft(draft);
  }
  /** Queue the draft as a sending message and clear the composer. */
  queue(body, roundId) {
    if (body.length > MESSAGE_MAX_LENGTH) return null;
    const message = {
      body,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      id: newId(),
      roundId,
      status: "sending"
    };
    if (!this.writeMessages([...this.snapshot.feed.messages, message]))
      return null;
    this.writeDraft("");
    return message;
  }
  /** Re-arm a message that never reached ingest. */
  retry(id) {
    const message = this.snapshot.feed.messages.find(
      (candidate) => candidate.id === id
    );
    if (!message || message.status === "sent") return null;
    return this.replace(id, (current) => ({ ...current, status: "sending" })) ? { ...message, status: "sending" } : null;
  }
  reassignRetry(id, roundId) {
    const message = this.snapshot.feed.messages.find(
      (candidate) => candidate.id === id
    );
    if (!message || message.status === "sent") return null;
    const reassigned = { ...message, roundId, status: "sending" };
    return this.replace(id, () => reassigned) ? reassigned : null;
  }
  markSent(id) {
    return this.replace(id, (message) => ({ ...message, status: "sent" }));
  }
  markFailed(id) {
    return this.replace(
      id,
      (message) => message.status === "sent" ? message : { ...message, status: "failed" }
    );
  }
};
var disabledSnapshot = {
  feed: newFeed(),
  persistenceError: null
};
var disabledStore = {
  getSnapshot: () => disabledSnapshot,
  markFailed: () => false,
  markSent: () => false,
  queue: () => null,
  reassignRetry: () => null,
  retry: () => null,
  setDraft: () => false,
  subscribe: () => () => void 0
};
var stores = /* @__PURE__ */ new Map();
function getStore(projectKey) {
  let store = stores.get(projectKey);
  if (!store) {
    store = new FeedStore(projectKey);
    stores.set(projectKey, store);
  }
  return store;
}
function useFeed(projectKey, enabled) {
  const store = enabled ? getStore(projectKey) : disabledStore;
  const snapshot = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  return {
    feed: snapshot.feed,
    markFailed: useCallback((id) => store.markFailed(id), [store]),
    markSent: useCallback((id) => store.markSent(id), [store]),
    persistenceError: snapshot.persistenceError,
    queue: useCallback((body, roundId) => store.queue(body, roundId), [store]),
    reassignRetry: useCallback(
      (id, roundId) => store.reassignRetry(id, roundId),
      [store]
    ),
    retry: useCallback((id) => store.retry(id), [store]),
    setDraft: useCallback((draft) => store.setDraft(draft), [store])
  };
}

// packages/overlay/src/components/Feed.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
var LENGTH_FEEDBACK_THRESHOLD = 400;
function timeLabel(createdAt) {
  const at = new Date(createdAt);
  if (Number.isNaN(at.getTime())) return "";
  return at.toLocaleTimeString(void 0, {
    hour: "numeric",
    minute: "2-digit"
  });
}
function statusLabel(message) {
  if (message.status === "sending") return "Sending\u2026";
  if (message.status === "failed")
    return `Not sent \xB7 ${timeLabel(message.createdAt)}`;
  return timeLabel(message.createdAt);
}
function Feed({
  messages,
  draft,
  onDraftChange,
  onSend,
  onRetry
}) {
  const streamRef = useRef2(null);
  const count = messages.length;
  const remaining = MESSAGE_MAX_LENGTH - draft.length;
  const showLength = remaining <= LENGTH_FEEDBACK_THRESHOLD;
  const overflow = Math.abs(remaining);
  const lengthLabel = remaining < 0 ? `${overflow} character${overflow === 1 ? "" : "s"} too long` : `${remaining} characters left`;
  useEffect2(() => {
    const stream = streamRef.current;
    if (stream) stream.scrollTop = stream.scrollHeight;
  }, [count]);
  return /* @__PURE__ */ jsxs5("section", { className: "hallow-feed", "aria-label": "General notes", children: [
    /* @__PURE__ */ jsxs5("div", { className: "hallow-feed-head", children: [
      /* @__PURE__ */ jsx6("h3", { className: "hallow-feed-title", children: "General notes" }),
      /* @__PURE__ */ jsx6("span", { className: "hallow-feed-tag", children: "Sends now" })
    ] }),
    /* @__PURE__ */ jsx6("p", { className: "hallow-feed-help", children: "About the site overall. Goes to the team now and stays with this round." }),
    count > 0 && /* @__PURE__ */ jsx6("div", { className: "hallow-feed-stream", ref: streamRef, role: "log", children: messages.map((message) => /* @__PURE__ */ jsxs5(
      "div",
      {
        className: `hallow-feed-message is-${message.status}`,
        children: [
          /* @__PURE__ */ jsx6("p", { className: "hallow-feed-body", children: message.body }),
          /* @__PURE__ */ jsxs5("div", { className: "hallow-feed-foot", children: [
            /* @__PURE__ */ jsx6("span", { className: "hallow-feed-time", children: statusLabel(message) }),
            message.status === "failed" && /* @__PURE__ */ jsx6(
              "button",
              {
                className: "hallow-link",
                onClick: () => onRetry(message.id),
                type: "button",
                children: "Retry"
              }
            )
          ] })
        ]
      },
      message.id
    )) }),
    /* @__PURE__ */ jsxs5("div", { className: "hallow-feed-composer", children: [
      /* @__PURE__ */ jsx6(
        "textarea",
        {
          "aria-label": "Write a general message about the site overall",
          className: "hallow-textarea hallow-feed-textarea",
          id: "hallow-general-message",
          maxLength: MESSAGE_MAX_LENGTH,
          onChange: (event) => onDraftChange(event.target.value),
          onKeyDown: (event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && draft.trim())
              onSend();
          },
          placeholder: "Share a thought about the site overall\u2026",
          value: draft
        }
      ),
      /* @__PURE__ */ jsxs5("div", { className: "hallow-feed-composer-foot", children: [
        /* @__PURE__ */ jsx6("span", { className: "hallow-feed-length", "aria-live": "polite", children: showLength ? lengthLabel : "" }),
        /* @__PURE__ */ jsxs5(
          "button",
          {
            className: "hallow-btn hallow-btn-strong hallow-btn-sm hallow-feed-send",
            disabled: !draft.trim() || draft.length > MESSAGE_MAX_LENGTH,
            onClick: onSend,
            type: "button",
            children: [
              /* @__PURE__ */ jsx6(SendIcon, {}),
              " Send"
            ]
          }
        )
      ] })
    ] })
  ] });
}

// packages/overlay/src/components/Sidebar.tsx
import { Fragment as Fragment2, jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
function pageLabel(annotation, currentPath) {
  if (annotation.pagePath === currentPath) return "This page";
  return annotation.pagePath === "/" ? "Home" : annotation.pagePath;
}
function AnnotationCard({
  annotation,
  index,
  active,
  currentPath,
  editing,
  readOnly,
  onHover,
  onSelect,
  onEditStart,
  onEditCancel,
  onSave,
  onDelete,
  registerRef
}) {
  const [draft, setDraft] = useState2(annotation.note);
  const textareaRef = useRef3(null);
  useEffect3(() => {
    if (editing) {
      setDraft(annotation.note);
      textareaRef.current?.focus();
    }
  }, [editing, annotation.note]);
  return /* @__PURE__ */ jsxs6(
    "div",
    {
      className: `hallow-card ${active ? "is-active" : ""}`,
      onClick: () => !editing && onSelect(annotation.id),
      onMouseEnter: () => onHover(annotation.id),
      onMouseLeave: () => onHover(null),
      ref: (node) => registerRef(annotation.id, node),
      children: [
        /* @__PURE__ */ jsx7("span", { className: "hallow-card-index", children: index }),
        /* @__PURE__ */ jsx7("div", { className: "hallow-card-body", children: editing ? /* @__PURE__ */ jsxs6(
          "div",
          {
            className: "hallow-edit",
            onClick: (event) => event.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx7(
                "textarea",
                {
                  "aria-label": "Edit note",
                  className: "hallow-textarea",
                  onChange: (event) => setDraft(event.target.value),
                  onKeyDown: (event) => {
                    if (event.key === "Escape") onEditCancel();
                    if (event.key === "Enter" && (event.metaKey || event.ctrlKey) && draft.trim())
                      onSave(annotation.id, draft.trim());
                  },
                  ref: textareaRef,
                  value: draft
                }
              ),
              /* @__PURE__ */ jsxs6("div", { className: "hallow-edit-actions", children: [
                /* @__PURE__ */ jsx7(
                  "button",
                  {
                    className: "hallow-btn hallow-btn-ghost hallow-btn-sm",
                    onClick: onEditCancel,
                    type: "button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsx7(
                  "button",
                  {
                    className: "hallow-btn hallow-btn-primary hallow-btn-sm",
                    disabled: !draft.trim(),
                    onClick: () => onSave(annotation.id, draft.trim()),
                    type: "button",
                    children: "Save"
                  }
                )
              ] })
            ]
          }
        ) : /* @__PURE__ */ jsxs6(Fragment2, { children: [
          /* @__PURE__ */ jsx7("p", { className: "hallow-card-note", children: annotation.note }),
          /* @__PURE__ */ jsxs6("div", { className: "hallow-card-foot", children: [
            /* @__PURE__ */ jsxs6("div", { className: "hallow-card-meta", children: [
              /* @__PURE__ */ jsx7("span", { className: "hallow-card-snippet", children: annotation.textSnippet || annotation.selector }),
              /* @__PURE__ */ jsx7("span", { className: "hallow-card-dot", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx7("span", { className: "hallow-card-page", children: pageLabel(annotation, currentPath) })
            ] }),
            !readOnly && /* @__PURE__ */ jsxs6("div", { className: "hallow-card-actions", children: [
              /* @__PURE__ */ jsxs6(
                "button",
                {
                  className: "hallow-link",
                  onClick: (event) => {
                    event.stopPropagation();
                    onEditStart(annotation.id);
                  },
                  type: "button",
                  children: [
                    /* @__PURE__ */ jsx7(PencilIcon, {}),
                    " Edit"
                  ]
                }
              ),
              /* @__PURE__ */ jsx7(
                "button",
                {
                  className: "hallow-link is-danger",
                  onClick: (event) => {
                    event.stopPropagation();
                    onDelete(annotation.id);
                  },
                  type: "button",
                  children: "Delete"
                }
              )
            ] })
          ] })
        ] }) })
      ]
    }
  );
}
function Sidebar({
  annotations,
  roundId,
  mode,
  currentPath,
  activeId,
  sent,
  feedMessages,
  feedDraft,
  feedError,
  onHover,
  onSelect,
  onSave,
  onDelete,
  onReview,
  onCollapse,
  onModeChange,
  onFeedDraftChange,
  onFeedSend,
  onFeedRetry,
  onNewRound,
  persistenceError
}) {
  const [editingId, setEditingId] = useState2(null);
  const cardRefs = useRef3(/* @__PURE__ */ new Map());
  useLayoutEffect(() => {
    if (!activeId) return;
    cardRefs.current.get(activeId)?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [activeId]);
  const count = annotations.length;
  const generalCount = feedMessages.filter(
    (message) => message.status === "sent" && message.roundId === roundId
  ).length;
  const totalCount = count + generalCount;
  return /* @__PURE__ */ jsxs6("aside", { className: "hallow-sidebar", "aria-label": "Feedback round", children: [
    /* @__PURE__ */ jsxs6("div", { className: "hallow-sidebar-head", children: [
      /* @__PURE__ */ jsxs6("div", { className: "hallow-sidebar-toolbar", children: [
        sent ? /* @__PURE__ */ jsxs6("span", { className: "hallow-sent-chip", children: [
          /* @__PURE__ */ jsx7("span", { className: "hallow-sent-chip-mark", children: /* @__PURE__ */ jsx7(CheckIcon, { size: 11 }) }),
          "Round sent"
        ] }) : /* @__PURE__ */ jsx7(Dock, { mode, onChange: onModeChange }),
        /* @__PURE__ */ jsx7(
          "button",
          {
            "aria-label": "Collapse panel",
            className: "hallow-icon-btn",
            onClick: onCollapse,
            type: "button",
            children: /* @__PURE__ */ jsx7(ChevronRightIcon, {})
          }
        )
      ] }),
      /* @__PURE__ */ jsx7("div", { className: "hallow-head-row", children: /* @__PURE__ */ jsxs6("div", { children: [
        /* @__PURE__ */ jsx7("div", { className: "hallow-eyebrow", children: "Review round" }),
        /* @__PURE__ */ jsx7("h2", { className: "hallow-title", children: sent ? "With the team" : "Your notes" }),
        /* @__PURE__ */ jsxs6("div", { className: "hallow-count", children: [
          /* @__PURE__ */ jsx7("strong", { children: totalCount }),
          " ",
          totalCount === 1 ? "note" : "notes",
          " ",
          sent ? "sent" : "so far"
        ] })
      ] }) })
    ] }),
    count === 0 ? /* @__PURE__ */ jsxs6("div", { className: "hallow-empty", children: [
      /* @__PURE__ */ jsx7("div", { className: "hallow-empty-mark", children: /* @__PURE__ */ jsx7(MarkerIcon, {}) }),
      /* @__PURE__ */ jsx7("p", { className: "hallow-empty-title", children: generalCount > 0 ? "No element notes yet" : "No notes yet" }),
      /* @__PURE__ */ jsxs6("p", { className: "hallow-empty-text", children: [
        "Turn on ",
        /* @__PURE__ */ jsx7("strong", { children: "Annotate" }),
        ", then click any element on the page to leave a note. Your round follows you across pages."
      ] })
    ] }) : /* @__PURE__ */ jsx7("div", { className: "hallow-list", children: annotations.map((annotation, position) => /* @__PURE__ */ jsx7(
      AnnotationCard,
      {
        active: activeId === annotation.id,
        annotation,
        currentPath,
        editing: editingId === annotation.id,
        index: position + 1,
        onDelete: (id) => {
          if (onDelete(id)) setEditingId(null);
        },
        onEditCancel: () => setEditingId(null),
        onEditStart: setEditingId,
        onHover,
        onSave: (id, note) => {
          if (onSave(id, note)) setEditingId(null);
        },
        onSelect,
        readOnly: sent,
        registerRef: (id, node) => {
          if (node) cardRefs.current.set(id, node);
          else cardRefs.current.delete(id);
        }
      },
      annotation.id
    )) }),
    /* @__PURE__ */ jsxs6("div", { className: "hallow-foot", children: [
      /* @__PURE__ */ jsx7(
        Feed,
        {
          draft: feedDraft,
          messages: feedMessages,
          onDraftChange: onFeedDraftChange,
          onRetry: onFeedRetry,
          onSend: onFeedSend
        }
      ),
      feedError && /* @__PURE__ */ jsx7("span", { className: "hallow-status is-error", role: "alert", children: feedError }),
      /* @__PURE__ */ jsxs6("div", { className: "hallow-round-action", children: [
        persistenceError && /* @__PURE__ */ jsx7("span", { className: "hallow-status is-error", role: "alert", children: persistenceError }),
        sent ? /* @__PURE__ */ jsxs6(Fragment2, { children: [
          /* @__PURE__ */ jsx7(
            "button",
            {
              className: "hallow-btn hallow-btn-block",
              onClick: onNewRound,
              type: "button",
              children: "Start a new round"
            }
          ),
          /* @__PURE__ */ jsx7("p", { className: "hallow-foot-note", children: "This round is with the team." })
        ] }) : /* @__PURE__ */ jsxs6(Fragment2, { children: [
          /* @__PURE__ */ jsxs6(
            "button",
            {
              className: "hallow-btn hallow-btn-primary hallow-btn-block",
              disabled: totalCount === 0,
              onClick: onReview,
              type: "button",
              children: [
                "Review & send",
                totalCount > 0 ? ` \xB7 ${totalCount}` : ""
              ]
            }
          ),
          /* @__PURE__ */ jsx7("p", { className: "hallow-foot-note", children: persistenceError ? "Nothing will be sent until notes can be saved." : totalCount === 0 ? "Element and general notes go together in this round." : `${count} element ${count === 1 ? "note" : "notes"} + ${generalCount} general ${generalCount === 1 ? "note" : "notes"} in this round.` })
        ] })
      ] })
    ] })
  ] });
}

// ../node_modules/html-to-image/es/util.js
function resolveUrl(url, baseUrl) {
  if (url.match(/^[a-z]+:\/\//i)) {
    return url;
  }
  if (url.match(/^\/\//)) {
    return window.location.protocol + url;
  }
  if (url.match(/^[a-z]+:/i)) {
    return url;
  }
  const doc = document.implementation.createHTMLDocument();
  const base = doc.createElement("base");
  const a = doc.createElement("a");
  doc.head.appendChild(base);
  doc.body.appendChild(a);
  if (baseUrl) {
    base.href = baseUrl;
  }
  a.href = url;
  return a.href;
}
var uuid = /* @__PURE__ */ (() => {
  let counter = 0;
  const random = () => (
    // eslint-disable-next-line no-bitwise
    `0000${(Math.random() * 36 ** 4 << 0).toString(36)}`.slice(-4)
  );
  return () => {
    counter += 1;
    return `u${random()}${counter}`;
  };
})();
function toArray(arrayLike) {
  const arr = [];
  for (let i = 0, l = arrayLike.length; i < l; i++) {
    arr.push(arrayLike[i]);
  }
  return arr;
}
var styleProps = null;
function getStyleProperties(options = {}) {
  if (styleProps) {
    return styleProps;
  }
  if (options.includeStyleProperties) {
    styleProps = options.includeStyleProperties;
    return styleProps;
  }
  styleProps = toArray(window.getComputedStyle(document.documentElement));
  return styleProps;
}
function px(node, styleProperty) {
  const win = node.ownerDocument.defaultView || window;
  const val = win.getComputedStyle(node).getPropertyValue(styleProperty);
  return val ? parseFloat(val.replace("px", "")) : 0;
}
function getNodeWidth(node) {
  const leftBorder = px(node, "border-left-width");
  const rightBorder = px(node, "border-right-width");
  return node.clientWidth + leftBorder + rightBorder;
}
function getNodeHeight(node) {
  const topBorder = px(node, "border-top-width");
  const bottomBorder = px(node, "border-bottom-width");
  return node.clientHeight + topBorder + bottomBorder;
}
function getImageSize(targetNode, options = {}) {
  const width = options.width || getNodeWidth(targetNode);
  const height = options.height || getNodeHeight(targetNode);
  return { width, height };
}
function getPixelRatio() {
  let ratio;
  let FINAL_PROCESS;
  try {
    FINAL_PROCESS = process;
  } catch (e) {
  }
  const val = FINAL_PROCESS && FINAL_PROCESS.env ? FINAL_PROCESS.env.devicePixelRatio : null;
  if (val) {
    ratio = parseInt(val, 10);
    if (Number.isNaN(ratio)) {
      ratio = 1;
    }
  }
  return ratio || window.devicePixelRatio || 1;
}
var canvasDimensionLimit = 16384;
function checkCanvasDimensions(canvas) {
  if (canvas.width > canvasDimensionLimit || canvas.height > canvasDimensionLimit) {
    if (canvas.width > canvasDimensionLimit && canvas.height > canvasDimensionLimit) {
      if (canvas.width > canvas.height) {
        canvas.height *= canvasDimensionLimit / canvas.width;
        canvas.width = canvasDimensionLimit;
      } else {
        canvas.width *= canvasDimensionLimit / canvas.height;
        canvas.height = canvasDimensionLimit;
      }
    } else if (canvas.width > canvasDimensionLimit) {
      canvas.height *= canvasDimensionLimit / canvas.width;
      canvas.width = canvasDimensionLimit;
    } else {
      canvas.width *= canvasDimensionLimit / canvas.height;
      canvas.height = canvasDimensionLimit;
    }
  }
}
function createImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      img.decode().then(() => {
        requestAnimationFrame(() => resolve(img));
      });
    };
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.decoding = "async";
    img.src = url;
  });
}
async function svgToDataURL(svg) {
  return Promise.resolve().then(() => new XMLSerializer().serializeToString(svg)).then(encodeURIComponent).then((html) => `data:image/svg+xml;charset=utf-8,${html}`);
}
async function nodeToDataURL(node, width, height) {
  const xmlns = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(xmlns, "svg");
  const foreignObject = document.createElementNS(xmlns, "foreignObject");
  svg.setAttribute("width", `${width}`);
  svg.setAttribute("height", `${height}`);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  foreignObject.setAttribute("width", "100%");
  foreignObject.setAttribute("height", "100%");
  foreignObject.setAttribute("x", "0");
  foreignObject.setAttribute("y", "0");
  foreignObject.setAttribute("externalResourcesRequired", "true");
  svg.appendChild(foreignObject);
  foreignObject.appendChild(node);
  return svgToDataURL(svg);
}
var isInstanceOfElement = (node, instance) => {
  if (node instanceof instance)
    return true;
  const nodePrototype = Object.getPrototypeOf(node);
  if (nodePrototype === null)
    return false;
  return nodePrototype.constructor.name === instance.name || isInstanceOfElement(nodePrototype, instance);
};

// ../node_modules/html-to-image/es/clone-pseudos.js
function formatCSSText(style) {
  const content = style.getPropertyValue("content");
  return `${style.cssText} content: '${content.replace(/'|"/g, "")}';`;
}
function formatCSSProperties(style, options) {
  return getStyleProperties(options).map((name) => {
    const value = style.getPropertyValue(name);
    const priority = style.getPropertyPriority(name);
    return `${name}: ${value}${priority ? " !important" : ""};`;
  }).join(" ");
}
function getPseudoElementStyle(className, pseudo, style, options) {
  const selector = `.${className}:${pseudo}`;
  const cssText = style.cssText ? formatCSSText(style) : formatCSSProperties(style, options);
  return document.createTextNode(`${selector}{${cssText}}`);
}
function clonePseudoElement(nativeNode, clonedNode, pseudo, options) {
  const style = window.getComputedStyle(nativeNode, pseudo);
  const content = style.getPropertyValue("content");
  if (content === "" || content === "none") {
    return;
  }
  const className = uuid();
  try {
    clonedNode.className = `${clonedNode.className} ${className}`;
  } catch (err) {
    return;
  }
  const styleElement = document.createElement("style");
  styleElement.appendChild(getPseudoElementStyle(className, pseudo, style, options));
  clonedNode.appendChild(styleElement);
}
function clonePseudoElements(nativeNode, clonedNode, options) {
  clonePseudoElement(nativeNode, clonedNode, ":before", options);
  clonePseudoElement(nativeNode, clonedNode, ":after", options);
}

// ../node_modules/html-to-image/es/mimes.js
var WOFF = "application/font-woff";
var JPEG = "image/jpeg";
var mimes = {
  woff: WOFF,
  woff2: WOFF,
  ttf: "application/font-truetype",
  eot: "application/vnd.ms-fontobject",
  png: "image/png",
  jpg: JPEG,
  jpeg: JPEG,
  gif: "image/gif",
  tiff: "image/tiff",
  svg: "image/svg+xml",
  webp: "image/webp"
};
function getExtension(url) {
  const match = /\.([^./]*?)$/g.exec(url);
  return match ? match[1] : "";
}
function getMimeType(url) {
  const extension = getExtension(url).toLowerCase();
  return mimes[extension] || "";
}

// ../node_modules/html-to-image/es/dataurl.js
function getContentFromDataUrl(dataURL) {
  return dataURL.split(/,/)[1];
}
function isDataUrl(url) {
  return url.search(/^(data:)/) !== -1;
}
function makeDataUrl(content, mimeType) {
  return `data:${mimeType};base64,${content}`;
}
async function fetchAsDataURL(url, init, process2) {
  const res = await fetch(url, init);
  if (res.status === 404) {
    throw new Error(`Resource "${res.url}" not found`);
  }
  const blob = await res.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => {
      try {
        resolve(process2({ res, result: reader.result }));
      } catch (error) {
        reject(error);
      }
    };
    reader.readAsDataURL(blob);
  });
}
var cache = {};
function getCacheKey(url, contentType, includeQueryParams) {
  let key = url.replace(/\?.*/, "");
  if (includeQueryParams) {
    key = url;
  }
  if (/ttf|otf|eot|woff2?/i.test(key)) {
    key = key.replace(/.*\//, "");
  }
  return contentType ? `[${contentType}]${key}` : key;
}
async function resourceToDataURL(resourceUrl, contentType, options) {
  const cacheKey = getCacheKey(resourceUrl, contentType, options.includeQueryParams);
  if (cache[cacheKey] != null) {
    return cache[cacheKey];
  }
  if (options.cacheBust) {
    resourceUrl += (/\?/.test(resourceUrl) ? "&" : "?") + (/* @__PURE__ */ new Date()).getTime();
  }
  let dataURL;
  try {
    const content = await fetchAsDataURL(resourceUrl, options.fetchRequestInit, ({ res, result }) => {
      if (!contentType) {
        contentType = res.headers.get("Content-Type") || "";
      }
      return getContentFromDataUrl(result);
    });
    dataURL = makeDataUrl(content, contentType);
  } catch (error) {
    dataURL = options.imagePlaceholder || "";
    let msg = `Failed to fetch resource: ${resourceUrl}`;
    if (error) {
      msg = typeof error === "string" ? error : error.message;
    }
    if (msg) {
      console.warn(msg);
    }
  }
  cache[cacheKey] = dataURL;
  return dataURL;
}

// ../node_modules/html-to-image/es/clone-node.js
async function cloneCanvasElement(canvas) {
  const dataURL = canvas.toDataURL();
  if (dataURL === "data:,") {
    return canvas.cloneNode(false);
  }
  return createImage(dataURL);
}
async function cloneVideoElement(video, options) {
  if (video.currentSrc) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = video.clientWidth;
    canvas.height = video.clientHeight;
    ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataURL2 = canvas.toDataURL();
    return createImage(dataURL2);
  }
  const poster = video.poster;
  const contentType = getMimeType(poster);
  const dataURL = await resourceToDataURL(poster, contentType, options);
  return createImage(dataURL);
}
async function cloneIFrameElement(iframe, options) {
  var _a;
  try {
    if ((_a = iframe === null || iframe === void 0 ? void 0 : iframe.contentDocument) === null || _a === void 0 ? void 0 : _a.body) {
      return await cloneNode(iframe.contentDocument.body, options, true);
    }
  } catch (_b) {
  }
  return iframe.cloneNode(false);
}
async function cloneSingleNode(node, options) {
  if (isInstanceOfElement(node, HTMLCanvasElement)) {
    return cloneCanvasElement(node);
  }
  if (isInstanceOfElement(node, HTMLVideoElement)) {
    return cloneVideoElement(node, options);
  }
  if (isInstanceOfElement(node, HTMLIFrameElement)) {
    return cloneIFrameElement(node, options);
  }
  return node.cloneNode(isSVGElement(node));
}
var isSlotElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SLOT";
var isSVGElement = (node) => node.tagName != null && node.tagName.toUpperCase() === "SVG";
async function cloneChildren(nativeNode, clonedNode, options) {
  var _a, _b;
  if (isSVGElement(clonedNode)) {
    return clonedNode;
  }
  let children = [];
  if (isSlotElement(nativeNode) && nativeNode.assignedNodes) {
    children = toArray(nativeNode.assignedNodes());
  } else if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && ((_a = nativeNode.contentDocument) === null || _a === void 0 ? void 0 : _a.body)) {
    children = toArray(nativeNode.contentDocument.body.childNodes);
  } else {
    children = toArray(((_b = nativeNode.shadowRoot) !== null && _b !== void 0 ? _b : nativeNode).childNodes);
  }
  if (children.length === 0 || isInstanceOfElement(nativeNode, HTMLVideoElement)) {
    return clonedNode;
  }
  await children.reduce((deferred, child) => deferred.then(() => cloneNode(child, options)).then((clonedChild) => {
    if (clonedChild) {
      clonedNode.appendChild(clonedChild);
    }
  }), Promise.resolve());
  return clonedNode;
}
function cloneCSSStyle(nativeNode, clonedNode, options) {
  const targetStyle = clonedNode.style;
  if (!targetStyle) {
    return;
  }
  const sourceStyle = window.getComputedStyle(nativeNode);
  if (sourceStyle.cssText) {
    targetStyle.cssText = sourceStyle.cssText;
    targetStyle.transformOrigin = sourceStyle.transformOrigin;
  } else {
    getStyleProperties(options).forEach((name) => {
      let value = sourceStyle.getPropertyValue(name);
      if (name === "font-size" && value.endsWith("px")) {
        const reducedFont = Math.floor(parseFloat(value.substring(0, value.length - 2))) - 0.1;
        value = `${reducedFont}px`;
      }
      if (isInstanceOfElement(nativeNode, HTMLIFrameElement) && name === "display" && value === "inline") {
        value = "block";
      }
      if (name === "d" && clonedNode.getAttribute("d")) {
        value = `path(${clonedNode.getAttribute("d")})`;
      }
      targetStyle.setProperty(name, value, sourceStyle.getPropertyPriority(name));
    });
  }
}
function cloneInputValue(nativeNode, clonedNode) {
  if (isInstanceOfElement(nativeNode, HTMLTextAreaElement)) {
    clonedNode.innerHTML = nativeNode.value;
  }
  if (isInstanceOfElement(nativeNode, HTMLInputElement)) {
    clonedNode.setAttribute("value", nativeNode.value);
  }
}
function cloneSelectValue(nativeNode, clonedNode) {
  if (isInstanceOfElement(nativeNode, HTMLSelectElement)) {
    const clonedSelect = clonedNode;
    const selectedOption = Array.from(clonedSelect.children).find((child) => nativeNode.value === child.getAttribute("value"));
    if (selectedOption) {
      selectedOption.setAttribute("selected", "");
    }
  }
}
function decorate(nativeNode, clonedNode, options) {
  if (isInstanceOfElement(clonedNode, Element)) {
    cloneCSSStyle(nativeNode, clonedNode, options);
    clonePseudoElements(nativeNode, clonedNode, options);
    cloneInputValue(nativeNode, clonedNode);
    cloneSelectValue(nativeNode, clonedNode);
  }
  return clonedNode;
}
async function ensureSVGSymbols(clone, options) {
  const uses = clone.querySelectorAll ? clone.querySelectorAll("use") : [];
  if (uses.length === 0) {
    return clone;
  }
  const processedDefs = {};
  for (let i = 0; i < uses.length; i++) {
    const use = uses[i];
    const id = use.getAttribute("xlink:href");
    if (id) {
      const exist = clone.querySelector(id);
      const definition = document.querySelector(id);
      if (!exist && definition && !processedDefs[id]) {
        processedDefs[id] = await cloneNode(definition, options, true);
      }
    }
  }
  const nodes = Object.values(processedDefs);
  if (nodes.length) {
    const ns = "http://www.w3.org/1999/xhtml";
    const svg = document.createElementNS(ns, "svg");
    svg.setAttribute("xmlns", ns);
    svg.style.position = "absolute";
    svg.style.width = "0";
    svg.style.height = "0";
    svg.style.overflow = "hidden";
    svg.style.display = "none";
    const defs = document.createElementNS(ns, "defs");
    svg.appendChild(defs);
    for (let i = 0; i < nodes.length; i++) {
      defs.appendChild(nodes[i]);
    }
    clone.appendChild(svg);
  }
  return clone;
}
async function cloneNode(node, options, isRoot) {
  if (!isRoot && options.filter && !options.filter(node)) {
    return null;
  }
  return Promise.resolve(node).then((clonedNode) => cloneSingleNode(clonedNode, options)).then((clonedNode) => cloneChildren(node, clonedNode, options)).then((clonedNode) => decorate(node, clonedNode, options)).then((clonedNode) => ensureSVGSymbols(clonedNode, options));
}

// ../node_modules/html-to-image/es/embed-resources.js
var URL_REGEX = /url\((['"]?)([^'"]+?)\1\)/g;
var URL_WITH_FORMAT_REGEX = /url\([^)]+\)\s*format\((["']?)([^"']+)\1\)/g;
var FONT_SRC_REGEX = /src:\s*(?:url\([^)]+\)\s*format\([^)]+\)[,;]\s*)+/g;
function toRegex(url) {
  const escaped = url.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
  return new RegExp(`(url\\(['"]?)(${escaped})(['"]?\\))`, "g");
}
function parseURLs(cssText) {
  const urls = [];
  cssText.replace(URL_REGEX, (raw, quotation, url) => {
    urls.push(url);
    return raw;
  });
  return urls.filter((url) => !isDataUrl(url));
}
async function embed(cssText, resourceURL, baseURL, options, getContentFromUrl) {
  try {
    const resolvedURL = baseURL ? resolveUrl(resourceURL, baseURL) : resourceURL;
    const contentType = getMimeType(resourceURL);
    let dataURL;
    if (getContentFromUrl) {
      const content = await getContentFromUrl(resolvedURL);
      dataURL = makeDataUrl(content, contentType);
    } else {
      dataURL = await resourceToDataURL(resolvedURL, contentType, options);
    }
    return cssText.replace(toRegex(resourceURL), `$1${dataURL}$3`);
  } catch (error) {
  }
  return cssText;
}
function filterPreferredFontFormat(str, { preferredFontFormat }) {
  return !preferredFontFormat ? str : str.replace(FONT_SRC_REGEX, (match) => {
    while (true) {
      const [src, , format] = URL_WITH_FORMAT_REGEX.exec(match) || [];
      if (!format) {
        return "";
      }
      if (format === preferredFontFormat) {
        return `src: ${src};`;
      }
    }
  });
}
function shouldEmbed(url) {
  return url.search(URL_REGEX) !== -1;
}
async function embedResources(cssText, baseUrl, options) {
  if (!shouldEmbed(cssText)) {
    return cssText;
  }
  const filteredCSSText = filterPreferredFontFormat(cssText, options);
  const urls = parseURLs(filteredCSSText);
  return urls.reduce((deferred, url) => deferred.then((css) => embed(css, url, baseUrl, options)), Promise.resolve(filteredCSSText));
}

// ../node_modules/html-to-image/es/embed-images.js
async function embedProp(propName, node, options) {
  var _a;
  const propValue = (_a = node.style) === null || _a === void 0 ? void 0 : _a.getPropertyValue(propName);
  if (propValue) {
    const cssString = await embedResources(propValue, null, options);
    node.style.setProperty(propName, cssString, node.style.getPropertyPriority(propName));
    return true;
  }
  return false;
}
async function embedBackground(clonedNode, options) {
  ;
  await embedProp("background", clonedNode, options) || await embedProp("background-image", clonedNode, options);
  await embedProp("mask", clonedNode, options) || await embedProp("-webkit-mask", clonedNode, options) || await embedProp("mask-image", clonedNode, options) || await embedProp("-webkit-mask-image", clonedNode, options);
}
async function embedImageNode(clonedNode, options) {
  const isImageElement = isInstanceOfElement(clonedNode, HTMLImageElement);
  if (!(isImageElement && !isDataUrl(clonedNode.src)) && !(isInstanceOfElement(clonedNode, SVGImageElement) && !isDataUrl(clonedNode.href.baseVal))) {
    return;
  }
  const url = isImageElement ? clonedNode.src : clonedNode.href.baseVal;
  const dataURL = await resourceToDataURL(url, getMimeType(url), options);
  await new Promise((resolve, reject) => {
    clonedNode.onload = resolve;
    clonedNode.onerror = options.onImageErrorHandler ? (...attributes) => {
      try {
        resolve(options.onImageErrorHandler(...attributes));
      } catch (error) {
        reject(error);
      }
    } : reject;
    const image = clonedNode;
    if (image.decode) {
      image.decode = resolve;
    }
    if (image.loading === "lazy") {
      image.loading = "eager";
    }
    if (isImageElement) {
      clonedNode.srcset = "";
      clonedNode.src = dataURL;
    } else {
      clonedNode.href.baseVal = dataURL;
    }
  });
}
async function embedChildren(clonedNode, options) {
  const children = toArray(clonedNode.childNodes);
  const deferreds = children.map((child) => embedImages(child, options));
  await Promise.all(deferreds).then(() => clonedNode);
}
async function embedImages(clonedNode, options) {
  if (isInstanceOfElement(clonedNode, Element)) {
    await embedBackground(clonedNode, options);
    await embedImageNode(clonedNode, options);
    await embedChildren(clonedNode, options);
  }
}

// ../node_modules/html-to-image/es/apply-style.js
function applyStyle(node, options) {
  const { style } = node;
  if (options.backgroundColor) {
    style.backgroundColor = options.backgroundColor;
  }
  if (options.width) {
    style.width = `${options.width}px`;
  }
  if (options.height) {
    style.height = `${options.height}px`;
  }
  const manual = options.style;
  if (manual != null) {
    Object.keys(manual).forEach((key) => {
      style[key] = manual[key];
    });
  }
  return node;
}

// ../node_modules/html-to-image/es/embed-webfonts.js
var cssFetchCache = {};
async function fetchCSS(url) {
  let cache2 = cssFetchCache[url];
  if (cache2 != null) {
    return cache2;
  }
  const res = await fetch(url);
  const cssText = await res.text();
  cache2 = { url, cssText };
  cssFetchCache[url] = cache2;
  return cache2;
}
async function embedFonts(data, options) {
  let cssText = data.cssText;
  const regexUrl = /url\(["']?([^"')]+)["']?\)/g;
  const fontLocs = cssText.match(/url\([^)]+\)/g) || [];
  const loadFonts = fontLocs.map(async (loc) => {
    let url = loc.replace(regexUrl, "$1");
    if (!url.startsWith("https://")) {
      url = new URL(url, data.url).href;
    }
    return fetchAsDataURL(url, options.fetchRequestInit, ({ result }) => {
      cssText = cssText.replace(loc, `url(${result})`);
      return [loc, result];
    });
  });
  return Promise.all(loadFonts).then(() => cssText);
}
function parseCSS(source) {
  if (source == null) {
    return [];
  }
  const result = [];
  const commentsRegex = /(\/\*[\s\S]*?\*\/)/gi;
  let cssText = source.replace(commentsRegex, "");
  const keyframesRegex = new RegExp("((@.*?keyframes [\\s\\S]*?){([\\s\\S]*?}\\s*?)})", "gi");
  while (true) {
    const matches = keyframesRegex.exec(cssText);
    if (matches === null) {
      break;
    }
    result.push(matches[0]);
  }
  cssText = cssText.replace(keyframesRegex, "");
  const importRegex = /@import[\s\S]*?url\([^)]*\)[\s\S]*?;/gi;
  const combinedCSSRegex = "((\\s*?(?:\\/\\*[\\s\\S]*?\\*\\/)?\\s*?@media[\\s\\S]*?){([\\s\\S]*?)}\\s*?})|(([\\s\\S]*?){([\\s\\S]*?)})";
  const unifiedRegex = new RegExp(combinedCSSRegex, "gi");
  while (true) {
    let matches = importRegex.exec(cssText);
    if (matches === null) {
      matches = unifiedRegex.exec(cssText);
      if (matches === null) {
        break;
      } else {
        importRegex.lastIndex = unifiedRegex.lastIndex;
      }
    } else {
      unifiedRegex.lastIndex = importRegex.lastIndex;
    }
    result.push(matches[0]);
  }
  return result;
}
async function getCSSRules(styleSheets, options) {
  const ret = [];
  const deferreds = [];
  styleSheets.forEach((sheet) => {
    if ("cssRules" in sheet) {
      try {
        toArray(sheet.cssRules || []).forEach((item, index) => {
          if (item.type === CSSRule.IMPORT_RULE) {
            let importIndex = index + 1;
            const url = item.href;
            const deferred = fetchCSS(url).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
              try {
                sheet.insertRule(rule, rule.startsWith("@import") ? importIndex += 1 : sheet.cssRules.length);
              } catch (error) {
                console.error("Error inserting rule from remote css", {
                  rule,
                  error
                });
              }
            })).catch((e) => {
              console.error("Error loading remote css", e.toString());
            });
            deferreds.push(deferred);
          }
        });
      } catch (e) {
        const inline = styleSheets.find((a) => a.href == null) || document.styleSheets[0];
        if (sheet.href != null) {
          deferreds.push(fetchCSS(sheet.href).then((metadata) => embedFonts(metadata, options)).then((cssText) => parseCSS(cssText).forEach((rule) => {
            inline.insertRule(rule, inline.cssRules.length);
          })).catch((err) => {
            console.error("Error loading remote stylesheet", err);
          }));
        }
        console.error("Error inlining remote css file", e);
      }
    }
  });
  return Promise.all(deferreds).then(() => {
    styleSheets.forEach((sheet) => {
      if ("cssRules" in sheet) {
        try {
          toArray(sheet.cssRules || []).forEach((item) => {
            ret.push(item);
          });
        } catch (e) {
          console.error(`Error while reading CSS rules from ${sheet.href}`, e);
        }
      }
    });
    return ret;
  });
}
function getWebFontRules(cssRules) {
  return cssRules.filter((rule) => rule.type === CSSRule.FONT_FACE_RULE).filter((rule) => shouldEmbed(rule.style.getPropertyValue("src")));
}
async function parseWebFontRules(node, options) {
  if (node.ownerDocument == null) {
    throw new Error("Provided element is not within a Document");
  }
  const styleSheets = toArray(node.ownerDocument.styleSheets);
  const cssRules = await getCSSRules(styleSheets, options);
  return getWebFontRules(cssRules);
}
function normalizeFontFamily(font) {
  return font.trim().replace(/["']/g, "");
}
function getUsedFonts(node) {
  const fonts = /* @__PURE__ */ new Set();
  function traverse(node2) {
    const fontFamily = node2.style.fontFamily || getComputedStyle(node2).fontFamily;
    fontFamily.split(",").forEach((font) => {
      fonts.add(normalizeFontFamily(font));
    });
    Array.from(node2.children).forEach((child) => {
      if (child instanceof HTMLElement) {
        traverse(child);
      }
    });
  }
  traverse(node);
  return fonts;
}
async function getWebFontCSS(node, options) {
  const rules = await parseWebFontRules(node, options);
  const usedFonts = getUsedFonts(node);
  const cssTexts = await Promise.all(rules.filter((rule) => usedFonts.has(normalizeFontFamily(rule.style.fontFamily))).map((rule) => {
    const baseUrl = rule.parentStyleSheet ? rule.parentStyleSheet.href : null;
    return embedResources(rule.cssText, baseUrl, options);
  }));
  return cssTexts.join("\n");
}
async function embedWebFonts(clonedNode, options) {
  const cssText = options.fontEmbedCSS != null ? options.fontEmbedCSS : options.skipFonts ? null : await getWebFontCSS(clonedNode, options);
  if (cssText) {
    const styleNode = document.createElement("style");
    const sytleContent = document.createTextNode(cssText);
    styleNode.appendChild(sytleContent);
    if (clonedNode.firstChild) {
      clonedNode.insertBefore(styleNode, clonedNode.firstChild);
    } else {
      clonedNode.appendChild(styleNode);
    }
  }
}

// ../node_modules/html-to-image/es/index.js
async function toSvg(node, options = {}) {
  const { width, height } = getImageSize(node, options);
  const clonedNode = await cloneNode(node, options, true);
  await embedWebFonts(clonedNode, options);
  await embedImages(clonedNode, options);
  applyStyle(clonedNode, options);
  const datauri = await nodeToDataURL(clonedNode, width, height);
  return datauri;
}
async function toCanvas(node, options = {}) {
  const { width, height } = getImageSize(node, options);
  const svg = await toSvg(node, options);
  const img = await createImage(svg);
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const ratio = options.pixelRatio || getPixelRatio();
  const canvasWidth = options.canvasWidth || width;
  const canvasHeight = options.canvasHeight || height;
  canvas.width = canvasWidth * ratio;
  canvas.height = canvasHeight * ratio;
  if (!options.skipAutoScale) {
    checkCanvasDimensions(canvas);
  }
  canvas.style.width = `${canvasWidth}`;
  canvas.style.height = `${canvasHeight}`;
  if (options.backgroundColor) {
    context.fillStyle = options.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  }
  context.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas;
}
async function toJpeg(node, options = {}) {
  const canvas = await toCanvas(node, options);
  return canvas.toDataURL("image/jpeg", options.quality || 1);
}

// packages/overlay/src/capture.ts
var SNAPSHOT_MAX_WIDTH = 960;
var SNAPSHOT_MAX_HEIGHT = 640;
var SNAPSHOT_MAX_BYTES = 6e5;
var THUMBNAIL_MAX_WIDTH = 320;
var THUMBNAIL_MAX_HEIGHT = 220;
var THUMBNAIL_MAX_BYTES = 4e4;
var SEMANTIC_CONTAINER = "article, section, li, main, header, footer, nav, form, figure, [role='article'], [role='region'], [role='group']";
function captureContainerFor(element) {
  const semantic = element.closest(SEMANTIC_CONTAINER);
  if (semantic && semantic !== document.body && semantic !== document.documentElement)
    return semantic;
  return element.parentElement ?? element;
}
function renderedSize(element) {
  const rect = element.getBoundingClientRect();
  return {
    height: Math.max(1, Math.ceil(rect.height)),
    width: Math.max(1, Math.ceil(rect.width))
  };
}
function fittedSize(width, height, maxWidth = SNAPSHOT_MAX_WIDTH, maxHeight = SNAPSHOT_MAX_HEIGHT) {
  const scale = Math.min(1, maxWidth / width, maxHeight / height);
  return {
    height: Math.max(1, Math.round(height * scale)),
    width: Math.max(1, Math.round(width * scale))
  };
}
function backgroundFor(element) {
  let current = element;
  while (current) {
    const color = getComputedStyle(current).backgroundColor;
    if (color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)")
      return color;
    current = current.parentElement;
  }
  return "#ffffff";
}
function rememberStyle(element, property) {
  return {
    priority: element.style.getPropertyPriority(property),
    property,
    value: element.style.getPropertyValue(property)
  };
}
function writeStyle(element, stored, value, priority) {
  element.style.setProperty(stored.property, value, priority);
  return {
    ...stored,
    writtenPriority: element.style.getPropertyPriority(stored.property),
    writtenValue: element.style.getPropertyValue(stored.property)
  };
}
function restoreStyle(element, stored) {
  if (element.style.getPropertyValue(stored.property) !== stored.writtenValue || element.style.getPropertyPriority(stored.property) !== stored.writtenPriority)
    return;
  if (stored.value)
    element.style.setProperty(stored.property, stored.value, stored.priority);
  else element.style.removeProperty(stored.property);
}
async function renderSnapshot(container, quality, maxWidth = SNAPSHOT_MAX_WIDTH, maxHeight = SNAPSHOT_MAX_HEIGHT) {
  const source = renderedSize(container);
  const output = fittedSize(source.width, source.height, maxWidth, maxHeight);
  return toJpeg(container, {
    backgroundColor: backgroundFor(container),
    cacheBust: true,
    canvasHeight: output.height,
    canvasWidth: output.width,
    filter: (node) => !node.hasAttribute?.("data-hallow-ui"),
    pixelRatio: 1,
    quality,
    skipAutoScale: true
  });
}
async function renderThumbnail(snapshotDataUrl) {
  const image = new Image();
  image.src = snapshotDataUrl;
  await image.decode();
  const render = (maxWidth, maxHeight, quality) => {
    const output = fittedSize(
      image.naturalWidth,
      image.naturalHeight,
      maxWidth,
      maxHeight
    );
    const canvas = document.createElement("canvas");
    canvas.width = output.width;
    canvas.height = output.height;
    const context = canvas.getContext("2d");
    if (!context) return null;
    context.drawImage(image, 0, 0, output.width, output.height);
    return canvas.toDataURL("image/jpeg", quality);
  };
  let thumbnail = render(THUMBNAIL_MAX_WIDTH, THUMBNAIL_MAX_HEIGHT, 0.58);
  if (thumbnail && thumbnail.length > THUMBNAIL_MAX_BYTES)
    thumbnail = render(240, 165, 0.42);
  return thumbnail && thumbnail.length <= THUMBNAIL_MAX_BYTES ? thumbnail : null;
}
async function captureElementSnapshot(element) {
  const container = captureContainerFor(element);
  const targetStyles = [];
  try {
    targetStyles.push(
      writeStyle(
        element,
        rememberStyle(element, "box-shadow"),
        "inset 0 0 0 4px #356df3, 0 0 0 4px rgba(53, 109, 243, 0.34)",
        "important"
      ),
      writeStyle(
        element,
        rememberStyle(element, "outline"),
        "3px solid #356df3",
        "important"
      ),
      writeStyle(
        element,
        rememberStyle(element, "outline-offset"),
        "3px",
        "important"
      )
    );
    let snapshot = await renderSnapshot(container, 0.72);
    if (snapshot.length > SNAPSHOT_MAX_BYTES) {
      snapshot = await renderSnapshot(container, 0.55, 720, 480);
    }
    if (snapshot.length > SNAPSHOT_MAX_BYTES) return null;
    const thumbnailDataUrl = await renderThumbnail(snapshot).catch(() => null);
    return { snapshotDataUrl: snapshot, thumbnailDataUrl };
  } catch {
    return null;
  } finally {
    targetStyles.forEach((style) => restoreStyle(element, style));
  }
}

// packages/overlay/src/dom.ts
function escapeCss(value) {
  return CSS.escape(value);
}
function selectorFor(element) {
  if (element === document.documentElement) return "html";
  if (element === document.body) return "body";
  if (element.id) return `#${escapeCss(element.id)}`;
  const parts = [];
  let current = element;
  while (current && current !== document.body) {
    let part = current.tagName.toLowerCase();
    const parent = current.parentElement;
    if (parent) {
      const tagName = current.tagName;
      const sameTag = [...parent.children].filter(
        (child) => child.tagName === tagName
      );
      if (sameTag.length > 1)
        part += `:nth-of-type(${sameTag.indexOf(current) + 1})`;
    }
    parts.unshift(part);
    current = parent;
  }
  return `body > ${parts.join(" > ")}`;
}
function nearestHtmlElement(target) {
  if (!(target instanceof Element)) return null;
  let element = target;
  while (element && !(element instanceof HTMLElement)) {
    element = element.parentElement;
  }
  return element;
}
function findElement(selector) {
  try {
    const found = document.querySelector(selector);
    return found instanceof HTMLElement ? found : null;
  } catch {
    return null;
  }
}
function textSnippetFor(element) {
  return (element.innerText || element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 240);
}
function describeElement(element) {
  const sourceElement = element.closest("[data-hallow-source]");
  return {
    pageUrl: window.location.href,
    pagePath: window.location.pathname || "/",
    selector: selectorFor(element),
    snapshotDataUrl: null,
    thumbnailDataUrl: null,
    source: sourceElement?.dataset.hallowSource ?? null,
    textSnippet: textSnippetFor(element),
    viewport: { height: window.innerHeight, width: window.innerWidth }
  };
}
function toPayload(annotation) {
  return {
    id: annotation.id,
    note: annotation.note,
    pageUrl: annotation.pageUrl,
    selector: annotation.selector,
    snapshotDataUrl: annotation.snapshotDataUrl,
    thumbnailDataUrl: annotation.thumbnailDataUrl ?? null,
    source: annotation.source,
    textSnippet: annotation.textSnippet,
    viewport: annotation.viewport
  };
}

// packages/overlay/src/session.ts
import { useCallback as useCallback2, useSyncExternalStore as useSyncExternalStore2 } from "react";
var STORAGE_PREFIX2 = "hallow.session.v1.";
function storageKey2(projectKey) {
  return `${STORAGE_PREFIX2}${projectKey}`;
}
function newRound() {
  return {
    annotations: [],
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    phase: "draft",
    roundId: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `round-${Date.now()}`
  };
}
function isSession(value) {
  if (!value || typeof value !== "object") return false;
  const session = value;
  return typeof session.roundId === "string" && (session.phase === "draft" || session.phase === "submitting" || session.phase === "sent") && Array.isArray(session.annotations);
}
function phaseRank(phase) {
  return phase === "draft" ? 0 : phase === "submitting" ? 1 : 2;
}
var SessionStore = class {
  constructor(projectKey) {
    __publicField(this, "key");
    __publicField(this, "snapshot");
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "storageListener", null);
    __publicField(this, "subscribe", (listener) => {
      this.listeners.add(listener);
      if (this.listeners.size === 1 && typeof window !== "undefined") {
        this.storageListener = (event) => {
          if (event.key !== this.key) return;
          const session = this.read();
          if (session.roundId === this.snapshot.session.roundId && phaseRank(session.phase) < phaseRank(this.snapshot.session.phase))
            return;
          this.snapshot = { persistenceError: null, session };
          this.emit();
        };
        window.addEventListener("storage", this.storageListener);
      }
      return () => {
        this.listeners.delete(listener);
        if (this.listeners.size === 0 && this.storageListener && typeof window !== "undefined") {
          window.removeEventListener("storage", this.storageListener);
          this.storageListener = null;
        }
      };
    });
    __publicField(this, "getSnapshot", () => this.snapshot);
    this.key = storageKey2(projectKey);
    this.snapshot = { persistenceError: null, session: this.read() };
  }
  read() {
    if (typeof window === "undefined") return newRound();
    try {
      const raw = window.localStorage.getItem(this.key);
      if (!raw) return newRound();
      const parsed = JSON.parse(raw);
      return isSession(parsed) ? parsed : newRound();
    } catch {
      return newRound();
    }
  }
  write(next, retainOnFailure = false) {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(this.key, JSON.stringify(next));
      } catch {
        this.snapshot = {
          ...this.snapshot,
          persistenceError: "Notes could not be saved in this browser. Free storage or enable local storage before continuing.",
          session: retainOnFailure ? next : this.snapshot.session
        };
        this.emit();
        return false;
      }
    }
    this.snapshot = { persistenceError: null, session: next };
    this.emit();
    return true;
  }
  emit() {
    this.listeners.forEach((listener) => listener());
  }
  add(draft) {
    if (this.snapshot.session.phase !== "draft") return null;
    const annotation = {
      ...draft,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `note-${Date.now()}-${Math.random().toString(36).slice(2)}`
    };
    return this.write({
      ...this.snapshot.session,
      annotations: [...this.snapshot.session.annotations, annotation]
    }) ? annotation.id : null;
  }
  update(id, note) {
    if (this.snapshot.session.phase !== "draft") return false;
    return this.write({
      ...this.snapshot.session,
      annotations: this.snapshot.session.annotations.map(
        (annotation) => annotation.id === id ? { ...annotation, note } : annotation
      )
    });
  }
  remove(id) {
    if (this.snapshot.session.phase !== "draft") return false;
    return this.write({
      ...this.snapshot.session,
      annotations: this.snapshot.session.annotations.filter(
        (annotation) => annotation.id !== id
      )
    });
  }
  markSent() {
    return this.write({ ...this.snapshot.session, phase: "sent" }, true);
  }
  markSubmitting() {
    if (this.snapshot.session.phase === "sent") return false;
    return this.write({ ...this.snapshot.session, phase: "submitting" });
  }
  prepareGeneralMessageRound() {
    if (this.snapshot.session.phase === "submitting") return null;
    const next = this.snapshot.session.phase === "sent" ? newRound() : this.snapshot.session;
    return this.write(next) ? next.roundId : null;
  }
  /** Retire the sent round and arm a fresh, empty one. */
  reset() {
    return this.write(newRound());
  }
};
var disabledSnapshot2 = {
  persistenceError: null,
  session: newRound()
};
var disabledStore2 = {
  add: () => null,
  prepareGeneralMessageRound: () => null,
  getSnapshot: () => disabledSnapshot2,
  markSent: () => false,
  markSubmitting: () => false,
  remove: () => false,
  reset: () => false,
  subscribe: () => () => void 0,
  update: () => false
};
var stores2 = /* @__PURE__ */ new Map();
function getStore2(projectKey) {
  let store = stores2.get(projectKey);
  if (!store) {
    store = new SessionStore(projectKey);
    stores2.set(projectKey, store);
  }
  return store;
}
function useSession(projectKey, enabled) {
  const store = enabled ? getStore2(projectKey) : disabledStore2;
  const snapshot = useSyncExternalStore2(
    store.subscribe,
    store.getSnapshot,
    store.getSnapshot
  );
  return {
    add: useCallback2((draft) => store.add(draft), [store]),
    prepareGeneralMessageRound: useCallback2(
      () => store.prepareGeneralMessageRound(),
      [store]
    ),
    markSent: useCallback2(() => store.markSent(), [store]),
    markSubmitting: useCallback2(() => store.markSubmitting(), [store]),
    remove: useCallback2((id) => store.remove(id), [store]),
    reset: useCallback2(() => store.reset(), [store]),
    persistenceError: snapshot.persistenceError,
    session: snapshot.session,
    update: useCallback2((id, note) => store.update(id, note), [store])
  };
}

// packages/overlay/src/shadow.ts
import { useEffect as useEffect4, useState as useState3 } from "react";

// packages/overlay/src/styles.ts
var overlayStyles = `
:host, .hallow-root {
  --hallow-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  --hallow-serif: "Iowan Old Style", "Palatino Linotype", "Book Antiqua", Palatino, Georgia, "Times New Roman", serif;

  --hallow-paper: oklch(96.8% 0.006 255);
  --hallow-panel: oklch(99% 0.003 255);
  --hallow-panel-sunk: oklch(93.8% 0.008 255);
  --hallow-ink: oklch(19% 0.014 255);
  --hallow-ink-soft: oklch(45% 0.018 255);
  --hallow-ink-faint: oklch(62% 0.014 255);
  --hallow-line: oklch(19% 0.014 255 / 0.10);
  --hallow-line-strong: oklch(19% 0.014 255 / 0.18);
  --hallow-accent: oklch(57% 0.19 255);
  --hallow-accent-press: oklch(50% 0.18 255);
  --hallow-accent-soft: oklch(57% 0.19 255 / 0.11);
  --hallow-accent-line: oklch(57% 0.19 255 / 0.36);
  --hallow-accent-ink: oklch(99% 0.003 255);
  --hallow-strong: oklch(19% 0.014 255);
  --hallow-strong-soft: oklch(28% 0.018 255);
  --hallow-on-strong: oklch(96% 0.006 255);
  --hallow-on-strong-soft: oklch(76% 0.012 255);
  --hallow-shadow: 0 1px 2px oklch(19% 0.014 255 / 0.08), 0 14px 34px -10px oklch(19% 0.014 255 / 0.22);
  --hallow-shadow-lift: -12px 0 34px -18px oklch(19% 0.014 255 / 0.32);

  /* One inset for every box in the panel, so the head, the note cards, the
     feed, and the round action share a single left edge. */
  --hallow-gutter: 16px;

  --hallow-t-fast: 150ms;
  --hallow-t: 240ms;
  --hallow-t-slow: 440ms;
  --hallow-ease: cubic-bezier(0.22, 1, 0.36, 1);
  --hallow-spring: cubic-bezier(0.34, 1.42, 0.5, 1);

  color: var(--hallow-ink);
  font-family: var(--hallow-sans);
  font-size: 14px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

@media (prefers-color-scheme: dark) {
  :host, .hallow-root {
    --hallow-paper: oklch(17% 0.012 255);
    --hallow-panel: oklch(21% 0.014 255);
    --hallow-panel-sunk: oklch(25% 0.016 255);
    --hallow-ink: oklch(94% 0.008 255);
    --hallow-ink-soft: oklch(72% 0.014 255);
    --hallow-ink-faint: oklch(58% 0.014 255);
    --hallow-line: oklch(94% 0.008 255 / 0.10);
    --hallow-line-strong: oklch(94% 0.008 255 / 0.18);
    --hallow-accent: oklch(70% 0.16 255);
    --hallow-accent-press: oklch(64% 0.18 255);
    --hallow-accent-soft: oklch(70% 0.16 255 / 0.16);
    --hallow-accent-line: oklch(70% 0.16 255 / 0.42);
    --hallow-accent-ink: oklch(15% 0.012 255);
    --hallow-strong: oklch(12% 0.01 255);
    --hallow-strong-soft: oklch(24% 0.016 255);
    --hallow-on-strong: oklch(96% 0.006 255);
    --hallow-on-strong-soft: oklch(76% 0.012 255);
    --hallow-shadow: 0 1px 2px oklch(5% 0.01 255 / 0.55), 0 18px 44px -10px oklch(5% 0.01 255 / 0.68);
    --hallow-shadow-lift: -12px 0 36px -18px oklch(5% 0.01 255 / 0.74);
  }
}

.hallow-root, .hallow-root * { box-sizing: border-box; }
.hallow-root { pointer-events: none; }
.hallow-root button { font-family: inherit; }

/* \u2500\u2500 On-page rings (theme-independent, legible on any host) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-ring {
  position: fixed;
  pointer-events: none;
  border-radius: 7px;
  border: 2px solid var(--hallow-accent);
  box-shadow:
    0 0 0 1px oklch(99% 0.003 255 / 0.9),
    0 0 0 5px var(--hallow-accent-soft),
    0 10px 26px -6px oklch(10% 0.01 255 / 0.32);
  transition:
    top var(--hallow-t) var(--hallow-ease),
    left var(--hallow-t) var(--hallow-ease),
    width var(--hallow-t) var(--hallow-ease),
    height var(--hallow-t) var(--hallow-ease);
}
.hallow-ring.is-hover { border-style: dashed; }
.hallow-ring.is-pulse { animation: hallow-pulse 620ms var(--hallow-ease); }

/* \u2500\u2500 Numbered pins \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-pin {
  position: fixed;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 24px;
  height: 24px;
  padding: 0 6px;
  border: none;
  border-radius: 999px;
  background: var(--hallow-accent);
  color: oklch(99% 0.003 255);
  font: 600 12px/1 var(--hallow-sans);
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  pointer-events: auto;
  box-shadow:
    0 0 0 2px oklch(99% 0.003 255 / 0.94),
    0 4px 10px oklch(10% 0.01 255 / 0.32);
  transform-origin: center bottom;
  animation: hallow-pin-drop 480ms var(--hallow-spring) both;
  transition: transform var(--hallow-t-fast) var(--hallow-ease);
}
.hallow-pin:hover { transform: scale(1.12); }
.hallow-pin.is-active { transform: scale(1.12); box-shadow: 0 0 0 2px oklch(99% 0.003 255 / 0.94), 0 0 0 5px var(--hallow-accent-soft), 0 6px 14px oklch(10% 0.01 255 / 0.36); }
.hallow-pin.is-pulse { animation: hallow-pin-pulse 620ms var(--hallow-ease); }

/* \u2500\u2500 Panel mode control \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-seg {
  position: relative;
  display: flex;
  flex: 1;
  align-items: center;
  padding: 4px;
  background: var(--hallow-strong-soft);
  border: 1px solid oklch(96% 0.006 255 / 0.12);
  border-radius: 999px;
}
.hallow-seg-thumb {
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 4px;
  width: calc(50% - 4px);
  border-radius: 999px;
  background: var(--hallow-accent);
  box-shadow: 0 2px 8px -1px oklch(57% 0.19 255 / 0.55);
  transition: transform var(--hallow-t) var(--hallow-spring);
}
.hallow-seg[data-mode="annotate"] .hallow-seg-thumb { transform: translateX(100%); }
.hallow-seg button {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  min-width: 0;
  flex: 1;
  justify-content: center;
  padding: 8px 12px;
  border: none;
  background: transparent;
  border-radius: 999px;
  font: 500 13px/1 var(--hallow-sans);
  letter-spacing: 0.01em;
  color: var(--hallow-on-strong-soft);
  cursor: pointer;
  transition: color var(--hallow-t) var(--hallow-ease);
}
.hallow-seg button[aria-pressed="true"] { color: var(--hallow-accent-ink); }
.hallow-seg button:focus-visible,
.hallow-icon-btn:focus-visible,
.hallow-btn:focus-visible,
.hallow-link:focus-visible,
.hallow-handle:focus-visible,
.hallow-pin:focus-visible {
  outline: 2px solid var(--hallow-accent);
  outline-offset: 2px;
}
.hallow-seg-dot {
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.55;
}
.hallow-seg button[aria-pressed="true"] .hallow-seg-dot {
  opacity: 1;
  animation: hallow-breathe 2.4s ease-in-out infinite;
}

/* \u2500\u2500 Sidebar \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-sidebar {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: var(--hallow-dock-width, clamp(300px, 28vw, 360px));
  display: flex;
  flex-direction: column;
  background: var(--hallow-paper);
  border-left: 1px solid var(--hallow-line-strong);
  box-shadow: var(--hallow-shadow-lift);
  pointer-events: auto;
  overflow: hidden;
  animation: hallow-backdrop-in var(--hallow-t) var(--hallow-ease) both;
}
.hallow-sidebar-head {
  padding: 14px var(--hallow-gutter) 18px;
  background: var(--hallow-strong);
  color: var(--hallow-on-strong);
  border-bottom: 1px solid oklch(96% 0.006 255 / 0.10);
}
.hallow-sidebar-toolbar { display: flex; align-items: center; gap: 10px; }
.hallow-head-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-top: 18px; }
.hallow-eyebrow {
  font: 600 10.5px/1 var(--hallow-sans);
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--hallow-accent);
}
.hallow-title {
  margin: 7px 0 0;
  font: 400 21px/1.15 var(--hallow-serif);
  letter-spacing: 0.01em;
  color: var(--hallow-on-strong);
}
.hallow-count {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  margin-top: 6px;
  font: 400 12.5px/1 var(--hallow-sans);
  color: var(--hallow-on-strong-soft);
  font-variant-numeric: tabular-nums;
}
.hallow-icon-btn {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid oklch(96% 0.006 255 / 0.14);
  border-radius: 9px;
  background: var(--hallow-strong-soft);
  color: var(--hallow-on-strong-soft);
  cursor: pointer;
  transition: background var(--hallow-t-fast) var(--hallow-ease), color var(--hallow-t-fast) var(--hallow-ease);
}
.hallow-icon-btn:hover { background: var(--hallow-accent); color: var(--hallow-on-strong); }

.hallow-list { flex: 1; overflow-y: auto; overscroll-behavior: contain; background: var(--hallow-paper); }
.hallow-list::-webkit-scrollbar { width: 10px; }
.hallow-list::-webkit-scrollbar-thumb { background: var(--hallow-line-strong); border-radius: 999px; border: 3px solid var(--hallow-panel); }

.hallow-card {
  display: flex;
  gap: 12px;
  padding: 13px 14px;
  margin: 8px var(--hallow-gutter) 0;
  border: 1px solid var(--hallow-line);
  border-radius: 12px;
  background: var(--hallow-panel);
  cursor: pointer;
  transition: background var(--hallow-t-fast) var(--hallow-ease);
  animation: hallow-card-in 360ms var(--hallow-ease) both;
}
.hallow-card:first-child { margin-top: var(--hallow-gutter); }
.hallow-card:hover { background: var(--hallow-panel-sunk); }
.hallow-card.is-active { background: var(--hallow-accent-soft); }
.hallow-card-index {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  height: 22px;
  margin-top: 1px;
  padding: 0 6px;
  border-radius: 999px;
  background: var(--hallow-accent);
  color: oklch(99% 0.003 255);
  font: 600 11px/1 var(--hallow-sans);
  font-variant-numeric: tabular-nums;
}
.hallow-card-body { min-width: 0; flex: 1; }
.hallow-card-note {
  margin: 0;
  color: var(--hallow-ink);
  font-size: 13.5px;
  line-height: 1.42;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
/* Context and actions share one row: the card is never padded out by an
   invisible action bar, and nothing shifts when the actions appear. */
.hallow-card-foot {
  display: grid;
  align-items: center;
  min-height: 20px;
  margin-top: 7px;
}
.hallow-card-foot > * { grid-area: 1 / 1; }
.hallow-card-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--hallow-ink-faint);
  font-size: 11.5px;
  min-width: 0;
  /* Inert text: fading it out builds a stacking context that would otherwise
     paint over the actions sharing this cell and swallow their clicks. */
  pointer-events: none;
  transition: opacity var(--hallow-t-fast) var(--hallow-ease);
}
.hallow-card-snippet {
  font-family: ui-monospace, "SF Mono", Menlo, Consolas, monospace;
  font-size: 11px;
  color: var(--hallow-ink-soft);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.hallow-card-dot { flex: none; width: 3px; height: 3px; border-radius: 999px; background: currentColor; }
.hallow-card-page { flex: none; }
/* Sits above the inert meta in the shared cell and stays hit-testable, so the
   reveal is purely visual \u2014 reaching Edit never needs a prior hover. */
.hallow-card-actions {
  position: relative;
  display: flex;
  gap: 2px;
  margin-left: -7px;
  transition: opacity var(--hallow-t-fast) var(--hallow-ease);
}
@media (hover: hover) {
  .hallow-card-actions { opacity: 0; }
  .hallow-card:hover .hallow-card-actions,
  .hallow-card.is-active .hallow-card-actions,
  .hallow-card:focus-within .hallow-card-actions { opacity: 1; }
  .hallow-card:hover .hallow-card-meta,
  .hallow-card.is-active .hallow-card-meta,
  .hallow-card:focus-within .hallow-card-meta { opacity: 0; }
}
@media (hover: none) {
  .hallow-card-foot { gap: 4px; }
  .hallow-card-foot > * { grid-area: auto; }
  .hallow-card-meta,
  .hallow-card-actions { opacity: 1; }
}
.hallow-link {
  border: none;
  background: transparent;
  padding: 3px 7px;
  border-radius: 7px;
  font: 500 11.5px/1 var(--hallow-sans);
  color: var(--hallow-ink-soft);
  cursor: pointer;
  transition: background var(--hallow-t-fast) var(--hallow-ease), color var(--hallow-t-fast) var(--hallow-ease);
}
.hallow-link:hover { background: var(--hallow-panel-sunk); color: var(--hallow-ink); }
.hallow-link.is-danger:hover { color: var(--hallow-accent); }

/* Inline edit within a card */
.hallow-edit { margin-top: 2px; }
.hallow-textarea {
  display: block;
  width: 100%;
  min-height: 76px;
  padding: 9px 10px;
  border: 1px solid var(--hallow-line-strong);
  border-radius: 10px;
  background: var(--hallow-panel-sunk);
  color: var(--hallow-ink);
  font: 13.5px/1.45 var(--hallow-sans);
  resize: vertical;
  transition: border-color var(--hallow-t-fast) var(--hallow-ease), box-shadow var(--hallow-t-fast) var(--hallow-ease);
}
.hallow-textarea::placeholder { color: var(--hallow-ink-faint); }
.hallow-textarea:focus {
  outline: none;
  border-color: var(--hallow-accent-line);
  box-shadow: 0 0 0 3px var(--hallow-accent-soft);
}
.hallow-edit-actions { display: flex; justify-content: flex-end; gap: 8px; margin-top: 9px; }

/* Anchored near the heading it explains rather than floating in the middle of
   an empty column \u2014 it is guidance, not a void. */
.hallow-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 52px 30px 32px;
  text-align: center;
}
.hallow-empty-mark {
  width: 42px; height: 42px;
  display: grid; place-items: center;
  border-radius: 12px;
  background: var(--hallow-accent-soft);
  color: var(--hallow-accent);
}
.hallow-empty-title { margin: 4px 0 0; font: 400 17px/1.3 var(--hallow-serif); color: var(--hallow-ink); }
.hallow-empty-text { margin: 0; max-width: 230px; color: var(--hallow-ink-soft); font-size: 13px; }

.hallow-foot { border-top: 1px solid var(--hallow-line-strong); background: var(--hallow-panel); }

/* \u2500\u2500 General notes (send now, attributed to the active round) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-feed { padding: 16px var(--hallow-gutter); }
.hallow-feed-head { display: flex; align-items: center; gap: 8px; }
.hallow-feed-title { margin: 0; font: 650 12px/1.2 var(--hallow-sans); color: var(--hallow-ink); }
.hallow-feed-tag {
  display: inline-flex;
  align-items: center;
  padding: 3px 7px;
  border-radius: 999px;
  background: var(--hallow-accent-soft);
  color: var(--hallow-accent);
  font: 650 9.5px/1 var(--hallow-sans);
  letter-spacing: 0.09em;
  text-transform: uppercase;
}
.hallow-feed-help { margin: 5px 0 0; color: var(--hallow-ink-soft); font-size: 11.5px; line-height: 1.4; }
.hallow-feed-stream {
  max-height: 132px;
  overflow-y: auto;
  overscroll-behavior: contain;
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin: 10px 0 0;
  padding-right: 2px;
}
.hallow-feed-stream::-webkit-scrollbar { width: 8px; }
.hallow-feed-stream::-webkit-scrollbar-thumb { background: var(--hallow-line-strong); border-radius: 999px; border: 2px solid var(--hallow-panel); }
/* A sent message is a record, not an action: neutral surface, one accent
   hairline marking the thread it belongs to. */
.hallow-feed-message {
  padding: 8px 10px;
  border-radius: 10px 10px 10px 3px;
  background: var(--hallow-panel-sunk);
  border: 1px solid var(--hallow-line);
  border-left: 2px solid var(--hallow-accent-line);
  animation: hallow-card-in 300ms var(--hallow-ease) both;
  transition: opacity var(--hallow-t) var(--hallow-ease);
}
.hallow-feed-message.is-sending { opacity: 0.55; }
.hallow-feed-message.is-failed { border-left-color: var(--hallow-accent); }
.hallow-feed-body { margin: 0; color: var(--hallow-ink); font-size: 12.5px; line-height: 1.42; white-space: pre-wrap; overflow-wrap: anywhere; }
.hallow-feed-foot { display: flex; align-items: center; gap: 6px; margin-top: 5px; }
.hallow-feed-time { color: var(--hallow-ink-faint); font-size: 10.5px; font-variant-numeric: tabular-nums; }
.hallow-feed-message.is-failed .hallow-feed-time { color: var(--hallow-accent); font-weight: 600; }
/* Same shape as the card's inline edit: full-width field, action to the
   trailing edge below it. */
.hallow-feed-composer { display: flex; flex-direction: column; margin-top: 10px; }
.hallow-feed-textarea { min-height: 60px; background: var(--hallow-paper); font-size: 12.5px; }
.hallow-feed-composer-foot { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 8px; }
.hallow-feed-length { color: var(--hallow-ink-faint); font-size: 10.5px; font-variant-numeric: tabular-nums; }
.hallow-feed-send { flex: none; }

/* \u2500\u2500 Round action (the ceremony, a body of work) \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-round-action { padding: 14px var(--hallow-gutter) 16px; border-top: 1px solid var(--hallow-line); background: var(--hallow-paper); }
.hallow-foot-note { margin: 8px 2px 0; text-align: center; color: var(--hallow-ink-faint); font-size: 11.5px; line-height: 1.4; }
/* A status, not a control \u2014 it must not wear a button's or a field's shape. */
.hallow-sent-chip {
  display: inline-flex;
  align-items: center;
  flex: 1;
  gap: 7px;
  padding: 8px 2px;
  color: var(--hallow-on-strong-soft);
  font: 500 12.5px/1 var(--hallow-sans);
}
.hallow-sent-chip-mark {
  display: inline-grid;
  place-items: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: var(--hallow-accent);
  color: var(--hallow-accent-ink);
}

/* Collapsed handle */
.hallow-handle {
  position: fixed;
  top: 16px;
  right: 16px;
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 14px 9px 12px;
  background: var(--hallow-strong);
  border: 1px solid oklch(96% 0.006 255 / 0.14);
  border-radius: 999px;
  box-shadow: var(--hallow-shadow);
  color: var(--hallow-on-strong);
  cursor: pointer;
  pointer-events: auto;
  font: 500 13px/1 var(--hallow-sans);
  animation: hallow-rise var(--hallow-t-slow) var(--hallow-ease) both;
}
.hallow-handle-badge {
  display: inline-flex; align-items: center; justify-content: center;
  min-width: 20px; height: 20px; padding: 0 6px;
  border-radius: 999px; background: var(--hallow-accent); color: oklch(99% 0.003 255);
  font: 600 11px/1 var(--hallow-sans); font-variant-numeric: tabular-nums;
}

/* \u2500\u2500 Composer popover \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-composer {
  position: fixed;
  width: 300px;
  max-width: calc(100vw - 24px);
  padding: 14px;
  background: var(--hallow-panel);
  border: 1px solid var(--hallow-line);
  border-radius: 14px;
  box-shadow: var(--hallow-shadow-lift);
  pointer-events: auto;
  transform-origin: top left;
  animation: hallow-pop var(--hallow-t) var(--hallow-spring) both;
}
.hallow-composer-label { display: block; margin-bottom: 8px; }

/* \u2500\u2500 Buttons \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding: 9px 16px;
  border: 1px solid var(--hallow-line-strong);
  border-radius: 10px;
  background: var(--hallow-panel);
  color: var(--hallow-ink);
  font: 500 13px/1 var(--hallow-sans);
  cursor: pointer;
  transition: background var(--hallow-t-fast) var(--hallow-ease), border-color var(--hallow-t-fast) var(--hallow-ease), transform var(--hallow-t-fast) var(--hallow-ease);
}
.hallow-btn:hover { background: var(--hallow-panel-sunk); }
.hallow-btn:active { transform: translateY(0.5px) scale(0.99); }
.hallow-btn-block { width: 100%; }
.hallow-btn-primary {
  background: var(--hallow-accent);
  border-color: transparent;
  color: var(--hallow-accent-ink);
  box-shadow: 0 1px 2px oklch(10% 0.01 255 / 0.12), 0 8px 18px -6px oklch(57% 0.19 255 / 0.55);
}
.hallow-btn-primary:hover { background: var(--hallow-accent-press); }
/* The feed's own send: the panel's structural material, so the single blue
   primary in the panel stays the round ceremony. */
.hallow-btn-strong {
  background: var(--hallow-strong);
  border-color: transparent;
  color: var(--hallow-on-strong);
  box-shadow: 0 1px 2px oklch(10% 0.01 255 / 0.14);
}
.hallow-btn-strong:hover { background: var(--hallow-strong-soft); }
.hallow-btn-ghost { border-color: transparent; background: transparent; color: var(--hallow-ink-soft); }
.hallow-btn-ghost:hover { background: var(--hallow-panel-sunk); color: var(--hallow-ink); }
.hallow-btn-sm { padding: 6px 11px; border-radius: 8px; font-size: 12.5px; }

/* A disabled control must not read as a filled, pressable one: drop the fill
   rather than fading it, which is what an opacity ramp does to an accent. */
.hallow-btn:disabled,
.hallow-btn:disabled:hover {
  background: var(--hallow-panel-sunk);
  border-color: var(--hallow-line);
  color: var(--hallow-ink-faint);
  box-shadow: none;
  cursor: not-allowed;
  transform: none;
}

.hallow-status { margin: 10px 2px 0; font-size: 12px; text-align: center; }
.hallow-status.is-error { color: var(--hallow-accent); }
.hallow-status.is-info { color: var(--hallow-ink-soft); }

/* \u2500\u2500 Submission ceremony \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
.hallow-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: rgba(20, 16, 13, 0.42);
  pointer-events: auto;
  animation: hallow-backdrop-in var(--hallow-t) var(--hallow-ease) both;
}
@supports (backdrop-filter: blur(3px)) {
  .hallow-backdrop { background: rgba(20, 16, 13, 0.30); backdrop-filter: blur(4px) saturate(1.05); }
}
.hallow-modal {
  width: 460px;
  max-width: 100%;
  max-height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  background: var(--hallow-panel);
  border: 1px solid var(--hallow-line);
  border-radius: 20px;
  box-shadow: var(--hallow-shadow-lift);
  overflow: hidden;
  animation: hallow-modal-in var(--hallow-t) var(--hallow-spring) both;
}
.hallow-modal-head { padding: 22px 24px 18px; border-bottom: 1px solid var(--hallow-line); background: var(--hallow-strong); }
.hallow-modal-title { margin: 8px 0 0; font: 400 24px/1.18 var(--hallow-serif); color: var(--hallow-on-strong); }
.hallow-modal-sub { margin: 7px 0 0; color: var(--hallow-on-strong-soft); font-size: 13.5px; }
.hallow-modal-list { flex: 1; overflow-y: auto; padding: 14px 24px 6px; }
.hallow-general-review { margin: 12px 0 6px; padding: 16px; border-radius: 12px; background: var(--hallow-strong); color: var(--hallow-on-strong); }
.hallow-general-chip { display: inline-flex; padding: 4px 8px; border-radius: 999px; background: var(--hallow-accent); color: var(--hallow-accent-ink); font: 650 10.5px/1 var(--hallow-sans); letter-spacing: 0.08em; text-transform: uppercase; }
.hallow-general-review p { margin: 10px 0 0; white-space: pre-wrap; font-size: 13.5px; line-height: 1.48; }
.hallow-review-row {
  display: flex;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid var(--hallow-line);
}
.hallow-review-row:last-child { border-bottom: none; }
.hallow-review-note { margin: 0; color: var(--hallow-ink); font-size: 13.5px; line-height: 1.42; }
.hallow-review-meta { margin: 5px 0 0; color: var(--hallow-ink-faint); font-size: 11.5px; }
.hallow-already-sent { display: inline-flex; margin-left: 7px; padding: 2px 6px; border: 1px solid var(--hallow-line-strong); border-radius: 999px; color: var(--hallow-ink-faint); font: 600 9.5px/1 var(--hallow-sans); letter-spacing: 0.04em; text-transform: uppercase; }
.hallow-modal-foot { display: flex; justify-content: flex-end; gap: 10px; padding: 16px 24px 20px; border-top: 1px solid var(--hallow-line); }

/* Sent / closing state */
.hallow-sent { padding: 40px 34px 34px; text-align: center; }
.hallow-check {
  width: 60px; height: 60px; margin: 0 auto 20px;
  display: grid; place-items: center;
  border-radius: 999px;
  background: var(--hallow-accent-soft);
  color: var(--hallow-accent);
  animation: hallow-pop 420ms var(--hallow-spring) both;
}
.hallow-check svg path { stroke-dasharray: 30; stroke-dashoffset: 30; animation: hallow-draw 520ms var(--hallow-ease) 220ms both; }
.hallow-sent-title { margin: 0; font: 400 25px/1.2 var(--hallow-serif); color: var(--hallow-ink); }
.hallow-sent-text { margin: 12px auto 0; max-width: 320px; color: var(--hallow-ink-soft); font-size: 14px; line-height: 1.5; }
.hallow-sent-actions { display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
.hallow-sent-aside { margin: 16px auto 0; max-width: 300px; color: var(--hallow-ink-faint); font-size: 12px; }

/* \u2500\u2500 Keyframes \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500 */
@keyframes hallow-rise { from { opacity: 0; transform: translate(-50%, 10px); } to { opacity: 1; transform: translate(-50%, 0); } }
@keyframes hallow-card-in { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: translateY(0); } }
@keyframes hallow-pin-drop { 0% { opacity: 0; transform: translateY(-8px) scale(0.4); } 60% { opacity: 1; } 100% { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes hallow-pop { from { opacity: 0; transform: scale(0.94); } to { opacity: 1; transform: scale(1); } }
@keyframes hallow-modal-in { from { opacity: 0; transform: translateY(10px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes hallow-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes hallow-pulse { 0% { box-shadow: 0 0 0 1px oklch(99% 0.003 255 / 0.9), 0 0 0 5px var(--hallow-accent-soft), 0 10px 26px -6px oklch(10% 0.01 255 / 0.32); } 40% { box-shadow: 0 0 0 1px oklch(99% 0.003 255 / 0.94), 0 0 0 10px var(--hallow-accent-soft), 0 10px 26px -6px oklch(10% 0.01 255 / 0.32); } 100% { box-shadow: 0 0 0 1px oklch(99% 0.003 255 / 0.9), 0 0 0 5px var(--hallow-accent-soft), 0 10px 26px -6px oklch(10% 0.01 255 / 0.32); } }
@keyframes hallow-pin-pulse { 0% { transform: scale(1); } 45% { transform: scale(1.28); } 100% { transform: scale(1); } }
@keyframes hallow-breathe { 0%, 100% { opacity: 0.5; transform: scale(0.85); } 50% { opacity: 1; transform: scale(1); } }
@keyframes hallow-draw { to { stroke-dashoffset: 0; } }

@media (prefers-reduced-motion: reduce) {
  .hallow-root *, .hallow-root *::before, .hallow-root *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
`;

// packages/overlay/src/shadow.ts
function useShadowRoot(enabled) {
  const [mount, setMount] = useState3(null);
  useEffect4(() => {
    if (!enabled || typeof document === "undefined") return;
    const host = document.createElement("div");
    host.setAttribute("data-hallow-ui", "");
    host.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:2147483647;";
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = overlayStyles;
    const inner = document.createElement("div");
    inner.className = "hallow-root";
    shadow.append(style, inner);
    document.documentElement.appendChild(host);
    setMount(inner);
    return () => {
      host.remove();
      setMount(null);
    };
  }, [enabled]);
  return mount;
}

// packages/overlay/src/provider.tsx
import { Fragment as Fragment3, jsx as jsx8, jsxs as jsxs7 } from "react/jsx-runtime";
function isHallowEnabled() {
  const viteEnv = import.meta.env;
  const viteEnabled = viteEnv?.VITE_HALLOW === "1";
  const nextEnabled = typeof process !== "undefined" && process.env?.NEXT_PUBLIC_HALLOW === "1";
  return viteEnabled || nextEnabled;
}
function isOverlayElement(element) {
  return Boolean(element.closest?.("[data-hallow-ui]"));
}
var navigationSubscribers = /* @__PURE__ */ new Set();
var restoreHistory = null;
function subscribeToNavigation(listener) {
  navigationSubscribers.add(listener);
  if (navigationSubscribers.size === 1) {
    const { history } = window;
    const pushState = history.pushState;
    const replaceState = history.replaceState;
    let active = true;
    const notify = () => {
      if (!active) return;
      navigationSubscribers.forEach((subscriber) => subscriber());
    };
    const wrappedPushState = function(data, unused, url) {
      pushState.call(history, data, unused, url);
      notify();
    };
    const wrappedReplaceState = function(data, unused, url) {
      replaceState.call(history, data, unused, url);
      notify();
    };
    history.pushState = wrappedPushState;
    history.replaceState = wrappedReplaceState;
    window.addEventListener("popstate", notify);
    window.addEventListener("hashchange", notify);
    restoreHistory = () => {
      active = false;
      if (history.pushState === wrappedPushState) history.pushState = pushState;
      if (history.replaceState === wrappedReplaceState)
        history.replaceState = replaceState;
      window.removeEventListener("popstate", notify);
      window.removeEventListener("hashchange", notify);
    };
  }
  return () => {
    navigationSubscribers.delete(listener);
    if (navigationSubscribers.size === 0) {
      restoreHistory?.();
      restoreHistory = null;
    }
  };
}
function useViewportTick(active) {
  const [tick, setTick] = useState4(0);
  useEffect5(() => {
    if (!active) return;
    let frame = 0;
    const schedule = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setTick((value) => value + 1);
      });
    };
    window.addEventListener("scroll", schedule, {
      capture: true,
      passive: true
    });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule, { capture: true });
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [active]);
  return tick;
}
function HallowProvider({
  children,
  endpoint,
  projectKey
}) {
  const enabled = useMemo(isHallowEnabled, []);
  const mount = useShadowRoot(enabled);
  const {
    session,
    persistenceError,
    add,
    prepareGeneralMessageRound,
    update,
    remove,
    markSent,
    markSubmitting,
    reset
  } = useSession(projectKey, enabled);
  const {
    feed,
    persistenceError: feedPersistenceError,
    markFailed: markMessageFailed,
    markSent: markMessageSent,
    queue: queueMessage,
    reassignRetry: reassignMessageRetry,
    retry: retryQueuedMessage,
    setDraft: setFeedDraft
  } = useFeed(projectKey, enabled);
  const [mode, setMode] = useState4("browse");
  const [collapsed, setCollapsed] = useState4(false);
  const [hoveredRect, setHoveredRect] = useState4(null);
  const [pending, setPending] = useState4(null);
  const pendingRef = useRef4(null);
  const [hoverId, setHoverId] = useState4(null);
  const [activeId, setActiveId] = useState4(null);
  const [pulse, setPulse] = useState4(0);
  const [reviewOpen, setReviewOpen] = useState4(false);
  const [sentDismissed, setSentDismissed] = useState4(false);
  const [busy, setBusy] = useState4(false);
  const [error, setError] = useState4(null);
  const [feedError, setFeedError] = useState4(null);
  const [currentPath, setCurrentPath] = useState4(
    () => typeof window === "undefined" ? "/" : window.location.pathname || "/"
  );
  const baseUrl = endpoint.replace(/\/$/, "");
  const sent = session.phase === "sent";
  const locked = session.phase !== "draft";
  const ceremonyOpen = reviewOpen || locked && !(sent && sentDismissed);
  const picking = mode === "annotate" && !pending && !ceremonyOpen && !locked;
  useViewportTick(enabled && Boolean(mount));
  useEffect5(() => {
    if (!enabled || typeof window === "undefined") return;
    const onNav = () => setCurrentPath(window.location.pathname || "/");
    return subscribeToNavigation(onNav);
  }, [enabled]);
  useEffect5(() => {
    if (!enabled || !mount || collapsed) return;
    const root = document.documentElement;
    const body = document.body;
    const owned = [
      { element: root, property: "--hallow-dock-width" },
      { element: root, property: "width" },
      { element: root, property: "max-width" },
      { element: root, property: "margin-right" },
      { element: body, property: "contain" }
    ].map(({ element, property }) => ({
      element,
      property,
      previousPriority: element.style.getPropertyPriority(property),
      previousValue: element.style.getPropertyValue(property),
      hasWritten: false,
      isOwned: true,
      writtenPriority: "",
      writtenValue: ""
    }));
    const write = (element, property, value, priority = "") => {
      const entry = owned.find(
        (candidate) => candidate.element === element && candidate.property === property
      );
      if (!entry || !entry.isOwned) return;
      if (entry.hasWritten && (element.style.getPropertyValue(property) !== entry.writtenValue || element.style.getPropertyPriority(property) !== entry.writtenPriority)) {
        entry.isOwned = false;
        return;
      }
      element.style.setProperty(property, value, priority);
      entry.hasWritten = true;
      entry.writtenPriority = element.style.getPropertyPriority(property);
      entry.writtenValue = element.style.getPropertyValue(property);
    };
    let dockWidth = 0;
    const applyDock = (layoutViewportWidth) => {
      dockWidth = Math.min(360, Math.max(300, layoutViewportWidth * 0.28));
      const width = `${dockWidth}px`;
      write(root, "--hallow-dock-width", width);
      write(root, "width", `calc(100% - ${width})`, "important");
      write(root, "max-width", `calc(100% - ${width})`, "important");
      write(root, "margin-right", width, "important");
      write(body, "contain", "layout", "important");
    };
    applyDock(root.clientWidth);
    const onResize = (event) => {
      if (!event.isTrusted) return;
      applyDock(root.getBoundingClientRect().width + dockWidth);
    };
    window.addEventListener("resize", onResize);
    window.dispatchEvent(new Event("resize"));
    return () => {
      window.removeEventListener("resize", onResize);
      owned.forEach(
        ({
          element,
          isOwned,
          previousPriority,
          previousValue,
          property,
          writtenPriority,
          writtenValue
        }) => {
          if (!isOwned || element.style.getPropertyValue(property) !== writtenValue || element.style.getPropertyPriority(property) !== writtenPriority)
            return;
          if (previousValue)
            element.style.setProperty(
              property,
              previousValue,
              previousPriority
            );
          else element.style.removeProperty(property);
        }
      );
      window.dispatchEvent(new Event("resize"));
    };
  }, [collapsed, enabled, mount]);
  useEffect5(() => {
    if (!enabled || !picking) {
      setHoveredRect(null);
      return;
    }
    const move = (event) => {
      const target = nearestHtmlElement(event.target);
      if (!target || isOverlayElement(target)) {
        setHoveredRect(null);
        return;
      }
      setHoveredRect(target.getBoundingClientRect());
    };
    const click = (event) => {
      const target = nearestHtmlElement(event.target);
      if (!target || isOverlayElement(target)) return;
      event.preventDefault();
      event.stopPropagation();
      const next = { element: target, rect: target.getBoundingClientRect() };
      pendingRef.current = next;
      setPending(next);
      setHoveredRect(null);
    };
    document.addEventListener("mousemove", move, true);
    document.addEventListener("click", click, true);
    return () => {
      document.removeEventListener("mousemove", move, true);
      document.removeEventListener("click", click, true);
    };
  }, [enabled, picking]);
  useEffect5(() => {
    if (!enabled) return;
    const onKey = (event) => {
      if (event.key !== "Escape") return;
      if (pending) {
        pendingRef.current = null;
        setPending(null);
      } else if (reviewOpen && !busy) setReviewOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, pending, reviewOpen, busy]);
  const saveNote = useCallback3(
    async (note) => {
      if (!pending) return;
      const capturedPending = pending;
      const visualContext = await captureElementSnapshot(
        capturedPending.element
      );
      if (pendingRef.current !== capturedPending) return;
      const draft = { ...describeElement(capturedPending.element), note };
      const saved = add({
        ...draft,
        snapshotDataUrl: visualContext?.snapshotDataUrl ?? null,
        thumbnailDataUrl: visualContext?.thumbnailDataUrl ?? null
      });
      if (saved || visualContext && add({
        ...draft,
        snapshotDataUrl: null,
        thumbnailDataUrl: null
      })) {
        pendingRef.current = null;
        setPending(null);
      }
    },
    [add, pending]
  );
  const selectAnnotation = useCallback3((id) => {
    setActiveId(id);
    setPulse((value) => value + 1);
  }, []);
  const selectFromPin = useCallback3((id) => {
    setActiveId(id);
    setCollapsed(false);
    setPulse((value) => value + 1);
  }, []);
  const deliverMessage = useCallback3(
    async (message, reassignOnClosed = false) => {
      setFeedError(null);
      try {
        const post = (candidate) => fetch(
          `${baseUrl}/projects/${encodeURIComponent(projectKey)}/messages`,
          {
            body: JSON.stringify({
              body: candidate.body,
              id: candidate.id,
              roundId: candidate.roundId
            }),
            headers: {
              "content-type": "application/json",
              "x-hallow-project-key": projectKey
            },
            method: "POST"
          }
        );
        let delivery = message;
        let response = await post(delivery);
        let payload = null;
        if (!response.ok) payload = await response.json().catch(() => null);
        if (reassignOnClosed && response.status === 409 && payload && typeof payload === "object" && payload.code === "ROUND_NOT_DRAFT") {
          const roundId = prepareGeneralMessageRound();
          if (!roundId)
            throw new Error(
              "This round could not be saved in this browser before retrying."
            );
          const reassigned = reassignMessageRetry(message.id, roundId);
          if (!reassigned)
            throw new Error(
              "This message could not be moved to the current round."
            );
          delivery = reassigned;
          response = await post(delivery);
          payload = response.ok ? null : await response.json().catch(() => null);
        }
        if (!response.ok) {
          const detail = payload && typeof payload === "object" && typeof payload.error === "string" ? payload.error : `Ingest returned ${response.status}`;
          throw new Error(detail);
        }
        markMessageSent(delivery.id);
      } catch (sendError) {
        markMessageFailed(message.id);
        setFeedError(
          sendError instanceof Error ? sendError.message : "Unable to send this message."
        );
      }
    },
    [
      baseUrl,
      markMessageFailed,
      markMessageSent,
      prepareGeneralMessageRound,
      projectKey,
      reassignMessageRetry
    ]
  );
  const sendMessage = useCallback3(() => {
    const body = feed.draft.trim();
    if (!body) return;
    if (body.length > MESSAGE_MAX_LENGTH) {
      const excess = body.length - MESSAGE_MAX_LENGTH;
      setFeedError(
        `Message is ${excess} character${excess === 1 ? "" : "s"} too long. Edit it down to ${MESSAGE_MAX_LENGTH.toLocaleString()} characters before sending.`
      );
      return;
    }
    const messageRoundId = prepareGeneralMessageRound();
    if (!messageRoundId) {
      setFeedError(
        persistenceError ?? "This round could not be saved in this browser before sending."
      );
      return;
    }
    const message = queueMessage(body, messageRoundId);
    if (!message) {
      setFeedError(
        feedPersistenceError ?? "This message could not be saved in this browser."
      );
      return;
    }
    void deliverMessage(message);
  }, [
    deliverMessage,
    prepareGeneralMessageRound,
    feed.draft,
    feedPersistenceError,
    persistenceError,
    queueMessage
  ]);
  const retryMessage = useCallback3(
    (id) => {
      const message = retryQueuedMessage(id);
      if (message) void deliverMessage(message, true);
    },
    [deliverMessage, retryQueuedMessage]
  );
  const submit = useCallback3(async () => {
    const hasGeneralMessages = feed.messages.some(
      (message) => message.roundId === session.roundId && message.status === "sent"
    );
    if (!session.annotations.length && !hasGeneralMessages || sent) return;
    if (persistenceError && !locked) {
      setError(persistenceError);
      return;
    }
    if (!locked && !markSubmitting()) {
      setError(
        "This round could not be locked for sending. Free storage or enable local storage, then try again."
      );
      return;
    }
    setBusy(true);
    setError(null);
    const round = `${baseUrl}/projects/${encodeURIComponent(projectKey)}/rounds/${session.roundId}`;
    try {
      for (const annotation of session.annotations) {
        const response = await fetch(`${round}/annotations`, {
          body: JSON.stringify(toPayload(annotation)),
          headers: {
            "content-type": "application/json",
            "x-hallow-project-key": projectKey
          },
          method: "POST"
        });
        if (!response.ok) throw new Error(`Ingest returned ${response.status}`);
      }
      const submitResponse = await fetch(`${round}/submit`, {
        body: JSON.stringify({}),
        headers: {
          "content-type": "application/json",
          "x-hallow-project-key": projectKey
        },
        method: "POST"
      });
      if (!submitResponse.ok)
        throw new Error(`Ingest returned ${submitResponse.status}`);
      const sentStateSaved = markSent();
      setMode("browse");
      setActiveId(null);
      setHoverId(null);
      if (!sentStateSaved) {
        setError(
          "Round was received, but its sent state could not be saved. Retry to reconcile it."
        );
      } else {
        setError(null);
      }
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unable to send this round."
      );
    } finally {
      setBusy(false);
    }
  }, [
    baseUrl,
    locked,
    markSent,
    markSubmitting,
    persistenceError,
    projectKey,
    feed.messages,
    session.annotations,
    session.roundId,
    sent
  ]);
  const reconcileSentState = useCallback3(() => {
    setBusy(true);
    setError(null);
    if (!markSent()) {
      setError(
        "Round was received, but its sent state could not be saved. Retry to reconcile it."
      );
    }
    setBusy(false);
  }, [markSent]);
  const startNewRound = useCallback3(() => {
    if (reset()) {
      setReviewOpen(false);
      setSentDismissed(false);
      setActiveId(null);
      setError(null);
    }
  }, [reset]);
  if (!enabled || typeof document === "undefined" || !mount) return children;
  const roundGeneralMessages = feed.messages.filter(
    (message) => message.roundId === session.roundId && message.status === "sent"
  );
  const onPage = session.annotations.map((annotation, position) => ({
    annotation,
    index: position + 1,
    rect: annotation.pagePath === currentPath ? findElement(annotation.selector)?.getBoundingClientRect() ?? null : null
  })).filter((entry) => entry.rect);
  const focusId = hoverId ?? activeId;
  const focused = session.annotations.find((item) => item.id === focusId);
  const syncRect = focused && focused.pagePath === currentPath ? findElement(focused.selector)?.getBoundingClientRect() ?? null : null;
  const overlay = /* @__PURE__ */ jsxs7("div", { className: "hallow-root", children: [
    picking && hoveredRect && /* @__PURE__ */ jsx8(Ring, { rect: hoveredRect, variant: "hover" }),
    pending && /* @__PURE__ */ jsx8(Ring, { rect: pending.rect, variant: "select" }),
    !pending && syncRect && /* @__PURE__ */ jsx8(
      Ring,
      {
        rect: syncRect,
        variant: "select",
        pulseKey: activeId ? pulse : 0
      }
    ),
    !locked && onPage.map(({ annotation, index, rect }) => /* @__PURE__ */ jsx8(
      Pin,
      {
        active: activeId === annotation.id || hoverId === annotation.id,
        index,
        onSelect: () => selectFromPin(annotation.id),
        pulseKey: hoverId === annotation.id ? pulse : 0,
        rect
      },
      annotation.id
    )),
    pending && /* @__PURE__ */ jsx8(
      Composer,
      {
        onCancel: () => {
          pendingRef.current = null;
          setPending(null);
        },
        onSave: saveNote,
        rect: pending.rect
      }
    ),
    collapsed ? /* @__PURE__ */ jsxs7(
      "button",
      {
        className: "hallow-handle",
        onClick: () => setCollapsed(false),
        type: "button",
        children: [
          "Notes",
          /* @__PURE__ */ jsx8("span", { className: "hallow-handle-badge", children: session.annotations.length + roundGeneralMessages.length }),
          /* @__PURE__ */ jsx8(ChevronRightIcon, {})
        ]
      }
    ) : /* @__PURE__ */ jsx8(
      Sidebar,
      {
        activeId,
        annotations: session.annotations,
        currentPath,
        feedDraft: feed.draft,
        feedError: feedError ?? feedPersistenceError,
        feedMessages: feed.messages,
        mode,
        onCollapse: () => setCollapsed(true),
        onDelete: remove,
        onFeedDraftChange: setFeedDraft,
        onFeedRetry: retryMessage,
        onFeedSend: sendMessage,
        onHover: setHoverId,
        onModeChange: setMode,
        onNewRound: startNewRound,
        onReview: () => setReviewOpen(true),
        onSave: update,
        onSelect: (id) => {
          const target = session.annotations.find((item) => item.id === id);
          selectAnnotation(id);
          if (target && target.pagePath === currentPath) {
            findElement(target.selector)?.scrollIntoView({
              behavior: "smooth",
              block: "center"
            });
          }
        },
        persistenceError,
        roundId: session.roundId,
        sent
      }
    ),
    ceremonyOpen && /* @__PURE__ */ jsx8(
      Ceremony,
      {
        annotations: session.annotations,
        generalMessages: roundGeneralMessages,
        busy,
        error: error ?? persistenceError,
        locked,
        onCancel: () => setReviewOpen(false),
        onConfirm: submit,
        onDismiss: () => {
          setReviewOpen(false);
          setSentDismissed(true);
        },
        onReconcile: reconcileSentState,
        onReset: startNewRound,
        sent
      }
    )
  ] });
  return /* @__PURE__ */ jsxs7(Fragment3, { children: [
    children,
    createPortal(overlay, mount)
  ] });
}
export {
  HallowProvider
};
