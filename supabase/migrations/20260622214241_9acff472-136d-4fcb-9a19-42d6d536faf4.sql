
CREATE TABLE public.waitlist_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  postal_code text,
  property_type text,
  monthly_bill numeric,
  notes text,
  source text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.waitlist_signups TO anon, authenticated;
GRANT ALL ON public.waitlist_signups TO service_role;

ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
ON public.waitlist_signups
FOR INSERT
TO anon, authenticated
WITH CHECK (true);
