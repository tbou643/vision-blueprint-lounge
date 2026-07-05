DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.waitlist_signups;
CREATE POLICY "Public can insert waitlist" ON public.waitlist_signups FOR INSERT TO anon, authenticated WITH CHECK (true);
NOTIFY pgrst, 'reload schema';