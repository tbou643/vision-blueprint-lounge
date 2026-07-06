import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Row = Record<string, any>;

function bucketByDay(rows: Row[], field = "created_at") {
  const m = new Map<string, { date: string; views: number; visitors: Set<string> }>();
  rows.forEach((r) => {
    if (r.event_type !== "pageview") return;
    const d = String(r[field]).slice(0, 10);
    const e = m.get(d) ?? { date: d, views: 0, visitors: new Set() };
    e.views++;
    e.visitors.add(r.visitor_id);
    m.set(d, e);
  });
  return [...m.values()].map((e) => ({ date: e.date, views: e.views, visitors: e.visitors.size }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

function tallyBy(rows: Row[], key: string, filter?: (r: Row) => boolean, limit = 30) {
  const m = new Map<string, number>();
  rows.forEach((r) => {
    if (filter && !filter(r)) return;
    const v = r[key];
    if (v == null || v === "") return;
    m.set(String(v), (m.get(String(v)) ?? 0) + 1);
  });
  return [...m.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, limit);
}

function pct(a: number, b: number) {
  if (!b) return a > 0 ? 100 : 0;
  return Math.round(((a - b) / b) * 1000) / 10;
}

function shouldExcludePath(path: string) {
  return !path || path.includes("__lovable") || path.includes("forceHideBadge") || path.startsWith("/admin");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const authClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await authClient.auth.getClaims(token);
    if (claimsError || !claimsData?.claims?.sub) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(supabaseUrl, serviceKey);
    const { data: isAdmin } = await supabase.rpc("has_role", {
      _user_id: claimsData.claims.sub,
      _role: "admin",
    });
    if (!isAdmin) {
      return new Response(JSON.stringify({ error: "Forbidden" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const body = await req.json().catch(() => ({}));

    // --- Manage excluded visitor IDs ---
    if (body.action === "list_excluded") {
      const { data: ex } = await supabase
        .from("analytics_excluded_visitors")
        .select("*")
        .order("created_at", { ascending: false });
      return new Response(JSON.stringify({ excluded: ex ?? [] }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (body.action === "exclude_visitor" && body.visitor_id) {
      await supabase
        .from("analytics_excluded_visitors")
        .upsert({ visitor_id: String(body.visitor_id), note: body.note ?? "admin" });
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    if (body.action === "unexclude_visitor" && body.visitor_id) {
      await supabase
        .from("analytics_excluded_visitors")
        .delete()
        .eq("visitor_id", String(body.visitor_id));
      return new Response(JSON.stringify({ ok: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const days = Math.min(Math.max(parseInt(body.days ?? "30", 10), 1), 365);
    const now = Date.now();
    const sinceMs = now - days * 86400000;
    const prevSinceMs = sinceMs - days * 86400000;
    const since = new Date(sinceMs).toISOString();
    const prevSince = new Date(prevSinceMs).toISOString();



    // Load events (current + previous period)
    const { data: eventsAll, error } = await supabase
      .from("analytics_events")
      .select("*")
      .gte("created_at", prevSince)
      .order("created_at", { ascending: false })
      .limit(100000);
    if (error) throw error;

    const { data: excludedRows } = await supabase
      .from("analytics_excluded_visitors")
      .select("visitor_id");
    const excludedVisitorSet = new Set((excludedRows ?? []).map((r: Row) => r.visitor_id));

    const filtered = (eventsAll ?? []).filter(
      (r: Row) => !r.excluded && !excludedVisitorSet.has(r.visitor_id) && !shouldExcludePath(r.path),
    );
    const current = filtered.filter((r: Row) => r.created_at >= since);
    const previous = filtered.filter((r: Row) => r.created_at < since);

    // Waitlist signups (current + previous)
    const { data: waitlistAll } = await supabase
      .from("waitlist_signups")
      .select("*")
      .gte("created_at", prevSince)
      .order("created_at", { ascending: false });
    const wCurrent = (waitlistAll ?? []).filter((r: Row) => r.created_at >= since);
    const wPrevious = (waitlistAll ?? []).filter((r: Row) => r.created_at < since);

    // ---- Basic aggregates for a set of rows ----
    function aggregate(rows: Row[], waitlistCount: number) {
      const pv = rows.filter((r) => r.event_type === "pageview");
      const visitors = new Set(pv.map((r) => r.visitor_id));
      const sessions = new Set(pv.map((r) => r.session_id));

      const sessionPageCounts = new Map<string, number>();
      pv.forEach((r) => sessionPageCounts.set(r.session_id, (sessionPageCounts.get(r.session_id) ?? 0) + 1));
      const bounceSessions = [...sessionPageCounts.values()].filter((c) => c === 1).length;
      const bounceRate = sessions.size ? (bounceSessions / sessions.size) * 100 : 0;

      const seenPath = new Map<string, number>();
      rows.forEach((r) => {
        const key = `${r.session_id}|${r.path}`;
        const prev = seenPath.get(key) ?? 0;
        if ((r.duration_ms ?? 0) > prev) seenPath.set(key, r.duration_ms ?? 0);
      });
      const sessionDur = new Map<string, number>();
      seenPath.forEach((dur, key) => {
        const sid = key.split("|")[0];
        sessionDur.set(sid, (sessionDur.get(sid) ?? 0) + dur);
      });
      const avgSessionMs = sessionDur.size
        ? [...sessionDur.values()].reduce((a, b) => a + b, 0) / sessionDur.size
        : 0;

      const emailClicks = rows.filter((r) => r.event_name === "email_click").length;
      const phoneClicks = rows.filter((r) => r.event_name === "phone_click").length;
      const contactRequests = emailClicks + phoneClicks;
      const conversionRate = visitors.size ? ((waitlistCount + contactRequests) / visitors.size) * 100 : 0;

      return {
        pageviews: pv.length,
        visitors: visitors.size,
        sessions: sessions.size,
        avgSessionSec: Math.round(avgSessionMs / 1000),
        bounceRate: Math.round(bounceRate * 10) / 10,
        waitlistSignups: waitlistCount,
        contactRequests,
        conversionRate: Math.round(conversionRate * 10) / 10,
        seenPath,
        sessionDur,
      };
    }

    const cur = aggregate(current, wCurrent.length);
    const prev = aggregate(previous, wPrevious.length);

    // ---- Time series ----
    const timeseries = bucketByDay(current);
    const timeseriesPrev = bucketByDay(previous);

    // ---- Top pages ----
    const pageviews = current.filter((r) => r.event_type === "pageview");
    const pageMap = new Map<string, { path: string; views: number; totalDur: number; durCount: number }>();
    pageviews.forEach((r) => {
      const e = pageMap.get(r.path) ?? { path: r.path, views: 0, totalDur: 0, durCount: 0 };
      e.views++;
      pageMap.set(r.path, e);
    });
    cur.seenPath.forEach((dur, key) => {
      const path = key.split("|").slice(1).join("|");
      const e = pageMap.get(path);
      if (e && dur > 0) { e.totalDur += dur; e.durCount++; }
    });
    const topPages = [...pageMap.values()]
      .map((e) => ({ path: e.path, views: e.views, avgDurationMs: e.durCount ? Math.round(e.totalDur / e.durCount) : 0 }))
      .sort((a, b) => b.views - a.views).slice(0, 25);

    // ---- Referrers ----
    const refMap = new Map<string, number>();
    pageviews.forEach((r) => {
      const src = r.utm_source || r.referrer_domain || "Direct";
      refMap.set(src, (refMap.get(src) ?? 0) + 1);
    });
    const referrers = [...refMap.entries()]
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count).slice(0, 20);

    const devices = tallyBy(pageviews, "device_type");
    const browsers = tallyBy(pageviews, "browser");
    const os = tallyBy(pageviews, "os");

    // ---- Funnel ----
    const visitorIdsCur = new Set(pageviews.map((r) => r.visitor_id));
    const scrolled50 = new Set(
      current.filter((r) => r.event_name === "scroll_depth" && (r.scroll_depth ?? 0) >= 50).map((r) => r.visitor_id),
    );
    const viewedConversionSection = new Set(
      current.filter((r) => (r.path?.includes("/contact")) || r.path?.includes("/calculator") || (r.section && ["contact-page", "calculator", "hero"].includes(r.section))).map((r) => r.visitor_id),
    );
    const formStarted = new Set(
      current.filter((r) => r.event_name === "form_started").map((r) => r.visitor_id),
    );
    const submitted = new Set(
      current.filter((r) => r.event_name === "waitlist_submitted").map((r) => r.visitor_id),
    );

    const funnelSteps = [
      { step: "Visitors", count: visitorIdsCur.size },
      { step: "Scrolled 50%", count: scrolled50.size },
      { step: "Viewed conversion section", count: viewedConversionSection.size },
      { step: "Form started", count: formStarted.size },
      { step: "Submitted", count: submitted.size },
    ];
    const funnel = funnelSteps.map((s, i) => {
      const prevCount = i === 0 ? s.count : funnelSteps[i - 1].count;
      return { ...s, dropPct: i === 0 || prevCount === 0 ? 0 : Math.round((1 - s.count / prevCount) * 1000) / 10 };
    });

    // ---- Campaigns (UTM) ----
    const sessionFirstUTM = new Map<string, { visitor_id: string; utm_campaign: string; utm_source: string | null; utm_medium: string | null }>();
    // Use earliest pageview per session with utm_campaign or utm_source
    current.filter((r) => r.event_type === "pageview").forEach((r) => {
      const key = r.session_id;
      if (!sessionFirstUTM.has(key) && (r.utm_campaign || r.utm_source)) {
        sessionFirstUTM.set(key, {
          visitor_id: r.visitor_id,
          utm_campaign: r.utm_campaign || r.utm_source || "unknown",
          utm_source: r.utm_source,
          utm_medium: r.utm_medium,
        });
      }
    });
    const campaignMap = new Map<string, { campaign: string; source: string | null; medium: string | null; visitors: Set<string>; signups: number }>();
    sessionFirstUTM.forEach((v) => {
      const c = campaignMap.get(v.utm_campaign) ?? { campaign: v.utm_campaign, source: v.utm_source, medium: v.utm_medium, visitors: new Set(), signups: 0 };
      c.visitors.add(v.visitor_id);
      campaignMap.set(v.utm_campaign, c);
    });
    wCurrent.forEach((w: Row) => {
      const camp = w.utm_campaign || w.utm_source;
      if (!camp) return;
      const c = campaignMap.get(camp) ?? { campaign: camp, source: w.utm_source ?? null, medium: w.utm_medium ?? null, visitors: new Set(), signups: 0 };
      c.signups++;
      campaignMap.set(camp, c);
    });
    const campaigns = [...campaignMap.values()].map((c) => ({
      campaign: c.campaign,
      source: c.source,
      medium: c.medium,
      visitors: c.visitors.size,
      signups: c.signups,
      conversionRate: c.visitors.size ? Math.round((c.signups / c.visitors.size) * 1000) / 10 : 0,
    })).sort((a, b) => b.visitors - a.visitors);

    // ---- Geo ----
    const countries = tallyBy(pageviews, "country");
    const cities = tallyBy(pageviews, "city");
    // Calgary FSA (first 3 chars of postal) from waitlist signups
    const fsaMap = new Map<string, number>();
    wCurrent.forEach((w: Row) => {
      const pc = (w.postal_code || "").toUpperCase().replace(/\s+/g, "").slice(0, 3);
      if (pc && pc.startsWith("T")) fsaMap.set(pc, (fsaMap.get(pc) ?? 0) + 1);
    });
    const calgaryAreas = [...fsaMap.entries()].map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count);

    // ---- Scroll depth aggregate ----
    const scrollDepth = [25, 50, 75, 100].map((t) => ({
      depth: t,
      count: current.filter((r) => r.event_name === "scroll_depth" && r.scroll_depth === t).length,
    }));

    // ---- Outbound links ----
    const outboundClicks = tallyBy(
      current.filter((r) => r.event_name === "outbound_click"),
      "outbound_url",
      undefined,
      25,
    ).map((x) => ({ url: x.name, count: x.count }));

    // ---- Landing pages ----
    // First pageview per session = landing page
    const firstBySession = new Map<string, Row>();
    // sort ascending, then take first
    const pvAsc = [...pageviews].sort((a, b) => a.created_at.localeCompare(b.created_at));
    pvAsc.forEach((r) => { if (!firstBySession.has(r.session_id)) firstBySession.set(r.session_id, r); });
    const landingMap = new Map<string, { path: string; visitors: Set<string>; sessions: Set<string>; conversions: number }>();
    firstBySession.forEach((r) => {
      const e = landingMap.get(r.path) ?? { path: r.path, visitors: new Set(), sessions: new Set(), conversions: 0 };
      e.visitors.add(r.visitor_id);
      e.sessions.add(r.session_id);
      landingMap.set(r.path, e);
    });
    // conversions per landing = visitor of that landing signed up (visitor_id match)
    const submittedVisitors = submitted;
    landingMap.forEach((e) => {
      let c = 0;
      e.visitors.forEach((v) => { if (submittedVisitors.has(v)) c++; });
      e.conversions = c;
    });
    const landingPages = [...landingMap.values()].map((e) => {
      const bounced = [...e.sessions].filter((s) => (cur.seenPath as Map<string, number>).size >= 0)
        .filter((s) => {
          // session bounce = single pageview
          return pageviews.filter((r) => r.session_id === s).length === 1;
        }).length;
      return {
        path: e.path,
        visitors: e.visitors.size,
        bounceRate: e.sessions.size ? Math.round((bounced / e.sessions.size) * 1000) / 10 : 0,
        conversions: e.conversions,
      };
    }).sort((a, b) => b.visitors - a.visitors).slice(0, 20);

    // ---- Recent sessions ----
    const sessionMap = new Map<string, any>();
    current.forEach((r) => {
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
        city: r.city,
        duration_ms: 0,
      };
      if (r.event_type === "pageview") s.pages.add(r.path);
      if (r.created_at < s.started_at) s.started_at = r.created_at;
      if (r.created_at > s.last_at) s.last_at = r.created_at;
      sessionMap.set(r.session_id, s);
    });
    cur.sessionDur.forEach((dur, sid) => { const s = sessionMap.get(sid); if (s) s.duration_ms = dur; });
    const recentSessions = [...sessionMap.values()]
      .map((s) => ({ ...s, pages: [...s.pages] }))
      .sort((a, b) => (a.started_at < b.started_at ? 1 : -1))
      .slice(0, 100);

    // ---- Live now ----
    const fiveMinAgo = new Date(now - 5 * 60 * 1000).toISOString();
    const liveNow = new Set(filtered.filter((r: Row) => r.created_at >= fiveMinAgo).map((r: Row) => r.visitor_id)).size;

    // ---- Waitlist with source ----
    const waitlistWithSource = wCurrent.map((w: Row) => ({
      id: w.id,
      name: w.name,
      email: w.email,
      created_at: w.created_at,
      source: w.source,
      utm_source: w.utm_source,
      utm_campaign: w.utm_campaign,
      referrer_domain: w.referrer_domain,
      landing_path: w.landing_path,
      country: w.country,
      city: w.city,
      postal_code: w.postal_code,
    }));

    const totals = {
      pageviews: cur.pageviews,
      visitors: cur.visitors,
      sessions: cur.sessions,
      avgSessionSec: cur.avgSessionSec,
      bounceRate: cur.bounceRate,
      waitlistSignups: cur.waitlistSignups,
      contactRequests: cur.contactRequests,
      conversionRate: cur.conversionRate,
    };
    const deltas = {
      pageviews: pct(cur.pageviews, prev.pageviews),
      visitors: pct(cur.visitors, prev.visitors),
      sessions: pct(cur.sessions, prev.sessions),
      avgSessionSec: pct(cur.avgSessionSec, prev.avgSessionSec),
      bounceRate: pct(cur.bounceRate, prev.bounceRate),
      waitlistSignups: pct(cur.waitlistSignups, prev.waitlistSignups),
      contactRequests: pct(cur.contactRequests, prev.contactRequests),
      conversionRate: pct(cur.conversionRate, prev.conversionRate),
    };

    return new Response(
      JSON.stringify({
        range: { days, since, prevSince },
        totals,
        deltas,
        liveNow,
        timeseries,
        timeseriesPrev,
        topPages,
        referrers,
        devices,
        browsers,
        os,
        funnel,
        campaigns,
        geo: { countries, cities, calgaryAreas },
        scrollDepth,
        outboundClicks,
        landingPages,
        waitlistWithSource,
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
