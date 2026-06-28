import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const password = req.headers.get("x-admin-password");
    const adminPassword = Deno.env.get("ADMIN_PASSWORD");
    if (!adminPassword || password !== adminPassword) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));
    const days = Math.min(Math.max(parseInt(body.days ?? "30", 10), 1), 365);
    const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Pull all events in range
    const { data: events, error } = await supabase
      .from("analytics_events")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: false })
      .limit(50000);

    if (error) throw error;
    const rows = events ?? [];

    // ---- Aggregate ----
    const pageviews = rows.filter((r) => r.event_type === "pageview");
    const visitors = new Set(pageviews.map((r) => r.visitor_id));
    const sessions = new Set(pageviews.map((r) => r.session_id));

    // Sessions with pageview count for bounce
    const sessionPageCounts = new Map<string, number>();
    pageviews.forEach((r) => {
      sessionPageCounts.set(r.session_id, (sessionPageCounts.get(r.session_id) ?? 0) + 1);
    });
    const bounceSessions = [...sessionPageCounts.values()].filter((c) => c === 1).length;
    const bounceRate = sessions.size ? (bounceSessions / sessions.size) * 100 : 0;

    // Avg session duration: per session, sum of latest duration per path
    const sessionDur = new Map<string, number>();
    const seenPath = new Map<string, number>(); // session+path -> max duration
    rows.forEach((r) => {
      const key = `${r.session_id}|${r.path}`;
      const prev = seenPath.get(key) ?? 0;
      if ((r.duration_ms ?? 0) > prev) seenPath.set(key, r.duration_ms ?? 0);
    });
    seenPath.forEach((dur, key) => {
      const sid = key.split("|")[0];
      sessionDur.set(sid, (sessionDur.get(sid) ?? 0) + dur);
    });
    const avgSessionMs = sessionDur.size
      ? [...sessionDur.values()].reduce((a, b) => a + b, 0) / sessionDur.size
      : 0;

    // Time series by day
    const byDay = new Map<string, { date: string; views: number; visitors: Set<string> }>();
    pageviews.forEach((r) => {
      const d = r.created_at.slice(0, 10);
      const e = byDay.get(d) ?? { date: d, views: 0, visitors: new Set() };
      e.views++;
      e.visitors.add(r.visitor_id);
      byDay.set(d, e);
    });
    const timeseries = [...byDay.values()]
      .map((e) => ({ date: e.date, views: e.views, visitors: e.visitors.size }))
      .sort((a, b) => a.date.localeCompare(b.date));

    // Top pages with avg duration
    const pageMap = new Map<string, { path: string; views: number; totalDur: number; durCount: number }>();
    pageviews.forEach((r) => {
      const e = pageMap.get(r.path) ?? { path: r.path, views: 0, totalDur: 0, durCount: 0 };
      e.views++;
      pageMap.set(r.path, e);
    });
    seenPath.forEach((dur, key) => {
      const path = key.split("|").slice(1).join("|");
      const e = pageMap.get(path);
      if (e && dur > 0) {
        e.totalDur += dur;
        e.durCount++;
      }
    });
    const topPages = [...pageMap.values()]
      .map((e) => ({
        path: e.path,
        views: e.views,
        avgDurationMs: e.durCount ? Math.round(e.totalDur / e.durCount) : 0,
      }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);

    // Referrers
    const refMap = new Map<string, number>();
    pageviews.forEach((r) => {
      const src = r.utm_source || r.referrer_domain || "Direct";
      refMap.set(src, (refMap.get(src) ?? 0) + 1);
    });
    const referrers = [...refMap.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 15);

    // Devices, browsers, OS
    const tally = (key: string) => {
      const m = new Map<string, number>();
      pageviews.forEach((r) => {
        const v = (r as any)[key] ?? "Unknown";
        m.set(v, (m.get(v) ?? 0) + 1);
      });
      return [...m.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);
    };

    // Recent visitor sessions
    const sessionMap = new Map<string, any>();
    rows.forEach((r) => {
      const s = sessionMap.get(r.session_id) ?? {
        session_id: r.session_id,
        visitor_id: r.visitor_id,
        started_at: r.created_at,
        last_at: r.created_at,
        pages: new Set(),
        device_type: r.device_type,
        browser: r.browser,
        os: r.os,
        referrer_domain: r.referrer_domain,
        utm_source: r.utm_source,
        country: r.country,
        duration_ms: 0,
      };
      if (r.event_type === "pageview") s.pages.add(r.path);
      if (r.created_at < s.started_at) s.started_at = r.created_at;
      if (r.created_at > s.last_at) s.last_at = r.created_at;
      sessionMap.set(r.session_id, s);
    });
    sessionDur.forEach((dur, sid) => {
      const s = sessionMap.get(sid);
      if (s) s.duration_ms = dur;
    });
    const recentSessions = [...sessionMap.values()]
      .map((s) => ({ ...s, pages: [...s.pages] }))
      .sort((a, b) => (a.started_at < b.started_at ? 1 : -1))
      .slice(0, 50);

    return new Response(
      JSON.stringify({
        range: { days, since },
        totals: {
          pageviews: pageviews.length,
          visitors: visitors.size,
          sessions: sessions.size,
          bounceRate: Math.round(bounceRate * 10) / 10,
          avgSessionSec: Math.round(avgSessionMs / 1000),
        },
        timeseries,
        topPages,
        referrers,
        devices: tally("device_type"),
        browsers: tally("browser"),
        os: tally("os"),
        recentSessions,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
