import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  Users, Eye, Clock, MousePointerClick, RefreshCw, TrendingUp, TrendingDown,
  Download, Radio, Mail, Phone, Target, ArrowRight,
} from "lucide-react";
import { setExcludeMe, isExcluded, getVisitorId } from "@/lib/analytics";
import { supabase } from "@/integrations/supabase/client";

type Delta = number;
interface AnalyticsData {
  range: { days: number; since: string; prevSince: string };
  totals: {
    pageviews: number; visitors: number; sessions: number;
    avgSessionSec: number; bounceRate: number;
    waitlistSignups: number; contactRequests: number; conversionRate: number;
  };
  deltas: Record<string, Delta>;
  liveNow: number;
  timeseries: { date: string; views: number; visitors: number }[];
  timeseriesPrev: { date: string; views: number; visitors: number }[];
  topPages: { path: string; views: number; avgDurationMs: number }[];
  referrers: { source: string; count: number }[];
  devices: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  os: { name: string; count: number }[];
  funnel: { step: string; count: number; dropPct: number }[];
  campaigns: { campaign: string; source: string | null; medium: string | null; visitors: number; signups: number; conversionRate: number }[];
  geo: {
    countries: { name: string; count: number }[];
    cities: { name: string; count: number }[];
    calgaryAreas: { name: string; count: number }[];
  };
  scrollDepth: { depth: number; count: number }[];
  outboundClicks: { url: string; count: number }[];
  landingPages: { path: string; visitors: number; bounceRate: number; conversions: number }[];
  waitlistWithSource: Array<{
    id: string; name: string; email: string; created_at: string; source: string | null;
    utm_source: string | null; utm_campaign: string | null; referrer_domain: string | null;
    landing_path: string | null; country: string | null; city: string | null; postal_code: string | null;
  }>;
  recentSessions: Array<{
    session_id: string; visitor_id: string; started_at: string; last_at: string;
    pages: string[]; device_type: string; browser: string; os: string;
    referrer_domain: string | null; utm_source: string | null; country: string | null; city: string | null;
    duration_ms: number;
  }>;
}

const RANGES = [
  { label: "24h", days: 1 },
  { label: "7d", days: 7 },
  { label: "30d", days: 30 },
  { label: "90d", days: 90 },
];
const COLORS = ["#a3e635", "#65a30d", "#3f6212", "#1a2e05", "#84cc16", "#bef264"];

function fmtDur(ms: number) {
  if (!ms || ms < 1000) return "0s";
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  return `${Math.floor(s / 60)}m ${s % 60}s`;
}
function fmtTime(iso: string) { return new Date(iso).toLocaleString(); }

function csvExport(filename: string, rows: Record<string, unknown>[]) {
  if (!rows.length) return;
  const headers = Object.keys(rows[0]);
  const esc = (v: unknown) => {
    if (v == null) return "";
    const s = String(v).replace(/"/g, '""');
    return /[",\n]/.test(s) ? `"${s}"` : s;
  };
  const csv = [headers.join(","), ...rows.map((r) => headers.map((h) => esc(r[h])).join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

function DeltaBadge({ value, invert }: { value: number; invert?: boolean }) {
  if (!Number.isFinite(value)) return null;
  const positive = invert ? value < 0 : value > 0;
  const neutral = value === 0;
  const cls = neutral ? "text-muted-foreground" : positive ? "text-lime" : "text-destructive";
  const Icon = neutral ? null : positive ? TrendingUp : TrendingDown;
  return (
    <span className={`inline-flex items-center gap-1 text-[11px] ${cls}`}>
      {Icon && <Icon className="w-3 h-3" />}
      {value > 0 ? "+" : ""}{value}%
    </span>
  );
}

function Kpi({ icon, label, value, delta, invert }: {
  icon: React.ReactNode; label: string; value: string | number; delta?: number; invert?: boolean;
}) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
          {icon}<span>{label}</span>
        </div>
        <div className="flex items-baseline justify-between gap-2">
          <div className="text-2xl font-light">{value}</div>
          {delta !== undefined && <DeltaBadge value={delta} invert={invert} />}
        </div>
      </CardContent>
    </Card>
  );
}

function PieCard({ title, data }: { title: string; data: { name: string; count: number }[] }) {
  return (
    <Card>
      <CardHeader><CardTitle className="text-base">{title}</CardTitle></CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="count" nameKey="name" outerRadius={70} label={(d) => d.name}>
                {data.map((_, i) => (<Cell key={i} fill={COLORS[i % COLORS.length]} />))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

function ExportBtn({ name, rows }: { name: string; rows: Record<string, unknown>[] }) {
  return (
    <Button variant="ghost" size="sm" onClick={() => csvExport(`${name}.csv`, rows)} disabled={!rows.length}>
      <Download className="w-3.5 h-3.5 mr-1.5" /> CSV
    </Button>
  );
}

export default function AnalyticsAdmin() {
  const { toast } = useToast();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);
  const [compare, setCompare] = useState(false);
  const [excludeMe, setExcludeMeState] = useState(false);
  const [tick, setTick] = useState(0);

  useEffect(() => { setExcludeMeState(isExcluded()); }, []);

  const load = async (d: number) => {
    setLoading(true);
    try {
      const { data: json, error } = await supabase.functions.invoke("admin-analytics", {
        body: { days: d },
      });
      if (error) throw error;
      setData(json as AnalyticsData);
    } catch (e: any) {
      toast({ title: "Fehler beim Laden", description: String(e?.message ?? e), variant: "destructive" });
    } finally { setLoading(false); }
  };

  useEffect(() => { load(days); /* eslint-disable-next-line */ }, [days]);
  // Live-now polling
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 30000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => { if (tick > 0) load(days); /* eslint-disable-next-line */ }, [tick]);

  const combinedSeries = useMemo(() => {
    if (!data) return [];
    if (!compare) return data.timeseries;
    // Align by index (day offset from period start)
    const len = Math.max(data.timeseries.length, data.timeseriesPrev.length);
    const out: Array<{ date: string; views: number; visitors: number; prevViews: number; prevVisitors: number }> = [];
    for (let i = 0; i < len; i++) {
      const c = data.timeseries[i];
      const p = data.timeseriesPrev[i];
      out.push({
        date: c?.date ?? p?.date ?? String(i),
        views: c?.views ?? 0,
        visitors: c?.visitors ?? 0,
        prevViews: p?.views ?? 0,
        prevVisitors: p?.visitors ?? 0,
      });
    }
    return out;
  }, [data, compare]);

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          {RANGES.map((r) => (
            <Button key={r.days} variant={days === r.days ? "default" : "outline"} size="sm" onClick={() => setDays(r.days)}>
              {r.label}
            </Button>
          ))}
          <div className="flex items-center gap-2 ml-3 text-xs text-muted-foreground">
            <Switch checked={compare} onCheckedChange={setCompare} id="cmp" />
            <label htmlFor="cmp">Vergleich mit Vorperiode</label>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Switch
              checked={excludeMe}
              onCheckedChange={(v) => { setExcludeMe(v); setExcludeMeState(v); toast({ title: v ? "Eigene Besuche ausgeschlossen" : "Tracking wieder aktiv" }); }}
              id="exclude"
            />
            <label htmlFor="exclude">Mich ausschließen</label>
          </div>
          {data && (
            <div className="flex items-center gap-2 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-lime" />
              </span>
              <Radio className="w-3.5 h-3.5" />
              <span><strong>{data.liveNow}</strong> live jetzt</span>
            </div>
          )}
          <Button variant="outline" size="sm" onClick={() => load(days)} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Aktualisieren
          </Button>
        </div>
      </div>

      {!data ? (<p className="text-muted-foreground">Lade Daten…</p>) : (
        <>
          {/* Conversion KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <Kpi icon={<Target className="w-4 h-4 text-lime" />} label="Waitlist Signups" value={data.totals.waitlistSignups} delta={data.deltas.waitlistSignups} />
            <Kpi icon={<Mail className="w-4 h-4 text-lime" />} label="Contact Requests (Mail/Tel)" value={data.totals.contactRequests} delta={data.deltas.contactRequests} />
            <Kpi icon={<TrendingUp className="w-4 h-4 text-lime" />} label="Conversion Rate" value={`${data.totals.conversionRate}%`} delta={data.deltas.conversionRate} />
          </div>

          {/* Traffic KPIs */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Kpi icon={<Users className="w-4 h-4" />} label="Besucher" value={data.totals.visitors} delta={data.deltas.visitors} />
            <Kpi icon={<Eye className="w-4 h-4" />} label="Pageviews" value={data.totals.pageviews} delta={data.deltas.pageviews} />
            <Kpi icon={<MousePointerClick className="w-4 h-4" />} label="Sessions" value={data.totals.sessions} delta={data.deltas.sessions} />
            <Kpi icon={<Clock className="w-4 h-4" />} label="Ø Session" value={fmtDur(data.totals.avgSessionSec * 1000)} delta={data.deltas.avgSessionSec} />
            <Kpi icon={<RefreshCw className="w-4 h-4" />} label="Bounce" value={`${data.totals.bounceRate}%`} delta={data.deltas.bounceRate} invert />
          </div>

          {/* Time series */}
          <Card>
            <CardHeader><CardTitle className="text-base">Verlauf</CardTitle></CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer>
                  <LineChart data={combinedSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Legend />
                    <Line type="monotone" dataKey="visitors" name="Besucher" stroke="#a3e635" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="views" name="Pageviews" stroke="#65a30d" strokeWidth={2} dot={false} />
                    {compare && <Line type="monotone" dataKey="prevVisitors" name="Besucher (vorher)" stroke="#a3e635" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />}
                    {compare && <Line type="monotone" dataKey="prevViews" name="Pageviews (vorher)" stroke="#65a30d" strokeDasharray="4 4" strokeWidth={1.5} dot={false} />}
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Funnel */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Conversion Funnel</CardTitle>
                <ExportBtn name="funnel" rows={data.funnel} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {data.funnel.map((s, i) => {
                  const max = data.funnel[0]?.count || 1;
                  const pct = Math.round((s.count / max) * 100);
                  return (
                    <div key={s.step} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{i + 1}. {s.step}</span>
                        <span>
                          <strong>{s.count}</strong>
                          {i > 0 && <span className="text-xs text-muted-foreground ml-2">-{s.dropPct}% drop</span>}
                        </span>
                      </div>
                      <div className="h-6 bg-background rounded border border-border overflow-hidden">
                        <div className="h-full bg-lime/60" style={{ width: `${Math.max(2, pct)}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Campaigns */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Kampagnen (UTM)</CardTitle>
                <ExportBtn name="campaigns" rows={data.campaigns} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground border-b border-border">
                    <tr>
                      <th className="text-left py-2 pr-3">Campaign</th>
                      <th className="text-left py-2 pr-3">Source / Medium</th>
                      <th className="text-right py-2 pr-3">Besucher</th>
                      <th className="text-right py-2 pr-3">Signups</th>
                      <th className="text-right py-2">CR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.campaigns.map((c) => (
                      <tr key={c.campaign} className="border-b border-border/50">
                        <td className="py-2 pr-3 font-mono">{c.campaign}</td>
                        <td className="py-2 pr-3 text-muted-foreground">{c.source ?? "-"} / {c.medium ?? "-"}</td>
                        <td className="py-2 pr-3 text-right">{c.visitors}</td>
                        <td className="py-2 pr-3 text-right">{c.signups}</td>
                        <td className="py-2 text-right"><span className="text-lime">{c.conversionRate}%</span></td>
                      </tr>
                    ))}
                    {!data.campaigns.length && <tr><td colSpan={5} className="py-4 text-muted-foreground">Noch keine UTM-Kampagnen erkannt. Nutze <code>?utm_campaign=…</code> in deinen Links.</td></tr>}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Geo */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Länder</CardTitle>
                  <ExportBtn name="countries" rows={data.geo.countries} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-56">
                  <ResponsiveContainer>
                    <BarChart data={data.geo.countries.slice(0, 8)} layout="vertical">
                      <XAxis type="number" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis dataKey="name" type="category" width={80} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Bar dataKey="count" fill="#a3e635" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Städte</CardTitle>
                  <ExportBtn name="cities" rows={data.geo.cities} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm max-h-56 overflow-y-auto">
                  {data.geo.cities.map((c) => (
                    <div key={c.name} className="flex justify-between border-b border-border/50 py-1">
                      <span>{c.name}</span><span className="text-muted-foreground">{c.count}</span>
                    </div>
                  ))}
                  {!data.geo.cities.length && <p className="text-muted-foreground">Keine Städte-Daten.</p>}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Signups nach Postleitzahl (FSA)</CardTitle>
                  <ExportBtn name="calgary-areas" rows={data.geo.calgaryAreas} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm max-h-56 overflow-y-auto">
                  {data.geo.calgaryAreas.map((c) => (
                    <div key={c.name} className="flex justify-between border-b border-border/50 py-1">
                      <span className="font-mono">{c.name}</span><span className="text-muted-foreground">{c.count}</span>
                    </div>
                  ))}
                  {!data.geo.calgaryAreas.length && <p className="text-muted-foreground text-xs">Feinere Stadtviertel via IP nicht verfügbar. Zeigt Waitlist-FSA (erste 3 Zeichen der PLZ), sobald Signups vorliegen.</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Engagement */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader><CardTitle className="text-base">Scroll-Tiefe</CardTitle></CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer>
                    <BarChart data={data.scrollDepth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="depth" tickFormatter={(v) => `${v}%`} stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                      <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                      <Bar dataKey="count" fill="#a3e635" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Ausgehende Links</CardTitle>
                  <ExportBtn name="outbound" rows={data.outboundClicks} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-1 text-sm max-h-56 overflow-y-auto">
                  {data.outboundClicks.map((o) => (
                    <div key={o.url} className="flex justify-between border-b border-border/50 py-1">
                      <span className="truncate max-w-[240px] font-mono text-xs">{o.url}</span>
                      <span className="text-muted-foreground">{o.count}</span>
                    </div>
                  ))}
                  {!data.outboundClicks.length && <p className="text-muted-foreground">Noch keine Outbound-Klicks.</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Landing pages */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Landing-Page-Performance</CardTitle>
                <ExportBtn name="landing-pages" rows={data.landingPages} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground border-b border-border">
                    <tr>
                      <th className="text-left py-2 pr-3">Einstiegsseite</th>
                      <th className="text-right py-2 pr-3">Besucher</th>
                      <th className="text-right py-2 pr-3">Bounce</th>
                      <th className="text-right py-2">Conversions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.landingPages.map((p) => (
                      <tr key={p.path} className="border-b border-border/50">
                        <td className="py-2 pr-3 font-mono truncate max-w-[280px]">{p.path}</td>
                        <td className="py-2 pr-3 text-right">{p.visitors}</td>
                        <td className="py-2 pr-3 text-right">{p.bounceRate}%</td>
                        <td className="py-2 text-right"><span className="text-lime">{p.conversions}</span></td>
                      </tr>
                    ))}
                    {!data.landingPages.length && <tr><td colSpan={4} className="py-4 text-muted-foreground">Noch keine Daten.</td></tr>}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Top pages / referrers */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Top Seiten</CardTitle>
                  <ExportBtn name="top-pages" rows={data.topPages} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm max-h-72 overflow-y-auto">
                  {data.topPages.map((p) => (
                    <div key={p.path} className="flex justify-between border-b border-border/50 py-1.5">
                      <span className="font-mono text-xs truncate max-w-[240px]">{p.path}</span>
                      <span className="text-muted-foreground">{p.views} · {fmtDur(p.avgDurationMs)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Traffic-Quellen</CardTitle>
                  <ExportBtn name="referrers" rows={data.referrers} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm max-h-72 overflow-y-auto">
                  {data.referrers.map((r) => (
                    <div key={r.source} className="flex justify-between border-b border-border/50 py-1.5">
                      <span className="truncate max-w-[240px]">{r.source}</span>
                      <span className="text-muted-foreground">{r.count}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <PieCard title="Geräte" data={data.devices} />
            <PieCard title="Browser" data={data.browsers} />
            <PieCard title="OS" data={data.os} />
          </div>

          {/* Waitlist with attribution */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Waitlist (mit Attribution)</CardTitle>
                <ExportBtn name="waitlist-attribution" rows={data.waitlistWithSource} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground border-b border-border">
                    <tr>
                      <th className="text-left py-2 pr-3">Datum</th>
                      <th className="text-left py-2 pr-3">Name / Email</th>
                      <th className="text-left py-2 pr-3">Ort</th>
                      <th className="text-left py-2 pr-3">Quelle (first-touch)</th>
                      <th className="text-left py-2">Landing</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.waitlistWithSource.map((w) => (
                      <tr key={w.id} className="border-b border-border/50">
                        <td className="py-2 pr-3 whitespace-nowrap">{fmtTime(w.created_at)}</td>
                        <td className="py-2 pr-3">
                          <div>{w.name}</div>
                          <div className="text-muted-foreground">{w.email}</div>
                        </td>
                        <td className="py-2 pr-3">
                          {w.city ?? w.country ?? "-"}
                          {w.postal_code && <span className="text-muted-foreground ml-1">({w.postal_code})</span>}
                        </td>
                        <td className="py-2 pr-3">
                          {w.utm_campaign || w.utm_source ? (
                            <span className="text-lime">{w.utm_campaign ?? w.utm_source}</span>
                          ) : w.referrer_domain ? (
                            <span>{w.referrer_domain}</span>
                          ) : (
                            <span className="text-muted-foreground">Direct</span>
                          )}
                          <div className="text-[10px] text-muted-foreground">{w.source}</div>
                        </td>
                        <td className="py-2 font-mono text-[11px] truncate max-w-[200px]">{w.landing_path ?? "-"}</td>
                      </tr>
                    ))}
                    {!data.waitlistWithSource.length && <tr><td colSpan={5} className="py-4 text-muted-foreground">Keine Signups im Zeitraum.</td></tr>}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Letzte Sessions</CardTitle>
                <ExportBtn name="sessions" rows={data.recentSessions.map((s) => ({ ...s, pages: s.pages.join(" | ") }))} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground border-b border-border">
                    <tr>
                      <th className="text-left py-2 pr-3">Start</th>
                      <th className="text-left py-2 pr-3">Ort</th>
                      <th className="text-left py-2 pr-3">Quelle</th>
                      <th className="text-left py-2 pr-3">Gerät</th>
                      <th className="text-left py-2 pr-3">Browser/OS</th>
                      <th className="text-left py-2 pr-3">Seiten</th>
                      <th className="text-left py-2">Dauer</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentSessions.map((s) => (
                      <tr key={s.session_id} className="border-b border-border/50">
                        <td className="py-2 pr-3 whitespace-nowrap">{fmtTime(s.started_at)}</td>
                        <td className="py-2 pr-3">{s.city ?? s.country ?? "-"}</td>
                        <td className="py-2 pr-3">{s.utm_source || s.referrer_domain || "Direct"}</td>
                        <td className="py-2 pr-3">{s.device_type}</td>
                        <td className="py-2 pr-3">{s.browser} / {s.os}</td>
                        <td className="py-2 pr-3">
                          <span className="font-mono">{s.pages.length}</span>
                          <span className="text-muted-foreground ml-1 truncate inline-block max-w-[180px] align-bottom">
                            {s.pages.slice(0, 2).join(", ")}
                          </span>
                        </td>
                        <td className="py-2">{fmtDur(s.duration_ms)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
