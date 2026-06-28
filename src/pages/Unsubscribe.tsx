import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

const Unsubscribe = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const [state, setState] = useState<"loading" | "valid" | "invalid" | "done" | "submitting">("loading");
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setState("invalid");
      return;
    }
    fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`, {
      headers: { apikey: ANON },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error("invalid");
        const d = await r.json();
        setEmail(d.email ?? null);
        setState(d.already_unsubscribed ? "done" : "valid");
      })
      .catch(() => setState("invalid"));
  }, [token]);

  const confirm = async () => {
    setState("submitting");
    try {
      const r = await fetch(`${SUPABASE_URL}/functions/v1/handle-email-unsubscribe`, {
        method: "POST",
        headers: { apikey: ANON, "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!r.ok) throw new Error();
      setState("done");
    } catch {
      setState("invalid");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-4">
          <h1 className="text-2xl font-light">Email preferences</h1>
          {state === "loading" && <p className="text-muted-foreground">Verifying link…</p>}
          {state === "invalid" && (
            <p className="text-muted-foreground">
              This unsubscribe link is invalid or has expired.
            </p>
          )}
          {state === "valid" && (
            <>
              <p className="text-muted-foreground">
                Confirm to unsubscribe {email ?? "this address"} from NullPunkt emails.
              </p>
              <Button onClick={confirm} className="w-full">
                Confirm unsubscribe
              </Button>
            </>
          )}
          {state === "submitting" && <p className="text-muted-foreground">Saving…</p>}
          {state === "done" && (
            <p className="text-muted-foreground">
              {email ?? "You"} has been unsubscribed. You won't receive further emails from us.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Unsubscribe;
