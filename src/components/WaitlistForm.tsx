import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Valid email required").max(255),
  postal_code: z.string().trim().max(10).optional().or(z.literal("")),
  property_type: z.string().max(50).optional(),
  monthly_bill: z.string().max(10).optional(),
  notes: z.string().trim().max(500).optional(),
});

interface Props {
  source?: string;
  defaultBill?: number;
  defaultProperty?: string;
  compact?: boolean;
}

const WaitlistForm = ({ source = "website", defaultBill, defaultProperty, compact }: Props) => {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const flat: Record<string, string> = {};
      for (const issue of parsed.error.issues) flat[issue.path[0] as string] = issue.message;
      setErrors(flat);
      return;
    }
    setLoading(true);
    const id = crypto.randomUUID();
    const created_at = new Date().toISOString();
    const payload = {
      id,
      name: parsed.data.name,
      email: parsed.data.email,
      postal_code: parsed.data.postal_code || null,
      property_type: parsed.data.property_type || null,
      monthly_bill: parsed.data.monthly_bill ? Number(parsed.data.monthly_bill) : null,
      notes: parsed.data.notes || null,
      source,
    };
    const { error } = await supabase
      .from("waitlist_signups")
      .insert(payload);
    if (error) {
      setLoading(false);
      toast({ title: "Something went wrong", description: error.message, variant: "destructive" });
      return;
    }

    // Fire-and-forget notification emails (don't block the UX if they fail)
    try {
      await Promise.allSettled([
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "waitlist-internal",
            recipientEmail: "hello@nullpunkt.ca",
            idempotencyKey: `waitlist-internal-${id}`,
            templateData: { ...payload, created_at },
          },
        }),
        supabase.functions.invoke("send-transactional-email", {
          body: {
            templateName: "waitlist-confirmation",
            recipientEmail: payload.email,
            idempotencyKey: `waitlist-confirm-${id}`,
            templateData: { name: payload.name },
          },
        }),
      ]);
    } catch (_) {
      /* non-blocking */
    }

    setLoading(false);
    setDone(true);
    toast({ title: "You're on the list", description: "Check your inbox for a confirmation from NullPunkt." });
  };

  if (done) {
    return (
      <div className="card-raised p-8 text-center">
        <div className="w-12 h-12 mx-auto rounded-full bg-lime/15 border border-lime/40 flex items-center justify-center mb-4">
          <span className="text-lime text-xl">✓</span>
        </div>
        <h3 className="text-2xl font-light mb-2">You're on the founding list</h3>
        <p className="text-muted-foreground">
          We're prioritising Calgary signups for Summer 2026. Expect a personal email from our engineering team.
        </p>
      </div>
    );
  }

  const input =
    "w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:border-lime transition-colors";

  return (
    <form onSubmit={handleSubmit} className={compact ? "space-y-3" : "space-y-4"}>
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <input name="name" placeholder="Full name" className={input} />
          {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
        </div>
        <div>
          <input name="email" type="email" placeholder="Email" className={input} />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>
      </div>
      <div className="grid sm:grid-cols-3 gap-3">
        <input name="postal_code" placeholder="Postal code (T2P…)" className={input} />
        <select name="property_type" defaultValue={defaultProperty ?? ""} className={input}>
          <option value="">Property type</option>
          <option value="residential">Residential — Single family</option>
          <option value="acreage">Acreage / Rural</option>
          <option value="commercial">Commercial</option>
          <option value="agricultural">Agricultural / Agri-PV</option>
          <option value="developer">Developer / Subdivision</option>
        </select>
        <input
          name="monthly_bill"
          type="number"
          min="0"
          step="10"
          defaultValue={defaultBill ?? ""}
          placeholder="Avg monthly bill ($)"
          className={input}
        />
      </div>
      {!compact && (
        <textarea
          name="notes"
          rows={3}
          placeholder="Anything specific? (battery, EV, off-grid goals…)"
          className={input}
        />
      )}
      <button type="submit" disabled={loading} className="btn-lime w-full justify-center">
        {loading ? "Submitting…" : "Reserve my founding slot →"}
      </button>
      <p className="text-[11px] text-muted-foreground">
        We'll only use your details to contact you about your installation. No spam, ever.
      </p>
    </form>
  );
};

export default WaitlistForm;
