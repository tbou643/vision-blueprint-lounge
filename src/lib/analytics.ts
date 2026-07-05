import { supabase } from "@/integrations/supabase/client";

// ---------------- Storage keys ----------------
const SESSION_KEY = "np_session_id";
const SESSION_TS = "np_session_ts";
const VISITOR_KEY = "np_visitor_id";
const FIRST_TOUCH_KEY = "np_first_touch";
const GEO_KEY = "np_geo";
const NO_TRACK_KEY = "np_no_track";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

// ---------------- Utilities ----------------
function uuid(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function safeGet(store: Storage, k: string): string | null {
  try { return store.getItem(k); } catch { return null; }
}
function safeSet(store: Storage, k: string, v: string) {
  try { store.setItem(k, v); } catch { /* noop */ }
}

// ---------------- Opt-out / preview filters ----------------
export function isTrackingDisabled(): boolean {
  if (typeof window === "undefined") return true;
  try {
    if (localStorage.getItem(NO_TRACK_KEY) === "1") return true;
    if (document.cookie.includes("np_no_track=1")) return true;
    const host = window.location.hostname;
    if (host.endsWith("lovable.dev") || host.includes("id-preview--")) return true;
    const url = window.location.href;
    if (url.includes("__lovable") || url.includes("forceHideBadge")) return true;
  } catch { /* noop */ }
  return false;
}

export function setExcludeMe(exclude: boolean) {
  try {
    if (exclude) {
      localStorage.setItem(NO_TRACK_KEY, "1");
      document.cookie = `np_no_track=1; path=/; max-age=${60 * 60 * 24 * 365 * 5}; SameSite=Lax`;
    } else {
      localStorage.removeItem(NO_TRACK_KEY);
      document.cookie = "np_no_track=; path=/; max-age=0; SameSite=Lax";
    }
  } catch { /* noop */ }
}

export function isExcluded(): boolean {
  try { return localStorage.getItem(NO_TRACK_KEY) === "1"; } catch { return false; }
}

// ---------------- Identity ----------------
function getVisitorId(): string {
  let id = safeGet(localStorage, VISITOR_KEY);
  if (!id) {
    id = uuid();
    safeSet(localStorage, VISITOR_KEY, id);
  }
  return id;
}

function getSessionId(): string {
  const now = Date.now();
  const ts = parseInt(safeGet(sessionStorage, SESSION_TS) || "0", 10);
  let id = safeGet(sessionStorage, SESSION_KEY);
  if (!id || now - ts > SESSION_TIMEOUT) {
    id = uuid();
    safeSet(sessionStorage, SESSION_KEY, id);
  }
  safeSet(sessionStorage, SESSION_TS, String(now));
  return id;
}

// ---------------- UA / UTM ----------------
function parseUA(ua: string) {
  const lc = ua.toLowerCase();
  let device_type: "mobile" | "tablet" | "desktop" = "desktop";
  if (/ipad|tablet/.test(lc)) device_type = "tablet";
  else if (/mobi|android|iphone/.test(lc)) device_type = "mobile";

  let browser = "Other";
  if (/edg\//.test(lc)) browser = "Edge";
  else if (/chrome\//.test(lc) && !/edg\//.test(lc)) browser = "Chrome";
  else if (/firefox\//.test(lc)) browser = "Firefox";
  else if (/safari\//.test(lc) && !/chrome\//.test(lc)) browser = "Safari";

  let os = "Other";
  if (/windows/.test(lc)) os = "Windows";
  else if (/mac os x/.test(lc)) os = "macOS";
  else if (/android/.test(lc)) os = "Android";
  else if (/iphone|ipad|ios/.test(lc)) os = "iOS";
  else if (/linux/.test(lc)) os = "Linux";

  return { device_type, browser, os };
}

function currentUTM() {
  try {
    const p = new URLSearchParams(window.location.search);
    return {
      utm_source: p.get("utm_source"),
      utm_medium: p.get("utm_medium"),
      utm_campaign: p.get("utm_campaign"),
    };
  } catch {
    return { utm_source: null, utm_medium: null, utm_campaign: null };
  }
}

// First-touch: persisted forever per visitor
export interface FirstTouch {
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer_domain: string | null;
  landing_path: string;
  at: string;
}

function computeReferrerDomain(): string | null {
  const ref = document.referrer;
  if (!ref) return null;
  try {
    const d = new URL(ref).hostname.replace(/^www\./, "");
    if (d === window.location.hostname) return null;
    return d;
  } catch {
    return null;
  }
}

function ensureFirstTouch(): FirstTouch | null {
  try {
    const existing = localStorage.getItem(FIRST_TOUCH_KEY);
    if (existing) return JSON.parse(existing);
    const utm = currentUTM();
    const ft: FirstTouch = {
      ...utm,
      referrer_domain: computeReferrerDomain(),
      landing_path: window.location.pathname + window.location.search,
      at: new Date().toISOString(),
    };
    localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(ft));
    return ft;
  } catch {
    return null;
  }
}

export function getFirstTouch(): FirstTouch | null {
  try {
    const raw = localStorage.getItem(FIRST_TOUCH_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// ---------------- Geo (client-side ipapi.co, cached per session) ----------------
interface GeoInfo { country: string | null; city: string | null; region: string | null; postal: string | null }

async function ensureGeo(): Promise<GeoInfo | null> {
  try {
    const cached = sessionStorage.getItem(GEO_KEY);
    if (cached) return JSON.parse(cached);
    const res = await fetch("https://ipapi.co/json/", { cache: "no-store" });
    if (!res.ok) return null;
    const j = await res.json();
    const geo: GeoInfo = {
      country: j.country_name ?? j.country ?? null,
      city: j.city ?? null,
      region: j.region ?? null,
      postal: j.postal ?? null,
    };
    sessionStorage.setItem(GEO_KEY, JSON.stringify(geo));
    return geo;
  } catch {
    return null;
  }
}

export function getGeo(): GeoInfo | null {
  try {
    const cached = sessionStorage.getItem(GEO_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch { return null; }
}

// ---------------- Core event insert ----------------
let pageStart = Date.now();
let currentPath = "";
let currentEventId: string | null = null;
let heartbeatTimer: number | null = null;
const scrollThresholdsFired = new Set<number>();

async function insertEvent(payload: Record<string, unknown>) {
  if (isTrackingDisabled()) return;
  try {
    const geo = getGeo();
    const enriched = {
      ...payload,
      excluded: isExcluded(),
      country: (payload as any).country ?? geo?.country ?? null,
      city: (payload as any).city ?? geo?.city ?? null,
      region: (payload as any).region ?? geo?.region ?? null,
      postal: (payload as any).postal ?? geo?.postal ?? null,
    };
    await supabase.from("analytics_events").insert(enriched as never);
  } catch { /* silent */ }
}

// ---------------- Public API ----------------
export async function trackPageview(path: string) {
  if (isTrackingDisabled()) return;

  // Kick off geo lookup asap (non-blocking; fills cache for subsequent events)
  ensureGeo();
  ensureFirstTouch();

  if (currentPath && currentPath !== path) {
    await flushDuration(false);
  }
  pageStart = Date.now();
  currentPath = path;
  currentEventId = uuid();
  scrollThresholdsFired.clear();

  const ua = navigator.userAgent;
  const { device_type, browser, os } = parseUA(ua);
  const ref = document.referrer || null;
  const referrer_domain = computeReferrerDomain();
  const utm = currentUTM();

  await insertEvent({
    id: currentEventId,
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    event_type: "pageview",
    event_name: "pageview",
    path,
    referrer: ref,
    referrer_domain,
    ...utm,
    user_agent: ua,
    device_type,
    browser,
    os,
    screen_w: window.screen?.width ?? null,
    screen_h: window.screen?.height ?? null,
    viewport_w: window.innerWidth,
    viewport_h: window.innerHeight,
    language: navigator.language,
    duration_ms: 0,
    is_bounce: true,
  });

  scheduleHeartbeat();
}

export async function trackEvent(
  name: string,
  extras: {
    label?: string | null;
    position?: string | null;
    section?: string | null;
    outbound_url?: string | null;
    form_step?: string | null;
    scroll_depth?: number | null;
    meta?: Record<string, unknown>;
  } = {},
) {
  if (isTrackingDisabled()) return;
  await insertEvent({
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    event_type: "event",
    event_name: name,
    event_label: extras.label ?? null,
    event_position: extras.position ?? null,
    section: extras.section ?? null,
    outbound_url: extras.outbound_url ?? null,
    form_step: extras.form_step ?? null,
    scroll_depth: extras.scroll_depth ?? null,
    meta: extras.meta ?? null,
    path: typeof window !== "undefined" ? window.location.pathname + window.location.search : currentPath,
    user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
  });
}

function scheduleHeartbeat() {
  if (heartbeatTimer) window.clearTimeout(heartbeatTimer);
  heartbeatTimer = window.setTimeout(() => {
    flushDuration(true);
    scheduleHeartbeat();
  }, 15000);
}

export async function flushDuration(isHeartbeat: boolean) {
  if (!currentPath) return;
  const duration = Date.now() - pageStart;
  await insertEvent({
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    event_type: isHeartbeat ? "heartbeat" : "leave",
    event_name: isHeartbeat ? "heartbeat" : "leave",
    path: currentPath,
    duration_ms: duration,
    is_bounce: duration < 10000,
    user_agent: navigator.userAgent,
  });
}

// ---------------- Scroll depth + delegated click tracking ----------------
function onScroll() {
  if (isTrackingDisabled()) return;
  try {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    if (height <= 0) return;
    const pct = Math.min(100, Math.round((scrollTop / height) * 100));
    [25, 50, 75, 100].forEach((t) => {
      if (pct >= t && !scrollThresholdsFired.has(t)) {
        scrollThresholdsFired.add(t);
        trackEvent("scroll_depth", { scroll_depth: t });
      }
    });
  } catch { /* noop */ }
}

function onDelegatedClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  // CTA click via data-cta
  const cta = target.closest("[data-cta]") as HTMLElement | null;
  if (cta) {
    const label = cta.getAttribute("data-cta") || cta.textContent?.trim().slice(0, 60) || "cta";
    const position = cta.getAttribute("data-cta-position") || undefined;
    trackEvent("cta_click", { label, position });
  }

  // Mail / tel
  const link = target.closest("a") as HTMLAnchorElement | null;
  if (link && link.href) {
    if (link.href.startsWith("mailto:")) {
      trackEvent("email_click", { label: link.href.replace("mailto:", "").slice(0, 120) });
    } else if (link.href.startsWith("tel:")) {
      trackEvent("phone_click", { label: link.href.replace("tel:", "").slice(0, 40) });
    } else {
      try {
        const url = new URL(link.href, window.location.href);
        if (url.hostname && url.hostname !== window.location.hostname) {
          trackEvent("outbound_click", { outbound_url: url.href.slice(0, 500), label: url.hostname });
        }
      } catch { /* noop */ }
    }
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => { flushDuration(false); });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushDuration(false);
  });
  window.addEventListener("scroll", () => {
    // rAF-throttled
    (window as any).__np_scroll_pending ||= false;
    if ((window as any).__np_scroll_pending) return;
    (window as any).__np_scroll_pending = true;
    requestAnimationFrame(() => {
      (window as any).__np_scroll_pending = false;
      onScroll();
    });
  }, { passive: true });
  document.addEventListener("click", onDelegatedClick, { capture: true });
}
