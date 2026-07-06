
CREATE TABLE public.analytics_excluded_visitors (
  visitor_id text PRIMARY KEY,
  note text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_excluded_visitors TO authenticated;
GRANT ALL ON public.analytics_excluded_visitors TO service_role;
ALTER TABLE public.analytics_excluded_visitors ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage excluded visitors"
  ON public.analytics_excluded_visitors FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
