-- First, ensure the storage schema exists
CREATE SCHEMA IF NOT EXISTS storage;

-- Create the product-images bucket
INSERT INTO storage.buckets (id, name, public, avif_autodetection, file_size_limit, allowed_mime_types)
VALUES (
  'product-images',
  'product-images', 
  true,  -- Make it public
  false, -- No AVIF auto-detection
  10485760, -- 10MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[]
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']::text[];

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read access" ON storage.objects;
DROP POLICY IF EXISTS "Allow public updates" ON storage.objects;
DROP POLICY IF EXISTS "Allow public deletes" ON storage.objects;

-- Create storage policies for the product-images bucket
-- Allow anyone to upload
CREATE POLICY "Allow public uploads to product-images"
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'product-images');

-- Allow anyone to read/download
CREATE POLICY "Allow public read access to product-images"
ON storage.objects FOR SELECT 
USING (bucket_id = 'product-images');

-- Allow anyone to update
CREATE POLICY "Allow public updates to product-images"
ON storage.objects FOR UPDATE 
USING (bucket_id = 'product-images')
WITH CHECK (bucket_id = 'product-images');

-- Allow anyone to delete
CREATE POLICY "Allow public deletes from product-images"
ON storage.objects FOR DELETE 
USING (bucket_id = 'product-images');

-- Verify the bucket was created
SELECT id, name, public, file_size_limit, allowed_mime_types 
FROM storage.buckets 
WHERE id = 'product-images';