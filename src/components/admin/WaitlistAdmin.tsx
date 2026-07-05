import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { RefreshCw, Mail, Download } from "lucide-react";

interface Signup {
  id: string;
  name: string;
  email: string;
  postal_code: string | null;
  property_type: string | null;
  monthly_bill: number | null;
  notes: string | null;
  source: string | null;
  created_at: string;
}

const WaitlistAdmin = () => {
  const { toast } = useToast();
  const [signups, setSignups] = useState<Signup[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-waitlist");
    setLoading(false);
    if (error) {
      toast({
        title: "Failed to load waitlist",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    setSignups((data as { signups: Signup[] })?.signups ?? []);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportCsv = () => {
    const headers = [
      "created_at",
      "name",
      "email",
      "postal_code",
      "property_type",
      "monthly_bill",
      "source",
      "notes",
    ];
    const rows = signups.map((s) =>
      headers
        .map((h) => {
          const v = (s as any)[h] ?? "";
          const str = String(v).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(","),
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nullpunkt-waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-medium">Waitlist signups</h2>
          <p className="text-sm text-muted-foreground">
            {signups.length} total · You also receive an email at hello@nullpunkt.ca for every new signup.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={exportCsv} disabled={!signups.length}>
            <Download className="w-4 h-4 mr-2" /> CSV
          </Button>
          <Button variant="outline" size="sm" onClick={load} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </div>

      {signups.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center text-muted-foreground">
            {loading ? "Loading…" : "No signups yet."}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-3">
          {signups.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-medium truncate">{s.name}</h3>
                      {s.property_type && (
                        <Badge variant="secondary" className="text-xs">
                          {s.property_type}
                        </Badge>
                      )}
                      {s.source && (
                        <Badge variant="outline" className="text-xs">
                          {s.source}
                        </Badge>
                      )}
                    </div>
                    <a
                      href={`mailto:${s.email}`}
                      className="text-sm text-primary hover:underline inline-flex items-center gap-1 mt-1"
                    >
                      <Mail className="w-3 h-3" />
                      {s.email}
                    </a>
                    <div className="text-xs text-muted-foreground mt-1">
                      {s.postal_code && <span>{s.postal_code} · </span>}
                      {s.monthly_bill != null && <span>${s.monthly_bill}/mo · </span>}
                      <span>{new Date(s.created_at).toLocaleString()}</span>
                    </div>
                    {s.notes && (
                      <p className="text-sm mt-2 p-2 bg-muted rounded border-l-2 border-primary">
                        {s.notes}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default WaitlistAdmin;
