import { supabase } from "@/integrations/supabase/client";

const SESSION_KEY = "np_session_id";
const SESSION_TS = "np_session_ts";
const VISITOR_KEY = "np_visitor_id";
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min

function uuid() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

function getVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_KEY);
    if (!id) {
      id = uuid();
      localStorage.setItem(VISITOR_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function getSessionId(): string {
  try {
    const now = Date.now();
    const ts = parseInt(sessionStorage.getItem(SESSION_TS) || "0", 10);
    let id = sessionStorage.getItem(SESSION_KEY);
    if (!id || now - ts > SESSION_TIMEOUT) {
      id = uuid();
      sessionStorage.setItem(SESSION_KEY, id);
    }
    sessionStorage.setItem(SESSION_TS, String(now));
    return id;
  } catch {
    return uuid();
  }
}

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

function getUTM() {
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

let pageStart = Date.now();
let currentPath = "";
let currentEventId: string | null = null;
let heartbeatTimer: number | null = null;

async function insertEvent(payload: Record<string, unknown>) {
  try {
    await supabase.from("analytics_events").insert(payload as never);
  } catch (e) {
    // silent
  }
}

export async function trackPageview(path: string) {
  // finalize previous page duration
  if (currentPath && currentPath !== path) {
    await flushDuration(false);
  }
  pageStart = Date.now();
  currentPath = path;
  currentEventId = uuid();

  const ua = navigator.userAgent;
  const { device_type, browser, os } = parseUA(ua);
  const ref = document.referrer || null;
  let referrer_domain: string | null = null;
  try {
    if (ref) referrer_domain = new URL(ref).hostname.replace(/^www\./, "");
    if (referrer_domain === window.location.hostname) referrer_domain = null;
  } catch {}

  const utm = getUTM();

  await insertEvent({
    id: currentEventId,
    session_id: getSessionId(),
    visitor_id: getVisitorId(),
    event_type: "pageview",
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
    path: currentPath,
    duration_ms: duration,
    is_bounce: duration < 10000,
    user_agent: navigator.userAgent,
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", () => {
    flushDuration(false);
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flushDuration(false);
  });
}
