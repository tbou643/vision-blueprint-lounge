ALTER TABLE public.waitlist_signups DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist_signups ENABLE ROW LEVEL SECURITY;
NOTIFY pgrst, 'reload schema';
NOTIFY pgrst, 'reload config';