import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Users, Eye, Clock, MousePointerClick, RefreshCw } from "lucide-react";

interface AnalyticsData {
  totals: {
    pageviews: number;
    visitors: number;
    sessions: number;
    bounceRate: number;
    avgSessionSec: number;
  };
  timeseries: { date: string; views: number; visitors: number }[];
  topPages: { path: string; views: number; avgDurationMs: number }[];
  referrers: { source: string; count: number }[];
  devices: { name: string; count: number }[];
  browsers: { name: string; count: number }[];
  os: { name: string; count: number }[];
  recentSessions: Array<{
    session_id: string;
    visitor_id: string;
    started_at: string;
    last_at: string;
    pages: string[];
    device_type: string;
    browser: string;
    os: string;
    referrer_domain: string | null;
    utm_source: string | null;
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

function fmtTime(iso: string) {
  return new Date(iso).toLocaleString();
}

export default function AnalyticsAdmin({ password }: { password: string }) {
  const { toast } = useToast();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [days, setDays] = useState(7);

  const load = async (d: number) => {
    setLoading(true);
    try {
      const url = `https://hesgpwjpxarceynzjgpc.supabase.co/functions/v1/admin-analytics`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": password,
        },
        body: JSON.stringify({ days: d }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      setData(json);
    } catch (e) {
      toast({ title: "Fehler beim Laden", description: String(e), variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2">
          {RANGES.map((r) => (
            <Button
              key={r.days}
              variant={days === r.days ? "default" : "outline"}
              size="sm"
              onClick={() => setDays(r.days)}
            >
              {r.label}
            </Button>
          ))}
        </div>
        <Button variant="outline" size="sm" onClick={() => load(days)} disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Aktualisieren
        </Button>
      </div>

      {!data ? (
        <p className="text-muted-foreground">Lade Daten…</p>
      ) : (
        <>
          {/* KPI cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <Kpi icon={<Users className="w-4 h-4" />} label="Besucher" value={data.totals.visitors} />
            <Kpi icon={<Eye className="w-4 h-4" />} label="Pageviews" value={data.totals.pageviews} />
            <Kpi icon={<MousePointerClick className="w-4 h-4" />} label="Sessions" value={data.totals.sessions} />
            <Kpi icon={<Clock className="w-4 h-4" />} label="Ø Session" value={fmtDur(data.totals.avgSessionSec * 1000)} />
            <Kpi icon={<RefreshCw className="w-4 h-4" />} label="Bounce" value={`${data.totals.bounceRate}%`} />
          </div>

          {/* Timeseries */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Verlauf</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer>
                  <LineChart data={data.timeseries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                    <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                    <Legend />
                    <Line type="monotone" dataKey="visitors" stroke="#a3e635" strokeWidth={2} dot={false} />
                    <Line type="monotone" dataKey="views" stroke="#65a30d" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Top Pages */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Top Seiten</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {data.topPages.map((p) => (
                    <div key={p.path} className="flex justify-between border-b border-border/50 py-1.5">
                      <span className="font-mono text-xs truncate max-w-[200px]">{p.path}</span>
                      <span className="text-muted-foreground">
                        {p.views} · {fmtDur(p.avgDurationMs)}
                      </span>
                    </div>
                  ))}
                  {data.topPages.length === 0 && <p className="text-muted-foreground">Noch keine Daten.</p>}
                </div>
              </CardContent>
            </Card>

            {/* Referrers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Traffic-Quellen</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {data.referrers.map((r) => (
                    <div key={r.source} className="flex justify-between border-b border-border/50 py-1.5">
                      <span className="truncate max-w-[200px]">{r.source}</span>
                      <span className="text-muted-foreground">{r.count}</span>
                    </div>
                  ))}
                  {data.referrers.length === 0 && <p className="text-muted-foreground">Noch keine Daten.</p>}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <PieCard title="Geräte" data={data.devices} />
            <PieCard title="Browser" data={data.browsers} />
            <PieCard title="OS" data={data.os} />
          </div>

          {/* Recent sessions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Letzte Sessions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead className="text-muted-foreground border-b border-border">
                    <tr>
                      <th className="text-left py-2 pr-3">Start</th>
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
                {data.recentSessions.length === 0 && (
                  <p className="text-muted-foreground text-sm py-4">Noch keine Sessions.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}

function Kpi({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 text-muted-foreground text-xs mb-1">
          {icon}
          <span>{label}</span>
        </div>
        <div className="text-2xl font-light">{value}</div>
      </CardContent>
    </Card>
  );
}

function PieCard({ title, data }: { title: string; data: { name: string; count: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="count" nameKey="name" outerRadius={70} label={(d) => d.name}>
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
