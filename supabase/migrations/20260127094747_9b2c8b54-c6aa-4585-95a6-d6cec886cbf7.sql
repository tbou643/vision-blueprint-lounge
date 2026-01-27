-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public)
VALUES ('project-images', 'project-images', true);

-- Allow anyone to view project images (public bucket)
CREATE POLICY "Public can view project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project-images');

-- Allow authenticated uploads (we'll handle auth in the app)
CREATE POLICY "Allow uploads to project-images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project-images');

-- Allow updates
CREATE POLICY "Allow updates to project-images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project-images');

-- Allow deletes
CREATE POLICY "Allow deletes from project-images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project-images');